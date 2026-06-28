import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/content/types";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="tool-card">
      <div className="card-intro">
        <span className="tool-category">{tool.category}</span>
        <h3>
          <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
        </h3>
        <p>{tool.summary}</p>
      </div>
      <div className="chip-row">
        {tool.bestFor.slice(0, 3).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <Link className="text-link" href={`/tools/${tool.slug}`}>
        工具筆記
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
