"use client";

import { Play, Code2, Save } from "lucide-react";
import { Button } from "./ui/button";

interface WorkflowTopbarProps {
  title?: string;
  author?: string;
  onSave?: () => void;
  onExecute?: () => void;
  saving?: boolean;
  executing?: boolean;
}

export default function WorkflowTopbar({
  title = "Untitled Workflow",
  author = "Unknown",
  onSave,
  onExecute,
  saving = false,
  executing = false,
}: WorkflowTopbarProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Left: Title and Author */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">by {author}</p>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Evaluate */}
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
          <Play className="w-4 h-4" />
          Evaluate
        </button>

        {/* Code */}
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
          <Code2 className="w-4 h-4" />
          Code
        </button>

        {/* Save */}
        <Button
          variant="outline"
          onClick={onSave}
          disabled={saving || executing}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </Button>

        {/* Execute */}
        <Button onClick={onExecute} disabled={saving || executing}>
          {executing ? "Executing..." : "Execute"}
        </Button>
      </div>
    </div>
  );
}
