"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Hammer } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import TextReveal from "@/components/ui/TextReveal";

const accentBorder: Record<string, string> = {
  indigo: "group-hover:border-accent-indigo/40",
  cyan: "group-hover:border-accent-cyan/40",
  emerald: "group-hover:border-accent-emerald/40",
};

const accentGlow: Record<string, string> = {
  indigo: "from-accent-indigo/20",
  cyan: "from-accent-cyan/20",
  emerald: "from-accent-emerald/20",
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="section-container">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
              Featured Projects
            </span>
            <TextReveal
              as="h2"
              text="Three products, three problems worth solving."
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
            />
          </div>
          <p className="max-w-xs text-sm text-ink-muted">
            Each one shipped as a full-stack build — auth, data modeling, and a
            production deploy.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-xl2 border border-base-border bg-base-surface/60 p-6 transition-colors ${accentBorder[project.accent]}`}
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${accentGlow[project.accent]} to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {project.title}
                </h3>
                {project.status === "building" ? (
                  <Badge variant="amber" className="gap-1.5">
                    <Hammer className="h-3 w-3" /> Currently Building
                  </Badge>
                ) : (
                  <Badge variant="emerald">Live</Badge>
                )}
              </div>

              <p className="mt-3 flex-1 text-sm text-ink-muted">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-base-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-ink-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-base-border/60 pt-4">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent-cyan"
                  >
                    Visit live site <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-ink-faint">
                    Deploying soon
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
