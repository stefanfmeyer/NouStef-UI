# Async Home Workspace Enrichment Plan

Date: 2026-04-12

## Objective

Re-architect Hermes Home workspaces so the user-facing chat request completes after:

1. Hermes task execution
2. baseline Home workspace persistence
3. assistant transcript persistence

Optional richer workspace enrichment must continue asynchronously afterward from persisted artifacts only.

## Files in scope

Protocol:

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.test.ts`

Bridge:

- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/server.test.ts`
- `apps/bridge/src/hermes-cli/client.ts`
- `apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- `apps/bridge/src/services/spaces/workspace-applet-contract.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier.ts`

Web:

- `apps/web/src/hooks/use-app-controller.ts`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
- `apps/web/src/App.test.tsx`

E2E:

- `apps/web/e2e/app.spec.ts`
- `apps/bridge/test/fixtures/hermes-cli-fixture.mjs`

Docs / ledger:

- `README.md`
- `docs/specs/spaces.md`
- `docs/specs/hermes-ui-workspaces.md`
- `AGENTS.md`

## Two-lane execution design

### Lane A: synchronous request lane

Responsibilities:

- run Hermes task work
- persist runtime request/activity state
- persist the assistant answer
- create or update the baseline Home workspace
- persist enough structured artifacts for later enrichment
- complete the chat request to the browser

Rules:

- Lane A must not wait on applet source generation, generated tests, or verification.
- Lane A success is defined by task success + assistant answer delivered + baseline Home ready.
- If baseline fails after task success, the assistant answer still completes and the failure is explicit.

### Lane B: asynchronous enrichment lane

Responsibilities:

- start only after Lane A completes
- use persisted artifacts and bridge-local analysis only
- generate structured-only artifact if needed for enrichment
- generate optional applet source
- synthesize manifest/plan/tests locally
- verify and promote the richer UI
- persist progress and failure state independently of the original request stream

Rules:

- no live task re-entry
- no tool-heavy operational work
- no dependency on the request stream remaining open
- baseline Home remains active throughout

## Persisted async lifecycle

Keep request-stage pipeline state and add an explicitly asynchronous enrichment lifecycle in `space_builds`.

Requested build phases for the active async applet path:

- `queued`
- `applet_analyzing`
- `applet_planning`
- `applet_generating_source`
- `applet_generating_tests`
- `applet_validating`
- `applet_section_ready`
- `applet_promoting`
- `ready`
- `failed`

Persist on each transition:

- `phase`
- `progressMessage`
- `failureCategory`
- `failureStage`
- `userFacingMessage`
- `retryable`
- `configuredTimeoutMs`

Persisted pipeline semantics in `metadata.workspacePipeline` and `runtime_requests.workspacePipeline`:

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

The user-visible pipeline remains request-oriented, while `space_builds` becomes the async enrichment job ledger.

## Async execution mechanism

Implement an in-process queued background enrichment runner inside the bridge service:

- enqueue enrichment after baseline success and before emitting `complete`
- return control to the request lane immediately
- continue async build work via a detached promise
- persist build progress through existing `space_builds`, `space_build_logs`, space metadata, and SSE `space_build_progress`
- treat interrupted builds as failed on restart via existing startup recovery

This is sufficient for the local bridge architecture and is restart-safe enough because the persisted build row already records interrupted non-terminal work as failed during bridge startup.

## Progressive rendering strategy

Use baseline-first rendering with progressive ghost sections:

1. Home baseline markdown/content is visible immediately.
2. While async enrichment is running, reserve richer layout slots in `DynamicSpaceView`.
3. Render skeleton/ghost cards for:
   - summary/header
   - collection area
   - detail/action area
4. Replace ghosts progressively when:
   - compiled Home UI artifacts are present
   - verified applet render tree is promoted
5. If enrichment fails, keep baseline visible and show explicit failed-upgrade UI rather than collapsing the layout.

Implementation approach:

- derive ghost state from `workspacePipeline.applet.status === 'running'`
- optionally use active build phase to vary the message
- keep the baseline markdown/content pane mounted while richer sections are incomplete

## Timeout strategy

Temporary experiment:

- keep the main request lane on existing request/task/baseline timeouts
- raise only async applet source generation timeout to `90_000ms`
- leave structured task/chat timeouts unchanged

Implementation details:

- add a bridge-local async enrichment timeout resolver
- use the higher timeout only from the async applet/enrichment runner
- persist the timeout used in `configuredTimeoutMs`
- document this as a temporary experiment in specs and `AGENTS.md`

## Artifact persistence requirements

Lane A must guarantee persistence of:

- original prompt
- assistant response
- baseline markdown/content
- raw data
- assistant context
- normalized data
- action metadata
- summary/fallback
- session/space metadata

Lane B consumes only those persisted artifacts plus local bridge analysis. It must not depend on the live request text in a way that invites Hermes to redo the task.

## Telemetry changes

Add explicit async-enrichment telemetry for:

- request lane completed with baseline success
- async enrichment queued
- async enrichment started
- async enrichment phase transitions
- async enrichment timeout with timeout budget used
- async enrichment failed while baseline stayed active
- async enrichment promoted successfully

The product should distinguish:

- request success
- baseline success
- enrichment success/failure

and never report enrichment failure as overall request failure when the baseline is ready.

## Test strategy

Unit / bridge:

- request `complete` event fires before async enrichment finishes
- baseline Home workspace is persisted before async enrichment starts
- async enrichment uses persisted artifacts only
- async enrichment timeout uses `90_000ms` while request path does not
- failed async enrichment leaves baseline active and marks applet failed
- retry restarts async enrichment without reframing the original request as failed

Server/integration:

- SSE stream completes while later `space_build_progress` events continue
- async build state is queryable after request completion

Playwright:

- fast baseline / slow enrichment with visible ghost state
- baseline success / async enrichment timeout
- prose baseline-only workspace
- data-rich workspace that upgrades progressively
- prompt-bound applet action after async promotion
- retry async enrichment while baseline stays available
- no live task re-entry during async enrichment fixture path

## Acceptance criteria

1. The browser receives request completion without waiting for richer UI generation.
2. Every successful task still creates or updates a usable baseline Home workspace first.
3. Async enrichment is clearly represented in persisted build state, pipeline state, logs, and UI.
4. Ghost/skeleton rendering appears while async enrichment is in progress.
5. Async enrichment uses persisted artifacts only and does not redo live task work.
6. The 90-second timeout applies only to the async enrichment/applet path.
7. Failed enrichment never breaks the baseline Home workspace.
8. Unit, integration, and E2E coverage prove the new two-lane behavior.
