## Inherited Operating Rules

- Inherit global git, review/fix, testing, docs, UI, security, skill-use, and reporting gates from `/Users/d/.codex/AGENTS.md` and active session instructions.
- Use `.codex/verify.commands` and `.codex/scripts/run_verify_commands.sh` as this repo-local verification authority when present.
- Keep the app offline, account-free, static, and virtual-currency only unless the operator explicitly re-scopes the project.

<!-- portfolio-context:start -->
# Portfolio Context

## What This Project Is

PomGambler, branded AuraFlow in the README, is a fully offline browser app that combines Pomodoro focus sessions with a virtual prediction market. Users earn coins by completing timed work blocks, then wager those coins on manually resolved events across sports, tech, gaming, and politics categories.

## Current State

The README describes the working static app surface: tiered focus rewards, IndexedDB/SQLite-backed local state, manual YES/NO resolution with payouts, analytics, interruption detection, and theme persistence.

## Stack

| Layer | Technology |
|-------|------------|
| Language | Vanilla JavaScript (ES modules) |
| Storage | IndexedDB + SQLite (local) |
| UI | HTML + CSS (no framework) |
| Deployment | Static — no build step required |

## How To Run

```bash
# Simplest: open directly
open index.html

# Or serve locally
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Known Risks

- Keep it offline and account-free; no backend or network dependency is part of the product promise.
- Betting is virtual-only with local coins; do not introduce real-money mechanics.
- Static deployment/no-build simplicity is part of the appeal, so avoid framework churn unless the operator explicitly re-scopes the project.

## Next Recommended Move

Use this context plus the README and supporting docs to resume the next active task, then promote the repo beyond minimum-viable by capturing a dedicated handoff, roadmap, or discovery artifact.

<!-- portfolio-context:end -->
