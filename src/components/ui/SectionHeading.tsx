"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;   // small uppercase badge above
  title: string;   // main heading
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`flex flex-col gap-3 ${centered ? "items-center text-center" : ""}`}
    >
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-secondary)]">
        {label}
      </span>
      <h2 className="section-title text-[var(--text-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
