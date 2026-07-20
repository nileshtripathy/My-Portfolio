import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import LoadingScreen from "@/components/layout/LoadingScreen";

// Below-the-fold, client-heavy sections are code-split so the initial
// bundle stays lean — they hydrate as the user scrolls toward them.
const Projects = dynamic(() => import("@/components/sections/Projects"));
const GithubStats = dynamic(() => import("@/components/sections/GithubStats"));
const LeetcodeStats = dynamic(() => import("@/components/sections/LeetcodeStats"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GithubStats />
      <LeetcodeStats />
      <Education />
      <Contact />
    </>
  );
}
