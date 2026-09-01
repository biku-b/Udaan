# Udaan — Technical Requirements Document (TRD)

## 1. Recommended Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14+ (App Router), React, TypeScript | SEO (SSR/ISR), fast routing, scalable, huge ecosystem |
| Styling | Tailwind CSS | Fast, consistent design-system enforcement |
| Backend | Node.js + TypeScript (built inside Next.js API routes / Route Handlers for MVP) | One deployable unit at MVP scale; extract to separate service later if needed |
| Database | PostgreSQL (managed — e.g. Supabase, Neon, or RDS) | Relational integrity for eligibility rules, applications, audit logs |
| ORM | Prisma | Type-safe schema, migrations, good DX |
| Auth | Auth.js (NextAuth) with Google OAuth + email/password credentials | Avoids vendor lock-in vs. pure Firebase; works natively with Next.js |
| AI | Anthropic Claude API (tool-use / function-calling) + retrieval layer over Udaan's own Postgres data | Grounded answers, tool-based access to verified data only |
| Search | Postgres full-text search (MVP) → dedicated search index (e.g. Meilisearch/Typesense) if scale demands | Avoid premature infra complexity |
| File/image storage | S3-compatible object storage (e.g. Cloudflare R2 / AWS S3) | Institution logos, documents later |
| Hosting | Vercel (frontend + API routes) + managed Postgres provider | Fast global edge delivery, low ops overhead for a solo/small team |
| Notifications | Email (Resend/SendGrid) at MVP; push later in mobile app | Keep MVP notification channel simple |
| Analytics | PostHog or Plausible + custom event logging into Postgres | Funnel/retention tracking without heavy vendor lock-in |

## 2. Frontend Architecture

- **Rendering strategy:** Static/ISR for public opportunity, college, course, and career pages (SEO-critical, low churn). Server-side rendering for personalized dashboard/profile/applications. Client components only where interactivity requires it (filters, AI chat, checklists).
- **Component model:** Reusable UI primitives (Card, Badge, MatchScore, VerificationTag, DeadlinePill, Filters, EmptyState) shared across all directory pages — do not fork per-entity-type components.
- **State management:** Server state via React Server Components + fetch caching; client state via React state/Zustand only where necessary (filters, AI chat session, checklist toggles). No Redux.
- **i18n:** next-intl or equivalent, with English/Nepali locale files; AI input normalization handles Roman Nepali separately from UI locale.

## 3. Backend Architecture

- **API style:** REST-ish Route Handlers under `/api/*` for MVP (simplicity); document as OpenAPI so a future dedicated backend/service split is easy.
- **Layering:** Route Handler → Service layer (business logic: matching, eligibility scoring, verification workflow) → Repository layer (Prisma queries). Never put business logic directly in route handlers.
- **Matching engine:** implemented as a pure, testable scoring function taking `(studentProfile, opportunity, eligibilityRules) → { score, breakdown, reasons[] }`. Configurable weights (see PRD §Recommendation Output) stored in a config table, not hardcoded, so they can be tuned without a deploy.
- **AI service:** a dedicated module that (a) retrieves relevant structured Udaan data + eligibility rules for the user's query, (b) calls Claude with that retrieved context plus tool definitions (`search_opportunities`, `get_opportunity`, `check_eligibility`, `search_institutions`, `get_deadlines`, `get_student_profile`, `create_reminder`), (c) never lets model output silently invent a deadline or source — every factual claim must trace to a tool result.
- **Background jobs:** scheduled jobs (cron via Vercel Cron or a queue like Inngest) for: verification-queue prioritization, deadline reminder dispatch, `next_verification_at` sweeps, expiring opportunities to `EXPIRED`.

## 4. Database

PostgreSQL, managed via Prisma migrations. See `04-DB-API-SPEC.md` for full schema. Key principles:
- Separate **Authentication**, **Student Profile**, and **Application Data** into distinct tables/domains (per PRD §88) to keep account system decoupled from evolving product data.
- Every content table (opportunity, institution) carries `verification_status`, `last_verified_at`, `next_verification_at`, `source_id`.
- Soft-delete (`deleted_at`) on user-facing content; hard audit trail on admin edits via `audit_log`.

## 5. Authentication

- Auth.js with two providers at launch: Google OAuth, email/password (credentials provider with hashed passwords via bcrypt/argon2).
- Session strategy: JWT session for stateless API routes; refresh via Auth.js defaults.
- RBAC: `role` enum on `user` (`student`, `admin`, `institution` [future]) — admin routes gated by middleware checking role, never by client-side checks alone.
- Public content requires no auth; personalized/admin routes require session + role check server-side on every request.

## 6. APIs

Full endpoint list in `04-DB-API-SPEC.md`. Grouped as:
- `/api/opportunities/*` — public read, admin write
- `/api/institutions/*` — public read, admin write
- `/api/profile/*` — authenticated read/write, self-only
- `/api/applications/*` — authenticated, self-only
- `/api/ai/advisor` — authenticated (and a rate-limited anonymous preview mode)
- `/api/admin/*` — admin-only (verification queue, reports, audit log, analytics)
- `/api/reports` — authenticated, create-only for users; admin manages

## 7. Third-Party Services

- **Anthropic Claude API** — AI Advisor.
- **Auth provider** — Google OAuth console app.
- **Email delivery** — Resend or SendGrid for deadline/notification emails.
- **Object storage** — S3-compatible, for institution/opportunity images.
- **Analytics** — PostHog/Plausible.
- **Error tracking** — Sentry.

## 8. Folder / Project Structure

```
udaan/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # Home
│   │   ├── scholarships/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── colleges/
│   │   ├── courses/
│   │   ├── admissions/
│   │   ├── careers/
│   │   ├── ai-advisor/
│   │   └── trust/
│   ├── (auth)/
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── applications/page.tsx
│   │   └── saved/page.tsx
│   ├── admin/
│   │   ├── opportunities/
│   │   ├── institutions/
│   │   ├── verification/
│   │   ├── reports/
│   │   ├── analytics/
│   │   └── audit-log/
│   └── api/
│       ├── opportunities/
│       ├── institutions/
│       ├── profile/
│       ├── applications/
│       ├── ai/advisor/route.ts
│       ├── admin/
│       └── reports/
├── components/
│   ├── ui/                # design-system primitives
│   ├── directory/         # shared card/filter/list components
│   └── advisor/
├── lib/
│   ├── db/                 # Prisma client + repositories
│   ├── matching/            # scoring engine
│   ├── ai/                  # Claude integration + tool defs
│   ├── auth/
│   └── validation/          # zod schemas
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── locales/
│   ├── en.json
│   └── ne.json
└── tests/
```

## 9. Security Requirements

- HTTPS everywhere; HSTS enabled.
- All admin routes require server-side role check (never trust client role claims).
- Input validation with zod on every API boundary; never trust client-submitted eligibility/verification fields.
- Rate limiting on `/api/ai/advisor` and auth endpoints.
- Secrets (DB URL, Claude API key, OAuth secrets) only in environment variables, never committed; managed via the hosting provider's secret store.
- Least-privilege DB roles: application DB user should not have superuser/DDL privileges in production.
- No sensitive ID documents (NID/citizenship) stored by default in MVP, per PRD §90.
- Minor-safety: no public student profiles; no direct student-to-student contact features.

## 10. Error Handling

- Consistent API error shape: `{ error: { code, message, details? } }` with correct HTTP status codes.
- User-facing errors are friendly and actionable ("We couldn't verify this deadline — check the official link"); internal errors are logged to Sentry with correlation IDs, never leaking stack traces to the client.
- AI Advisor failure mode: on retrieval/tool failure, respond with "I can't confirm this from available sources" rather than falling back to unsupported model claims.

## 11. Performance

- Target Largest Contentful Paint < 2.5s on 3G-equivalent mobile for public pages.
- ISR revalidation windows tuned per content type (e.g. opportunity pages revalidate on verification update via on-demand revalidation, not fixed polling).
- Image optimization via Next.js `<Image>`, served from object storage/CDN.
- Database indexes on all filter columns (education_level, field, province, district, status, deadline).

## 12. Deployment Architecture

- Git-based CI/CD: push to `main` → preview deploy → manual promote to production (Vercel).
- Environments: `local`, `preview`, `production` — separate databases per environment, never share prod DB with preview.
- Database migrations run as a required CI step before deploy; no manual prod schema edits.
- Rollback: keep the previous deployment pinned/available for instant rollback in the hosting provider.

## 13. Environment Variables

```
DATABASE_URL=
DIRECT_DATABASE_URL=            # for Prisma migrations if pooling is used
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ANTHROPIC_API_KEY=
EMAIL_PROVIDER_API_KEY=
OBJECT_STORAGE_ACCESS_KEY=
OBJECT_STORAGE_SECRET_KEY=
OBJECT_STORAGE_BUCKET=
SENTRY_DSN=
ANALYTICS_KEY=
```
All secrets are set per-environment in the hosting provider's dashboard, never hardcoded, never logged.
