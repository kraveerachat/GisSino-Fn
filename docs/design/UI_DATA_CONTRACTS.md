# UI data contracts and future boundaries

Wallet now reads explicit synthetic `accountType` metadata; `kind` selects an icon and must not determine financial classification. Existing daily/savings samples are bank assets. Empty E-wallet/Cash categories do not imply zero balances in real accounts. The existing total excludes the separate card liability. `cardReturn` is transient navigation context, never a financial record.

Blue enamel additions: `creditCard` records synthetic outstanding/full amounts in integer minor units, statement/due day, currency, and display-only suffix. Minimum amount stays explicitly unrecorded. `dailySpending` supplies seven synthetic bars. These fixtures imply no backend schema. Amount helpers validate display entry without posting a transfer. Card actions and the reminder never call an issuer or persist data.

These are presentation needs, not a database schema or finalized financial rules.

| Surface | Needed presentation fields |
|---|---|
| Summary | Reporting currency, displayed total, available allowance, committed amount, reporting period, calculation availability, freshness |
| Account | Stable display ID, localized display name, type, safe display suffix, formatted balance, currency, visibility permission |
| Transaction | Display ID, name, category, income/expense/own-transfer kind, amount/currency, account label, timestamp/day group, needs-details status |
| Bill | Display ID/name/type, due date/period, displayed committed amount/currency, status, optional installment position |
| Habit | Owner display name, level, XP/progress, streak, freeze allowance, milestone states |
| Party member | Public display ID/name, opt-in habit metrics, visibility state. Exclude all account, balance, and itemized transaction fields |
| Preview form | Mode, positive decimal amount, name, account, date or different destination account; receipt/AI/check-in capabilities separately marked unavailable |

## State contract

Future data adapters must distinguish loading, ready, empty, error, unavailable, unauthorized, and stale data. Never represent unavailable or unauthorized financial values as zero. Error messages must support safe recovery and preserve entered fields. Unauthorized states must not render protected data. This preview demonstrates presentation states without implementing real authorization or a network service.

## Integration boundary

Replace synthetic fixtures with authorized view models through a future feature/data adapter, never direct database access inside render functions. Financial calculations and posting belong outside these UI modules. Future saves require actual persistence and confirmation before success copy is shown. AI drafts require review; own-account transfers remain distinct from expenses. Party's adapter must enforce the nonfinancial field allowlist before delivery, not merely hide private values in CSS.

The current server rejects production startup and serves no mutation endpoint. No production application or build exists in this slice; fixtures cannot be considered excluded from a future build until that build's integration is tested.
