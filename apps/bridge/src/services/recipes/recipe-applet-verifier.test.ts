// @vitest-environment node

import { describe, expect, it } from 'vitest';
import type {
  RecipeActionSpec,
  RecipeAssistantContext,
  RecipeAppletManifest,
  RecipeAppletSourceArtifact,
  RecipeNormalizedData
} from '@noustef-ui/protocol';
import { buildRecipeAppletGeneratedTests } from './recipe-applet-generated-tests';
import type { RecipeAppletRenderContext } from './recipe-applet-types';
import { verifyRecipeApplet } from './recipe-applet-verifier';
import { buildRecipeModel } from './recipe-model';

function createHomeMetadata() {
  return {
    changeVersion: 1,
    auditTags: [],
    homeRecipe: true
  };
}

function createManifest(overrides: Partial<RecipeAppletManifest> = {}): RecipeAppletManifest {
  return {
    kind: 'applet_manifest',
    schemaVersion: 'recipe_applet_manifest/v1',
    sdkVersion: overrides.sdkVersion ?? 'recipe_sdk/v1',
    title: overrides.title ?? 'Hotel shortlist applet',
    summary: overrides.summary ?? 'Compact hotel shortlist applet',
    description: overrides.description ?? 'Renders a small-pane shortlist with actions.',
    requestedCapabilities: overrides.requestedCapabilities ?? [],
    actions: overrides.actions ?? [
      {
        id: 'refresh-recipe',
        label: 'Refresh',
        kind: 'bridge',
        intent: 'secondary',
        description: 'Refresh the recipe.',
        visibility: {
          requiresSelection: 'none',
          whenBuildReady: false
        },
        bridge: {
          handler: 'refresh_space',
          payload: {}
        },
        metadata: {}
      },
      {
        id: 'refine-shortlist',
        label: 'Refine',
        kind: 'prompt',
        intent: 'primary',
        description: 'Ask Hermes to refine the shortlist.',
        visibility: {
          requiresSelection: 'none',
          whenBuildReady: true
        },
        prompt: {
          promptTemplate: 'Refine the shortlist.',
          includeInputs: ['original_prompt', 'normalized_data'],
          allowedMutations: ['raw_data', 'normalized_data', 'ui_spec'],
          outboundRequestsAllowed: false,
          expectedOutput: 'recipe_data_update',
          timeoutMs: 30_000,
          retryable: true
        },
        metadata: {}
      }
    ],
    declaredDatasets: overrides.declaredDatasets ?? ['primary'],
    declaredCollections: overrides.declaredCollections ?? ['primary'],
    declaredTabs: overrides.declaredTabs ?? ['list', 'actions'],
    usesImages: overrides.usesImages ?? true,
    usesTabs: overrides.usesTabs ?? true,
    usesPagination: overrides.usesPagination ?? true,
    supportsPatching: overrides.supportsPatching ?? false,
    smallPaneStrategy: overrides.smallPaneStrategy ?? 'tabbed',
    metadata: overrides.metadata ?? {}
  };
}

function createNormalizedData(): RecipeNormalizedData {
  return {
    kind: 'normalized_data',
    schemaVersion: 'recipe_normalized_data/v1',
    primaryDatasetId: 'primary',
    datasets: [
      {
        id: 'primary',
        label: 'Weekend shortlist',
        kind: 'collection',
        preferredPresentation: 'cards',
        items: [
          {
            id: 'hotel-ardent',
            title: 'Hotel Ardent',
            subtitle: 'Downtown Dayton',
            description: 'Boutique hotel near the theater district.',
            badges: ['walkable'],
            fields: [
              {
                key: 'price',
                label: 'Price',
                value: '$210',
                presentation: 'text',
                emphasis: 'primary'
              }
            ],
            links: [
              {
                label: 'Website',
                url: 'https://example.com/hotel-ardent',
                kind: 'website'
              }
            ],
            metadata: {}
          }
        ],
        fields: [
          {
            key: 'price',
            label: 'Price',
            value: '$210',
            presentation: 'text',
            emphasis: 'primary'
          }
        ],
        stats: [],
        notes: [],
        pageInfo: {
          pageSize: 4,
          totalItems: 1,
          hasMore: false
        },
        metadata: {}
      }
    ],
    summaryStats: [],
    notes: [],
    links: [],
    metadata: {}
  };
}

function createActionSpec(actions: RecipeAppletManifest['actions']): RecipeActionSpec {
  return {
    kind: 'action_spec',
    schemaVersion: 'recipe_action_spec/v1',
    actions
  };
}

function createContext(manifest: RecipeAppletManifest = createManifest()): RecipeAppletRenderContext {
  const normalizedData = createNormalizedData();
  const assistantContext: RecipeAssistantContext = {
    kind: 'assistant_context',
    schemaVersion: 'recipe_assistant_context/v1',
    summary: 'Weekend-friendly downtown hotel shortlist.',
    responseLead: 'Here is a compact shortlist.',
    responseTail: 'I can refine by neighborhood.',
    links: [],
    citations: [],
    metadata: {}
  };
  const recipe = {
    id: 'recipe-hotels',
    title: 'Hotel shortlist',
    description: 'Weekend Dayton options',
    status: 'active' as const,
    metadata: createHomeMetadata()
  };

  return {
    recipe,
    summary: null,
    analysis: null,
    normalizedData,
    assistantContext,
    recipeModel: buildRecipeModel({
      recipe,
      summary: null,
      assistantContext,
      normalizedData,
      actionSpec: createActionSpec(manifest.actions),
      fallback: null
    }).model
  };
}

function createSource(source: string): RecipeAppletSourceArtifact {
  return {
    kind: 'applet_source',
    schemaVersion: 'recipe_applet_source/v1',
    entrypoint: 'default',
    source
  };
}

describe('verifyRecipeApplet', () => {
  it('verifies and renders a valid recipe applet', async () => {
    const manifest = createManifest();
    const context = createContext(manifest);
    const result = await verifyRecipeApplet({
      manifest,
      sourceArtifact: createSource(`import { Badge, Button, ButtonGroup, Card, Heading, Image, Paginator, Stack, Tab, Table, Tabs, Text, defineApplet, refreshRecipe, runPromptAction } from 'recipe-applet-sdk';

export default defineApplet(() => (
  <Stack gap={3}>
    <Heading>Hotel shortlist</Heading>
    <Tabs defaultTabId="list">
      <Tab id="list" label="List">
        <Card title="Overview">
          <Text>Downtown options</Text>
          <Badge>Walkable</Badge>
        </Card>
        <Image src="https://images.example.com/hotel-ardent.jpg" alt="Hotel Ardent exterior" />
        <Table datasetId="primary" fieldKeys={['price']} pageSize={4} />
        <Paginator datasetId="primary" pageSize={4} />
      </Tab>
      <Tab id="actions" label="Actions">
        <ButtonGroup>
          <Button action={refreshRecipe('refresh-recipe')}>Refresh</Button>
          <Button action={runPromptAction('refine-shortlist')} intent="primary">
            Refine
          </Button>
        </ButtonGroup>
      </Tab>
    </Tabs>
  </Stack>
));
`)
      ,
      testArtifact: buildRecipeAppletGeneratedTests(manifest),
      context,
      normalizedData: context.normalizedData
    });
    expect(result.verification.status).toBe('passed');
    expect(result.renderTree?.root).toHaveLength(1);
  });

  it('rejects forbidden imports during static validation', async () => {
    const manifest = createManifest();
    const context = createContext(manifest);
    const result = await verifyRecipeApplet({
      manifest,
      sourceArtifact: createSource(`import { defineApplet, Stack, Text } from 'recipe-applet-sdk';
import fs from 'node:fs';

export default defineApplet(() => (
  <Stack>
    <Text>Unsafe</Text>
  </Stack>
));
`),
      testArtifact: buildRecipeAppletGeneratedTests(manifest),
      context,
      normalizedData: context.normalizedData
    });
    expect(result.verification.status).toBe('failed');
    expect(result.verification.staticValidation.status).toBe('failed');
    expect(result.verification.errors.join(' ')).toContain('Disallowed import "node:fs"');
  });

  it('fails typecheck for broken TSX source', async () => {
    const manifest = createManifest();
    const context = createContext(manifest);
    const result = await verifyRecipeApplet({
      manifest,
      sourceArtifact: createSource(`import { defineApplet, Stack, Text } from 'recipe-applet-sdk';

export default defineApplet(() => (
  <Stack>
    <Text>Broken</Text>
`),
      testArtifact: buildRecipeAppletGeneratedTests(manifest),
      context,
      normalizedData: context.normalizedData
    });
    expect(result.verification.status).toBe('failed');
    expect(result.verification.typecheck.status).toBe('failed');
  });

  it('fails when generated tests fail', async () => {
    const manifest = createManifest();
    const context = createContext(manifest);
    const result = await verifyRecipeApplet({
      manifest,
      sourceArtifact: createSource(`import { Stack, Text, defineApplet } from 'recipe-applet-sdk';

export default defineApplet(() => (
  <Stack>
    <Text>Plain text applet</Text>
  </Stack>
));
`),
      testArtifact: {
        kind: 'applet_test_source',
        schemaVersion: 'recipe_applet_test_source/v1',
        source: `import { defineAppletTests } from 'recipe-applet-test-sdk';

export default defineAppletTests(() => [
  {
    name: 'always fails',
    run() {
      throw new Error('Generated test failed.');
    }
  }
]);
`
      },
      context,
      normalizedData: context.normalizedData
    });
    expect(result.verification.status).toBe('failed');
    expect(result.verification.generatedTests.status).toBe('failed');
    expect(result.verification.errors.join(' ')).toContain('Generated test failed.');
  });

  it('fails compact-pane validation when the applet exceeds density limits', async () => {
    const manifest = createManifest();
    const context = createContext(manifest);
    const result = await verifyRecipeApplet({
      manifest,
      sourceArtifact: createSource(`import { Paginator, Stack, Table, defineApplet } from 'recipe-applet-sdk';

export default defineApplet(() => (
  <Stack>
    <Table datasetId="primary" fieldKeys={['price']} pageSize={8} />
    <Paginator datasetId="primary" pageSize={8} />
  </Stack>
));
`),
      testArtifact: {
        kind: 'applet_test_source',
        schemaVersion: 'recipe_applet_test_source/v1',
        source: `import { defineAppletTests } from 'recipe-applet-test-sdk';

export default defineAppletTests(() => []);
`
      },
      context,
      normalizedData: context.normalizedData
    });

    expect(result.verification.status).toBe('failed');
    expect(result.verification.smallPaneSmoke.status).toBe('failed');
    expect(result.verification.errors.join(' ')).toContain('compact page-size limit');
  });
});
