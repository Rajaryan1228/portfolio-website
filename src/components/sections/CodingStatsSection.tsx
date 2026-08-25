"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Star, BookOpen, GitFork } from "lucide-react";
import { siteConfig } from "@/data/config";
import SectionHeading from "@/components/ui/SectionHeading";

// ─── Types ───────────────────────────────────────────────────
interface LeetCodeStats {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  ranking: number;
  acceptanceRate: number;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  contributions: number;
  topLanguages: string[];
  recentRepos: Array<{ name: string; url: string; stars: number; language: string | null }>;
}



// ─── Animated number counter ─────────────────────────────────
function Counter({
  value,
  duration = 1.5,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || value === 0) return;
    let start = 0;
    const step = value / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Skeleton loader ─────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[var(--bg-elevated)] ${className}`}
    />
  );
}

// ─── GitHub card (native live data) ──────────────────────────
function GitHubCard() {
  const { github } = siteConfig.codingProfiles;
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/stats/github")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setStats(d);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#161b22] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)] text-sm">GitHub</p>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-secondary)] flex items-center gap-1 transition-colors">
            @{github} <ExternalLink size={10} />
          </a>
        </div>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
        </span>
      </div>

      {error ? (
        <p className="text-xs text-center text-[var(--text-muted)] py-4">
          Could not fetch GitHub stats — check your connection or username
        </p>
      ) : (
        <>
          {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Repositories", value: stats?.publicRepos, icon: <BookOpen size={14} className="text-violet-400" /> },
          { label: "Total Stars", value: stats?.totalStars, icon: <Star size={14} className="text-amber-400" /> },
          { label: "Year Activity", value: stats?.contributions, suffix: " commits", icon: <GitFork size={14} className="text-emerald-400" /> },
          { label: "Followers", value: stats?.followers, icon: <span className="text-xs text-sky-400">👥</span> },
        ].map((s) => (
          <div key={s.label}
            className="flex flex-col p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--text-muted)]">{s.label}</span>
              {s.icon}
            </div>
            {stats ? (
              <span className="text-xl font-bold font-display text-[var(--text-primary)] mt-1">
                <Counter value={s.value ?? 0} suffix={s.suffix || ""} />
              </span>
            ) : (
              <Skeleton className="h-7 w-12 mt-1" />
            )}
          </div>
        ))}
      </div>

      {/* Top Languages */}
      {stats && stats.topLanguages.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mr-1">Top:</span>
          {stats.topLanguages.map((lang) => (
            <span key={lang} className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent-secondary)]">
              {lang}
            </span>
          ))}
        </div>
      )}

      {/* Recent Public Projects */}
      {stats && stats.recentRepos.length > 0 && (
        <div className="flex flex-col gap-2 pt-1 border-t border-[var(--border)]">
          <p className="text-[11px] font-medium text-[var(--text-muted)]">Featured Public Repos:</p>
          <div className="flex flex-col gap-1.5">
            {stats.recentRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-elevated)]/50 hover:bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--border)] transition-all text-xs group"
              >
                <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] truncate max-w-[180px]">
                  {repo.name}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0 text-[11px] text-[var(--text-muted)]">
                  {repo.language && <span>{repo.language}</span>}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-0.5 text-amber-400">
                      ★ {repo.stars}
                    </span>
                  )}
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      </>
      )}

      <a
        href={siteConfig.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-xs text-[var(--accent-secondary)] border border-[var(--border)] rounded-xl py-2.5 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 transition-all mt-auto"
      >
        View GitHub Profile <ExternalLink size={11} />
      </a>
    </motion.div>
  );
}

// ─── LeetCode card (live data) ───────────────────────────────
function LeetCodeCard() {
  const { leetcode } = siteConfig.codingProfiles;
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/stats/leetcode")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setStats(d);
      })
      .catch(() => setError(true));
  }, []);

  const statsCardUrl = `https://leetcard.jacoblin.cool/${leetcode}?theme=dark&font=Nunito&ext=heatmap&border=0&radius=12`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#1a1a2e] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FFA116" aria-hidden="true">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)] text-sm">LeetCode</p>
          <a href={siteConfig.social.leetcode} target="_blank" rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-secondary)] flex items-center gap-1 transition-colors">
            @{leetcode} <ExternalLink size={10} />
          </a>
        </div>
        {/* Live badge */}
        <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
        </span>
      </div>

      {/* LeetCard widget */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={statsCardUrl} alt={`${leetcode} LeetCode stats`} className="w-full rounded-xl" loading="lazy" />

      {/* Live problem breakdown */}
      {error ? (
        <p className="text-xs text-center text-[var(--text-muted)]">
          Could not fetch live stats — check your username in config.ts
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Easy",   value: stats?.easySolved,   color: "text-emerald-400" },
            { label: "Medium", value: stats?.mediumSolved, color: "text-amber-400" },
            { label: "Hard",   value: stats?.hardSolved,   color: "text-rose-400" },
          ].map((s) => (
            <div key={s.label}
              className="flex flex-col items-center p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
              {stats ? (
                <span className={`text-xl font-bold font-display ${s.color}`}>
                  <Counter value={s.value ?? 0} />
                </span>
              ) : (
                <Skeleton className="h-7 w-10 mb-1" />
              )}
              <span className="text-[10px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wide">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Total + rank */}
      {stats && (
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border)]">
          <span>Total solved: <span className="text-[var(--accent-secondary)] font-semibold">{stats.totalSolved}</span></span>
          <span>Global rank: <span className="text-[var(--accent-secondary)] font-semibold">#{stats.ranking.toLocaleString()}</span></span>
          <span>Acceptance: <span className="text-[var(--accent-secondary)] font-semibold">{stats.acceptanceRate.toFixed(1)}%</span></span>
        </div>
      )}
    </motion.div>
  );
}

// ─── CodeChef card (static showcase — CodeChef blocks all server-side APIs) ──
function CodeChefCard() {
  const { codechef } = siteConfig.codingProfiles;

  // ✏️ Update these manually from codechef.com/users/anteambulo
  const manualStats = [
    { label: "Current Rating", value: 1800 },
    { label: "Highest Rating", value: 1956 },
    { label: "Global Rank",    value: 5420 },
    { label: "Country Rank",   value: 312  },
  ];
  const stars = "4★"; // ✏️ update from your profile

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#5B4638" aria-hidden="true">
            <path d="M11.257.004C5.055.194.214 5.343.004 11.545c-.21 6.285 4.814 11.498 11.099 11.498.106 0 .213-.002.32-.004.098.002.196.004.295.004 6.202 0 11.24-5.058 11.24-11.26C22.958 5.1 17.664-.186 11.257.004zm1.092 18.362l-.012.058-.016.055-.018.052-.023.05-.026.047-.03.044-.033.041-.036.037-.039.034-.042.03-.045.027-.047.022-.05.017-.052.013-.054.007-.056.002-.056-.002-.054-.007-.052-.013-.05-.017-.048-.022-.045-.027-.042-.03-.038-.034-.037-.037-.033-.041-.03-.044-.026-.047-.023-.05-.018-.052-.016-.055-.012-.058-.007-.059-.002-.06.002-.06.007-.059.012-.058.016-.055.018-.052.023-.05.026-.047.03-.044.033-.041.037-.037.038-.034.042-.03.045-.027.048-.022.05-.017.052-.013.054-.007.056-.002.056.002.054.007.052.013.05.017.047.022.045.027.042.03.039.034.036.037.033.041.03.044.026.047.023.05.018.052.016.055.012.058.007.059.002.06-.002.06-.007.059zM7.77 13.67l-1.74 1.74a.84.84 0 01-1.188-1.188l1.74-1.74-1.74-1.74A.84.84 0 015.03 9.554l1.74 1.74 1.74-1.74a.84.84 0 011.188 1.188L8.958 12.48l1.74 1.74a.84.84 0 01-1.188 1.188L7.77 13.67zm7.68 2.94a4.678 4.678 0 01-3.44-1.5.84.84 0 011.23-1.146 2.994 2.994 0 002.21.966c1.656 0 3.003-1.347 3.003-3.003S17.106 9 15.45 9a3 3 0 00-2.21.966.84.84 0 01-1.23-1.146 4.68 4.68 0 013.44-1.5c2.688 0 4.683 2.146 4.683 4.607s-1.995 4.683-4.683 4.683z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)] text-sm">CodeChef</p>
          <a href={siteConfig.social.codechef} target="_blank" rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-secondary)] flex items-center gap-1 transition-colors">
            @{codechef} <ExternalLink size={10} />
          </a>
        </div>
        <span className="ml-auto text-lg font-bold text-amber-400">{stars}</span>
      </div>

      {/* Gradient banner */}
      <div className="relative rounded-xl overflow-hidden h-24 bg-gradient-to-br from-[#5B4638]/30 via-[var(--accent-primary)]/10 to-[#5B4638]/20 flex items-center justify-center border border-[var(--border)]">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg viewBox="0 0 24 24" className="w-20 h-20" fill="#5B4638">
            <path d="M11.257.004C5.055.194.214 5.343.004 11.545c-.21 6.285 4.814 11.498 11.099 11.498.106 0 .213-.002.32-.004.098.002.196.004.295.004 6.202 0 11.24-5.058 11.24-11.26C22.958 5.1 17.664-.186 11.257.004z" />
          </svg>
        </div>
        <div className="relative text-center">
          <p className="font-display text-2xl font-bold text-amber-400">{stars}</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">@{codechef}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {manualStats.map((s) => (
          <div key={s.label}
            className="flex flex-col p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <span className="text-2xl font-bold font-display text-[var(--accent-secondary)]">
              <Counter value={s.value} />
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-1">{s.label}</span>
          </div>
        ))}
      </div>

      <a href={siteConfig.social.codechef} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-xs text-[var(--accent-secondary)] border border-[var(--border)] rounded-xl py-2.5 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 transition-all">
        View full profile <ExternalLink size={11} />
      </a>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────
export default function CodingStatsSection() {
  return (
    <section id="stats" className="py-28">
      <div className="section-container">
        <SectionHeading
          label="Coding Activity"
          title="Stats & Profiles"
          subtitle="My competitive programming journey — updated automatically from live APIs."
          centered
        />
        <div className="mt-16 grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <GitHubCard />
          <LeetCodeCard />
          <CodeChefCard />
        </div>
      </div>
    </section>
  );
}
