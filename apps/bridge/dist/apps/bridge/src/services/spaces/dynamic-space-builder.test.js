// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { extractHermesSpaceDataEnvelope } from './dynamic-space-contract';
import { buildDynamicSpaceArtifacts, deriveNormalizedDataFromRawData, runSpaceTestHarness } from './home-workspace-compiler';
function createRawEnvelope() {
    return {
        schemaVersion: 'hermes_space_seed/v1',
        space: {
            title: 'Hotel shortlist',
            description: 'Weekend Dayton options',
            status: 'active',
            preferredPresentation: 'cards'
        },
        rawData: {
            kind: 'raw_data',
            schemaVersion: 'space_raw_data/v1',
            payload: {
                hotels: [
                    {
                        id: 'hotel-ardent',
                        name: 'Hotel Ardent',
                        location: 'Downtown Dayton',
                        price: '$210',
                        website: 'https://example.com/hotel-ardent'
                    },
                    {
                        id: 'ac-hotel-dayton',
                        name: 'AC Hotel Dayton',
                        location: 'Dayton core',
                        price: '$189',
                        website: 'https://example.com/ac-hotel-dayton'
                    }
                ]
            },
            links: [
                {
                    label: 'Downtown hotels',
                    url: 'https://example.com/dayton-hotels',
                    kind: 'website'
                }
            ],
            paginationHints: [
                {
                    datasetId: 'primary',
                    pageSize: 4,
                    totalItems: 2,
                    hasMore: false
                }
            ],
            metadata: {}
        },
        normalizedData: {
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
                            description: 'Boutique stay with a walkable downtown location.',
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
                        },
                        {
                            id: 'ac-hotel-dayton',
                            title: 'AC Hotel Dayton',
                            subtitle: 'Dayton core',
                            description: 'Modern downtown stay with breakfast nearby.',
                            badges: ['modern'],
                            fields: [
                                {
                                    key: 'price',
                                    label: 'Price',
                                    value: '$189',
                                    presentation: 'text',
                                    emphasis: 'primary'
                                }
                            ],
                            links: [
                                {
                                    label: 'Website',
                                    url: 'https://example.com/ac-hotel-dayton',
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
                    stats: [
                        {
                            id: 'stat-results',
                            label: 'Options',
                            value: '2',
                            emphasis: 'primary',
                            tone: 'info'
                        }
                    ],
                    notes: ['Favor walkable downtown options.'],
                    pageInfo: {
                        pageSize: 4,
                        totalItems: 2,
                        hasMore: false
                    },
                    metadata: {}
                }
            ],
            summaryStats: [
                {
                    id: 'stat-results',
                    label: 'Options',
                    value: '2',
                    emphasis: 'primary',
                    tone: 'info'
                }
            ],
            notes: ['Favor walkable downtown options.'],
            links: [
                {
                    label: 'Downtown hotels',
                    url: 'https://example.com/dayton-hotels',
                    kind: 'website'
                }
            ],
            metadata: {}
        },
        assistantContext: {
            kind: 'assistant_context',
            schemaVersion: 'space_assistant_context/v1',
            summary: 'I assembled a compact shortlist of weekend-friendly boutique hotel options.',
            responseLead: 'Here is a compact shortlist.',
            responseTail: 'I can refine the list by neighborhood or budget.',
            links: [
                {
                    label: 'Downtown hotels',
                    url: 'https://example.com/dayton-hotels',
                    kind: 'website'
                }
            ],
            citations: [],
            metadata: {}
        },
        intentHints: {
            category: 'places',
            label: 'nearby shortlist',
            summary: 'Weekend hotel shortlist in Dayton.',
            preferredPresentation: 'cards',
            allowOutboundRequests: true,
            destructiveIntent: false
        }
    };
}
function createEnvelope() {
    const extracted = extractHermesSpaceDataEnvelope(JSON.stringify(createRawEnvelope()), {
        mode: 'structured_only'
    });
    if (!extracted.envelope) {
        throw new Error('Expected a valid Hermes space envelope test fixture.');
    }
    return extracted.envelope;
}
function collectNodeKinds(nodes) {
    const kinds = [];
    const visit = (currentNodes) => {
        for (const node of currentNodes) {
            kinds.push(node.kind);
            if (Array.isArray(node.children)) {
                visit(node.children);
            }
            if (Array.isArray(node.tabs)) {
                for (const tab of node.tabs) {
                    visit(tab.children);
                }
            }
        }
    };
    visit(nodes);
    return kinds;
}
describe('dynamic space data contract', () => {
    it('extracts a hermes-space-data fenced block and strips it from the assistant markdown', () => {
        const envelope = createRawEnvelope();
        const extracted = extractHermesSpaceDataEnvelope(`Here is the shortlist.

\`\`\`hermes-space-data
${JSON.stringify(envelope)}
\`\`\`

I can refine it further.`);
        expect(extracted.errors).toEqual([]);
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.cleanedMarkdown).toBe('Here is the shortlist.\n\nI can refine it further.');
    });
    it('recovers a missing closing fence when the JSON payload is still balanced and schema-valid', () => {
        const envelope = createRawEnvelope();
        const extracted = extractHermesSpaceDataEnvelope(`Done.

\`\`\`hermes-space-data
${JSON.stringify(envelope)}`);
        expect(extracted.errors).toEqual([]);
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.cleanedMarkdown).toBe('Done.');
        expect(extracted.warnings).toContain('Recovered a Hermes space-data block that was missing the closing fence.');
    });
    it('parses the first balanced JSON object after the start marker and ignores trailing junk when the closing fence is missing', () => {
        const envelope = createRawEnvelope();
        const extracted = extractHermesSpaceDataEnvelope(`Done.

\`\`\`hermes-space-data
Ignore this lead-in and use the first balanced object.
${JSON.stringify(envelope)}

Trailing notes that should be ignored.`);
        expect(extracted.errors).toEqual([]);
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.cleanedMarkdown).toBe('Done.');
        expect(extracted.warnings).toContain('Recovered a Hermes space-data block that was missing the closing fence.');
        expect(extracted.warnings).toContain('Ignored non-JSON prose inside the Hermes space-data block.');
    });
    it('leaves the assistant markdown untouched when no hermes-space-data marker is present', () => {
        const extracted = extractHermesSpaceDataEnvelope('Done.\n\nNo structured payload was emitted.');
        expect(extracted.envelope).toBeNull();
        expect(extracted.cleanedMarkdown).toBe('Done.\n\nNo structured payload was emitted.');
        expect(extracted.foundFence).toBe(false);
    });
    it('strips an unrecoverable missing-closing-fence block from the visible assistant markdown and reports a parse error', () => {
        const extracted = extractHermesSpaceDataEnvelope(`Done.

\`\`\`hermes-space-data
{"schemaVersion":"hermes_space_data/v1","space":{"title":"Broken"}`);
        expect(extracted.envelope).toBeNull();
        expect(extracted.cleanedMarkdown).toBe('Done.');
        expect(extracted.failureKind).toBe('schema_invalid');
        expect(extracted.parserDiagnostics.recoveryStrategiesSucceeded).toContain('complete_trailing_delimiters');
    });
    it('fails safely when the start marker is present but the JSON payload stays unbalanced', () => {
        const extracted = extractHermesSpaceDataEnvelope(`Done.

\`\`\`hermes-space-data
This is still broken.
{"schemaVersion":"hermes_space_data/v1","space":{"title":"Broken"}
Trailing prose after the broken payload.`);
        expect(extracted.envelope).toBeNull();
        expect(extracted.cleanedMarkdown).toBe('Done.');
        expect(extracted.failureKind).toBe('json_invalid');
        expect(extracted.errors[0]).toContain('Expected');
    });
    it('accepts structured-only output without a closing fence when the marker is followed immediately by balanced JSON', () => {
        const envelope = createRawEnvelope();
        const extracted = extractHermesSpaceDataEnvelope(`\`\`\`hermes-space-data
${JSON.stringify(envelope)}`, {
            mode: 'structured_only'
        });
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.cleanedMarkdown).toBe('');
        expect(extracted.errors).toEqual([]);
        expect(extracted.failureKind).toBeNull();
    });
    it('accepts direct JSON structured-only output without requiring a marker', () => {
        const envelope = createRawEnvelope();
        const extracted = extractHermesSpaceDataEnvelope(JSON.stringify(envelope), {
            mode: 'structured_only'
        });
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.strategy).toBe('direct_json');
        expect(extracted.cleanedMarkdown).toBe('');
        expect(extracted.errors).toEqual([]);
    });
    it('recovers direct JSON structured-only output with trailing junk after the balanced payload', () => {
        const envelope = createRawEnvelope();
        const extracted = extractHermesSpaceDataEnvelope(`${JSON.stringify(envelope)}\n\nTrailing prose.`, {
            mode: 'structured_only'
        });
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.strategy).toBe('direct_json');
        expect(extracted.recovered).toBe(true);
    });
    it('recovers structured-only output with prose before and after the first valid JSON object', () => {
        const envelope = createRawEnvelope();
        const extracted = extractHermesSpaceDataEnvelope(`I should not have added this intro.\n${JSON.stringify(envelope)}\nTrailing prose.`, {
            mode: 'structured_only'
        });
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.recovered).toBe(true);
        expect(extracted.parserDiagnostics.leadingProse).toBe(true);
        expect(extracted.parserDiagnostics.trailingProse).toBe(true);
        expect(extracted.diagnostics.some((diagnostic) => diagnostic.code === 'SPACE_DATA_BLOCK_PROSE_IGNORED')).toBe(true);
    });
    it('recovers a structured-only response that is missing only the final closing delimiter', () => {
        const envelope = createRawEnvelope();
        const rawJson = JSON.stringify(envelope);
        const extracted = extractHermesSpaceDataEnvelope(rawJson.slice(0, -1), {
            mode: 'structured_only'
        });
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.recovered).toBe(true);
        expect(extracted.parserDiagnostics.recoveryStrategiesSucceeded).toContain('complete_trailing_delimiters');
        expect(extracted.diagnostics.some((diagnostic) => diagnostic.code === 'SPACE_DATA_BLOCK_JSON_DELIMITER_COMPLETED')).toBe(true);
    });
    it('drops an invalid optional normalizedData extension without failing the base artifact', () => {
        const rawEnvelope = {
            ...createRawEnvelope(),
            normalizedData: {
                kind: 'normalized_data',
                schemaVersion: 'space_normalized_data/v1',
                primaryDatasetId: 'primary',
                datasets: [],
                summaryStats: [],
                notes: [
                    {
                        invalid: true
                    }
                ],
                links: [],
                metadata: {}
            }
        };
        const extracted = extractHermesSpaceDataEnvelope(JSON.stringify(rawEnvelope), {
            mode: 'structured_only'
        });
        expect(extracted.errors).toEqual([]);
        expect(extracted.envelope?.space.title).toBe('Hotel shortlist');
        expect(extracted.envelope?.optionalExtensions.normalizedData).toBeUndefined();
        expect(extracted.diagnostics.some((diagnostic) => diagnostic.code === 'SPACE_DATA_OPTIONAL_EXTENSION_DROPPED')).toBe(true);
    });
    it('treats a marker-only structured-only response as an explicit empty-payload failure', () => {
        const extracted = extractHermesSpaceDataEnvelope(`\`\`\`hermes-space-data
`, {
            mode: 'structured_only'
        });
        expect(extracted.envelope).toBeNull();
        expect(extracted.failureKind).toBe('empty_payload');
        expect(extracted.errors[0]).toContain('was empty');
        expect(extracted.diagnostics.some((diagnostic) => diagnostic.code === 'SPACE_DATA_BLOCK_EMPTY')).toBe(true);
    });
    it('fails loudly when a structured-only response has unrecoverable malformed nesting', () => {
        const extracted = extractHermesSpaceDataEnvelope(`\`\`\`hermes-space-data
I forgot the contract.
{"schemaVersion":"hermes_space_seed/v1","space":{"title":"Broken"}]`, {
            mode: 'structured_only'
        });
        expect(extracted.envelope).toBeNull();
        expect(extracted.failureKind).toBe('json_invalid');
        expect(extracted.errors[0]).toContain('mismatched JSON closing delimiters');
    });
    it('treats a structured-only response with no marker as a missing-marker failure', () => {
        const extracted = extractHermesSpaceDataEnvelope('No structured payload here.', {
            mode: 'structured_only'
        });
        expect(extracted.envelope).toBeNull();
        expect(extracted.failureKind).toBe('missing_marker');
        expect(extracted.foundFence).toBe(false);
    });
});
describe('dynamic space builder', () => {
    it('builds compact dynamic space artifacts and a passing declarative test result set', () => {
        const artifacts = buildDynamicSpaceArtifacts({
            prompt: 'Find the best boutique hotels in Dayton for a weekend stay.',
            requestMode: 'chat',
            timestamp: '2026-04-11T16:00:00.000Z',
            currentSpace: null,
            envelope: createEnvelope(),
            intentHint: {
                category: 'places',
                preferredContentFormat: 'card',
                label: 'nearby shortlist'
            }
        });
        expect(artifacts.intent.category).toBe('places');
        expect(artifacts.summary.title).toBe('Hotel shortlist');
        expect(artifacts.analysis.datasets.length).toBeGreaterThan(0);
        expect(artifacts.uiSpec.schemaVersion).toBe('space_ui/v2');
        if (artifacts.uiSpec.schemaVersion !== 'space_ui/v2') {
            throw new Error('Expected a v2 UI spec.');
        }
        expect(collectNodeKinds(artifacts.uiSpec.nodes)).toEqual(expect.arrayContaining(['section_group', 'collection', 'detail_sheet']));
        expect(artifacts.actionSpec.actions.map((action) => action.id)).toContain('refresh-space');
        expect(artifacts.fallback.summaryMarkdown).toContain('Hotel Ardent');
        const results = runSpaceTestHarness({
            normalizedData: artifacts.normalizedData,
            uiSpec: artifacts.uiSpec,
            actionSpec: artifacts.actionSpec,
            testSpec: artifacts.testSpec,
            checkedAt: '2026-04-11T16:00:01.000Z'
        });
        expect(results.status).toBe('passed');
        expect(results.blockingFailureCount).toBe(0);
    });
    it('derives normalized collection data from a raw payload when Hermes omits normalizedData', () => {
        const rawData = {
            kind: 'raw_data',
            schemaVersion: 'space_raw_data/v1',
            payload: {
                results: [
                    {
                        id: 'item-1',
                        name: 'Option A',
                        price: '$20',
                        website: 'https://example.com/a'
                    },
                    {
                        id: 'item-2',
                        name: 'Option B',
                        price: '$25',
                        website: 'https://example.com/b'
                    }
                ]
            },
            links: [],
            paginationHints: [],
            metadata: {}
        };
        const normalized = deriveNormalizedDataFromRawData(rawData, {
            datasetLabel: 'Results',
            preferredPresentation: 'cards',
            timestamp: '2026-04-11T16:10:00.000Z'
        });
        expect(normalized.datasets[0]?.items).toHaveLength(2);
        expect(normalized.datasets[0]?.items[0]?.title).toBe('Option A');
        expect(normalized.summaryStats[0]?.value).toBe('2');
    });
    it('builds from a valid base artifact even when a legacy normalizedData extension is schema-invalid', () => {
        const extracted = extractHermesSpaceDataEnvelope(JSON.stringify({
            ...createRawEnvelope(),
            normalizedData: {
                kind: 'normalized_data',
                schemaVersion: 'space_normalized_data/v1',
                primaryDatasetId: 'primary',
                datasets: [],
                summaryStats: [],
                notes: [
                    {
                        invalid: true
                    }
                ],
                links: [],
                metadata: {}
            }
        }), {
            mode: 'structured_only'
        });
        if (!extracted.envelope) {
            throw new Error('Expected the base artifact to remain valid.');
        }
        const artifacts = buildDynamicSpaceArtifacts({
            prompt: 'Retry building the attached workspace.',
            requestMode: 'space_refresh',
            timestamp: '2026-04-12T16:20:00.000Z',
            currentSpace: null,
            envelope: extracted.envelope
        });
        expect(artifacts.analysis.datasets.length).toBeGreaterThan(0);
        expect(artifacts.normalizedData.datasets[0]?.items.length).toBeGreaterThan(0);
        expect(extracted.diagnostics.some((diagnostic) => diagnostic.code === 'SPACE_DATA_OPTIONAL_EXTENSION_DROPPED')).toBe(true);
    });
    it('blocks activation when a destructive action is missing confirmation', () => {
        const artifacts = buildDynamicSpaceArtifacts({
            prompt: 'Find the best boutique hotels in Dayton for a weekend stay.',
            requestMode: 'chat',
            timestamp: '2026-04-11T16:20:00.000Z',
            currentSpace: null,
            envelope: createEnvelope(),
            intentHint: {
                category: 'places',
                preferredContentFormat: 'card',
                label: 'nearby shortlist'
            }
        });
        const unsafeActionSpec = {
            ...artifacts.actionSpec,
            actions: [
                ...artifacts.actionSpec.actions,
                {
                    id: 'unsafe-delete',
                    label: 'Delete',
                    kind: 'destructive',
                    intent: 'danger',
                    description: 'Delete the selected item without confirmation.',
                    visibility: {
                        requiresSelection: 'single',
                        whenBuildReady: true
                    },
                    prompt: {
                        promptTemplate: 'Delete the selected item.',
                        includeInputs: ['selected_items'],
                        allowedMutations: ['item_state'],
                        outboundRequestsAllowed: false,
                        expectedOutput: 'space_data_update',
                        timeoutMs: 30000,
                        retryable: false
                    },
                    metadata: {}
                }
            ]
        };
        const results = runSpaceTestHarness({
            normalizedData: artifacts.normalizedData,
            uiSpec: artifacts.uiSpec,
            actionSpec: unsafeActionSpec,
            testSpec: artifacts.testSpec,
            checkedAt: '2026-04-11T16:20:01.000Z'
        });
        expect(results.status).toBe('failed');
        expect(results.blockingFailureCount).toBeGreaterThan(0);
        expect(results.results.some((result) => result.kind === 'destructive_requires_confirmation' && !result.passed)).toBe(true);
    });
});
