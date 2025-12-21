import { api } from "./api";
//Get api/workflows
export type GetWorkflowsResponse = {
  workflows_id: string;
  title: string;
  description: string;
  author: string;
}[];

export const GetWorkflows = async () => {
  const response = await api.get<GetWorkflowsResponse>("/workflows");
  console.log("GetWorkflows response:", response.data);
  
  // Handle if the response is wrapped in an object (e.g., { workflows: [...] })
  if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
    // @ts-ignore - API might return wrapped data
    if (Array.isArray(response.data.workflows)) {
      // @ts-ignore
      return response.data.workflows;
    }
  }
  
  // Return empty array if data is not in expected format
  if (!Array.isArray(response.data)) {
    console.error("GetWorkflows: Expected array but got:", typeof response.data, response.data);
    return [];
  }
  
  return response.data;
};

//Get api/workflows/{workflow_id}
export type GetWorkflowResponse = {
  title: string;
  author: string;
  nodes: {
    node_id: string;
    node_type: string;
    position: {
      x: number;
      y: number;
    };
    next_node_id: string;
    data: {
      media_url: string;
      agent_api_key: string;
      prompt: string;
    };
  }[];
};
export const GetWorkflow = async (workflowId: string) => {
  const response = await api.get<GetWorkflowResponse>(
    `/workflows/${workflowId}`
  );
  return response.data;
};

//post api/workflows
export type CreateWorkflowRequest = {
  title: string;
  description: string;
};
export type CreateWorkflowResponse = {
  workflows_id: string;
};
export const CreateWorkflow = async (
  createWorkflowRequest: CreateWorkflowRequest
) => {
  const response = await api.post<CreateWorkflowResponse>(
    "/workflows",
    createWorkflowRequest
  );
  return response.data;
};

//put api/workflows/{workflow_id}
export type UpdateWorkflowRequest = {
  nodes: {
    node_id: string;
    node_type: string;
    position: {
      x: number;
      y: number;
    };
    next_node_id: string;
    data: {
      media_url: string;
      agent_api_key: string;
      prompt: string;
    };
  }[];
};

export type UpdateWorkflowResponse = {
  workflows_id: string;
};

export const UpdateWorkflow = async (
  updateWorkflowRequest: UpdateWorkflowRequest,
  workflowId: string
) => {
  const response = await api.put<UpdateWorkflowResponse>(
    `/workflows/${workflowId}`,
    updateWorkflowRequest
  );
  return response.data;
};

//Post api/workflows/{workflow_id}/execute
export type NodeRunResponse = {
  workflow_id: string;
  workflow_output: string;
  output_file_url: string;
};

export const ExecuteNode = async (workflowId: string) => {
  const response = await api.post<NodeRunResponse>(
    `/workflows/${workflowId}/execute`
  );
  return response.data;
};
