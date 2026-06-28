import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "關於 FlowKit AI",
  description: "FlowKit AI 是繁體中文 AI 自動化工作流模板庫，聚焦可落地、可審核、可持續更新的流程內容。",
  path: "/about",
  keywords: ["FlowKit AI", "AI 自動化內容站", "繁體中文工作流"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "關於", path: "/about" },
        ])}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">About</span>
          <h1>做可被信任的 AI 工作流內容站</h1>
          <p>這個 MVP 的重點不是大量生成頁面，而是把流程、品質門檻與人工審核寫清楚。</p>
        </div>
      </section>
      <div className="page-shell">
        <article className="article-main">
          <h2>內容原則</h2>
          <p>
            每篇工作流都以具體營運問題出發，包含工具角色、操作步驟、品質門檻與不適合全自動化的提醒。v1 採手動匯入內容，不接 AI API，不自動抓取外部模板。
          </p>
          <h2>商業化揭露</h2>
          <p>
            網站保留工具推薦與廣告版位，但未填入核准的廣告或 affiliate 參數前，只顯示內建占位。任何正式合作都應清楚揭露，細節可參考合作與廣告揭露頁。
          </p>
          <h2>部署設定</h2>
          <p>
            部署時請設定 NEXT_PUBLIC_SITE_URL，讓 canonical URL、Open Graph 與 sitemap 使用正式網域。NEXT_PUBLIC_GA_ID、NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION 與 AdSense 相關變數皆為可選，沒有設定也能正常 build。
          </p>
        </article>
      </div>
    </>
  );
}
