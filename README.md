# The Kitchen

A local-first browser frontend for [Hermes Agent](https://hermes-agent.nousresearch.com/) — streaming chat, structured recipe workspaces, provider settings, and a recipe template gallery.

## Requirements

- **Node.js 22.5 or later** — the bridge uses the built-in `node:sqlite` module added in v22.5. Node 24 LTS is recommended.
  - Check: `node --version`
  - Install via [nvm](https://github.com/nvm-sh/nvm): `nvm install 22 && nvm use 22`, or download from [nodejs.org](https://nodejs.org)
- **pnpm 10+** — `npm install -g pnpm`
- **Hermes Agent CLI v0.9.0+** — install from [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
  - Quick install (Linux/macOS/WSL2): `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`
  - Verify: `hermes --version`
  - First-time setup: `hermes setup`

> **Important:** Clone or extract this repo to a path with **no spaces**. A path like `~/Desktop/the kitchen/` causes subprocess errors. Use `~/dev/the-kitchen/` or similar.

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

## How it works

- **Chat** — streaming responses from Hermes via SSE. Full Markdown rendering with syntax highlighting, tables, and lists.
- **Recipes** — structured workspaces Hermes generates during chat. Select a template from the Recipe Book tab, or let Hermes generate one based on your request. Recipes are attached to sessions and persist across restarts.
- **Settings** — configure Hermes providers with step-by-step guided setup for every supported provider, including API key links and example `hermes config set` commands.
- All state persists in a local SQLite database. The bridge accepts connections from `localhost`/`127.0.0.1` only.

## Architecture

Monorepo layout:

- [`apps/bridge`](apps/bridge) — local Node runtime: Hermes CLI execution, origin policy, SQLite persistence, SSE streaming.
- [`apps/web`](apps/web) — Vite + React + Chakra browser app that talks only to the bridge over HTTP/SSE.
- [`packages/protocol`](packages/protocol) — Zod-validated request, response, event, and entity schemas.
- [`packages/ui`](packages/ui) — shared Chakra provider and theme helpers.
- [`packages/config`](packages/config) — shared lint configuration.
- [`packages/testing`](packages/testing) — cross-package test utilities.

Canonical specs live under [`docs/specs`](docs/specs):

- [architecture.md](docs/specs/architecture.md) — runtime surfaces, bridge API, persistence model, failure behavior.
- [product-spec.md](docs/specs/product-spec.md) — product goals, required behavior, and data expectations.
- [protocol.md](docs/specs/protocol.md) — shared HTTP/SSE schemas between the bridge and browser.
- [spaces.md](docs/specs/spaces.md) — session-attached Spaces framework and build pipeline.
- [spaces-template-library.md](docs/specs/spaces-template-library.md) — curated Spaces template gallery.
- [hermes-ui-workspaces.md](docs/specs/hermes-ui-workspaces.md) — Hermes-to-bridge space data contract.
- [threat-model.md](docs/specs/threat-model.md) — threats, mitigations, and reviewed-tool allowlist.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The full path used by CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) is:

```bash
pnpm ci:full
```

which additionally runs `pnpm test:integration` (Playwright) and `pnpm security`.

## Contributing

- The browser app only talks to the bridge over HTTP/SSE. The bridge is the only place that calls the Hermes CLI.
- Persistence is SQLite-backed via Node.js `node:sqlite`. Do not add file-system state outside the database.
- Provider API keys flow through Hermes auth/config only — the bridge caches only masked metadata locally.
- Recipes must stay schema-driven. The production path is template selection + structured fill/update JSON with bridge-owned normalization and rendering.
- Reviewed shell execution is intentionally narrow. Expand the allowlist only with tests.
