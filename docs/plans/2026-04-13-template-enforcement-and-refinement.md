# Template Enforcement And Refinement Plan

Date: 2026-04-13

## Goal

Move production Spaces enrichment from generic authoring DSL generation to a strict template-only contract while refining the gallery/templates and making template generation failures explicit.

This pass must deliver:

1. product-feedback template refinements
2. readable gallery filter/tag colors in light and dark mode
3. template-only production workspace generation
4. template switching scaffolding plus one concrete flow
5. explicit `Workspace generation failed` UI with specific reason categories

## Current state and gap

Current production enrichment still works like:

1. build baseline Home artifacts locally
2. ask Hermes for generic `workspace_dsl`
3. normalize that DSL into `workspace_model`
4. render the generic local graph through `WorkspaceDslRenderer`

That is better than runtime TSX, but it still allows Hermes to invent arbitrary section structure. The top-level `Spaces` gallery already exists and the 20 curated templates already exist as web-side metadata/spec/preview state, but live attached spaces do not yet use the template system as the generation contract.

## Target architecture

### Production rule

For template-driven production spaces, Hermes may only:

1. select a `templateId` from the approved registry
2. fill the template-specific schema for that template
3. update it through template-scoped operations only

Hermes may not emit arbitrary layout structure for template-driven production spaces.

### Data flow

1. Hermes still answers the user conversationally for chat.
2. The bridge still persists the baseline Home/chat artifacts.
3. Optional richer workspace generation becomes:
   - template selection artifact
   - template fill artifact
   - local template compiler
   - local `workspace_model` compilation
4. The browser still renders only from trusted local state, but the compiled graph must now come from a template compiler instead of generic Hermes-authored layout.
5. If selection/fill/update/switch fails, render `Workspace generation failed` with a specific reason and do not silently fall back to arbitrary richer rendering.

### Template switching

The bridge should persist enough template-state metadata to allow:

- current `templateId`
- previous template ids / transition history
- shared state that survives template switches where safe
- allowed transitions
- migration rules for supported template pairs

Concrete first flow:

- `local-discovery-comparison` -> `event-planner`

Preserve when possible:

- selected venue
- saved places
- notes
- links / contact data

## Files to create

- `/Users/jozefbarton/dev/hermes-boots-codex/docs/plans/2026-04-13-template-enforcement-and-refinement.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-contract.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-compiler.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-compiler.test.ts`

Potentially, if the implementation is cleaner with dedicated modules:

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/spaces/workspace-template-switching.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceGenerationFailedState.tsx`

## Files to modify

### Docs

- `/Users/jozefbarton/dev/hermes-boots-codex/AGENTS.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/README.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/hermes-ui-workspaces.md`
- `/Users/jozefbarton/dev/hermes-boots-codex/docs/specs/spaces-template-library.md`

### Protocol

- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/schemas.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/api.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/packages/protocol/src/index.test.ts`

### Bridge

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/hermes-cli/client.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/services/hermes-bridge-service.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/server.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/src/database.test.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/bridge/test/fixtures/hermes-cli-fixture.mjs`

### Web template library

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/types.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-specs.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-fixtures.ts`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-primitives.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-gallery.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-preview.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-detail-drawer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/features/spaces-templates/template-registry.ts`

### Web runtime rendering and tests

- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/DynamicSpaceView.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/organisms/WorkspaceDslRenderer.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/pages/SpacesPage.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/ui/pages/SpacesPage.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/src/App.test.tsx`
- `/Users/jozefbarton/dev/hermes-boots-codex/apps/web/e2e/app.spec.ts`

## Enforcement model

### Shared registry and ids

Add a protocol-level template id enum and use it as the source of truth for:

- bridge validation
- runtime selection artifacts
- runtime fill artifacts
- runtime update artifacts
- web gallery registry ids

### New artifacts

Add protocol artifacts for:

- `workspace_template_selection`
- `workspace_template_fill`
- `workspace_template_update`

Optional persisted runtime state:

- current template id
- shared/preserved workspace state
- transition metadata

### Selection contract

Hermes selection output should include only:

- `templateId`
- concise reason
- optionally matched signals / intent summary

Bridge behavior:

- reject unknown template ids
- reject malformed selection payloads
- classify selection failures as `template_selection_failed` or `validation_failed`

### Fill contract

Use a discriminated union keyed by `templateId`.

Each template can reuse a smaller family schema, but the union must still be template-specific at the top level.

Examples:

- comparison-grid family
- shortlist family
- list-detail family
- notebook family
- workbench family
- kanban family
- queue family
- timeline-tabs family

Bridge behavior:

- validate fill against the selected template’s schema only
- reject freeform/generic layout payloads
- compile valid fill data locally into `workspace_model`, `workspace_patch`, and `action_spec`

### Update contract

Add a controlled update schema keyed by template id.

Initial supported update categories:

- selection changes
- saved-item toggles
- note append/update
- stage/category changes
- checklist toggles
- detail-note generation
- template switch requests

At least one concrete update/switch flow must be wired end to end.

## Template switching strategy

### Persisted metadata

Store enough runtime template state to preserve:

- current `templateId`
- prior `templateId`
- allowed transitions
- shared state:
  - notes
  - selections
  - saved entities
  - links
  - user-authored fields

### First migration flow

Implement `local-discovery-comparison -> event-planner`.

Migration rule:

- selected place becomes the primary venue
- saved places can seed venue alternatives or links
- notes carry forward
- contact/site details remain accessible
- new event tabs scaffold:
  - venues
  - itinerary
  - guests
  - checklist
  - notes

Unsupported transitions must fail loudly as `unsupported_template_transition`.

## Failure-state strategy

When template generation fails, the workspace area should render:

- title: `Workspace generation failed`
- explicit reason category
- concise detail text
- retry button if the failure is retryable

Required categories to support in protocol/UI:

- `template_selection_failed`
- `template_fill_failed`
- `template_update_failed`
- `template_switch_failed`
- `validation_failed`
- `unsupported_template_transition`
- `timeout_runtime`
- `timeout_user_config`

For template-driven production spaces:

- do not silently fall back to arbitrary richer rendering
- do not pretend success with a generic rendered workspace
- chat/baseline transcript may still exist separately in the session chat lane

## Template refinement tasks

### Price Comparison Grid

- remove the current standalone `Current scope` pane
- render scope tags below `Offer grid`
- remove the stat strip entirely
- replace bottom controls with a simple `Quick actions` header plus buttons
- do not wrap quick actions in a colored pane

### Shopping Shortlist

- convert `Quick actions` to simple header plus buttons
- simplify similar secondary panes where that improves consistency

### Research Notebook

- follow-ups must be actionable buttons or obvious immediate-run actions

### Security Review Board

- keep severity grouping
- redesign selected finding detail
- show severity and status as chips
- move proposed remediation into a dedicated full-width block below the main detail

### Event Planner

- add/select venue affordance
- add guests affordance
- interactive checklist affordance
- notes editing affordance
- separate editable itinerary tab

### Job Search Pipeline

- preserve long-lived state strongly
- allow stage/category changes per job
- include posting links
- include `Interview prep`
- `Interview prep` should generate detailed role/company/technology/requirements notes from stored posting context

### Content / Campaign Planner

- add email-write feature
- remove assets section
- support per-idea notes
- add `Flesh out` action to expand an idea into detailed Markdown

### Local Discovery Comparison

- render website/contact as bullet points
- make `Why it fits` a full-width pane in the detail column
- direct website/contact links open directly
- `Save place` should be a real runtime action
- support switching this template into another template later

### Gallery and tag theme bug

- ensure filter/category buttons and template chips remain readable in light and dark mode
- stop relying on accidental inherited foreground color for active/inactive tags

## Implementation slices

### Slice 1: protocol and contract scaffolding

- add shared template id enum
- add template selection/fill/update schemas
- add new failure categories
- add dynamic/template runtime state fields needed for switching/failure display
- add protocol tests

### Slice 2: bridge template enforcement

- add template contract prompt builders
- add selection + fill Hermes stages
- reject unknown template ids and freeform payloads
- compile template fills locally into `workspace_model`
- persist selection/fill/update artifacts
- stop using generic `workspace_dsl` generation in the standard template-driven production path

### Slice 3: template switching and local controlled updates

- add bridge handlers and local compilers for supported controlled operations
- add migration metadata
- implement concrete `local-discovery-comparison -> event-planner`

### Slice 4: web runtime failure and rendering polish

- surface `Workspace generation failed`
- show specific failure category/detail
- wire retry affordance
- keep live attached space surface free of gallery metadata

### Slice 5: gallery/template refinement

- implement the requested preview/spec changes
- fix theme contrast for filter tags/chips
- tighten interaction affordances in the requested templates

### Slice 6: test and fixture coverage

- update fixture Hermes template generation
- add bridge/service tests for template-only rejection and failure categories
- add representative web tests for refined templates
- add e2e success/failure/switching/interaction coverage

## Test strategy

### Unit / protocol

- template registry ids remain valid and unique
- selection/fill/update schemas validate the correct template ids only
- unknown or freeform template payloads fail closed

### Bridge

- selection succeeds for a supported template
- fill succeeds for a supported template
- generic/freeform layout payload is rejected
- selection failure produces `template_selection_failed`
- fill failure produces `template_fill_failed` or `validation_failed`
- unsupported transition produces `unsupported_template_transition`
- concrete switch flow migrates the preserved data

### Web

- gallery cards and tags remain readable in both themes
- refined preview sections render as requested
- failure state renders `Workspace generation failed`
- specific failure reason is visible
- session-attached spaces still do not render template-library metadata

### E2E / integration

- gallery loads
- representative template previews render
- template-driven attached space success path renders
- template-driven attached space failure path shows `Workspace generation failed`
- template switch flow or scaffolded conversion path works
- representative interactions exist:
  - Research follow-up button
  - Job interview prep
  - Content `Flesh out`
  - Local discovery save/contact actions

## Acceptance criteria

This pass is complete when:

1. The requested template refinements are implemented.
2. Gallery filter tags/buttons are readable in light and dark mode.
3. Production template-driven spaces use template selection plus template fill, not arbitrary layout DSL generation.
4. Freeform generation is rejected for template-driven production spaces.
5. `Workspace generation failed` renders clearly with a specific reason when template generation fails.
6. Template switching is supported architecturally and at least one concrete flow exists or is clearly wired.
7. `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass.
8. If feasible, `pnpm test:integration` and `pnpm build` also pass.
