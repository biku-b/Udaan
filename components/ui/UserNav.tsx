"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse" />;
  }

  if (!session || !session.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="primary" size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  const userRole = (session.user as any).role || "student";
  const userEmail = session.user.email || "User";

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col text-right">
        <span className="text-xs font-bold text-foreground truncate max-w-[150px]">
          {userEmail}
        </span>
        <span className="text-[10px] text-primary uppercase font-semibold tracking-wider">
          {userRole}
        </span>
      </div>

      <div className="relative group">
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20">
          {userEmail.charAt(0).toUpperCase()}
        </div>

        <div className="absolute right-0 mt-2 w-48 bg-surface border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg py-1 hidden group-hover:block z-50">
          <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800 sm:hidden">
            <p className="text-xs font-bold truncate">{userEmail}</p>
            <p className="text-[10px] text-primary uppercase font-semibold">{userRole}</p>
          </div>
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-xs text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-2 text-xs text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Profile & Preferences
          </Link>
          {userRole === "admin" && (
            <Link
              href="/admin/verification"
              className="block px-4 py-2 text-xs text-primary font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Admin CMS
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-xs text-danger hover:bg-neutral-100 dark:hover:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800 mt-1"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
