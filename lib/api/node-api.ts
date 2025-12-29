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

// Streaming execute workflow with SSE support
export const ExecuteWorkflowStream = async (
  workflowId: string,
  onToken: (token: string) => void,
  onComplete: (response: NodeRunResponse) => void,
  onError: (error: Error) => void
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    const response = await fetch(`${baseUrl}/api/workflows/${workflowId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let fullContent = '';
    let responseWorkflowId = workflowId;
    let outputFileUrl = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      
      // Parse SSE format (data: {...}\n\n)
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6); // Remove 'data: ' prefix
          
          try {
            const parsed = JSON.parse(data);
            
            // Handle different event types based on backend response
            if (parsed.type === 'start') {
              responseWorkflowId = parsed.workflow_id || responseWorkflowId;
            } else if (parsed.type === 'token') {
              const token = parsed.content || parsed.token || '';
              fullContent += token;
              onToken(token);
            } else if (parsed.type === 'done') {
              responseWorkflowId = parsed.workflow_id || responseWorkflowId;
              outputFileUrl = parsed.output_file_url || '';
              if (parsed.workflow_output) {
                fullContent = parsed.workflow_output;
              }
            } else if (parsed.type === 'error') {
              throw new Error(parsed.message || 'Stream error');
            }
          } catch (parseError) {
            // If it's not JSON, treat it as raw token text
            if (data && data !== '[DONE]') {
              fullContent += data;
              onToken(data);
            }
          }
        }
      }
    }

    // Call complete callback with final response
    onComplete({
      workflow_id: responseWorkflowId,
      workflow_output: fullContent,
      output_file_url: outputFileUrl,
    });
    
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
};
