import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import type {
  RecipeActionDefinition,
  RecipeAppletManifest,
  RecipeAppletRenderTree,
  RecipeAppletSourceArtifact,
  RecipeAppletTestSourceArtifact,
  RecipeAppletVerification,
  RecipeNormalizedData
} from '@noustef-ui/protocol';
import { RecipeAppletRenderTreeSchema } from '../../../../../packages/protocol/src/schemas';
import { collectRecipeAppletActionIds, collectRecipeAppletNodeKinds, validateRecipeAppletSmallPane } from './recipe-applet-render-tree';
import { validateRecipeAppletModule } from './recipe-applet-static-validation';
import type { RecipeAppletRenderContext } from './recipe-applet-types';

const require = createRequire(import.meta.url);

export interface VerifyRecipeAppletInput {
  manifest: RecipeAppletManifest;
  sourceArtifact: RecipeAppletSourceArtifact;
  testArtifact: RecipeAppletTestSourceArtifact;
  context: RecipeAppletRenderContext;
  normalizedData: RecipeNormalizedData | null;
}

export interface VerifyRecipeAppletResult {
  renderTree: RecipeAppletRenderTree | null;
  verification: RecipeAppletVerification;
}

type RunnerExecutionResult = {
  ok: boolean;
  renderTree?: unknown;
  testResults?: Array<{
    name: string;
    passed: boolean;
    message: string;
  }>;
  error?: string;
};

function writeFile(targetPath: string, content: string) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, 'utf8');
}

function runCommand(command: string, args: string[], cwd: string) {
  return new Promise<{ stdout: string; stderr: string; exitCode: number }>((resolve) => {
    execFile(
      command,
      args,
      {
        cwd,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024
      },
      (error, stdout, stderr) => {
        resolve({
          stdout: typeof stdout === 'string' ? stdout : '',
          stderr: typeof stderr === 'string' ? stderr : '',
          exitCode: error ? 1 : 0
        });
      }
    );
  });
}

function verificationCheck(status: 'passed' | 'failed' | 'skipped', message: string) {
  return {
    status,
    message
  } as const;
}

function createSkippedVerification(message: string): RecipeAppletVerification {
  const checkedAt = new Date().toISOString();
  return {
    kind: 'applet_verification',
    schemaVersion: 'recipe_applet_verification/v1',
    status: 'failed',
    staticValidation: verificationCheck('skipped', message),
    capabilityValidation: verificationCheck('skipped', message),
    typecheck: verificationCheck('skipped', message),
    generatedTests: verificationCheck('skipped', message),
    renderSmoke: verificationCheck('skipped', message),
    smallPaneSmoke: verificationCheck('skipped', message),
    errors: [message],
    warnings: [],
    checkedAt
  };
}

function resolveDatasetReference(datasetId: string, normalizedData: RecipeNormalizedData | null) {
  if (datasetId === 'primary') {
    return normalizedData?.primaryDatasetId ?? normalizedData?.datasets[0]?.id ?? null;
  }

  return datasetId;
}

function buildCapabilityValidation(
  manifest: RecipeAppletManifest,
  normalizedData: RecipeNormalizedData | null
): {
  passed: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const declaredDatasets = new Set(normalizedData?.datasets.map((dataset) => dataset.id) ?? []);
  const capabilityMap = new Map(manifest.requestedCapabilities.map((capability) => [capability.id, capability] as const));

  for (const datasetId of manifest.declaredDatasets) {
    const resolvedDatasetId = resolveDatasetReference(datasetId, normalizedData);
    if (!resolvedDatasetId || !declaredDatasets.has(resolvedDatasetId)) {
      errors.push(`Manifest declared unknown dataset ${datasetId}.`);
    }
  }

  for (const collectionId of manifest.declaredCollections ?? []) {
    const resolvedCollectionId = resolveDatasetReference(collectionId, normalizedData);
    if (!resolvedCollectionId || !declaredDatasets.has(resolvedCollectionId)) {
      errors.push(`Manifest declared unknown collection ${collectionId}.`);
    }
  }

  for (const action of manifest.actions) {
    if (action.kind !== 'bridge' || !action.bridge) {
      continue;
    }

    if (action.bridge.handler === 'applet_capability') {
      const capabilityId = action.bridge.capabilityId?.trim() ?? '';
      if (!capabilityId) {
        errors.push(`Applet bridge action ${action.id} is missing a capability id.`);
        continue;
      }

      const capability = capabilityMap.get(capabilityId);
      if (!capability) {
        errors.push(`Applet bridge action ${action.id} references undeclared capability ${capabilityId}.`);
        continue;
      }

      if (capability.requiresConfirmation && !action.confirmation) {
        errors.push(`Applet bridge action ${action.id} must declare confirmation for capability ${capabilityId}.`);
      }

      if (!['approved_api', 'refresh_space', 'open_link'].includes(capability.kind)) {
        warnings.push(`Capability ${capabilityId} uses ${capability.kind}, which is not executable by the bridge.`);
      }
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings
  };
}

function validateRenderTreeAgainstManifest(
  manifest: RecipeAppletManifest,
  renderTree: RecipeAppletRenderTree,
  normalizedData: RecipeNormalizedData | null
) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const actionIds = new Set(manifest.actions.map((action: RecipeActionDefinition) => action.id));
  const datasetIds = new Set(normalizedData?.datasets.map((dataset) => dataset.id) ?? []);
  const renderedTabIds = new Set<string>();

  for (const actionId of collectRecipeAppletActionIds(renderTree)) {
    if (!actionIds.has(actionId)) {
      errors.push(`Applet render tree references undeclared action ${actionId}.`);
    }
  }

  const visitDatasetReference = (node: RecipeAppletRenderTree['root'][number]) => {
    switch (node.kind) {
        case 'table':
      case 'list':
      case 'detail_panel':
      case 'paginator':
        if (!datasetIds.has(resolveDatasetReference(node.datasetId, normalizedData) ?? '')) {
          errors.push(`Applet node ${node.id} references unknown dataset ${node.datasetId}.`);
        }
        break;
      case 'tabs':
        node.tabs.forEach((tab) => renderedTabIds.add(tab.id));
        break;
      default:
        break;
    }
  };

  const visitNode = (nodes: RecipeAppletRenderTree['root']) => {
    for (const node of nodes) {
      visitDatasetReference(node);
      switch (node.kind) {
        case 'stack':
        case 'inline':
        case 'grid':
        case 'card':
        case 'button_group':
          visitNode(node.children);
          break;
        case 'tabs':
          for (const tab of node.tabs) {
            visitNode(tab.children);
          }
          break;
        default:
          break;
      }
    }
  };
  visitNode(renderTree.root);

  if (manifest.usesTabs && !collectRecipeAppletNodeKinds(renderTree).includes('tabs')) {
    errors.push('Manifest declared usesTabs=true but the applet render tree does not contain tabs.');
  }
  for (const tabId of manifest.declaredTabs ?? []) {
    if (!renderedTabIds.has(tabId)) {
      errors.push(`Manifest declared tab ${tabId} but the applet render tree does not render it.`);
    }
  }
  if (manifest.usesPagination && !collectRecipeAppletNodeKinds(renderTree).includes('paginator')) {
    errors.push('Manifest declared usesPagination=true but the applet render tree does not contain a paginator.');
  }
  if (manifest.usesImages && !collectRecipeAppletNodeKinds(renderTree).includes('image')) {
    errors.push('Manifest declared usesImages=true but the applet render tree does not contain an image.');
  }

  return { errors, warnings };
}

function createRecipeFiles(
  tempDirectory: string,
  input: VerifyRecipeAppletInput,
  sdkSource: string,
  jsxRuntimeSource: string,
  testSdkSource: string
) {
  writeFile(
    path.join(tempDirectory, 'package.json'),
    JSON.stringify(
      {
        name: 'recipe-applet-build',
        private: true,
        type: 'module'
      },
      null,
      2
    )
  );
  writeFile(
    path.join(tempDirectory, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          strict: true,
          jsx: 'react-jsx',
          jsxImportSource: 'recipe-applet-sdk',
          skipLibCheck: true,
          noEmit: true,
          allowSyntheticDefaultImports: true
        },
        include: ['src']
      },
      null,
      2
    )
  );
  writeFile(path.join(tempDirectory, 'context.json'), JSON.stringify(input.context, null, 2));
  writeFile(path.join(tempDirectory, 'manifest.json'), JSON.stringify(input.manifest, null, 2));
  writeFile(path.join(tempDirectory, 'src/applet.tsx'), input.sourceArtifact.source);
  writeFile(path.join(tempDirectory, 'src/applet-tests.ts'), input.testArtifact.source);
  writeFile(
    path.join(tempDirectory, 'node_modules/recipe-applet-sdk/package.json'),
    JSON.stringify(
      {
        name: 'recipe-applet-sdk',
        private: true,
        type: 'module',
        exports: {
          '.': './index.ts',
          './jsx-runtime': './jsx-runtime.ts'
        }
      },
      null,
      2
    )
  );
  writeFile(path.join(tempDirectory, 'node_modules/recipe-applet-sdk/index.ts'), sdkSource);
  writeFile(path.join(tempDirectory, 'node_modules/recipe-applet-sdk/jsx-runtime.ts'), jsxRuntimeSource);
  writeFile(
    path.join(tempDirectory, 'node_modules/recipe-applet-test-sdk/package.json'),
    JSON.stringify(
      {
        name: 'recipe-applet-test-sdk',
        private: true,
        type: 'module',
        exports: {
          '.': './index.ts'
        }
      },
      null,
      2
    )
  );
  writeFile(path.join(tempDirectory, 'node_modules/recipe-applet-test-sdk/index.ts'), testSdkSource);
}

export async function verifyRecipeApplet(input: VerifyRecipeAppletInput): Promise<VerifyRecipeAppletResult> {
  const checkedAt = new Date().toISOString();
  const sourceValidation = validateRecipeAppletModule(input.sourceArtifact.source, {
    fileName: 'applet.tsx',
    kind: 'source'
  });
  const testsValidation = validateRecipeAppletModule(input.testArtifact.source, {
    fileName: 'applet-tests.ts',
    kind: 'tests'
  });

  const staticErrors = [...sourceValidation.errors, ...testsValidation.errors];
  const staticWarnings = [...sourceValidation.warnings, ...testsValidation.warnings];
  if (staticErrors.length > 0) {
    return {
      renderTree: null,
      verification: {
        kind: 'applet_verification',
        schemaVersion: 'recipe_applet_verification/v1',
        status: 'failed',
        staticValidation: verificationCheck('failed', staticErrors.join(' ')),
        capabilityValidation: verificationCheck('skipped', 'Skipped because static validation failed.'),
        typecheck: verificationCheck('skipped', 'Skipped because static validation failed.'),
        generatedTests: verificationCheck('skipped', 'Skipped because static validation failed.'),
        renderSmoke: verificationCheck('skipped', 'Skipped because static validation failed.'),
        smallPaneSmoke: verificationCheck('skipped', 'Skipped because static validation failed.'),
        errors: staticErrors,
        warnings: staticWarnings,
        checkedAt
      }
    };
  }

  const capabilityValidation = buildCapabilityValidation(input.manifest, input.normalizedData);
  if (!capabilityValidation.passed) {
    return {
      renderTree: null,
      verification: {
        kind: 'applet_verification',
        schemaVersion: 'recipe_applet_verification/v1',
        status: 'failed',
        staticValidation: verificationCheck('passed', 'Static validation passed.'),
        capabilityValidation: verificationCheck('failed', capabilityValidation.errors.join(' ')),
        typecheck: verificationCheck('skipped', 'Skipped because capability validation failed.'),
        generatedTests: verificationCheck('skipped', 'Skipped because capability validation failed.'),
        renderSmoke: verificationCheck('skipped', 'Skipped because capability validation failed.'),
        smallPaneSmoke: verificationCheck('skipped', 'Skipped because capability validation failed.'),
        errors: capabilityValidation.errors,
        warnings: [...staticWarnings, ...capabilityValidation.warnings],
        checkedAt
      }
    };
  }

  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'recipe-applet-'));
  try {
    const sdkSource = fs.readFileSync(new URL('./recipe-applet-sdk.ts', import.meta.url), 'utf8');
    const jsxRuntimeSource = "export { Fragment, jsx, jsxs } from './index';\n";
    const testSdkSource = fs.readFileSync(new URL('./recipe-applet-test-sdk.ts', import.meta.url), 'utf8');

    createRecipeFiles(tempDirectory, input, sdkSource, jsxRuntimeSource, testSdkSource);

    const tscPath = require.resolve('typescript/lib/tsc.js');
    const typecheckResult = await runCommand(process.execPath, [tscPath, '-p', path.join(tempDirectory, 'tsconfig.json')], tempDirectory);
    if (typecheckResult.exitCode !== 0) {
      const detail = typecheckResult.stderr.trim() || typecheckResult.stdout.trim() || 'Recipe applet typecheck failed.';
      return {
        renderTree: null,
        verification: {
          kind: 'applet_verification',
          schemaVersion: 'recipe_applet_verification/v1',
          status: 'failed',
          staticValidation: verificationCheck('passed', 'Static validation passed.'),
          capabilityValidation: verificationCheck('passed', 'Capability validation passed.'),
          typecheck: verificationCheck('failed', detail),
          generatedTests: verificationCheck('skipped', 'Skipped because typecheck failed.'),
          renderSmoke: verificationCheck('skipped', 'Skipped because typecheck failed.'),
          smallPaneSmoke: verificationCheck('skipped', 'Skipped because typecheck failed.'),
          errors: [detail],
          warnings: [...staticWarnings, ...capabilityValidation.warnings],
          checkedAt
        }
      };
    }

    const tsxPackageJsonPath = require.resolve('tsx/package.json');
    const tsxCliPath = path.join(path.dirname(tsxPackageJsonPath), 'dist/cli.mjs');
    const runnerResult = await runCommand(
      process.execPath,
      [
        tsxCliPath,
        fileURLToPath(new URL('./recipe-applet-verifier-runner.ts', import.meta.url)),
        path.join(tempDirectory, 'context.json'),
        path.join(tempDirectory, 'manifest.json'),
        path.join(tempDirectory, 'src/applet.tsx'),
        path.join(tempDirectory, 'src/applet-tests.ts')
      ],
      tempDirectory
    );

    const runnerOutput = (runnerResult.stdout.trim() || runnerResult.stderr.trim()) as string;
    if (!runnerOutput) {
      return {
        renderTree: null,
        verification: createSkippedVerification('Recipe applet runner produced no output.')
      };
    }

    let parsedRunnerResult: RunnerExecutionResult;
    try {
      parsedRunnerResult = JSON.parse(runnerOutput) as RunnerExecutionResult;
    } catch (error) {
      return {
        renderTree: null,
        verification: createSkippedVerification(error instanceof Error ? error.message : 'Recipe applet runner returned invalid JSON.')
      };
    }

    if (!parsedRunnerResult.ok) {
      const errorMessage = parsedRunnerResult.error ?? 'Recipe applet render smoke failed.';
      return {
        renderTree: null,
        verification: {
          kind: 'applet_verification',
          schemaVersion: 'recipe_applet_verification/v1',
          status: 'failed',
          staticValidation: verificationCheck('passed', 'Static validation passed.'),
          capabilityValidation: verificationCheck('passed', 'Capability validation passed.'),
          typecheck: verificationCheck('passed', 'Typecheck passed.'),
          generatedTests: verificationCheck('skipped', 'Skipped because render failed before tests completed.'),
          renderSmoke: verificationCheck('failed', errorMessage),
          smallPaneSmoke: verificationCheck('skipped', 'Skipped because render smoke failed.'),
          errors: [errorMessage],
          warnings: [...staticWarnings, ...capabilityValidation.warnings],
          checkedAt
        }
      };
    }

    let renderTree: RecipeAppletRenderTree;
    try {
      renderTree = RecipeAppletRenderTreeSchema.parse(parsedRunnerResult.renderTree);
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Recipe applet render output did not match the render-tree schema.';
      return {
        renderTree: null,
        verification: {
          kind: 'applet_verification',
          schemaVersion: 'recipe_applet_verification/v1',
          status: 'failed',
          staticValidation: verificationCheck('passed', 'Static validation passed.'),
          capabilityValidation: verificationCheck('passed', 'Capability validation passed.'),
          typecheck: verificationCheck('passed', 'Typecheck passed.'),
          generatedTests: verificationCheck('skipped', 'Skipped because render output was invalid.'),
          renderSmoke: verificationCheck('failed', detail),
          smallPaneSmoke: verificationCheck('skipped', 'Skipped because render output was invalid.'),
          errors: [detail],
          warnings: [...staticWarnings, ...capabilityValidation.warnings],
          checkedAt
        }
      };
    }
    const renderTreeValidation = validateRenderTreeAgainstManifest(input.manifest, renderTree, input.normalizedData);
    const smallPaneErrors = validateRecipeAppletSmallPane(renderTree);
    const generatedTestFailures = (parsedRunnerResult.testResults ?? []).filter((result) => !result.passed);

    const errors = [...renderTreeValidation.errors, ...smallPaneErrors, ...generatedTestFailures.map((result) => result.message)];
    const warnings = [...staticWarnings, ...capabilityValidation.warnings, ...renderTreeValidation.warnings];
    const verification: RecipeAppletVerification = {
      kind: 'applet_verification',
      schemaVersion: 'recipe_applet_verification/v1',
      status: errors.length === 0 ? 'passed' : 'failed',
      staticValidation: verificationCheck('passed', 'Static validation passed.'),
      capabilityValidation: verificationCheck('passed', 'Capability validation passed.'),
      typecheck: verificationCheck('passed', 'Typecheck passed.'),
      generatedTests:
        generatedTestFailures.length === 0
          ? verificationCheck('passed', 'Generated applet tests passed.')
          : verificationCheck('failed', generatedTestFailures.map((result) => result.message).join(' ')),
      renderSmoke:
        renderTreeValidation.errors.length === 0
          ? verificationCheck('passed', 'Render smoke passed.')
          : verificationCheck('failed', renderTreeValidation.errors.join(' ')),
      smallPaneSmoke:
        smallPaneErrors.length === 0
          ? verificationCheck('passed', 'Small-pane smoke passed.')
          : verificationCheck('failed', smallPaneErrors.join(' ')),
      errors,
      warnings,
      checkedAt
    };

    return {
      renderTree,
      verification
    };
  } finally {
    fs.rmSync(tempDirectory, {
      recursive: true,
      force: true
    });
  }
}
