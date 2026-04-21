import { execSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();

const SCAN_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.html']);

const EXCLUDED_PATH_SEGMENTS = new Set([
  'node_modules',
  'dist',
  'dist-electron',
  'playwright-report',
  'test-results',
  '.turbo',
  '.pnpm-store',
  'coverage',
  '.git'
]);

const EXCLUDED_FILES = new Set(['pnpm-lock.yaml', 'scripts/security-check.mjs']);

const UNSAFE_PATTERN = /(dangerouslySetInnerHTML|eval\(|new Function\(|innerHTML\s*=)/;

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (EXCLUDED_PATH_SEGMENTS.has(entry.name)) {
      continue;
    }
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function scanUnsafePatterns() {
  const matches = [];
  for (const filePath of walk(ROOT)) {
    const rel = relative(ROOT, filePath).split(sep).join('/');
    if (EXCLUDED_FILES.has(rel)) {
      continue;
    }
    const ext = rel.slice(rel.lastIndexOf('.'));
    if (!SCAN_EXTENSIONS.has(ext)) {
      continue;
    }
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (UNSAFE_PATTERN.test(lines[i])) {
        matches.push(`${rel}:${i + 1}:${lines[i]}`);
      }
    }
  }
  if (matches.length > 0) {
    console.error(matches.join('\n'));
    throw new Error(`Unsafe patterns found (${matches.length}).`);
  }
}

const checks = [
  {
    name: 'npm audit',
    run: () => {
      try {
        execSync('pnpm audit --prod --audit-level=high', { stdio: 'pipe', encoding: 'utf8' });
      } catch (error) {
        const stderr = error?.stderr ?? '';
        const stdout = error?.stdout ?? '';
        const combined = `${stderr}\n${stdout}`;
        if (combined.includes('410') || combined.includes('being retired') || combined.includes('ERR_PNPM_AUDIT_BAD_RESPONSE')) {
          console.warn(
            '\n⚠️  npm audit endpoint returned 410 (deprecated).\n' +
            '    Treating as non-blocking, but vulnerabilities are NOT being checked.\n' +
            '    Consider adding osv-scanner or CodeQL to CI for real coverage.\n'
          );
          return;
        }
        if (stderr) process.stderr.write(stderr);
        if (stdout) process.stdout.write(stdout);
        throw error;
      }
    }
  },
  {
    name: 'unsafe pattern scan',
    run: scanUnsafePatterns
  }
];

let failed = false;

for (const check of checks) {
  try {
    check.run();
  } catch (error) {
    failed = true;
    console.error(`Security check failed: ${check.name}: ${error?.message ?? error}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log('Security checks passed.');
