---
id: TASK-GS-WP20-QA-ROUND2
type: task
level: 2
status: IN REVIEW
updated: 2026-10-28
up: ../00-Index/Task-Dashboard.md
related:
  - ../20-Sessions/TASK-GS-WP20-QA-ROUND2-S1.md
  - ../../project/QA_USER_TEST_2026-10-28_SUMMARY.md
  - ../../project/FIXTURE_WORLD_RECONCILIATION.md
  - ../../design/SCREEN_MAP.md
  - ../../design/UI_DATA_CONTRACTS.md
---
# WP-20 — QA fixes round 2

## Current state — 2026-10-28

Branch `wp-20-qa-fixes-round2` starts from `origin/main` `e584fac22163d6a009f930bfd32a596fd5904058`. The source commit `0d5ae91` fixes every Phase 0 item that reproduced (V1 partly, V2–V4). It adds F1–F16 and puts G1–G3 behind flags whose defaults keep today's behaviour. Docs commit `dbc1129` follows it. [Draft PR #17](https://github.com/kraveerachat/GisSino-Fn/pull/17) is open for owner review. It is not merged. No canonical decision changed. No persistence, ledger or backend was added. Mode: REPO_WRITE + GIT_WRITE on the task branch only.

## Scope

Fix what two independent user tests (Claude and Codex, 2026-10-28) found and could be reproduced in Chromium. The merged findings, Phase 0 results and owner-decision list are in the [QA summary](../../project/QA_USER_TEST_2026-10-28_SUMMARY.md).

## Task map

1. Phase 0: reproduce V1–V4 before fixing anything. Done: V1 at first paint, V2, V3, and V4 (sheet radios only).
2. Phase 1: F1–F16, each with a node test and a Playwright check.
3. Phase 2: flags G1 `homeDueTodayFirst` (off), G2 `showPreviewControls` (on, with `?dev=1`), G3 `creditCardInBillDetail` (off).
4. Phase 3: documentation (this note, session note, dashboard, Screen Map, UI Data Contracts, QA summary, Fixture World reconciliation).

## Existing components searched / reused

Reused: `assetAccounts` (moved to `src/core/accounts.js`; `account-display.js` re-exports it), `accountDisplay` naming, Fixture World obligations with the `withPaid` overlay (`billRecordsForState`), the shared `formatDate`, `activityCategories`, native `#sheet` focus handling, the Floating Island CSS variables, `transferProblem`, and `src/config/feature-flags.js`. New helpers: `accountsForPicker` and `duplicateAccountName` in core; `pickerAccounts` and `accountOptionLabel` (one display-name resolver); `creditCardCycle`; `billFieldError`; `amountMatches`; `dueTodayFirst`; `previewControlsVisible`.

## Verification

- `npm run check`: PASS, 734 keys per locale, fresh shell.
- `npm test`: 190/190, 0 failures (was 171). 19 new tests are in `tests/qa-round2.test.mjs`. Two existing assertions were updated to the new source or flag list; no test was removed.
- `npm run pwa:build`: no diff after the build.
- `scripts/qa-wp20.mjs` (Playwright, Chromium): 72/72 checks. They include a 192-cell matrix (6 sizes × light/dark × TH/EN × 8 pages) with 0 page errors and 0 horizontal overflow, the 2× text reflow pages, the account scenario, sheet history, and cross-page values (116,850; 15,240; 3 / 80, 12–18 Oct; 12,750 → 4,500 with the card page agreeing).
- Details: [Session S1](../20-Sessions/TASK-GS-WP20-QA-ROUND2-S1.md).

## Open decisions / limitations

- V1 is only partly fixed. With padding and scroll-padding, anything scrolled into view is uncovered. At first paint, content below the fold still sits behind the island. A full fix touches D23 and is listed for the owner.
- Credit-card sample rows duplicate Everyday-account spending. This is documented, not edited: see the [reconciliation](../../project/FIXTURE_WORLD_RECONCILIATION.md).
- Physical devices, Safari/WebKit, screen readers and native text zoom were not tested.

## Next action

Owner reviews [Draft PR #17](https://github.com/kraveerachat/GisSino-Fn/pull/17), the flagged items (G1–G3) and the candidate OPEN questions in the QA summary. No merge or receipt until owner acceptance.
