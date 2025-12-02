"use client";
import { useEffect, useState } from 'react';
import FlowCard from '@/components/FlowCard';
import { Plus } from 'lucide-react';
import { getWorkflows, type Workflow } from '@/lib/api/workflows';

export default function Home() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkflows();
  }, []);

  async function loadWorkflows() {
    try {
      setLoading(true);
      const data = await getWorkflows();
      setWorkflows(data);
    } catch (error) {
      console.error('Failed to load workflows:', error);
      // TODO: Add error handling UI
    } finally {
      setLoading(false);
    }
  }

  function handleWorkflowClick(id: string) {
    // TODO: open workflow editor
    console.log('Workflow clicked:', id);
  }

  function handleCreateWorkflow() {
    // TODO: Navigate to workflow creation page
    console.log('Create workflow clicked');
  }

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {loading ? (
          // TODO: Add proper loading skeleton
          <p className="text-gray-600">Loading workflows...</p>
        ) : (
          workflows.map((workflow) => (
            <FlowCard
              key={workflow.id}
              id={workflow.id}
              title={workflow.title}
              description={workflow.description}
              author={workflow.author}
              onClick={() => handleWorkflowClick(workflow.id)}
            />
          ))
        )}
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Create a workflow</h2>
        <p className="text-gray-700 mb-6 text-base">
          Build a chat agent workflow with custom logic and tools
        </p>
        <button 
          onClick={handleCreateWorkflow}
          className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2 font-medium cursor-pointer"
        >
          <span><Plus/> </span>
          <span>Create</span>
        </button>
      </div>
    </div>
  );
}