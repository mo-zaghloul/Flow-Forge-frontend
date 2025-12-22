"use client";

import { Download, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface OutputNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave?: (content: string) => void;
}

const STATIC_OUTPUT = `### General Summary of **Software Engineering II**

SWE 2 usually builds on SWE 1 and focuses on **advanced software development practices** and **real-world systems**.

Typical topics include:

• **Software Architecture & Design Patterns** (MVC, layered architecture, Singleton, Factory, Observer, etc.)

• **Object-Oriented Design principles** (SOLID principles, UML diagrams)

• **Agile & Scrum methodologies** (sprints, user stories, product backlog)

• **Requirements engineering (advanced)** (functional vs non-functional requirements)

• **Testing techniques** (unit testing, integration testing, test-driven development)

• **Version control & collaboration** (Git, GitHub workflows)

• **Software maintenance & refactoring**

• **Project management basics** (estimation, risk management)

• **Team-based software project**

**Goal of the course:**
To prepare students to **design, develop, test, and maintain large-scale software systems** while working in teams using industry practices.`;

export default function OutputNodeDialog({ 
  isOpen, 
  onClose,
}: OutputNodeDialogProps) {
  const handleDownload = () => {
    const blob = new Blob([STATIC_OUTPUT], { type: 'text/markdown' });
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Workflow Output',
          text: STATIC_OUTPUT,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(STATIC_OUTPUT);
      alert('Content copied to clipboard!');
    }
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
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition bg-white rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pt-6">
          <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50">
            <ScrollArea className="h-[400px]">
              <div className="prose prose-sm max-w-none pr-4">
                <ReactMarkdown>{STATIC_OUTPUT}</ReactMarkdown>
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex gap-3 px-8 pb-8 pt-0 bg-white rounded-b-2xl">
          <Button 
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 rounded-full h-12 bg-black hover:bg-gray-800 text-white"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button 
            onClick={handleShare}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 rounded-full h-12"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}