"use client";

import { NodeProps, Handle, Position } from "reactflow";
import { MousePointer2 } from "lucide-react";
import type { FlowNodeData } from "./types/node-config";


export default function ExtractNode({ data }: NodeProps<FlowNodeData>) {
  return (
<div
  className="
    w-[160px]
    h-[80px]
    rounded-[30px]
    pt-[31px]
    pr-[25px]
    pb-[31px]
    pl-[25px]
    flex
    items-center
    gap-[10px]
    opacity-100
    bg-white
    border border-gray-300
  "
>

      <button className="w-7 h-7 rounded bg-blue-500 text-white flex items-center justify-center mr-2">
        <MousePointer2 size={18} />
      </button>

      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{data.label}</span>
        <span className="text-xs text-gray-500">Agent</span>
      </div>

      <Handle id="right" type="source" position={Position.Right} className="!bg-purple-500" />
      <Handle id="left" type="target" position={Position.Left} className="!bg-green-500" />
    </div>
  );
}
