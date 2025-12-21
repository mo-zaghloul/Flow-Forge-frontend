"use client";

import {
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { X } from "lucide-react";

import BaseNode from "./BaseNode";
import NodePickerDialog from "./dialog";
import { FlowNodeData } from "../types/node-config";
import { NodeTemplate } from "../types/node-config";
import CreateAgentDialog from "../dialogs/CreateAgentDialog";
import UploadMediaDialog from "../dialogs/UploadMediaDialog";
import OutputNodeDialog from "../dialogs/OutputNodeDialog";
import type { CloudinaryUploadResult } from "@/lib/api/cloudinary";

const nodeTypes = {
  custom: BaseNode,
};

const defaultNodes: Node<FlowNodeData>[] = [
  {
    id: "new",
    type: "custom",
    position: { x: 250, y: 200 },
    data: { id: "new", label: "New Node", isNewNode: true },
  },
];

interface FlowCanvasProps {
  initialNodes?: {
    node_id: string;
    node_type: string;
    position: { x: number; y: number };
    next_node_id: string;
    data: {
      media_url: string;
      agent_api_key: string;
      prompt: string;
    };
  }[];
}

export interface FlowCanvasRef {
  getNodes: () => Node[];
  getEdges: () => Edge[];
}

const FlowCanvas = forwardRef<FlowCanvasRef, FlowCanvasProps>(
  ({ initialNodes }, ref) => {
    // Transform API nodes to ReactFlow format
    const transformedNodes: Node<FlowNodeData>[] =
      initialNodes && initialNodes.length > 0
        ? initialNodes.map((node) => ({
            id: node.node_id,
            type: "custom",
            position: node.position,
            data: {
              id: node.node_id,
              label: node.node_type,
              nodeType: node.node_type,
              type: node.node_type,
              isNewNode: false,
              media_url: node.data.media_url,
              agent_api_key: node.data.agent_api_key,
              prompt: node.data.prompt,
            },
          }))
        : defaultNodes;

    // Build edges from next_node_id references
    const transformedEdges: Edge[] =
      initialNodes && initialNodes.length > 0
        ? initialNodes
            .filter((node) => node.next_node_id && node.next_node_id !== "")
            .map((node) => ({
              id: `edge-${node.node_id}-${node.next_node_id}`,
              source: node.node_id,
              target: node.next_node_id,
              animated: true,
            }))
        : [];

    const [nodes, setNodes, onNodesChange] = useNodesState(transformedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(transformedEdges);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSourceNodeId, setSelectedSourceNodeId] = useState<
      string | null
    >(null);
    const [agentDialogOpen, setAgentDialogOpen] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<CloudinaryUploadResult | null>(null);
    const [outputNodeDialogOpen, setOutputNodeDialogOpen] = useState(false);

    // Expose getNodes and getEdges to parent via ref
    useImperativeHandle(ref, () => ({
      getNodes: () => nodes,
      getEdges: () => edges,
    }));

    const onConnect = useCallback(
      (params: Connection) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
    );

    const handleAddNodeClick = useCallback((nodeId: string) => {
      setSelectedSourceNodeId(nodeId);
      setDialogOpen(true);
    }, []);

    const handleAgentDialogClick = useCallback((nodeId: string) => {
      setSelectedSourceNodeId(nodeId);
      setAgentDialogOpen(true);
    }, []);

    const handleUploadDialogClick = useCallback((nodeId: string) => {
      setSelectedSourceNodeId(nodeId);
      setUploadDialogOpen(true);
    }, []);

    const handleUploadSuccess = useCallback((result: CloudinaryUploadResult) => {
      console.log("File uploaded successfully:", result);
      setUploadedFile(result);
      // TODO: Update node data with the uploaded file public_id
      // You can store result.public_id in the node's media_url field
    }, []);

    const handleOutputNodeClick = useCallback((nodeId: string) => {
      setSelectedSourceNodeId(nodeId);
      setOutputNodeDialogOpen(true);
    }, []);

    const handleOutputSave = useCallback((content: string) => {
      console.log("Output saved:", content);
      // TODO: Update node data with the output content
    }, []);

    const handleSelectNode = useCallback(
      (nodeTemplate: NodeTemplate) => {
        if (!selectedSourceNodeId) return;

        const sourceNode = nodes.find((n) => n.id === selectedSourceNodeId);
        if (!sourceNode) return;

        // Convert current node (New Node) to selected node
        const updatedNodes = nodes.map((node) => {
          if (node.id === selectedSourceNodeId && node.data.isNewNode) {
            return {
              ...node,
              data: {
                ...node.data,
                id: nodeTemplate.id,
                label: nodeTemplate.name,
                type: nodeTemplate.type,
                nodeType: nodeTemplate.type,
                icon: nodeTemplate.icon,
                bgColor: nodeTemplate.bgColor,
                iconColor: nodeTemplate.iconColor,
                isNewNode: false,
              },
            };
          }
          return node;
        });

        // Create new "New Node"
        const newNodeId = `new-${Date.now()}`;
        const newNode: Node<FlowNodeData> = {
          id: newNodeId,
          type: "custom",
          position: {
            x: sourceNode.position.x + 300,
            y: sourceNode.position.y,
          },
          data: {
            id: newNodeId,
            label: "New Node",
            isNewNode: true,
          },
        };

        // Update nodes and edges
        setNodes([...updatedNodes, newNode]);
        setEdges((eds) => [
          ...eds,
          {
            id: `edge-${selectedSourceNodeId}-${newNodeId}`,
            source: selectedSourceNodeId,
            target: newNodeId,
            animated: true,
          },
        ]);
      },
      [selectedSourceNodeId, nodes, setNodes, setEdges]
    );

    // Add onAddClick only for New Nodes
    const nodesWithHandlers = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onAddClick: node.data.isNewNode
          ? () => handleAddNodeClick(node.id)
          : undefined,
        onAgentClick:
          node.data.id === "agent"
            ? () => handleAgentDialogClick(node.id)
            : undefined,
        onUploadClick:
          node.data.id === "upload"
            ? () => handleUploadDialogClick(node.id)
            : undefined,
        onOutputClick:
          node.data.id === "output"
            ? () => handleOutputNodeClick(node.id)
            : undefined,
      },
    }));

    return (
      <>
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Background />
          <Controls />
        </ReactFlow>

        {/* Upload Result Dialog */}
        {uploadedFile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-xl p-8">
              <button
                onClick={() => setUploadedFile(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Last Upload Result:</h3>
              
              <div className="space-y-3 text-sm">
                <p><strong>Public ID:</strong> {uploadedFile.public_id}</p>
                <p>
                  <strong>URL:</strong>{" "}
                  <a
                    href={uploadedFile.secure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {uploadedFile.secure_url}
                  </a>
                </p>
                <p><strong>Type:</strong> {uploadedFile.resource_type}</p>
                <p><strong>Format:</strong> {uploadedFile.format}</p>
                <p><strong>Size:</strong> {(uploadedFile.bytes / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          </div>
        )}

        <CreateAgentDialog
          open={agentDialogOpen}
          onClose={() => setAgentDialogOpen(false)}
        />
        <UploadMediaDialog
          isOpen={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
        <OutputNodeDialog
          isOpen={outputNodeDialogOpen}
          onClose={() => setOutputNodeDialogOpen(false)}
          onSave={handleOutputSave}
        />
        <NodePickerDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSelectNode={handleSelectNode}
        />
      </>
    );
  }
);

FlowCanvas.displayName = "FlowCanvas";

export default FlowCanvas;
