import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.name}</strong>
        <p>繁體中文 AI 自動化工作流模板庫。內容為人工整理與原創說明，請依實際工具政策與資料隱私要求調整。</p>
      </div>
      <div className="footer-links">
        <Link href="/about">關於</Link>
        <Link href="/disclosure">合作揭露</Link>
        <Link href="/privacy">隱私權</Link>
        <Link href="/terms">條款</Link>
        <Link href="/workflows">工作流</Link>
        <Link href="/compare">工具比較</Link>
        <Link href="/sitemap.xml">Sitemap</Link>
      </div>
    </footer>
  );
}
