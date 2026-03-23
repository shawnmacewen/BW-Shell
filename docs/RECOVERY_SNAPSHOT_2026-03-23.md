# BW-Shell Recovery Snapshot — 2026-03-23

## Purpose
Re-establish a clear source of truth after OpenClaw instability/restarts. This snapshot captures what is currently in `main`, what is mock vs closer to parity, and immediate next actions.

---

## Current Baseline
- Repo: `https://github.com/shawnmacewen/BW-Shell.git`
- Branch: `main`
- Deployment: GitHub Pages restored via workflow (publishes from `public/static`)
- OpenClaw runtime noted by Shawn: `v2026.3.8`

---

## What Was Recently Restored/Fixes to Tooling
1. Git remote ownership switched to Shawn repo.
2. Git credential flow fixed for push (including workflow-scope token requirement).
3. GitHub Pages pipeline restored after Vercel/Next.js takeover drift.
4. Pages source set to GitHub Actions; workflow now deploys `public/static`.

---

## Implemented UI/UX + Feature Work (High-Level)

### Accounts
- Account drill-in structure expanded with sub-tabs:
  - Account Details
  - Users
  - Websites
  - Activity
- Account Details:
  - account info + owner management presented in same top container
  - owner count badge
  - add/remove owner controls and owner modal scaffold
  - account type tooltip and parent account read-only behavior
- Websites tab:
  - Bind New Site modal (search + date filtering + pagination)
  - site selection leads to summary/invite flow with collaborator + role selection
  - metadata updates (Created Date + Last Updated + MSID formatting)

### Users / Roles
- Role experience switching architecture added for core personas.
- Role list consistency improved across Create User / Edit User / Roles & Permissions.
- Permissions taxonomy updates:
  - Billing separated from Content
  - Admin Tools category scaffolded/positioned
- Several role/permission UX refinements (counters/labels/indicator cleanup).

### Admin Tools
- New Bulk Upload Events area added with seeded history rows.
- Table enhancements over iterations:
  - status color pills
  - filters/search/pagination
  - uploaded by and account context columns
  - rerun action behavior (only enabled for failed statuses)
  - detail-view flow converted from modal to breadcrumbed sub-page with row-level grid details.

### Account Settings (Header Menu)
- My Profile/Preferences consolidated into Account Settings entry.
- Account Settings pages:
  - Basic Info
  - Social Network
- Mock OAuth-style connect/disconnect flows for LinkedIn/Facebook/Instagram.

### Navigation
- Help Center nav item added and pinned to far-right.

---

## Mock vs Closer-to-Parity Guidance

### Closer-to-parity (operational shell/UI behavior)
- Accounts sub-navigation and basic CRUD shells
- Users/Roles page flow and role-selection consistency
- Bulk upload operational table concept and job-detail drill-in pattern

### Explicitly mock/prototype (not final parity)
- Compliance Archive deep behavior and some compliance-linked surfaces
- Social OAuth provider integrations (visual/demo only)
- Bulk upload backend execution semantics (UI sim + mock data)
- Some account/site owner and collaborator workflows (interaction scaffolds)

---

## Known Architectural Drift to Watch
- Repo contains Next.js/Vercel-era files, while active app behavior is static under `public/static`.
- Current publishing is intentionally static Pages-driven; avoid reintroducing split deployment paths without explicit decision.

---

## Immediate Next Steps (Recommended)
1. Create a short parity board in docs (`At parity / Near parity / Mock / Deferred`) by module.
2. Lock role-permission matrix as explicit artifact and map to visible nav/actions.
3. Define Bulk Upload Events final columns and row-detail schema (for backend handoff).
4. Add one “release readiness” checklist for MVP pilot (20-user cohort).

---

## Recovery Confidence
- Source control + deployment control are back under Shawn-owned GitHub.
- Mainline feature work is present in `main` and Pages can publish again.
- Remaining risk is primarily product-scope parity clarity, not platform control.
