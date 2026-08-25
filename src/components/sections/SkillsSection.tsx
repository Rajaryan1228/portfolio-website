"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/config";
import SectionHeading from "@/components/ui/SectionHeading";

// DevIcon SVG URLs — mapped by key from config
const iconUrls: Record<string, string> = {
  cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
};

function SkillBadge({ name, icon }: { name: string; icon: string }) {
  const src = iconUrls[icon];
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="glass-card rounded-xl px-4 py-4 flex flex-col items-center gap-2.5 cursor-default group"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          width={36}
          height={36}
          className="w-9 h-9 object-contain group-hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.6)] transition-all duration-300"
        />
      ) : (
        <div className="w-9 h-9 rounded-lg bg-[var(--accent-primary)] opacity-50" />
      )}
      <span className="text-xs text-[var(--text-secondary)] font-medium tracking-wide text-center">
        {name}
      </span>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28">
      <div className="section-container">
        <SectionHeading
          label="Tech Stack"
          title="Skills & Tools"
          subtitle="Technologies I work with daily to build scalable, performant applications."
        />

        <div className="mt-16 flex flex-col gap-12">
          {skills.map((category, ci) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: ci * 0.1,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)] font-medium mb-5">
                {category.category}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {category.items.map((skill) => (
                  <SkillBadge key={skill.name} {...skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
