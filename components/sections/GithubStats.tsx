"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GitFork, Users, ArrowUpRight } from "lucide-react";
import type { GithubStats as GithubStatsType } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import TextReveal from "@/components/ui/TextReveal";

export default function GithubStats() {
  const [data, setData] = useState<GithubStatsType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((json: GithubStatsType) => {
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
    <section id="github-stats" className="relative py-28 md:py-36">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
            GitHub Activity
          </span>
          <TextReveal
            as="h2"
            text="Live from the command line."
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-xl2 border border-base-border bg-[#0B0B0E] shadow-glass"
        >
          <div className="flex items-center gap-2 border-b border-base-border/60 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono text-xs text-ink-faint">
              github-stats.sh
            </span>
          </div>

          <div className="p-6 font-mono text-sm sm:p-8">
            {error && (
              <p className="text-accent-amber">
                $ fetch failed — GitHub stats are temporarily unavailable.
              </p>
            )}

            {!error && !data && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-2/3 animate-pulse rounded bg-white/5"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            )}

            {data && (
              <div className="grid gap-8 md:grid-cols-[auto_1fr]">
                <div className="flex items-center gap-4 md:flex-col md:items-start">
                  <Image
                    src={data.avatarUrl}
                    alt={`${data.name} avatar`}
                    width={72}
                    height={72}
                    className="rounded-full border border-base-border"
                  />
                  <div>
                    <p className="text-ink">{data.name}</p>
                    <a
                      href={data.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline"
                    >
                      @{data.login} <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-ink-faint">
                    <span className="text-accent-emerald">$</span> git stats --user{" "}
                    {data.login}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Stat icon={GitFork} label="Repos" value={data.publicRepos} />
                    <Stat icon={Star} label="Stars" value={data.totalStars} />
                    <Stat icon={Users} label="Followers" value={data.followers} />
                    <Stat icon={Users} label="Following" value={data.following} />
                  </div>

                  {data.topLanguages.length > 0 && (
                    <div className="mt-6">
                      <p className="text-ink-faint"># top languages</p>
                      <div className="mt-3 space-y-2">
                        {data.topLanguages.map((lang) => (
                          <div key={lang.name} className="flex items-center gap-3">
                            <span className="w-24 shrink-0 text-ink-muted">
                              {lang.name}
                            </span>
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                              <div
                                className="h-full rounded-full bg-signal-gradient"
                                style={{ width: `${lang.percent}%` }}
                              />
                            </div>
                            <span className="w-10 text-right text-ink-faint">
                              {lang.percent}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Star;
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-ink-faint">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-1 text-lg text-ink">{formatNumber(value)}</p>
    </div>
  );
}
