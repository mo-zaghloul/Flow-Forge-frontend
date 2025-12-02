// API functions for workflows
// TODO: Replace with actual API calls when backend is ready

export interface Workflow {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

// Mock data - replace with actual API call
const mockWorkflows: Workflow[] = [
  {
    id: "1",
    title: "Data Enrichment",
    description: "Pull together data to answer user questions",
    author: "Archive",
  },
  {
    id: "2",
    title: "Planning helper",
    description: "Simple multi-turn workflow for creating work plans",
    author: "Archive",
  },
  {
    id: "3",
    title: "Documents comparison",
    description: "Analyze and highlight differences across uploaded documents",
    author: "Archive",
  },
  {
    id: "4",
    title: "Internal knowledge assistant",
    description: "Triage and answer questions from employees",
    author: "Created by you",
  },
  {
    id: "5",
    title: "Structured Data Q/A",
    description: "Query databases using natural language",
    author: "Created by you",
  },
  {
    id: "6",
    title: "Customer service",
    description: "Resolve customer queries with correct policies",
    author: "Created by you",
  },
];

/**
 * Fetch all workflows
 * TODO: Replace with actual API endpoint
 * Example: const response = await fetch('/api/workflows');
 */
export async function getWorkflows(): Promise<Workflow[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  // TODO: Replace with actual fetch call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflows`);
  // if (!response.ok) throw new Error('Failed to fetch workflows');
  // return response.json();
  
  return mockWorkflows;
}

/**
 * Create a new workflow
 * TODO: Replace with actual API endpoint
 */
export async function createWorkflow(data: Omit<Workflow, 'id'>): Promise<Workflow> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  // TODO: Replace with actual fetch call
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflows`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error('Failed to create workflow');
  // return response.json();
  
  return {
    id: Date.now().toString(),
    ...data,
  };
}
