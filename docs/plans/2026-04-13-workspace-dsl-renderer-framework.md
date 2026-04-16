## Workspace DSL + Local Renderer Framework Plan

Date: 2026-04-13

### Goal

Replace runtime TSX applet generation as the default rich-workspace enrichment path with a declarative Workspace DSL produced by Hermes, normalized and patched locally by the bridge, and rendered deterministically in the browser.

### Existing code to reuse

Relevant files:
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-model.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`

Salvage:
- Baseline Home workspace creation and persistence flow.
- Structured-only Hermes seed generation.
- Local raw-data analysis and normalization in `home-workspace-compiler.ts`.
- Stable workspace graph and patch synthesis in `workspace-model.ts`.
- Existing space actions and bridge-side action execution.
- Existing telemetry and pipeline status persistence.
- Existing narrow-pane rendering patterns in `DynamicSpaceView.tsx`.
- Existing Chakra node rendering patterns from `WorkspaceAppletRenderer.tsx`.

Demote or remove from default production path:
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-sdk.ts`
- TSX source generation prompts in `hermes-bridge-service.ts`
- Applet manifest/test/render verification as the default rich-workspace promotion gate

The TSX path, if retained, becomes explicitly experimental and secondary.

### 22 concrete use cases

1. Store price comparison
Data shape: products, stores, prices, delivery notes, image URLs, buy links.
State: sort by price or store, selected product, hidden rows.
Actions: buy link, remove candidate, ask follow-up comparison.
Views: comparison grid, table, detail panel, notes tab.
DSL fit: collections, comparison sections, media cards, row actions, patches.

2. Grocery basket comparison
Data shape: basket items, store totals, substitutions, stock flags.
State: selected basket, grouped rows, filters.
Actions: remove item, refresh totals, prompt substitution check.
Views: grouped collection, stats, detail panel.
DSL fit: grouped collections, stat grid, prompt actions, status patches.

3. Unread email triage
Data shape: message entities with sender, subject, labels, timestamps.
State: bulk selection, current sender filter, active tab.
Actions: archive, move, draft rule, summarize thread.
Views: list/table, sender groups, bulk action bar, detail panel.
DSL fit: collections, selection state, bulk actions, confirmation rules.

4. Inbox follow-up planner
Data shape: threads, urgency tags, follow-up dates, draft notes.
State: selected thread, tab state, appended notes.
Actions: draft reply prompt, snooze suggestion, move category.
Views: board or grouped collection, notes section, detail panel.
DSL fit: pipeline-style sections, notes patches, action state.

5. Restaurant shortlist
Data shape: restaurant rows with cuisine, rating, distance, price, links, images.
State: sort/filter, selected result, comparison subset.
Actions: open booking link, prompt booking attempt, remove result.
Views: cards, comparison strip, detail panel, links section.
DSL fit: media sections, collection actions, link actions.

6. Hotel shortlist
Data shape: hotels, nightly rate, amenities, refundability, booking links.
State: pagination, filters, selected hotel, saved notes.
Actions: open booking, refine by amenities, add note.
Views: table/cards, detail, notes tab.
DSL fit: collection views, prompt actions, append-notes patches.

7. Flight comparison
Data shape: itineraries with carrier, price, duration, stops, links.
State: sort by price/duration, selected itinerary.
Actions: open link, prompt “compare tradeoffs”, remove itinerary.
Views: comparison view, table, detail.
DSL fit: comparison sections and stable selection state.

8. Travel itinerary planner
Data shape: days, events, bookings, maps, notes.
State: active tab by day, reordered items, note state.
Actions: add stop, re-sequence, open booking links.
Views: timeline, tabs, markdown notes, detail.
DSL fit: tabs, timeline sections, reorder patches.

9. Event planning workspace
Data shape: venues, guests, budgets, tasks, notes.
State: task filters, selected venue, form state.
Actions: add note, prompt budget summary, open links.
Views: split or tabbed workspace, forms, cards, stats.
DSL fit: forms, stat grids, tabs, local state.

10. Job search pipeline
Data shape: roles, companies, stages, links, recruiter notes.
State: board lane ordering, selected role, filters.
Actions: move stage, open application, append note.
Views: board/pipeline, detail panel, notes.
DSL fit: board sections, action state, patch-based moves.

11. CRM lead tracker
Data shape: leads, owners, stages, contact links, notes.
State: board state, selection, tab state.
Actions: advance stage, draft outreach prompt, external link.
Views: board, detail, notes tab.
DSL fit: stable ids, row actions, board lanes.

12. Support triage queue
Data shape: tickets, priority, assignee, status, SLA.
State: filters, selection, sorting.
Actions: summarize ticket, change status, open external link.
Views: table, grouped collection, detail.
DSL fit: collection grammar, set-status patches.

13. Incident response board
Data shape: findings, services, severities, owners, timeline events.
State: active tab, selected incident, notes.
Actions: escalate prompt, append update, change action state.
Views: board, timeline, callouts, markdown updates.
DSL fit: timeline and board nodes, notes patches.

14. Security threat-hunting findings
Data shape: indicators, hosts, evidence, severity, links.
State: filters, selection, comparison subset.
Actions: investigate prompt, mark false positive, open link.
Views: grouped collection, detail, evidence markdown.
DSL fit: grouped collections, detail panels, destructive confirmations.

15. Dependency/security review
Data shape: packages, versions, CVEs, fix status, links.
State: sort/filter, selected package.
Actions: prompt remediation plan, open advisory, remove ignored package.
Views: table, callouts, detail.
DSL fit: table sections, callouts, link actions.

16. Repo refactor workbench
Data shape: tasks, files, risks, notes, links.
State: active tab, selected task, appended notes.
Actions: ask follow-up prompt, mark task status, append notes.
Views: tabs, markdown, list, detail panel.
DSL fit: tabs, notes patches, set-status operations.

17. Coding feature planning workspace
Data shape: milestones, tasks, acceptance criteria, code references.
State: selected milestone, tab state, filters.
Actions: prompt breakdown, open link, update action state.
Views: board/list, markdown sections, detail.
DSL fit: multi-view collections, prompt actions, stateful tabs.

18. Research notebook
Data shape: sources, findings, quotes, notes, links.
State: active note tab, selected source, appended notes.
Actions: summarize source, open link, append note.
Views: markdown document, list, detail, tabs.
DSL fit: documents, lists, notes patches, tabs.

19. Market landscape comparison
Data shape: companies, categories, metrics, links, notes.
State: comparison subset, sorting, filters.
Actions: compare via prompt, open company, remove candidate.
Views: comparison, table, detail.
DSL fit: comparison and collection grammar.

20. Subscription audit
Data shape: subscriptions, spend, renewal dates, cancellation links.
State: selected subscriptions, bulk selection, sorting.
Actions: bulk review prompt, open cancel link, mark keep/remove.
Views: table, stats, bulk action bar.
DSL fit: bulk actions, stat grid, set-selection patches.

21. Recurring charge investigation
Data shape: charges, merchants, dates, notes, links.
State: filtered merchant view, selection.
Actions: summarize, open merchant, append note.
Views: grouped collection, detail, notes.
DSL fit: grouped collection and notes sections.

22. Multi-tab project workspace
Data shape: mixed entities across results, notes, links, tasks.
State: persistent tab selection, per-tab filters and forms.
Actions: prompt actions, direct approved APIs, append notes.
Views: tabs, split view, markdown, collection, forms.
DSL fit: tabs + per-collection state + action registry.

### Common abstractions

Canonical abstractions:
- workspace
- entities
- collections
- views
- sections
- tabs
- actions
- persisted state
- local state
- patches
- semantic hints

Rules:
- Entities are stable domain records keyed by id.
- Collections reference ordered entity ids and collection-specific state.
- Views reference section ids and define layout.
- Tabs reference view ids and preserve stable navigation identity.
- Actions are declarative and validated by the bridge.
- Patches mutate stable workspace state incrementally.
- Baseline artifacts remain the source of truth for task results.

### DSL proposal

Canonical transport: JSON.

New schema family:
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`

Primary DSL document:
- `workspace_dsl`
- `schemaVersion: "space_workspace_dsl/v1"`
- `sdkVersion: "workspace_sdk/v1"`

Shape:
- `workspace`
  - `id`
  - `title`
  - `subtitle`
  - `description`
  - `status`
  - `primaryTabId`
  - `metadata`
- `entities`
- `collections`
- `views`
- `sections`
- `tabs`
- `actions`
- `state`
- `operations`
- `semanticHints`

Design intent:
- Hermes may emit a full DSL document or a lighter enrichment document that the bridge normalizes into a full workspace model and patch.
- Bridge-generated baseline model remains valid even if Hermes emits no DSL.
- Incremental updates are represented as explicit operations against stable ids.

### View grammar

Section and view grammar should support:
- document/markdown
- stat_grid
- collection
- grouped_collection
- comparison
- detail_panel
- timeline
- form
- actions
- callout
- media
- split
- board
- empty_state
- error_state
- loading_state
- skeleton

Layout grammar:
- `stack`
- `grid`
- `split`
- `board`
- `tabbed`

Renderer rules:
- Narrow-pane safe by default.
- Stable ids required for tabs, sections, collections, entities, actions.
- Optional extensions can be dropped during normalization without invalidating the whole workspace.

### Action system

Action kinds:
- prompt-bound
- approved direct capability/api
- external_link
- refresh
- bridge-local mutation
- destructive with confirmation

Scopes:
- row
- bulk
- collection
- tab
- workspace

Execution model:
- Hermes declares action metadata and bindings.
- Bridge validates action ids, capability ids, destructive confirmations, and selection requirements.
- Browser invokes only bridge-validated actions.

### Patch / update model

Required first-class operations:
- `upsert_entities`
- `remove_entities`
- `update_collection`
- `reorder_collection`
- `create_tab`
- `update_tab`
- `remove_tab`
- `replace_view`
- `replace_section`
- `set_selection`
- `append_notes`
- `set_status`
- `set_action_state`

Additional useful operations for the DSL path:
- `remove_view`
- `remove_section`
- `replace_actions`
- `update_workspace_metadata`
- `set_active_tab`
- `set_collection_filters`
- `set_collection_sort`

Patch semantics:
- Prefer patching an existing model over replacing the whole workspace.
- Full replacement remains allowed only when normalization proves patching unsafe.
- Bridge computes and persists the normalized patch even when Hermes emits a full DSL document.

### Bridge execution model

Lane 1: synchronous baseline
- Hermes completes the user task.
- Bridge requests minimal workspace seed only.
- Bridge derives normalized data, action spec, workspace model, workspace patch, fallback state locally.
- Bridge persists a `compiled_home` build and promotes it immediately.
- User receives the chat response and a usable Home workspace immediately.

Lane 2: asynchronous enrichment
- Queue after baseline success.
- Input only from persisted artifacts and local bridge context.
- Hermes emits a declarative `workspace_dsl` JSON artifact, not TSX.
- Bridge validates DSL, normalizes it, merges it with the current workspace model, synthesizes a patch, persists artifacts, and promotes the richer model.
- Failures keep the baseline model active.

Experimental lane
- Existing TSX applet path may remain behind explicit experimental gating.
- It is not the default production path.

### Normalization and validation

New bridge helpers:
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-dsl-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-dsl-normalizer.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-dsl-render-tree.ts`

Responsibilities:
- Parse raw JSON or fenced DSL output.
- Validate schema and stable identifiers.
- Drop invalid optional nodes or extensions.
- Map DSL sections/views/actions into normalized `workspace_model`.
- Synthesize `workspace_patch`.
- Fail closed if unsupported capabilities or invalid ids are requested.

### Renderer model

New primary renderer:
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceDslRenderer.tsx`

Rendering strategy:
- Render normalized `workspace_model` as the canonical UI.
- Use Chakra primitives locally and deterministically.
- Reuse presentational patterns from `DynamicSpaceView.tsx` and `WorkspaceAppletRenderer.tsx`.
- Preserve baseline markdown block as a first-class document section.
- Support skeleton sections while async enrichment is running.
- Support failed section states without collapsing the whole workspace.

### Migration strategy

1. Keep baseline Home workspace creation intact.
2. Promote compiled baseline builds immediately into `dynamic_v1` using normalized workspace models.
3. Introduce `workspace_dsl` as the new primary async enrichment artifact.
4. Make `DynamicSpaceView.tsx` prefer normalized `workspace_model` rendering over applet rendering.
5. Stop queueing TSX applet builds by default in `hermes-bridge-service.ts`.
6. Retain existing applet artifacts only for backward compatibility or experimental use.
7. Update docs and AGENTS ledger to reflect DSL-first architecture.

### File change plan

Protocol:
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/api.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/index.test.ts`

Bridge:
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-model.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-dsl-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-dsl-normalizer.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/server.test.ts`

Web:
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceDslRenderer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/hooks/use-app-controller.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/e2e/app.spec.ts`

Docs:
- `/Users/jozefbarton/dev/hermes-boots-codex/README.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/hermes-ui-workspaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/AGENTS.md`

### Test strategy

Unit tests:
- DSL schema validation accepts valid collection/tab/action/section documents.
- DSL schema validation rejects invalid ids, missing required fields, or unsupported section kinds.
- Normalizer merges DSL into a baseline `workspace_model` deterministically.
- Patch synthesis updates existing workspaces without full rewrite.
- Invalid optional DSL extensions are dropped with warnings.
- Action validation rejects unsupported direct capability or destructive action mistakes.
- TSX applet generation is not invoked by the default enrichment lane.

Bridge tests:
- Structured request creates a baseline `compiled_home` model immediately.
- Async enrichment requests DSL JSON, not TSX source.
- Baseline remains active if DSL generation fails.
- Retry reruns DSL enrichment, not live task work.
- Existing Home workspace is updated by patches across repeated requests.

Renderer tests:
- `WorkspaceDslRenderer.tsx` renders document, stat grid, collections, detail panels, forms, skeleton sections, timelines, boards, and comparison views.
- Small-pane rendering remains usable for shopping, inbox, restaurant, and coding workspaces.

Integration / e2e:
- prose-only Home workspace
- store price comparison
- unread email triage
- restaurant/hotel shortlist
- coding/repo planning workspace
- degraded DSL generation with baseline preserved

### Acceptance criteria

1. The primary rich-workspace path is declarative DSL plus local renderer.
2. Runtime TSX applet generation is no longer the default production enrichment path.
3. The framework clearly supports at least 20 realistic use cases.
4. Workspace updates are patch-friendly and state-preserving.
5. Baseline Home workspaces remain reliable and primary.
6. `pnpm lint` passes.
7. `pnpm typecheck` passes.
8. `pnpm test` passes.
9. If feasible, `pnpm test:integration` and `pnpm build` pass.
