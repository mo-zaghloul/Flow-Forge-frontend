"use client";

import { NodeProps, Handle, Position } from "reactflow";
import { Plus  } from "lucide-react";
import type { FlowNodeData } from "./types/node-config";

export default function CustomNode({ data }: NodeProps<FlowNodeData>) {
  return (
    <div
    className="
      relative
      bg-white
      border border-gray-300
      rounded-[30px]
      w-[190px]
      h-[80px]
      pt-[31px]
      pr-[26px]
      pb-[31px]
      pl-[26px]
      flex items-center
      gap-[10px]
      opacity-100
    "
  >
 
  

      <button className="w-7 h-7 rounded bg-[#F2F2F2] flex items-center justify-center mr-1">
        <Plus  size={25} className="text-black" />
      </button>

      <div className="flex flex-col items-start">
        <div className="font-semibold text-gray-700">{data.label}</div>
      </div>

      <Handle id="right" type="source" position={Position.Right} className="!bg-red-500" />
      <Handle id="left" type="target" position={Position.Left} className="!bg-green-500" />
    </div>
  );
}
