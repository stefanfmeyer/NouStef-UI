import os from 'node:os';
import path from 'node:path';

export const bridgeAppName = 'Hermes Recipes Browser';
export const bridgeDatabaseFileName = 'hermes-recipes.db';

function getWindowsDataDirectory(appName: string) {
  const base = process.env.APPDATA ?? path.join(os.homedir(), 'AppData', 'Roaming');
  return path.join(base, appName);
}

function getMacDataDirectory(appName: string) {
  return path.join(os.homedir(), 'Library', 'Application Support', appName);
}

function getLinuxDataDirectory(appName: string) {
  const base = process.env.XDG_DATA_HOME ?? path.join(os.homedir(), '.local', 'share');
  return path.join(base, appName);
}

export function getDefaultBridgeDataDirectory(appName = bridgeAppName) {
  if (process.platform === 'win32') {
    return getWindowsDataDirectory(appName);
  }

  if (process.platform === 'darwin') {
    return getMacDataDirectory(appName);
  }

  return getLinuxDataDirectory(appName);
}

export function resolveBridgeDatabasePath(inputPath?: string) {
  if (inputPath && inputPath.trim().length > 0) {
    return path.resolve(inputPath);
  }

  return path.join(getDefaultBridgeDataDirectory(), bridgeDatabaseFileName);
}

export function resolveLegacySnapshotCandidates() {
  const candidates = new Set<string>();
  const legacyFile = 'hermes-recipes-state.v2.json';

  candidates.add(path.join(getMacDataDirectory('Hermes Recipes'), legacyFile));
  candidates.add(path.join(getMacDataDirectory('Electron'), legacyFile));
  candidates.add(path.join(getLinuxDataDirectory('Hermes Recipes'), legacyFile));
  candidates.add(path.join(getWindowsDataDirectory('Hermes Recipes'), legacyFile));

  return [...candidates];
}
