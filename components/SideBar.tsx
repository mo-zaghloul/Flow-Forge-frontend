"use client";

import { Edit, Workflow, Archive, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { UserButton } from "@clerk/nextjs";

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: "Create Flow", icon: <Edit size={22} />, href: "/canvas" },
    { name: "Flows", icon: <Workflow size={22} />, href: "/flows" },
    { name: "Templates", icon: <Archive size={22} />, href: "/templates" },
  ];

  return (
    <div
      className={`min-h-screen bg-white text-black border-r border-gray-200 flex flex-col justify-between transition-all duration-300 m-2 rounded-2xl shadow-sm
      ${open ? "w-56" : "w-20"}`}
    >
      {/* Logo + Toggle + Menu */}
      <div>
        {/* Logo + Toggle */}
        <div className="py-6 flex justify-center border-b border-gray-100">
          <button onClick={() => setOpen(!open)} className="block">
            <Image
              src="/FlowForgeLogo.png"
              alt="Logo"
              width={40}
              height={40}
              className="transition-all duration-300 hover:scale-110"
              priority
            />
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-6 flex flex-col gap-1 px-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 py-3 hover:bg-gray-100 rounded-lg transition-colors ${
                  open ? "px-3" : "justify-center"
                }`}
              >
                {item.icon}
                {open && (
                  <span className="text-sm font-semibold">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: Clerk UserButton + Settings */}
      <div className="border-t border-gray-100">
        <div
          className={`py-4 px-2 flex items-center ${
            open ? "justify-between" : "justify-center"
          }`}
        >
          {/* Clerk User Button */}
          <div className="flex items-center gap-3">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
            {open && (
              <div className="flex flex-col">
                <span className="font-semibold text-sm">User</span>
                <span className="text-xs text-gray-500">Manage account</span>
              </div>
            )}
          </div>

          {/* Settings - only when open */}
          {open && (
            <Link
              href="/settings"
              className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
            >
              <Settings size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
