import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
const execFileAsync = promisify(execFile);
const OUTPUT_LIMIT = 12_000;
const COMMAND_TIMEOUT_MS = 10_000;
export const bridgeReviewedShellToolId = 'bridge:reviewed-shell';
export const reviewedShellCommandAllowlist = [
    {
        command: 'pwd',
        description: 'Print the current working directory.'
    },
    {
        command: 'ls [path]',
        description: 'List files inside the recipe root or a child path.'
    },
    {
        command: 'rg --files',
        description: 'List files with ripgrep.'
    },
    {
        command: 'rg [flags] <pattern> [path]',
        description: 'Search file content with reviewed ripgrep flags only.'
    },
    {
        command: 'cat <file>',
        description: 'Read a file from the recipe root.'
    },
    {
        command: 'head <file>',
        description: 'Read the start of a file.'
    },
    {
        command: 'tail <file>',
        description: 'Read the end of a file.'
    },
    {
        command: 'sed -n <range>p <file>',
        description: 'Print a fixed line range from a file without editing it.'
    },
    {
        command: 'git status',
        description: 'Inspect repository status.'
    },
    {
        command: 'git diff --stat',
        description: 'Inspect file change counts without full diff contents.'
    },
    {
        command: 'git rev-parse --show-toplevel',
        description: 'Resolve the recipe root.'
    },
    {
        command: 'git branch --show-current',
        description: 'Inspect the current branch.'
    },
    {
        command: 'git log --oneline -n <N>',
        description: 'Inspect a bounded recent commit list.'
    }
];
const allowedGitCommands = new Set(['status', 'diff', 'rev-parse', 'branch', 'log']);
function truncateOutput(value) {
    if (value.length <= OUTPUT_LIMIT) {
        return value;
    }
    return `${value.slice(0, OUTPUT_LIMIT - 1)}…`;
}
function resolveBoundaryPath(targetPath) {
    const missingSegments = [];
    let probe = targetPath;
    while (!fs.existsSync(probe)) {
        const parent = path.dirname(probe);
        if (parent === probe) {
            break;
        }
        missingSegments.unshift(path.basename(probe));
        probe = parent;
    }
    const resolvedExisting = fs.existsSync(probe) ? fs.realpathSync.native(probe) : probe;
    return missingSegments.reduce((currentPath, segment) => path.join(currentPath, segment), resolvedExisting);
}
function ensureWithinRoot(rootDirectory, targetPath) {
    const resolvedRoot = fs.realpathSync.native(path.resolve(rootDirectory));
    const resolvedTarget = resolveBoundaryPath(path.resolve(rootDirectory, targetPath));
    if (resolvedTarget === resolvedRoot || resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
        return resolvedTarget;
    }
    throw new Error('Shell command paths must stay within the recipe root.');
}
function validateGitArgs(args) {
    const subcommand = args[0];
    if (!subcommand || !allowedGitCommands.has(subcommand)) {
        throw new Error('Only read-only git inspection commands are allowed.');
    }
    if (subcommand === 'status') {
        return;
    }
    if (subcommand === 'diff' && args.join(' ') === 'diff --stat') {
        return;
    }
    if (subcommand === 'rev-parse' && args.join(' ') === 'rev-parse --show-toplevel') {
        return;
    }
    if (subcommand === 'branch' && args.join(' ') === 'branch --show-current') {
        return;
    }
    if (subcommand === 'log' && /^log --oneline -n \d+$/.test(args.join(' '))) {
        return;
    }
    throw new Error('That git command is outside the reviewed allowlist.');
}
function validateSedArgs(args) {
    if (args.length < 3 || args[0] !== '-n' || !/^\d+(,\d+)?p$/.test(args[1]) || args.includes('-i')) {
        throw new Error('Only read-only sed print commands are allowed.');
    }
}
function validateRgArgs(args, cwd) {
    const allowedFlags = new Set(['--files', '-n', '--line-number', '-i', '--ignore-case', '-S', '--smart-case', '--hidden', '-uu']);
    const allowedValueFlags = new Set(['-m', '--max-count']);
    let expectsFlagValue = false;
    let patternConsumed = args.includes('--files');
    for (const arg of args) {
        if (expectsFlagValue) {
            if (!/^\d+$/.test(arg)) {
                throw new Error('Ripgrep max-count values must be numeric.');
            }
            expectsFlagValue = false;
            continue;
        }
        if (arg.startsWith('-')) {
            if (arg === '--pre' || arg === '--replace') {
                throw new Error('Transforming ripgrep output is outside the reviewed allowlist.');
            }
            if (allowedFlags.has(arg)) {
                continue;
            }
            if (allowedValueFlags.has(arg)) {
                expectsFlagValue = true;
                continue;
            }
            throw new Error(`That ripgrep flag is outside the reviewed allowlist: ${arg}`);
        }
        if (!patternConsumed) {
            patternConsumed = true;
            continue;
        }
        ensureWithinRoot(cwd, arg);
    }
    if (expectsFlagValue) {
        throw new Error('The reviewed shell adapter expected a value after the ripgrep flag.');
    }
    if (!patternConsumed) {
        throw new Error('Ripgrep commands require a search pattern or --files.');
    }
}
function normalizeRequest(request, recipeRoot) {
    const cwd = request.cwd ? ensureWithinRoot(recipeRoot, request.cwd) : recipeRoot;
    switch (request.command) {
        case 'pwd':
            if (request.args.length > 0) {
                throw new Error('pwd does not accept extra arguments.');
            }
            break;
        case 'ls':
        case 'cat':
        case 'head':
        case 'tail':
            request.args.filter((value) => !value.startsWith('-')).forEach((value) => ensureWithinRoot(cwd, value));
            break;
        case 'sed':
            validateSedArgs(request.args);
            ensureWithinRoot(cwd, request.args.at(-1) ?? '');
            break;
        case 'git':
            validateGitArgs(request.args);
            break;
        case 'rg':
            validateRgArgs(request.args, cwd);
            break;
        default:
            throw new Error(`The reviewed shell adapter does not allow "${request.command}".`);
    }
    return {
        cwd,
        command: request.command,
        args: request.args
    };
}
export async function runReviewedToolExecution(request, recipeRoot, requestedAt) {
    let normalized;
    try {
        normalized = normalizeRequest(request, recipeRoot);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'The reviewed shell request was rejected.';
        return {
            status: 'rejected',
            resolvedAt: requestedAt,
            stdout: '',
            stderr: message,
            exitCode: 1
        };
    }
    try {
        const result = await execFileAsync(normalized.command, normalized.args, {
            cwd: normalized.cwd,
            timeout: COMMAND_TIMEOUT_MS,
            encoding: 'utf8',
            maxBuffer: 1024 * 1024
        });
        return {
            status: 'completed',
            resolvedAt: new Date().toISOString(),
            stdout: truncateOutput(result.stdout ?? ''),
            stderr: truncateOutput(result.stderr ?? ''),
            exitCode: 0
        };
    }
    catch (error) {
        const stdout = typeof error === 'object' && error !== null && 'stdout' in error ? String(error.stdout ?? '') : '';
        const stderr = typeof error === 'object' && error !== null && 'stderr' in error ? String(error.stderr ?? '') : '';
        const exitCode = typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'number'
            ? error.code
            : 1;
        const message = error instanceof Error ? error.message : 'The reviewed shell command failed.';
        return {
            status: 'failed',
            resolvedAt: new Date().toISOString(),
            stdout: truncateOutput(stdout),
            stderr: truncateOutput(stderr || message),
            exitCode
        };
    }
}
