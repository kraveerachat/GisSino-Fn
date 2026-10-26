---
id: TASK-GS-UI-BILLS-V2-S1
type: task
level: log
status: INTEGRATION VERIFIED
updated: 2026-10-26
up: ../00-Index/Task-Dashboard.md
related:
  - ../../pages/bills/Page-Bills.md
  - ../../design/reviews/BILLS_V2_REVIEW.md
  - ../../design/UI_DATA_CONTRACTS.md
  - ../../project/DECISIONS.md
  - ../20-Sessions/TASK-GS-UI-BILLS-V2-S1-S1.md
  - ../20-Sessions/TASK-GS-UI-BILLS-V2-S1-INTEGRATION.md
branch: task/gs-ui-bills-v2-s1
pr: https://github.com/kraveerachat/GisSino-Fn/pull/10
---
# TASK-GS-UI-BILLS-V2-S1 — Bills v2 mock UI

## Objective and authority

The owner requested a compact, premium, mobile-first Bills page with reliable selected-month totals, installment detail, four manual obligation forms, responsive review evidence and one new Draft PR. The source brief is the 2026-10-26 Bills v2 task. The preview remains synthetic and in memory. No production payment, posting, reminder, authentication, persistence or external provider integration was authorized.

## Delivery

The old four-panel screen and fixed October total became one monthly summary, one chronological list, a shared list/calendar projection and type filtering. The summary separately labels overdue money and keeps THB/USD apart. An installment detail shows period 3/5, paid and remaining amounts, its explicit schedule, products, marketplace, financing and funding. The Add Bills action opens type-specific forms with validation, review, edit and discard. A two-step mark-paid action changes only page memory until reload. The global Add, Home, Wallet and Activity behavior remain separate.

Source: `src/bills-overview.js`, `src/bills-ui.js`, `src/styles/bills.css`, `src/app.js`, `src/screens.js`, `src/i18n.js`, `index.html`; focused checks: `tests/bills.test.mjs`. [Page contract](../../pages/bills/Page-Bills.md) and [visual review](../../design/reviews/BILLS_V2_REVIEW.md) contain the observed details.

## Feature and system inventory

Owner decision status applies to every row: D35 decides only the UI behavior delivered in this PR. Production behavior is OPEN/DEFERRED unless separately stated in the canonical architecture; automatic subscription posting is an approved future direction still unimplemented in M5. The milestone column is a dependency, not evidence that the engine exists.

| Feature | Current prototype | Future production behavior / decision | Data dependency | Milestone | This PR |
|---|---|---|---|---|---|
| Monthly committed total | Known unpaid due cycles by selected month and currency | Owner-approved obligation projection | User-owned cycles, status | M2/M5 | UI/model |
| Overdue total | Prior known unpaid cycles separate | Authorized arrears projection | Cycles and payment events | M5 | UI/model |
| Due-soon indicators | Bangkok fixed preview date and status text | Real clock and notification preferences | Due events | M5/M6 | UI/model |
| List and calendar | Shared normalized cycles; all same-day entries | User-owned calendar query | Stable cycle IDs | M5 | UI/model |
| Monthly bills | Explicit sample cycles | Fixed/variable bill lifecycle | Bill account, actual amount | M5 | UI/draft |
| Variable bills | Unknown actual shown pending; estimate separate | Owner-approved estimate/actual transition | Invoice amount/status | M5 | UI/draft |
| Credit-card statements | Linked sample card and statement detail | Settlement as liability transfer, no second expense | Card, statement, ledger | M5 | UI/draft |
| Installment plans | Explicit 5-period schedule | Actual contract/payment reconciliation | Plan, schedule, payment events | M5 | UI/draft |
| Multi-product detail | Descriptive products under one payable plan | Item allocation rules remain open | Plan-child relation | M5 | UI |
| Marketplace and financing | Separate labels | Provider/merchant identity rules open | Merchant/provider records | M5 | UI/draft |
| Funding accounts | Distinct optional source | Owner-scoped account association | Accounts, permissions | M2/M5 | UI/draft |
| Payment schedule | Explicit fixture cycles; draft fixed schedule | Irregular/fees/partial payment rules open | Schedule amounts/dates | M5 | UI/model |
| Next installment | Next explicit unpaid period | Actual status from ledger | Period/payment events | M5 | UI/model |
| Paid installments | Explicit fixture paid flags | Reconciled paid events | Payment transactions | M5 | UI/model |
| Remaining amount | Sum of unpaid explicit periods | Contract balance and fees rules open | Unpaid schedule | M5 | UI/model |
| Subscription configuration | THB/USD monthly/yearly draft | User-owned configuration | Plan and payment source | M2/M5 | UI/draft |
| Automatic subscription posting | No scheduler | Approved auto-post, idempotency, catch-up | Jobs, ledger, FX | M5 | Deferred |
| Manual add and edit | Validated unsaved review | Authenticated owner-scoped writes | User/session and obligations | M2/M5 | UI only |
| Mark paid | Two-step session projection | Verified payment/settlement event | Ledger and authorization | M5 | UI only |
| Reminder delivery | No dispatch | T-3/due/overdue with preferences | Jobs, channels | M6 | Deferred |
| Notification integration | Existing synthetic bell only | In-app/Web Push/email/owner Telegram | Events, permissions | M6 | Deferred |
| User-owned records | No backend | Durable CRUD and ownership | M1/M2 auth/data | M2/M5 | Deferred |
| Cross-user authorization | Cannot test without backend | BOLA prevention and tests | Owner-scoped APIs | M2/M5 | Deferred |

Production rules for statement coverage, irregular installments, partial payment, finance charges, variable bill confirmation and subscription FX remain [open](../../project/OPEN_QUESTIONS.md). [D35](../../project/DECISIONS.md#d35--bills-v2-preview-composition-and-manual-obligation-flow) decides preview presentation only.

## Verification and review

`npm run check` passed; `npm test` passed 94/94, including 10 grouped Bills tests. Chromium covered nine viewport sizes from 320×568 to 1920×1080, TH/EN and light/dark interactions, form errors/review, detail, calendar day, month change, paid preview and Escape. No page errors or horizontal overflow were observed. Impeccable final detector returned `[]` (0). Physical devices, screen readers and production access-control tests were not run. See [session](../20-Sessions/TASK-GS-UI-BILLS-V2-S1-S1.md) and [screenshots](../../design/reviews/BILLS_V2_REVIEW.md).

## Integration and owner gate

The owner approved the mockup and explicitly authorized merging PR #10 after verification. Activity PR #9 merged to main at `18e087e360734d52b0a66a026da34834afdc70d3`. A normal merge of that main into this existing Bills branch preserves Activity monthly analytics and Bills obligation flows. The conflicting D33 decision number belongs to Activity; Bills is D35, with all Bills links updated. Both scoped CSS imports, route state, event handlers and Thai/English catalog entries coexist. See [integration session](../20-Sessions/TASK-GS-UI-BILLS-V2-S1-INTEGRATION.md) for exact checks and conflict files. PR #10 remains open until GitHub checks and mergeability are confirmed.

No production finance, authentication, persistence or payment behavior is implied. The historical [delivery receipt](../90-Receipts/20261026-TASK-GS-UI-BILLS-V2-S1-FINAL.md) remains unchanged.

## Change log

- 2026-10-26 — Implemented and runtime verified Bills v2 for Draft PR review.

- 2026-10-26 — Activity PR #9 integration verified on existing Bills branch; 641 locale keys, 112 tests and Chromium combined routes/interactions passed.
