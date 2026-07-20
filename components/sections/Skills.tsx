import { skillGroups } from "@/lib/data/skills";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
            Skills
          </span>
          <TextReveal
            as="h2"
            text="A toolkit shaped by shipping real products."
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <GlassCard
              key={group.category}
              className="group p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="font-display text-sm font-semibold text-ink">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-base-border bg-white/[0.03] px-3 py-1 text-xs text-ink-muted transition-colors group-hover:border-accent-indigo/30"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
