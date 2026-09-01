# Udaan — Development Roadmap

Estimates assume a small team (1–3 builders) working with Claude Code as the implementation partner. Timeframes are planning targets, not guarantees — validate as you go and cut scope before you slip dates.

## Pre-Phase 0 — Research (do not skip)
- 30–50 student interviews; competitor teardown (Edusanjal, Collegenp); manually collect 100–300 real opportunities and classify them (source, eligibility, deadline, benefit, verification, status).
- Output: a validated information architecture and a seed dataset — this becomes your first real content, not filler.

## Phase 1 — Project Setup
- Repo scaffold (Next.js + TypeScript + Tailwind + Prisma), CI pipeline, environment separation (local/preview/prod), base folder structure per TRD §8.
- Design tokens implemented (colors, type, spacing) per UI/UX spec.
- **Exit criteria:** empty app deploys successfully to preview with working CI.

## Phase 2 — Core UI
- Build shared component library: OpportunityCard, CollegeCard, MatchScoreBadge, VerificationBadge, DeadlinePill, FilterPanel, EmptyState.
- Build static public pages (Home, Scholarships, Colleges, Courses, Admissions, Careers) against seed data, no personalization yet.
- **Exit criteria:** a student can browse and filter real seed opportunities on mobile and desktop.

## Phase 3 — Authentication
- Auth.js with Google OAuth + email/password; session handling; role field on user.
- Public vs. authenticated route gating.
- **Exit criteria:** a user can sign up, log in, log out; admin role is distinguishable and gated.

## Phase 4 — Backend / Database
- Full Prisma schema per DB spec; migrations; seed script for pilot data.
- Repository layer + service layer scaffolding (matching engine stub, verification workflow stub).
- **Exit criteria:** all core entities persisted and queryable through the API layer, covered by basic tests.

## Phase 5 — Core Features
- Student profile CRUD + "what Udaan knows about you" view.
- Matching engine (scoring function + explanation breakdown) wired to `/api/recommendations`.
- Application tracker + checklist + deadline reminders (email).
- AI Advisor: retrieval-grounded Claude integration with tool defs, confidence/uncertainty handling.
- Admin CMS: opportunity/institution CRUD, verification queue, reports workflow, audit log.
- Dashboard "Your Next 3 Steps."
- **Exit criteria:** the full Definition-of-Done flow from the PRD (§145) works end-to-end for a real student.

## Phase 6 — Testing
- Unit tests for matching engine and eligibility rule evaluation (these are the trust-critical paths — test them hardest).
- Integration tests for auth-gated and admin-gated routes (permission boundaries).
- AI evaluation set: run the test questions from PRD §132 against the advisor and score factual accuracy, source correctness, and uncertainty handling.
- Manual QA pass per PRD §131 (functional, data, AI, security, responsive).
- **Exit criteria:** AI advisor meets the quality threshold in PRD §133 before any expanded rollout.

## Phase 7 — Polish
- Empty/loading/error states across all views (per UI/UX spec §10).
- Accessibility pass (keyboard nav, contrast, screen-reader labels).
- SEO metadata, structured data, sitemap generation for all indexable pages.
- Performance pass: image optimization, ISR tuning, Lighthouse audit on 3G-equivalent throttling.
- Nepali localization pass.
- **Exit criteria:** product feels trustworthy and complete to a first-time student, not just "functional."

## Phase 8 — Deployment / Closed Beta
- Production environment cutover, monitoring (Sentry, analytics) live.
- Closed beta with the first ~100 students (personal network → school/college partnerships → student communities → organic), per PRD §124.
- Track North Star Metric and kill-criteria signals weekly.
- **Exit criteria:** clear go/no-go decision on scaling past the pilot, based on real usage data — not sunk cost.

## Post-MVP (V2+, only after pilot validates)
V2: college comparison tool, richer matching, tracker improvements.
V3: multi-step AI agent (autonomous search→verify→match→rank→remind), personalized pathway planner.
V4: institution self-service portal, counselor tools, mobile app (Android first).
