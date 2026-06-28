import type { Metadata } from "next";
import { tools } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ToolCard } from "@/components/tool-card";
import { breadcrumbJsonLd, createMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "AI 自動化工具筆記",
  description: "整理 n8n、Make、Zapier、ChatGPT、Google Sheets、Gmail、Notion 與 LINE 在工作流中的角色。",
  path: "/tools",
  keywords: ["AI 自動化工具", "n8n", "Make", "Zapier", "ChatGPT", "LINE 官方帳號"],
});

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "工具", path: "/tools" },
          ]),
          itemListJsonLd("AI 自動化工具筆記", tools, "/tools"),
        ]}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">Tool Notes</span>
          <h1>工具角色與選型筆記</h1>
          <p>先理解每個工具在流程中的角色，再決定要用最簡單、最省錢或最可控的路線。</p>
        </div>
      </section>
      <div className="page-shell">
        <SectionHeading title="工具清單" description="每個工具頁都會連回適合的工作流與替代選項。" />
        <AdSlot className="section-ad" label="工具清單推薦版位" compact placement="list" />
        <div className="tool-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </>
  );
}
