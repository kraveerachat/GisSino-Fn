---
id: TASK-GS-BRAND-BACKGROUNDS
type: task
level: log
status: LOCALLY VERIFIED
updated: 2026-10-28
up: ../00-Index/Task-Dashboard.md
related:
  - ../../project/PROJECT_HISTORY.md
  - ../../design/SCREEN_MAP.md
---
# Preserve owner background PNG sources

## Current state

Owner-approved branch `assets/brand-backgrounds` starts from main `e584fac22163d6a009f930bfd32a596fd5904058`. Source commit `0272198e313560aef00697144aa8d354618c7de4` contains exactly the four owner PNGs and regenerated `assets/pwa/shell.js` together. The logo already matches main and is not committed. One Draft PR is required; merge is not authorized.

## Scope and task map

1. Search current and main code/CSS for references before changing files.
2. Preserve the four original PNGs and regenerate the shell in one source commit.
3. Run project checks/tests and verify committed image hashes before switching branches.
4. Push one Draft PR, retain the asset branch and return the sole working folder to clean main.

No UI redesign, asset conversion, background wiring, logo replacement or production work is included. The repository consolidation and verified archives are recorded in the external owner report.

## Verification and session record — 2026-10-28

- `rg` and `git grep` found no code/CSS references to `GisSino_BG_light*`; Welcome uses `assets/welcome/*.webp`.
- `npm run pwa:build`: shell `f7b5e042db4f1521`, 81 allowlisted assets.
- `npm run check`: PASS, 724 keys per locale.
- `npm test`: PASS, 171/171; no failures, skips or cancellations.
- Extracted all four PNGs directly from source commit using `git archive`; SHA-256 of every committed image matches the original. [Brand provenance](../../../assets/brand/README.md) lists all filenames/hashes.
- `git diff origin/main -- assets/brand/gissino-s-shield.png` is empty.
- No browser visual test was needed: no displayed image reference changes. Real-device installation and production are not tested.

## Delivery

Publish one Draft PR from this branch to main; the owner reviews it before any merge. Keep this branch and all existing local branches. Post-switch main must contain no untracked background PNGs, while ignored Obsidian settings remain intact. The external final report records the actual Draft PR URL and final clean-main verification.
