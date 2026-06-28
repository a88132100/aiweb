import type { MetadataRoute } from "next";
import { categories, comparisons, tools, workflows } from "@/content/data";
import { absoluteUrl, site } from "@/lib/site";

const staticRoutes = [
  "/",
  "/workflows",
  "/tools",
  "/categories",
  "/compare",
  "/about",
  "/privacy",
  "/terms",
  "/disclosure",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  return [
    ...routes,
    ...workflows.map((workflow) => ({
      url: absoluteUrl(`/workflows/${workflow.slug}`),
      lastModified: workflow.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: [`${site.url}${site.heroImage}`],
    })),
    ...tools.map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/categories/${category.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...comparisons.map((comparison) => ({
      url: absoluteUrl(`/compare/${comparison.slug}`),
      lastModified: comparison.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
