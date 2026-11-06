---
id: TASK-GS-UX-V2-PLANNING
type: task
level: log
status: DRAFT PR OPEN
updated: 2026-11-06
up: ../00-Index/Task-Dashboard.md
related:
  - ../../design/PRODUCT_UX_V2_PLAN.md
  - ../../design/NAVIGATION_RESPONSIVE_V2_PLAN.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
  - ../../project/OPEN_QUESTIONS.md
  - ../20-Sessions/TASK-GS-UX-V2-PLANNING-S1.md
---

# TASK-GS-UX-V2-PLANNING — Product-Wide UX Planning V2 & Responsive Navigation

## Objective

Establish a product-wide UX/UI and functional planning workspace (Planning V2) for GisSino. Grounded in the true post-WP-20 prototype implementation (`1163e98`), this workspace provides a complete inventory of existing application surfaces, cross-page flows, and verified functions.

For this initial slice, document **Responsive Navigation V2 only** in detail, while establishing an accurate baseline inventory and owner review queue for all other pages, designating **Home Dashboard** as the next planning slice.

This task is **documentation-only**. It contains no frontend code implementation, no database migrations, no production actions, and no modification of the canonical D23 decision without separate owner approval.

## Scope and Safety

- **Task Branch:** `task/gs-ux-v2-planning`
- **Base Commit:** `1163e98bf7590bae52a3a6b92926201b1181032c` (`origin/main`, verified up to date with merged PR #18)
- **Execution Mode:** `DOCS_WRITE` / `PLAN_ONLY`
- **Target Pull Request:** [Draft PR #19](https://github.com/kraveerachat/GisSino-Fn/pull/19) (`docs(plan): start product-wide UX V2 with responsive navigation draft`) — OPEN/DRAFT
- **Application Code & Assets:** ZERO modifications (`src/`, `assets/`, styles, fixtures, tests untouched)
- **Canonical Decision Log:** `DECISIONS.md` remains untouched; D23 remains canonical `[DECIDED]`
- **Sensitive Systems:** AEGIS server, Cloudflare tunnels, firewall, Docker networks/volumes, and production hosts are strictly off-limits
- **Destructive Actions:** Zero file deletions, zero force-pushes, zero automated merges

## Canonical Baseline vs. Proposed V2 Navigation

| Dimension | Canonical D23 Baseline | Proposed V2 Planning Candidate | Status / Governance |
|---|---|---|---|
| **Phone Navigation** | `Home / Wallet / Activity / More` + separate Add circle | `Home / Activity / Wallet / More` + separate Add adjacent to island | **`[PROPOSED — for owner review]`**; reorders Activity & Wallet |
| **Phone Header Profile** | Avatar on upper-left (in `src/blue-screens.js`) | Avatar relocated to **upper-right** | **`[PROPOSED]`**; placement of progress/bell `[OPEN]` |
| **Tablet Navigation** | Switches to Desktop sidebar at `min-width: 1100px` | Persistent bottom bar in **both portrait and landscape**: `Home / Activity / Wallet / More / Profile` | **`[PROPOSED]`**; technical tablet/desktop classification `[OPEN]` |
| **Tablet Add Action** | Center island Add circle | Lower-right Floating Action Button (FAB) clear of bottom nav | **`[PROPOSED]`**; requires safe-area & keyboard testing |
| **Desktop Sidebar** | Home, Wallet, Activity, Bills, Party; Settings via profile rail | Home, Activity, Wallet, Bills, Party; **directly visible Settings** item + profile entry | **`[PROPOSED]`**; Profile/Settings sidebar role `[OPEN]` |
| **Add Command Model** | Shared modal action (not a screen route) | Shared modal action (not a screen route) | Preserved across both models |
| **Route Identity** | 8 main routes, 11 pre-main routes, contextual overlays | Same 8 main routes, 11 pre-main routes, contextual overlays | Preserved; no new top-level routes invented |

**Governance Gate:** D23 remains canonical in the repository. The V2 proposal is tagged `[PENDING OWNER ACCEPTANCE / CANONICAL DECISION UPDATE]`. It will not be merged or recorded as canonical until the owner reviews the Draft PR and authorizes a follow-up decision update.

## Delivered Artifacts

1. **[`PRODUCT_UX_V2_PLAN.md`](../../design/PRODUCT_UX_V2_PLAN.md):**
   - Product-wide UX/UI planning index, boundaries, and relationship to existing documents.
   - Screen inventory categorizing all 8 main routes, 11 pre-main routes, and contextual overlays.
   - Verified functional baseline across all 10 application areas based on post-WP-20 prototype code.
   - Cross-page dependency map detailing transaction entry, own-account transfer, obligations, habits, and preferences flows.
   - Owner review queue ordering future slices: Navigation V2 (reviewed here), Home V2 (next), Wallet V2, Activity V2, Bills V2, Party V2, Settings V2, Add V2, Pre-Home V2, Notifications V2.
   - Standardized per-page planning template and external research/adaptation register.
2. **[`NAVIGATION_RESPONSIVE_V2_PLAN.md`](../../design/NAVIGATION_RESPONSIVE_V2_PLAN.md):**
   - Detailed responsive navigation draft covering Phone, Tablet portrait/landscape, and Desktop.
   - Cross-device comparison matrix, behavior contracts, routing semantics, and accessibility checks.
   - 7 open questions (NAV-V2-Q01 through NAV-V2-Q07) including tablet landscape classification and profile route policy.
3. **Vault Integration & Audit Trail:**
   - [`Design-Hub.md`](../../design/Design-Hub.md): Added links to both V2 design notes.
   - [`Task-Dashboard.md`](../00-Index/Task-Dashboard.md): Recorded active task entry.
   - [`TASK-GS-UX-V2-PLANNING.md`](TASK-GS-UX-V2-PLANNING.md): Master task record.
   - [`TASK-GS-UX-V2-PLANNING-S1.md`](../20-Sessions/TASK-GS-UX-V2-PLANNING-S1.md): First session audit log.

## Verification Evidence

- `npm run check`: **PASS** (syntax valid, 734 matching locale keys per language, local assets verified, catalog-only Thai UI copy).
- `npm test`: **PASS** (190/190 tests passed with loopback socket access; 0 failures).
- Markdown link integrity: Validated across all newly created and updated notes.
- Git diff check: Clean documentation-only changes; zero code or stylesheet modifications.
- Local working state: Unrelated in-progress work safely stashed (`stash@{0}` and `stash@{1}`) before branching from verified `main`.

## Sessions

- [Session S1](../20-Sessions/TASK-GS-UX-V2-PLANNING-S1.md) — Pre-flight audit, source baseline extraction, V2 planning master and navigation candidate authoring, validation, and Draft PR creation.
