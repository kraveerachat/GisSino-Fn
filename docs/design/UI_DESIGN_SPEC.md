---
id: DESIGN-UI-SPEC
type: design
level: 2
status: CURRENT
updated: 2026-10-26
up: Design-Hub.md
related:
  - DESIGN_TOKENS.md
  - COMPONENT_INVENTORY.md
  - SCREEN_MAP.md
---
# UI design specification

## Party v2 preview

The approved porcelain/enamel Party world remains. Personal progress and badges lead; compact Friends then Global weekly boards use the same current Bangkok period and sample weekly-XP unit, with a quieter treatment for Global. The Friends card and aggregate feed remain secondary. Exact-match search, request states and at most three labelled synthetic suggestions live in the shared modal: bottom sheet on mobile, centered dialog on desktop. Focus, keyboard dismissal, 44px actions, light/dark themes and reduced motion follow the shared UI contract. No financial values, real-user lookup or production Global audience policy are introduced. See [Party review](reviews/PARTY_V2_REVIEW.md).

## Current Home v2 — Focused owner revision S3

[D31](../project/DECISIONS.md#d31--seven-day-home-due-list-and-missing-activity-days) preserves existing header/hero/four actions/navigation and Account Board. Below them Accounts → conditional compact Due soon → existing gamified habits → Recent last. Home Today/Safe are removed; nearest/monthly remain absent. Financial calculations/scenarios/formatters/tests remain; future Safe Wallet placement is OPEN.

Due soon includes valid unpaid overdue/today/next7 inclusive against selected Bangkok preview time. Stable date/ID sort and same-ID or name/date/currency/amount dedupe feed max4 rows without inner scroll; empty hides. Category SVG, title, relative status plus short date (owner-confirmed), chevron and restrained red/orange/blue urgency remain readable without color alone. Real fixture IDs reuse existing Bill details; View all opens Bills without a filter claim. Home lookahead does not alter bell <=3 days or production T-3/due/overdue reminders.

Only visible freeze allowance becomes strictly past current-week missing activity count, including frozen dates but excluding pending today/future. View missed days focuses the first existing missing date; zero gets positive copy. Orange missed dates, distinct blue frozen snowflake/no-activity label and atomic selected-day status reuse the same calendar.

Streak, weekly XP, proposed Bangkok Monday-Sunday qualifying active dates/7 ring (4/7=57%), timeline geometry/gestures/keyboard, shared Add/Home check-in/idempotent illustrative reward and reduced motion remain unchanged. No app-open/login award or production persistence. No new calendar/modal, assets, Account Board geometry/controller/providers/selection/detail or Settings-mode changes. Current verification is in [S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md); S1/S2 evidence is historical.


## Current state — Wallet S2 owner revision (2026-10-18)

[D32 S2](../project/DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) supersedes the Wallet S1 composition below. Wallet leads with a compact centered assets-only ring: Bank royal blue, E-wallet cyan, Cash amber; separated segments have rounded corners without inflating small shares. Center amount stays clean and labels concise. The same colors connect summary links and Bank → E-wallet → Cash section headings. Credit/debit/debt/bill sections leave the primary Wallet content; Current keeps one muted Bills reference, History none.

Overview/History switches the summary and card period. History has a native year select and scrollable month buttons, with missing snapshots disabled. Account cards retain notched surfaces and provider identity while removing unnecessary underline/divider treatment. Their header activity buttons independently toggle selected-month income/expense shares and amounts; account links are sibling controls, never nested interactive elements. Own transfers are excluded. History balances are first-of-month snapshots; card detail explicitly remains current. Shared shell/navigation/profile actions and privacy/unknown/currency safeguards remain. [S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) records 521-key/66-test PASS and runtime 56-layout/14-edge/15-group verification with 12 after/3 before captures. Final independent A is SHIP; corrected 200% text enlargement and AX/contrast checks pass. Source `184b2f7053940f7e2129d41c8f61342c76a7b875` is pushed in existing Draft PR #8; documentation closeout follows the verified source. Owner review/merge pending. The following S1 evidence is historical.

## Superseded Wallet S1 presentation (2026-10-18)

[Wallet](../pages/wallet/Page-Wallet.md) now adapts the owner's ring and notched cards within the existing enamel world. A ring-led overview shows assets at the center and obligations separately; category legend explicitly defines assets + obligations as its composition basis, never net wealth. Bank/E-wallet/Cash sections precede credit/debit/obligations. Cards retain provider badges, shared profile identity, amount hierarchy and native detail/bill actions. Debit references linked bank money only; no debit fixture exists. Matching income/expense mix excludes transfers and uses unavailable text when no data exists. Hidden mode removes values and proportional geometry/percentages. Shared theme/locale/sidebar/nav and profile/credit/bill/transfer/Add behavior remain. Mobile ring caps at 264px with two-column legend from 360px; shared movement-basis text excludes own transfers, liability cards omit movement captions and redundant header subtitle is removed. Layout begins stacked, then pairs ring/legend and account columns at 700px; narrow translated text must wrap without overflow. [D32](../project/DECISIONS.md#d32--wallet-composition-and-notched-account-cards), [data contract](UI_DATA_CONTRACTS.md) and [S1](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S1.md) record semantics and verified runtime and source delivered; final documentation checkpoint pending. This supersedes only the former Wallet overview presentation; Home and pre-Home history below remain.

Source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8); final finish SHIP, owner review/merge and final documentation checkpoint remain pending.

## Current state — pre-Home preview S4

[Welcome](../pages/auth/Page-Auth.md) has one Get Started → Entry; Entry offers normal Login/signup without invitation wording. Login and Google continue to Home; signup and Google continue to Profile with empty or typed fields. Signup presents email/password/confirmation only. These actions explicitly clear credentials and make no authentication, account-created or provider-success claim. Six separate steps remain Profile → About You → Privacy → First Accounts → Notifications → Install, then Postcard → Home. Each step and Postcard has one primary action and one header Back. Browser Back/Forward remains native. [D28](../project/DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode) records the dated preview revision; D4/D25/D27 and closed S1–S3 remain historical.

Consumer TH/EN copy replaces repetitive form/footer prototype explanations. One small visible `โหมดสาธิต` / Demo mode indication appears in the header of every public route and exposes the environment boundary to assistive technology. Google buttons reference that explanation; a readable “or” separator separates them from primary credential actions. Password visibility and unavailable password recovery remain. Synthetic financial-data disclosures remain on the existing dashboard.

The pinned Light Porcelain × Premium Blue Architectural Enamel world is unchanged: exact S2 shield, four existing WebPs, live translated wordmark/tagline/supporting copy, local Noto Sans Thai, cobalt actions, porcelain forms, approved source precedence and cover compositions. Portrait tablet still wins at 1024×1366, landscape tablet at 1366×1024 and desktop at 1280×800. Safe-area gutters, growing/scrolling forms, >=44px controls, title/main focus, TH/EN locale and reduced-motion Postcard remain. Google/status/form spacing uses existing tokens; see [Tokens](DESIGN_TOKENS.md).

Credentials stay DOM-only and temporary setup choices reset on refresh. No OAuth, session, auth storage/cookie, user record, legal consent record, financial mutation, permission request, service worker or installed-success state is introduced. This is presentation routing. Production invite-only signup remains canonical; the owner's public signup/Google production direction is PENDING separate owner confirmation and security architecture approval before M1. [Open Questions](../project/OPEN_QUESTIONS.md) tracks that decision. [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) preserves its historical verification/checkpoint record; current integration indexes record Welcome PR #6 merged. Source: [welcome.js](../../src/welcome.js), [preview-flow.js](../../src/preview-flow.js), [welcome.css](../../src/styles/welcome.css).

## Preserved Account Board contract — S3

Home defaults to a vertical deck of complete account folders. Horizontal is the only alternate mode and is selected only in Settings; mode changes preserve the selected account ID. Every account uses the same full folder component in both modes. S1/S2 tab strips, Stack/Grid choices and wrapping selection are historical and SUPERSEDED by the owner’s S3 attachment. The shared 13 provider assets, session profile form, Wallet detail routes and financial preview boundary remain intact. The source and evidence are recorded in [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md).

## Authority and scope

The 16 October 2026 written brief, supplied blue-enamel Image A, and owner-selected HTML/CSS/JavaScript preview stack guide this work. This specification does not approve a production framework or financial domain implementation. The project guide, architecture and universal workflow are available and were read for this task; references B/C remain unavailable. Image A now governs the three focused screens; B/C contents are not invented.

## Screen composition

Home retains the sky-blue cover, compact profile/header, cobalt balance hero and four enamel quick actions. The curved cover transition now opens onto the ordered compact owner revision described above. This supersedes the former Home monthly bars and lower habit placement; the existing Account Board is preserved.

Transfer reuses the cover with an account source panel. Its deep-blue body contains an oval amount editor, own-account destinations, tactile pill keypad, and an unsaved review. It starts at zero; physical keyboard editing remains possible and `inputmode="none"` avoids a second mobile keypad. The polite amount status confirms custom-keypad changes. Credit Card Liability Detail adapts Image A's original card visual and six-tile action grid to supported tracking previews. A single indicator represents the single sample card. No card network branding, real credentials, freeze/online/contactless controls, or payment execution is present.

Latest mobile footer: Home / Wallet / Activity / More capsule and a separate right-hand Add circle. More is a native nonmodal popover containing Bills and Party, not a route. Add retains the existing bottom sheet. Settings stays under the avatar. Browser hash history supports direct destinations and Back/Forward; navigation focuses main content and remembers scroll positions. Wallet-origin card details return to Wallet and retain its active context; Bills-origin or directly opened cards use Bills/More. Desktop rail styling remains intact, with Wallet added.

## Material and interaction

Owner follow-ups to PR #2: a fresh desktop page load defaults to pinned expansion. The expanded sidebar header is one54px row with the supplied S-Shield and wordmark on the left and centered panel toggle on the right; compact mode retains the accessible two-row composition and44px shield. Shared branding and favicon reference assets/brand/gissino-s-shield.png. The image is contained without image transformations. The historical metallic navy artwork was superseded on 2026-10-17 by the owner's exact white/blue replacement in [Welcome S2](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md); layout and shared helper are unchanged. Initial shell attributes and the controller's pre-render desktop offset seed agree, so the first layout starts expanded without an intentional collapsed-to-expanded transition. Pin preference remains session-only; effective expansion and content offset are disabled below1100px. This replaces the earlier stable-coordinate toggle decision.

Desktop navigation at 1100px follows GS-UI-002: 72px collapsed rail, 240px temporary overlay with unchanged 72px content offset, and 240px pinned layout offset. Hover entry/exit delays are 150/180ms; panel entry/exit transitions are 240/190ms and label reveal is 140ms. A stable toggle pins/unpins; unpin suppresses hover until a fresh pointer entry. Keyboard focus reveals navigation labels; Escape dismisses temporary expansion while retaining pin preference. The controller keeps pin in session memory, cancels stale timers and clears transient ownership when the shell rerenders. Home/Wallet/Activity/Bills/Party are direct desktop links; Add is one separate header action invoking the existing sheet. Desktop dimensions, motion and layering use shared tokens. Reduced motion removes spatial transitions; forced colors preserves boundaries/selection.

Opaque enamel panels have a gentle upper-left highlight and restrained offset contact shadows. Inputs, selected segmented controls, and icon wells are recessed. Buttons have hover, pressed, focus-visible, and disabled states. No glass, decorative blur, continuous animation, neon, rainbow gradients, or third-party animation framework is used.

The sheet enters in 300ms with ease-out; button state transitions are 120–180ms. No-spend preview has one brief seal response. Reduced-motion preferences remove those animations while retaining visible state. Native dialog provides modal keyboard containment and Escape; close returns focus to the opener. Sheets scroll independently and respect safe-area padding.

## Copy, fixtures, and privacy

Thai is the default; all component copy uses the Thai/English catalogs. Product logotype, numeric account suffixes, generated currency notation, and technical references are not translated. The dashboard retains its sticky sample-data indicator and relevant entry/receipt/AI/invitation/settings disclosures. Pre-Home screens instead use the single compact application-level Demo mode indicator and its accessible description; consumer forms have no repeated technical footer. User text is escaped before HTML rendering.

Fixtures are immutable examples in `src/fixtures.js`, not accounts or a schema. No financial/user data is saved, no file is read or uploaded, and no external request is made by the app. Theme, locale, form, and visibility state also reset on reload. Party shares only habit metrics; visibility controls change the owner's displayed shared metrics while leaving private personal progress intact.

## Responsive and accessibility target

Primary reference: 390 CSS px. Supported layout target starts at 320px, with 600/900/1100px adaptations. Horizontal gutters start at 16px. Controls have at least 44px hit dimensions; the very narrow calendar changes to an agenda instead of squeezing dates. Cards and rows grow around translated text. Typography, focus, contrast, zoom, actual touch keyboards, and screen-reader behavior require verification rather than a blanket certification.

The preview server is loopback-only and refuses production startup. Production auth, finance, persistence, bank services, AI, subscription posting, PWA caching, and deployment remain outside this slice.

## S1 Account Board extension — SUPERSEDED

Replace the earlier Home account rows with navy layered account folders while retaining the enamel hero/cover and navigation. Compact Stack is default; wide containers pair featured folder with direct list, and Grid adapts to one/two/three readable columns. Provider accents are proposed UI colors with original generic fallback badges; verified artwork is not bundled. Selection shuffles over220ms unless reduced motion is enabled. [Provider Catalog](PROVIDER_CATALOG.md), [Home](../pages/home/Page-Home.md), [Wallet](../pages/wallet/Page-Wallet.md) and [review](reviews/ACCOUNT_BOARD_REVIEW.md) define the current extension.

Authority correction: project guide, architecture and governance notes are now available and were read for this task. Their earlier absence above is historical context only. Production stack and financial integration remain unimplemented.

## Change log

- 2026-10-16 — Added vault metadata and linked this note from the [Design Hub](Design-Hub.md) for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 owner-directed refinement — SUPERSEDED presentation

Supersedes the simple staggered folder and unavailable-profile presentation. Desktop tabs align on shared edges with a curved shoulder; mobile collapses mode controls into the title row and uses near-visual indicators with no instructional copy below. Assets are owner-supplied local PNGs, with explicit fallback. Profile setup/edit is session-only and no real finance/persistence is implied.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


## S3 complete-folder behavior

Actual occlusion reveals complete 160–164px folders rather than decorative strip placeholders. Vertical exposure is 24px on narrow containers and 28px on wider ones, bounded to two/three rear cards. Cards share aligned edges, curved 20px shoulders, contained logos and contact shadows. Wide vertical composition retains its direct companion selector; horizontal card width is capped at 360px and the track remains clipped within the page. Home contains no mode selector, instruction paragraph or X-of-Y counter.

The dedicated 44px grip holds 260ms for vertical touch; horizontal touch follows lateral movement directly. Native pointer capture and requestAnimationFrame update the existing card nodes continuously; a 240ms cubic ease-out settles without overshoot. Cancel/below-threshold restores source, reduced motion settles immediately, ordinary body touch scroll remains native. Bounded previous/next, axis arrows and Home/End select; wheel accumulation is throttled and releases scroll at ends/Ctrl. Explicit detail and active-only double-tap/double-click open detail; dragging does not. Inactive full-card overlays provide selection without exposing inactive detail controls.


- 2026-10-16 — [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) supersedes the S1/S2 tab-strip and Stack/Grid presentation with complete overlapping folders.


- 2026-10-17 — Documented A01 public preview extension for [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); retained dashboard S3 history.

- 2026-10-17 — Reconciled owner-requested pre-Home S3 preview for [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md); S1/S2 history remains preserved.

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) / D28 replaces only pre-Home copy, open-signup/Google presentation and demonstration navigation; production security and prior session history remain preserved.

- 2026-10-18 — Reconciled source-level Home v2 S1 behavior and preserved Account Board for [Home S1](../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md); verification/delivery gates remain in progress.

- 2026-10-18 — Reconciled owner-approved Compact Home/gamified transient preview for [Home S2](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md); D29 presentation superseded by D30, production engine boundaries retained.

- 2026-10-18 — Owner [Home S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) reconciles seven-day Due soon, Home Safe removal with retained math and missing activity versus frozen days; other contracts preserved.


- 2026-10-18 — Added scoped Wallet v2 current state for [TASK-GS-UI-WALLET-V2-001](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md); final verification/delivery pending.

- 2026-10-18 — [Wallet S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) / D32 S2 supersedes S1 Wallet presentation with assets-only composition and monthly history; S2 verification/delivery pending.
