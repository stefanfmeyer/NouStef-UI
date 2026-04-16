# 2026-04-12 Home Workspace Reliability + E2E Hardening

## Goal

Harden Hermes Home workspace reliability without changing the core ordering:

1. Hermes performs the task.
2. The bridge creates or updates the baseline Home workspace.
3. The bridge optionally attempts Workspace Applet enrichment.

The product must make those stages explicit in persisted state, telemetry, and UI, remove remaining legacy format-switch controls from the active UX, and add end-to-end coverage for success, degradation, and timeout cases.

## Exact file paths

### Protocol

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.test.ts`

### Bridge

- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/server.test.ts`
- `apps/bridge/test/fixtures/hermes-cli-fixture.mjs`

### Web

- `apps/web/src/hooks/use-app-controller.ts`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/App.test.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`

### E2E

- `apps/web/e2e/app.spec.ts`

### Docs

- `AGENTS.md`
- `README.md`
- `docs/specs/spaces.md`
- `docs/specs/hermes-ui-workspaces.md`

## Stage model

Add a first-class Home workspace pipeline summary that is persisted with the space and hydrated into the active `space.dynamic` projection.

### Pipeline groups

- `task`
- `baseline`
- `applet`

### Pipeline stage values

- `task_running`
- `task_failed`
- `task_ready`
- `baseline_updating`
- `baseline_failed`
- `baseline_ready`
- `applet_generating`
- `applet_validating`
- `applet_failed`
- `applet_ready`

### Persisted shape

Persist a pipeline object with:

- current stage value
- per-group status (`idle`, `running`, `ready`, `failed`, `skipped`)
- failure category
- user-facing message
- diagnostic detail
- retryable boolean
- configured timeout when relevant
- updated timestamp

Implementation note:

- keep applet build rows as the detailed verifier record
- add a lighter pipeline summary to the space row metadata/dynamic state so the UI can distinguish task, baseline, and applet outcomes without inferring from applet build phases alone

## Failure categorization

Make failure categories explicit and queryable in persisted pipeline state, build failure metadata, and telemetry payloads.

Planned categories:

- `timeout_user_config`
- `timeout_runtime`
- `auth_scope`
- `upstream_tool_failure`
- `task_failure`
- `baseline_workspace_failure`
- `applet_seed_failure`
- `applet_manifest_failure`
- `applet_source_failure`
- `applet_capability_failure`
- `applet_compile_failure`
- `applet_test_failure`
- `applet_render_failure`
- `applet_small_pane_failure`
- `applet_verification_failure`
- `unknown`

## UI changes

### Active Home workspace surfaces

- Remove the visible legacy `Markdown / Table / Cards` switch controls from the active workspace UI.
- Keep baseline Home rendering as Markdown-first content.
- Keep any legacy content synchronization/render helpers under the hood only where still needed for persisted compatibility.

### Explicit pipeline presentation

In the attached workspace panel / dynamic workspace view:

- show a compact stage/status panel or banners that explicitly distinguishes:
  - task failed before baseline update
  - baseline ready while applet is building
  - baseline ready while applet failed
  - baseline failed
  - applet ready
- show the relevant failure category and concise user-facing explanation
- include timeout-specific messaging with configured timeout where applicable
- keep retry/regenerate controls tied to the relevant stage

### Retry semantics

Clarify whether the visible retry action reruns:

- applet enrichment only, or
- task + baseline + applet

For this pass:

- the active workspace retry UX should describe the actual behavior clearly in the UI copy and logs
- no generic “Retry build” copy that hides which pipeline stage is being rerun

## Telemetry changes

Extend telemetry and persisted failure metadata so root cause is explicit.

### Telemetry requirements

- emit stage-aware events for task, baseline, and applet phases
- include failure category in event payloads
- include configured timeout and effective timeout where relevant
- distinguish task timeout from applet timeout
- keep applet post-task failures separate from task failures

### Persisted failure metadata

Persist on failed applet/baseline states:

- failed stage
- failure category
- user-facing explanation
- diagnostic detail
- retryable
- timeout values when relevant

## Old code / visible UX to retire

- retire visible legacy content-format switching in `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- stop presenting the synchronized Markdown/Table/Cards model as the user-facing architecture for active Home workspaces
- keep any remaining compatibility readers/renderers internal only until old persisted rows no longer need them

## E2E matrix

### 1. Prose-only Home workspace

- ask for a simple prose answer
- baseline Home workspace renders usable Markdown
- no applet-required state is shown
- no legacy format buttons are visible

### 2. Collection/data-rich workspace

- ask for a structured result (for example restaurants or hotels)
- baseline appears first
- applet either promotes successfully or clearly degrades
- small-pane layout remains usable

### 3. Interactive action workspace

- open a workspace with at least one prompt-bound action
- trigger the action
- verify the workspace updates and the stage state remains clear

### 4. Failure/degraded applet workspace

- simulate applet failure after baseline success
- verify baseline stays visible
- verify failure category and explicit degraded message
- verify retry/regenerate affordance is visible

### 5. Timeout-classified failure

- simulate too-small timeout or timeout-induced failure
- verify UI calls out timeout explicitly
- verify configured timeout is surfaced
- verify telemetry carries the timeout failure category

### 6. Retry / rebuild flow

- start from a baseline-visible failed applet
- run the retry path
- verify success or failure is explicit
- verify no legacy format controls appear during or after retry

## Acceptance criteria

- the persisted space state clearly distinguishes task, baseline, and applet stages
- UI clearly distinguishes task failure vs baseline success vs applet failure
- timeout failures are explicit in both UI and telemetry
- no visible `Markdown / Table / Cards` controls remain in the active Home workspace UX
- baseline Home workspaces remain usable when enrichment fails
- Playwright coverage exercises prose, collection, interactive action, degraded applet, timeout, and retry cases
- `pnpm lint` passes
- `pnpm typecheck` passes
- `pnpm test` passes
- `pnpm test:integration` passes
- if feasible, `pnpm build` and `pnpm ci:full` pass
