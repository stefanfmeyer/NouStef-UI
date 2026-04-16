import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { RecipeManifestSchema } from '@hermes-recipes/protocol';
function readJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath))
            return null;
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    catch {
        return null;
    }
}
export function getBuiltinRecipesPath() {
    return path.resolve(import.meta.dirname, '../../builtin-recipes');
}
export function getUserRecipesPath() {
    return path.join(os.homedir(), '.hermes', 'recipes');
}
export function discoverRecipeFolders(rootPaths) {
    const manifests = [];
    for (const rootPath of rootPaths) {
        if (!fs.existsSync(rootPath))
            continue;
        const entries = fs.readdirSync(rootPath, { withFileTypes: true });
        for (const entry of entries) {
            if (!entry.isDirectory())
                continue;
            const manifestPath = path.join(rootPath, entry.name, 'manifest.json');
            const raw = readJsonFile(manifestPath);
            if (!raw)
                continue;
            try {
                manifests.push(RecipeManifestSchema.parse(raw));
            }
            catch {
                // Skip invalid manifests
            }
        }
    }
    return manifests;
}
export function loadRecipeFromDisk(folderPath) {
    const raw = readJsonFile(path.join(folderPath, 'manifest.json'));
    if (!raw)
        return null;
    try {
        const manifest = RecipeManifestSchema.parse(raw);
        return {
            manifest,
            folderPath,
            spec: readJsonFile(path.join(folderPath, 'spec.json')),
            fixture: readJsonFile(path.join(folderPath, 'fixture.json')),
            runtime: readJsonFile(path.join(folderPath, 'runtime.json'))
        };
    }
    catch {
        return null;
    }
}
export function saveRecipeToDisk(folderPath, manifest, files) {
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
    if (files.spec)
        fs.writeFileSync(path.join(folderPath, 'spec.json'), JSON.stringify(files.spec, null, 2), 'utf8');
    if (files.fixture)
        fs.writeFileSync(path.join(folderPath, 'fixture.json'), JSON.stringify(files.fixture, null, 2), 'utf8');
    if (files.runtime)
        fs.writeFileSync(path.join(folderPath, 'runtime.json'), JSON.stringify(files.runtime, null, 2), 'utf8');
}
