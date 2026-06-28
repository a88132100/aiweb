import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell">
      <article className="article-main">
        <span className="eyebrow">404</span>
        <h1>找不到這個頁面</h1>
        <p>這個內容可能尚未建立，或 slug 已經調整。</p>
        <div className="action-row">
          <Link href="/workflows" className="button-primary">
            回工作流列表
          </Link>
        </div>
      </article>
    </div>
  );
}
