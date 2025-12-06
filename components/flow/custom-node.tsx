"use client";

import { NodeProps, Handle, Position } from "reactflow";
import { Plus } from "lucide-react";
import type { FlowNodeData } from "../types/node-config";

interface CustomNodeProps extends NodeProps<FlowNodeData> {
  data: FlowNodeData & { onAddClick?: () => void };
}

export default function CustomNode({ data }: CustomNodeProps) {
  const nodeData: FlowNodeData = data || { label: "New Node" };

  return (
    <div className="relative bg-white border-2 border-gray-300 rounded-[20px] w-[190px] min-h-[80px] flex items-center px-4 py-3 gap-3 shadow-md hover:shadow-lg transition-shadow">
      
      {/* زرار + على الشمال (للـ New Node فقط) */}
      {nodeData.isNewNode ? (
        <button
          onClick={data?.onAddClick}
          className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110 shrink-0"
        >
          <Plus size={20} className="text-white" />
        </button>
      ) : (
        /* الأيقونة الخاصة بالـ node */
        <div className={`w-10 h-10 rounded-lg ${nodeData.bgColor || 'bg-gradient-to-br from-purple-100 to-purple-200'} flex items-center justify-center shrink-0`}>
          {nodeData.icon ? (
            <nodeData.icon className={`w-5 h-5 ${nodeData.iconColor || 'text-black'}`} />
          ) : (
            <span className="text-2xl">⚡</span>
          )}
        </div>
      )}

      {/* اسم النود */}
      <div className="flex flex-col flex-1">
        <div className="font-semibold text-gray-800">{nodeData.label}</div>
        {nodeData.type && (
          <div className="text-xs text-gray-500">{nodeData.type}</div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
}