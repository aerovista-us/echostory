<!-- SOT: true | sot_id: umami | canon_path: docs/UMAMI.md | updated: 2026-08-29 -->

# EchoStory Umami analytics

Self-hosted Umami at **https://stats.aerocoreos.com** (same instance as AeroVista Flagship).

| Field | Value |
|-------|--------|
| Product | EchoStory storefront |
| Live URL | `https://aerovista-us.github.io/echostory/` |
| Script | `https://stats.aerocoreos.com/script.js` |
| Website ID | `1185a8de-16ce-4917-ada7-5a9df59b5e7e` |
| Team | `9659160b-db08-4530-b648-8896aaaca77f` (AeroVista) |

Registered in Umami as **EchoStory** with domain `aerovista-us.github.io/echostory`. Canonical value lives in `config.js` → `umamiWebsiteId`.

## What we track

| Event | When | Key fields |
|-------|------|------------|
| `funnel-enter` | First paint | `referrer`, `url` |
| `funnel-nav` | Every screen / step | `screen`, `order`, `path` (pipe-separated sequence) |
| `funnel-exit` | Tab close / navigate away | `last`, `path`, `steps`, `seconds`, `reason` |
| `funnel-complete` | Formspree success | `package`, `total` |
| Virtual pageviews | With each `funnel-nav` | URL `/echostory/funnel/{screen}` |

### Screen IDs (nav order)

Landing: `landing-loading` → `landing-hero` → `landing-edu-1` → `landing-edu-2` → `wizard-start`

Wizard: `wizard-step-1` … `wizard-step-5`, `form-success`

Menu: `menu-build`, `menu-how`, `menu-about`, `menu-faq`, `menu-pricing`, `menu-contact`

## Files

- `config.js` — `umamiWebsiteId`
- `analytics.js` — funnel helper (`EchoStoryAnalytics`)
- `index.html` — loads config, Umami script, analytics

## Verify after deploy

1. View source on GitHub Pages — confirm `stats.aerocoreos.com/script.js` and your website ID.
2. Walk the funnel (hero → edu → wizard → step 5).
3. In Umami → **Realtime** or **Events**, filter `funnel-nav` / `funnel-enter`.
4. Close the tab; confirm `funnel-exit` with full `path` string.

Localhost is excluded (`127.0.0.1`, `localhost`). To test locally, temporarily remove that check or use `localStorage.umami.disabled = 0` and a real hostname via hosts file.

## Privacy

No advertising pixels. Umami is first-party on `stats.aerocoreos.com`. Mention in privacy copy if you collect EU traffic.
