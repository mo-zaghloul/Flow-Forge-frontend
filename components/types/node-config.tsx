import { LucideIcon } from "lucide-react";

export type NodeConfig = {
  [key: string]: LucideIcon | string;
};

export interface FlowNodeData {
  id: string;
  label: string;
  type?: string;
  nodeType?: string; // Node type from API
  config?: NodeConfig;
  isStartNode?: boolean;
  isNewNode?: boolean;
  icon?: LucideIcon | string;
  bgColor?: string;
  baseColor?: string;
  iconColor?: string;
  onAddClick?: () => void;
  onAgentClick?: () => void;
  onUploadClick?: () => void;
  onOutputClick?: () => void;

  
  // API data fields
  media_url?: string;
  agent_api_key?: string;
  prompt?: string;
}

export interface NodeTemplate {
  id: string;
  name: string;
  type: string;
  icon: LucideIcon | string;
  bgColor: string;
  baseColor?: string;
  iconColor: string;
  description?: string;
}
