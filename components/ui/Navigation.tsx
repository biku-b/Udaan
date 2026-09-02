import React from "react";
import Link from "next/link";

export function Navbar() {
  const navLinks = [
    { label: "Discover", href: "/" },
    { label: "Scholarships", href: "/scholarships" },
    { label: "Colleges", href: "/colleges" },
    { label: "Courses", href: "/courses" },
    { label: "Careers", href: "/careers" },
    { label: "AI Advisor", href: "/ai-advisor" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                U
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground hidden sm:block">
                UDAAN
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden sm:block text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function MobileNav() {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "Explore",
      href: "/scholarships",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      label: "Saved",
      href: "/saved",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      label: "Applications",
      href: "/applications",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: "AI",
      href: "/ai-advisor",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-neutral-200 dark:border-neutral-800 pb-safe shadow-lg">
      <div className="flex items-center justify-around h-16">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center justify-center flex-1 h-full text-neutral-500 hover:text-primary transition-colors"
          >
            {link.icon}
            <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
