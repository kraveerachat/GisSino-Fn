---
id: AUDIT-2026-10-LOGIC-AND-DATA
type: reference
level: 2
status: AUDITED_BASELINE
updated: 2026-10-27
up: Project-Hub.md
related:
  - PROJECT_GUIDE.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
  - DECISIONS.md
  - OPEN_QUESTIONS.md
  - ../design/COMPONENT_INVENTORY.md
  - ../design/UI_DATA_CONTRACTS.md
  - ../worklog/10-Tasks/TASK-GS-WP01-REPOSITORY-AUDIT.md
---
# Logic and data audit — October 2026

## Current state

WP-01 audits main at bdbedaec24d781b928d8bf7747474032bfb9c384. Remote main matched the plan's baseline; the checkout was clean and GitHub showed no open PRs before work. The owner explicitly selected **WP-01 only**. No application code, test, fixture, token, route, dependency, architecture decision or feature flag is changed.

The prototype contains **27 JavaScript modules and 10 CSS files**. Page projections are guarded and tested, but there is no shared ledger, data Repository, persistent storage or authoritative cross-page habit state. Matching totals do not establish a shared source. Current results: 693 effective locale keys per language, 121 passing tests, and 30 passing Chromium route/width/theme cases.

The remediation plan is PROPOSED_NOT_CANONICAL. Its local reference blueprint was consulted, not imported into the canonical vault. The eight original screenshots mentioned in the plan were **not attached or embedded in that reference**. This task captured eight explicitly identified replacement baseline views. Numeric trace acceptance is established for those views, not an unprovided image set.

## Evidence and method

- [Source inventory](../design/reviews/logic-data-audit-2026-10/source-inventory.json): every src file, exports, executable DOM access, data/calculation roles and SHA-256.
- [Numeric literal index](../design/reviews/logic-data-audit-2026-10/numeric-literals.csv): numeric/date/time/percentage lexical candidates in the 27 JS modules, with file, line, column and source context. The standard-library lexical scan is not a JavaScript AST. It intentionally includes identifiers, validation/layout constants, SVG coordinates and overwritten copy. These are candidates, not all financial values; the semantic tables below classify live figures. CSS has no domain money/date/habit definitions.
- [Pure-model results](../design/reviews/logic-data-audit-2026-10/model-evidence.json): actual exports and calculations, without mounting the app.
- [Browser evidence](../design/reviews/logic-data-audit-2026-10/browser-evidence.json): source identity, 30 layout cases, English checks and numeric transcripts.
- [Mechanical detector](../design/reviews/logic-data-audit-2026-10/detector.json): [] findings, exit 0. This does not prove financial correctness or accessibility.

Commands: git status --porcelain=v1; git fetch origin main; git rev-parse origin/main; git worktree list --porcelain; rg --files src tests docs; Python standard-library export/literal enumeration; Node pure-model imports; npm run check; npm test; installed Impeccable detect --json src index.html. GitHub connected tools verified open PR state. No package installation or production access occurred.

## Source-file inventory

DOM means executable browser/DOM access, not HTML-string generation, Intl/Date use, or an import filename containing history. Financial formatting is distinguished from arithmetic. CSS has no JS exports.

| File (lines) | Exports and declaration lines | DOM | Data held/imported | Money | Dates | Habit/XP |
|---|---|---|---|---|---|---|
| [src/account-board.js](../../src/account-board.js) (39) | `selectedAccount` L6, `stepAccount` L7, `parseAccountHash` L8, `accountFolder` L14, `accountBoard` L27 | no | indirect account defaults | delegated format | no | no |
| [src/account-deck.js](../../src/account-deck.js) (189) | `deckTiming` L3, `boundedIndex` L4, `deckMode` L5, `deckLayout` L6, `dragDecision` L18, `wheelDecision` L23, `mountAccountDeck` L32 | yes | timing/geometry config only | no | no | no |
| [src/account-display.js](../../src/account-display.js) (28) | `assetAccounts` L6, `accountDisplay` L7, `providerBadge` L20, `accountPreview` L21, `walletAccountRow` L25 | no | imports accounts | format only | no | no |
| [src/account-profile.js](../../src/account-profile.js) (48) | `profileLabels` L5, `profileDraft` L7, `normalizeProfile` L15, `applyProfile` L24, `accountProfileForm` L30 | no | transient profile defaults | preserves balance | no | no |
| [src/activity-data.js](../../src/activity-data.js) (96) | `activityCategories` L4, `activityPeriod` L12, `activitySnapshotDate` L13, `activityTransactions` L27, `activityDay` L32, `activityDateLabel` L41, `activityCategory` L46, `activityRecords` L52, `activityEligible` L57, `activityShares` L59, `activityModel` L70, `filteredActivity` L93 | no | dated extras/catalog + imported transactions | exact totals/shares | parse/format/month | no |
| [src/activity.js](../../src/activity.js) (56) | `activityContext` L7, `activityResults` L33, `activityScreen` L42, `activityCategoryDialog` L48, `activityTransactionDetail` L52 | no | imports Activity records | format/ratio geometry | date/time format | no |
| [src/amount.js](../../src/amount.js) (17) | `amountKey` L2, `validAmountText` L10, `toMinorUnits` L13 | no | none | parse/validate minor | no | no |
| [src/app.js](../../src/app.js) (528) | none | yes | state/date defaults + imports | validation/display/delegation | scenario defaults | session grants |
| [src/bills-overview.js](../../src/bills-overview.js) (111) | `billPreviewToday` L5, `billPreviewMonths` L6, `billPreviewRecords` L7, `validBillDate` L16, `validBillMonth` L17, `billDateLabel` L21, `billFullDateLabel` L22, `billMonthLabel` L23, `billMoney` L24, `installmentProgress` L26, `billsOverview` L38, `dueDateForMonth` L68, `fixedInstallmentSchedule` L74, `validateBillDraft` L85 | no | explicit cycles | exact totals/progress | status/month/clamp | no |
| [src/bills-ui.js](../../src/bills-ui.js) (102) | `billsText` L10, `billRecordsForState` L11, `billModel` L15, `billRow` L22, `billsScreen` L42, `billDaySheet` L54, `billDetail` L59, `billEditData` L74, `billForm` L82, `billReview` L98 | no | copy/form defaults | draft sums/display | calendar/date format | no |
| [src/blue-screens.js](../../src/blue-screens.js) (35) | `coverHeader` L14, `blueHome` L19, `transferScreen` L24, `creditCardScreen` L31 | no | legacy records imported | major-unit display | label defaults | delegates |
| [src/desktop-sidebar.js](../../src/desktop-sidebar.js) (105) | `sidebarTiming` L2, `sidebarState` L3, `sidebarTransition` L6, `desktopSidebar` L31 | yes | timing/state config only | no | no | no |
| [src/fixtures.js](../../src/fixtures.js) (50) | `preview` L3, `accounts` L4, `transactions` L12, `bills` L19, `homePreview` L27, `members` L38, `creditCard` L43, `dailySpending` L47 | no | legacy records + Home snapshots | values only | fixed literals | values only |
| [src/habit-preview.js](../../src/habit-preview.js) (108) | `bangkokWeek` L10, `deriveHabitPreview` L17, `createCheckinPreview` L31, `habitOverview` L44, `habitCard` L57, `mountHabitTimeline` L71 | yes | Home fixtures + transient Map | no | week/day | active-day ratio/grant dedupe |
| [src/home-overview.js](../../src/home-overview.js) (111) | `bangkokClock` L8, `deriveHomeOverview` L18, `homeOverview` L44, `homeMoney` L53, `todayStrip` L62, `homeDecisions` L71, `dueNotices` L83, `upcomingDueList` L84, `notificationPreview` L95, `homeStreak` L99, `homeMonthly` L102, `homeSnapshot` L106, `homePreviewControls` L109 | no | imports + scenario overrides | exact safe/totals | Bangkok clock/due dates | presentation |
| [src/i18n.js](../../src/i18n.js) (852) | `messages` L1, `translator` L667, `money` L675, `number` L676, `escapeHTML` L677 | no | localized numeric copy | major-unit THB format | literal labels | literal XP/freezes |
| [src/icons.js](../../src/icons.js) (53) | `icon` L50, `logo` L53 | no | SVG/brand assets only | no | no | no |
| [src/navigation.js](../../src/navigation.js) (66) | `islandDestinations` L3, `moreDestinations` L4, `navigationContext` L8, `desktopContext` L14, `desktopAdd` L18, `floatingNavigation` L21, `navigationOverlay` L27 | yes | menu config only | no | no | no |
| [src/party-preview.js](../../src/party-preview.js) (101) | `partyPreviewToday` L2, `partySelfStats` L10, `partyBadges` L11, `partyFeed` L14, `partyPeople` L18, `createPartySession` L38, `relationFor` L41, `setPartyRelationship` L42, `partyWeek` L53, `rankedPartyPeople` L63, `acceptedPartyFriends` L83, `recommendedPartyFriends` L86, `exactPartyLookup` L91 | no | people/stats/relationships | no | live Bangkok date/week | weekly-XP ranking |
| [src/party-ui.js](../../src/party-ui.js) (119) | `partyBoardRows` L22, `partyGrid` L62, `partyFriendsSheet` L107, `partyRankingSheet` L112, `partyVisibilitySheet` L116 | no | Party aggregates imported | no | week-label format | ranking/progress display |
| [src/preview-flow.js](../../src/preview-flow.js) (97) | `setupSteps` L2, `publicRoutes` L3, `isPublicRoute` L4, `routeTitles` L5, `credentialDemoTarget` L7, `createPreviewFlow` L8, `updatePreviewValue` L11, `stepNavigation` L24, `approximateAge` L28, `validatePreviewFields` L31, `mountPreviewFlow` L36 | yes | transient setup defaults | no | host-year age | no |
| [src/providers.js](../../src/providers.js) (57) | `providers` L29, `fallbackProviders` L47, `resolveProvider` L48, `providerTheme` L53, `providerOptions` L57 | no | provider catalog only | no | no | no |
| [src/screens.js](../../src/screens.js) (101) | `destinations` L12, `navigation` L13, `shell` L17, `transactionRow` L30, `stateCard` L58, `activityResults` L68, `screen` L86, `addMenu` L94, `addForm` L98 | no | imports + legacy/form defaults | display/legacy render | fixed form date/calendar | legacy card |
| [src/styles/accounts.css](../../src/styles/accounts.css) (148) | none | no | none | no | no | no |
| [src/styles/activity.css](../../src/styles/activity.css) (109) | none | no | none | no | no | no |
| [src/styles/app.css](../../src/styles/app.css) (560) | none | no | none | no | no | no |
| [src/styles/bills.css](../../src/styles/bills.css) (144) | none | no | none | no | no | no |
| [src/styles/blue.css](../../src/styles/blue.css) (402) | none | no | none | no | no | no |
| [src/styles/navigation.css](../../src/styles/navigation.css) (98) | none | no | none | no | no | no |
| [src/styles/party.css](../../src/styles/party.css) (111) | none | no | none | no | no | no |
| [src/styles/tokens.css](../../src/styles/tokens.css) (141) | none | no | none | no | no | no |
| [src/styles/wallet.css](../../src/styles/wallet.css) (154) | none | no | none | no | no | no |
| [src/styles/welcome.css](../../src/styles/welcome.css) (178) | none | no | none | no | no | no |
| [src/wallet-history.js](../../src/wallet-history.js) (81) | `walletCurrentPeriod` L5, `walletSnapshots` L17, `walletCurrentEntries` L28, `walletPeriod` L32, `walletPeriodLabel` L49, `walletRingSegments` L57 | no | six frozen archives + dated legacy rows | values/geometry | period/format/archive | no |
| [src/wallet-overview.js](../../src/wallet-overview.js) (79) | `walletMoney` L16, `monthlyActivity` L26, `movementMix` L54, `walletOverview` L59 | no | legacy defaults imported | exact sums/ratios | monthly entry filter | no |
| [src/wallet.js](../../src/wallet.js) (67) | `walletScreen` L14 | no | account defaults imported | legend percentages/display | delegates period | no |
| [src/welcome.js](../../src/welcome.js) (85) | `welcomeArt` L10, `backgroundArtwork` L15, `welcomeScreen` L78, `publicRoutes` L6, `isPublicRoute` L6 | no | art/setup presentation | no | host-year age bound | no |


## Verified inconsistencies and qualifications

| Plan item | Actual source and behavior | Assessment |
|---|---|---|
| I-1 Streak 3 vs 7 | Home: fixtures.homePreview.habit.streak; Party: partySelfStats.streak and partyPeople.you.streak. | Confirmed independent snapshots, honestly disclosed; not one user aggregate. |
| I-2 Weekly XP 80 vs 92 | Home base80 plus transient check-in grants; Party viewer weeklyXP92. | Confirmed. No shared profile aggregate. |
| I-3 Week mismatch | Home 12–18 Oct; Party 26 Oct–1 Nov2026 on audit date. | Confirmed fixed Home clock versus live Bangkok Party clock. |
| I-4 Hero month label | blueHome renders preview.balance with thisMonth. | Confirmed point-in-time label ambiguity. |
| I-5 Activity net label | activityNet is Thai net-income wording for income minus expense. | Confirmed label source. Negative values already preserve minus signs through walletMoney; no label/color change made. |
| I-6 Chart interpretation | 73.4%/26.6% divide by income+expense, explicitly labelled. | Correct math for approved D33. Spend/income ratio is a proposed different chart, not an arithmetic repair. |
| I-7 Liability in ring | Wallet ring denominator is assets11,685,000 minor. The Current-only Bills link separately shows1,275,000. | Mixed denominator **not reproduced**. D32 S2 expressly permits the small Bills reference. |
| I-8 CE/BE mix | Wallet uses th-TH-u-ca-gregory; Activity/Bills/Party use th-TH calendar default. | Confirmed CE2026 beside BE2569. |
| I-9 No common ledger | Fixed hero, account snapshots, Activity extras, Bills cycles and Party aggregates are independent. | Confirmed architectural gap; these helpers are projections. |
| I-10 Percent first | Current daily account defaults to98%/2%; a separate activity button shows amounts42,000/845. | Reproduced with an existing amount alternative. No default changed. |

Additional migration hazards:

- Legacy preview.safe=14,500, but deriveHomeOverview computes104,100 =116,850-12,750. Safe is absent from current Home. Reusing preview.safe in a future chip would revive an obsolete illustrative value.
- Legacy bills.device.installment says3/10; Bills v2 has five explicit cycles and renders3/5. Current Bills uses the five-cycle model.
- General Add starts on2026-10-16; Home/Bills snapshot is2026-10-18. The date defaults are not one clock.
- Party next-level260/level9 and freeze2 labels contain separate catalog literals; they happen to match the stats at this baseline.
- Wallet history opening balances are fixed archives, not reconstructed balances. The current account records have no opening_balance_as_of or ledger_entries.
- PRODUCT.md and DESIGN.md still contain historical claims that canonical guides were missing and calculations absent. Guides and projection helpers now exist. This drift is recorded, not repaired in a read-only audit.

## Dependency and mutation map

~~~text
fixtures.js
  preview.balance ----------------------------> blueHome hero
  accounts -> app.accountProfiles ------------> Home folders + Wallet Current
  transactions -> Recent / Add samples
               -> wallet-history dated copy --> Wallet per-account movement
               -> activity-data + extras -----> Activity model -> UI
  bills --------------------------------------> Home due notices + Wallet Bills link
  homePreview -> fixed clock + habit snapshot -> Home weekly card

bills-overview explicit records -> bills-ui model -> Bills list/calendar/detail
party-preview own stats/people + live clock -> ranking -> party-ui
wallet-history explicit archives -> walletPeriod -> Wallet History
app.js -> shared native dialog, router, event delegation and transient state
~~~

Profile changes update app.accountProfiles. Bill paid-preview updates billPreviewPaid in the Bills projection. Friend requests update partySession.relationships. Check-ins update one page-lifetime Map. Add/Transfer show review content and never create a ledger transaction. None is backed by IndexedDB, sync, a server, an authenticated owner or persistent events. Reload resets transient changes.

## Calculation, share, due-date and week-range catalog

This includes private helpers and renderer expressions. Pure domain code and DOM controllers sometimes share one file; only exported pure functions are portable without their rendering dependencies.

| File | Function / declaration lines | Responsibility |
|---|---|---|
| [amount.js](../../src/amount.js#L2) | amountKey (L2); validAmountText (L10); toMinorUnits (L13) | Keypad precision/bounds and whole/fraction-to-minor parsing. Positive values; zero handled explicitly by callers. |
| [home-overview.js](../../src/home-overview.js#L6) | dayOrdinal (L6); validDay (L7); bangkokClock (L8) | Valid date ordinals and explicit Bangkok local instant. No global clock. |
| [home-overview.js](../../src/home-overview.js#L18) | deriveHomeOverview (L18); homeOverview (L44) | Guarded BigInt liquid/unpaid/safe per currency; nearest due; <=3-day notices; <=7-day upcoming; scenario overrides. No FX. |
| [home-overview.js](../../src/home-overview.js#L53) | homeMoney (L53); showMoney (L59); dayStatus (L60); dateLabel (L61); uniqueObligations (L75); dueNotices (L83); upcomingDueList (L84) | Exact minor display, relative date labels, duplicate ID/content exclusion and max4 displayed due items. |
| [home-overview.js](../../src/home-overview.js#L95) | notificationPreview (L95); homeStreak (L99); homeMonthly (L102); homeSnapshot (L106) | Count, money and snapshot-time presentation. Some retained renderers are unmounted on current Home. |
| [habit-preview.js](../../src/habit-preview.js#L6) | ordinal (L7); dayKey (L8); validDay (L9); bangkokWeek (L10) | Monday–Sunday arithmetic, independent from Party week helper. |
| [habit-preview.js](../../src/habit-preview.js#L17) | deriveHabitPreview (L17); createCheckinPreview (L31); habitOverview (L44) | Unique active dates;21-day timeline; rounded count/7; missing days; session reward sum/dedupe. Streak/base XP are supplied fixtures. |
| [habit-preview.js](../../src/habit-preview.js#L55) | dateLabel (L55); habitCard (L57) | Week/day, missing-day and ring presentation. Frozen is not active. missingDays also includes the inactive frozen date. |
| [wallet-overview.js](../../src/wallet-overview.js#L7) | checked (L7); minor (L8); sum (L9); walletMoney (L16) | Safe values, legacy conversion, bounded BigInt totals and exact minor currency display. |
| [wallet-overview.js](../../src/wallet-overview.js#L26) | monthlyActivity (L26) and nested periodFor; movementMix (L54) | Account/month/currency filtering; income+expense mix; transfers excluded. Stable-ID/legacy-name fallback. |
| [wallet-overview.js](../../src/wallet-overview.js#L59) | walletOverview (L59) | Bank/e-wallet/cash totals; separate liability sum; duplicate card bill skipped. No selected-month filter for legacy liability link. Assets alone drive ring. |
| [wallet-history.js](../../src/wallet-history.js#L7) | archive (L7); walletPeriod (L32); walletPeriodLabel (L49); walletRingSegments (L57) | Frozen opening archives, Current/History selection, CE labels and rounded proportional geometry. Geometry floats are dimensionless. |
| [wallet.js](../../src/wallet.js#L14) | walletScreen (L14): percent/activityButton/legend/count expressions | Amount/percentage toggle; category/composition*100 and12-month chooser. Shares rounded independently. |
| [activity-data.js](../../src/activity-data.js#L32) | activityDay (L32); activityDateLabel (L41) | Validated date-only/zoned timestamps and Bangkok labels. |
| [activity-data.js](../../src/activity-data.js#L47) | checked (L47); exact (L48); sum (L49); activityRecords (L52); activityEligible (L57) | Safe nonnegative money; canonical-source dedupe/conflict; transfer/card-payment/refund/reversal exclusions. |
| [activity-data.js](../../src/activity-data.js#L59) | activityShares (L59); activityModel (L70) | BigInt largest remainder to tenths; monthly income/expense/movement/net; full-category totals/shares by currency. Filters leave analytics unchanged. |
| [activity.js](../../src/activity.js#L7) | activityContext (L7); percent (L18); time (L20); categoryRow (L21); analytics (L25) | Currency/model selection, percent/time display, two-segment movement donut and top (L30) categories. Money delegates to Wallet formatter. |
| [bills-overview.js](../../src/bills-overview.js#L16) | validBillDate (L16); validBillMonth (L17); integerMinor (L18); dayNumber (L19); billDateLabel (L21); billFullDateLabel (L22); billMonthLabel (L23); billMoney (L24) | Independent date validation/formatting and day ordinals; money delegates to homeMoney. |
| [bills-overview.js](../../src/bills-overview.js#L26) | installmentProgress (L26); billsOverview (L38) | Explicit paid/next/remaining; known unpaid selected-month totals; separate arrears/unknown counts; coveredBy exclusion; BigInt safeguards. |
| [bills-overview.js](../../src/bills-overview.js#L68) | dueDateForMonth (L68); fixedInstallmentSchedule (L74); validateBillDraft (L85) | Last-day clamp, fixed draft schedule and type/amount/date validation. Clamp remains OPEN for production. |
| [bills-ui.js](../../src/bills-ui.js#L11) | billRecordsForState (L11); billModel (L15); billsCalendar (L30); summary expression L50; billDetail (L59); billReview (L98) | Transient paid projection, grid/day labels, summary and draft paid/remaining reductions. No payment event. |
| [party-preview.js](../../src/party-preview.js#L2) | partyPreviewToday (L2); partyWeek (L53); rankedPartyPeople (L63) | Live Bangkok day/week; weekly-XP competition ranks, stable-ID tie order and visibility/opt-out filtering. Aggregate metrics are fixtures. |
| [party-ui.js](../../src/party-ui.js#L9) | number (L9); weekLabel (L10); partyBoardRows (L22); row (L26); board (L33); friendCard (L52) | Localized number/week, top (L40)/own-position and friend counts; several label numbers still come from copy. |
| [account-display.js](../../src/account-display.js#L6) | assetAccounts (L6); accountDisplay (L7) | Asset filtering/sort and balanceMinor/100 display; not a balance engine. |
| [i18n.js](../../src/i18n.js#L675) | money (L675); number (L676) | Legacy formatter accepts major-unit THB, unlike exact minor helpers. |
| [blue-screens.js](../../src/blue-screens.js#L9) | amount (L9); blueHome (L19); creditCardScreen (L31) | Fixed hero value, card minor/100 display and legacy sample rows. |
| [screens.js](../../src/screens.js#L28) | displayMoney (L28); transactionRow (L30); week (L40); legacy home (L47); legacy calendar (L70); legacy billsScreen (L76); addForm (L98) | Legacy display/form date/calendar code. Router uses newer screens; avoid porting dormant renderers as active truth. |
| [app.js](../../src/app.js#L80) | syncHabitPreview (L80); openTransaction/openBill; updateTransferAmount; submit handlers | State/validation/display adapters; no durable financial write or event bus. |
| [preview-flow.js](../../src/preview-flow.js#L28), [welcome.js](../../src/welcome.js#L45) | approximateAge (L28); validatePreviewFields (L31); about45 | Optional age uses host current year, another independent clock consumer. No approved age thresholds. |

## Eight replacement baseline views

All captures are Thai/light at390x900. Main views are full-page; dialog images are viewport captures after fonts and motion settle. Numeric transcripts intentionally cover a superset: occluded deck bodies, select options and internal dialog content below the fold. Such DOM text is not claimed to be painted in the screenshot.

| Capture | View |
|---|---|
| [B01](../design/reviews/logic-data-audit-2026-10/B01-home-light.png) | Home hero, Account Board, due list, weekly card and Recent |
| [B02](../design/reviews/logic-data-audit-2026-10/B02-wallet-current-light.png) | Wallet Current |
| [B03](../design/reviews/logic-data-audit-2026-10/B03-wallet-history-september.png) | Wallet September opening history |
| [B04](../design/reviews/logic-data-audit-2026-10/B04-activity-light.png) | Activity monthly overview/list |
| [B05](../design/reviews/logic-data-audit-2026-10/B05-activity-categories.png) | Activity full category dialog |
| [B06](../design/reviews/logic-data-audit-2026-10/B06-bills-light.png) | Bills October list |
| [B07](../design/reviews/logic-data-audit-2026-10/B07-installment-detail.png) | Installment detail |
| [B08](../design/reviews/logic-data-audit-2026-10/B08-party-light.png) | Party stats, boards, friends and feed |


## Visible-number lineage

### Accounts and movement — B01 to B03

| Display | Source / calculation |
|---|---|
| Home ฿116,850.00 | [fixtures.js L3](../../src/fixtures.js#L3) preview.balance -> blueHome -> legacy i18n.money. Fixed major-unit value. |
| Wallet ฿116,850 | [fixtures.js L5–L10](../../src/fixtures.js#L5) balanceMinor -> assetAccounts -> walletOverview -> walletScreen. Exact sum11,685,000 minor. |
| Account amounts68,450 /37,400 /5,000 /2,500 /1,500 /2,000 | The six rows at fixtures.js L5/L6/L7/L8/L9/L10. Home displays two decimals; Wallet suppresses zero cents. |
| References0428 /0916 /0631 /0784 | Same rows L5/L6/L7/L10 suffix strings. These are sample identifiers, not money. |
| Six accounts; bank4; e-wallet1; cash1 | Account array and category filter counts. Home balanceNote is overridden to six in [i18n.js L272/L290](../../src/i18n.js#L272); older two-account copy at L50/L152 is overwritten. |
| Bank112,850; e-wallet2,500; cash1,500 | 68,450+37,400+5,000+2,000=112,850. Other asset types are their own single account. |
| 96.6% /2.1% /1.3% | Each category/116,850*100, one decimal via walletScreen. No liabilities in denominator. |
| Bills reference12,750 | walletOverview: creditCard8,250 + power1,250 + device2,900 + music350. Original card bill skipped to avoid a second liability. Separate link in [wallet.js L59](../../src/wallet.js#L59). |
| Current daily account98% income /2% expense | [walletCurrentEntries L28](../../src/wallet-history.js#L28) dates legacy rows to Oct17/18. monthlyActivity uses income42,000 and expense85+640+120=845. Rounded shares of42,845; transfer5,000 excluded. |
| October2026; year options2026/2025 | walletCurrentPeriod from preview.year=2026/month=9 zero-indexed; archive periods in wallet-history.js L17–L24; walletPeriodLabel uses Gregorian. |
| September102,300 total; bank99,300; e-wallet1,800; cash1,200 | [September archive L19](../../src/wallet-history.js#L19): 59,800+33,000+4,500+2,000+1,800+1,200. No reconstruction from live balances. |
| September account amounts59,800 /33,000 /4,500 /2,000 /1,800 /1,200 | Archive array ordered by wallet-history.ids L6. walletPeriod overlays current names but preserves frozen balances, type, currency and archive status. |
| September97.1% /1.8% /1.2% | Category/102,300*100, independent rounding; total100.1% is display rounding, not a monetary mismatch. |
| As of1 Sep2026; first-of-month wording | archive.capturedAt at period-01T00:00:00+07:00, wallet-history.js L8; label helper L49; walletMonthStart copy L724/L742. |
| September income75% /expense25% | Archive incoming3,950,000 / outgoing1,325,000 minor; monthlyActivity rounds shares of5,275,000. |

### Home time and habits — B01

| Display | Source / calculation |
|---|---|
| Due20/22/25 Oct; in2/4/7 days | fixtures.bills L20–L22 minus fixed homePreview.nowLocal date18 Oct L28; deriveHomeOverview/upcomingDueList. Music28 Oct is+10, outside the seven-day range. |
| Streak 3; weekly XP 80 | fixtures.homePreview.habit L32 -> habitOverview. Not the older homePreview.streak=7 at L28. |
| 4/7 days;57% | Week active dates Oct12/15/16/18. deriveHabitPreview returns round(4/7*100)=57. |
| Missing3 days | Before today without an active date: Oct13/14/17. Oct17 is separately frozen and is not active. |
| Week12–18 Oct; calendar5–25 | bangkokWeek for Oct18 returns Monday12–Sunday18. Timeline begins seven days before Monday and spans21 dates; only a scrolling subset is painted. |
| Selected18 Oct; snapshot18 Oct2569 at10:00 | fixed Home time fixtures.js L28; habit dateLabel and homeSnapshot formatting. |
| Recent -85 at09:42; -640 at08:15; transfer5,000 at18:30 | [fixtures.transactions L13–L15](../../src/fixtures.js#L13) -> screens.transactionRow. Relative dates/times are fixed. Transfer remains excluded from expense. |

### Activity totals, rows and categories — B04/B05

Income42,000 comes from the legacy salary at fixtures.js L16. Expense15,240 = legacy85+640+120 plus dated extras8,500+1,250+1,600+900+505+1,290+350 at [activity-data.js L16–L29](../../src/activity-data.js#L16). Net=42,000-15,240=26,760. Movement denominator=57,240, yielding73.4% income and26.6% expense. A proposed36.3% expense/income ratio would answer a different question; it is not currently rendered.

| Category | THB / share | Lineage |
|---|---|---|
| Housing | 8,500 /55.8% | Extra rent, activity-data.js L17. |
| Shopping | 1,930 /12.7% | Legacy market640 (fixtures.js L14) + extra shopping1,290 (activity-data.js L22). |
| Family | 1,600 /10.5% | Extra family L19. |
| Bill payment | 1,250 /8.2% | Extra electricity L18. |
| Insurance/health | 900 /5.9% | Extra health L20. |
| Education | 505 /3.3% | Extra course L21. |
| Entertainment | 350 /2.3% | Extra music L23. |
| Transport | 120 /0.8% | Legacy train, fixtures.js L17. |
| Food/drinks | 85 /0.5% | Legacy coffee, fixtures.js L13. |
| Gifts; Other; Refund-return; Savings-investment; Travel-hotel | Each0 /0% | Catalog rows with no eligible positive October expenses. Unknown categories fall back to Other. |

Every category share uses the15,240 expense denominator and activityShares largest-remainder algorithm (L59), so all14 shares total100.0%. B04 limits the preview to four positive leading categories. B05 renders all14; the lower internal rows are in its numeric transcript.

Every dated transaction row is also traced:

| Date / time | THB value(s) | Source |
|---|---|---|
| Oct18:09:42 /08:15 | Coffee85; market640 | fixtures.js L13–L14 plus activity-data.times L15 |
| Oct17:18:30 /10:00 /07:50 | Transfer5,000; salary42,000; train120 | fixtures.js L15–L17 plus times L15 |
| Oct15:08:00 | Rent8,500 | activity-data.extra L17 |
| Oct14:19:20 | Electricity1,250 | L18 |
| Oct12:18:15 | Family1,600 | L19 |
| Oct10:11:30 | Health900 | L20 |
| Oct8:16:00 | Course505 | L21 |
| Oct5:13:10 | Shopping1,290 | L22 |
| Oct2:07:00 | Music350 | L23 |

The fixed2026-10 period/date and timestamp constructors are at activity-data.js L12–L13/L28–L29. th-TH renders Buddhist2569. Month selector/heading use activityDateLabel; fixture footer copy is in i18n.js L765/L781. Transfer is list-only; expense signs are display text.

### Bills and installment — B06/B07

| Display | Source / calculation |
|---|---|
| October12,750.00; four unpaid cycles | [bills-overview.js L9–L12](../../src/bills-overview.js#L9): 8,250+1,250+2,900+350. billsOverview sums known unpaid current-month cycles by currency and excludes coveredBy records. |
| Prior arrears780.00; phone Sep29 | late-phone cycle L8, before selected October and unpaid. Separate overdueTotals, not added again to October. |
| Preview18 Oct2569; selectable Sep–Dec2569 | billPreviewToday L5 and billPreviewMonths L6, localized by helpers L21–L23. |
| Card0916; due20 Oct;8,250 | Card cycle L9. Statement date12 Oct also explicit there. |
| Electricity22 Oct1,250; installment25 Oct2,900; music28 Oct350 | Cycles L10/L11/L12. Calendar/list share the same normalized rows. |
| Next20 Oct; statuses | Fixed Oct18 clock: phone-19 days; card+2; power+4; device+7; music+10. No use of audit wall clock. |
| Third of five; two paid of five | Five explicit device cycles L11. installmentProgress counts paid1–2, then next unpaid3. Legacy3/10 is unused here. |
| Paid5,800; remaining8,700 | 2*2,900 versus3*2,900, guarded BigInt sums. Descriptive products add no payable amounts. |
| Schedule1–5; Aug25/Sep25/Oct25/Nov25/Dec25; each2,900 | Entire explicit device.cycles array L11. Funding suffix0428 is descriptive metadata in that same record. |

USD9.99 in November and unknown-variable electricity are also present in the source/model contract, but not in the October capture. They remain separate currency/unknown states, never silently converted or counted as zero.

### Party — B08

| Display | Source / calculation |
|---|---|
| Level8; lifetimeXP1,240; progress maximum1,500; streak7 | [partySelfStats L10](../../src/party-preview.js#L10), rendered by partyGrid. |
| 260XP to level9; freeze2 | Literal nextLevel/freezeCount catalog text at [i18n.js L74/L176](../../src/i18n.js#L74). It agrees with1,500-1,240 and stats.freezes=2 at this snapshot, but is independently stored copy. |
| Week26 Oct–1 Nov2569 | partyPreviewToday L2–L8 uses live2026-10-27 Bangkok date; partyWeek L53 and party-ui.weekLabel. |
| Friends1 Lin170/streak8;2 Min135/streak5;3 Ton110/streak4 | partyPeople L20–L22 plus accepted relationships L34–L36; rankedPartyPeople sorts weeklyXP and stable ID. Viewer92 ranks4 in complete Friends board. |
| Global1 Lin170/streak8;2 Ravi150/streak6;3 Min135/streak5; own5/92/streak7 | People L19–L23 plus opt-in/visibility flags. Ton110 is rank4; own position is shown under the top3. |
| Three friends /3 people | acceptedPartyFriends selects Lin/Min/Ton; friendCard uses its array length. |
| Sample member1 kept habit5 days | Literal feedOne copy at i18n.js L80/L182 through partyFeed, not an event-derived story. |


## Reusable Widget Catalog mapping — preparation for WP-16

| Planned widget | Existing implementation | Reuse boundary |
|---|---|---|
| MoneyAmount | homeMoney; walletMoney; accountDisplay; billMoney; legacy i18n.money | Consolidate contract later; do not create a sixth formatter. Existing hidden/unavailable/currency behavior differs. |
| AccountChip/AccountCard | accountFolder/accountBoard; accountDisplay/providerBadge; walletScreen itemCard; accountProfileForm | Shared provider identity, complete folder deck and profile/detail routes already exist. No account backend. |
| TransactionRow | screens.transactionRow; Activity activityResults row markup | Two current source contracts. Reuse anatomy after shared selectors. |
| ObligationRow | bills-ui.billRow; Home upcomingDueList; legacy screens.billRow | Current Bills and Home rows serve distinct projections. Legacy row is not the v2 model. |
| StatusPill | screens private pill; Bills statusLabel/markup; Activity needs-details status | CSS variants exist; no universal frozen state enum/transition model. |
| Ring/Donut/BarCompare | walletRingSegments reused by Wallet/Activity; habitCard ring; Activity category bars | Reuse geometry. Proposed spend-ratio BarCompare does not exist. |
| Sheet | app.showSheet/closeSheet and native #sheet; navigationOverlay | Existing focus/Escape/backdrop behavior. Phone sheet/desktop dialog; no current wide side-panel implementation. |
| EmptyState | screens.stateCard; Activity no-results; Bills empty; Party empty boards | Existing localized variants; no Repository-backed universal offline/locked state lattice. |
| OfflineBanner | None | Synthetic-data banner is not an offline-freshness indicator. |
| InstallPrompt | welcome.install / #setup/install demonstration; Settings install-info sheet | Existing guide can be extended. No manifest, service worker or beforeinstallprompt flow. |

Searches covered src, src/styles, tests and docs. The source inventory lists all exports and DOM boundaries. Reuse existing account detail hash, Activity transaction sheet, Bills day/detail/form sheets, Party friends/ranking/visibility sheets, shell/router, locale catalog, tokens, provider registry and native dialog controller. No new component was created.

## Canonical gates before later packages

These are recorded, not resolved. They do not prevent this read-only audit. No feature flag or proposed default was enabled.

| Later proposal | Canonical evidence | Gate before implementation |
|---|---|---|
| WP-07 Safe hero chip / liability line | D31 removes Home Safe UI; Q10 gross-vs-net remains OPEN. | Obtain scoped owner supersession and semantics. A proposed flag default alone is not approval. |
| WP-08 movement donut replacement | D33 explicitly selects embedded income/expense donut. | Approve the new chart before replacing the visual baseline. |
| WP-08 Buddhist-era default | Architecture §5.6 says Gregorian default, BE option OPEN. | Confirm era and shared formatter contract. Current inconsistency is observed, not resolved. |
| WP-15 needs-details qualification/XP | Guide §6.1 and architecture §7.7 include entry including needs-details as qualifying. | Separate active-day qualification from XP award; approve any rule change. |
| WP-15 hide Global / active-days-first ranks | D34 approves current synthetic Global/Friends weekly-XP preview; Q7 production audience OPEN. | Approve preview supersession and ranking contract. |
| Household, minors, self-host proposals | Q5 group model, Q2/Q3 minors and infrastructure questions remain OPEN. | Propose documentation options; do not implement a new data/security boundary. |
| Plan calls production stack OPEN | Architecture §5.1 labels its suggested stack PROPOSED; nothing is adopted. | Preserve exact canonical status and vanilla prototype; no migration. |
| Ledger-derived world in WP-02 before WP-03 | Current records lack ledger entries and opening as-of dates. | Sequence schema and pure calculation contracts coherently; do not invent history from five display transactions. |

## UI review within WP-01 scope

The named skills inform baseline preservation, numerical context, consistency and component reuse. A complete visual critique/redesign, animation pass or accessibility certification was not run under the owner's WP-01-only selection. No visual score is inferred from source inventory and layout checks.

| Before (observed) | After (recommendation only) | Why |
|---|---|---|
| Independent page snapshots/clocks | One explicit clock/fixture world in later packages | Avoid implying synchronized user data. |
| Fixed hero and month wording | Approved point-in-time selector/copy | Give the amount its measurement context. |
| Mixed CE/BE labels | Owner-selected era through one formatter | Prevent ambiguous period interpretation. |
| Correct movement donut plus proposed alternative | D33 supersession before chart replacement | Preserve approved baseline while architecture is remediated. |
| Multiple money/status renderers | Reuse/consolidate existing contracts | Prevent new parallel implementations of unknown/currency/hidden states. |

## Verification and limitations

| Command / evidence | Actual result |
|---|---|
| npm run check | PASS, exit0; syntax/assets/catalog-only Thai UI;693 effective keys per locale. |
| npm test | PASS, exit0;121 tests;0 failed/cancelled/skipped. Executed with loopback access for existing preview-server test. |
| Chromium layout matrix | PASS; five routes at390/820/1440px x light/dark =30 cases; no page/console errors or horizontal overflow. |
| English runtime | PASS; all five routes at390px, lang=en, zero overflow. |
| Source identity | PASS; index.html plus all37 src files,38 HTTP responses, match checkout SHA-256. Existing port4187 reused. |
| Eight captures | B01–B08 inspected; original plan images unavailable. Fonts/motion settled; dialogs use viewport captures. |
| Impeccable detector | PASS, exit0; empty findings array. Mechanical scan only. |
| Source scope | No application/test/script/package/token/fixture changes; documentation/evidence only. |

Not tested: the unprovided original screenshots; physical iPhone/iPad/Android/desktop installations; Safari/Firefox; screen readers; exhaustive touch gestures; measured contrast/performance; authentication/BOLA; persistence/IndexedDB/offline sync; financial posting; PWA updates; backup/restore. None is claimed as implemented or verified by WP-01. The30 cases emulate viewport sizes in Windows headless Chrome via Playwright, not devices.

Attempting another server on4187 returned EADDRINUSE because it was already running. No process was killed; the reused server's38 source hashes matched the baseline. The existing server was left as found. The new audit did not start a persistent server.

The numeric index has1,629 lexical candidates; it is a conservative occurrence index, not1,629 domain defects. All current visible data is traced by the semantic tables and raw model/browser evidence. The121 tests protect tested prototype projection semantics; they do not establish a production ledger or cross-user security.

## Proposed removals — not executed

No file was deleted or stopped from importing. Candidates for later dependency review: legacy preview totals/major-minor duplicates; page-local fixture declarations; dormant Home/Bills/calendar renderers in screens.js; overwritten numeric catalog text. These remain in place. Shared provider/icon assets, fixtures consumed by tests, approved features and historical notes/receipts are protected until explicit owner confirmation.

## OPEN questions touched

No OPEN item was decided, no flag created and no proposed default enabled. Existing Guide/Architecture/Decisions remain canonical. No AEGIS or production mutation, data deletion, branch deletion or database change occurred.

## Change log

- 2026-10-27 — WP-01 audited verified main bdbedaec24d781b928d8bf7747474032bfb9c384 with documentation/evidence delivery on a dedicated Draft PR. Original screenshot-set verification remains unavailable; replacement baseline trace is explicit.
