# Hermes Home Baseline Workspaces Plan

Date: 2026-04-12

## Goal

Make attached spaces reliable by treating a local deterministic Home workspace as the primary success path for every request.

Rich dynamic structured UI remains valuable, but it becomes an optional enrichment layer rather than the condition for baseline workspace usability.

## Investigation summary

### Current production evidence

The user-cited failure is still present in the local SQLite database:

- `space-b31c8433-57a4-454e-b25d-71ade1a83e41`
- build version `3`
- `trigger_kind = retry`
- `trigger_action_id = retry-build`
- final phase `failed`
- `error_detail = "The Hermes space-data block was empty."`

The local DB also now shows a newer retry attempt on the same space:

- build version `4`
- `trigger_request_id = request-51e5b1a8-8c6d-461d-bc0a-47ea0257777e`
- final phase `failed`
- `error_code = SPACE_DATA_BLOCK_REPAIR_FAILED`
- `error_detail` contains schema-invalid `normalizedData` issues from a structured-only direct-JSON response

That changes the diagnosis:

1. Marker-only and empty structured payloads are still happening.
2. Even when Hermes gets past empty output, upstream structured artifacts can still be schema-invalid.
3. Baseline space usability cannot depend on enrichment success.

### Current implementation gaps

Bridge:

- `apps/bridge/src/services/hermes-bridge-service.ts`
  - `createOrUpdateMarkdownFallbackSpace(...)` exists, but it is still mainly used as a degraded fallback or the simple-request path.
  - Dynamic-capable flows still treat `dynamic_v1` enrichment as the dominant attached-space path.
  - `prepareDynamicSpaceTarget(...)` resets the visible tabs to `Building space…`, which discards the richer baseline content during enrichment.
  - `createFailedDynamicSpaceShell(...)` persists safe fallback artifacts, but the baseline content model is still not the conceptual center.

Protocol:

- `packages/protocol/src/schemas.ts`
  - `SessionSchema` only exposes `attachedSpaceId`; it does not expose a stable `type` / `workspaceType` field for `Home` vs `TUI`.
  - `SpaceMetadataSchema` tracks attempt metadata, but does not explicitly label Home-managed baseline ownership.

Web:

- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
  - `dynamic_v1` spaces render only `DynamicSpaceView`, so the stored content-tab baseline is hidden whenever enrichment is in play.
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
  - failed/building states show fallback summary markdown, not the baseline Home content model.
- `apps/web/src/ui/organisms/Sidebar.tsx`
  - collapsed width is still constrained by the profile badge and expand control sharing the same horizontal row.
- `apps/web/src/ui/molecules/SessionRow.tsx`
  - recent rows still show summary text instead of `message count + last message time`.
- `apps/web/src/ui/pages/SessionsPage.tsx`
  - the session table still shows a `Space` column rather than `Type: Home | TUI`.
- `apps/web/src/ui/templates/ShellLayout.tsx`
  - branding still uses profile/page header text and does not use `logo.svg` + `Hermes Home`.
- `apps/web/src/hooks/use-app-controller.ts`
  - `handleSaveSettings(...)` still emits a generic success toast, including theme-only saves.
- `packages/ui/src/provider.tsx`
  - Chakra still uses `defaultSystem`, so density/radius tuning is only local and inconsistent.

## Chosen architecture

### Primary rule

Every request creates or updates a Home workspace immediately after Hermes returns the conversational answer.

### Baseline Home workspace

The Home workspace is local and deterministic:

- attached to the current session
- stored in the existing trusted local `spaces` table
- content tab populated from the assistant response
- safe to render without model-authored code
- usable even if no structured enrichment ever succeeds

### Enrichment as upgrade

The current dynamic build pipeline stays, but it becomes an upgrade path on top of the Home baseline:

1. user request completes conversationally
2. bridge writes/refreshes the Home baseline tabs first
3. bridge optionally starts a dynamic enrichment build
4. if enrichment succeeds, `dynamic_v1` artifacts become the richer rendering layer
5. if enrichment fails, the baseline Home content remains visible and usable

This preserves the existing validated declarative renderer and test harness, while removing it from the critical path for baseline workspace existence.

## Data model and compatibility strategy

### Session type

Add a stable session-facing type field:

- protocol/API value: `workspaceType: 'home' | 'tui'`
- UI display label: `Home` or `TUI`

Compatibility rule:

- `home` when the session has a Home-managed attached space
- `tui` when it does not

This is a derived field first, not a hard DB migration requirement.

### Space metadata

Extend `SpaceMetadataSchema` to include Home ownership semantics:

- `homeWorkspace: boolean`
- `baselineContentUpdatedAt?: string`
- `latestEnrichmentOutcome?: 'ready' | 'failed' | 'building'`

Compatibility:

- existing spaces default to `homeWorkspace = false`
- bridge upgrades attached spaces created through the Home baseline path

### Render model

Keep existing render modes:

- `legacy_content_v1`
- `dynamic_v1`

But change semantics:

- all Home spaces always keep meaningful baseline content tabs
- `dynamic_v1` means “Home baseline plus optional enrichment state”
- failed `dynamic_v1` spaces keep the baseline content visible instead of only the fallback summary shell

## Files expected to change

### Plan and docs

- `docs/plans/2026-04-12-hermes-home-baseline-workspaces.md`
- `AGENTS.md`
- `README.md`
- `docs/specs/spaces.md`
- `docs/specs/hermes-ui-workspaces.md`

### Protocol

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.test.ts`

### Bridge

- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/services/spaces/dynamic-space-contract.ts`
- `apps/bridge/src/services/spaces/dynamic-space-builder.ts`
- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/server.test.ts`
- `apps/bridge/src/database.test.ts`
- `apps/bridge/test/fixtures/hermes-cli-fixture.mjs`

### Web

- `packages/ui/src/provider.tsx`
- `apps/web/src/App.tsx`
- `apps/web/src/hooks/use-app-controller.ts`
- `apps/web/src/ui/templates/ShellLayout.tsx`
- `apps/web/src/ui/organisms/Sidebar.tsx`
- `apps/web/src/ui/molecules/SessionRow.tsx`
- `apps/web/src/ui/pages/SessionsPage.tsx`
- `apps/web/src/ui/pages/ToolsPage.tsx`
- `apps/web/src/ui/pages/ToolHistoryPage.tsx`
- `apps/web/src/ui/pages/SettingsPage.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/ui/atoms/ThemeToggle.tsx`
- `apps/web/src/resources/logo.svg`
- `apps/web/src/App.test.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`

## Implementation slices

### Slice 1: Protocol and derived session type

Goal:

- expose `workspaceType`
- expose Home metadata cleanly

Changes:

- add `SessionWorkspaceTypeSchema = z.enum(['home', 'tui'])`
- add `workspaceType` to `SessionSchema`
- add Home metadata fields to `SpaceMetadataSchema`
- update API test fixtures and protocol tests

Verification:

- `pnpm vitest run --config vitest.unit.config.ts packages/protocol/src/index.test.ts`

### Slice 2: Bridge baseline Home path

Goal:

- every request writes a Home baseline before optional enrichment

Changes:

- add a helper in `hermes-bridge-service.ts` that:
  - creates or updates the attached baseline Home space
  - stores the full assistant markdown in the content tab
  - marks `homeWorkspace: true`
  - updates space-attempt metadata
- change the main request flow in `streamHermesRequest(...)` so:
  - after conversational output is available, the baseline Home space is always written first
  - the dynamic build step upgrades that same space instead of replacing baseline visibility
- keep delete semantics explicit: do not immediately recreate a space when the request explicitly deleted it

Verification:

- focused bridge tests for baseline creation on normal requests, retry requests, and repeated enrichment failure

### Slice 3: Enrichment upgrade semantics

Goal:

- dynamic enrichment never destroys baseline usability

Changes:

- update `prepareDynamicSpaceTarget(...)` to preserve baseline tabs instead of replacing them with `Building space…` only
- update failure handling so:
  - `dynamic_v1` state can be failed
  - baseline tabs remain intact
  - build progress/failure metadata stays separate from baseline content
- update `DynamicSpaceView` and `SessionSpacePanel` so failed/building enrichment states still show the baseline content below or alongside the state banner

Verification:

- bridge tests for repeated empty payloads and schema-invalid enrichment responses
- web tests for building/failure state plus usable baseline content

### Slice 4: Session type and Home/TUI indicators

Goal:

- replace the old `Space` indicator with `Type`

Changes:

- derive `workspaceType` in bridge/database hydration
- update `SessionsPage` table column from `Space` to `Type`
- use compact `Home` / `TUI` badges
- update `SessionRow` recent-session indicator to a compact Home badge/icon

Verification:

- bridge tests for Home/TUI derivation
- app tests for session table and recent-session indicators

### Slice 5: Branding and navbar polish

Goal:

- rebrand visible shell as Hermes Home
- make collapsed nav narrower and cleaner

Changes:

- use `apps/web/src/resources/logo.svg` in `ShellLayout`
- show `Hermes Home` in the top-left branding block
- update sidebar collapsed layout so the expand button is vertically separated from the profile badge stack
- reduce collapsed width materially

Verification:

- app tests for branding/logo render
- app tests for collapsed nav behavior

### Slice 6: Recent sessions redesign

Goal:

- show title on first line only
- second line shows `message count + last message time`

Changes:

- update `SessionRow.tsx`
- add a compact formatter helper for timestamps
- remove summary text from recent rows

Verification:

- app tests for title-only first line and metadata second line

### Slice 7: Settings/tool history/layout polish

Goal:

- keep pagination visible
- keep internal scrolling disciplined
- remove theme-change toast
- slightly denser UI with smaller radii

Changes:

- `ThemeToggle.tsx` / `handleSaveSettings(...)`: silent theme persistence path
- `ToolHistoryPage.tsx`: ensure scroll area stays inside a fixed-height flex column
- `SettingsPage.tsx`: verify/polish paginated internal-scroll audit + telemetry tabs
- `packages/ui/src/provider.tsx`: move from `defaultSystem` to a custom Chakra system with modestly reduced radii and spacing tokens
- trim over-large local `rounded`, padding, and control heights in shell/sidebar/settings/chat/session surfaces

Verification:

- app tests for no theme toast
- app tests for checking spinner
- app tests for audit/telemetry tabs
- app tests for tool history pagination visibility hooks

## Testing strategy

### Bridge

Add or update tests covering:

- every request creates or updates a baseline Home space
- simple assistant responses become baseline markdown Home spaces
- dynamic enrichment success upgrades an existing Home space
- failed enrichment keeps baseline content usable
- retry-build creates a fresh build attempt without destroying baseline usability
- repeated empty structured payloads degrade cleanly
- schema-invalid structured payloads degrade cleanly
- delete requests do not immediately recreate a deleted space

Likely files:

- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/server.test.ts`
- `apps/bridge/src/database.test.ts`

### Web

Add or update tests covering:

- building state banner with spinner
- failed enrichment banner with failure icon instead of spinner
- baseline content still visible for failed dynamic spaces
- runtime readiness checking spinner
- session `Type` column values `Home` / `TUI`
- recent-session Home indicator and second-line metadata
- branding/logo render
- collapsed sidebar narrower/cleaner control layout
- no toast on theme toggle
- internal-scroll and pagination behavior for Tool History, Access audit, and Troubleshooting telemetry

Likely files:

- `apps/web/src/App.test.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`

### Full verification

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Rollout order

1. Protocol/session metadata updates.
2. Bridge baseline Home-space creation path.
3. Enrichment upgrade semantics and failure preservation.
4. Session type and indicator UI.
5. Branding/logo + collapsed sidebar + recent sessions redesign.
6. Settings/tool history/theme/density polish.
7. Full verification and docs updates.

## Acceptance criteria

1. Every request creates or updates a Home space.
2. Home space baseline content is usable even when structured enrichment fails repeatedly.
3. Failed enrichment shows a failed-construction state instead of an endless spinner.
4. Runtime readiness uses a checking spinner state until detection resolves.
5. Session lists use a `Type` column with `Home` / `TUI`.
6. Home sessions have a visible compact indicator in session lists and/or recent sessions.
7. Shell branding uses `logo.svg` with visible `Hermes Home` text.
8. Collapsed navbar is visibly narrower and cleaner.
9. Recent sessions show `title` plus `message count + last message time`, not summary text.
10. Theme changes do not show a toast.
11. Tool History, Access audit, and Troubleshooting telemetry remain paginated with internal scrolling.
12. The UI is slightly denser with less aggressive radii and without layout regressions.
13. `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.
