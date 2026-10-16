---
id: VAULT-RULES
type: governance
level: 2
status: PROPOSED
version: 3
updated: 2026-10-16
up: Governance-Hub.md
related:
  - UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md
  - PROJECT_WORKFLOW_ADAPTER.md
---

# GisSino_FN — Vault Rules (Agent Briefing) — v3

> **Target location in the repository:** `docs/governance/VAULT_RULES.md`
> **Companions:** `UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md` (the process: tasks, branches, PRs, evidence) and `PROJECT_WORKFLOW_ADAPTER.md` (this project's values).
> **This file answers:** how the documentation vault is organized (center → table of contents → pages → page details), what to update after every task, when to create a new note vs update an existing one, and how notes link to each other.
> Read it at the start of every task, after the workflow and adapter. Status tags `[DECIDED]` / `[PROPOSED]` / `[OPEN]` have the same meaning as in `PROJECT_GUIDE.md`.
> v2: the vault is organized around the **app's pages** (what the user sees), with an explicit 4-level hierarchy; the center note carries the project identity and history.
> v3: aligned with the real repository (the owner already opened `docs/obsidian/` in Obsidian and created `00-Home.md` and `90-Templates/`). The work-log folder is renamed `worklog/` (a folder called `obsidian/` inside an Obsidian vault is confusing); templates move to `templates/` and are excluded from the graph; design **review reports** get their own subfolder `design/reviews/`; the one-time migration is listed in §12.

---

## 1. What the vault is (and is not)

- The vault is **a folder of plain Markdown files inside the Git repository**. Obsidian is an optional viewer/editor for that folder. Agents never need Obsidian: read and write the `.md` files directly.
- The Obsidian **graph view** is a picture for the human owner (note = dot, link = line). It is **not** the mechanism agents use.
- What makes the vault useful to agents: one **entry point**, a small fixed set of **hub notes** (a table of contents), **consistent frontmatter**, **links that resolve**, **one note per topic**, and notes that are **kept current**. Notes created only to make the graph look bigger are forbidden.
- A stale note is worse than no note. Updating notes after every task is **not optional** (see §8).

---

## 2. The four levels

```text
LEVEL 0  CENTER        START_HERE.md
                       Project identity: name and its meaning, goal, history, what the system is.
                       Current focus. Links to every Level-1 hub.
            │
LEVEL 1  TABLE OF      <Area>-Hub.md   (one per top-level folder)
         CONTENTS      Lists every note in that area with status and a one-line summary.
            │
LEVEL 2  TOPIC NOTES   One note per main topic: each APP PAGE (Home, Wallet, Activity, Add,
                       Bills, Party, Settings, Auth), each ARCHITECTURE AREA, each DESIGN AREA,
                       the Project Guide, the Decision log.
            │
LEVEL 3  DETAIL NOTES  Sub-topics of ONE Level-2 note: a section of a page, a component, a
                       state, a rule, a data contract. Created only when needed (see §5).
```

Plus a parallel **work log** (tasks → sessions → handovers → receipts) that links *into* Levels 2–3 for everything a task touched.

### 2.1 Folder layout (vault root = `docs/`) [PROPOSED]

Vault root is `docs/` because design notes already live in `docs/design/` and existing task notes link to them with `../../design/...`; those links only resolve if the vault root is `docs/` or higher.

```text
docs/                                    <- open THIS folder as the Obsidian vault
├── START_HERE.md                        L0  CENTER
├── 00-Home.md                           one-line pointer to START_HERE.md (owner's Obsidian home note; kept, not deleted)
│
├── project/                             L1 hub: Project-Hub.md
│   ├── PROJECT_GUIDE.md                 L2  what / why / principles / scope     (from GisSino_01)
│   ├── PROJECT_HISTORY.md               L2  dated timeline of how the project evolved (append-only entries)
│   ├── DECISIONS.md                     L2  decision log (see §7)
│   ├── OPEN_QUESTIONS.md                L2
│   └── GLOSSARY.md                      L2
│
├── pages/                               L1 hub: Pages-Hub.md   <- the app, page by page
│   ├── Pages-Hub.md
│   ├── auth/      Page-Auth.md          L2   (+ L3: auth-login.md, auth-signup-invite.md, auth-setup.md ...)
│   ├── home/      Page-Home.md          L2   (+ L3: home-safe-to-spend.md, home-account-cards.md ...)
│   ├── wallet/    Page-Wallet.md        L2
│   ├── activity/  Page-Activity.md      L2
│   ├── add/       Page-Add.md           L2
│   ├── bills/     Page-Bills.md         L2
│   ├── party/     Page-Party.md         L2
│   └── settings/  Page-Settings.md      L2
│       (L3 file names are prefixed with the page name so every file name is unique)
│
├── architecture/                        L1 hub: Architecture-Hub.md   <- how it works inside
│   ├── SYSTEM_ARCHITECTURE.md           L2  overview and index of the areas   (from GisSino_02)
│   └── (later, split out as it grows) edge-cloudflare.md, hosting-docker.md, data-model-ledger.md,
│       engine-subscriptions.md, engine-reminders.md, engine-habits.md, engine-fx.md,
│       service-party.md, ai-assistant.md, security-privacy.md, backup-restore.md   (each L2)
│
├── design/                              L1 hub: Design-Hub.md   <- UI design: how the app LOOKS
│   ├── Design-Hub.md
│   ├── UI_DESIGN_SPEC.md, DESIGN_TOKENS.md, SCREEN_MAP.md, COMPONENT_INVENTORY.md,
│   │   UI_DATA_CONTRACTS.md                                    L2  living specs (update in place)
│   └── reviews/                                                  evidence reports, one per design task
│       BLUE_ENAMEL_REVIEW.md, FLOATING_NAVIGATION_REVIEW.md,
│       DESKTOP_SIDEBAR_REVIEW.md, VERIFICATION.md                (linked from their task notes)
│
├── governance/                          L1 hub: Governance-Hub.md
│   ├── UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md
│   ├── PROJECT_WORKFLOW_ADAPTER.md
│   └── VAULT_RULES.md                   <- this file
│
├── worklog/                             WORK LOG: what was done, task by task (was docs/obsidian/)
│   ├── 00-Index/Task-Dashboard.md       L1 hub for the work log
│   ├── 10-Tasks/        TASK-<id>.md
│   ├── 20-Sessions/     TASK-<id>-S<n>.md
│   ├── 40-Handovers/    <date>-<from>-to-<to>.md
│   └── 90-Receipts/     <timestamp>-TASK-<id>-FINAL.md   (immutable)
│
└── templates/                           note templates with placeholders (was docs/obsidian/90-Templates/)
                                         EXCLUDED from hubs, orphan checks and the graph
```

Repository root, for orientation (outside the vault, unchanged): `README.md`, `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, `CLAUDE.md`, `src/`, `tests/`, `scripts/`, `assets/`, `docs/`. Code lives outside `docs/`; all notes live inside `docs/`.

Notes:

- The workflow's `30-Architecture/` is implemented as `docs/architecture/`. Do not create a second architecture folder inside `worklog/`.
- **Page notes (`pages/`) describe what the user sees**; **architecture notes describe how it works inside.** They link to each other: a page note lists the engines/data it uses; an engine note lists the pages that show it.
- Hub files have unique names (`Pages-Hub.md`, not `index.md`).
- **New top-level folder, new hub, renaming or deleting a note → ask the owner.** Adding notes inside an existing folder is allowed.
- Do **not** move or delete existing files to reach this layout without explicit owner confirmation. Adding files, frontmatter and links to existing files is allowed in a docs task.
- **`.obsidian/` must never be committed.** It is Obsidian's machine-specific settings folder (created automatically when a folder is opened as a vault). As of 2026-10-16 it is **not** in `.gitignore` — add `.obsidian/` (matches at any depth). Never move, edit or stage it.
- **Vault root is `docs/`.** The owner opens `docs/` (not `docs/worklog/`) in Obsidian. A vault can only link to files inside itself. Files outside `docs/` (`README.md`, `PRODUCT.md`, `DESIGN.md`, `src/`) are referenced with normal relative links: they work on GitHub but do not become graph edges. The root files stay where they are because tools and the README expect them there; do not duplicate their content into notes.
- **Design vs architecture:** both are *categories inside the same vault*, not separate vaults. `design/` = how the app looks (UI spec, tokens, components, screen map, review evidence); `architecture/` = how it works inside (server, data, engines, security). Page notes link to both.
- **Living specs vs review reports:** files in `design/` that describe the current design are living notes (update in place). Files in `design/reviews/` are per-task evidence (screenshots, checks, critique): write them during the task, afterwards correct only with a dated addendum, and always link them from the task note.
- **`00-Home.md`** is the owner's own Obsidian home note. There must be exactly one center: keep `START_HERE.md` as the center and reduce `00-Home.md` to a one-line pointer to it (merge any useful content into `START_HERE.md` first). Do not delete it.
- **`templates/`** holds templates with placeholders such as `{{title}}`. They would show up as orphans and broken links, so exclude them from hub lists and health checks; in Obsidian use the graph filter `-path:templates`.

### 2.2 What the graph looks like

```text
                              START_HERE  (L0)
     ┌─────────┬──────────┬─────────┴───┬───────────┬───────────────┬──────────────┐
  Project-Hub Pages-Hub Architecture-Hub Design-Hub Governance-Hub Task-Dashboard   (L1)
     │          │            │             │                           │
  Guide...   Page-Home    SYSTEM_ARCH   TOKENS...                    TASK -> SESSION -> RECEIPT
             Page-Wallet  engine-*...                                    │ (touches)
             Page-Bills ──uses──► engine-subscriptions ◄── task links ───┘
                │
          home-safe-to-spend (L3)
```

Every note is reachable from `START_HERE.md` in **at most 3 clicks**. Lateral links (page ↔ engine ↔ design ↔ task ↔ decision) create the web the owner sees in the graph.

---

## 3. Two families of notes

| Family | What it describes | Behavior | Examples |
|---|---|---|---|
| **Living notes** (Levels 0–3) | A *thing* that persists: a page, an engine, a design area, a decision topic | **Update in place.** "Current state" at the top, dated "Change log" at the bottom. | `Page-Bills.md`, `engine-subscriptions.md`, `DESIGN_TOKENS.md` |
| **Log notes** (work log) | An *event* that happened once: a task, a session, a handover, a closeout | **Create a new file per event.** Tasks/sessions are editable until closed; receipts are immutable. | `TASK-…`, `TASK-…-S2`, handovers, receipts |

Rule of thumb: **nouns are living notes; past-tense events are log notes.**
`PROJECT_HISTORY.md` is a living note whose body is an **append-only timeline** (add entries; never rewrite old ones).

---

## 4. Frontmatter schema

Every note starts with YAML frontmatter. Keep it small.

```yaml
---
id: <stable-unique-id>            # e.g. PAGE-bills, ARCH-engine-subscriptions, TASK-GS-UI-002, DEC-014
type: center | hub | guide | page | page-detail | architecture | design | decision-log | history | task | session | handover | receipt | governance
level: 0 | 1 | 2 | 3 | log        # position in the hierarchy (§2)
status: <value allowed for the type>
updated: 2026-10-16               # date of last meaningful change
up: <relative link to parent note>   # REQUIRED for every note except START_HERE
related:                          # lateral links, 1-8 entries, relative paths
  - ../architecture/engine-subscriptions.md
---
```

Allowed `status` values:

- `page` / `page-detail`: `IDEA` · `DESIGNED` · `PROTOTYPE (mock data)` · `IN BUILD` · `LIVE` · `DEPRECATED`
- `architecture` / `design` / `guide` / `history`: `DRAFT` · `CURRENT` · `SUPERSEDED`
- `task` / `session`: the canonical states in workflow §5.1
- decision entries: `DECIDED` · `PROPOSED` · `OPEN` · `SUPERSEDED`

Optional fields: `tasks:` (task ids that touched this note), `supersedes:` / `superseded_by:`, `source_sha:` (commit the statement was verified against).

---

## 5. Decision procedure: new note or update? And at which level?

Run this **before creating any note.** Write the outcome in the session note under "Vault actions".

1. **Is it an event** (task, session, handover, closeout)? → Create a new **log note** from the workflow templates. Stop.
2. **Search first.** List the folder; grep titles, `id`s and headings for the topic's key words in English and Thai. Check `GLOSSARY.md` aliases.
3. **Does a living note already cover it, even partly?** → **Update that note** (Current state + dated Change log line linking to the task). Stop.
4. **Is it a small piece of a bigger topic?** → Add a section to that **Level-2** note. Stop.
5. **Level-3 test (create a detail note)** — create a Level-3 note under an existing Level-2 note only if **at least one** is true:
   - the parent note would exceed ~300 lines;
   - the sub-topic has its own states, rules or decisions that change independently (e.g. `home-safe-to-spend`: formula, edge cases, tests);
   - two or more other notes need to link to that sub-topic specifically.
   Set `up:` to the Level-2 note, add it to that note's "Details" list, and link it from the hub.
6. **Level-2 test (create a main topic note)** — create a new Level-2 note only if **all** are true:
   - it is a distinct, nameable main topic (an app page, an architecture area, a design area);
   - it is **inside the approved scope** (a page that is not in `SCREEN_MAP.md` / the Project Guide scope needs owner approval first);
   - it will be referenced from two or more other notes or outlive the current task;
   - it does not fit as a Level-3 note of an existing Level-2 note.
7. **On creating any note, in the same commit:** frontmatter with `up` + at least one `related`; add it to its hub (Level 1) or parent note's list; add a link to it from at least one related note; record it in the session note.
8. **When unsure, update rather than create**, and write the doubt under "Open decisions" in the task note instead of silently creating a duplicate.
9. **Never create** a note for: a single chat message, an idea outside approved scope, one-off command output, a duplicate under another name, or just to add a dot to the graph.
10. **New Level-1 hub / new top-level folder / rename / delete** → stop and ask the owner.

### 5.1 Splitting and merging

- Split a living note when it exceeds ~300 lines or covers two independently changing topics. Keep the original path as a short index linking to the new parts (old links keep working). Do not delete the original.
- If two notes overlap, do not delete either: mark the weaker one `SUPERSEDED` with `superseded_by`, move its useful content, and ask the owner before removing anything.

---

## 6. Link rules

1. **Link syntax:** standard relative Markdown links, e.g. `[Bills](../pages/bills/Page-Bills.md)` [PROPOSED]. They render on GitHub, work in every agent, and Obsidian reads them. Do not mix `[[wikilinks]]` into new notes (existing wikilinks may be converted in a docs task). In Obsidian: Settings → Files & links → turn **off** "Use [[Wikilinks]]" and set "New link format" to **Relative path to file**. The owner should confirm in the graph view that these links appear as lines.
2. **Every note has `up`** (its parent) and **1–8 `related`** links. Zero orphans.
3. **Link both ways where it matters:** if a page note says it uses an engine, the engine note lists that page.
4. **Standard cross-links:**
   - task → every page/architecture/design note it changed (section "Touches");
   - page → engines it uses, design notes for its screens, decisions that shaped it, tasks that built it;
   - engine/architecture note → pages that show it;
   - decision → notes it affects;
   - session → its task; receipt → its task and final PR.
5. **Link to code with relative repo paths** (e.g. `../../src/navigation.js`) so reviewers can jump from a note to the source. Do not paste large code into notes.
6. **Links must resolve.** Check every new relative link points to an existing file before committing.
7. **Never rewrite history silently.** To supersede a statement: add the new one, mark the old one `SUPERSEDED` with date and reason, keep both.

---

## 7. Decision log and history

- `project/DECISIONS.md`: one entry per decision — `id`, date, statement, status, decided by (owner / agent-proposed), source (task, PR, chat), `supersedes`. Seed it from the Decision table in the Project Guide.
- When the owner's design iteration changes something (for example, the mobile navigation moving from the guide's five-slot proposal to Home / Wallet / Activity / More + a separate Add circle; or a collapsible desktop sidebar being added), record it as a new decision that supersedes the older one, then update the affected living notes (`Page-*`, `SYSTEM_ARCHITECTURE.md` §8, `design/SCREEN_MAP.md`).
- If a prototype contradicts a `[DECIDED]` item, do not silently pick a side; report the conflict to the owner.
- `project/PROJECT_HISTORY.md`: dated, append-only timeline of milestones (name chosen, hosting decision, scope cuts, prototype baseline, merged PRs, etc.), each entry linking to the decision or task. Add an entry whenever a task closes or a decision is made.

---

## 8. After EVERY task: documentation update (mandatory)

An agent may not report a task complete until these are done **in the same task branch / same PR** (workflow §9–11):

| Always | If something changed |
|---|---|
| Task note: status, branch, PR, evidence | Page note(s) (L2/L3): "Current state" + change-log line |
| Session note (substantial tasks) | Architecture note(s): only if a design decision changed |
| `Task-Dashboard.md` row | `DECISIONS.md`: any new or changed decision |
| `up` / `related` links on every touched note | `OPEN_QUESTIONS.md`: opened/closed questions |
| `PROJECT_HISTORY.md`: one line if the task is closed or a milestone was reached | `START_HERE.md` "Current focus": only if the focus changed |
| **Fix stale statements** you notice in notes you touch | Receipt: once, at final closeout only |

**Stale-status rule:** a task note's `Status`, PR state and "Next action" must match the real state of GitHub when you finish. (Example found in this repo: a task note still says "Draft PR open … keep unmerged" after the PR was merged to `main`.) If you cannot verify the GitHub state, write `NOT VERIFIED` instead of leaving an old claim.

Every task prompt and every agent entry point must state this requirement (see `AGENTS.md`, workflow §15–16).

---

## 9. Style rules for agent-readable notes

- One topic per note. **Answer first**: "Current state" at the top, detail below, "Change log" at the bottom.
- Honest statuses: `PROTOTYPE (mock data)` is not `LIVE`; `CODE WRITTEN` is not `TESTED`. State what was actually run.
- Stable headings so other notes can link to them.
- Notes in English (identifiers and paths in code format); Thai UI strings may appear as quoted examples.
- Prefer **repo-relative paths**. Do not record personal absolute paths (for example `C:\Users\<name>\...`) in a repository that may be public. No secrets, tokens, real balances or personal data. Ever.
- ISO dates. Times in `Asia/Bangkok` unless stated.

---

## 10. Health checks

Before finishing any docs task, verify and report (never claim a check ran if it did not):

- [ ] every note has the required frontmatter (`id`, `type`, `level`, `status`, `updated`, `up` except START_HERE);
- [ ] every `up` / `related` target exists (ignore `templates/`, which holds placeholders);
- [ ] every note appears in its hub's (or parent's) list;
- [ ] every note is reachable from `START_HERE.md` within 3 clicks (no orphans);
- [ ] no duplicate `id`s; no two notes on the same topic;
- [ ] no secrets or personal paths;
- [ ] task note status matches real GitHub state.

An optional read-only script `scripts/check-vault.mjs` (Node, no dependencies, next to `scripts/check.mjs`) could automate these checks. It is **not yet written**; add it to `required_checks` only after the owner approves.

---

## 11. Templates

### 11.1 `START_HERE.md` (Level 0 — the center)

```markdown
---
id: START-HERE
type: center
level: 0
status: CURRENT
updated: <date>
---
# GisSino_FN — Start Here

## What this project is
- **Name:** GisSino (repo `GisSino_FN`). *Gis* from Aegis = shield/protection; *Sino* = Asia/opportunity;
  *FN* = Finance. Tagline: "Protecting Wealth in the Asian Era".
- **Goal:** a calm, daily-use personal-finance app for one person, family and friends: wallets,
  daily logging, monthly obligations with reminders, AI-assisted entry, and a family status/ranking "party".
- **The system in one paragraph:** installable web app (PWA), mobile-first; data on the owner's
  home server exposed only through Cloudflare Tunnel. See [Project Guide](project/PROJECT_GUIDE.md).
- **Where we are now:** <prototype with mock data / backend not started / ...> (link the latest task)
- **History:** [Project History](project/PROJECT_HISTORY.md) · [Decisions](project/DECISIONS.md)

## If you are an agent, read in this order
1. [Workflow](governance/UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md) -> [Adapter](governance/PROJECT_WORKFLOW_ADAPTER.md) -> [Vault Rules](governance/VAULT_RULES.md)
2. [Project Guide](project/PROJECT_GUIDE.md), [Decisions](project/DECISIONS.md)
3. [System Architecture](architecture/SYSTEM_ARCHITECTURE.md)
4. Your task note, then the page/architecture notes it touches

## Table of contents (Level 1)
[Project](project/Project-Hub.md) · [Pages](pages/Pages-Hub.md) · [Architecture](architecture/Architecture-Hub.md) · [Design](design/Design-Hub.md) · [Governance](governance/Governance-Hub.md) · [Task Dashboard](worklog/00-Index/Task-Dashboard.md)

## Current focus
<one or two lines; link to the active task>
```

### 11.2 Hub note (`<Area>-Hub.md`, Level 1)

```markdown
---
id: HUB-<area>
type: hub
level: 1
status: CURRENT
updated: <date>
up: ../START_HERE.md
related: []
---
# <Area> Hub
Purpose in one line.

| Note | Level | Status | One-line summary |
|---|---|---|---|
| [Bills](bills/Page-Bills.md) | 2 | PROTOTYPE (mock data) | Installments, cards, bills, subscriptions |
```

### 11.3 Page note (`pages/<page>/Page-<Name>.md`, Level 2)

```markdown
---
id: PAGE-<name>
type: page
level: 2
status: PROTOTYPE (mock data)
updated: <date>
up: ../Pages-Hub.md
related:
  - ../../architecture/engine-<x>.md
  - ../../design/SCREEN_MAP.md
tasks: [TASK-...]
---
# <Page name>

## Current state
What exists today, honestly (mock vs real; tested vs not). Source: [src/screens.js](../../../src/screens.js).

## Purpose and rules
What the page is for and what it must do (from the Project Guide) with [DECIDED]/[PROPOSED]/[OPEN] tags.

## Sections and details (Level 3)
- [Safe to spend](home-safe-to-spend.md) — formula and edge cases
- (only list detail notes that exist)

## Data and engines used
Links to architecture notes and data contracts.

## States and edge cases
Empty / loading / error / unavailable.

## Decisions and open questions
- ...

## Change log
- 2026-10-16 — <what changed> ([TASK-...](../../worklog/10-Tasks/TASK-....md))
```

### 11.4 Detail note (Level 3)

Same as 11.3 with `type: page-detail`, `level: 3`, `up: Page-<Name>.md`, a filename prefixed with the page name, and sections limited to what that sub-topic needs.

### 11.5 Decision entry (in `DECISIONS.md`)

```markdown
### D14 — Mobile navigation
- Date: 2026-10-16 · Status: DECIDED · Decided by: owner (via design iteration)
- Statement: Home / Wallet / Activity / More plus a separate Add circle; More contains Bills and Party.
- Supersedes: guide proposal "Home · Activity · +Add · Bills · Party".
- Source: [TASK-FLOATING-ISLAND-NAVIGATION](../worklog/10-Tasks/TASK-FLOATING-ISLAND-NAVIGATION.md)
- Affects: [SYSTEM_ARCHITECTURE §8](../architecture/SYSTEM_ARCHITECTURE.md), [Page-Home](../pages/home/Page-Home.md)
```

### 11.6 History entry (in `PROJECT_HISTORY.md`)

```markdown
- 2026-10-16 — Mock-data UI baseline merged to `main` (PR #1). Why: first reviewable UI. Links: [TASK-GS-UI-BASELINE-001](../worklog/10-Tasks/TASK-GS-UI-BASELINE-001.md)
```

Task, session, handover and receipt templates: use workflow §16.

---

## 12. One-time migration from the current repository layout (owner-approved moves only)

State on 2026-10-16: `docs/design/` (9 files, flat), `docs/obsidian/` (`10-Tasks/` tracked; `.obsidian/`, `90-Templates/`, `00-Home.md` local and untracked). The migration is one `DOCS_WRITE` task. Moves use `git mv` so history is kept. **Nothing is deleted.**

| # | From | To | Needs owner approval |
|---|---|---|---|
| M1 | `docs/obsidian/10-Tasks/` (and any other tracked work-log folder) | `docs/worklog/10-Tasks/` | yes (rename) |
| M2 | `docs/obsidian/90-Templates/` | `docs/templates/` | yes (rename) |
| M3 | `docs/design/BLUE_ENAMEL_REVIEW.md`, `FLOATING_NAVIGATION_REVIEW.md`, `DESKTOP_SIDEBAR_REVIEW.md`, `VERIFICATION.md` | `docs/design/reviews/` | yes (move) |
| M4 | `docs/obsidian/00-Home.md` | `docs/00-Home.md` (content reduced to a pointer to `START_HERE.md`) | yes (move) |
| M5 | `docs/obsidian/.obsidian/` | not moved, not committed; the owner re-opens `docs/` as a new vault (a new `docs/.obsidian/` is created automatically) | n/a |

Procedure and order:

1. **Owner closes Obsidian first** (Windows locks open files; a rename can fail or corrupt the vault). Agent must stop and ask if a rename fails with a permission error; never retry destructively.
2. Local untracked items (`00-Home.md`, `90-Templates/`): read them first; confirm no secrets or personal absolute paths; then move per M2/M4 (they are not in Git, so plain filesystem move is fine, but they become new tracked files in the commit).
3. After every move, fix every reference: `README.md`, `PRODUCT.md`, `DESIGN.md`, task notes, review notes, the adapter, scripts. Search for the old paths and report the count before and after (target: 0 stale references).
4. Commit 1 = moves and reference fixes only. Commit 2 = new notes (START_HERE, hubs, page notes, DECISIONS, PROJECT_HISTORY). Never mix the two, so the owner can review the moves separately.
5. Run the §10 health checks and the repo checks (`npm run check`, `npm test`). Report what ran.
6. Add `.obsidian/` to `.gitignore`.
