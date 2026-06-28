import type { Metadata } from "next";
import { categories, workflows } from "@/content/data";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { WorkflowExplorer } from "@/components/workflow-explorer";
import { breadcrumbJsonLd, createMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "AI 自動化工作流",
  description: "瀏覽繁體中文 AI 自動化工作流，依名單、內容、客服、報表分類搜尋 n8n、Make、Zapier 與 ChatGPT 流程。",
  path: "/workflows",
  keywords: ["AI 自動化工作流", "n8n 模板", "Make 模板", "Zapier 自動化", "ChatGPT 工作流"],
});

export default function WorkflowsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "首頁", path: "/" },
            { name: "工作流", path: "/workflows" },
          ]),
          itemListJsonLd("AI 自動化工作流", workflows, "/workflows"),
        ]}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">Workflow Library</span>
          <h1>可搜尋的 AI 自動化工作流</h1>
          <p>每個流程都寫清楚工具、步驟、品質門檻與不該全自動化的地方。</p>
        </div>
      </section>
      <div className="page-shell">
        <AdSlot
          className="section-ad section-ad-first"
          label="工作流列表推薦版位"
          compact
          placement="list"
        />
        <WorkflowExplorer workflows={workflows} categories={categories} />
      </div>
    </>
  );
}
