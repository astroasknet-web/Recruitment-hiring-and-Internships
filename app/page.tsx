import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import Footer from "@/components/layout/Footer";
import JobsHome from "@/components/yugtyjobs/JobsHome";
import "@/components/yugtyjobs/base.css";
import "@/components/yugtyjobs/division.css";
import "@/components/yugtyjobs/yugtyjobs.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--vl-display", display: "swap" });
const text = Inter({ subsets: ["latin"], variable: "--vl-text", display: "swap" });

export const metadata: Metadata = {
  title: "YugtyJobs: Jobs and internships, verified",
  description: "Find verified jobs and internships, prove your skills with a scannable QR Score and apply with no fees. Employers hire screened, scored candidates.",
};

export default function Home() {
  return (
    <>
    <div className={`vl ${display.variable} ${text.variable}`}>
      <a className="vl-skip" href="#main-content">Skip to content</a>
      <JobsHome />
      <Script src="/yugtyjobs/fx.js" strategy="afterInteractive" />
      <Script src="/yugtyjobs/division.js" strategy="afterInteractive" />
      <Script src="/yugtyjobs/hire-qr.js" strategy="afterInteractive" />
    </div>
    <div className="yj-foot"><Footer /></div>
    </>
  );
}
