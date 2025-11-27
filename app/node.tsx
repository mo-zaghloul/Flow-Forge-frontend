"use client";

import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Plus } from 'lucide-react';

export default function CustomNode({ data }: NodeProps) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative bg-[#FFFFFF42]-200 border border-gray-300 px-2 py-3 rounded-xl shadow-md w-40 flex items-center">

      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className="w-7 h-7 rounded bg-slate-300 text-black flex items-center justify-center text-lg mr-1"
      >
        <Plus/>
      </button>

      {/* النص في المنتصف */}
      <div className="flex flex-col items-start">
      <div className="font-semibold text-gray-700">
        {data.label}
      </div>
      <div className="font-semibold text-gray-700">
        {data.reactflowType}
      </div>
    </div>


      {/* Handles */}

      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="!bg-green-500"
      />
      
      {openMenu && (
        <div className="absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg w-40 p-2 z-50">
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
            onClick={() => alert('Action 1')}
          >
            Action 1
          </button>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
            onClick={() => alert('Action 2')}
          >
            Action 2
          </button>
        </div>
      )}

    </div>
  );
}
