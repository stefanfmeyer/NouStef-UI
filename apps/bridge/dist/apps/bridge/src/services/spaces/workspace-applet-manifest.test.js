// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { analyzeWorkspaceAppletModule } from './workspace-applet-static-validation';
import { synthesizeWorkspaceAppletManifest } from './workspace-applet-manifest';
import { buildWorkspaceModel } from './workspace-model';
function createHomeMetadata() {
    return {
        changeVersion: 1,
        auditTags: [],
        homeWorkspace: true
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
                label: 'Inbox',
                kind: 'collection',
                preferredPresentation: 'table',
                items: [
                    {
                        id: 'email-1',
                        title: 'Quarterly update',
                        subtitle: 'finance@example.com',
                        description: 'Review the attached plan.',
                        badges: ['unread'],
                        fields: [
                            {
                                key: 'sender',
                                label: 'Sender',
                                value: 'finance@example.com',
                                presentation: 'text',
                                emphasis: 'primary'
                            }
                        ],
                        links: [],
                        metadata: {}
                    }
                ],
                fields: [
                    {
                        key: 'sender',
                        label: 'Sender',
                        value: 'finance@example.com',
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
function createActionSpec() {
    return {
        kind: 'action_spec',
        schemaVersion: 'space_action_spec/v1',
        actions: [
            {
                id: 'refresh-space',
                label: 'Refresh',
                kind: 'prompt',
                intent: 'primary',
                description: 'Refresh the inbox summary.',
                visibility: {
                    requiresSelection: 'none',
                    whenBuildReady: true
                },
                prompt: {
                    promptTemplate: 'Refresh the inbox summary.',
                    includeInputs: ['original_prompt', 'normalized_data'],
                    allowedMutations: ['raw_data', 'normalized_data', 'assistant_response'],
                    outboundRequestsAllowed: true,
                    expectedOutput: 'space_data_update',
                    timeoutMs: 120_000,
                    retryable: true
                },
                metadata: {}
            },
            {
                id: 'refine-selection',
                label: 'Refine',
                kind: 'prompt',
                intent: 'secondary',
                description: 'Focus on the selected email.',
                visibility: {
                    requiresSelection: 'single',
                    whenBuildReady: true,
                    datasetId: 'primary'
                },
                prompt: {
                    promptTemplate: 'Focus on the selected email.',
                    includeInputs: ['selected_items', 'normalized_data'],
                    allowedMutations: ['raw_data', 'normalized_data', 'assistant_response'],
                    outboundRequestsAllowed: false,
                    expectedOutput: 'space_data_update',
                    timeoutMs: 60_000,
                    retryable: true
                },
                metadata: {}
            },
            {
                id: 'retry-build',
                label: 'Retry build',
                kind: 'bridge',
                intent: 'secondary',
                description: 'Retry the applet build.',
                visibility: {
                    requiresSelection: 'none',
                    whenBuildReady: false
                },
                bridge: {
                    handler: 'applet_capability',
                    capabilityId: 'retry-build-capability',
                    payload: {
                        operation: 'retry_build'
                    }
                },
                metadata: {}
            }
        ]
    };
}
describe('workspace applet manifest synthesis', () => {
    it('derives the manifest locally from source analysis and persisted action metadata', () => {
        const source = `import {
  Button,
  ButtonGroup,
  Card,
  Heading,
  Image,
  Input,
  Paginator,
  Select,
  Stack,
  Tab,
  Table,
  Tabs,
  Text,
  Textarea,
  callApprovedApi,
  defineApplet,
  refreshSpace,
  runPromptAction,
  useFilters,
  usePagination,
  useSelection
} from 'workspace-applet-sdk';

export default defineApplet(() => {
  useSelection('primary');
  usePagination('primary', { pageSize: 4 });
  useFilters('primary', ['sender'], 'Filter inbox');

  return (
    <Stack gap={3}>
      <Heading>Inbox summary</Heading>
      <Tabs defaultTabId="results">
        <Tab id="results" label="Results">
          <Card title="Inbox">
            <Text>Unread highlights</Text>
          </Card>
          <Image src="https://images.example.com/inbox.png" alt="Inbox preview" />
          <Table datasetId="primary" fieldKeys={['sender']} pageSize={4} />
          <Paginator datasetId="primary" pageSize={4} />
          <Input fieldKey="query" label="Query" />
          <Select fieldKey="label" label="Label" options={[{ label: 'Inbox', value: 'inbox' }]} />
          <Textarea fieldKey="notes" label="Notes" />
        </Tab>
        <Tab id="actions" label="Actions">
          <ButtonGroup>
            <Button action={refreshSpace('refresh-space')}>Refresh</Button>
            <Button action={runPromptAction('refine-selection')}>Refine</Button>
            <Button action={callApprovedApi('retry-build')}>Retry build</Button>
          </ButtonGroup>
        </Tab>
      </Tabs>
    </Stack>
  );
});
`;
        const analysis = analyzeWorkspaceAppletModule(source, {
            fileName: 'applet.tsx',
            kind: 'source'
        });
        const workspaceModel = buildWorkspaceModel({
            space: {
                id: 'space-inbox',
                title: 'Inbox summary',
                description: 'Unread email overview',
                status: 'active',
                metadata: createHomeMetadata()
            },
            summary: null,
            assistantContext: {
                kind: 'assistant_context',
                schemaVersion: 'space_assistant_context/v1',
                summary: 'Unread email overview.',
                responseLead: 'Here is the inbox summary.',
                responseTail: 'I can refine the selection.',
                links: [],
                citations: [],
                metadata: {}
            },
            normalizedData: createNormalizedData(),
            actionSpec: createActionSpec(),
            fallback: null
        }).model;
        const result = synthesizeWorkspaceAppletManifest({
            space: {
                title: 'Inbox summary',
                description: 'Unread email overview'
            },
            intent: {
                category: 'results',
                label: 'inbox summary',
                summary: 'Summarize unread email.'
            },
            normalizedData: createNormalizedData(),
            summary: null,
            assistantContext: {
                kind: 'assistant_context',
                schemaVersion: 'space_assistant_context/v1',
                summary: 'Unread email overview.',
                responseLead: 'Here is the inbox summary.',
                responseTail: 'I can refine the selection.',
                links: [],
                citations: [],
                metadata: {}
            },
            actionSpec: createActionSpec(),
            workspaceModel,
            analysis
        });
        expect(result.errors).toEqual([]);
        expect(result.manifest?.actions.map((action) => action.id)).toEqual(['refresh-space', 'refine-selection', 'retry-build']);
        expect(result.manifest?.declaredDatasets).toEqual(['primary']);
        expect(result.manifest?.declaredCollections).toEqual(['primary']);
        expect(result.manifest?.declaredTabs).toHaveLength(2);
        expect(result.manifest?.declaredTabs).toEqual(expect.arrayContaining(['results', 'actions']));
        expect(result.manifest?.usesImages).toBe(true);
        expect(result.manifest?.usesTabs).toBe(true);
        expect(result.manifest?.usesPagination).toBe(true);
        expect(result.manifest?.supportsPatching).toBe(false);
        expect(result.manifest?.smallPaneStrategy).toBe('tabbed');
        expect(result.manifest?.requestedCapabilities.map((capability) => capability.id)).toEqual([
            'retry-build-capability',
            'network-image'
        ]);
        expect(result.manifest?.metadata.sourceFeatures).toMatchObject({
            usesForms: true,
            usesFilters: true,
            usesSelection: true,
            usesPagination: true
        });
        expect(result.manifest?.sdkVersion).toBe('workspace_sdk/v1');
    });
    it('fails closed when the source does not expose literal action ids or collection ids', () => {
        const source = `import { Button, Table, defineApplet, runPromptAction } from 'workspace-applet-sdk';

const dynamicActionId = 'refine-selection';
const dynamicDatasetId = 'primary';

export default defineApplet(() => (
  <>
    <Button action={runPromptAction(dynamicActionId)}>Refine</Button>
    <Table datasetId={dynamicDatasetId} fieldKeys={['sender']} />
  </>
));
`;
        const analysis = analyzeWorkspaceAppletModule(source, {
            fileName: 'applet.tsx',
            kind: 'source'
        });
        const result = synthesizeWorkspaceAppletManifest({
            space: {
                title: 'Inbox summary',
                description: 'Unread email overview'
            },
            intent: {
                category: 'results',
                label: 'inbox summary',
                summary: 'Summarize unread email.'
            },
            normalizedData: createNormalizedData(),
            summary: null,
            assistantContext: null,
            actionSpec: createActionSpec(),
            workspaceModel: null,
            analysis
        });
        expect(result.manifest).toBeNull();
        expect(result.errors.join(' ')).toContain('literal action id');
        expect(result.errors.join(' ')).toContain('literal collectionId');
    });
});
