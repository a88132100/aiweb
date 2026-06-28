import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { getComparison, getToolsForSlugs } from "@/lib/content";
import { breadcrumbJsonLd, comparisonArticleJsonLd, createMetadata } from "@/lib/seo";

type CompareDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: CompareDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) {
    return createMetadata({
      title: "找不到比較頁",
      description: "這個比較頁不存在或已移除。",
      path: "/compare",
    });
  }

  return createMetadata({
    title: comparison.title,
    description: comparison.recommendedFor.join(" "),
    path: `/compare/${comparison.slug}`,
    keywords: [comparison.title, ...comparison.tools],
    type: "article",
  });
}

export default async function CompareDetailPage({ params }: CompareDetailPageProps) {
  const { slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) {
    notFound();
  }

  const comparedTools = getToolsForSlugs(comparison.tools);

  return (
    <>
      <JsonLd
        data={[
          comparisonArticleJsonLd(comparison),
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "比較", path: "/compare" },
            { name: comparison.title, path: `/compare/${comparison.slug}` },
          ]),
        ]}
      />
      <section className="page-hero">
        <div>
          <nav className="breadcrumb" aria-label="麵包屑">
            <Link href="/">首頁</Link>
            <span>/</span>
            <Link href="/compare">比較</Link>
            <span>/</span>
            <span>{comparison.title}</span>
          </nav>
          <span className="eyebrow">Decision Matrix</span>
          <h1>{comparison.title}</h1>
          <p>{comparison.recommendedFor.join(" ")}</p>
          <div className="hero-detail-meta">
            <span>更新 {comparison.updatedAt}</span>
            {comparedTools.map((tool) => (
              <span key={tool.slug}>{tool.name}</span>
            ))}
          </div>
        </div>
      </section>
      <div className="page-shell article-layout">
        <article className="article-main">
          <h2>決策矩陣</h2>
          <div className="matrix" role="table" aria-label="工具比較矩陣">
            <div className="matrix-row matrix-head" role="row">
              <div role="columnheader">判斷因素</div>
              <div role="columnheader">較適合</div>
              <div role="columnheader">說明</div>
            </div>
            {comparison.decisionMatrix.map((row) => (
              <div className="matrix-row" role="row" key={row.factor}>
                <div role="cell">{row.factor}</div>
                <div role="cell">{getToolsForSlugs([row.winner])[0]?.name ?? row.winner}</div>
                <div role="cell">{row.notes}</div>
              </div>
            ))}
          </div>

          <AdSlot className="article-ad" label="比較內容中段推薦版位" />

          <h2>建議選法</h2>
          <ul>
            {comparison.recommendedFor.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>

          <h2>被比較工具</h2>
          <div className="tool-grid">
            {comparedTools.map((tool) => (
              <article className="tool-card" key={tool.slug}>
                <div className="card-intro">
                  <span className="tool-category">{tool.category}</span>
                  <h3>
                    <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                  </h3>
                  <p>{tool.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
        <aside className="sidebar">
          <AdSlot label="比較頁合作版位" placement="sidebar" />
          <section className="sidebar-panel">
            <h2>相關工具頁</h2>
            <ul>
              {comparedTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
