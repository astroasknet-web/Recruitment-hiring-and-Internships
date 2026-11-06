/**
 * YugtyJobs home page content. The sample listings, companies and counts are ILLUSTRATIVE placeholders, labelled as such on the page;
 * replace them with live data when the jobs API is connected. Nothing here is a verified business claim.
 */

export const BRAND = { name: "YugtyJobs", tagline: "Jobs and internships, verified." };

const env = (v: string | undefined, fallback: string) => (v && /^https?:\/\/\S+$/i.test(v.trim()) ? v.trim() : fallback);

/** Where candidates browse openings. Set NEXT_PUBLIC_APP_URL_INTERNSHIPS to the internships app; until then they are sent to sign-up. */
export const OPENINGS_URL = env(process.env.NEXT_PUBLIC_APP_URL_INTERNSHIPS, "/signup?role=candidate");

export type Item = { name: string; text: string; href: string };

export const CATEGORIES: { name: string; count: string; icon: string }[] = [
  { name: "Software and IT", count: "Engineering, QA, DevOps", icon: "</>" },
  { name: "Data and AI", count: "Analytics, ML, BI", icon: "AI" },
  { name: "Design", count: "UI, UX, graphics", icon: "Dz" },
  { name: "Marketing", count: "Digital, content, SEO", icon: "Mk" },
  { name: "Sales and Business", count: "Sales, growth, operations", icon: "Bz" },
  { name: "Finance", count: "Accounts, audit, banking", icon: "Fn" },
  { name: "Teaching and Education", count: "Tutors, trainers, academic", icon: "Ed" },
  { name: "Healthcare", count: "Clinical and admin", icon: "Hc" },
];

export type Listing = { title: string; company: string; place: string; kind: "Job" | "Internship"; mode: string; pay: string; tags: string[]; score: number; mark: string };

export const LISTINGS: Listing[] = [
  { title: "Frontend Developer", company: "Northwind Labs", place: "Bengaluru", kind: "Job", mode: "Hybrid", pay: "₹8–14 LPA", tags: ["React", "TypeScript"], score: 60, mark: "NL" },
  { title: "Data Analyst Intern", company: "Brightpath Analytics", place: "Remote", kind: "Internship", mode: "Remote", pay: "₹15–20k / month", tags: ["Excel", "SQL"], score: 40, mark: "BA" },
  { title: "Product Designer", company: "Kiteworks Studio", place: "Pune", kind: "Job", mode: "On-site", pay: "₹7–12 LPA", tags: ["Figma", "Research"], score: 60, mark: "KS" },
  { title: "Marketing Intern", company: "Lumen Retail", place: "Delhi NCR", kind: "Internship", mode: "Hybrid", pay: "₹10–12k / month", tags: ["Content", "Social"], score: 40, mark: "LR" },
  { title: "Backend Engineer", company: "Orbit Payments", place: "Hyderabad", kind: "Job", mode: "Hybrid", pay: "₹12–22 LPA", tags: ["Node.js", "MySQL"], score: 70, mark: "OP" },
  { title: "HR Operations Intern", company: "Meridian Group", place: "Mumbai", kind: "Internship", mode: "On-site", pay: "₹8–10k / month", tags: ["Recruiting", "Excel"], score: 40, mark: "MG" },
];

export const HIRE_PIPELINE: Item[] = [
  { name: "QR Score", text: "A free resume score out of 100 in seconds, with a grade and your three biggest fixes.", href: "/signup?role=candidate" },
  { name: "Resume Studio", text: "45 template and style combinations, live scoring and an ATS-aware export.", href: "/studio" },
  { name: "Skill Passport", text: "Scored, proctored proof that any employer can scan with a QR code.", href: "/passport" },
  { name: "Apply", text: "Verified employers and no application fees, with every stage in one place.", href: OPENINGS_URL },
  { name: "Application tracker", text: "See every stage of your application and every employer response.", href: "/applications" },
];

export const EMPLOYERS: Item[] = [
  { name: "Post a role", text: "Publish a job or an internship and reach screened, scored candidates. New companies are verified before roles go live.", href: "/employer/post" },
  { name: "Employer dashboard", text: "Applicants ranked by match score and a pipeline board to move each candidate to an offer.", href: "/employer" },
  { name: "AI recruiter", text: "Automated screening and shortlisting for busy hiring teams.", href: "/enterprise/ai-recruiter" },
];

export const FAQS: [string, string][] = [
  ["What is the QR Score?", "A free resume score out of 100 with a grade and your three biggest fixes. You can see it without signing up."],
  ["Are jobs and internships free to apply to?", "Yes. Employers are verified and there are no application fees."],
  ["How do employers get verified?", "New companies are checked before their roles go live, so candidates only see real openings."],
  ["Is my personal data used to train AI models?", "No. Your personal data is never used to train AI models."],
];

export const HIRE_QR_STEPS: {
  label: string;
  text: string;
  delta: number;
  cat: "resume" | "course" | "skill" | "interview";
  skills?: string[];
  course?: string;
  interview?: string;
  strength?: number;
}[] = [
  { label: "Resume scanned", text: "Skills and experience are read from the resume and the QR starts to form.", delta: 38, cat: "resume", skills: ["Communication", "Excel", "Teamwork"], strength: 42 },
  { label: "Course completed", text: "A finished course and its certificate join the QR.", delta: 9, cat: "course", course: "Data analysis · certificate" },
  { label: "Skill developed", text: "A tested skill is added to the Skill Passport.", delta: 8, cat: "skill", skills: ["Python basics"], strength: 58 },
  { label: "AI interview practised", text: "The AI Interviewer scores a mock interview and the result is recorded.", delta: 10, cat: "interview", interview: "AI Interview · session 1" },
  { label: "Resume refined", text: "AI feedback is applied and the resume gets stronger.", delta: 7, cat: "resume", strength: 84 },
  { label: "Project and second interview", text: "More proof makes the QR denser and easier for employers to trust.", delta: 9, cat: "interview", course: "Capstone project", interview: "AI Interview · session 2", strength: 92 },
];

/** Opportunities that open up as the sample score rises. The thresholds are illustrative. */
export const HIRE_QR_UNLOCKS: { at: number; label: string }[] = [
  { at: 40, label: "Internships" },
  { at: 60, label: "Jobs" },
  { at: 70, label: "Global roles" },
];
