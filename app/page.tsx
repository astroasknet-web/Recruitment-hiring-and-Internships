import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "GrowQR Recruitment & Hiring",
  description: "Post roles, receive applicants ranked by match score, move candidates through your pipeline and view verified resumes. Built for recruiters, employers and hiring teams.",
};

const CARDS = [
  { href: "/employer", title: "Employer dashboard", text: "Your hiring overview, applicants and pipeline board." },
  { href: "/employer/post", title: "Post a role", text: "Publish an internship or job. New companies are verified before roles go live." },
  { href: "/solutions/recruiters", title: "For recruiters", text: "How GrowQR helps recruiting teams screen faster." },
  { href: "/enterprise/ai-recruiter", title: "AI recruiter", text: "Automated screening and shortlisting." },
];

export default function Home() {
  return (
    <SiteChrome>
      <main className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-orange-deep">GrowQR Recruitment & Hiring</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Hire verified talent</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-2">Post roles, receive applicants ranked by match score, move candidates through your pipeline and view verified resumes. Built for recruiters, employers and hiring teams.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/employer" className="inline-flex min-h-[48px] items-center rounded-full bg-orange px-6 font-semibold text-white">Open employer dashboard</Link>
          <Link href="/login" className="inline-flex min-h-[48px] items-center rounded-full border border-black/15 px-6 font-semibold">Sign in</Link>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="block h-full rounded-2xl border border-black/10 p-6 transition hover:border-orange hover:shadow-md">
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="mt-2 text-[15px] text-ink-2">{c.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </SiteChrome>
  );
}
