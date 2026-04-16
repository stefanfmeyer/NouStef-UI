# 2026-04-12 Workspace Applet Architecture

## Goal

Replace the fragile “Hermes emits the final rich workspace schema” model with a layered Hermes Home architecture:

1. **Guaranteed baseline Home workspace**
   - Every request always creates or updates a usable attached Home workspace.
   - The baseline remains usable if every richer stage fails.
   - Baseline may be markdown-only, locally compiled structured UI, or both.

2. **Optional Hermes-generated workspace applet**
   - Hermes may generate a small TSX applet against a constrained local SDK.
   - The bridge compiles, typechecks, validates, tests, and smoke-checks the applet before promotion.
   - A promoted applet upgrades the existing Home workspace.
   - If generation or verification fails, the baseline Home workspace remains active and usable.

This plan treats the **already-shipped Home baseline + local compiler** as the reliability layer that must not regress. The new applet path is added as a separately persisted, separately verified promotion layer.

## Why This Architecture

Recent production failures show the same pattern:

- Hermes can produce empty structured payloads.
- Hermes can emit marker-only payloads.
- Hermes can emit schema-invalid optional sections.
- Hermes is not reliable enough to emit the final app-specific UI/data schema correctly.

The current bridge-side compiler rearchitecture already solved the worst part by reducing Hermes to a minimal workspace seed and compiling `space_analysis/v1` plus `space_ui/v2` locally. That must remain intact.

The next step is **not** to push Hermes back toward another large final schema. The next step is:

- keep the bridge as the owner of baseline usability and local compilation
- let Hermes generate a much smaller, more ergonomic TSX authoring artifact
- verify that artifact aggressively before any live promotion

## Architecture Summary

### Existing baseline layer to keep

- `apps/bridge/src/services/spaces/dynamic-space-contract.ts`
  - parses a minimal `hermes_space_seed/v1`
- `apps/bridge/src/services/spaces/home-workspace-compiler.ts`
  - analyzes raw data into `space_analysis/v1`
  - derives compatibility `normalized_data`
  - compiles safe `space_ui/v2`
- `apps/bridge/src/services/hermes-bridge-service.ts`
  - always creates/updates a Home baseline first
  - optionally upgrades the space through structured-only seed generation
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
  - renders validated `space_ui/v2`

This remains the guaranteed reliable layer.

### New applet layer to add

- Hermes generates **TSX authoring code**, not the final workspace schema.
- The generated applet targets a constrained **Workspace Applet SDK**.
- The bridge verifies and compiles the applet into a safe persisted applet render tree.
- The web app renders that tree with a trusted Chakra-backed renderer.
- The raw generated TSX never becomes the live rendering source of truth.

## High-Level Flow

```text
User request
  -> Hermes conversational answer
  -> bridge writes baseline Home workspace immediately
      -> markdown baseline always
      -> if raw data exists, bridge local compiler may also build space_ui/v2
  -> optional applet build starts
      A. analyze current Home workspace context
      B. ask Hermes for applet manifest/plan
      C. ask Hermes for TSX source
      D. ask Hermes for generated tests
      E. optional one-shot repair if verification fails
      F. verify manifest/source/tests
      G. compile TSX -> applet render tree
      H. promote applet if all gates pass
  -> if applet fails, baseline Home remains active
```

## Artifact Lifecycle

### Baseline artifacts

Persisted already and retained:

- `user_prompt`
- `intent`
- `raw_data`
- `analysis`
- `normalized_data`
- `assistant_context`
- `ui_spec`
- `action_spec`
- `test_spec`
- `test_results`
- `summary`
- `fallback`

### New applet artifacts

Add applet-specific artifacts:

- `applet_manifest`
- `applet_plan`
- `applet_source`
- `applet_test_source`
- `applet_render_tree`
- `applet_verification`

Each applet attempt is isolated and restart-safe.

### Promotion rule

The baseline Home workspace is always active.

The applet becomes active only when:

- manifest validates
- capability usage validates
- source static validation passes
- TypeScript typecheck passes
- generated tests pass
- render smoke passes
- small-pane smoke passes
- no forbidden imports/calls are detected

If any gate fails:

- mark the applet build failed
- keep the baseline Home workspace active
- show a failed-construction state with retry/regenerate affordances

## Protocol Changes

### Files

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.ts`
- `packages/protocol/src/index.test.ts`

### New schemas

1. `SpaceBuildKindSchema`
   - `compiled_home`
   - `applet`

2. Extend `SpaceBuildSchema`
   - add `buildKind`
   - extend phases with applet-specific bounded stages:
     - `applet_analyzing`
     - `applet_planning`
     - `applet_generating_manifest`
     - `applet_generating_source`
     - `applet_generating_tests`
     - `applet_repairing`
     - `applet_validating`
     - `applet_typechecking`
     - `applet_testing`
     - `applet_render_smoke`
     - `applet_promoting`

3. `SpaceAppletCapabilityKindSchema`
   - `prompt_action`
   - `approved_api`
   - `refresh_space`
   - `open_link`
   - `image`
   - `network_image`

4. `SpaceAppletCapabilitySchema`
   - `id`
   - `kind`
   - `label`
   - `description`
   - `requiresConfirmation`
   - `metadata`

5. `SpaceAppletManifestSchema`
   - `kind: 'applet_manifest'`
   - `schemaVersion: 'space_applet_manifest/v1'`
   - `title`
   - `summary`
   - `description?`
   - `requestedCapabilities`
   - `declaredActionIds`
   - `usesImages`
   - `usesTabs`
   - `usesPagination`
   - `smallPaneStrategy`
   - `metadata`

6. `SpaceAppletPlanSchema`
   - `kind: 'applet_plan'`
   - `schemaVersion: 'space_applet_plan/v1'`
   - `summary`
   - `nodeKinds`
   - `datasets`
   - `actionIds`
   - `notes`

7. `SpaceAppletSourceArtifactSchema`
   - `kind: 'applet_source'`
   - `schemaVersion: 'space_applet_source/v1'`
   - `entrypoint: 'default'`
   - `source`

8. `SpaceAppletTestSourceArtifactSchema`
   - `kind: 'applet_test_source'`
   - `schemaVersion: 'space_applet_test_source/v1'`
   - `source`

9. `SpaceAppletRenderTreeSchema`
   - `kind: 'applet_render_tree'`
   - `schemaVersion: 'space_applet_render_tree/v1'`
   - safe node tree compiled from SDK usage

10. `SpaceAppletVerificationSchema`
    - `kind: 'applet_verification'`
    - `schemaVersion: 'space_applet_verification/v1'`
    - `status: 'passed' | 'failed'`
    - `typecheck`
    - `staticValidation`
    - `capabilityValidation`
    - `generatedTests`
    - `renderSmoke`
    - `smallPaneSmoke`
    - `errors`
    - `warnings`
    - `checkedAt`

11. `SpaceAppletStateSchema`
    - `promotedBuildId`
    - `manifest?`
    - `renderTree?`
    - `verification?`

12. Extend `SpaceDynamicStateSchema`
    - add `applet?: SpaceAppletState`

13. Extend `SpaceArtifactKindSchema`
    - add the new applet artifact kinds

### API surface

Keep the existing session and space APIs stable.

Potential additions:

- `GET /api/spaces/:id/applet/:buildId` is not required if the applet render tree is hydrated inside the normal `SpaceSchema`.
- Existing chat and action APIs remain primary.
- Existing SSE `space_build_progress` remains primary, now including applet build stages.

## Persistence Changes

### Files

- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/database.ts`
- `apps/bridge/src/database.test.ts`

### Database strategy

Do **not** create a separate second persistence model if the existing build/artifact tables can isolate applets cleanly.

Use:

- existing `space_builds`
- existing `space_build_artifacts`
- existing `space_build_logs`

Add:

- `build_kind` column to `space_builds`
- `active_applet_build_id` column to `spaces`
- `ready_applet_build_id` column to `spaces`

Why:

- current `active_build_id` / `ready_build_id` already support baseline compiled-home builds
- applets need parallel promotion state without destroying the current reliable build hydration
- separate active/ready applet ids prevent stale precedence bugs

### Hydration changes

Update `resolveSpaceDynamicState(...)` so it hydrates:

- baseline compiled-home build state from existing build ids
- promoted/active applet state from `active_applet_build_id` and `ready_applet_build_id`

The resulting `space.dynamic` should contain both:

- baseline/home compiler artifacts
- optional applet artifacts

## Workspace Applet SDK

### Files

- `apps/bridge/src/services/spaces/workspace-applet-sdk.tsx`
- `apps/bridge/src/services/spaces/workspace-applet-test-sdk.ts`
- `apps/bridge/src/services/spaces/workspace-applet-types.ts`
- `apps/bridge/src/services/spaces/workspace-applet-static-validation.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier-runner.ts`

### Important design choice

The generated applet is TSX authoring code, but the live browser does **not** execute raw generated TSX directly.

Instead:

- TSX is compiled and typechecked in a bounded verifier environment
- the SDK components produce a safe serializable applet render tree
- the bridge persists that render tree as the promoted artifact
- the browser renders the persisted tree via a trusted renderer

This keeps the user’s requested TSX authoring model while avoiding unchecked runtime code execution in the browser shell.

### SDK surface

Expose only a constrained module surface:

- layout: `Stack`, `Inline`, `Grid`, `Card`, `Divider`
- content: `Heading`, `Text`, `Markdown`, `Badge`, `Stat`, `Image`, `Callout`
- data views: `Tabs`, `Table`, `List`, `DetailPanel`, `Paginator`
- state views: `EmptyState`, `ErrorState`, `LoadingState`
- inputs: `Button`, `ButtonGroup`, `Input`, `Select`, `Textarea`

Hooks/helpers:

- `useSpaceData()`
- `useAppletState()`
- `useSelection()`
- `usePagination()`
- `useFilters()`
- `useFormState()`
- `defineApplet(...)`
- `defineAppletManifest(...)`
- `defineAppletTests(...)`

Action helpers:

- `runPromptAction(actionId, payload?)`
- `runPrompt(prompt, options?)`
- `callApprovedApi(capabilityId, payload?)`
- `refreshSpace()`
- `updateLocalState(patch)`
- `openLink(url)`
- `confirmAction(config, action)`

### Constraint model

Generated applets may import only:

- `workspace-applet-sdk`
- `workspace-applet-test-sdk`

Forbidden:

- arbitrary repo imports
- raw `fetch`
- `eval`
- `Function`
- dynamic import of untrusted paths
- `iframe`
- `script`
- `window.open` directly
- filesystem/process/child-process access

## Applet Compiler and Verification Harness

### Files

- `apps/bridge/src/services/spaces/workspace-applet-pipeline.ts`
- `apps/bridge/src/services/spaces/workspace-applet-generator.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier-runner.ts`
- `apps/bridge/src/services/spaces/workspace-applet-render-tree.ts`

### Verification flow

1. Static validation
   - verify imports
   - reject forbidden globals/APIs
   - reject raw network primitives
   - reject forbidden JSX/runtime calls

2. Manifest validation
   - schema-valid
   - capabilities declared
   - destructive actions require confirmation

3. Typecheck
   - write temp workspace
   - generate `tsconfig.json`
   - run `tsc --noEmit`

4. Generated tests
   - import generated tests in a separate runner process
   - execute via the test SDK

5. Render smoke
   - execute the applet module against fixture context
   - ensure a valid render tree is produced

6. Small-pane smoke
   - reject obvious overflow or unsupported layouts
   - enforce compact defaults:
     - max 2 grid columns
     - bounded pagination
     - limited action-bar density
     - no full-width image-only hero layouts

7. Capability validation
   - render tree action usage must match manifest declarations
   - direct API capability IDs must be bridge-approved

8. Promotion
   - persist render tree artifact
   - update `ready_applet_build_id`
   - update `space.dynamic.applet`

### Repair policy

At most one repair pass after failed verification.

Allowed repair triggers:

- TSX syntax failure
- typecheck failure
- generated test failure
- forbidden import/call

Not allowed:

- recursive repair chains
- more than one repair pass per request

## Bridge Changes

### Files

- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/services/spaces/dynamic-space-contract.ts`
- `apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- new applet files listed above
- `apps/bridge/src/hermes-cli/client.ts`

### Request handling changes

For every request:

1. keep current baseline Home behavior
   - user-visible answer remains normal conversational flow
   - baseline Home workspace always exists
   - current local compiler may still create `space_ui/v2`

2. only after baseline usability exists, optionally attempt applet generation

Applet generation eligibility:

- explicit structured-space intent
- attached space refresh
- retry-build
- existing Home workspace already has usable structured artifacts

Skip applet generation for clearly prose-only/simple requests.

### Hermes generation stages

Add bounded prompts in `apps/bridge/src/hermes-cli/client.ts` / bridge service:

- Stage A: analyze and propose manifest/plan
- Stage B: generate manifest JSON
- Stage C: generate TSX source only
- Stage D: generate tests only
- Stage E: optional one-shot repair with verifier errors

Each stage:

- explicit timeout
- no tool usage
- no freeform prose
- no recursive loops
- max one retry/repair where specified

### Reuse existing action flow where possible

Compiled applet action declarations should map to:

- existing prompt-bound action execution path where possible
- bridge-side approved capability handlers for deterministic API operations

Prefer:

- prompt actions by default
- direct bridge/API capability actions only when deterministic and explicitly approved

## Web Changes

### Files

- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/organisms/WorkspaceAppletView.tsx`
- `apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx`
- `apps/web/src/ui/organisms/WorkspaceAppletRenderer.test.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`

### Rendering rules

Priority:

1. promoted applet render tree, if verified and present
2. existing validated local `space_ui/v2`
3. baseline markdown content
4. persisted fallback summary if needed

When applet build is in progress:

- keep baseline content visible
- show “Building space…” with spinner and progress

When applet build fails:

- stop the spinner
- show explicit failed-construction state
- keep baseline content visible
- keep retry/regenerate affordance

### Chakra mapping

`WorkspaceAppletRenderer` maps safe applet render tree nodes to Chakra components only.

## Compatibility and Migration Strategy

1. Keep `space_ui/v1` and `space_ui/v2` compatibility intact.
2. Keep `hermes-ui-workspaces` and minimal seed parsing intact.
3. Do not break existing persisted `dynamic_v1` spaces.
4. Default existing builds to `build_kind = 'compiled_home'`.
5. Only populate applet fields for new applet attempts.
6. Existing renderer continues to work even if no applet state exists.

## Security Tradeoffs and Mitigations

### Tradeoff

This design intentionally allows Hermes to author TSX, but not to execute unchecked code live in the browser.

### Mitigations

- constrained SDK imports only
- static validation before any execution
- separate runner process for compile/test/smoke execution
- strict manifest validation
- explicit capability declarations
- approved direct APIs only
- promoted render tree, not raw source, becomes the browser rendering input
- baseline Home workspace never depends on applet success

### Explicit non-goals for this pass

- no arbitrary React component imports
- no browser-side eval/new Function
- no unrestricted fetch/network from applets
- no unbounded repair loops

## Test Strategy

### Protocol

- `packages/protocol/src/index.test.ts`

Add tests for:

- applet manifest schema
- applet render tree schema
- applet verification schema
- build kind and applet stage schemas

### Bridge unit tests

- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/services/spaces/dynamic-space-builder.test.ts`
- new:
  - `apps/bridge/src/services/spaces/workspace-applet-verifier.test.ts`
  - `apps/bridge/src/services/spaces/workspace-applet-pipeline.test.ts`

Coverage:

- baseline Home space still appears for every request
- applet generation only upgrades, never gates baseline
- manifest/source/tests persist per build
- typecheck failure leaves baseline usable
- generated test failure leaves baseline usable
- forbidden import leaves baseline usable
- bad capability request leaves baseline usable
- marker-only / empty Hermes output leaves baseline usable
- retry/regenerate creates a new applet build attempt
- applet promotion updates promoted state only after all gates pass

### Database

- `apps/bridge/src/database.test.ts`

Coverage:

- migration adds applet columns cleanly
- applet build rows survive restart
- promoted applet hydration survives restart
- active/ready compiled-home and applet build precedence stays correct

### Web

- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
- new `apps/web/src/ui/organisms/WorkspaceAppletRenderer.test.tsx`
- `apps/web/src/App.test.tsx`

Coverage:

- promoted applet renders over baseline
- failed applet shows failed state while baseline remains visible
- building applet shows spinner/progress while baseline remains visible
- buttons, tabs, cards, paginator, image, table/list/detail render in narrow pane
- prompt-bound action buttons call the existing action path
- approved API actions call approved handlers only

### Integration

- extend existing bridge/server integration coverage where practical

Simulate:

- empty Hermes applet output
- schema-invalid manifest
- TSX syntax error
- forbidden imports
- failing generated tests
- bad capability declarations
- layout-smoke failure

Expected result every time:

- baseline Home workspace still usable
- explicit failed-construction state
- no broken shell

## Rollout Order

1. Add protocol schemas for applet artifacts/state/build-kind.
2. Add DB columns and hydration for applet build ids/artifacts.
3. Add SDK/test SDK plus applet render tree schemas.
4. Add verifier and static validation.
5. Add applet pipeline service.
6. Integrate pipeline into bridge after baseline/local compiler success.
7. Add web applet renderer and build/failure UI handling.
8. Add regression tests.
9. Update docs and `AGENTS.md`.
10. Run full verification.

## Acceptance Criteria

1. Every request still creates a usable baseline Home workspace.
2. Hermes-generated applets can render buttons, tabs, cards, pagination, and images through the SDK.
3. Applets can perform prompt-bound actions and approved direct API actions through capabilities.
4. Applets are activated only after compile/test/validation gates pass.
5. Failed applet generation never breaks baseline usability.
6. The system no longer depends on Hermes emitting the final rich app schema correctly.
7. Integration/unit coverage includes bad Hermes outputs and verifies graceful behavior.
8. Generation stages remain bounded and explicit.
9. `pnpm lint`, `pnpm typecheck`, `pnpm test`, and, if feasible, `pnpm build` pass.

## Concrete File List

Planned files to change:

- `AGENTS.md`
- `README.md`
- `docs/specs/spaces.md`
- `docs/specs/hermes-ui-workspaces.md`
- `docs/plans/2026-04-12-workspace-applet-architecture.md`
- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.ts`
- `packages/protocol/src/index.test.ts`
- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/database.test.ts`
- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/services/spaces/dynamic-space-builder.ts`
- `apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- `apps/bridge/src/services/spaces/dynamic-space-contract.ts`
- `apps/bridge/src/services/spaces/workspace-applet-sdk.tsx`
- `apps/bridge/src/services/spaces/workspace-applet-test-sdk.ts`
- `apps/bridge/src/services/spaces/workspace-applet-types.ts`
- `apps/bridge/src/services/spaces/workspace-applet-static-validation.ts`
- `apps/bridge/src/services/spaces/workspace-applet-render-tree.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier-runner.ts`
- `apps/bridge/src/services/spaces/workspace-applet-pipeline.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier.test.ts`
- `apps/bridge/src/services/spaces/workspace-applet-pipeline.test.ts`
- `apps/bridge/src/hermes-cli/client.ts`
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/organisms/WorkspaceAppletView.tsx`
- `apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx`
- `apps/web/src/ui/organisms/WorkspaceAppletRenderer.test.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
- `apps/web/src/App.test.tsx`

## Open Design Decisions To Resolve During Implementation

1. Whether generated tests should be executable TS modules through the test SDK or a lighter DSL compiled from TS helper calls.
   - Preferred: TS module through `defineAppletTests(...)` and the test SDK.

2. Whether applet generation should run only after a successful local structured build or also from markdown-only baselines.
   - Preferred for this pass: only attempt applets when the space already has meaningful structured artifacts.

3. Whether the current compiled-home build should be skipped entirely for some structured intents once applets stabilize.
   - Not in this pass. Keep compiled-home as the reliable bridge-owned rich layer.
