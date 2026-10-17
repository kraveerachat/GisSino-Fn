---
id: HUB-PAGES
type: hub
level: 1
status: CURRENT
updated: 2026-10-18
up: ../START_HERE.md
related:
  - ../project/DECISIONS.md
  - ../architecture/Architecture-Hub.md
  - ../design/Design-Hub.md
---
# Pages Hub

Current user-visible prototype surfaces. Welcome → Entry → Login/signup and six setup steps → Postcard form eleven public design-preview screens. Primary/Google actions navigate empty or typed Login → Home and signup → Profile; no authentication is implemented (D28/S4). Future planning specifications are retained in [ONBOARDING_HOME_V2_ROADMAP.md](../design/ONBOARDING_HOME_V2_ROADMAP.md).

| Page | Level | Status | Summary |
|---|---:|---|---|
| [Auth / Welcome](auth/Page-Auth.md) | 2 | PROTOTYPE (mock data) | Eleven pre-Home Demo mode screens, consumer copy, Login/Google and signup/Google navigation, six-step setup |
| [Home](home/Page-Home.md) | 2 | PROTOTYPE (mock data) | Dashboard, balances, recent activity, obligations, and habit summary |
| [Wallet](wallet/Page-Wallet.md) | 2 | PROTOTYPE (mock data) | Ring-led assets/obligations, notched account cards, preserved profile/detail/transfer actions; Wallet v2 runtime verified/finish SHIP; PR #8 source delivered, final docs pending |
| [Activity](activity/Page-Activity.md) | 2 | PROTOTYPE (mock data) | Searchable and filterable sample transaction history; Summary tab planned |
| [Add](add/Page-Add.md) | 2 | PROTOTYPE (mock data) | Unsaved preview actions in a modal |
| [Bills](bills/Page-Bills.md) | 2 | PROTOTYPE (mock data) | Calendar/list view of synthetic obligations |
| [Party](party/Page-Party.md) | 2 | PROTOTYPE (mock data) | Habit status, rankings, members, feed, and visibility preview |
| [More](more/Page-More.md) | 2 | PROTOTYPE (mock data) | Mobile popover containing Bills and Party |
| [Settings](settings/Page-Settings.md) | 2 | PROTOTYPE (mock data) | Theme, language, profile, display modes, and explanatory settings |


## Change log

- 2026-10-17 — Added the canonical Auth/Welcome page for [TASK-GS-UI-WELCOME-001](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md).

- 2026-10-17 — Updated public journey inventory for [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md).

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) refreshes Auth preview copy/actions; production signup policy remains unchanged.

- 2026-10-18 — Updated Wallet v2 inventory for [Wallet task](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md); corrected stale pre-S4 Login summary.
