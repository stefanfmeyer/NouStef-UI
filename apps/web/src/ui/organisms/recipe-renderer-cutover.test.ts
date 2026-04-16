// @vitest-environment node

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const organismsDirectory = path.resolve(import.meta.dirname);

describe('workspace renderer production cutover', () => {
  it('removes the retired RecipeAppletRenderer from the production web bundle', () => {
    expect(fs.existsSync(path.join(organismsDirectory, 'RecipeAppletRenderer.tsx'))).toBe(false);
  });
});
