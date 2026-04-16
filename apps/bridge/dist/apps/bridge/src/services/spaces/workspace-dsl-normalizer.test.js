// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { normalizeWorkspaceDsl } from './workspace-dsl-normalizer';
function createBaseModel() {
    return {
        kind: 'workspace_model',
        schemaVersion: 'space_workspace_model/v1',
        sdkVersion: 'workspace_sdk/v1',
        revision: 1,
        title: 'Inbox triage',
        subtitle: 'Unread messages',
        description: 'Baseline workspace summary.',
        status: 'active',
        entities: [
            {
                id: 'email-1',
                kind: 'gmail_message',
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
                    },
                    {
                        key: 'subject',
                        label: 'Subject',
                        value: 'Quarterly update',
                        presentation: 'text',
                        emphasis: 'primary'
                    }
                ],
                links: [],
                stats: [],
                notes: [],
                metadata: {}
            }
        ],
        collections: [
            {
                id: 'primary',
                label: 'Unread email',
                entityKind: 'gmail_message',
                entityIds: ['email-1'],
                preferredView: 'table',
                fieldKeys: ['sender', 'subject'],
                pageSize: 6,
                selectionMode: 'single',
                detailEntityId: 'email-1',
                filterKeys: ['sender'],
                emptyState: {
                    title: 'No email',
                    description: 'Nothing is available for this collection yet.'
                },
                metadata: {}
            }
        ],
        views: [
            {
                id: 'view-overview',
                label: 'Overview',
                sectionIds: ['section-summary', 'section-primary'],
                layout: 'stack',
                metadata: {}
            }
        ],
        sections: [
            {
                id: 'section-summary',
                kind: 'summary',
                title: 'Summary',
                description: 'Baseline summary',
                collectionId: null,
                entityId: null,
                actionIds: [],
                fieldKeys: [],
                status: 'ready',
                body: '### Baseline summary',
                metadata: {}
            },
            {
                id: 'section-primary',
                kind: 'table',
                title: 'Unread email',
                description: 'Baseline dataset section',
                collectionId: 'primary',
                entityId: null,
                actionIds: ['refresh-space'],
                fieldKeys: ['sender', 'subject'],
                status: 'ready',
                body: undefined,
                emptyState: {
                    title: 'No email',
                    description: 'Nothing is available for this section yet.'
                },
                metadata: {}
            }
        ],
        tabs: [
            {
                id: 'tab-overview',
                label: 'Overview',
                viewId: 'view-overview',
                status: 'ready',
                metadata: {}
            }
        ],
        actions: [
            {
                id: 'refresh-space',
                label: 'Refresh',
                kind: 'bridge',
                intent: 'primary',
                description: 'Refresh the workspace.',
                visibility: {
                    requiresSelection: 'none',
                    whenBuildReady: true
                },
                bridge: {
                    handler: 'refresh_space',
                    payload: {}
                },
                metadata: {}
            },
            {
                id: 'retry-build',
                label: 'Retry',
                kind: 'bridge',
                intent: 'secondary',
                description: 'Retry the enrichment build.',
                visibility: {
                    requiresSelection: 'none',
                    whenBuildReady: true
                },
                bridge: {
                    handler: 'retry_build',
                    payload: {}
                },
                metadata: {}
            }
        ],
        state: {
            activeTabId: 'tab-overview',
            collectionState: {},
            formState: {},
            actionState: {},
            localState: {}
        },
        metadata: {
            primaryCollectionId: 'primary'
        }
    };
}
describe('workspace DSL normalizer', () => {
    it('coerces alias-heavy authoring DSL input into the canonical v2 shape', () => {
        const result = normalizeWorkspaceDsl({
            baseModel: createBaseModel(),
            assistantSummary: 'Assistant summary fallback.',
            dsl: {
                kind: 'workspace_dsl',
                schemaVersion: 'space_workspace_dsl/v2',
                description: 'Use the description alias as the DSL summary.',
                tabs: [
                    {
                        id: 'tab-main',
                        label: 'Overview',
                        sectionIds: ['section-results']
                    }
                ],
                collections: [
                    {
                        id: 'primary',
                        label: 'Unread email',
                        preferredView: 'table',
                        fieldKeys: ['sender', 'subject']
                    }
                ],
                sections: [
                    {
                        id: 'section-results',
                        kind: 'table',
                        title: 'Unread email',
                        collectionId: 'primary',
                        fieldKeys: ['sender', 'subject'],
                        actions: ['refresh-space'],
                        unknownSectionKey: true
                    }
                ],
                actions: ['refresh-space'],
                semanticHints: {
                    primaryCollectionId: 'primary'
                }
            }
        });
        expect(result.errors).toEqual([]);
        expect(result.dsl?.schemaVersion).toBe('space_workspace_dsl/v2');
        expect(result.dsl?.summary).toBe('Use the description alias as the DSL summary.');
        expect(result.dsl?.datasets[0]?.id).toBe('primary');
        expect(result.dsl?.sections[0]?.type).toBe('dataset');
        expect(result.repairs.aliasMappings).toContain('collections -> datasets');
        expect(result.repairs.defaultedFields).toContain('summary');
        expect(result.repairs.normalizedSynonyms.some((entry) => entry.includes('table'))).toBe(true);
        expect(result.model?.sections[0]?.kind).toBe('table');
    });
    it('converts the legacy v1 strict graph artifact into the v2 authoring DSL before translation', () => {
        const result = normalizeWorkspaceDsl({
            baseModel: createBaseModel(),
            dsl: {
                kind: 'workspace_dsl',
                schemaVersion: 'space_workspace_dsl/v1',
                sdkVersion: 'workspace_sdk/v1',
                summary: 'Legacy strict graph artifact.',
                workspace: {
                    title: 'Legacy workspace',
                    subtitle: 'Legacy subtitle',
                    description: 'Legacy description',
                    status: 'active',
                    primaryTabId: 'tab-legacy',
                    metadata: {}
                },
                entities: [],
                collections: [
                    {
                        id: 'primary',
                        label: 'Unread email',
                        entityKind: 'gmail_message',
                        entityIds: ['email-1'],
                        preferredView: 'table',
                        fieldKeys: ['sender', 'subject'],
                        pageSize: 6,
                        selectionMode: 'single',
                        detailEntityId: 'email-1',
                        filterKeys: ['sender'],
                        emptyState: {
                            title: 'No email',
                            description: 'Nothing is available for this collection yet.'
                        },
                        metadata: {}
                    }
                ],
                views: [
                    {
                        id: 'view-legacy',
                        label: 'Overview',
                        sectionIds: ['section-legacy'],
                        layout: 'stack',
                        metadata: {}
                    }
                ],
                sections: [
                    {
                        id: 'section-legacy',
                        kind: 'detail_panel',
                        title: 'Details',
                        description: 'Inspect the selected record.',
                        collectionId: 'primary',
                        entityId: 'email-1',
                        actionIds: ['refresh-space'],
                        fieldKeys: ['sender', 'subject'],
                        status: 'ready',
                        metadata: {}
                    }
                ],
                tabs: [
                    {
                        id: 'tab-legacy',
                        label: 'Overview',
                        viewId: 'view-legacy',
                        status: 'ready',
                        metadata: {}
                    }
                ],
                actions: [],
                operations: [],
                semanticHints: {
                    primaryCollectionId: 'primary',
                    preferredLayout: 'stack',
                    preferredSectionKinds: [],
                    notes: [],
                    narrowPaneStrategy: 'stack'
                },
                metadata: {}
            }
        });
        expect(result.errors).toEqual([]);
        expect(result.warnings.some((warning) => warning.includes('legacy strict workspace DSL artifact'))).toBe(true);
        expect(result.dsl?.schemaVersion).toBe('space_workspace_dsl/v2');
        expect(result.dsl?.sections[0]?.type).toBe('detail');
        expect(result.dsl?.tabs[0]?.sectionIds).toEqual(['section-legacy']);
        expect(result.model?.sections[0]?.kind).toBe('detail_panel');
    });
    it('drops unknown references and keeps a valid enriched workspace when ambiguity is low', () => {
        const result = normalizeWorkspaceDsl({
            baseModel: createBaseModel(),
            dsl: {
                kind: 'workspace_dsl',
                schemaVersion: 'space_workspace_dsl/v2',
                summary: 'Keep the valid summary and drop bad references.',
                tabs: [
                    {
                        id: 'tab-overview',
                        label: 'Overview',
                        sectionIds: ['section-summary', 'section-results'],
                        layout: 'stack',
                        metadata: {}
                    }
                ],
                datasets: [
                    {
                        id: 'unknown-dataset',
                        title: 'Should be dropped',
                        fields: [],
                        focusEntityId: null,
                        notes: [],
                        metadata: {}
                    }
                ],
                sections: [
                    {
                        id: 'section-summary',
                        type: 'summary',
                        title: 'Summary',
                        body: '### Summary',
                        fields: [],
                        entityIds: [],
                        actionIds: [],
                        links: [],
                        media: [],
                        stats: [],
                        metadata: {}
                    },
                    {
                        id: 'section-results',
                        type: 'dataset',
                        title: 'Results',
                        datasetId: 'primary',
                        fields: ['sender', 'missing-field'],
                        entityIds: ['email-1', 'missing-entity'],
                        actionIds: ['refresh-space', 'missing-action'],
                        links: [],
                        media: [],
                        stats: [],
                        metadata: {}
                    }
                ],
                actions: [
                    {
                        kind: 'existing_action',
                        id: 'missing-action',
                        placement: 'toolbar',
                        metadata: {}
                    }
                ],
                notes: [],
                operations: [],
                semanticHints: {
                    primaryDatasetId: 'primary',
                    notes: [],
                    narrowPaneStrategy: 'stack'
                },
                metadata: {}
            }
        });
        expect(result.errors).toEqual([]);
        expect(result.warnings.some((warning) => warning.includes('Dropped unknown dataset override unknown-dataset'))).toBe(true);
        expect(result.warnings.some((warning) => warning.includes('Dropped unavailable action ids from section section-results'))).toBe(true);
        expect(result.model?.sections.find((section) => section.id === 'section-results')?.fieldKeys).toEqual(['sender']);
        expect(result.model?.sections.find((section) => section.id === 'section-results')?.actionIds).toEqual(['refresh-space']);
    });
});
