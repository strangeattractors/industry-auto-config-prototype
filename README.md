# Industry Auto-Config — Web Prototype

High-fidelity web mock of the YouSquared iOS flow where users pick an industry
and the app pre-fills their Company Info screen with industry-tailored defaults.

**Status:** prototype only — no backend wired up. Mirrors the Swift
implementation on [`tomohiro/industry-auto-config`](https://github.com/strangeattractors/YouSquared-ios/tree/tomohiro/industry-auto-config).

## Run locally

```bash
cd prototypes/industry-auto-config
python3 -m http.server 8000
```

Open <http://localhost:8000>. That's it — no `npm install`, no build step.

> A static server is required because browsers block local `<script src="…">`
> loads over `file://`. Any static server works (`python -m http.server`,
> `npx serve`, VS Code Live Server).

## What it shows

Five screens, one HTML file each, wired as a happy-path flow:

| # | File | What |
|---|------|------|
| 1 | `01-industry-picker.html` | Two-level picker (parent → sub-industry), search, "Other, specify" |
| 2 | `02-prefill-animation.html` | Sparkle + progress bar + ticker, auto-advances in ~2.4s |
| 3 | `03-company-info.html` | Review screen with pre-filled fields, green/orange badges, industry-specific sections |
| 4 | `04-change-industry-confirm.html` | Alert modal for industry change — preserves edits, replaces presets |
| 5 | `05-edit-bio.html` | Preset → edited state machine, reset-to-preset escape hatch |

`index.html` is a launcher with links to each screen and to each demo industry.

Industries wired up: **Pharmacy, Dental, Residential Real Estate, Equipment
Rental**. Every other picker choice falls back to a generic template so no link
404s.

## File structure

```
prototypes/industry-auto-config/
├── README.md                         # this file
├── index.html                        # launcher
├── 01-industry-picker.html           # screen 1
├── 02-prefill-animation.html         # screen 2
├── 03-company-info.html              # screen 3 (main)
├── 04-change-industry-confirm.html   # screen 4
├── 05-edit-bio.html                  # screen 5
└── shared/
    ├── theme.css                     # design tokens (mirror of Theme.swift / Color+Ext.swift)
    ├── phone-frame.css               # iPhone chrome + form row styles
    ├── components.js                 # React components (PhoneFrame, NavBar, Badge, etc.)
    └── industries.js                 # industry tree + per-industry pre-fill data
```

No file exceeds ~400 lines. Each screen is standalone — editing screen 3
doesn't touch any other file.

## How to add an industry

1. Open `shared/industries.js`.
2. Add an entry to `INDUSTRY_TREE` (pick or create a parent category):
   ```js
   { id: 'veterinary', name: 'Veterinary Clinic', icon: '🐾' }
   ```
3. Add a pre-fill entry to `INDUSTRY_PREFILLS` keyed by the same `id`:
   ```js
   veterinary: {
     pageTitle: 'Clinic Info',
     companyLabel: 'Clinic Name',
     companyName: 'Happy Paws Vet',
     jobTitle: 'Lead Veterinarian',
     goesBy: 'Dr. Lee',
     workBio: { badge: 'preset', text: '…' },
     sections: [
       { title: 'Services',       badge: 'preset', type: 'list', content: [...] },
       { title: 'Pricing',        badge: 'draft',  type: 'list', content: [...] },
       { title: 'Accepted Insurance', badge: 'draft', type: 'insurance',
         accepted: [...], notAccepted: [...] },
       { title: 'Hours',          badge: 'preset', type: 'list', content: [...] },
     ],
   }
   ```

Supported `section.type` values: `list`, `insurance`, `listings`, `equipment`.
Add a new type by adding a section renderer in `03-company-info.html`.

## How to add a screen

1. Copy one of the existing screen files (e.g. `05-edit-bio.html`) to
   `06-your-screen.html`.
2. Keep the scaffolding: theme + phone-frame CSS links, React/Babel CDN
   scripts, `<div id="root">`, and the `window.UI` / `window.INDUSTRY_*`
   globals from the shared scripts.
3. Write the screen component (React + JSX inside
   `<script type="text/babel">`).
4. Add an entry to the `screens` array in `shared/components.js`'
   `ScreenNav` so it appears in the top nav on every screen.

## Design tokens

All tokens in `shared/theme.css` are mirrored from the iOS app's
`Theme.swift` and `Color+Ext.swift`. If you need a color or spacing
that isn't there, **check the Swift files first** — don't invent a new
hex value. If it's genuinely missing, add it to both places.

Key tokens:

- **Colors**: `--accent` (#FF8370), `--primary-text`, `--secondary-text`,
  `--tertiary-text`, `--bg`, `--surface-light`, `--border`, `--green-500`,
  `--error`.
- **Spacing**: `--sp-normal` (16px, the default), `--sp-sm` (10px),
  `--sp-md` (20px), `--sp-lg` (30px).
- **Radius**: `--r` (10px, default), `--r-lg` (12px), `--r-xxl` (30px).
- **Typography**: `.body-r`, `.title1-s`, `.footnote-m`, etc. — one class
  per iOS font modifier.

## Badge semantics

- **`preset`** (green, "Pre-filled") — ready to use as-is for 85%+ of
  businesses. Mapped from iOS `presetFields` set.
- **`draft`** (orange, "Example — edit to match") — realistic starting
  point that likely needs editing. Mapped from iOS `draftFields` set.
- **Edited** (coral accent) — user has changed a pre-filled field.
  Shows a "reset to pre-filled" option.

## Known limitations / TODOs

- No backend — "Save" buttons just `alert()`.
- Search in the industry picker is parent-only (doesn't drill into
  children). Fine for a prototype.
- Pre-fill animation duration is hardcoded (2.4s). Real app will wait
  for the backend call.
- Only screen 5 (bio) has a working edit flow. Screens for editing
  Products & Services, Pricing, Insurance, etc. follow the same pattern
  but aren't built out.

## Contributing

- Keep each screen file under 400 lines. If it grows beyond that, split
  helper components into `shared/`.
- Keep pure data (industry pre-fills, etc.) out of screen files — put
  it in `shared/industries.js`.
- If you add a component used by 2+ screens, promote it to
  `shared/components.js` via `window.UI`.
