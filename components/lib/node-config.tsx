import { MousePointer2, ArrowRight, Upload, Square, Play } from "lucide-react";
import { NodeTemplate } from "../types/node-config";

export const availableNodes: NodeTemplate[] = [
  {
    name: "Start",
    type: "",
    icon: Play,
    bgColor: "bg-[#7AF1A7]",
    iconColor: "text-black",
    description: "Start your workflow"
  },
  {
    name: "Agent",
    type: "agent",
    icon: MousePointer2,
    bgColor: "bg-[#0037FF9E]",
    iconColor: "text-black",
    description: "AI agent node"
  },
  {
    name: "Upload Media",
    type: "upload",
    icon: Upload,
    bgColor: "bg-[#FF8E149E]",
    iconColor: "text-black",
    description: "Upload files and media"
  },
  {
    name: "Output",
    type: "output",
    icon: ArrowRight,
    bgColor: "bg-[#FF1418B8]",
    iconColor: "text-black",
    description: "Output results"
  },
  {
    name: "End",
    type: "end",
    icon: Square,
    bgColor: "bg-[#14FFE4B8]",
    iconColor: "text-black",
    description: "End workflow"
  },
];