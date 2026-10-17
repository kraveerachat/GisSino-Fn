---
id: START-HERE
type: center
level: 0
status: CURRENT
updated: 2026-10-17
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

[TASK-GS-PLAN-005](worklog/10-Tasks/TASK-GS-PLAN-005.md) establishes the comprehensive documentation-only planning roadmap: Pre-Home flow (A01–A10), Home v2 block specification (Today strip, Nearest Obligation, Streak with Party rank, one-line summary, compact Leaderboard card), 10-screen feature map, critical conflict analysis, and dual-track implementation milestones. PR #4 (Account Board full-folder deck) is verified MERGED to `main`. This planning task is documentation only; production mutation is NONE.

[TASK-GS-UI-WELCOME-001](worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md) implementation delivery is CLOSED for owner-requested [S4](worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) in the same [Draft PR #6](https://github.com/kraveerachat/GisSino-Fn/pull/6): consumer copy, one compact Demo mode header, signup without invitation UI, Google action presentation and empty/typed Login → Home or signup → six-step setup → Postcard → Home. Latest parent checks pass 472 locale keys/52 tests; final 154 browser cases/39 captures/15 groups pass. A/B fix batch and detector [] are recorded; targeted B passed with no open issue; finish is SHIP; documentation checkpoint `e649eb2228500cf6abaef3958f9b14a1134f5d2c` matched local/remote/PR head; owner review/merge remains pending. [Auth](pages/auth/Page-Auth.md), [D28](project/DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode) and [Open Questions](project/OPEN_QUESTIONS.md) describe boundaries: production invite-only remains canonical, public signup/Google production approval pending before M1. Closed S1–S3 and immutable receipt remain historical; no auth/OAuth/production change.

Account Board [PR #4](https://github.com/kraveerachat/GisSino-Fn/pull/4) is verified MERGED into main at `a028036bcea997245fd4d2536c121813d2c2dd33`, superseding the earlier pending-review claim. Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) remains OPEN/DRAFT and untouched.

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
