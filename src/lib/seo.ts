import type { Metadata } from "next";
import type { Comparison, Tool, Workflow } from "@/content/types";
import { categories } from "@/content/data";
import { absoluteUrl, site } from "@/lib/site";
import { getCategory, getToolsForSlugs } from "@/lib/content";

type BreadcrumbItem = {
  name: string;
  path: string;
};

function plainTitle(title: Metadata["title"]) {
  if (typeof title === "string") {
    return title;
  }

  if (typeof title === "object" && title && "absolute" in title) {
    return String(title.absolute);
  }

  return site.name;
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: {
  title: Metadata["title"];
  description: string;
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const displayTitle = plainTitle(title);

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [
        {
          url: site.heroImage,
          width: 1792,
          height: 1024,
          alt: "AI 自動化工作流地圖與營運儀表板",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [site.heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "zh-Hant-TW",
    description: site.description,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.shortName,
    url: site.url,
    logo: absoluteUrl(site.heroImage),
  };
}

export function itemListJsonLd(
  name: string,
  items: readonly { title?: string; name?: string; slug: string }[],
  pathPrefix: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title ?? item.name,
      url: absoluteUrl(`${pathPrefix}/${item.slug}`),
    })),
  };
}

export function workflowArticleJsonLd(workflow: Workflow) {
  const category = getCategory(workflow.category);
  const toolNames = getToolsForSlugs(workflow.tools).map((tool) => tool.name);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: workflow.title,
    description: workflow.summary,
    dateModified: workflow.updatedAt,
    datePublished: workflow.updatedAt,
    author: {
      "@type": "Organization",
      name: site.shortName,
    },
    publisher: {
      "@type": "Organization",
      name: site.shortName,
    },
    mainEntityOfPage: absoluteUrl(`/workflows/${workflow.slug}`),
    articleSection: category?.name,
    keywords: workflow.keywords.join(", "),
    about: toolNames.map((name) => ({
      "@type": "Thing",
      name,
    })),
    image: absoluteUrl(site.heroImage),
  };
}

export function toolSoftwareJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: tool.category,
    operatingSystem: "Web",
    description: tool.summary,
    url: tool.officialUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function comparisonArticleJsonLd(comparison: Comparison) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.recommendedFor.join(" "),
    dateModified: comparison.updatedAt,
    datePublished: comparison.updatedAt,
    author: {
      "@type": "Organization",
      name: site.shortName,
    },
    mainEntityOfPage: absoluteUrl(`/compare/${comparison.slug}`),
    image: absoluteUrl(site.heroImage),
  };
}

export function categoryItemListJsonLd() {
  return itemListJsonLd(
    "AI 自動化工作流分類",
    categories.map((category) => ({
      slug: category.slug,
      name: category.name,
    })),
    "/categories",
  );
}
