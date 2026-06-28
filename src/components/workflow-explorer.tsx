"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import type { Category, Workflow } from "@/content/types";
import { WorkflowCard } from "@/components/workflow-card";

type WorkflowExplorerProps = {
  workflows: readonly Workflow[];
  categories: readonly Category[];
};

export function WorkflowExplorer({ workflows, categories }: WorkflowExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredWorkflows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return workflows.filter((workflow) => {
      const matchesCategory = category === "all" || workflow.category === category;
      const haystack = [
        workflow.title,
        workflow.summary,
        workflow.useCase,
        ...workflow.keywords,
        ...workflow.tools,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query, workflows]);

  return (
    <section className="explorer" aria-label="工作流搜尋">
      <div className="search-row">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋 Gmail、LINE、週報、SEO..."
            aria-label="搜尋工作流"
          />
        </label>
        <div className="filter-label">
          <Filter size={17} aria-hidden="true" />
          <span>{filteredWorkflows.length} 個流程</span>
        </div>
      </div>
      <div className="segmented-control" aria-label="分類篩選">
        <button
          type="button"
          className={category === "all" ? "active" : ""}
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
        >
          全部
        </button>
        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            className={category === item.slug ? "active" : ""}
            aria-pressed={category === item.slug}
            onClick={() => setCategory(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {filteredWorkflows.map((workflow) => (
          <WorkflowCard key={workflow.slug} workflow={workflow} />
        ))}
      </div>
    </section>
  );
}
