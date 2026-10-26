---
id: START-HERE
type: center
level: 0
status: CURRENT
updated: 2026-10-26
---
# GisSino_FN — Start Here

## What this project is

- **Name:** GisSino (repository `GisSino_FN`). *Gis* comes from Aegis and means shield/protection; *Sino* means Asia/opportunity; *FN* means Finance.
- **Tagline:** “Protecting Wealth in the Asian Era.”
- **Goal:** a calm daily-use personal-finance app for one person, family, and friends, covering wallets, daily activity, obligations, assisted entry, habits, and a family status/ranking party.
- **System:** the current repository is a Thai-first, mobile-first, buildless HTML/CSS/JavaScript prototype with synthetic in-memory data and no backend. The proposed future system is an installable PWA backed by services on the owner’s home server through Cloudflare Tunnel. See the [Project Guide](project/PROJECT_GUIDE.md) and [System Architecture](architecture/SYSTEM_ARCHITECTURE.md).
- **History:** work evolved from the earlier Sina_FN prototype and AEGIS lessons into a focused mock-data UI; the first baseline, desktop-sidebar, vault migration, and Account Board PRs are merged. See [Project History](project/PROJECT_HISTORY.md) and [Decisions](project/DECISIONS.md).

## Table of contents

- [Project](project/Project-Hub.md)
- [Pages](pages/Pages-Hub.md)
- [Architecture](architecture/Architecture-Hub.md)
- [Design](design/Design-Hub.md)
- [Governance](governance/Governance-Hub.md)
- [Task Dashboard](worklog/00-Index/Task-Dashboard.md)
- [Obsidian home pointer](00-Home.md)

## Current focus

[Bills v2](worklog/10-Tasks/TASK-GS-UI-BILLS-V2-S1.md) is delivered for owner visual review in [Draft PR #10](https://github.com/kraveerachat/GisSino-Fn/pull/10) on `task/gs-ui-bills-v2-s1`. Its selected-month totals, installment details, list/calendar and four validated entry forms use synthetic in-memory data; no payment or durable record is created. [Page contract](pages/bills/Page-Bills.md), [review captures](design/reviews/BILLS_V2_REVIEW.md) and [D33](project/DECISIONS.md#d33--bills-v2-preview-composition-and-manual-obligation-flow) describe the tested scope. Activity PR #9 is separate and may need integration after merge. The older Wallet/Home paragraphs below preserve their historical checkpoints.

[Wallet v2](worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md) has CLOSED implementation delivery for [S2](worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) on the same branch `task/gs-ui-wallet-v2` and existing [PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8). [D32 S2](project/DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) changes Wallet to an assets-only blue/cyan/amber ring, Current/monthly History, frozen first-of-month synthetic snapshots and independent monthly activity toggles. Primary liability sections are removed; Current may retain one small Bills reference. S2 tested scope is runtime verified: 521 keys/66 tests, 56 layouts/14 edges/15 groups, 12 after/3 before captures with no artifact errors/overflow/clipping. Final A is SHIP; corrected 200% text enlargement and AX/contrast checks pass. Source `184b2f7053940f7e2129d41c8f61342c76a7b875` is pushed in the same Draft PR #8; documentation closeout follows verified source and final remote head is reported in handoff. Owner review/merge pending. Prior S1 SHIP and immutable receipt remain historical. Home PR #7 has since merged into main; production action is outside scope.

Home [PR #7](https://github.com/kraveerachat/GisSino-Fn/pull/7) was MERGED into main on 2026-10-18. Earlier Home S3 delivery evidence (now historical): [Home v2 owner revision S3](worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) is RUNTIME VERIFIED, awaiting owner review on existing task/gs-ui-home-v2-s1 / [Draft PR7](https://github.com/kraveerachat/GisSino-Fn/pull/7). Parent verified clean startup bcc3073795e75e5c13d31c828d2d3bb6a5a00740, OPEN/DRAFT and unchanged main. Accounts → max 4 seven-day Due soon → existing habits/missing days → Recent last. Home Safe UI removed/math retained; bell/reminder and reward/freeze engines unchanged. Source 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324 committed/pushed; parent check 550 keys/tests 70, browser84 cases/19 captures/11 groups errors[]issues[], A32/40 Good / no findings, B none, detector[] and parent finish PASS. Docs checkpoint/final Git equality pending parent reconciliation. [Home inventory](pages/home/Page-Home.md#feature-and-system-inventory) retains18 system boundaries. Future Safe Wallet placement/monthly destination/login-XP proposal remain OPEN. Historical S1/S2 sessions and receipt preserved.

Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) is verified MERGED at `7fb1685c8b8e40faf07ef9354be920f4706be92c`; Welcome [PR #6](https://github.com/kraveerachat/GisSino-Fn/pull/6) is verified MERGED at `bb27e2812789346fc322d4bad3fc6d847ed3823d`. Account Board [PR #4](https://github.com/kraveerachat/GisSino-Fn/pull/4) remains merged at `a028036bcea997245fd4d2536c121813d2c2dd33`. These are current integration facts supplied by the parent's GitHub verification; closed tasks/sessions/receipts retain their historical checkpoint claims unchanged. Production invite-only signup remains canonical; public signup/Google production approval remains pending before M1 in [Open Questions](project/OPEN_QUESTIONS.md).

## Agent reading order

1. [Universal workflow](governance/UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md)
2. [Project workflow adapter](governance/PROJECT_WORKFLOW_ADAPTER.md)
3. [Project Guide](project/PROJECT_GUIDE.md)
4. [System Architecture](architecture/SYSTEM_ARCHITECTURE.md)
5. [Vault Rules](governance/VAULT_RULES.md)
6. [Decisions](project/DECISIONS.md)
7. The active task note and every page, architecture, or design note it touches

## Change log

- 2026-10-16 — Created as the vault center for [TASK-VAULT-STRUCTURE-001](worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).
- 2026-10-17 — Updated current focus to [TASK-GS-PLAN-005](worklog/10-Tasks/TASK-GS-PLAN-005.md) (Onboarding, Home v2, and screen roadmap).

- 2026-10-17 — Current focus moved to A01 Welcome; reconciled PR #4 merge.

- 2026-10-17 — Reopened current focus for owner-requested [Welcome S3](worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md); same Draft PR #6, final documentation/Git delivery pending after finish SHIP.

- 2026-10-17 — Reopened current focus for [Welcome S4](worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md), same Draft PR #6; final review and source/docs delivery pending.

- 2026-10-18 — Current focus moved to Home v2 S1; reconciled verified PR #5/#6 merge SHAs in the current index while preserving closed historical notes.

- 2026-10-18 — Reopened current focus for owner Compact Home/gamified [S2](worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md), same Draft PR7; historical S1 delivery remains preserved.

- 2026-10-18 — Owner [Home S3](worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) reconciles seven-day Due soon, Home Safe removal with retained math and missing activity versus frozen days; other contracts preserved.


- 2026-10-18 — Current focus moved to the new Wallet v2 task; prior delivery records retained in dashboard/history.

- 2026-10-18 — Reopened Wallet current focus for [S2](worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md); same Draft PR #8, verification/delivery pending.
