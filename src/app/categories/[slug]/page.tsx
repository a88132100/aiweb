import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { WorkflowCard } from "@/components/workflow-card";
import { getCategory, getWorkflowsByCategory } from "@/lib/content";
import { breadcrumbJsonLd, createMetadata, itemListJsonLd } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return createMetadata({
      title: "找不到分類",
      description: "這個分類不存在或已移除。",
      path: "/categories",
    });
  }

  return createMetadata({
    title: `${category.name} AI 工作流`,
    description: category.summary,
    path: `/categories/${category.slug}`,
    keywords: category.keywords,
  });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryWorkflows = getWorkflowsByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "分類", path: "/categories" },
            { name: category.name, path: `/categories/${category.slug}` },
          ]),
          itemListJsonLd(`${category.name} 工作流`, categoryWorkflows, "/workflows"),
        ]}
      />
      <section className="page-hero">
        <div>
          <nav className="breadcrumb" aria-label="麵包屑">
            <Link href="/">首頁</Link>
            <span>/</span>
            <Link href="/categories">分類</Link>
            <span>/</span>
            <span>{category.name}</span>
          </nav>
          <span className="eyebrow">Category</span>
          <h1>{category.name}</h1>
          <p>{category.summary} {category.focus}</p>
        </div>
      </section>
      <div className="page-shell">
        <AdSlot
          className="section-ad section-ad-first"
          label={`${category.name} 分類推薦版位`}
          compact
          placement="list"
        />
        <div className="card-grid">
          {categoryWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.slug} workflow={workflow} />
          ))}
        </div>
      </div>
    </>
  );
}
