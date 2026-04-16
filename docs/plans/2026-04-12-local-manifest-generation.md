# Local Manifest Generation Plan

Date: 2026-04-12

## Goal

Remove Hermes-generated workspace applet manifest and plan generation from the active build path. The bridge must synthesize the manifest locally and deterministically from persisted Home workspace artifacts, generated applet source, local source analysis, and bridge policy.

## Files To Change

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-static-validation.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-generated-tests.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/server.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/README.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/hermes-ui-workspaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/AGENTS.md`

## Active Logic To Remove

- Delete the Hermes `plan` stage from the workspace applet CLI contract in `apps/bridge/src/hermes-cli/client.ts`.
- Remove `buildWorkspaceAppletPlanPrompt()` and the manifest/plan request branch from `apps/bridge/src/services/hermes-bridge-service.ts`.
- Remove `extractWorkspaceAppletPlanAndManifest()` as an active production dependency in `apps/bridge/src/services/spaces/workspace-applet-contract.ts`.
- Remove tests that expect Hermes applet generation to call `stage === "plan"`.

## Deterministic Manifest Synthesis

The bridge will synthesize the manifest locally from:

- persisted applet base artifacts from `buildWorkspaceAppletBaseArtifacts(...)`
- baseline Home workspace metadata and content
- generated applet source
- source static analysis
- render-tree analysis after local smoke rendering
- bridge capability and action rules

Manifest synthesis flow:

1. Generate applet source only.
2. Run static TS/TSX analysis on the source.
3. Derive SDK component and hook usage from the AST.
4. Derive action usage from function calls such as `runPromptAction(...)`, `runPrompt(...)`, `callApprovedApi(...)`, `refreshSpace()`, `openLink(...)`, and `confirmAction(...)`.
5. Merge source-derived features with persisted `actionSpec`, normalized datasets, and bridge defaults.
6. Build a deterministic `SpaceAppletManifest`.
7. Build a deterministic `SpaceAppletPlan` locally from the synthesized manifest plus analyzed node/action hints.
8. Generate tests locally from the synthesized manifest.
9. Verify and promote only if validation passes.

## Static Analysis Requirements

Extend source inspection in `workspace-applet-static-validation.ts` to return structured analysis in addition to errors:

- imported module specifiers
- imported SDK symbol names
- hook/helper usage
- component usage
- prompt action ids referenced by `runPromptAction(...)`
- approved capability ids referenced by `callApprovedApi(...)`
- whether `Image`, `Tabs`, `Paginator`, `Input`, `Select`, `Textarea`, `useFilters`, `usePagination`, and `useFormState` are used
- whether `confirmAction(...)` is used
- whether forbidden imports/calls/globals are used

This analysis becomes a required input to manifest synthesis and verification.

## Prompt Simplification

After the Hermes manifest step is removed, the source-generation prompt in `hermes-bridge-service.ts` should shrink to:

- brief artifact-only contract
- compact baseline/task summary
- minimal normalized dataset snapshot
- allowed dataset ids
- allowed action ids and labels
- allowed capability ids and meanings
- SDK-only source contract

The prompt must not include any separate manifest or planning scaffolding.

## Bridge Pipeline Changes

`attemptWorkspaceAppletUpgrade(...)` in `apps/bridge/src/services/hermes-bridge-service.ts` will change to:

1. baseline already exists
2. persist base artifacts
3. generate source via Hermes
4. synthesize manifest locally
5. synthesize plan locally
6. generate tests locally
7. verify
8. promote or fail closed

Telemetry/logging changes:

- keep `SPACE_APPLET_BUILD_STARTED`
- add a local manifest synthesis success/failure event
- distinguish `SPACE_APPLET_SOURCE_FAILED` from `SPACE_APPLET_MANIFEST_FAILED`
- ensure manifest failure is local and deterministic, not a Hermes timeout
- keep baseline Home workspace active on every applet failure

## Test Strategy

Unit and bridge tests:

- assert `generateWorkspaceAppletArtifact()` is never called with `stage: "plan"`
- assert the happy path uses one Hermes applet source call, not a manifest call
- assert manifest synthesis succeeds locally from source and persisted artifacts
- assert unsupported source usage fails local synthesis or verification
- assert retry-build uses persisted artifacts plus local manifest synthesis only
- assert source prompts no longer contain manifest/planning instructions

Integration/server tests:

- applet pipeline still promotes after local manifest synthesis
- baseline remains active when source generation fails
- manifest-related failures are local bridge failures, not Hermes plan failures

Regression test focus:

- tabs/cards/buttons/pagination/images/actions are reflected in the synthesized manifest
- capability ids from `callApprovedApi(...)` are extracted deterministically
- prompt-bound action ids from `runPromptAction(...)` are extracted deterministically
- no reintroduction of Hermes manifest/plan generation

## Acceptance Criteria

1. Hermes is no longer used for workspace applet manifest or plan generation.
2. Manifest synthesis is local and deterministic.
3. Applet generation latency is reduced by removing the Hermes manifest step.
4. Baseline Home workspace remains the primary success path and is unaffected by applet failures.
5. Tests explicitly prove that Hermes is not called for manifest generation.
6. `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass.
7. If feasible, `pnpm test:integration` and `pnpm build` also pass.
