import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "隱私權政策",
  description: "FlowKit AI 的隱私權政策，說明資料收集、分析工具、廣告與第三方連結的基本處理方式。",
  path: "/privacy",
  keywords: ["FlowKit AI 隱私權政策", "AI 工作流網站 隱私權", "廣告 Cookie"],
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "隱私權政策", path: "/privacy" },
        ])}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">Privacy</span>
          <h1>隱私權政策</h1>
          <p>我們只收集維持網站營運、內容分析與合法商業化所需的最低限度資料。</p>
        </div>
      </section>
      <div className="page-shell">
        <article className="article-main">
          <h2>我們可能收集的資料</h2>
          <p>
            FlowKit AI 目前不提供登入、留言或付款功能。網站可能透過伺服器記錄、流量分析工具或廣告平台收集匿名化的瀏覽資訊，例如頁面瀏覽、裝置類型、來源頁面與互動事件。
          </p>

          <h2>分析與廣告</h2>
          <p>
            若網站啟用 Google Analytics、AdSense 或其他合法工具，第三方服務可能使用 Cookie 或類似技術衡量流量、投放廣告與防止濫用。使用者可透過瀏覽器設定限制 Cookie。
          </p>

          <h2>第三方連結</h2>
          <p>
            本站會連到 n8n、Make、Zapier、ChatGPT、Google、Notion、LINE 等第三方網站。離開本站後，請以該第三方網站的隱私權政策為準。
          </p>

          <h2>資料保留與安全</h2>
          <p>
            我們不會販售可識別個人身份的資料。若未來新增表單、會員或電子報功能，會在上線前更新本政策並說明資料用途。
          </p>

          <h2>聯絡與更新</h2>
          <p>
            本政策會隨網站功能調整而更新。若對資料使用方式有疑問，請透過網站營運者提供的正式聯絡管道提出。
          </p>
        </article>
      </div>
    </>
  );
}
