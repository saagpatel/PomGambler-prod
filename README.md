# AuraFlow (Pomodoro Gambler)

[![JavaScript](https://img.shields.io/badge/javascript-%23f7df1e?style=flat-square&logo=javascript)](#) [![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#)

> Stay focused to earn coins — then bet them on whether the thing actually happens.

AuraFlow combines Pomodoro time management with a virtual betting market. Complete work sessions to earn coins, then wager them on sports, tech, gaming, and politics events in a Polymarket-style interface. All data lives in your browser — no accounts, no servers.

## Features

- **Tiered coin rewards** — 15 min = 20 coins (1×), 30 min = 40 coins (2×), 60 min = 100 coins (5×)
- **Virtual betting market** — four event categories with configurable odds and bet sizes (10–1,000 coins)
- **Manual resolution** — resolve events YES/NO in History with automatic payout settlement
- **Analytics snapshot** — completion rate, bet win rate, average session length, ROI
- **Interruption detection** — closing the browser mid-session forfeits the coin reward
- **Theme switching** — dark, light, or system preference with local persistence
- **Fully offline after local loading** — no build step or backend; serve the static files locally

## Quick Start

### Prerequisites
- Any modern browser (Chrome, Firefox, Safari, Edge)
- Python 3 for the local static server
- Node.js 22 for verification (matching CI); no npm install is needed

### Usage
```bash
python3 -m http.server 8000 --bind 127.0.0.1
# Then open http://127.0.0.1:8000
```

## Getting Started

Serve the repository root over localhost. ES modules, WASM loading and PWA
browser APIs require an HTTP origin for this workflow; do not use a `file://`
launch as the verification path. Use a fresh browser profile/origin with
synthetic coins and events so existing IndexedDB, local storage and service
worker state remain untouched. Stop only the server you started when finished.

## Dev Modes and Cleanup

### Normal Dev

Run from the repository root with Node.js 22 and Python 3. There is no
`package.json`; use these commands rather than the legacy npm Makefile targets.
The complete local gate is defined in [`.codex/verify.commands`](.codex/verify.commands):

```bash
bash .codex/scripts/run_verify_commands.sh
```

### Lean Dev

For a quick local confidence pass while editing static assets, run the fast syntax and regression checks directly:

```bash
node scripts/ci/check-static.mjs
node --test tests/regression/*.test.mjs
```

For a focused regression, pass one file, for example
`node --test tests/regression/timer-controls-contract.test.mjs`.
The suite checks source contracts; it does not exercise a real browser. There
is no separate formatter or TypeScript gate. The optional static artifact build
is `node scripts/ci/build-pages.mjs` (writes `dist/`); no build is needed to run
locally. Local HTTP smoke starts/stops its own Python server on a random port.

For changed UI, timer, betting, import/export or persistence behavior, also
check the affected flow in that fresh browser profile: no loading/console
error, timer start/pause/reset, synthetic wager and manual settlement, theme
and reload persistence, or a synthetic export/import round trip as applicable.
Use [Testing Policy](docs/TESTING_POLICY.md) for the existing broader layers.
Local checks do not replace the authorized live Pages release smoke; do not
run deployment or point verification at a production URL.

### Cleanup Commands

Generated local smoke-test state should stay out of commits. Remove temporary local server logs or browser scratch data before closing a branch.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Vanilla JavaScript (ES modules) |
| Storage | IndexedDB + SQLite (local) |
| UI | HTML + CSS (no framework) |
| Deployment | Static — no build step required |

## License

MIT
