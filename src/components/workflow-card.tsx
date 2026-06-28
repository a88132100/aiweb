import Link from "next/link";
import { ArrowRight, Clock, Layers3 } from "lucide-react";
import type { Workflow } from "@/content/types";
import { getCategory, getToolsForSlugs } from "@/lib/content";

const difficultyLabel = {
  beginner: "入門",
  intermediate: "中階",
  advanced: "進階",
};

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const category = getCategory(workflow.category);
  const toolNames = getToolsForSlugs(workflow.tools)
    .map((tool) => tool.name)
    .slice(0, 4);

  return (
    <article className="workflow-card">
      <div className="card-meta-row">
        <span>{category?.name}</span>
        <span>{difficultyLabel[workflow.difficulty]}</span>
      </div>
      <h3>
        <Link href={`/workflows/${workflow.slug}`}>{workflow.title}</Link>
      </h3>
      <p>{workflow.summary}</p>
      <div className="mini-meta">
        <span>
          <Clock size={15} aria-hidden="true" />
          {workflow.estimatedMinutes} 分鐘
        </span>
        <span>
          <Layers3 size={15} aria-hidden="true" />
          {toolNames.join(" / ")}
        </span>
      </div>
      <Link className="text-link" href={`/workflows/${workflow.slug}`}>
        查看流程
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
