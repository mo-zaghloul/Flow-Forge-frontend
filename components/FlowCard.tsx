"use client";
import { WorkflowIcon, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface FlowCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  onGoToCanvas: (id: string) => void;
}

export default function FlowCard({
  id,
  title,
  description,
  author,
  onGoToCanvas,
}: FlowCardProps) {
  return (
    <div className="bg-gray-300 rounded-2xl p-6 shadow hover:shadow-lg transition-all cursor-pointer relative group">
      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mb-4">
        <WorkflowIcon className="w-6 h-6 text-black" />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>
      <p className="text-xs text-gray-600 mt-6">{author}</p>

      {/* Go to Canvas button  */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onGoToCanvas(id);
          }}
          className="bg-white text-black hover:bg-gray-100 font-semibold"
        >
          Go to Canvas
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
  );
}
