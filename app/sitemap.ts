import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PATHS = ["/", "/employer/post", "/solutions/recruiters", "/enterprise/ai-recruiter"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, lastModified: new Date() }));
}
