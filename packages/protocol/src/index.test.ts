import { describe, expect, it } from 'vitest';
import {
  AuditEventsResponseSchema,
  BootstrapResponseSchema,
  ChatStreamEventSchema,
  ChatStreamRequestSchema,
  CreateRecipeRequestSchema,
  DeleteSessionRequestSchema,
  DeleteRecipeRequestSchema,
  DeleteSkillRequestSchema,
  ExecuteRecipeActionRequestSchema,
  HermesCliActionResultSchema,
  HermesCliModelDiscoverySchema,
  JobSchema,
  ModelProviderResponseSchema,
  OpenRecipeChatResponseSchema,
  ProfileSchema,
  RenameSessionRequestSchema,
  RuntimeRequestSchema,
  RecipeActionSpecSchema,
  RecipeAnalysisSchema,
  RecipeArtifactSchema,
  RecipeBuildSchema,
  RecipeDynamicStateSchema,
  RecipeFallbackStateSchema,
  RecipeIntentSchema,
  RecipeMetadataSchema,
  RecipeNormalizedDataSchema,
  SessionDeletionResponseSchema,
  SessionMessagesResponseSchema,
  SessionSchema,
  RecipeContentEntrySchema,
  RecipeSummarySchema,
  RecipeTestResultsSchema,
  RecipeTestSpecSchema,
  RecipeUiSpecSchema,
  RecipeUserPromptArtifactSchema,
  RecipeRawDataSchema,
  RecipeAssistantContextSchema,
  RecipeResponseSchema,
  RecipesResponseSchema,
  SkillDeletionResponseSchema,
  SettingsResponseSchema,
  SkillSchema,
  TelemetryResponseSchema,
  ToolExecutionPrepareRequestSchema,
  ToolSchema,
  UiStateSchema,
  RecipeDslSchema,
  RecipeModelSchema,
  RecipePatchSchema
} from './index';
import {
  getRecipeContentEntries,
  getRecipeContentFormat,
  getRecipeContentTab,
  getRecipeContentViewData,
  isRecipeContentSynchronized,
  normalizeLegacyRecipeTabs,
  removeRecipeContentEntries,
  normalizeRecipeTabs
} from './recipe-helpers';

describe('protocol schemas', () => {
  it('parses bootstrap responses with profile-scoped ui state', () => {
    const parsed = BootstrapResponseSchema.parse({
      connection: {
        status: 'connected',
        checkedAt: '2026-04-08T20:00:00.000Z',
        usingCachedData: false
      },
      profiles: [
        {
          id: 'jbarton',
          name: 'jbarton',
          description: 'openai/gpt-5.4',
          path: '/Users/example/.hermes/profiles/jbarton',
          isActive: true
        }
      ],
      activeProfileId: 'jbarton',
      activeSessionId: null,
      recentSessions: [],
      sessionSummary: {
        profileId: 'jbarton',
        visibleCount: 0,
        hiddenSyntheticCount: 2,
        recentCount: 0
      },
      settings: {
        themeMode: 'dark',
        sessionsPageSize: 50,
        chatTimeoutMs: 180_000,
        discoveryTimeoutMs: 240_000,
        nearbySearchTimeoutMs: 300_000,
        recipeOperationTimeoutMs: 180_000,
        unrestrictedTimeoutMs: 1_800_000,
        restrictedChatMaxTurns: 8,
        unrestrictedAccessEnabled: false
      },
      uiState: {
        activeProfileId: 'jbarton',
        currentPage: 'chat',
        activeSessionIdByProfile: {
          jbarton: null
        },
        recentSessionIdsByProfile: {
          jbarton: []
        },
        toolsTab: 'all'
      }
    });

    expect(parsed.settings.restrictedChatMaxTurns).toBe(8);
    expect(parsed.connection.status).toBe('connected');
    expect(parsed.sessionSummary?.hiddenSyntheticCount).toBe(2);
  });

  it('parses paginated telemetry and audit-event responses', () => {
    const telemetry = TelemetryResponseSchema.parse({
      items: [
        {
          id: 'telemetry-1',
          profileId: 'jbarton',
          sessionId: 'session-1',
          requestId: 'request-1',
          severity: 'warning',
          category: 'recipes',
          code: 'SPACE_DATA_STRUCTURED_ONLY_FAILED_EMPTY_PAYLOAD',
          message: 'Structured-only generation emitted an empty payload.',
          detail: 'The response contained only whitespace.',
          payload: {},
          createdAt: '2026-04-11T18:00:00.000Z'
        }
      ],
      page: 2,
      pageSize: 25,
      total: 31
    });
    const audit = AuditEventsResponseSchema.parse({
      items: [
        {
          id: 'audit-1',
          type: 'unrestricted_access_used',
          profileId: 'jbarton',
          sessionId: 'session-1',
          message: 'Unrestricted Access was used for session session-1.',
          createdAt: '2026-04-11T18:01:00.000Z'
        }
      ],
      page: 1,
      pageSize: 20,
      total: 1
    });

    expect(telemetry.page).toBe(2);
    expect(telemetry.total).toBe(31);
    expect(audit.items[0]?.type).toBe('unrestricted_access_used');
  });

  it('rejects timeout settings above the supported caps', () => {
    expect(() =>
      SettingsResponseSchema.parse({
        settings: {
          themeMode: 'dark',
          sessionsPageSize: 50,
          chatTimeoutMs: 900_001,
          discoveryTimeoutMs: 240_000,
          nearbySearchTimeoutMs: 300_000,
          recipeOperationTimeoutMs: 180_000,
          unrestrictedTimeoutMs: 1_800_000,
          restrictedChatMaxTurns: 8,
          unrestrictedAccessEnabled: false
        },
        accessAudit: {
          latestEvents: []
        }
      })
    ).toThrowError();

    expect(() =>
      SettingsResponseSchema.parse({
        settings: {
          themeMode: 'dark',
          sessionsPageSize: 50,
          chatTimeoutMs: 180_000,
          discoveryTimeoutMs: 1_800_001,
          nearbySearchTimeoutMs: 300_000,
          recipeOperationTimeoutMs: 180_000,
          unrestrictedTimeoutMs: 1_800_000,
          restrictedChatMaxTurns: 8,
          unrestrictedAccessEnabled: false
        },
        accessAudit: {
          latestEvents: []
        }
      })
    ).toThrowError();
  });

  it('rejects invalid tools', () => {
    expect(() =>
      ToolSchema.parse({
        id: 'terminal',
        source: 'bridge',
        scope: 'local',
        name: 'terminal',
        description: 'Reviewed terminal access',
        enabled: true,
        status: 'enabled',
        approvalModel: 'surprise',
        capabilities: [],
        restrictions: [],
        lastSyncedAt: '2026-04-08T20:00:00.000Z'
      })
    ).toThrowError();
  });

  it('parses session message payloads with a profile id', () => {
    const parsed = SessionMessagesResponseSchema.parse({
      profileId: 'session-owner',
      session: {
        id: 'session-1',
        title: 'Hello',
        summary: 'Most recent chat',
        source: 'local',
        lastUpdatedAt: '2026-04-08T20:00:00.000Z',
        associatedProfileIds: ['session-owner'],
        messageCount: 2,
        recipeType: 'home'
      },
      messages: [
        {
          id: 'message-1',
          sessionId: 'session-1',
          role: 'user',
          content: 'Hello',
          createdAt: '2026-04-08T20:00:00.000Z',
          requestId: 'request-1',
          visibility: 'transcript'
        }
      ]
    });

    expect(parsed.messages[0]?.sessionId).toBe('session-1');
    expect(parsed.profileId).toBe('session-owner');
    expect(parsed.runtimeRequests).toEqual([]);
    expect(parsed.session.recipeType).toBe('home');
  });

  it('parses the v2 recipe authoring DSL and repair-oriented build states', () => {
    const dsl = RecipeDslSchema.parse({
      kind: 'recipe_dsl',
      schemaVersion: 'recipe_dsl/v2',
      sdkVersion: 'recipe_sdk/v1',
      title: 'Inbox summary',
      summary: 'Show the unread inbox summary first.',
      status: 'active',
      tabs: [
        {
          id: 'tab-overview',
          label: 'Overview',
          sectionIds: ['section-summary'],
          layout: 'stack',
          metadata: {}
        }
      ],
      datasets: [
        {
          id: 'inbox-items',
          title: 'Unread email',
          display: 'table',
          fields: ['from', 'subject'],
          focusEntityId: null,
          notes: [],
          metadata: {}
        }
      ],
      sections: [
        {
          id: 'section-summary',
          type: 'summary',
          title: 'Inbox summary',
          body: '### Overview',
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
      notes: [],
      operations: [
        {
          op: 'set_active_tab',
          tabId: 'tab-overview'
        }
      ],
      semanticHints: {
        primaryDatasetId: 'inbox-items',
        preferredLayout: 'stack',
        notes: [],
        narrowPaneStrategy: 'stack'
      },
      metadata: {}
    });

    const build = RecipeBuildSchema.parse({
      id: 'recipe-build-1',
      recipeId: 'recipe-1',
      profileId: 'jbarton',
      sessionId: 'session-1',
      buildVersion: 2,
      buildKind: 'dsl_enrichment',
      triggerKind: 'retry',
      triggerRequestId: 'request-1',
      triggerActionId: 'retry-build',
      phase: 'dsl_repairing',
      progressMessage: 'Repairing the richer recipe DSL once from persisted artifacts…',
      retryCount: 1,
      startedAt: '2026-04-13T02:00:00.000Z',
      updatedAt: '2026-04-13T02:00:05.000Z',
      completedAt: null,
      errorCode: null,
      errorMessage: null,
      errorDetail: null,
      failureCategory: 'dsl_repair_failed',
      failureStage: 'enrichment_validating',
      userFacingMessage: 'The baseline is still ready while one bounded repair runs.',
      retryable: true,
      configuredTimeoutMs: 90000
    });

    expect(dsl.schemaVersion).toBe('recipe_dsl/v2');
    expect(build.phase).toBe('dsl_repairing');
    expect(build.failureCategory).toBe('dsl_repair_failed');
  });

  it('tracks Home recipe metadata and session type explicitly', () => {
    const session = SessionSchema.parse({
      id: 'session-home',
      title: 'Hermes Home session',
      summary: 'Latest Home recipe',
      source: 'local',
      lastUpdatedAt: '2026-04-12T15:00:00.000Z',
      associatedProfileIds: ['jbarton'],
      attachedRecipeId: 'recipe-home',
      recipeType: 'home'
    });
    const metadata = RecipeMetadataSchema.parse({
      changeVersion: 2,
      auditTags: ['home'],
      homeRecipe: true,
      baselineContentUpdatedAt: '2026-04-12T15:00:00.000Z',
      latestRecipeAttemptOutcome: 'markdown_fallback',
      latestRecipeAttemptMode: 'markdown_fallback'
    });

    expect(session.recipeType).toBe('home');
    expect(metadata.homeRecipe).toBe(true);
    expect(metadata.latestRecipeAttemptOutcome).toBe('markdown_fallback');
  });

  it('parses explicit task, baseline, and enrichment pipeline state for Home recipes', () => {
    const metadata = RecipeMetadataSchema.parse({
      changeVersion: 3,
      auditTags: ['home', 'pipeline'],
      homeRecipe: true,
      baselineContentUpdatedAt: '2026-04-12T15:00:00.000Z',
      recipePipeline: {
        currentStage: 'enrichment_failed',
        task: {
          status: 'ready',
          stage: 'task_ready',
          message: 'Hermes completed the task.',
          updatedAt: '2026-04-12T15:00:00.000Z'
        },
        baseline: {
          status: 'ready',
          stage: 'baseline_ready',
          message: 'The Home recipe baseline is ready.',
          updatedAt: '2026-04-12T15:00:01.000Z'
        },
        applet: {
          status: 'failed',
          stage: 'enrichment_failed',
          failureCategory: 'dsl_generation_failure',
          message: 'The Home recipe baseline is ready, but Hermes did not produce a valid recipe DSL artifact. You can retry recipe enrichment.',
          diagnostic: 'Hermes did not emit a valid recipe DSL artifact.',
          retryable: true,
          configuredTimeoutMs: 30_000,
          updatedAt: '2026-04-12T15:00:02.000Z'
        }
      }
    });
    const runtimeRequest = RuntimeRequestSchema.parse({
      requestId: 'request-1',
      profileId: 'jbarton',
      sessionId: 'session-home',
      preview: 'Find boutique hotels in Dayton.',
      messageIds: ['message-1', 'message-2'],
      activities: [],
      status: 'completed',
      startedAt: '2026-04-12T15:00:00.000Z',
      updatedAt: '2026-04-12T15:00:02.000Z',
      completedAt: '2026-04-12T15:00:02.000Z',
      recipePipeline: metadata.recipePipeline,
      telemetryCount: 2
    });

    expect(metadata.recipePipeline?.baseline.status).toBe('ready');
    expect(metadata.recipePipeline?.applet.failureCategory).toBe('dsl_generation_failure');
    expect(runtimeRequest.recipePipeline?.currentStage).toBe('enrichment_failed');
    expect(runtimeRequest.recipePipeline?.applet.configuredTimeoutMs).toBe(30_000);
  });

  it('validates tool execution preparation', () => {
    const parsed = ToolExecutionPrepareRequestSchema.parse({
      toolId: 'bridge:reviewed-shell',
      profileId: 'jbarton',
      sessionId: 'session-1',
      summary: 'Inspect the recipe root',
      command: 'pwd',
      args: [],
      cwd: '.'
    });

    expect(parsed.command).toBe('pwd');
  });

  it('validates chat stream activity events', () => {
    const parsed = ChatStreamEventSchema.parse({
      type: 'activity',
      activity: {
        kind: 'skill',
        state: 'completed',
        label: 'google-workspace',
        requestId: 'request-1',
        timestamp: '2026-04-08T20:00:00.000Z'
      }
    });

    expect(parsed.type).toBe('activity');
  });

  it('parses dynamic recipe build artifacts, action requests, and build progress events', () => {
    const userPrompt = RecipeUserPromptArtifactSchema.parse({
      kind: 'user_prompt',
      schemaVersion: 'recipe_user_prompt/v1',
      originalPrompt: 'Find the best boutique hotels in Dayton for a weekend stay.',
      normalizedPrompt: 'Find boutique hotels in Dayton for a weekend stay.',
      requestMode: 'chat'
    });
    const intent = RecipeIntentSchema.parse({
      kind: 'intent',
      schemaVersion: 'recipe_intent/v1',
      category: 'places',
      label: 'nearby shortlist',
      summary: 'Weekend hotel shortlist in Dayton.',
      preferredPresentation: 'cards',
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
      updateTarget: 'new_recipe',
      metadata: {}
    });
    const rawData = RecipeRawDataSchema.parse({
      kind: 'raw_data',
      schemaVersion: 'recipe_raw_data/v1',
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
    });
    const assistantContext = RecipeAssistantContextSchema.parse({
      kind: 'assistant_context',
      schemaVersion: 'recipe_assistant_context/v1',
      summary: 'I assembled a compact shortlist of weekend-friendly boutique hotel options.',
      responseLead: 'Here is a compact shortlist.',
      responseTail: 'I can refine the list by neighborhood or budget.',
      links: rawData.links,
      citations: [],
      metadata: {}
    });
    const normalizedData = RecipeNormalizedDataSchema.parse({
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
              description: 'Boutique stay with a walkable downtown location.',
              badges: ['walkable'],
              fields: [
                {
                  key: 'price',
                  label: 'Price',
                  value: '$210',
                  presentation: 'text',
                  emphasis: 'primary'
                },
                {
                  key: 'neighborhood',
                  label: 'Neighborhood',
                  value: 'Downtown',
                  presentation: 'text',
                  emphasis: 'none'
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
          fields: [],
          stats: [
            {
              id: 'stat-results',
              label: 'Options',
              value: '2',
              emphasis: 'primary',
              tone: 'info'
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
          emphasis: 'primary',
          tone: 'info'
        }
      ],
      notes: ['Focus on walkable downtown options first.'],
      links: rawData.links,
      metadata: {}
    });
    const uiSpec = RecipeUiSpecSchema.parse({
      kind: 'ui_spec',
      schemaVersion: 'recipe_ui/v1',
      layout: 'stack_with_detail',
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
          kind: 'summary',
          title: 'Overview',
          subtitle: 'Compact shortlist summary',
          statIds: ['stat-results'],
          actionIds: ['refresh-recipe']
        },
        {
          id: 'results',
          kind: 'collection',
          title: 'Results',
          datasetId: 'primary',
          presentation: 'cards',
          pageSize: 4,
          searchable: true,
          selection: 'single',
          detailSectionId: 'detail',
          columns: [],
          cardFields: [
            {
              label: 'Price',
              fieldKey: 'price',
              presentation: 'text',
              emphasize: 'primary'
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
          kind: 'detail',
          title: 'Selection',
          datasetId: 'primary',
          source: 'selected',
          fields: [
            {
              label: 'Price',
              fieldKey: 'price',
              presentation: 'text',
              emphasize: 'primary'
            },
            {
              label: 'Neighborhood',
              fieldKey: 'neighborhood',
              presentation: 'text',
              emphasize: 'none'
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
          kind: 'markdown',
          title: 'Notes',
          content: 'Keep the shortlist compact and favor walkable downtown options.'
        },
        {
          id: 'constraint',
          kind: 'notice',
          tone: 'info',
          title: 'Small-pane mode',
          description: 'This layout is intentionally paginated for the attached recipe column.'
        }
      ]
    });
    const actionSpec = RecipeActionSpecSchema.parse({
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
          id: 'refine-selection',
          label: 'Refine selection',
          kind: 'prompt',
          intent: 'secondary',
          description: 'Narrow the shortlist around the selected hotel.',
          visibility: {
            requiresSelection: 'single',
            whenBuildReady: true,
            datasetId: 'primary'
          },
          prompt: {
            promptTemplate: 'Refine the shortlist around the selected result.',
            includeInputs: ['original_prompt', 'intent', 'recipe_summary', 'normalized_data', 'selected_items', 'page_state', 'filter_state'],
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
    });
    const testSpec = RecipeTestSpecSchema.parse({
      kind: 'test_spec',
      schemaVersion: 'recipe_test_spec/v1',
      cases: [
        {
          id: 'schema-valid',
          kind: 'schema_valid',
          severity: 'critical',
          config: {}
        },
        {
          id: 'compact-layout',
          kind: 'compact_layout',
          severity: 'critical',
          sectionId: 'results',
          config: {
            maxCardColumns: 1,
            maxPageSize: 6
          }
        },
        {
          id: 'actions-resolve',
          kind: 'actions_resolve',
          severity: 'critical',
          config: {}
        }
      ]
    });
    const testResults = RecipeTestResultsSchema.parse({
      kind: 'test_results',
      schemaVersion: 'recipe_test_results/v1',
      status: 'passed',
      blockingFailureCount: 0,
      checkedAt: '2026-04-11T15:05:00.000Z',
      results: [
        {
          id: 'schema-valid',
          kind: 'schema_valid',
          severity: 'critical',
          passed: true,
          message: 'The UI spec parsed successfully.',
          checkedAt: '2026-04-11T15:05:00.000Z'
        },
        {
          id: 'compact-layout',
          kind: 'compact_layout',
          severity: 'critical',
          passed: true,
          message: 'The results section stays within the compact pane limits.',
          checkedAt: '2026-04-11T15:05:00.000Z'
        },
        {
          id: 'actions-resolve',
          kind: 'actions_resolve',
          severity: 'critical',
          passed: true,
          message: 'All referenced actions resolve to a supported handler.',
          checkedAt: '2026-04-11T15:05:00.000Z'
        }
      ]
    });
    const summary = RecipeSummarySchema.parse({
      kind: 'summary',
      schemaVersion: 'recipe_summary/v1',
      title: 'Hotel shortlist',
      subtitle: 'Weekend Dayton options',
      statusLabel: 'Ready',
      badges: ['dynamic', 'validated'],
      stats: normalizedData.summaryStats,
      links: rawData.links,
      lastBuiltAt: '2026-04-11T15:05:00.000Z',
      note: 'Compact card layout selected for the attached recipe pane.'
    });
    const fallback = RecipeFallbackStateSchema.parse({
      kind: 'fallback',
      schemaVersion: 'recipe_fallback/v1',
      title: 'Hotel shortlist',
      message: 'The rich layout is unavailable. Showing a safe summary preview instead.',
      summaryMarkdown: '- Hotel Ardent\n- AC Hotel Dayton',
      datasetPreview: normalizedData.datasets[0]?.items ?? [],
      canRetry: true
    });
    const build = RecipeBuildSchema.parse({
      id: 'recipe-build-1',
      recipeId: 'recipe-1',
      profileId: 'jbarton',
      sessionId: 'session-1',
      buildVersion: 1,
      buildKind: 'compiled_home',
      triggerKind: 'chat',
      triggerRequestId: 'request-1',
      triggerActionId: null,
      phase: 'ready',
      progressMessage: 'Recipe ready.',
      retryCount: 0,
      startedAt: '2026-04-11T15:00:00.000Z',
      updatedAt: '2026-04-11T15:05:00.000Z',
      completedAt: '2026-04-11T15:05:00.000Z',
      errorCode: null,
      errorMessage: null,
      errorDetail: null
    });
    const dynamic = RecipeDynamicStateSchema.parse({
      renderMode: 'dynamic_v1',
      activeBuild: build,
      summary,
      normalizedData,
      uiSpec,
      actionSpec,
      latestTestResults: testResults,
      fallback
    });
    const artifact = RecipeArtifactSchema.parse({
      id: 'artifact-ui-spec',
      recipeId: 'recipe-1',
      buildId: build.id,
      artifactKind: 'ui_spec',
      schemaVersion: 'recipe_ui/v1',
      payload: uiSpec,
      createdAt: '2026-04-11T15:01:00.000Z',
      updatedAt: '2026-04-11T15:02:00.000Z'
    });
    const actionRequest = ExecuteRecipeActionRequestSchema.parse({
      profileId: 'jbarton',
      sessionId: 'session-1',
      actionId: 'refine-selection',
      selectedItemIds: ['hotel-ardent'],
      formValues: {},
      pageState: {
        results: 1
      },
      filterState: {
        neighborhood: 'Downtown'
      }
    });
    const actionModeRequest = ChatStreamRequestSchema.parse({
      profileId: 'jbarton',
      sessionId: 'session-1',
      recipeId: 'recipe-1',
      content: 'Refine the shortlist around Hotel Ardent.',
      mode: 'recipe_action'
    });
    const recipe = RecipeResponseSchema.parse({
      profileId: 'jbarton',
      recipe: {
        schemaVersion: 5,
        id: 'recipe-1',
        profileId: 'jbarton',
        primarySessionId: 'session-1',
        primaryRuntimeSessionId: 'runtime-session-1',
        title: 'Hotel shortlist',
        description: 'Weekend hotel options',
        createdAt: '2026-04-11T15:00:00.000Z',
        updatedAt: '2026-04-11T15:05:00.000Z',
        status: 'active',
        renderMode: 'dynamic_v1',
        tabs: normalizeRecipeTabs({
          contentFormat: 'markdown',
          contentData: {
            markdown: fallback.summaryMarkdown
          }
        }),
        uiState: {
          activeTab: 'content'
        },
        source: 'hermes',
        metadata: {
          changeVersion: 1,
          auditTags: ['dynamic-recipe']
        },
        dynamic
      },
      events: []
    });
    const progressEvent = ChatStreamEventSchema.parse({
      type: 'recipe_build_progress',
      recipeId: 'recipe-1',
      build,
      recipe: recipe.recipe
    });

    expect(intent.category).toBe('places');
    expect(assistantContext.summary).toContain('compact shortlist');
    expect(dynamic.renderMode).toBe('dynamic_v1');
    expect(artifact.payload.kind).toBe('ui_spec');
    expect(testSpec.cases).toHaveLength(3);
    expect(actionRequest.selectedItemIds).toEqual(['hotel-ardent']);
    expect(actionModeRequest.mode).toBe('recipe_action');
    expect(recipe.recipe.dynamic?.uiSpec).toBeDefined();
    expect(recipe.recipe.dynamic?.uiSpec?.kind).toBe('ui_spec');
    expect(progressEvent.type).toBe('recipe_build_progress');
  });

  it('parses locally analyzed recipe data and composable v2 ui specs', () => {
    const analysis = RecipeAnalysisSchema.parse({
      kind: 'analysis',
      schemaVersion: 'recipe_analysis/v1',
      primaryDatasetId: 'primary',
      datasets: [
        {
          id: 'primary',
          label: 'Weekend shortlist',
          path: 'root.hotels',
          kind: 'collection',
          origin: 'array',
          itemCount: 2,
          cardinality: 'many',
          fields: [
            {
              key: 'name',
              label: 'Name',
              path: 'root.hotels.name',
              valueKind: 'string',
              roles: ['title'],
              distinctCount: 2,
              nonEmptyCount: 2,
              examples: ['Hotel Ardent']
            },
            {
              key: 'price',
              label: 'Price',
              path: 'root.hotels.price',
              valueKind: 'string',
              roles: ['metric', 'sort'],
              distinctCount: 2,
              nonEmptyCount: 2,
              examples: ['$210']
            }
          ],
          records: [
            {
              id: 'hotel-ardent',
              title: 'Hotel Ardent',
              subtitle: 'Downtown Dayton',
              description: 'Boutique stay with a walkable downtown location.',
              badges: ['walkable'],
              values: {
                name: 'Hotel Ardent',
                price: '$210'
              },
              links: [],
              metadata: {}
            }
          ],
          notes: [],
          links: [],
          candidateGroupKeys: [],
          candidateSortKeys: ['price'],
          detailFieldKeys: ['price'],
          defaultView: 'collection',
          pageSize: 4,
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
      notes: ['Prefer walkable downtown options.'],
      links: [],
      metadata: {}
    });
    const uiSpec = RecipeUiSpecSchema.parse({
      kind: 'ui_spec',
      schemaVersion: 'recipe_ui/v2',
      compact: {
        defaultNodeId: 'results',
        maxCollectionColumns: 1,
        stickyActionBar: true
      },
      header: {
        title: 'Hotel shortlist',
        subtitle: 'Weekend Dayton options',
        statusLabel: 'Ready',
        badges: ['dynamic', 'home'],
        statIds: ['stat-results'],
        primaryActionIds: ['refresh-recipe'],
        secondaryActionIds: []
      },
      nodes: [
        {
          id: 'results',
          kind: 'section_group',
          title: 'Results',
          children: [
            {
              id: 'results-filter',
              kind: 'filter_bar',
              datasetId: 'primary',
              fieldKeys: [],
              placeholder: 'Search results'
            },
            {
              id: 'results-collection',
              kind: 'collection',
              title: 'Results',
              datasetId: 'primary',
              display: 'cards',
              pageSize: 4,
              selectable: 'single',
              fieldKeys: ['price'],
              actionIds: ['refine-selection'],
              emptyState: {
                title: 'No results',
                description: 'Try widening the request.'
              },
              loadingState: {
                title: 'Loading results',
                description: 'Compiling the Home recipe view.'
              },
              errorState: {
                title: 'Results unavailable',
                description: 'The recipe data could not be rendered.'
              }
            }
          ]
        }
      ]
    });
    const dynamic = RecipeDynamicStateSchema.parse({
      renderMode: 'dynamic_v1',
      analysis,
      uiSpec
    });
    const analysisArtifact = RecipeArtifactSchema.parse({
      id: 'artifact-analysis',
      recipeId: 'recipe-1',
      buildId: 'recipe-build-1',
      artifactKind: 'analysis',
      schemaVersion: 'recipe_analysis/v1',
      payload: analysis,
      createdAt: '2026-04-12T12:00:00.000Z',
      updatedAt: '2026-04-12T12:00:00.000Z'
    });

    expect(dynamic.analysis?.primaryDatasetId).toBe('primary');
    expect(uiSpec.schemaVersion).toBe('recipe_ui/v2');
    expect(analysisArtifact.artifactKind).toBe('analysis');
  });

  it('keeps session and ui defaults tight', () => {
    const session = SessionSchema.parse({
      id: 'session-1',
      title: 'Bridge chat',
      summary: 'Most recent message',
      source: 'hermes_cli',
      lastUpdatedAt: '2026-04-08T20:00:00.000Z'
    });
    const uiState = UiStateSchema.parse({});

    expect(session.lastUsedProfileId).toBeNull();
    expect(session.associatedProfileIds).toEqual([]);
    expect(uiState.currentPage).toBe('chat');
    expect(uiState.recentSessionIdsByProfile).toEqual({});
  });

  it('accepts recipes as a first-class app page', () => {
    const uiState = UiStateSchema.parse({
      currentPage: 'recipes',
      activeProfileId: 'jbarton',
      activeSessionIdByProfile: {
        jbarton: 'session-1'
      },
      recentSessionIdsByProfile: {
        jbarton: ['session-1']
      },
      toolsTab: 'all',
      sidebarCollapsed: false
    });

    expect(uiState.currentPage).toBe('recipes');
  });

  it('parses profile and job records', () => {
    const profile = ProfileSchema.parse({
      id: '8tn',
      name: '8tn',
      description: 'openai/gpt-5.4 · gateway stopped',
      isActive: false
    });
    const job = JobSchema.parse({
      id: 'job-1',
      profileId: '8tn',
      label: 'Research digest',
      schedule: '0 */4 * * *',
      status: 'healthy',
      description: 'Managed by Hermes cron.',
      lastRun: 'Not reported by Hermes CLI',
      nextRun: '2026-04-08 20:00',
      lastSyncedAt: '2026-04-08T20:00:00.000Z'
    });

    expect(profile.name).toBe('8tn');
    expect(job.profileId).toBe('8tn');
  });

  it('parses skills and model-provider responses', () => {
    const skill = SkillSchema.parse({
      id: 'google-workspace',
      profileId: '8tn',
      name: 'google-workspace',
      summary: '',
      category: 'productivity',
      source: 'builtin',
      trust: 'builtin',
      lastSyncedAt: '2026-04-08T20:00:00.000Z'
    });
    const modelProvider = ModelProviderResponseSchema.parse({
      connection: {
        status: 'connected',
        checkedAt: '2026-04-08T20:00:00.000Z',
        usingCachedData: false
      },
      config: {
        profileId: '8tn',
        defaultModel: 'openai/gpt-5.4',
        provider: 'openrouter',
        baseUrl: 'https://openrouter.ai/api/v1',
        apiMode: 'chat_completions',
        maxTurns: 150,
        reasoningEffort: 'medium',
        toolUseEnforcement: 'auto',
        lastSyncedAt: '2026-04-08T20:00:00.000Z'
      },
      providers: [
        {
          id: 'openrouter',
          profileId: '8tn',
          displayName: 'OpenRouter',
          authKind: 'api_key',
          status: 'connected',
          state: 'connected',
          stateMessage: 'OpenRouter is ready for Hermes chat requests.',
          ready: true,
          modelSelectionMode: 'select_only',
          supportsDisconnect: false,
          source: 'env',
          maskedCredential: 'sk-o...1234',
          supportsApiKey: true,
          supportsOAuth: false,
          lastSyncedAt: '2026-04-08T20:00:00.000Z',
          description: '100+ models, pay-per-use',
          disabled: false,
          supportsModelDiscovery: true,
          models: [
            {
              id: 'openai/gpt-5.4',
              label: 'openai/gpt-5.4',
              providerId: 'openrouter',
              supportsReasoningEffort: true,
              reasoningEffortOptions: ['low', 'medium', 'high']
            }
          ],
          configurationFields: [
            {
              key: 'maxTurns',
              label: 'Max turns',
              input: 'number',
              value: '150'
            }
          ],
          setupSteps: [
            {
              id: 'openrouter:inspect',
              kind: 'inspect',
              title: 'Inspect Hermes runtime metadata',
              description: 'Loaded provider status and discovered model metadata.',
              status: 'completed'
            }
          ]
        }
      ],
      runtimeReadiness: {
        ready: true,
        code: 'ready',
        message: 'OpenRouter is ready for Hermes chat requests.',
        providerId: 'openrouter',
        modelId: 'openai/gpt-5.4'
      },
      inspectedProviderId: null,
      discoveredAt: null
    });

    expect(skill.category).toBe('productivity');
    expect(modelProvider.providers[0]?.status).toBe('connected');
    expect(modelProvider.providers[0]?.models[0]?.supportsReasoningEffort).toBe(true);
    expect(modelProvider.inspectedProviderId).toBeNull();
    expect(modelProvider.discoveredAt).toBeNull();
  });

  it('parses the structured Hermes CLI model discovery contract strictly', () => {
    const discovery = HermesCliModelDiscoverySchema.parse({
      schemaVersion: 'hermes_cli_models/v2',
      discoveredAt: '2026-04-10T18:00:00.000Z',
      inspectedProviderId: 'openrouter',
      runtimeReadiness: {
        ready: true,
        code: 'ready',
        message: 'OpenRouter is ready for Hermes chat requests.',
        providerId: 'openrouter',
        modelId: 'openai/gpt-5.4'
      },
      config: {
        provider: 'openrouter',
        defaultModel: 'openai/gpt-5.4',
        baseUrl: 'https://openrouter.ai/api/v1',
        apiMode: 'chat_completions',
        maxTurns: 150,
        reasoningEffort: 'medium',
        toolUseEnforcement: 'auto',
        lastSyncedAt: '2026-04-10T18:00:00.000Z'
      },
      providers: [
        {
          id: 'openrouter',
          displayName: 'OpenRouter',
          source: 'config',
          status: 'connected',
          state: 'connected',
          stateMessage: 'OpenRouter is ready for Hermes chat requests.',
          ready: true,
          modelSelectionMode: 'select_only',
          supportsDisconnect: false,
          disabled: false,
          authKind: 'api_key',
          supportsApiKey: true,
          supportsOAuth: false,
          supportsModelDiscovery: true,
          description: 'OpenRouter pay-per-use routing.',
          maskedCredential: 'sk-o...1234',
          credentialLabel: 'OPENROUTER_API_KEY',
          setupSteps: [
            {
              id: 'openrouter:inspect',
              kind: 'inspect',
              title: 'Inspect Hermes runtime metadata',
              description: 'Loaded current provider status and model metadata.',
              status: 'completed',
              metadata: {}
            },
            {
              id: 'openrouter:model',
              kind: 'model',
              title: 'Choose a default model',
              description: 'Select a discovered model from Hermes.',
              status: 'completed',
              metadata: {}
            }
          ],
          configurationFields: [
            {
              key: 'defaultModel',
              label: 'Default model',
              input: 'select',
              required: true,
              secret: false,
              value: 'openai/gpt-5.4',
              options: [
                {
                  value: 'openai/gpt-5.4',
                  label: 'GPT-5.4',
                  disabled: false
                }
              ],
              disabled: false
            }
          ],
          models: [
            {
              id: 'openai/gpt-5.4',
              label: 'GPT-5.4',
              providerId: 'openrouter',
              disabled: false,
              supportsReasoningEffort: true,
              reasoningEffortOptions: ['low', 'medium', 'high'],
              metadata: {}
            }
          ],
          lastSyncedAt: '2026-04-10T18:00:00.000Z'
        }
      ]
    });

    expect(discovery.runtimeReadiness.code).toBe('ready');
    expect(discovery.providers[0]?.models[0]?.supportsReasoningEffort).toBe(true);
    expect(() =>
      HermesCliModelDiscoverySchema.parse({
        ...discovery,
        extra: true
      })
    ).toThrowError();
  });

  it('normalizes nullable optional fields in the authoritative discovery contract', () => {
    const discovery = HermesCliModelDiscoverySchema.parse({
      schemaVersion: 'hermes_cli_models/v2',
      discoveredAt: '2026-04-10T18:00:00.000Z',
      inspectedProviderId: 'openrouter',
      runtimeReadiness: {
        ready: true,
        code: 'ready',
        message: 'OpenRouter is ready for Hermes chat requests.',
        providerId: 'openrouter',
        modelId: 'openai/gpt-5.4'
      },
      config: {
        provider: 'openrouter',
        defaultModel: 'openai/gpt-5.4',
        baseUrl: 'https://openrouter.ai/api/v1',
        apiMode: 'chat_completions',
        maxTurns: 150,
        reasoningEffort: 'medium',
        toolUseEnforcement: 'auto',
        lastSyncedAt: '2026-04-10T18:00:00.000Z'
      },
      providers: [
        {
          id: 'openrouter',
          displayName: 'OpenRouter',
          source: 'config',
          status: 'connected',
          state: 'connected',
          stateMessage: 'OpenRouter is ready for Hermes chat requests.',
          ready: true,
          disabled: false,
          authKind: 'api_key',
          supportsApiKey: true,
          supportsOAuth: false,
          supportsModelDiscovery: true,
          supportsDisconnect: true,
          modelSelectionMode: 'select_only',
          description: 'OpenRouter pay-per-use routing.',
          maskedCredential: 'sk-o...1234',
          credentialLabel: 'OPENROUTER_API_KEY',
          configurationFields: [
            {
              key: 'defaultModel',
              label: 'Default model',
              description: 'Selectable models discovered from the active Hermes runtime.',
              input: 'select',
              required: true,
              secret: false,
              value: 'openai/gpt-5.4',
              options: [
                {
                  value: 'openai/gpt-5.4',
                  label: 'openai/gpt-5.4',
                  description: null,
                  disabled: false,
                  disabledReason: null
                }
              ],
              disabled: false,
              disabledReason: null
            }
          ],
          setupSteps: [
            {
              id: 'openrouter:inspect',
              kind: 'inspect',
              title: 'Inspect authoritative Hermes provider state',
              description: 'Hermes loaded provider status, runtime config, credential state, and selectable model metadata from the structured backend.',
              status: 'completed',
              actionLabel: null,
              actionUrl: null,
              command: null,
              metadata: {}
            }
          ],
          models: [
            {
              id: 'openai/gpt-5.4',
              label: 'openai/gpt-5.4',
              providerId: 'openrouter',
              description: null,
              disabled: false,
              disabledReason: null,
              supportsReasoningEffort: true,
              reasoningEffortOptions: ['low', 'medium', 'high'],
              metadata: {}
            }
          ],
          lastSyncedAt: '2026-04-10T18:00:00.000Z'
        }
      ]
    });

    expect(discovery.providers[0]?.configurationFields[0]?.options[0]?.description).toBeUndefined();
    expect(discovery.providers[0]?.configurationFields[0]?.options[0]?.disabledReason).toBeUndefined();
    expect(discovery.providers[0]?.setupSteps[0]?.actionLabel).toBeUndefined();
    expect(discovery.providers[0]?.models[0]?.description).toBeUndefined();
  });

  it('parses the structured Hermes CLI action contract strictly', () => {
    const action = HermesCliActionResultSchema.parse({
      schemaVersion: 'hermes_cli_models/v2',
      action: 'connect',
      providerId: 'minimax',
      success: false,
      message: 'MiniMax rejected the supplied API key.',
      error: {
        code: 'invalid_credentials',
        message: 'MiniMax rejected the supplied API key.'
      }
    });

    expect(action.error?.code).toBe('invalid_credentials');
    expect(() =>
      HermesCliActionResultSchema.parse({
        ...action,
        unexpected: 'field'
      })
    ).toThrowError();
  });

  it('parses settings responses with unrestricted access audit data', () => {
    const response = SettingsResponseSchema.parse({
      settings: {
        themeMode: 'light',
        sessionsPageSize: 25,
        chatTimeoutMs: 180_000,
        discoveryTimeoutMs: 300_000,
        nearbySearchTimeoutMs: 420_000,
        recipeOperationTimeoutMs: 240_000,
        unrestrictedTimeoutMs: 3_600_000,
        restrictedChatMaxTurns: 12,
        unrestrictedAccessEnabled: true
      },
      accessAudit: {
        latestEvents: [
          {
            id: 'audit-1',
            type: 'unrestricted_access_used',
            profileId: '8tn',
            sessionId: 'session-1',
            message: 'Unrestricted chat execution used for 8tn.',
            createdAt: '2026-04-08T20:00:00.000Z'
          }
        ],
        unrestrictedAccessLastEnabledAt: '2026-04-08T19:59:00.000Z',
        unrestrictedAccessLastUsedAt: '2026-04-08T20:00:00.000Z'
      }
    });

    expect(response.settings.unrestrictedAccessEnabled).toBe(true);
    expect(response.accessAudit.latestEvents).toHaveLength(1);
  });

  it('parses session rename/delete and skill delete request schemas', () => {
    const renameRequest = RenameSessionRequestSchema.parse({
      profileId: 'jbarton',
      title: 'Renamed session'
    });
    const deleteRequest = DeleteSessionRequestSchema.parse({
      profileId: 'jbarton'
    });
    const deleteSkillRequest = DeleteSkillRequestSchema.parse({
      profileId: 'jbarton'
    });

    expect(renameRequest.title).toBe('Renamed session');
    expect(deleteRequest.profileId).toBe('jbarton');
    expect(deleteSkillRequest.profileId).toBe('jbarton');
  });

  it('parses spaces payloads and recipe-chat responses', () => {
    const createRecipe = CreateRecipeRequestSchema.parse({
      profileId: 'jbarton',
      sessionId: 'session-1',
      title: 'Launch checklist',
      description: 'Track the launch workstream',
      contentFormat: 'table',
      contentData: {
        columns: [
          {
            id: 'task',
            label: 'Task'
          }
        ],
        rows: [
          {
            task: 'Ship bridge'
          }
        ]
      }
    });
    const deleteRecipe = DeleteRecipeRequestSchema.parse({
      profileId: 'jbarton'
    });
    const spaces = RecipesResponseSchema.parse({
      profileId: 'jbarton',
      items: [
        {
          schemaVersion: 3,
          id: 'recipe-launch',
          profileId: 'jbarton',
          primarySessionId: 'session-1',
          primaryRuntimeSessionId: 'runtime-session-1',
          title: 'Launch checklist',
          description: 'Track the launch workstream',
          createdAt: '2026-04-09T10:00:00.000Z',
          updatedAt: '2026-04-09T10:05:00.000Z',
          status: 'changed',
          tabs: normalizeRecipeTabs({
            contentFormat: 'table',
            contentData: {
              columns: [
                {
                  id: 'task',
                  label: 'Task',
                  emphasis: 'primary'
                }
              ],
              rows: [
                {
                  task: 'Ship bridge'
                }
              ]
            }
          }),
          uiState: {
            activeTab: 'content'
          },
          lastUpdatedBy: 'Hermes',
          source: 'hermes',
          metadata: {
            changeVersion: 2,
            lastChangedAt: '2026-04-09T10:05:00.000Z',
            changeSummary: 'Updated the launch tasks',
            auditTags: ['launch']
          }
        }
      ],
      events: [
        {
          id: 'recipe-event-1',
          profileId: 'jbarton',
          recipeId: 'recipe-launch',
          recipeTitle: 'Launch checklist',
          type: 'updated',
          message: 'Hermes updated Launch checklist.',
          source: 'hermes',
          sessionId: 'session-1',
          createdAt: '2026-04-09T10:05:00.000Z',
          metadata: {
            changeVersion: 2
          }
        }
      ]
    });
    const recipe = RecipeResponseSchema.parse({
      profileId: 'jbarton',
      recipe: spaces.items[0],
      events: spaces.events
    });
    const recipeChat = OpenRecipeChatResponseSchema.parse({
      profileId: 'jbarton',
      recipe: spaces.items[0],
      session: {
        id: 'session-1',
        runtimeSessionId: 'runtime-session-1',
        title: 'Recipe | Launch checklist',
        summary: 'Track the launch workstream',
        source: 'local',
        lastUpdatedAt: '2026-04-09T10:05:00.000Z',
        lastUsedProfileId: 'jbarton',
        associatedProfileIds: ['jbarton'],
        messageCount: 3,
        attachedRecipeId: 'recipe-launch'
      }
    });

    expect(createRecipe.contentFormat).toBe('table');
    expect(deleteRecipe.profileId).toBe('jbarton');
    expect(recipe.recipe.metadata.changeVersion).toBe(2);
    expect(getRecipeContentFormat(recipe.recipe)).toBe('table');
    expect(getRecipeContentViewData(getRecipeContentTab(recipe.recipe), 'table').rows).toHaveLength(1);
    expect(recipeChat.session.attachedRecipeId).toBe('recipe-launch');
  });

  it('preserves latest recipe-attempt metadata fields', () => {
    const parsed = RecipeMetadataSchema.parse({
      changeVersion: 1,
      auditTags: [],
      latestRecipeAttemptOutcome: 'markdown_fallback',
      latestRecipeAttemptMode: 'markdown_fallback',
      latestRecipeAttemptRequestId: 'request-1',
      latestRecipeAttemptedAt: '2026-04-11T00:00:00.000Z'
    });

    expect(parsed.latestRecipeAttemptOutcome).toBe('markdown_fallback');
    expect(parsed.latestRecipeAttemptMode).toBe('markdown_fallback');
    expect(parsed.latestRecipeAttemptRequestId).toBe('request-1');
    expect(parsed.latestRecipeAttemptedAt).toBe('2026-04-11T00:00:00.000Z');
  });

  it('stores markdown, table, and card representations simultaneously without destructive view switching', () => {
    const tabs = normalizeRecipeTabs({
      contentFormat: 'table',
      contentData: {
        columns: [
          {
            id: 'hotel',
            label: 'Hotel',
            emphasis: 'primary'
          },
          {
            id: 'price',
            label: 'Price',
            emphasis: 'none'
          }
        ],
        rows: [
          {
            hotel: 'AC Hotel Dayton',
            price: '$189'
          }
        ]
      }
    });
    const contentTab = getRecipeContentTab(tabs);
    const switchedTabs = normalizeRecipeTabs({
      currentRecipe: {
        tabs
      },
      contentFormat: 'markdown'
    });
    const switchedContentTab = getRecipeContentTab(switchedTabs);

    expect(isRecipeContentSynchronized(contentTab.content)).toBe(true);
    expect(getRecipeContentViewData(contentTab, 'table').rows).toHaveLength(1);
    expect(getRecipeContentViewData(contentTab, 'card').cards).toHaveLength(1);
    expect(getRecipeContentViewData(contentTab, 'markdown').markdown).toContain('AC Hotel Dayton');
    expect(switchedContentTab.content.activeView).toBe('markdown');
    expect(getRecipeContentViewData(switchedContentTab, 'table').rows).toEqual(getRecipeContentViewData(contentTab, 'table').rows);
    expect(getRecipeContentViewData(switchedContentTab, 'card').cards).toEqual(getRecipeContentViewData(contentTab, 'card').cards);
  });

  it('stores aligned content entries and removes one entry without drifting the other representations', () => {
    const tabs = normalizeRecipeTabs({
      contentFormat: 'table',
      contentData: {
        columns: [
          {
            id: 'hotel',
            label: 'Hotel',
            emphasis: 'primary'
          },
          {
            id: 'price',
            label: 'Price',
            emphasis: 'none'
          }
        ],
        rows: [
          {
            hotel: 'AC Hotel Dayton',
            price: '$189'
          },
          {
            hotel: 'Hotel Ardent',
            price: '$210'
          }
        ]
      }
    });

    const contentTab = getRecipeContentTab(tabs);
    const entries = getRecipeContentEntries(tabs);
    const trimmedTabs = removeRecipeContentEntries(tabs, [entries[0]!.id]);
    const trimmedContentTab = getRecipeContentTab(trimmedTabs);
    const trimmedEntries = getRecipeContentEntries(trimmedTabs);

    expect(entries).toHaveLength(2);
    expect(entries[0]?.card.id).toBe(entries[0]?.id);
    expect(entries[1]?.row.hotel).toBe('Hotel Ardent');
    expect(isRecipeContentSynchronized(contentTab.content)).toBe(true);
    expect(trimmedEntries).toHaveLength(1);
    expect(trimmedEntries[0]?.row.hotel).toBe('Hotel Ardent');
    expect(getRecipeContentViewData(trimmedContentTab, 'table').rows).toEqual([
      {
        hotel: 'Hotel Ardent',
        price: '$210'
      }
    ]);
    expect(getRecipeContentViewData(trimmedContentTab, 'card').cards).toHaveLength(1);
    expect(getRecipeContentViewData(trimmedContentTab, 'markdown').markdown).toContain('Hotel Ardent');
    expect(getRecipeContentViewData(trimmedContentTab, 'markdown').markdown).not.toContain('AC Hotel Dayton');
    expect(isRecipeContentSynchronized(trimmedContentTab.content)).toBe(true);
  });

  it('preserves shared markdown section headings while keeping entry-backed content synchronized', () => {
    const tabs = normalizeRecipeTabs({
      contentFormat: 'markdown',
      contentData: {
        markdown:
          '## Restaurant shortlist\n\n- **Mamma Disalvo’s** — Strong local reputation.\n  - Website: [Official site](https://mammadisalvos.com)\n\n- **Roost Italian** — Modern downtown option.\n  - Website: [Menu](https://roostdayton.com)'
      }
    });

    const contentTab = getRecipeContentTab(tabs);
    const entries = getRecipeContentEntries(tabs);
    const trimmedTabs = removeRecipeContentEntries(tabs, [entries[0]!.id]);
    const trimmedContentTab = getRecipeContentTab(trimmedTabs);

    expect(entries).toHaveLength(2);
    expect(entries[0]?.metadata.sectionHeading).toBe('Restaurant shortlist');
    expect(entries[1]?.metadata.sectionHeading).toBe('Restaurant shortlist');
    expect(getRecipeContentViewData(contentTab, 'markdown').markdown.match(/## Restaurant shortlist/gu)).toHaveLength(1);
    expect(getRecipeContentViewData(trimmedContentTab, 'markdown').markdown).toContain('## Restaurant shortlist');
    expect(getRecipeContentViewData(trimmedContentTab, 'markdown').markdown).toContain('Roost Italian');
    expect(isRecipeContentSynchronized(trimmedContentTab.content)).toBe(true);
  });

  it('preserves conversational lead-in text when markdown also contains structured list content', () => {
    const tabs = normalizeRecipeTabs({
      contentFormat: 'markdown',
      contentData: {
        markdown: `Here is the direct answer.

- Point one
- Point two`
      }
    });

    const markdown = getRecipeContentViewData(getRecipeContentTab(tabs), 'markdown').markdown;
    const entries = getRecipeContentEntries(tabs);

    expect(markdown).toContain('Here is the direct answer.');
    expect(markdown).toContain('### Point one');
    expect(markdown).toContain('### Point two');
    expect(entries[0]?.md).toContain('Here is the direct answer.');
    expect(isRecipeContentSynchronized(getRecipeContentTab(tabs).content)).toBe(true);
  });

  it('infers actionable email entry sources from structured table rows', () => {
    const tabs = normalizeRecipeTabs({
      contentFormat: 'table',
      contentData: {
        columns: [
          {
            id: 'subject',
            label: 'Subject',
            emphasis: 'primary'
          },
          {
            id: 'from',
            label: 'From',
            emphasis: 'none'
          },
          {
            id: 'messageId',
            label: 'Message ID',
            emphasis: 'none'
          }
        ],
        rows: [
          {
            subject: 'Launch follow-up',
            from: 'ops@example.com',
            messageId: 'gmail-message-123'
          }
        ]
      }
    });

    const entry = getRecipeContentEntries(tabs)[0];

    expect(entry?.source).toMatchObject({
      integration: 'google-workspace',
      kind: 'gmail_message',
      resourceId: 'gmail-message-123',
      label: 'Launch follow-up'
    });
    expect(isRecipeContentSynchronized(getRecipeContentTab(tabs).content)).toBe(true);
  });

  it('rejects malformed aligned content entries whose card id does not match the entry id', () => {
    expect(() =>
      RecipeContentEntrySchema.parse({
        id: 'entry-1',
        md: '### Launch follow-up',
        row: {
          subject: 'Launch follow-up'
        },
        card: {
          id: 'different-card-id',
          title: 'Launch follow-up',
          metadata: [],
          links: [],
          badges: []
        }
      })
    ).toThrowError('Recipe content entry card ids must match the entry id.');
  });

  it('normalizes legacy single-representation rows into synchronized content tabs', () => {
    const tabs = normalizeLegacyRecipeTabs('markdown', {
      markdown: '## Research summary\n\n- **Hotel Ardent**\n  - Price: $210'
    });
    const contentTab = getRecipeContentTab(tabs);

    expect(contentTab.content.activeView).toBe('markdown');
    expect(isRecipeContentSynchronized(contentTab.content)).toBe(true);
    expect(getRecipeContentViewData(contentTab, 'markdown').markdown).toContain('Hotel Ardent');
    expect(getRecipeContentViewData(contentTab, 'table').rows).toHaveLength(1);
    expect(getRecipeContentViewData(contentTab, 'card').cards).toHaveLength(1);
  });

  it('preserves first-class links and optional card images across synchronized content views', () => {
    const tabs = normalizeRecipeTabs({
      contentFormat: 'card',
      contentData: {
        cards: [
          {
            id: 'hotel-1',
            title: 'Hotel Ardent',
            description: 'Boutique stay in downtown Dayton.',
            metadata: [
              {
                label: 'Email',
                value: 'stay@hotelardent.com',
                link: {
                  label: 'stay@hotelardent.com',
                  url: 'mailto:stay@hotelardent.com',
                  kind: 'email'
                }
              }
            ],
            links: [
              {
                label: 'Official site',
                url: 'https://hotelardent.com',
                kind: 'website'
              },
              {
                label: 'Book now',
                url: 'https://hotelardent.com/book',
                kind: 'booking'
              }
            ],
            image: {
              url: 'https://images.example.com/hotel-ardent.jpg',
              alt: 'Hotel Ardent exterior'
            }
          }
        ]
      }
    });

    const contentTab = getRecipeContentTab(tabs);
    const cardData = getRecipeContentViewData(contentTab, 'card');
    const tableData = getRecipeContentViewData(contentTab, 'table');
    const markdownData = getRecipeContentViewData(contentTab, 'markdown');

    expect(cardData.cards[0]?.links).toHaveLength(2);
    expect(cardData.cards[0]?.image?.url).toBe('https://images.example.com/hotel-ardent.jpg');
    expect(tableData.columns.some((column) => column.presentation === 'link')).toBe(true);
    expect(tableData.columns.some((column) => column.presentation === 'image')).toBe(true);
    expect(markdownData.markdown).toContain('[Official site](https://hotelardent.com)');
    expect(markdownData.markdown).toContain('[Hotel Ardent exterior](https://images.example.com/hotel-ardent.jpg)');
  });

  it('keeps markdown fallback card synchronization valid when recovered blocks leave fence residue behind', () => {
    const tabs = normalizeRecipeTabs({
      contentFormat: 'markdown',
      contentData: {
        markdown: 'Created a launch tracker recipe for this request.\n\njson\n\n```\nCreated it successfully.\n```'
      }
    });

    const contentTab = getRecipeContentTab(tabs);
    const cardData = getRecipeContentViewData(contentTab, 'card');

    expect(cardData.cards[0]?.title).toBeTruthy();
    expect(cardData.cards[0]?.title).not.toBe('');
    expect(isRecipeContentSynchronized(contentTab.content)).toBe(true);
  });

  it('drops legacy todo tabs and remaps the ui state back to content', () => {
    const tabs = normalizeLegacyRecipeTabs('todo', {
      items: [
        {
          id: 'todo-1',
          title: 'Ship bridge',
          completed: false
        }
      ]
    });
    const contentTab = getRecipeContentTab(tabs);

    expect(tabs).toHaveLength(1);
    expect(contentTab.content.activeView).toBe('markdown');
    expect(getRecipeContentViewData(contentTab, 'markdown').markdown).toContain('Ship bridge');
    expect(SessionMessagesResponseSchema.parse({
      profileId: 'jbarton',
      session: {
        id: 'session-1',
        title: 'Visibility test',
        summary: 'Most recent message',
        source: 'local',
        lastUpdatedAt: '2026-04-08T20:00:00.000Z',
        associatedProfileIds: ['jbarton'],
        messageCount: 2
      },
      messages: [],
      attachedRecipe: {
        schemaVersion: 3,
        id: 'recipe-1',
        profileId: 'jbarton',
        primarySessionId: 'session-1',
        primaryRuntimeSessionId: null,
        title: 'Legacy todo',
        createdAt: '2026-04-08T20:00:00.000Z',
        updatedAt: '2026-04-08T20:00:00.000Z',
        status: 'active',
        tabs,
        uiState: {
          activeTab: 'content'
        },
        source: 'hermes',
        metadata: {
          changeVersion: 1,
          auditTags: []
        }
      }
    }).attachedRecipe?.tabs).toHaveLength(1);
  });

  it('rejects removed todoData fields on recipe create/update payloads', () => {
    expect(() =>
      CreateRecipeRequestSchema.parse({
        profileId: 'jbarton',
        sessionId: 'session-1',
        title: 'Legacy todo payload',
        todoData: {
          items: []
        }
      })
    ).toThrowError();
  });

  it('parses deletion responses and runtime-visible chat message metadata', () => {
    const sessionDeletion = SessionDeletionResponseSchema.parse({
      sessionId: 'session-1',
      mode: 'hybrid',
      deletedAt: '2026-04-08T20:10:00.000Z'
    });
    const skillDeletion = SkillDeletionResponseSchema.parse({
      profileId: 'jbarton',
      skillId: 'jbarton:project-notes',
      skillName: 'project-notes',
      deletedAt: '2026-04-08T20:11:00.000Z'
    });
    const messagePayload = SessionMessagesResponseSchema.parse({
      profileId: 'jbarton',
      session: {
        id: 'session-1',
        title: 'Visibility test',
        summary: 'Most recent message',
        source: 'local',
        lastUpdatedAt: '2026-04-08T20:00:00.000Z',
        associatedProfileIds: ['jbarton'],
        messageCount: 2
      },
      messages: [
        {
          id: 'runtime-message-1',
          sessionId: 'session-1',
          role: 'tool',
          content: '{"count":1}',
          createdAt: '2026-04-08T20:00:01.000Z',
          requestId: 'request-1',
          visibility: 'runtime',
          kind: 'technical'
        }
      ]
    });

    expect(sessionDeletion.mode).toBe('hybrid');
    expect(skillDeletion.skillName).toBe('project-notes');
    expect(messagePayload.messages[0]?.visibility).toBe('runtime');
    expect(messagePayload.messages[0]?.kind).toBe('technical');
  });

  it('parses the recipe SDK model and patch artifacts', () => {
    const model = RecipeModelSchema.parse({
      kind: 'recipe_model',
      schemaVersion: 'recipe_model/v1',
      sdkVersion: 'recipe_sdk/v1',
      revision: 2,
      title: 'Inbox triage',
      subtitle: 'Unread messages',
      status: 'active',
      entities: [
        {
          id: 'email-1',
          kind: 'collection',
          title: 'Quarterly update',
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
          notes: [],
          stats: [],
          metadata: {}
        }
      ],
      collections: [
        {
          id: 'primary',
          label: 'Inbox',
          entityKind: 'collection',
          entityIds: ['email-1'],
          preferredView: 'table',
          fieldKeys: ['sender'],
          pageSize: 6,
          selectionMode: 'multiple',
          filterKeys: ['sender'],
          emptyState: {
            title: 'No inbox items',
            description: 'Nothing is available yet.'
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
          title: 'Inbox summary',
          status: 'ready',
          actionIds: [],
          fieldKeys: [],
          metadata: {}
        },
        {
          id: 'section-primary',
          kind: 'table',
          title: 'Inbox',
          collectionId: 'primary',
          status: 'ready',
          actionIds: ['refresh-recipe'],
          fieldKeys: ['sender'],
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
          id: 'refresh-recipe',
          label: 'Refresh',
          kind: 'prompt',
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
        }
      ],
      state: {
        activeTabId: 'tab-overview',
        collectionState: {
          primary: {
            selectedEntityIds: ['email-1'],
            page: 1,
            filters: {}
          }
        },
        formState: {},
        actionState: {},
        localState: {}
      },
      metadata: {
        patchFriendly: true
      }
    });

    const patch = RecipePatchSchema.parse({
      kind: 'recipe_patch',
      schemaVersion: 'recipe_patch/v1',
      sdkVersion: 'recipe_sdk/v1',
      baseRevision: 1,
      nextRevision: 2,
      summary: 'Refreshed inbox ordering.',
      operations: [
        {
          op: 'reorder_collection',
          collectionId: 'primary',
          entityIds: ['email-1']
        },
        {
          op: 'set_selection',
          collectionId: 'primary',
          entityIds: ['email-1']
        }
      ]
    });

    expect(model.sdkVersion).toBe('recipe_sdk/v1');
    expect(model.collections[0]?.id).toBe('primary');
    expect(patch.operations[0]?.op).toBe('reorder_collection');
    expect(patch.nextRevision).toBe(2);
  });
});
