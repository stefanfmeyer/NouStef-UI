# Hermes Workspaces Product Spec

## Product summary

Hermes Workspaces is a local-first browser UI for Hermes with a thin local bridge.
It prioritizes real Hermes data, explicit failures, and restart-safe local persistence.

## Primary goals

1. Make Hermes usable through a modern browser UI instead of a terminal-only workflow.
2. Keep the runtime local and OS-agnostic.
3. Preserve correctness over fake usability.
4. Let users browse and resume large histories of Hermes sessions without losing context.

## Non-goals

- Electron-specific runtime architecture
- synthetic placeholder profiles or sessions
- hidden fallback data presented as real Hermes state
- unrestricted local command execution by default
- remote multi-tenant backend services

## Required product behavior

- Chat is the default landing page.
- The left rail order is:
  - profile selector
  - `New session`
  - recent sessions
  - `All sessions`
  - `Jobs`
  - `Tools`
  - `Skills`
  - `Settings`
- Clicking a recent or all-session item opens that session in Chat.
- `All sessions` supports search, recent-activity sorting, and pagination.
- Sessions with attached spaces render a compact indicator in recent and all-session lists.
- Opening a session with no attached space shows the normal chat-only layout.
- Opening a session with an attached space shows the combined workspace layout with space content on the left and chat on the right.
- Jobs show real Hermes-backed cron data with freshness and error state.
- Tools show bridge and Hermes tools with capability and approval metadata, and include a `Tool History` tab in the page.
- Skills are visible on a dedicated page for the active profile/runtime.
- Settings contain local runtime preferences, unrestricted-access controls, model/provider routing, provider connection management, and audit visibility.
- Settings prefer runtime-discovered provider/model metadata over freeform text fields, except for secrets such as API keys.
- The theme toggle is always visible in the top-right.
- Normal use has no document-level scrolling.

## Data expectations

- Profiles are real Hermes profiles from the local machine.
- Hermes sessions still come from the runtime, but the app keeps explicit local profile-to-session association records for filtering, recents, and active-session restore.
- Local metadata must not claim false Hermes ownership, but it should remain first-class and queryable.
- Messages have one source of truth in SQLite.
- Chat transcript content stays limited to user-facing conversation and notice messages; technical runtime output belongs in runtime activity only.
- Tools, tool execution history, skills, provider connections, runtime model config, and unrestricted-access audit events are first-class persisted entities.
- Spaces and space events are first-class persisted entities, but Spaces are now subordinate to sessions: each session may expose one attached active space and each space belongs to one primary session.
- Jobs cache state carries freshness, source, and explicit error/disconnected metadata.

## Current shipped scope

- browser UI in `apps/web`
- local bridge in `apps/bridge`
- SQLite persistence
- real Hermes CLI integration
- reviewed shell execution
- explicit unrestricted-access mode with local audit
- model/provider configuration and provider connection management
- persisted session-attached Spaces with extensible content/todo tabs and combined session+space workspaces
- dedicated Skills page plus Tools/Tool History tabs
- streaming assistant responses through SSE
- legacy Electron snapshot import into SQLite for migration only

## Deferred scope

- additional safe space tabs and content renderers beyond the current content/table/card/markdown plus To-dos model
- bridge packaging into a single standalone binary
- non-Hermes provider orchestration outside the local bridge/runtime contract
