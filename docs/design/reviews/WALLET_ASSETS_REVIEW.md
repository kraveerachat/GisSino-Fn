---
id: DESIGN-WALLET-ASSETS-REVIEW
type: design
level: 2
status: CURRENT
updated: 2026-10-18
up: ../Design-Hub.md
related:
  - ../../pages/wallet/Page-Wallet.md
  - ../../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md
  - ../../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md
source_sha: 184b2f7053940f7e2129d41c8f61342c76a7b875
---
# Wallet assets and monthly history — S2 review

## Current state

Final independent A: **SHIP**, after inspecting all 12 final after captures and current source; no P0/P1 or further polish. Baseline A was 23/40; final SHIP was not rescored. Independent B provisionally scored 17/20; its two P2 findings were corrected. Tested scope is runtime verified; implementation delivery is CLOSED, owner review/merge pending. [D32 S2](../../project/DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) supersedes only S1 Wallet presentation. [S2](../../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) retains detailed evidence and limitations.

## Before / after / why

| Before (S1) | After (S2) | Why |
|---|---|---|
| Four-category assets + obligations ring and primary debt/card sections | Assets-only Bank royal blue, E-wallet cyan, Cash amber; Current-only muted Bills link | Focus Wallet on money held and keep obligations in their existing destination |
| Broad, quieter ring/legend composition | Bold rounded separated proportional sectors, compact centered total and three color-matched summary links | Follow the owner's reference direction and tighten visual hierarchy |
| No monthly archive mode | Overview default; History with year select and scrollable available months | Distinguish current balances from explicit first-of-month snapshots |
| Activity mix had no selected-month control | Independent account percentage/value buttons, selected-month filtering, sibling detail anchors | Make the activity summary useful without accidental navigation or nested controls |
| Unnecessary underline/divider treatment on cards | Preserved notched provider cards with clean body links and 12px activity text | Retain identity and readability with less visual clutter |

At 390px the first account begins at 753.7px in Current versus prior 772.6px; History at 839.8px includes period controls. These are observed composition measurements, not universal fold guarantees.

## Before / after captures

| View | Before | After (Current, light) |
|---|---|---|
| Phone | [Before phone](wallet-assets/before-phone.png) | [After phone](wallet-assets/after-phone.png) |
| Desktop | [Before desktop](wallet-assets/before-desktop.png) | [After desktop](wallet-assets/after-desktop.png) |

Parent copied these four PNGs unchanged from local evidence. The complete ignored local matrix is `artifacts/wallet-assets/`: three before captures and 12 after captures across phone/tablet/desktop, light/dark and current/history. No image edits or extra test run are implied by the copies.

## Data and accessibility decisions

Only bank/ewallet/cash assets determine ring shares; current synthetic THB 116,850 excludes obligations. Supporting current obligations remain deduplicated THB 12,750. Frozen synthetic snapshots cover July–October 2026 and November–December 2025 at each month's day 1, 00:00 Asia/Bangkok. Archive balance/type/currency/archived state remain independent of current profiles; selected-month activity is a separate measure. Missing months are disabled. No historical liabilities are fabricated; historical account entry explicitly opens current detail.

Activity matches account/currency/year-month, excludes own transfers and invalid calendar dates, and exposes unavailable rather than invented ratios. Exact integer minor units/BigInt, unknown/overflow and separate THB/USD safeguards remain. Privacy removes amounts, percentages and proportional geometry. No storage, production snapshot job, ledger, FX, backend or dependency.

B corrections move the image role onto SVG so the central total stays exposed in the accessibility tree, and reject impossible calendar dates before timezone month filtering. Native controls have visible focus; activity buttons and account links are siblings. The supplemental Chromium AX tree exposes 116,850. Computed sRGB contrast sampled 31 text pairs per theme after 300ms settling: minimum 5.31 light / 5.49 dark, failures empty. Corrected 200% text enlargement doubles each absolute computed font size once and passes 390/820/1440px without overflow/clipping. The original compounded relative-font-size harness was invalid and established no app defect.

## Verification and delivery

- Parent `npm run check`: 521 matching TH/EN keys; `npm test`: 66/66, including 14 Wallet tests. Initial sandbox localhost EACCES resolved in the elevated final run; no source issue attributed to it.
- Inspected `round1.json`: 56 layouts (7 viewports × 2 themes × 2 locales × 2 modes), 14 narrow edge cases, 15 named functional groups, errors/failures empty and no overflow/clipping. The invalid original scaling string is excluded; three corrected scaling cases are separate.
- Exactly-once B detector: empty findings, exit 0; no overlay server. Final A SHIP follows all 12 after captures/current source, with no rescore.
- Inspected `accessibility.json`: AX exposure, contrast and corrected text enlargement as described above. Physical screen readers/devices, actual browser/OS zoom, iOS/Safari/touch and cross-browser certification remain untested. Desktop Chromium emulation is the tested runtime; no production claim.

Source `184b2f7053940f7e2129d41c8f61342c76a7b875` is committed/pushed on `task/gs-ui-wallet-v2` in existing [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8). Documentation closeout follows this verified source; parent will verify and report the final remote head in the handoff. Owner review/merge remains pending. No new receipt; the S1 receipt remains unchanged.

Source manifest (7): `src/app.js`, `src/i18n.js`, `src/styles/wallet.css`, `src/wallet-history.js`, `src/wallet-overview.js`, `src/wallet.js`, `tests/wallet.test.mjs`. Docs manifest and four copied image paths are recorded in [S2](../../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md). No Home PR #7 changes or other-worktree import.

## Change log

- 2026-10-18 — Recorded S2 source, before/after comparison, independent final SHIP and measured runtime/accessibility evidence; original S1 and receipt preserved.
