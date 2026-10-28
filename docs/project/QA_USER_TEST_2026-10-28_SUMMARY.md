---
id: QA-USER-TEST-2026-10-28
type: project
level: 2
status: CURRENT
updated: 2026-10-28
up: PROJECT_GUIDE.md
related:
  - DECISIONS.md
  - OPEN_QUESTIONS.md
  - FIXTURE_WORLD_RECONCILIATION.md
  - ../worklog/10-Tasks/TASK-GS-WP20-QA-ROUND2.md
---
# User test 2026-10-28 — merged findings (WP-20)

## Current state

Two independent user tests ran on 2026-10-28 against `main` at `e584fac`: one by Claude, one by Codex. Both reports stay outside the repository in the testers' own folders. [WP-20](../worklog/10-Tasks/TASK-GS-WP20-QA-ROUND2.md) fixed the items it could reproduce without changing a canonical decision. Items that touch a decision sit behind feature flags. Their defaults keep today's behaviour. Everything stays synthetic and in memory.

Status key: **Fixed** = changed in WP-20 and covered by a test. **Flagged** = new behaviour exists behind a flag that is off by default, or the item is only documented, and both need owner approval. **Deferred** = out of WP-20 scope (persistence, OPEN question or later WP). **Disputed** = the two reports disagree, or the item is by design.

## Phase 0 — the four disagreements, reproduced in Chromium

| # | Question | Before (main `e584fac`) | After (WP-20) |
|---|---|---|---|
| V1 | Does the floating island cover "Review transfer" at 390×844 and keys 7-8-9/0 at 360×740? | **Reproduced** at first paint: the button centre at 390 and keys 7/8/9/0 at 360 are under the island (`elementFromPoint`). Scrolled to the end, nothing is covered. | Padding now follows island height plus safe area, and `scroll-padding-bottom` keeps focused or scrolled-into-view targets above the island. At first paint, content below the fold still sits behind the island. See "Needs owner decision". |
| V2 | Does `#credit-card` still show ฿8,250 due after paying the card in Bills? | **Reproduced.** Wallet moved to ฿4,500, but the card page still showed ฿8,250. | Fixed (F5). The card page shows ฿0.00 and "Paid (preview)". |
| V3 | Type 999999, leave, return to `#transfer`, type 500. Does the amount become 999,999,500? | **Reproduced:** ฿999,999,500.00. | Fixed (F4). The amount is ฿500.00. |
| V4 | Are there touch targets below 24 px at 360 px? | **Reproduced in one place only.** The page-level scan found none (Codex was right). The Party visibility radios inside the sheet were 18×18 (Claude was right). | Fixed (F15). The radios are 24×24 inside rows of at least 44 px. |

## Merged findings

| # | Finding | Source | Status | Where / note |
|---|---|---|---|---|
| 1 | Floating island covers the Transfer primary action and keypad | Claude P1-1 | Fixed (partial) | F1. Covered only at first paint, below the fold. Fully fixing it means hiding the island on `#transfer` or adding a sticky action bar, which touches D23. |
| 2 | Home hero caption still says "6 accounts" after an account is added | Claude P1-2, Codex B02 | Fixed | F2. Shows the real count, pluralized in TH/EN. |
| 3 | New or renamed accounts missing from Add Expense/Income, Transfer and Bills funding | Claude P1-3, Codex B01 | Fixed | F2. One source: `accountsForPicker` in `src/core/accounts.js`. |
| 4 | Bills funding shows raw IDs and hard-coded English in Thai | Claude P1-4, Codex B03 | Fixed | F3. Uses the same display-name resolver as the pickers. |
| 5 | Credit-card page ignores the paid card bill | Claude P1-5 | Fixed | F5. Reads the Bills obligation cycle. |
| 6 | Credit-card sample rows duplicate Everyday-account spending | Claude P1-9 | Flagged | Documented in [reconciliation](FIXTURE_WORLD_RECONCILIATION.md#credit-card-sample-rows-vs-activity-accounts-wp-20-f5-2026-10-28). Amounts not edited. |
| 7 | Transfer draft survives leaving the page; review has no confirm action | Claude P1-8, proposal 8 | Fixed | F4. Draft resets on entering/leaving. The review has "Confirm sample preview" and the "no real transfer is recorded" disclosure. |
| 8 | Back closes the sheet *and* leaves the page | Claude P2-7 | Fixed | F6. A sheet pushes one history entry. Back closes it, and X or Escape pops it. |
| 9 | Review shows raw ISO date and "Category: Expenses" | Claude P2-1, Codex B06 | Fixed | F7. Shared date formatter and a "Type" label. No category picker yet. |
| 10 | Editing only an account name turns "Bank account" into "Savings" | Claude P2-9 | Fixed | F8 in `account-profile.js`. |
| 11 | Activity search cannot find amounts; transfer detail lacks the source | Claude P2-14/P2-15 | Fixed | F9. "8500", "8,500" and "฿8,500.00" all match. A transfer shows From → To; the unassigned source reads "Not recorded" (D37 gap, not invented). |
| 12 | "Cannot update app offline" toast on Welcome | Claude P2-10 | Fixed | F10. Update-failure toasts appear only after this tab starts an update. |
| 13 | Settings Categories says 5, Activity has 14 | Claude P2-12 | Fixed | F11a. Derived from the Activity category registry. |
| 14 | Settings Refresh shows no visible result | Claude E | Fixed | F11b. A toast says the app is up to date or that an update is downloading. |
| 15 | Settings placeholder rows look like working settings | Claude 8, Codex proposal | Fixed | F11c. "Not available yet" badge shown before tapping. The editors themselves are Deferred. |
| 16 | Bills form: one generic error | Claude P2-13 | Fixed | F12. One message per field. The first-due-date / monthly-day pair is kept (merge proposed below). |
| 17 | Duplicate account names give no warning | Claude P2-19, Codex U02 | Fixed | F13. Non-blocking hint; the duplicate is still allowed. |
| 18 | Friends board does not show "your position" | Claude P2-16 | Fixed | F14. Same own-position row as Global. |
| 19 | Small radios, duplicate profile tab stop, ~10 deck tab stops, focus ring, focus on BODY in modal | Claude P2-17/P2-20, Codex B07 | Fixed | F15. Measured: 5 deck stops (was ~10), 1 profile stop on desktop, focus stays in the sheet for 24 Tabs and returns to the opener. |
| 20 | Large text overflows Activity/Bills/Party; nav labels collide | Codex B04/B05 | Fixed | F16. Doubled computed font sizes give 0 overflow on home, wallet, activity, bills, party and settings at 360/820/1440 (TH+EN). The Codex widths (Bills 1222/1515) did not reproduce with this emulation at 820/1440. 360 px did overflow, by up to 145 px. |
| 21 | `px` font sizes make browser text-zoom ineffective | Claude P2-5 | Deferred | rem conversion is explicitly out of WP-20 scope. |
| 22 | Page-zoom 200%: island takes ~25% of the screen | Claude P2-6 | Deferred | Same D23 question as #1. |
| 23 | Huge hero total clipped at 360 | Claude P2-4 | Deferred | Not in WP-20 list. |
| 24 | Home due list cuts "due today" when four rows are overdue | Claude P2-18, proposal 10 | Flagged | G1 `homeDueTodayFirst` (off). Touches D31. |
| 25 | Developer controls visible in the user UI | Claude P2-11, proposal 6 | Flagged | G2 `showPreviewControls` (on). When it is off, the controls show only with `?dev=1`. Touches D28. |
| 26 | Six credit-card quick actions open one-sentence sheets | Claude 8 / proposal | Flagged | G3 `creditCardInBillDetail` (off). The actions then open the Bills detail and payment flow. |
| 27 | Onboarding nickname and first account not used by Home/Party | Claude P1-6, Codex 8 | Deferred | D27/D28 boundary: setup does not mutate data. |
| 28 | Home vs Party week/XP differ after the actionable scenario check-in | Claude P1-7 | Disputed | Codex: the scenario clock is documented as Home-only. Not a default-state regression. D36 default (3 / 80, 12–18 Oct) verified. |
| 29 | Entries change nothing anywhere (no ledger) | Claude P1-10, Codex 10 | Deferred | No persistence/ledger in this WP. Candidate OPEN question below. |
| 30 | Same item labelled "Groceries" vs "Shopping" | Claude P2-2 | Deferred | Category catalog is OPEN (D33). |
| 31 | CE and BE years on one page | Claude P2-3 | Deferred | Dates OPEN; `dateEra` flag unchanged. |
| 32 | Unknown in-app hash goes to Welcome | Claude P2-8 | Deferred | WP-19 canonical router behaviour kept (`#bogus` → `#welcome`). |
| 33 | Bell notice opens Bills list, not the item | Codex U01 | Deferred | Later UX WP. |
| 34 | "This month" beside a point-in-time balance | Codex U03, audit I-4 | Deferred | Q10 OPEN. |
| 35 | Forgot password looks like a link but is disabled | Claude P3 | Deferred | D28 preview scope. |
| 36 | Missing for real use: persistence, edit/delete/undo, category picker, real clock, export/backup, household, PIN | Both §5 | Deferred | Explicitly not in WP-20. |

## Needs owner decision

From Phase 2 (implemented behind flags, all off / unchanged by default):

1. **G1 `homeDueTodayFirst`** (D31 sort/limit): "due today" first, and extra overdue rows collapse into one "N more overdue" row.
2. **G2 `showPreviewControls`** (D28): hide Preview states, View sample states, Adjust preview, and the scenario/clock panel unless the URL has `?dev=1`.
3. **G3 `creditCardInBillDetail`**: credit-card quick actions open the Bills detail and payment flow.

Also raised by WP-20:

4. **Floating island on Transfer (D23).** Padding and scroll-padding stop the island from covering anything that has been scrolled into view. A complete fix for first paint needs one of two changes: hide the island on `#transfer` and other task flows, or add a sticky action bar. Both change D23 presentation.
5. **Bills form date pair.** Proposal: ask for the first due date once and derive the monthly due day, keeping the OPEN short-month rule. Not changed.
6. **Credit-card sample rows.** Keep them, remove them, or replace them with card-only Fixture World rows (see reconciliation).

Candidate OPEN questions (recorded, **not answered**):

- Start real persistence (local ledger, e.g. IndexedDB)?
- Real clock vs the frozen 18 Oct 2026 snapshot?
- Remove or de-emphasize Global ranking (D34, Q7)?
- Account deck vs list on phones (D24)?
- Shorten onboarding (D27, Q4/Q9)?
- Merge the credit-card page into the bill detail?
- rem-based type scale?

## Change log

- 2026-10-28 — Created by WP-20 from the Claude and Codex user-test reports.
