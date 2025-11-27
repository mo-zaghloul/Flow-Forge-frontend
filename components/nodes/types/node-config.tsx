export type NodeConfig = {
  [key: string]: any;
};

export interface FlowNodeData {
  label: string;
  reactflowType?: string;
  config?: NodeConfig;
  onAddNode?: (id: string) => void;
}
