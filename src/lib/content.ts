import { categories, comparisons, tools, workflows } from "@/content/data";

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getWorkflow(slug: string) {
  return workflows.find((workflow) => workflow.slug === slug);
}

export function getComparison(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export function getWorkflowsByCategory(categorySlug: string) {
  return workflows.filter((workflow) => workflow.category === categorySlug);
}

export function getRelatedWorkflows(slugs: readonly string[]) {
  return slugs
    .map((slug) => getWorkflow(slug))
    .filter((workflow) => workflow !== undefined);
}

export function getToolsForSlugs(slugs: readonly string[]) {
  return slugs.map((slug) => getTool(slug)).filter((tool) => tool !== undefined);
}

export function getLatestUpdatedAt() {
  const dates = [
    ...workflows.map((workflow) => workflow.updatedAt),
    ...comparisons.map((comparison) => comparison.updatedAt),
  ];

  return dates.sort().at(-1) ?? new Date().toISOString().slice(0, 10);
}

export function getFeaturedWorkflows() {
  return [...workflows]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);
}
