# Industry Auto-Config — Web Prototype

High-fidelity web mock of the YouSquared iOS flow where users pick an industry
and the app pre-fills Company Info with industry-tailored defaults. Mirrors the
Swift implementation on [`tomohiro/industry-auto-config`](https://github.com/strangeattractors/YouSquared-ios/tree/tomohiro/industry-auto-config).

## Live URL

<http://strange-attractor.com/industry-auto-config-prototype/>

## Layout

```
prototypes/industry-auto-config/
├── index.html                             # current prototype — self-contained
├── 20260417-prototype-auto-config.html    # dated permalink (copy of index.html)
├── README.md                              # this file
└── archive/
    └── 2026-04-16-multiscreen/            # superseded multi-file version
        ├── index.html                     # its own overview
        ├── 01-industry-picker.html …      # 5 screens
        └── shared/                        # theme.css, phone-frame.css, components.js, industries.js
```

**Current version (root)** — single self-contained HTML. Covers industry picker,
Company Info with Products & Services sub-fields + AI Scheduling, Business Info
edit, and Secretary Settings with scenarios + voice-input add flow.

**Archive** — the original Apr 16 multi-screen walkthrough. Left in place for
reference; useful if we ever want to split the current version back into
per-screen files for parallel editing.

## Publishing a new version

1. Drop the new HTML file in at `prototypes/industry-auto-config/` on the
   `alex/web-prototype-industry-auto-config` branch.
2. Move the current `index.html` to `archive/<date>-<short-name>/` first.
3. Rename the new file to `index.html`. Keep a dated copy at root as a stable
   permalink.
4. Commit + push. The GitHub Pages mirror at
   `strangeattractors/industry-auto-config-prototype` needs to be synced
   separately (manual copy today; auto-sync GitHub Action pending).

## Running locally

Double-clicking `index.html` works — it's self-contained (React + Babel from
CDN, no local scripts to fetch). No server needed for the current version.

The archived multi-screen version uses local `<script src=…>` tags and needs a
static server: `cd archive/2026-04-16-multiscreen && python3 -m http.server 8000`.

## Source of truth

- **iOS branch** (where you edit): `strangeattractors/YouSquared-ios` branch
  `alex/web-prototype-industry-auto-config`, path
  `prototypes/industry-auto-config/`.
- **Pages mirror** (what's served publicly):
  `strangeattractors/industry-auto-config-prototype`.

Changes to the iOS branch don't auto-sync to the mirror yet. Copy manually, or
set up the sync GitHub Action.
