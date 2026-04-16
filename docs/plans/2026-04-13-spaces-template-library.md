# Spaces Template Library

Date: 2026-04-13

## Goal

Shift Spaces UX from the current runtime-generated workspace emphasis to a curated template-library-first product surface:

1. Reintroduce a top-level `Spaces` nav entry.
2. Make `Spaces` open a template gallery, not a live workspace runtime.
3. Ship a reusable template framework with strong small-pane primitives.
4. Add 20 curated workspace templates with metadata, specs, preview fixtures, and preview rendering.
5. Leave explicit hooks for later Hermes template selection/filling without building freeform runtime layout generation.

## Files To Create

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/types.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-registry.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-categories.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-fixtures.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-specs.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-primitives.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-gallery.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-preview.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-detail-drawer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/pages/SpacesPage.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/pages/SpacesPage.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces-template-library.md`

## Files To Modify

- `/Users/jozefbarton/dev/hermes-boots-codex/AGENTS.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/README.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/hermes-ui-workspaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/index.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/data/bridge-database.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/App.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/App.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/hooks/use-app-controller.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/Sidebar.tsx`

## Product Scope

### New top-level Spaces page

`Spaces` becomes a first-class nav destination that acts as a pattern library and template browser. It does not replace session-attached live spaces in this pass. It gives operators a curated, inspectable gallery that the product can later route Hermes into.

### 20 initial templates

The registry must ship these 20 templates:

1. price-comparison-grid
2. shopping-shortlist
3. inbox-triage-board
4. inbox-rules-builder
5. restaurant-finder
6. hotel-shortlist
7. flight-comparison
8. travel-itinerary-planner
9. research-notebook
10. coding-workbench
11. security-review-board
12. vendor-evaluation-matrix
13. crm-pipeline
14. support-queue
15. subscription-audit
16. recurring-charges-workspace
17. event-planner
18. job-search-pipeline
19. content-campaign-planner
20. local-discovery-comparison

Each template needs metadata, spec text, preview fixture data, a composed preview render, and explicit Hermes population/update instructions.

## Common Framework

### Registry strategy

Create a static web-side registry keyed by template `id`. Each entry includes:

- identity:
  - `id`
  - `name`
  - `category`
  - `useCase`
  - `purpose`
- curation metadata:
  - `goodFor`
  - `supports`
  - `smallPaneNotes`
  - `references`
- future Hermes hooks:
  - `selectionSignals`
  - `idealDataShape`
  - `populationInstructions`
  - `updateRules`
- UI contract:
  - `preferredLayout`
  - `requiredSections`
  - `optionalSections`
  - `requiredActions`
  - `optionalActions`
  - `supportedTabs`
- preview:
  - `fixture`
  - `renderPreview(fixture)`

The registry remains deterministic and local. Hermes integration later can reference it by `id` without asking the model to invent layout structure.

### Shared primitive layer

Build reusable primitives that templates compose instead of each template hand-rolling layout:

- gallery shell:
  - category filter rail
  - template cards
  - supports/good-for chips
  - preview inspector drawer
- content primitives:
  - section header
  - stat strip
  - comparison table
  - grouped list
  - card stack
  - compact media tile
  - detail panel
  - sticky action bar
  - filter strip
  - tab rail
  - inline chips
  - bulk action toolbar
  - split pane
  - note panel
  - activity log
  - confirmation block
  - empty/loading/error blocks

The primitive layer should stay narrow and opinionated so later template refinement happens by improving primitives and template composition, not by introducing runtime layout freedom.

### Renderer composition system

Each template preview exports a small composition function that arranges the shared primitives into a coherent preview. Templates may vary in structure, but they should share:

- dense surface styling
- Hermes Home spacing/radius tokens
- compact action affordances
- stable small-pane behavior
- graceful empty/error/loading states

## Visual Direction

The gallery and templates should feel curated rather than generic:

- preserve Hermes Home’s compact density and reduced radii
- use strong hierarchy with restrained color accents
- emphasize small-pane legibility and fixed internal scroll regions
- prefer purposeful layout differences between template families
- borrow interaction patterns from Gmail, Maps, Booking, Kayak, Notion, Linear, GitHub, Stripe, Trello, Apple Notes, and CRM boards without copying branding or assets

## Implementation Breakdown

### Phase 1: page and state wiring

- add `spaces` back to `AppPageSchema`
- stop coercing persisted `currentPage: 'spaces'` to `chat` in bridge UI-state persistence
- add `Spaces` nav item in the sidebar
- add `SpacesPage` route in the app shell
- add page title handling for `Spaces`

### Phase 2: template types and registry

- define shared template metadata/spec types
- define template categories
- build the registry with all 20 templates
- add preview fixtures and per-template render functions

### Phase 3: gallery UX

- build a gallery page with category filtering, summary cards, “good for”/“supports” chips, and a preview/detail drawer
- make representative previews feel distinct and small-pane friendly
- keep the page useful even before Hermes integration exists

### Phase 4: documentation

- add a dedicated template-library spec doc
- document why each template exists, visual/product references, how Hermes should populate it later, and what update rules should patch vs preserve
- update broader spaces specs and README copy so the product direction is coherent

### Phase 5: tests

- registry completeness and metadata validation
- page/nav rendering
- representative preview rendering
- small-pane sanity
- action/control presence for representative templates
- persistence of `spaces` page selection in UI state

## Testing Plan

### Unit tests

- `packages/protocol/src/index.test.ts`
  - `spaces` is a valid `AppPage`
- `apps/bridge/src/data/bridge-database.test.ts`
  - UI state persists/restores `currentPage: 'spaces'`
- `apps/web/src/ui/pages/SpacesPage.test.tsx`
  - all 20 templates render in the registry/gallery
  - each template has required metadata/spec fields
  - category filtering works
  - preview inspector opens
  - representative template actions/sections appear

### App-shell tests

- `apps/web/src/App.test.tsx`
  - top-level `Spaces` nav entry exists
  - opening `Spaces` shows the gallery page
  - the old regression asserting Spaces removal is replaced with gallery assertions
  - page header renders `Spaces`

### Small-pane sanity

- render representative templates inside a narrow preview container and assert core sections remain visible:
  - inbox-triage-board
  - price-comparison-grid
  - restaurant-finder
  - coding-workbench
  - subscription-audit

## Acceptance Criteria

This pass is complete when all of the following are true:

1. A new top-level `Spaces` nav section exists.
2. Opening `Spaces` shows a template gallery page rather than a runtime-generated workspace.
3. A shared template framework and primitive layer powers all template previews.
4. All 20 templates exist in a deterministic registry with detailed metadata and explicit Hermes population/update instructions.
5. Representative templates render as distinct, polished small-pane previews.
6. README/spec/AGENTS documentation reflects the new template-library-first direction.
7. `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass locally.
8. If feasible, `pnpm test:integration` and `pnpm build` also pass locally.

## Explicit Non-Goals

- no Hermes freeform layout generation
- no attempt to fully enforce Hermes template selection in runtime requests yet
- no reintroduction of applet-style runtime UI generation
- no removal of session-attached live spaces unless required for page wiring or test cleanup
