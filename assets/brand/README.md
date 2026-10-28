# GisSino S-Shield

## Preserved owner background sources — 2026-10-28

The four original PNGs below are preserved byte-for-byte in [`docs/design/sources/brand-backgrounds/`](../../docs/design/sources/brand-backgrounds/). They were moved there with `git mv` on 2026-10-28 so that `scripts/build-pwa.mjs` does not cache them. That builder walks only `src/`, `icons/` and `assets/`, and the dev server does not serve `docs/`. No code or CSS references these filenames. Welcome continues to use `assets/welcome/*.webp`. The PWA shell inventory is identical to main, and the logo is unchanged.

| File (`docs/design/sources/brand-backgrounds/`) | SHA-256 |
|---|---|
| GisSino_BG_light-Desktop.png | 366dfa070bd02759ed0f0ce3d1c9449c2982f55fd57f8e9ac50e70d2a0249885 |
| GisSino_BG_light-Ipad-L.png | 810815b3535e3ba5da852e7a48ca95b764f7c8b0e9141e55e16cd0d335c07808 |
| GisSino_BG_light-Ipad-T.png | d7216a7c54dc56f02f9f4957a746c1dcfb8be21ce04ccde8ce931715f1332ceb |
| GisSino_BG_light-mobile.png | 3e615f2cf218ebf21b1d64b1beff57a116ae0895c0ddb18ea3d8cf15fbf427f5 |

See the [asset preservation task](../../docs/worklog/10-Tasks/TASK-GS-BRAND-BACKGROUNDS.md) for source commit and verification.

## Current owner-supplied artwork — 2026-10-17

The owner explicitly selected the replacement PNG already present at the primary checkout's canonical `assets/brand/gissino-s-shield.png` path. Welcome follow-up S2 adopts that exact file, byte-for-byte, at this same shared path.

- Canvas: 1254×1254 RGBA PNG; 812015 bytes.
- SHA256: `76a80a0d5f6eb73a5f8a1217edf4f814e3c56a6b10b77c30081a05e3bf03e273`.
- White/blue S-Shield supplied by the owner; no generation, crop, resampling, recoloring, filtering or metadata removal.
- Existing shared brand helper and favicon continue to reference this path. Welcome retains its 144px image box at normal mobile height; compact-height rules are unchanged.
- The primary-checkout source is untouched. Future owner replacements can use this same canonical path.

## Historical metallic navy artwork — superseded 2026-10-17

The following provenance records the prior PR #2/S1 asset only. It does not describe the replacement above.

Owner-supplied Metallic Navy S-Shield Emblem.png is the approved prototype brand artwork.

- Canvas: 1254×1254 RGBA PNG.
- Visible artwork bounds at alpha>=16: x92..1163, y40..1228 (1072×1189).
- Original SHA256: B26D5107C0B9DC62B5038596E1A067573859B3B90EED7F49017A1BF771055DD9.
- Web asset: gissino-s-shield.png. The nonvisual caBX/C2PA chunk is omitted from this web copy; IHDR, IDAT and IEND chunks are preserved byte-for-byte.
- No crop, resampling, recoloring, filtering or generation. The owner's original file is unchanged.
- The shared brand helper and favicon reference this one canonical PNG. Image alt is empty inside the named Home link to avoid duplicate announcements.
