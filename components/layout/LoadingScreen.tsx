"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GREETING = "Nilesh Kumar";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1400;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setShow(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
        >
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: -24, transition: { duration: 0.5 } }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-ink-faint">
              Portfolio
            </span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {GREETING.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-signal-gradient"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-ink-faint">{progress}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
