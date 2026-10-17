---
id: PROJECT-DECISIONS
type: decision-log
level: 2
status: CURRENT
updated: 2026-10-17
up: Project-Hub.md
related:
  - PROJECT_GUIDE.md
  - OPEN_QUESTIONS.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
  - ../pages/Pages-Hub.md
---
# Decisions

The D1–D22 entries preserve the Project Guide snapshot. D23 records owner-approved navigation; D24 records the Account Board; D25 records the A01 Welcome extension.

| ID | Decision | Status |
|---|---|---|
| D1 | Name GisSino / `GisSino_FN`, tagline as in the Project Guide | [DECIDED] |
| D2 | Personal/family hobby app, solo-first, lean daily-use scope | [DECIDED] |
| D3 | Mobile-first PWA, then desktop | [DECIDED] |
| D4 | Flow: Welcome → Login/Sign up (invite) → Setup → Main | [DECIDED] |
| D5 | Hosting: home server + Cloudflare Tunnel; Twingate for admin only; Access for admin routes | [DECIDED] |
| D6 | Currencies THB + USD only; daily USD→THB rate fetched from an API | [DECIDED], source [PROPOSED] |
| D7 | Subscriptions post automatically, no confirmation | [DECIDED] |
| D8 | No slip/receipt OCR; slips are attached only | [DECIDED] |
| D9 | AI chat = draft then confirm | [DECIDED] |
| D10 | Party = status/ranking showcase from solo stats; three visibility levels | [DECIDED] |
| D11 | Streak with auto-consumed freezes, Duolingo-level intensity | [DECIDED], numbers [PROPOSED] |
| D12 | Notifications: in-app + Web Push + email; Telegram owner-only | [DECIDED] direction |
| D13 | Light default + dark mode, navy accent, Thai primary | [PROPOSED] |
| D14 | Bottom nav: Home · Activity · +Add · Bills · Party; settings behind avatar | [SUPERSEDED] by D23 on 2026-10-16 |
| D15 | Stack: Next.js TypeScript + self-hosted PostgreSQL + job queue in PostgreSQL | [PROPOSED] |
| D16 | Domain/tunnel reuse from AEGIS | [OPEN] |
| D17 | LLM provider | [OPEN] |
| D18 | Email provider for digests | [OPEN] |
| D19 | Thai banks for CSV import later | [OPEN] |
| D20 | Same physical server as AEGIS or separate; IP/VLAN placement | [OPEN] |
| D21 | Off-host backup destination | [OPEN] |
| D22 | Whether Full visibility ever includes itemized data; recommendation is never | [OPEN] |
| D23 | Responsive primary navigation described below | [DECIDED] |
| D24 | Complete Account Board folders and shared provider identity | [DECIDED] for mock UI |
| D25 | A01 art-directed light public Welcome and honest placeholders | [DECIDED] for preview |
| D26 | Use the owner's exact white/blue replacement at the canonical shield path | [DECIDED] for preview |

### D23 — Responsive primary navigation

- Date: 2026-10-16
- Status: [DECIDED]
- Decided by: owner through design iteration
- Statement: mobile uses Home / Wallet / Activity / More plus a separate Add circle; More contains Bills and Party. Desktop uses a collapsible sidebar with Home, Wallet, Activity, Bills, and Party, while Add remains a separate header action.
- Supersedes: D14’s earlier five-slot proposal.
- Source: [Floating Island Navigation task](../worklog/10-Tasks/TASK-FLOATING-ISLAND-NAVIGATION.md) and [Desktop Sidebar task](../worklog/10-Tasks/TASK-GS-UI-002-DESKTOP-SIDEBAR.md).
- Affects: [System Architecture §8](../architecture/SYSTEM_ARCHITECTURE.md#8-information-architecture--navigation-map-structure-only-not-layout), [Pages Hub](../pages/Pages-Hub.md), and [Screen Map](../design/SCREEN_MAP.md).

## Change log

- 2026-10-16 — Split the source decision snapshot into a canonical log and recorded D23.

### D24 — Account Board preview and shared provider identity

- Date: 2026-10-16; status: DECIDED for the mock UI; decided by owner through task and compact-folder clarification.
- Historical S1 statement — SUPERSEDED by the S3 follow-up below: Home defaults to compact layered asset folders with Stack/Grid choice. Bank/E-Wallet/Cash identities share one registry and display adapter with Wallet; liabilities remain separate. Selection is distinct from opening detail.
- Provider artwork without confirmed rights uses original fallback icons; accent HEX values remain proposed UI tokens, not official brand certification.
- Supersedes the prior simple Home account-list presentation only. No Accounts/Ledger, persistence or bank integration milestone is implied.
- Source: [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md); affects [Home](../pages/home/Page-Home.md), [Wallet](../pages/wallet/Page-Wallet.md), [Provider Catalog](../design/PROVIDER_CATALOG.md).

## D24 follow-up — aligned folders and profile previews

Owner-directed2026-10-16 refinement: straight curved folders, compact mobile visual indicators/no counter/helper, bundled owner-supplied bank/E-Wallet PNGs, Paotang profile and add/edit display metadata with appearance choices. This supersedes D24 baseline blanket logo withholding for the supplied13assets and unavailable Add behavior only. Everything remains mock/session-only.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


## D24 follow-up — complete overlapping folders (S3)

- Date: 2026-10-16; status: DECIDED for the mock UI; decided by owner in attachment `892553f0-0076-4b38-94ac-703e530edd72/Pasted text.txt`, “Real Overlapping Folder Stack & Gesture Redesign.”
- Statement: all accounts are complete reusable folders with actual overlap; vertical is default and horizontal is the only Settings alternate. Preserve selected ID across modes. Home has no mode toggle, tab-strip placeholders or conventional Grid.
- Interaction: dedicated vertical touch grip holds 260ms before continuous drag; horizontal touch moves laterally; rAF transforms preserve card nodes; 240ms snap (immediate with reduced motion). Bounded arrows/buttons/Home/End/wheel, boundary/Ctrl release, normal folder-body scroll, explicit detail and active-only double-tap/double-click. Drag does not open detail.
- Supersedes: S1/S2 Stack/Grid, strip-tab selection and wrapping index behavior only. Provider/profile/Wallet/financial contracts and the 13 supplied assets continue unchanged.
- Source: [S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md); affects [Home](../pages/home/Page-Home.md), [UI specification](../design/UI_DESIGN_SPEC.md), [Screen Map](../design/SCREEN_MAP.md).


### D25 — A01 Welcome art-directed public preview

- Date: 2026-10-17; status: DECIDED for A01 design preview; decided by owner in task GS-UI-WELCOME-001.
- Statement: Light Porcelain × Premium Blue Architectural Enamel uses four owner-supplied background variants, one separate canonical S-Shield, live translated copy and native Login/invitation-signup route actions. Welcome becomes the default no-hash public entry. Login/signup are honest placeholders with Back to Welcome. Explicit Home remains a mock-dashboard review route; no authentication is implemented.
- Responsive rule: desktop artwork at >=1280px; otherwise tablet requires both axes >=600px and follows orientation; mobile fallback includes short landscape. Contain/left-bottom preserves all art geometry. Public light appearance does not change dashboard theme preference.
- Supersedes: only the **PROPOSED dark centered tablet/desktop A01 card treatment** in the [planning roadmap at verified tip](https://github.com/kraveerachat/GisSino-Fn/blob/03065adbb023aafaac15a26bca99a123f6c2fe0e/docs/design/ONBOARDING_HOME_V2_ROADMAP.md), dated supersession 2026-10-17. Preserve that history; no other auth/setup/privacy/demographic proposal is adopted. Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) is untouched.
- Source: [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md). Affects: [Auth/Welcome](../pages/auth/Page-Auth.md), [UI specification](../design/UI_DESIGN_SPEC.md), [Screen Map](../design/SCREEN_MAP.md).

### D26 — Owner-selected canonical shield replacement

- Date: 2026-10-17; status: DECIDED; decided by owner via explicit attached-logo instruction after S1 delivery.
- Statement: copy the owner's exact replacement PNG into `assets/brand/gissino-s-shield.png` on the Welcome task branch. Reuse the existing shared helper and favicon path; no image transformation or sizing/layout change. The primary source is left untouched.
- Supersedes: the earlier S1 decision to retain the committed-main metallic shield and leave the primary alternate unadopted. S1 receipt remains an immutable historical snapshot. Shared dashboard branding intentionally receives the same replacement.
- Source and evidence: [S2](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md), [brand provenance](../../assets/brand/README.md). Affects [Auth/Welcome](../pages/auth/Page-Auth.md) and [UI specification](../design/UI_DESIGN_SPEC.md). Same Draft PR #6; no change to planning PR #5.
