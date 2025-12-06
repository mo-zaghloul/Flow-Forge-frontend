"use client";

import { NodeProps, Handle, Position } from "reactflow";
import { Plus } from "lucide-react";
import type { FlowNodeData } from "../types/node-config";

interface StartNodeProps extends NodeProps<FlowNodeData> {
  data: FlowNodeData & { onAddClick?: () => void };
}

export default function StartNode({ data }: StartNodeProps) {
  const nodeData: FlowNodeData = data || { label: "Start", isStartNode: true };

  return (
    <div className="relative bg-white border-2 border-gray-300 rounded-[30px] w-[190px] h-[80px] flex items-center px-6 gap-3 shadow-lg">
      
      <button
        onClick={data?.onAddClick}
        className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center transition-all hover:scale-110"
      >
        <Plus size={24} className="text-white" />
      </button>

      <div className="flex flex-col">
        <div className="font-bold text-gray-800 text-lg">{nodeData.label}</div>
        <div className="text-xs text-gray-500">Click + to add node</div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
}