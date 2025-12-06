"use client";

import FlowCanvas from "@/components/flow/FlowCanvas";
import { Button } from "@/components/ui/button";

export default function FlowPage() {
  
  return (
    <div className="relative w-full h-screen">
      <div className="fixed top-4 left-0 w-full flex justify-center z-50">
        <div className="w-full max-w-100 rounded-full items-center justify-center flex backdrop-blur-sm">
          <Button >run</Button>
        </div>
      </div>
      <FlowCanvas />
    </div>
  );
}
