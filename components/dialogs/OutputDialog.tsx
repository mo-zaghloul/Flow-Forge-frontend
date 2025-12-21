import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Download, Share2 } from "lucide-react";
import { NodeRunResponse } from "@/lib/api/node-api";
import ReactMarkdown from "react-markdown";

const STATIC_OUTPUT = `### General Summary of **Software Engineering II**

SWE 2 usually builds on SWE 1 and focuses on **advanced software development practices** and **real-world systems**.

Typical topics include:

* **Software Architecture & Design Patterns**
  (MVC, layered architecture, Singleton, Factory, Observer, etc.)
* **Object-Oriented Design principles**
  (SOLID principles, UML diagrams)
* **Agile & Scrum methodologies**
  (sprints, user stories, product backlog)
* **Requirements engineering (advanced)**
  (functional vs non-functional requirements)
* **Testing techniques**
  (unit testing, integration testing, test-driven development)
* **Version control & collaboration**
  (Git, GitHub workflows)
* **Software maintenance & refactoring**
* **Project management basics**
  (estimation, risk management)
* **Team-based software project**

**Goal of the course:**
To prepare students to **design, develop, test, and maintain large-scale software systems** while working in teams using industry practices.`;

export default function OutputDialog({
  open,
  onOpenChange,
  response,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  response: NodeRunResponse;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl p-6 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Workflow Output</DialogTitle>
        </DialogHeader>

        {/* Output Content */}
        <ScrollArea className="mt-4 h-[400px] rounded-md border p-6 bg-white">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{STATIC_OUTPUT}</ReactMarkdown>
          </div>
        </ScrollArea>

        {/* Buttons Row */}
        <div className="flex gap-3 mt-4">
          <Button 
            className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button 
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}