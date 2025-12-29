"use client";

import { useState, useEffect } from "react";
import { Download, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OutputNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave?: (content: string) => void;
}

export default function OutputNodeDialog({ 
  isOpen, 
  onClose,
  initialContent,
  onSave,
}: OutputNodeDialogProps) {
  // Use initialContent if provided, otherwise show placeholder
  const [content, setContent] = useState(initialContent || "");

  // Update content when initialContent changes
  useEffect(() => {
    if (isOpen) {
      setContent(initialContent || "");
    }
  }, [isOpen, initialContent]);

  const displayContent = content || "No output available yet. Execute the workflow to see results.";

  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow-output.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!content) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Workflow Output',
          text: content,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(content);
      alert('Content copied to clipboard!');
    }
  };

  const handleClose = () => {
    // Save the content before closing
    onSave?.(content);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-8 pb-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Output Node
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition bg-white rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pt-6">
          <div className="border-2 border-gray-200 rounded-2xl p-6 bg-white">
            <ScrollArea className="h-[400px]">
              <div className="markdown-content prose prose-sm max-w-none pr-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayContent}</ReactMarkdown>
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex gap-3 px-8 pb-8 pt-0 bg-white rounded-b-2xl">
          <Button 
            onClick={handleDownload}
            disabled={!content}
            className="flex-1 flex items-center justify-center gap-2 rounded-full h-12 bg-black hover:bg-gray-800 text-white disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button 
            onClick={handleShare}
            disabled={!content}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 rounded-full h-12 disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}