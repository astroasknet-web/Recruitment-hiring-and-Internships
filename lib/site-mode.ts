/**
 * This repository serves a single YugtyJobs vertical (YugtyJobs Recruitment & Hiring). Every path that belongs to another vertical is sent to the main site (MARKETING_URL).
 * Set SITE_MODE=full to serve every path from this host instead. Pure functions, safe for the edge middleware.
 */
export const PORTAL_PREFIXES = [
  "/.well-known", "/_next", "/account", "/api/auth", "/api/b2b-lead", "/api/cron", "/api/files", "/api/growqr-profile", "/api/health", "/api/newsletter", "/api/internships", "/api/portal", "/api/razorpay", "/api/salesiq", "/api/send-contact", "/api/studio", "/api/t", "/api/upload-resume", "/api/upload-internship-resume", "/api/send-internship", "/api/v1", "/admin/internship", "/ai-resume-expert", "/applications", "/auth", "/billing", "/cart", "/checkout", "/console", "/contact", "/crm-file.js", "/data-deletion", "/employer", "/enterprise", "/favicon.ico", "/file", "/forgot-password", "/go", "/growqr-internship", "/yugtyjobs-logo.svg", "/internships", "/login", "/passport", "/pricing", "/privacy-policy", "/refund-policy", "/resume-score", "/reset-password", "/robots.txt", "/score", "/signup", "/sitemap.xml", "/solutions", "/studio", "/support", "/v", "/verify", "/verify-email",
];

export function isPortalPath(pathname: string): boolean {
  return PORTAL_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export type Decision = { action: "next" } | { action: "redirect"; to: string };

/** What to do with a request on a portal-only host. `marketing` is the main site, e.g. https://growqr.ai (no trailing slash). */
export function portalDecision(pathname: string, search: string, marketing: string): Decision {
  if (pathname === "/") return { action: "next" }; // the main site's home page
  if (isPortalPath(pathname) || /\.[a-z0-9]{2,5}$/i.test(pathname)) return { action: "next" }; // static files (logo, js) are served as they are
  return { action: "redirect", to: `${marketing.replace(/\/+$/, "")}${pathname}${search}` };
}
