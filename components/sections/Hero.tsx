"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          "[data-hero-line]",
          { opacity: 0, y: 40, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={scopeRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-28"
    >
      <div className="section-container flex flex-col items-center text-center">
        <span
          data-hero-eyebrow
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-ink-muted"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-emerald" />
          Available for internships &amp; freelance
        </span>

        <h1 className="max-w-4xl font-display text-[13vw] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          <span data-hero-line className="block overflow-hidden">
            {siteConfig.name}
          </span>
          <span data-hero-line className="block overflow-hidden gradient-text">
            {siteConfig.role}
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-xl text-balance text-base text-ink-muted sm:text-lg"
        >
          {siteConfig.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton data-hero-cta>
            <Button asChild size="lg">
              <a href="#projects">
                View Projects <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </MagneticButton>

          <MagneticButton data-hero-cta>
            <Button asChild size="lg" variant="outline">
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" /> Resume
              </a>
            </Button>
          </MagneticButton>

          <MagneticButton data-hero-cta>
            <Button asChild size="lg" variant="ghost">
              <a href="#contact">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </Button>
          </MagneticButton>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-ink-faint"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-ink-faint to-transparent" />
      </motion.div>
    </section>
  );
}
