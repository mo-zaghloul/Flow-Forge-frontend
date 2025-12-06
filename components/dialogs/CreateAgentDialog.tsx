"use client";

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
import { PlusIcon } from "lucide-react";

interface CreateAgentDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateAgentDialog({ open, onClose }: CreateAgentDialogProps) {
  const handleUpload = () => {
    console.log("Upload");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
            <Input placeholder="Agent Name" />
          </div>

          {/* Agent Instructions */}
          <div className="space-y-1">
            <Label>Agent Instructions</Label>
            <Textarea rows={4} placeholder="Agent Instructions" />
          </div>

          {/* Media URL */}
          <div className="space-y-1">
            <Label>Media URL</Label>
            <Input placeholder="Media URL" />
          </div>

          {/* Include Chat History */}
          <div className="flex items-center justify-between py-2">
            <Label className="text-sm font-medium">Include Chat History</Label>
            <Switch />
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
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpload}>Create Agent</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
