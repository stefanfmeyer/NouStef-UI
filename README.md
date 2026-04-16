# The Kitchen

A local-first browser frontend for [Hermes Agent](https://hermesagent.io) — streaming chat, structured recipe workspaces, provider settings, and a recipe template gallery.

## Requirements

- **Node.js 22.5 or later** — the bridge uses the built-in `node:sqlite` module added in v22.5. Node 23+ is recommended.
  - Check: `node --version`
  - Install via [nvm](https://github.com/nvm-sh/nvm): `nvm install 22 && nvm use 22`, or download from [nodejs.org](https://nodejs.org)
- **pnpm 10+** — `npm install -g pnpm`
- **Hermes Agent CLI v0.9.0+** — install from [hermesagent.io](https://hermesagent.io)
  - Verify: `hermes --version`
  - First-time setup: `hermes setup`

> **Important:** Clone or extract this repo to a path with **no spaces**. A path like `~/Desktop/hermes boots/` causes subprocess errors. Use `~/dev/hermes-boots-codex/` or similar.

## Quick start

```bash
pnpm install
pnpm dev
```

- Web app: **http://127.0.0.1:5173**
- Bridge API: **http://127.0.0.1:8787**

```bash
# Or build and serve the production bundle:
pnpm build
pnpm start
```

## Troubleshooting

**Bridge exits with code 1 immediately**
- Check Node.js version: `node --version` — must be ≥ 22.5
- Make sure the repo path has no spaces
- Make sure `hermes` is in your PATH: `hermes --version`

**"Hermes is not fully healthy" banner**
- Run `hermes profile list` in your terminal to confirm Hermes works
- If you just installed Hermes, run `hermes setup` first

**Model selector or Settings shows nothing**
- Open Settings and configure a provider API key
- Run `hermes config show` to verify your current model and provider

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `BRIDGE_PORT` | `8787` | Bridge HTTP port |
| `BRIDGE_DB_PATH` | See below | Path to SQLite database |
| `HERMES_CLI_PATH` | `hermes` | Path to Hermes binary |

Default database location:
- macOS: `~/Library/Application Support/Hermes Recipes Browser/hermes-recipes.db`
- Linux: `~/.local/share/Hermes Recipes Browser/hermes-recipes.db`
- Windows: `%APPDATA%\Hermes Recipes Browser\hermes-recipes.db`

## Architecture

## How it works

- **Chat** — streaming responses from Hermes via SSE. Full Markdown rendering with syntax highlighting, tables, and lists.
- **Recipes** — structured workspaces Hermes generates during chat. Select a template from the Recipe Book tab, or let Hermes generate one based on your request. Recipes are attached to sessions and persist across restarts.
- **Settings** — configure Hermes providers with step-by-step guided setup for every supported provider, including API key links and example `hermes config set` commands.
- All state persists in a local SQLite database. The bridge accepts connections from `localhost`/`127.0.0.1` only.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Contributing

- The browser app only talks to the bridge over HTTP/SSE. The bridge is the only place that calls the Hermes CLI.
- Persistence is SQLite-backed via Node.js `node:sqlite`. Do not add file-system state outside the database.
- Provider API keys flow through Hermes auth/config only — the bridge caches only masked metadata locally.
- Recipes must stay schema-driven. The production path is template selection + structured fill/update JSON with bridge-owned normalization and rendering.
- Reviewed shell execution is intentionally narrow. Expand the allowlist only with tests.
