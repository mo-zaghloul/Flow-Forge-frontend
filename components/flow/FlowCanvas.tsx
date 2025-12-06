"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

import BaseNode from "./BaseNode";
import NodePickerDialog from "./dialog";
import { FlowNodeData } from "../types/node-config";
import { NodeTemplate } from "../types/node-config";

const nodeTypes = {
  custom: BaseNode,
};

const initialNodes: Node<FlowNodeData>[] = [
  {
    id: "new-1",
    type: "custom",
    position: { x: 250, y: 200 },
    data: { label: "New Node", isNewNode: true },
  },
];

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSourceNodeId, setSelectedSourceNodeId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNodeClick = useCallback((nodeId: string) => {
    setSelectedSourceNodeId(nodeId);
    setDialogOpen(true);
  }, []);

  const handleSelectNode = useCallback(
    (nodeTemplate: NodeTemplate) => {
      if (!selectedSourceNodeId) return;

      const sourceNode = nodes.find((n) => n.id === selectedSourceNodeId);
      if (!sourceNode) return;

      // 1. تحويل النود الحالية (New Node) للنود المختار
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedSourceNodeId && node.data.isNewNode) {
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeTemplate.name,
              type: nodeTemplate.type,
              icon: nodeTemplate.icon,           // الأيقونة
              bgColor: nodeTemplate.bgColor,     // لون الخلفية
              iconColor: nodeTemplate.iconColor, // لون الأيقونة
              isNewNode: false,
            },
          };
        }
        return node;
      });

      // 2. إنشاء "New Node" جديدة
      const newNodeId = `new-${Date.now()}`;
      const newNode: Node<FlowNodeData> = {
        id: newNodeId,
        type: "custom",
        position: {
          x: sourceNode.position.x + 300,
          y: sourceNode.position.y,
        },
        data: {
          label: "New Node",
          isNewNode: true,
        },
      };

      // 3. تحديث الـ Nodes والـ Edges
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

  // إضافة onAddClick فقط للـ New Nodes
  const nodesWithHandlers = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onAddClick: node.data.isNewNode ? () => handleAddNodeClick(node.id) : undefined,
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

      <NodePickerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelectNode={handleSelectNode}
      />
    </>
  );
}