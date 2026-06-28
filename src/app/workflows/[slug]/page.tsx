import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { workflows } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { WorkflowCard } from "@/components/workflow-card";
import {
  getCategory,
  getRelatedWorkflows,
  getToolsForSlugs,
  getWorkflow,
} from "@/lib/content";
import { breadcrumbJsonLd, createMetadata, workflowArticleJsonLd } from "@/lib/seo";

type WorkflowPageProps = {
  params: Promise<{ slug: string }>;
};

const difficultyLabel = {
  beginner: "入門",
  intermediate: "中階",
  advanced: "進階",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return workflows.map((workflow) => ({ slug: workflow.slug }));
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflow(slug);

  if (!workflow) {
    return createMetadata({
      title: "找不到工作流",
      description: "這個工作流不存在或已移除。",
      path: "/workflows",
    });
  }

  return createMetadata({
    title: workflow.title,
    description: workflow.summary,
    path: `/workflows/${workflow.slug}`,
    keywords: workflow.keywords,
    type: "article",
  });
}

export default async function WorkflowDetailPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = getWorkflow(slug);

  if (!workflow) {
    notFound();
  }

  const category = getCategory(workflow.category);
  const workflowTools = getToolsForSlugs(workflow.tools);
  const affiliateTools = getToolsForSlugs(workflow.affiliateTools);
  const relatedWorkflows = getRelatedWorkflows(workflow.relatedWorkflows);

  return (
    <>
      <JsonLd
        data={[
          workflowArticleJsonLd(workflow),
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "工作流", path: "/workflows" },
            { name: workflow.title, path: `/workflows/${workflow.slug}` },
          ]),
        ]}
      />
      <section className="page-hero">
        <div>
          <nav className="breadcrumb" aria-label="麵包屑">
            <Link href="/">首頁</Link>
            <span>/</span>
            <Link href="/workflows">工作流</Link>
            <span>/</span>
            <span>{workflow.title}</span>
          </nav>
          <span className="eyebrow">{category?.name}</span>
          <h1>{workflow.title}</h1>
          <p>{workflow.summary}</p>
          <div className="hero-detail-meta">
            <span>
              <Clock size={16} aria-hidden="true" />
              {workflow.estimatedMinutes} 分鐘
            </span>
            <span>{difficultyLabel[workflow.difficulty]}</span>
            <span>更新 {workflow.updatedAt}</span>
          </div>
        </div>
      </section>

      <div className="page-shell article-layout">
        <article className="article-main">
          <h2>適用情境</h2>
          <p>{workflow.useCase}</p>

          <h2>實作步驟</h2>
          <ol className="step-list">
            {workflow.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="tag-row">
                  {step.tools.map((toolSlug) => (
                    <span className="tag" key={toolSlug}>
                      {getToolsForSlugs([toolSlug])[0]?.name ?? toolSlug}
                    </span>
                  ))}
                </div>
                <p className="quality-gate">
                  <ShieldCheck size={16} aria-hidden="true" />
                  {step.qualityGate}
                </p>
              </li>
            ))}
          </ol>

          <AdSlot className="article-ad" label="流程教學中段推薦版位" />

          <h2>常見問題</h2>
          {workflow.faq.map((item) => (
            <section key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </section>
          ))}

          {relatedWorkflows.length ? (
            <>
              <h2>相關工作流</h2>
              <div className="card-grid">
                {relatedWorkflows.map((related) => (
                  <WorkflowCard key={related.slug} workflow={related} />
                ))}
              </div>
            </>
          ) : null}
        </article>

        <aside className="sidebar" aria-label="工作流側欄">
          <AdSlot label="此流程可搭配的工具" placement="sidebar" />
          <section className="sidebar-panel">
            <h2>使用工具</h2>
            <ul>
              {workflowTools.map((tool) => (
                <li key={tool.slug}>
                  <Link className="text-link" href={`/tools/${tool.slug}`}>
                    {tool.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="sidebar-panel">
            <h2>推薦工具位</h2>
            <ul>
              {affiliateTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="sidebar-panel">
            <h2>長尾關鍵字</h2>
            <div className="tag-row">
              {workflow.keywords.map((keyword) => (
                <span className="tag" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
