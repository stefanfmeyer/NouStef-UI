import type { RecipeAuthoringDsl, RecipeDsl } from '@noustef-ui/protocol';
import { RecipeDslSchema } from '@noustef-ui/protocol';
import { extractBalancedJsonValue } from './dynamic-recipe-contract';

export const WORKRECIPE_DSL_TOP_LEVEL_KEYS = [
  'kind',
  'schemaVersion',
  'sdkVersion',
  'title',
  'subtitle',
  'summary',
  'status',
  'tabs',
  'datasets',
  'sections',
  'actions',
  'notes',
  'operations',
  'semanticHints',
  'metadata'
] as const;

export const WORKRECIPE_DSL_REQUIRED_FIELDS = ['kind', 'schemaVersion', 'summary', 'tabs'] as const;
export const WORKRECIPE_DSL_ACTION_KINDS = ['existing_action'] as const;
export const WORKRECIPE_DSL_OPERATION_NAMES = [
  'update_dataset',
  'replace_section',
  'remove_section',
  'update_tab',
  'set_active_tab',
  'append_notes',
  'set_selection',
  'set_status',
  'set_action_state'
] as const;

export const WORKRECIPE_DSL_SECTION_TYPES = [
  'summary',
  'dataset',
  'comparison',
  'detail',
  'stats',
  'markdown',
  'media',
  'links',
  'notes',
  'actions',
  'callout',
  'timeline',
  'status'
] as const;

export const WORKRECIPE_DSL_DATASET_DISPLAYS = [
  'table',
  'list',
  'cards',
  'detail',
  'markdown',
  'comparison',
  'timeline',
  'media'
] as const;

export interface RecipeDslExtractionResult {
  artifact: RecipeDsl | null;
  rawValue: unknown | null;
  jsonText: string | null;
  warnings: string[];
  errors: string[];
  recovered: boolean;
}

function normalizeDslPayload(responseText: string) {
  const trimmed = responseText.trim();
  if (!trimmed) {
    return '';
  }

  const fenceMatch = trimmed.match(/^```(?:hermes-recipe-dsl|json)?\s*\n?/iu);
  if (fenceMatch) {
    const withoutOpen = trimmed.slice(fenceMatch[0].length);
    const closingIndex = withoutOpen.lastIndexOf('\n```');
    return (closingIndex >= 0 ? withoutOpen.slice(0, closingIndex) : withoutOpen).trim();
  }

  return trimmed;
}

function createGoodExamples(): RecipeAuthoringDsl[] {
  return [
    {
      kind: 'recipe_dsl',
      schemaVersion: 'recipe_dsl/v2',
      sdkVersion: 'recipe_sdk/v1',
      title: 'Inbox summary',
      subtitle: 'Unread email triage',
      summary: 'Show the unread inbox summary first, then the actionable email list and triage controls.',
      status: 'active',
      tabs: [
        {
          id: 'tab-overview',
          label: 'Overview',
          sectionIds: ['section-summary', 'section-unread', 'section-actions'],
          layout: 'stack',
          metadata: {}
        }
      ],
      datasets: [
        {
          id: 'inbox-items',
          title: 'Unread email',
          summary: 'Primary unread inbox dataset.',
          display: 'table',
          fields: ['from', 'subject', 'receivedAt', 'category'],
          focusEntityId: null,
          notes: ['Keep the list compact and sortable.'],
          metadata: {}
        }
      ],
      sections: [
        {
          id: 'section-summary',
          type: 'summary',
          title: 'Inbox summary',
          summary: 'High-level status for the inbox.',
          body: '### Today\n\nA concise summary of unread email and immediate priorities.',
          fields: [],
          entityIds: [],
          actionIds: [],
          links: [],
          media: [],
          stats: [],
          metadata: {}
        },
        {
          id: 'section-unread',
          type: 'dataset',
          title: 'Unread email',
          summary: 'Unread email list.',
          datasetId: 'inbox-items',
          fields: ['from', 'subject', 'receivedAt', 'category'],
          entityIds: [],
          actionIds: ['delete-source-entries'],
          links: [],
          media: [],
          stats: [],
          metadata: {}
        },
        {
          id: 'section-actions',
          type: 'actions',
          title: 'Next actions',
          summary: 'Bridge-managed actions.',
          fields: [],
          entityIds: [],
          actionIds: ['refresh-recipe', 'retry-build'],
          links: [],
          media: [],
          stats: [],
          metadata: {}
        }
      ],
      actions: [
        {
          kind: 'existing_action',
          id: 'refresh-recipe',
          placement: 'toolbar',
          metadata: {}
        },
        {
          kind: 'existing_action',
          id: 'delete-source-entries',
          placement: 'section',
          datasetId: 'inbox-items',
          metadata: {}
        }
      ],
      notes: ['Keep the baseline summary visible first.'],
      operations: [
        {
          op: 'set_active_tab',
          tabId: 'tab-overview'
        }
      ],
      semanticHints: {
        primaryDatasetId: 'inbox-items',
        preferredLayout: 'stack',
        narrowPaneStrategy: 'stack',
        notes: ['Prefer compact triage sections.']
      },
      metadata: {}
    },
    {
      kind: 'recipe_dsl',
      schemaVersion: 'recipe_dsl/v2',
      sdkVersion: 'recipe_sdk/v1',
      title: 'Weekend hotels',
      subtitle: 'Price comparison',
      summary: 'Compare a shortlist of hotels and call out the best tradeoffs.',
      status: 'active',
      tabs: [
        {
          id: 'tab-options',
          label: 'Options',
          sectionIds: ['section-hotels', 'section-comparison', 'section-notes'],
          layout: 'stack',
          metadata: {}
        }
      ],
      datasets: [
        {
          id: 'hotel-options',
          title: 'Hotel options',
          summary: 'Short verified shortlist.',
          display: 'cards',
          fields: ['name', 'nightlyRate', 'distance', 'rating'],
          focusEntityId: null,
          notes: ['Show the best tradeoffs first.'],
          metadata: {}
        }
      ],
      sections: [
        {
          id: 'section-hotels',
          type: 'dataset',
          title: 'Hotel options',
          summary: 'Shortlist of nearby hotels.',
          datasetId: 'hotel-options',
          fields: ['name', 'nightlyRate', 'distance', 'rating'],
          entityIds: [],
          actionIds: ['refresh-recipe'],
          links: [],
          media: [],
          stats: [],
          metadata: {
            display: 'cards'
          }
        },
        {
          id: 'section-comparison',
          type: 'comparison',
          title: 'Tradeoffs',
          summary: 'Best-value tradeoffs.',
          datasetId: 'hotel-options',
          body: 'Use the comparison section to explain price, distance, and rating tradeoffs.',
          fields: ['nightlyRate', 'distance', 'rating'],
          entityIds: [],
          actionIds: [],
          links: [],
          media: [],
          stats: [],
          metadata: {}
        },
        {
          id: 'section-notes',
          type: 'notes',
          title: 'Booking notes',
          summary: 'Booking cautions and next steps.',
          body: '- Verify cancellation windows.\n- Prefer properties with recent strong reviews.',
          fields: [],
          entityIds: [],
          actionIds: [],
          links: [],
          media: [],
          stats: [],
          metadata: {}
        }
      ],
      actions: [
        {
          kind: 'existing_action',
          id: 'refresh-recipe',
          placement: 'toolbar',
          metadata: {}
        }
      ],
      notes: ['Keep the shortlist short.'],
      operations: [],
      semanticHints: {
        primaryDatasetId: 'hotel-options',
        preferredLayout: 'stack',
        narrowPaneStrategy: 'split',
        notes: ['Lead with the strongest recommendation.']
      },
      metadata: {}
    }
  ];
}

function createInvalidExamples() {
  return [
    {
      reason: 'Wrong top-level shape. The DSL must use tabs and sections, not views plus strict recipe graph objects.',
      invalid: {
        kind: 'recipe_dsl',
        schemaVersion: 'recipe_dsl/v2',
        summary: 'Invalid because it uses strict graph keys.',
        views: [
          {
            id: 'view-overview'
          }
        ],
        entities: []
      }
    },
    {
      reason: 'Wrong action shape. Actions must reference existing allowed action ids and operation names must be canonical.',
      invalid: {
        kind: 'recipe_dsl',
        schemaVersion: 'recipe_dsl/v2',
        summary: 'Invalid actions and op names.',
        tabs: [
          {
            id: 'tab-overview',
            label: 'Overview',
            sectionIds: ['section-summary']
          }
        ],
        sections: [
          {
            id: 'section-summary',
            type: 'summary',
            title: 'Summary'
          }
        ],
        actions: [
          {
            actionType: 'prompt',
            id: 'invented-action'
          }
        ],
        operations: [
          {
            op: 'set_tab',
            tabId: 'tab-overview'
          }
        ]
      }
    }
  ];
}

export function createRecipeDslContractPacket(input: {
  allowedActionIds?: string[];
  allowedDatasetIds?: string[];
  allowedSectionIds?: string[];
}) {
  return {
    summary:
      'Emit a smaller authoring DSL for Hermes Home. Do not emit the final strict recipe model, raw entities/collections/views graph, or TSX applet source.',
    allowedTopLevelKeys: [...WORKRECIPE_DSL_TOP_LEVEL_KEYS],
    requiredFields: [...WORKRECIPE_DSL_REQUIRED_FIELDS],
    allowedActionKinds: [...WORKRECIPE_DSL_ACTION_KINDS],
    allowedOperationNames: [...WORKRECIPE_DSL_OPERATION_NAMES],
    allowedSectionTypes: [...WORKRECIPE_DSL_SECTION_TYPES],
    allowedDatasetDisplays: [...WORKRECIPE_DSL_DATASET_DISPLAYS],
    allowedReferences: {
      actionIds: input.allowedActionIds ?? [],
      datasetIds: input.allowedDatasetIds ?? [],
      sectionIds: input.allowedSectionIds ?? []
    },
    guidance: [
      'Tabs own sectionIds. Do not emit views.',
      'Datasets reference existing bridge datasets by id and only provide high-level display hints.',
      'Actions reference only existing allowed action ids.',
      'Sections stay semantic and compact; the bridge translates them into the strict recipe model.',
      'If information is missing, stay conservative and emit a minimal valid DSL instead of inventing unsupported keys.'
    ],
    examples: {
      valid: createGoodExamples(),
      invalid: createInvalidExamples()
    }
  };
}

export function createRecipeDslRepairExcerpt(errors: string[]) {
  const normalizedErrors = errors.map((error) => error.toLowerCase());
  const include = {
    tabs: normalizedErrors.some((error) => error.includes('tab') || error.includes('view')),
    sections: normalizedErrors.some(
      (error) => error.includes('section') || error.includes('body') || error.includes('field') || error.includes('type')
    ),
    datasets: normalizedErrors.some(
      (error) => error.includes('dataset') || error.includes('collection') || error.includes('entity')
    ),
    actions: normalizedErrors.some((error) => error.includes('action')),
    operations: normalizedErrors.some((error) => error.includes('operation') || error.includes('"op"')),
    topLevel:
      normalizedErrors.some((error) => error.includes('summary') || error.includes('schema') || error.includes('kind')) ||
      normalizedErrors.length === 0
  };

  return {
    summary:
      'Repair the JSON so it matches the compact recipe authoring DSL. Do not introduce TSX, strict graph keys, or live-task instructions.',
    topLevel:
      include.topLevel || include.tabs || include.sections || include.datasets || include.actions || include.operations
        ? {
            allowedTopLevelKeys: [...WORKRECIPE_DSL_TOP_LEVEL_KEYS],
            requiredFields: [...WORKRECIPE_DSL_REQUIRED_FIELDS]
          }
        : undefined,
    tabs: include.tabs
      ? {
          shape: {
            id: 'tab-overview',
            label: 'Overview',
            sectionIds: ['section-summary'],
            layout: 'stack'
          }
        }
      : undefined,
    sections: include.sections
      ? {
          allowedTypes: [...WORKRECIPE_DSL_SECTION_TYPES],
          shape: {
            id: 'section-summary',
            type: 'summary',
            title: 'Summary',
            summary: 'High-level overview',
            body: '### Overview',
            datasetId: 'optional-existing-dataset-id'
          }
        }
      : undefined,
    datasets: include.datasets
      ? {
          allowedDisplays: [...WORKRECIPE_DSL_DATASET_DISPLAYS],
          shape: {
            id: 'existing-dataset-id',
            title: 'Results',
            summary: 'Primary dataset',
            display: 'table',
            fields: ['name', 'status']
          }
        }
      : undefined,
    actions: include.actions
      ? {
          allowedKinds: [...WORKRECIPE_DSL_ACTION_KINDS],
          shape: {
            kind: 'existing_action',
            id: 'existing-allowed-action-id',
            placement: 'toolbar'
          }
        }
      : undefined,
    operations: include.operations
      ? {
          allowedNames: [...WORKRECIPE_DSL_OPERATION_NAMES],
          examples: [
            {
              op: 'set_active_tab',
              tabId: 'tab-overview'
            },
            {
              op: 'replace_section',
              section: {
                id: 'section-summary',
                type: 'summary',
                title: 'Summary'
              }
            }
          ]
        }
      : undefined
  };
}

export function extractRecipeDslArtifact(responseText: string): RecipeDslExtractionResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const normalized = normalizeDslPayload(responseText);

  if (!normalized) {
    return {
      artifact: null,
      rawValue: null,
      jsonText: null,
      warnings,
      errors: ['Hermes did not emit a recipe DSL artifact.'],
      recovered: false
    };
  }

  const balancedJson = extractBalancedJsonValue(normalized);
  if (!balancedJson) {
    return {
      artifact: null,
      rawValue: null,
      jsonText: null,
      warnings,
      errors: ['Hermes did not emit a balanced recipe DSL JSON object.'],
      recovered: false
    };
  }

  const recovered = balancedJson.jsonText.trim() !== normalized.trim();
  if (recovered) {
    warnings.push('Recovered the first balanced recipe DSL JSON object from the Hermes response.');
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(balancedJson.jsonText);
  } catch (error) {
    return {
      artifact: null,
      rawValue: null,
      jsonText: balancedJson.jsonText,
      warnings,
      errors: [error instanceof Error ? error.message : 'Recipe DSL JSON parsing failed.'],
      recovered
    };
  }

  const parsedArtifact = RecipeDslSchema.safeParse(parsedJson);
  if (!parsedArtifact.success) {
    return {
      artifact: null,
      rawValue: parsedJson,
      jsonText: balancedJson.jsonText,
      warnings,
      errors: [parsedArtifact.error.message],
      recovered
    };
  }

  return {
    artifact: parsedArtifact.data,
    rawValue: parsedJson,
    jsonText: balancedJson.jsonText,
    warnings,
    errors,
    recovered
  };
}
