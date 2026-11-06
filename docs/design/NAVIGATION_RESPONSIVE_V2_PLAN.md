---
id: DESIGN-NAVIGATION-RESPONSIVE-V2-PLAN
type: design
level: 2
status: DRAFT
updated: 2026-11-06
up: Design-Hub.md
related:
  - PRODUCT_UX_V2_PLAN.md
  - ../project/DECISIONS.md
  - ../project/OPEN_QUESTIONS.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
  - SCREEN_MAP.md
  - UI_DESIGN_SPEC.md
  - ../pages/Pages-Hub.md
---

# GisSino — Responsive Navigation V2 (Planning Draft)

> **Scope:** Documentation and UX/IA planning only. **No implementation approval, no frontend/API/DB changes, and no production acceptance.**
>
> **Planning release:** Product-wide UX Planning V2, first reviewed area: responsive navigation.
>
> **Evidence baseline:** Existing `main` prototype and existing owner decision D23, as inspected on 2026-11-06. Re-verify the current commit SHA and any newer PRs before copying this note into the repository.

## 1. Objective and decision authority

Design a consistent navigation system for GisSino across **phone, tablet/iPad (portrait and landscape), and desktop** while keeping the same underlying destinations and daily-use workflows. It must support access to the existing application surfaces without introducing new features or implying that synthetic screens are operational services.

The owner has directed the following **V2 design candidate** for planning and review:

- **Phone:** bottom navigation **Home · Activity · Wallet · More**, with a **separate Add button** adjacent to the bottom-navigation island. **Profile avatar at the upper-right**.
- **Tablet/iPad, either orientation:** bottom navigation **Home · Activity · Wallet · More · Profile**; the **Add button floats at the lower-right**, separate from the navigation and positioned clear of it.
- **Desktop:** collapsible **left sidebar** with the application's meaningful main destinations exposed directly, plus visible **Settings**, and a separate Add action in the header or primary action area.

**Authority conflict:** [D23](../project/DECISIONS.md#d23--responsive-primary-navigation) is the repository's current `[DECIDED]` navigation record: phone Home / Wallet / Activity / More + separate Add; desktop sidebar Home / Wallet / Activity / Bills / Party, Settings reached via the profile control. This V2 draft proposes **a phone tab reorder, a tablet-specific Profile tab and lower-right Add, a phone avatar relocation, and direct Settings visibility on desktop**. It **does not silently supersede D23**. Do not relabel D23 as superseded or change canonical navigation until the owner reviews/approves the precise V2 decision and its downstream documentation changes.

## 2. Existing source evidence (not future guarantees)

| Existing source | What it establishes |
|---|---|
| [`src/navigation.js`](../../src/navigation.js) | Current mobile nav items (`home`, `wallet`, `activity`, `more`); separate Add island; More destinations `bills` and `party`; context mapping; More popover/overlay behavior. |
| [`src/screens.js`](../../src/screens.js) | Desktop destinations `home`, `wallet`, `activity`, `bills`, `party`; sidebar/profile entry to Settings; shared Add menu and modal shell. |
| [`src/blue-screens.js`](../../src/blue-screens.js) | Home header currently has **Profile on the left** and progress/bell actions on the right; this conflicts with the proposed phone avatar location. |
| [`src/app.js`](../../src/app.js) | Existing named routes, dialog history, Back handling, account-detail overlays, Add-mode events, navigation state. |
| [`SCREEN_MAP.md`](SCREEN_MAP.md) | Screen and route mapping, sub-page relationships, documented demo/preview behavior. |
| [`UI_DESIGN_SPEC.md`](UI_DESIGN_SPEC.md) | Responsive/accessibility constraints, typography, tokens and existing review conventions. |
| [`../project/DECISIONS.md`](../project/DECISIONS.md) | Authoritative D23 baseline and subsequent page-specific decisions. |

**Implementation state:** The repository contains a buildless HTML/CSS/JavaScript **mock-data PWA prototype**, not a live finance backend. Existing preview actions may change only in-memory demonstration state; do not claim real posting, authentication, payment, notification delivery, or cross-user access.

## 3. Navigation map — proposed V2

### 3.1 Phone (primary one-handed workflow)

**Placement:** bottom floating/capsule navigation with **four destinations in this order**:

1. **Home** (`#home`; Thai: `หน้าหลัก`) — dashboard and daily overview.
2. **Activity** (`#activity`; Thai: `รายการ`) — ledger/activity list and monthly analytics in the same page.
3. **Wallet** (`#wallet`; Thai: `กระเป๋า`) — assets, accounts, current vs history, account detail and transfer entry.
4. **More** (popover, **not a separate route**; Thai: `อื่น ๆ`) — existing **Bills** (`#bills`) and **Party** (`#party`) destinations.

**Separate Add:** A visually distinct primary **plus button** adjacent to the right side of the bottom navigation. It opens the existing shared Add dialog; it is **not counted as a fifth tab** and must not silently navigate to an invented route.

**Profile:** Avatar control in the **upper-right header** opens the existing `#settings` surface, with the profile area as the proposed initial focus/scroll target. A separate `#profile` route is **not approved**. The header should retain notification access while reorganizing the existing Home-specific controls; no silent removal of Party/progress entry.

**More content initially:** Bills and Party, using existing routes and UI. Do not add settings, imports, analytics, admin or new menu destinations solely to fill space. Evaluate later additions only when their feature scope has been separately approved.

**Important:** The phone design rearranges the current order `Home / Wallet / Activity / More` and moves the existing Home Profile control from the upper-left to upper-right. Both are V2 **proposals requiring canonical decision reconciliation**.

### 3.2 Tablet/iPad — portrait AND landscape

**Placement:** bottom navigation retained in **both orientations**, with **five destinations**:

1. Home → `#home`
2. Activity → `#activity`
3. Wallet → `#wallet`
4. More → existing Bills/Party popover
5. Profile → existing `#settings` (profile subsection entry, proposed)

**Separate Add:** Lower-right floating action button (FAB), placed within the **safe viewport area**, clear of the bottom navigation. Add launches the same shared Add dialog, with an appropriate tablet-sized sheet/dialog and keyboard/focus behavior. It must not cover the final list row, alerts, accessibility zoom controls, or the device home indicator.

**Header:** Can show more useful **page context, notification entry and page-specific controls** than a phone header. Exact tablet header tools and duplication rules are `[OPEN]` until the visual wireframe pass. Do not create a second Profile control at the top unless its role is deliberate and distinct from the bottom Profile tab.

**Landscape caution:** The current application switches to desktop sidebar at `min-width: 1100px`, which would route some landscape iPads to desktop. The owner now wants **tablet bottom navigation even in landscape**. This is a confirmed design direction, but **technical classification of tablet vs desktop at overlapping viewport sizes is `[OPEN]`**. Avoid inventing a reliable CSS-width-only or user-agent-only solution; design and test alternatives before changing breakpoints.

### 3.3 Desktop (wide-screen navigation and context)

**Placement:** existing collapsible **left sidebar**, with these primary destinations exposed:

- **Home** → `#home`
- **Activity** → `#activity`
- **Wallet** → `#wallet`
- **Bills** → `#bills`
- **Party** → `#party`

**Account and preferences group:**

- **Settings** → `#settings`, directly visible as requested (its **route and UI already exist** in the prototype).
- **Profile** → a profile-focused entry to the **existing Settings page**, unless a separate `#profile` route is explicitly approved later. **Whether both sidebar items should remain visible or one becomes a profile card is `[OPEN]`**; avoid duplicating identical navigation links just for symmetry.

**Separate Add:** Dedicated header/primary action button opens the shared Add dialog. Do not place Add in the Sidebar's list of page destinations unless the owner later changes the model.

**Sidebar behavior:** Preserve the existing collapsed/expanded behavior and keyboard accessibility as the baseline. A wide screen can expose Bills and Party directly instead of nesting them in More. The plan does not require a desktop More menu.

**Child destinations, NOT top-level sidebar items:**

- Transfer `#transfer` from Wallet, Add and Home quick actions.
- Credit Card `#credit-card` from Bills and related card details.
- Account detail `#wallet/account/<stable-id>` within Wallet context (existing hash-backed detail sheet).
- Transaction, bill and profile detail **dialogs** remain contextual surfaces, not new top-level routes.

## 4. Cross-device comparison

| Destination/control | Phone | Tablet portrait/landscape | Desktop | Existing prototype? |
|---|---|---|---|---|
| Home | Bottom tab #1 | Bottom tab #1 | Sidebar | Yes |
| Activity | Bottom tab #2 (reordered) | Bottom tab #2 | Sidebar | Yes |
| Wallet | Bottom tab #3 (reordered) | Bottom tab #3 | Sidebar | Yes |
| More | Bottom tab #4 | Bottom tab #4 | No need; children direct | Yes, mobile |
| Bills | Via More | Via More | Sidebar direct | Yes |
| Party | Via More | Via More | Sidebar direct | Yes |
| Add | Separate button at lower-right of nav | FAB at viewport lower-right | Separate header action | Yes, positions require review |
| Profile | Upper-right avatar | Bottom tab #5 | Sidebar profile area | Existing Settings entry; placement change |
| Settings | Via Profile avatar | Via Profile tab | Direct Sidebar item | `#settings` already exists |
| Transfer | Contextual action | Contextual action | Contextual action | `#transfer` exists |
| Credit Card | Contextual action | Contextual action | Contextual action | `#credit-card` exists |
| Notifications | Header/alerts | Header/alerts | Header/alerts | Preview only |

## 5. Detailed behavior contracts (planning, not implemented V2)

### 5.1 Routing and selected-state semantics

- A bottom tab or sidebar item identifies a **destination**, not a feature entitlement or backend capability.
- Show exactly one primary active context for any route: Home → Home; Activity → Activity; Wallet, Transfer and Wallet account detail → Wallet; Bills/Credit Card → More on phone/tablet and Bills on desktop **unless Credit Card was entered from Wallet**, where the existing return context must remain intact; Party → More on phone/tablet and Party on desktop. Settings entered via Profile → Profile on tablet; phone profile is in the header, so no bottom tab selected unless the chosen navigation scheme requires a neutral state. Desktop Settings/Profile styling must accurately reflect whether those are distinct entry points.
- `More` is a **popover/menu**, not a route. Opening it does not imply that Bills/Party have loaded. It should show the user's current section only when an actual child route is active.
- The Add button is a **command**, not a screen destination: opening/closing it should not change selected bottom-tab/Sidebar state.
- Deep links, reload, Android/browser Back, focus return and unknown-route fallback must follow the existing route/history contracts unless a separate PR explicitly changes them.

### 5.2 More menu

- Initial list: **Bills**, **Party** only, each with concise Thai label and optional descriptive subtitle/icon. No fake or inaccessible choices.
- Opening: from More button; closing: select a destination, outside click, Escape, or Back where history state requires it; correct focus restoration; trap/contain focus when presented as a modal-style overlay.
- Do not allow the More menu and the Add dialog to overlap. The existing navigation overlay close behavior is the baseline.
- If more sections become owner-approved later, group by actual workflow and frequency; do not expand for decoration.

### 5.3 Add entry

- One shared Add action model on all sizes; existing preview choices: **Expense**, **Income**, **Transfer**, **Slip attachment (no OCR)**, **No-spending-today check-in**; **AI-assisted entry** is a future/unavailable prototype entry and must be labeled accordingly.
- The existing prototype forms and review steps are **not persisted finance events**. The UI must label simulated actions honestly; nothing is saved to a real ledger until future milestones and authorization are implemented.
- Phone: Add adjacent to the bottom island, visually distinct; avoid collision with More and reachability issues on narrow viewports.
- Tablet: FAB at the bottom-right independent of the bar; adjust offset when navigation, on-screen keyboard, safe area, zoom, or dialog would otherwise overlap.
- Desktop: Add button in app header/primary action area; same core dialog/sheet behavior, adapted width and semantics.

### 5.4 Profile and Settings

- **Existing fact:** `#settings` is already implemented as a prototype page, including theme, language, account display mode, profile/privacy/security/notification and installation-related entries; some are placeholders and not operational settings.
- Phone Profile avatar (top-right) → Settings; tablet Profile bottom tab → Settings; desktop Settings item → Settings.
- `[OPEN]` Separate profile page vs Settings subsection. **Working documentation default only:** reuse `#settings`, entering at/focusing the Profile section when the user selected Profile. No `#profile` route and no backend profile edit should be invented in this PR.
- Ensure that theme/language changes remain reachable regardless of which navigation scheme is active.

### 5.5 Notifications and page-specific actions

- Keep the existing bell / preview notifications reachable without replacing the entire navigation system.
- On the current Home, the Profile control is **upper-left** and Party/progress + bell are **upper-right**. Moving the Profile avatar to upper-right requires an explicit header composition, including where progress moves. `[OPEN]` exact positions; preserve all current entry points in the wireframe inventory.
- A notification shortcut is not equivalent to a production delivery/read-tracking system; that is a later milestone.

### 5.6 Cross-page routes and preview honesty

- `Activity` summary remains **embedded** in Activity under existing D33; do not create a separate Summary tab.
- `Wallet` current/history presentation remains as previously approved for the mock UI (D32 S2); this navigation exercise does not change money semantics.
- `Bills` and `Party` are separate main destinations on desktop and in More on smaller screens; Party may read **only aggregate shareable habit stats** in any future real implementation.
- Finance data is synthetic in the prototype; no persistent users, cross-user permissions, ledger writes, real reminders or auto-posting are claimed.

## 6. Responsive behavior, accessibility and verification plan

**Do not decide device class only by an arbitrary viewport breakpoint.** Actual rendering depends on width, height, orientation, input modality, text scale and browser UI. The current 1100px desktop threshold is evidence of V1 implementation, **not automatically the V2 threshold**. How to guarantee tablet landscape bottom nav versus desktop sidebar at overlapping sizes remains `[OPEN]` for design/technical review.

### 6.1 Required viewport examples for a later wireframe/prototype QA pass

| Family | Example CSS viewport sizes (test targets, not hard-coded device identities) |
|---|---|
| Small phones | 320×568, 375×812, 390×844, 430×932 |
| Tablet portrait | 768×1024, 820×1180, 1024×1366 |
| Tablet landscape | 1024×768, 1180×820, 1366×1024 |
| Desktop | 1280×800, 1440×900, 1920×1080 |

### 6.2 Non-negotiable UX checks for a future implementation

- Minimum comfortable touch targets ~44×44 CSS px; do not shrink labels until unreadable.
- Support safe-area insets, virtual keyboard, browser bottom bars, standalone PWA, landscape and enlarged text (including 200% zoom).
- No FAB overlap with footer controls, last content row, modal bottom sheet or bottom navigation. Reserve content bottom padding that matches the final rendered controls, not guessed fixed sizes.
- Keyboard: visible focus, logical tab order, Escape/Back, descriptive labels, focus restoration; use correct nav/button/dialog and expanded/current semantics.
- Reduced-motion mode, light/dark contrast and Thai/English localization remain functional.
- More/Settings/Add/transfer/card Back flows should not generate duplicate history entries or surprise route changes.
- Preserve usability across pointer, touch, keyboard and screen reader.

**Evidence requirements later:** A dated viewport matrix, screenshots or user-provided visual inspection for each layout, keyboard/focus/Back checklist, and a recorded decision about the tablet/desktop boundary. None of those tests have been run by producing this planning note.

## 7. Information architecture inventory to preserve

The current prototype exposes these named application routes: `home`, `wallet`, `activity`, `bills`, `party`, `settings`, `transfer`, `credit-card`; eleven pre-main routes: `welcome`, `entry`, `login`, `signup`, `setup/profile`, `setup/about`, `setup/consent`, `setup/accounts`, `setup/notifications`, `setup/install`, `postcard`. **Add** and other details are contextual overlays, not additional top-level routes. There is also a dynamic Wallet account-detail hash. This inventory describes the prototype, **not** a list of completed real finance services.

Navigation must not expose admin functionality as ordinary family UI. The owner-only admin console has a separate host/boundary in the architecture and is not a destination in these bars.

## 8. Cross-screen impact and change-control matrix

| Planning change | Existing areas touched when implemented later | Review requirement |
|---|---|---|
| Phone order Home/Activity/Wallet/More | `src/navigation.js`, nav styles, active context, QA | Amend/supersede D23 after owner-approved final spec |
| Move phone Profile to upper-right | Home header in `src/blue-screens.js`, consistent app headers, notifications/progress | Explicit header-wireframe sign-off |
| Tablet fifth Profile tab | tablet nav shell, `#settings` route, active context, accessibility | Confirm shared-profile routing and duplicates |
| Tablet FAB bottom-right | nav shell, safe-area CSS, bottom padding, dialog opening | Confirm landscape and keyboard collisions |
| Tablet bottom bar even when wide | responsive CSS and current 1100px switch | `[OPEN]` cross-device classification, require tested strategy |
| Desktop direct Settings | `src/screens.js` sidebar, sidebar styles, selected state | Confirm sidebar Profile/Settings duplication policy |
| More destination grouping | `src/navigation.js`, menu transitions | Maintain Bills/Party and future owner-approved additions only |
| Add/Back/modal consistency | `src/app.js`, navigation, dialog contract | Preserve existing Back and in-memory preview behavior |

No files in this table are authorized for modification by the **documentation-only V2 Draft PR**.

## 9. Research and later adaptation protocol

Future references from finance apps, web apps, general websites and native apps must be evaluated on their own merits; their framework does not dictate GisSino's tech stack.

For each reference, record: source/app, direct URL, observed platform/build, access date, feature/interaction being studied, screenshot/evidence description where legally available, strengths, drawbacks, relevant GisSino screens, privacy/security/maintenance implications, and **recommendation** (`Adopt idea`, `Adapt`, `Consider later`, `Reject`). Distinguish **observed behavior** from assumptions and visual inspiration. Do not copy proprietary source/assets or bypass access restrictions; only inspect authorized/public surfaces, and respect applicable terms/licensing.

Every proposed change follows: **Reference → observed pattern → GisSino adaptation → cross-screen impact → decision tag → owner review → dated update**. Append decisions/change notes; preserve V1 history and the current prototype implementation until authorized.

## 10. Open questions and next small slices

| ID | Status | Question / gate |
|---|---|---|
| NAV-V2-Q01 | `[OPEN]` | How will a tablet (including 1366px landscape) reliably receive bottom navigation while an overlapping-width desktop gets a sidebar? Compare layout/interaction strategies before selecting one. |
| NAV-V2-Q02 | `[OPEN]` | Does Desktop need distinct visible **Profile** and **Settings** sidebar entries, or a single profile card plus a Settings entry? Keep `#settings` as the only existing route until approved. |
| NAV-V2-Q03 | `[OPEN]` | When Profile moves to the upper-right on phone, where should the current Home Party/progress button and bell be placed? |
| NAV-V2-Q04 | `[OPEN]` | Should the tablet header also show an avatar if Profile already has a bottom tab? Default: avoid duplicate entry unless justified. |
| NAV-V2-Q05 | `[OPEN]` | What exact gap, size, animation and anchoring should the separate Add button use at narrow/landscape/safe-area sizes? Decide during wireframe testing. |
| NAV-V2-Q06 | `[OPEN]` | Should Profile entry scroll/focus the profile section inside `#settings`, or is a dedicated profile route required? Do not implement a new route as part of planning. |
| NAV-V2-Q07 | `[PENDING CANONICAL DECISION]` | Owner reviews exact changes from D23 and decides whether/how to record the V2 superseding decision. |

**Suggested sequence after this note:**

1. Owner reviews this Navigation V2 proposal and resolves the key questions (especially tablet/desktop classification and Profile/Settings semantics).
2. Research alternative navigation patterns from external apps/web apps, with permission-aware source records.
3. Produce **wireframes**, Mobile → Tablet portrait → Tablet landscape → Desktop; **do not implement** until a separate task is approved.
4. Record the accepted navigation policy in the canonical decision log, then reconcile `SCREEN_MAP.md`, relevant page notes and architecture **only in an explicitly approved follow-up slice**.
5. Continue the product-wide V2 plan **one page at a time**, starting with Home after navigation review, preserving baseline functionality and status tags.

## Change log

- 2026-11-06 — Created first **documentation-only** Navigation V2 planning candidate from owner-directed phone/tablet/desktop requirements and inspected existing mock UI. D23 remains current in the repository; no code or production decision changed by this file alone.
