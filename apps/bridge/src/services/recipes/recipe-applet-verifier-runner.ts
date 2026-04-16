import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

interface RunnerTestResult {
  name: string;
  passed: boolean;
  message: string;
}

async function main() {
  const [contextPath, manifestPath, sourcePath, testsPath] = process.argv.slice(2);
  if (!contextPath || !manifestPath || !sourcePath) {
    throw new Error('Recipe applet verifier runner requires context, manifest, source, and tests paths.');
  }

  const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const sourceModule = await import(pathToFileURL(path.resolve(sourcePath)).href);
  const definition = sourceModule.default;

  if (!definition || typeof definition.render !== 'function') {
    throw new Error('Recipe applet module must default-export defineApplet(...).');
  }

  const root = await Promise.resolve(definition.render(context));
  const renderTree = {
    kind: 'applet_render_tree',
    schemaVersion: 'recipe_applet_render_tree/v1',
    root
  };

  const testResults: RunnerTestResult[] = [];
  if (testsPath && fs.existsSync(testsPath)) {
    const testsModule = await import(pathToFileURL(path.resolve(testsPath)).href);
    const factory = testsModule.default;
    if (factory) {
      const generatedTests =
        typeof factory === 'function'
          ? await Promise.resolve(factory({ renderTree, manifest, context }))
          : Array.isArray(factory)
            ? factory
            : [];

      for (const testCase of generatedTests) {
        const name = typeof testCase?.name === 'string' && testCase.name.trim().length > 0 ? testCase.name : 'Unnamed applet test';
        try {
          if (!testCase || typeof testCase.run !== 'function') {
            throw new Error('Generated applet test case is missing a run() function.');
          }
          await Promise.resolve(testCase.run({ renderTree, manifest, context }));
          testResults.push({
            name,
            passed: true,
            message: 'Passed.'
          });
        } catch (error) {
          testResults.push({
            name,
            passed: false,
            message: error instanceof Error ? error.message : 'Generated applet test failed.'
          });
        }
      }
    }
  }

  return {
    ok: true,
    renderTree,
    testResults
  };
}

main()
  .then((result) => {
    process.stdout.write(JSON.stringify(result));
  })
  .catch((error) => {
    process.stdout.write(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Recipe applet runner failed.'
      })
    );
  });
