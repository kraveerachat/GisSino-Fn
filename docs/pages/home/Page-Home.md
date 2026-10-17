---
id: PAGE-home
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-18
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
  - ../../project/DECISIONS.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-BLUE-ENAMEL-REDESIGN, TASK-GS-UI-002-DESKTOP-SIDEBAR, TASK-GS-UI-ACCOUNT-BOARD-001, TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1]
---
# Home

## Current state

The focused Owner Revision3 continues the same [task and Draft PR7](../../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md) in a new dated [S3 session](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md). Current S3 is RUNTIME VERIFIED, awaiting owner review: source 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324 is committed/pushed; parent check PASS 550 locale keys, tests 70/70 and corrected browser84 cases/19 captures/11 functional groups pass with errors[]/issues[]. Independent A32/40 Good / no findings, B no material findings, one detector[] and parent final visual finish PASS. Documentation checkpoint/final Git equality is pending parent reconciliation. Historical S1/S2 evidence does not verify S3. Parent verified clean startup bcc3073795e75e5c13d31c828d2d3bb6a5a00740, same OPEN/DRAFT PR7 and unchanged main bb27e2812789346fc322d4bad3fc6d847ed3823d.

Preserve greeting/header, balance hero, four quick actions and responsive navigation. Below the hero the DOM/read order is **My Accounts → conditional compact seven-day Due soon → existing gamified Streak/XP → Recent Transactions last**. No Today priorities, Safe-to-Spend Home card, standalone Nearest or Monthly Summary. [D31](../../project/DECISIONS.md#d31--seven-day-home-due-list-and-missing-activity-days) supersedes only corresponding D30 presentation.

Due soon uses the selected fixed Asia/Bangkok preview date: valid unpaid overdue, today and next seven calendar days inclusive. Exclude paid, invalid, more-than-seven-day and duplicate obligations without changing source arrays. Stable date then ID sort places earliest overdue first, then today/upcoming. Deduplicate the same ID or name/date/currency/minor amount. Show max 4 compact rows, no inner scrolling, each with category SVG/title/text urgency/short date/chevron. Red means overdue; orange today/1-3 days; blue/neutral4-7 days, with text beyond color. Empty hides the section. Known fixture IDs reuse existing Bill detail handler: card opens its existing credit-card tracking route; other bills open their existing dialog. View all opens existing Bills with no filter claim.

Seven-day Home visibility is informational, separate from existing bell <=3 days/due/overdue preview. Canonical reminder stages remain T-3, due day and overdue. No dispatcher, delivery record, preference or production schedule changes.

Safe to Spend remains in product scope and the read-only financial projection: integer-minor liquid assets minus unpaid current-month obligations, separately per THB/USD without FX. Sample THB11,685,000−1,275,000=10,410,000 minor units (104,100); negative shortfall scenario -87,650 and formatter/tests remain. Only Home rendering is removed. Future Wallet/dashboard placement is OPEN; no Wallet UI is implemented. Nearest/monthly data/helpers also remain.

The habit card has two zones: streak/weekly XP/missing-day summary with the existing weekly percentage ring, then a horizontally scrollable 21-day timeline. **Proposed Home weekly metric = explicit qualifying active dates in the current Bangkok Monday-Sunday week / 7 × 100, rounded**. The synthetic 12-18 October 2026 snapshot has 4/7 active days = 57%, streak 3, weekly XP 80 and a confirmed freeze on 17 October. These independent preview values do not rewrite Party's existing aggregate sample (streak 7 / XP 1240), nor replace canonical habit-stat calculations. Unknown date-specific streak snapshots stay unavailable rather than being fabricated.

Each calendar day has weekday/number, selected/current indications and a status icon/text: qualifying completed, past missed, current pending, future neutral or confirmed frozen. Future dates are never missed; app opening/login never completes a day. Buttons use roving focus with bounded arrows, Home/End and pointer/touch region scrolling. A freeze is distinct from qualifying activity and does not increase the weekly numerator. Missing days are strictly past current-week dates without qualifying/completed activity, including confirmed frozen days but excluding pending today and future. This count is not remaining freeze allowance. View missed days focuses the first existing missing timeline date; zero missing gets concise positive text. Frozen retains blue snowflake and selected no-activity explanation; selected status announces atomically. Existing freeze data/model, streak, weekly XP, ring, gestures, keyboard and check-in/rewards remain unchanged.

Home and Add share the same user-triggered No spending today confirmation in the existing sheet. Confirmation can mark today's date complete and illustrate a configurable synthetic 10 XP once per Bangkok date in page-lifetime memory. Repetition grants no further visual reward, and refresh resets the guard. Already active days have no grant. No transaction/account, authoritative streak or Party stat is changed; this is not a recorded financial entry or persisted reward. There is no automatic daily popup or app-open reward. Light celebration respects reduced motion.

The shared [folder renderer](../../../src/account-board.js), [deck controller](../../../src/account-deck.js), styles, assets, selection, detail/Add Account and Settings vertical/horizontal mode remain unchanged. Existing [Settings](../settings/Page-Settings.md) controls the fixed synthetic Bangkok clock/scenarios. Application-level synthetic disclosure remains visible. No production service, persistent history or new route is introduced.

## Feature and system inventory

| Feature / System | Current implementation state | UI location | Current mock behavior | Future real logic required | Dependency / Milestone | Status: DECIDED / PROPOSED / OPEN | Included in PR #7 or Deferred |
|---|---|---|---|---|---|---|---|
| Total Balance | Existing preserved hero | Home blue hero | Synthetic asset total; visibility toggle | Authorized ledger/account totals; resolve gross vs net | M2 ledger/accounts; Q10 | DECIDED UI; OPEN total semantics | Included preserved UI; real totals Deferred |
| Account Board | Existing complete folders preserved | First below hero | Vertical/horizontal, gestures, selection, detail and profile previews | Owned account adapter and real persistence | M2 accounts/ledger | DECIDED | Included reorder only; real data Deferred |
| Today / Due soon | Today replaced by upcoming obligation projection | After Accounts, conditional | Valid unpaid overdue/today/+7 inclusive; stable date/ID/dedupe; max 4 category/status/date rows; existing Bill detail/Bills, hidden empty | Authorized obligation state/date adapter | M5 obligations; M6 delivery separate | DECIDED S3 | Included due UI; engines Deferred |
| Safe to Spend | Math/formatter/scenarios/tests retained; Home card removed | No Home UI; future placement undecided | Currency-isolated integer-minor liquid less current unpaid; true negative remains available | Authorized balances/obligations/freshness; future Wallet design | M2 ledger; M5 obligations | DECIDED Home removal; OPEN placement | Included removal/retained math; Wallet/engine Deferred |
| Due-soon notifications | Existing bell sheet enhanced | Bell → sheet → Bills | Overdue/due ≤3 days; deduplicated synthetic notices or empty | Durable events, scheduling, delivery/read state | M5 obligations; M6 reminders | DECIDED preview | Included sheet; delivery Deferred |
| Recent Transactions | Existing three rows preserved | Last Home main section | Existing icons/amounts/detail/Activity destinations | Authorized recent-ledger adapter | M2 ledger; M3 Activity | DECIDED | Included preserved UI; real data Deferred |
| Monthly Summary destination | Removed from Home; data/helper retained | No Home tile; existing Activity responsibility retained | No replacement and no new Summary route | Confirm final Activity vs Wallet responsibility | M3 Activity; future Wallet design confirmation | OPEN destination; DECIDED Home removal | Included removal; destination Deferred |
| Daily habit calendar | Explicit-date synthetic projection | Streak card day strip | 21 days, current/selected/status cues, keyboard/touch/pointer | Per-user authoritative Bangkok daily qualification | M7 habits, M2/M3/M5 events | DECIDED preview | Included; history engine Deferred |
| Streak | Independent explicit snapshot | Streak summary | Sample 3 at pinned date; unknown snapshots unavailable | Current/longest streak and midnight rollover | M7 habits | DECIDED direction; PROPOSED tunables | Included sample; engine Deferred |
| Freeze / missing days | Freeze model retained; allowance label replaced by missing dates | Summary and existing calendar | Past current-week nonactive dates include frozen, exclude pending today/future; first-missing focus; distinct snowflake/no activity | Authoritative qualification/freeze rules; allowance separate from missing presentation | M7 habits | DECIDED presentation; PROPOSED tunables | Included UI; freeze engine Deferred unchanged |
| Weekly activity percentage | New Home presentation projection | Weekly ring and n/7 text | Bangkok Monday-Sunday active dates /7; 4/7 →57% | Authorized activity dates; preserve other canonical metrics | M7 habits | PROPOSED Home metric; DECIDED UI demonstration | Included proposed metric preview; engine Deferred |
| XP | Explicit synthetic weekly sample | Streak summary | 80 sample XP; configurable illustrative check-in grant | Server event awards, daily caps, dedupe, weekly calculation | M7 habits; domain events | DECIDED habits-only; PROPOSED values | Included synthetic display; awards Deferred |
| Daily Check-in | Shared Add/Home confirmation | Existing sheet | User-confirmed No spending today; transient date completion | Authorized per-user/day idempotent command | M7 habits | DECIDED preview and qualifying action | Included demo; persistence Deferred |
| First-of-day welcome popup | No automatic schedule implemented | User-triggered sheet only | No popup on Home navigation or login | Daily first-relevant-visit and shown-state tracking | M7 habits | PROPOSED future experience | User-triggered preview Included; automatic Deferred |
| XP reward popup | Lightweight illustrative confirmation result | Existing check-in sheet | Configurable synthetic 10 XP once; reduced-motion feedback | Authoritative grant result; popup shown state | M7 habits | DECIDED preview; PROPOSED grant value | Included illustration; real rewards Deferred |
| Daily reward idempotency | Page-lifetime date-keyed guard | Shared preview adapter | Same date cannot grant again in active session; refresh resets | Durable per-user/date/event uniqueness and race protection | M7 habits + authorization | DECIDED preview boundary | Included memory guard; durable protection Deferred |
| Party aggregate stats | Existing separate showcase unchanged | Party; Home Party link | Existing aggregate samples, no account/transaction details | Aggregate-only authorized delivery/visibility filtering | M7 stats → M8 Party | DECIDED aggregate boundary; Q8 OPEN | Included existing link/sample; new Party work Deferred |
| Reminders and quiet hours | No production service | Existing Settings explanation; bell preview | No permission request, push, email, scheduler or read tracking | Preferences, opt-out, quiet hours, caps, channels | M6 reminders; M7 habit nudges | DECIDED direction; OPEN service choices | Bell mock Included; service Deferred |

## Future dependencies and unresolved choices

M2 owns real accounts/ledger and qualifying entry events. M3 owns Activity/needs-details and analysis; M5 owns paid/due obligations. M6 owns delivery, reminder preferences and quiet hours. M7 owns authoritative per-user daily Bangkok state, idempotent check-in, server XP/caps/dedupe, streak/freeze rollover, weekly XP, badges, daily first-visit and popup shown-state; midnight/duplicate/race and cross-user authorization tests are required. M8 may consume aggregate habit statistics only. See [architecture backlog](../../architecture/SYSTEM_ARCHITECTURE.md#77-habits-streaks-xp-badges-stats).

Automatic XP merely for login/app-open is a separate **OPEN conflicting owner proposal**; the current qualifying-action rule excludes it. Safe-to-Spend placement during future Wallet/dashboard design and the monthly-summary destination are **OPEN** while Activity's existing planned responsibilities remain canonical; no Wallet redesign is implied. Primary-party rank Q8 remains OPEN and is not needed by the new card. The written revision is implemented from its explicit requirements; the cited third reference image was not present in the supplied attachment directory, so exact visual-reference fidelity is unverified.

## Purpose and rules

- Show balance, accounts, recent activity, upcoming obligations, and habit continuity [DECIDED].
- Keep sample-data disclosure visible and avoid presenting simulated actions as saved [DECIDED].
- Safe-to-spend behavior follows the Project Guide; read-only synthetic projection remains implemented, with no Home card after S3; production engine remains unimplemented [PROPOSED].

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Synthetic fixtures only. Future balance, obligation, FX, and habit engines are described in [System Architecture](../../architecture/SYSTEM_ARCHITECTURE.md).

## States and edge cases

The screen map records sample, empty, loading, error, and unavailable preview states. Real network and persistence failures are [OPEN].

## Decisions and open questions

Navigation follows [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## S1 Account Board preview — SUPERSEDED

Home now uses the shared [Account Board](../../../src/account-board.js), with default compact Stack, selectable Grid, explicit simulated states and read-only canonical detail links. Bank, E-Wallet and Cash fixtures share the [Provider Catalog](../../design/PROVIDER_CATALOG.md) and [UI Data Contracts](../../design/UI_DATA_CONTRACTS.md). The surrounding hero/navigation remain intact. See [review evidence](../../design/reviews/ACCOUNT_BOARD_REVIEW.md).

## Change log

- 2026-10-16 — Added to the vault from the current prototype and [Screen Map](../../design/SCREEN_MAP.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 compact folder refinement — SUPERSEDED presentation

Historical S2 Home used aligned curved folder tabs and compact selectable indicators; mobile mode controls share the header. Visible account count, X-of-Y, helper and demo-state copy are removed. The active folder keeps provider/name/balance/currency/reference. Add opens a session-only profile form. [Provider assets](../../design/PROVIDER_CATALOG.md) and Wallet share the same session profile adapter.

-2026-10-16 — [Account Board S2](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


## S3 interaction contract

Six complete folders retain provider, name, currency, balance, reference and explicit detail link. Measured heights are 160–164px; vertical overlap exposes 24px below a 520px component width and 28px above it, with at most two or three rear folders respectively. Desktop vertical mode adds a synchronized direct selector. Horizontal mode clips adjacent complete cards within the component.

Vertical touch holds the dedicated 44px grip for 260ms; folder-body touch retains normal page scrolling. Horizontal touch and desktop mouse drag track continuously with requestAnimationFrame transforms on the same DOM cards, then snap with a 240ms ease-out (immediate under reduced motion). Below-threshold or cancelled drags restore the source. Arrow keys, Home/End and previous/next are bounded. Wheel input accumulates and throttles, releases at the boundary and leaves Ctrl+Wheel to the browser. Selecting an exposed card uses a whole-card overlay and never opens detail; explicit detail plus active-only double-tap/double-click open the selected ID.

- 2026-10-16 — [Account Board S3](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) replaces tab strips and Grid.

## Planned Home v2 roadmap

Historical planning snapshot retained below. D30/D31 supersede its Home ordering, due-tile, Safe and monthly presentation; it is not the current UI. Activity Summary/Global Leaderboard remain unimplemented, monthly destination is OPEN, and synthetic rank does not resolve primary-party policy.

The planned Home v2 evolution is detailed in [ONBOARDING_HOME_V2_ROADMAP.md §4](../../design/ONBOARDING_HOME_V2_ROADMAP.md#4-home-v2-specification):

1. **Top-to-Bottom Structure:** (1) Header, (2) Total Balance Card, (3) Quick Actions, (4) Today Strip, (5) Safe to Spend + Nearest Obligation dual-tile, (6) Streak with Primary Party Rank, (7) My Accounts complete overlapping folders, (8) Recent Transactions, (9) One-Line Monthly Summary, (10) Compact Global Leaderboard Card.
2. **Today Strip:** Conditional alert strip surfacing obligations due ≤ 3 days, streak at risk (> 20:00), transactions with status `needs_details`, or missing daily activity. Hidden entirely when no items qualify.
3. **Nearest Obligation:** Upgrades aggregate commitment tile to name the specific earliest unpaid bill with days remaining.
4. **Streak & Party Rank:** Embeds primary party rank line (e.g. `สตรีก 7 วัน · อันดับ 2 ในปาร์ตี้ครอบครัว`); omits rank gracefully if not in a party.
5. **My Accounts Preservation:** Strictly preserves the merged **PR #4** complete overlapping folder deck and continuous touch/drag gesture architecture without modification.
6. **One-Line Monthly Summary:** Moves full monthly summary and 7-day spending bars to the Activity Summary tab (`#activity/summary`), leaving a clean one-line navigation capsule on Home.
7. **Compact Global Leaderboard:** DRAFT / PLANNED community motivation card with age category chips, period chips, top 3 + personal row, and educational opt-in state. Amounts hidden by default.

- 2026-10-17 — Planned Home v2 layout, Today strip, nearest obligation, and compact leaderboard card documented for [TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1](../../worklog/10-Tasks/TASK-GS-PLAN-005.md). PR #4 Account Board folders preserved.

- 2026-10-18 — Added current S1 overview, financial fixture boundaries and valid destinations for [Home S1](../../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md); historical Account Board/planning sections retained.

- 2026-10-18 — Owner revision prioritizes unchanged Accounts, compacts daily decisions, moves due notices to bell, removes Home monthly UI and adds transient gamified habit/check-in preview; full 18-system inventory and M7 backlog recorded in [S2](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md).

- 2026-10-18 — Owner [Home S3](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) reconciles seven-day Due soon, Home Safe removal with retained math and missing activity versus frozen days; other contracts preserved.
