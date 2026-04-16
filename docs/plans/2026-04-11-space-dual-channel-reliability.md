# Space Dual-Channel Reliability Plan

Date: 2026-04-11
Owner: Codex
Status: Investigation complete, implementation in progress

## Goal

Improve production reliability and operator UX across the dynamic Spaces pipeline by making the dedicated structured-only artifact path the default production mechanism, attempting a space on every request, degrading cleanly to Markdown fallback spaces, and tightening the runtime/settings/history surfaces that expose these states.

## Phase 0 summary

### Current architecture

- `apps/bridge/src/services/hermes-bridge-service.ts` already supports:
  - in-band `hermes-space-data` parsing from assistant markdown
  - a dedicated structured-only recovery/generation step for required structured-space and retry flows
  - dynamic build persistence via `space_builds`, `space_build_artifacts`, and `space_build_logs`
  - failed dynamic shells when rich structured builds cannot be recovered
- `apps/bridge/src/services/spaces/dynamic-space-contract.ts` already treats `hermes-space-data` as a start marker plus balanced JSON contract and classifies strict failures for structured-only responses.
- `apps/bridge/src/services/spaces/dynamic-space-builder.ts` already derives summary/fallback/UI/action/test artifacts locally and runs a generic harness before activation.
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx` already has dynamic `building`, `ready`, and `failed` states, but the failed state still uses a spinner and does not visually distinguish failed construction strongly enough.
- `apps/web/src/hooks/use-app-controller.ts` already computes `runtimeConfigGate.status = checking | ready | blocked`, but `apps/web/src/App.tsx` currently renders the same blocker card for `checking` and `blocked`.
- `apps/web/src/ui/pages/SettingsPage.tsx` still combines Access audit and Troubleshooting telemetry into one tab, and only telemetry has a bounded scroll region.
- `apps/web/src/ui/pages/ToolHistoryPage.tsx` renders two tables in one column without a clearly bounded internal list region for each section, so pagination can drift out of view in constrained heights.

### Current gaps

- The primary request flow still treats rich structured space creation as intent-gated:
  - structured-only generation is only used when a request is classified as requiring a structured space or a retry/repair path fires
  - ordinary requests can still complete without any attached space
- The bridge still treats the conversational answer as a potential artifact carrier in the first pass instead of always using a dedicated structured-only artifact call as the primary dynamic path.
- There is no universal Markdown fallback-space path for every request.
- `SettingsResponseSchema` only exposes `accessAudit` as a summary with recent events; there is no paginated audit endpoint/response.
- `TelemetryResponseSchema` is limit-based only; it does not carry page/pageSize/total metadata needed for the new Settings tab split.
- Tool History uses paginated data, but the view layout needs stronger internal-scroll discipline so the tables never push content below the pagination controls.

## Chosen architecture

### 1. Dual-channel request flow becomes the default

For every chat request:

1. Hermes returns the user-facing conversational answer through the normal chat stream.
2. The bridge separately requests a structured space artifact through a dedicated structured-only path.
3. If the structured artifact validates, the bridge runs the local dynamic builder and activates a dynamic space.
4. If the structured artifact is unavailable or invalid, the bridge still creates or updates the attached space as a Markdown fallback using the assistant answer.
5. The request completes successfully either way unless the base chat request itself fails.

This makes the structured-only path the primary production mechanism for dynamic spaces and demotes in-band assistant markdown parsing to compatibility-only behavior.

### 2. Space creation/update happens on every request

Every request will produce a space attempt:

- rich structured request -> dynamic build
- simple request -> Markdown fallback space
- explicit “space/workspace” request -> structured-only attempt first, Markdown fallback if rich build fails
- retry build -> new build attempt against the existing attached space
- refresh / prompt-bound action -> update the existing attached space through the same dual-channel path

### 3. Markdown fallback spaces are a first-class success mode

Markdown fallback is not an error-only afterthought. It becomes the universal safe path when a richer dynamic build is not available.

We will persist:

- the conversational assistant response as Markdown content
- a dynamic build row when a dynamic attempt occurred
- degraded/fallback metadata on the space so the browser can render a clear state and offer retry

### 4. UI status and layout changes stay declarative and compact

- Dynamic space builds keep using the trusted Chakra allowlist renderer.
- Failed builds show a failed-construction state instead of an endless spinner.
- Runtime configuration checking gets a proper loading card with spinner, distinct from blocked/error.
- Tool History, Access audit, and Troubleshooting telemetry each get stable internal scroll regions with fixed pagination controls.

## Implementation plan

## 1. Protocol changes

### Files

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.ts`
- `packages/protocol/src/index.test.ts`

### Changes

- Extend space dynamic/fallback schemas to represent “space on every request” cleanly:
  - add `SpaceFallbackModeSchema`
    - `markdown_response`
    - `build_failure`
  - extend `SpaceFallbackStateSchema` with:
    - `mode`
    - `sourceBuildId` optional
    - `sourceRequestId` optional
    - `degradedReason` optional
- Extend `SpaceBuildTriggerKindSchema` to distinguish always-on chat fallback attempts cleanly if needed:
  - keep current values if `chat` is sufficient
  - do not add a new trigger kind unless tests show the distinction is necessary
- Add explicit paginated list contracts for Settings data:
  - `AuditEventsResponseSchema`
    - `items`
    - `page`
    - `pageSize`
    - `total`
    - summary fields already used in settings (`unrestrictedAccessLastEnabledAt`, `unrestrictedAccessLastUsedAt`)
  - replace limit-only telemetry response with paginated metadata:
    - `TelemetryResponseSchema`
      - `items`
      - `page`
      - `pageSize`
      - `total`
- Keep all existing dynamic space schemas versioned and compatible.

### Acceptance checks

- Schema tests cover new fallback fields and paginated audit/telemetry responses.
- Existing dynamic-space artifact schemas remain backward compatible.

## 2. Persistence changes

### Files

- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/database.test.ts`

### Changes

- Keep `spaces`, `space_builds`, `space_build_artifacts`, and `space_build_logs` as the current persistence backbone.
- Do not add a new table for Markdown fallback spaces; instead:
  - persist Markdown fallback content in `spaces.tabs_json`
  - persist fallback metadata/artifacts in `space_build_artifacts` when a dynamic attempt was made
- Add paginated DB accessors:
  - `listAuditEventsPage(profileId?, page, pageSize, types?)`
  - `countAuditEvents(...)`
  - extend `listTelemetryEvents(...)` to support `page` and `pageSize` while preserving optional filters
  - `countTelemetryEvents(...)`
- Ensure failed or degraded dynamic attempts still update:
  - `spaces.render_mode = 'dynamic_v1'` when a dynamic build exists
  - `spaces.tabs_json` to a Markdown fallback representation
  - `spaces.build_error_code` / `spaces.build_error_message`
- Preserve restart-safe behavior:
  - interrupted builds still fail on startup
  - last ready build remains preferred for dynamic artifacts when appropriate
  - latest failed build still wins for active failed status while preserving ready artifacts for safe rendering

### Migration / compatibility

- Use additive SQLite changes only.
- No destructive migration is required.
- Existing databases with dynamic-space tables remain valid.
- Existing telemetry queries keep working if they omit paging.

### Acceptance checks

- DB tests confirm paginated audit/telemetry reads.
- DB tests confirm fallback/dynamic artifact precedence survives restart/reopen.

## 3. Bridge changes

### Files

- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/services/spaces/dynamic-space-contract.ts`
- `apps/bridge/src/services/spaces/dynamic-space-builder.ts`
- `apps/bridge/src/hermes-cli/client.ts`
- `apps/bridge/src/http/create-bridge-server.ts`
- related tests in:
  - `apps/bridge/src/services/hermes-bridge-service.test.ts`
  - `apps/bridge/src/services/spaces/dynamic-space-builder.test.ts`
  - `apps/bridge/src/server.test.ts`

### Request pipeline changes

- Refactor `streamHermesRequest()` so every request takes this path:
  1. run the normal conversational Hermes chat call
  2. sanitize/persist the user-visible assistant answer
  3. determine the target space:
    - current attached space for refresh/action/update flows
    - existing session-attached space if one exists
    - otherwise create a new attached space shell
  4. run the dedicated structured-only artifact generation path as the default dynamic attempt
  5. if the structured artifact validates, apply the local dynamic build
  6. otherwise create/update a Markdown fallback space
  7. complete the request successfully

- Keep compatibility-only parsing of in-band `hermes-space-data` and legacy `hermes-ui-workspaces`, but change precedence:
  - dedicated structured-only artifact channel is primary
  - initial in-band structured payload is opportunistic compatibility, not the main path

### New helper behavior

- Add helper to determine whether the request should attempt a rich dynamic artifact:
  - default: yes for all requests
  - but allow a fast path where obviously trivial answers skip the structured-only Hermes call and go directly to Markdown fallback if this materially improves reliability/performance
  - if implemented, this heuristic must be explicit, deterministic, and test-covered
- Add helper to prepare or reuse a target attached space for universal fallback/dynamic flows.
- Add helper to build Markdown fallback artifacts from the assistant answer:
  - sanitized transcript-visible markdown
  - compact title/summary
  - fallback metadata
  - retry action when a dynamic build failed

### Structured-only path changes

- Make the dedicated structured-only channel the default production path for dynamic builds, not only retry/repair.
- Keep it bounded:
  - one primary structured-only attempt
  - one optional reissue at most
  - no loops
- Keep the current balanced-JSON extraction contract in `dynamic-space-contract.ts`.
- If Hermes cannot emit directly parseable JSON without the marker, keep the current start-marker-plus-first-balanced-JSON contract, but treat it as a structured-only channel rather than an in-band chat artifact.

### Retry / refresh / action changes

- `retry_build` must:
  - create a new build row
  - run the same dedicated structured-only path
  - fall back to Markdown space state if rich build still fails
- `space_refresh` and prompt-bound actions should reuse the same dual-channel infrastructure:
  - normal conversational answer
  - structured-only artifact attempt
  - fallback Markdown update if no rich artifact is available

### Telemetry changes

- Keep current structured-only telemetry and add/align these codes:
  - `SPACE_ATTEMPT_STARTED`
  - `SPACE_ATTEMPT_DYNAMIC_SUCCEEDED`
  - `SPACE_ATTEMPT_FALLBACK_MARKDOWN`
  - `SPACE_ATTEMPT_DYNAMIC_FAILED`
  - `SPACE_ATTEMPT_COMPLETED`
- Preserve and continue using explicit structured-only codes:
  - marker missing
  - marker only / empty payload
  - json missing
  - unbalanced JSON
  - invalid JSON
  - schema invalid
  - reissue attempted / succeeded / failed
- Ensure retry telemetry is still distinguishable from original-request telemetry.

### HTTP/API changes

- Add paginated endpoints or extend current ones:
  - `GET /api/telemetry?page=&pageSize=&...`
  - `GET /api/audit-events?page=&pageSize=&profileId=...`
- Keep `GET /api/settings` for summary cards and initial page load.

### Acceptance checks

- Every request results in either:
  - a ready dynamic build
  - or a Markdown fallback space update
- No request depends primarily on in-band assistant fence formatting for production success.
- Retry/refresh/action paths reuse the same bounded structured-only logic.

## 4. Web changes

### Files

- `apps/web/src/lib/api.ts`
- `apps/web/src/hooks/use-app-controller.ts`
- `apps/web/src/App.tsx`
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/pages/ToolHistoryPage.tsx`
- `apps/web/src/ui/pages/ToolsPage.tsx`
- `apps/web/src/ui/pages/SettingsPage.tsx`
- related tests:
  - `apps/web/src/App.test.tsx`
  - `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`

### Space build UI

- Update `DynamicSpaceView.tsx`:
  - `building`: spinner + “Building space…” + progress text
  - `failed`: failure icon/state, no spinner, show retry affordance
  - fallback markdown remains scrollable and usable in small panes

### Runtime readiness UX

- Update `App.tsx` runtime gate:
  - `checking` shows a loading/checking card with spinner and softer styling
  - `blocked` keeps the stronger blocked/error visual
- Update `SettingsPage.tsx` model/provider section to mirror that distinction with a spinner for `checking`.

### Tool History layout

- Update `ToolHistoryPage.tsx` so:
  - the overall card is `display:flex; flex-direction:column; min-height:0`
  - the runtime/reviewed history body is the scrollable region
  - pagination stays pinned below the scroll area
  - each table section remains compact and does not overflow beneath controls

### Settings split

- Split the current `audit` tab into:
  - `access_audit`
  - `telemetry`
- Each tab gets:
  - compact row layout
  - internal scroll region
  - pagination controls
- Keep General / Model / Unrestricted tabs unchanged apart from runtime-checking polish.

### Controller/API state

- Add controller state for:
  - `accessAuditPage`
  - `telemetryPage`
  - paginated audit response
  - paginated telemetry response
- Keep existing settings summary state for the small summary badges at the top of Access audit.

### Acceptance checks

- Failed dynamic builds never show an endless spinner.
- Runtime checking never looks like a hard blocker until readiness actually resolves to blocked.
- Tool History pagination remains visible while long tables scroll internally.
- Access audit and Telemetry are distinct paginated tabs with stable internal scroll.

## 5. Test strategy

### Protocol

- `packages/protocol/src/index.test.ts`
  - paginated telemetry schema
  - paginated audit schema
  - fallback-mode schema coverage

### Bridge

- `apps/bridge/src/services/hermes-bridge-service.test.ts`
  - every request attempts a space create/update
  - simple assistant response produces Markdown fallback space
  - explicit structured-only success produces dynamic space
  - structured-only failure degrades to Markdown fallback
  - retry build still creates a new build and can degrade to Markdown fallback
  - refresh/action paths preserve safe fallback behavior
  - dynamic build failures never fail the whole request if the conversational answer succeeded
- `apps/bridge/src/services/spaces/dynamic-space-builder.test.ts`
  - fallback artifact generation remains compact and valid
  - existing structured-only parsing coverage stays intact
- `apps/bridge/src/database.test.ts`
  - paginated telemetry/audit persistence and reload
- `apps/bridge/src/server.test.ts`
  - new audit-events route
  - paginated telemetry route
  - request completion with fallback space

### Web

- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
  - failed dynamic build shows failure state instead of spinner
  - fallback markdown remains visible
- `apps/web/src/App.test.tsx`
  - runtime checking blocker shows spinner/checking state
  - settings tabs are split
  - paginated telemetry/access audit controls render
  - tool history layout/pagination remains visible

### Verification sequence

During development:

- targeted `vitest` runs for each slice

Before handoff:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build` if feasible

## Rollout order

1. Plan + AGENTS update
2. Protocol pagination/fallback schema additions
3. DB paging helpers and bridge route/service additions
4. Bridge refactor to always attempt a space and make structured-only generation primary
5. Markdown fallback-space creation/update path for all requests
6. Dynamic space failure/building UI refinements
7. Runtime readiness checking card
8. Tool History scroll fix
9. Settings tab split + paginated audit/telemetry
10. Final verification + docs updates

## Deferred / explicit tradeoffs

- Hermes chat does not currently expose an authoritative JSON chat/artifact command like `--json` for conversational requests. The bridge will therefore keep using a dedicated structured-only Hermes chat step with a strict marker-plus-JSON contract as the practical structured channel.
- We should not remove legacy `hermes-ui-workspaces` compatibility in this pass.
- “Space on every request” will increase local space churn. We should prefer updating the existing attached session space instead of creating a new standalone space every time for the same session.

## Acceptance criteria

- Every request attempts to create or update an attached space.
- Rich requests can still activate dynamic spaces through the dedicated structured-only artifact path.
- Simple requests and rich-build failures still produce Markdown fallback spaces.
- The production path no longer relies primarily on in-band prose/fence formatting from the conversational answer.
- Runtime configuration detection renders a true checking/loading state with spinner.
- Failed dynamic space builds render a failure state/icon instead of an endless spinner.
- Tool History scrolls internally and keeps pagination visible.
- Access audit and Troubleshooting telemetry are separate paginated internal-scroll tabs.
- `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass.
