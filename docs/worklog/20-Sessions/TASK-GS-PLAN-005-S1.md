---
id: TASK-GS-PLAN-005-S1
type: session
level: log
status: PASS
updated: 2026-10-17
up: ../10-Tasks/TASK-GS-PLAN-005.md
related:
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
  - ../../pages/auth/Page-Auth.md
  - ../../pages/home/Page-Home.md
  - ../../project/OPEN_QUESTIONS.md
---
# Session S1 — Onboarding, Home v2, and Roadmap Documentation

## Scope

Execute the documentation-only planning task for **GS-PLAN-005**:
1. Audit repository truth, the merged PR #4 Account Board baseline, and the owner's planning documents (`FEATURE_MAP.md` and `HOME_AND_LEADERBOARD_SPEC.md`).
2. Synthesize the Pre-Home flow (A01–A10), Home current inventory vs Home v2, 10-screen feature map, 6 critical conflict approval gates, and the dual-track implementation roadmap into [ONBOARDING_HOME_V2_ROADMAP.md](../../design/ONBOARDING_HOME_V2_ROADMAP.md).
3. Create canonical Level-2 note [Page-Auth.md](../../pages/auth/Page-Auth.md).
4. Update affected living page notes, hubs, screen maps, and open question records in accordance with [VAULT_RULES.md](../../governance/VAULT_RULES.md).
5. Verify repository checks, commit to dedicated task branch `task/gs-plan-005-onboarding-home-v2`, push to remote, and open one Draft PR.

## Vault actions

Following the note decision procedure in [VAULT_RULES.md §5](../../governance/VAULT_RULES.md#5-decision-procedure-new-note-or-update-and-at-which-level):
- **Level-2 Main Specification Created:** `docs/design/ONBOARDING_HOME_V2_ROADMAP.md` created as a living UI specification note covering the cross-cutting onboarding and Home v2 roadmap.
- **Level-2 Page Note Created:** `docs/pages/auth/Page-Auth.md` created as the canonical Level-2 page note for the designed authentication and onboarding screens.
- **Living Notes Updated in Place:**
  - `docs/pages/home/Page-Home.md`: Added planned Home v2 block roadmap; preserved PR #4 complete folder contract.
  - `docs/pages/activity/Page-Activity.md`: Added planned Activity Summary tab (`#activity/summary`).
  - `docs/pages/party/Page-Party.md`: Added planned Leaderboard, Friends, Group creation, and Visibility specifications.
  - `docs/pages/settings/Page-Settings.md`: Cross-linked with planned roadmap specifications.
  - `docs/design/SCREEN_MAP.md`: Added planned routes for Pre-Home, Home v2, Activity Summary tab, Leaderboards, and Friends.
  - `docs/project/OPEN_QUESTIONS.md`: Appended Q1–Q10 planning questions and conflict approval gates.
- **Hubs Updated:**
  - `docs/pages/Pages-Hub.md`: Indexed `Page-Auth.md`.
  - `docs/design/Design-Hub.md`: Indexed `ONBOARDING_HOME_V2_ROADMAP.md`.
  - `docs/project/Project-Hub.md`: Indexed `FEATURE_MAP.md` and `HOME_AND_LEADERBOARD_SPEC.md`.
- **Center and History Synchronized:**
  - `docs/START_HERE.md`: Updated current focus to `TASK-GS-PLAN-005`.
  - `docs/project/PROJECT_HISTORY.md`: Recorded PR #4 merge and `TASK-GS-PLAN-005` timeline entry.
  - `docs/worklog/00-Index/Task-Dashboard.md`: Updated PR #4 to EXTERNALLY ACCEPTED and added `TASK-GS-PLAN-005`.

## Evidence & Verification

- `npm run check`: PASS (syntax, 375 keys per locale, local assets, catalog-only Thai UI copy).
- `npm test`: PASS (34/34 tests passed).
- Markdown formatting, frontmatter correctness, and relative link integrity verified across all created and touched files.
- `git diff --check`: PASS.
- Production mutation: NONE.
- Code mutation: NONE.

## Next step

Owner reviews the planning Draft PR andloopback documentation. Next coding tasks can proceed in small slices starting with S1 (Home v2 preview) or S2 (Activity Summary tab).
