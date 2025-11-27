export type NodeConfig = {
  [key: string]: any;
};

export interface FlowNodeData {
  label: string;
  type?: string;
  config?: NodeConfig;
  onAddNode?: (id: string) => void;
}
