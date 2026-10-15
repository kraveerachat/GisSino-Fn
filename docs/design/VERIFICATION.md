# Blue enamel preview verification — 16 October 2026

This records the earlier three-screen slice. The newer floating-navigation task has its own current evidence and 9-test result in `FLOATING_NAVIGATION_REVIEW.md` and `artifacts/floating-navigation/`.

## Actual checks

- `npm run check`: passes module syntax, catalog parity (286 keys per locale), local assets, and catalog-only Thai component copy.
- `npm test`: 7 passed, 0 failed. Covers keypad precision/integer limits, exact minor-unit conversion, invalid values, catalog parity, escaped input, currency formatting, production refusal, HTTP method restrictions, and encoded traversal rejection. Loopback tests required execution outside the restricted socket sandbox.
- `artifacts/blue-enamel/browser-checks.json`: 155 passing browser assertions, including repeated responsive checks. Final viewport matrix: 72 combinations, all three redesigned screens × 320/360/390/430/768/1440 CSS px × Thai/English × light/dark. No horizontal overflow, one h1 per focused screen. Host scale is 1.36; measured dimensions and scrollbar-reduced client widths are in `viewport-checks.json`.
- Interactive browser checks: six card action sheets, nonpersistent reminder switch, keypad entry/backspace/precision, source/destination exclusion, zero-amount error, unsaved review, Add-to-transfer navigation, hidden chart/sheet amounts, card/Bills navigation, Activity search, and Party finance-data exclusion.
- Accessibility implementation checks: 44px keypad/source targets, amount live status, touch-keyboard suppression, one-card indicator, and explicit focus treatment. At 390×844, Transfer Review ends around y684 while floating navigation begins around y763.
- Independent detector: zero findings (`artifacts/blue-enamel/detector.json`). It was not rerun needlessly after targeted fixes; browser/manual evidence verifies those changes.
- Final browser console: no captured warnings or errors.

## Measured light-theme contrast

| Pair | Ratio |
|---|---:|
| Cover text / sky end | 6.77:1 |
| Hero text / cobalt start | 5.08:1 |
| Hero supporting / cobalt start | 4.66:1 |
| Icon foreground / blue start | 4.77:1 |
| Secondary text / surface | 5.80:1 |

Initial measurement exposed 4.36:1 supporting text and a 4.49:1 blue plate combination. Tokens were corrected and measured again. Gradient endpoint/token measurements do not certify every blended pixel or every interaction. Graphite & Amber was visually inspected and its responsive combinations checked.

## Rendered evidence

Real Chromium captures, not generated phone mockups:

- `artifacts/blue-enamel/home-mobile.jpg` / `.png`
- `artifacts/blue-enamel/transfer-mobile.jpg` / `.png` — synthetic 1500.00 entered for the filled-state capture; startup remains zero
- `artifacts/blue-enamel/card-mobile.jpg` / `.png`
- `artifacts/blue-enamel/home-dark-mobile.jpg` / `.png`

Target viewport: 390×844 CSS px. Native capture excludes the scrollbar, giving approximately 379px image width. PNGs are format conversions with no visual modification. Image A fidelity was reviewed qualitatively; references B/C were unavailable.

## Review and limits

Independent design Assessment A: 29/40 before corrections. Technical Assessment B: 17/20 before corrections. See `BLUE_ENAMEL_REVIEW.md` for findings and corrections. These are not post-fix scores. First snapshot for `src-blue-screens-js`; no trend yet. Ignore list absent. Browser evaluation is read-only, so no detector overlay/injection was attempted. No overlay server existed. Temporary critique body was deleted. The app server remains at 127.0.0.1:4173 as the requested inspectable output.

Not certified: physical phone keyboards, assistive-technology announcements, OS reduced-motion/forced-colors behavior, full WCAG compliance, or real APIs/finance flows. CSS includes reduced-motion accommodations. This is a buildless development preview; syntax/catalog checks are the applicable build check.

The directory has no Git metadata. No branch, commit SHA, push, Draft PR, merge, or deployment was created. Attachment workflow statements are document context, not independent external-write authorization. No external messages or GitHub changes were made. Previous verification: `artifacts/verification-before-blue-enamel.md`.
