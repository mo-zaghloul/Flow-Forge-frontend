"use client";

import { NodeProps, Handle, Position } from "reactflow";
import { Plus } from "lucide-react";
import type { FlowNodeData } from "../types/node-config";

interface BaseNodeProps extends NodeProps<FlowNodeData> {
  data: FlowNodeData ;
}

export default function BaseNode({ data }: BaseNodeProps) {
  const nodeData: FlowNodeData = data || { label: "New Node" };
  const isNewNode = nodeData.isNewNode;

  return (
    <div
      className={`relative bg-gray-200 opacity-80 hover:ring hover:ring-gray-400  rounded-[20px] w-fit flex items-center px-4 py-3 gap-3`}>
      {/* زرار + على الشمال (للـ New Node فقط) */}
      {isNewNode ? (
        <button
          onClick={data?.onAddClick}
          className="w-10 h-10  rounded-md cursor-pointer flex items-center justify-center transition-all hover:scale-110 shrink-0"
        >
          <Plus size={20} className="text-black size-9" />
        </button>
      ) : (
        /* الأيقونة الخاصة بالـ node */
        <button
          onClick={data.id === "agent" ? data.onAgentClick : undefined}
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
        className="!w-3 !h-3 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
