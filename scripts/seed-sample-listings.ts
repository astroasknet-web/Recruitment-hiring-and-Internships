/**
 * Adds sample jobs and internships (labelled "Sample listing" on the site). Safe to run twice.
 *   DATABASE_URL=mysql://... npx tsx scripts/seed-sample-listings.ts
 */
import { seedSampleListings } from "../lib/market/sample-listings";

seedSampleListings()
  .then((n) => {
    console.log(`${n} sample listing(s) added`);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
