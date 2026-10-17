---
id: TASK-GS-UI-HOME-V2-S1-S3
type: session
level: log
status: RUNTIME VERIFIED
updated: 2026-10-18
up: ../10-Tasks/TASK-GS-UI-HOME-V2-S1.md
related:
  - ../../pages/home/Page-Home.md
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/UI_DESIGN_SPEC.md
  - ../../design/UI_DATA_CONTRACTS.md
  - ../../project/DECISIONS.md
  - ../../project/OPEN_QUESTIONS.md
  - ../00-Index/Task-Dashboard.md
---
# TASK-GS-UI-HOME-V2-S1 / S3 — Seven-day due list and missing activity days

## Authority and starting state

2026-10-18 owner continuation, same task/gs-ui-home-v2-s1 and existing [Draft PR7](https://github.com/kraveerachat/GisSino-Fn/pull/7). Parent verified clean local/remote/PR HEAD bcc3073795e75e5c13d31c828d2d3bb6a5a00740, OPEN/DRAFT and unchanged main bb27e2812789346fc322d4bad3fc6d847ed3823d. No new PR, merge, force-push, deletions or production. Direct owner asks English output, superseding attachment Thai-report preference. Relative status plus short date confirmed.

DOCS_WRITE role per adopted workflow§4.2; parent owns source/tests/browser/review/Git/PR. Read AGENTS, adopted workflow/adapter, Guide/Architecture/Vault Rules, D29/D30, affected Home/design/current task and Owner Revision3 brief. Preserve S1/S2 session bytes and immutable receipt; no new receipt.

## Focused behavior and source inspection

Preserved cover/hero/actions/navigation precede unchanged Accounts → conditional seven-day Due soon → existing habits with missing-day summary → Recent last. Safe Home UI and Today are absent; nearest/monthly remain absent. Integer-minor calculation/formatter/currency isolation/negative scenarios/fixtures/financial tests remain for future Wallet design; no Wallet rendering.

Due soon includes valid unpaid overdue/today/+7 calendar days inclusive against selected Bangkok time. Exclude paid/invalid/+8/duplicates. Stable date then ID and same-ID or name/date/currency/amount dedupe; max 4 category/title/status/short-date rows, no inner scroll, empty hides. Existing real Bill IDs/details; card uses established credit-card tracking route, others existing dialog; View all Bills no filter. No mutation of financial source arrays.

Home seven-day information changes no bell<=3 day preview or canonical T-3/due/overdue schedule, delivery/preferences/dispatcher.

Missing means strictly past current-week dates without qualifying/completed activity; frozen included, pending today/future excluded. Existing first-missing focus/timeline/atomic status identify dates; frozen stays blue/snowflake/no activity. Zero gets positive text. Streak/weeklyXP/4/7 ring, gestures/keyboard, freeze model, shared No spending today check-in, idempotent illustrative reward and reduced motion remain unchanged. App-open/login never awards XP.

Documenter inspected blueHome call order, upcoming projection and missingDays/calendar selection code. This source inspection is not an executed test/browser result.

## Source manifest

Seven exact changed source/test paths at committed/pushed source 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324:
- src/blue-screens.js
- src/home-overview.js
- src/habit-preview.js
- src/i18n.js
- src/styles/blue.css
- tests/home-overview.test.mjs
- tests/habit-preview.test.mjs

No new runtime module. Existing app Bill handler, fixture arrays, account/deck/provider/assets/navigation are reused unchanged. Parent verified source diff matches the seven-file plan; source 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324 committed and pushed.

## Verification ledger

| Check | Actual current S3 evidence |
|---|---|
| npm run check | Parent reports PASS 550 locale keys / syntax/assets |
| npm test | Parent final full repository run PASS 70/70 |
| Seven-size browser / themes / TH-EN | Parent final qa.json84 cases/19 captures/11 functional groups, errors[]/issues[]; documenter inspected JSON counts and capture list |
| Design / technical / finish review | Independent A32/40 Good / no findings, B no material findings; one post-A detector[]; parent final visual finish PASS; actual reports local |
| Source/docs commit/push/local-remote-PR equality | Source 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324 committed/pushed; documentation checkpoint/final equality pending parent reconciliation |
| Vault health / protected bytes | Direct strict checker70 notes/70 IDs/max 3 clicks; exactly 3 inherited findings/zero new; protected normalized content unchanged, history append-only, inventory18 rows / 8 columns, whitespace pass |
| Physical device / screen reader / cross-browser | NOT PERFORMED |

S2's545keys/66tests/70cases/26captures and S1 evidence remain historical. No test count/capture/checkpoint is fabricated.

## Vault actions and exact documentation manifest

Existing living notes cover each topic; update in place. This one new dated event session is linked from current task/dashboard/focus. No new hub/top-level folder/feature note. Earlier Project History body remains append-only.

15 paths:
- docs/START_HERE.md
- docs/pages/Pages-Hub.md
- docs/pages/home/Page-Home.md
- docs/architecture/SYSTEM_ARCHITECTURE.md (scoped Home§8.1 plus dated change log)
- docs/design/UI_DESIGN_SPEC.md
- docs/design/UI_DATA_CONTRACTS.md
- docs/design/DESIGN_TOKENS.md
- docs/design/COMPONENT_INVENTORY.md
- docs/design/SCREEN_MAP.md
- docs/project/DECISIONS.md (appendD31, preserveD29/D30)
- docs/project/OPEN_QUESTIONS.md
- docs/project/PROJECT_HISTORY.md (append only)
- docs/worklog/00-Index/Task-Dashboard.md
- docs/worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md
- new docs/worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md

The [18-system/eight-column inventory](../../pages/home/Page-Home.md#feature-and-system-inventory) now records removed Safe Home UI/retained math, Today replaced by Due soon, and missing dates versus freeze semantics. Existing M2/M3/M5/M6/M7/M8 dependencies/backlog are unchanged. Party/Activity/Settings, planning/root specs/assets, historical sessions and receipt remain protected.

Inherited strict-health findings: roadmap related-count9, Auth related-count9 (maximum8) and CLOSED planningS2 broken PROVIDER_CATALOG.md relative link. Preserve rather than silently repair unrelated history.

## Open decisions and next action

OPEN: future Safe Wallet/dashboard placement, monthly destination, login/app-open XP conflicting proposal and primary-partyQ8. Current rule grants no app-open XP. No real reminders, transactions, Wallet dashboard or persistent habits/XP. Source/tests/browser/review gates are complete for the stated local scope; parent completes docs checkpoint and final PR reconciliation. Keep PR7 Draft, awaiting owner review. This role makes no Git/PR write or production claim.

## Actual interaction coverage and evidence

Parent final browser matrix uses actual viewport sizes320x568,390x844,430x932,820x1180,1180x820,1440x900,1920x1080 with TH/EN × light/dark × sample/actionable/clear =84 cases. Nineteen captures and 11 functional groups passed, errors[]/issues[]. Source calculations remain covered by retained tests. Actual four Bill IDs resolve: card to existing credit-card tracking, other 3 to existing Bills dialog with Escape; View all reaches Bills. Tests cover +7 vs bell<=3, Bangkok midnight/today/+7 inclusion/+8 exclusion, missing3/View missed focus13 Oct/frozen17 Oct no-activity, Monday zero/pending exclusion, unchanged shared check-in/guard/reload/no-appopen, Account modes/selection/keyboard/wheel, sidebar/mobile routes, emulated touch scrolling, reduced motion and focus after resize. No storage/cookies/permission/write-network effects observed in scoped browser checks.

The first interaction harness used an incorrect .desktop-sidebar selector rather than actual #desktop-sidebar. Parent corrected the harness and resumed interactions without rerunning the already completed84-case matrix. The final artifact is the successful result; the failed selector probe is not counted as a passed test.

A independently inspected TH 390/320, desktop 1440 and English dark:32/40 Good, no material findings. An initial desktop crop hypothesis was falsified by measured main x 240, so it is not an open defect. B found no material issue and measured scoped changed text contrast >=5.51 light and >=5.58 dark; B verified View missed keyboard selection above fixed mobile navigation at 390/320. These scoped measures are not full-app accessibility certification. One detector run after A returned[]/0. Parent directly inspected final mobile 320/390 and desktop 1440 and recorded final finish PASS without a fix batch. Neither physical-device, screen-reader nor cross-browser verification is claimed.

Evidence remains ignored local artifacts/home-v2-s3/qa.cjs, qa.json, design-a.md, technical-b.md and detector.json; no GitHub-uploaded images claimed. Exact captures read from successful qa.json:

- artifacts/home-v2-s3/small-light-th-sample.png
- artifacts/home-v2-s3/small-dark-th-sample.png
- artifacts/home-v2-s3/mobile-light-th-sample.png
- artifacts/home-v2-s3/mobile-light-th-actionable.png
- artifacts/home-v2-s3/mobile-light-en-sample.png
- artifacts/home-v2-s3/mobile-dark-th-sample.png
- artifacts/home-v2-s3/mobile-dark-th-actionable.png
- artifacts/home-v2-s3/mobile-dark-en-sample.png
- artifacts/home-v2-s3/large-phone-light-th-sample.png
- artifacts/home-v2-s3/large-phone-dark-th-sample.png
- artifacts/home-v2-s3/tablet-portrait-light-th-sample.png
- artifacts/home-v2-s3/tablet-portrait-dark-th-sample.png
- artifacts/home-v2-s3/tablet-landscape-light-th-sample.png
- artifacts/home-v2-s3/tablet-landscape-dark-th-sample.png
- artifacts/home-v2-s3/desktop-light-th-sample.png
- artifacts/home-v2-s3/desktop-dark-th-sample.png
- artifacts/home-v2-s3/wide-light-th-sample.png
- artifacts/home-v2-s3/wide-dark-th-sample.png
- artifacts/home-v2-s3/missing-frozen-selected.png

## Documentation verification result

Strict utility wrote ignored artifacts/home-v2-s3/vault-health-documenter.json:70 notes/70unique IDs/max 3 clicks; exactly the 3 inherited findings listed above, zero new errors. Inventory validated18 data rows/eight columns. Normalized-content comparison against HEAD verified protected S1/S2/receipt/planning/root source specifications/app/fixtures/account/deck/navigation unchanged; Project History prior body is a prefix of the new body. Whitespace check passes. CRLF normalization is not a content change. No new receipt or policy/hub was created.

Source 6f1a252 is a verified pushed checkpoint. Current delivery RUNTIME VERIFIED awaiting owner review; documentation commit/push and final local/remote/PR HEAD equality remain pending parent reconciliation. Existing PR7 title/body are to reflect the final three-change scope; no claim that this documenter updated GitHub.
