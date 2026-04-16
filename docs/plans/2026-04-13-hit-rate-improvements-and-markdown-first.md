# Hit-Rate Improvements And Markdown-First Plan

Date: 2026-04-13

## Goal

Raise template-workspace generation hit rate by moving Hermes onto:

1. a tiny template-selection schema
2. per-template authoring DSLs
3. bridge-owned normalization and deterministic local repair
4. one bounded repair pass only when local normalization still fails
5. patch-oriented template updates instead of section-by-section rewrites

At the same time, make assistant replies in chat explicitly Markdown-first end to end so transcript rendering preserves headings, lists, tables, code fences, links, emphasis, and block structure.

## Current gap

The current production template path already separates:

1. selection
2. fill
3. update

but Stage B still asks Hermes to author near-render-ready `workspace_template_state` sections directly. That keeps Hermes too close to the final renderer contract, which is the main reliability problem.

The transcript renderer already uses `react-markdown`, but the bridge-side assistant sanitization still collapses content in a paragraph-oriented way that can degrade Markdown structure, especially for fenced blocks and table/list grouping.

## Target flow

### Stage 0: conversational answer

1. Hermes answers the user conversationally.
2. The bridge sanitizes only runtime/technical leakage, while preserving Markdown structure.
3. The chat pane always renders the assistant reply as Markdown-first.
4. The baseline Home workspace is persisted immediately from the conversational answer.

### Stage A: template selection

Hermes returns only a tiny JSON object:

- `templateId`
- `reason`
- `confidence`
- optional `hints`

Rules:

- JSON-only transport
- no prose
- no code fences
- no layout structure
- no mode field; the bridge derives `fill`, `update`, or `switch`

### Stage B: per-template fill

Once a valid template is selected, Hermes returns only the authoring JSON for that template.

Rules:

- schema is specific to the chosen template
- schema contains data and semantic state only
- schema does not contain rendered sections, final workspace graph nodes, or renderer-only fields
- JSON-only transport

### Stage C: per-template patch/update

For follow-up evolution of an existing template workspace, Hermes returns only patch/update JSON for that template.

Rules:

- patch-oriented operations only
- preserve stable tabs, notes, selections, and user state where reasonable
- no full workspace rewrite unless the bridge determines a template switch is required

### Stage D: bridge normalization and compilation

The bridge:

1. validates template selection
2. validates the template-specific authoring JSON
3. applies deterministic local auto-repairs
4. compiles authoring JSON into the strict persisted template workspace state
5. compiles or synthesizes any downstream normalized render data needed by the renderer
6. persists template state, action spec, and update artifacts

### Stage E: bounded repair

If the fill or update payload still fails after local normalization:

1. run exactly one bounded repair pass
2. include only:
   - invalid JSON
   - exact validation/normalization errors
   - narrow relevant contract excerpt
   - instruction to return JSON only
3. revalidate locally
4. if still invalid, fail explicitly

No loops.
No task reruns.
No live tool work.
No outbound operations.

## Template selection schema

Selection moves to a tiny v2 contract:

- `kind: "workspace_template_selection"`
- `schemaVersion: "space_workspace_template_selection/v2"`
- `templateId`
- `reason`
- `confidence`
- optional `hints`

`mode` is removed from model output. The bridge derives:

- `fill` when no current template exists
- `update` when the selected template matches the current template
- `switch` when the selected template differs and a supported transition exists

## Per-template authoring schema strategy

Keep `workspace_template_state` as the bridge-owned strict persisted model rendered by the browser.

Replace the current generic fill contract with a discriminated union keyed by `templateId`, where each variant carries template-specific authoring data only.

Shared approach:

- use small family primitives for repeated domains
- keep each template top-level variant distinct
- avoid renderer-only keys such as section kinds, split-pane shapes, exact chips/actions layout, or final slot composition

Representative authoring DSL families:

- comparison family:
  - price comparison grid
  - vendor evaluation matrix
  - flight comparison
- shortlist family:
  - shopping shortlist
  - hotel shortlist
- queue/list-detail family:
  - inbox triage board
  - restaurant finder
  - local discovery comparison
  - support queue
  - recurring charges workspace
- notebook/tabs family:
  - research notebook
  - travel itinerary planner
  - event planner
  - content / campaign planner
- board/pipeline family:
  - crm pipeline
  - job search pipeline
- rules/review family:
  - inbox rules builder
  - security review board
  - coding workbench
  - subscription audit

The compiler owns the final slot/section composition for every template.

## Patch/update model

Updates move from section replacement toward patch operations over stable template slots and item ids.

Shared patch families:

- `set_header`
- `set_summary`
- `set_active_tab`
- `set_selection`
- `append_note_lines`
- `upsert_rows`
- `remove_rows`
- `upsert_cards`
- `remove_cards`
- `upsert_groups`
- `move_board_card`
- `toggle_checklist_item`
- `set_detail_fields`
- `set_status`
- `template_switch`

The bridge validates which operations are allowed per template and applies them locally against the current persisted template state.

## Normalization and local auto-repair rules

Deterministic local repair should happen before any Hermes repair call.

Required repair behavior:

- drop unrecognized keys
- map common aliases such as:
  - `description -> summary`
  - `items -> rows` or `items -> cards` when the target shape is unambiguous
  - `selectedId -> selectedItemId`
  - `tab -> activeTabId`
- normalize common operation synonyms
- coerce singular object to one-item array when the target field is clearly plural
- coerce safe scalar shapes into strings where required
- fill missing `summary` from assistant context when safe
- fill stable defaults such as active tab, selected item, or empty notes when unambiguous
- preserve existing user-authored notes and stable selected state where the update does not explicitly replace them
- reject only genuinely ambiguous or unsafe inputs

The normalizer should also emit a repair summary for telemetry:

- dropped keys
- alias mappings
- defaulted fields
- normalized operations
- coercions

## JSON-only transport changes

Structured selection/fill/update transport must become JSON-only in the normal production path.

Changes:

- prompts explicitly require one JSON object and nothing else
- extractors treat surrounding prose or fenced blocks as invalid structured output
- repair prompts correct invalid JSON-only responses rather than relying on balanced-JSON extraction from mixed prose

Compatibility handling may remain internal and minimal for already-persisted legacy data, but new structured production calls should not depend on mixed Markdown + JSON transport.

## Markdown-first chat rendering changes

Files:

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/transcript-runtime.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/ChatTranscript.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/ChatTranscript.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/ChatTranscript.markdown.test.tsx`

Changes:

- preserve fenced code blocks as atomic blocks during sanitization
- preserve Markdown tables and list structure
- keep bridge/runtime leakage stripping, but stop flattening valid Markdown structure
- strengthen transcript Markdown styling for:
  - headings
  - ordered/unordered lists
  - tables
  - blockquotes
  - code blocks
  - links
  - inline code

## Files to modify

### Docs

- `/Users/jozefbarton/dev/hermes-boots-codex/AGENTS.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/README.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/hermes-ui-workspaces.md`

### Protocol

- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/workspace-template-schemas.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/api.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/index.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/index.test.ts`

### Bridge

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-registry.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/test/fixtures/hermes-cli-fixture.mjs`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/scripts/live-home-workspace-validation.ts`

Potential new bridge modules if the split stays cleaner:

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-normalizer.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-normalizer.test.ts`

### Web

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/ChatTranscript.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/ChatTranscript.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/e2e/app.spec.ts`

## Template switching strategy

Keep the existing template switching scaffolding, but make it work against the new per-template authoring fill/update model.

Required concrete transition:

- `local-discovery-comparison -> event-planner`

Preserve where possible:

- selected place / venue
- saved places
- operator notes
- direct links
- contact details

If the selected template transition is unsupported, fail explicitly as `unsupported_template_transition`.

## Failure-state strategy

Do not silently fall back to arbitrary richer rendering.

Template-driven spaces must show:

- title: `Workspace generation failed`
- specific category
- concise detail
- retry when allowed

Categories to support explicitly:

- `template_selection_failed`
- `template_fill_failed`
- `template_update_failed`
- `validation_failed`
- `normalization_failed`
- `repair_failed`
- `template_switch_failed`
- `unsupported_template_transition`
- `timeout_runtime`
- `timeout_user_config`

## Timeout strategy

Use explicit per-stage budgets:

- selection: small
- fill: moderate
- update: moderate
- repair: small

Record the stage-specific timeout used in persisted build metadata and telemetry.

## Test strategy

### Protocol / unit

- selection schema v2 validation
- per-template fill schema validation
- patch/update schema validation
- failure category coverage for normalization/repair

### Bridge

- JSON-only structured extractor rejects mixed prose/fence output
- local auto-repair maps aliases and drops unknown keys
- bounded fill repair runs once when normalization fails
- bounded update repair runs once when update normalization fails
- template update preserves stable state
- template switch preserves carried state for local discovery -> event planner
- standard path does not enter runtime TSX generation

### Web

- assistant Markdown renders headings, lists, tables, links, code blocks
- failure state shows `Workspace generation failed` with specific reason
- template success still renders normally
- template update preserves user-visible stable regions

### Integration / e2e

Minimum cases:

1. prose-heavy reply renders as Markdown in chat
2. price comparison workspace success
3. unread email triage workspace success
4. restaurant/local discovery workspace success
5. notebook/job-search representative workspace success
6. explicit workspace generation failed with specific reason
7. update/patch preserves prior state
8. template switch flow or scaffolded transition

### Live Hermes validation

Update the existing overnight suite so it verifies:

- template selection success
- per-template fill success
- update/patch success
- Markdown-rich transcript output remains readable
- failure categories are classified explicitly
- no hidden fallback to arbitrary layout generation

Representative live cases:

1. prose-heavy answer
2. local discovery / restaurant or hotel comparison
3. unread email triage
4. research or job-search long-lived workspace
5. update existing workspace and preserve state
6. template switch if available in the live case

## Acceptance criteria

This pass is complete when:

1. Assistant replies render well as Markdown in the chat pane.
2. Template selection uses a separate tiny schema.
3. Template fill uses per-template authoring schemas rather than rendered-section authoring.
4. The bridge normalizes and auto-repairs common fill/update mistakes locally.
5. One bounded repair pass exists for remaining invalid fill/update payloads.
6. Updates are patch-oriented and preserve state where appropriate.
7. Template-driven spaces either succeed through the template path or clearly show `Workspace generation failed`.
8. Standard production flows do not reintroduce freeform layout generation or runtime TSX generation.
9. Automated tests pass.
10. A documented live Hermes validation path exists and exercises representative templates plus Markdown-first transcript behavior.
