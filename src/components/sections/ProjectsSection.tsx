"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/config";
import type { projects as ProjectsData } from "@/data/config";
import SectionHeading from "@/components/ui/SectionHeading";

type Project = (typeof ProjectsData)[number];

// ─── Tilt-on-hover card ───
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -6, scale: 1.015 }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fallback gradient placeholder for thumbnail */}
          <div className="w-full h-full bg-gradient-to-br from-violet-primary/20 to-violet-secondary/10 flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-[var(--accent-primary)] opacity-40">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>
        {project.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[var(--accent-primary)] text-white">
            Featured
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--accent-secondary)] bg-[var(--accent-primary)]/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-2 pt-3 border-t border-[var(--border)]">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub repository"
              className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              <GithubIcon size={14} /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Live demo"
              className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          <span className="ml-auto text-xs text-[var(--accent-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
            Details →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Modal detail view ───
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card rounded-2xl w-full max-w-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-br from-violet-primary/30 to-violet-secondary/10 flex items-center justify-center">
            <span className="font-display text-6xl font-bold text-[var(--accent-primary)] opacity-30">
              {project.title.charAt(0)}
            </span>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-xl bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-7 flex flex-col gap-5">
            <div>
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                {project.title}
              </h3>
              {project.featured && (
                <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--accent-primary)] text-white">
                  Featured
                </span>
              )}
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--accent-secondary)]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn text-white inline-flex items-center gap-2 text-sm"
                >
                  <GithubIcon size={15} /> View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-btn inline-flex items-center gap-2 text-sm"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Section ───
export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28">
      <div className="section-container">
        <SectionHeading
          label="Portfolio"
          title="Projects"
          subtitle="A selection of things I've built — from full-stack apps to algorithmic tools."
        />

        {/* Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {projects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        {/* "Add a project" comment for easy editing */}
        {/* 
          ══════════════════════════════════════════════════════
          TO ADD A NEW PROJECT: open src/data/config.ts and 
          add a new object to the `projects` array. That's it!
          ══════════════════════════════════════════════════════
        */}
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
