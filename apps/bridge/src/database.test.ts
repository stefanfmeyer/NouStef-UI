/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @vitest-environment node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  createDefaultRecipeTabs,
  getRecipeContentEntries,
  getRecipeContentFormat,
  getRecipeContentTab,
  getRecipeContentViewData,
  isRecipeContentSynchronized,
  normalizeRecipeTabs,
  type RecipeActionSpec,
  type RecipeArtifactPayload
} from '@noustef-ui/protocol';
import { BridgeDatabase } from './database';

const cleanupPaths: string[] = [];

function createDynamicRecipeBuildFixtures(recipeId: string, sessionId: string) {
  const userPrompt = {
    kind: 'user_prompt' as const,
    schemaVersion: 'recipe_user_prompt/v1' as const,
    originalPrompt: 'Find the best boutique hotels in Dayton for a weekend stay.',
    normalizedPrompt: 'Find boutique hotels in Dayton for a weekend stay.',
    requestMode: 'chat' as const
  };
  const intent = {
    kind: 'intent' as const,
    schemaVersion: 'recipe_intent/v1' as const,
    category: 'places' as const,
    label: 'nearby shortlist',
    summary: 'Weekend hotel shortlist in Dayton.',
    preferredPresentation: 'cards' as const,
    query: userPrompt.originalPrompt,
    entities: [
      {
        kind: 'location',
        value: 'Dayton, OH'
      }
    ],
    filters: [
      {
        key: 'trip_type',
        label: 'Trip type',
        value: 'weekend'
      }
    ],
    allowOutboundRequests: true,
    destructiveIntent: false,
    updateTarget: 'new_recipe' as const,
    metadata: {}
  };
  const rawData = {
    kind: 'raw_data' as const,
    schemaVersion: 'recipe_raw_data/v1' as const,
    payload: {
      hotels: [
        {
          id: 'hotel-ardent',
          name: 'Hotel Ardent',
          price: '$210'
        },
        {
          id: 'ac-hotel-dayton',
          name: 'AC Hotel Dayton',
          price: '$189'
        }
      ]
    },
    links: [
      {
        label: 'Downtown hotels',
        url: 'https://example.com/dayton-hotels',
        kind: 'website' as const
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
  };
  const assistantContext = {
    kind: 'assistant_context' as const,
    schemaVersion: 'recipe_assistant_context/v1' as const,
    summary: 'I assembled a compact shortlist of weekend-friendly boutique hotel options.',
    responseLead: 'Here is a compact shortlist.',
    responseTail: 'I can refine the list by neighborhood or budget.',
    links: rawData.links,
    citations: [],
    metadata: {}
  };
  const normalizedData = {
    kind: 'normalized_data' as const,
    schemaVersion: 'recipe_normalized_data/v1' as const,
    primaryDatasetId: 'primary',
    datasets: [
      {
        id: 'primary',
        label: 'Weekend shortlist',
        kind: 'collection' as const,
        preferredPresentation: 'cards' as const,
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
                presentation: 'text' as const,
                emphasis: 'primary' as const
              }
            ],
            links: [
              {
                label: 'Website',
                url: 'https://example.com/hotel-ardent',
                kind: 'website' as const
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
                presentation: 'text' as const,
                emphasis: 'primary' as const
              }
            ],
            links: [
              {
                label: 'Website',
                url: 'https://example.com/ac-hotel-dayton',
                kind: 'website' as const
              }
            ],
            metadata: {}
          }
        ],
        fields: [],
        stats: [
          {
            id: 'stat-results',
            label: 'Options',
            value: '2',
            emphasis: 'primary' as const,
            tone: 'info' as const
          }
        ],
        notes: ['Card paging is capped for the attached small pane.'],
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
        emphasis: 'primary' as const,
        tone: 'info' as const
      }
    ],
    notes: ['Focus on walkable downtown options first.'],
    links: rawData.links,
    metadata: {}
  };
  const uiSpec = {
    kind: 'ui_spec' as const,
    schemaVersion: 'recipe_ui/v1' as const,
    layout: 'stack_with_detail' as const,
    compact: {
      defaultSectionId: 'results',
      maxCardColumns: 1,
      stickyToolbar: true
    },
    header: {
      title: 'Hotel shortlist',
      subtitle: 'Weekend Dayton options',
      statusLabel: 'Ready',
      badges: ['dynamic', 'small-pane'],
      statIds: ['stat-results'],
      primaryActionIds: ['refresh-recipe'],
      secondaryActionIds: ['retry-build']
    },
    sections: [
      {
        id: 'overview',
        kind: 'summary' as const,
        title: 'Overview',
        subtitle: 'Compact shortlist summary',
        statIds: ['stat-results'],
        actionIds: ['refresh-recipe']
      },
      {
        id: 'results',
        kind: 'collection' as const,
        title: 'Results',
        datasetId: 'primary',
        presentation: 'cards' as const,
        pageSize: 4,
        searchable: true,
        selection: 'single' as const,
        detailSectionId: 'detail',
        columns: [],
        cardFields: [
          {
            label: 'Price',
            fieldKey: 'price',
            presentation: 'text' as const,
            emphasize: 'primary' as const
          }
        ],
        primaryActionIds: ['refresh-recipe'],
        rowActionIds: ['refine-selection'],
        filterKeys: ['neighborhood'],
        emptyState: {
          title: 'No results',
          description: 'Try widening the hotel search.'
        },
        loadingState: {
          title: 'Loading results',
          description: 'Building a compact shortlist.'
        },
        errorState: {
          title: 'Results unavailable',
          description: 'The shortlist could not be rendered.'
        }
      },
      {
        id: 'detail',
        kind: 'detail' as const,
        title: 'Selection',
        datasetId: 'primary',
        source: 'selected' as const,
        fields: [
          {
            label: 'Price',
            fieldKey: 'price',
            presentation: 'text' as const,
            emphasize: 'primary' as const
          }
        ],
        actionIds: ['refine-selection'],
        emptyState: {
          title: 'Nothing selected',
          description: 'Choose a hotel to inspect the details.'
        },
        loadingState: {
          title: 'Loading details',
          description: 'Preparing the selection detail view.'
        },
        errorState: {
          title: 'Detail unavailable',
          description: 'The selection detail could not be rendered.'
        }
      },
      {
        id: 'notes',
        kind: 'markdown' as const,
        title: 'Notes',
        content: 'Keep the shortlist compact and favor walkable downtown options.'
      }
    ]
  };
  const actionSpec: RecipeActionSpec = {
    kind: 'action_spec',
    schemaVersion: 'recipe_action_spec/v1',
    actions: [
      {
        id: 'refresh-recipe',
        label: 'Refresh',
        kind: 'prompt',
        intent: 'primary',
        description: 'Refresh the shortlist with the latest hotel results.',
        visibility: {
          requiresSelection: 'none',
          whenBuildReady: true
        },
        prompt: {
          promptTemplate: 'Refresh the shortlist with the latest verified hotel options.',
          includeInputs: ['original_prompt', 'intent', 'recipe_summary', 'raw_data', 'normalized_data', 'page_state', 'filter_state'],
          allowedMutations: ['raw_data', 'normalized_data', 'ui_spec', 'action_spec', 'assistant_response'],
          outboundRequestsAllowed: true,
          expectedOutput: 'recipe_data_update',
          timeoutMs: 120000,
          retryable: true
        },
        metadata: {}
      },
      {
        id: 'retry-build',
        label: 'Retry build',
        kind: 'bridge',
        intent: 'secondary',
        description: 'Retry the most recent failed build.',
        visibility: {
          requiresSelection: 'none',
          whenBuildReady: false
        },
        bridge: {
          handler: 'retry_build',
          payload: {}
        },
        metadata: {}
      }
    ]
  };
  const testSpec = {
    kind: 'test_spec' as const,
    schemaVersion: 'recipe_test_spec/v1' as const,
    cases: [
      {
        id: 'schema-valid',
        kind: 'schema_valid' as const,
        severity: 'critical' as const,
        config: {}
      },
      {
        id: 'actions-resolve',
        kind: 'actions_resolve' as const,
        severity: 'critical' as const,
        config: {}
      }
    ]
  };
  const testResults = {
    kind: 'test_results' as const,
    schemaVersion: 'recipe_test_results/v1' as const,
    status: 'passed' as const,
    blockingFailureCount: 0,
    checkedAt: '2026-04-11T15:05:00.000Z',
    results: [
      {
        id: 'schema-valid',
        kind: 'schema_valid' as const,
        severity: 'critical' as const,
        passed: true,
        message: 'The UI spec parsed successfully.',
        checkedAt: '2026-04-11T15:05:00.000Z'
      },
      {
        id: 'actions-resolve',
        kind: 'actions_resolve' as const,
        severity: 'critical' as const,
        passed: true,
        message: 'All referenced actions resolve to a supported handler.',
        checkedAt: '2026-04-11T15:05:00.000Z'
      }
    ]
  };
  const summary = {
    kind: 'summary' as const,
    schemaVersion: 'recipe_summary/v1' as const,
    title: 'Hotel shortlist',
    subtitle: 'Weekend Dayton options',
    statusLabel: 'Ready',
    badges: ['dynamic', 'validated'],
    stats: normalizedData.summaryStats,
    links: rawData.links,
    lastBuiltAt: '2026-04-11T15:05:00.000Z',
    note: 'Compact card layout selected for the attached recipe pane.'
  };
  const fallback = {
    kind: 'fallback' as const,
    schemaVersion: 'recipe_fallback/v1' as const,
    title: 'Hotel shortlist',
    message: 'The rich layout is unavailable. Showing a safe summary preview instead.',
    summaryMarkdown: '- Hotel Ardent\n- AC Hotel Dayton',
    datasetPreview: normalizedData.datasets[0]?.items ?? [],
    canRetry: true
  };
  const build = {
    id: `recipe-build-${recipeId}`,
    recipeId,
    profileId: 'jbarton',
    sessionId,
    buildVersion: 1,
    buildKind: 'compiled_home' as const,
    triggerKind: 'chat' as const,
    triggerRequestId: 'request-recipe-build-1',
    triggerActionId: null,
    phase: 'ready' as const,
    progressMessage: 'Recipe ready.',
    retryCount: 0,
    startedAt: '2026-04-11T15:00:00.000Z',
    updatedAt: '2026-04-11T15:05:00.000Z',
    completedAt: '2026-04-11T15:05:00.000Z',
    errorCode: null,
    errorMessage: null,
    errorDetail: null,
    failureCategory: null,
    failureStage: null,
    userFacingMessage: null,
    retryable: null,
    configuredTimeoutMs: null
  };

  return {
    build,
    artifacts: {
      userPrompt,
      intent,
      rawData,
      assistantContext,
      normalizedData,
      uiSpec,
      actionSpec,
      testSpec,
      testResults,
      summary,
      fallback
    } satisfies Record<string, RecipeArtifactPayload>
  };
}

function createDatabasePath() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-bridge-db-'));
  cleanupPaths.push(directory);
  return path.join(directory, 'bridge.sqlite');
}

afterEach(() => {
  while (cleanupPaths.length > 0) {
    const target = cleanupPaths.pop();
    if (target) {
      fs.rmSync(target, { recursive: true, force: true });
    }
  }
});

describe('BridgeDatabase', () => {
  it('persists sessions, messages, settings, and tool history across reopen', () => {
    const databasePath = createDatabasePath();
    const first = new BridgeDatabase(databasePath);

    first.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    const session = first.createSession('jbarton', '2026-04-08T20:01:00.000Z');
    first.appendMessage({
      id: 'message-1',
      sessionId: session.id,
      role: 'user',
      content: 'Persist me',
      createdAt: '2026-04-08T20:01:00.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });
    const execution = first.createToolExecution({
      toolId: 'bridge:reviewed-shell',
      profileId: 'jbarton',
      sessionId: session.id,
      summary: 'Inspect the recipe',
      command: 'pwd',
      args: [],
      cwd: '.',
      status: 'pending',
      requestedAt: '2026-04-08T20:02:00.000Z'
    });
    first.updateToolExecution(execution.id, {
      status: 'completed',
      resolvedAt: '2026-04-08T20:02:05.000Z',
      stdout: '/tmp/project',
      stderr: '',
      exitCode: 0
    });
    first.updateSettings({
      themeMode: 'light',
      chatTimeoutMs: 240_000,
      discoveryTimeoutMs: 480_000,
      nearbySearchTimeoutMs: 600_000,
      recipeOperationTimeoutMs: 300_000,
      unrestrictedTimeoutMs: 3_600_000
    });
    first.close();

    const reopened = new BridgeDatabase(databasePath);
    const persistedSession = reopened.getSession(session.id);
    const persistedMessages = reopened.listMessages(session.id);
    const persistedHistory = reopened.listToolExecutions(1, 10);

    expect(persistedSession?.messageCount).toBe(1);
    expect(persistedSession?.title).toBe('Persist me');
    expect(persistedMessages[0]?.content).toBe('Persist me');
    expect(reopened.getSettings()).toMatchObject({
      themeMode: 'light',
      chatTimeoutMs: 240_000,
      discoveryTimeoutMs: 480_000,
      nearbySearchTimeoutMs: 600_000,
      recipeOperationTimeoutMs: 300_000,
      unrestrictedTimeoutMs: 3_600_000
    });
    expect(persistedHistory.items[0]?.status).toBe('completed');
    expect(persistedHistory.items[0]?.stdout).toBe('/tmp/project');
    reopened.close();
  });

  it('sanitizes transcript-visible content before persistence for append and replace paths', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:00:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-09T12:01:00.000Z');

    database.appendMessage({
      id: 'message-user-leak',
      sessionId: session.id,
      role: 'user',
      content:
        'Check unread email.\n\nBridge execution note: The active Hermes profile is jbarton. Use only this active profile auth state.\nReturn only the final assistant answer.',
      createdAt: '2026-04-09T12:01:00.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });
    database.appendMessage({
      id: 'message-assistant-leak',
      sessionId: session.id,
      role: 'assistant',
      content: `You have 3 unread emails right now.

Bridge execution note: The active Hermes profile is jbarton.
Raw system message: bootstrapping bridge runtime
{"tool":"google-workspace","unread":3}
\`\`\`python
python scripts/check_mail.py --json
print(open("/Users/example/.hermes/profiles/jbarton/scripts/check_mail.py").read())
\`\`\`
Traceback (most recent call last):
  File "/Users/example/.hermes/profiles/jbarton/scripts/check_mail.py", line 8, in <module>
FileNotFoundError: [Errno 2] No such file or directory: '/Users/example/.hermes/profiles/jbarton/scripts/check_mail.py'`,
      createdAt: '2026-04-09T12:01:01.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });
    const appendedMessages = database.listMessages(session.id);
    expect(appendedMessages[0]?.content).toBe('Check unread email.');
    expect(appendedMessages[1]?.content).toBe('You have 3 unread emails right now.');
    expect(appendedMessages[1]?.visibility).toBe('transcript');
    expect(appendedMessages[1]?.content).not.toMatch(
      /Bridge execution note|Raw system message|python scripts\/check_mail\.py|FileNotFoundError|google-workspace/u
    );

    database.replaceSessionMessages(
      session.id,
      [
        {
          id: 'message-user-imported',
          sessionId: session.id,
          role: 'user',
          content:
            'Summarize the inbox.\n\nBridge execution note: The active Hermes profile is jbarton.\nReturn only the final assistant answer.',
          createdAt: '2026-04-09T12:02:00.000Z',
          status: 'completed',
          requestId: null,
          visibility: 'transcript',
          kind: 'conversation'
        },
        {
          id: 'message-assistant-imported',
          sessionId: session.id,
          role: 'assistant',
          content: `You have 3 unread emails right now.

Raw system message: importing runtime state
{"tool":"google-workspace","unread":3}
\`\`\`hermes-ui-recipes
Created a recipe and included the structured payload below.
\`\`\`json
{"operations":[{"type":"create_space","title":"Inbox tracker","viewType":"markdown","data":{"markdown":"## Inbox"}}]}
\`\`\`
\`\`\`
Command execution failed: python scripts/check_mail.py --json
No such file or directory: /Users/example/.hermes/profiles/jbarton/scripts/check_mail.py`,
          createdAt: '2026-04-09T12:02:01.000Z',
          status: 'completed',
          requestId: null,
          visibility: 'transcript',
          kind: 'conversation'
        }
      ],
      '2026-04-09T12:02:02.000Z'
    );

    const persistedMessages = database.listMessages(session.id);

    expect(persistedMessages[0]?.content).toBe('Summarize the inbox.');
    expect(persistedMessages[0]?.visibility).toBe('transcript');
    expect(persistedMessages[1]?.content).toBe('You have 3 unread emails right now.');
    expect(persistedMessages[1]?.visibility).toBe('transcript');
    expect(persistedMessages[1]?.kind).toBe('conversation');
    expect(persistedMessages[1]?.content).not.toMatch(
      /Bridge execution note|Raw system message|python scripts\/check_mail\.py|FileNotFoundError|No such file or directory|google-workspace|hermes-ui-recipes|"operations"/u
    );
    database.close();
  });

  it('preserves insertion order when transcript messages share the same timestamp', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:00:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-09T12:01:00.000Z');
    database.ensureRuntimeRequest({
      requestId: 'request-shared',
      sessionId: session.id,
      profileId: 'jbarton',
      preview: 'Refresh this attached recipe with updated results.',
      startedAt: '2026-04-09T12:01:00.000Z'
    });

    database.appendMessage({
      id: 'message-shared-user',
      sessionId: session.id,
      role: 'user',
      content: 'Refresh this attached recipe with updated results.',
      createdAt: '2026-04-09T12:01:00.000Z',
      status: 'completed',
      requestId: 'request-shared',
      visibility: 'transcript',
      kind: 'conversation'
    });
    database.appendMessage({
      id: 'message-shared-assistant',
      sessionId: session.id,
      role: 'assistant',
      content: 'Refreshed the shortlist.',
      createdAt: '2026-04-09T12:01:00.000Z',
      status: 'completed',
      requestId: 'request-shared',
      visibility: 'transcript',
      kind: 'conversation'
    });

    const persistedMessages = database.listMessages(session.id);
    expect(persistedMessages.map((message) => message.id)).toEqual(['message-shared-user', 'message-shared-assistant']);
    expect(database.getRuntimeRequest('request-shared')?.messageIds).toEqual(['message-shared-user', 'message-shared-assistant']);

    database.close();
  });

  it('generates deterministic local session titles from the first user message for append and replace paths', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:00:00.000Z'
    );

    const appendedSession = database.createSession('jbarton', '2026-04-09T12:01:00.000Z');
    database.appendMessage({
      id: 'title-user-append',
      sessionId: appendedSession.id,
      role: 'user',
      content: 'good Italian restaurants near Dayton, OH',
      createdAt: '2026-04-09T12:01:00.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });

    expect(database.getSession(appendedSession.id)?.title).toBe('Italian Restaurants Dayton OH');

    const replacedSession = database.createSession('jbarton', '2026-04-09T12:02:00.000Z');
    database.replaceSessionMessages(
      replacedSession.id,
      [
        {
          id: 'title-user-replace',
          sessionId: replacedSession.id,
          role: 'user',
          content: 'Create roadmap for Dayton restaurant openings.',
          createdAt: '2026-04-09T12:02:00.000Z',
          status: 'completed',
          requestId: null,
          visibility: 'transcript',
          kind: 'conversation'
        },
        {
          id: 'title-assistant-replace',
          sessionId: replacedSession.id,
          role: 'assistant',
          content: 'Roadmap drafted.',
          createdAt: '2026-04-09T12:02:01.000Z',
          status: 'completed',
          requestId: null,
          visibility: 'transcript',
          kind: 'conversation'
        }
      ],
      '2026-04-09T12:02:02.000Z'
    );

    expect(database.getSession(replacedSession.id)?.title).toBe('Roadmap Dayton Restaurant Openings');
    database.close();
  });

  it('auto-retitles later user turns when the new request is meaningfully better and preserves explicit renames', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:00:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-09T12:03:00.000Z');
    database.appendMessage({
      id: 'title-user-initial',
      sessionId: session.id,
      role: 'user',
      content: 'help',
      createdAt: '2026-04-09T12:03:00.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });
    expect(database.getSession(session.id)?.title).toBe('help');

    database.appendMessage({
      id: 'title-user-better',
      sessionId: session.id,
      role: 'user',
      content: 'Compare boutique hotels in downtown Dayton with parking and breakfast.',
      createdAt: '2026-04-09T12:03:10.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });
    expect(database.getSession(session.id)?.title).toBe('Compare Boutique Hotels Downtown Dayton Parking');

    database.renameSessionTitle(session.id, 'Pinned title', {
      persistOverride: true
    });
    database.appendMessage({
      id: 'title-user-after-rename',
      sessionId: session.id,
      role: 'user',
      content: 'Research dinner restaurants near the hotel and update the shortlist.',
      createdAt: '2026-04-09T12:03:20.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });

    expect(database.getSession(session.id)?.title).toBe('Pinned title');
    database.close();
  });

  it('keeps sessions without attached spaces detached by default', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:10:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-09T12:10:01.000Z');

    expect(database.getSession(session.id)?.attachedRecipeId).toBeNull();
    expect(database.getSession(session.id)?.recipeType).toBe('tui');
    expect(database.getRecipeByPrimarySessionId('jbarton', session.id)).toBeNull();
    database.close();
  });

  it('attaches created spaces to their primary session and preserves canonical tabs', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:11:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-09T12:11:01.000Z');
    const recipe = database.createRecipe({
      profileId: 'jbarton',
      primarySessionId: session.id,
      title: 'Launch checklist',
      description: 'Track launch work',
      status: 'active',
      tabs: createDefaultRecipeTabs('card'),
      uiState: {
        activeTab: 'content'
      },
      source: 'user'
    });

    expect(recipe?.primarySessionId).toBe(session.id);
    expect(database.getSession(session.id)?.attachedRecipeId).toBe(recipe?.id ?? null);
    expect(database.getSession(session.id)?.recipeType).toBe('home');
    expect(database.getRecipeByPrimarySessionId('jbarton', session.id)?.id).toBe(recipe?.id ?? null);
    expect(getRecipeContentFormat(recipe!)).toBe('card');
    expect(isRecipeContentSynchronized(getRecipeContentTab(recipe!).content)).toBe(true);
    expect(recipe?.tabs).toHaveLength(1);
    database.close();
  });

  it('stores synchronized content representations and keeps them stable when only the active view changes', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:11:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-09T12:11:01.000Z');
    const recipe = database.createRecipe({
      profileId: 'jbarton',
      primarySessionId: session.id,
      title: 'Hotel shortlist',
      description: 'Track structured options',
      status: 'active',
      tabs: normalizeRecipeTabs({
        contentFormat: 'table',
        contentData: {
          columns: [
            { id: 'hotel', label: 'Hotel', emphasis: 'primary' },
            { id: 'price', label: 'Price', emphasis: 'none' }
          ],
          rows: [
            {
              hotel: 'AC Hotel Dayton',
              price: '$189'
            }
          ],
          emptyMessage: 'No rows yet.'
        }
      }),
      uiState: {
        activeTab: 'content'
      },
      source: 'user'
    });

    expect(getRecipeContentViewData(getRecipeContentTab(recipe!), 'table').rows).toHaveLength(1);
    expect(getRecipeContentViewData(getRecipeContentTab(recipe!), 'card').cards).toHaveLength(1);
    expect(getRecipeContentViewData(getRecipeContentTab(recipe!), 'markdown').markdown).toContain('AC Hotel Dayton');
    expect(getRecipeContentEntries(recipe!)).toHaveLength(1);
    expect(getRecipeContentEntries(recipe!)[0]?.card.id).toBe(getRecipeContentEntries(recipe!)[0]?.id);

    const switched = database.updateRecipe(recipe!.id, {
      profileId: 'jbarton',
      tabs: normalizeRecipeTabs({
        currentRecipe: recipe!,
        contentFormat: 'markdown'
      })
    });

    expect(getRecipeContentFormat(switched!)).toBe('markdown');
    expect(getRecipeContentViewData(getRecipeContentTab(switched!), 'table').rows).toEqual(
      getRecipeContentViewData(getRecipeContentTab(recipe!), 'table').rows
    );
    expect(getRecipeContentViewData(getRecipeContentTab(switched!), 'card').cards).toEqual(
      getRecipeContentViewData(getRecipeContentTab(recipe!), 'card').cards
    );
    database.close();
  });

  it('deleting an attached recipe preserves the session and clears the attachment', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-09T12:12:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-09T12:12:01.000Z');
    const recipe = database.createRecipe({
      profileId: 'jbarton',
      primarySessionId: session.id,
      title: 'Launch checklist',
      description: 'Track launch work',
      status: 'active',
      tabs: createDefaultRecipeTabs('markdown'),
      uiState: {
        activeTab: 'content'
      },
      source: 'user'
    });

    const deleted = database.deleteRecipe('jbarton', recipe!.id, '2026-04-09T12:12:02.000Z');

    expect(deleted?.recipeId).toBe(recipe?.id);
    expect(database.getRecipe(recipe!.id)).toBeNull();
    expect(database.getSession(session.id)?.attachedRecipeId).toBeNull();
    expect(database.listSessions({ profileId: 'jbarton', page: 1, pageSize: 10, search: '' }).items.some((item) => item.id === session.id)).toBe(
      true
    );
    database.close();
  });

  it('persists dynamic recipe build state and artifacts across reopen', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-11T15:00:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-11T15:00:01.000Z');
    const recipe = database.createRecipe({
      profileId: 'jbarton',
      primarySessionId: session.id,
      title: 'Hotel shortlist',
      description: 'Weekend hotel options',
      status: 'active',
      tabs: createDefaultRecipeTabs('markdown'),
      uiState: {
        activeTab: 'content'
      },
      source: 'hermes'
    });
    const fixtures = createDynamicRecipeBuildFixtures(recipe!.id, session.id);

    const build = database.startRecipeBuild({
      ...fixtures.build,
      phase: 'queued',
      progressMessage: 'Queued build.',
      completedAt: null
    });

    for (const artifact of Object.values(fixtures.artifacts)) {
      database.upsertRecipeBuildArtifact({
        id: `${build.id}-${artifact.kind}`,
        recipeId: recipe!.id,
        buildId: build.id,
        artifactKind: artifact.kind,
        schemaVersion: artifact.schemaVersion,
        payload: artifact,
        createdAt: '2026-04-11T15:01:00.000Z',
        updatedAt: '2026-04-11T15:02:00.000Z'
      });
    }

    database.appendRecipeBuildLog({
      id: `${build.id}-log-1`,
      recipeId: recipe!.id,
      buildId: build.id,
      phase: 'generating_ui',
      level: 'info',
      message: 'Generated the compact card layout.',
      detail: 'Cards were selected because the shortlist is small.',
      createdAt: '2026-04-11T15:02:30.000Z'
    });
    database.updateRecipeBuild(build.id, {
      phase: 'ready',
      progressMessage: 'Recipe ready.',
      updatedAt: '2026-04-11T15:05:00.000Z',
      completedAt: '2026-04-11T15:05:00.000Z'
    });
    database.promoteRecipeBuild(recipe!.id, {
      buildId: build.id,
      tabs: normalizeRecipeTabs({
        contentFormat: 'markdown',
        contentData: {
          markdown: fixtures.artifacts.fallback.summaryMarkdown
        }
      })
    });
    database.close();

    const reopened = new BridgeDatabase(databasePath);
    const persistedRecipe = reopened.getRecipe(recipe!.id);
    const persistedBuild = reopened.getRecipeBuild(build.id);
    const persistedArtifacts = reopened.listRecipeBuildArtifacts(build.id);
    const persistedLogs = reopened.listRecipeBuildLogs(build.id);

    expect(persistedRecipe?.renderMode).toBe('dynamic_v1');
    expect(persistedRecipe?.dynamic?.activeBuild?.phase).toBe('ready');
    expect(persistedRecipe?.dynamic?.summary?.title).toBe('Hotel shortlist');
    expect(persistedRecipe?.dynamic?.normalizedData?.datasets[0]?.items).toHaveLength(2);
    expect(persistedRecipe?.dynamic?.uiSpec?.kind).toBe('ui_spec');
    expect(persistedRecipe?.dynamic?.actionSpec?.actions.map((action) => action.id)).toContain('refresh-recipe');
    expect(persistedRecipe?.dynamic?.latestTestResults?.status).toBe('passed');
    expect(persistedRecipe?.dynamic?.fallback?.summaryMarkdown).toContain('Hotel Ardent');
    expect(persistedBuild?.phase).toBe('ready');
    expect(persistedArtifacts.map((artifact) => artifact.artifactKind).sort()).toEqual([
      'action_spec',
      'assistant_context',
      'fallback',
      'intent',
      'normalized_data',
      'raw_data',
      'summary',
      'test_results',
      'test_spec',
      'ui_spec',
      'user_prompt'
    ]);
    expect(persistedLogs[0]?.message).toBe('Generated the compact card layout.');
    reopened.close();
  });

  it('marks interrupted dynamic recipe builds as failed when the bridge reopens', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-11T15:10:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-11T15:10:01.000Z');
    const recipe = database.createRecipe({
      profileId: 'jbarton',
      primarySessionId: session.id,
      title: 'Interrupted shortlist',
      description: 'This build should fail on reopen.',
      status: 'active',
      tabs: createDefaultRecipeTabs('markdown'),
      uiState: {
        activeTab: 'content'
      },
      source: 'hermes'
    });
    const build = database.startRecipeBuild({
      id: `recipe-build-${recipe!.id}-interrupted`,
      recipeId: recipe!.id,
      profileId: 'jbarton',
      sessionId: session.id,
      buildVersion: 1,
      buildKind: 'compiled_home',
      triggerKind: 'chat',
      triggerRequestId: 'request-recipe-build-interrupted',
      triggerActionId: null,
      phase: 'generating_ui',
      progressMessage: 'Generating UI…',
      retryCount: 0,
      startedAt: '2026-04-11T15:10:02.000Z',
      updatedAt: '2026-04-11T15:10:03.000Z',
      completedAt: null,
      errorCode: null,
      errorMessage: null,
      errorDetail: null,
      failureCategory: null,
      failureStage: null,
      userFacingMessage: null,
      retryable: null,
      configuredTimeoutMs: null
    });
    database.appendRecipeBuildLog({
      id: `${build.id}-log-1`,
      recipeId: recipe!.id,
      buildId: build.id,
      phase: 'generating_ui',
      level: 'info',
      message: 'Generating the initial compact UI.',
      detail: undefined,
      createdAt: '2026-04-11T15:10:03.000Z'
    });
    database.close();

    const reopened = new BridgeDatabase(databasePath);
    const persistedRecipe = reopened.getRecipe(recipe!.id);
    const persistedBuild = reopened.getRecipeBuild(build.id);

    expect(persistedRecipe?.renderMode).toBe('legacy_content_v1');
    expect(persistedRecipe?.dynamic?.activeBuild?.phase).toBe('failed');
    expect(persistedRecipe?.dynamic?.activeBuild?.errorCode).toBe('RECIPE_BUILD_INTERRUPTED');
    expect(persistedBuild?.phase).toBe('failed');
    expect(persistedBuild?.errorMessage).toContain('interrupted');
    reopened.close();
  });

  it('prefers failed active-build artifacts while backfilling ready artifacts for dynamic spaces', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-11T16:10:00.000Z'
    );

    const session = database.createSession('jbarton', '2026-04-11T16:10:01.000Z');
    const recipe = database.createRecipe({
      profileId: 'jbarton',
      primarySessionId: session.id,
      title: 'Ready shortlist',
      description: 'Persisted ready build fixture',
      status: 'active',
      tabs: createDefaultRecipeTabs('markdown'),
      uiState: {
        activeTab: 'content'
      },
      source: 'bridge'
    });
    const fixtures = createDynamicRecipeBuildFixtures(recipe!.id, session.id);

    database.startRecipeBuild(fixtures.build);
    for (const artifact of Object.values(fixtures.artifacts)) {
      database.upsertRecipeBuildArtifact({
        id: `${fixtures.build.id}-${artifact.kind}`,
        recipeId: recipe!.id,
        buildId: fixtures.build.id,
        artifactKind: artifact.kind,
        schemaVersion: artifact.schemaVersion,
        payload: artifact,
        createdAt: fixtures.build.startedAt,
        updatedAt: fixtures.build.completedAt ?? fixtures.build.updatedAt
      });
    }
    database.promoteRecipeBuild(recipe!.id, {
      buildId: fixtures.build.id,
      tabs: normalizeRecipeTabs({
        contentFormat: 'markdown',
        contentData: {
          markdown: fixtures.artifacts.fallback.summaryMarkdown
        }
      })
    });

    const failedBuild = database.startRecipeBuild({
      id: `recipe-build-${recipe!.id}-failed`,
      recipeId: recipe!.id,
      profileId: 'jbarton',
      sessionId: session.id,
      buildVersion: 2,
      buildKind: 'compiled_home',
      triggerKind: 'refresh',
      triggerRequestId: 'request-recipe-build-failed',
      triggerActionId: 'retry-build',
      phase: 'failed',
      progressMessage: 'Recipe data could not be recovered. Showing a safe fallback…',
      retryCount: 1,
      startedAt: '2026-04-11T16:15:00.000Z',
      updatedAt: '2026-04-11T16:15:10.000Z',
      completedAt: '2026-04-11T16:15:10.000Z',
      errorCode: 'RECIPE_DATA_BLOCK_REPAIR_FAILED',
      errorMessage: 'The structured recipe payload could not be recovered.',
      errorDetail: 'Hermes did not return a usable Hermes recipe-data block during the repair step.',
      failureCategory: 'baseline_recipe_failure',
      failureStage: 'baseline_failed',
      userFacingMessage: 'Hermes completed the task, but the Home recipe baseline could not be updated. The assistant answer is still available in chat.',
      retryable: true,
      configuredTimeoutMs: null
    });
    for (const artifact of [
      {
        kind: 'summary' as const,
        schemaVersion: 'recipe_summary/v1' as const,
        title: 'Repair fallback',
        subtitle: 'Structured recipe unavailable',
        statusLabel: 'Build failed',
        badges: ['dynamic', 'degraded'],
        stats: [],
        links: [],
        lastBuiltAt: '2026-04-11T16:15:10.000Z',
        note: 'Showing a safe fallback after the repair step failed.'
      },
      {
        kind: 'fallback' as const,
        schemaVersion: 'recipe_fallback/v1' as const,
        title: 'Repair fallback',
        message: 'Hermes completed the answer, but the structured recipe payload could not be recovered.',
        summaryMarkdown: 'Done.\n\nShowing the safe fallback.',
        datasetPreview: [],
        canRetry: true
      },
      {
        kind: 'action_spec' as const,
        schemaVersion: 'recipe_action_spec/v1' as const,
        actions: [
          {
            id: 'retry-build',
            label: 'Retry build',
            kind: 'bridge' as const,
            intent: 'secondary' as const,
            description: 'Retry the latest dynamic recipe build.',
            visibility: {
              requiresSelection: 'none' as const,
              whenBuildReady: false
            },
            bridge: {
              handler: 'retry_build' as const,
              payload: {}
            },
            metadata: {}
          }
        ]
      }
    ]) {
      database.upsertRecipeBuildArtifact({
        id: `${failedBuild.id}-${artifact.kind}`,
        recipeId: recipe!.id,
        buildId: failedBuild.id,
        artifactKind: artifact.kind,
        schemaVersion: artifact.schemaVersion,
        payload: artifact,
        createdAt: failedBuild.startedAt,
        updatedAt: failedBuild.completedAt ?? failedBuild.updatedAt
      });
    }

    const persistedRecipe = database.getRecipe(recipe!.id);

    expect(persistedRecipe?.dynamic?.activeBuild?.phase).toBe('failed');
    expect(persistedRecipe?.dynamic?.summary?.title).toBe('Repair fallback');
    expect(persistedRecipe?.dynamic?.fallback?.message).toContain('could not be recovered');
    expect(persistedRecipe?.dynamic?.actionSpec?.actions.map((action) => action.id)).toContain('retry-build');
    expect(persistedRecipe?.dynamic?.uiSpec?.kind).toBe('ui_spec');

    database.close();
  });

  it('merges a CLI-synced runtime session into the active local session when the runtime id collides', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    const localSession = database.createSession('jbarton', '2026-04-08T20:01:00.000Z');
    database.appendMessage({
      id: 'local-user',
      sessionId: localSession.id,
      role: 'user',
      content: 'Browser bridge persistence smoke',
      createdAt: '2026-04-08T20:01:01.000Z',
      status: 'completed',
      requestId: null,
      visibility: 'transcript',
      kind: 'conversation'
    });

    database.importSession(
      {
        id: 'runtime-session-009',
        runtimeSessionId: 'session-009',
        title: 'Browser bridge persistence smoke',
        summary: 'Browser bridge persistence smoke · 2026-04-08T20:01:02.000Z · via cli',
        source: 'hermes_cli',
        lastUpdatedAt: '2026-04-08T20:01:02.000Z',
        lastUsedProfileId: 'jbarton',
        associatedProfileIds: ['jbarton'],
        messageCount: 1,
        attachedRecipeId: null,
        recipeType: 'tui'
      },
      {
        createdAt: '2026-04-08T20:01:02.000Z',
        updatedAt: '2026-04-08T20:01:02.000Z',
        lastMessageSyncAt: '2026-04-08T20:01:02.000Z'
      }
    );
    database.replaceSessionMessages(
      'runtime-session-009',
      [
        {
          id: 'runtime-assistant',
          sessionId: 'runtime-session-009',
          role: 'assistant',
          content: 'Fixture Hermes reply for jbarton: Browser bridge persistence smoke',
          createdAt: '2026-04-08T20:01:02.000Z',
          status: 'completed',
          requestId: null,
          visibility: 'transcript',
          kind: 'conversation'
        }
      ],
      '2026-04-08T20:01:03.000Z'
    );
    database.setActiveSession('jbarton', 'runtime-session-009');

    database.updateSession({
      id: localSession.id,
      runtimeSessionId: 'session-009',
      lastUsedProfileId: 'jbarton'
    });

    const mergedSession = database.getSession(localSession.id);
    const mergedMessages = database.listMessages(localSession.id);
    const duplicateSession = database.getSession('runtime-session-009');
    const uiState = database.getUiState();

    expect(mergedSession?.runtimeSessionId).toBe('session-009');
    expect(mergedSession?.messageCount).toBe(2);
    expect(mergedMessages.map((message) => message.id)).toEqual(['local-user', 'runtime-assistant']);
    expect(duplicateSession).toBeNull();
    expect(uiState.activeSessionIdByProfile.jbarton).toBe(localSession.id);
    expect(uiState.recentSessionIdsByProfile.jbarton?.[0]).toBe(localSession.id);
    database.close();
  });

  it('keeps recent-session ordering driven by real interaction time instead of sync time', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    const localSession = database.importSession(
      {
        id: 'local-session-101',
        title: 'Manual local session',
        summary: 'Manual local session',
        source: 'local',
        lastUpdatedAt: '2026-04-08T20:01:00.000Z',
        lastUsedProfileId: 'jbarton',
        associatedProfileIds: ['jbarton'],
        messageCount: 0,
        attachedRecipeId: null,
        recipeType: 'tui'
      },
      {
        createdAt: '2026-04-08T20:01:00.000Z',
        updatedAt: '2026-04-08T20:01:00.000Z'
      }
    );
    expect(localSession?.id).toBe('local-session-101');
    database.associateSessionWithProfile('local-session-101', 'jbarton', 'manual', '2026-04-08T20:03:00.000Z');

    database.syncSessions(
      'jbarton',
      [
        {
          id: 'runtime-session-101',
          runtimeSessionId: 'session-101',
          title: 'Older runtime session',
          summary: 'Older runtime session · via cli',
          source: 'hermes_cli',
          lastUpdatedAt: '2026-04-08T20:02:00.000Z',
          lastUsedProfileId: 'jbarton',
          associatedProfileIds: ['jbarton'],
          messageCount: 0,
          attachedRecipeId: null,
          recipeType: 'tui'
        }
      ],
      '2026-04-08T20:04:00.000Z'
    );

    expect(database.listRecentSessions('jbarton', 5)[0]?.id).toBe('local-session-101');

    database.syncSessions(
      'jbarton',
      [
        {
          id: 'runtime-session-101',
          runtimeSessionId: 'session-101',
          title: 'Older runtime session',
          summary: 'Older runtime session · via cli',
          source: 'hermes_cli',
          lastUpdatedAt: '2026-04-08T20:05:00.000Z',
          lastUsedProfileId: 'jbarton',
          associatedProfileIds: ['jbarton'],
          messageCount: 0,
          attachedRecipeId: null,
          recipeType: 'tui'
        }
      ],
      '2026-04-08T20:06:00.000Z'
    );

    expect(database.listRecentSessions('jbarton', 5)[0]?.runtimeSessionId).toBe('session-101');
    database.close();
  });

  it('prefers the persisted per-profile recent-session order for bootstrap recents', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    const localSession = database.createSession('jbarton', '2026-04-08T20:01:00.000Z');
    database.syncSessions(
      'jbarton',
      [
        {
          id: 'runtime-session-202',
          runtimeSessionId: 'session-202',
          title: 'CLI session',
          summary: 'CLI session · via cli',
          source: 'hermes_cli',
          lastUpdatedAt: '2026-04-08T20:05:00.000Z',
          lastUsedProfileId: 'jbarton',
          associatedProfileIds: ['jbarton'],
          messageCount: 0,
          attachedRecipeId: null,
          recipeType: 'tui'
        }
      ],
      '2026-04-08T20:06:00.000Z'
    );

    database.setActiveSession('jbarton', localSession.id);

    const recentSessions = database.listRecentSessions('jbarton', 5);

    expect(recentSessions[0]?.id).toBe(localSession.id);
    expect(recentSessions.some((session) => session.runtimeSessionId === 'session-202')).toBe(true);
    database.close();
  });

  it('persists provider connections separately for each profile', () => {
    const databasePath = createDatabasePath();
    const first = new BridgeDatabase(databasePath);

    first.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        },
        {
          id: '8tn',
          name: '8tn',
          description: 'openrouter/openai/gpt-5.4',
          path: '/Users/example/.hermes/profiles/8tn',
          isActive: false
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    first.replaceProviderConnections('jbarton', [
      {
        id: 'openrouter',
        profileId: 'jbarton',
        displayName: 'OpenRouter',
        authKind: 'api_key',
        status: 'connected',
        source: 'config',
        maskedCredential: 'sk-o...1111',
        supportsApiKey: true,
        supportsOAuth: false,
        lastSyncedAt: '2026-04-08T20:00:00.000Z'
      }
    ]);
    first.replaceProviderConnections('8tn', [
      {
        id: 'openrouter',
        profileId: '8tn',
        displayName: 'OpenRouter',
        authKind: 'api_key',
        status: 'available',
        source: 'catalog',
        supportsApiKey: true,
        supportsOAuth: false,
        lastSyncedAt: '2026-04-08T20:00:00.000Z'
      }
    ]);
    first.close();

    const reopened = new BridgeDatabase(databasePath);
    const jbartonProviders = reopened.listProviderConnections('jbarton');
    const profile8tnProviders = reopened.listProviderConnections('8tn');

    expect(jbartonProviders).toHaveLength(1);
    expect(jbartonProviders[0]?.id).toBe('openrouter');
    expect(jbartonProviders[0]?.status).toBe('connected');
    expect(profile8tnProviders).toHaveLength(1);
    expect(profile8tnProviders[0]?.id).toBe('openrouter');
    expect(profile8tnProviders[0]?.status).toBe('available');
    reopened.close();
  });

  it('persists runtime requests, finalizes unresolved activities, and stores telemetry across reopen', () => {
    const databasePath = createDatabasePath();
    const first = new BridgeDatabase(databasePath);

    first.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    const session = first.createSession('jbarton', '2026-04-08T20:01:00.000Z');
    first.appendMessage({
      id: 'message-request-1',
      sessionId: session.id,
      role: 'user',
      content: 'Check unread email.',
      createdAt: '2026-04-08T20:01:00.000Z',
      status: 'completed',
      requestId: 'request-1',
      visibility: 'transcript',
      kind: 'conversation'
    });
    first.ensureRuntimeRequest({
      requestId: 'request-1',
      sessionId: session.id,
      profileId: 'jbarton',
      preview: 'Check unread email.',
      startedAt: '2026-04-08T20:01:00.000Z',
      status: 'running'
    });
    first.appendRuntimeActivity(
      'request-1',
      session.id,
      'jbarton',
      {
        kind: 'tool',
        state: 'started',
        label: 'gmail_unread_count',
        requestId: 'request-1',
        timestamp: '2026-04-08T20:01:01.000Z'
      },
      {
        preview: 'Check unread email.'
      }
    );
    first.appendRuntimeActivity(
      'request-1',
      session.id,
      'jbarton',
      {
        kind: 'status',
        state: 'updated',
        label: 'Runtime status',
        detail: 'Checking inbox…',
        requestId: 'request-1',
        timestamp: '2026-04-08T20:01:02.000Z'
      },
      {
        preview: 'Check unread email.'
      }
    );
    first.appendTelemetryEvent({
      id: 'telemetry-1',
      profileId: 'jbarton',
      sessionId: session.id,
      requestId: 'request-1',
      severity: 'error',
      category: 'runtime',
      code: 'CHAT_STREAM_FAILED',
      message: 'Hermes could not finish the request.',
      detail: 'Fixture runtime failure.',
      payload: {
        source: 'test'
      },
      createdAt: '2026-04-08T20:01:03.000Z'
    });
    first.upsertRuntimeRequestStatus('request-1', 'failed', '2026-04-08T20:01:04.000Z', {
      profileId: 'jbarton',
      sessionId: session.id,
      preview: 'Check unread email.',
      lastError: 'Fixture runtime failure.'
    });
    first.close();

    const reopened = new BridgeDatabase(databasePath);
    const request = reopened.getRuntimeRequest('request-1');
    const telemetry = reopened.listTelemetryEvents({
      profileId: 'jbarton',
      sessionId: session.id,
      requestId: 'request-1'
    });

    expect(request?.status).toBe('failed');
    expect(request?.telemetryCount).toBe(1);
    expect(request?.lastError).toBe('Fixture runtime failure.');
    expect(request?.activities.every((activity) => ['completed', 'failed', 'cancelled', 'denied'].includes(activity.state))).toBe(true);
    expect(request?.activities.every((activity) => activity.timestamp.length > 0)).toBe(true);
    expect(telemetry[0]?.code).toBe('CHAT_STREAM_FAILED');
    reopened.close();
  });

  it('preserves a local session title override across Hermes session syncs', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    database.importSession(
      {
        id: 'runtime-session-1',
        runtimeSessionId: 'cli-session-1',
        title: 'Hermes title',
        summary: 'Imported summary',
        source: 'hermes_cli',
        lastUpdatedAt: '2026-04-08T20:00:00.000Z',
        lastUsedProfileId: 'jbarton',
        associatedProfileIds: ['jbarton'],
        messageCount: 1,
        attachedRecipeId: null,
        recipeType: 'tui'
      },
      {
        createdAt: '2026-04-08T20:00:00.000Z',
        updatedAt: '2026-04-08T20:00:00.000Z',
        lastMessageSyncAt: '2026-04-08T20:00:00.000Z'
      }
    );

    database.renameSessionTitle('runtime-session-1', 'Local override title', {
      persistOverride: true
    });

    database.syncSessions(
      'jbarton',
      [
        {
          id: 'cli-session-1',
          runtimeSessionId: 'cli-session-1',
          title: 'Hermes title changed upstream',
          summary: 'Updated summary',
          source: 'hermes_cli',
          lastUpdatedAt: '2026-04-08T21:00:00.000Z',
          lastUsedProfileId: 'jbarton',
          associatedProfileIds: ['jbarton'],
          messageCount: 3,
          attachedRecipeId: null,
          recipeType: 'tui'
        }
      ],
      '2026-04-08T21:00:00.000Z'
    );

    const session = database.getSession('runtime-session-1');

    expect(session?.title).toBe('Local override title');
    expect(session?.summary).toBe('Updated summary');
    database.close();
  });

  it('hides deleted sessions and reactivates them when Hermes reports newer activity', () => {
    const databasePath = createDatabasePath();
    const database = new BridgeDatabase(databasePath);

    database.syncProfiles(
      [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4 · gateway stopped',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      '2026-04-08T20:00:00.000Z'
    );

    database.importSession(
      {
        id: 'runtime-session-2',
        runtimeSessionId: 'cli-session-2',
        title: 'Deletable runtime session',
        summary: 'Imported summary',
        source: 'hermes_cli',
        lastUpdatedAt: '2026-04-08T20:00:00.000Z',
        lastUsedProfileId: 'jbarton',
        associatedProfileIds: ['jbarton'],
        messageCount: 1,
        attachedRecipeId: null,
        recipeType: 'tui'
      },
      {
        createdAt: '2026-04-08T20:00:00.000Z',
        updatedAt: '2026-04-08T20:00:00.000Z',
        lastMessageSyncAt: '2026-04-08T20:00:00.000Z'
      }
    );

    database.markSessionDeleted('runtime-session-2', 'hybrid', '2026-04-08T20:30:00.000Z');
    expect(database.listSessions({ profileId: 'jbarton', page: 1, pageSize: 20, search: '' }).items).toHaveLength(0);

    database.syncSessions(
      'jbarton',
      [
        {
          id: 'cli-session-2',
          runtimeSessionId: 'cli-session-2',
          title: 'Deletable runtime session',
          summary: 'No new activity yet',
          source: 'hermes_cli',
          lastUpdatedAt: '2026-04-08T20:15:00.000Z',
          lastUsedProfileId: 'jbarton',
          associatedProfileIds: ['jbarton'],
          messageCount: 1,
          attachedRecipeId: null,
          recipeType: 'tui'
        }
      ],
      '2026-04-08T20:31:00.000Z'
    );

    expect(database.listSessions({ profileId: 'jbarton', page: 1, pageSize: 20, search: '' }).items).toHaveLength(0);

    database.syncSessions(
      'jbarton',
      [
        {
          id: 'cli-session-2',
          runtimeSessionId: 'cli-session-2',
          title: 'Deletable runtime session',
          summary: 'Hermes saw new activity',
          source: 'hermes_cli',
          lastUpdatedAt: '2026-04-08T20:45:00.000Z',
          lastUsedProfileId: 'jbarton',
          associatedProfileIds: ['jbarton'],
          messageCount: 2,
          attachedRecipeId: null,
          recipeType: 'tui'
        }
      ],
      '2026-04-08T20:45:00.000Z'
    );

    const visibleSessions = database.listSessions({ profileId: 'jbarton', page: 1, pageSize: 20, search: '' }).items;
    expect(visibleSessions).toHaveLength(1);
    expect(visibleSessions[0]?.id).toBe('runtime-session-2');
    expect(visibleSessions[0]?.summary).toBe('Hermes saw new activity');
    database.close();
  });
});
