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
- **Fully offline** — no build step, no backend; open `index.html` and go

## Quick Start

### Prerequisites
- Any modern browser (Chrome, Firefox, Safari, Edge)

### Usage
```bash
# Simplest: open directly
open index.html

# Or serve locally
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Vanilla JavaScript (ES modules) |
| Storage | IndexedDB + SQLite (local) |
| UI | HTML + CSS (no framework) |
| Deployment | Static — no build step required |

## License

MIT
