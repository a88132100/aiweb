import { existsSync } from "node:fs";
import { join } from "node:path";

const errors: string[] = [];
const warnings: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function warn(message: string) {
  warnings.push(message);
}

function assertValidUrl(value: string, label: string) {
  try {
    const parsed = new URL(value);

    if (parsed.protocol !== "https:") {
      fail(`${label} should use https in production`);
    }
  } catch {
    fail(`${label} is not a valid URL`);
  }
}

function assertEnvPattern(value: string | undefined, label: string, pattern: RegExp) {
  if (value && !pattern.test(value)) {
    fail(`${label} has an unexpected format`);
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_URL;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const adsenseSlots = [
  ["NEXT_PUBLIC_ADSENSE_SLOT_CONTENT", process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT],
  ["NEXT_PUBLIC_ADSENSE_SLOT_LIST", process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST],
  ["NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR", process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR],
] as const;

if (siteUrl) {
  assertValidUrl(siteUrl, "NEXT_PUBLIC_SITE_URL");
} else if (!vercelUrl) {
  warn("NEXT_PUBLIC_SITE_URL is not set. Local builds will use localhost canonical URLs.");
}

assertEnvPattern(gaId, "NEXT_PUBLIC_GA_ID", /^G-[A-Z0-9]+$/);

if (!gaId) {
  warn("NEXT_PUBLIC_GA_ID is not set. Analytics will be disabled.");
}

if (!googleVerification) {
  warn("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION is not set. Search Console verification meta tag will be disabled.");
}

if (adsenseClient) {
  assertEnvPattern(adsenseClient, "NEXT_PUBLIC_ADSENSE_CLIENT", /^ca-pub-\d+$/);
  for (const [key, value] of adsenseSlots) {
    if (!value) {
      warn(`${key} is not set. That ad placement will keep showing a placeholder.`);
    } else if (!/^\d+$/.test(value)) {
      fail(`${key} should be a numeric AdSense slot id`);
    }
  }
} else {
  for (const [key, value] of adsenseSlots) {
    if (value) {
      fail(`${key} is set but NEXT_PUBLIC_ADSENSE_CLIENT is missing`);
    }
  }
  warn("NEXT_PUBLIC_ADSENSE_CLIENT is not set. Ad placements will remain placeholders.");
}

for (const routeFile of [
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/disclosure/page.tsx",
  "src/app/ads.txt/route.ts",
  "vercel.json",
]) {
  if (!existsSync(join(process.cwd(), routeFile))) {
    fail(`${routeFile} is missing`);
  }
}

if (warnings.length) {
  console.warn("Production check warnings:");
  for (const message of warnings) {
    console.warn(`- ${message}`);
  }
}

if (errors.length) {
  console.error("Production check failed:");
  for (const message of errors) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log("Production check passed.");
