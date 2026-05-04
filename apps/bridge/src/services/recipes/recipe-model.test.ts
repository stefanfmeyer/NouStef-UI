// @vitest-environment node

import { describe, expect, it } from 'vitest';
import type {
  RecipeActionSpec,
  RecipeAssistantContext,
  RecipeFallbackState,
  RecipeNormalizedData,
  RecipeSummary
} from '@noustef-ui/protocol';
import { applyRecipePatchOperations, buildRecipeModel } from './recipe-model';

function createHomeMetadata() {
  return {
    changeVersion: 1,
    auditTags: [],
    homeRecipe: true
  };
}

function createSummary(): RecipeSummary {
  return {
    kind: 'summary',
    schemaVersion: 'recipe_summary/v1',
    title: 'Inbox summary',
    subtitle: 'Unread messages',
    statusLabel: '1 unread',
    badges: ['fresh'],
    stats: [
      {
        id: 'stat-unread',
        label: 'Unread',
        value: '1',
        emphasis: 'none',
        tone: 'neutral'
      }
    ],
    links: [],
    lastBuiltAt: '2026-04-12T12:00:00.000Z',
    note: 'Focus on the unread finance thread.'
  };
}

function createAssistantContext(): RecipeAssistantContext {
  return {
    kind: 'assistant_context',
    schemaVersion: 'recipe_assistant_context/v1',
    summary: 'Unread finance thread summary.',
    responseLead: 'Here is the inbox summary.',
    responseTail: 'I can refine the triage.',
    links: [],
    citations: [],
    metadata: {}
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
          },
          {
            id: 'email-2',
            title: 'Launch prep',
            subtitle: 'ops@example.com',
            description: 'Next steps for launch.',
            badges: [],
            fields: [
              {
                key: 'sender',
                label: 'Sender',
                value: 'ops@example.com',
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
        notes: ['Use bulk actions for triage.'],
        pageInfo: {
          pageSize: 6,
          totalItems: 2,
          hasMore: false
        },
        metadata: {}
      }
    ],
    summaryStats: [],
    notes: ['Inbox updated locally.'],
    links: [],
    metadata: {}
  };
}

function createFallback(): RecipeFallbackState {
  return {
    kind: 'fallback',
    schemaVersion: 'recipe_fallback/v1',
    title: 'Inbox fallback',
    message: 'Baseline fallback',
    summaryMarkdown: 'Fallback markdown',
    datasetPreview: [],
    canRetry: true
  };
}

function createActionSpec(): RecipeActionSpec {
  return {
    kind: 'action_spec',
    schemaVersion: 'recipe_action_spec/v1',
    actions: [
      {
        id: 'refresh-recipe',
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
          allowedMutations: ['recipe_model', 'recipe_patch'],
          outboundRequestsAllowed: false,
          expectedOutput: 'recipe_data_update',
          timeoutMs: 60_000,
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
          allowedMutations: ['recipe_model', 'recipe_patch'],
          outboundRequestsAllowed: false,
          expectedOutput: 'recipe_data_update',
          timeoutMs: 60_000,
          retryable: true
        },
        metadata: {}
      }
    ]
  };
}

describe('recipe model synthesis', () => {
  it('builds a deterministic recipe graph with collections, tabs, sections, and actions', () => {
    const result = buildRecipeModel({
      recipe: {
        id: 'recipe-inbox',
        title: 'Inbox triage',
        description: 'Unread messages',
        status: 'active',
        metadata: createHomeMetadata()
      },
      summary: createSummary(),
      assistantContext: createAssistantContext(),
      normalizedData: createNormalizedData(),
      actionSpec: createActionSpec(),
      fallback: createFallback(),
      previousModel: null
    });

    expect(result.model.sdkVersion).toBe('recipe_sdk/v1');
    expect(result.model.collections.map((collection) => collection.id)).toEqual(['primary']);
    expect(result.model.entities.map((entity) => entity.id)).toEqual(['email-1', 'email-2']);
    expect(result.model.tabs[0]?.id).toBe('tab-overview');
    expect(result.model.sections.some((section) => section.kind === 'table')).toBe(true);
    expect(result.model.actions.map((action) => action.id)).toEqual(['refresh-recipe', 'refine-selection']);
    expect(result.patch.operations.some((operation) => operation.op === 'upsert_entities')).toBe(true);
    expect(result.patch.nextRevision).toBe(1);
  });

  it('produces patch-style updates instead of forcing a full rewrite', () => {
    const initial = buildRecipeModel({
      recipe: {
        id: 'recipe-inbox',
        title: 'Inbox triage',
        description: 'Unread messages',
        status: 'active',
        metadata: createHomeMetadata()
      },
      summary: createSummary(),
      assistantContext: createAssistantContext(),
      normalizedData: createNormalizedData(),
      actionSpec: createActionSpec(),
      fallback: createFallback(),
      previousModel: null
    });

    const nextNormalizedData = createNormalizedData();
    nextNormalizedData.datasets[0]!.items = [nextNormalizedData.datasets[0]!.items[1]!, nextNormalizedData.datasets[0]!.items[0]!];

    const updated = buildRecipeModel({
      recipe: {
        id: 'recipe-inbox',
        title: 'Inbox triage',
        description: 'Unread messages',
        status: 'active',
        metadata: createHomeMetadata()
      },
      summary: createSummary(),
      assistantContext: createAssistantContext(),
      normalizedData: nextNormalizedData,
      actionSpec: createActionSpec(),
      fallback: createFallback(),
      previousModel: initial.model
    });

    expect(updated.patch.baseRevision).toBe(1);
    expect(updated.patch.nextRevision).toBe(2);
    expect(updated.patch.operations.some((operation) => operation.op === 'reorder_collection')).toBe(true);

    const applied = applyRecipePatchOperations(initial.model, updated.patch);
    expect(applied.collections[0]?.entityIds).toEqual(['email-2', 'email-1']);
    expect(applied.revision).toBe(2);
  });
});
