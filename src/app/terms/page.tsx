import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "使用條款",
  description: "FlowKit AI 的網站使用條款，說明內容用途、責任限制、第三方工具與更新政策。",
  path: "/terms",
  keywords: ["FlowKit AI 使用條款", "AI 工作流內容 使用條款", "自動化教學 免責"],
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "使用條款", path: "/terms" },
        ])}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">Terms</span>
          <h1>使用條款</h1>
          <p>使用本站內容前，請先理解範本、工具筆記與比較頁的用途與限制。</p>
        </div>
      </section>
      <div className="page-shell">
        <article className="article-main">
          <h2>內容用途</h2>
          <p>
            FlowKit AI 提供 AI 自動化工作流、工具筆記與比較內容，目的是協助讀者規劃流程與降低實作門檻。內容不構成法律、財務、資安或商業承諾。
          </p>

          <h2>自行驗證</h2>
          <p>
            不同工具的定價、功能、API 限制與服務條款可能變動。實作前請以各工具官方文件、帳號權限與組織內部政策為準。
          </p>

          <h2>第三方服務</h2>
          <p>
            本站提及的工具與品牌屬於各自權利人。本站與這些第三方服務不一定存在合作、授權或背書關係，除非頁面明確揭露。
          </p>

          <h2>責任限制</h2>
          <p>
            使用者應自行評估自動化流程對資料隱私、營運風險、成本與客戶體驗的影響。因使用本站內容所產生的直接或間接損失，使用者需自行承擔。
          </p>

          <h2>條款更新</h2>
          <p>本站可依營運需求更新條款。繼續使用網站即表示你理解並接受更新後的條款內容。</p>
        </article>
      </div>
    </>
  );
}
