import Link from "next/link";
import { Blocks, GitCompareArrows, LibraryBig, Wrench } from "lucide-react";
import { site } from "@/lib/site";

const navItems = [
  { href: "/workflows", label: "工作流", icon: Blocks },
  { href: "/tools", label: "工具", icon: Wrench },
  { href: "/categories", label: "分類", icon: LibraryBig },
  { href: "/compare", label: "比較", icon: GitCompareArrows },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label={`${site.name} 首頁`}>
        <span className="brand-mark">FK</span>
        <span>{site.shortName}</span>
      </Link>
      <nav className="main-nav" aria-label="主要導覽">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            <item.icon size={16} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
