"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
}

export default function TextReveal({
  text,
  className,
  as = "p",
  stagger = 0.04,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Tag = as;
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = container.querySelectorAll("[data-word]");

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: "60%" },
        {
          opacity: 1,
          y: "0%",
          duration: 0.7,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <Tag ref={containerRef as never} className={cn("overflow-hidden", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 pr-[0.28em]">
          <span data-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
