import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { categories } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { getWorkflowsByCategory } from "@/lib/content";
import { breadcrumbJsonLd, categoryItemListJsonLd, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "AI 工作流分類",
  description: "依名單、內容、客服、報表分類瀏覽 AI 自動化工作流。",
  path: "/categories",
  keywords: ["AI 工作流分類", "AI 名單整理", "AI 內容營運", "LINE 客服自動化", "AI 報表"],
});

export default function CategoriesPage() {
  return (
    <>
      <JsonLd
        data={[
          categoryItemListJsonLd(),
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "分類", path: "/categories" },
          ]),
        ]}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">Categories</span>
          <h1>用營運情境找流程</h1>
          <p>先選出最痛的場景，再挑工具；這樣比較不會為了自動化而自動化。</p>
        </div>
      </section>
      <div className="page-shell">
        <SectionHeading title="分類清單" description="每個分類聚焦一種可驗證的營運成果。" />
        <AdSlot className="section-ad" label="分類頁工具推薦版位" compact placement="list" />
        <div className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.slug}>
              <div className="card-intro">
                <span className="tool-category">{getWorkflowsByCategory(category.slug).length} 個流程</span>
                <h3>
                  <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                </h3>
                <p>{category.summary}</p>
              </div>
              <p>{category.focus}</p>
              <Link className="text-link" href={`/categories/${category.slug}`}>
                進入分類
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
