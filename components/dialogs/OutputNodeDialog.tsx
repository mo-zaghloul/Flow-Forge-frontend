"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

interface OutputNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave?: (content: string) => void;
}

export default function OutputNodeDialog({ 
  isOpen, 
  onClose,
  initialContent = "",
  onSave 
}: OutputNodeDialogProps) {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = () => {
    onSave?.(content);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-xl p-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Output Node
        </h2>

        {/* Toggle Preview/Edit */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={!isPreview ? "default" : "outline"}
            onClick={() => setIsPreview(false)}
            size="sm"
          >
            Edit
          </Button>
          <Button
            variant={isPreview ? "default" : "outline"}
            onClick={() => setIsPreview(true)}
            size="sm"
          >
            Preview
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto mb-6">
          {!isPreview ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your output content here... (Supports Markdown)"
              className="min-h-[400px] font-mono text-sm"
            />
          ) : (
            <div className="border rounded-lg p-6 min-h-[400px] bg-gray-50">
              {content ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No content to preview. Switch to Edit mode to add content.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-black hover:bg-gray-800">
            Save Output
          </Button>
        </div>
      </div>
    </div>
  );
}
