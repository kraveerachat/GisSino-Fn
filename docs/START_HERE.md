---
id: START-HERE
type: center
level: 0
status: CURRENT
updated: 2026-10-18
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

[Home v2 owner revision S2](worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md) is RUNTIME VERIFIED, awaiting owner review on existing `task/gs-ui-home-v2-s1` / [Draft PR #7](https://github.com/kraveerachat/GisSino-Fn/pull/7), verified OPEN/DRAFT at startup HEAD `173b1d124371edd7108b60f3298eb6fcb4acf191`. The compact composition puts unchanged Accounts first, then Today/Safe, a two-zone habit calendar/check-in preview and Recent last; monthly Home UI is removed and due notices move to the bell. Source `292f346b814d41775d2a569d3ed31bef390040ce` is pushed;545keys/66tests and corrected70case/26capture/16functional browser checks pass, scoped parent finish PASS after review corrections. Documentation checkpoint/final Git equality remains pending parent reconciliation. [Home inventory](pages/home/Page-Home.md#feature-and-system-inventory) separates18 current/future systems and M2-M8 dependencies. Login XP and monthly destination remain OPEN. CLOSED S1 and its receipt remain historical, byte-for-byte preserved.

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
