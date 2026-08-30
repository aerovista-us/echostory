# EchoStory changelog

## 2026-08-29 (Umami funnel)

- Umami on `stats.aerocoreos.com` via `config.js` → `umamiWebsiteId` (`1185a8de-16ce-4917-ada7-5a9df59b5e7e`).
- `analytics.js`: `funnel-enter`, `funnel-nav` (ordered path), `funnel-exit`, `funnel-complete`.
- See [UMAMI.md](UMAMI.md).

## 2026-08-29 (funnel polish)

- Unified `app-frame` / `scroll-frame` / `landing-frame` for consistent responsive sizing.
- Split “More than music” intro into two scrollable education pages.
- Step 1: genre picker first, spin wheel for inspiration, premium play button + scrub bar with pulse hint.
- Steps 2–3: “Why we ask” callouts for occasion and scale.
- Step 4: add-ons placed before estimate total; hamburger menu (FAQ, About, How it works, Build now, Pricing, Contact).

## 2026-08-29

- Synced Collab `master` (`f1cadbd`, longer sample audio) onto the GitHub clone; GitHub had been at `aef1077`.
- Pointed vibe previews at the files that actually shipped in `f1cadbd` (old names 404'd).
- Moved Square / Formspree IDs to `config.js`. Payment Links stay base-package only; Checkout API path documented in `docs/SQUARE.md`.
- Consolidated docs under `docs/README.md`. Dropped stale `index.html` line numbers from README/SETUP.
