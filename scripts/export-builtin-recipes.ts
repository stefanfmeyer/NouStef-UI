import fs from 'node:fs';
import path from 'node:path';
import { RECIPE_TEMPLATE_RUNTIME_REGISTRY } from '../apps/bridge/src/services/recipes/recipe-template-registry';

const outputDir = path.resolve(import.meta.dirname, '../apps/bridge/builtin-recipes');

for (const [id, definition] of Object.entries(RECIPE_TEMPLATE_RUNTIME_REGISTRY)) {
  const recipeDir = path.join(outputDir, id);
  fs.mkdirSync(recipeDir, { recursive: true });

  const manifest = {
    id,
    version: '1.0.0',
    name: definition.name,
    category: 'general',
    description: definition.useCase,
    author: 'Hermes',
    source: 'builtin',
    protocolVersion: '1.0.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const runtime = {
    slots: definition.slots,
    allowedUpdateOps: definition.allowedUpdateOps,
    actions: definition.actions,
    transitions: definition.transitions,
    selectionSignals: definition.selectionSignals
  };

  fs.writeFileSync(path.join(recipeDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(path.join(recipeDir, 'runtime.json'), JSON.stringify(runtime, null, 2), 'utf8');

  console.warn(`Exported: ${id}`);
}

console.warn(`\nExported ${Object.keys(RECIPE_TEMPLATE_RUNTIME_REGISTRY).length} recipes to ${outputDir}`);
