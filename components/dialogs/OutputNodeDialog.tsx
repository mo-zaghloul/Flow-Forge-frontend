"use client";

import { useState, useEffect, useRef } from "react";
import { Download, Share2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OutputNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave?: (content: string) => void;
  isStreaming?: boolean;
}

export default function OutputNodeDialog({ 
  isOpen, 
  onClose,
  initialContent,
  onSave,
  isStreaming = false,
}: OutputNodeDialogProps) {
  // Use initialContent if provided, otherwise show placeholder
  const [content, setContent] = useState(initialContent || "");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update content when initialContent changes (for streaming)
  useEffect(() => {
    setContent(initialContent || "");
  }, [initialContent]);

  // Auto-scroll to bottom during streaming
  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [content, isStreaming]);

  const displayContent = content || (isStreaming ? "" : "No output available yet. Execute the workflow to see results.");

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
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Workflow Output
            </h2>
            {isStreaming && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition bg-white rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pt-6">
          <div className="border-2 border-gray-200 rounded-2xl p-6 bg-white">
            <ScrollArea className="h-[400px]" ref={scrollRef}>
              <div className="markdown-content prose prose-sm max-w-none pr-4">
                {displayContent ? (
                  <>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayContent}</ReactMarkdown>
                    {isStreaming && (
                      <span className="inline-block w-2 h-5 bg-gray-800 animate-pulse ml-0.5" />
                    )}
                  </>
                ) : isStreaming ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Starting workflow execution...</span>
                  </div>
                ) : (
                  <p className="text-gray-500">No output available yet. Execute the workflow to see results.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex gap-3 px-8 pb-8 pt-0 bg-white rounded-b-2xl">
          <Button 
            onClick={handleDownload}
            disabled={!content || isStreaming}
            className="flex-1 flex items-center justify-center gap-2 rounded-full h-12 bg-black hover:bg-gray-800 text-white disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button 
            onClick={handleShare}
            disabled={!content || isStreaming}
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