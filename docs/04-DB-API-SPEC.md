# Udaan — Database & API Specification

## 1. Database Schema (PostgreSQL / Prisma)

### `user`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| email | string, unique | |
| password_hash | string, nullable | null if OAuth-only |
| role | enum(student, admin, institution) | default: student |
| created_at / updated_at | timestamp | |

### `student_profile`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → user.id, unique | 1:1 |
| education_level | enum(SEE, PLUS2, DIPLOMA, BACHELOR, MASTER, OTHER) | |
| institution_id | uuid FK → institution.id, nullable | |
| stream | string, nullable | Science/Management/Humanities/etc |
| academic_score | decimal, nullable | GPA/percentage |
| province | string | |
| district | string | |
| municipality | string, nullable | |
| interests | string[] | fields of interest |
| career_goals | string[] | |
| preferred_locations | string[] | |
| budget_preference | enum(LOW, MEDIUM, HIGH, ANY), nullable | |
| scholarship_interest | boolean | default true |
| created_at / updated_at | timestamp | |

### `institution`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| name | string | |
| type | enum(SCHOOL, COLLEGE, UNIVERSITY, INSTITUTE) | |
| province / district / municipality | string | |
| affiliation | string, nullable | |
| official_url | string | |
| phone / email | string, nullable | |
| verification_status | enum(VERIFIED, SECONDARY_VERIFIED, REVIEW_REQUIRED, UNVERIFIED) | |
| last_verified_at | timestamp | |
| created_at / updated_at | timestamp | |

### `program` (course offered at an institution)
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| institution_id | uuid FK | |
| name | string | e.g. "BSc CSIT" |
| level | enum | matches education_level scale |
| faculty | string | |
| duration_months | int | |
| fee_amount | decimal, nullable | only if officially verified |
| created_at / updated_at | timestamp | |

### `opportunity` (scholarship / admission entry)
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| title | string | |
| slug | string, unique | for SEO URL |
| type | enum(SCHOLARSHIP, ADMISSION) | |
| provider_id | uuid FK → institution.id, nullable | |
| education_level | enum | |
| field | string | Science/IT/Engineering/etc |
| description | text | |
| eligibility_summary | text | plain-language summary |
| benefits | string[] | Full tuition/Partial/Cash grant/Fee waiver/Other |
| deadline | timestamp, nullable | |
| application_url | string | official link |
| source_id | uuid FK → source.id | |
| verification_status | enum(VERIFIED, SECONDARY_VERIFIED, REVIEW_REQUIRED, UNVERIFIED, EXPIRED) | |
| last_verified_at | timestamp | |
| next_verification_at | timestamp | |
| created_at / updated_at | timestamp | |

### `eligibility_rule`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| opportunity_id | uuid FK | |
| rule_type | string | e.g. education_level, gpa, location |
| operator | enum(EQ, GTE, LTE, IN) | |
| value | string | |
| source_reference | string, nullable | |

### `career_path`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| slug | string, unique | |
| title | string | |
| overview | text | |
| relevant_subjects | string[] | |
| related_programs | uuid[] FK → program.id | |
| created_at / updated_at | timestamp | |

### `application`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK | |
| opportunity_id | uuid FK | |
| status | enum(INTERESTED, SAVED, PREPARING, READY, APPLIED, UNDER_REVIEW, SELECTED, NOT_SELECTED) | |
| notes | text, nullable | |
| deadline | timestamp, nullable | copied at save time so it survives opportunity edits |
| created_at / updated_at | timestamp | |

### `application_checklist_item`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| application_id | uuid FK | |
| label | string | e.g. "Transcript" |
| required | boolean | |
| completed | boolean | default false |

### `source`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| organization | string | |
| url | string | |
| source_type | enum(OFFICIAL, SECONDARY, NEWS_SOCIAL) | Tier 1/2/3 |
| authority_level | int | |
| last_checked | timestamp | |
| reliability | decimal, nullable | 0–1 internal score |

### `notification`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK | |
| type | enum(DEADLINE, NEW_MATCH, APPLICATION, SYSTEM) | |
| message | string | |
| read | boolean | default false |
| created_at | timestamp | |

### `report` (user-submitted correction)
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK, nullable | anonymous reports allowed |
| opportunity_id | uuid FK, nullable | |
| institution_id | uuid FK, nullable | |
| reason | enum(WRONG_DEADLINE, WRONG_ELIGIBILITY, EXPIRED, BROKEN_URL, WRONG_INSTITUTION, SUSPICIOUS, OTHER) | |
| details | text, nullable | |
| status | enum(NEW, IN_REVIEW, RESOLVED, REJECTED) | default NEW |
| created_at / updated_at | timestamp | |

### `audit_log`
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| actor_user_id | uuid FK | |
| entity_type | string | e.g. "opportunity" |
| entity_id | uuid | |
| action | string | create/update/verify/expire |
| previous_value | jsonb, nullable | |
| new_value | jsonb, nullable | |
| created_at | timestamp | |

### Relationships summary
`user 1:1 student_profile` · `institution 1:N program` · `institution 1:N opportunity (as provider)` · `opportunity 1:N eligibility_rule` · `opportunity N:1 source` · `user 1:N application` · `application 1:1 opportunity` · `application 1:N application_checklist_item` · `user 1:N notification` · `user 1:N report`

## 2. API Endpoints

### Public (no auth)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/opportunities` | List/filter/search scholarships & admissions |
| GET | `/api/opportunities/:slug` | Opportunity detail |
| GET | `/api/institutions` | List/filter colleges |
| GET | `/api/institutions/:slug` | Institution detail |
| GET | `/api/programs` | List/filter courses |
| GET | `/api/careers` | List career paths |
| GET | `/api/careers/:slug` | Career path detail |
| POST | `/api/reports` | Submit a data-correction report (anonymous allowed, rate-limited) |

### Authenticated (student)
| Method | Endpoint | Description |
|---|---|---|
| GET/PUT | `/api/profile` | Read/update own student profile |
| DELETE | `/api/profile` | Delete own profile data |
| GET | `/api/recommendations` | Personalized, scored opportunity list |
| GET | `/api/recommendations/:opportunityId/explain` | "Why did I get this?" breakdown |
| POST/DELETE | `/api/saved/:opportunityId` | Save / unsave an opportunity |
| GET | `/api/applications` | List own tracked applications |
| POST | `/api/applications` | Start tracking an opportunity |
| PATCH | `/api/applications/:id` | Update status/notes/checklist |
| GET | `/api/notifications` | List own notifications |
| PATCH | `/api/notifications/:id` | Mark read |
| POST | `/api/ai/advisor` | Send a message to the AI Advisor (session-scoped) |

### Admin (role = admin)
| Method | Endpoint | Description |
|---|---|---|
| POST/PUT/DELETE | `/api/admin/opportunities/:id?` | CRUD opportunities |
| POST/PUT/DELETE | `/api/admin/institutions/:id?` | CRUD institutions |
| GET | `/api/admin/verification-queue` | Prioritized queue (deadline proximity, saves, reports, conflicts) |
| PATCH | `/api/admin/opportunities/:id/verify` | Set verification status, logs to audit_log |
| GET/PATCH | `/api/admin/reports` | Review/resolve user reports |
| GET | `/api/admin/audit-log` | Full change history |
| GET | `/api/admin/analytics` | Funnel/retention/engagement metrics |

## 3. Request/Response Structure

Standard success shape:
```json
{ "data": { ... }, "meta": { "page": 1, "pageSize": 20, "total": 134 } }
```
Standard error shape:
```json
{ "error": { "code": "NOT_FOUND", "message": "Opportunity not found" } }
```

Example — `GET /api/opportunities?education_level=PLUS2&field=SCIENCE&status=OPEN`
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "...",
      "provider": "...",
      "educationLevel": "PLUS2",
      "deadline": "2026-09-12T00:00:00Z",
      "benefit": "FULL_TUITION",
      "verificationStatus": "VERIFIED",
      "matchScore": null
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 42 }
}
```

Example — `POST /api/ai/advisor`
```json
// Request
{ "message": "SEE पछि के गर्ने?", "sessionId": "uuid" }

// Response
{
  "data": {
    "answer": "...",
    "reasons": ["Education level fits", "Field matches", "Location eligible"],
    "sources": [{ "organization": "MoEST", "url": "...", "lastVerified": "2026-08-20" }],
    "nextStep": { "label": "View requirements", "href": "/scholarships/xyz" },
    "confidence": "VERIFIED" 
  }
}
```

## 4. Permissions

| Resource | Public | Student (self) | Admin |
|---|---|---|---|
| Opportunities/Institutions/Programs/Careers (read) | ✅ | ✅ | ✅ |
| Opportunities/Institutions (write) | ❌ | ❌ | ✅ |
| student_profile | ❌ | ✅ own only | ✅ read for support, logged |
| application / checklist | ❌ | ✅ own only | ✅ read-only |
| notification | ❌ | ✅ own only | ❌ |
| report (create) | ✅ | ✅ | ✅ |
| report (review/resolve) | ❌ | ❌ | ✅ |
| audit_log | ❌ | ❌ | ✅ |
| analytics | ❌ | ❌ | ✅ |

All self-scoped resources are enforced server-side by matching `session.user.id` against the record's `user_id` — never by trusting a client-supplied user id.
