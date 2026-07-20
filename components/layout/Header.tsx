"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#github-stats" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-container mt-4">
        <div className="glass flex items-center justify-between rounded-full px-5 py-3">
          <Link
            href="#top"
            className="font-display text-sm font-semibold tracking-tight text-ink"
          >
            Nilesh<span className="text-accent-indigo">.</span>dev
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild size="sm">
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          <button
            className="text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="section-container mt-2 md:hidden"
            aria-label="Mobile"
          >
            <div className="glass flex flex-col gap-1 rounded-2xl p-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-lg bg-signal-gradient px-4 py-3 text-center text-sm font-medium text-white"
              >
                Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
