---
id: PROJECT-DECISIONS
type: decision-log
level: 2
status: CURRENT
updated: 2026-10-16
up: Project-Hub.md
related:
  - PROJECT_GUIDE.md
  - OPEN_QUESTIONS.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
  - ../pages/Pages-Hub.md
---
# Decisions

The D1–D22 entries preserve the Project Guide snapshot. D23 records the owner-approved navigation produced during design iteration.

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
- Statement: Home defaults to compact layered asset folders with Stack/Grid choice. Bank/E-Wallet/Cash identities share one registry and display adapter with Wallet; liabilities remain separate. Selection is distinct from opening detail.
- Provider artwork without confirmed rights uses original fallback icons; accent HEX values remain proposed UI tokens, not official brand certification.
- Supersedes the prior simple Home account-list presentation only. No Accounts/Ledger, persistence or bank integration milestone is implied.
- Source: [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md); affects [Home](../pages/home/Page-Home.md), [Wallet](../pages/wallet/Page-Wallet.md), [Provider Catalog](../design/PROVIDER_CATALOG.md).

## D24 follow-up — aligned folders and profile previews

Owner-directed2026-10-16 refinement: straight curved folders, compact mobile visual indicators/no counter/helper, bundled owner-supplied bank/E-Wallet PNGs, Paotang profile and add/edit display metadata with appearance choices. This supersedes D24 baseline blanket logo withholding for the supplied13assets and unavailable Add behavior only. Everything remains mock/session-only.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).
