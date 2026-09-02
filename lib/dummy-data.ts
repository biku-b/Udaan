import { VerificationStatus } from "@/components/directory/VerificationBadge";

export interface OpportunityDummy {
  id: string;
  title: string;
  slug: string;
  type: "SCHOLARSHIP" | "ADMISSION";
  providerName: string;
  educationLevel: string;
  field: string;
  benefits: string[];
  deadline: string;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
  matchScore?: number;
  matchReasons?: string[];
  province: string;
}

export interface CollegeDummy {
  id: string;
  name: string;
  slug: string;
  type: string;
  district: string;
  province: string;
  affiliation: string;
  hasScholarships: boolean;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
}

export interface CourseDummy {
  id: string;
  title: string;
  slug: string;
  level: string;
  faculty: string;
  durationMonths: number;
  offeredByCount: number;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
}

export interface CareerDummy {
  id: string;
  title: string;
  slug: string;
  overview: string;
  relevantSubjects: string[];
  topPrograms: string[];
}

export const DUMMY_OPPORTUNITIES: OpportunityDummy[] = [
  {
    id: "1",
    title: "MoEST National Merit Scholarship 2083",
    slug: "moest-national-merit-scholarship-2083",
    type: "SCHOLARSHIP",
    providerName: "Ministry of Education, Science and Technology (MoEST)",
    educationLevel: "+2 / Higher Secondary",
    field: "Science",
    benefits: ["Full Tuition", "Monthly Stipend"],
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-25",
    matchScore: 92,
    matchReasons: ["Matches your SEE GPA", "Science stream preferred", "Bagmati Province eligible"],
    province: "Bagmati",
  },
  {
    id: "2",
    title: "CTEVT Diploma Merit & Targeted Group Scholarship",
    slug: "ctevt-diploma-merit-scholarship",
    type: "SCHOLARSHIP",
    providerName: "Council for Technical Education and Vocational Training",
    educationLevel: "Diploma",
    field: "IT & Technology",
    benefits: ["Full Tuition", "Exam Fee Waiver"],
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-20",
    matchScore: 84,
    matchReasons: ["Fits IT interest", "Targeted quota eligible"],
    province: "Koshi",
  },
  {
    id: "3",
    title: "St. Xavier's College +2 Science Entrance & Admission 2083",
    slug: "st-xaviers-plus2-science-admission",
    type: "ADMISSION",
    providerName: "St. Xavier's College",
    educationLevel: "+2 / Higher Secondary",
    field: "Science",
    benefits: ["Merit Scholarship Option"],
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-28",
    matchScore: 88,
    matchReasons: ["SEE Science track", "Located in Kathmandu"],
    province: "Bagmati",
  },
  {
    id: "4",
    title: "Pulchowk Campus BSc Engineering Entrance Notice",
    slug: "pulchowk-engineering-entrance-notice",
    type: "ADMISSION",
    providerName: "IOE, Tribhuvan University",
    educationLevel: "Bachelor",
    field: "Engineering",
    benefits: ["Regular Seats Available"],
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    verificationStatus: "SECONDARY_VERIFIED",
    lastVerifiedAt: "2026-08-15",
    province: "Bagmati",
  },
  {
    id: "5",
    title: "Gandaki Province Girl Student Higher Education Grant",
    slug: "gandaki-girl-student-grant",
    type: "SCHOLARSHIP",
    providerName: "Ministry of Education, Gandaki Province",
    educationLevel: "Bachelor",
    field: "Management",
    benefits: ["Partial Allowance"],
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // closed
    verificationStatus: "EXPIRED",
    lastVerifiedAt: "2026-07-10",
    province: "Gandaki",
  },
  {
    id: "6",
    title: "KMC Kathmandu +2 Management Entrance Scheme",
    slug: "kmc-kathmandu-plus2-management",
    type: "ADMISSION",
    providerName: "Kathmandu Model College",
    educationLevel: "+2 / Higher Secondary",
    field: "Management",
    benefits: ["Fee Waiver for Top Scorers"],
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    verificationStatus: "REVIEW_REQUIRED",
    lastVerifiedAt: "2026-08-01",
    province: "Bagmati",
  },
];

export const DUMMY_COLLEGES: CollegeDummy[] = [
  {
    id: "1",
    name: "St. Xavier's College",
    slug: "st-xaviers-college-kathmandu",
    type: "COLLEGE",
    district: "Kathmandu",
    province: "Bagmati",
    affiliation: "Tribhuvan University / NEB",
    hasScholarships: true,
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-28",
  },
  {
    id: "2",
    name: "Pulchowk Campus (IOE)",
    slug: "pulchowk-campus-ioe",
    type: "COLLEGE",
    district: "Lalitpur",
    province: "Bagmati",
    affiliation: "Tribhuvan University",
    hasScholarships: true,
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-25",
  },
  {
    id: "3",
    name: "Kathmandu Model College (KMC)",
    slug: "kathmandu-model-college",
    type: "COLLEGE",
    district: "Kathmandu",
    province: "Bagmati",
    affiliation: "Tribhuvan University / NEB",
    hasScholarships: true,
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-20",
  },
  {
    id: "4",
    name: "Prithvi Narayan Campus",
    slug: "prithvi-narayan-campus-pokhara",
    type: "COLLEGE",
    district: "Kaski",
    province: "Gandaki",
    affiliation: "Tribhuvan University",
    hasScholarships: true,
    verificationStatus: "SECONDARY_VERIFIED",
    lastVerifiedAt: "2026-08-10",
  },
];

export const DUMMY_COURSES: CourseDummy[] = [
  {
    id: "1",
    title: "BSc Computer Science & Information Technology (CSIT)",
    slug: "bsc-csit",
    level: "Bachelor",
    faculty: "Science & Technology",
    durationMonths: 48,
    offeredByCount: 62,
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-28",
  },
  {
    id: "2",
    title: "+2 Science (Physics / Biology Stream)",
    slug: "plus2-science",
    level: "+2 / Higher Secondary",
    faculty: "Science",
    durationMonths: 24,
    offeredByCount: 450,
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-28",
  },
  {
    id: "3",
    title: "Diploma in Computer Engineering",
    slug: "diploma-computer-engineering",
    level: "Diploma",
    faculty: "Engineering",
    durationMonths: 36,
    offeredByCount: 38,
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-20",
  },
  {
    id: "4",
    title: "Bachelor of Business Administration (BBA)",
    slug: "bba",
    level: "Bachelor",
    faculty: "Management",
    durationMonths: 48,
    offeredByCount: 120,
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-15",
  },
];

export const DUMMY_CAREERS: CareerDummy[] = [
  {
    id: "1",
    title: "Software Engineer / Web Developer",
    slug: "software-engineer",
    overview: "Build modern web, mobile, and software applications for local and international markets.",
    relevantSubjects: ["Computer Science", "Mathematics", "Programming"],
    topPrograms: ["BSc CSIT", "BE Computer", "BCA", "BIT"],
  },
  {
    id: "2",
    title: "Civil Engineer",
    slug: "civil-engineer",
    overview: "Design and manage infrastructure development projects including roads, bridges, and building structures across Nepal.",
    relevantSubjects: ["Physics", "Mathematics", "Structural Mechanics"],
    topPrograms: ["BE Civil", "Diploma in Civil Engineering"],
  },
  {
    id: "3",
    title: "Chartered Accountant (CA) / Finance Manager",
    slug: "chartered-accountant",
    overview: "Provide auditing, financial planning, and tax consulting services for corporations, banks, and development organizations.",
    relevantSubjects: ["Accountancy", "Economics", "Business Studies"],
    topPrograms: ["ICAN CA Course", "BBA", "BBS"],
  },
];
