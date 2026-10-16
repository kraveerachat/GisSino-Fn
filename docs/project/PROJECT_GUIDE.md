---
id: PROJECT-GUIDE
type: guide
level: 2
status: CURRENT
updated: 2026-10-16
up: Project-Hub.md
related:
  - DECISIONS.md
  - OPEN_QUESTIONS.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
---

# GisSino_FN — 01 PROJECT GUIDE (Agent Briefing)

> **File 1 of 2.** This file explains WHAT the project is and WHY it is built this way: name, vision, users, principles, scope, rules.
> **File 2** (`GisSino_02_SYSTEM_ARCHITECTURE.md`) explains HOW it is built: server, Cloudflare, Docker, data model, engines, navigation map.
> Read this file first, then File 2. Do not start coding from File 2 alone.

---

## 0. How to use this file (instructions to the AI agent)

You are a senior full-stack engineer and technical reviewer helping the **owner** build GisSino_FN. The owner is a university student who writes in Thai, works step by step, and will hand you tasks one at a time. A separate AI assistant (Claude) did the research and planning that produced these two files; you execute and review.

Every statement below carries one of three status tags. Respect them:

| Tag | Meaning | What you do |
|---|---|---|
| **[DECIDED]** | The owner explicitly chose this. | Follow it. Do not re-debate. If you think it is wrong, say so once, briefly, then follow it. |
| **[PROPOSED]** | A recommended default that the owner has not explicitly confirmed. | Use it as the default, but state that you are doing so, and make it easy to change. |
| **[OPEN]** | Not decided. Depends on facts we do not have yet. | Do NOT assume. Ask the owner, or build behind an interface so either answer works. |

If a task conflicts with this file, stop and ask. If a task needs a fact that is not in these files (e.g. a library version, a Cloudflare limit, a bank's file format), say that it must be verified instead of guessing.

---

## 1. Mission

GisSino is a **personal finance web app for daily use by one person and their family and friends**. It answers four everyday questions with very little effort:

1. *How much money do I have, across all my banks, e-wallets, cash and cards?*
2. *What did I spend today, and where did it go?*
3. *What do I have to pay soon (installments, credit cards, bills, subscriptions), and how much of my money is already spoken for?*
4. *Am I keeping the habit?* (streaks, levels, and a friendly ranking inside a family "party")

It is a **hobby / personal-use product, not a commercial one** [DECIDED]. Opening it to more people later is a possible expansion, not a goal now.

**One-line positioning:** a calm, protective money companion for everyday Thai life — easy enough that non-technical family members will actually open it.

---

## 2. Identity and naming [DECIDED]

| Item | Value |
|---|---|
| Repository / project code name | `GisSino_FN` |
| User-facing product name | **GisSino** |
| Tagline | **"Protecting Wealth in the Asian Era"** |
| Core message | "Financial Security for Asian Growth" |

Name breakdown (the owner deliberately merged several meanings; do not "simplify" it into one):

- **Gis** — from **Aegis**: shield, protection. Meaning: safety, risk management, asset security. It also nods to the owner's capstone project, AEGIS.
- **Sino** — from Sina/Sino: Asia / Asian market / opportunity. Meaning: emerging Asian markets, growth. (It was also the stem of the earlier prototype name `Sina_FN`.)
- **_FN** — Finance. Marks this as a finance product.

Brand tone: calm, trustworthy, protective, never aggressive or shaming. Visual defaults [PROPOSED]: light theme with a dark mode, navy accent, Thai as the primary language. The earlier prototype's cyberpunk/neon look is **not** carried over unless the owner asks.

---

## 3. Users and context

| Persona | Facts | Design consequence |
|---|---|---|
| **Owner** (admin) | Student, technical, runs the server, will use every feature. | Gets an admin area and optional power channels (e.g. Telegram). |
| **Family** | Not technical. Mostly phones. No laptops to install VPN clients on. | Must be able to just open a URL. No VPN, no Telegram, no app store. Big touch targets, Thai wording, zero jargon. |
| **Friends** (later) | Occasional users, invited. | Same as family; invite-only signup. |

Other context:

- Language: **Thai primary** UI and copy; code, identifiers, comments and commit messages in English [DECIDED for UI language; PROPOSED for the rest].
- Currencies: **THB and USD only** [DECIDED]. Display/total currency is THB. USD exists mainly for foreign subscriptions (Netflix/Anthropic/OpenAI etc. may bill in USD) and any USD wallet.
- Region: Thailand. Default timezone `Asia/Bangkok` [PROPOSED as a fixed v1 timezone].
- Devices: Android phones, iPhones, desktop browsers. **Mobile-first**, then widen to desktop [DECIDED].

---

## 4. Product principles (use these to settle any design argument)

1. **Daily-use first.** A feature exists only if it will be used in real daily life. The owner rejected two earlier feature lists for being "too much". When in doubt, leave it out. [DECIDED]
2. **Solo-first.** Everything must be fully useful for a single person. The family "party" only *displays* things the solo system already produces. It never adds a feature that requires other people. [DECIDED]
3. **Low effort entry.** Logging a purchase should take seconds: type a Thai sentence (AI draft → confirm), or attach a slip now and fill details later.
4. **The ledger is the truth.** Balances are always *computed* from recorded entries, never typed in as a loose number. Moving money between your own wallets is a **transfer, not an expense**. Mismatches with the real bank are fixed by an explicit **adjustment** entry. (Details in File 2.)
5. **Honest UI.** Never show fake, mocked or placeholder data as if it were real. If something is unavailable, show "unavailable" and say why. (Lesson from AEGIS, where fabricated charts and fake "saved" toasts were found and removed.)
6. **Privacy by construction.** Each user's data is isolated and every query is owner-checked. The party never reads anyone's transactions — only a separate table of aggregate habit stats the user agreed to share.
7. **AI proposes, human confirms.** AI never writes to the ledger on its own. It produces a draft; the user edits/confirms. AI answers questions read-only through a fixed set of safe queries.
8. **Kind gamification.** Duolingo-style intensity for habits (streaks, freezes, XP, weekly rankings) but never shame, never ranking by money, always opt-out-able.
9. **Own your infrastructure, minimize exposure.** Data lives on the owner's mini-server; the public internet reaches it only through Cloudflare Tunnel (no open inbound ports). [DECIDED]
10. **Boring, small, verifiable.** Few containers, mainstream tools, tests against a real database. Prefer a feature that works over a feature that looks impressive.

---

## 5. Scope — the seven blocks (current version)

`MVP` = build first. `Later` = designed for but not built yet. `Cut` = removed on purpose.

### Block 1 — Wallets and Dashboard
- **MVP:** multiple accounts of four types: bank, e-wallet (e.g. TrueMoney), cash, credit card (a liability). Total across accounts. "Obligations due this month" card. **"Safe to spend" = money you have − obligations not yet paid.** Reconcile/adjust a balance to match the real bank app.
- Currency: accounts are THB or USD. Totals display in THB using the daily FX rate.

### Block 2 — Daily logging and transfers
- **MVP:** income and expense entries; categories; tags; search; **attach a slip image (stored only, no OCR/scanning)** [DECIDED: user does NOT want slip scanning]; status **"needs details"** (Thai: *รอเติมรายละเอียด*) so a slip can be attached now and described later.
- **Transfers between own accounts** (e.g. SCB → TrueMoney) are not expenses; optional fee field.
- Each entry may be in THB or USD; USD entries store the rate used.

### Block 3 — Obligations (installments, cards, bills, subscriptions) and reminders
- **MVP:** one page + calendar covering four kinds of recurring obligation:
  - **Installments** (Shopee etc.): monthly amount, total/paid count, remaining balance; marking a period paid advances the schedule; the plan closes itself when finished.
  - **Credit cards:** statement day, due day, full/minimum amounts; paying a card is a transfer to the card liability, not an expense.
  - **Monthly bills** (rent, utilities, phone): fixed or variable amount.
  - **Subscriptions — fully automatic** [DECIDED]: set once (price, THB or USD, monthly/yearly, billing day, funding account); the system posts the expense itself on the due date with **no confirmation step**. USD ones post an *estimated* THB value from the daily rate and can be corrected to the *actual charged* amount later.
- **Reminders in three stages:** 3 days before, on the due day, and overdue; each with a "mark as paid" action.
- **Notification channels, family-friendly** [DECIDED direction]: (1) in-app inbox and a "due today" strip — always works; (2) Web Push, one tap to allow (iPhone only after Add to Home Screen); (3) email digest. **Telegram is optional and for the owner only.** LINE is *not* planned because its terms and cost for this use are unverified. [OPEN: confirm email provider]

### Block 4 — AI chat
- **MVP:** carries over the old system's idea. User types a Thai sentence ("ข้าวมันไก่ 60 จ่ายด้วย SCB") → AI returns a **draft** → user confirms. Plus **read-only Q&A** ("what bills are due next month?") via fixed safe queries.
- [OPEN] LLM provider (the prototype had repeated Gemini quota/model problems; OpenRouter/Claude were fallbacks). Build behind a provider interface.

### Block 5 — Consistency and rewards (new single-player system that feeds the party)
- **MVP:** streak with freezes, level/XP, badges, and a set of habit stats (see §6).

### Block 6 — Family Party (status and ranking showcase)
- **MVP:** create a party, invite by link/QR, profile cards, **per-stat leaderboards**, weekly board, short activity feed ("Mom earned the 3-month on-time-bills badge").
- **Three visibility levels** per member [DECIDED]: **Private** (not shown, not ranked) / **Status only** (habit stats and badges, no money values) / **Full** (status plus money totals the user explicitly opts to show). Default for habit stats: Status only. See §6 for invariants.

### Block 7 — Foundation
- **MVP:** invite-only signup, email+password and **Passkey**, per-user data isolation, installable PWA with per-device install guide, light/dark mode, undo for destructive actions, automatic backups with a *tested* restore, owner admin panel.

### Cut for now (can return if real use proves a gap)
Receipt/slip OCR, voice entry, full envelope budgeting, investments/portfolio, debt snowball, tax planning, forecasting, public API, bank-data integrations (see §7), shared envelopes and who-owes-whom between members, native desktop `.exe`.

---

## 6. Consistency, rewards and the Party — design intent

### 6.1 Streak (Duolingo-style intensity) [DECIDED: intensity; numbers are PROPOSED and must live in config]
- A **day counts** when the user performs at least one qualifying action: log an entry (including "needs details"), tap **"No spending today"** check-in, mark an obligation paid, or complete a reconcile.
- **Day boundary** is midnight `Asia/Bangkok`.
- **Freeze (the "rest-day" button):** hold up to 2. A freeze is consumed **automatically** when a day is missed, so one forgotten day does not kill the streak. Earn 1 freeze at each 7-day milestone; optionally buy one with XP.
- **Streak-at-risk reminder:** one push/in-app nudge per day at a configurable time (default evening) if nothing has counted yet; quiet hours respected; user can switch it off.
- **Milestones** (celebrations + badges): 3, 7, 14, 30, 60, 100, 365 days.
- **Streak repair** (restore a just-lost streak by spending XP) → Later.
- Rules must be **tunable constants in one config file**, not scattered in code.

### 6.2 XP, levels, badges
- XP is awarded for **habits, never for money amounts**: e.g. log an entry, complete details, pay an obligation on time, reconcile, close an installment plan, finish a weekly mission. Daily caps and de-duplication prevent farming.
- Auto-generated actions (a subscription that posted by itself) give **no** XP.
- Badges examples: 7-day streak, 3 months of on-time bills, all installments cleared, 30 days of complete details.

### 6.3 Habit stats that can be ranked
Current streak · longest streak · active days in the last 30 · on-time payment rate (rolling) and months in a row · details-completeness rate · number of successful reconciles · installment plans closed · weekly XP · level · badge count.
Later: stay-within-budget %, progress toward a personal savings goal as a **percentage of the user's own target** (never an absolute amount).

### 6.4 Party invariants (violating any of these is a bug)
1. The party layer reads **only** from the aggregate stats/badge tables, **never** from transactions, accounts or attachments.
2. Rankings are based on **habits**, never on balance, income, spending or net worth.
3. Money values are visible to other members **only** if that user chose **Full** *and* enabled that specific figure. **Itemized transactions are never shared at any level.** [PROPOSED — owner to confirm that "Full" never means itemized data]
4. Every member can **opt out of ranking** and stay in the party. Private members are invisible and unranked.
5. One person can be #1 in several stats ("Consistency King", "On-time Champion"). Show per-stat boards, not one single winner.
6. Joining/leaving a party never changes or exposes the user's own data.

---

## 7. Constraints and external facts

- **No bank-sync aggregator for personal apps in Thailand** (there is no Plaid-like service the owner can use). Practical inputs are: manual entry, AI-typed entry, optional statement **CSV import** (Later; which banks is [OPEN]), and slip *attachment*. The Bank of Thailand "Your Data" framework was reported as enacted in late 2025 with a gradual rollout through 2026, starting with individual deposit accounts; it is **unclear whether personal apps can use it**. Do not build an integration; if needed, re-verify first.
- **Owner time and skill:** a student building in parallel with coursework. Prefer small steps and clear acceptance criteria. Avoid anything needing constant maintenance.
- **Family tech level:** assume zero. No VPN, no command line, no "go enable X in settings" beyond one tap.
- **AEGIS freeze:** the owner's capstone (AEGIS) shares the same Cloudflare/domain/server ideas and must not be disturbed before it is graded. See File 2 §2 and §14. Whether the AEGIS domain/tunnel can be reused is **[OPEN]** (ownership and grading date unknown; buying a new domain is acceptable).
- **iPhone limits:** web push works only after the PWA is added to the Home Screen; the in-app inbox must therefore always be the reliable fallback.

---

## 8. Hosting philosophy (summary — full detail in File 2)

- The owner's mini-server (Ubuntu, Docker, Docker Compose) **holds the data**. **Cloudflare Tunnel** exposes the domain; no router port forwarding. [DECIDED — "Option B"]
- **Twingate stays for the owner's admin access only** (SSH/maintenance); family never touches it. [DECIDED]
- Admin web routes are additionally protected by **Cloudflare Access**; ordinary users authenticate inside the app. [DECIDED direction]
- Rejected alternatives (for context): hosting the front end on Vercel (data would still need a public path to the home server); opening router ports (exposes the home IP and network).
- Domain and tunnel reuse from AEGIS: **[OPEN]**. Recommended default: a **new tunnel** dedicated to GisSino even if the domain is shared, so AEGIS and GisSino can be started/stopped independently. A subdomain on the same domain is free; the root domain name itself cannot be renamed.

---

## 9. Platform strategy: PWA [DECIDED]

- Build one web app that installs to the home screen: Android (install prompt), iPhone (Safari → Share → Add to Home Screen), desktop Chrome/Edge (installs as an app window).
- It is **not** a native `.exe`; wrapping in Tauri/Electron is a possible later step.
- Requirements: HTTPS, web app manifest, service worker, icons. Cloudflare Access can misbehave inside iOS standalone PWAs, so **end-user login is app-level**, not Access.

---

## 10. Core user flow [DECIDED]

```
Welcome ──► choose: Log in  |  Sign up (invite only)
              │                    │
            Log in             Sign up ──► First-time Setup ──► Main
              │                                                  ▲
              └──────────────────────────────────────────────────┘
```

First-time Setup: profile (name, nickname, avatar) → add first accounts with opening balances → choose notification method (allow push / email) → show how to install the app → finish. Then **Main** (Home dashboard with bottom navigation; map in File 2 §8).

---

## 11. Research digest (what we borrowed, and why)

| Source idea | Borrowed as | Not borrowed |
|---|---|---|
| YNAB / Actual / Goodbudget (envelopes) | "Safe to spend" concept; obligations reserve money | Full envelope budgeting (too heavy; Cut) |
| Monarch / Honeydue (household) | Per-person privacy levels, not one big shared pot | Shared accounts / who-owes-whom |
| Copilot (AI categorization) | AI draft + human confirm | Autonomous AI posting |
| Lunch Money | Recurring rules, tags, multi-currency | Custom budget periods, rule engine (Later) |
| PocketGuard | Safe-to-spend card | Bank-linked automation (unavailable in TH) |
| Rocket Money | Subscription tracking | Cancel-on-your-behalf services |
| Piggipo / Metang (Thai) | Card cut-off/due reminders, Thai-first copy | Voice entry (Cut) |
| MeowJot (Thai slip reading) | — | Slip OCR (owner declined) |
| Duolingo | Streak + freeze + weekly league feel | Guilt-based notifications, paid streak pressure |

---

## 12. Lessons carried in from earlier projects

**From the prior prototype (Sina_FN):**
- Over-scope was the main problem (many screens, tax, net worth, etc.). → Keep the seven blocks only.
- AI provider instability (quota/model-not-found). → Provider abstraction + graceful "AI unavailable" fallback to the manual form.
- Agent tooling hiccups on Windows/PowerShell (wrong working directory, Linux-only commands, port conflicts). → When giving local commands, state the shell and the working directory explicitly. [Confirm the owner's current dev OS.]
- The old stack was Next.js + Supabase. That does not fit "data on my own server"; see File 2 §5 for the proposed replacement.

**From AEGIS (security/infra patterns to reuse):**
- Per-owner authorization checks on every query (a missing ownership check on a delete endpoint was a real vulnerability — the IDOR/BOLA lesson).
- Separate Compose project, networks, volumes and database per system; non-root containers, read-only filesystem, `cap_drop: ALL`, no host ports; host firewall default-deny; SSH key-only.
- Trusted-proxy discipline: never trust a client-supplied `X-Forwarded-For`; accept Cloudflare client-IP headers only from the tunnel connector.
- Backups with SHA-256 checksums, a **real restore test**, and an **off-host copy**. AEGIS's own stated limits (single server, no RAID, manual backups) apply to GisSino too until improved.
- Verification discipline: test against a real Postgres, not mocks; never let a comment, label or toast claim something the code does not do; no seed credentials that survive first login.

---

## 13. Decision log (snapshot)

| # | Decision | Status |
|---|---|---|
| D1 | Name GisSino / `GisSino_FN`, tagline as in §2 | DECIDED |
| D2 | Personal/family hobby app, solo-first, lean daily-use scope | DECIDED |
| D3 | Mobile-first PWA, then desktop | DECIDED |
| D4 | Flow: Welcome → Login/Sign up (invite) → Setup → Main | DECIDED |
| D5 | Hosting: home server + Cloudflare Tunnel; Twingate for admin only; Access for admin routes | DECIDED |
| D6 | Currencies THB + USD only; daily USD→THB rate fetched from an API | DECIDED (source PROPOSED) |
| D7 | Subscriptions post automatically, no confirmation | DECIDED |
| D8 | No slip/receipt OCR; slips are attached only | DECIDED |
| D9 | AI chat = draft then confirm | DECIDED |
| D10 | Party = status/ranking showcase from solo stats; 3 visibility levels | DECIDED |
| D11 | Streak with auto-consumed freezes, Duolingo-level intensity | DECIDED (numbers PROPOSED) |
| D12 | Notifications: in-app + Web Push + email; Telegram owner-only | DECIDED direction |
| D13 | Light default + dark mode, navy accent, Thai primary | PROPOSED |
| D14 | Bottom nav: Home · Activity · ＋Add · Bills · Party; settings behind avatar | PROPOSED — **NEEDS UPDATE:** superseded by D23 in [DECISIONS.md](DECISIONS.md) |
| D15 | Stack: Next.js (TypeScript) + self-hosted PostgreSQL + job queue in Postgres | PROPOSED |
| D16 | Domain/tunnel reuse from AEGIS | OPEN |
| D17 | LLM provider | OPEN |
| D18 | Email provider for digests | OPEN |
| D19 | Which Thai banks for CSV import (Later) | OPEN |
| D20 | Same physical server as AEGIS, or a separate one; IP/VLAN placement | OPEN |
| D21 | Off-host backup destination | OPEN |
| D22 | Does "Full" visibility ever include itemized data (recommended: never) | OPEN |

---

## 14. Agent working agreement

1. **Check for existing components, files and utilities before creating new ones.** Reuse over reinvention.
2. **Never delete files, data or database objects without the owner's explicit confirmation.** Propose, then wait. For destructive migrations, show the plan first.
3. **Small, reviewable steps.** One feature slice per task; state what you will change before changing it; list the files touched afterwards.
4. **Say what you verified and how.** Tests run, commands executed, outputs seen. Separate "I ran this" from "I believe this". Never claim something is implemented, secure, backed up or tested unless it is.
5. **No fake data in the product.** No hard-coded balances, no demo charts presented as real, no success toasts that save nothing.
6. **Money is integers.** Store minor units (satang / cents) plus a currency code. Never use floating point for money.
7. **Authorization on every query.** Every read and write is scoped to the authenticated user; add tests that prove user A cannot read or modify user B's rows.
8. **Secrets stay out of git.** No default credentials. No keys in the front end. Provide `.env.example` with names only.
9. **Verify external facts.** Library versions, Cloudflare limits, API terms, bank formats, regulations: look them up or mark them `VERIFY` — do not assert from memory.
10. **Ask when [OPEN].** Prefer one precise question to a wrong assumption.
11. **Language:** product UI in Thai; code and docs in English; when you talk to the owner, answer in Thai unless asked otherwise.
12. **Shell hygiene:** when you give commands, say which OS/shell and which directory they run from.

---

## 15. Glossary

| Term | Meaning |
|---|---|
| Account / Wallet | A place money sits: bank, e-wallet, cash, credit card. (กระเป๋าเงิน) |
| Ledger | The list of money movements from which balances are computed. |
| Transfer | Move between own accounts. Never an expense. |
| Adjustment | Explicit entry that fixes a mismatch with the real bank balance. |
| Needs details | Entry saved quickly (e.g. slip only) and described later. (รอเติมรายละเอียด) |
| Safe to spend | Money you have minus obligations not yet paid. (เงินที่ใช้ได้จริง) |
| Obligation | Installment, credit-card payment, bill or subscription due on a date. (ภาระ) |
| Party | A group of members who see each other's *shared habit stats*. (ปาร์ตี้) |
| Visibility level | Private / Status only / Full — per member. |
| Freeze | Item that auto-protects a streak when a day is missed. (วันพัก) |
| XP / Level | Habit points and the level derived from them. |
| PWA | Web app installed on the home screen. |
| Tunnel | Cloudflare Tunnel: outbound-only connection from the server to Cloudflare. |
| BOLA / IDOR | Accessing another user's object by guessing an ID; prevented by owner checks. |

## Change log

- 2026-10-16 — Added vault metadata and marked the earlier navigation proposal as superseded by [D23](DECISIONS.md#d23--primary-navigation-model) for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).
