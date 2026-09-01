# Udaan — Product Requirements Document (PRD)

**Tagline:** Know your path. Find your opportunity.
**Category:** AI-powered Education & Opportunity Navigator
**Launch strategy:** Website → Validation → Mobile App
**Market:** Nepal (Kathmandu Valley first → nationwide)
**Version:** 1.0 (build-ready, condensed from Master PRD v2.0)

---

## 1. Product Overview

Udaan is a Nepal-first education navigation platform. It aggregates scholarships, colleges, courses, admissions, and career pathways, then turns that raw information into a **personalized decision and action plan** for each student.

Positioning line: *"Here are the opportunities that fit you, here is why, and here is what you should do next."*

This is not a directory (Collegenp) and not a generic AI chatbot (Edusanjal already has one). The product **is** the personalization + trust + action layer on top of fragmented, low-trust information.

## 2. Problem & Solution

**Problem:** Nepali students (SEE graduates, +2 students, early Bachelor students) have access to plenty of raw information — scholarships, colleges, admissions — scattered across MoEST, CTEVT, institutions, and private aggregators. The bottleneck isn't discovery, it's the "final mile": *which of these actually fits me, and what do I do next?*

**Solution:** A profile-driven matching engine that scores opportunities against a student's academic/interest/location profile, explains the match in plain language, shows verifiable sourcing for every claim, and gives the student a concrete next action — backed by an application tracker and deadline system so nothing gets missed.

## 3. Target Users

| Segment | Stage | Primary Need |
|---|---|---|
| Segment A (launch focus) | SEE graduates deciding +2 | Stream choice, scholarships, colleges |
| Segment B | +2 students deciding Bachelor | Degree, university, entrance, scholarship |
| Segment C (post-launch) | Enrolled Bachelor students | Further study, certifications, career |
| Parents (secondary) | — | Cost visibility, comparisons, trust |
| Counselors (secondary) | — | Research/decision-support tool |
| Institutions (later) | — | Publish verified programs/admissions |

Launch wedge: **SEE → +2**, because it's the clearest, most urgent single decision point.

## 4. Goals

- Help a defined pilot cohort (target: 100 real students) make a measurably better education decision, not maximize traffic.
- Build trust through source transparency and explainable matching, not database size.
- Validate on web (SEO, zero-install, shareable) before committing to a mobile app.
- Establish the data model (Education Opportunity Graph) that becomes the long-term moat.

**North Star Metric:** Meaningful Opportunity Actions per Active Student (save, apply, shortlist, complete a checklist item, complete a pathway step).

## 5. Core Features (MVP)

1. **Opportunity discovery** — Scholarships, Colleges, Courses, Admissions, Career Paths (public, SEO-indexed).
2. **Student profile** — education level, stream, academic performance, interests, goals, location, budget preference.
3. **Matching engine** — weighted score (Eligibility 35%, Interest 20%, Academic Fit 15%, Location 10%, Goal Fit 10%, Deadline 10%) with a plain-language "why" breakdown.
4. **Trust layer** — source, source type, verification status, last-verified date on every opportunity.
5. **Application tracker** — status pipeline (Interested → Saved → Preparing → Ready → Applied → Under Review → Selected/Not Selected) with a document checklist.
6. **Deadline & notification system** — save deadlines, 7/3/1-day reminders, new-match alerts.
7. **AI Advisor (V1 scope)** — natural-language Q&A grounded strictly in Udaan's verified structured data; must cite source + last-verified date and say "I can't confirm this" when data is missing.
8. **Dashboard — "Your Next 3 Steps"** — the signature retention feature.
9. **Admin CMS** — opportunity/institution CRUD, verification queue, user reports, audit log.

## 6. User Flows

**Flow A — New student, first visit**
Land on homepage → browse public scholarship/college pages (no login) → click "Create My Education Profile" → complete profile → land on dashboard with initial matches → save an opportunity → prompted to set a deadline reminder.

**Flow B — Returning student**
Login → dashboard shows Next 3 Steps + new matches since last visit + upcoming deadlines → open a tracked application → update checklist status.

**Flow C — AI-assisted discovery**
Visit `/ai-advisor` → ask in English/Nepali/Roman Nepali (e.g. "SEE पछि के गर्ने?") → AI returns Answer → Why → Source → Last verified → Next step → offers to save results to profile.

**Flow D — Admin verification**
New opportunity ingested → lands in Verification Queue (prioritized by deadline proximity / user saves / reports) → admin confirms against official source → status set to VERIFIED/REVIEW REQUIRED → change logged to audit log.

## 7. Pages / Screens

**Public:** `/`, `/scholarships`, `/scholarships/[slug]`, `/colleges`, `/college/[slug]`, `/courses`, `/courses/[slug]`, `/admissions`, `/admissions/[slug]`, `/careers`, `/careers/[slug]`, `/ai-advisor`, `/trust`, `/about`

**Authenticated:** `/dashboard`, `/profile`, `/applications`, `/saved`, `/settings`

**Admin:** `/admin/opportunities`, `/admin/institutions`, `/admin/verification`, `/admin/reports`, `/admin/users`, `/admin/analytics`, `/admin/audit-log`

## 8. Functional Requirements

- FR1: Users can browse all public opportunity pages without an account.
- FR2: Users can create an account via Google OAuth or email/password.
- FR3: Users can build/edit/delete a student profile; the system shows "what Udaan knows about you."
- FR4: The system computes a match score and a human-readable explanation for every opportunity shown to a logged-in user with a profile.
- FR5: Every opportunity record must display source, source type, verification status, and last-verified date.
- FR6: Users can save opportunities, set deadline reminders, and track application status through a defined pipeline.
- FR7: The AI Advisor must answer only from Udaan's verified structured data + retrieved official sources; it must not use model memory for current deadlines, and must explicitly flag unverifiable claims.
- FR8: Admins can create/edit/verify/expire opportunities and institutions, and manage a verification queue with priority sorting.
- FR9: Users can report incorrect data on any opportunity; reports flow into an admin review workflow with audit logging.
- FR10: Conflicting source data must default to the official source, with the conflict surfaced in the UI.

## 9. Non-Functional Requirements

- **Performance:** fast first paint on low-bandwidth mobile connections; compressed images; lazy loading; cached public pages.
- **SEO:** every opportunity/college/course/career page must be independently indexable with structured metadata.
- **Accessibility:** WCAG-aligned — keyboard nav, visible focus states, sufficient contrast, semantic headings, screen-reader labels.
- **Localization:** English + Nepali (Devanagari) UI; AI input must also accept Roman Nepali.
- **Privacy:** designed against Nepal's Privacy Act, 2075 from day one — consent, data minimization, access control, deletion, transparent policy.
- **Security:** HTTPS, RBAC for admin, server-side validation, rate limiting, secrets management, audit logs, backups.
- **AI safety:** no autonomous high-impact actions (submitting applications, external messages, document uploads) without explicit user approval.

## 10. MVP vs. Future Features

**In MVP:** Public discovery pages, profile, matching engine, trust/verification display, application tracker, deadline reminders, AI Advisor (Q&A only, no agentic actions), admin CMS with verification queue.

**Explicitly out of MVP (V2+):** college-to-college comparison tool, advanced pathway engine, multi-step AI agent (search→verify→match→rank→remind autonomously), institution self-service portal, counselor tools, mobile app, payments/monetization, referral system.

## 11. Success Criteria (Pilot, not vanity metrics)

MVP is "done" when a new student can: discover opportunities → build a profile → get personalized matches → understand eligibility/reasoning → verify trust via sourcing → open the official application link → track the application → ask the AI advisor → see a clear next step.

Pilot target: 100 students, tracked for profile completion rate, recommendation view rate, save rate, 7/30-day return rate, and real application actions taken. These are internal learning targets, not guaranteed benchmarks — **kill criteria** apply if students don't return, don't act on recommendations, or existing platforms are found to already solve this well enough.
