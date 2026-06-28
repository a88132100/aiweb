import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "合作與廣告揭露",
  description: "FlowKit AI 的合作、廣告、affiliate 與工具推薦揭露原則。",
  path: "/disclosure",
  keywords: ["FlowKit AI 合作揭露", "affiliate 揭露", "AI 工具推薦 廣告"],
});

export default function DisclosurePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "合作與廣告揭露", path: "/disclosure" },
        ])}
      />
      <section className="page-hero">
        <div>
          <span className="eyebrow">Disclosure</span>
          <h1>合作與廣告揭露</h1>
          <p>我們會清楚區分內容判斷、廣告版位與合作推薦，避免把廣告包裝成中立評測。</p>
        </div>
      </section>
      <div className="page-shell">
        <article className="article-main">
          <h2>廣告版位</h2>
          <p>
            本站預留廣告與工具推薦版位。未設定核准的廣告單元前，版位只會顯示占位訊息，不會投放未核准廣告。
          </p>

          <h2>Affiliate 與合作連結</h2>
          <p>
            若未來加入 affiliate 或合作連結，讀者透過該連結註冊或購買時，本站可能取得佣金或合作收益。這不會增加讀者的直接成本，但可能支持本站持續更新內容。
          </p>

          <h2>推薦原則</h2>
          <p>
            工具推薦會以使用情境、實作難度、成本、資料控制與維護負擔為主要判斷，不以佣金高低作為唯一排序依據。
          </p>

          <h2>內容獨立性</h2>
          <p>
            若某篇內容包含贊助、合作或明確商業關係，頁面會在合理位置揭露。沒有揭露不代表工具沒有商業模式，而是本站尚未與該工具建立正式合作。
          </p>
        </article>
      </div>
    </>
  );
}
