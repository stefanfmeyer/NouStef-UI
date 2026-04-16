# Home Workspace Compiler Rearchitecture

Date: 2026-04-12

## Goal

Correct the Hermes Home workspace architecture so:

- every request still produces a usable Home workspace
- Hermes no longer owns final app-specific workspace schemas
- schema-invalid optional extras no longer poison an otherwise usable build
- the bridge locally analyzes raw data and compiles a composable UI grammar
- the browser renders that grammar safely through Chakra components

## Root cause

Two failures are coupled:

1. Hermes is still asked to emit large app-specific envelopes, including `normalizedData`, and those payloads are failing in real production with:
   - empty/marker-only payloads
   - missing required normalized fields
   - invalid field shapes
   - obsolete dataset shapes
   - schema-invalid `normalizedData.notes[]`

2. The local builder still compiles through preset-oriented assumptions:
   - `preferredPresentation`
   - `stack` / `stack_with_detail`
   - `collection` + `detail` destination patterns
   - `table` / `cards` / `list` as the main product model

That makes Hermes responsible for too much schema shape and makes the bridge compiler too rigid.

## Target architecture

### 1. Minimal Hermes artifact contract

Production/default path:

- Hermes emits a minimal `hermes_space_seed/v1` artifact
- required fields only:
  - `schemaVersion`
  - `space`
  - `rawData`
  - `assistantContext`
  - optional `intentHints`
  - optional `semanticHints`
  - optional `actionHints`
  - optional `extensions`

Hermes should not be responsible for:

- `normalizedData`
- final UI schema
- final action schema
- final test schema
- fixed layout/presentation presets

### 2. Base-first parsing with non-fatal optional extensions

Parsing rules:

- parse raw JSON first
- validate the minimal base artifact independently
- validate optional extensions separately with `safeParse`
- keep valid base data even if optional extensions fail
- record telemetry for dropped optional extensions
- only fail if the required base artifact itself is unusable

Compatibility:

- keep parsing legacy `hermes_space_data/v1`
- adapt valid v1 envelopes into the new minimal seed internally
- treat v1 `normalizedData` as a non-fatal optional extension, not as a build-critical contract

### 3. Local analysis IR

Introduce a bridge-owned intermediate representation:

- `space_analysis/v1`

Responsibilities:

- infer datasets from `rawData.payload`
- infer nested collections and object graphs
- classify scalar / object / array fields
- infer display labels and candidate identifiers
- infer links, emails, and action-like fields
- infer summary stats and record counts
- infer candidate grouping and sorting keys
- infer likely detail targets and timeline-like datasets
- preserve semantic hints from Hermes only as hints

This IR becomes the source of truth for compilation, replacing the current Hermes-heavy `normalizedData` dependency.

### 4. Composable UI grammar

Introduce a new local UI grammar:

- `space_ui/v2`

Composable primitives:

- `section_group`
- `tab_group`
- `markdown_block`
- `stat_grid`
- `property_sheet`
- `collection`
- `grouped_collection`
- `detail_sheet`
- `timeline`
- `action_bar`
- `filter_bar`
- `paginator`
- `empty_state`
- `error_state`

The anti-pattern to remove is fixed destination presets, not a constrained allowlist.

Compatibility:

- keep `space_ui/v1` readable for existing persisted spaces
- new production builds compile to `space_ui/v2`

### 5. Home baseline remains primary

Request lifecycle:

1. Hermes returns the user-facing answer
2. bridge updates the Home baseline immediately
3. if a structured seed exists, bridge analyzes and compiles locally
4. if that richer build fails, baseline remains visible and usable

Markdown-only responses remain a first-class success state.

## Files to change

### Protocol

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.ts`
- `packages/protocol/src/space-helpers.ts`
- `packages/protocol/src/index.test.ts`

Expected changes:

- add `HermesSpaceSeed`-oriented schema support on the bridge side via protocol artifacts
- add `SpaceAnalysisSchema`
- add `SpaceUiSpecV2Schema` and recursive UI node schemas
- widen `SpaceUiSpecSchema` to support `v1 | v2`
- extend `SpaceArtifactKindSchema` with `analysis`
- update `SpaceDynamicStateSchema` to expose `analysis`
- keep existing `normalized_data` and `space_ui/v1` support for compatibility

### Bridge parsing / build pipeline

- `apps/bridge/src/services/spaces/dynamic-space-contract.ts`
- `apps/bridge/src/services/spaces/dynamic-space-builder.ts`
- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/hermes-cli/client.ts`
- `apps/bridge/src/data/bridge-database.ts`

Expected changes:

- replace current large-envelope assumption with minimal seed parsing
- parse optional legacy/rich extensions independently and non-fatally
- add extension-drop diagnostics / telemetry
- build `analysis` locally from `rawData` + `assistantContext` + prompt intent
- compile `analysis` into `space_ui/v2`
- adapt test harness to validate both `v1` and `v2`, with `v2` as the new default
- persist `analysis` artifact
- hydrate `space.dynamic.analysis`
- adjust structured-only prompt so Hermes is explicitly told not to emit `normalizedData` / UI schema

### Web renderer

- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- related tests under `apps/web/src/ui/organisms`

Expected changes:

- branch on `space_ui/v1` vs `space_ui/v2`
- add safe recursive rendering for `space_ui/v2`
- keep baseline markdown visible during build failures
- ensure small-pane-safe internal scrolling continues to hold

### Docs

- `AGENTS.md`
- `README.md`
- `docs/specs/spaces.md`
- `docs/specs/hermes-ui-workspaces.md`

## Persistence and migration strategy

- no destructive migration of existing rows
- existing persisted `raw_data`, `normalized_data`, `ui_spec`, `fallback`, and `summary` artifacts remain readable
- new builds will additionally persist:
  - `analysis`
  - `space_ui/v2`
- `bridge-database` hydration should:
  - prefer `analysis` if present
  - accept old `normalized_data` and `space_ui/v1`
  - keep old spaces renderable without rebuild
- no database table shape change is required if current artifact table already stores flexible `artifact_kind` + JSON payload
- schema enums and hydration logic do need updates

## Compiler design

### Phase A: seed parsing

Input:

- minimal Hermes seed
- optional legacy/rich extras

Output:

- base seed
- optional parsed extensions
- diagnostics for any dropped extensions

### Phase B: analysis

Input:

- seed `rawData`
- `assistantContext`
- request prompt
- current Home space context

Output:

- `SpaceAnalysis`

Implementation detail:

- analyze arrays of records, scalar objects, and nested objects recursively
- produce multiple datasets instead of one primary preset dataset
- preserve parent-child relationships by dataset id and path
- infer primary display fields locally

### Phase C: compilation

Input:

- `SpaceAnalysis`
- `assistantContext`
- prompt intent
- current space context

Output:

- `SpaceSummary`
- `SpaceFallbackState`
- `SpaceActionSpec`
- `SpaceUiSpecV2`
- `SpaceTestSpec`

Compilation rules:

- prose-first / empty-data -> `markdown_block` first
- collections -> `collection` plus optional `filter_bar`, `action_bar`, `paginator`
- object/detail datasets -> `property_sheet` or `detail_sheet`
- grouped records -> `grouped_collection`
- time-ordered records -> `timeline`
- mixed content -> `section_group` or `tab_group`

### Phase D: harness

- keep schema validation
- validate `space_ui/v2`
- validate collection pagination and link validity
- validate node ids and recursive tree shape
- validate action resolution
- validate destructive confirmations
- keep compact-pane constraints explicit

## Rollout order

1. Add protocol support for `analysis` and `space_ui/v2`, keeping `v1` compatibility.
2. Refactor artifact parsing so base seed parsing is independent from optional extension parsing.
3. Add tests for the latest real failure class: invalid optional `normalizedData` no longer failing the build.
4. Replace builder internals with:
   - base seed -> analysis
   - analysis -> `space_ui/v2`
5. Update bridge persistence/hydration to persist and expose `analysis`.
6. Update web renderer to render `space_ui/v2`, keeping `v1` compatibility.
7. Update docs and verification.

## Test strategy

### Protocol tests

- `packages/protocol/src/index.test.ts`

Add coverage for:

- `SpaceAnalysisSchema`
- `space_ui/v2`
- `SpaceDynamicState` with `analysis`
- `SpaceArtifactKindSchema` including `analysis`

### Bridge parser tests

- `apps/bridge/src/services/spaces/dynamic-space-builder.test.ts`
- possibly a new parser-focused test block in `dynamic-space-contract.ts`

Add coverage for:

- minimal base seed parses successfully
- invalid optional `normalizedData` is dropped, not fatal
- invalid optional `uiSpec`-like extension is dropped, not fatal
- latest real failure class: object in `normalizedData.notes[0]` no longer kills build if base seed is valid

### Builder/compiler tests

- `apps/bridge/src/services/spaces/dynamic-space-builder.test.ts`

Add coverage for:

- prose-only response -> markdown-first Home mode
- raw structured collection -> `collection`-based `space_ui/v2`
- nested data -> multiple datasets and composable sections
- grouped data -> `grouped_collection`
- object/detail data -> `property_sheet` / `detail_sheet`
- compiler avoids relying on Hermes `preferredPresentation` presets

### Bridge workflow tests

- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/server.test.ts`

Add coverage for:

- every request still creates/updates Home baseline
- invalid optional extensions do not fail otherwise usable builds
- retry builds still create distinct build rows
- retry failure still preserves baseline usability
- rich v2 build activation still passes through harness gating

### Web tests

- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
- `apps/web/src/App.test.tsx`

Add coverage for:

- `space_ui/v2` rendering
- prose-only Home markdown remains visible
- failed enrichment still shows baseline and failure state
- existing `space_ui/v1` compatibility still renders

## Acceptance criteria

This rearchitecture is complete when:

1. A valid base artifact still builds when optional normalized/UI-style sections are invalid.
2. Hermes is no longer responsible for the final app-specific workspace schema.
3. The bridge performs local data analysis and local UI compilation.
4. The main UI model is a composable primitive grammar, not a few preset destination layouts.
5. Every request still produces a usable Home workspace.
6. Prose-only responses render as Markdown Home spaces.
7. Existing persisted/legacy workspaces remain readable.
8. `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass.
9. `pnpm build` passes if feasible within the iteration budget.
