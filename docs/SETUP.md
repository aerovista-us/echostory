<!-- SOT: true | sot_id: setup | canon_path: docs/SETUP.md | updated: 2026-08-29 -->

# EchoStory setup

Live: [https://aerovista-us.github.io/echostory/](https://aerovista-us.github.io/echostory/)  
Repo: [https://github.com/aerovista-us/echostory](https://github.com/aerovista-us/echostory)

Configure **three** things before taking paid orders: Square Payment Links, Formspree, and audio files. Payment architecture is in [SQUARE.md](SQUARE.md). Do not edit Link IDs inside `index.html` — use `config.js`.

## Quick checklist

- [ ] Five Square Payment Links (prices in [SQUARE.md](SQUARE.md))
- [ ] `config.js` `squareLinks` filled (`sq0idp-...`, not `YOUR_LINK_ID`)
- [ ] `config.js` `formspreeFormId` filled
- [ ] Vibe preview MP3s match `CONFIG.audioPreviews` in `index.html`
- [ ] HTTPS host (GitHub Pages is fine)

## 1. Square

See [SQUARE.md](SQUARE.md). Dashboard: [square.link/dashboard](https://square.link/dashboard).

If a package still has `YOUR_LINK_ID`, the customer sees the invoice-by-email message instead of a checkout button.

## 2. Formspree

1. Create a form at [formspree.io/forms](https://formspree.io/forms).
2. Set `formspreeFormId` in `config.js` (the `xxxx` in `https://formspree.io/f/xxxx`).
3. Point notifications at the EchoVerse inbox that should receive orders.

The form still has a placeholder `action` in HTML; JavaScript overwrites it when the Form ID is not `YOUR_FORM_ID`.

Submitted fields include: name, email, recipient, vibe, occasion, scale, package, add-ons, estimated total, memory builder, notes.

## 3. Audio preview files

Files live in `/audio/`. Names must match `audioPreviews` in `index.html` (spaces and punctuation included). Current map:

| Vibe key | File |
|----------|------|
| jazz | `JAZZ  Put Your Story in the Groove.mp3` |
| lounge | `LOUNGE  Pour a Little Memory In.mp3` |
| acoustic | `ACOUSTIC  - Frame It In a Song.mp3` |
| modernPop | `POP TRIBUTE_Heartline Respawn.extended.mp3` |
| country | `COUNTRY_Make the Memory Ride.mp3` |
| lofi | `LOFI _Let the Moment Drift.mp3` |
| gamey | `GAMEY _ 8-BIT - "Press Play on Your Story.mp3` |
| cinematic | `CINEMATIC _Your Life in Wide Frame (1).mp3` |
| loveBallad | `LOVE BALLAD  Hold the Feeling Close.mp3` |
| storytelling | `STORYTELLING _Say It Like a Legend.mp3` |

Mini player uses `The Story You Can Hear.mp3` and `The Story You Can Hear (1).mp3`. `SWAMP-HOP _Built From Your Bones.mp3` is on disk but not wired to a vibe.

Some previews are over two minutes. If GitHub Pages feels slow, shorten the files; keep the same filenames.

Safari/iOS: audio starts only after a user tap.

## 4. Local overlay (optional)

`config.local.js` is gitignored. To use it, add this tag **after** `config.js` in `index.html` on that machine only:

```html
<script src="config.local.js"></script>
```

## 5. Testing

Wizard: all 10 vibes, 6 occasions, 3 scales, 5 packages, add-ons, form validation, memory builder.

Payment: submit with placeholders → invoice copy; submit with real Link IDs → Square opens the matching package price (not add-on total).

Form: Formspree dashboard shows the full payload.

Browsers: Chrome, Firefox, Safari, Edge, iOS Safari, Android Chrome.

## 6. Deploy

**GitHub Pages (current):** push `master`. Site: `https://aerovista-us.github.io/echostory/`

**Other hosts:** upload the repo root, HTTPS on, MIME `audio/mpeg` for `.mp3`.

After deploy: open the live URL, play a vibe, submit a test order, confirm Formspree, click Square if IDs are live.

## 7. Pricing edits

Package prices are HTML `data-base` on package cards **and** the Square Payment Link amount. Change both. Add-on prices are in `CONFIG.upsellChips` in `index.html`.

## 8. Troubleshooting

| Symptom | Check |
|---------|--------|
| Audio 404 | Filename vs `audioPreviews` (the Nov 2025 Collab audio swap left stale paths; that is fixed in this repo) |
| Form fails | Formspree ID, HTTPS, Formspree quota |
| Square button missing | `squareLinks[package]` still `YOUR_LINK_ID` |
| Square amount wrong vs wizard total | Expected: link is base SKU only. See [SQUARE.md](SQUARE.md) |

Square help: [squareup.com/help](https://squareup.com/help)  
Formspree help: [help.formspree.io](https://help.formspree.io)
