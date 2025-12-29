"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PlusIcon, FileIcon, ImageIcon, FileTextIcon } from "lucide-react";
import type { AgentNodeConfig } from "../types/node-config";

// Type for uploaded media items passed from FlowCanvas
export interface UploadedMediaItem {
  nodeId: string;
  label: string;
  mediaUrl: string;
  resourceType: string;
  format: string;
}

interface CreateAgentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (config: AgentNodeConfig) => void;
  initialConfig?: AgentNodeConfig;
  uploadedMediaList?: UploadedMediaItem[];
}

const defaultConfig: AgentNodeConfig = {
  agentName: "",
  agentInstructions: "",
  mediaUrl: "",
  includeChatHistory: false,
  tools: [],
};

// Helper to get icon based on resource type
const getMediaIcon = (resourceType: string) => {
  switch (resourceType) {
    case "image":
      return <ImageIcon className="h-4 w-4 text-blue-500" />;
    case "raw":
      return <FileTextIcon className="h-4 w-4 text-orange-500" />;
    default:
      return <FileIcon className="h-4 w-4 text-gray-500" />;
  }
};

export default function CreateAgentDialog({ 
  open, 
  onClose,
  onSave,
  initialConfig,
  uploadedMediaList = [],
}: CreateAgentDialogProps) {
  const [config, setConfig] = useState<AgentNodeConfig>(initialConfig || defaultConfig);

  // Update config when initialConfig changes (e.g., opening dialog for different node)
  useEffect(() => {
    if (open) {
      setConfig(initialConfig || defaultConfig);
    }
  }, [open, initialConfig]);

  const handleSave = () => {
    onSave?.(config);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleMediaSelect = (mediaUrl: string) => {
    setConfig({ ...config, mediaUrl });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="rounded-2xl p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create New Agent
          </DialogTitle>
          <DialogDescription>
            Call the model with your instructions and configure the agent
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* Agent Name */}
          <div className="space-y-1">
            <Label>Agent Name</Label>
            <Input 
              placeholder="Agent Name" 
              value={config.agentName}
              onChange={(e) => setConfig({ ...config, agentName: e.target.value })}
            />
          </div>

          {/* Agent Instructions */}
          <div className="space-y-1">
            <Label>Agent Instructions</Label>
            <Textarea 
              rows={4} 
              placeholder="Agent Instructions" 
              value={config.agentInstructions}
              onChange={(e) => setConfig({ ...config, agentInstructions: e.target.value })}
            />
          </div>

          {/* Media URL - Dropdown for uploaded files or manual input */}
          <div className="space-y-2">
            <Label>Media Source</Label>
            {uploadedMediaList.length > 0 ? (
              <Select
                value={config.mediaUrl}
                onValueChange={handleMediaSelect}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select uploaded media..." />
                </SelectTrigger>
                <SelectContent>
                  {uploadedMediaList.map((media) => (
                    <SelectItem key={media.nodeId} value={media.mediaUrl}>
                      <div className="flex items-center gap-2">
                        {getMediaIcon(media.resourceType)}
                        <span className="truncate max-w-[200px]">{media.label}</span>
                        <span className="text-xs text-gray-400">.{media.format}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                No uploaded media available. Add an Upload Media node first.
              </div>
            )}
            
            {/* Show selected URL or allow manual input */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-500">Or enter URL manually</Label>
              <Input 
                placeholder="https://..." 
                value={config.mediaUrl}
                onChange={(e) => setConfig({ ...config, mediaUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Include Chat History */}
          <div className="flex items-center justify-between py-2">
            <Label className="text-sm font-medium">Include Chat History</Label>
            <Switch 
              checked={config.includeChatHistory}
              onCheckedChange={(checked) => setConfig({ ...config, includeChatHistory: checked })}
            />
          </div>

          {/* Tools */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Tools</Label>
            <Button
              size="icon"
              className="flex items-center gap-2"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full border-t pt-4">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Agent</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
