# Fixture World reconciliation — WP-02 (2026-10-28)

Status: **Balances decided (D37, 2026-10-28): the screen values are canonical.** The missing October transactions are an [open gap](OPEN_QUESTIONS.md#fixture-world-october-gap--2026-10-28). Nothing below was changed to force a match.

Source: [`src/fixtures/world.js`](../../src/fixtures/world.js), checked by [`tests/fixture-world.test.mjs`](../../tests/fixture-world.test.mjs).

## Method

- Mock clock: `2026-10-18T10:00:00+07:00` ([`src/core/clock.js`](../../src/core/clock.js)).
- Opening balances are as of `2026-10-01T00:00:00+07:00`. Each one is taken unchanged from the existing October archive (`walletSnapshots['2026-10']`, which used to live in `wallet-history.js`).
- The October ledger uses only transactions that already exist:
  - the 5 shared `fixtures.transactions`;
  - the 7 Activity-only extras, which used to live in `activity-data.js`.
- The Activity extras already carry the account key `accountDaily`, so they are posted to `daily`. That is the only account the source implies for them.
- Derived balance = opening + ledger entries after the opening instant, up to 18 Oct 10:00 ([`src/core/ledger.js`](../../src/core/ledger.js)).
- The current screen balances are kept unchanged in `worldAccounts[].legacyDisplay`. Home, Wallet and the Account Board still show them.

## Per-account differences at 18 Oct 10:00 (THB)

| Account | Opening 1 Oct | October ledger | Derived 18 Oct | Screen today | Derived − screen |
|---|---:|---|---:|---:|---:|
| daily (Kasikornbank, Everyday) | 64,200 | +42,000 salary; −15,240 expenses | 90,960 | 68,450 | **+22,510** |
| savings (SCB, For tomorrow) | 35,500 | none posted (see transfer below) | 35,500 | 37,400 | **−1,900** |
| reserve (Kasikornbank) | 5,000 | — | 5,000 | 5,000 | 0 |
| everyday-wallet (TrueMoney) | 2,200 | — | 2,200 | 2,500 | **−300** |
| pocket-cash (Cash) | 1,400 | — | 1,400 | 1,500 | **−100** |
| family-savings (BAAC) | 2,000 | — | 2,000 | 2,000 | 0 |
| **Total assets** | **110,300** | | **137,060** | **116,850** | **+20,210** |

Screen subtotals for reference: Bank ฿112,850, E-wallet ฿2,500, Cash ฿1,500.

## Unassigned and ambiguous items

| Item | Issue | Treatment |
|---|---|---|
| `saving` — Move to savings, ฿5,000, 17 Oct 18:30 | The fixture names one account, `accountSavings`. It does not say where the money came from. | Recorded as a transfer to `savings`, with `fromAccountId: null`. It is excluded from balances and reported by `unassignedLegs()`. If the source is `daily`, the derived figures become daily 85,960 and savings 40,500. |
| E-wallet +300, Cash +100 | No October transaction explains the rise from 1 Oct to the screen value. | Left as differences. No filler transactions were added. |
| October archive entries (income 42,000 on 2 Oct, expense 845 on 10 Oct) | These are the archive's own illustrative pair. They do not match the dated ledger, where salary is on 17 Oct and expenses total 15,240. | Left untouched. They are used only when Wallet History shows months other than the current one. |

## Known gap that is now closed: Wallet October expense ฿845 vs Activity ฿15,240

- **Before:** Wallet's per-account movement read only the 5 shared transactions, which gave Out ฿845. Activity read those 5 plus the 7 extras, which gave ฿15,240.
- **Now:** both read the same `worldTransactions`. The daily account shows In ฿42,000 · Out ฿15,240, and Activity shows Expenses 15,240.
- **Visible change:** the daily account's mix moves from 98% / 2% to 73% / 27%.

## Obligations

Bills records moved unchanged into `worldObligations`:

- card ฿8,250;
- electricity ฿1,250;
- installment 3/5 ฿2,900;
- music ฿350;
- overdue phone bill ฿780 (from September);
- USD cloud storage ($9.99, November).

What reads them now:

- **Home due list** (D31: overdue to +7 days, at most 4 items) now includes the overdue phone bill.
- **Wallet "Payments due this month"** is computed from the same records (฿12,750).
- **Bills "Mark paid"** is a session overlay (`withPaid`) that Home, Wallet and Bills all read. Paying the card brings Wallet down to ฿4,500 and removes the card from Home.

## Habit — two candidate sets (decided: Home set, D36, 2026-10-28)

| Set | Streak | Weekly XP | Other | Derivable from events? |
|---|---:|---:|---|---|
| **Home (default, `flags.habitSource = 'home'`)** | 3 | 80 | — | Yes. Active days 6, 8, 9, 12, 15, 16 and 18 Oct, with 17 Oct frozen, give a streak of 3. Four active days this week at 20 XP each give 80. |
| Party (alternative, `'party'`) | 7 | 92 | level 8, lifetime 1,240 | No. It would need 7 consecutive active days and a non-multiple of 20. |

The 20 XP per qualifying day rate is inferred from the Home set (80 XP ÷ 4 days). It is not an approved production tunable.

Party level 8 and lifetime 1,240 XP stay Party-only.

## Credit-card sample rows vs Activity accounts (WP-20 F5, 2026-10-28)

The `#credit-card` page lists "Sample card activity" from the first two shared transactions, which Activity attributes to the Everyday bank account, not the card.

| Row | Card page source | Activity / ledger attribution |
|---|---|---|
| Coffee ฿85, 18 Oct 09:42 | `src/blue-screens.js:47` (`transactions.slice(0,2)`) and the "Recent" quick action `src/app.js:356` | `src/fixtures.js:16` `account: 'accountDaily'` → `src/fixtures/world.js:69` `accountId: 'daily'` |
| Groceries ฿640, 18 Oct 08:15 | same | `src/fixtures.js:17` `account: 'accountDaily'` → `src/fixtures/world.js:69` `accountId: 'daily'` |

- **Conflict:** the same two rows appear as Everyday-account spending (Activity, Wallet movement) and as card activity. The card statement (฿8,250, cycle `card-2026-10`) does not contain them.
- **Treatment:** amounts and attributions are unchanged. No card transactions were invented. WP-20 only made the card's amount due and paid status read the Bills obligation cycle.
- **Owner question:** should the card page show no sample rows, or should dedicated card-only rows be added to the Fixture World later?

## Owner questions

1. ~~Which balances should win?~~ Decided 2026-10-28: screen values (฿116,850), D37. Still open: the missing October transactions (about ฿22,510 more outflow from daily, plus ฿1,900 / ฿300 / ฿100 more inflow to savings / e-wallet / cash).
2. Which account did the ฿5,000 "Move to savings" come from?
3. ~~Confirm the Home habit set (3 / 80) or choose the Party set (7 / 92).~~ Decided 2026-10-28: Home set (D36).
4. Credit-card page sample rows duplicate Everyday-account spending (see the WP-20 F5 section). Keep, remove, or replace them with card-only rows?
