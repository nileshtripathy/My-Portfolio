import { GraduationCap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";

export default function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
            Education
          </span>
          <TextReveal
            as="h2"
            text="Learning software engineering as a craft, not a course."
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
          />
        </div>

        <GlassCard className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-signal-gradient">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              B.Tech in Computer Science Engineering
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Lovely Professional University × Kalvium — Aug 2025 – Jul 2029 ·
              CGPA 9.34
            </p>
            <p className="mt-3 max-w-xl text-sm text-ink-faint">
              Coursework: Full-Stack Web Development, Data Structures &amp;
              Algorithms, System Design, Databases — paired with an
              industry-aligned build track of code reviews, sprints, and
              real-world MERN projects.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
