"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { siteConfig } from "@/data/config";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 glass-card shadow-lg shadow-black/30"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-xl font-bold tracking-tight"
          >
            <span className="accent-text">{siteConfig.name.split(" ")[0]}</span>
            <span className="text-muted ml-1 font-light">
              .{siteConfig.name.split(" ")[1]?.toLowerCase()}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-secondary)] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent-secondary)] hover:border-[var(--accent-primary)] transition-all duration-200"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn text-white"
            >
              Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 right-0 z-40 glass-card border-t border-[var(--border)] p-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-[var(--text-secondary)] hover:text-[var(--accent-secondary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn text-white text-center"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
