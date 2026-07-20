import TextReveal from "@/components/ui/TextReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Code2, Server, Database, GraduationCap } from "lucide-react";

const facts = [
  { icon: Code2, label: "Frontend", value: "React & Next.js" },
  { icon: Server, label: "Backend", value: "Node & Express" },
  { icon: Database, label: "Database", value: "MongoDB" },
  { icon: GraduationCap, label: "Focus", value: "DSA & System Design" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="section-container">
        <div className="grid gap-16 md:grid-cols-[1fr_0.9fr] md:gap-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
              About
            </span>
            <TextReveal
              as="h2"
              text="Building products end to end, one thoughtful commit at a time."
              className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
            />
            <p className="mt-6 max-w-lg text-balance text-ink-muted">
              I build scalable MERN applications using React, Next.js, Node.js,
              MongoDB, and TypeScript. I&apos;ve solved 100+ Data Structures &amp;
              Algorithms problems across LeetCode and GeeksforGeeks while
              maintaining a 9.34 CGPA and learning system design, cloud, and
              backend architecture.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <GlassCard key={label} className="p-5">
                <Icon className="h-5 w-5 text-accent-indigo" />
                <p className="mt-4 text-xs uppercase tracking-wide text-ink-faint">
                  {label}
                </p>
                <p className="mt-1 font-display text-sm font-medium text-ink">
                  {value}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
