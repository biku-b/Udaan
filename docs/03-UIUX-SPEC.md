# Udaan — UI/UX Specification

## 1. Design Direction

Feel: trustworthy, modern, educational, optimistic, simple, technology-enabled.
Avoid: childish graphics, excessive animation, gaming-style dashboards, gradient overload, dark patterns around signup.

Think: a calm, credible civic/edtech product (closer to a government-grade trust site crossed with a clean modern SaaS) — not a flashy consumer app.

## 2. Color System

| Token | Role | Notes |
|---|---|---|
| `--color-primary` | Brand / primary CTA | A confident blue or teal — signals trust + progress |
| `--color-primary-dark` | Hover/active states | |
| `--color-secondary` | Accent for "next step" / progress elements | Warm accent (amber/orange) used sparingly for momentum cues |
| `--color-success` | Verified / Strong match / Open status | Green |
| `--color-warning` | Review required / Upcoming deadline | Amber |
| `--color-danger` | Unverified / Closed / conflict | Red, used sparingly — never to shame the user |
| `--color-neutral-900..50` | Text/background scale | High-contrast text on light background as default theme |
| `--color-surface` | Card backgrounds | Slightly off-white, subtle elevation via shadow not color |

Verification/status colors must be used **consistently** across every card and detail page — this consistency is itself a trust signal.

## 3. Typography

- Primary typeface: a highly readable modern sans-serif with full Devanagari support (e.g. **Noto Sans** for Nepali + **Inter** for Latin, paired by locale, or a single Noto Sans family used throughout for consistency across languages).
- Scale: `text-xs` (12px) through `text-4xl` (36px) on a modular scale; headings use a slightly heavier weight (600–700), body copy 400.
- Line height generous for body text (1.6) to support readability for younger students and Devanagari script.

## 4. Spacing

- 4px base unit; standard spacing scale 4/8/12/16/24/32/48/64.
- Card padding: 16px mobile, 24px desktop.
- Section vertical rhythm: 48px mobile, 80px desktop between homepage sections.

## 5. Core Components

- **OpportunityCard** — title, provider, education level, deadline pill, benefit tag, match score (if personalized), verification badge, "View Details" CTA. Used across scholarships/admissions listings.
- **CollegeCard** — name, location, level/faculty tags, scholarship-availability flag, verification badge.
- **MatchScoreBadge** — numeric % + color-coded ring; tapping opens the "Why did I get this?" explanation panel.
- **VerificationBadge** — VERIFIED / SECONDARY VERIFIED / REVIEW REQUIRED / UNVERIFIED / EXPIRED, each with a distinct icon+color, always paired with "Last verified: [date]".
- **DeadlinePill** — color shifts as deadline approaches (neutral → amber inside 7 days → red inside 1 day).
- **FilterPanel** — collapsible on mobile (bottom sheet), persistent sidebar on desktop; supports education level, field, location, status, benefit.
- **NextStepsCard** — the dashboard's signature 3-item checklist component; each item links directly to the action.
- **SourceCitation** — inline component showing organization, source type, official URL, last-checked date — used in both opportunity pages and AI Advisor responses.
- **ChecklistItem** — for application document tracking, checkbox + label + optional "required by source" tag.
- **AdvisorMessage** — chat bubble variant that always renders Answer → Why → Source → Last Verified → Next Step as distinct sub-blocks, never as one undifferentiated paragraph.

## 6. Navigation

**Desktop top nav:** Discover · Scholarships · Colleges · Courses · Career Paths · AI Advisor · Dashboard (right-aligned, with profile avatar/login CTA).

**Mobile bottom nav:** Home · Explore · Saved · Applications · AI.

Both navs persist across all public and authenticated pages; admin uses a separate left-sidebar layout, visually distinct so admins never confuse it with the public product.

## 7. Responsive Behavior

- **Mobile (< 640px):** single-column, student-focused, filters in a bottom sheet, bottom tab bar navigation.
- **Tablet (640–1024px):** two-column card grids, collapsible sidebar filters.
- **Desktop (> 1024px):** wide layout supporting side-by-side comparison views, persistent filter sidebar, top nav.

## 8. Animations

Minimal and purposeful only: subtle fade/slide on card entry, progress-bar fill on profile completion, checkmark animation on checklist completion. No decorative motion, no auto-playing carousels that could hide time-sensitive deadline info.

## 9. Accessibility

- Full keyboard navigation with visible focus rings on every interactive element.
- Minimum WCAG AA contrast for all text/background pairs, including status badges.
- Semantic heading hierarchy (one H1 per page) and landmark regions.
- All icons/badges have text alternatives (screen-reader labels), not color-only meaning.
- Touch targets ≥ 44px on mobile.
- Forms: explicit labels (not placeholder-only), inline error messages tied to fields via `aria-describedby`.

## 10. Empty / Loading / Error States

- **Empty search results:** never a dead end — show "No exact matches. Here's what's closest" plus adjusted filters, never a blank page.
- **Empty dashboard (new user, incomplete profile):** replace recommendation sections with a single clear CTA — "Complete your profile to see matches" — not multiple competing empty-state messages.
- **Loading:** skeleton cards matching the final card layout (not spinners) for directory listings; a lightweight typing indicator for the AI Advisor.
- **Error (data fetch failure):** "We couldn't load this right now — try again" with a retry action; never expose raw error/stack content.
- **AI Advisor uncertainty state:** rendered as a distinct, calmly-styled message type — "I can't confirm this from available sources" — visually different from a normal answer so it's never mistaken for a confident claim.
