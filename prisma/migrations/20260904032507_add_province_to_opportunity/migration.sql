-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'admin', 'institution');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('SEE', 'PLUS2', 'DIPLOMA', 'BACHELOR', 'MASTER', 'OTHER');

-- CreateEnum
CREATE TYPE "BudgetPreference" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'ANY');

-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('SCHOOL', 'COLLEGE', 'UNIVERSITY', 'INSTITUTE');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'SECONDARY_VERIFIED', 'REVIEW_REQUIRED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "OpportunityVerificationStatus" AS ENUM ('VERIFIED', 'SECONDARY_VERIFIED', 'REVIEW_REQUIRED', 'UNVERIFIED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('SCHOLARSHIP', 'ADMISSION');

-- CreateEnum
CREATE TYPE "RuleOperator" AS ENUM ('EQ', 'GTE', 'LTE', 'IN');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('INTERESTED', 'SAVED', 'PREPARING', 'READY', 'APPLIED', 'UNDER_REVIEW', 'SELECTED', 'NOT_SELECTED');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('OFFICIAL', 'SECONDARY', 'NEWS_SOCIAL');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('DEADLINE', 'NEW_MATCH', 'APPLICATION', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('WRONG_DEADLINE', 'WRONG_ELIGIBILITY', 'EXPIRED', 'BROKEN_URL', 'WRONG_INSTITUTION', 'SUSPICIOUS', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('NEW', 'IN_REVIEW', 'RESOLVED', 'REJECTED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'student',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "student_profile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "education_level" "EducationLevel" NOT NULL,
    "institution_id" TEXT,
    "stream" TEXT,
    "academic_score" DECIMAL(65,30),
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "municipality" TEXT,
    "interests" TEXT[],
    "career_goals" TEXT[],
    "preferred_locations" TEXT[],
    "budget_preference" "BudgetPreference",
    "scholarship_interest" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "InstitutionType" NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "municipality" TEXT,
    "affiliation" TEXT,
    "official_url" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "verification_status" "VerificationStatus" NOT NULL,
    "last_verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "EducationLevel" NOT NULL,
    "faculty" TEXT NOT NULL,
    "duration_months" INTEGER NOT NULL,
    "fee_amount" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "OpportunityType" NOT NULL,
    "provider_id" TEXT,
    "education_level" "EducationLevel" NOT NULL,
    "province" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eligibility_summary" TEXT NOT NULL,
    "benefits" TEXT[],
    "deadline" TIMESTAMP(3),
    "application_url" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "verification_status" "OpportunityVerificationStatus" NOT NULL,
    "last_verified_at" TIMESTAMP(3) NOT NULL,
    "next_verification_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eligibility_rule" (
    "id" TEXT NOT NULL,
    "opportunity_id" TEXT NOT NULL,
    "rule_type" TEXT NOT NULL,
    "operator" "RuleOperator" NOT NULL,
    "value" TEXT NOT NULL,
    "source_reference" TEXT,

    CONSTRAINT "eligibility_rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_path" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "relevant_subjects" TEXT[],
    "related_programs" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_path_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "opportunity_id" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "notes" TEXT,
    "deadline" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_checklist_item" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "application_checklist_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source" (
    "id" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source_type" "SourceType" NOT NULL,
    "authority_level" INTEGER NOT NULL,
    "last_checked" TIMESTAMP(3) NOT NULL,
    "reliability" DECIMAL(65,30),

    CONSTRAINT "source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "opportunity_id" TEXT,
    "institution_id" TEXT,
    "reason" "ReportReason" NOT NULL,
    "details" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "actor_user_id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "previous_value" JSONB,
    "new_value" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "student_profile_user_id_key" ON "student_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_slug_key" ON "opportunity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "career_path_slug_key" ON "career_path"("slug");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profile" ADD CONSTRAINT "student_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profile" ADD CONSTRAINT "student_profile_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program" ADD CONSTRAINT "program_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eligibility_rule" ADD CONSTRAINT "eligibility_rule_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_checklist_item" ADD CONSTRAINT "application_checklist_item_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
