# Hermes Workspaces Protocol Notes

## Scope

`packages/protocol` defines the shared runtime contract between the browser app and the local bridge.
Every HTTP payload, SSE event, and persisted entity the browser relies on is validated with Zod.

## Core entities

- `ConnectionState`
  - `connected`, `degraded`, `disconnected`, or `error`
  - checked timestamp
  - optional detail message
  - `usingCachedData`
- `Profile`
  - real Hermes profile id and metadata
- `Session`
  - local session id
  - optional Hermes `runtimeSessionId`
  - title, summary, source, timestamps, message count
  - optional local `lastUsedProfileId`
  - optional linked local `linkedSpaceId`
- `ChatMessage`
  - `user`, `assistant`, `system`, or `tool`
  - plain markdown content
  - ISO timestamp
  - completion/error status
  - explicit `visibility` (`transcript` or `runtime`)
  - explicit `kind` (`conversation`, `notice`, `technical`)
- `Job`
  - persisted Hermes cron item
- `JobsFreshness`
  - freshness state and cache provenance for jobs
- `Tool`
  - persisted Hermes or bridge tool
- `ToolExecution`
  - reviewed tool request/result history
- `RuntimeProviderOption`
  - discovered provider capability metadata
  - disabled state, configuration fields, and available model options
- `AppSettings`
  - theme mode
  - sessions page size
  - chat timeout
- `UiState`
  - active profile
  - active session
  - active space
  - recent session ids
  - current page
- `Space`
  - stable local id
  - profile-scoped metadata
  - validated `viewType`, `data`, `uiState`, and linked session fields
- `SpaceEvent`
  - append-only event record for visible local space changes

## HTTP schemas

- `BootstrapResponse`
- `SessionsResponse`
- `SessionMessagesResponse`
- `JobsResponse`
- `ToolsResponse`
- `SkillsResponse`
- `ModelProviderResponse`
- `SpacesResponse`
- `SpaceResponse`
- `ToolHistoryResponse`
- `CreateSessionRequest`
- `CreateSpaceRequest`
- `SelectProfileRequest`
- `SelectSessionRequest`
- `OpenSpaceChatRequest`
- `UpdateSettingsRequest`
- `UpdateUiStateRequest`
- `UpdateSpaceRequest`
- `DeleteSpaceRequest`
- `ChatStreamRequest`
- `ToolExecutionPrepareRequest`
- `ToolExecutionResolveRequest`
- `HealthResponse`

## SSE event schema

`ChatStreamEvent` is a discriminated union of:

- `progress`
- `activity`
- `assistant_snapshot`
- `session`
- `message`
- `space_event`
- `complete`
- `error`

The browser does not trust raw event payloads.
It parses each event against the shared schema before updating UI state.

## Protocol rules

- the bridge is authoritative for Hermes-backed data
- no synthetic profile/session/job payloads
- errors are explicit and typed
- sessions are global Hermes sessions with optional local association metadata
- transcript rendering is driven by message `visibility` and `kind`, not by role alone
- raw tool output, CLI notes, skill traces, and other technical diagnostics belong in runtime activity, not the visible transcript
- tools and tool execution history remain first-class contract entities
- spaces remain structured data, not arbitrary executable UI
- the browser does not read Hermes CLI output directly

## Extension rule

Any future space view type, space operation, or transcript/runtime message kind must be introduced through the shared browser/bridge protocol first.
Do not restore Electron IPC semantics or ad hoc renderer-specific payloads outside these schemas.
