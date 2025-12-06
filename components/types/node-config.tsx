export type NodeConfig = {
  [key: string]: any;
};

export interface FlowNodeData {
  label: string;
  type?: string;
  config?: NodeConfig;
  isStartNode?: boolean;
  isNewNode?: boolean;
  icon?: any;            
  bgColor?: string;    
  iconColor?: string;    
  onAddClick?: () => void;
}

export interface NodeTemplate {
  name: string;
  type: string;
  icon: any;
  bgColor: string;
  iconColor: string;
  description?: string;
}