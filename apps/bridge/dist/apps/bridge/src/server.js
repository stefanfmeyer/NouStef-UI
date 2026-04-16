import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createBridgeServer } from './http/create-bridge-server';
import { resolveBridgeDatabasePath, resolveLegacySnapshotCandidates } from './paths';
const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
function getArgValue(flag, args) {
    const index = args.indexOf(flag);
    return index >= 0 ? args[index + 1] : undefined;
}
function resolveOptionalPath(rawPath) {
    if (!rawPath) {
        return undefined;
    }
    if (path.isAbsolute(rawPath)) {
        return rawPath;
    }
    const candidates = [
        path.resolve(process.cwd(), rawPath),
        path.resolve(moduleDirectory, rawPath),
        path.resolve(moduleDirectory, '..', rawPath)
    ];
    return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}
export { createBridgeServer } from './http/create-bridge-server';
async function main() {
    const args = process.argv.slice(2);
    const port = Number.parseInt(getArgValue('--port', args) ?? process.env.BRIDGE_PORT ?? '8787', 10);
    const staticDirectoryArg = getArgValue('--static-dir', args);
    const fixtureMode = args.includes('--fixture');
    const staticDirectory = resolveOptionalPath(staticDirectoryArg ?? process.env.BRIDGE_STATIC_DIR);
    const databasePath = resolveBridgeDatabasePath(getArgValue('--db-path', args) ?? process.env.BRIDGE_DB_PATH);
    const cliPath = getArgValue('--cli-path', args) ??
        process.env.HERMES_CLI_PATH ??
        (fixtureMode ? path.resolve(moduleDirectory, '../test/fixtures/hermes-cli-fixture.mjs') : undefined);
    if (fixtureMode && !process.env.HERMES_FIXTURE_HOME) {
        process.env.HERMES_FIXTURE_HOME = path.resolve(process.cwd(), '../../tmp/hermes-fixture');
    }
    const { server } = createBridgeServer({
        databasePath,
        cliPath,
        staticDirectory,
        recipeRoot: process.cwd(),
        legacySnapshotPaths: fixtureMode ? [] : resolveLegacySnapshotCandidates()
    });
    server.listen(port, '127.0.0.1', () => {
        process.stdout.write(`Hermes bridge listening on http://127.0.0.1:${port}\n`);
    });
}
const isEntrypoint = process.argv[1] ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) : false;
if (isEntrypoint) {
    void main();
}
