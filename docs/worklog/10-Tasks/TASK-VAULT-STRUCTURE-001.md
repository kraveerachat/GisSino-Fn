---
id: TASK-VAULT-STRUCTURE-001
type: task
level: log
status: IN PROGRESS
updated: 2026-10-16
up: ../00-Index/Task-Dashboard.md
related:
  - ../../START_HERE.md
  - ../../governance/VAULT_RULES.md
  - ../../project/Project-Hub.md
  - ../../pages/Pages-Hub.md
  - ../../architecture/Architecture-Hub.md
  - ../../design/Design-Hub.md
---
# TASK-VAULT-STRUCTURE-001

## Objective

Reorganize `docs/` as the canonical Obsidian vault, add the center and hubs, preserve approved history, and publish one Draft PR without changing application behavior.

## Scope and safety

- Branch: `task/vault-structure-001`
- Base: `origin/main` at `183cc99478f8a4e20637f6277e7f6a95c73c8166`
- Mode: documentation write only
- Approved moves: M1–M4 in [Vault Rules §12](../../governance/VAULT_RULES.md#12-one-time-migration-from-the-current-repository-layout-owner-approved-moves-only)
- Production mutation: NONE
- AEGIS mutation: NONE
- Deletion, force-push, and merge: NONE

## Decisions

- Vault root is `docs/`.
- New notes use relative Markdown links.
- The mobile and desktop navigation decision is recorded as D23 and supersedes D14.
- Original governance sources are preserved in their canonical locations.

## Sessions

- [Session S1](../20-Sessions/TASK-VAULT-STRUCTURE-001-S1.md)

## Touches

- [Project Hub](../../project/Project-Hub.md)
- [Pages Hub](../../pages/Pages-Hub.md)
- [Architecture Hub](../../architecture/Architecture-Hub.md)
- [Design Hub](../../design/Design-Hub.md)
- [Governance Hub](../../governance/Governance-Hub.md)
- [Task Dashboard](../00-Index/Task-Dashboard.md)

## Verification

Pending vault health checks, `npm run check`, and `npm test`.

## Delivery

- Commit 1: `9fcd944` — approved moves and reference fixes
- Commit 2: pending
- Draft PR: pending
- GitHub state: PR #1 and PR #2 verified merged
- Receipt: pending

## Remaining work

Complete health checks and tests, create the Draft PR, reconcile this note, and issue the final receipt.
