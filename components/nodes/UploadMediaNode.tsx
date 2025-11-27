"use client";

import { NodeProps, Handle, Position } from "reactflow";
import { Upload } from "lucide-react";
import type { FlowNodeData } from "./types/node-config";

export default function UploadMediaNode({ data }: NodeProps<FlowNodeData>) {
  return (
    <div
    className="
      w-[207px]
      h-[75px]
      rounded-[30px]
      pt-[31px]
      pr-[26px]
      pb-[31px]
      pl-[26px]
      flex
      items-center
      gap-[10px]
      opacity-100
      bg-white
      border border-gray-300
    "
  >

      <button className="w-8 h-8 rounded bg-[#FF8E149E] text-white flex items-center justify-center mr-2">
        <Upload size={25} />
      </button>

      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{data.label}</span>
      </div>

      <Handle id="right" type="source" position={Position.Right} className="!bg-blue-500" />
      <Handle id="left" type="target" position={Position.Left} className="!bg-green-500" />
    </div>
  );
}
