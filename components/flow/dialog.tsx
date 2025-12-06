"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { availableNodes } from "../lib/node-config";
import { NodeTemplate } from "../types/node-config";

interface NodePickerDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectNode: (node: NodeTemplate) => void;
}

export default function NodePickerDialog({
  open,
  onClose,
  onSelectNode,
}: NodePickerDialogProps) {
  const [search, setSearch] = useState("");

  const filtered = availableNodes.filter((n) =>
    n.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (node: NodeTemplate) => {
    onSelectNode(node);
    onClose();
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-6 max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Add New Node
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Choose a node type to add to your workflow
          </DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative my-4">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
          <Input
            placeholder="Insert node..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-200 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
            autoFocus
            suppressHydrationWarning
          />
        </div>

        {/* Nodes List */}
        <div className="flex flex-col gap-3 overflow-auto flex-1 pr-2">
          {filtered.length > 0 ? (
            filtered.map((node, idx) => {
              const Icon = node.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(node)}
                  className="flex items-center gap-3 bg-gray-50 hover:bg-gray-200 rounded-lg p-3 transition-all"
                  suppressHydrationWarning
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center ${node.bgColor} rounded-md shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${node.iconColor}`} />
                  </div>

                  <div className="flex flex-col items-start flex-1 text-left">
                    <span className="text-gray-800 font-medium">
                      {node.name}
                    </span>
                    {node.description && (
                      <span className="text-xs text-gray-500">
                        {node.description}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              No nodes found matching &quot;{search}&quot;
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
