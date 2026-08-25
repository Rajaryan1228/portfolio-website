"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/config";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: copyright */}
        <div className="text-sm text-[var(--text-muted)] text-center sm:text-left">
          <span>
            © {currentYear}{" "}
            <span className="text-[var(--text-secondary)]">{siteConfig.name}</span>
            . Built with Next.js & ❤️
          </span>
        </div>

        {/* Center: nav links */}
        <div className="flex items-center gap-5 text-xs text-[var(--text-muted)]">
          {["About", "Skills", "Projects", "Stats", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[var(--accent-secondary)] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right: social + back to top */}
        <div className="flex items-center gap-3">
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {siteConfig.social.linkedin && (
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              <LinkedinIcon size={16} />
            </a>
          )}
          {siteConfig.social.twitter && (
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              <TwitterIcon size={16} />
            </a>
          )}

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            aria-label="Back to top"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="ml-2 w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-secondary)] hover:border-[var(--accent-primary)] transition-all"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
