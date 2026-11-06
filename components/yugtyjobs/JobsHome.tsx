import Link from "next/link";
import type { CSSProperties } from "react";
import { CATEGORIES, EMPLOYERS, FAQS, HIRE_PIPELINE, OPENINGS_URL } from "@/lib/yugtyjobs/content";
import { Faq, Nav, SectionHead, Ticker } from "./Chrome";
import HireQR from "./HireQR";
import { Opportunities, SearchBar } from "./Opportunities";

const ACCENT = { "--a": "#2f7bff", "--a2": "#8ec0ff" } as CSSProperties;
const search = (q: string) => `${OPENINGS_URL}${OPENINGS_URL.includes("?") ? "&" : "?"}q=${encodeURIComponent(q)}`;

export default function JobsHome() {
  return (
    <>
      <Nav />
      <main id="main-content" className="dv dv-hire" style={ACCENT}>
        <section className="dv-hero" id="top">
          <div className="dv-hero-copy">
            <p className="vl-kicker">YUGTYJOBS · JOBS AND INTERNSHIPS</p>
            <h1 className="dv-h1">Your next opportunity starts here.</h1>
            <p className="vl-lead">Find verified jobs and internships, prove your skills with a scannable QR Score, and apply with no fees. Employers hire screened, scored talent.</p>
            <SearchBar />
            <p className="yj-quick">
              <span>Popular:</span>
              {["Data analyst", "Frontend developer", "Marketing intern", "Remote"].map((t) => (
                <a key={t} href={search(t)}>{t}</a>
              ))}
            </p>
            <div className="vl-cta-row">
              <Link className="vl-btn vl-btn-primary" href="/signup?role=candidate">Get your free QR Score</Link>
              <Link className="vl-btn vl-btn-ghost" href="/employer/post">Post a job or internship</Link>
            </div>
          </div>
          <div className="dv-hero-vis dv-hire-vis">
            <canvas className="dv-canvas" data-hero="hire" aria-hidden="true" />
            <HireQR />
          </div>
        </section>

        <Ticker items={["Jobs", "Internships", "Verified employers", "No application fees", "QR Score", "Skill Passport", "Resume Studio", "Application tracker", "Remote roles", "Fresher friendly"]} />
        <ul className="dv-stats dv-rv">
          <li><b data-count="0">0</b><span>application fees</span></li>
          <li><b data-count="100">100</b><span>point QR Score</span></li>
          <li><b data-count="45">45</b><span>resume templates</span></li>
        </ul>

        <section className="dv-sec" id="opportunities">
          <SectionHead kicker="OPEN NOW" title={<>Fresh <em>openings.</em></>} text="Jobs and internships from verified employers, with the QR Score each role looks for." />
          <Opportunities />
        </section>

        <section className="dv-sec" id="categories">
          <SectionHead kicker="BROWSE" title={<>Explore by <em>field.</em></>} text="Pick a field and see what is hiring." />
          <div className="yj-cats dv-rv">
            {CATEGORIES.map((c) => (
              <Link key={c.name} href={search(c.name)} className="yj-cat">
                <i aria-hidden="true">{c.icon}</i>
                <span><b>{c.name}</b><small>{c.count}</small></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="dv-sec" id="pipeline">
          <SectionHead kicker="HOW IT WORKS" title={<>From resume to <em>offer.</em></>} text="Five steps, one path. Use one, or follow it end to end." />
          <ol className="dv-pipe" data-journey>
            {HIRE_PIPELINE.map((p, i) => (
              <li key={p.name} className="dv-rv" data-j style={{ "--i": i } as CSSProperties}>
                <Link href={p.href} className="dv-pipe-card">
                  <span className="dv-pipe-n">0{i + 1}</span>
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                  <span className="dv-go">Open ↗</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="dv-sec" id="employers">
          <SectionHead kicker="FOR EMPLOYERS" title={<>Hire people who are already <em>proven.</em></>} text="Post a role, rank applicants by match score and move them through your pipeline." />
          <div className="dv-split">
            {EMPLOYERS.map((e, i) => (
              <Link key={e.name} href={e.href} className="dv-wide dv-rv">
                <span className="dv-wide-n">{["POST", "MANAGE", "AUTOMATE"][i]}</span>
                <h3>{e.name}</h3>
                <p>{e.text}</p>
                <span className="dv-go">Explore ↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="dv-sec" id="faq">
          <SectionHead kicker="QUESTIONS" title="Good questions." />
          <Faq items={FAQS} />
        </section>

        <section className="dv-final dv-rv" aria-label="Get started">
          <h2>Your next opportunity starts with one score.</h2>
          <div className="vl-cta-row vl-cta-center">
            <Link className="vl-btn vl-btn-primary" href="/signup?role=candidate">Get your free QR Score</Link>
            <Link className="vl-btn vl-btn-ghost" href="/contact">Talk to us</Link>
          </div>
          <p className="dv-final-note">YugtyJobs</p>
        </section>
      </main>
    </>
  );
}
