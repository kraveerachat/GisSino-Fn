---
id: SESSION-TASK-GS-PLAN-005-S2
type: session
level: log
status: CLOSED
updated: 2026-10-17
up: ../10-Tasks/TASK-GS-PLAN-005.md
related:
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
  - ../../pages/auth/Page-Auth.md
  - ../10-Tasks/TASK-GS-PLAN-005.md
task: TASK-GS-PLAN-005
---
# Session S2 — GS-PLAN-005 Documentation Corrections

## Objective

Apply four owner-directed documentation-only corrections to Draft PR #5 on branch `task/gs-plan-005-onboarding-home-v2`. No code, no new screens, no DB changes.

## Corrections applied

### Correction 1 — Authentication parameters marked [PROPOSED]

**File:** `docs/design/ONBOARDING_HOME_V2_ROADMAP.md` — Screen A03 (Invite Sign-up)

- Invitation code field changed from "6-character/token field" to **[PROPOSED] 6-digit code field** with explicit note that HOME_AND_LEADERBOARD_SPEC D-K cites "random 6-digit code" and owner must confirm before M1.
- Password strength requirements (minimum 10 chars, mixed case, numbers) marked **[PROPOSED]** — exact policy requires owner decision.
- Expiration period changed from "48–72 hours" (implied decided) to **[PROPOSED]** with explicit note that PROJECT_GUIDE.md §5.4 specifies codes are "single-use, expiring" but does not specify duration.

**File:** `docs/pages/auth/Page-Auth.md`
- Change log updated to note auth parameters are [PROPOSED], not decided.

### Correction 2 — Age bands, minor eligibility, and guardian consent marked [OPEN]/[VERIFY]

**File:** `docs/design/ONBOARDING_HOME_V2_ROADMAP.md` — Screens A05 and A06

- A05 birth year picker: All four age-band boundaries (Child ≤12, Youth 13–22, Working 23–59, Retired 60+) marked **[PROPOSED]** with inline [OPEN] blockquote: "Minimum signup age and exact age-band boundaries have not been decided."
- A06 minor consent: Hard-coded threshold "< 15" removed and replaced with **[OPEN — see OPEN_QUESTIONS.md Q3]** noting that the specific threshold (e.g., < 13, < 15, < 20) must be confirmed against Thailand PDPA before any implementation.

**File:** `docs/pages/auth/Page-Auth.md` — States and edge cases
- Minor Consent state changed from "(PDPA VERIFY)" to **[OPEN — OPEN_QUESTIONS.md Q3]** with explicit statement that the threshold has not been decided.

### Correction 3 — E-Wallet list aligned to Provider Catalog

**File:** `docs/design/ONBOARDING_HOME_V2_ROADMAP.md` — Screen A07 (First Accounts)

- Previous text: "Preset selector (TrueMoney, Rabbit Line Pay, ShopeePay)"
- Corrected text: "Preset selector from the [Provider Catalog](PROVIDER_CATALOG.md) — confirmed owner-supplied assets: **TrueMoney, ShopeePay, Paotang**."
- DeepPocket noted as registered with fallback display (no owner-supplied image).
- **"Rabbit Line Pay" explicitly called out as NOT confirmed in the Provider Catalog** and must not be added without verification.

**Provider Catalog evidence:**
- `truemoney` — ewallet, owner-supplied image confirmed.
- `shopeepay` — ewallet, owner-supplied image confirmed (shoppeepay.png).
- `paotang` — ewallet/app, owner-supplied image confirmed (Paotang.png); Krungthai-linked per D24.
- `deeppocket` — ewallet, no owner-supplied image; fallback display supported.
- Rabbit Line Pay — **NOT in providers.js or PROVIDER_CATALOG.md**.

### Correction 4 — Negative Safe-to-Spend display rule corrected

**File:** `docs/design/ONBOARDING_HOME_V2_ROADMAP.md` — Block 5A (Safe to Spend)

- Previous text (incorrect): "If negative, displays ฿0.00 with warning color (Crimson) and helper text … Never hides the negative reality."
- This contradicted itself — displaying ฿0.00 IS hiding the negative reality.
- Corrected text: **[DECIDED: Honest UI — PROJECT_GUIDE.md §4.5]** Show the **actual negative amount** in Crimson (e.g., −฿1,500). **Never clamp to ฿0.00** — doing so misrepresents the user's financial position.

## Also committed in this session

- `docs/worklog/00-Index/Task-Dashboard.md` — status update from previous session (CLOSED + PR #5 link)
- `docs/worklog/10-Tasks/TASK-GS-PLAN-005.md` — PR #5 URL added and corrections scope recorded
- `docs/worklog/20-Sessions/TASK-GS-PLAN-005-S1.md` — next step updated
- `docs/worklog/90-Receipts/20261017-020500-TASK-GS-PLAN-005-FINAL.md` — final receipt (committed here, not modified)

## Verification

- `npm run check`: PASS (375 locale keys, syntax valid, local assets verified, catalog-only Thai UI copy).
- `npm test`: PASS (34/34 tests passed, 0 failures).
- Markdown link integrity: Verified across all touched files.
- Application source code, tests, CSS, package.json: ZERO changes.

## Change log

- 2026-10-17 — Session S2 created for [TASK-GS-PLAN-005](../10-Tasks/TASK-GS-PLAN-005.md) corrections.
