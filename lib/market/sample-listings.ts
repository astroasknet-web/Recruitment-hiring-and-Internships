import { one, run, val } from "../portal/db";

/**
 * Sample jobs and internships for demos, testing and empty environments. Every row is stored with is_sample = 1, so the pages label it
 * "Sample listing" and the admin analytics leave it out. Companies are invented. Run with `npm run seed:listings`; safe to run twice.
 * Never run this against a production database that already has real listings unless you want the samples to appear next to them.
 */
const COMPANIES = [
  { name: "Northwind Labs", color: "#2f7bff" },
  { name: "Brightpath Analytics", color: "#0e9f6e" },
  { name: "Kiteworks Studio", color: "#8b5cff" },
  { name: "Lumen Retail", color: "#e0572f" },
  { name: "Orbit Payments", color: "#0891b2" },
  { name: "Meridian Group", color: "#b45309" },
];

type Seed = {
  co: number; kind: "job" | "internship"; title: string; cat: string; loc: string; mode: "Remote" | "On-site" | "Hybrid"; pay: number; weeks?: number;
  skills: string[]; about: string; ago: number; badge?: string;
};

const S: Seed[] = [
  { co: 0, kind: "internship", title: "Frontend Developer Intern", cat: "Software & Web", loc: "Bengaluru", mode: "Hybrid", pay: 20000, weeks: 12, skills: ["React", "TypeScript", "CSS"], about: "Build screens for a hiring product used by recruiters every day, pairing with a senior engineer.", ago: 1, badge: "PPO possible" },
  { co: 0, kind: "job", title: "Frontend Developer", cat: "Software & Web", loc: "Bengaluru", mode: "Hybrid", pay: 85000, skills: ["React", "TypeScript", "Testing"], about: "Own features end to end on the web app. Two to four years of React experience is a good fit.", ago: 2 },
  { co: 0, kind: "job", title: "Backend Engineer", cat: "Software & Web", loc: "Hyderabad", mode: "Hybrid", pay: 110000, skills: ["Node.js", "MySQL", "APIs"], about: "Design and run the services behind candidate matching and the employer pipeline.", ago: 3 },
  { co: 1, kind: "internship", title: "Data Analyst Intern", cat: "Data & AI", loc: "Remote", mode: "Remote", pay: 15000, weeks: 8, skills: ["Excel", "SQL", "Power BI"], about: "Clean data, build dashboards and present weekly findings to the client team.", ago: 0, badge: "Verified stipend" },
  { co: 1, kind: "job", title: "Data Analyst", cat: "Data & AI", loc: "Pune", mode: "On-site", pay: 60000, skills: ["SQL", "Python", "Tableau"], about: "Turn messy business data into decisions. Fresh graduates with strong projects are welcome.", ago: 4 },
  { co: 1, kind: "internship", title: "Machine Learning Intern", cat: "Data & AI", loc: "Bengaluru", mode: "Hybrid", pay: 25000, weeks: 16, skills: ["Python", "scikit-learn", "Statistics"], about: "Prototype and evaluate models for churn and demand forecasting alongside the data science lead.", ago: 5, badge: "PPO possible" },
  { co: 2, kind: "internship", title: "UI/UX Design Intern", cat: "Design & Creative", loc: "Pune", mode: "On-site", pay: 12000, weeks: 12, skills: ["Figma", "Research", "Prototyping"], about: "Run small user studies and turn them into polished flows for two live products.", ago: 2 },
  { co: 2, kind: "job", title: "Product Designer", cat: "Design & Creative", loc: "Pune", mode: "Hybrid", pay: 75000, skills: ["Figma", "Design systems", "Research"], about: "Lead design for a product squad and keep the design system healthy.", ago: 6 },
  { co: 2, kind: "internship", title: "Video Editing Intern", cat: "Design & Creative", loc: "Remote", mode: "Remote", pay: 8000, weeks: 8, skills: ["Premiere Pro", "Storytelling"], about: "Cut short explainers and social clips for the brand team.", ago: 7 },
  { co: 3, kind: "internship", title: "Digital Marketing Intern", cat: "Marketing", loc: "Delhi NCR", mode: "Hybrid", pay: 10000, weeks: 12, skills: ["SEO", "Content", "Social media"], about: "Plan and publish content, track campaign numbers and learn paid ads from the growth lead.", ago: 1 },
  { co: 3, kind: "job", title: "Performance Marketing Executive", cat: "Marketing", loc: "Delhi NCR", mode: "On-site", pay: 50000, skills: ["Google Ads", "Analytics", "Copywriting"], about: "Run and optimise paid campaigns across search and social with a monthly budget you own.", ago: 8 },
  { co: 3, kind: "internship", title: "Content Writing Intern", cat: "Marketing", loc: "Remote", mode: "Remote", pay: 7000, weeks: 8, skills: ["Writing", "Editing", "SEO"], about: "Write blog posts and product copy, edited by a senior content strategist.", ago: 3 },
  { co: 4, kind: "internship", title: "Finance and Accounts Intern", cat: "Finance & Accounts", loc: "Mumbai", mode: "On-site", pay: 12000, weeks: 12, skills: ["Tally", "Excel", "GST basics"], about: "Support reconciliations, invoicing and month-end reporting for a payments company.", ago: 4 },
  { co: 4, kind: "job", title: "Financial Analyst", cat: "Finance & Accounts", loc: "Mumbai", mode: "Hybrid", pay: 90000, skills: ["Financial modelling", "Excel", "Reporting"], about: "Build forecasts and board reports with the finance head. CA inter or MBA Finance preferred.", ago: 9 },
  { co: 4, kind: "job", title: "Risk and Compliance Associate", cat: "Law & Policy", loc: "Mumbai", mode: "On-site", pay: 70000, skills: ["Compliance", "Research", "Documentation"], about: "Track regulatory changes and keep policies and audits current.", ago: 10 },
  { co: 5, kind: "internship", title: "HR Operations Intern", cat: "HR & Operations", loc: "Mumbai", mode: "On-site", pay: 9000, weeks: 12, skills: ["Recruiting", "Excel", "Communication"], about: "Screen applications, schedule interviews and keep the hiring tracker accurate.", ago: 2 },
  { co: 5, kind: "job", title: "Talent Acquisition Specialist", cat: "HR & Operations", loc: "Chennai", mode: "Hybrid", pay: 55000, skills: ["Sourcing", "Interviewing", "ATS"], about: "Own hiring for engineering and sales roles from sourcing to offer.", ago: 5 },
  { co: 5, kind: "internship", title: "Mechanical Design Intern", cat: "Core Engineering", loc: "Chennai", mode: "On-site", pay: 10000, weeks: 16, skills: ["SolidWorks", "AutoCAD", "GD&T"], about: "Help draft and review parts for a manufacturing line with a design engineer.", ago: 6 },
  { co: 5, kind: "job", title: "Operations Manager", cat: "HR & Operations", loc: "Hyderabad", mode: "On-site", pay: 95000, skills: ["Process design", "Vendor management", "Reporting"], about: "Run day-to-day operations across two sites and improve delivery times.", ago: 12 },
  { co: 1, kind: "internship", title: "Business Analyst Intern", cat: "Data & AI", loc: "Remote", mode: "Remote", pay: 12000, weeks: 12, skills: ["Excel", "Requirements", "Presentation"], about: "Write requirements and track metrics for a client analytics project.", ago: 3 },
];

const slugOf = (t: string, c: string) => `${t}-${c}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 150);

/** Inserts the samples that are missing. Returns how many listings were added. */
export async function seedSampleListings(): Promise<number> {
  const ids: number[] = [];
  for (const c of COMPANIES) {
    const have = await one<{ id: number }>("SELECT id FROM companies WHERE name = $1 AND is_sample = 1", [c.name]);
    ids.push(have ? Number(have.id) : Number(await val("INSERT INTO companies (owner_user_id, name, domain, verified, resp_rate, color, is_sample, created_at) VALUES (NULL,$1,'',1,$2,$3,1,NOW()) RETURNING id", [c.name, 80 + (c.name.length % 15), c.color])));
  }
  let added = 0;
  for (const s of S) {
    const company = COMPANIES[s.co].name;
    const slug = slugOf(s.title, company);
    if (await one("SELECT id FROM internships WHERE slug = $1", [slug])) continue;
    const day = 86400000;
    const posted = new Date(Date.now() - s.ago * day).toISOString().slice(0, 19).replace("T", " ");
    const deadline = new Date(Date.now() + (30 + s.ago) * day).toISOString().slice(0, 10);
    const job = s.kind === "job";
    await run(
      `INSERT INTO internships (company_id, kind, slug, title, category, location, mode, stipend, weeks, openings, badge, about, do_json, req_json, perks_json, skills_json, question, status, deadline, posted_at, created_at, is_sample)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,'live',$18,$19,NOW(),1)`,
      [
        ids[s.co], s.kind, slug, s.title, s.cat, s.mode === "Remote" ? "Remote" : s.loc, s.mode, s.pay, s.weeks ?? 0, job ? 2 : 3, s.badge ?? (job ? "Verified employer" : "Paid internship"), s.about,
        JSON.stringify(["Work with a mentor on real tasks", "Share progress in a weekly review", "Document what you build"]),
        JSON.stringify(s.skills.map((k) => `Working knowledge of ${k}`)),
        JSON.stringify(job ? ["Health insurance", "Learning budget"] : ["Certificate", "Mentorship", ...(s.badge === "PPO possible" ? ["PPO possible"] : [])]),
        JSON.stringify(s.skills), "In two or three lines, tell us why this role fits you.", deadline, posted,
      ],
    );
    added++;
  }
  return added;
}
