"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import FlowCanvas from "@/components/flow/FlowCanvas";
import WorkflowTopbar from "@/components/WorkFlowTopBar";
import {
  GetWorkflow,
  GetWorkflowResponse,
  UpdateWorkflow,
  UpdateWorkflowRequest,
  ExecuteNode,
  NodeRunResponse,
} from "@/lib/api/node-api";
import { Node, Edge } from "reactflow";

export default function FlowPage() {
  const params = useParams();
  const workflowId = params?.flowsId as string;

  const [workflow, setWorkflow] = useState<GetWorkflowResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [outputDialogOpen, setOutputDialogOpen] = useState(false);
  const [executionResponse, setExecutionResponse] =
    useState<NodeRunResponse | null>(null);

  const canvasRef = useRef<{ getNodes: () => Node[]; getEdges: () => Edge[] }>(
    null
  );

  // Load workflow data on mount
  useEffect(() => {
    if (!workflowId) return;

    async function loadWorkflow() {
      try {
        setLoading(true);
        const data = await GetWorkflow(workflowId);
        setWorkflow(data);
      } catch (error) {
        console.error("Failed to load workflow:", error);
        // TODO: Show error to user
      } finally {
        setLoading(false);
      }
    }

    loadWorkflow();
  }, [workflowId]);

  // Save workflow
  const handleSave = async () => {
    if (!workflowId || !canvasRef.current) return;

    try {
      setSaving(true);

      const nodes = canvasRef.current.getNodes();
      const edges = canvasRef.current.getEdges();

      // Transform nodes to API format
      const apiNodes = nodes
        .filter((node) => !node.data.isNewNode) // Exclude "New Node" placeholders
        .map((node) => {
          // Find the edge that connects from this node
          const outgoingEdge = edges.find((edge) => edge.source === node.id);

          return {
            node_id: node.id,
            node_type: node.data.nodeType || node.data.type || "default",
            position: {
              x: node.position.x,
              y: node.position.y,
            },
            next_node_id: outgoingEdge?.target || "",
            data: {
              media_url: node.data.media_url || "",
              agent_api_key: node.data.agent_api_key || "",
              prompt: node.data.prompt || "",
            },
          };
        });

      const updateRequest: UpdateWorkflowRequest = {
        nodes: apiNodes,
      };

      await UpdateWorkflow(updateRequest, workflowId);
      console.log("Workflow saved successfully");
      // TODO: Show success message
    } catch (error) {
      console.error("Failed to save workflow:", error);
      // TODO: Show error message
    } finally {
      setSaving(false);
    }
  };

  // Execute workflow
  const handleExecute = async () => {
    if (!workflowId) return;

    try {
      setExecuting(true);

      // First, save the workflow
      await handleSave();

      // Then execute it
      const response = await ExecuteNode(workflowId);
      setExecutionResponse(response);
      setOutputDialogOpen(true);

      console.log("Workflow executed successfully:", response);
    } catch (error) {
      console.error("Failed to execute workflow:", error);
      // TODO: Show error message
    } finally {
      setExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading workflow...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Topbar */}
      <div className="w-full h-fit flex items-center p-4 bg-white border-b border-gray-200">
        <WorkflowTopbar
          title={workflow?.title}
          author={workflow?.author}
          onSave={handleSave}
          onExecute={handleExecute}
          saving={saving}
          executing={executing}
        />
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <FlowCanvas ref={canvasRef} initialNodes={workflow?.nodes} />
      </div>

      {/* Output Dialog */}
      {executionResponse && (
        <OutputDialog
          open={outputDialogOpen}
          onOpenChange={setOutputDialogOpen}
          response={executionResponse}
        />
      )}
    </div>
  );
}
