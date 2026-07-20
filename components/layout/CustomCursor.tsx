"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsPointer(Boolean(target.closest("a, button, [data-cursor='pointer']")));
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{ scale: isPointer ? 2.2 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-4 w-4 rounded-full bg-white"
      />
    </motion.div>
  );
}
