---
id: TASK-GS-UI-WELCOME-001
type: task
level: log
status: IN PROGRESS
updated: 2026-10-17
up: ../00-Index/Task-Dashboard.md
related:
  - ../../pages/auth/Page-Auth.md
  - ../../design/UI_DESIGN_SPEC.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
  - ../20-Sessions/TASK-GS-UI-WELCOME-001-S3.md
---
# TASK-GS-UI-WELCOME-001

## Current state

Reopened for owner-requested [S3](../20-Sessions/TASK-GS-UI-WELCOME-001-S3.md): responsive full-viewport Welcome with one Get Started → Entry and the complete eleven-route pre-Home design preview. Login UI never authenticates and uses a separate demo Home action. Signup preview → six setup steps → Postcard → Home is navigable with transient data only. [D27](../../project/DECISIONS.md#d27--owner-requested-pre-home-preview-revision) records the dated routing/visual revision while preserving original D4/D25 history. Current status is IN PROGRESS pending final documentation commit/push and Git/PR delivery reconciliation. S1/S2 CLOSED delivery and their historical evidence do not close S3.

- Existing branch: `task/gs-ui-welcome-001`; same existing [Draft PR #6](https://github.com/kraveerachat/GisSino-Fn/pull/6), parent-confirmed OPEN/DRAFT; parent confirms title/body updated to `feat(ui): add responsive pre-Home journey preview`; final docs/head synchronization pending.
- Main base retained: `a028036bcea997245fd4d2536c121813d2c2dd33` (merged PR #4).
- S3 initial source/check/test checkpoint: `a48378463c9945a85f925496db4babfb2f70f67d`; final signup recovery correction checkpoint `a5aa80ece3c1a01619795c7ca3d1276d0d7a9672` changes only preview-flow.js (+7/-1). Parent confirms source push on the existing branch; final documentation/PR synchronization remains pending.
- Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) remains untouched/unmerged at `03065adbb023aafaac15a26bca99a123f6c2fe0e`; roadmap is a read-only planning reference.
- No new PR, receipt, merge, main push, force-push, infrastructure or production action.

## Objective and authority

The owner requested a complete responsive redesign and expanded navigable pre-Home preview within the existing branch/PR. Confirmed direction: full-viewport architectural art, bolder Welcome branding and calmer porcelain forms. Reuse exact four committed WebPs and S2 white/blue shield, current hash router, catalog/local font/material tokens and provider registry. Preserve Home/Account Board/Wallet behavior and production security/data boundaries. User authorizes implementation, tests, living docs and existing-branch commit/push/PR update; merge remains owner-only.

## Acceptance and remaining gates

- [x] Read canonical governance/guide/architecture/vault/decisions/task plus unmerged planning reference without adopting unresolved proposals.
- [x] Responsive Welcome: one canonical shield, one Get Started → Entry, correct tablet/desktop source precedence, no contain bands/stretching.
- [x] Entry/Login/signup and six separate setup steps/Postcard/Home preview; explicit demo boundaries and direct wizard exit.
- [x] UI validation, optional AD year/approximate age without groups/eligibility, shared providers/THB/USD without balances, guide-only installation.
- [x] Parent checks and browser matrix executed; 52 tests and 479 locale keys pass, including rerun after signup recovery correction.
- [x] Canonical living docs/D27 and new S3 session written; S1/S2/receipt preserved.
- [x] Reconcile B targeted signup recovery and final finish SHIP against correction a5aa80e; no open verified issues/material fixes.
- [x] Documenter vault health PASS: 56 notes/56 IDs, max 3 clicks, no errors; git diff --check PASS. Parent reruns after final delivery fields.
- [ ] Commit/push only the existing branch; verify local/remote/PR SHA, already updated title/body and OPEN/DRAFT state.
- [ ] Close S3/current task only after remaining gates and handoff; do not create another final receipt for this same task.

## Current behavior and safety boundary

[Auth](../../pages/auth/Page-Auth.md) and [Screen Map](../../design/SCREEN_MAP.md) own all eleven public hashes. Six setup steps are Profile/About/Consent/Accounts/Notifications/Install. Valid Login clears fields and stays unavailable; signup UI continuation/no-data skip opens Profile, never a verified user. DOM-only credentials clear on routing; allowlisted selections live only in memory and reset on reload. Previous/Next, hash Back/Forward, locale, title/main focus and invalid-route fallback work. Public light appearance does not replace dashboard theme. This is presentation, not authorization.

No session, auth cookie, storage, user record, invite acceptance, legal consent/timestamp, financial account/balance/conversion/fixture mutation, push permission, service worker, email sending or installed-success state. No saved setup/welcome timestamp. Invitation parameters, password policy, demographic age/guardian rules and production models stay OPEN. Optional birth year/gender are transient only. First Accounts reuses existing identity/logo registry without duplicating providers. Install instructions use parent-verified Apple/Chrome guidance. Assets are unchanged.

## Verification evidence and limits

Parent-executed `npm run check`: PASS 479 keys per locale. `npm test`: PASS 52/52, rerun after signup timing correction. Directly inspected local `artifacts/welcome-s3/tests.txt` and `qa.json`: 154 measurements (11 routes × 14 viewport sizes), 40 final captures, 13 passing functional groups, errors[]/issues[]. Viewports: 320×568,360×800,390×844,430×932,844×390,768×1024,820×1180,1024×1366,1024×768,1180×820,1366×1024,1280×800,1440×900,1920×1080. Tests cover routing, credentials/UI validation, transient reset, six steps, consent/permissions boundaries, retained Home/Wallet/Account Board, TH/EN, focus/history, reduced motion, overflow and correct assets.

A reviewed the initial 38 captures and scored 28/40; three priorities were corrected in one batch: main outline, direct wizard exit and installation copy. Parent's 40-capture matrix includes those fixes; documenter directly inspected eight representative final captures. B ran the detector exactly once: JSON[] saved in `detector.json`. Full B assessment reports 63 passing checks and one P2 signup recovery defect: corrected confirm-field error disappeared on blur, moving Submit about 30.09px during pointer down/up. Parent patched input-clear/blur-add-only validation timing. Targeted B recheck resolved the P2: with confirm still focused, one pointer click kept Submit y=541.390625 through down/up/click, reached `#setup/profile` and cleared prior credential nodes (`signup-recovery-correction.json`). Historical 63-pass/one-failure evidence remains in assessment-b.json; current open verified issues are P0/P1/P2/P3=0. Final finish reviewer returned **SHIP**, all five sections, material fixes None, after 40 captures plus two canonical references and the resolved correction. Overlay probe intentionally produced five CSP console refusals/four blocked requests, distinct from app console/page/request errors 0/0/0. Artifacts are ignored local evidence, not public URLs.

Physical devices/iPad, screen readers, real browser zoom, cross-browser and production certification are unperformed. Fresh affected checks/captures are required after relevant source changes. Documenter vault/whitespace results are recorded in S3 after execution; final delivery claims remain pending.

## Sessions and immutable history

- [S1](../20-Sessions/TASK-GS-UI-WELCOME-001-S1.md) — CLOSED historical initial Welcome, source `598bff84aa53fa76341c0dfc761e07bbb7466195`, 41 tests/383 keys; S1 finish ship predates S3.
- [S2](../20-Sessions/TASK-GS-UI-WELCOME-001-S2.md) — CLOSED historical exact-shield follow-up, asset checkpoint `c52800ce9abaa6ff292b93aca7fb365b2094268d`.
- [S3](../20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) — IN PROGRESS current responsive journey expansion and review/delivery reconciliation.
- [Existing final receipt](../90-Receipts/20261017-152135-TASK-GS-UI-WELCOME-001-FINAL.md) — immutable S1 snapshot, unchanged. Same task/PR; no new receipt.

## Exact S3 manifest

Runtime/check/test files (8): `src/welcome.js`, `src/preview-flow.js`, `src/styles/welcome.css`, `src/app.js`, `src/i18n.js`, `scripts/check.mjs`, `tests/welcome.test.mjs`, `tests/preview-flow.test.mjs`. No asset changes. Ignored local QA scripts/captures/JSON/logs are not PR files.

Documentation files (15): `docs/START_HERE.md`; `docs/architecture/SYSTEM_ARCHITECTURE.md`; `docs/design/COMPONENT_INVENTORY.md`; `docs/design/DESIGN_TOKENS.md`; `docs/design/SCREEN_MAP.md`; `docs/design/UI_DATA_CONTRACTS.md`; `docs/design/UI_DESIGN_SPEC.md`; `docs/pages/Pages-Hub.md`; `docs/pages/auth/Page-Auth.md`; `docs/project/DECISIONS.md`; `docs/project/PROJECT_GUIDE.md`; `docs/project/PROJECT_HISTORY.md`; `docs/worklog/00-Index/Task-Dashboard.md`; `docs/worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md`; `docs/worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md`.

## Touches and next action

[Auth](../../pages/auth/Page-Auth.md), [Pages Hub](../../pages/Pages-Hub.md), [UI spec](../../design/UI_DESIGN_SPEC.md), [Tokens](../../design/DESIGN_TOKENS.md), [Components](../../design/COMPONENT_INVENTORY.md), [Screen Map](../../design/SCREEN_MAP.md), [Data Contracts](../../design/UI_DATA_CONTRACTS.md), [Decisions](../../project/DECISIONS.md), [Guide](../../project/PROJECT_GUIDE.md), [Architecture](../../architecture/SYSTEM_ARCHITECTURE.md), [History](../../project/PROJECT_HISTORY.md), [Start Here](../../START_HERE.md) and [Dashboard](../00-Index/Task-Dashboard.md).

Parent completes final documentation commit/push, local/remote/PR SHA synchronization and delivery status reconciliation. Reviews and source correction are complete; PR title/body are updated. Owner then reviews the existing Draft PR and decides merge separately. Root DESIGN.md/PRODUCT.md are preserved; S3 records pre-existing drift without an unsolicited system rewrite.
