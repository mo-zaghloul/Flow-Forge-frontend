"use client";

import FlowCanvas from "@/components/flow/FlowCanvas";
import Sidebar from "@/components/SideBar"
export default function FlowPage() {
  return (
    <div className="w-full h-screen">
      <Sidebar/>
      <FlowCanvas />
    </div>
  );
}