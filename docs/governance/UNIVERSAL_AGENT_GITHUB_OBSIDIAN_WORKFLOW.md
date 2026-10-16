---
id: GOVERNANCE-UNIVERSAL-WORKFLOW
title: Universal AI Agent Development Workflow
type: governance
level: 2
status: DRAFT
version: 1.0.0
updated: 2026-10-16
up: Governance-Hub.md
related:
  - PROJECT_WORKFLOW_ADAPTER.md
  - VAULT_RULES.md
scope: project-agnostic
language: en
purpose: Reliable AI-assisted software delivery with GitHub, Obsidian, evidence, review, and chat continuity
---

# Universal AI Agent Development Workflow

> **One portable master playbook** for working across ChatGPT, Codex, Claude Code, Gemini, other agents, GitHub, and Obsidian. Adapt it to each repository using the Project Adapter in §2. This document contains **no application-specific architecture, database schema, infrastructure identity, or feature scope**.
>
> **Adoption status:** This file is a template, not proof that any repository, agent, or automation has installed/enforced it. The owner must approve its adoption and ensure agent entry points reference it.

## Contents

1. [Purpose and non-negotiable principles](#1-purpose-and-non-negotiable-principles)
2. [Project Adapter: configure once per repository](#2-project-adapter-configure-once-per-repository)
3. [Sources of truth and authority](#3-sources-of-truth-and-authority)
4. [Agent roles and orchestration](#4-agent-roles-and-orchestration)
5. [Lifecycle, task branches, sessions, and gates](#5-lifecycle-task-branches-sessions-and-gates)
6. [Mandatory start-of-task audit](#6-mandatory-start-of-task-audit)
7. [Hierarchical task mapping and approval](#7-hierarchical-task-mapping-and-approval)
8. [Implementation, testing, and independent review](#8-implementation-testing-and-independent-review)
9. [GitHub policy: commit, push, pull request, and merge](#9-github-policy-commit-push-pull-request-and-merge)
10. [Obsidian policy: files, note lifecycle, and verification](#10-obsidian-policy-files-note-lifecycle-and-verification)
11. [GitHub–Obsidian synchronization protocol](#11-githubobsidian-synchronization-protocol)
12. [Infrastructure and production safety gates](#12-infrastructure-and-production-safety-gates)
13. [Change scope, successor PRs, and incident handling](#13-change-scope-successor-prs-and-incident-handling)
14. [Chat continuity and agent handoffs](#14-chat-continuity-and-agent-handoffs)
15. [Ready-to-paste agent prompts](#15-ready-to-paste-agent-prompts)
16. [Reusable Markdown templates](#16-reusable-markdown-templates)
17. [Windows PowerShell and GitHub quick start](#17-windows-powershell-and-github-quick-start)
18. [Acceptance, final receipt, and closeout](#18-acceptance-final-receipt-and-closeout)
19. [Adoption checklist and exceptions](#19-adoption-checklist-and-exceptions)
20. [Integration traceability](#20-integration-traceability)

---

## 1. Purpose and non-negotiable principles

### 1.1 Intended outcome

Every significant task should be reconstructible without reading the entire chat history:

1. **What** was requested, and **why**?
2. What was **approved** and explicitly out of scope?
3. Which branch, PR, and commit SHA contain the work?
4. Which files or systems changed?
5. Which tests were **actually executed**, and what did they show?
6. What was saved in Obsidian, and which Git commit preserves it?
7. What remains unverified or unfinished?
8. What should the next agent do without guessing?

### 1.2 Default delivery model

```text
USER REQUEST
  -> READ CURRENT PROJECT TRUTH
  -> TASK MAP + SCOPE + SAFETY + ACCEPTANCE
  -> HUMAN APPROVAL WHERE REQUIRED
  -> ONE TASK BRANCH / ONE DRAFT PR (when GitHub is configured)
  -> ONE OR MORE SMALL IMPLEMENTATION + VERIFICATION CHECKPOINTS
  -> UPDATE CANONICAL OBSIDIAN NOTE WITH ACTUAL EVIDENCE
  -> COMMIT + PUSH SOURCE AND DOCUMENTATION CHECKPOINTS
  -> INDEPENDENT REVIEW / CORRECTIONS
  -> FINAL DOCUMENTATION RECONCILIATION
  -> ONE FINAL IMMUTABLE RECEIPT FOR THE TASK
  -> HUMAN REVIEW / HUMAN MERGE
  -> HANDOFF OR CLOSEOUT
```

**One task, one branch, one main PR, one final receipt** is the default for nontrivial work. A task may have many sub-sessions and checkpoints. Do not create a new PR or receipt for every checkpoint.

### 1.3 Fundamental safety and truth rules

- **Plan before changing files.** Inspect existing files and dependencies before creating replacements.
- **Never invent evidence.** `CODE WRITTEN` is not `TESTED`; `TESTED` is not `DEPLOYED`.
- **Commit and push at meaningful verified checkpoints**, including documentation-only checkpoints. Do not wait until the end of a large project. Do not commit after every keystroke.
- **Produce a Markdown Obsidian record after each meaningful session and state transition**, and reconcile it with the actual commit SHA and test evidence.
- **GitHub is a versioned collaboration record, not proof of production deployment and not a substitute for backups.**
- **No arbitrary file deletion, database deletion, destructive migration, history rewriting, or production mutation without explicit owner approval.**
- **Never commit or paste secrets**, credentials, authentication cookies, private keys, personal data, private financial records, or confidential logs into public/shared records.
- **Only claim external actions that happened.** If a chat agent cannot access local Git, GitHub, or Obsidian, it must prepare artifacts/instructions and mark those actions `NOT PERFORMED` or `PENDING USER ACTION`.
- **No automatic merge.** Merge is reserved for the human owner/reviewer unless a repository-specific policy explicitly authorizes otherwise.
- **Avoid unrelated work.** Discoveries that would enlarge scope go through the change-control process.

### 1.4 Working modes

| Mode | What the agent may do | Typical evidence |
|---|---|---|
| `PLAN_ONLY` | Read, analyze, produce a plan; no repository mutation | Task map, change list, risk list |
| `REPO_WRITE` | Create/edit approved files and run local tests | Diff, test logs, changed paths |
| `GIT_WRITE` | Commit/push within authorized task branch | Exact commit SHA, remote push result |
| `DOCS_WRITE` | Update approved Obsidian Markdown notes | Paths, note diff, checkpoint SHA |
| `PROD_READ_ONLY` | Measure existing runtime without changing it | Command and sanitized observation |
| `PROD_MUTATION` | Apply precisely approved production changes | Baseline, approval, outcome, rollback evidence |

Authorization for one mode **does not imply** authorization for another. An agent should state the active mode for each task.

---

## 2. Project Adapter: configure once per repository

This master file is intentionally generic. Each project should configure the following items in a small `docs/governance/PROJECT_WORKFLOW_ADAPTER.md` (or equivalent), rather than modifying this master to embed project-specific assumptions.

```yaml
project_name: "<PROJECT_NAME>"
repository_url: "<GITHUB_REPOSITORY_URL>"
default_branch: "<DEFAULT_BRANCH>"
repo_root: "<LOCAL_ABSOLUTE_PATH>"
platform_and_shell: "<OS_AND_SHELL>"
project_requirements:
  - "<SOURCE_OF_TRUTH_1>"
  - "<SOURCE_OF_TRUTH_2>"
repo_agent_instructions: "<AGENTS_MD_PATH_OR_NONE>"
workflow_master: "<PATH_TO_THIS_FILE>"

obsidian:
  mode: "in-repo"  # Default; alternative: separate-vault
  canonical_root: "docs/obsidian"
  external_vault_path: null   # Only for separate-vault mode
  external_vault_repository: null

github:
  branch_prefix: "task/"
  use_draft_pr: true
  auto_commit_at_verified_checkpoint: true
  auto_push_when_authorized: true
  automatic_merge: false

permissions:
  allow_repo_write: false
  allow_git_commit: false
  allow_git_push: false
  allow_docs_write: false
  allow_production_mutation: false

sensitive_systems_do_not_touch:
  - "<PROTECTED_SYSTEM_OR_PATH>"

required_checks:
  - "<LINT_OR_TYPECHECK_COMMAND>"
  - "<RELEVANT_TEST_COMMAND>"
  - "<BUILD_COMMAND_IF_APPLICABLE>"

owner_approval_required_for:
  - "destructive_changes"
  - "new_external_service_or_paid_dependency"
  - "production_changes"
  - "new_security_boundary"
  - "final_merge"
```

**Critical:** These are example placeholders. `false` permissions mean **not authorized** until explicitly granted. An existing repository's governance and user-approved task instructions take precedence over example configuration. Never infer authorization simply because a prompt mentions auto-push.

### 2.1 Recommended storage layout: one GitHub repository, one Obsidian-compatible note tree

This minimizes synchronization failures. Obsidian can open the approved note directory as a vault; all canonical notes live inside the repository and are committed through the same task branch.

```text
<project-repository>/
├── AGENTS.md                             # Agent entry point, if adopted
├── docs/
│   ├── governance/
│   │   ├── UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md
│   │   └── PROJECT_WORKFLOW_ADAPTER.md
│   └── obsidian/                         # Open this directory as an Obsidian vault
│       ├── START_HERE.md
│       ├── 00-Index/
│       │   └── Task-Dashboard.md
│       ├── 10-Tasks/
│       │   └── TASK-<id>.md
│       ├── 20-Sessions/
│       │   └── TASK-<id>-S<n>.md
│       ├── 30-Architecture/
│       ├── 40-Handovers/
│       └── 90-Receipts/
│           └── <timestamp>-TASK-<id>-FINAL.md
├── src/                                  # Illustrative only
└── tests/                                # Illustrative only
```

For a repository whose source layout differs, adapt paths; do not create folders merely to match the example. Obsidian settings in `.obsidian/` may contain machine- or workspace-specific state; decide explicitly which settings, if any, are committed, and ignore the rest.

### 2.2 Separate-vault option

Use only if the owner explicitly prefers an existing Obsidian vault outside the code repository.

- Treat the **code repository** and the **vault repository** as separate Git destinations.
- Record both repository URLs, local paths, branches, and committed SHAs in the adapter and task notes.
- Never assume that updating one repository updates the other.
- Perform a **two-repository reconciliation check** and report partial success distinctly.
- An agent must not write outside its authorized working tree simply because a path points to an external vault.
- If the vault is local but not Git-tracked, mark it `LOCAL ONLY`, not `SAVED TO GITHUB`.

### 2.3 No repository or vault yet?

Stop after a proposed directory/repository plan. Ask the owner to select a destination and grant access. Do not invent a GitHub URL, create a remote, install Obsidian, or overwrite an existing vault without approval.

---

## 3. Sources of truth and authority

Read in this sequence where each file exists:

1. Applicable system/operator constraints and explicit owner-approved task boundaries.
2. Repository policy / `AGENTS.md` and this workflow's adopted path.
3. Project-specific guide, architecture, decisions, and current scope.
4. Canonical Obsidian task note, session dashboard, and relevant architecture notes.
5. Active GitHub issue/PR, PR head SHA, reviews, and task branch state.
6. Recent accepted receipts and handoff packs.
7. **Actual current code, configuration, and measured runtime/test evidence.**

The current repository and verified runtime evidence establish **what exists**. Approved requirements and decisions establish **what must be built**. Historical receipts show **what was previously proved**, not necessarily what still holds.

If statements conflict, report the conflict and stop before changing the disputed area; never silently treat old notes as current runtime truth.

For decisions use these status labels when appropriate:

- `DECIDED`: explicit owner-approved decision; implement as directed.
- `PROPOSED`: recommendation awaiting confirmation; may guide a plan but is not approval for risky implementation.
- `OPEN`: unresolved; ask, or isolate behind a reversible interface.

Keep an `Open Decisions` section in the task note. Do not silently fill gaps from the agent's general knowledge.

---

## 4. Agent roles and orchestration

Roles are **capabilities**, not fixed brand obligations. Assign whichever connected, authorized agent can genuinely perform the task.

| Role | Typical tool | Responsibility | Must not claim/do |
|---|---|---|---|
| Planner / Architect | ChatGPT or equivalent | Scope, task map, design review, security gates, agent prompt | Claim source changes or tests without inspection |
| Coding Agent | Codex / Claude Code / equivalent | Implement, debug, write tests, local verification, authorized Git checkpoint | Silent scope expansion or production changes |
| Independent Reviewer | Separate agent or human | Read diff at exact SHA, verify logic/tests/security | Accept an agent's `PASS` summary as evidence |
| Documentation Agent | Gemini / another agent | Reconcile task/session Obsidian notes, PR descriptions, handoffs | Alter runtime source in docs-only mode |
| Human Owner | User/reviewer | Approve scope, credentials, high-risk actions, production, final merge | Delegate approvals implicitly through generic prompts |

### 4.1 Small-task pattern: one implementation agent

```text
Planner -> Coding Agent (code + tests)
        -> Evidence review
        -> Same agent reconciles Obsidian
        -> Commit/push checkpoint
        -> Human reviews when required
```

Use when the task is small, risk is low, and a second agent adds little value.

### 4.2 Higher-risk pattern: separated roles

```text
Planner / Security Reviewer
       -> Coding Agent A implements and tests
       -> commit + push implementation checkpoint
       -> Independent Reviewer checks exact SHA
       -> if defect: narrow correction to Coding Agent A
       -> Documentation Agent updates Obsidian + PR
       -> docs-only commit + push
       -> final review / human merge
```

Avoid two agents editing the same file concurrently on the same branch. If independent work must run in parallel, use explicitly separated worktrees/branches and merge through review.

### 4.3 Tool recommendation header for task handoff

```text
TOOL RECOMMENDATION
TASK=<task-id + short name>
ROLE=PLAN / IMPLEMENT / REVIEW / DOCS / PRODUCTION
AGENT=<selected tool>
WHY=<capability match>
REPO_WRITE=YES/NO
DOCS_WRITE=YES/NO
GIT_COMMIT=YES/NO
GIT_PUSH=YES/NO
PRODUCTION_MUTATION=YES/NO
MERGE=HUMAN ONLY
```

### 4.4 Chat agents with no direct file/GitHub/Obsidian access

An agent must distinguish `PREPARED FILE` from `SAVED FILE` and `SUGGESTED COMMIT` from `PUSHED COMMIT`.

When tooling is missing: (1) produce the Markdown file or exact patch, (2) state the intended local path and repository, (3) provide platform-specific steps to save/push, and (4) list each unperformed external action. Never fabricate commit SHAs, PR URLs, screenshots, or successful synchronization.

---

## 5. Lifecycle, task branches, sessions, and gates

### 5.1 Canonical task statuses

| State | Meaning |
|---|---|
| `NOT STARTED` | No implementation work begun |
| `PLANNED` | Goal/scope/acceptance drafted |
| `IN PROGRESS` | Active implementation or verification |
| `BLOCKED` | Cannot progress safely; blocker recorded |
| `SOURCE IMPLEMENTED` | Changes exist in source; tests not necessarily run |
| `LOCALLY VERIFIED` | Named local tests/checks executed and passed |
| `RUNTIME VERIFIED` | Observed in target runtime with evidence |
| `PRODUCTION DEPLOYED` | Approved production change actually deployed |
| `EXTERNALLY ACCEPTED` | Required external/human acceptance completed |
| `PASS` | All acceptance requirements for the stated gate are satisfied |
| `CLOSED` | Documentation, Git/PR, receipts, and handoff complete |

Not every task needs runtime, production, or external acceptance. Mark a non-applicable gate `N/A`, never invent a pass. `SOURCE IMPLEMENTED` does not imply `LOCALLY VERIFIED`.

### 5.2 Recommended branch/PR scope

- **One task = one named task branch = one main Draft PR** when working with GitHub.
- Multiple sessions/checkpoints may use that same branch and Draft PR.
- Create an issue and a task ID if the project uses issue tracking; otherwise a documented stable ID is enough.
- A substantial new topic should be split into a successor/sibling task and PR, not inserted into the existing scope automatically.
- A final immutable receipt is created **once per task at final closeout**, not once per session.

### 5.3 Workflow gates

```text
G0  SOURCE / REPO AUDIT
G1  TASK MAP + SCOPE + APPROVAL
G2  IMPLEMENTATION AND FOCUSED TESTS
G3  REGRESSION / SECURITY / BUILD VERIFICATION
G4  INDEPENDENT REVIEW (when required)
G5  OBSIDIAN AND GITHUB CHECKPOINT RECONCILIATION
G6  RUNTIME / PRODUCTION / EXTERNAL ACCEPTANCE (only when scoped)
G7  FINAL RECEIPT + HUMAN REVIEW / MERGE
```

Keep a task's gate summary in the canonical note. A completed coding checkpoint is **not** task closeout.

---

## 6. Mandatory start-of-task audit

Before editing anything:

1. Confirm the **actual working directory and OS/shell**.
2. Read repository policy, adopted workflow, project adapter, project guide/architecture.
3. Inspect tracked and untracked files; identify existing components/utilities.
4. Check current branch, HEAD SHA, base branch, and working-tree changes.
5. Check the configured remote and active PR state, if GitHub access exists.
6. Review the task's canonical Obsidian note, prior checkpoints, and latest receipt.
7. Determine whether requested operations affect data, secrets, infrastructure, networking, or production.
8. Identify unsupported assumptions, missing permissions, and conflicts.
9. Produce a Task Map and exact file-change plan before writing.
10. State `PRODUCTION_MUTATION_ALLOWED=NO` unless separately authorized with a specific production plan.

### Mandatory first report

```text
TASK_ID=
GOAL=
OS_SHELL=
WORKING_DIRECTORY=
REPOSITORY_URL=VERIFIED / UNKNOWN
CURRENT_BRANCH=
START_SHA=
BASE_BRANCH_SHA=
WORKTREE_STATE=
PR=EXISTING / NOT CREATED / INACCESSIBLE
SOURCE_OF_TRUTH_READ=
EXISTING_FILES_REUSED=
FILES_EXPECTED_TO_CREATE=
FILES_EXPECTED_TO_MODIFY=
FILES_OR_SYSTEMS_PROTECTED=
IN_SCOPE=
OUT_OF_SCOPE=
OPEN_DECISIONS=
RISKS=
ACCEPTANCE_CRITERIA=
TEST_PLAN=
OBSIDIAN_NOTE_PATH=
GIT_WRITE_ALLOWED=YES/NO
PRODUCTION_MUTATION_ALLOWED=YES/NO
NEXT_ACTION=AWAIT APPROVAL / BEGIN APPROVED SLICE
```

If this is a newly empty repository, missing branch/HEAD/PR information should be shown as `NOT INITIALIZED`, not invented.

---

## 7. Hierarchical task mapping and approval

Use a hierarchical task plan. Omit phases that genuinely do not apply; do not force every tiny UI tweak through production gates.

```markdown
# Task Map — <TASK-ID> <TASK-NAME>

## Major Topic 1 — Scope and Architecture
- [ ] 1.1 Identify requested outcome and rationale
- [ ] 1.2 Record in-scope and explicitly out-of-scope work
- [ ] 1.3 Identify dependencies and existing implementations
- [ ] 1.4 Identify security, data, and production boundaries
- [ ] 1.5 Define acceptance criteria and tests
- [ ] 1.6 Resolve OPEN decisions with the owner

## Major Topic 2 — Implementation
- [ ] 2.1 Approve exact file list
- [ ] 2.2 Write focused tests when behavior changes
- [ ] 2.3 Confirm relevant RED result where applicable
- [ ] 2.4 Implement the smallest correct slice
- [ ] 2.5 Confirm GREEN result

## Major Topic 3 — Verification
- [ ] 3.1 Focused tests and edge cases
- [ ] 3.2 Security negative controls (when material)
- [ ] 3.3 Related/full regression according to scope
- [ ] 3.4 Typecheck, lint, build (when relevant)
- [ ] 3.5 Diff, generated artifacts, and secret review

## Major Topic 4 — Durable Documentation
- [ ] 4.1 Update canonical Obsidian task status
- [ ] 4.2 Record session result and exact evidence
- [ ] 4.3 Record limitations and remaining work
- [ ] 4.4 Reconcile architecture notes only if behavior changed

## Major Topic 5 — GitHub Checkpoint
- [ ] 5.1 Verify branch and HEAD
- [ ] 5.2 Stage exact intended paths
- [ ] 5.3 Create coherent commit
- [ ] 5.4 Push authorized task branch
- [ ] 5.5 Create/update Draft PR and verification body
- [ ] 5.6 Record remote URL and SHA, or report BLOCKED

## Major Topic 6 — Optional Runtime / Production
- [ ] 6.1 Read-only baseline
- [ ] 6.2 Exact change and rollback plans
- [ ] 6.3 Explicit human approval
- [ ] 6.4 Controlled change and tests
- [ ] 6.5 After-state and cleanup/rollback proof

## Major Topic 7 — Closeout
- [ ] 7.1 Acceptance complete
- [ ] 7.2 Final Obsidian reconciliation
- [ ] 7.3 Exactly one immutable final receipt
- [ ] 7.4 Final GitHub checkpoint
- [ ] 7.5 Human review and merge
- [ ] 7.6 Final handoff / next action
```

### 7.1 Required task plan fields

`Goal`, `Why`, `In scope`, `Out of scope`, `Dependencies`, `Approved files`, `Do-not-touch systems`, `Acceptance criteria`, `Tests/evidence`, `Risk and rollback`, `Agent assignment`, `Production mutation yes/no`.

### 7.2 Approval threshold

- A normal repository slice may proceed only within the permissions the owner granted to that task/workflow.
- Any destructive action, new external integration/cost, sensitive data exposure, or production mutation requires **separate explicit approval** of its exact plan.
- If a user asks only for a plan or a prompt, no source modifications are authorized.
- If the task's factual prerequisite is unknown, ask one precise question or stop at a safe planning boundary.

---

## 8. Implementation, testing, and independent review

### 8.1 Implementation rules

- Keep changes minimal and reviewable; reuse existing code and design components.
- Use validation and authorization on the correct server/data boundary, not just in the UI.
- Keep migrations and schema changes reversible where feasible; never delete stored data casually.
- Prefer unit tests for pure functions; integration tests for DB/API boundaries; runtime tests for deployment-specific behavior.
- When modifying behavior/security, prefer **TDD**: failing regression test -> observed RED -> minimal implementation -> observed GREEN -> related/full regression.
- For a UI-only design slice, visual/manual checks and accessibility review may be more relevant than manufactured RED evidence; do not claim TDD if no RED run occurred.
- Capture exact commands, exit codes, test counts when available, and limitations.
- If tests were not run due to tooling, record `NOT RUN` and why.

### 8.2 Evidence record

```text
CHECKPOINT_ID=
BRANCH=
START_SHA=
END_SHA=
CHANGED_PATHS=
COMMANDS_RUN=
FOCUSED_TESTS=PASS/FAIL/NOT RUN; counts; evidence
REGRESSION_TESTS=PASS/FAIL/NOT RUN; counts; evidence
BUILD_LINT_TYPECHECK=
NEGATIVE_CONTROLS=PASS/FAIL/N/A; evidence
MANUAL_UI_RUNTIME_CHECKS=
KNOWN_PREEXISTING_FAILURES=
NEW_FAILURES=
SECRETS_SCAN=
DIFF_CHECK=
LIMITATIONS=
```

**Negative controls:** Test that prohibited access or invalid states fail as expected (e.g. cross-user access, invalid uploads, missing authorization, simulated dependency failures). For critical security controls, test that the check fails if the control is temporarily removed in an isolated test branch/environment, then restore it and verify no residue remains. Never commit the deliberately broken state.

### 8.3 Independent review contract

The reviewer must inspect the actual code at the reported commit SHA and assess:

1. Changed paths and scope compliance.
2. Requirements and real behavior, not labels/comments alone.
3. Test assertions: do they prove semantics or only inspect strings?
4. Authorization, security, privacy, and bypass/fail-open paths.
5. Error handling, idempotency, rollback, and data correctness where applicable.
6. Build/test results, including skipped and pre-existing failures.
7. Whether Obsidian and the PR reflect the actual evidence.

Classify each finding `BLOCKER`, `HIGH`, `MEDIUM`, `LOW`, or `NO ISSUE`. A blocker stops closing/deployment; issue a **narrow corrective task**, not a broad rewrite.

**Test PASS is not equivalent to Security Review PASS.**

---

## 9. GitHub policy: commit, push, pull request, and merge

### 9.1 Primary owner expectation: save completed work to GitHub

**Every completed, meaningful work slice that creates or modifies project files should end in an authorized Git checkpoint and GitHub push**—including code changes, approved UI design documents, configuration documents, and Obsidian session reports. Do not leave verified work only in an ephemeral chat or agent workspace.

However, do not represent a local write or `git commit` as a successful GitHub save. The remote push must actually succeed and be verified. If the agent has no GitHub connection or permission, produce the files and mark `GITHUB_SYNC=PENDING`, with exact steps for the owner.

No checkpoint is warranted for a conversation with no generated/changed project artifact.

### 9.2 Branch and PR conventions

- Use a dedicated task branch when the repo exists; confirm the default/base branch instead of assuming `main`.
- Avoid working directly on a protected default branch.
- Use one Draft PR for a task once a coherent pushed checkpoint exists and the repository permits PR creation.
- Update PR body when the reviewer-facing truth changes, not after every minor edit.
- Never force-push a shared branch, rewrite immutable receipts, or merge without permission.
- If the base branch advances, inspect conflicts and obtain owner approval for any risky integration/rebase; never unilaterally rewrite shared branch history.

### 9.3 Pre-commit safety review

```text
Confirm working directory and task branch
Confirm HEAD, base branch, remote
Review git status, tracked and untracked files
Review exact diff and generated artifacts
Review git diff --check
Scan for credentials and sensitive data using available approved tooling
Stage only approved paths (not blind 'git add .')
Create focused commit describing the coherent checkpoint
Push authorized task branch
Verify remote branch points to the expected commit
Update Draft PR and canonical Obsidian note
```

### 9.4 Recommended commit types

`feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `ci`, `security`. Example messages:

```text
feat(ui): introduce shared mobile shell
fix(auth): enforce resource ownership
test(db): prove cross-user access is denied
docs(workflow): record verified task checkpoint
```

Commit subject lines are examples, not required exact formats. Do not add unrelated files to make a commit appear complete.

### 9.5 GitHub synchronization status labels

- `LOCAL_EDIT_ONLY` — work exists only in a local workspace.
- `LOCAL_COMMITTED` — commit exists but is not confirmed on GitHub.
- `REMOTE_PUSHED` — push succeeded; branch and SHA confirmed.
- `DRAFT_PR_UPDATED` — PR exists and its body reflects verified work.
- `MERGED` — human approved/merged the PR; verify merge SHA where relevant.
- `BLOCKED_NO_ACCESS` — no repository connection/auth/permission.
- `BLOCKED_REMOTE_ERROR` — push or PR action failed; error recorded.

A final report must state the **actual** state and concrete remote URL/SHA if available. No fake PR number or status.

### 9.6 Never do these automatically

```text
git push --force
git reset --hard
git clean -fd
unreviewed git add .
automatic PR merge
force-delete remote/local branches
remove tracked files or database data without owner consent
commit real .env files or credentials
```

---

## 10. Obsidian policy: files, note lifecycle, and verification

### 10.1 Principle

Obsidian is the **human-readable record of current project truth**. GitHub preserves exact versions of the project and, in the recommended in-repo layout, the notes themselves. Notes should describe actual observed states, not predictions.

### 10.2 Minimum canonical Markdown files

| File type | When created/updated | Purpose |
|---|---|---|
| `START_HERE.md` | Once; when entry points change | Project navigation and governance pointers |
| `Task-Dashboard.md` | Each meaningful status transition | Task overview and next actions |
| `TASK-<id>.md` | At task planning; update throughout | Canonical goal, plan, state, acceptance, branch, PR, decisions |
| `TASK-<id>-S<n>.md` | Each meaningful implementation/review session | Exact performed work, tests, results, files, limitations |
| Architecture/decision note | Only when architecture/design actually changes | Accepted decisions and rationale |
| Handoff note | Before switching agents/chats | Continuity pack with verified IDs and next exact action |
| Immutable final receipt | Exactly once at final task closeout | Evidence-linked final accepted state |

Small tasks may record a session directly inside the canonical task note instead of creating an extra `S<n>` file. A separate session file is recommended for substantial tasks, security changes, database work, or infrastructure changes.

### 10.3 Start-of-session recording

Before meaningful implementation, create/update the note with:

- Task ID and title; current branch; starting SHA; PR link/state.
- Session ID, goal, rationale, scope/out-of-scope.
- Exact files/services expected to change.
- Safety boundaries, dependencies, approvals, evidence expected.
- `State: IN PROGRESS` only when work actually begins.

If a chat agent cannot write to the vault, provide the note content and mark `OBSIDIAN_SYNC=PENDING`.

### 10.4 End-of-session recording

After implementation and tests, record:

- Work performed and exact changed paths.
- Defects discovered and fixes applied.
- Commands/tests actually run and precise results.
- New and pre-existing failures separately.
- Commit SHA and GitHub push/PR state.
- Known limitations and deferred decisions.
- Next session/action and do-not-touch instructions.

A session may be `PASS` for its tests while still `IN PROGRESS` for documentation or GitHub synchronization. Do not mark `CLOSED` until its required records and Git checkpoint are complete.

### 10.5 Markdown and Obsidian conventions

- Use UTF-8 Markdown and stable relative links; standard Markdown remains portable outside Obsidian.
- YAML frontmatter may store stable `id`, `type`, `status`, `branch`, `pr`, and update time.
- Prefer linkable task identifiers over filenames based solely on display titles.
- Redact sensitive information and local secret paths; use SHA/hash or sanitized references only when necessary.
- Treat session notes as living records; the **final receipt is immutable** once closed.
- Do not silently rewrite or delete historical records; supersede with a new dated entry.
- Obsidian rendering is not proof of correctness; validate links/frontmatter where tooling exists and record whether that validation actually ran.

---

## 11. GitHub–Obsidian synchronization protocol

### 11.1 Canonical one-repository protocol (recommended)

1. Agent works on the authorized task branch.
2. Agent runs focused tests and captures evidence.
3. Agent updates `docs/obsidian/10-Tasks/TASK-<id>.md` and, if warranted, the session note and dashboard.
4. Agent reviews code and documentation diffs and checks for secrets.
5. Agent commits a **coherent checkpoint** containing both source and note changes, or commits source and then a linked docs-only checkpoint.
6. Agent pushes the task branch to GitHub.
7. Agent verifies GitHub branch SHA and updates the Draft PR description.
8. Agent records the verified source SHA, docs SHA, and PR URL in the task note. If this requires a second note commit, push it and verify the final remote SHA.
9. Agent reports `GITHUB_SYNC` and `OBSIDIAN_SYNC` separately.

**Avoid circular updating:** The task note may record the last verified source checkpoint SHA, and the final report may record the latest documentation SHA. Do not repeatedly commit only to insert a commit's own future SHA into itself.

### 11.2 Two-repository protocol (separate Obsidian vault)

1. Update source repository -> run checks -> commit/push -> verify source SHA.
2. Update external vault's task/session notes with source SHA and evidence.
3. Commit/push the vault's Git repository -> verify vault SHA.
4. Update the code PR with source and vault references where authorized.
5. Report `CODE_GITHUB_SYNC` and `VAULT_GITHUB_SYNC` separately.

If vault push succeeds but code push fails, **do not claim the task is synchronized**. Record `PARTIAL_SYNC` and exact recovery steps.

### 11.3 Failure handling

| Failure | Required response |
|---|---|
| No GitHub access | Save local files only where available; mark `BLOCKED_NO_ACCESS` |
| No Obsidian filesystem access | Produce ready-to-save `.md` content; mark `OBSIDIAN_SYNC=PENDING` |
| Push rejected / branch moved | Stop; fetch and inspect; do not force push |
| Obsidian note newer than source | Reconcile and explain status mismatch before closeout |
| Secrets detected | Stop; prevent push; follow security remediation with owner |
| GitHub PR API unavailable | Push only if authorized; provide manual PR instructions; mark PR pending |
| Tests fail | Record actual failure; do not mark related acceptance gate PASS |

---

## 12. Infrastructure and production safety gates

### 12.1 Production is opt-in and separately gated

Default for every task:

```text
PRODUCTION_MUTATION_ALLOWED=NO
```

For any real infrastructure/database/production change:

```text
F0 READ-ONLY PREFLIGHT + SANITIZED BASELINE
  -> F1 EXACT CHANGE PLAN + EXPECTED AFTER-STATE
  -> F1b EXACT ROLLBACK / ABORT CONDITIONS
  -> F2 HUMAN OWNER EXPLICIT APPROVAL OF THIS PLAN
  -> F3 CONTROLLED MUTATION
  -> F4 POST-CHANGE POSITIVE AND NEGATIVE TESTS
  -> F5 CLEANUP / ROLLBACK READINESS EVIDENCE
  -> F6 OBSIDIAN + GITHUB RECONCILIATION
```

No general workflow document itself grants authority to perform production changes.

### 12.2 Configuration change note

Record for each material change:

```text
SYSTEM=<sanitized identifier>
BASELINE=<actual measured state>
CHANGE=<exact intended change>
PURPOSE=<why>
OWNER_APPROVAL=<reference or PENDING>
COMMANDS_OR_MECHANISM=<exact approved instructions>
EXPECTED_RESULT=
OBSERVED_RESULT=
ROLLBACK_PLAN=
ROLLBACK_RESULT=EXECUTED / NOT EXECUTED / NOT APPLICABLE
TEST_EVIDENCE=
PROTECTED_SYSTEMS_UNCHANGED=<evidence or NOT VERIFIED>
```

Do not paste tokens, passwords, private keys, internal private records, or complete credentials into notes or PRs.

### 12.3 Database and destructive operations

- Examine data ownership, migrations, indexes, constraints, and backup/restore posture before mutation.
- Propose destructive DDL, data deletion, or volume removal separately; do not execute without approval.
- For sensitive schema changes, include forward migration, rollback/mitigation, and representative integration tests.
- Prefer isolated disposable test resources over production data.
- A green unit test does not prove a backup or restore process works.

---

## 13. Change scope, successor PRs, and incident handling

### 13.1 Scope split rule

When a discovered issue is an independent feature, major UX change, unrelated refactor, or a new security domain, do not silently append it to the existing task.

1. Record discovery in the main task note and PR.
2. Propose a new task/branch/PR with its own acceptance criteria.
3. Describe predecessor/successor dependency direction.
4. Keep the original main PR focused on approved scope.
5. Never claim work from an unverified successor PR as completed in the main PR.

### 13.2 Blockers, incidents, and urgent fixes

- Mark the current task `BLOCKED` when a prerequisite or safety gate fails.
- For a production incident, shift to an explicitly approved incident workflow with read-only assessment, containment plan, change approval, evidence, and handoff.
- Never hide failures for the sake of a green dashboard.
- Emergency pressure does not authorize destructive commands or unsanctioned network/security changes.

---

## 14. Chat continuity and agent handoffs

### 14.1 Triggers for a continuity pack

Prepare a handoff pack when:

- Starting a new chat or switching models/agents.
- Chat context has grown too large to reliably continue.
- A major topic completes and another begins.
- A PR is handed to a reviewer or docs agent.
- Important browser/manual evidence exists only in the conversation.
- Multiple related task branches/PRs could be confused.

### 14.2 New-chat startup protocol

The receiving agent must:

1. Read the handoff pack in full.
2. Read repository instructions, this workflow, and the project adapter.
3. Read the current task note and active PR body.
4. Inspect current source, branch, HEAD, remote, and relevant tests.
5. Compare the handoff to Git/PR and measured evidence.
6. Report disagreements before editing; do not blindly trust the pack as newer than the repository.
7. Produce `CURRENT TRUTH`, `DONE`, `OPEN`, `NEXT EXACT ACTION`, and `DO NOT DO`.

### 14.3 Handoff content requirements

```markdown
# CHAT CONTINUITY PACK — <PROJECT> / <TASK>

## A. Identity and Task
Project; task ID; owner; date; goal; scope and exclusions.

## B. GitHub Truth
Repository; task branch; HEAD; base branch/SHA; PR URL/state;
related predecessor/successor PRs.

## C. Current Status
Current gate; current session; completed sessions; outstanding work.

## D. Decision Record
Approved decisions; pending decisions; rejected alternatives; constraints.

## E. Verified Evidence
Tests with actual counts; build/lint results; screenshots/manual evidence;
runtime and production status; security negative tests.

## F. Failures / Limitations
Introduced, pre-existing, environmental, blocked, not-yet-tested.

## G. Critical Files and Notes
Source; tests; canonical Obsidian notes; latest final receipt if one exists.

## H. Sync Status
Local commit SHA; remote push; PR update; Obsidian write;
separate-vault Git sync (if any).

## I. Safety Boundaries
Explicit do-not-touch files, systems, data, secrets, production permissions.

## J. Remaining Work
Prioritized exact tasks; dependencies; acceptance still pending.

## K. Next Exact Action
Which agent should do what; working directory/shell; expected result;
abort condition; paste-ready next-agent prompt.
```

No invented identifiers, no secrets, and no purely chat-based assertions of unverified work.

---

## 15. Ready-to-paste agent prompts

> Copy the relevant block into an agent conversation. Replace `<...>` placeholders with verified project values. A prompt does not grant a tool connection or new security permission by itself.

### 15.1 Master bootstrap prompt — any new chat/agent

```text
You are joining an AI-assisted development workflow governed by
UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md.

Before doing any work:
1. Read repository AGENTS.md, the adopted master workflow, and
   docs/governance/PROJECT_WORKFLOW_ADAPTER.md (or actual equivalents).
2. Read project-specific requirements and architecture in the adapter's order.
3. Read current canonical Obsidian task note, handoff, current PR and latest evidence.
4. Verify actual repository directory, Git branch, HEAD, base branch, remote, and worktree.
5. State any conflict between notes, PR, code, and the current request.

For every meaningful task:
- Create a hierarchical Task Map, in/out scope, exact expected files,
  dependencies, safety boundary, required checks and acceptance criteria.
- State permissions: REPO_WRITE, DOCS_WRITE, GIT_COMMIT, GIT_PUSH,
  PRODUCTION_MUTATION.
- Use one task branch and a Draft PR where authorized and configured.
- Implement only the approved smallest slice; use appropriate real tests.
- Update canonical Obsidian Markdown with actual work and verification evidence.
- At each coherent verified checkpoint, commit and push the approved source/docs
  changes to the configured GitHub repository when authorized.
- Verify remote branch SHA and report actual PR state.
- If a tool/connection/permission is absent, produce ready-to-save files and
  mark GitHub/Obsidian steps PENDING; never claim upload or push succeeded.
- Never delete data, force push, merge, or mutate production without approval.
- Before a chat handoff, produce a Chat Continuity Pack.

First response: current truth, Task Map, exact file plan, risk/permission gates,
required tests, and next action. Do not start coding until scope is approved.
```

### 15.2 Planner prompt — ChatGPT or equivalent

```text
Act as the project planner, architect, and evidence gatekeeper.
TASK: <TASK_DESCRIPTION>
MODE: PLAN_ONLY

Read adopted governance, project-specific source of truth, current Git/PR
state, Obsidian task status, and relevant source.

Produce:
1. Current truth and unresolved conflicts
2. Hierarchical Task Map and recommended small slices
3. In scope / out of scope / dependencies
4. Agent assignment and exact permissions
5. Exact files expected to change and existing files to reuse
6. Safety boundaries and test/acceptance criteria
7. Obsidian note to create/update at task start and after completion
8. GitHub branch/PR/checkpoint plan
9. Paste-ready implementation prompt for the selected coding agent

Do not write or modify code. Do not claim tests or GitHub actions occurred.
```

### 15.3 Coding prompt — Codex, Claude Code, or equivalent

```text
You are the coding agent for <TASK-ID>.
Approved scope: <APPROVED_SCOPE>
Expected branch: <BRANCH>
Expected starting SHA: <SHA_OR_NOT_INITIALIZED>
Working directory / OS / shell: <VERIFIED_DETAILS>
Permissions: REPO_WRITE=<YES/NO> DOCS_WRITE=<YES/NO>
GIT_COMMIT=<YES/NO> GIT_PUSH=<YES/NO> PRODUCTION_MUTATION=NO

BEFORE EDIT:
- Read governance, project adapter, project requirements, active task note,
  current PR/branch state, existing code and utilities.
- Verify branch/HEAD/base/worktree; stop on unexpected state.
- Output the Task Map, exact planned files, acceptance criteria and tests.
- Do not delete or replace unrelated work.

IMPLEMENT:
- Change only approved files and the smallest required slice.
- For behavior/security changes, use actual TDD RED/GREEN when applicable.
- Run focused and relevant regression, lint/typecheck/build checks.
- Preserve precise evidence and do not hide skipped or failing tests.
- Do not claim live behavior for UI-only previews.

CHECKPOINT:
- Update the authorized Obsidian task/session .md with actual work/tests.
- Review exact diff and secrets; stage only intended paths.
- Commit and push this task branch if authorized; verify remote SHA.
- Create/update Draft PR only if configured/authorized.
- If a step is unavailable, mark it PENDING and provide exact manual steps.

FINAL REPORT:
TASK_ID, SESSION, BRANCH, START_SHA, END_SHA, CHANGED_FILES,
TEST_COMMANDS/RESULTS, KNOWN_FAILURES, SECURITY_CHECKS, OBSIDIAN_FILES,
DOCS_SYNC, COMMIT_SHA, GITHUB_PUSH, PR_URL/STATE,
PRODUCTION_MUTATION=NO, LIMITATIONS, NEXT_ACTION.

STOP. Never merge or force push.
```

### 15.4 Independent reviewer prompt

```text
Review TASK <TASK-ID> at exact commit <SHA> and PR <URL_OR_NONE>.
Read the approved scope, project requirements, current source and tests.
Independently inspect changed paths and actual test evidence.
Check correctness, security boundaries, authorization, failure modes,
rollback/idempotency where relevant, and documentation accuracy.

Classify each finding: BLOCKER / HIGH / MEDIUM / LOW / NO ISSUE.
Give file/line evidence where available, reproduction or missing proof,
and a minimal correction plan. Do not confuse test PASS with deployment or
security acceptance. If an issue is blocking, do not recommend merge.
State exactly what was independently verified and what was not accessible.
```

### 15.5 Documentation / Obsidian reconciliation prompt

```text
You are the documentation reconciliation agent for TASK <TASK-ID>.
MODE: DOCS_WRITE only (plus explicitly authorized Git docs checkpoint).

Read the exact approved source SHA, test evidence, project adapter,
canonical Obsidian task note, current dashboard, and Draft PR body.

Update only necessary Markdown records:
- canonical task status
- meaningful session note
- dashboard/decision log if changed
- architecture note only if verified behavior changed
- handoff / remaining work
- final receipt only when full task closeout is approved and complete

Preserve historical truth. Never rewrite an old immutable receipt.
Do not change runtime source, tests, Docker, firewall, or production settings.

Verify docs diff and secrets. If authorized, commit/push documentation changes
on the task branch and verify remote SHA; otherwise mark pending.
Update PR body only when authorized.
Report exact paths, SHA, actual GitHub/Obsidian status, and limitations.
```

### 15.6 Production change planning prompt

```text
Prepare a read-only production change PLAN. DO NOT MUTATE.

Output:
1. Read-only measured baseline and protected systems
2. Proposed exact changes and files/services affected
3. Commands with OS/shell/working directory
4. Expected result and observable check after each step
5. Abort conditions and rollback plan
6. Backups/restore prerequisites and tested vs untested status
7. Positive and negative acceptance tests
8. Required owner approval point
9. Evidence to record in GitHub and Obsidian

Explicitly state PRODUCTION_MUTATION_ALLOWED=NO until the human owner
approves the exact plan in a separate step. Never expose secrets.
```

### 15.7 Request a handoff before starting another chat

```text
Create a complete CHAT CONTINUITY PACK for this ongoing project/task.
Use current verified repository/PR/Obsidian evidence where accessible;
otherwise label information CHAT-REPORTED / NOT VERIFIED.
Include Task Map, completed/remaining work, exact SHA/branch/PR, test evidence,
decisions, limitations, safety boundaries, sync status and next-agent prompt.
Do not invent evidence, merge, push, or modify production.
```

### 15.8 New-chat recovery prompt

```text
Continue task <TASK-ID> using the attached CHAT CONTINUITY PACK.
Read governance/project adapter, canonical task note and active PR.
Verify current Git branch/HEAD and actual code before any edit.
Report CURRENT TRUTH, CONFLICTS, DONE, BLOCKED, REMAINING, NEXT ACTION.
Do not treat the handoff as newer than the repository without verification.
```

---

## 16. Reusable Markdown templates

### 16.1 Task note: `docs/obsidian/10-Tasks/TASK-<id>.md`

```markdown
---
id: TASK-<id>
type: task
status: PLANNED
owner: <owner>
branch: <task-branch-or-pending>
pr: <url-or-pending>
---
# TASK-<id> — <title>

## Objective and rationale
...

## Source of truth and decisions
- Project requirements: ...
- DECIDED: ...
- PROPOSED: ...
- OPEN: ...

## Scope / exclusions / dependencies
- In: ...
- Out: ...
- Dependencies: ...

## Safety and permissions
- Do not touch: ...
- Repo write: NO/YES
- Docs write: NO/YES
- Git commit/push: NO/YES
- Production mutation: NO

## Acceptance criteria
- [ ] ...

## Major Topic Map
- [ ] 1. ...
  - [ ] 1.1 ...

## Session register
| Session | Goal | State | Evidence | Source SHA | Docs SHA |
|---|---|---|---|---|---|
| S1 | ... | PLANNED | — | — | — |

## Task status dashboard
| Gate | State | Evidence/limitation |
|---|---|---|
| Plan | ... | ... |
| Source | ... | ... |
| Tests | ... | ... |
| Obsidian sync | ... | ... |
| GitHub push / PR | ... | ... |
| Production | N/A or NOT RUN | ... |

## Decision log
...

## Known limitations and blockers
...

## Remaining work and next action
...
```

### 16.2 Session report: `docs/obsidian/20-Sessions/TASK-<id>-S<n>.md`

```markdown
---
type: session
task: TASK-<id>
session: S<n>
status: IN PROGRESS
---
# TASK-<id> / S<n> — <session name>

## Plan and intended files
- Goal: ...
- Branch/starting SHA: ...
- Expected paths: ...
- Safety boundaries: ...
- Expected acceptance/evidence: ...

## Work actually performed
...

## Changed files and configuration
...

## Problems and fixes
...

## Verification results
| Command / check | Result | Counts / exit code | Notes |
|---|---|---|---|
| ... | PASS/FAIL/NOT RUN | ... | ... |

## Evidence and status
- Source SHA: ...
- Docs SHA: ...
- GitHub push: REMOTE_PUSHED / PENDING / BLOCKED
- Draft PR: ...
- Obsidian local write: DONE / PENDING
- Production mutation: NO

## Known limitations / failures
...

## Exact remaining work
...

## Next agent and next action
...
```

### 16.3 Task dashboard: `docs/obsidian/00-Index/Task-Dashboard.md`

```markdown
# Task Dashboard

| Task | State | Branch / PR | Last verified source SHA | Next action |
|---|---|---|---|---|
| TASK-<id> | IN PROGRESS | ... | ... | ... |

## Current constraints
...

## Last reconciliation
- Date/time: ...
- Actual GitHub/Obsidian sync: ...
```

### 16.4 Final immutable receipt

**Create this once only after all applicable task acceptance and documentation gates are complete.** Never rewrite an older receipt; issue a newer superseding note if a later finding changes the conclusion.

```markdown
---
type: final-receipt
status: CLOSED
task: TASK-<id>
immutable: true
---
# Final Receipt — TASK-<id>

## Identity and scope
Task; owner; branch; PR; base SHA; final source SHA.

## Implementation
Exact changed paths and behavior.

## Verification
Exact tests with counts/exit codes; manual/runtime evidence;
negative controls; known pre-existing failures.

## Documentation and GitHub proof
Canonical note path; docs commit SHA; remote push and PR links;
human review/merge status (if completed).

## Safety and remaining operational work
Production touched YES/NO; protected systems; limitations;
anything externally pending that does not contradict the task's closeout criteria.

## Final state and acceptance authority
Who approved what; date; evidence references.
```

### 16.5 Draft PR body

```markdown
## Goal / scope
...

## Changes
...

## Verification
| Check | Result | Evidence |
|---|---|---|
| ... | ... | ... |

## Security / data / production status
...

## Obsidian notes
- Canonical task: ...
- Sessions: ...
- Latest checkpoint: ...

## Known limitations / deferred work
...

## Reviewer checklist
- [ ] Exact changed paths reviewed
- [ ] Relevant tests/evidence reviewed
- [ ] Sensitive data and production boundary checked
- [ ] Docs match tested truth
- [ ] Human approves merge
```

### 16.6 Minimal `AGENTS.md` entry-point excerpt

```markdown
## Mandatory project workflow

Before planning, editing, testing, committing, or preparing a PR:

1. Read `docs/governance/UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md`.
2. Read `docs/governance/PROJECT_WORKFLOW_ADAPTER.md`.
3. Read the project-specific source-of-truth documents listed in the adapter.
4. Inspect the current repository and canonical Obsidian task note.
5. Prepare a Task Map and obtain required approvals before editing.

At meaningful verified checkpoints, reconcile source, tests, Obsidian notes,
and the configured GitHub task branch. Never claim remote sync without proof.
Production mutation and destructive actions require separate owner approval.
```

---

## 17. Windows PowerShell and GitHub quick start

> These commands are **examples for Windows PowerShell**, executed from the **root of an already existing, explicitly selected project repository**. Replace placeholders. Do not execute if the intended directory, branch, and repository have not been verified. Equivalent shell-specific commands are needed on macOS/Linux.

### 17.1 Read-only preflight (safe to inspect)

```powershell
# OS: Windows | Shell: PowerShell | Working directory: <REPO_ROOT>
Get-Location
Get-ChildItem -Force

git status --short
git branch --show-current
git rev-parse HEAD
git remote -v

git diff --check
```

If Git is not initialized, the Git commands will fail: record `NOT INITIALIZED` and request instructions. Use GitHub CLI only if available, connected, and authorized. Do not assume a specific default branch or remote exists.

### 17.2 Before an approved task checkpoint

```powershell
# OS: Windows | Shell: PowerShell | Working directory: <REPO_ROOT>
# Inspect remote state; may contact GitHub but does not mutate it.
git fetch origin
git status --short
git diff --check

git diff --stat
git diff --name-only

# Optional, if GitHub CLI is installed and authenticated:
gh auth status
```

Review both tracked and untracked files before selecting staged paths. Git does not show untracked content in `git diff` by default.

### 17.3 Authorized Git checkpoint (write operation)

Only after owner/workflow approval, successful tests, and review of intended paths:

```powershell
# OS: Windows | Shell: PowerShell | Working directory: <REPO_ROOT>
# Replace example paths with the EXACT approved changed files.
git add -- "<APPROVED_SOURCE_PATH>" "<APPROVED_OBSIDIAN_NOTE_PATH>"
git diff --cached --check
git diff --cached --stat

git commit -m "docs(task): record verified checkpoint"
git push -u origin "<TASK_BRANCH>"

# Verify local HEAD. Verify remote branch/PR state separately.
git rev-parse HEAD
```

Do not run this template verbatim without substituting real paths and reviewing staged content. A successful `git push` establishes remote Git synchronization only if the destination is the intended GitHub repository/branch; check the configured remote and GitHub PR.

### 17.4 Draft PR creation (authorized only)

```powershell
# OS: Windows | Shell: PowerShell | Working directory: <REPO_ROOT>
# Requires authenticated GitHub CLI and a pushed task branch.
# Replace the base branch and task description with verified values.
gh pr create --draft --base "<DEFAULT_BRANCH>" --head "<TASK_BRANCH>" --title "<TASK_TITLE>" --body-file "<PR_BODY_FILE>"
```

GitHub calls can fail because of missing login, authorization, branch protection, or network access. On failure, record the exact blocker and provide manual follow-up, never an invented PR URL.

### 17.5 Opening Obsidian

For `in-repo` mode, open the configured `docs/obsidian/` directory as a local Obsidian vault. Obsidian reads the same `.md` files that Git tracks. **Saving locally in Obsidian does not push to GitHub**; a permitted commit and push are still required.

### 17.6 GitHub and Obsidian are separate evidence dimensions

```text
LOCAL_FILE_WRITTEN=YES/NO
OBSIDIAN_NOTE_PATH=<path or PENDING>
OBSIDIAN_CONTENT_RECONCILED=YES/NO/NOT VERIFIED
LOCAL_COMMIT_SHA=<sha or NONE>
REMOTE_GITHUB_PUSH=VERIFIED/PENDING/FAILED
REMOTE_BRANCH_SHA=<sha or UNKNOWN>
DRAFT_PR_URL=<url or PENDING>
PRODUCTION_MUTATION=YES/NO
```

---

## 18. Acceptance, final receipt, and closeout

### 18.1 Sub-session is complete only if

- Approved work slice finished; specific checks ran and results are recorded.
- Changed files and pre-existing failures are understood.
- Canonical Obsidian task/session note is current or the inability to update is recorded as a blocker.
- A meaningful Git checkpoint exists when GitHub was required and authorized.
- No unreviewed destructive or production changes occurred.

### 18.2 Entire task is `CLOSED` only if

- All task-level acceptance criteria are proved or explicitly adjusted by the owner.
- Independent review is done when the risk requires it.
- All applicable runtime/external acceptance gates are satisfied, or clearly out of scope.
- Canonical task/dashboard/architecture notes reflect the final verified truth.
- Exactly one **final immutable receipt** exists and links to real evidence.
- Approved source and notes have been pushed to the configured GitHub destination, if remote synchronization is a required acceptance criterion.
- The human reviewer performs any required final merge.
- Final handoff names limitations, remaining operations, and next work.

### 18.3 Required terminal report

```text
TASK=
SESSION=
MODE=
BRANCH=
START_SHA=
END_SHA=
FILES_CREATED=
FILES_MODIFIED=
FILES_DELETED=NONE / APPROVED LIST
WORK_COMPLETED=
TESTS_ACTUALLY_RUN=
FOCUSED_TESTS=
REGRESSION_TESTS=
BUILD_LINT_TYPECHECK=
NEGATIVE_CONTROLS=
PREEXISTING_FAILURES=
NEW_FAILURES=
DIFF_AND_SECRET_REVIEW=
OBSIDIAN_NOTES_CREATED_OR_UPDATED=
OBSIDIAN_SYNC=VERIFIED / PENDING / BLOCKED
GIT_COMMIT_SHA=
GITHUB_SYNC=REMOTE_PUSHED / LOCAL_COMMITTED / PENDING / BLOCKED
GITHUB_REMOTE_BRANCH_SHA=
PR_URL_AND_STATE=
PRODUCTION_MUTATION_PERFORMED=YES/NO
KNOWN_LIMITATIONS=
REMAINING_WORK=
FINAL_RECEIPT=CREATED / NOT YET ELIGIBLE
NEXT_ACTION=
```

---

## 19. Adoption checklist and exceptions

### 19.1 Adoption steps

- [ ] Owner approves this master workflow for the chosen project.
- [ ] Store this file inside that project's repository (not just a chat attachment).
- [ ] Fill the Project Adapter with verified repository, branch, OS, paths, and permissions.
- [ ] Choose `in-repo` or `separate-vault` Obsidian mode.
- [ ] Add a pointer from `AGENTS.md` (or agent-specific project instruction file).
- [ ] Add a `START_HERE.md` pointer in the Obsidian note root.
- [ ] Establish the initial canonical task note and task dashboard.
- [ ] Verify GitHub authentication and remote permissions without exposing tokens.
- [ ] Define required project-specific tests and protected systems.
- [ ] Run one low-risk **trial task** end-to-end and verify the GitHub commit/PR and Obsidian note actually match.
- [ ] Only then label this workflow `ADOPTED` for that repository.

### 19.2 Task-specific exceptions

- **Research/planning only:** no source diff/commit is required unless a project document is actually generated or updated. If a `.md` artifact is created, save and push it when authorized.
- **UI mockup only:** no invented live data; report visual-only interactions. Use responsive/manual/browser evidence where possible.
- **Docs-only:** no behavior claims, no application source changes; record documentation checks and GitHub push.
- **No GitHub:** produce files and precise manual steps; show `GITHUB_SYNC=PENDING`.
- **No Obsidian:** still produce portable Markdown notes, then let the owner place/open them; show `OBSIDIAN_SYNC=PENDING`.
- **No Git repository:** propose setup; do not invent a branch or commit SHA.
- **No permission to modify production:** default remains `PRODUCTION_MUTATION_ALLOWED=NO` regardless of other permissions.

### 19.3 Adoption does not migrate old projects

Applying this template does not move or delete existing files, convert old receipts, change remote repositories, or start automated GitHub pushes. Existing historical records are preserved until the owner approves a separately reviewed migration.

---

## 20. Integration traceability

This consolidated document preserves the distinct, generally reusable responsibilities of two predecessor patterns while removing their project-bound paths, named features, PR numbers, infrastructure identities, and examples.

| Universal section | Retained concept |
|---|---|
| §3, §5, §6 | Repository truth, task/session governance, status and reading order |
| §4, §15 | Multi-agent roles, prompts and agent selection |
| §7, §8 | Hierarchical Task Map, TDD, regression, security review |
| §9, §11, §17 | Git checkpoints, Draft PR, safe push, source/docs reconciliation |
| §10, §16 | Canonical Obsidian notes, session registers, immutable receipt |
| §12, §13 | Production approval gates, rollback, split workstreams |
| §14, §15.7–15.8 | Chat Continuity Packs and new-chat bootstrap |
| §18–19 | Acceptance, honest reporting, adoption checklist |

**Universal governing principle:** The repository and its evidence must answer *what we are doing, what actually changed, what was verified, what remains unverified, and what the next human or agent must do*. GitHub carries the versioned record; Obsidian makes that record legible; agents operate only within explicit, reviewable authority.
