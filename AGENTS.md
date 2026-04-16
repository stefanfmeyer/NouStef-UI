# AGENTS.md

This repository is intended to be completed autonomously by a coding agent such as Codex.
Treat this file as the persistent execution charter, product specification summary, implementation backlog,
and progress ledger. Update it whenever architecture decisions, status, risks, or next actions materially change.

## Agent operating contract

1. Read this file fully before changing code.
2. Keep this file current. After each meaningful milestone, update:
   - `Current status`
   - `Completed milestones`
   - `Next actions`
   - `Open risks / decisions`
3. Work autonomously in small, verifiable increments until acceptance criteria are met.
4. Do not stop at scaffolding. Leave the repository with a working vertical slice.
5. Follow TDD where practical:
   - write a failing test
   - implement the minimum code
   - make the test pass
   - refactor safely
6. Never disable tests, typechecks, lint rules, or security checks to move faster.
7. The runtime architecture is browser-first. Do not restore Electron IPC or renderer assumptions as the primary path.
8. Prefer structured schemas, explicit persistence models, and explicit failure states.
9. Preserve a minimal, modern, internal-scrollable UI.
10. If a better implementation detail is discovered, update this file before or alongside the code.
11. Before declaring a phase complete, run the relevant verification command and record any remaining gaps here.
12. When making changes, validate the local command path used by GitHub Actions before handoff; today that means mirroring `.github/workflows/ci.yml` with Playwright browser install plus `pnpm ci:full`.

## Product vision

Build a local-first Hermes frontend with:

- a browser-based chat interface with streaming markdown
- real Hermes profile and session browsing
- persisted local Spaces attached to sessions, with synchronized markdown/table/card content representations, extensible content-first tabs, and combined session+space workspaces
- jobs / cron visibility
- tool listing and reviewed tool execution history
- explicit disconnected, degraded, error, and empty states
- clean restart-safe persistence for hundreds of chats and thousands of messages

## Core product principles

1. Chat-first: chat is the default landing page.
2. Bridge-first: the browser talks only to a thin local bridge over HTTP and SSE.
3. Real data only: no synthetic `Local Profile`, fake sessions, or placeholder jobs presented as real state.
4. Local-first persistence: the app works from durable local state and survives restart cleanly.
5. Loud correctness: failures should surface clearly so they can be fixed.
6. Secure by default: dangerous actions stay behind explicit approval and capability boundaries.

## Architecture target

Monorepo layout:

- `apps/bridge`: local Node bridge service
- `apps/web`: Vite + React + TypeScript browser app
- `packages/protocol`: shared schemas and API contracts
- `packages/ui`: shared Chakra provider and theme helpers
- `packages/config`: shared lint configuration
- `docs/specs`: canonical product and architecture notes
- `scripts`: developer and security scripts

Tech stack target:

- Vite
- React
- TypeScript
- Chakra UI
- Zod
- SQLite
- Vitest
- Playwright
- Turbo + pnpm workspaces

## Runtime requirements

Frontend:

- Vite + React + TypeScript
- Chakra UI
- atomic design structure under:
  - `atoms`
  - `molecules`
  - `organisms`
  - `templates`
  - `pages`
- browser-first only
- no Electron renderer assumptions
- responsive, internal-scrollable shell
- dark mode / light mode

Bridge:

- local-only thin service
- HTTP + SSE transport
- Hermes CLI integration for:
  - profile discovery
  - session discovery
  - transcript import/export
  - cron/jobs reads
  - tools reads
  - streaming assistant updates
  - persistence access
  - reviewed tool execution
- OS-agnostic local data path resolution for macOS/Linux/Windows

Persistence:

- SQLite is the primary local store
- explicit schema for profiles, sessions, messages, jobs cache, tools, tool history, spaces, space events, settings, and UI state
- legacy Electron snapshot import exists only as a one-time migration path into SQLite

## Required UX

Required left nav order:

- profile selector
- `New session`
- recent sessions
- `Spaces`
- `All sessions`
- `Jobs`
- `Tools`
- `Skills`
- `Settings`

Behavior:

- Chat is the default landing page
- `Spaces` opens a top-level template gallery and pattern-library surface rather than a live runtime workspace
- recent/all-session clicks open the selected session in Chat
- All sessions supports search and pagination
- sessions remain the primary entry point for attached live Spaces; sessions with an attached space show a compact indicator in recent/all-session lists
- opening a session with no attached space shows the normal chat-only layout
- opening a session with an attached space shows the combined workspace layout with space content on the left and chat on the right
- structured-result prompts can implicitly create or update the attached space in the same request, even when the user never says `space`
- Jobs show real Hermes-backed freshness/error/disconnected states
- Tools show compact capability and approval metadata, with `All Tools` and `Tool History` tabs in the page
- Skills show real Hermes-backed runtime skills for the active profile
- Settings contain runtime preferences, unrestricted-access controls, model/provider routing, provider connections, and audit visibility
- all panes scroll internally
- no document-level scrolling in normal use
- theme toggle visible in the top-right

## Delivery phases

### Phase 1 - Real bridge

- define bridge API routes and SSE channel
- define SQLite schema
- integrate with the real Hermes CLI
- validate real local Hermes commands:
  - `hermes profile list`
  - `hermes profile show 8tn`
  - `hermes profile show jbarton`
  - `hermes sessions list --limit 10`
- prove structured bridge responses for profiles, sessions, messages, jobs, tools, and tool history
- add bridge tests before UI work continues

### Phase 2 - Browser shell

- build the Vite/React/Chakra browser shell
- connect it only to the bridge
- remove Electron-specific runtime paths
- remove fake fallback data

### Phase 3 - Persistence and migration

- move runtime persistence to SQLite
- preserve useful legacy local data through a one-time migration path
- keep one clear source of truth for messages and queryable history

### Phase 4 - Product UX

- implement chat, sessions, spaces, jobs, tools, skills, and settings
- stream assistant updates through SSE
- finalize responsive internal-scroll behavior
- add theme switching

## Acceptance criteria

The project is complete when all of the following are true:

- `pnpm install` succeeds
- `pnpm lint` passes
- `pnpm typecheck` passes
- `pnpm test` passes
- `pnpm test:integration` passes
- `pnpm build` passes
- `pnpm security` passes
- `pnpm ci:full` passes locally
- the browser app launches through the local bridge
- the bridge serves real Hermes-backed profile/session/tool/job data plus persisted local spaces
- the UI renders the required left rail with a top-level `Spaces` gallery section, lands on chat by default, and shows attached-space indicators on sessions
- explicit disconnected/error/degraded states render instead of fake fallback data
- prior local data can be migrated safely from legacy Electron snapshots when present

## Test strategy

Unit test requirements:

- protocol schema validation
- SQLite persistence across reopen
- runtime-session collision reconciliation
- bridge bootstrap and transcript import
- session-attached space CRUD, migration, persistence, and chat-linked context
- browser shell error-state and navigation behavior

Integration / e2e test requirements:

- shell loads with required navigation structure
- session browse/resume works
- streaming chat persists across reload
- attached-space session creation/rendering/update/delete and reload persistence work end to end
- tools, tool history, and skills work end to end
- jobs render real fixture data and explicit failure states
- disconnected states are explicit
- internal-scroll layout works without document scrolling

Security requirements:

- dependency vulnerability scan
- static scan for unsafe DOM/code-execution patterns
- reviewed tool execution tests
- threat model kept current

## Current status

Status: The repository now ships a browser-based Hermes frontend with a thin local bridge, trusted-local CORS/origin enforcement, SQLite persistence, explicit bridge failure states, real Hermes CLI profile/session/jobs/tools/skills/model-provider integration, persisted runtime request/activity/telemetry trails, reviewed tool execution, unrestricted-access audit controls, and a working Vite + React + Chakra shell. The old Electron-first runtime path has been removed from the product surface, synthetic `Local Profile` behavior is gone, fallback-heavy fake state has been removed, legacy Electron data is migrated into SQLite only once when needed, duplicate legacy message ids are normalized during migration, and real Hermes sessions are treated as profile-scoped in practice via `HERMES_HOME` with wrong-profile transcript access rejected. Transcript-visible chat messages are sanitized before persistence/import so bridge/system/tool/JSON/script/path-error leaks stay runtime-only, imported transcript request ids are reconciled back onto persisted runtime requests so reloads do not create duplicate activity buckets, every runtime activity row carries a timestamp plus a deterministic final state, and request-scoped runtime activity persists by request/message association and can be restored from transcript bubbles after navigation or reload. Assistant replies are now rendered Markdown-first end to end: the bridge preserves headings, lists, tables, links, emphasis, and fenced code blocks while still stripping runtime-only leakage, and the chat pane treats assistant content as Markdown by default instead of assuming plain text. The UI is denser and more compact across recent sessions, settings, telemetry, drawers, modals, and the new Spaces gallery; recent-session ordering follows the persisted per-profile recent-session list; rename dialogs and destructive confirmations now clean up focus/overlay state correctly; the left rail supports a compact icon-only mode without breaking accessibility; the palette now uses cleaner Chakra-style neutrals/blues; and All sessions pagination now clamps back to the last valid page after a delete instead of stranding the user on a false empty state. The left rail now includes a top-level `Spaces` page again, but it is a deterministic template gallery rather than a freeform runtime workspace surface: the gallery exposes 20 curated workspace templates, typed registry metadata, preview fixtures, shared preview primitives, compact gallery cards, corrected light/dark tag contrast, and full inspector/drawer specs that document population/update rules for each template. Sessions still remain the primary discovery surface for attached live spaces: each session may have zero or one attached active space, each space belongs to exactly one primary session, and opening a session dynamically selects either the chat-only view or a combined session+space layout with space content on the left, chat on the right, and runtime activity hidden behind a focused drawer. Combined workspaces now let operators collapse the chat column into a slim right-side rail so the attached space can take the width while chat and runtime stay one click away, and the runtime drawer exposes an explicit close control instead of relying on escape-only dismissal. Attached live spaces remain data-first: template-library metadata such as selection guidance, capabilities, `Good for`, or `Supports` does not render in the session workspace area, and the rendered template workspace no longer carries the old top summary chrome or hero-style blue summary pane above the real content. Once template selection succeeds, the workspace pane now renders a ghost version of the chosen template instead of dumping plain assistant Markdown into the workspace surface: sections expose persisted `pending` / `hydrating` / `repairing` / `ready` / `failed` state, empty sections render intentional skeletons, repair states are visibly highlighted, and later stage artifacts progressively hydrate the selected template shell without hiding the chat pane on the right. Space data is now modeled as extensible tabs with a required `Content` tab only; the To-Dos/reminder/delivery-integration stack has been removed for now. The content tab now persists synchronized markdown/table/card representations plus an aligned per-entry `entries[]` model (`id`, markdown, structured row, card, optional source/metadata) with explicit sync metadata and an `activeView` pointer; view switching is display-only and silent; markdown renders through readable GFM-style blocks with preserved section headings plus clickable website/email/image actions; tables stay compact, sortable, bulk-selectable, and image-free; cards expose richer button links plus optional small images only in card view; and each markdown block, table row, or card can now be removed individually without drifting the other persisted representations. Actionable Gmail-backed entries surface direct `Delete email` controls from the UI, bulk row email deletion goes through a bridge-side source-delete path when the entry source is recognized, and bridge validation now rejects malformed aligned entries whose card id does not match the entry id. Each content view scrolls internally, and attached-space refresh now sends a first-class `space_refresh` request whose visible transcript stays short while the bridge re-prompts Hermes with persisted space/origin context so unrelated later chat turns do not hijack refresh. Structured-result intents such as hotels, restaurants, plans, comparisons, finance lists, and research summaries auto-create or update the attached space in the same request even when the user never mentions Spaces. The 2026-04-12 Home-baseline, reliability-hardening, artifact-only, async-enrichment, and `workspace_sdk/v1` graph passes remain in place, but template-driven live spaces are now strict, staged, and deterministic: Hermes must first choose an approved `templateId` through a tiny selection schema, then emit template-specific text/content JSON, then emit template-specific hydration JSON for the concrete populated slots/collections, then emit template-specific actions/buttons JSON, and later use only template-scoped update or supported switch operations. The bridge persists every intermediate selection/text/hydration/actions artifact, injects bounded full assistant Markdown plus normalized/raw data snapshots into the later stages, validates each stage locally, applies deterministic template-specific normalization/adapters plus alias/default/coercion repair before any LLM repair, assembles the final authoring fill artifact locally, compiles that payload into `workspace_template_state`, and rejects freeform template layout generation outright. Canonical near-miss adapters now cover the matrix/comparison, coding-workbench, notebook, and travel/list template families, so recoverable shapes like `data.data`, `columnLabels`, `comparisonRows`, `scopeTags`, and similar obvious wrappers are normalized deterministically with an audit trail instead of being thrown into long blind repair loops. Semantic completeness is now a hard promotion gate: schema-valid but empty workspaces do not become `ready`, template-family rules check that the primary collections for coding, comparison, notebook, travel, event, and similar templates are materially populated, and weak/empty outcomes surface a rebuild affordance instead of silently shipping an empty shell. Supported transitions such as `local-discovery-comparison -> event-planner` preserve carried state, queue hardening now finalizes unexpected staged enrichment exceptions instead of leaving builds stuck in `running`, and failure states render explicitly as `Workspace generation failed` with stage-specific categories instead of silently pretending the template succeeded. Home workspace template generation now also persists durable per-stage timing logs and final build summaries directly into `space_build_logs` plus structured timeout/summary telemetry in `telemetry_events`, and the latest resilience pass adds bounded raw stage-output snapshots, parser/recovery diagnostics, deterministic syntax-only JSON recovery, and up-to-3 sequential retries for structured seed, selection, text, hydration, actions, and stage-specific repair steps. Later diagnosis can now answer what stage ran, how long it took, how many attempts were used, whether raw malformed JSON was mechanically recovered, which timeout budget applied, which section stayed empty or failed, what normalization was applied, whether semantic completeness failed, and whether the build reached `ready` or `failed` without replaying the request. `WorkspaceAppletRenderer.tsx` is deleted from the web bundle, runtime TSX applet generation is hard-disabled in standard production request, retry, and enrichment flows, and no standard production flow enters applet source generation or applet promotion telemetry. The dormant experimental applet modules remain opt-in only behind `HERMES_EXPERIMENTAL_WORKSPACE_APPLETS=1` and are not part of the normal product path. Async enrichment remains artifact-only and non-blocking for initial requests, the scoped `HERMES_ASYNC_WORKSPACE_ENRICHMENT_TIMEOUT_MS` budget (legacy alias `HERMES_ASYNC_WORKSPACE_APPLET_TIMEOUT_MS`) applies only to that background lane, and no standard production flow enters applet source generation or applet promotion telemetry. Explicit `retry-build` actions now reuse persisted Home artifacts, surface as `Rebuild workspace`, remain available on promoted dynamic template workspaces as well as failed/weak states, stream template retries to completion on the same action request, and treat active `template_enrichment` builds as first-class freshness signals so retry flows no longer stall in a perpetual queued/running state. For troubleshooting, every active Home workspace generation step is now temporarily aligned to the same `90000ms` cap, including structured seed generation plus selection/text/hydration/actions/repair stages; keep that override easy to find and plan to remove it once enough timing evidence is collected. `compiled_home`, `space_ui/v1`, and `space_ui/v2` remain persisted-compatibility artifacts only and are no longer part of the live production request path. `apps/web/src/resources/logo.svg` now powers both Hermes Home branding and the browser favicon. Workflow-equivalent verification for the staged template-generation pass plus the existing template-only/Markdown-first hit-rate, observability, bounded-retry, semantic-completeness, progressive ghost-hydration, and rebuild layers now passes locally with `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:integration`, and `pnpm build`, with only the existing non-blocking Vite chunk-size warning remaining. The real-Hermes live gate now also passes in full with `HERMES_LIVE_WORKSPACE_VALIDATION=1 HERMES_LIVE_WORKSPACE_CASES=prose,comparison,planning,action,retry,switch,travel HERMES_LIVE_WORKSPACE_CASE_TIMEOUT_MS=300000 pnpm test:live:home`, covering prose, vendor matrix, coding workbench, prompt-bound research updates, rebuild, template switching, and hotel/travel flows without any tolerated live failures. Prior read-only real-machine Hermes and bridge/browser validations remain logged below.

Completed milestones:

- Electron-first shell removed and replaced with `apps/web` plus `apps/bridge`
- shared protocol rebuilt around browser/bridge HTTP + SSE contracts
- SQLite persistence layer implemented with explicit tables for profiles, sessions, messages, jobs, tools, tool history, settings, and UI state
- real Hermes CLI bridge implemented for profiles, sessions, transcript export, jobs/cron, tools, and streaming chat
- reviewed tool execution preserved behind explicit approval and persisted history
- one-time legacy Electron snapshot migration implemented into SQLite with source-path metadata
- browser shell implemented with atomic Chakra structure, required left nav order, internal scrolling, and theme persistence
- browser tests implemented for error states, session navigation, streaming persistence, jobs/tools/tool history, disconnected states, and internal-scroll behavior
- runtime-session collision handling added so a CLI-synced runtime session merges into the active local session instead of crashing on a unique constraint
- fixture-mode bridge startup now skips legacy snapshot import so isolated integration runs do not accidentally read real-machine data
- legacy snapshot migration now rewrites duplicate legacy message ids so a fresh real-machine SQLite bridge can start successfully from older Electron data
- bridge/browser docs rewritten around the new architecture
- bridge origin policy now rejects non-local browser origins for JSON and SSE routes and only allows trusted localhost/127.0.0.1/::1 ports
- session persistence now includes first-class `session_profile_associations`, per-profile recent-session state, per-profile active-session restore, and profile-filtered all-session pagination
- explicit synthetic/test session filtering now hides fixture, integration, smoke, and other obvious synthetic sessions from normal UI lists while reporting hidden counts
- Tools now own `Tool History` as a tab, Skills has a dedicated page, and Settings now expose unrestricted access, access audit, model/provider routing, and provider connection management
- provider/model persistence now includes per-profile cached provider connections, per-profile runtime model config, and audit events for unrestricted access and provider connections
- bridge/server modules are split across HTTP routing/origin policy, services, Hermes CLI integration, data/session filtering, and legacy migration helpers instead of a single monolithic entrypoint
- real Hermes validation now confirms sessions are profile-scoped through `HERMES_HOME`, wrong-profile transcript requests fail with `SESSION_PROFILE_MISMATCH`, and profile switching no longer leaks recent sessions or transcripts across profiles
- chat UX now has a stable Enter-to-send / Shift+Enter newline composer, cleaner transcript hierarchy, explicit runtime empty/error states, and a dedicated right-side runtime activity pane with internal scrolling
- Settings now keep dangerous controls and provider connections usable without zoom hacks by using internal scroll regions and explicit horizontal overflow handling
- unread-email and other email intents now pin Hermes to the active profile, preload `google-workspace` when available, distinguish timeout vs abort failures, suppress raw tool/session/max-iteration leakage, and handle active-profile auth guidance cleanly
- Hermes session list parsing now handles both real and fixture table layouts, including ISO timestamp rows, without corrupting runtime session ids
- the bridge now emits in-band SSE `error` events instead of crashing with `ERR_HTTP_HEADERS_SENT` if a streaming failure escapes after headers are sent
- bridge startup now resolves relative static asset paths more robustly so fixture/e2e startup and local bridge launches consistently serve the built browser shell
- real-machine bridge/browser validation confirmed local profiles `default`, `8tn`, and `jbarton`, profile-filtered session lists with hidden synthetic counts, runtime activity/progress events in the UI, and real unread-email responses without tool inventory or max-iteration leakage
- chat/runtime separation now uses explicit message visibility metadata so tool output, CLI diagnostics, skill traces, approvals, and runtime-only system noise stay out of the transcript and render only in request-scoped runtime activity
- runtime transcript import now strips bridge-injected user prompt scaffolding plus Hermes UI Workspaces fenced blocks before persisting transcript-visible messages, so reload/export paths stay as clean as the live transcript
- session lifecycle management now supports local title overrides, Hermes-backed rename/delete when available, hybrid soft-delete hiding, confirmation dialogs, and automatic session reactivation when Hermes activity reappears after a local delete
- the shell now uses shared `<Profile> | <Page>` page headers, Hermes typing bubbles, assistant avatars, clickable transcript-to-runtime focus, semantic activity cards, Chakra action menus, and compact destructive confirmation dialogs across chat, sessions, and skills
- Settings now use horizontal section tabs with independent internal scroll panes, and the Playwright fixture server now uses an isolated dedicated port so e2e runs do not silently reuse a stale local bridge
- a persisted local Spaces framework now ships end to end with SQLite-backed `spaces` and `space_events`, bridge CRUD/open-chat APIs, structured safe renderers for content/table/card/markdown, session-attached chat context, runtime-emitted `space_event` SSE updates, and in-repo architecture/docs under `docs/specs/spaces.md` and `docs/specs/hermes-ui-workspaces.md`
- provider selection now uses runtime-discovered Hermes provider metadata, guided right-side configuration drawers, disabled unavailable providers, profile-aware local persistence for non-secret config, and explicit blocked setup states instead of manual model typing when interactive Hermes discovery cannot safely supply choices
- session-attached Spaces now replace the top-level Spaces page: `sessions.linked_space_id` and `spaces.primary_session_id` are migrated safely, attached-space indicators render in recent/all-session lists, and opening an attached session now yields the combined session+space workspace instead of a separate Spaces surface
- space persistence now normalizes future-safe canonical `tabs` data around the required `content` tab, preserves partial valid extension-tab payloads during migration, drops legacy `todos` safely, and keeps deleting a space from deleting or corrupting its parent session
- content tabs now persist synchronized `markdownRepresentation`, `tableRepresentation`, and `cardRepresentation` data with sync-version/fingerprint metadata, and legacy single-representation rows migrate into that model without lossy view switching
- attached spaces now render through a compact combined layout with a minimal top area, content-format chips, right-column chat, runtime drawer focus from transcript clicks, and live renderer updates while Hermes applies structured space operations
- To-dos, reminder jobs, and delivery-integration plumbing have been removed from spaces for now while keeping the tab model extensible for future non-content surfaces
- content rendering polish is complete across markdown/table/card views, with first-class links, clickable websites/emails, optional card-only images, richer card actions, compact tables, and GFM/autolink markdown
- attached spaces now expose a per-view Refresh action that reruns the latest structured session prompt, content-format switching is silent, runtime typing previews are granular, and destructive delete flows no longer leave invisible overlays behind
- session auto-titles now reevaluate later transcript-visible user turns when they provide a meaningfully better local title while preserving explicit user renames
- provider selection now uses runtime-discovered Hermes provider metadata, guided right-side configuration drawers, disabled unavailable providers, profile-aware local persistence for non-secret config, and explicit blocked setup states when the interactive Hermes model picker cannot safely supply model choices
- compact UI polish is complete for runtime activity cards, recent session rows, settings toasts, and destructive-action feedback across sessions, skills, spaces, and settings
- runtime model/provider responses now tolerate nullable `inspectedProviderId` and `discoveredAt`, and live provider saves/reloads no longer trip the Settings runtime-configuration schema error
- recent sessions now honor the persisted per-profile recent-session list during bootstrap, so inline rename targets stay visible even after Hermes background sync refreshes
- transcript re-import now reconciles imported request ids onto existing persisted runtime requests and merges stale alias buckets, preventing duplicate runtime activity groups after reload while preserving audit history
- structured runtime telemetry is now persisted in SQLite, exposed through `/api/telemetry`, and surfaced in the Settings audit/troubleshooting pane for later diagnosis
- transcript sanitization now runs on every message append/replace/import path before SQLite persistence, stripping observed bridge execution notes, raw system messages, JSON/tool blobs, script dumps, and file/path errors out of the visible chat transcript
- runtime request persistence now finalizes unfinished activity rows on completion/error/cancel, persists timestamps plus `messageIds`, and rehydrates/refocuses audit trails when a chat is revisited or a transcript message is clicked
- the left nav is now hard-clamped against horizontal overflow with ellipsis truncation for recent-session rows, and rename dialogs from both recent sessions and the chat header now unmount cleanly without leaving the page inert
- All sessions now steps back to the previous valid page when deleting the final visible row on a later page, instead of rendering a misleading empty-state page number
- provider/model configuration drawers now render discovered runtime configuration fields, disable unavailable or unconfigured providers/models, hide unsupported reasoning-effort controls, and never fall back to manual model typing
- session-attached space persistence, combined-layout rendering, telemetry route/UI loading, theme first-paint bootstrapping, and compact skill summary generation/removal now have dedicated regression coverage
- provider Configure now opens only with an initialized provider context, shows drawer-scoped loading and error states, and no longer falls back to `No provider selected` or a global Settings reset when inspection/config save fails
- Tool History now persists and renders two explicit histories: Hermes runtime tool/skill/command activity and reviewed bridge executions, with runtime activity becoming visible after real chat requests
- session auto-titles now use deterministic local keyword extraction from the first user turn and keep later user renames authoritative
- nearby-place search requests now receive bridge-side local-search prompt shaping, a higher timeout budget, explicit progress messaging, timeout telemetry, and runtime-tool-history coverage
- session-attached Spaces now rely on Hermes-structured create/update/delete flows inside chat, mixed-prose fenced blocks parse safely, malformed blocks log telemetry without creating broken spaces, and no top-level manual Spaces surface remains in the app shell
- malformed `hermes-space-data` fences now recover locally when balanced schema-valid JSON is still present, trigger at most one bounded repair call when recovery fails, preserve the assistant answer on structured-space failures, and persist a retryable failed-shell fallback instead of throwing `SPACE_POPULATION_INCOMPLETE`
- `hermes-space-data` parsing now treats the start marker plus first balanced schema-valid JSON object as the authoritative contract, retry-build actions create distinct build attempts with the same bounded repair path, and failed fallback artifacts strip malformed structured remnants from user-visible summaries when possible
- required-space and retry flows now use a dedicated structured-only Hermes artifact step with explicit marker-only/empty-payload telemetry, one bounded reissue, and legacy `hermes-ui-workspaces` compatibility gated so already-meaningful legacy spaces are not overwritten by failed dynamic attempts
- the Playwright fixture runtime now seeds real skill metadata files so compact skill summaries render in the Skills UI during end-to-end coverage
- timeout policies are now split across normal chat, search/discovery, nearby/local-search, structured space operations, and unrestricted access, with higher persisted caps and unrestricted-mode headroom
- the app now blocks chat/jobs/tools/spaces/skills behind a clear runtime-configuration gate until Hermes exposes at least one usable provider and model, while Settings remain accessible for guided setup
- startup runtime readiness now auto-refreshes cached provider discovery, keeps the app in a checking state until readiness is trustworthy, and avoids false provider/model blockers on first load
- theme switching is now optimistic in the UI, bootstrap/settings sync no longer re-flips the chosen mode after toggle, telemetry rows are rendered more compactly, and the Reviewed Shell Runner is no longer exposed in the Tools UI
- mixed-prose `hermes-ui-workspaces` replies are now scanned from the opening fence forward, balanced JSON is extracted even when Hermes prefixes the block with conversational prose, malformed payloads fall back to a generic user-facing transcript error, and parse diagnostics are persisted to telemetry without creating undefined spaces
- provider setup drawers now render authoritative auth-session actions and structured connect/configure failures directly from Hermes runtime state, keep OpenRouter select-only, and show persistent clean drawer error banners when provider connection attempts fail (for example invalid MiniMax API keys)
- session-attached Spaces regression coverage now includes table/card/markdown creation through Hermes chat, persisted reload stability, mixed-prose workspace parsing, dynamic content-format switching, dedicated To-do tabs, and combined-layout runtime-drawer focus from transcript clicks
- implicit structured-result intent detection now auto-creates or updates populated attached spaces in the same request for local search, plans, comparisons, finance lists, research summaries, and to-do prompts
- markdown presentation and conversion now preserve readable headings/lists/tables while turning plain structured bullet blocks into synchronized table/card entries without mutating stored markdown
- Playwright coverage now includes a natural-language restaurant query that auto-creates and repopulates an attached space without the user mentioning Spaces
- Sessions are now the single discovery surface for chats and attached spaces, with recent/all-session indicators, compact combined session+space workspaces, collapsible nav polish, and session-preserving space deletion
- SQLite startup migration now backfills legacy `spaces.primary_session_id` and related columns before creating the session-attached-space unique index, so `pnpm dev` no longer crashes against pre-refactor local databases
- GitHub Actions CI now installs pnpm before `actions/setup-node` enables pnpm caching, so Node 22 runners no longer fail with `Unable to locate executable file: pnpm`
- content tabs now persist aligned per-entry `entries[]` records alongside synchronized markdown/table/card representations, and the bridge/UI support individual entry removal, table bulk removal, sortable rows, and direct Gmail-backed source deletion without reintroducing content drift
- nearby-search prompt shaping now explicitly blocks repository/file/code-inspection loops after runtime logs showed a real hotel search spending roughly 610 seconds in repeated `find-nearby`, `execute_code`, and `read_file` activity before answering
- attached-space refresh is now a dedicated request mode instead of “replay the last user message”, with persisted `space.metadata.refreshPrompt` context, bridge-side fallback inference for legacy spaces, refresh-aware Hermes prompt shaping, and transcript-safe visible refresh messages
- transcript-visible messages and runtime request `messageIds` now preserve insertion order when timestamps collide, preventing flaky attached-space refresh transcript ordering and stabilizing the GitHub `pnpm ci:full` path
- combined session+space workspaces now support collapsing the chat pane into a right-side rail while keeping runtime activity reachable and exposing an explicit runtime-drawer close button
- real Hermes provider/model onboarding now exposes the authoritative `hermes_cli_models/v2` discovery/inspect/auth/auth-poll/connect/configure/disconnect contract from Hermes Python internals, the bridge/UI consume only that structured backend for runtime readiness and Settings onboarding, and Hermes disconnect clears pending device-auth sessions instead of leaving stale provider blockers behind
- startup authoritative provider discovery now tolerates nullable optional contract fields, derives serialized provider identity/capability metadata directly from adapter state, and automatically unblocks after transient/discovery-pending backend startup races without requiring a manual Settings refresh
- dead bridge-side TUI onboarding/probing helpers have been removed from the product path, and Hermes `models_json.py` is now a thin façade over explicit provider adapter/state logic in `model_provider_state.py`
- chat composer draft ownership is now local to the composer, `handleSendMessage` accepts submitted content directly, and memoized transcript rows/markdown keep long chat histories cold while the operator types or Hermes updates only the live typing bubble
- dynamic spaces now use a persisted two-pass builder: `hermes-space-data` first-pass envelopes are stored as isolated artifacts, the bridge derives validated declarative UI/action/test specs locally, the generic harness gates activation, and ready/fallback state survives reloads and restarts cleanly
- prompt-bound attached-space actions now stream through `/api/spaces/:id/actions/stream`, reuse persisted prompt/data/context artifacts, and rebuild the current space through the same validated pipeline for refresh, refine-selection, and retry flows
- space architecture/docs are updated around the new `hermes-space-data` contract, local second-pass builder, safe Chakra allowlist renderer, and compatibility-only legacy `hermes-ui-workspaces` path
- every chat request now attempts to create or update an attached space, using a dedicated structured-only artifact step for rich dynamic builds and a Markdown fallback space when rich artifacts are unavailable or unnecessary
- the structured-only artifact channel now prefers direct raw JSON and treats `hermes-space-data` start markers as compatibility-only transport, with one bounded reissue and explicit marker-only / empty-payload telemetry
- runtime readiness now renders a distinct checking spinner state, Tool History now keeps both history tables internally scrollable with stable pagination, and Settings splits Access audit and Troubleshooting telemetry into separate paginated internal-scroll tabs
- the executable follow-up plan for always-on spaces, dual-channel artifact generation by default, Markdown fallback spaces, runtime-checking UX, Tool History scroll discipline, and split Settings audit/telemetry tabs now lives in `docs/plans/2026-04-11-space-dual-channel-reliability.md` and is now implemented
- investigated the newest persisted retry failure on 2026-04-12 and confirmed the next upstream failure class: after empty-payload retries, structured-only generation can now also fail with schema-invalid direct JSON artifacts, so baseline Home workspace usability must be decoupled from enrichment success
- wrote the execution plan for the next reliability and UX pass in `docs/plans/2026-04-12-hermes-home-baseline-workspaces.md`
- Home workspaces are now the primary success path: every request creates or updates a baseline Home space first, dynamic enrichment upgrades that baseline when it succeeds, and repeated empty/schema-invalid structured artifacts no longer remove baseline usability
- session lists now expose a `Type` model with `Home` / `TUI` values, recent-session rows show title plus message-count/time metadata instead of summaries, theme toggles save silently, and the shell/sidebar now render the Hermes Home logo/branding with a narrower collapsed rail
- local verification for the Home-baseline pass now succeeds with `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`
- investigated the newest persisted workspace retry failure on 2026-04-12 and confirmed the next architecture blocker: Hermes is still emitting schema-invalid app-shaped `normalizedData` payloads, and the current dynamic builder is still preset-oriented enough that Hermes is effectively being asked for too much final UI/data schema
- wrote the execution plan for the compiler rearchitecture in `docs/plans/2026-04-12-home-workspace-compiler-rearchitecture.md`
- the compiler rearchitecture is now implemented: Hermes structured artifacts are reduced to a minimal `hermes_space_seed/v1`, invalid optional extensions are dropped non-fatally with telemetry, the bridge persists `analysis` artifacts and compiles a local `space_ui/v2` node grammar, and dynamic Home spaces now respect explicit table/markdown hints without relying on Hermes-authored final UI schema
- dynamic renderer/test coverage now exercises `space_ui/v2` directly, protocol coverage includes `space_analysis/v1` and `analysis` artifacts, and full local verification for the compiler rearchitecture pass now succeeds with `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`
- investigated the current workspace architecture for the next major correction and confirmed that the reliable path now is baseline Home content plus the bridge-owned compiler, while Hermes still remains too weak to be the source of truth for final rich workspace structure
- wrote the executable applet-architecture plan in `docs/plans/2026-04-12-workspace-applet-architecture.md`, which adds Hermes-generated TSX applets only as a separately verified promotion layer on top of the existing Home/compiler baseline
- the workspace applet architecture is now implemented historically: protocol/persistence now track `compiled_home` vs `applet` builds plus isolated manifest/source/test/render/verification artifacts, the bridge ships a constrained Workspace Applet SDK and verifier harness, and that stack now remains dormant experimental code rather than part of the standard production enrichment path
- regression coverage now includes valid applet promotion, failed applet verification, applet capability bridge actions, static validator coverage, and baseline-preserving behavior when manifest/source/output stages fail; local verification for the applet pass now succeeds with `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`
- the 2026-04-12 two-phase cutover is now complete: Phase A removed the preset-driven rich workspace builder from live request/retry/build paths and guarantees a Markdown-first Home baseline on every request, and Phase B reintroduced rich workspaces only through minimal-seed-driven Workspace Applets that pass manifest/import/capability/typecheck/generated-test/render/small-pane promotion gates
- `apps/bridge/src/services/spaces/dynamic-space-builder.ts` has been deleted from the production path, the old compiled-home helper cluster in `apps/bridge/src/services/hermes-bridge-service.ts` has been retired, and the standard production rich-rendering path now depends only on the baseline Home workspace plus deterministic Workspace DSL normalization/rendering
- `apps/web/src/resources/logo.svg` now powers Hermes Home branding across the shell plus the favicon declared in `apps/web/index.html`
- the 2026-04-12 Home reliability-hardening pass is now complete: runtime requests, attached space metadata, and failed enrichment builds persist explicit `task` / `baseline` / `enrichment` stage state plus failure category, retryability, and configured-timeout metadata; the active Home UI distinguishes task failure vs baseline failure vs enrichment failure without exposing the old `Markdown` / `Table` / `Cards` controls; and Playwright now covers prose-only, data-rich, prompt-bound action, degraded enrichment, timeout-classified, and retry/rebuild Home workspace flows
- the 2026-04-12 artifact-only applet correction remains as a dormant experimental safeguard: if TSX applets are ever explicitly re-enabled, manifest/source/repair generation still cannot use the live chat path, live-task activity during applet generation still fails loud, invalid persisted retry context still fails loud, and baseline-only Home spaces can execute `retry-build` through the public bridge action stream without rerunning the original task
- the 2026-04-12 local-manifest correction is now complete: Hermes is no longer asked to generate workspace applet manifests or plans, the bridge synthesizes manifest/plan/generated-test artifacts locally from persisted Home artifacts plus TSX source analysis, applet telemetry now records local manifest synthesis explicitly, and regression coverage now proves the applet path uses one Hermes source call instead of a separate manifest round-trip
- the 2026-04-12 async enrichment rearchitecture is now complete: user-facing requests now finish after task execution plus baseline Home persistence instead of waiting on enrichment work, async enrichment is queued onto a persisted bridge-side background lane with explicit `queued` / `dsl_analyzing` / `dsl_generating` / `dsl_normalizing` / `dsl_applying` / `dsl_promoting` states, baseline Home workspaces render ghost/skeleton richer sections while background artifacts arrive, the async-only enrichment timeout experiment is now scoped to `HERMES_ASYNC_WORKSPACE_ENRICHMENT_TIMEOUT_MS` (legacy alias `HERMES_ASYNC_WORKSPACE_APPLET_TIMEOUT_MS`) with a temporary `90000ms` default, and regression coverage now catches retry self-supersession when a failed baseline still carries the original request id
- the workspace SDK framework now ships a versioned `workspace_sdk/v1` graph contract with persisted `workspace_model` / `workspace_patch` artifacts, bridge-side graph synthesis/diffing, local manifest synthesis from TSX source analysis, literal-id verifier rules, and regression coverage for patch-friendly richer Home workspace flows
- the 2026-04-13 Workspace DSL renderer pivot is now implemented: Hermes emits declarative `workspace_dsl` artifacts for the default rich-workspace path, the bridge normalizes DSL into the persisted `workspace_model` / `workspace_patch` graph, the browser renders that normalized graph locally through the Workspace DSL renderer, retry supersession now respects the active `dsl_enrichment` build request id, and runtime TSX applet generation is now disabled in standard production enrichment flows rather than merely “not default”
- the 2026-04-13 DSL-only production cutover is now complete: standard request, retry, and async enrichment flows no longer call runtime applet source generation, no longer emit `SPACE_APPLET_*` telemetry, keep `WorkspaceDslRenderer` as the only active rich renderer in the product path, and verify the scoped `90000ms` async enrichment budget through DSL-only regression coverage
- the 2026-04-13 authoring-DSL reliability pass now injects compact contract packets with valid/invalid examples, validates `workspace_dsl/v2` locally, applies deterministic alias/default/synonym repairs, and uses one bounded persisted-artifact repair pass before preserving the baseline Home workspace
- `apps/web/src/ui/organisms/WorkspaceAppletRenderer.tsx` has been deleted, `apps/web/src/ui/organisms/workspace-renderer-cutover.test.ts` now prevents it from reappearing in the production bundle, and fixture/server/UI coverage now explicitly fails if standard flows invoke TSX applet generation or emit `SPACE_APPLET_*`
- the Playwright fixture DSL generator now recovers dataset ids from truncated compact-contract prompt sections and fails the entire first enrichment attempt for `dsl_invalid_once`, so the natural-language restaurant prompt and retry/rebuild regression coverage now exercise the intended baseline-plus-DSL production path reliably
- a dedicated live Home workspace validation harness now ships as `pnpm test:live:home`, with focused real-Hermes runs passing `prose`, `planning`, `action`, and `retry`, and a consolidated overnight run recording the remaining real-machine `travel`, `email`, `action`, and `timeout` risks explicitly instead of hiding them
- the 2026-04-13 Spaces template-library pivot is now implemented: the left rail includes a top-level `Spaces` gallery again, `currentPage: "spaces"` persists through protocol and bridge UI state, the web app ships a typed 20-template registry plus shared preview primitives/fixtures/inspector UI, and documentation now defines the curated-template-first direction rather than freeform runtime layout generation
- gallery regression coverage now proves all 20 templates exist with required metadata, the template gallery and inspector/drawer render, representative templates stay usable in a small pane, and app-shell/browser integration coverage explicitly exercises the restored `Spaces` nav surface
- the Spaces gallery cards are now denser and quieter: `Good for` and `Supports` render as simple header-plus-chip rows without nested panes, while session-attached space regression coverage now guards against template-library metadata leaking into the live workspace area
- the 2026-04-13 template-enforcement/refinement pass is now implemented: bridge/protocol/template registry contracts now enforce `workspace_template_selection`, template-specific fill payloads, and template-specific updates for live template-driven spaces; freeform template generation is rejected; gallery tags are readable in light and dark mode; and failure states now render explicit `Workspace generation failed` categories instead of silently falling back to arbitrary rich rendering
- live template workflows now support carried-state switching metadata plus a concrete `local-discovery-comparison -> event-planner` transition, and the refined template previews/runtime renderers now include product-feedback changes such as simplified quick-action blocks, clickable follow-up affordances, structured selected-finding detail, and persistent event/job/content/local-discovery interactions
- retry-build for template workspaces now persists retryable action specs on failed builds, streams the retry through the same action request instead of abandoning the browser on a queued background job, and treats active `template_enrichment` builds as supersession-aware so the retry/rebuild E2E flow completes cleanly
- the 2026-04-13 hit-rate and Markdown-first pass is now implemented: assistant transcript sanitization preserves Markdown structure, chat rendering is Markdown-first by default, template generation is split into tiny selection plus per-template fill/update authoring schemas, the bridge owns deterministic normalization/defaulting/repair plus one bounded JSON-only repair pass, explicit template failure states remain visible with baseline preserved, the focused live harness now checks prose/fill/update/retry/switch paths against real Hermes, and local verification now passes again with `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:integration`, `pnpm build`, and `pnpm ci:full`
- the 2026-04-13 Home workspace observability pass now persists template-generation stage timings and final summaries into `space_build_logs`, emits structured timeout/build-summary telemetry into `telemetry_events`, and temporarily raises the bounded template-repair stage cap to `90000ms` for troubleshooting without changing the surrounding failure-category model
- the 2026-04-13 staged template-generation pass is now implemented: template enrichment runs as explicit sequential `template_selection`, `template_text_generation`, `template_actions_generation`, validation, and promotion stages; the bridge persists intermediate selection/text/actions artifacts plus final assembled fill artifacts for every build; stage-specific repairs replace the old generic repair-first mindset; wrong-template staged artifacts now fail early with precise diagnostics; queue-wrapper hardening finalizes unexpected staged exceptions into failed builds instead of leaving `template_enrichment` rows stuck in `running`; and fixture/unit/Playwright coverage now exercises stage-specific repair failures, timeouts, retry, and template switching through the new pipeline
- the 2026-04-14 resilience pass now persists bounded raw structured payload snapshots plus parser/recovery diagnostics for failed or recovered seed/template attempts, applies deterministic syntax-only recovery for prose-wrapped or delimiter-truncated JSON before schema validation, retries seed/selection/text/actions/stage-repair steps up to three times with persisted attempt history, and keeps non-retryable policy/context failures loud without wasting all attempts
- the 2026-04-14 semantic-population pass is now implemented: template enrichment adds an explicit `template_hydration` stage, later stages receive bounded full assistant Markdown plus normalized/raw context, semantic completeness checks block schema-valid-but-empty workspaces from promoting to `ready`, the session workspace renderer no longer emits the old top summary/hero chrome, and empty or failed template builds now surface `Rebuild workspace` so operators can retry from persisted artifacts instead of living with an empty shell
- the 2026-04-14 structured-workspace reliability pass is now implemented: template-specific deterministic normalizers recover canonical near-miss shapes before repair, promoted template workspaces keep `Rebuild workspace` available, the UI renders ghost templates with visible section hydration/repair/failure states instead of plain assistant Markdown once selection starts, and the live validator now checks ghost/hydration progression plus semantic population as part of the hard gate
- real-Hermes validation is green again for the representative production suite: `prose`, `comparison`, `planning`, `action`, `retry`, `switch`, and `travel` all passed in one run through `pnpm test:live:home`
- the 2026-04-14 same-session correction and schema reliability pass is now implemented: the Hermes CLI client supports multi-turn correction via `--resume` on the same session for schema-invalid stage outputs, each stage (selection, text, hydration, actions) attempts up to 2 same-session corrections before counting an attempt as failed, correction prompts include exact validation errors plus the full canonical schema plus anti-pattern examples, all 20 registered workspace templates now have explicit fill guides with `allowedDataKeys`, `requiredDataKeys`, valid examples, invalid examples, and common mistakes instead of falling through to a generic default, stage prompts are now schema-first with canonical schema as the highest-priority section and explicit `data.data` / alias-drift anti-pattern warnings, correction observability persists per-stage correction turn counts, errors, and outcomes through structured `workspace_same_session_correction` and `workspace_same_session_correction_result` build logs, the `persistWorkspaceGenerationAttemptLog` now records `sameSessionCorrections` / `sameSessionCorrectionErrors` / `sameSessionCorrectionFixed` / `sameSessionSessionId` on every attempt, and the live validation harness now includes `price`, `shopping`, `flight`, `security`, `campaign`, `jobsearch`, and `subscription` cases plus `ensureNoDataDataWrapper` schema-integrity checks across all template paths

Next actions:

1. Inspect the newly persisted `space_build_logs` / `telemetry_events` timing data plus raw stage-payload snapshots from green real-Hermes runs, especially across `template_hydration`, malformed JSON recovery, normalization-heavy templates, and `local-discovery-comparison -> event-planner` switch flows, before changing the pipeline again.
2. Keep the live suite as a hard release gate and extend it carefully when adding new template families or prompt-bound actions so new work cannot regress the current green representative set.
3. Tune prompt packets and context budgeting so the full assistant response plus normalized/raw artifacts remain available to hydration without pushing later stages back into timeout-heavy oversized prompts.
4. Keep semantic completeness as a hard gate and extend or tighten per-template minimum-content rules where real-machine usage reveals “ready” outputs that are still too weak to ship.
5. Remove or lower the temporary `90000ms` workspace-generation troubleshooting cap once enough evidence is captured to replace it with tighter per-stage budgets again.
6. Continue refining the highest-priority templates against real workflows, starting with Inbox Triage Board, Price Comparison Grid, Restaurant Finder, Coding Workbench, and Subscription Audit.
7. Revisit main web-bundle chunking if the current Vite warning starts affecting startup latency for the increasingly rich template gallery and dynamic Home workspace UI.

Open risks / decisions:

- SQLite is the default local store because it is the simplest practical local-first option and supports queryable history without requiring a separate service.
- Real Hermes sessions are now treated as profile-scoped via `HERMES_HOME`. Local associations still matter for migrated local sessions, recents, and restore state, but runtime session ownership must follow the active Hermes profile rather than a synthetic bridge-global model.
- The bridge currently starts via `tsx` for `pnpm start` and fixture runs. `pnpm build` still verifies the TypeScript compile, but packaging the bridge into a cleaner standalone runtime remains future work.
- `node:sqlite` is still marked experimental by Node. It is working locally now, but any Node runtime upgrade should be validated carefully.
- Legacy Electron snapshot import exists only for continuity. SQLite is the runtime source of truth after migration.
- Hermes provider onboarding now depends on the authoritative `hermes_cli_models/v2` contract emitted from Hermes Python internals. If that contract changes, update the shared protocol schema, CLI serialization, bridge integration, UI renderer, and Hermes-side contract tests together.
- Hermes still snapshots one active runtime model/base-URL configuration per profile, so the custom-endpoint adapter can legitimately appear connected whenever the active profile already has a reusable endpoint URL/API key configured. If Hermes later splits per-provider runtime snapshots, update the adapter-state contract, bridge consumption, and UI assumptions together instead of reintroducing bridge heuristics.
- Focused real-Hermes validation for the semantic-population-gated template path now only passes `prose` consistently. The current real-machine `comparison` and `action` cases still time out waiting for live Hermes chat output, `switch` still misses the terminal enriched state within the case budget, and `planning` can remain stuck on `legacy_content_v1` instead of promoting `dynamic_v1`. Treat those as real machine/runtime risks, not fixture noise.
- The template-repair stage is temporarily allowed to run up to `90000ms` so slow real-machine failures can be diagnosed from persisted timing logs. Treat that as a troubleshooting override, not the final tuned budget.
- Template enrichment now depends on sequential `selection -> text -> hydration -> actions -> validation/promotion` stages with stage-specific timeouts (`15s`, `45s`, `45s`, `30s`, and temporary `90s` repairs). Keep timeout classification, prompt packets, full-assistant-context injection, and persisted intermediate artifacts aligned with those stages instead of regressing to one-shot fill/repair assumptions.
- Semantic completeness is now a hard gate for `ready`, but the template-family minimum-content rules are still hand-tuned heuristics. Tighten them as real machine failures reveal weak or template-specific empty-success patterns, and do not relax them just to make builds look green.
- Automatic recovery is intentionally limited to mechanical JSON extraction and delimiter completion. Do not add semantic “best guess” repair that invents missing content or rewrites template meaning; if the payload is ambiguous, fail loudly and inspect the persisted raw attempt logs instead.
- The retired applet renderer is gone from the web bundle, but the experimental bridge-side applet modules still exist behind `HERMES_EXPERIMENTAL_WORKSPACE_APPLETS=1`. Production anti-regression tests cover the standard path today; full code deletion remains future cleanup.
- Reviewed shell execution remains intentionally narrow and read-only. Any expansion must update tests and the threat model together.
- Session rename/delete is intentionally hybrid: the bridge uses Hermes rename/delete when the CLI supports it, but local title overrides and soft-delete state remain the fallback source of truth so the browser can stay consistent even when a remote mutation is unavailable.
- Real email/tool workflows still depend on the active Hermes profile auth state and scopes. The bridge now pins email intents to the active profile and preloads `google-workspace` when available, but live results can still legitimately vary between a clean unread count and explicit auth guidance depending on the machine’s actual credentials.
- Authoritative onboarding is intentionally fail-loud. If the local Hermes runtime cannot provide valid `hermes_cli_models/v2` payloads, the bridge now blocks startup/provider setup with clean `MODEL_PROVIDER_REFRESH_FAILED`, `PROVIDER_AUTH_FAILED`, `PROVIDER_AUTH_POLL_FAILED`, `PROVIDER_CONNECT_FAILED`, or `MODEL_PROVIDER_UPDATE_FAILED` surfaces rather than falling back to TUI parsing.
- MiniMax and MiniMax China key validation now uses an Anthropic-style `/v1/messages` probe instead of `/models`, because their `/anthropic/models` path returns `404` even for bad keys. If those upstream APIs change again, update the CLI validator and its structured failure tests together.
- Hermes transcript export still does not provide stable request ids for bridge-originated chats. The bridge now reconciles imported request ids back onto persisted runtime requests using normalized user-turn preview/order heuristics; if Hermes export formats change materially, update this reconciliation logic and its regression coverage together.
- Transcript sanitization relies on explicit leak-pattern classification across live streaming and transcript import. If Hermes CLI/runtime output shapes change, update the sanitizer and its regression fixtures together instead of allowing new technical content into persisted chat messages.
- Nearby-place timeout handling currently depends on heuristic intent detection (`restaurant`, `nearby`, `hotel`, etc.) because Hermes does not expose a structured local-search mode. If search request shapes change materially, update the detector and its timeout/progress tests together.
- Direct source deletion is intentionally limited to entries whose inferred source is a Gmail message on the active Google Workspace profile. Other entry types only support local removal from the space until a bridge-safe delete contract exists for that integration.
- Async enrichment supersession now treats the active enrichment build request id as the primary freshness signal and falls back to baseline-attempt metadata plus timestamps when needed. If the space metadata model grows a dedicated async-enrichment request id, update that check and its regression coverage together instead of reintroducing retry self-supersession.
- `workspace_sdk/v1` is now the stable richer-workspace binding contract beneath the declarative DSL renderer. If SDK v2 or richer patch operations are added later, update protocol schemas, graph synthesis, DSL normalization, static validation, renderer expectations, and prompt examples together instead of widening only one layer.
- The restored top-level `Spaces` page is still a static gallery surface, but attached live spaces are now template-constrained through bridge/protocol contracts. Future work should keep gallery-only metadata separate from runtime template state and avoid reintroducing any freeform layout authoring path.
- The product now has two valid Spaces surfaces: the top-level template gallery and session-attached live spaces. Keep that distinction explicit in docs, telemetry, and future UX so the gallery does not get mistaken for a live workspace browser.
- Template-library metadata belongs only in the gallery and inspector surfaces. Keep attached live spaces limited to rendered workspace content plus operational controls, not template-selection guidance or capability badges.
- Template switching is only implemented concretely for `local-discovery-comparison -> event-planner` today. The registry/contract layer supports more transitions, but additional migrations still need explicit preserved-state rules before they should be enabled in production.
- Rebuild workspace now streams template retries to completion on the same action request because the browser does not subscribe to a separate background channel for post-action template promotion. Do not move retries back to fire-and-forget background queueing unless a durable live update channel or polling strategy exists first.
- Synchronized content representations are stored eagerly instead of derived lazily. If a new content representation is added later, update the single bridge-side sync pipeline, drift/integrity tests, and migration path together so stored variants do not diverge.
- GitHub Actions currently verifies this repo on Node 22 via `.github/workflows/ci.yml`. Local environments may differ, so CI-sensitive fixes should keep validating against the workflow-equivalent path (`pnpm exec playwright install --with-deps chromium`, `pnpm ci:full`) and rerun on Node 22 explicitly if a regression appears runner-specific.
- Legacy attached spaces created before refresh metadata existed now recover their refresh scope from space events plus transcript history. If Hermes export or event timing changes materially, keep that inference path and its regression coverage aligned instead of falling back to “latest user turn” behavior.
- The retired `dynamic-space-builder` is no longer part of the live request path. Keep the remaining compatibility readers/artifacts read-only until old persisted data no longer needs them, then delete them instead of letting preset-era logic drift back into production.
- The structured-only `hermes-space-data` artifact path intentionally allows only one short hidden reissue per request attempt, now including `retry_build`, and still relies on transcript sanitization to keep that technical prompt/runtime exchange out of the visible chat history. If Hermes transcript-import behavior changes, revalidate the sanitizer and artifact-generation coverage together.
- Hermes chat still does not expose a fully authoritative `--json` response mode for conversational/artifact generation, so the practical “structured-only channel” remains a dedicated bounded chat step with a strict marker-plus-balanced-JSON contract. Keep treating the dedicated step as the production channel, but do not pretend the CLI already exposes a native chat JSON transport until Hermes itself adds one.
- Hermes is still unreliable at emitting anything beyond the minimal seed contract. The bridge now ignores invalid optional hints/extensions and owns analysis/enrichment context locally, but base-seed schema failures can still force Markdown-only Home workspaces until Hermes eventually exposes a stronger native JSON channel.
- The implemented Workspace DSL renderer architecture deliberately keeps the current Home baseline as the primary reliability layer. Do not let any richer enrichment path replace that baseline until the normalization/rendering path has proven stable under repeated bad-output tests and real-machine telemetry.
- Runtime TSX applets remain in-repo only as dormant experimental code. Do not route standard production request, retry, or async enrichment flows back through applet generation unless the product architecture changes explicitly and the DSL-only regression suite is updated first.
- Hermes still lacks a first-class hard tool-disable mode for chat. The dormant experimental applet path keeps its separate single-turn path plus live-activity detection/abort logic; if Hermes later exposes an authoritative no-tools mode, adopt it there instead of weakening the current guardrail.
- Legacy `hermes-ui-workspaces` payloads still need to remain readable during rollout, and prompt-bound `space_delete` remains compatibility-backed today. Keep the compatibility parser and transcript sanitization paths alive until the new `hermes-space-data` contract is fully adopted by the Hermes runtime and fixture flows.
- Spaces are intentionally local, structured, and non-executable. Space data is rendered only through predefined Chakra renderers for content/table/card/markdown; arbitrary HTML/JS execution is out of scope and should stay blocked unless the threat model and tests are updated together.
- Workspace tabs remain extensible, but only the `content` tab ships today. If additional tab kinds return later, update the schema, migrations, normalization helpers, and regression coverage together instead of reintroducing partial To-Do/reminder state.
- Rich link/image extraction across markdown/table/card synchronization is heuristic. If Hermes structured output shapes change materially, update the normalization pipeline and the content-renderer regression fixtures together.
- The nearby-search slowdown diagnosed on 2026-04-10 was mostly upstream Hermes/tool behavior rather than workspace-block parsing. The bridge prompt now biases heavily against `execute_code`/`read_file` loops for local-search intents, but provider/tool latency can still vary in real environments.
- Real headless-browser automation against a live Hermes environment can take materially longer than fixture-mode startup. The repo has fixture-backed UI coverage plus real bridge validation, but a dedicated slow-timeout live-browser smoke path is still optional future work.
- Combined-workspace chat-pane collapse is intentionally page-local UI state for now. It resets when the active session or attached space changes and does not widen the persisted bridge/UI-state contract unless later operator feedback justifies that complexity.
- This pass fixes the keystroke hotspot by isolating draft state and memoizing historical transcript rows, but it does not yet virtualize the transcript list; initial render and scroll cost still scale with full history length until windowing is added.
- `pnpm build` currently passes with a non-blocking Vite chunk-size warning on the main web bundle. Keep an eye on bundle growth as more dynamic-space sections/actions are added.
- `compiled_home`, `space_ui/v1`, and `space_ui/v2` remain compatibility-only persisted artifacts for older data. Do not reintroduce them into the live request path; remove them entirely once live/runtime and fixture adoption no longer needs the compatibility reader.

## Verification log

- Verification completed for the 2026-04-13 staged template-generation pass with:
  - `pnpm --filter @hermes-workspaces/bridge typecheck`
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm test -- apps/bridge/src/services/hermes-bridge-service.test.ts apps/bridge/src/server.test.ts`
  - `pnpm test -- apps/bridge/src/services/hermes-bridge-service.test.ts`
  - `pnpm test:integration`
  - regression coverage confirming:
    - template enrichment now executes sequential selection, text/content, actions/buttons, validation, and promotion stages
    - later stages consume persisted intermediate artifacts instead of regenerating the whole workspace from scratch
    - stage-specific repair failures surface as `template_text_repair_failed` / `template_actions_repair_failed` with preserved baseline Home content
    - timeout failures now classify against the correct stage-specific budget instead of comparing every template stage to the old global cap
    - unexpected queued template-generation exceptions are finalized into failed builds instead of leaving `template_enrichment` rows stuck in `running`
- Verification completed for the 2026-04-13 Home workspace observability and temporary repair-timeout pass with:
  - `pnpm test -- apps/bridge/src/services/hermes-bridge-service.test.ts`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - regression coverage confirming:
    - template-driven Home workspace builds now persist structured per-stage timing records plus final summaries directly in `space_build_logs`
    - timeout failures now emit durable stage-specific telemetry with configured vs recommended timeout budgets, attempt kind, build/session/request/template identity, and original diagnostics
    - the bounded template-repair stage now uses the temporary `90000ms` internal cap while keeping the existing timeout-category semantics intact
- Verification completed for the 2026-04-12 workspace SDK framework pass with:
  - `pnpm --filter @hermes-workspaces/protocol build`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - regression coverage confirming:
    - richer Home workspaces now persist a versioned workspace graph plus patch delta instead of relying only on ad hoc render-tree metadata
    - applet manifest synthesis derives collections, tabs, and patch usage locally from static source analysis without a Hermes manifest round-trip
    - verifier rules fail closed on non-literal collection, tab, action, and patch identifiers while keeping the baseline Home workspace active
    - browser and bridge fixtures consume the widened manifest/workspace-model contract without regressing async baseline-first Home behavior
- Verification completed for the 2026-04-12 baseline-Home then Workspace Applet cutover with:
  - `pnpm exec playwright install --with-deps chromium`
  - `pnpm ci:full`
  - direct verification reruns of:
    - `pnpm lint`
    - `pnpm typecheck`
    - `pnpm test`
    - `pnpm build`
  - regression coverage confirming:
    - the retired preset-era production path stays removed while every request still creates or updates a usable baseline Home workspace
    - rich workspace activation now happens only through promoted Workspace Applets, and failed seed/applet stages leave the baseline Home workspace active
    - the fixture/browser E2E contract now matches the stabilized Home-baseline behavior, current runtime-activity copy, and session-space indicators without depending on old preset titles or card layouts
- Verification completed for the Home-baseline workspace applet architecture pass on 2026-04-12 with:
  - `pnpm --filter @hermes-workspaces/protocol build`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - targeted regression coverage confirming:
    - every request still produces a usable Home baseline even when richer promotion stages fail
    - `compiled_home` rows remain compatibility-only while live rich upgrades now persist only `applet` build rows in the active request path
    - the bridge verifies workspace applets through static validation, capability checks, TypeScript typecheck, generated tests, render smoke, and small-pane smoke before promotion
    - applet failures leave the baseline Home workspace active and visible, while successful applet experiments render through the trusted Chakra renderer and route approved bridge actions through the promoted applet artifacts when that dormant path is explicitly enabled
- Verification completed for the 2026-04-13 Workspace DSL renderer pivot with:
  - `pnpm --filter @hermes-workspaces/protocol build`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm test:integration`
  - `pnpm ci:full`
  - targeted regression reruns of:
    - `pnpm exec playwright test apps/web/e2e/app.spec.ts -g "shows the baseline Home workspace immediately and fills richer sections asynchronously"`
    - `pnpm exec playwright test apps/web/e2e/app.spec.ts -g "runs a prompt-bound workspace action and updates the attached Home workspace|keeps the baseline Home workspace visible when async enrichment times out at the scoped enrichment budget"`
  - regression coverage confirming:
    - the primary rich-workspace path now uses declarative `workspace_dsl` artifacts plus deterministic bridge-side normalization and local Chakra rendering instead of runtime TSX generation
    - retries and async enrichment promotion now key off the active `dsl_enrichment` build request id without re-entering live task execution
    - prompt-bound workspace actions, async ghost rendering, timeout/degraded states, and baseline-preserving enrichment failures still work end to end after the DSL pivot
- Verification completed for the 2026-04-13 DSL-only production cutover with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm ci:full`
  - `pnpm build` completed inside `pnpm test:integration` and `pnpm ci:full`
  - regression coverage confirming:
    - standard production request, retry, and async enrichment flows no longer invoke runtime applet source generation or emit `SPACE_APPLET_*` telemetry
    - `WorkspaceDslRenderer` is the only active rich renderer in the standard product path, while `WorkspaceAppletRenderer` remains dormant experimental code only
    - the scoped async-only `90000ms` enrichment budget is resolved through `HERMES_ASYNC_WORKSPACE_ENRICHMENT_TIMEOUT_MS` with the legacy alias preserved, and baseline Home workspaces remain visible when DSL enrichment degrades or times out
    - representative prose, comparison, inbox-style, nearby-search, and prompt-bound action workspaces remain covered end to end without surfacing the legacy `Markdown` / `Table` / `Cards` controls
- Verification completed for the 2026-04-13 Spaces template-library pass with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - regression coverage confirming:
    - the left rail now exposes a top-level `Spaces` nav destination again and opening it renders a deterministic template gallery rather than a live runtime workspace
    - protocol and bridge UI-state persistence now accept and restore `currentPage: "spaces"` instead of coercing it back to `chat`
    - the gallery ships 20 curated templates with required metadata, population/update instructions, preview fixtures, and shared preview primitives
    - representative templates render and remain actionable in a small pane, and the detail inspector/drawer exposes the later-Hermes fill contract instead of freeform layout authoring
- Verification completed for the artifact-only workspace applet correction pass on 2026-04-12 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - regression coverage confirming:
    - applet source/repair generation now uses only persisted Home artifacts plus local bridge analysis and never reuses the live chat path
    - live-task activity during applet generation is treated as a hard contract violation and classified explicitly instead of being allowed to continue
    - baseline-only Home workspaces can run `retry-build` through the public bridge action stream, and that retry path reuses persisted artifacts without rerunning the original task or baseline update
- Verification completed for the local applet-manifest synthesis correction pass on 2026-04-12 with:
  - `pnpm --filter @hermes-workspaces/protocol build`
  - `pnpm exec vitest run apps/bridge/src/hermes-cli/client.test.ts apps/bridge/src/services/spaces/workspace-applet-manifest.test.ts apps/bridge/src/services/hermes-bridge-service.test.ts apps/bridge/src/services/spaces/workspace-applet-verifier.test.ts`
  - regression coverage confirming:
    - Hermes is no longer called for applet manifest/plan generation
    - the bridge synthesizes manifest/plan/test artifacts locally from persisted Home artifacts plus TSX source analysis
    - blocked live-task source failures do not trigger a second repair call
- Verification completed for the dual-channel space reliability and UX pass on 2026-04-11 with:
  - `pnpm --filter @hermes-workspaces/protocol build`
  - `pnpm vitest run --config vitest.unit.config.ts apps/web/src/App.test.tsx apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
  - `pnpm vitest run apps/bridge/src/hermes-cli/client.test.ts apps/bridge/src/services/hermes-bridge-service.test.ts apps/bridge/src/server.test.ts`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - regression coverage confirming:
    - every chat request now attempts to create or update an attached space, promoting a rich dynamic build when a structured artifact is available and otherwise persisting a Markdown fallback space instead of failing closed
    - the production artifact path now uses a dedicated structured-only step that prefers raw JSON, preserves marker-plus-balanced-JSON parsing only for compatibility, and classifies empty-payload / marker-only / missing-marker / invalid structured responses explicitly
    - retry, refresh, and prompt-bound action flows all reuse the same persisted build lifecycle, including a distinct retry build row, one bounded structured-only reissue, sanitized fallback artifacts, and explicit failed-build UI instead of an endless spinner
- Verification completed for the Home-baseline reliability and shell polish pass on 2026-04-12 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - regression coverage confirming:
    - every request now creates or updates a Home baseline space from the assistant answer before any optional rich enrichment runs
    - dynamic build failures keep baseline content visible and switch the attached space UI into an explicit failed-construction state instead of leaving a spinner running
    - sessions expose `Type` values (`Home` / `TUI`), recent-session rows render title plus message-count/time metadata only, and Hermes Home branding/logo render in both the shell header and sidebar
    - Settings now split Access audit and Troubleshooting telemetry into separate paginated internal-scroll tabs, runtime readiness stays in a distinct checking/spinner state until authoritative detection resolves, and Tool History keeps both histories internally scrollable with stable pagination controls
    - `pnpm build` still emits the existing non-blocking Vite chunk-size warning for the main web bundle, but the build succeeds cleanly
- Verification completed for the structured-only dynamic-space reliability pass on 2026-04-11 with:
  - `pnpm vitest run apps/bridge/src/services/spaces/dynamic-space-builder.test.ts apps/bridge/src/services/hermes-bridge-service.test.ts`
  - `pnpm vitest run apps/bridge/src/database.test.ts apps/bridge/src/server.test.ts`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - regression coverage confirming:
    - `hermes-space-data` extraction now supports a strict structured-only mode, treats missing closing fences as optional, and classifies missing-marker, empty-payload, missing-JSON, unbalanced-JSON, invalid-JSON, and schema-invalid failures explicitly
    - required-space and `retry_build` flows now run a dedicated structured-only Hermes artifact step with one bounded reissue, preserve the user-facing answer, and persist new failed/ready build attempts deterministically
    - legacy `hermes-ui-workspaces` compatibility still applies when it already created a meaningful attached space, so the dynamic builder no longer overwrites working legacy results with a failed fallback shell
- Verification completed for the dynamic-space-builder pass on 2026-04-11 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - fixture-backed regression coverage confirming:
    - dynamic spaces persist versioned build rows, isolated artifacts, and build logs across reopen, while interrupted in-flight builds are marked failed safely on restart
    - bridge chat, refresh, retry, and prompt-bound action flows emit `space_build_progress`, persist prompt/intent/raw/normalized/UI/action/test artifacts, and only promote ready builds after the declarative harness passes
    - the browser renders `Building space…`, failure, retry, and safe fallback states for dynamic spaces and updates attached spaces in place through the new `/api/spaces/:id/actions/stream` path
    - protocol/docs/README coverage now matches the shipped `hermes-space-data` first-pass contract plus local second-pass builder architecture
- Verification completed for the chat-composer/transcript performance pass on 2026-04-11 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - focused regression coverage confirming:
    - `ChatComposer` now owns the live draft locally, submits `onSend(content)` on Enter, preserves Shift+Enter newlines, and only clears after the parent accepts the send
    - typing into the composer no longer rerenders sibling transcript work in the component tests
    - unchanged historical transcript markdown stays memoized while typing-status labels or assistant draft text update
    - the app-level chat flow still renders the composer, startup runtime gate, and existing session/chat behaviors without regression
- Verification completed for the authoritative startup/onboarding cleanup pass on 2026-04-11 with:
  - `pnpm exec playwright install --with-deps chromium`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - live bridge/browser API validation against the local Hermes install:
    - `pnpm --filter @hermes-workspaces/bridge start -- --port 40179 --static-dir ../web/dist`
    - `curl -s http://127.0.0.1:40179/api/bootstrap`
    - `curl -s 'http://127.0.0.1:40179/api/model-providers?profileId=8tn'`
  - live Hermes CLI validation against the local install:
    - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes models --json`
    - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes models inspect --provider openrouter --json`
    - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes models auth --provider nous --json`
    - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes models auth --provider nous --poll --auth-session-id nous:117b336b587b --json`
    - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes models connect --provider minimax --api-key invalid-minimax-key --json`
    - `cd /Users/jozefbarton/.hermes/hermes-agent && venv/bin/pytest -q tests/test_models_json_contract.py`
  - regression coverage confirming:
    - healthy startup/provider discovery now succeeds from the authoritative backend without a manual Settings recovery loop
    - startup stays in a checking state during transient/discovery-pending authoritative races and automatically unblocks once discovery resolves
    - persistent authoritative startup failures now render one clean blocked state instead of stacked blocker banners
    - bridge product flow no longer carries user-facing TUI probing helpers, and product-path tests fail if legacy Expect/TUI probing is invoked
    - `models_json.py` now serializes adapter/state output instead of acting as a provider metadata encyclopedia
    - authoritative provider adapters own provider connection/auth/validation/model-list behavior, including structured `invalid_credentials` for MiniMax and authoritative device-auth state for Nous
    - the shared protocol accepts nullable optional fields from Hermes JSON while normalizing them before the bridge/UI consume the contract
    - temporary live auth-session state created during the Nous auth start/poll check was restored afterward so the local profile auth store was left unchanged

- Verification completed for the authoritative Hermes provider-onboarding refactor on 2026-04-10 with:
  - `pnpm exec playwright install --with-deps chromium`
  - `pnpm exec vitest packages/protocol/src/index.test.ts apps/bridge/src/hermes-cli/client.test.ts --run`
  - `pnpm exec vitest apps/bridge/src/server.test.ts --run`
  - `pnpm exec vitest --config vitest.unit.config.ts apps/web/src/App.test.tsx --run`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - live Hermes CLI validation against the local install:
    - `hermes models --json`
    - `hermes models inspect --provider openrouter --json`
    - `hermes models auth --provider nous --json`
    - `hermes models auth --provider nous --poll --auth-session-id <returned-id> --json`
    - `hermes models connect --provider minimax --api-key invalid-key --json`
    - `hermes models disconnect --provider nous --json`
    - Hermes CLI contract tests under the installed runtime environment:
      - `/Users/jozefbarton/.hermes/hermes-agent/venv/bin/python -m pytest -o addopts='' /Users/jozefbarton/.hermes/hermes-agent/tests/test_models_json_contract.py -q`
  - regression coverage confirming:
    - the shared protocol now strictly validates the authoritative Hermes discovery/auth/auth-poll/connect/configure/disconnect payloads and rejects extra fields
    - the bridge uses only authoritative Hermes backend state for runtime readiness, provider inspection, auth, connect, configure, and disconnect flows, and product-path tests fail if Expect/TUI probing is invoked
    - Settings/provider drawers now render setup steps, config fields, auth sessions, model lists, readiness, and clean connection errors directly from authoritative structured state without leaking raw CLI/TUI output
    - OpenRouter remains select-only from authoritative discovered model lists, Nous exposes the exact authoritative verification URL and auth-poll status, and MiniMax invalid keys now fail through a structured invalid-credentials path without storing the bad credential
    - authoritative provider disconnect now clears pending Nous device-auth state so startup readiness and Settings inspection do not get stuck behind a stale waiting-for-verification session
    - temporary live-validation auth state written to `~/.hermes/auth.json` was cleaned after verification so local Hermes onboarding state was left unchanged
- Verification completed for the collapsible attached-space chat-pane pass on 2026-04-10 with:
  - `pnpm exec playwright install --with-deps chromium`
  - `pnpm exec vitest run --config vitest.unit.config.ts apps/web/src/App.test.tsx -t "collapses the attached-space chat pane into a right-side rail and reopens it on demand"`
  - `pnpm exec vitest run --config vitest.unit.config.ts apps/web/src/App.test.tsx`
  - `pnpm --filter @hermes-workspaces/web build`
  - `pnpm exec playwright test apps/web/e2e/app.spec.ts -g "creates a session-attached space, opens the combined workspace layout, and preserves the session after deleting the space"`
  - `pnpm ci:full`
  - regression coverage confirming:
    - attached-space chat can collapse into a slim right-side rail without breaking the combined workspace layout
    - the collapsed rail keeps runtime activity reachable, and the runtime drawer now has an explicit close button in both fixture-browser and unit-test paths
    - expanding the rail restores the transcript and composer before further attached-space updates, runtime focus, or deletion flows continue
- Verification completed for the same-timestamp transcript-ordering CI fix on 2026-04-10 with:
  - `pnpm exec playwright install --with-deps chromium`
  - `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/database.test.ts apps/bridge/src/services/hermes-bridge-service.test.ts`
  - `pnpm lint`
  - `pnpm test`
  - `pnpm ci:full`
  - `npx -y nve 22 pnpm ci:full`
  - regression coverage confirming:
    - transcript-visible messages preserve insertion order when persisted messages share the same timestamp
    - runtime request `messageIds` preserve that same insertion order
    - attached-space refresh no longer flakes by placing the assistant reply ahead of the synthetic refresh prompt when both rows share one timestamp
- Verification completed for the aligned-entry space-content hardening pass on 2026-04-10 with:
  - local SQLite inspection of the most recent slow nearby-search request plus persisted runtime activity/telemetry review
  - `pnpm exec vitest run --config vitest.unit.config.ts packages/protocol/src/index.test.ts`
  - `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/services/hermes-bridge-service.test.ts`
  - `pnpm exec vitest run --config vitest.unit.config.ts apps/web/src/ui/organisms/SessionSpacePanel.test.tsx`
  - `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/server.test.ts`
  - `pnpm exec playwright test apps/web/e2e/app.spec.ts -g "creates a session-attached space, opens the combined workspace layout, and preserves the session after deleting the space"`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - regression coverage confirming:
    - content tabs now preserve aligned `entries[]` metadata, shared markdown section headings, and synchronized markdown/table/card storage even after removing individual entries
    - markdown blocks, table rows, and cards each expose per-entry removal controls, tables support sorting plus bulk selection/removal, and Gmail-backed rows surface bulk/per-entry `Delete email` actions
    - bridge-side source deletion removes Gmail-backed entries only after the source delete succeeds, keeps failures user-friendly, and records telemetry when provider/auth deletion fails
    - the HTTP `POST /api/spaces/:spaceId/entries/actions` route persists entry removals correctly and does not recreate deleted content from stale synchronized views
    - the fixture-backed combined session+space browser flow now covers removing a single card entry, persisting that removal across reload, and still preserving the parent session after the space is later deleted
    - the 9-minute nearby-search stall was traced to repeated `find-nearby`, `execute_code`, and `read_file` loops in Hermes runtime activity rather than workspace-block parsing, and the local-search prompt now explicitly blocks that repo/code-inspection pattern
- Verification completed for the MVP polish/content-refresh/To-Do-removal pass on 2026-04-10 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - regression coverage confirming:
    - markdown/table/card views now render more intentionally, GFM autolinks websites/emails, cards expose button-style links plus optional small images, and tables remain compact and image-free
    - attached-space Refresh reruns the latest structured session prompt while preserving the existing session-space linkage, and content-format switches stay silent
    - runtime preview messaging now reflects terminal/skill/search/workspace activity instead of a generic composing label
    - To-Dos, reminder jobs, and delivery-integration plumbing are removed from protocol/bridge/database/UI/test coverage, while legacy todo tabs migrate back into content safely
    - later user turns can improve local auto-titles without overwriting explicit renames, and destructive delete flows no longer leave the page inert after session deletion
- Verification completed for the All sessions deletion-pagination polish pass on 2026-04-10 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - deleting the only visible session on a later All sessions page now clamps the UI back to the previous valid page instead of leaving the operator on an empty invalid page
- Verification completed for the synchronized content/readiness/implicit-space hardening pass on 2026-04-10 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - content tabs now persist synchronized markdown/table/card representations with drift-resistant normalization and migration from old single-representation rows
    - switching the visible content view no longer mutates or degrades the stored content representations
    - startup runtime readiness suppresses stale cached blockers, automatically refreshes provider discovery, and unblocks the app without a manual refresh when Hermes is actually ready
    - natural-language structured-result prompts such as restaurants, hotels, plans, comparisons, finance lists, and to-dos auto-create or update a populated attached space in the same request
    - shell-only/incomplete structured space writes are rejected cleanly, rolled back, and surfaced only through the generic user-facing failure message
    - markdown rendering now formats structured result sets into readable bullets/blocks, while markdown-to-table/card synchronization preserves separate list items for plain bullet lists
    - Playwright now covers implicit attached-space creation from a natural restaurant query with reload persistence in the combined session+space layout
- Verification completed for the GitHub Actions pnpm bootstrap fix on 2026-04-10 with:
  - workflow audit of `.github/workflows/ci.yml`
  - `pnpm ci:full`
  - validation confirming the CI job now installs `pnpm/action-setup@v4` before `actions/setup-node@v4` cache resolution and still runs the existing install, Playwright browser setup, and full verification chain cleanly

- Verification completed for the browser/bridge architectural reset on 2026-04-08 with:
  - `hermes profile list`
  - `hermes profile show 8tn`
  - `hermes profile show jbarton`
  - `hermes sessions list --limit 10`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
- Verification completed for the profile-scoped bridge hardening and UX/security follow-up on 2026-04-09 with:
  - `hermes profile list`
  - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes sessions list --limit 10`
  - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/jbarton hermes sessions list --limit 10`
  - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes sessions export - --session-id 20260408_230808_2b2a2b`
  - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/jbarton hermes sessions export - --session-id 20260408_230808_2b2a2b`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - real-machine bridge validation against the local Hermes install confirming:
    - profiles `default`, `8tn`, and `jbarton`
    - default-profile bootstrap state plus distinct `8tn`/`jbarton` session histories from the real Hermes CLI
    - profile-filtered session lists with hidden synthetic counts for `jbarton` and `8tn`
    - correct-profile transcript export plus wrong-profile `SESSION_PROFILE_MISMATCH` rejection for a real `8tn` session
    - runtime progress and activity SSE events during a live unread-email request
    - a real unread-email assistant response for `8tn` plus a clean active-profile outcome for `jbarton` without tool inventory leakage or max-iteration leakage
    - browser-side profile switching, right-side runtime activity rendering, and settings dangerous-control visibility on a live bridge
- Verification completed for the product-complete polish pass on 2026-04-09 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - `hermes profile list`
  - `hermes profile show 8tn`
  - `hermes profile show jbarton`
  - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/8tn hermes sessions list --limit 5`
  - `HERMES_HOME=/Users/jozefbarton/.hermes/profiles/jbarton hermes sessions list --limit 5`
  - `pnpm --filter @hermes-workspaces/bridge start -- --port 40179 --static-dir ../web/dist`
  - `curl -s http://127.0.0.1:40179/api/health`
  - `curl -s http://127.0.0.1:40179/api/bootstrap`
  - `curl -s 'http://127.0.0.1:40179/api/sessions?profileId=jbarton&page=1&pageSize=3&search='`
  - `curl -s 'http://127.0.0.1:40179/api/skills?profileId=jbarton'`
  - `curl -s http://127.0.0.1:40179/ | head -n 5`
  - fixture-backed regression coverage confirming:
    - runtime/tool/skill/CLI output does not render in the visible chat transcript
    - Hermes typing bubbles stay visible until the final assistant message resolves
    - runtime activity resets to the newest request and can be refocused by clicking transcript bubbles
    - session rename/delete flows work end to end, including hidden-after-delete behavior
    - skills delete uses a permanent warning modal and removes the deleted skill from the UI immediately
    - Settings render as horizontal tabs with internal scrollable panels
    - unread-email requests stay user-facing in chat while runtime diagnostics stay in the activity pane
    - Playwright now boots a dedicated isolated fixture bridge port instead of reusing an arbitrary existing local server
  - read-only real-machine bridge validation confirming:
    - the live bridge served the built browser shell at `/`
    - `/api/bootstrap` returned real profiles `default`, `8tn`, and `jbarton`
    - `/api/sessions` returned real profile-scoped `jbarton` sessions plus hidden synthetic counts
    - `/api/skills` returned Hermes-backed runtime skills including `google-workspace`
- Verification completed for the Spaces/runtime hardening pass on 2026-04-09 with:
  - `hermes profile list`
  - `hermes profile show 8tn`
  - `hermes profile show jbarton`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - `BRIDGE_DB_PATH=/tmp/hermes-workspaces-live-sEcuEA/bridge.sqlite pnpm --filter @hermes-workspaces/bridge start -- --port 40189 --static-dir ../web/dist`
  - `curl -s http://127.0.0.1:40189/api/bootstrap`
  - `curl -s 'http://127.0.0.1:40189/api/model-providers?profileId=jbarton&inspectedProviderId=openrouter'`
  - `curl -s 'http://127.0.0.1:40189/api/model-providers?profileId=jbarton&inspectedProviderId=anthropic'`
  - `curl -s -X POST http://127.0.0.1:40189/api/spaces -H 'Content-Type: application/json' ...`
  - `curl -s 'http://127.0.0.1:40189/api/spaces?profileId=jbarton'`
  - `curl -s -X POST http://127.0.0.1:40189/api/spaces/space-c4a5b28b-6e99-4547-b367-33e20952d39f/open-chat -H 'Content-Type: application/json' ...`
  - `curl -s 'http://127.0.0.1:40189/api/spaces/space-c4a5b28b-6e99-4547-b367-33e20952d39f?profileId=jbarton'`
  - `curl -s -X PUT http://127.0.0.1:40189/api/settings -H 'Content-Type: application/json' -d '{"restrictedChatMaxTurns":32}'`
  - `POST /api/chat/stream` against real profile `8tn` for live unread-email validation
  - `curl -s 'http://127.0.0.1:40189/api/sessions/30aedda5-6ab2-41bc-bc17-360b972c9109/messages?profileId=8tn'`
  - read-only real-machine bridge validation confirming:
    - runtime-discovered provider labels/descriptions no longer leak traceback fragments into model choices, and providers without safe model discovery now fall back to manual model entry cleanly
    - a real local space persisted across bridge restart, retained its linked chat session, and exposed structured `space_events`
    - a real unread-email request for `8tn` completed with the transcript-visible assistant answer `You have 2 unread emails right now.`
    - the persisted transcript for that live chat contained only the clean user question plus the assistant answer, while tool/skill/runtime details remained runtime-only messages
- Verification completed for the settings/transcript/runtime/session reconciliation pass on 2026-04-09 with:
  - `hermes profile list`
  - `hermes profile show 8tn`
  - `hermes profile show jbarton`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm test:integration`
  - `pnpm security`
  - `pnpm ci:full`
  - `BRIDGE_DB_PATH=/tmp/hermes-live-lKpiSA/bridge.sqlite pnpm --filter @hermes-workspaces/bridge start -- --port 58973 --static-dir ../web/dist`
  - `curl -s http://127.0.0.1:58973/api/bootstrap`
  - `curl -s 'http://127.0.0.1:58973/api/model-providers?profileId=jbarton'`
  - `curl -s 'http://127.0.0.1:58973/api/model-providers?profileId=jbarton&inspectedProviderId=openrouter'`
  - `curl -s 'http://127.0.0.1:58973/api/model-providers?profileId=jbarton&inspectedProviderId=anthropic'`
  - `curl -s 'http://127.0.0.1:58973/api/skills?profileId=jbarton'`
  - `curl -s -X PUT http://127.0.0.1:58973/api/model-providers -H 'Content-Type: application/json' -d '{"profileId":"jbarton","provider":"openrouter","defaultModel":"openai/gpt-5.4","maxTurns":151}'`
  - `curl -s -X PUT http://127.0.0.1:58973/api/model-providers -H 'Content-Type: application/json' -d '{"profileId":"jbarton","provider":"openrouter","defaultModel":"openai/gpt-5.4","maxTurns":150}'`
  - `curl -s -X POST http://127.0.0.1:58973/api/sessions -H 'Content-Type: application/json' ...`
  - `curl -s -X POST http://127.0.0.1:58973/api/sessions/.../rename -H 'Content-Type: application/json' ...`
  - `curl -s -X POST http://127.0.0.1:58973/api/sessions/.../delete -H 'Content-Type: application/json' ...`
  - `curl -s -X POST http://127.0.0.1:58973/api/spaces -H 'Content-Type: application/json' ...`
  - `curl -s -X PUT http://127.0.0.1:58973/api/spaces/... -H 'Content-Type: application/json' ...`
  - `curl -s -X POST http://127.0.0.1:58973/api/spaces/.../open-chat -H 'Content-Type: application/json' ...`
  - `curl -s -X POST http://127.0.0.1:58973/api/spaces/.../delete -H 'Content-Type: application/json' ...`
  - `curl -s -X PUT http://127.0.0.1:58973/api/ui-state -H 'Content-Type: application/json' -d '{"currentPage":"spaces"}'`
  - `POST /api/chat/stream` against real profile `8tn` for live unread-email validation
  - `curl -s 'http://127.0.0.1:58973/api/sessions/52245a78-2e2e-4149-b930-1df0943c8fbb/messages?profileId=8tn'`
  - `curl -s 'http://127.0.0.1:58973/api/sessions/52245a78-2e2e-4149-b930-1df0943c8fbb/export?profileId=8tn'`
  - `curl -s 'http://127.0.0.1:58973/api/telemetry?profileId=8tn&sessionId=52245a78-2e2e-4149-b930-1df0943c8fbb&limit=20'`
  - `pnpm exec node <<'NODE' ... require('@playwright/test') ... NODE`
  - read-only real-machine bridge/browser validation confirming:
    - the Settings page opened in a live browser without the `Runtime configuration failed` schema error, and the `Model / Provider` tab rendered runtime-discovered provider rows for `OpenRouter`
    - runtime model/provider saves round-tripped through Hermes for `jbarton` and restored the original `maxTurns` value after validation
    - skills returned persisted compact summaries for live Hermes skills on `jbarton`
    - recent-session inline rename worked in the live sidebar UI, and the persisted recent-session order kept the renamed local session visible at the top of the compact recent list
    - `currentPage: "spaces"` round-tripped through `/api/ui-state` without enum/schema mismatch, and the live browser rendered the `Spaces` page with no page errors
    - local Spaces create/update/open-chat/delete completed against the live bridge, preserved `space_events`, and cleared `activeSpaceId` after delete
    - a real unread-email request for `8tn` completed with the transcript-visible assistant answer `You have 3 unread emails right now.`
    - the live persisted transcript for that unread-email session contained only the user question plus the assistant answer, while tool/skill/runtime messages remained `visibility: "runtime"`
    - the unread-email session reloaded with a single reconciled runtime request, no duplicate imported request bucket, zero unresolved activity rows, and a persisted `SESSION_REQUESTS_RECONCILED` telemetry record
- Verification completed for the Spaces/provider parsing stabilization pass on 2026-04-09 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - mixed prose plus fenced `hermes-ui-workspaces` payloads create valid table/card/markdown spaces without leaking the technical block into the transcript
    - malformed workspace payloads record parse telemetry and fall back to the generic transcript-visible failure message instead of creating broken/undefined spaces
    - OpenRouter now renders a select-or-blocked model configuration path rather than a freeform model text box when discovery is unavailable
    - provider setup steps choose the most actionable verification link from multiple candidates, including the device-verify URL for Nous
    - invalid provider credentials keep the drawer open, show a visible local error banner, and persist raw diagnostic detail only in telemetry
    - persisted Spaces still reload, open chat, and delete cleanly after the mixed-prose parsing hardening, while a restored active-space selection can still switch immediately to another card in the browser shell
- Verification completed for the timeout/runtime-config/theme/tool-history stabilization pass on 2026-04-09 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - persisted timeout settings now cover normal chat, search/discovery, nearby/local-search, structured space operations, and unrestricted access
    - the top-right theme toggle applies optimistically without an immediate bootstrap/settings flip-back in the browser tests
    - the main pane blocks cleanly when Hermes has no usable provider/model while Settings remain reachable for guided remediation
    - Tools no longer expose the Reviewed Shell Runner UI, while Tool History still shows runtime activity and reviewed bridge-execution history semantics correctly
    - telemetry rows render in a denser compact layout, provider drawers render guided setup steps, and local drawer failures do not force a global reset
    - chat failures persist only the generic transcript-visible message `Hermes ran into an issue. Check the logs for more information.` while raw details remain in telemetry/runtime activity
    - Hermes-managed space creation uses the narrower space timeout/prompt contract and unrestricted requests honor the larger unrestricted timeout policy
- Verification completed for the transcript/runtime/settings regression-hardening pass on 2026-04-09 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - transcript persistence strips bridge execution notes, raw system messages, JSON/tool output, script/code dumps, and file/path errors before messages reach SQLite or reload/export paths
    - runtime activity rows receive timestamps, finalize deterministically on request completion/error, persist by request/message association, and restore after navigating away/back or clicking transcript messages
    - the left nav stays fixed-width with no horizontal scrolling, recent-session text truncates cleanly, and rename dialogs close/save/cancel without leaving the page non-interactive
    - provider/model drawers render discovered configuration fields, disable missing/unavailable providers and models, and hide unsupported reasoning-effort controls
    - `/api/telemetry` loads persisted troubleshooting data into Settings, theme mode is applied before first paint, `currentPage: "spaces"` persists/reloads cleanly, and skill summaries are generated/persisted/removed with skill lifecycle changes
- Verification completed for the provider/tool-history/Spaces hardening pass on 2026-04-09 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - provider Configure opens with an initialized provider context, shows drawer-local loading/error states, and no longer regresses to `No provider selected` or a global Settings reset
    - Tool History renders Hermes runtime activity separately from reviewed bridge executions and shows runtime tool history after chat activity
    - nearby-place search requests no longer fail under the old 45-second timeout path, emit search progress, and persist runtime tool history plus request lifecycle telemetry
    - session auto-titles derive deterministically from the first user turn without overwriting later user renames
    - manual space-creation controls are removed from the UI, Hermes-created spaces render as cards, malformed `hermes-ui-workspaces` blocks do not create broken spaces, and mixed-prose blocks log telemetry while still creating valid spaces
    - provider/config failures, workspace-parse failures, and request lifecycle events are queryable through `/api/telemetry`
    - compact skill summaries are visible in the Skills UI during Playwright coverage
- Verification completed for the Spaces UX/reliability pass on 2026-04-09 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - malformed outer `hermes-ui-workspaces` fences that still contain a valid inner payload recover cleanly for table/card/markdown spaces without showing a failed user-facing parse state
    - the dedicated Spaces flow persists across reload because linked-session hydration no longer flips the stored page back to `chat`
- Verification completed for the session-attached Spaces architecture pass on 2026-04-09 with:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:integration`
  - `pnpm build`
  - `pnpm security`
  - `pnpm ci:full`
  - fixture-backed regression coverage confirming:
    - session/space persistence now supports zero-or-one attached spaces per session, safe migration from the old top-level Spaces model, and future-safe canonical `content` / `todos` tab normalization
    - the left rail no longer exposes a top-level `Spaces` section, recent/all-session lists show attached-space indicators, and opening an attached-space session yields the compact combined workspace layout without a redundant page header
    - attached spaces render a compact top area, content-format chips, dedicated `Content` / `To-dos` tabs, interactive To-do reminder behavior, and runtime-drawer focus from transcript clicks without modal/focus regressions
    - malformed outer workspace fences that still contain a valid inner payload recover without a user-facing failure, while unrecoverable payloads log telemetry and never create broken spaces
    - model configuration remains select-only with polite blocked states when discovery is unavailable, and provider drawers keep actionable URLs and visible drawer-local failure banners
    - the left rail collapses into an icon-only mode without breaking navigation affordances or internal-scroll layout
    - attached-space sessions reuse their primary session instead of creating a second linked chat, deleting a space preserves the session, and live space updates apply in the combined layout without a manual refresh
    - spaces can convert across renderer types safely, To-Do spaces render interactively, reminder presets are delivery-gated and map cleanly onto local cron jobs, and the OpenRouter/provider drawer regressions remain green alongside the new space workflow
- Verification completed for the legacy-spaces startup migration fix on 2026-04-09 with:
  - `pnpm exec vitest run --config vitest.unit.config.ts apps/bridge/src/database.test.ts`
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm --filter @hermes-workspaces/bridge dev -- --port 8787`
  - `pnpm dev`
  - fixture-backed regression coverage confirming:
    - a database containing a pre-refactor `spaces` table without `primary_session_id` now boots successfully, backfills the session-attached columns, and recreates the `spaces_primary_session_active_idx` index during startup migration
  - live bridge startup confirming:
    - the default local bridge startup path reached `Hermes bridge listening on http://127.0.0.1:8787` instead of failing during SQLite migration
  - live full-stack startup confirming:
    - `pnpm dev` reached both `VITE v5.4.21 ready` on `http://127.0.0.1:5173/` and `Hermes bridge listening on http://127.0.0.1:8787` before manual shutdown
- Verification completed for the attached-space refresh prompt pass on 2026-04-10 with:
  - `pnpm --filter @hermes-workspaces/protocol build`
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm test`
  - fixture-backed regression coverage confirming:
    - clicking Refresh on an attached space now sends a dedicated `space_refresh` request instead of replaying the latest transcript-visible user turn
    - the bridge composes Hermes refresh prompts from persisted `space.metadata.refreshPrompt` context when available, preserving refresh scope even after unrelated later chat turns
    - refresh-aware Hermes prompt shaping keeps transcript-visible refresh messages short while still giving Hermes the original structured request plus current space snapshot
    - legacy attached spaces without saved refresh metadata fall back to space-event/session-history inference instead of using the latest unrelated user message

## Definition of done for each milestone

A milestone is only done when:

- code exists
- tests for the behavior exist
- lint and typecheck pass
- this file is updated
- docs reflect any changed architecture or commands

## Update policy for this file

When making progress, append or revise concise factual updates only.
Do not write diary-style notes. Keep this file useful for the next autonomous agent.
