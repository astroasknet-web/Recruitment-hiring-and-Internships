import { STANDARD_LEGAL } from "@/components/standard-footer/defaults";
import type { FooterConfig } from "@/components/standard-footer/types";
import { SITE_URL } from "@/lib/seo";

/**
 * Footer settings for Yugty Recruitment & Hiring. The layout is the standard footer used by every Yugty web application
 * (components/standard-footer); only the values below are specific to this app.
 *
 * The app family panel appears once at least two apps have a URL: set NEXT_PUBLIC_APP_URL_OVERSEAS, _LEARNING, _INTERNSHIPS and
 * _RECRUITMENT (full https:// URLs) for the other apps.
 */
const env = (k: string) => (process.env[k] ?? "").trim();

export const FOOTER: FooterConfig = {
  brand: { name: "Yugty Recruitment & Hiring", logoSrc: "/yugty-logo.svg", logoAlt: "Yugty Recruitment & Hiring", tagline: "Post roles, rank applicants by match score and move candidates through your pipeline." },
  siteUrl: SITE_URL,
  cta: {
    eyebrow: "Hire. Verify. Grow.",
    title: "Hire screened, scored candidates.",
    text: "Post a role, receive applicants ranked by match score and move them through your pipeline in one dashboard.",
    primary: { label: "Open employer dashboard", href: "/employer" },
    secondary: { label: "Post a role", href: "/employer/post" },
    tertiary: { label: "For recruiters", href: "/solutions/recruiters" },
  },
  appsTitle: "One family. One account.",
  apps: [
    { key: "overseas", name: "Overseas Education", href: env("NEXT_PUBLIC_APP_URL_OVERSEAS"), icon: "Globe", external: true },
    { key: "learning", name: "Learning", href: env("NEXT_PUBLIC_APP_URL_LEARNING"), icon: "GraduationCap", external: true },
    { key: "internships", name: "Internships", href: env("NEXT_PUBLIC_APP_URL_INTERNSHIPS"), icon: "Briefcase", external: true },
    { key: "recruitment", name: "Recruitment & Hiring", href: "/", icon: "Users" },
  ],
  newsletter: { label: "Get news and updates", button: "Join", endpoint: "/api/newsletter", source: "footer" },
  columns: [
    { title: "Employers", links: [
      { href: "/employer", label: "Dashboard" },
      { href: "/employer/post", label: "Post a role" },
      { href: "/solutions/recruiters", label: "For recruiters" },
      { href: "/enterprise/ai-recruiter", label: "AI recruiter" },
    ] },
    { title: "Candidates", links: [
      { href: "/internships", label: "Internships" },
      { href: "/resume-score", label: "Free QR Score" },
      { href: "/ai-resume-expert", label: "AI Resume Expert" },
      { href: "/studio", label: "Resume Studio" },
      { href: "/passport", label: "Skill Passport" },
      { href: "/applications", label: "My applications" },
      { href: "/verify", label: "Verify a passport" },
    ] },
    { title: "Account", links: [
      { href: "/login", label: "Log in" },
      { href: "/signup?role=employer", label: "Create an employer account" },
      { href: "/account", label: "My account" },
      { href: "/billing", label: "Billing" },
    ] },
    { title: "Company", links: [
      { href: "/support", label: "Support" },
      { href: "/contact", label: "Contact us" },
      { href: "/pricing", label: "Plans and pricing" },
    ] },
  ],
  // Add the real Yugty accounts here; icons only show when a URL is set.
  social: [
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "X", href: "", icon: "x" },
    { label: "Instagram", href: "", icon: "instagram" },
    { label: "YouTube", href: "", icon: "youtube" },
    { label: "Facebook", href: "", icon: "facebook" },
  ],
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "hello@yourdomain.com",
  share: { title: "Know someone who should try Yugty Recruitment & Hiring?", text: "Yugty Recruitment & Hiring: post roles and hire screened, scored candidates", subject: "Have a look at Yugty Recruitment & Hiring" },
  // The Editorial Policy page is part of the standard footer; add it here once this app publishes one.
  legal: STANDARD_LEGAL.filter((l) => l.href !== "/editorial-policy"),
};
