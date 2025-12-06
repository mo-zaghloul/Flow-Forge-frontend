import { api } from "../api";

export type NodeRunRequest = {
    
}
export type NodeRunResponse = {
    
}

export const nodeRunApi = {
    runNode: (nodeRunRequest: NodeRunRequest) => {
        return api.post("/node-run", nodeRunRequest);
    }
}
