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

## Wallet summary decision — 2026-10-18

[DECIDED for Wallet mock UI] [D32](DECISIONS.md#d32--wallet-composition-and-notched-account-cards) puts asset total at the center and obligations separately; ring percentages use the labelled assets + obligations composition basis, never net wealth. Debit money is represented only by linked bank balance; no debit fixture exists. THB/USD remain separate without FX. This closes the Wallet-specific summary choice for [Wallet task](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md) only; the Home Q10 row below and separate unmerged Home PR #7 remain untouched.

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
| Streak primary party (Q8) | [OPEN] | Confirm streak card rank is derived from the user's designated primary party. |
| DOB & Marital status (Q9) | [OPEN] | Confirm verbal mentions of exact birth date and marital status are excluded from registration requirements. (Conflict 6) |
| Gross balance vs Net worth (Q10) | [OPEN] | Should Home hero balance display Gross Assets or Net Worth (assets minus credit card liabilities)? |

## Change log

- 2026-10-16 — Consolidated open decisions from both owner-supplied source documents.
- 2026-10-17 — Appended Q1–Q10 planning questions covering spending leaderboards, demographics, PDPA minor consent, group models, and balance semantics for [TASK-GS-PLAN-005](../worklog/10-Tasks/TASK-GS-PLAN-005.md).

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) records the public signup/Google proposals as pending separate approval before M1; invite-only remains canonical.

- 2026-10-18 — Recorded the owner-confirmed Wallet-only summary/debit decision D32; no change to Home Q10 or production finance choices.

- 2026-10-18 — [D32 S2](DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) confirms assets-only Wallet/monthly history and current-only Bills reference. No new Wallet design decision remains open; Home Q10 and production finance/snapshot architecture remain separate. [S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) tested scope runtime verified/final SHIP; source184b2f7 pushed, delivery CLOSED and owner review/merge pending.
