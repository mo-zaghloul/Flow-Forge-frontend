"use client";

import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b w-full bg-background">
      <div className="container mx-auto w-full px-4 h-16 flex items-center">
        {/* Right-aligned content */}
        <div className="flex items-center gap-6 ml-auto">
          {isSignedIn ? (
            <>
              <Link
                href="/flows"
                className="text-sm font-medium hover:underline"
              >
                Flows
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <Button className="text-sm font-medium hover:underline">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
