---
id: TASK-ELEUTHEX-STRUCTURE-PUBLICATION
type: task
level: log
status: LOCALLY VERIFIED
updated: 2026-11-01
up: ../00-Index/Task-Dashboard.md
related:
  - ../../architecture/ELEUTHEX_OPERATIONS_V1.md
  - ../20-Sessions/TASK-ELEUTHEX-STRUCTURE-PUBLICATION-S1.md
---

# Eleuthex structure documentation — public repository preparation

## Objective and approved scope

The owner explicitly selected the existing public kraveerachat/GisSino-Fn repository. The separate operations-repository proposal is superseded and was never implemented. No repository creation or Git initialization is needed.
Prepare a local documentation branch and privacy-reviewed staged set for final owner review. Do not commit, push, open a PR, merge, delete resources, modify application source/authentication or alter live Discord/Hermes/Docker/AEGIS.

## Branches and base

- PR 1 local branch: task/eleuthex-v1-structure.
- PR 2 reserved local branch: task/eleuthex-v1-implementation; no implementation files or commits added.
- Both local branches created from verified main d079561f8928df12261a9f39014016d2f969a7ab. Verify a fresh base again when the future source task actually begins.
- Intended Draft PR title: docs(ops): document Eleuthex Discord and Hermes structure v1.
- No PR URL, pushed SHA or publication is claimed.

## Exact documentation set

- [Operations record](../../architecture/ELEUTHEX_OPERATIONS_V1.md): curated public facts, responsibilities and boundaries.
- [Architecture hub](../../architecture/Architecture-Hub.md): one index row and metadata date.
- [Task dashboard](../00-Index/Task-Dashboard.md): one task row and metadata date.
- [Project history](../../project/PROJECT_HISTORY.md): one dated append-only milestone and metadata date.
- This task and [S1](../20-Sessions/TASK-ELEUTHEX-STRUCTURE-PUBLICATION-S1.md).

No Eleuthex AGENTS/governance file is copied over GisSino rules. The main architecture/guide/decisions and application code remain untouched. Full local candidate histories, raw evidence and private operations details remain outside this public set.

## Acceptance

- [x] Verify target origin, public visibility, main/base, clean initial worktree and no filename collision.
- [x] Curate public documentation; omit actual Discord identities/private topology and machine/runtime data.
- [x] Inspect complete candidate contents, privacy scan, relative links and vault consistency; repeat against the final staged blobs.
- [x] Required repository checks pass; historical runtime evidence stays separate.
- [ ] Owner approves exact manifest and final commit/push/Draft PR.
- [ ] Verify remote SHA/PR after separately authorized publication; owner merge only.

## Evidence levels / deferred work

V1 is applied/API verified but real-account acceptance remains incomplete. V2 is prepared/not applied. Hermes runtime history is not Discord E2E. Automated membership/approval is not implemented. Application invite-only/Discord-optional policy is preserved.
PR 2 code upload remains deferred until the owner-approved Discord checkpoint; future public code requires separate sanitization, layout/security review and publication approval.

## GitHub / Obsidian checkpoint

GITHUB_SYNC=LOCAL_EDIT_ONLY / PUBLICATION_PENDING. OBSIDIAN_SYNC=LOCAL_MARKDOWN_VERIFIED / REMOTE_PENDING; desktop rendering NOT TESTED.
Current branch HEAD remains the verified base; no docs commit exists. Final receipt is not eligible while review/publication gates remain pending.

## Local verification checkpoint

npm run check passed (734 keys per locale, syntax/assets/PWA shell check); npm test passed 190/190, zero failures. Public-content privacy scan has zero findings. Changed-file links pass and all three new notes are reachable within three clicks. Four inherited vault findings match base exactly; no new vault finding. Final staged set is limited to the six listed Markdown files; no source/runtime/governance change. Owner final commit/push/PR approval is still pending.
