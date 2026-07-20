"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy, Target } from "lucide-react";
import type { LeetcodeStats as LeetcodeStatsType } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";

const difficultyMeta = [
  { key: "easySolved" as const, label: "Easy", color: "bg-accent-emerald" },
  { key: "mediumSolved" as const, label: "Medium", color: "bg-accent-amber" },
  { key: "hardSolved" as const, label: "Hard", color: "bg-[#F87171]" },
];

export default function LeetcodeStats() {
  const [data, setData] = useState<LeetcodeStatsType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((json: LeetcodeStatsType) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="leetcode-stats" className="relative py-28 md:py-36">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
            Problem Solving
          </span>
          <TextReveal
            as="h2"
            text="Sharpening algorithms, one submission at a time."
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
          />
        </div>

        <GlassCard className="p-6 sm:p-8">
          {error && (
            <p className="text-sm text-accent-amber">
              LeetCode stats are temporarily unavailable.
            </p>
          )}

          {!error && !data && (
            <div className="grid gap-6 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-white/5" />
              ))}
            </div>
          )}

          {data && (
            <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
              <div className="flex flex-col items-center gap-3 md:items-start">
                <RadialProgress
                  value={data.totalSolved}
                  max={data.totalQuestions || 1}
                />
                <a
                  href={data.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline"
                >
                  @{data.username} <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-3 gap-4">
                  {difficultyMeta.map(({ key, label, color }) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="rounded-xl border border-base-border bg-white/[0.02] p-4"
                    >
                      <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
                      <p className="mt-2 font-display text-2xl font-semibold text-ink">
                        {formatNumber(data[key])}
                      </p>
                      <p className="text-xs text-ink-faint">{label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 border-t border-base-border/60 pt-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent-indigo" />
                    <span className="text-sm text-ink-muted">
                      Rank{" "}
                      <span className="text-ink">{formatNumber(data.ranking)}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent-cyan" />
                    <span className="text-sm text-ink-muted">
                      Acceptance{" "}
                      <span className="text-ink">{data.acceptanceRate}%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}

function RadialProgress({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1D1D22" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#leetcodeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="leetcodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D6BFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl font-semibold text-ink">{value}</span>
        <span className="text-[11px] text-ink-faint">solved</span>
      </div>
    </div>
  );
}
