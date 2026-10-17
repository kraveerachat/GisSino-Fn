---
id: TASK-GS-PLAN-005
type: task
level: log
status: CLOSED
updated: 2026-10-17
up: ../00-Index/Task-Dashboard.md
related:
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
  - ../../pages/auth/Page-Auth.md
  - ../../pages/home/Page-Home.md
  - ../../project/FEATURE_MAP.md
  - ../../project/HOME_AND_LEADERBOARD_SPEC.md
  - ../../project/OPEN_QUESTIONS.md
  - ../90-Receipts/20261017-020500-TASK-GS-PLAN-005-FINAL.md
---
# TASK-GS-PLAN-005 — Onboarding, Home v2, and Feature Roadmap

## Objective

Synthesize the owner's design decisions from `FEATURE_MAP.md` and `HOME_AND_LEADERBOARD_SPEC.md` into a structured, reviewable planning baseline and GitHub Draft Pull Request. This task is **documentation-only**. It delivers linked specifications and implementation roadmaps for future coding agents to execute in small slices without implementing runtime code, database tables, or live financial services.

## Scope and safety

- Branch: `task/gs-plan-005-onboarding-home-v2`
- Base: `origin/main` at `a028036bcea997245fd4d2536c121813d2c2dd33` (includes merged PR #4)
- Mode: `DOCS_WRITE` / `PLAN_ONLY`
- Target PR: One Draft PR titled `docs(plan): define onboarding, Home v2 and future screen roadmap`
- PR #4: Verified merged; not modified or reused
- Application source code and unit test changes: NONE
- Production, database, network, and hosting mutation: NONE
- AEGIS project mutation: NONE
- File deletion, force-push, and automated merge: NONE

## Pre-Home user journey

Documented in [ONBOARDING_HOME_V2_ROADMAP.md §2](../../design/ONBOARDING_HOME_V2_ROADMAP.md#2-pre-home-flow-specification) and [Page-Auth.md](../../pages/auth/Page-Auth.md):
- **Returning authenticated users:** Login → Home (`#home`).
- **Newly registered users:** Welcome (`#welcome`) → Invite Sign-up (`#signup`) → 6-step First-time Setup (`#setup/*`) → Welcome Postcard (`#postcard`) → Home.
- Planned screens: A01 Welcome, A02 Login (Passkey + email/password), A03 Invite Sign-up (6-token invite code), A04 Profile Setup (name, nickname, avatar), A05 About You (birth year → age category, optional gender), A06 Privacy and Consent (plain-Thai data & slip disclosure, minor acknowledgement), A07 First Accounts (Bank, E-Wallet, Cash presets), A08 Notification Setup (in-app, push, email), A09 Installation Guide (PWA instructions), A10 Welcome Postcard (dismissible, one-time celebration).

## Home current-state inventory and Home v2

- **Current Home Audit:** Audited 14 UI elements across UI presence, preview-only behavior, tested functionality, backend dependencies, limitations, and intended destinations.
- **Home v2 Layout (Top to Bottom):**
  1. Header (greeting, settings profile avatar, trophy to `#party`, notifications bell, desktop Add)
  2. Total Balance Card (THB, hide/show eye toggle)
  3. Quick Actions (รายจ่าย, รายรับ, โอนเงิน, บิล)
  4. Today Strip [NEW] (conditional: due obligations ≤ 3 days, streak at risk > 20:00, `needs_details` items; hidden if empty)
  5. Decision Dual-Tile: Safe to Spend + Nearest Obligation (named bill, due date, amount, days remaining)
  6. Streak Card with Primary Party Rank [NEW] (e.g. `สตรีก 7 วัน · อันดับ 2 ในปาร์ตี้ครอบครัว`)
  7. My Accounts Overlapping Folder Deck (PR #4 baseline strictly preserved)
  8. Recent Transactions (3 rows + "ดูทั้งหมด")
  9. One-Line Monthly Summary Link [NEW] (points to Activity Summary tab)
  10. Compact Global Leaderboard Card [NEW / PLANNED] (age category & period chips, top 3 + personal row, educational opt-in state, amounts hidden)

## Expanded feature roadmap

Defined 10 destinations in [ONBOARDING_HOME_V2_ROADMAP.md §5](../../design/ONBOARDING_HOME_V2_ROADMAP.md#5-expanded-feature-and-screen-map):
1. Activity Summary Tab (`#activity/summary`)
2. Leaderboard Page (`#leaderboard`)
3. Friends Page (`#friends`)
4. Party Creation Modal (`#party/create`)
5. Family Creation Modal (`#family/create`)
6. Visibility Settings (`#settings/visibility`)
7. Notification Inbox (`#notifications`)
8. Welcome Postcard (`#postcard`)
9. What's New Announcements (data-driven modal/banner)
10. PWA Update Notification (service worker prompt)

## Critical conflict review

Identified and recorded 6 approval gates in [ONBOARDING_HOME_V2_ROADMAP.md §6](../../design/ONBOARDING_HOME_V2_ROADMAP.md#6-critical-conflict-analysis-and-owner-approval-gates) and [OPEN_QUESTIONS.md](../../project/OPEN_QUESTIONS.md):
- **Conflict 1 (Spending Rankings):** Project Guide Invariant 6.4-2 forbids money-based rankings. Proposed draft suggests spending boards. Implementation remains `BLOCKED` until owner formally decides metric (percentage vs absolute) and approves amendment.
- **Conflict 2 (Age Bands & Minors):** Draft includes Child (≤12) category. Thailand PDPA minor consent rules tagged `VERIFY`; minimum signup age and guardian verification required.
- **Conflict 3 (Gender & Income Data):** Gender collected but strictly prohibited from ranking or friend recommendations; income bracket strictly conditional on percentage spending metric.
- **Conflict 4 (Party vs Family):** Analyst recommends unified `parties` table with `kind ∈ {'party', 'family'}`.
- **Conflict 5 (Spending Board Visibility):** Opt-in default OFF; transactions never exposed.
- **Conflict 6 (Verbal DOB & Marital Status):** Verbal mentions excluded from specifications; minimal birth year retained.

## Dual-track implementation roadmap

Separated into:
- **UI Prototype Track (S1–S7):** Buildless mock UI slices (Home v2, Summary tab, Leaderboard preview, Friends UI, Onboarding wizard, Postcard, Docs reconcile).
- **Production Track (M0–M11):** Foundations (M0), Auth/Passkey (M1), Ledger (M2), Activity/Slips (M3), FX (M4), Obligations (M5), Notifications (M6), Habits (M7), Party/Leaderboard (M8), AI (M9), PWA/Admin (M10), Hardening/Backups (M11).

## Sessions

- [Session S1](../20-Sessions/TASK-GS-PLAN-005-S1.md) — Documentation drafting, verification, commit, push, and Draft PR creation.
- [Session S2](../20-Sessions/TASK-GS-PLAN-005-S2.md) — Four owner-directed corrections: (1) auth parameters → [PROPOSED]; (2) age bands and minor consent threshold → [OPEN/VERIFY]; (3) E-Wallet list aligned to Provider Catalog (TrueMoney, ShopeePay, Paotang confirmed; Rabbit Line Pay removed as unverified); (4) negative Safe-to-Spend display corrected to show actual negative amount, never ฿0.00.

## Touches

- Specification: [ONBOARDING_HOME_V2_ROADMAP.md](../../design/ONBOARDING_HOME_V2_ROADMAP.md)
- Page Notes: [Page-Auth.md](../../pages/auth/Page-Auth.md), [Page-Home.md](../../pages/home/Page-Home.md), [Page-Activity.md](../../pages/activity/Page-Activity.md), [Page-Party.md](../../pages/party/Page-Party.md), [Page-Settings.md](../../pages/settings/Page-Settings.md)
- Hubs: [Pages-Hub.md](../../pages/Pages-Hub.md), [Design-Hub.md](../../design/Design-Hub.md), [Project-Hub.md](../../project/Project-Hub.md)
- Design Authorities: [SCREEN_MAP.md](../../design/SCREEN_MAP.md)
- Project Governance: [OPEN_QUESTIONS.md](../../project/OPEN_QUESTIONS.md), [PROJECT_HISTORY.md](../../project/PROJECT_HISTORY.md), [START_HERE.md](../../START_HERE.md)
- Owner Planning Inputs: [FEATURE_MAP.md](../../project/FEATURE_MAP.md), [HOME_AND_LEADERBOARD_SPEC.md](../../project/HOME_AND_LEADERBOARD_SPEC.md)
- Worklog: [Task-Dashboard.md](../00-Index/Task-Dashboard.md)

## Verification

- `npm run check`: PASS (syntax, 375 locale keys, local assets, catalog Thai copy).
- `npm test`: PASS (34/34 tests passing).
- Markdown formatting, frontmatter correctness, and relative link resolution verified across all created and touched notes.
- Git diff check against `origin/main`: Clean, documentation-only changes.
- Application code, CSS, tests, databases, and runtime services modified: ZERO.

## Delivery & PR

- Branch: `task/gs-plan-005-onboarding-home-v2`
- Commit: `df20e02` (`docs(plan): map onboarding and Home v2 requirements`)
- PR Title: `docs(plan): define onboarding, Home v2 and future screen roadmap`
- Draft PR URL: [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5)
- GitHub PR Status: OPEN and DRAFT; owner review and merge pending.
- Final Receipt: [Final immutable receipt](../90-Receipts/20261017-020500-TASK-GS-PLAN-005-FINAL.md)
