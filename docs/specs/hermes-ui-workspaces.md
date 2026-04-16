# Hermes Space Data Contract

## Purpose

This document defines the Hermes-to-bridge contract for dynamic spaces.
The preferred contract is a dedicated structured-only response containing one schema-valid JSON object. A `hermes-space-data` start marker followed by the same JSON remains a compatibility fallback when raw JSON cannot be emitted directly.

Hermes must not send executable UI code in the baseline path.
The bridge persists raw artifacts, creates the guaranteed Home baseline locally, and uses the structured seed only to drive optional richer enrichment.

The default enrichment path is separate from the baseline seed contract. Hermes now emits strict template-stage JSON only: tiny template selection objects, template-specific text/content payloads, template-specific actions/button payloads, and template-specific update payloads. The bridge validates, assembles, and compiles those authoring payloads into the persisted `workspace_template_state`.

At the product-surface level, Hermes Home now also exposes a top-level `Spaces` template gallery.
That gallery is intentionally deterministic and local: it previews curated workspace templates and documents how later Hermes flows should choose and populate them.
This is not a permission slip for Hermes to invent arbitrary layouts at runtime.

Template authoring JSON is never treated as direct executable UI. Selection/fill/update generation is artifact-only: it can use only persisted Home artifacts plus local bridge analysis, and it must never rerun the original task, resume live work, or invoke tool-heavy operational flows. The browser renders the compiled template state locally through trusted Chakra-based renderers.

Optional TSX applets may remain as an experimental secondary path, but they are disabled in standard production flows. When the bridge explicitly enables an applet stage for experimental work, Hermes may generate only one TSX module that imports only from `workspace-applet-sdk`, and that path still goes through static analysis and verification before promotion.

Legacy `hermes-ui-workspaces` blocks remain supported only as a compatibility path during rollout.

## High-level flow

1. Hermes answers the user conversationally.
2. The bridge always creates or updates the session-attached Home space with deterministic local baseline content from that answer.
3. For dynamic-capable requests, the bridge runs a dedicated structured-only Hermes step that requests exactly one JSON object and nothing else.
4. Hermes may still emit a compatible `hermes-space-data` marker in the conversational answer or structured-only response, but the bridge no longer relies on that freeform answer as the primary artifact source.
5. The bridge strips any structured region from the visible transcript.
6. The bridge validates and persists the envelope as build artifacts.
7. The bridge derives normalized intent/data, summaries, fallback content, and richer-workspace context locally.
8. Once the assistant answer and baseline Home workspace are persisted, the user-facing request is complete.
9. If a richer workspace is warranted, the bridge continues asynchronously and requests only bounded template-stage JSON artifacts in sequence: selection, text/content, actions/buttons, and later update or switch artifacts.
10. The bridge validates and persists each intermediate template artifact locally, applies deterministic normalization/repair to only the current stage, assembles the final authoring payload, and promotes the richer local renderer state only if validation succeeds.
11. If the optional experimental applet path is explicitly enabled, it remains secondary and must still pass static validation, capability validation, typecheck, generated tests, render smoke, and small-pane smoke before promotion.
12. If no usable richer artifact can be produced, the Home baseline remains usable and the failed upgrade is marked separately.

## Bridge pipeline state

The bridge persists an explicit user-visible pipeline snapshot for every request and attached Home workspace.
That snapshot is separate from low-level build phases and keeps runtime telemetry, persisted state, and UI banners aligned.

Current pipeline stages are:

- `task_running`
- `task_failed`
- `baseline_updating`
- `baseline_ready`
- `baseline_failed`
- `enrichment_generating`
- `enrichment_validating`
- `enrichment_failed`
- `enrichment_ready`

Each `task`, `baseline`, and compatibility `applet` segment can carry:

- `status`
- `stage`
- `message`
- optional `failureCategory`
- optional `diagnostic`
- optional `retryable`
- optional `configuredTimeoutMs`

That lets the product distinguish:

- task failure before the Home baseline updates
- successful task plus baseline failure
- successful task plus successful baseline plus failed enrichment upgrade
- user-configured timeout limits vs runtime/tool timeouts
- template selection/text/actions/update/validation/normalization/repair failures in the primary enrichment path
- manifest/capability/typecheck/test/render failures inside the optional experimental applet path when that path is explicitly enabled

The active Home workspace UI now follows that staged model directly.
Legacy `Markdown` / `Table` / `Cards` mode toggles are no longer exposed in the active Home path; the baseline stays visible until a validated richer local renderer replaces it.
While async enrichment is running, the baseline remains mounted and the UI can show ghost/skeleton richer sections, preview sections, or a failed enrichment card without blocking the main request.

## Template contracts

The richer workspace layer now targets smaller bridge-owned template contracts instead of inventing custom schema shapes per request.

### Stage A: template selection

Hermes returns a tiny approved-template object only:

- `kind: "workspace_template_selection"`
- `schemaVersion`
- `templateId`
- `reason`
- `confidence`
- optional `hints`

### Stage B: template-specific text/content

Once a template is selected, Hermes first returns only the text/content authoring JSON for that template.
Those schemas stay smaller than the final renderer state and carry semantic content only, not renderer-only slot composition or action wiring.

### Stage C: template-specific actions/buttons

After the text/content artifact is persisted, Hermes returns only the action/button authoring JSON for that template.
Those schemas are constrained to links, buttons, prompt actions, save/bookmark affordances, and other allowed action metadata. They must not rewrite the text/content artifact from Stage B.

### Stage D: template-specific update

When an existing template workspace evolves, Hermes returns only template-scoped update operations such as:

- `set_header`
- `set_active_tab`
- `append_note_lines`
- `set_filter_chips`
- `set_scope_tags`
- `upsert_table_rows`
- `upsert_cards`
- `upsert_groups`
- `upsert_timeline_items`
- `set_detail`
- `upsert_board_cards`
- `move_board_card`
- `remove_items`
- `set_status`

### Bridge-owned compilation

The bridge compiles staged selection/text/actions/update artifacts into `workspace_template_state`, applies deterministic repair/defaulting, preserves each intermediate artifact for later inspection, and preserves stable tabs, selections, notes, and transition state where possible.

### Optional experimental source surface

If the optional experimental applet path is enabled, generated source is expected to stay within these SDK families:

- layout primitives such as `Stack`, `Inline`, `Grid`, `Card`, `Heading`, `Text`, `Markdown`, `Tabs`, `Table`, `List`, `DetailPanel`, `Paginator`, `Image`, `Button`, `ButtonGroup`, `Input`, `Select`, `Textarea`, `Divider`, `Callout`, and `SkeletonSection`
- graph hooks such as `useWorkspace`, `useCollection`, `useEntity`, `useSelection`, `usePagination`, `useFilters`, `useFormState`, `useTabState`, and `useAppletState`
- action helpers such as `runPromptAction`, `runPrompt`, `callApprovedApi`, `refreshSpace`, `patchWorkspace`, `updateLocalState`, `openLink`, and `confirmAction`

The intent is that Hermes expresses only approved template choice and template-scoped data, while the bridge owns persistence, normalization, patching, capability rules, and promotion gates.

### Literal-id rules

Static validation now requires literal ids where the bridge must be able to derive safe metadata locally, including:

- collection ids used by `useCollection`, `useSelection`, `usePagination`, `useFilters`, `Table`, `List`, `DetailPanel`, and `Paginator`
- tab ids used by `Tab` and `useTabState`
- action ids used by `runPromptAction`, `refreshSpace`, and approved bridge/API actions
- patch operation names and ids passed to `patchWorkspace`

If template artifacts or optional applet source violate those rules, promotion fails closed and the Home baseline remains active.

## Request contract

When the bridge wants Hermes to seed, refresh, or action-update a space, the prompt includes the relevant combination of:

- active profile id
- active session id
- attached space id and visible metadata when a space already exists
- the original user prompt
- normalized request intent where available
- the current space summary
- raw and normalized space data when relevant
- assistant response context when relevant
- selected items, page state, filter state, and form values for prompt-bound actions
- explicit mutation and output expectations

The bridge also instructs Hermes to:

- keep the normal answer conversational and user-facing
- avoid raw JSON outside structured-only artifact steps
- emit exactly one JSON object and nothing else during structured-only artifact steps
- use one `hermes-space-data` start marker followed immediately by the same JSON object only as a compatibility fallback when raw JSON is impossible
- avoid outbound requests when the action contract forbids them
- keep structured-only artifact steps separate from user-facing conversation when the bridge requests them
- never emit freeform layout structures for template-driven production workspaces

For explicit experimental applet stages, the bridge further instructs Hermes to:

- emit one TSX module only for the source/repair stage
- import only from `workspace-applet-sdk`
- declare every bridge/API capability in the manifest
- never redo the task, check email again, rerun search/discovery, refresh the workspace, fetch more data, or modify external systems
- never use tools, skills, commands, approvals, code execution, or outbound requests
- avoid raw `fetch`, dynamic imports, HTML tags, scripts, iframes, or repo-local imports

## Preferred response contract

Preferred structured-only response:

```json
{ ...valid JSON... }
```

Compatibility fallback:

```text
```hermes-space-data
{ ...valid JSON... }
```

The JSON must conform to `hermes_space_seed/v1`.
The closing fence is optional for compatibility; the bridge parses the first balanced top-level JSON object that follows the start marker and ignores any trailing junk inside the structured region.

For dedicated structured-only artifact calls, Hermes should return only one JSON object. The bridge first attempts to parse that direct JSON response. If Hermes cannot emit raw JSON, the bridge also accepts the compatibility `hermes-space-data` start marker plus one JSON object. Marker-only, empty, missing-marker, unbalanced-JSON, invalid-JSON, and schema-invalid responses are explicit failures instead of silently accepted partial output.

### Envelope shape

```json
{
  "schemaVersion": "hermes_space_seed/v1",
  "space": {
    "spaceId": "space-123",
    "title": "Weekend hotels",
    "subtitle": "Lower Manhattan",
    "description": "Compact comparison view for the attached session.",
    "status": "active"
  },
  "rawData": {
    "kind": "raw_data",
    "schemaVersion": "space_raw_data/v1",
    "payload": {
      "results": []
    },
    "links": [],
    "paginationHints": [],
    "metadata": {}
  },
  "assistantContext": {
    "kind": "assistant_context",
    "schemaVersion": "space_assistant_context/v1",
    "summary": "Found six hotel options near the requested area.",
    "responseLead": "I found several options...",
    "responseTail": "I highlighted the strongest fits in the workspace.",
    "links": [],
    "citations": [],
    "metadata": {}
  },
  "intentHints": {
    "category": "places",
    "label": "Hotel comparison",
    "summary": "Compare hotel options for the requested location.",
    "allowOutboundRequests": true,
    "destructiveIntent": false
  },
  "semanticHints": {
    "primaryDatasetLabel": "Hotels",
    "primaryDatasetPath": "root.results",
    "groupingKeys": ["neighborhood"],
    "notes": ["Favor walkable options first."]
  },
  "actionHints": {
    "allowRefresh": true,
    "suggestedActionLabels": ["Refresh", "Refine selection"]
  }
}
```

### Field guidance

#### `space`

Declares the target workspace identity and visible metadata:

- `spaceId`: optional when updating an existing known space
- `title`: required visible title
- `subtitle`: optional short secondary label
- `description`: optional compact description
- `status`: visible status label for the underlying space row

#### `rawData`

Carries the authoritative first-pass payload that the local builder can safely analyze:

- `payload`: raw returned structured data
- `links`: extracted relevant links
- `paginationHints`: page size / cursor / has-more hints
- `metadata`: provider or source metadata

#### `assistantContext`

Captures the conversational answer context that the browser can show in summaries and notes without reparsing the full transcript:

- `summary`
- `responseLead`
- `responseTail`
- `links`
- `citations`
- `metadata`

#### `intentHints`

Optional hints that help the local builder pick a better compact presentation and safer action defaults:

- `category`
- `label`
- `summary`
- `allowOutboundRequests`
- `destructiveIntent`

#### `semanticHints`

Optional bridge-owned-analysis hints:

- `primaryDatasetLabel`
- `primaryDatasetPath`
- `groupingKeys`
- `preferredTimeField`
- `notes`

#### `actionHints`

Optional action defaults:

- `allowRefresh`
- `suggestedActionLabels`

Any optional hint or extension may be dropped independently if it fails validation.
The required base seed must still parse successfully for the build to continue.

## Bridge behavior

The bridge is strict:

- find the `hermes-space-data` start marker and parse the first balanced top-level JSON payload that follows it
- first attempt to parse a direct structured-only JSON response before falling back to marker parsing
- validate the envelope with Zod
- parse the required base seed first and validate optional hints/extensions separately
- drop invalid optional hints or extensions with telemetry instead of failing the entire build
- strip the structured region from the persisted assistant transcript
- prefer a dedicated structured-only generation step for required-space, retry, repair, and other dynamic-capable flows instead of depending on the conversational answer to carry the artifact
- recover a missing closing fence locally only when a balanced top-level JSON payload can still be extracted and schema-validated
- classify missing-marker, marker-only/empty-payload, missing-JSON, unbalanced-JSON, invalid-JSON, and schema-invalid responses explicitly in telemetry
- attempt at most one bounded structured-only reissue when the first structured-only response did not yield a usable envelope
- persist the raw artifacts under a new `space_builds` version
- derive the analysis IR, compatibility normalized data, summaries, fallback content, and enrichment context locally
- validate template selection locally
- validate template-specific text/actions/update artifacts locally
- apply deterministic alias/default/coercion repair before calling Hermes repair
- assemble valid staged authoring payloads into one final template fill artifact and compile that payload into `workspace_template_state`
- run at most one bounded JSON-only repair pass per failing stage when a text/actions/update artifact is still invalid after local normalization
- optionally validate experimental applet manifest/source/test/render artifacts and declared capabilities
- run the experimental applet verification harness only when that path is explicitly enabled
- promote only the richer artifacts that pass every critical check
- emit `space_build_progress` SSE updates while building
- treat the background enrichment lane as non-blocking relative to the request lane, with the current async-only source timeout experiment defaulting to `90000ms`

If parsing, validation, or tests fail:

- keep the raw data and assistant context
- preserve the useful assistant answer text when the conversational part succeeded
- persist a fallback summary artifact
- create or update a Markdown fallback space when no rich build can be activated
- mark the build failed
- expose a retry path instead of leaving the space blank
- treat each `retry_build` action as a fresh build attempt with its own `space_builds` row, dedicated structured-only artifact step, and bounded reissue budget

Failure classification is explicit and queryable.
Current bridge-side categories include user-configured timeout, runtime timeout, auth scope, upstream tool failure, baseline workspace failure, template selection/text/actions/update failures, stage-specific repair failures, validation failures, normalization failures, unsupported template transitions, and the optional experimental applet manifest/source/capability/compile/test/render failures.

## Prompt-bound action contract

Prompt-bound actions are defined locally in the persisted `action_spec`.
Hermes does not send browser code or bespoke handlers.

When a prompt action runs, the bridge sends Hermes:

- action id and label
- original prompt
- normalized intent
- space summary
- raw data
- normalized data
- selected items
- page state
- filter state
- form values
- assistant context
- allowed mutations
- outbound-request allowance
- expected output contract

Expected outputs are:

- `workspace_template_update`
- `assistant_only`
- `space_delete`

Current behavior:

- `workspace_template_update`: Hermes should return a template-scoped update JSON object and nothing else
- `assistant_only`: Hermes should normally answer without a new structured block
- `space_delete`: Hermes currently uses one legacy `hermes-ui-workspaces` delete block as the compatibility path

## Build-progress events

The bridge emits `space_build_progress` SSE events as the persisted build advances.
These events carry the full `SpaceBuild` payload, including:

- phase
- progress message
- retry count
- timestamps
- error code/message/detail when failed

The browser uses these events to show `Building space…`, phase-aware progress text, and failure states.

## Safety rules

- Never emit executable React, HTML, JavaScript, CSS, or iframe/embed payloads.
- Never ask the browser to evaluate model-authored code.
- Keep payloads structured and schema-valid.
- Use links and metadata, not inline scripts, for navigation or follow-up actions.
- Keep layouts compact and paginated; the builder targets a narrow attached-space pane, not a full-page canvas.

## Legacy compatibility

Older Hermes/runtime flows may still emit `hermes-ui-workspaces`.
The bridge continues to parse those blocks during rollout so existing transcripts, fixtures, and delete flows do not break.

That legacy path is intentionally temporary.
New integrations and prompt contracts should emit `hermes-space-data` instead.
