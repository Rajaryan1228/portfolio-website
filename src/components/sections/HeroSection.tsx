"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/config";

// Lazy-load heavy 3D scene — won't affect initial paint
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 radial-fade pointer-events-none" />

      {/* 3D Canvas */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Greeting badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-xs text-[var(--accent-secondary)] tracking-widest uppercase font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse-slow" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none"
          >
            <span className="block text-[var(--text-primary)]">
              {siteConfig.name.split(" ")[0]}
            </span>
            <span className="block accent-text">
              {siteConfig.name.split(" ")[1]}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-[var(--text-secondary)] font-medium tracking-wide"
          >
            {siteConfig.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="max-w-lg text-base md:text-lg text-[var(--text-muted)] leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a href="#projects" className="glow-btn text-white">
              View My Work
            </a>
            <a href="#contact" className="outline-btn">
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-5 mt-1">
            {siteConfig.social.github && (
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors duration-200"
              >
                <GithubIcon size={20} />
              </a>
            )}
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors duration-200"
              >
                <LinkedinIcon size={20} />
              </a>
            )}
            {siteConfig.social.twitter && (
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors duration-200"
              >
                <TwitterIcon size={20} />
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--text-muted)] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[var(--accent-secondary)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
