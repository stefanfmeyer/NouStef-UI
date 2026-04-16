# Dynamic Space Builder Plan

Date: 2026-04-11
Owner: Codex
Status: Investigation complete, implementation in progress

## Phase 0 summary

### Current architecture

- `apps/bridge/src/hermes-cli/client.ts` shapes one Hermes prompt and asks Hermes to append a single `hermes-ui-workspaces` fenced mutation block.
- `apps/bridge/src/services/hermes-bridge-service.ts` parses that block, applies `create_space` / `update_space` / `mark_space_changed` / `delete_space` mutations immediately, then persists the assistant transcript.
- `apps/bridge/src/data/bridge-database.ts` stores a single `spaces` row plus `space_events`; the primary persisted payload is still `tabs_json` plus light metadata.
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx` renders one fixed content-tab model (`markdown`, `table`, `card`) directly from `space.tabs`.
- `apps/web/src/hooks/use-app-controller.ts` treats `space_event` as “space is ready now”; there is no separate build lifecycle or activation gate.

### Current limitations

- No persisted build lifecycle, phase timestamps, retry count, or restart-safe build failure state.
- No isolated raw-data artifact, normalized-data artifact, UI spec artifact, action spec artifact, test spec artifact, or build log artifact.
- No safe pre-activation validation or generic test harness for per-space declarative checks.
- No explicit “Building space…” UX; the UI can only show the final rendered `tabs` payload or nothing.
- No prompt-bound action pipeline; current space actions are narrow local mutations plus Gmail delete handling.
- Prompt contract is preset-oriented (`viewType`, `contentData`) instead of data-first / build-second.

## Implementation goals

- Replace the single-pass preset flow with a persisted two-pass dynamic space builder.
- Keep legacy spaces readable and safe while new requests move onto the dynamic pipeline.
- Keep the renderer declarative and Chakra-only; never execute DB-authored React/JS/HTML.
- Prefer a deterministic local second pass for UI/action/test generation after Hermes returns raw data. This keeps build latency bounded and avoids stacking another unbounded LLM round-trip inside the critical path.

## Core design decisions

### 1. Use a data-first Hermes contract, then build locally

New requests will ask Hermes for:

- conversational answer text
- one fenced `hermes-space-data` block with prompt-aware structured data

The bridge will then:

1. persist the original prompt + Hermes data artifacts
2. normalize the returned data into a bridge-owned structured dataset
3. generate the UI spec, action spec, and declarative tests locally
4. validate and test the build
5. promote the build only if critical checks pass

Reasoning:

- safer than storing or executing model-authored UI code
- faster and more reliable than a second live LLM pass
- easier to make idempotent and restart-safe

Legacy `hermes-ui-workspaces` parsing will remain as a compatibility path and will be normalized into the new build artifacts instead of remaining the primary workflow.

### 2. Keep `Space` as the root entity, but persist build state separately

`spaces` stays the durable root row for attachment, title, status, and shell-level fallback metadata.

Dynamic build state moves into explicit tables:

- `space_builds`
- `space_build_artifacts`
- `space_build_logs`

This avoids overloading `spaces` with opaque JSON while keeping build promotion and rollback explicit.

### 3. Preserve the last ready build until a new build passes

Each space may have:

- one active ready build
- one newer in-progress or failed build

If a rebuild fails:

- raw data and assistant context remain persisted
- prior ready UI remains available when present
- otherwise the UI falls back to a safe summary/raw-data view with retry

### 4. Keep legacy content tabs as fallback, not the primary dynamic renderer

`space.tabs` remains for backward compatibility and as a safe fallback preview.

New dynamic spaces will render from:

- `space.dynamic.uiSpec`
- `space.dynamic.actionSpec`
- `space.dynamic.build`
- `space.dynamic.summary`
- `space.dynamic.fallback`

Legacy spaces without `dynamic` state will continue through the current content-tab renderer.

## Protocol changes

### Files

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.ts`
- `packages/protocol/src/index.test.ts`
- `packages/protocol/src/space-helpers.ts`

### New shared schemas

- `SpaceRenderModeSchema`
  - `legacy_content_v1`
  - `dynamic_v1`
- `SpaceBuildPhaseSchema`
  - `queued`
  - `analyzing`
  - `planning_ui`
  - `generating_ui`
  - `generating_actions`
  - `generating_tests`
  - `validating`
  - `testing`
  - `ready`
  - `failed`
- `SpaceBuildSchema`
  - `id`
  - `spaceId`
  - `profileId`
  - `sessionId`
  - `buildVersion`
  - `triggerKind`
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
- `SpaceArtifactKindSchema`
  - `user_prompt`
  - `intent`
  - `raw_data`
  - `normalized_data`
  - `assistant_context`
  - `ui_spec`
  - `action_spec`
  - `test_spec`
  - `test_results`
  - `summary`
  - `fallback`
- `SpaceIntentSchema`
  - normalized goal/category
  - requested presentation hint
  - entities / filters / sort hints
  - external-data allowance
  - destructive-intent flag
- `SpaceAssistantContextSchema`
  - sanitized assistant summary
  - response lead / conclusion
  - citations/links metadata
  - pagination hints
- `SpaceRawDataSchema`
  - explicit wrapper with `schemaVersion`
  - `payload` as raw JSON object
  - `links`
  - `paginationHints`
  - `metadata`
- `SpaceNormalizedDataSchema`
  - `schemaVersion`
  - named datasets
  - summary stats
  - item arrays
  - item fields / links / badges / images
  - page info
  - auxiliary notes
- `SpaceUiSpecSchema`
  - safe declarative Chakra-oriented layout only
  - header / subtitle / badges / stats
  - sections: `summary`, `collection`, `detail`, `markdown`, `notice`, `form`, `wizard`
  - collection presentation: `table`, `cards`, `list`
  - paging / filters / compact constraints
  - loading / empty / error state requirements
- `SpaceActionSpecSchema`
  - safe declarative action records
  - kinds: `local`, `prompt`, `bridge`, `navigation`, `destructive`
  - visibility rules
  - confirmation rules
  - prompt binding metadata
  - timeout / retry policy
- `SpaceTestSpecSchema`
  - declarative checks and severity
- `SpaceTestResultsSchema`
  - per-case result set, blocking flag, checked timestamp
- `SpaceFallbackStateSchema`
  - safe summary text
  - dataset preview
  - failure notice
  - retry availability
- `SpaceDynamicStateSchema`
  - `renderMode`
  - `build`
  - `summary`
  - `normalizedData`
  - `uiSpec`
  - `actionSpec`
  - `latestTestResults`
  - `fallback`
- `SpaceBuildProgressEventSchema`
  - `spaceId`
  - `build`
  - optional `summary`
- `ExecuteSpaceActionRequestSchema`
  - `profileId`
  - `sessionId`
  - `actionId`
  - `selectedItemIds`
  - `formValues`
  - `pageState`
  - `filterState`
- `SpaceActionResponseSchema`
  - final resolved space + build summary

### Existing schema extensions

- Extend `SpaceSchema` with:
  - `renderMode`
  - `dynamic`
- Extend `SessionMessagesResponseSchema` / `SpaceResponseSchema` / `SpacesResponseSchema` to expose dynamic build state.
- Extend `ChatStreamEventSchema` with:
  - `space_build_progress`
  - optional `space_ready` wrapper is not needed if `space_event` + `complete` already cover the final promotion

## Persistence changes

### Files

- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/database.test.ts`

### SQLite schema changes

#### `spaces`

Add columns:

- `render_mode TEXT NOT NULL DEFAULT 'legacy_content_v1'`
- `active_build_id TEXT`
- `ready_build_id TEXT`
- `build_error_code TEXT`
- `build_error_message TEXT`

Keep current columns:

- `tabs_json`
- `metadata_json`

Those remain the compatibility/fallback layer.

#### `space_builds`

Create table:

- `id TEXT PRIMARY KEY`
- `space_id TEXT NOT NULL REFERENCES spaces(id) ON DELETE CASCADE`
- `profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE`
- `session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL`
- `build_version INTEGER NOT NULL`
- `trigger_kind TEXT NOT NULL`
- `trigger_request_id TEXT`
- `trigger_action_id TEXT`
- `phase TEXT NOT NULL`
- `progress_message TEXT`
- `retry_count INTEGER NOT NULL DEFAULT 0`
- `error_code TEXT`
- `error_message TEXT`
- `error_detail TEXT`
- `started_at TEXT NOT NULL`
- `updated_at TEXT NOT NULL`
- `completed_at TEXT`
- `created_at TEXT NOT NULL`

Indexes:

- `(space_id, build_version DESC)`
- `(profile_id, updated_at DESC)`
- unique `(space_id, build_version)`

#### `space_build_artifacts`

Create table:

- `id TEXT PRIMARY KEY`
- `space_id TEXT NOT NULL REFERENCES spaces(id) ON DELETE CASCADE`
- `build_id TEXT NOT NULL REFERENCES space_builds(id) ON DELETE CASCADE`
- `artifact_kind TEXT NOT NULL`
- `schema_version TEXT NOT NULL`
- `payload_json TEXT NOT NULL`
- `created_at TEXT NOT NULL`
- `updated_at TEXT NOT NULL`

Indexes:

- unique `(build_id, artifact_kind)`
- `(space_id, artifact_kind, updated_at DESC)`

#### `space_build_logs`

Create table:

- `id TEXT PRIMARY KEY`
- `space_id TEXT NOT NULL REFERENCES spaces(id) ON DELETE CASCADE`
- `build_id TEXT NOT NULL REFERENCES space_builds(id) ON DELETE CASCADE`
- `phase TEXT NOT NULL`
- `level TEXT NOT NULL`
- `message TEXT NOT NULL`
- `detail TEXT`
- `created_at TEXT NOT NULL`

Indexes:

- `(build_id, created_at ASC)`
- `(space_id, created_at DESC)`

### Persistence behavior

- Every phase transition updates `space_builds`.
- Every artifact write is upserted per `(build_id, artifact_kind)`.
- In-progress builds found on startup are marked `failed` with a restart-safe error code such as `SPACE_BUILD_INTERRUPTED`.
- Space promotion updates:
  - `spaces.active_build_id`
  - `spaces.ready_build_id`
  - `spaces.render_mode`
  - `spaces.build_error_*`
  - fallback `tabs_json`

## Bridge workflow changes

### Files

- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/http/create-bridge-server.ts`
- `apps/bridge/src/server.test.ts`
- `apps/bridge/src/hermes-cli/client.ts`
- `apps/bridge/src/hermes-cli/client.test.ts`
- `apps/bridge/src/transcript-runtime.test.ts`
- `apps/bridge/test/fixtures/hermes-cli-fixture.mjs`

### New bridge helpers/modules

New files to add:

- `apps/bridge/src/services/space-build-pipeline.ts`
- `apps/bridge/src/services/space-build-contract.ts`
- `apps/bridge/src/services/space-ui-spec-builder.ts`
- `apps/bridge/src/services/space-action-spec-builder.ts`
- `apps/bridge/src/services/space-test-harness.ts`
- `apps/bridge/src/services/space-fallback.ts`

### New chat workflow

1. Receive chat request.
2. Persist user message and runtime request as today.
3. Ask Hermes for conversational output plus `hermes-space-data`.
4. Parse and sanitize the final conversational answer.
5. If no space data block exists:
   - keep the normal chat-only flow
   - preserve legacy `hermes-ui-workspaces` compatibility parsing during rollout
6. If space data exists:
   - create/update the target space in a `dynamic_v1` building state
   - create a new `space_builds` row
   - persist `user_prompt`, `intent`, `raw_data`, `assistant_context`
   - emit `space_build_progress`
7. Run second-pass local builder:
   - normalize data
   - plan compact layout
   - generate UI spec
   - generate action spec
   - generate test spec
   - validate all artifacts
   - run declarative test harness
8. If critical checks pass:
   - promote the build
   - write fallback tabs from the normalized data summary
   - emit `space_event` + `space_build_progress`
9. If critical checks fail:
   - mark build failed
   - keep raw data + assistant context + fallback summary
   - emit failure progress
10. Only then persist the final assistant transcript-visible message and send `complete`.

### Prompt contract changes

`apps/bridge/src/hermes-cli/client.ts` will switch the default prompt contract from “return a ready-to-render view type” to “return raw data plus intent”.

New primary fence:

```text
```hermes-space-data
{ ... }
```
```

Bridge expectations:

- one block max
- no executable code
- explicit schema version
- explicit mutation target/mode
- explicit intent
- explicit raw data object
- assistant response context metadata
- links / pagination hints where present

Backward compatibility:

- keep parsing `hermes-ui-workspaces`
- convert legacy operations into a compatible raw-data/normalized-data path
- keep stripping both fences from transcript-visible assistant messages

### Action execution flow

New endpoint:

- `POST /api/spaces/:id/actions/stream`

Server flow:

1. validate the selected action against the persisted `actionSpec`
2. apply local-only actions in-process without Hermes
3. for prompt-bound actions:
   - load original prompt, intent, normalized data, raw data, current UI state, selected rows, form state
   - build a narrow Hermes action prompt
   - require Hermes to return `hermes-space-data`
   - persist action-triggered build artifacts
   - rerun the same second-pass builder
4. emit progress, `space_build_progress`, `space_event`, transcript message(s), and final completion/error events

## UI renderer changes

### Files

- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/pages/ChatPage.tsx`
- `apps/web/src/hooks/use-app-controller.ts`
- `apps/web/src/lib/api.ts`
- `apps/web/src/App.test.tsx`

New files to add:

- `apps/web/src/ui/organisms/DynamicSpacePanel.tsx`
- `apps/web/src/ui/organisms/DynamicSpaceRenderer.tsx`
- `apps/web/src/ui/molecules/SpaceBuildStatusCard.tsx`
- `apps/web/src/ui/molecules/DynamicSpaceCollection.tsx`
- `apps/web/src/ui/molecules/DynamicSpaceDetail.tsx`
- `apps/web/src/ui/molecules/DynamicSpaceForm.tsx`
- `apps/web/src/ui/molecules/DynamicSpaceWizard.tsx`

### Rendering rules

- If `space.renderMode === 'dynamic_v1'` and there is a ready validated `uiSpec`, render the dynamic panel.
- If a build is in progress:
  - show `Building space…`
  - show spinner
  - show current phase label + progress text
  - optionally show safe fallback summary/raw preview beneath the status card
- If the newest build failed:
  - show a visible failure card
  - show fallback summary/raw preview
  - show retry action when allowed
- If the space is legacy:
  - keep the existing tab renderer

### Dynamic renderer scope

Initial renderer support:

- header title / subtitle / status / badges / stats
- collections:
  - compact table with pagination
  - compact cards with pagination
  - compact list layout
- selected-item detail pane stacked for small panes
- toolbars and action buttons
- destructive confirmations
- loading / empty / error states
- basic forms
- basic step-through wizard

Renderer constraints:

- Chakra components only
- no `dangerouslySetInnerHTML`
- no arbitrary component names
- fixed allowlist of section kinds and field presentations
- internal scroll only

## Declarative test harness

### Files

- `apps/bridge/src/services/space-test-harness.ts`
- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/server.test.ts`

### Checks to implement

- `schema_valid`
- `render_smoke`
- `compact_layout`
- `pagination_valid`
- `actions_resolve`
- `destructive_requires_confirmation`
- `empty_state_present`
- `loading_state_present`
- `links_well_formed`

Blocking behavior:

- any failed `critical` test blocks promotion to ready
- warnings are persisted but do not block

## Rollout order

### Phase 1: Protocol + persistence

- add new schemas and API contracts
- add DB tables / migrations / restart-safe build finalization
- add protocol and DB tests first

Verification:

- `pnpm exec vitest run --config vitest.unit.config.ts packages/protocol/src/index.test.ts`
- `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/database.test.ts`

### Phase 2: Bridge contract + pipeline

- add `hermes-space-data` parsing
- add legacy compatibility conversion
- add build coordinator, artifact persistence, fallback generation, and harness
- extend stream events with `space_build_progress`
- add bridge/service/server tests

Verification:

- `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/services/hermes-bridge-service.test.ts`
- `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/server.test.ts`
- `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/hermes-cli/client.test.ts`

### Phase 3: Web renderer + building UX

- add dynamic renderer and building/failure cards
- add API helpers and controller support for build progress and action streams
- preserve legacy renderer fallback
- add App-level regression tests for building/ready/failed/action flows

Verification:

- `pnpm exec vitest run --config vitest.unit.config.ts apps/web/src/App.test.tsx`

### Phase 4: Prompt-bound actions

- add action endpoint and controller plumbing
- implement prompt-bound action execution and rebuild
- add tests for selection context, confirmation, and assistant updates

Verification:

- targeted bridge + app tests above

### Phase 5: Full verification + docs

- update docs/specs, AGENTS, README if needed
- run repo-wide verification

Verification:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- if stable, `pnpm ci:full`

## Fallback strategy

- If Hermes returns no valid structured space data:
  - do not create a broken dynamic space
  - continue chat normally
- If build artifact validation fails:
  - persist raw data + assistant context + failed build
  - show failure card + safe fallback preview
- If the harness fails:
  - do not promote the build
  - keep last ready build if present
  - otherwise keep a summary/raw-data fallback
- If the bridge restarts mid-build:
  - mark the build failed on next startup
  - keep data and retry option

## Performance strategy

- Make the second pass bridge-local and deterministic.
- Persist after every phase transition instead of holding a long in-memory transaction.
- Keep `uiSpec` concise and bind to normalized datasets instead of duplicating large item payloads repeatedly.
- Page collections in the client; default page sizes should target small panes:
  - cards: 4-6
  - tables: 6-10
  - lists: 8-12
- Render only the current page / selection in the pane.
- Preserve the current internal-scroll shell layout and avoid document overflow.

## Timeout strategy

- First-pass Hermes request keeps using existing request timeout policy selection:
  - normal chat
  - discovery
  - nearby/local-search
  - space-operation
  - unrestricted
- The second-pass build is local and must not invoke long external stages.
- Per local build phase target:
  - analyze/normalize/spec generation: effectively sub-second
  - validation/test harness: low single-digit seconds maximum
- Prompt-bound actions that need Hermes reuse the same bounded request path as chat and then rerun the local builder.
- Never hide a long opaque stage behind “building”; progress must update at every phase boundary.

## Test plan

### Protocol

- schema parsing for build state, artifacts, UI spec, action spec, test spec, and build progress events
- legacy compatibility parsing still works

### Database

- migrations create new build/artifact/log tables
- build rows/artifacts persist across reopen
- in-progress builds become failed after restart
- ready build promotion preserves prior ready build if a later build fails

### Bridge

- `hermes-space-data` parsing
- legacy `hermes-ui-workspaces` conversion
- build lifecycle progression
- SSE `space_build_progress`
- harness gating blocks bad specs
- action execution rebuilds the space
- fallback behavior on build failure

### Web

- building spinner + phase text
- dynamic renderer compact layouts
- failure fallback + retry
- prompt-bound action execution with selection context
- legacy spaces still render through the old panel
- internal scroll remains intact

## Acceptance criteria for this rollout

1. A space persists prompt, intent, raw data, normalized data, assistant context, UI spec, action spec, test spec, test results, and build logs in isolated structured storage.
2. Chat-driven space creation/update shows `Building space…` plus progress before activation.
3. Dynamic spaces render from a safe declarative UI spec, not a preset `viewType`.
4. The dynamic renderer uses Chakra and fits the existing shell with no shell/theme rewrite.
5. Space buttons can invoke prompt-bound actions with bound context and rebuild the space safely.
6. Declarative per-space tests run before a build becomes ready.
7. Failed builds degrade to a visible safe fallback with retry.
8. Reload/restart keeps the last ready build and preserves failed/in-progress build records correctly.
9. Legacy spaces remain readable during the migration window.
10. `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass, with `pnpm build` run if the branch remains stable.
