"use client";

import { Home, Edit, File, Archive, User, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import React from "react";

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: "Create Flow", icon: <Edit size={22} />, href: "/canvas" }, 
    { name: "Home", icon: <Home size={22} />, href: "/home" },               
    { name: "Project", icon: <File size={22} />, href: "/project" },
    { name: "Templates", icon: <Archive size={22} />, href: "/templates" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 min-h-screen bg-white text-black shadow-lg z-50 flex flex-col justify-between transition-all duration-300
      ${open ? "w-52" : "w-16"}`}
    >
      {/* Logo + Toggle + Menu */}
      <div>
        {/* Logo + Toggle */}
        <div className="py-6 flex justify-center">
          <button onClick={() => setOpen(!open)} className="block">
            <Image
              src="/FlowForgeLogo.png"
              alt="Logo"
              width={open ? 40 : 40}
              height={open ? 40 : 40}
              className="transition-all duration-300"
              priority
            />
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-4 flex flex-col gap-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 py-3 hover:bg-gray-200 rounded ${
                  open ? "px-3" : "justify-center"
                }`}
              >
                {item.icon}
                {open && <span className="text-sm font-semibold">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: User + Name + Settings */}
      <div
        className={`py-6 mb-4 flex items-center ${
          open ? "px-3 justify-between" : "justify-center"
        }`}
      >
        <div className="flex items-center gap-4">
          <User size={22} />
          {open && <span className="font-semibold text-sm">Ahmed Emad</span>}
        </div>

        {/* يظهر فقط عند فتح Sidebar */}
        {open && (
          <Link href="/settings" className="hover:bg-gray-200 rounded p-2">
            <Settings size={22} />
          </Link>
        )}
      </div>
    </div>
  );
}
