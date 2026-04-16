# 2026-04-12 Workspace SDK Framework

## Goal

Replace the fragile render-tree-first applet contract with a data-first Workspace SDK framework that keeps baseline Home workspaces reliable, makes applet output smaller and more stable, and supports incremental patch-style updates instead of full workspace rewrites.

## Current Problems

- Hermes still has to emit too much exact structure in one shot.
- TSX source currently mixes layout intent, data binding, action wiring, and state assumptions too tightly.
- The bridge persists normalized data and action specs, but it does not yet persist a first-class workspace graph with entities, collections, tabs, view sections, and patch operations.
- Static verification already enforces literal dataset ids, but the rules are tied to a render tree instead of a stable workspace model.
- Subsequent updates still tend toward regeneration instead of explicit state-preserving mutation.

## Target Design

### Core direction

- Keep the baseline Home workspace as the guaranteed success path.
- Add a versioned workspace graph artifact that the bridge owns and persists.
- Make Hermes applets target a smaller declarative SDK surface that binds to stable ids.
- Let the bridge synthesize and apply patch operations to the workspace graph.
- Keep TSX optional for richer rendering, but make it an adapter over the stable graph contract, not the primary storage model.

### Primary file paths

- `packages/protocol/src/schemas.ts`
- `packages/protocol/src/api.ts`
- `packages/protocol/src/index.test.ts`
- `apps/bridge/src/data/bridge-database.ts`
- `apps/bridge/src/services/hermes-bridge-service.ts`
- `apps/bridge/src/services/spaces/home-workspace-compiler.ts`
- `apps/bridge/src/services/spaces/workspace-applet-sdk.ts`
- `apps/bridge/src/services/spaces/workspace-applet-contract.ts`
- `apps/bridge/src/services/spaces/workspace-applet-manifest.ts`
- `apps/bridge/src/services/spaces/workspace-applet-static-validation.ts`
- `apps/bridge/src/services/spaces/workspace-applet-verifier.ts`
- `apps/bridge/src/services/spaces/workspace-applet-types.ts`
- `apps/bridge/src/services/hermes-bridge-service.test.ts`
- `apps/bridge/src/server.test.ts`
- `apps/web/src/hooks/use-app-controller.ts`
- `apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
- `apps/web/e2e/app.spec.ts`
- `README.md`
- `docs/specs/spaces.md`
- `docs/specs/hermes-ui-workspaces.md`
- `AGENTS.md`

## Supported Use Cases

The framework must support these use cases through common abstractions instead of one-off schema changes.

### 1. Store price comparison

- Data shape: products, stores, prices, stock, shipping, links, images.
- UI shape: columns by store, sortable comparison table, card summary, buy/remove actions.
- State: sorting, selected products, hidden stores, pinned items.
- Actions: open buy link, remove item, rerun comparison prompt, save shortlist.
- SDK fit: entities for products/stores, collections for products and offers, tabs for overview/details, patch ops for price refreshes.

### 2. Grocery basket comparison

- Data shape: basket items, substitutes, per-store totals, coupons.
- UI shape: summary stats, list of items, per-store detail panel.
- State: selected basket, include/exclude substitutes.
- Actions: remove item, swap substitute, run prompt to rebalance basket.
- SDK fit: collections plus selection and form state.

### 3. Unread email triage

- Data shape: messages, senders, labels, snippets, timestamps, links.
- UI shape: triage table, detail panel, tabs for inbox/rules/notes.
- State: selection, bulk action state, focused message, filters by sender/label.
- Actions: archive, move, create rule, summarize selected, retry with prompt.
- SDK fit: collection actions with destructive confirmations and patch updates.

### 4. Inbox follow-up queue

- Data shape: follow-up candidates, due dates, thread summaries, contacts.
- UI shape: list plus side detail and notes tab.
- State: follow-up status, assignee note, selected message.
- Actions: draft reply prompt, mark done, append note.
- SDK fit: append-notes and set-status patch ops.

### 5. Restaurant search shortlist

- Data shape: venues, cuisine, price, rating, links, booking links, photos.
- UI shape: image-bearing cards, map/booking links, comparison table.
- State: shortlist selection, filters, pagination.
- Actions: open booking link, rerun prompt for neighborhood, save pick.
- SDK fit: cards, images, lists, filters, pagination.

### 6. Hotel shortlist

- Data shape: hotels, nightly rate, amenities, neighborhood, booking links, photos.
- UI shape: tabbed overview/details/photos, sortable table, cards.
- State: sort order, selected hotel, date note.
- Actions: open booking link, narrow by price, remove rejected options.
- SDK fit: multi-view collection with detail panel and image support.

### 7. Local service provider comparison

- Data shape: provider name, services, hourly rate, contact info, availability.
- UI shape: table plus callout and action buttons.
- State: selected providers and notes.
- Actions: open website, run prompt to draft outreach.
- SDK fit: bridge-safe open-link and prompt actions.

### 8. Travel itinerary planner

- Data shape: flights, lodging, events, notes, links.
- UI shape: tabs by itinerary day, list of segments, notes panel.
- State: active day tab, selected itinerary leg.
- Actions: add note, rerun prompt for alternatives, open booking links.
- SDK fit: tabs, entities, collections, append-notes patches.

### 9. Conference schedule builder

- Data shape: sessions, rooms, times, speakers, bookmarks.
- UI shape: day tabs, bookmarked list, detail panel.
- State: bookmark state and active day.
- Actions: save/remove bookmark, open session link.
- SDK fit: entity upserts and selection patches.

### 10. Research notes workspace

- Data shape: findings, claims, quotes, links, citations, notes.
- UI shape: markdown summary plus list/table of findings.
- State: filters by topic, selected finding, local notes.
- Actions: rerun synthesis prompt, append notes, open citation links.
- SDK fit: markdown + collections + notes patches.

### 11. Market landscape comparison

- Data shape: competitors, pricing, features, risks, links.
- UI shape: comparison table, cards, insight callouts.
- State: sort order, hidden competitors.
- Actions: remove competitor, ask follow-up prompt.
- SDK fit: collection reorder/update plus prompt actions.

### 12. Repo planning workspace

- Data shape: tasks, risks, files, milestones, notes.
- UI shape: tabs for plan/files/risks, checklist list, markdown notes.
- State: current tab, completed tasks, selected file group.
- Actions: refresh plan, mark task done, append notes.
- SDK fit: tabs, collections, local state, patch ops.

### 13. Refactor workbench

- Data shape: modules, risks, sequencing steps, dependencies.
- UI shape: dependency table, detail panel, action buttons.
- State: selected module and progress status.
- Actions: prompt to expand/refine, set status, append note.
- SDK fit: entity status patches and detail panels.

### 14. Threat-hunting workspace

- Data shape: indicators, findings, impacted assets, severity.
- UI shape: tabs by severity or dataset, tables and callouts.
- State: selected finding, filters, pagination.
- Actions: prompt investigation, approved API for local safe lookup, mark false positive.
- SDK fit: approved capability calls with literal ids and confirmations.

### 15. Dependency vulnerability review

- Data shape: packages, versions, advisories, remediation notes.
- UI shape: table, risk badges, markdown summary.
- State: selected package and triage status.
- Actions: prompt remediation plan, set status, append notes.
- SDK fit: status patches and sortable collections.

### 16. Subscription analysis

- Data shape: vendors, monthly cost, annual cost, owner, cancellation links.
- UI shape: spend table, savings stats, cards for high-cost items.
- State: sort by cost, selected subscriptions.
- Actions: open cancellation link, ask prompt for savings scenarios.
- SDK fit: stats, tables, selections, open-link actions.

### 17. Personal finance spending review

- Data shape: merchants, categories, totals, anomalies.
- UI shape: tabs by month/category, tables and callouts.
- State: active tab and selected category.
- Actions: rerun prompt for anomalies, append notes.
- SDK fit: tabs plus entity/collection model.

### 18. Sales shortlist / CRM board

- Data shape: leads, stage, next action, owner, notes.
- UI shape: tabs by stage, list/cards, detail panel.
- State: selected lead, filters, stage counts.
- Actions: move stage, draft outreach prompt, append notes.
- SDK fit: update-collection and set-status patches.

### 19. Support triage board

- Data shape: tickets, priority, tags, assignee, status.
- UI shape: filtered table, stat cards, detail panel.
- State: filters, selected ticket, pagination.
- Actions: assign, close, draft response prompt.
- SDK fit: form state plus prompt/approved actions.

### 20. Incident command workspace

- Data shape: timeline entries, owners, mitigations, status.
- UI shape: timeline list, callouts, notes tab.
- State: active incident tab, selected event.
- Actions: append timeline note, set incident status, rerun summary prompt.
- SDK fit: append-notes and set-status patches.

### 21. Pipeline / operations tracker

- Data shape: jobs, runs, state, retryability, logs.
- UI shape: status table, detail panel, bulk actions.
- State: selected failed runs.
- Actions: retry run via approved capability, filter state.
- SDK fit: approved API capability plus collection selection.

### 22. Multi-tab project workspace

- Data shape: tasks, notes, links, decisions, risks.
- UI shape: tabs for workstreams, mixed markdown/list/table sections.
- State: active tab and local note drafts.
- Actions: append note, create new tab, reorder tab sections.
- SDK fit: create/update tab patches and local form state.

## Common Abstractions

### Workspace

- Stable top-level object with `sdkVersion`, `workspaceId`, `tabs`, `collections`, `entities`, `actions`, `status`, `metadata`, and `localState`.
- Baseline Home remains the user-visible fallback even if no applet graph is ready.

### Entities

- Canonical normalized records keyed by stable `entityId`.
- Typed loosely enough for many domains but constrained enough to persist safely.
- Referenced by collections and view sections.

### Collections

- Ordered lists of entity ids plus display metadata.
- Support sorting, filtering, pagination, selection, and preferred view hints.

### Tabs

- Stable tab ids with label, status, and ordered section ids.
- Allow persistent workbench-style multi-tab workspaces.

### Sections / Views

- Deterministic section descriptors referencing collections/entities/actions by id.
- Support stack, inline, grid, cards, table, list, detail panel, markdown, forms, callouts, and skeleton sections.

### Actions

- Stable action ids referencing either prompt-bound or approved bridge capabilities.
- Selection requirements and confirmation requirements are explicit.

### State

- Persisted state: active tab, collection sort/filter/page state, entity status, notes, section status.
- Local state: transient form drafts or applet-only UI state.

### Patch operations

- Mutate a workspace graph incrementally rather than replacing the whole artifact.

## Proposed SDK Surface

### Versioning

- `sdkVersion: 'workspace_sdk/v1'`
- future compatible via additive fields and explicit feature flags

### Applet authoring exports

- `defineApplet(config)`
- `defineTab(config)`
- `defineCollectionView(config)`
- `defineSection(config)`

### UI primitives

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
- `Table`
- `List`
- `DetailPanel`
- `EmptyState`
- `ErrorState`
- `LoadingState`
- `SkeletonSection`
- `Paginator`
- `Image`
- `Button`
- `ButtonGroup`
- `Input`
- `Select`
- `Textarea`
- `Divider`
- `Callout`

### Hooks/state

- `useWorkspace()`
- `useCollection(collectionId)`
- `useEntity(entityId)`
- `useSelection(collectionId)`
- `usePagination(collectionId)`
- `useFilters(collectionId)`
- `useFormState(formId)`
- `useTabState(tabId)`
- `useAppletState()`

### Actions/capabilities

- `runPromptAction(actionId, payload)`
- `runPrompt(prompt, options)`
- `callApprovedApi(capabilityId, payload)`
- `refreshSpace()`
- `patchWorkspace(ops)`
- `updateLocalState(patch)`
- `openLink(url)`
- `confirmAction(config)`

## Workspace Model

### New protocol artifacts

- `workspace_model`
- `workspace_patch`
- `workspace_program`
- `workspace_view`

### Workspace model shape

- `sdkVersion`
- `workspaceId`
- `title`
- `subtitle`
- `status`
- `metadata`
- `tabs`
- `collections`
- `entities`
- `actions`
- `views`
- `state`

### Entity shape

- `id`
- `kind`
- `title`
- `subtitle`
- `fields`
- `links`
- `image`
- `badges`
- `stats`
- `status`
- `notes`
- `metadata`

### Collection shape

- `id`
- `entityKind`
- `entityIds`
- `preferredView`
- `sort`
- `filters`
- `pageSize`
- `selectionMode`
- `detailEntityId`
- `metadata`

### Tab shape

- `id`
- `label`
- `sectionIds`
- `status`
- `metadata`

### View/section shape

- `id`
- `kind`
- `title`
- `collectionId`
- `entityId`
- `actionIds`
- `fieldBindings`
- `emptyState`
- `loadingState`
- `errorState`
- `metadata`

## Patch / Update Semantics

### Required patch ops

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

### Patch rules

- Every patch op must reference literal ids.
- Patches apply against a persisted workspace model version.
- Bridge merges patch ops locally and then re-derives view-state snapshots.
- Full workspace replacement remains allowed only as a last-resort bridge migration path, not the default update strategy.

## Static Analysis / Verifier Rules

### Allowed imports

- Only `workspace-applet-sdk`
- tests may additionally import `workspace-applet-test-sdk`

### Required literal ids

- collection ids in `useCollection`, `useSelection`, `usePagination`, `useFilters`
- entity ids in `useEntity`
- tab ids in `useTabState`
- action ids in `runPromptAction`
- capability ids in `callApprovedApi`
- patch targets in `patchWorkspace`

### Forbidden behavior

- non-SDK imports
- dynamic imports
- intrinsic HTML elements
- `window`, `document`, `process`, `globalThis`, storage APIs
- `fetch`, `eval`, `Function`, `XMLHttpRequest`, `WebSocket`
- undeclared capabilities
- collection/entity references not present in the workspace model

### Helpful verifier output

- report which hook or component violated the contract
- report the missing literal id and the file location when practical
- distinguish unsupported capability use from missing action bindings

## Deterministic Bridge Responsibilities

- Persist the workspace model artifact and latest applied patch set.
- Synthesize action registry and capability metadata locally.
- Infer manifest metadata from static analysis and the workspace model.
- Apply patches locally after prompt actions or approved capabilities mutate state.
- Keep baseline content and workspace graph aligned, with baseline always usable even if graph/app applet fails.

## Hermes Output Simplification

### Hermes should output

- compact applet source using stable SDK ids
- optional generated tests
- optional patch intent for follow-up updates

### Hermes should not output

- ad hoc manifest JSON
- unstable schema variants
- inferred ids
- raw render-tree payloads as the primary durable artifact

## Migration Strategy

### Phase 1

- Add `workspace_model` and `workspace_patch` schemas/artifacts without removing current baseline or applet artifacts.
- Synthesize an initial model locally from existing normalized data, action spec, summary, and fallback data.

### Phase 2

- Extend the SDK/verifier to target the workspace model.
- Keep existing render tree as a verifier/runtime derivative during migration.

### Phase 3

- Make UI prefer workspace model + section/view descriptors for richer rendering.
- Continue to allow existing promoted applets while new ones target the new model contract.

### Phase 4

- Deprecate direct render-tree-first assumptions once workspace-model-backed rendering is green and covered.

## Test Strategy

### Unit tests

- schema parsing for workspace model, workspace view, and patch ops
- patch application semantics
- entity/collection/tab stability across updates
- manifest synthesis from source + workspace model
- verifier failures for non-literal ids, undeclared capabilities, forbidden imports

### Bridge tests

- baseline-first request still succeeds
- compiler builds an initial workspace model from persisted artifacts
- applet source generation targets stable ids and smaller context
- patch application updates an existing workspace model without full replacement
- action retries preserve workspace identity

### UI tests

- multi-tab workspace rendering
- collection sort/filter/pagination state persistence
- image-bearing cards and tables
- bulk-selection action flows
- degraded applet state with baseline preserved

### E2E tests

- store price comparison
- unread email triage
- restaurant search with book/open-link actions
- coding/repo planning workspace
- degraded applet baseline-preserved workspace

## Acceptance Criteria

1. The framework clearly supports at least 20 realistic workspace use cases.
2. Hermes applet output targets a smaller, stabler SDK surface.
3. The bridge persists a first-class workspace model and patch semantics.
4. Incremental updates work through patches rather than defaulting to full rewrites.
5. Verifier errors align with the SDK contract and are actionable.
6. Baseline Home workspace remains the primary reliable success path.
7. `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass, with `pnpm test:integration` and `pnpm build` run if feasible.
