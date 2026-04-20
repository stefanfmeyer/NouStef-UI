import fs from 'node:fs';
import path from 'node:path';

const RECIPE_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

export function validateRecipeId(raw: unknown): string {
  if (typeof raw !== 'string' || !RECIPE_ID_PATTERN.test(raw)) {
    throw new PathValidationError('recipeId must be kebab-case (a-z, 0-9, hyphen) and 1-64 characters long.');
  }
  return raw;
}

export function validateVersion(raw: unknown): string {
  if (typeof raw !== 'string' || !VERSION_PATTERN.test(raw)) {
    throw new PathValidationError('version must be in the form "major.minor.patch" (digits only).');
  }
  return raw;
}

export function resolveWithinRoot(rootDirectory: string, targetPath: string): string {
  const resolvedRoot = fs.existsSync(rootDirectory)
    ? fs.realpathSync.native(path.resolve(rootDirectory))
    : path.resolve(rootDirectory);
  const resolvedTarget = path.resolve(rootDirectory, targetPath);
  if (resolvedTarget === resolvedRoot || resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
    return resolvedTarget;
  }
  throw new PathValidationError('Resolved path escapes the recipe root.');
}

export class PathValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PathValidationError';
  }
}
