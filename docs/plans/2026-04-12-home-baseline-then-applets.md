# 2026-04-12 Home Baseline Then Applets

## Goal

Replace the current preset-driven rich workspace production path with a two-phase architecture:

1. Phase A stabilizes the product by making the baseline Home workspace the only active production path.
2. Phase B reintroduces rich workspaces only as generated Workspace Applets that pass strict validation, compile, test, and promotion gates.

This plan is intentionally sequential. The app must stay working after Phase A before any applet-specific enrichment is layered back in.

## Current production diagnosis

The current bridge flow in [apps/bridge/src/services/hermes-bridge-service.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts) still does all of the following in one request path:

- writes a baseline markdown Home workspace
- requests a structured-only rich artifact
- runs `applyDynamicSpaceBuild(...)`
- compiles local `space_ui/v2`
- promotes that compiled rich workspace as the primary non-applet render path
- optionally attempts an applet upgrade after the compiled rich path is already active

That is the wrong reliability model for this task. The preset-style rich builder remains in the critical path through:

- [apps/bridge/src/services/spaces/dynamic-space-builder.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/dynamic-space-builder.ts)
- [apps/bridge/src/services/spaces/home-workspace-compiler.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/home-workspace-compiler.ts)
- `preferredPresentation`
- `collection` / `detail_sheet` / `property_sheet` / `timeline` / `grouped_collection`
- `space_ui/v1`
- `space_ui/v2`

The user-facing requirement is stricter:

- no production dependency on the old preset rich builder
- baseline Home must remain usable on every request
- rich upgrades come only from Workspace Applets

## Phase A

### Objective

Ship a reliable baseline-only product first.

### Deliverables

1. Every request creates or updates a Home workspace through the existing content-tab model.
2. The baseline Home workspace is always locally renderable from trusted local content only.
3. Prose, tests, and simple answers render as Markdown-first Home workspaces.
4. The preset-style rich builder is removed from production request, retry, refresh, and build paths.
5. Retry/build UI remains sane even when rich generation is disabled.
6. `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass before Phase B work begins.

### Production cutover

Phase A changes the active production flow in [apps/bridge/src/services/hermes-bridge-service.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts):

- Keep `createOrUpdateMarkdownFallbackSpace(...)`, but treat it as the primary Home workspace write path rather than a fallback.
- Remove `applyDynamicSpaceBuild(...)` from active request, retry, refresh, and action production flows.
- Remove `generateStructuredSpaceArtifact(...)` from active Phase A production request flow unless needed only to preserve prompt metadata for a later Phase B applet retry entry point.
- Stop promoting compiled rich `space_ui/v2` output in production.
- Keep attached-space retry state explicit, but make it retry/regenerate the future rich path, not the retired preset compiler.

### UI behavior after Phase A

Phase A web behavior is centered on the baseline content tab:

- [apps/web/src/ui/organisms/SessionSpacePanel.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.tsx) treats the baseline Home content as the default attached-space view.
- [apps/web/src/ui/organisms/DynamicSpaceView.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx) is no longer the default rich compiled Home renderer. It either becomes an applet-specific wrapper or is reduced to a banner + baseline shell.
- Failed build banners must not hide the baseline content.
- Retry/regenerate controls remain visible, but baseline content stays active and readable while richer stages are unavailable.

### Old code removed or retired in Phase A

Production references must be removed from:

- [apps/bridge/src/services/spaces/dynamic-space-builder.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/dynamic-space-builder.ts)
- [apps/bridge/src/services/spaces/home-workspace-compiler.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/home-workspace-compiler.ts)

Required handling:

- If the compiler is no longer needed in Phase A production code, delete it now, or quarantine it clearly as retired rich-builder code.
- `space_ui/v1`, `space_ui/v2`, `preferredPresentation`, `stack_with_detail`, and preset collection/detail assumptions must no longer drive active production rendering.

### Phase A file paths

Docs:

- [docs/plans/2026-04-12-home-baseline-then-applets.md](/Users/jozefbarton/dev/hermes-boots-codex/docs/plans/2026-04-12-home-baseline-then-applets.md)
- [AGENTS.md](/Users/jozefbarton/dev/hermes-boots-codex/AGENTS.md)
- [README.md](/Users/jozefbarton/dev/hermes-boots-codex/README.md)
- [docs/specs/spaces.md](/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces.md)
- [docs/specs/hermes-ui-workspaces.md](/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/hermes-ui-workspaces.md)

Protocol:

- [packages/protocol/src/schemas.ts](/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts)
- [packages/protocol/src/api.ts](/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/api.ts)
- [packages/protocol/src/index.test.ts](/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/index.test.ts)

Bridge:

- [apps/bridge/src/services/hermes-bridge-service.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts)
- [apps/bridge/src/services/spaces/dynamic-space-builder.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/dynamic-space-builder.ts)
- [apps/bridge/src/services/spaces/home-workspace-compiler.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/home-workspace-compiler.ts)
- [apps/bridge/src/data/bridge-database.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts)
- [apps/bridge/src/services/hermes-bridge-service.test.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.test.ts)
- [apps/bridge/src/server.test.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/server.test.ts)
- [apps/bridge/src/database.test.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/database.test.ts)

Web:

- [apps/web/src/hooks/use-app-controller.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/hooks/use-app-controller.ts)
- [apps/web/src/ui/organisms/SessionSpacePanel.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.tsx)
- [apps/web/src/ui/organisms/DynamicSpaceView.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx)
- [apps/web/src/ui/organisms/SessionSpacePanel.test.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.test.tsx)
- [apps/web/src/App.test.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/App.test.tsx)

## Phase B

### Objective

Reintroduce rich workspaces only as generated Workspace Applets.

### Deliverables

1. Rich workspaces activate only after a Workspace Applet passes all promotion gates.
2. The baseline Home workspace remains active even if plan, source, tests, or verification fail.
3. The applet system uses a constrained SDK and a capability manifest.
4. Retry/regenerate actions rebuild the applet path in bounded stages only.
5. `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass with the applet architecture enabled.

### Applet generation stages

The bridge runs a bounded staged flow only:

1. `analyze`
2. `manifest`
3. `source`
4. `tests`
5. optional one-shot `repair`
6. `validate/promote`

No recursive retries. No open-ended loops.

### Applet artifacts and storage

Applet artifacts stay in the existing persisted workspace-build tables:

- `space_builds`
- `space_build_artifacts`
- `space_build_logs`

Artifacts to persist per applet build:

- `user_prompt`
- `intent`
- `raw_data`
- `assistant_context`
- `analysis`
- `normalized_data`
- `summary`
- `fallback`
- `applet_plan`
- `applet_manifest`
- `applet_source`
- `applet_test_source`
- `applet_render_tree`
- `applet_verification`

Storage behavior:

- the baseline Home content remains stored in `spaces.tabs`
- the active baseline remains readable without any build artifact
- applet artifacts are build-scoped and restart-safe
- failed applet artifacts remain available for diagnostics and retry

### Workspace Applet SDK design

The constrained SDK lives under bridge-side applet tooling:

- [apps/bridge/src/services/spaces/workspace-applet-sdk.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-sdk.ts)
- [apps/bridge/src/services/spaces/workspace-applet-sdk-jsx-runtime.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-sdk-jsx-runtime.ts)
- [apps/bridge/src/services/spaces/workspace-applet-test-sdk.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-test-sdk.ts)
- [apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx)

SDK surface to support and verify:

UI primitives:

- `Stack`
- `Inline`
- `Grid`
- `Card`
- `Stat`
- `Badge`
- `Heading`
- `Text`
- `Markdown`
- `Tabs`
- `Tab`
- `Table`
- `List`
- `DetailPanel`
- `EmptyState`
- `ErrorState`
- `LoadingState`
- `Paginator`
- `Image`
- `Button`
- `ButtonGroup`
- `Input`
- `Select`
- `Textarea`
- `Divider`
- `Callout`

Hooks and actions:

- `useSpaceData()`
- `useAppletState()`
- `useSelection()`
- `usePagination()`
- `useFilters()`
- `useFormState()`
- `runPromptAction(actionId, payload?)`
- `runPrompt(prompt, options?)`
- `callApprovedApi(capabilityId, payload?)`
- `refreshSpace()`
- `updateLocalState(patch)`
- `openLink(url)`
- `confirmAction(config)`

### Capability manifest model

The manifest must declare:

- prompt-bound actions
- approved direct API capabilities
- image and network-image requirements
- destructive-action requirements
- confirmation requirements
- declared datasets
- small-pane strategy

Primary protocol/runtime files:

- [packages/protocol/src/schemas.ts](/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts)
- [apps/bridge/src/services/spaces/workspace-applet-contract.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-contract.ts)
- [apps/bridge/src/services/spaces/workspace-applet-static-validation.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-static-validation.ts)
- [apps/bridge/src/services/spaces/workspace-applet-verifier.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier.ts)

### Promotion gates

Every applet must pass:

1. manifest validation
2. capability validation
3. forbidden import and forbidden call checks
4. TypeScript compile or typecheck
5. generated unit tests
6. render smoke test
7. small-pane smoke test

Failure behavior:

- baseline Home stays active
- failed-construction state is shown
- retry/regenerate stays visible
- no invalid applet is promoted

### Phase B file paths

Protocol:

- [packages/protocol/src/schemas.ts](/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts)
- [packages/protocol/src/api.ts](/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/api.ts)
- [packages/protocol/src/index.test.ts](/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/index.test.ts)

Bridge:

- [apps/bridge/src/services/hermes-bridge-service.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts)
- [apps/bridge/src/services/spaces/dynamic-space-contract.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/dynamic-space-contract.ts)
- [apps/bridge/src/services/spaces/workspace-applet-contract.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-contract.ts)
- [apps/bridge/src/services/spaces/workspace-applet-generated-tests.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-generated-tests.ts)
- [apps/bridge/src/services/spaces/workspace-applet-render-tree.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-render-tree.ts)
- [apps/bridge/src/services/spaces/workspace-applet-sdk.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-sdk.ts)
- [apps/bridge/src/services/spaces/workspace-applet-sdk-jsx-runtime.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-sdk-jsx-runtime.ts)
- [apps/bridge/src/services/spaces/workspace-applet-static-validation.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-static-validation.ts)
- [apps/bridge/src/services/spaces/workspace-applet-test-sdk.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-test-sdk.ts)
- [apps/bridge/src/services/spaces/workspace-applet-verifier.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier.ts)
- [apps/bridge/src/services/spaces/workspace-applet-verifier-runner.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier-runner.ts)
- [apps/bridge/src/data/bridge-database.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts)
- [apps/bridge/src/hermes-cli/client.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.ts)
- [apps/bridge/src/services/hermes-bridge-service.test.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.test.ts)
- [apps/bridge/src/services/spaces/workspace-applet-verifier.test.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier.test.ts)

Web:

- [apps/web/src/hooks/use-app-controller.ts](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/hooks/use-app-controller.ts)
- [apps/web/src/ui/organisms/DynamicSpaceView.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx)
- [apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx)
- [apps/web/src/ui/organisms/SessionSpacePanel.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.tsx)
- [apps/web/src/App.test.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/App.test.tsx)
- [apps/web/src/ui/organisms/SessionSpacePanel.test.tsx](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.test.tsx)

## Branding and favicon

Use [apps/web/src/resources/logo.svg](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/resources/logo.svg) for:

- the in-app branding mark
- the favicon in [apps/web/index.html](/Users/jozefbarton/dev/hermes-boots-codex/apps/web/index.html)

Requirements:

- the same logo asset is used for light and dark modes
- `index.html` explicitly links the favicon

## Test strategy

### Phase A tests

Bridge:

- every request creates or updates the baseline Home workspace
- retry/build failures do not break baseline usability
- the old preset rich builder is no longer called in production paths

Web:

- baseline Home markdown renders for attached spaces
- failure and retry banners do not hide baseline content
- no production path requires compiled `space_ui/v1` or `space_ui/v2`

Verification:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build` if feasible

### Phase B tests

Bridge:

- generated applet compiles
- generated applet tests pass
- promotion gates block bad applets
- forbidden imports and calls are rejected
- approved direct API capabilities route only through the SDK and manifest
- failed applets leave baseline active

Web:

- promoted applets render through the trusted renderer
- small-pane layout smoke passes
- retry/regenerate remains available after failed promotion
- favicon is configured

Verification:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build` if feasible

## Acceptance criteria

### Phase A complete

1. The old preset rich builder is no longer used in production flows.
2. Every request creates or updates a usable Home workspace.
3. The baseline Home workspace renders without structured rich output.
4. The app remains stable and the Phase A verification commands pass.

### Phase B complete

1. Rich workspaces come only from generated Workspace Applets against the constrained SDK.
2. Applets activate only after validation, compile, test, render-smoke, and small-pane gates pass.
3. Failed applets never break baseline Home usability.
4. `logo.svg` is used for branding and favicon.
5. The Phase B verification commands pass.
