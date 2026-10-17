---
id: DESIGN-UI-DATA-CONTRACTS
type: design
level: 2
status: CURRENT
updated: 2026-10-18
up: Design-Hub.md
related:
  - UI_DESIGN_SPEC.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
---
# UI data contracts and future boundaries

## Current state — Wallet v2 presentation model (2026-10-18)

[wallet-overview.js](../../src/wallet-overview.js) derives nonarchived bank/ewallet/cash assets from session profile records; debit and credit are not cash assets. Existing card outstanding plus unpaid bill/installment/subscription records form obligations; duplicate bill IDs and the card-backed `card` bill are excluded. With current fixtures: assets THB 116,850, credit8,250 + bill 1,250 + installment 2,900 + subscription 350 = obligations12,750. Ring denominator129,600 is assets + obligations; center asset total and separately labelled obligations are never net wealth. Debit money belongs only to its linked bank balance; no debit records are fabricated.

Safe integer minor amounts are checked before BigInt summation and exact-cent display formatting; invalid or overflow totals return unknown. Missing amount is never zero. Negative/unknown/all-zero composition suppresses proportional arcs and percentages. THB and USD aggregate separately, with no FX; unsupported currency is disclosed rather than silently converted. Movement mix filters matching stable account IDs (or existing legacy account names) to income/expense in account currency, excluding own transfers; it rounds the share from recorded amounts. Current daily fixture yields98% in/2% out; no matching/valid positive volume means unavailable, not a fabricated ratio. Hidden mode omits all values, percentage text, proportional arcs and movement widths. This is a local synthetic view model; production ledger/FX/ownership contracts remain unimplemented. See [Wallet](../pages/wallet/Page-Wallet.md), [D32](../project/DECISIONS.md#d32--wallet-composition-and-notched-account-cards), [task](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md).

Source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8); final finish SHIP, owner review/merge and final documentation checkpoint remain pending.

## Current state — pre-Home transient boundary S4

[preview-flow.js](../../src/preview-flow.js) exports eleven public routes and the ordered six-step setup list. Existing route/locale/translator state remains shared; public light rendering leaves dashboard theme preference intact. Route access does not authenticate. [Auth](../pages/auth/Page-Auth.md), [D28](../project/DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode) and [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) define scope.

The in-memory model allowlist is `displayName`, `nickname`, `avatar`, `birthYear`, `gender`, `consentDemo`, `accountType`, `providerId`, `currency`, `inApp`, `push`, `emailNotice`, `installPlatform`. Unknown keys are rejected. Names cap at 60 characters, year at four; enumerated choices/booleans are checked. Provider selection reuses the existing registry and safe resolver. Changing type selects its existing default provider. All rendered user text is escaped. This is temporary UI state, not a user/schema contract; refresh resets it. Optional birth year is AD, valid four-digit years from 1000 through the current year show current-year-minus-year approximate age. This syntactic range is not an age category, legal threshold or minor eligibility rule; exact birth date and marital status are absent.

Email, password and signup confirmation remain DOM-only, outside the model; invitation input is absent from this design preview. Primary and Google actions call the same demo continuation: Login → Home, signup → Profile, with either empty or typed inputs. Continuation explicitly empties existing credential-node values before route replacement, including detached-node references. App route/locale rerender additionally clears those values before innerHTML replacement; the independent targeted B recheck passed old/new credential-node erasure on locale rerender. It does not validate or accept credentials as an identity. There is no OAuth redirect, provider authorization/token, hardcoded identity, authentication/registration/Google success or session. No credential is sent, logged, cached or persisted. Production validation/password policy remains an M1 requirement; relaxing this preview does not authorize empty-field production registration. Optional birth-year syntax validation remains. Canonical invite-only production policy and invite model/history are preserved; public signup and Google production direction require separate owner confirmation and security architecture approval before M1.

Consent is a demo boolean without timestamps or PDPA/compliance assertion. First Accounts reads only provider identity and THB/USD choice, with no balance, conversion, account ID, account creation or fixture mutation. Notification booleans call no permission API, subscribe to nothing and send no email. Install platform controls instructions only; no service worker, install request or success simulation. Postcard can display escaped nickname but writes neither `setup_completed_at` nor `welcome_seen_at`. No storage, cookies, network mutation, session or persistent profile/financial record is introduced. Existing dashboard account-profile demonstrations remain separate.

## Dashboard current state — S3

S3 adds presentation-only `accountView` (`vertical` by default or `horizontal`) and preserves `accountSelected` by stable account ID across Settings changes. All six account records render through one complete folder component; overlap and interaction use local geometry, not changed financial data. No card text is swapped during a gesture. Existing `accountProfiles`, ID/currency/minor balance preservation, unknown-provider fallback, hidden-value suppression and session-only profile boundaries continue unchanged. [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) records evidence.

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

## Account Board display adapter

Supersedes the earlier two-bank-only fixture statement: six synthetic assets now include bank, ewallet and cash, totaling unchanged THB116,850. `id`, `accountType`, `providerId`, localized name/optional nickname, integer `balanceMinor`, THB/USD currency, optional safe suffix/context, archived flag and sort order are presentation data. Legacy `amount` stays consistent for existing form/transfer previews; this is not a production schema. No missing amount becomes zero.

[providers.js](../../src/providers.js) contains identity/accent/provenance only, never financial values. [account-display.js](../../src/account-display.js) resolves safe fallback/theme, formats balance by account currency, escapes names and suppresses hidden balances consistently. [Provider Catalog](PROVIDER_CATALOG.md) records the current 19 identities and provenance for 13 owner-supplied PNGs; other providers retain safe fallbacks. The earlier 18-candidate/all-artwork-withheld statement was superseded by S2. A future production adapter must enforce ownership/visibility before data reaches the client; this UI toggle is not authorization.

## Change log

- 2026-10-16 — Added vault metadata and linked this note from the [Design Hub](Design-Hub.md) for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 session account profiles

state.accountProfiles starts as a copy of fixtures. Add/edit updates this array through account-profile.js with allowlisted bank/ewallet/cash type, matching provider, nickname<=60, suffix<=12, type-appropriate label, navy/cobalt/slate folderTone and provider/neutral accentTone. Existing records retain ID/currency/minor balance. New records have a generated sample ID,THB currency and undefined balanceMinor (never fabricated zero). Home/Wallet/detail use the same array; transfer/transaction demonstrations still use their original fixtures. No storage or network save.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


- 2026-10-16 — [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) supersedes the S1/S2 tab-strip and Stack/Grid presentation with complete overlapping folders.


- 2026-10-17 — Documented A01 public preview extension for [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); retained dashboard S3 history.

- 2026-10-17 — Reconciled owner-requested pre-Home S3 preview for [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md); S1/S2 history remains preserved.

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) / D28 replaces only pre-Home copy, open-signup/Google presentation and demonstration navigation; production security and prior session history remain preserved.

- 2026-10-18 — Added scoped Wallet v2 current state for [TASK-GS-UI-WALLET-V2-001](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md); final verification/delivery pending.
