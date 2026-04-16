// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { buildWorkspaceAppletGeneratedTests } from './workspace-applet-generated-tests';
import { verifyWorkspaceApplet } from './workspace-applet-verifier';
import { buildWorkspaceModel } from './workspace-model';
function createHomeMetadata() {
    return {
        changeVersion: 1,
        auditTags: [],
        homeWorkspace: true
    };
}
function createManifest(overrides = {}) {
    return {
        kind: 'applet_manifest',
        schemaVersion: 'space_applet_manifest/v1',
        sdkVersion: overrides.sdkVersion ?? 'workspace_sdk/v1',
        title: overrides.title ?? 'Hotel shortlist applet',
        summary: overrides.summary ?? 'Compact hotel shortlist applet',
        description: overrides.description ?? 'Renders a small-pane shortlist with actions.',
        requestedCapabilities: overrides.requestedCapabilities ?? [],
        actions: overrides.actions ?? [
            {
                id: 'refresh-space',
                label: 'Refresh',
                kind: 'bridge',
                intent: 'secondary',
                description: 'Refresh the space.',
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
                    expectedOutput: 'space_data_update',
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
function createNormalizedData() {
    return {
        kind: 'normalized_data',
        schemaVersion: 'space_normalized_data/v1',
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
function createActionSpec(actions) {
    return {
        kind: 'action_spec',
        schemaVersion: 'space_action_spec/v1',
        actions
    };
}
function createContext(manifest = createManifest()) {
    const normalizedData = createNormalizedData();
    const assistantContext = {
        kind: 'assistant_context',
        schemaVersion: 'space_assistant_context/v1',
        summary: 'Weekend-friendly downtown hotel shortlist.',
        responseLead: 'Here is a compact shortlist.',
        responseTail: 'I can refine by neighborhood.',
        links: [],
        citations: [],
        metadata: {}
    };
    const space = {
        id: 'space-hotels',
        title: 'Hotel shortlist',
        description: 'Weekend Dayton options',
        status: 'active',
        metadata: createHomeMetadata()
    };
    return {
        space,
        summary: null,
        analysis: null,
        normalizedData,
        assistantContext,
        workspaceModel: buildWorkspaceModel({
            space,
            summary: null,
            assistantContext,
            normalizedData,
            actionSpec: createActionSpec(manifest.actions),
            fallback: null
        }).model
    };
}
function createSource(source) {
    return {
        kind: 'applet_source',
        schemaVersion: 'space_applet_source/v1',
        entrypoint: 'default',
        source
    };
}
describe('verifyWorkspaceApplet', () => {
    it('verifies and renders a valid workspace applet', async () => {
        const manifest = createManifest();
        const context = createContext(manifest);
        const result = await verifyWorkspaceApplet({
            manifest,
            sourceArtifact: createSource(`import { Badge, Button, ButtonGroup, Card, Heading, Image, Paginator, Stack, Tab, Table, Tabs, Text, defineApplet, refreshSpace, runPromptAction } from 'workspace-applet-sdk';

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
          <Button action={refreshSpace('refresh-space')}>Refresh</Button>
          <Button action={runPromptAction('refine-shortlist')} intent="primary">
            Refine
          </Button>
        </ButtonGroup>
      </Tab>
    </Tabs>
  </Stack>
));
`),
            testArtifact: buildWorkspaceAppletGeneratedTests(manifest),
            context,
            normalizedData: context.normalizedData
        });
        expect(result.verification.status).toBe('passed');
        expect(result.renderTree?.root).toHaveLength(1);
    });
    it('rejects forbidden imports during static validation', async () => {
        const manifest = createManifest();
        const context = createContext(manifest);
        const result = await verifyWorkspaceApplet({
            manifest,
            sourceArtifact: createSource(`import { defineApplet, Stack, Text } from 'workspace-applet-sdk';
import fs from 'node:fs';

export default defineApplet(() => (
  <Stack>
    <Text>Unsafe</Text>
  </Stack>
));
`),
            testArtifact: buildWorkspaceAppletGeneratedTests(manifest),
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
        const result = await verifyWorkspaceApplet({
            manifest,
            sourceArtifact: createSource(`import { defineApplet, Stack, Text } from 'workspace-applet-sdk';

export default defineApplet(() => (
  <Stack>
    <Text>Broken</Text>
`),
            testArtifact: buildWorkspaceAppletGeneratedTests(manifest),
            context,
            normalizedData: context.normalizedData
        });
        expect(result.verification.status).toBe('failed');
        expect(result.verification.typecheck.status).toBe('failed');
    });
    it('fails when generated tests fail', async () => {
        const manifest = createManifest();
        const context = createContext(manifest);
        const result = await verifyWorkspaceApplet({
            manifest,
            sourceArtifact: createSource(`import { Stack, Text, defineApplet } from 'workspace-applet-sdk';

export default defineApplet(() => (
  <Stack>
    <Text>Plain text applet</Text>
  </Stack>
));
`),
            testArtifact: {
                kind: 'applet_test_source',
                schemaVersion: 'space_applet_test_source/v1',
                source: `import { defineAppletTests } from 'workspace-applet-test-sdk';

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
        const result = await verifyWorkspaceApplet({
            manifest,
            sourceArtifact: createSource(`import { Paginator, Stack, Table, defineApplet } from 'workspace-applet-sdk';

export default defineApplet(() => (
  <Stack>
    <Table datasetId="primary" fieldKeys={['price']} pageSize={8} />
    <Paginator datasetId="primary" pageSize={8} />
  </Stack>
));
`),
            testArtifact: {
                kind: 'applet_test_source',
                schemaVersion: 'space_applet_test_source/v1',
                source: `import { defineAppletTests } from 'workspace-applet-test-sdk';

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
