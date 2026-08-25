"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, BookOpen, Code2, Cpu } from "lucide-react";
import { siteConfig } from "@/data/config";
import SectionHeading from "@/components/ui/SectionHeading";

const quickFacts = [
  {
    icon: <BookOpen size={18} />,
    label: "Education",
    value: "B.Tech Computer Science",
  },
  {
    icon: <Code2 size={18} />,
    label: "Focus",
    value: "Full-Stack · Competitive Programming",
  },
  {
    icon: <Cpu size={18} />,
    label: "Interests",
    value: "Algorithms · System Design · Open Source",
  },
  ...(siteConfig.location
    ? [
        {
          icon: <MapPin size={18} />,
          label: "Location",
          value: siteConfig.location,
        },
      ]
    : []),
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28">
      <div className="section-container">
        <SectionHeading
          label="About Me"
          title="Who I Am"
          subtitle="A bit about my background, what drives me, and what I do."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-primary/40 to-violet-secondary/20 blur-2xl scale-110" />
              {/* Border ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-primary)] opacity-50" />
              <Image
                src="/avatar.jpg"
                alt="Raj Aryan — profile photo"
                fill
                className="rounded-full object-cover object-top"
                priority
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col gap-8">
            {/* Bio paragraphs */}
            {siteConfig.bio.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg"
              >
                {para}
              </motion.p>
            ))}

            {/* Quick facts grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
            >
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="glass-card rounded-xl p-4 flex items-start gap-3"
                >
                  <span className="mt-0.5 text-[var(--accent-secondary)] flex-shrink-0">
                    {fact.icon}
                  </span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-0.5">
                      {fact.label}
                    </p>
                    <p className="text-sm text-[var(--text-primary)] font-medium">
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-4"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="glow-btn text-white inline-flex items-center gap-2"
              >
                <Mail size={15} /> Say Hello
              </a>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="outline-btn">
                View Résumé
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
