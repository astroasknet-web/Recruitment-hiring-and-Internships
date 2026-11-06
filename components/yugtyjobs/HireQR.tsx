import { HIRE_QR_STEPS, HIRE_QR_UNLOCKS } from "@/lib/yugtyjobs/content";

/**
 * "How a QR grows": a resume is scanned, a QR develops from it, and the score climbs as courses, skills and AI interviews are
 * completed. The animation is in /public/velora/hire-qr.js. This markup holds all the copy, so it reads fine without scripts
 * (it then shows the final state of the sample journey). Every number here is an illustrative sample.
 */
export default function HireQR() {
  const last = HIRE_QR_STEPS.length - 1;
  const final = HIRE_QR_STEPS.reduce((n, s) => n + s.delta, 0);
  return (
    <div className="hq" data-hq role="group" aria-label="How a QR Score grows. An illustrative sample journey.">
      <div className="hq-grid">
        <div className="hq-resume" data-hq-resume>
          <header>
            <i aria-hidden="true" />
            <span aria-hidden="true" />
            <small>RESUME</small>
          </header>
          <div className="hq-sec">
            <h4>Skills</h4>
            <div className="hq-chips" data-hq-skills>
              {HIRE_QR_STEPS.flatMap((s) => s.skills ?? []).map((s) => (
                <span key={s} className="hq-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="hq-sec">
            <h4>Courses</h4>
            <ul data-hq-courses>
              {HIRE_QR_STEPS.filter((s) => s.course).map((s) => (
                <li key={s.course} className="hq-line">
                  {s.course}
                </li>
              ))}
            </ul>
          </div>
          <div className="hq-sec">
            <h4>Interviews</h4>
            <ul data-hq-ints>
              {HIRE_QR_STEPS.filter((s) => s.interview).map((s) => (
                <li key={s.interview} className="hq-line iv">
                  {s.interview}
                </li>
              ))}
            </ul>
          </div>
          <div className="hq-strength">
            <small>Resume strength</small>
            <div>
              <i data-hq-strength style={{ width: "92%" }} />
            </div>
          </div>
          <div className="hq-beam" aria-hidden="true" />
        </div>

        <div className="hq-qrwrap" data-hq-qrwrap>
          <svg className="hq-qr" viewBox="0 0 29 29" data-hq-qr aria-hidden="true" focusable="false" />
          <div className="hq-scanline" aria-hidden="true" />
          <div className="hq-badge" data-hq-badge data-s="done">
            VERIFIED · SCANNABLE
          </div>
          <div className="hq-plus" data-hq-plus aria-hidden="true" />
        </div>

        <div className="hq-side">
          <div className="hq-score">
            <small>QR SCORE</small>
            <p>
              <b data-hq-score>{final}</b>
              <span> / 100</span>
            </p>
            <div className="hq-bar">
              <i data-hq-bar style={{ width: `${final}%` }} />
            </div>
            <em data-hq-file>Illustrative sample journey</em>
          </div>
          <ul className="hq-unlocks" aria-label="Opportunities that open as the score grows">
            {HIRE_QR_UNLOCKS.map((u) => (
              <li key={u.label} data-at={u.at} className="on">
                <i aria-hidden="true" />
                <span>{u.label}</span>
                <small>{u.at}+</small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="hq-now" data-hq-now aria-live="polite">
        {HIRE_QR_STEPS[last].text}
      </p>
      <ol className="hq-steps">
        {HIRE_QR_STEPS.map((s, i) => (
          <li key={s.label}>
            <button
              type="button"
              data-hq-step
              data-delta={s.delta}
              data-cat={s.cat}
              data-label={s.label}
              data-text={s.text}
              data-skills={(s.skills ?? []).join("|")}
              data-course={s.course ?? ""}
              data-interview={s.interview ?? ""}
              data-strength={s.strength ?? 0}
              className={i === last ? "on" : "past"}
            >
              <b>{i + 1}</b>
              <span>{s.label}</span>
              <small>{i === 0 ? "start" : `+${s.delta}`}</small>
            </button>
          </li>
        ))}
      </ol>
      <p className="hq-note">
        <span>A sample student: scores and unlock levels are illustrative.</span>
        <button type="button" data-hq-pause className="hq-pause" aria-pressed="false">
          Pause
        </button>
      </p>
    </div>
  );
}
