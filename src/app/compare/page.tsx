import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { comparisons } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { breadcrumbJsonLd, createMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "AI 自動化工具比較",
  description: "比較 n8n、Make、Zapier、ChatGPT 與 Notion 在 AI 自動化工作流中的適用情境。",
  path: "/compare",
  keywords: ["n8n vs Make", "Zapier vs Make", "ChatGPT Notion", "自動化工具比較"],
});

export default function ComparePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "比較", path: "/compare" },
          ]),
          itemListJsonLd("AI 自動化工具比較", comparisons, "/compare"),
        ]}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">Compare</span>
          <h1>工具比較不是功能表比賽</h1>
          <p>同一套工具在不同流程、團隊能力與成本結構下，會有不同答案。</p>
        </div>
      </section>
      <div className="page-shell">
        <SectionHeading title="比較清單" description="用工作流情境判斷選型，而不是只看哪個工具功能最多。" />
        <AdSlot className="section-ad" label="比較頁選型推薦版位" compact placement="list" />
        <div className="comparison-grid">
          {comparisons.map((comparison) => (
            <article className="comparison-card" key={comparison.slug}>
              <h3>
                <Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link>
              </h3>
              <p>{comparison.recommendedFor.join(" ")}</p>
              <Link className="text-link" href={`/compare/${comparison.slug}`}>
                看比較表
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
