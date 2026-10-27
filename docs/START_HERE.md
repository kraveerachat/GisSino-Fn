---
id: START-HERE
type: center
level: 0
status: CURRENT
updated: 2026-10-28
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

2026-10-28 owner-approved integration: [PR #13](https://github.com/kraveerachat/GisSino-Fn/pull/13) is MERGED at `d7ad46dae97e1a59b61f09f2b6c565d81afa2c8a` and [PR #14](https://github.com/kraveerachat/GisSino-Fn/pull/14) at `11861094b299aa5ca64dc4298a7d6ba429d00e5d`. The [ordered integration session](worklog/20-Sessions/TASK-GS-MERGE-13-15-S1.md) records the verified combined [PR #15](https://github.com/kraveerachat/GisSino-Fn/pull/15) checkpoint; its live GitHub page is authoritative for the final merge state. Earlier delivery paragraphs below are historical.

Owner selected [Batch A — PWA shell/install guide](worklog/10-Tasks/TASK-GS-WP09-10-PWA.md) after the WP-01 audit in [PR #12 merged](https://github.com/kraveerachat/GisSino-Fn/pull/12). Batch A is delivered in separate [PR #13](https://github.com/kraveerachat/GisSino-Fn/pull/13), with source/browser verification and owner acceptance tracked in its [review](design/reviews/PWA_SHELL_REVIEW.md). It installs only the synthetic preview shell; production stack and offline financial writes remain unimplemented.

[WP-01 repository audit](project/AUDIT_2026-10_LOGIC_AND_DATA.md) is merged from wp-01-repository-audit ([PR #12 merged](https://github.com/kraveerachat/GisSino-Fn/pull/12)). It maps current logic/data and reusable components before any remediation or redesign. No application behavior changed. The original referenced screenshots were unavailable; eight replacement views and their numeric traces are explicitly identified.

[Activity v2](worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md), [Bills v2](worklog/10-Tasks/TASK-GS-UI-BILLS-V2-S1.md) and [Party v2](worklog/10-Tasks/TASK-GS-UI-PARTY-V2-S1.md) are merged in [PR #9](https://github.com/kraveerachat/GisSino-Fn/pull/9) (`18e087e360734d52b0a66a026da34834afdc70d3`), [PR #10](https://github.com/kraveerachat/GisSino-Fn/pull/10) (`40d52ff9e0ae9dc4f610b485f930f94855a9c0ca`) and [PR #11](https://github.com/kraveerachat/GisSino-Fn/pull/11) (`cd1fa82906c203ba4db93616db6ad6fd3e70a0a3`). The combined prototype passed `npm run check` (693 keys per language), `npm test` (121/121) and final-main Chromium checks on all five routes at 390/820/1440px in light/dark. Activity [D33](project/DECISIONS.md#d33--embedded-activity-monthly-analytics), Party [D34](project/DECISIONS.md#d34--party-friends-and-global-preview) and Bills [D35](project/DECISIONS.md#d35--bills-v2-preview-composition-and-manual-obligation-flow) are distinct. [Integration notes](worklog/20-Sessions/TASK-GS-UI-PARTY-V2-S1-INTEGRATION.md) record conflict resolution.

These are synthetic, in-memory design previews. Financial posting, payment, authentication, persistent records and real cross-user Party access are not implemented.

Parent verified Home [PR7](https://github.com/kraveerachat/GisSino-Fn/pull/7) MERGED at `175677c` and Wallet [PR8](https://github.com/kraveerachat/GisSino-Fn/pull/8) MERGED at base SHA. Prior closed sessions/receipts retain historical checkpoint evidence. Other production/privacy/finance/habit/Party policies and unresolved decisions remain in force.

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

- 2026-10-18 — Current focus moved to Activity v2 S1/D33; reconciled merged Home/Wallet base.
