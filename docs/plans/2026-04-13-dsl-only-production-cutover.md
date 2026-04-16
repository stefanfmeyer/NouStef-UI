# DSL-Only Production Cutover

## Goal

Cut Hermes Home production enrichment over to DSL-only operation:

1. Baseline Home workspace stays the guaranteed success path.
2. Async rich enrichment uses only `workspace_dsl` generation.
3. The bridge normalizes DSL locally into `workspace_model` / `workspace_patch`.
4. The browser renders richer workspaces only through `WorkspaceDslRenderer`.
5. Runtime TSX applet generation, verifier, and promotion are removed or hard-disabled from standard production request, retry, and enrichment flows.

## Files In Scope

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/http/create-bridge-server.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-dsl-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-dsl-normalizer.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceDslRenderer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/api.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/server.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/e2e/app.spec.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/README.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/hermes-ui-workspaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/AGENTS.md`

## Production Runtime Paths To Remove Or Hard-Disable

### Bridge runtime

Remove or hard-disable from standard flows in `hermes-bridge-service.ts`:

- `attemptWorkspaceAppletUpgrade()`
- `continueWorkspaceAppletUpgrade()`
- `requestWorkspaceAppletStage()`
- `buildWorkspaceAppletSourcePrompt()`
- `buildWorkspaceAppletRepairPrompt()`
- `executeWorkspaceAppletCapabilityAction()`
- `recordFailedWorkspaceAppletSeedBuild()`
- any `SPACE_APPLET_*` telemetry emission in request, retry, or async enrichment flows

If the code is retained temporarily, it must be clearly unreachable behind an explicit experimental flag that defaults to off and is not enabled in standard server startup.

### Renderer/runtime UI

Remove from the active rendering path:

- `WorkspaceAppletRenderer` fallback from `DynamicSpaceView.tsx`
- any active production dependency on `space.dynamic.applet.*` for rendering

If `WorkspaceAppletRenderer.tsx` remains in the tree, it must be dormant and not reachable from normal product behavior.

### Action runtime

Disable runtime applet-only bridge actions from the standard product path:

- `bridge.handler === "applet_capability"` must not be usable in normal DSL-only flows

## DSL-Only Production Flow

### Request lane

1. Hermes performs the real task.
2. Bridge persists transcript-visible assistant output.
3. Bridge persists structured seed artifacts.
4. Bridge creates or updates the baseline Home workspace immediately.
5. User-facing request completes.

### Async enrichment lane

1. Queue `dsl_enrichment` build only.
2. Generate `workspace_dsl` artifact only.
3. Normalize DSL locally into `workspace_model` and `workspace_patch`.
4. Promote the normalized richer workspace if validation succeeds.
5. Keep baseline visible if DSL enrichment fails or times out.

No applet source generation, manifest synthesis, test generation, verifier, or promotion may follow the DSL path in production.

## State And Telemetry Cleanup

### Keep in active production flow

- `SPACE_DSL_GENERATION_STARTED`
- `SPACE_DSL_NORMALIZED`
- `SPACE_DSL_PROMOTED`
- DSL failure telemetry such as:
  - generation failure
  - validation failure
  - normalization failure
  - patch failure
  - timeout failure
  - context invalid
  - live-task violation

### Remove from active production flow

- `SPACE_APPLET_BUILD_STARTED`
- `SPACE_APPLET_SOURCE_GENERATION_STARTED`
- `SPACE_APPLET_SOURCE_FAILED`
- `SPACE_APPLET_MANIFEST_FAILED`
- `SPACE_APPLET_PROMOTED`
- any active applet-generation status messages in queue/retry/async flows

### Pipeline language

Update visible pipeline copy and active stage usage to reflect DSL-only enrichment rather than applet promotion. The visible product should speak in terms of:

- Home baseline
- workspace enrichment
- workspace DSL generation
- local normalization
- richer workspace ready

## Test Strategy

### Unit / bridge tests

Add or update tests proving:

1. `streamChat()` queues DSL-only enrichment after baseline success.
2. retry/rebuild uses DSL-only enrichment from persisted artifacts.
3. `generateWorkspaceAppletArtifact()` is never invoked in production request/retry paths.
4. no `SPACE_APPLET_*` telemetry is emitted in production request/retry paths.
5. DSL generation failures keep the baseline Home workspace active.
6. timeout failures in the async DSL lane record the configured timeout budget.

### Integration / server tests

Add or update tests proving:

1. rich Home spaces promote via `dsl_enrichment` only.
2. no applet build rows are created in standard flows.
3. no applet telemetry appears in standard flows.
4. baseline-first behavior remains intact when DSL fails.

### E2E / Playwright tests

Cover representative DSL-only workspaces:

1. prose-only baseline workspace
2. comparison/list workspace
3. inbox/email triage workspace
4. nearby search / restaurant shortlist workspace
5. action-driven workspace with prompt-bound actions

Assertions:

- baseline visible immediately
- async enrichment fills richer UI later when applicable
- no legacy Markdown/Table/Cards controls are shown
- no applet-specific UI path is used
- retry keeps baseline available while DSL-only enrichment reruns

## Timeout Verification Strategy

The async 90-second experiment remains scoped to DSL enrichment only.

Verification requirements:

1. Unit-level assertion that queued `dsl_enrichment` builds persist the configured async timeout budget.
2. Unit or integration assertion that `generateWorkspaceDslArtifact()` receives the scoped async timeout.
3. Unit assertion that `generateWorkspaceAppletArtifact()` is not called at all in standard flows, so applet source timeout cannot occur in production.
4. E2E scenario showing baseline-first + async DSL enrichment success.
5. E2E scenario showing baseline-first + async DSL timeout failure with baseline preserved and timeout messaging visible.

## Migration / Cleanup Strategy

1. Keep baseline Home creation logic intact.
2. Keep persisted `workspace_dsl`, `workspace_model`, and `workspace_patch` artifacts as the production enrichment chain.
3. Keep old applet artifacts and renderer files only if dormant and clearly off-path.
4. Keep database compatibility columns only if they do not influence standard runtime behavior.
5. Update docs and AGENTS to describe DSL-only production enrichment.

## Acceptance Criteria

1. Production workspace enrichment is DSL-only.
2. Runtime TSX applet generation is not used in standard request, retry, or async enrichment flows.
3. `WorkspaceDslRenderer` is the only active rich renderer in the production path.
4. Tests prove `generateWorkspaceAppletArtifact()` is not invoked in production flows.
5. Tests cover several representative DSL-only workspace types.
6. Tests verify the scoped async 90-second enrichment behavior.
7. Baseline Home workspaces remain reliable and usable when enrichment fails.
8. `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm test:integration` pass; run `pnpm build` and `pnpm ci:full` if feasible.
