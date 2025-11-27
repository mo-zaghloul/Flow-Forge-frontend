"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Home from "./home";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("default");

  return (
    <div
      className="flex w-screen h-screen bg-white"
      style={{
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Sidebar */}
      <Sidebar onPageChange={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1 ml-14">
        {currentPage === "home" && <Home />}
        {currentPage === "default" && <div></div>}
      </div>
    </div>
  );
}