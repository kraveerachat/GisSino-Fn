---
id: ARCH-SYSTEM
type: architecture
level: 2
status: DRAFT
updated: 2026-10-18
up: Architecture-Hub.md
related:
  - ../project/PROJECT_GUIDE.md
  - ../project/DECISIONS.md
  - ../pages/Pages-Hub.md
---

# GisSino_FN — 02 SYSTEM ARCHITECTURE (Agent Briefing)

> **File 2 of 2.** HOW the system is built: edge (Cloudflare), server (Docker), application, data, engines, navigation map, security, backup, testing, build order.
> Prerequisite: read `GisSino_01_PROJECT_GUIDE.md` first (purpose, principles, scope, status tags **[DECIDED] / [PROPOSED] / [OPEN]**, and the agent working agreement in its §14 apply here too).
> **Level of detail:** architecture and information architecture only. Screen layouts and visual design come later, in a separate step.

---

## 1. Architecture at a glance

```
  Phone / PC browser  (PWA)
          │  HTTPS
          ▼
  ┌────────────────────────────── Cloudflare ──────────────────────────────┐
  │ DNS · TLS termination · WAF/rate rules · (Access on admin hostname)   │
  └───────────────────────────────┬────────────────────────────────────────┘
                                  │  Cloudflare Tunnel (outbound-only from the server)
  ════════════════ home network ══╪════════════════════════════════════════
          Mini-server (Ubuntu) — Docker Compose project: gissino-prod
                                  │
            ┌─────────────────────▼────────────────────┐
            │ cloudflared  (the only thing talking out) │
            └─────────────────────┬────────────────────┘
                                  │ internal Docker network (no host ports published)
        ┌─────────────────────────▼─────────────────────────┐
        │ app     Next.js server: UI + API + auth            │
        │ worker  scheduled jobs: subscriptions, reminders,  │
        │         FX rate, streaks/ranking, backups trigger  │
        └───────────────┬───────────────────────────────────┘
                        │ private DB network (internal)
                  ┌─────▼─────┐        volumes: db-data, attachments, backups
                  │ postgres  │
                  └───────────┘
  Admin access to the host itself: Twingate → SSH (owner only)
  Outbound calls from app/worker: FX-rate API, LLM provider, email provider, Web Push services
```

Design stance: a **modular monolith** (one codebase, one app image reused for `app` and `worker`) with **PostgreSQL as the single stateful component**. Four containers total. [PROPOSED]

---

## 2. Environments, domain and hostnames

| Environment | Where | Purpose |
|---|---|---|
| `dev` | Owner's laptop, `docker compose` (db + app + worker) | Daily development, tests against real Postgres |
| `prod` | Mini-server, Compose project `gissino-prod` | Real family use |

- Domain: **[OPEN]** — reuse the AEGIS domain (subdomain, free) or buy a new one. The domain's DNS must be on Cloudflare for tunnel hostnames to work. Use placeholder `<DOMAIN>` in all code and docs.
- Hostnames [PROPOSED]:
  - `gissino.<DOMAIN>` — the app (users).
  - `admin.gissino.<DOMAIN>` — admin console, protected by Cloudflare Access (separate hostname keeps Access policy simple and keeps it away from the user PWA).
- **AEGIS freeze rule [DECIDED by circumstance]:** until AEGIS is graded, do not change AEGIS's tunnel, firewall, Docker networks, volumes, or database. GisSino must be additive and isolated: its own Compose project name, its own networks/volumes/DB, its own tunnel (recommended). Develop on `dev` until the server/tunnel question is settled.
- Whether GisSino runs on the **same physical mini-server as AEGIS** (AEGIS uses a Beelink Mini S: Intel N5095, 8 GB RAM, Ubuntu, host `192.168.10.10`, Server VLAN 10, with `192.168.10.13` reserved) or a different machine: **[OPEN]**. If co-located: GisSino needs **no macvlan/LAN IP** (it exposes nothing inbound), so it can live on private Docker bridge networks and avoid touching AEGIS's VLAN plan. Set memory/CPU limits so GisSino cannot starve AEGIS.

---

## 3. Edge: Cloudflare

### 3.1 Tunnel
- One `cloudflared` container, **remotely-managed tunnel** configured in the Cloudflare dashboard, authenticated with a tunnel **token** passed via a secret/env file (never committed). [PROPOSED]
- Public hostnames map to internal service URLs, e.g. `gissino.<DOMAIN>` → `http://app:3000`. A single tunnel can serve several hostnames.
- Create a **new tunnel for GisSino** even if the domain is shared with AEGIS. [PROPOSED]
- No inbound port forwarding on the router; host firewall stays default-deny.
- Resilience: `restart: unless-stopped` and a healthcheck on `cloudflared`. If the connector is down, visitors see Cloudflare error **1033** — treat that as "tunnel connector offline", not an app bug.

### 3.2 Cloudflare Access (admin only)
- Application on `admin.gissino.<DOMAIN>`; policy allowing only the owner's identity (email one-time-PIN or an IdP). **VERIFY** current free-plan limits before relying on them.
- Do **not** put Access in front of the user app: it can break installed iOS PWAs and is unfriendly for family. Users authenticate in the app (§5.4).

### 3.3 TLS, caching, privacy note
- TLS terminates at Cloudflare, so Cloudflare can technically see traffic to the app (financial data). Accepted trade-off; mention it in the privacy page. Traffic between `cloudflared` and Cloudflare is encrypted.
- Caching: cache only hashed static assets; **bypass cache** for HTML shell, API and anything per-user. Never cache attachment downloads.
- Add rate-limiting/WAF rules for `/api/auth/*` and the signup/invite routes. **VERIFY** which rule types the current plan includes.

### 3.4 Real client IP
- The app sits behind `cloudflared`, so the TCP peer is always the connector. Trust Cloudflare's client-IP header (`CF-Connecting-IP`) **only** for requests arriving from the connector's network; ignore any client-supplied `X-Forwarded-For`. (AEGIS lesson: Docker bridge hides client IP; forged forwarding headers must never be trusted.)

---

## 4. Host and Docker

### 4.1 Compose services [PROPOSED]

| Service | Image | Network(s) | Persistent volume | Notes |
|---|---|---|---|---|
| `cloudflared` | official cloudflared | `edge` | none | token via secret; healthcheck; the only service with outbound tunnel |
| `app` | project image (Node LTS) | `edge`, `backend` | `attachments` | stateless apart from files; no published ports |
| `worker` | **same image** as `app`, different command | `backend` + outbound | `attachments` (read) | runs the job scheduler; only one replica |
| `postgres` | official Postgres (current stable major — **VERIFY**) | `backend` (internal) | `db-data` | not reachable from `edge` or the host |
| `backup` (optional) | small image or host cron | `backend` | `backups` | see §11; can be a host cron instead |

Networks: `edge` (cloudflared ↔ app) and `backend` (`internal: true`, app/worker ↔ postgres). The worker also needs outbound internet; give it a network that allows egress but keep Postgres on the internal one.

### 4.2 Hardening (AEGIS patterns)
- Containers run as non-root, `read_only: true` root FS where possible with `tmpfs` for temp, `cap_drop: [ALL]`, `security_opt: [no-new-privileges:true]`, no published host ports, memory/CPU limits, healthchecks, pinned image digests/versions.
- Host: UFW default deny incoming; SSH key-only; automatic security updates **[OPEN preference]**; Docker daemon not exposed.
- Remote admin: **Twingate → SSH** for the owner only (already exists for AEGIS). Family never uses it.
- Separate Compose project name (`gissino-prod`), separate volumes, separate DB users. Never reuse AEGIS credentials or its Postgres instance.

### 4.3 Operations
- Deploy: `git pull` → build image → `docker compose up -d` → run DB migrations as a distinct, logged step → smoke test `/healthz`.
- `/healthz` (liveness) and `/readyz` (DB reachable + migrations applied). Docker healthchecks use them.
- Logs: JSON to stdout, rotated by Docker; **never log tokens, passwords, full AI prompts with financial text, or slip contents**.
- Optional external uptime probe on the public URL **[OPEN]**.

---

## 5. Application architecture

### 5.1 Stack [PROPOSED — owner to confirm]
- **Next.js (TypeScript, App Router)** for UI + API route handlers; Tailwind CSS; a charting library for simple charts.
- **PostgreSQL** self-hosted; a typed ORM/query builder with SQL migrations (e.g. Drizzle or Prisma — pick one, keep it).
- **Job scheduling:** a Postgres-backed queue (e.g. pg-boss) so no Redis is needed.
- **Validation:** a schema library (e.g. Zod) on every API input and on every AI output.
- **Auth:** an established library supporting email+password (Argon2id) and WebAuthn Passkeys; do not hand-roll cryptography.
- **Replaces the old Next.js + Supabase** stack, because data must live on the owner's server. [PROPOSED]

### 5.2 Module boundaries (folders, not microservices)
`auth` · `accounts` · `ledger` (transactions, transfers, adjustments) · `attachments` · `obligations` (subscriptions, installments, cards, bills) · `reminders` (+ notification channels) · `fx` · `habits` (streak, XP, badges, stats) · `party` · `ai` · `admin` · `settings`.
Rule: `party` may import from `habits` read models only; it must not import `ledger` or `accounts`.

### 5.3 API conventions
- JSON over HTTPS; versionless internal API under `/api`; server-side validation; consistent error shape `{code, message, fieldErrors?}`.
- All list endpoints paginated. All mutating endpoints idempotent where retries are plausible (use client-generated idempotency keys for "add transaction").
- Soft-delete / void instead of hard delete for financial rows; "undo" restores within a window.

### 5.4 Authentication and sessions
- **Invite-only signup** [DECIDED]: owner (or a party host, if allowed — **[OPEN]**) creates a single-use, expiring invite link; store only a hash of the code.
- Login: email+password, plus Passkey registration/login (recommended for family: no password to remember).
- Sessions: server-side session records, cookie `HttpOnly; Secure; SameSite=Lax`, rotation on login, revocation list, "sign out all devices".
- Brute-force protection: per-IP and per-account rate limits (using the trusted client IP from §3.4), progressive delay, generic error messages.
- Password reset by email link (single-use, short expiry) — depends on email provider **[OPEN]**.
- No default or seeded credentials. First owner account is created through a one-time bootstrap command that forces a strong password.

### 5.5 Authorization (BOLA prevention) — critical
- Every table that stores user data has `user_id`. Every query includes it. Implement a data-access layer that **requires** a user context so that forgetting the filter is impossible, not just unlikely. (Optionally add Postgres Row-Level Security as a second layer.)
- Admin routes use a separate role check and are reachable only on the Access-protected hostname.
- Required tests: for every resource type, user A receives 404/403 when requesting or mutating user B's object by id.

### 5.6 Money handling rules
- Integer **minor units** (satang, cents) + `currency ∈ {THB, USD}`. No floats anywhere in storage or arithmetic.
- FX rates stored as exact decimals (`NUMERIC`). Rounding rule defined once (e.g. half-up to the minor unit) and unit-tested.
- A USD transaction **snapshots** the rate used at posting time (`fx_rate_id` + `thb_amount_minor`); later rate changes never rewrite history.
- Display formats: `฿1,234.50`, `$12.99`. Dates shown in Gregorian by default; Thai month names; Buddhist-era option **[OPEN]**.

### 5.7 i18n
- All user-facing strings in message catalogs; Thai default, English ready. Never hard-code Thai strings in components.

---

## 6. Data model (conceptual — not final DDL)

Conventions: UUID primary keys; `created_at`, `updated_at`; `voided_at` for financial rows; `user_id` on all personal data.

### 6.1 Identity and access
`users` (email, display_name, nickname, avatar_key, role `owner|member`, locale, timezone default `Asia/Bangkok`, display_currency `THB`) ·
`credentials` (password_hash) · `passkeys` · `sessions` · `invites` (code_hash, expires_at, used_by, party_id?) · `audit_log` (actor, action, object, at, ip_hash).

### 6.2 Money core
- `accounts`: user_id, name, type `bank|ewallet|cash|credit_card`, institution, currency, opening_balance_minor, is_liability (true for cards), archived, sort_order.
- `categories`: user_id, name, kind `income|expense`, icon, parent_id?.
- `transactions`: user_id, kind `income|expense|transfer|adjustment|card_payment`, occurred_at, status `confirmed|needs_details|voided`, category_id?, note, tags[], source `manual|ai|subscription_auto|installment|bill|import`, original_amount_minor, original_currency, fx_rate_id?, thb_amount_minor, created_by_ai_draft_id?.
- `ledger_entries`: transaction_id, account_id, amount_minor (signed, in the account's currency). A transfer is **two linked entries** (`transfer_group_id`); an expense is one entry on the paying account (credit-card spending increases the liability). **Balance of an account = opening balance + sum(entries not voided).** Never store a mutable "balance" column as truth (a cached value is fine if rebuilt and verified).
- `attachments`: transaction_id, storage_key (random), mime, size, sha256, created_at. Slips only; **no OCR, no text extraction.**

### 6.3 Obligations
- `subscriptions`: name, amount_minor, currency, cycle `monthly|yearly`, anchor_day (or date for yearly), funding_account_id, category_id, status `active|paused|cancelled`, next_due_date, started_on, trial_ends_on?; `subscription_price_history`.
- `subscription_runs`: subscription_id, due_date, **UNIQUE(subscription_id, due_date)**, transaction_id, status `posted|skipped|failed`, posted_at — the idempotency guard.
- `installment_plans`: name, merchant/provider, total_periods, monthly_amount_minor, currency THB, start_date, due_day, funding_account_id, status; `installment_items` (period_no, due_date, amount_minor, paid_transaction_id?, status).
- `card_profiles`: account_id (credit card), statement_day, due_day, credit_limit_minor?; `card_statements` (period, billed_minor, min_due_minor, due_date, paid_transaction_id?) — statement amounts entered by the user.
- `bills`: name, due_day, expected_amount_minor?, is_variable, funding_account_id?, category_id; `bill_cycles` (month, amount_minor, paid_transaction_id?, status).

### 6.4 Reminders and notifications
`reminders` (user_id, source_type, source_id, stage `T-3|due|overdue`, fire_at, status) ·
`notifications` (user_id, kind, title, body, link, created_at, read_at) — the **in-app inbox, the source of truth** ·
`push_subscriptions` (user_id, endpoint, keys, user_agent, created_at) ·
`notification_prefs` (user_id, channel `inapp|push|email|telegram`, enabled, quiet_hours, streak_reminder_time) ·
`delivery_log` (notification_id, channel, status, attempted_at).

### 6.5 FX
`fx_rates`: base `USD`, quote `THB`, rate NUMERIC, rate_date, source, fetched_at, is_manual.

### 6.6 Habits and party
`streak_state` (user_id, current, longest, last_counted_date, freezes_held, freeze_used_dates[]) ·
`daily_activity` (user_id, date, counted bool, actions[]) ·
`xp_events` (user_id, kind, points, ref, occurred_at, UNIQUE per dedupe_key) ·
`user_stats` (user_id, level, xp_total, weekly_xp, active_days_30, on_time_rate, on_time_months, completeness_rate, reconciles_count, installments_closed, updated_at) — **the only table the party layer reads** ·
`badges` (user_id, key, earned_at) ·
`parties` (name, created_by) · `party_members` (party_id, user_id, visibility `private|status|full`, rank_opt_in, shared_figures[], joined_at) · `party_feed` (party_id, user_id, kind, payload, created_at).

### 6.7 AI
`ai_drafts` (user_id, input_text, parsed_json, status `proposed|confirmed|discarded`, model, created_at, expires_at) · `ai_usage` (user_id, date, tokens_in, tokens_out, requests) for budgeting.

### 6.8 Ledger invariants (must be tested)
1. Transfers never appear in expense/income totals or in category reports.
2. Credit-card payment = transfer from a funding account to the card liability; the original purchases already counted as expenses.
3. Voiding a transaction voids all its entries atomically.
4. Account balance recomputed from entries equals the displayed balance (a nightly consistency check job reports mismatches).
5. A reconcile creates an `adjustment` transaction for exactly the difference and records who/when/why; it is never an edit of history.
6. USD amounts keep their original currency and snapshot rate forever.

---

## 7. Engines

### 7.1 FX rate service (USD → THB) [DECIDED: daily API fetch; source PROPOSED]
- A daily job fetches the USD→THB rate and stores it in `fx_rates`. "Real-time" is not needed; **once per day is enough** for estimates.
- Provider interface with an ordered list. Candidate sources (**VERIFY availability, terms of use, and attribution before choosing; none were verified in the planning session**): Frankfurter (free, no API key, ECB reference rates — ECB publishes once per business day), the Bank of Thailand open API (needs registration), or another free daily-rate API.
- Fallback chain: primary → secondary → last stored good rate → owner's manual override. Show "rate as of <date> from <source>" wherever a converted number appears.
- Weekends/holidays: reuse the latest available rate (do not treat as failure).
- **Estimate vs actual:** a USD subscription posts with the *estimated* THB value; the user can edit it to the *actual charged* THB amount (their bank/card spread differs from the reference rate). Editing stores both and marks it `actual`.
- Dashboard totals convert USD accounts at the latest rate and say so.

### 7.2 Subscription auto-posting [DECIDED: automatic, no confirmation]
- Scheduler runs an **idempotent sweep** (hourly + shortly after midnight Asia/Bangkok). For each active subscription with `next_due_date <= today`, create the missing runs and transactions.
- Idempotency: `UNIQUE(subscription_id, due_date)` plus a DB transaction; re-running must never double-post (test it).
- **Catch-up:** if the worker was down, post all missed due dates (bounded, e.g. last 60 days) in order, flag them `late_posted`, and notify once.
- Month-end rule: anchor day 31 → last day of shorter months; yearly on Feb 29 → Feb 28/Mar 1 (choose and document).
- Posting: expense in the subscription's currency on the funding account (card → liability increases), `source = subscription_auto`, status `confirmed`. Notify in-app ("Netflix ฿419 posted"). User may edit/void afterward; pause/cancel stops future runs. Price changes create a history row and apply from the next due date.
- Auto-posted items give **no XP** (they are not user habits).

### 7.3 Installments
- Creating a plan generates all `installment_items`. "Mark paid" records the payment transaction from the funding account (or card), links it to the item, and advances the plan; when the last item is paid the plan closes and counts toward `installments_closed` and badges. Remaining balance = sum of unpaid items.

### 7.4 Credit cards
- Per card: statement day, due day. User enters the statement's billed and minimum amounts when known. Reminders target the due date. "Pay card" = transfer to the liability (invariant 6.8-2).

### 7.5 Bills
- Fixed or variable monthly bills; variable ones prompt the user to enter the month's amount when the bill is due or issued; reminders by the same three stages.

### 7.6 Reminders and notification delivery
- A dispatcher job (e.g. every 5 minutes) converts due reminders into `notifications` (always) and attempts other enabled channels.
- Stages: **T-3 days**, **due day**, **overdue** (repeat daily up to a cap, then weekly). Each has "Mark as paid" and "Snooze".
- Channels: (1) in-app inbox + dashboard "due today" strip — mandatory, never depends on third parties; (2) **Web Push** via VAPID keys, per-device subscriptions, requires the PWA to be installed on iPhone; (3) **email digest**; (4) **Telegram — owner only, optional** through a `NotificationChannel` interface. LINE is out of scope until its terms/cost are verified.
- Respect quiet hours and daily caps. Failed push endpoints (expired subscription) are pruned.
- Email deliverability from a home IP is poor: use an external transactional email provider **[OPEN]**.

### 7.7 Habits: streaks, XP, badges, stats
- All tunables in a single config module: qualifying actions, freeze cap (2), freeze earn rule (every 7-day milestone), XP table, daily XP caps, level curve, milestone list, streak reminder default time.
- **Nightly rollover** (shortly after midnight `Asia/Bangkok`): evaluate yesterday for each user; if not counted and a freeze is held → consume a freeze and keep the streak; else reset to 0.
- Event-driven XP: domain events (`transaction.created`, `details.completed`, `obligation.paid_on_time`, `reconcile.done`, `plan.closed`, `checkin.no_spend`) → rules → `xp_events` (deduped) → recompute `user_stats` and award `badges`.
- "No spending today" check-in: one per day; if the user later logs an expense for that day, keep the check-in valid but show a gentle correction prompt rather than punishing.
- Weekly board resets Monday 00:00 `Asia/Bangkok`; the winner earns a weekly badge. No demotion mechanics in v1.
- Tone rules: no guilt copy, streak notifications can be turned off, ranking can be opted out.

#### M7 backlog clarified by Compact Home preview

The current [Home prototype](../pages/home/Page-Home.md) and shared Add check-in are synthetic, user-triggered presentation only. They do not implement this engine. Its weekly ring proposes unique qualifying active dates in the current Bangkok Monday-Sunday week /7, rounded; a frozen day is not a qualifying active day. Existing canonical statistics remain separate. App-open/login is not a qualifying action and awards no XP; automatic login XP is an [OPEN conflicting proposal](../project/OPEN_QUESTIONS.md).

Before production M7 delivery, require:

- Per-user authoritative daily activity state and qualification by `Asia/Bangkok` date; entry including needs-details, confirmed No spending today, bill paid and reconciliation events come from owned domain commands (M2/M3/M5).
- Idempotent check-in and server-side XP rules, daily caps, event/date deduplication and race protection. Numeric preview reward values are configurable illustrations, not approved formulas.
- Streak/freeze rollover, weekly XP calculation, badge milestones and historical daily statuses with explicit freeze confirmation.
- First-relevant-visit-of-day state, separate welcome display and reward grant events, plus reward-popup shown-state. A page-memory preview guard proves neither persistence nor server exactly-once behavior.
- Reminder preferences, opt-out and quiet hours integrated with M6 delivery; no implicit notification permission or scheduling from Home.
- Midnight and Sunday/Monday Bangkok boundaries, duplicate/repeated/concurrent action tests, cross-user isolation and authorization/BOLA checks. Party access uses aggregate stats/badges only (M8), never ledger/accounts/attachments.

### 7.8 Party service
- Reads only `user_stats`, `badges`, `party_members`, `party_feed`.
- Visibility enforcement is done **in the query layer**: a member row is returned with only the fields allowed by its `visibility` and `shared_figures`.
- Leaderboards are computed per stat (top N with ties handled), cached briefly; "crowns" show who holds #1 in each stat.
- Feed events are generated from badge/level/streak-milestone events and respect visibility.
- Invite to party: single-use link/QR; joining an existing app user adds membership; a new person goes through app signup first.

### 7.9 AI assistant
- **Provider interface** (`parseTransaction`, `answerQuestion`) with the concrete model **[OPEN]**; configuration and keys live server-side only. Timeouts, retries, and a per-user daily budget (`ai_usage`).
- **Logging flow:** user text → server builds a minimal prompt (today's date, the user's category and account *names*, currency list; **no balances, no history**) → model returns strict JSON → validate with the schema → store as `ai_drafts` → UI shows an editable draft card → user confirms → only then create the transaction (`source = ai`). Low-confidence or missing fields are left blank and highlighted, never guessed silently.
- **Q&A flow (read-only):** the model may call a fixed allow-list of parameterized query functions (e.g. `upcoming_obligations(range)`, `spending_by_category(range)`, `account_balances()`), executed with the caller's `user_id` under a **read-only DB role**. The model never writes SQL, never calls write functions, never sees other users' data.
- Treat all user text as untrusted (prompt-injection aware): tools are allow-listed, outputs validated, nothing executed from model text.
- Failure mode: if the provider is down or over quota, show "AI unavailable — use the manual form"; the manual path must always work.
- Retention: delete drafts and raw prompts after a short window (e.g. 30 days) **[PROPOSED]**.

### 7.10 Attachments (slips)
- Upload: image types only, validated by **magic bytes** (not file extension), size limit (e.g. ≤ 5 MB, client-side compression first), **EXIF/GPS stripped**, random storage key, SHA-256 recorded.
- Served only through an authenticated endpoint that checks ownership; never a public or guessable URL; not cached by Cloudflare.
- Included in backups. No OCR, no content parsing — by owner decision.

---

## 8. Information architecture — navigation map (structure only, not layout)

> **NEEDS UPDATE (2026-10-16):** The navigation proposal below is preserved as historical source text. Owner-approved design iteration now uses Home / Wallet / Activity / More plus a separate Add circle, with Bills and Party inside More, and a collapsible desktop sidebar. See [D23](../project/DECISIONS.md#d23--responsive-primary-navigation).

**Bottom navigation (5 slots)** [PROPOSED; the older alternative "4 tabs + centered FAB" is still possible — **[OPEN]** until the owner picks]:

`Home` · `Activity` · **`＋ Add`** (center, primary action) · `Bills` · `Party`

Profile/Settings are reached from the **avatar** at the top of Home (not a tab). The AI ask-chat opens from a Home header icon and from inside the Add sheet.

### 8.0 Auth area (before Main)

> **Current design-preview revision, 2026-10-17:** [D28](../project/DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode) retains the D27 routes with consumer copy and one header Demo mode. Primary/Google actions navigate empty or typed Login → Home and signup → Profile, explicitly clearing credential values. Signup has no invitation UI; six setup steps and Postcard retain one primary action and one header Back. No backend signup, Google OAuth, identity/session/token, consent record, financial persistence, permission or installation is implemented. **Canonical production signup remains invite-only**, including M1 and the invite model below. Public signup and Google production direction are PENDING separate owner confirmation/security architecture approval before M1. Preview input relaxation is not a production validation contract. See [Auth](../pages/auth/Page-Auth.md), [UI Data Contracts](../design/UI_DATA_CONTRACTS.md), [Open Questions](../project/OPEN_QUESTIONS.md) and [S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md).
Welcome → Log in | Sign up (invite code/link) → [Passkey prompt] → **First-time Setup** (profile → first accounts and opening balances → notifications → install guide) → Main. Also: Forgot password; Invite-expired / invalid state.

### 8.1 Home (dashboard)

- Current mock composition per [D31](../project/DECISIONS.md#d31--seven-day-home-due-list-and-missing-activity-days): greeting/total-balance hero/actions, unchanged Accounts first, conditional max4 seven-day Due soon, existing gamified habit card with missing days, Recent last.
- Safe Home UI is removed; integer-minor liquid assets minus unpaid current-month obligations, currency isolation, negative scenarios/formatter/tests remain. Future Wallet placement is OPEN; no Wallet redesign.
- Home Due soon: selected Bangkok date, valid unpaid overdue/today/+7 inclusive, stable date/ID, same-ID or name/date/currency/amount dedupe, no inner scroll, empty hides, existing Bill details/View all Bills. Bell remains <=3 days/overdue; canonical production stages T-3/due/overdue remain M6 without schedule changes.
- Missing activity counts strictly past current-week nonactive dates, including frozen but excluding pending today/future. Existing timeline identifies dates/first-missing focus; frozen remains distinct/no activity. Freeze model, streak, XP, ring, gestures and shared transient check-in are unchanged. No app-open/login XP or persistence.
- Monthly/nearest Home UI remains absent, data/helpers retained; monthly destination OPEN while Activity planned analysis stays canonical. Synthetic disclosure, Home-only Settings and complete [Home inventory](../pages/home/Page-Home.md#feature-and-system-inventory) remain.

### 8.2 Activity
- Day-grouped list; search; filters (account, category, tag, date, kind); **"Needs details" inbox**.
- **Transaction detail** (edit, change category/tags, attach/replace slip, void/undo).
- Month summary (income/expense, category breakdown). Transfers shown but excluded from totals.

### 8.3 Add (bottom sheet, modes)
1. **Type to AI** (default): Thai sentence → draft card(s) → confirm.
2. **Manual**: expense / income form (amount, currency THB|USD, account, category, date, note, slip).
3. **Transfer**: from-account → to-account, amount, optional fee.
4. **No spending today** check-in.
5. **Quick slip**: attach image now → saved as "needs details".

### 8.4 Bills (obligations)
- Calendar + list for the month with the total committed. Sections: **Installments**, **Credit cards**, **Monthly bills**, **Subscriptions**.
- Each section: list → detail → create/edit. Subscription detail shows next charge, price history, auto-post history, pause/cancel. Installment detail shows progress and remaining. Card detail shows statement/due dates. Every item has **Mark as paid** where applicable.

### 8.5 Party
- **My status card**: level, XP, streak and freezes, badges (badge gallery), weekly XP.
- **Leaderboards**: tabs per stat (consistency/streak, active days, on-time payments, completeness, reconciles, installments closed, weekly XP); "you are #N" and crowns.
- **Members & invites**: invite link/QR, member list, leave party.
- **Visibility & ranking settings** (Private / Status only / Full; opt out of ranking; which figures to show at Full).
- **Feed**: short events.

### 8.6 Settings (from avatar)
Profile · Currency & FX (display currency THB, rate source/date, manual override) · Categories & tags · Notifications (channels, quiet hours, streak reminder time, optional Telegram for owner) · Privacy (visibility defaults, ranking opt-out) · Security (password, Passkeys, active sessions) · Data (export CSV, delete account) · **Install guide** (Android / iPhone / desktop) · About.

### 8.7 Admin console (separate hostname, owner only)
Invites (create/revoke) · Users (disable, reset sessions) · System health (DB, tunnel, job status, last FX fetch) · Job runs and failures · Backup status and last restore test · Feature/config values.

---

## 9. PWA specification

- **Manifest:** name "GisSino", short_name "GisSino", `start_url` `/`, `display: standalone`, theme/background colors, icons including maskable (192, 512), `lang: th`.
- **Service worker:** precache the app shell and hashed assets; **network-only for API and attachments**; an offline fallback page that says "offline — reconnect to continue". Offline writing of transactions is **Later** (a sync queue risks ledger inconsistency).
- **Install:** Android uses the install prompt; iPhone shows a custom instruction screen (Share → Add to Home Screen); desktop shows an install button. The Install guide in Settings repeats this.
- **Push:** VAPID keys on the server; subscribe only after a user gesture; on iPhone only inside the installed app; always mirror to the in-app inbox.
- **Updates:** versioned service worker with an "update available" prompt.
- Do not put Cloudflare Access in front of the user app (see §3.2).

---

## 10. Security and privacy summary

- Threats prioritized: broken object-level authorization, credential stuffing, invite abuse, leaked backups, prompt injection through AI text, file-upload abuse, and secret leakage.
- Controls: owner-scoped data layer (+ tests, optional RLS); Argon2id + Passkeys; rate limits; CSP and standard security headers (HSTS via Cloudflare, `X-Content-Type-Options`, `Referrer-Policy`, frame protections); CSRF defenses for cookie sessions; strict input validation; magic-byte upload checks; secrets only in env/secret files; encrypted backups; audit log for auth, invite, admin, and sensitive actions.
- Privacy: collect minimum data; no analytics SDKs by default; AI prompts exclude balances; party reads aggregates only; account deletion removes personal data (and backups age out under the retention policy); a plain-language privacy page states that Cloudflare terminates TLS and which third parties (LLM, email, push services) may see which data.
- Legal note: personal-use hobby app with invited family; if it ever opens to the public, review Thailand's personal-data law (PDPA) obligations **before** launch — **VERIFY with proper sources**; this file gives no legal advice.

---

## 11. Backup, restore, observability

- **Database:** nightly logical dump of PostgreSQL; **attachments** volume copied alongside. Retention e.g. 7 daily / 4 weekly / 6 monthly **[PROPOSED]**. Target RPO ≤ 24 h.
- Each backup is **encrypted** (e.g. with `age`) and accompanied by a **SHA-256** file; verification of the checksum runs after creation.
- **Off-host copy** to a location the owner chooses **[OPEN]** — a second disk, another machine, or a cloud bucket. A single-server, no-RAID setup (AEGIS's stated limit) means a disk failure without an off-host copy loses everything.
- **Restore drill:** scripted restore into a scratch database, row-count and ledger-consistency checks; run monthly at first, then quarterly. A backup that has never been restored is not considered a backup.
- Observability: `/healthz`, `/readyz`, job-run table with last success time, FX freshness indicator, and a nightly ledger-consistency report. Alerts to the owner (Telegram or email) for: job failure, FX stale > 3 days, backup failure, tunnel down (via external probe if available).

---

## 12. Testing and verification plan

- Run tests against a **real PostgreSQL** (Docker) — not mocks. (AEGIS lesson.)
- Must-have suites: ledger invariants (§6.8); money rounding and FX snapshots; **cross-user access (BOLA) for every resource**; subscription runner idempotency, catch-up and month-end edge cases; installment progression; streak/freeze rollover across midnight and across DST-free `Asia/Bangkok` boundaries; XP dedupe; party visibility filtering (a Private member never leaks; a Status-only member never shows money); AI output schema validation and injection samples; attachment validation; session/rate-limit behavior.
- Verification rule: report exactly which tests/commands were run and their results. Do not write comments, labels or UI text that describe unimplemented behavior as real.

---

## 13. Build sequence (milestones with acceptance criteria)

| # | Milestone | Done when |
|---|---|---|
| M0 | Repo, Compose dev stack, CI-lite (lint, test), env handling | `docker compose up` gives app+db+worker locally; one passing DB test |
| M1 | Auth: invite-only signup, login, Passkey, sessions, rate limits, bootstrap owner | Cross-user test passes; no default credentials |
| M2 | Accounts + ledger core + transfers + reconcile | Ledger invariants test suite green |
| M3 | Activity UI + Add (manual) + categories/tags + slip attach + "needs details" | Can log, search, attach, undo |
| M4 | FX service + USD handling | Daily job + fallback chain + manual override tested |
| M5 | Obligations: subscriptions (auto), installments, cards, bills + calendar | Idempotent runner proven; catch-up tested |
| M6 | Reminders + notification channels (in-app, push, email) | Three-stage reminders arrive on a real Android and a real installed iPhone |
| M7 | Habits: streak/freeze/XP/badges/stats | Rollover tests green |
| M8 | Party: invite, leaderboards, visibility, feed | Visibility leak tests green |
| M9 | AI: draft→confirm and read-only Q&A | Schema/injection tests; graceful fallback |
| M10 | PWA polish + install guide + admin console | Installs on Android, iPhone, desktop |
| M11 | Production: tunnel, Access on admin, hardening, backups + restore drill, off-host copy | Restore drill passed and recorded; external access works for a non-technical tester |

Order rationale: the ledger and security first (everything depends on them); obligations and reminders next (the owner's main daily value); habits/party after real data exists; AI last because the manual path must already work.

---

## 14. Open decisions the agent must raise with the owner

1. Domain and tunnel: reuse AEGIS's domain (subdomain) or buy new? When is AEGIS graded / frozen? New tunnel recommended.
2. Same physical server as AEGIS or separate? (Affects resource limits; GisSino needs no VLAN/macvlan IP.)
3. Stack confirmation (Next.js + self-hosted Postgres + pg-boss + Passkey-capable auth library).
4. Bottom bar: 5 slots with center Add (proposed) vs 4 tabs + centered FAB.
5. LLM provider and monthly budget; whether any AI processing must stay on the owner's server.
6. Email provider for password reset and digests.
7. FX source: confirm availability and terms of the chosen API (see §7.1).
8. Off-host backup destination.
9. Does "Full" visibility ever include itemized data? (Recommended: never.)
10. Who may create party invites: owner only, or any member?
11. Buddhist-era date display option.
12. Banks for statement CSV import (Later).
13. Owner's current development OS/shell (earlier work was on Windows/PowerShell).

---

## 15. Appendices

### A. Scheduled jobs (all times `Asia/Bangkok`) [PROPOSED]

| Job | Schedule | Notes |
|---|---|---|
| `fx.fetch` | daily early morning + on startup if stale | retry with backoff; chain fallbacks |
| `subscriptions.sweep` | hourly + 00:05 | idempotent; catch-up |
| `reminders.dispatch` | every 5 min | creates inbox items, then other channels |
| `streak.rollover` | daily 00:10 | consumes freezes or resets |
| `stats.recompute` | event-driven + nightly | updates `user_stats`, badges |
| `weekly.close` | Monday 00:00 | weekly board winner |
| `ledger.consistency` | nightly | report mismatches |
| `backup.run` | daily ~03:00 | encrypt, checksum, copy off-host |
| `cleanup` | weekly | expired invites, sessions, AI drafts |

### B. Environment variables (names only — never commit values)
`DATABASE_URL`, `SESSION_SECRET`, `APP_BASE_URL`, `CLOUDFLARE_TUNNEL_TOKEN`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `FX_PROVIDER`, `FX_PROVIDER_KEY` (if any), `LLM_PROVIDER`, `LLM_API_KEY`, `EMAIL_PROVIDER`, `EMAIL_API_KEY`, `TELEGRAM_BOT_TOKEN` (owner only, optional), `BACKUP_ENCRYPTION_RECIPIENT`, `BACKUP_REMOTE_TARGET`.

### C. What was reused from AEGIS (traceability)

| AEGIS finding | Applied in GisSino |
|---|---|
| Missing ownership check on a delete endpoint | §5.5 mandatory owner-scoped data layer + BOLA tests |
| Separate stack, volumes, non-root, read-only FS, `cap_drop ALL`, no host ports | §4.2 |
| Docker bridge hides client IP; forged `X-Forwarded-For` | §3.4 |
| Default deny firewall, SSH key-only, Twingate for admin | §4.2 |
| Backups with SHA-256, real restore test, off-host copy | §11 |
| Fabricated UI data / false "saved" toasts / misleading comments | Guide §4.5, §14.4–5; §12 |
| Seed credentials without forced reset | §5.4 no default credentials |
| Limits: single server, no RAID, manual backup | §11 explicit risk note |

## Change log

- 2026-10-16 — Added vault metadata and a navigation supersession note that points to [D23](../project/DECISIONS.md#d23--primary-navigation-model) for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).

- 2026-10-17 — Added [D27](../project/DECISIONS.md#d27--owner-requested-pre-home-preview-revision) pre-Home preview routing without changing production architecture or original flow history.

- 2026-10-17 — Added scoped D28/S4 presentation notice; production invite-only security contract and historical invite design remain preserved pending separate public-signup/Google approval before M1.

- 2026-10-18 — D30/owner Compact Home revision updates §8.1 presentation and adds explicit §7.7 M7 backlog; current production qualifying-action/Party boundaries remain unchanged. [S2](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md).

- 2026-10-18 — Owner [Home S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) reconciles seven-day Due soon, Home Safe removal with retained math and missing activity versus frozen days; other contracts preserved.
