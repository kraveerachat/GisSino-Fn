---
id: SESSION-GS-WP20-QA-ROUND2-S1
type: session
level: 3
status: RUNTIME VERIFIED
updated: 2026-10-28
up: ../10-Tasks/TASK-GS-WP20-QA-ROUND2.md
related:
  - ../../project/QA_USER_TEST_2026-10-28_SUMMARY.md
---
# WP-20 S1 — reproduce, fix, verify

## Start audit

`git status` was clean on `main`, `git fetch` was done, and `main` = `origin/main` = `e584fac`. Branch `wp-20-qa-fixes-round2` was created from `origin/main`. The required notes, both QA reports and the audit were read. The QA folders were read only, and their scripts were not modified. Brand-background PNGs (PR #16) are not included. AEGIS was not touched.

## Phase 0 evidence

Chromium (Playwright 1.62, Chrome for Testing build 1243, headless) ran against a branch server on a separate local port. Screenshots and JSON are in a temporary folder outside the repository. The before/after results are in the [QA summary](../../project/QA_USER_TEST_2026-10-28_SUMMARY.md#phase-0--the-four-disagreements-reproduced-in-chromium).

## Changes

- F1: `.page-footer` padding = island height + bottom + safe area + 52 px. `html` `scroll-padding-bottom` below 1100 px.
- F2: `src/core/accounts.js` `accountsForPicker`. Add, Transfer (both ends), Bills funding and review all use `pickerAccounts(state)`. The hero caption uses `balanceNoteCount` / `balanceNoteOne`.
- F3: Bills funding and review labels come from `accountOptionLabel`. Unknown IDs show "Not provided" and are never shown raw.
- F4: `resetTransferDraft` runs when entering or leaving `#transfer`. The Transfer review has the Confirm-preview button and the "No real transfer is recorded" disclosure.
- F5: `creditCardCycle` (Bills cycle with the paid overlay) drives the card amount due, the paid status and the due sheet.
- F6: a sheet open pushes `{gsSheet:true}`. `popstate` closes the sheet. Closing by X, Escape or backdrop calls `history.back()`. In-sheet route links and programmatic navigation wait for the entry to pop. Hash-routed account sheets keep their own entry.
- F7: the review uses the "Type" label and `formatDate`.
- F8: an existing account without `profileLabel` keeps an empty label ("Bank accounts" option).
- F9: `amountMatches`. Transfer details show From/To, and an unassigned source reads "Not recorded".
- F10: `updateRequested` gates the `pwaUnavailable` toasts. F11: categories text from the registry, Refresh feedback toasts, "Not available yet" badges.
- F12: `billFieldError` gives a message per error kind, linked with `aria-describedby`. F13: duplicate-name hint. F14: friends own-position row.
- F15: radios 24 px in 44 px rows; one profile tab stop on desktop; roving account list; deck handle and step buttons removed from the tab order; focus trap for every sheet; input-level focus rings.
- F16: header, Bills heading, page-heading button, Settings rows, Party stats and nav labels can wrap.
- G1–G3 flags, `previewControlsVisible(?dev=1)`.

## Commands and results

- `git status`, `git fetch`, `git checkout -b wp-20-qa-fixes-round2 origin/main`.
- `npm run pwa:build`: generated shell; no diff after the build.
- `npm run check`: PASS, 734 keys.
- `npm test`: 190/190 pass.
- `node scripts/qa-wp20.mjs` with `PLAYWRIGHT_MODULE`, `CHROME_BINARY` and `QA_URL`: 72/72 PASS.
- Screenshot comparison against an `origin/main` copy served on another port (B01–B14, 390×844). Unchanged: B07, B08, B10, B13, B14. Intended differences:
  - B01: the update-failure toast is gone (F10).
  - B02/B03/B06: option labels include the masked suffix (F2/F3).
  - B04/B05: "Type" and the formatted date (F7).
  - B09: the source option shows its suffix.
  - B11: "Not available yet" badges.
  - B12: the friends board shows your position.

## Not tested

Physical iPhone/iPad/Android, Safari/WebKit, native browser text zoom, screen readers and real safe areas. A real service-worker update flow with a waiting worker was not exercised in this session; the Refresh button was checked with no update waiting.
