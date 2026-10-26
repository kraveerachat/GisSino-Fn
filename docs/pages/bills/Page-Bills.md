---
id: PAGE-bills
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-26
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../design/UI_DATA_CONTRACTS.md
  - ../../project/DECISIONS.md
  - ../../worklog/10-Tasks/TASK-GS-UI-BILLS-V2-S1.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-FLOATING-ISLAND-NAVIGATION, TASK-GS-UI-BILLS-V2-S1]
---
# Bills

## Current state

The Bills v2 preview lives at `#bills`. [bills-overview.js](../../../src/bills-overview.js) projects explicit synthetic cycles into a selected-month list/calendar; [bills-ui.js](../../../src/bills-ui.js) renders the overview, details and manual-entry previews. [Bills CSS](../../../src/styles/bills.css) scopes the porcelain/cobalt appearance. The fixed preview clock is **2026-10-18, Asia/Bangkok**, visibly labelled on the screen. There is no authenticated user, saved obligation, ledger posting, bank integration, reminder delivery or production scheduler.

The former screen used four separate category panels, a fixed total, one hard-coded October calendar and a basic detail sheet. Bills v2 uses one dominant monthly summary and one compact chronological list, with a type filter in list mode. A calendar date opens **all** obligations for that day. The Bills-specific Add action leaves global Add unchanged. Mobile retains the floating navigation; desktop retains the sidebar.

## Purpose and rules

- Summarize obligations and reduce payment surprises [DECIDED].
- Subscription entries post automatically in the proposed future system [DECIDED].
- Current actions do not post or mark real obligations paid.

## Sections and details

The details sheet shows amount/date, explicit status, marketplace, financing arrangement and payment source. A five-period sample installment has periods 1–2 paid, period 3 due, ฿5,800 paid, ฿8,700 scheduled remaining and two descriptive products. Product children never add a second payable commitment. The plan progress count is distinct from the next unpaid period. Remaining amount is the sum of unpaid explicit cycles, not a derived equal-payment assumption.

Manual Add opens four type-specific forms: Installment, Credit Card Statement, Monthly Bill and Subscription. Required fields, amount precision, dates and period counts validate before a review screen. Edit returns to entered values; Discard closes the draft. Existing sample items can open a prefilled edit preview. A two-step mark-paid preview changes this page's in-memory projection and progress until reload, with an explicit unsaved label. Neither action saves a record or sends money.

## Data and engines used

The current payable total sums only known, unpaid cycles due in the selected month, by currency, using safe integer minor units. October's THB sample is card ฿8,250 + electricity ฿1,250 + installment period 3 ฿2,900 + subscription ฿350 = **฿12,750**. The earlier overdue phone bill (฿780) appears as a separate subtotal. Paid cycles, future installments and child products do not enter the selected-month total. A card-backed plan with `coveredBy` statement metadata is excluded from duplicate counting. November includes a variable bill with unknown actual amount, excluded rather than shown as zero, and an explicit yearly USD $9.99 subscription displayed separately without invented FX conversion.

The same normalized cycles feed list and calendar; stable cycle IDs, explicit dates and fixed Bangkok day boundaries determine statuses. Only explicit fixture cycles are displayed, with no manufactured historical payments or unsupported future cycles. Short months clamp an entered due day of 29–31 to that month's last day in the draft schedule; this is a documented preview default pending production approval.

## States and edge cases

Empty, loading, error and unavailable states remain. The monthly amount is hidden in non-ready preview states. Mobile calendar has an internally scrollable grid with ≥44px date targets; marked dates open all same-day cycles. Dialogs use existing focus/Escape behavior, visible labels and nearby validation messages. TH/EN, light/dark, privacy hiding and reduced motion are retained.

## Decisions and open questions

Mobile Bills lives inside More under [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation). [D35](../../project/DECISIONS.md#d35--bills-v2-preview-composition-and-manual-obligation-flow) approves the preview presentation only. Production payment, statement coverage, finance charges/allocation and variable-bill rules remain [open](../../project/OPEN_QUESTIONS.md).

## Feature and system inventory

| Feature | Current prototype | Production dependency / milestone |
|---|---|---|
| Monthly commitments, overdue and due-soon | Explicit THB/USD cycle projection | Authorized obligations and ledger view models, M2/M5 |
| List/calendar and four types | Sorted rows, stable IDs, all same-day cycles | User-owned records/calendar adapter, M5 |
| Fixed and variable bills | Exact versus pending/estimated display | Actual-vs-estimate bill lifecycle, M5 |
| Credit-card statements | Sample statement, minimum pending, existing `#credit-card` route | Liability settlement without a second expense, M5 |
| Installments and multi-product detail | Explicit period schedule, paid/next/remaining and descriptive products | Payment transactions, allocation/reconciliation/closure, M5 |
| Marketplace, financing, funding | Distinct metadata and form fields | Final provider/ownership contracts, M5 |
| Subscription configuration | THB/USD draft, monthly/yearly and explicit sample cycles | Auto-post, idempotency, catch-up, price history and FX, M5 |
| Manual add/edit/mark paid | Validated review and session-only preview; no durable write | M1/M2 authentication, user-owned mutations and M5 engine |
| Reminders and notifications | Existing sample bell, no delivery here | In-app/Web Push/email/owner Telegram, M6 |
| Cross-user authorization | No backend exists; cannot be tested or claimed | Owner scoping and BOLA tests before production, M2/M5 |

## Verification and limits

`npm run check` and **94/94 tests** passed. Nine Chromium viewports from 320×568 to 1920×1080 had no page errors or horizontal overflow. The browser exercised detail, validation/review, mark-paid preview, month switch, separate USD/unknown amounts, calendar selection, Escape and dark mode. [Bills review](../../design/reviews/BILLS_V2_REVIEW.md) links captured screenshots and baseline critique. Impeccable's final detector returned `[]` (0 findings). Physical devices, screen readers, production access control and cross-browser checks were not run.

## Change log

- 2026-10-16 — Added from the current Bills prototype.
- 2026-10-26 — Bills v2 task adds selected-month cycle projections, separate overdue subtotal, installment/products/schedule detail, four manual draft forms, preview-only paid action and responsive list/calendar. See [task](../../worklog/10-Tasks/TASK-GS-UI-BILLS-V2-S1.md).
