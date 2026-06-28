import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { tools, workflows } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { WorkflowCard } from "@/components/workflow-card";
import { getTool } from "@/lib/content";
import { breadcrumbJsonLd, createMetadata, toolSoftwareJsonLd } from "@/lib/seo";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    return createMetadata({
      title: "找不到工具",
      description: "這個工具筆記不存在或已移除。",
      path: "/tools",
    });
  }

  return createMetadata({
    title: `${tool.name} 自動化筆記`,
    description: tool.summary,
    path: `/tools/${tool.slug}`,
    keywords: [tool.name, `${tool.name} 自動化`, `${tool.name} workflow`],
  });
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  const relatedWorkflows = workflows.filter((workflow) =>
    workflow.tools.some((toolSlug) => toolSlug === tool.slug),
  );
  const alternatives = tool.alternatives
    .map((alternative) => getTool(alternative))
    .filter((alternative) => alternative !== undefined);

  return (
    <>
      <JsonLd
        data={[
          toolSoftwareJsonLd(tool),
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "工具", path: "/tools" },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]),
        ]}
      />
      <section className="page-hero">
        <div>
          <nav className="breadcrumb" aria-label="麵包屑">
            <Link href="/">首頁</Link>
            <span>/</span>
            <Link href="/tools">工具</Link>
            <span>/</span>
            <span>{tool.name}</span>
          </nav>
          <span className="eyebrow">{tool.category}</span>
          <h1>{tool.name} 自動化筆記</h1>
          <p>{tool.summary}</p>
          <div className="action-row">
            <a className="button-primary" href={tool.officialUrl} target="_blank" rel="noreferrer">
              官方網站
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <div className="page-shell article-layout">
        <article className="article-main">
          <h2>最適合的用途</h2>
          <ul>
            {tool.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>成本提醒</h2>
          <p>{tool.pricingHint}</p>
          <AdSlot className="article-ad" label={`${tool.name} 工具內容中段版位`} />
          <h2>相關工作流</h2>
          <div className="card-grid">
            {relatedWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.slug} workflow={workflow} />
            ))}
          </div>
        </article>
        <aside className="sidebar">
          <AdSlot label={`${tool.name} 推薦版位`} placement="sidebar" />
          <section className="sidebar-panel">
            <h2>替代工具</h2>
            <ul>
              {alternatives.map((alternative) => (
                <li key={alternative.slug}>
                  <Link href={`/tools/${alternative.slug}`}>{alternative.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
