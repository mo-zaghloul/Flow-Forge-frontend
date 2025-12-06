import { LucideIcon } from "lucide-react";

export type NodeConfig = {
  [key: string]: LucideIcon | string;
};

export interface FlowNodeData {
  label: string;
  type?: string;
  config?: NodeConfig;
  isStartNode?: boolean;
  isNewNode?: boolean;
  icon?: LucideIcon | string;            
  bgColor?: string;    
  baseColor?: string;    
  iconColor?: string;    
  onAddClick?: () => void;
}

export interface NodeTemplate {
  name: string;
  type: string;
  icon: LucideIcon | string;
  bgColor: string;
  baseColor?: string;
  iconColor: string;
  description?: string;
}