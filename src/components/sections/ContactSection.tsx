"use client";

import { motion } from "framer-motion";
import { Mail, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/config";
import SectionHeading from "@/components/ui/SectionHeading";

const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.social.github,
    icon: <GithubIcon size={20} />,
    show: !!siteConfig.social.github,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: <LinkedinIcon size={20} />,
    show: !!siteConfig.social.linkedin,
  },
  {
    label: "Twitter",
    href: siteConfig.social.twitter,
    icon: <TwitterIcon size={20} />,
    show: !!siteConfig.social.twitter,
  },
  {
    label: "LeetCode",
    href: siteConfig.social.leetcode,
    icon: <Code2 size={20} />,
    show: !!siteConfig.social.leetcode,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-28">
      <div className="section-container">
        {/* Glow accent */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-primary)] opacity-5 blur-[100px] pointer-events-none rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex flex-col items-center text-center gap-8 max-w-2xl mx-auto"
        >
          <SectionHeading
            label="Get in Touch"
            title="Let's Work Together"
            subtitle="I'm currently open to internships, freelance projects, and interesting collaborations. My inbox is always open — say hi!"
            centered
          />

          {/* Email CTA */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex items-center gap-3 glass-card rounded-2xl px-8 py-5 transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]"
          >
            <Mail
              size={22}
              className="text-[var(--accent-secondary)] group-hover:scale-110 transition-transform"
            />
            <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors text-lg">
              {siteConfig.email}
            </span>
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
              or find me on
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {socialLinks
              .filter((s) => s.show)
              .map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="glass-card w-12 h-12 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-secondary)] hover:border-[var(--accent-primary)] transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
