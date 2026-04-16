# Spaces Framework

## Purpose

Spaces now have two related product surfaces:

- a top-level `Spaces` template gallery used as a curated pattern library
- session-attached local work surfaces used during real task execution

Both are browser-first, SQLite-backed, prompt-aware, data-aware, and rendered only through trusted Chakra UI components.

Spaces now build through a Home-baseline dual-channel flow with strict template-only async enrichment:

1. Hermes answers the user request conversationally for the visible transcript.
2. The bridge immediately creates or updates the session-attached Home space with deterministic local baseline content derived from the assistant answer.
3. The user-facing request completes once the assistant answer and baseline Home space are persisted.
4. After that response completes, the bridge runs a separate asynchronous enrichment lane from persisted artifacts only. It separately requests a structured-only seed, preferring one schema-valid JSON object and falling back to a `hermes-space-data` start marker plus JSON only for compatibility.
5. If the structured artifact succeeds, the bridge persists it, derives trusted local analysis/summary/fallback/app-context artifacts, and keeps the Home baseline active while richer enrichment is prepared.
6. Hermes then works through a strict template pipeline only: a tiny template-selection JSON object, a template-specific fill JSON payload, and later template-specific update JSON payloads when the workspace evolves.
7. The bridge validates those authoring payloads, applies deterministic local repair/defaulting, compiles them into the persisted `workspace_template_state`, and the browser renders the resulting template state deterministically through local Chakra-based renderers.
8. Supported template switches such as `local-discovery-comparison -> event-planner` are bridge-owned transitions with explicit carried-state rules; unsupported transitions fail loudly.
9. TSX Workspace Applets may remain in-repo only as an experimental secondary path for explicitly gated cases, but they are disabled in standard production flows and are no longer the default rich-workspace mechanism.
10. If the seed or template enrichment fails, the baseline Home space remains usable and the failed upgrade is recorded without breaking the request.

This keeps the data contract flexible while keeping rendering safe, restart-stable, and small-pane friendly.

## Product behavior

- `Spaces` is a top-level navigation page again, but it is a template gallery rather than a live runtime workspace surface.
- Sessions remain the primary discovery surface for attached live spaces; a session may have zero or one attached active space.
- Opening a session with an attached space still shows a combined workspace layout instead of switching to the gallery page.
- Every chat request attempts to create or update an attached space.
- Every attached Home space has a deterministic local baseline based on the assistant answer, even if no structured artifact can be produced.
- Rich requests prefer dynamic template enrichment, while simple or degraded requests still land in the Home baseline instead of failing closed.
- Strict template enrichment is the primary rich-workspace path. Optional TSX applets are experimental-only, disabled in standard production flows, and never replace the baseline Home workspace as the reliability layer.
- The gallery does not ask Hermes to invent layouts. It renders a fixed registry of curated templates, shared primitives, preview fixtures, and explicit fill/update instructions for later controlled integration.
- The visible product path now surfaces explicit `task`, `baseline`, and `enrichment` stage state instead of one vague build status. The persisted compatibility segment key is still `workspacePipeline.applet`.
- The active Home workspace path no longer exposes legacy `Markdown`, `Table`, or `Cards` format switches; those representations remain persistence/compatibility details rather than user-facing mode controls.
- Dynamic spaces show stage-specific progress such as `Updating Home workspace`, `Baseline ready, workspace enrichment running`, or `Baseline ready, workspace enrichment failed` while the bridge advances the next build.
- Async enrichment is non-blocking. The request can already be `completed` while `space_builds` continues through queued/template-selection/fill/update/repair phases in the background.
- Baseline-first rendering is progressive: the Home markdown stays visible, ghost/skeleton sections appear first, and richer preview sections or normalized template sections replace those placeholders as artifacts become available.
- A dynamic space does not render unvalidated UI as final output.
- If a rich build fails, the app preserves the assistant response, marks the dynamic build failed, shows a safe fallback summary or Markdown fallback content, and offers retry.
- If a richer enrichment build fails, the UI shows an explicit failed-construction state while keeping the baseline Home workspace visible and interactive.
- `Retry workspace enrichment` is a bridge-only post-processing retry. It reuses persisted Home artifacts and never reruns the original task or baseline update.
- Space actions are primarily prompt-bound: buttons dispatch contextual requests back through Hermes and then rerun the same persisted build pipeline.
- The outer shell, theme, and internal-scroll layout remain shared with the rest of the app; spaces do not restyle the shell.

## Persisted model

### `spaces`

`Space` remains the primary entity and still owns the stable local id, profile ownership, session attachment, visible title/description/status, legacy content-tab data, and local metadata.

Dynamic spaces extend that row with build pointers and render mode:

- `render_mode`: `legacy_content_v1` or `dynamic_v1`
- `active_build_id`
- `ready_build_id`
- `active_applet_build_id`
- `ready_applet_build_id`
- `build_error_code`
- `build_error_message`

In addition, the active space metadata now persists the user-visible pipeline snapshot under `metadata.workspacePipeline`:

- `currentStage`
- `task`
- `baseline`
- `applet`

The browser receives the hydrated projection under `space.dynamic`, which may include:

- `activeBuild`
- `summary`
- `analysis`
- `normalizedData`
- `workspaceTemplate`
- `workspaceDsl`
- `workspaceModel`
- `latestWorkspacePatch`
- `uiSpec`
- `actionSpec`
- `latestTestResults`
- `fallback`
- `applet.activeBuild`
- `applet.promotedBuildId`
- `applet.plan`
- `applet.manifest`
- `applet.renderTree`
- `applet.verification`

### `space_builds`

Each build is a versioned state-machine row tied to one space:

- `id`
- `spaceId`
- `profileId`
- `sessionId`
- `buildVersion`
- `buildKind`: `compiled_home`, `dsl_enrichment`, `template_enrichment`, or `applet`
  `compiled_home` remains only for persisted legacy compatibility. `template_enrichment` is the active rich-upgrade build kind in production request paths. `dsl_enrichment` remains persisted compatibility only for older builds. `applet` remains experimental and secondary.
- `triggerKind`: `chat`, `refresh`, `action`, `retry`, `legacy_import`
- `triggerRequestId`
- `triggerActionId`
- `phase`
- `progressMessage`
- `retryCount`
- `startedAt`
- `updatedAt`
- `completedAt`
- `errorCode`
- `errorMessage`
- `errorDetail`
- `failureCategory`
- `failureStage`
- `userFacingMessage`
- `retryable`
- `configuredTimeoutMs`

### `runtime_requests.workspacePipeline`

Every request-scoped runtime row now also persists the same `workspacePipeline` snapshot as the attached space metadata.
That keeps request telemetry, runtime activity, retry semantics, and the visible space banner aligned even across reload or navigation.

## Workspace pipeline state

The user-visible Home/enrichment flow is modeled separately from low-level build phases.

Current persisted pipeline stages are:

- `task_running`
- `task_failed`
- `baseline_updating`
- `baseline_ready`
- `baseline_failed`
- `enrichment_generating`
- `enrichment_validating`
- `enrichment_failed`
- `enrichment_ready`

Each segment (`task`, `baseline`, `applet`) carries:

- `status`
- `stage`
- `message`
- optional `failureCategory`
- optional `diagnostic`
- optional `retryable`
- optional `configuredTimeoutMs`
- `updatedAt`

The bridge and UI use that model to distinguish:

- task failures before any Home update
- baseline failures after a successful task
- enrichment failures after a successful baseline
- artifact-only contract failures such as live-task violations or invalid persisted retry context
- timeout failures caused by user configuration vs runtime/tool latency
- retryable vs non-retryable failure states

Current enrichment-specific artifact-only failure categories include:

- `template_selection_failed`
- `template_fill_failed`
- `template_update_failed`
- `validation_failed`
- `normalization_failed`
- `repair_failed`
- `unsupported_template_transition`
- compatibility-only legacy categories such as `dsl_generation_live_task_violation` and `dsl_context_invalid`

### `space_build_artifacts`

Each build persists isolated, versioned artifacts instead of one opaque blob:

- `user_prompt`
- `raw_data`
- `assistant_context`
- `analysis`
- `intent`
- `normalized_data`
- `action_spec`
- `summary`
- `fallback`
- `workspace_template_selection`
- `workspace_template_fill`
- `workspace_template_update`
- `workspace_template_state`
- `workspace_dsl`
- `workspace_model`
- `workspace_patch`
- `applet_plan`
- `applet_manifest`
- `applet_source`
- `applet_test_source`
- `applet_render_tree`
- `applet_verification`

Artifacts are keyed by build id and schema version, so the renderer and bridge can validate them independently and survive restart cleanly.

### `space_build_logs`

Build logs persist phase-scoped operational detail:

- `phase`
- `level`
- `message`
- `detail`
- `createdAt`

### `space_events`

Visible mutations still emit append-only `space_event` rows for app-level auditability and navigation.

## Build lifecycle

Dynamic space builds move through explicit persisted phases.
Legacy `compiled_home` rows may still contain older phase names, but active production enrichment now uses the template-oriented phases:

- `queued`
- `template_selecting`
- `template_filling`
- `template_updating`
- `template_repairing`
- `template_switching`
- `ready`
- `failed`

Experimental TSX applet builds may still use `applet_*` phases if they are explicitly re-enabled for research, but they are outside the standard production path.

Lifecycle rules:

- builds persist after every meaningful phase transition
- the bridge emits `space_build_progress` SSE updates as the phase or progress message changes
- only a `ready` build can become the promoted `ready_build_id`
- interrupted in-flight builds are marked failed during bridge startup recovery
- failed builds retain fallback artifacts and can be retried without losing the underlying raw data

## Artifact responsibilities

### First-pass artifacts

These come directly from the request/response context or the minimal Hermes seed:

- `user_prompt`: original prompt, normalized prompt, request mode
- `raw_data`: untrusted structured payload, links, pagination hints, metadata
- `assistant_context`: user-visible response summary, truncated lead/tail, links, citations, metadata
- optional Hermes hints: intent, semantic, and action hints only

### Second-pass artifacts

These are produced locally and validated before activation or promotion:

- `analysis`: bridge-owned dataset/record/field IR derived from raw data and assistant context
- `intent`: normalized category, summary, filters, presentation hints, update target, outbound/destructive flags
- `normalized_data`: compatibility datasets and fields derived locally from `analysis`
- `summary`: title, subtitle, badges, stats, links, build note
- `fallback`: safe summary preview shown during failed or incomplete rich builds
- `action_spec`: declarative local, prompt, bridge, navigation, or destructive actions
- `workspace_template_selection`: the tiny approved-template choice emitted by Hermes
- `workspace_template_fill`: the template-specific authoring payload emitted by Hermes
- `workspace_template_update`: the template-specific patch/update payload emitted by Hermes
- `workspace_template_state`: the strict bridge-owned rendered template state compiled locally from authoring payloads
- `workspace_dsl`, `workspace_model`, and `workspace_patch`: compatibility artifacts retained only for older persisted builds during migration
- optional experimental applet artifacts such as `applet_plan`, `applet_manifest`, `applet_source`, `applet_test_source`, `applet_render_tree`, and `applet_verification`

## Template state and patches

The richer Home workspace contract is now data-first and template-first.
The bridge owns a strict `workspace_template_state` artifact and treats Hermes-authored selection/fill/update JSON plus local normalization/repair as the primary source of truth. TSX applets remain an optional experimental renderer/controller layer and are not part of the default path.

`workspace_template_state` currently includes:

- stable `templateId` and display metadata
- compiled `sections`
- local action references
- active-tab, selection, note, and transition state
- transition history for supported template switches

`workspace_template_update` is the incremental update layer between revisions.
Current supported operations include:

- `set_header`
- `set_active_tab`
- `append_note_lines`
- `set_filter_chips`
- `set_scope_tags`
- `upsert_table_rows`
- `upsert_cards`
- `upsert_groups`
- `upsert_timeline_items`
- `set_detail`
- `upsert_board_cards`
- `move_board_card`
- `remove_items`
- `set_status`

The compiler baseline builds the strict template state locally from persisted summary, assistant context, normalized data, action metadata, and fallback state.
Future updates should prefer emitting/applying template-scoped patches instead of forcing a full workspace rewrite.

## Bridge workflow

### Chat-driven build

1. The user sends a chat request.
2. Hermes returns the normal user-facing answer.
3. The bridge always creates or updates the session-attached Home space with baseline Markdown content from the assistant answer.
4. For dynamic-capable requests, retry builds, refreshes, and prompt-bound actions, the bridge runs a dedicated structured-only Hermes step that requests raw JSON only; a `hermes-space-data` start marker plus JSON is accepted only as a compatibility fallback.
5. The bridge first tries to parse a direct JSON object from the structured-only response. If that is not present, it scans forward from the start marker, extracts the first balanced top-level JSON object, strips the structured region from the visible transcript, and validates the envelope.
6. A closing fence is optional for compatibility. If it is missing, the bridge still accepts the payload when a balanced schema-valid JSON object can be recovered safely.
7. Marker-only, empty-payload, missing-marker, unbalanced-JSON, invalid-JSON, and schema-invalid structured responses are treated as explicit failure modes with distinct telemetry.
8. If the first structured-only attempt still does not yield a usable envelope, the bridge makes at most one bounded structured-only reissue for the just-completed answer.
9. If a usable structured artifact exists, the bridge persists the first-pass artifacts plus locally derived analysis/summary/fallback/action context.
10. The request is already complete at this point; optional enrichment continues asynchronously and does not depend on the chat stream remaining open.
11. If the request warrants richer UI, the bridge generates only bounded template stages in sequence: selection, text/content, actions/buttons, and later update or supported switch operations.
12. The bridge validates and persists those intermediate template artifacts locally, assembles the staged text/actions output into one final authoring fill artifact, applies deterministic repair/defaulting when safe, compiles strict template state, and emits the updated space.
13. If a template artifact still fails after local normalization, the bridge runs one bounded stage-specific JSON-only repair pass using persisted artifacts only and validates again locally.
14. If an experimental applet path is explicitly enabled, its verifier still runs forbidden-import checks, capability validation, TypeScript compile, generated tests, render smoke, and small-pane smoke before any promotion.
15. If template compilation succeeds, the bridge promotes the richer local renderer state and emits the updated space.
16. If the seed or template enrichment fails or is not applicable, the Home baseline remains visible and the request still completes successfully.

### Failure classification

Failure categories are queryable instead of being inferred from one generic error string.
Current bridge-side categories include:

- `timeout_user_config`
- `timeout_runtime`
- `auth_scope`
- `upstream_tool_failure`
- `baseline_workspace_failure`
- `template_selection_failed`
- `template_text_failed`
- `template_actions_failed`
- `template_fill_failed`
- `template_update_failed`
- `template_text_repair_failed`
- `template_actions_repair_failed`
- `validation_failed`
- `normalization_failed`
- `repair_failed`
- `unsupported_template_transition`
- compatibility-only legacy categories such as `dsl_seed_failure`, `dsl_generation_live_task_violation`, `dsl_context_invalid`, `dsl_generation_failure`, `dsl_validation_failure`, `dsl_normalization_failure`, and `dsl_patch_failure`
- `applet_manifest_failure`
- `applet_source_failure`
- `applet_capability_failure`
- `applet_compile_failure`
- `applet_test_failure`
- `applet_render_failure`
- `applet_small_pane_failure`

Each failed build row also persists the user-facing explanation, diagnostic detail, retryability, and configured timeout limit when one materially affected the result.

## Async enrichment timeout experiment

- The main request lane keeps the normal task/chat/baseline timeout policy.
- The async workspace enrichment lane currently uses a separate temporary timeout budget of `90000ms` by default.
- That budget is scoped only to async enrichment and may be overridden locally with `HERMES_ASYNC_WORKSPACE_ENRICHMENT_TIMEOUT_MS` or the legacy alias `HERMES_ASYNC_WORKSPACE_APPLET_TIMEOUT_MS`.
- Timeout telemetry and failed build rows always persist the actual async timeout budget used so timeout-classified UI copy can surface the limit explicitly.

### Refresh, retry, and prompt-bound actions

The same persisted pipeline is reused for:

- `space_refresh` requests
- `retry_build` bridge actions
- prompt-bound action requests from the rendered space

Actions do not mutate the browser directly.
They dispatch a validated request back to the bridge, which reconstructs the necessary prompt context from persisted artifacts, streams progress, persists the next build, and only activates the result after validation and tests succeed.

For `retry_build` specifically:

- the bridge always creates a new `space_builds` attempt
- the bridge always runs a fresh structured-only artifact generation step instead of depending on the ordinary refresh answer to carry the artifact
- the same one-shot bounded structured-only reissue path runs again if the retry response still lacks a usable structured payload
- if structured-only generation still fails, the latest attempt is recorded as `failed`, fallback artifacts are refreshed or downgraded to Markdown fallback, and the prior assistant answer remains visible instead of silently treating the retry as successful

## Integration coverage

The current fixture-backed Playwright matrix explicitly covers:

- prose-only Home workspaces that stay Markdown-first and never expose legacy content-format toggles
- data-rich Home workspaces that remain usable in a smaller pane
- prompt-bound template actions that update the attached workspace and transcript together
- supported template switches that preserve carried state across templates
- degraded enrichment runs that keep the baseline Home workspace visible with an explicit failure banner and retry affordance
- timeout-classified failures that surface the configured limit in transcript/UI copy
- retry/rebuild flows that promote a later richer workspace after an initial failed upgrade

## Declarative UI model

The renderer accepts only versioned allowlist schemas.
The primary rich production path is now `workspace_template_state` rendered locally in the browser through `WorkspaceTemplateRenderer`.
Optional `space_applet_render_tree/v1` artifacts remain dormant experimental artifacts only, while legacy `workspace_dsl`, `workspace_model`, `workspace_patch`, `space_ui/v1`, and `space_ui/v2` artifacts remain compatibility-only for persisted older builds and must not be reintroduced into production request paths.

Current v2 primitives include:

- `section_group`
- `tab_group`
- `markdown_block`
- `stat_grid`
- `action_bar`
- `filter_bar`
- `collection`
- `grouped_collection`
- `detail_sheet`
- `property_sheet`
- `timeline`
- `paginator`
- `empty_state`
- `error_state`

The UI spec can express:

- header title, subtitle, status, badges, and stats
- nested groups and dataset tabs
- compact collections with paging, search, and selection
- property/detail surfaces for selected or singleton records
- grouped and timeline views when the local analysis supports them
- action toolbars and prompt-bound actions
- loading, empty, and error states without custom code execution

Compact-pane constraints are enforced in both the builder and the test harness:

- collection displays stay one-column and paginated
- dataset page size stays small
- action bars remain compact and Chakra-renderable
- node trees render inside internal scroll containers instead of the document body

## Action model

Space actions are declarative records, not executable code.
An action may be:

- `local`
- `prompt`
- `bridge`
- `navigation`
- `destructive`

Prompt actions declare:

- `promptTemplate`
- `includeInputs`
- `allowedMutations`
- `outboundRequestsAllowed`
- `expectedOutput`
- `timeoutMs`
- `retryable`

The bridge binds contextual inputs such as:

- original prompt
- normalized intent
- space summary
- raw data
- normalized data
- selected items
- page state
- filter state
- form values
- assistant context

Destructive actions require explicit confirmation in the spec and are rejected by the harness if confirmation is missing.

## Renderer and safety rules

- The browser never executes Hermes-authored React, JavaScript, HTML, CSS, or iframe/embed payloads.
- Markdown rendering uses a safe renderer with raw HTML disabled.
- All artifacts are validated before persistence and before render.
- The browser renders dynamic spaces only through trusted Chakra UI component mappings in `apps/web`.
- Prompt-bound actions are validated before invocation, including selection requirements and allowed handler type.
- If validated artifacts are missing, the browser falls back to the safe summary state instead of trying to render a partial UI.

## Legacy compatibility

The bridge still understands legacy `hermes-ui-workspaces` payloads during rollout.
That compatibility path exists so older Hermes/runtime outputs and transcript imports remain readable.

New structured space builds should use `hermes-space-data`.
The legacy block remains only as a compatibility path, including the current delete-space fallback contract.

## Extension guidance

To add a new dynamic artifact, section type, action kind, or harness check:

1. Add a versioned schema in `packages/protocol`.
2. Update SQLite persistence and hydration in `apps/bridge`.
3. Extend the local builder and fallback logic.
4. Extend the trusted Chakra renderer in `apps/web`.
5. Add protocol, bridge, persistence, and web regression tests together.
6. Update this document and `docs/specs/hermes-ui-workspaces.md` in the same change.
