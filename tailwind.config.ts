import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        base: {
          DEFAULT: "#08080A",
          surface: "#0F0F12",
          elevated: "#16161A",
          border: "#232329",
        },
        ink: {
          DEFAULT: "#F4F4F6",
          muted: "#9A9AA4",
          faint: "#5C5C66",
        },
        accent: {
          indigo: "#6D6BFF",
          cyan: "#22D3EE",
          emerald: "#34D399",
          amber: "#FBBF24",
        },
      },
      fontFamily: {
        display: ["var(--font-sans)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(8,8,10,0.9))",
        "aurora-gradient":
          "radial-gradient(60% 60% at 20% 20%, rgba(109,107,255,0.25) 0%, transparent 60%), radial-gradient(50% 50% at 80% 30%, rgba(34,211,238,0.18) 0%, transparent 60%)",
        "signal-gradient": "linear-gradient(90deg, #6D6BFF 0%, #22D3EE 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee 32s linear infinite",
        blink: "blink 1.1s steps(2, start) infinite",
        "spin-slow": "spin 14s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(109,107,255,0.4), 0 0 40px -8px rgba(109,107,255,0.5)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
