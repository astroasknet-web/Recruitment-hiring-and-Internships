"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LISTINGS, OPENINGS_URL } from "@/lib/yugtyjobs/content";

type Kind = "All" | "Job" | "Internship";
const TABS: Kind[] = ["All", "Job", "Internship"];

/** Hero search: sends the query to the openings app (or sign-up until it is configured). */
export function SearchBar() {
  const [kind, setKind] = useState<"Job" | "Internship">("Job");
  const [q, setQ] = useState("");
  const [where, setWhere] = useState("");
  const sep = OPENINGS_URL.includes("?") ? "&" : "?";
  const href = `${OPENINGS_URL}${sep}type=${kind.toLowerCase()}&q=${encodeURIComponent(q)}&where=${encodeURIComponent(where)}`;
  return (
    <form
      className="yj-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.assign(href);
      }}
    >
      <div className="yj-seg" role="group" aria-label="Looking for">
        {(["Job", "Internship"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
            {k === "Job" ? "Jobs" : "Internships"}
          </button>
        ))}
      </div>
      <label className="yj-field">
        <span className="vl-sr">Role or skill</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Role, skill or company" autoComplete="off" />
      </label>
      <label className="yj-field">
        <span className="vl-sr">Location</span>
        <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="City or Remote" autoComplete="off" />
      </label>
      <button type="submit" className="vl-btn vl-btn-primary">Search</button>
    </form>
  );
}

export function Opportunities() {
  const [tab, setTab] = useState<Kind>("All");
  const list = useMemo(() => LISTINGS.filter((l) => tab === "All" || l.kind === tab), [tab]);
  return (
    <>
      <div className="yj-tabs" role="group" aria-label="Filter openings">
        {TABS.map((t) => (
          <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>
            {t === "All" ? "All openings" : t === "Job" ? "Jobs" : "Internships"}
          </button>
        ))}
      </div>
      <ul className="yj-grid">
        {list.map((l) => (
          <li key={l.title + l.company} className="yj-card" data-kind={l.kind}>
            <header>
              <span className="yj-logo" aria-hidden="true">{l.mark}</span>
              <div>
                <h3>{l.title}</h3>
                <p>{l.company}</p>
              </div>
              <em>{l.kind}</em>
            </header>
            <p className="yj-meta">
              {l.place} · {l.mode} · <b>{l.pay}</b>
            </p>
            <p className="yj-tags">
              {l.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
              <span className="yj-min">QR {l.score}+</span>
            </p>
            <Link href={OPENINGS_URL} className="dv-go">View and apply ↗</Link>
          </li>
        ))}
      </ul>
      <p className="yj-note">Sample listings shown for illustration. Live openings appear here once employers publish roles.</p>
    </>
  );
}
