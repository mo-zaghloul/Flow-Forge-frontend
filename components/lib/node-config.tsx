import {
  MousePointer2,
  ArrowRight,
  Upload,
  Square,
  Play,
} from "lucide-react";
import { NodeTemplate } from "../types/node-config";

const BASE_COLOR = "bg-[#ffffff]";
export const availableNodes: NodeTemplate[] = [
  {
    id: "start",
    name: "Start",
    type: "",
    icon: Play,
    bgColor: "bg-[#7AF1A7]",
    iconColor: "text-black",
    baseColor: "bg-[#ffffff]",
    description: "Start your workflow",
  },
  {
    id: "agent",
    name: "Agent",
    type: "agent",
    icon: MousePointer2,
    bgColor: "bg-[#0037FF9E]",
    iconColor: "text-black",
    baseColor: BASE_COLOR,
    description: "AI agent node",
  },
  {
    id: "upload",
    name: "Upload Media",
    type: "upload",
    icon: Upload,
    bgColor: "bg-[#FF8E149E]",
    baseColor: BASE_COLOR,
    iconColor: "text-black",
    description: "Upload files and media",
  },
  {
    id: "output",
    name: "Output",
    type: "output",
    icon: ArrowRight,
    baseColor: BASE_COLOR,
    bgColor: "bg-[#FF1418B8]",
    iconColor: "text-black",
    description: "Output results",
  },
  {
    id: "end",
    name: "End",
    type: "end",
    icon: Square,
    bgColor: "bg-[#14FFE4B8]",
    baseColor: BASE_COLOR,
    iconColor: "text-black",
    description: "End workflow",
  },
];
