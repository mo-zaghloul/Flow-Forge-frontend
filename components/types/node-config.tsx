import { LucideIcon } from "lucide-react";

export type NodeConfig = {
  [key: string]: LucideIcon | string;
};

// Agent node configuration
export interface AgentNodeConfig {
  agentName: string;
  agentInstructions: string;
  mediaUrl: string;
  includeChatHistory: boolean;
  tools: string[];
}

// Upload media node configuration
export interface UploadNodeConfig {
  mediaUrl: string;
  publicId: string;
  resourceType: string;
  format: string;
  fileName: string;
}

// Output node configuration
export interface OutputNodeConfig {
  outputType: string;
  content: string;
}

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

  // Node-specific configurations
  agentConfig?: AgentNodeConfig;
  uploadConfig?: UploadNodeConfig;
  outputConfig?: OutputNodeConfig;

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
