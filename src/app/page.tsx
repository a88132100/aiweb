import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, GitCompareArrows, Search } from "lucide-react";
import { categories, comparisons, tools, workflows } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ToolCard } from "@/components/tool-card";
import { WorkflowCard } from "@/components/workflow-card";
import { getFeaturedWorkflows } from "@/lib/content";
import { createMetadata, itemListJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: {
    absolute: site.name,
  },
  description: site.description,
  path: "/",
  keywords: ["AI 自動化", "n8n 教學", "Make 工作流", "Zapier", "繁體中文 SEO"],
});

export default function HomePage() {
  const featuredWorkflows = getFeaturedWorkflows();

  return (
    <>
      <JsonLd
        data={[
          websiteJsonLd(),
          organizationJsonLd(),
          itemListJsonLd("精選 AI 自動化工作流", featuredWorkflows, "/workflows"),
        ]}
      />
      <section className="hero">
        <Image
          src={site.heroImage}
          alt="AI 自動化工作流地圖與營運儀表板"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-content">
          <span className="eyebrow">AI Automation Workflow Library</span>
          <h1>繁體中文 AI 自動化工作流模板庫</h1>
          <p>
            從 Gmail、Sheets、Notion、LINE 到 n8n、Make、Zapier，整理可手動匯入、可逐步部署、可做 SEO 長尾內容的工作流。
          </p>
          <div className="hero-actions">
            <Link href="/workflows" className="button-primary">
              <Search size={18} aria-hidden="true" />
              瀏覽工作流
            </Link>
            <Link href="/compare" className="button-secondary">
              <GitCompareArrows size={18} aria-hidden="true" />
              比較工具
            </Link>
          </div>
          <div className="stats-row" aria-label="網站內容統計">
            <div className="stat">
              <strong>{workflows.length}</strong>
              <span>個手寫工作流</span>
            </div>
            <div className="stat">
              <strong>{tools.length}</strong>
              <span>個工具筆記</span>
            </div>
            <div className="stat">
              <strong>{categories.length}</strong>
              <span>個營運分類</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="content-band-inner">
          <SectionHeading
            eyebrow="Featured"
            title="先從最容易跑出價值的流程開始"
            description="每個流程都保留人工審核與品質門檻，適合從 MVP 做起，而不是一開始就全自動發布。"
          />
          <div className="card-grid">
            {featuredWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.slug} workflow={workflow} />
            ))}
          </div>
          <AdSlot className="section-ad" label="首頁工作流推薦版位" placement="list" />
        </div>
      </section>

      <section className="content-band">
        <div className="content-band-inner">
          <SectionHeading
            eyebrow="Tools"
            title="工具不是越多越好，而是角色要清楚"
            description="自動化平台、AI 層、資料表、工作區與通訊渠道各自負責不同環節。"
          />
          <div className="tool-grid">
            {tools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <AdSlot className="section-ad" label="工具選型合作版位" compact placement="list" />
        </div>
      </section>

      <section className="content-band">
        <div className="content-band-inner">
          <SectionHeading
            eyebrow="Compare"
            title="選型先看流程，不只看功能表"
            description="同一個工具在短流程、長流程、自架與團隊協作情境下，答案會完全不同。"
          />
          <div className="comparison-grid">
            {comparisons.map((comparison) => (
              <article className="comparison-card" key={comparison.slug}>
                <h3>
                  <Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link>
                </h3>
                <p>{comparison.recommendedFor[0]}</p>
                <Link className="text-link" href={`/compare/${comparison.slug}`}>
                  看比較
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
