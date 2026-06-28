export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category = {
  slug: string;
  name: string;
  summary: string;
  focus: string;
  keywords: string[];
};

export type WorkflowStep = {
  title: string;
  description: string;
  tools: string[];
  qualityGate: string;
};

export type WorkflowFaq = {
  question: string;
  answer: string;
};

export type Workflow = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tools: string[];
  difficulty: Difficulty;
  estimatedMinutes: number;
  useCase: string;
  steps: WorkflowStep[];
  faq: WorkflowFaq[];
  keywords: string[];
  updatedAt: string;
  affiliateTools: string[];
  relatedWorkflows: string[];
};

export type Tool = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  bestFor: string[];
  pricingHint: string;
  officialUrl: string;
  alternatives: string[];
};

export type DecisionRow = {
  factor: string;
  winner: string;
  notes: string;
};

export type Comparison = {
  slug: string;
  title: string;
  tools: string[];
  decisionMatrix: DecisionRow[];
  recommendedFor: string[];
  updatedAt: string;
};
