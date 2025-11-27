import { useState } from "react";
import { Home, FileText, FolderOpen, Layout } from "lucide-react";

interface SidebarProps {
  onPageChange: (page: string) => void;
}

export default function Sidebar({ onPageChange }: SidebarProps) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-50 transition-all duration-300 ${
        open ? "w-14" : "w-56"
      }`}
    >
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-4 flex hover:bg-gray-100"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menu */}
      <ul className="mt-4 flex flex-col gap-2 text-gray-700 font-medium px-2">
        {/* Create a Flow */}
        <li>
          <button 
            onClick={() => onPageChange("createflow")}
            className="w-full flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded transition-colors"
          >
            <FileText size={22} className="flex-shrink-0" />
            {!open && (
              <span className="text-black font-semibold text-sm">
                Create a Flow
              </span>
            )}
          </button>
        </li>

        {/* Home */}
        <li>
          <button 
            onClick={() => onPageChange("home")}
            className="w-full flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded transition-colors"
          >
            <Home size={22} className="flex-shrink-0" />
            {!open && (
              <span className="text-black font-semibold text-sm">Home</span>
            )}
          </button>
        </li>

        {/* Project */}
        <li>
          <button 
            onClick={() => onPageChange("project")}
            className="w-full flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded transition-colors"
          >
            <FolderOpen size={22} className="flex-shrink-0" />
            {!open && (
              <span className="text-black font-semibold text-sm">Project</span>
            )}
          </button>
        </li>

        {/* Templates */}
        <li>
          <button 
            onClick={() => onPageChange("templates")}
            className="w-full flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded transition-colors"
          >
            <Layout size={22} className="flex-shrink-0" />
            {!open && (
              <span className="text-black font-semibold text-sm">
                Templates
              </span>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
}