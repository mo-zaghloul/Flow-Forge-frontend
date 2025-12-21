"use client";

import { NodeProps, Handle, Position } from "reactflow";
import { Plus } from "lucide-react";
import type { FlowNodeData } from "../types/node-config";

interface BaseNodeProps extends NodeProps<FlowNodeData> {
  data: FlowNodeData;
}

export default function BaseNode({ data }: BaseNodeProps) {
  const nodeData: FlowNodeData = data || { label: "New Node" };
  const isNewNode = nodeData.isNewNode;

  // Detect node type for handle logic
  const nodeType = nodeData.nodeType || nodeData.type || nodeData.id;
  const isStartNode = nodeType === "start" || nodeData.id === "start";
  const isEndNode = nodeType === "end" || nodeData.id === "end";

  return (
    <div
      className={`relative bg-gray-200 opacity-80 hover:ring hover:ring-gray-400 rounded-[20px] w-fit flex items-center px-4 py-3 gap-3`}
    >
      {/* Add button on left (for New Node only, not for end nodes) */}
      {isNewNode && !isEndNode ? (
        <button
          onClick={data?.onAddClick}
          className="w-10 h-10 rounded-md cursor-pointer flex items-center justify-center transition-all hover:scale-110 shrink-0"
        >
          <Plus size={20} className="text-black size-9" />
        </button>
      ) : (
        /* Icon for actual nodes */
        <button
          onClick={
            data.id === "agent" 
              ? data.onAgentClick 
              : (data.id === "upload")
              ? data.onUploadClick
              : (data.id === "output")
              ? data.onOutputClick
              : undefined
          }
          className={`w-10 h-10 rounded-lg ${
            nodeData.bgColor ||
            "bg-gradient-to-br from-purple-100 to-purple-200"
          } flex items-center justify-center shrink-0`}
        >
          {nodeData.icon ? (
            <nodeData.icon
              className={`w-5 h-5 ${nodeData.iconColor || "text-black"}`}
            />
          ) : (
            <span className="text-2xl">⚡</span>
          )}
        </button>
      )}

      {/* Node label */}
      <div className="flex flex-col flex-1">
        <div className="font-semibold text-gray-800">{nodeData.label}</div>
        {nodeData.type && (
          <div className="text-xs text-gray-500">{nodeData.type}</div>
        )}
      </div>

      {/* Handle Logic:
          - Start nodes: Only SOURCE handle (right side)
          - End nodes: Only TARGET handle (left side)
          - Other nodes: Both handles
      */}
      {!isStartNode && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !border-2 !border-white"
        />
      )}
      {!isEndNode && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !border-2 !border-white"
        />
      )}
    </div>
  );
}
