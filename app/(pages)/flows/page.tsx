"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FlowCard from "@/components/FlowCard";
import { Plus } from "lucide-react";
import { GetWorkflows, GetWorkflowsResponse } from "@/lib/api/node-api";
import CreateWorkflowDialog from "@/components/dialogs/CreateWorkflowDialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const [workflows, setWorkflows] = useState<GetWorkflowsResponse>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    loadWorkflows();
  }, []);

  async function loadWorkflows() {
    try {
      setLoading(true);
      const data = await GetWorkflows();
      setWorkflows(data);
    } catch (error) {
      console.error("Failed to load workflows:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleGoToCanvas(workflowId: string) {
    router.push(`/flows/${workflowId}`);
  }

  function handleWorkflowCreated(workflowId: string) {
    // Redirect to the newly created workflow's canvas
    router.push(`/flows/${workflowId}`);
  }

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      {/* Header with Create Workflow button */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Workflows</h1>
          <p className="text-gray-600 mt-1">
            Manage and create your workflow automations
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-black text-white hover:bg-gray-800 inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Workflow
        </Button>
      </div>

      {/* Workflows grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeleton
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-300 rounded-2xl p-6 shadow animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-400 rounded-full mb-4" />
                <div className="h-4 bg-gray-400 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-400 rounded w-full mb-1" />
                <div className="h-3 bg-gray-400 rounded w-2/3" />
              </div>
            ))}
          </>
        ) : workflows.length === 0 ? (
          // Empty state
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No workflows yet</p>
            <p className="text-gray-500 mb-6">
              Create your first workflow to get started
            </p>
            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="bg-black text-white hover:bg-gray-800 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Workflow
            </Button>
          </div>
        ) : (
          // Workflows list
          workflows.map((workflow) => (
            <FlowCard
              key={workflow.workflows_id}
              id={workflow.workflows_id}
              title={workflow.title}
              description={workflow.description}
              author={workflow.author}
              onGoToCanvas={handleGoToCanvas}
            />
          ))
        )}
      </div>

      {/* Create Workflow Dialog */}
      <CreateWorkflowDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSuccess={handleWorkflowCreated}
      />
    </div>
  );
}
