---
id: PROJECT-OPEN-QUESTIONS
type: guide
level: 2
status: CURRENT
updated: 2026-10-18
up: Project-Hub.md
related:
  - PROJECT_GUIDE.md
  - DECISIONS.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
  - ../design/ONBOARDING_HOME_V2_ROADMAP.md
---
# Open Questions


## Activity monthly analytics — 2026-10-18

[D33](DECISIONS.md#d33--embedded-activity-monthly-analytics) settles current UI placement: monthly donut/categories embedded in existing Activity. Independent Summary route/tab remains deferred. Production M2/M3 refund/return, reversal/adjustment, savings/investment transfers, linked records, credit settlement/deduplication and canonical category persistence remain OPEN; catalog labels create no accounting policy. Future authorized owned queries and coherent historical months are unimplemented. Home Q10/Safe placement/reward/Party policies remain separate. [Activity task](../worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md).

## Wallet summary decision — 2026-10-18

[DECIDED for Wallet mock UI] [D32](DECISIONS.md#d32--wallet-composition-and-notched-account-cards) puts asset total at the center and obligations separately; D32 S2 supersedes original S1 composition with assets-only Current/monthly History, never net wealth. Debit money is represented only by linked bank balance; no debit fixture exists. THB/USD remain separate without FX. This closes the Wallet-specific summary choice for [Wallet task](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md) only; the Home Q10 row below remain separate; Home PR7 and Wallet PR8 are merged per Activity start audit.

These questions come from the Project Guide, System Architecture, and the GS-PLAN-005 Onboarding/Home v2 planning roadmap. Agents must not silently choose answers.

| Topic | State | Source question |
|---|---|---|
| Domain and tunnel | [OPEN] | Reuse an AEGIS subdomain or use a new domain/tunnel? |
| Physical host | [OPEN] | Same physical server as AEGIS or a separate one? |
| Production stack | [OPEN] | Confirm Next.js, self-hosted PostgreSQL, PostgreSQL job queue, and an auth library with passkey support. |
| LLM | [OPEN] | Provider, monthly budget, and whether processing must remain local. |
| Email | [OPEN] | Provider for password reset and digests. |
| FX | [OPEN] | Verify availability and terms for the selected daily USD→THB source. |
| Backups | [OPEN] | Choose the off-host backup destination. |
| Party visibility | [OPEN] | Decide whether Full visibility may include itemized data; source recommendation is never. |
| Party invites | [OPEN] | Owner-only or any member? |
| Dates | [OPEN] | Offer Buddhist-era display? |
| CSV import | [OPEN] | Which Thai banks should be supported later? |
| Development shell | [OPEN] | Confirm the owner’s ongoing development OS/shell; current repository work uses Windows/PowerShell. |
| Production registration policy | [OPEN — PENDING OWNER/SECURITY APPROVAL before M1] | Owner requested public signup presentation in [D28](DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode). Decide whether to change canonical invite-only production signup; retain invite model/history and security policy until separately approved. |
| Google production authentication | [OPEN — PENDING OWNER/SECURITY APPROVAL before M1] | Approve provider/security architecture, actual OAuth, identity/session integration and validation separately. Current Google controls only navigate the design demonstration; no OAuth or provider-success claim. |
| M1 credential validation/password policy | [OPEN] | Define actual production validation/password requirements. Empty-input preview navigation is not production acceptance. Existing invite parameters/expiry decisions remain unresolved. |
| Primary navigation | [DECIDED 2026-10-16] | Closed by [D23](DECISIONS.md#d23--responsive-primary-navigation). |
| Spending board metric (Q1) | [OPEN] | Rank absolute spending within category, or percentage of income saved/spent? Which direction ranks first? (Conflict 1) |
| Age bands & Child board (Q2) | [OPEN] | Confirm exact age bands (Child ≤12, Youth 13–22, Working 23–59, Retired 60+), and whether Child is standalone or merged. (Conflict 2) |
| Minimum age & Minor consent (Q3) | [OPEN] | Minimum registration age and parental consent verification mechanism under Thailand PDPA. (Conflict 2) |
| Gender data purpose (Q4) | [OPEN] | Confirm gender is stored only, optional ("ไม่ระบุ"), and prohibited from ranking or friend recommendations. (Conflict 3) |
| Party vs Family model (Q5) | [OPEN] | Is Family a separate entity or a party record of kind `family`? Analyst recommends single entity. (Conflict 4) |
| Spending board opt-in (Q6) | [OPEN] | Confirm spending boards are strictly opt-in, default OFF, displaying position only. (Conflict 5) |
| Global board audience (Q7) | [OPEN] | Confirm whether all opted-in members appear on Global board with nickname, category, and rank only. |
| Streak primary party (Q8) | [OPEN] | Confirm streak card rank is derived from the user's designated primary party. Historical S1 used explicitly synthetic optional rank. The compact S2 habit card links to Party without choosing a primary-party policy. |
| DOB & Marital status (Q9) | [OPEN] | Confirm verbal mentions of exact birth date and marital status are excluded from registration requirements. (Conflict 6) |
| Gross balance vs Net worth (Q10) | [OPEN] | Should Home hero balance display Gross Assets or Net Worth (assets minus credit card liabilities)? |
| Home destination follow-ups | [OPEN / LATER SLICE] | S3 reuses existing Bill details/View all Bills without filter/highlight; needs-details prefilter remains later work. D33 implements embedded monthly analytics in the Activity slice; separate Summary tab remains deferred. |
| Safe-to-Spend future placement | [OPEN / FUTURE WALLET DESIGN] | D31 removes Home UI only; retain exact minor-unit math/scenarios/tests. Reconsider placement during Wallet/dashboard redesign; PR7 creates no Wallet UI. |
| Home live reminders and totals | [OPEN / FUTURE ENGINE] | Fixed Bangkok snapshots and dated habit fixtures are prototype-only; monthly expense data remains while its Home UI is removed. Define authorized ledger/obligation/habit adapters and scheduling in M2/M3/M5/M6/M7. |

| Monthly Summary placement for Activity S1 | [DECIDED 2026-10-18; D33] | Owner selects embedded analytics in existing Activity. D30 destination question is settled for this slice; separate Summary tab deferred. Home Q10/Safe placement/production accounting remain separate. |
| Login/app-open automatic XP | [OPEN — CONFLICTING OWNER PROPOSAL] | Current Guide §6 and architecture §7.7 qualify entry (including needs-details), confirmed No spending today, paid obligation or reconciliation; login/app-open is not qualifying and grants no XP. Any change needs explicit rule approval and authoritative M7 design, never frontend-only grants. |
| Home weekly activity ring | [PROPOSED PRESENTATION] | D30 demonstrates qualifying Bangkok Monday-Sunday active dates /7, rounded. Confirm eventual integration alongside existing canonical metrics rather than replacing them. |
| Daily welcome/reward scheduling | [PROPOSED / FUTURE M7] | Define first relevant visit, per-user/day first-visit and popup shown-state, authoritative grants and preferences. Current sheet is user-triggered with a page-lifetime date guard only. |

## Change log

- 2026-10-16 — Consolidated open decisions from both owner-supplied source documents.
- 2026-10-17 — Appended Q1–Q10 planning questions covering spending leaderboards, demographics, PDPA minor consent, group models, and balance semantics for [TASK-GS-PLAN-005](../worklog/10-Tasks/TASK-GS-PLAN-005.md).

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) records the public signup/Google proposals as pending separate approval before M1; invite-only remains canonical.

- 2026-10-18 — Recorded Home S1 route/engine follow-ups and clarified Q8 remains OPEN; no production selection or financial engine policy was chosen.

- 2026-10-18 — Added monthly destination/login-XP conflicts and daily-popup/weekly-metric follow-ups for [Home S2](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md).

- 2026-10-18 — Owner [Home S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) reconciles seven-day Due soon, Home Safe removal with retained math and missing activity versus frozen days; other contracts preserved.


- 2026-10-18 — Recorded the owner-confirmed Wallet-only summary/debit decision D32; no change to Home Q10 or production finance choices.

- 2026-10-18 — [D32 S2](DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) confirms assets-only Wallet/monthly history and current-only Bills reference. No new Wallet design decision remains open; Home Q10 and production finance/snapshot architecture remain separate. [S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) tested scope runtime verified/final SHIP; source184b2f7 pushed at the historical S2 checkpoint. PR8 is now merged at `90a81e8d7a44fc5472e254be7c2197c0e5fc411f`, per Activity start audit.

- 2026-10-18 — D33 settles current Activity monthly placement; tab deferred and production classifications remain OPEN.
