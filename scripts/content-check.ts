import { categories, comparisons, tools, workflows } from "../src/content/data";
import { absoluteUrl } from "../src/lib/site";

const errors: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function requireText(value: string, label: string) {
  if (!value || !value.trim()) {
    fail(`${label} is required`);
  }
}

function assertUnique(collection: readonly { slug: string }[], label: string) {
  const seen = new Set<string>();

  for (const item of collection) {
    if (seen.has(item.slug)) {
      fail(`${label} has duplicate slug: ${item.slug}`);
    }
    seen.add(item.slug);
  }
}

function assertKnownSlug(slug: string, known: Set<string>, label: string) {
  if (!known.has(slug)) {
    fail(`${label} references unknown slug: ${slug}`);
  }
}

function assertDate(value: string, label: string) {
  const parsed = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    fail(`${label} has invalid date: ${value}`);
  }
}

assertUnique(categories, "categories");
assertUnique(tools, "tools");
assertUnique(workflows, "workflows");
assertUnique(comparisons, "comparisons");

const categorySlugs = new Set(categories.map((category) => category.slug));
const toolSlugs = new Set(tools.map((tool) => tool.slug));
const workflowSlugs = new Set(workflows.map((workflow) => workflow.slug));

for (const category of categories) {
  requireText(category.name, `category ${category.slug}.name`);
  requireText(category.summary, `category ${category.slug}.summary`);
  if (!category.keywords.length) {
    fail(`category ${category.slug} needs keywords`);
  }
}

for (const tool of tools) {
  requireText(tool.name, `tool ${tool.slug}.name`);
  requireText(tool.summary, `tool ${tool.slug}.summary`);
  requireText(tool.officialUrl, `tool ${tool.slug}.officialUrl`);

  try {
    new URL(tool.officialUrl);
  } catch {
    fail(`tool ${tool.slug} officialUrl must be a valid URL`);
  }

  for (const alternative of tool.alternatives) {
    assertKnownSlug(alternative, toolSlugs, `tool ${tool.slug}.alternatives`);
  }
}

for (const workflow of workflows) {
  requireText(workflow.title, `workflow ${workflow.slug}.title`);
  requireText(workflow.summary, `workflow ${workflow.slug}.summary`);
  requireText(workflow.useCase, `workflow ${workflow.slug}.useCase`);
  assertKnownSlug(workflow.category, categorySlugs, `workflow ${workflow.slug}.category`);
  assertDate(workflow.updatedAt, `workflow ${workflow.slug}.updatedAt`);

  if (workflow.estimatedMinutes <= 0) {
    fail(`workflow ${workflow.slug}.estimatedMinutes must be positive`);
  }

  if (workflow.steps.length < 3) {
    fail(`workflow ${workflow.slug} needs at least 3 steps`);
  }

  if (!workflow.faq.length) {
    fail(`workflow ${workflow.slug} needs FAQ items`);
  }

  for (const tool of workflow.tools) {
    assertKnownSlug(tool, toolSlugs, `workflow ${workflow.slug}.tools`);
  }

  for (const tool of workflow.affiliateTools) {
    assertKnownSlug(tool, toolSlugs, `workflow ${workflow.slug}.affiliateTools`);
  }

  for (const related of workflow.relatedWorkflows) {
    assertKnownSlug(related, workflowSlugs, `workflow ${workflow.slug}.relatedWorkflows`);
    if (related === workflow.slug) {
      fail(`workflow ${workflow.slug} cannot relate to itself`);
    }
  }

  for (const [index, step] of workflow.steps.entries()) {
    requireText(step.title, `workflow ${workflow.slug}.steps[${index}].title`);
    requireText(step.description, `workflow ${workflow.slug}.steps[${index}].description`);
    requireText(step.qualityGate, `workflow ${workflow.slug}.steps[${index}].qualityGate`);
    for (const tool of step.tools) {
      assertKnownSlug(tool, toolSlugs, `workflow ${workflow.slug}.steps[${index}].tools`);
    }
  }
}

for (const comparison of comparisons) {
  requireText(comparison.title, `comparison ${comparison.slug}.title`);
  assertDate(comparison.updatedAt, `comparison ${comparison.slug}.updatedAt`);

  if (comparison.tools.length < 2) {
    fail(`comparison ${comparison.slug} needs at least 2 tools`);
  }

  if (!comparison.decisionMatrix.length) {
    fail(`comparison ${comparison.slug} needs decisionMatrix rows`);
  }

  for (const tool of comparison.tools) {
    assertKnownSlug(tool, toolSlugs, `comparison ${comparison.slug}.tools`);
  }

  for (const [index, row] of comparison.decisionMatrix.entries()) {
    requireText(row.factor, `comparison ${comparison.slug}.decisionMatrix[${index}].factor`);
    requireText(row.winner, `comparison ${comparison.slug}.decisionMatrix[${index}].winner`);
    requireText(row.notes, `comparison ${comparison.slug}.decisionMatrix[${index}].notes`);
    assertKnownSlug(row.winner, toolSlugs, `comparison ${comparison.slug}.decisionMatrix[${index}].winner`);
  }
}

const routeCount =
  9 + workflows.length + tools.length + categories.length + comparisons.length;

if (routeCount < 20) {
  fail(`expected at least 20 sitemap routes, got ${routeCount}`);
}

try {
  new URL(absoluteUrl("/sitemap.xml"));
} catch {
  fail("sitemap URL could not be generated");
}

if (errors.length) {
  console.error("Content check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Content check passed: ${routeCount} routes, ${workflows.length} workflows, ${tools.length} tools.`);
