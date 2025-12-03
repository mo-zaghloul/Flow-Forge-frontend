"use client";

import { useState } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { Upload } from "lucide-react";
import type { FlowNodeData } from "./types/node-config";
import UploadMediaDialog from "@/components/dialogs/UploadMediaDialog";
import type { CloudinaryUploadResult } from "@/lib/api/cloudinary";

export default function UploadMediaNode({ data }: NodeProps<FlowNodeData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<CloudinaryUploadResult | null>(null);

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    console.log("Media uploaded:", result);
    setUploadedMedia(result);
    // TODO: Store the public_id in node data for workflow execution
    // You can update the node data here if needed
  };

  const handleNodeClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        onClick={handleNodeClick}
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
          cursor-pointer
          hover:shadow-lg
          transition-shadow
        "
      >
        <button className="w-8 h-8 rounded bg-[#FF8E149E] text-white flex items-center justify-center mr-2">
          <Upload size={25} />
        </button>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-700">{data.label}</span>
          {uploadedMedia && (
            <span className="text-xs text-gray-500 truncate max-w-[120px]">
              {uploadedMedia.public_id}
            </span>
          )}
        </div>

        <Handle id="right" type="source" position={Position.Right} className="!bg-blue-500" />
        <Handle id="left" type="target" position={Position.Left} className="!bg-green-500" />
      </div>

      <UploadMediaDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
}
