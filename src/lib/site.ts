const fallbackUrl = "http://localhost:3000";

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return fallbackUrl;
}

export const site = {
  name: "FlowKit AI 工作流模板庫",
  shortName: "FlowKit AI",
  url: normalizeUrl(getSiteUrl()),
  description:
    "繁體中文 AI 自動化工作流模板庫，整理 n8n、Make、Zapier、ChatGPT、Google Sheets、Gmail、Notion 與 LINE 的可落地流程。",
  locale: "zh_TW",
  author: "FlowKit AI",
  heroImage: "/images/workflow-hero.jpg",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalizedPath}`;
}
