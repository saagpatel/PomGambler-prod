# PomGambler (AuraFlow) — Portfolio Disposition

**Status:** Release Frozen — PWA production-readiness scope complete
on `origin/main` with `docs/CLOSEOUT.md`, `docs/PRODUCTION_READINESS.md`,
and `docs/TESTING_POLICY.md`. **Distribution model is different
from the signing cluster** — this is a PWA (static hosting +
service worker), not a signed desktop binary.

> Disposition uses strict `origin/main` verification.
> Repo name note: GitHub repo is `PomodoroGambler` (legacy account)
> but renamed to `PomGambler` on canonical. Internal product name is
> "AuraFlow (Pomodoro Gambler)" per README.

---

## Verification posture

This repo has both `origin` (`saagpatel/PomGambler`) and
`legacy-origin` (`saagar210/PomodoroGambler`) remotes. Note the
**repo name changed** between accounts: `PomodoroGambler` →
`PomGambler`. Local clone's `main` was tracking
`legacy-origin/main` — same trap as FreeLanceInvoice /
PersonalKBDrafter / BattleGrid. Fixed during this disposition pass.

Specifically verified on `origin/main`:
- Tip: `f3cbb8d` chore: add initial CHANGELOG
- Substantive commits on `origin/main`:
  - `f47d67e` feat(release): complete production-readiness delivery
  - `9263cc0` feat(dev): add lean dev workflow and cleanup scripts
  - `b6de6f8` feat: Initial implementation with critical bug fixes
- Release-readiness docs on `origin/main`:
  - `docs/CLOSEOUT.md`
  - `docs/PRODUCTION_READINESS.md`
  - `docs/TESTING_POLICY.md`
  - `docs/adr/0000-template.md`
- Tree on `origin/main` indicates PWA architecture:
  - `index.html`, `manifest.json`, `service-worker.js`
  - `js/`, `lib/`, `styles/`, `scripts/`, `tests/`
  - `icon-192.png`, `icon-512.png` (PWA icons)
  - `openapi/` (likely backend API surface)
- `legacy-origin/main` has no orphan commits not on `origin/main`
- Default branch: `main`

---

## Current state in one paragraph

PomGambler (product name: AuraFlow) is a browser PWA that turns
Pomodoro focus sessions into a virtual betting market — coins,
events, bet, complete. PWA architecture: static HTML + JS modules
under `js/` and `lib/`, service worker for offline behavior, manifest
for installable home-screen experience. Tests under `tests/`,
OpenAPI surface defined under `openapi/` (suggests there's also a
backend API the PWA talks to). Production-readiness scope is closed
out on `origin/main` (commit `f47d67e`).

For full detail see:
- `README.md`
- `docs/CLOSEOUT.md`
- `docs/PRODUCTION_READINESS.md`
- `docs/TESTING_POLICY.md`

---

## Why "Release Frozen" — but NOT the signing cluster

PomGambler has the same release-discipline shape as the signing
cluster — production readiness doc, closeout doc, testing policy,
ADR scaffolding. But the distribution model is fundamentally
different:

- **PWA, not desktop** — no Apple Developer credentials needed
- **Static host + service worker** — Vercel / Netlify / GitHub
  Pages / Cloudflare Pages all work
- **Backend API present** (OpenAPI surface) — needs separate
  hosting decision for the API server
- **HTTPS required** for service worker, but every modern static
  host provides this by default

The "gate" is therefore not Apple signing — it's "decide static
host + decide API host."

---

## Possible next moves (operator choice)

### Option 1 — Deploy to Vercel/Netlify, ship publicly

Required scope:

1. Pick static host (Vercel/Netlify/Cloudflare Pages)
2. If OpenAPI surface implies a backend, decide where to host it
   (Vercel Functions, Cloudflare Workers, Fly.io, etc.)
3. Wire CI auto-deploy on push to `main`
4. Custom domain if desired
5. Cut v1.0 release tag

Estimated effort: ~3 hours including domain + first deploy.

### Option 2 — Static-only (no backend), ship as PWA-only

If the OpenAPI surface is aspirational rather than required for v1,
strip the backend dependency from the client and ship as
pure-static. Same hosting decision but simpler.

Estimated effort: ~2 hours including the strip.

### Option 3 — Open-source self-host project

Polish the README install/host section, do not operator-host.

Estimated effort: ~30 minutes.

### Option 4 — Mark personal-use, scaffold-stop

Move to `Cold Storage`.

Estimated effort: ~15 minutes.

---

## Recommendation (informational)

**Option 1 is the natural fit** for PomGambler:

- PWAs with service workers are install-once, work-offline — that's
  a strong feature for a Pomodoro app (no flaky network at the focus
  moment)
- The "betting market" framing is differentiated enough to be a real
  Show-HN candidate
- Static hosting cost is effectively zero on modern free tiers
- Production-readiness docs already exist; closing on a real
  deployment is the natural next step

But operator-judgment. Option 3 (self-host project) is fine if
operating-a-live-site cost (uptime expectations, abuse handling)
isn't worth the audience size.

---

## Portfolio operating system instructions

| Aspect | Posture |
|---|---|
| Portfolio status | `Release Frozen (PWA distribution shape)` |
| Distribution model | **PWA / static-host**, NOT signed desktop binary |
| Review cadence | Suspend overdue counting |
| Resurface conditions | (a) operator picks Option 1/2/3/4, (b) live deploy starts producing operational alerts, or (c) operator opens a v1.1 scope packet |
| Do **not** auto-add to signing cluster | Different distribution shape. The "PWA cluster" is currently 1 repo (this one); future PWA-shape repos could join. |
| Legacy-origin trap | Fixed during this pass (was tracking `legacy-origin/main`) |
| Name note | GitHub repo renamed `PomodoroGambler` → `PomGambler`; product name is `AuraFlow` per README |

---

## Reactivation procedure (for the next code session)

1. **Verify local clone tracking.** Confirm `main` tracks
   `origin/main`, not `legacy-origin/main`. Fixed during this pass
   but easy to regress on fresh clones.
2. Delete stale `codex/*` branches that pre-date the
   production-readiness delivery commit (`f47d67e`).
3. Re-run `pnpm install && pnpm test` (or whatever the project's
   verify command is) to confirm the toolchain works.
4. If picking Option 1, pick host before writing more code.
5. Re-check `docs/PRODUCTION_READINESS.md` and `docs/CLOSEOUT.md` —
   confirm gates still pass post-freeze.

---

## Last known reference

| Field | Value |
|---|---|
| `origin/main` tip | `f3cbb8d` chore: add initial CHANGELOG |
| Last substantive commit | `f47d67e` feat(release): complete production-readiness delivery |
| Default branch | `main` |
| Architecture | PWA (HTML + JS + service worker + manifest) plus OpenAPI-defined backend surface |
| Production readiness | Closed out on `origin/main` |
| Migration state | `legacy-origin` points at frozen `saagar210/PomodoroGambler` (note name diff); local tracking was wrong, fixed |
| Distribution shape | Static host + service worker (HTTPS required, otherwise unrestricted) |
| No signing dependency | Different from the 10-repo signing cluster |
