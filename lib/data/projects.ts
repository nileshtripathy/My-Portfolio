import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "cineverse",
    title: "CineVerse",
    description:
      "Modern movie ticket booking platform with authentication and Stripe payments.",
    longDescription:
      "A full-stack booking experience for browsing showtimes, reserving seats in real time, and checking out securely with Stripe. Built with a MERN stack and protected routes for authenticated users.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "JWT Auth"],
    href: "https://cineverse-client-ashen.vercel.app/",
    status: "live",
    accent: "indigo",
  },
  {
    id: "securejustice",
    title: "SecureJustice",
    description:
      "Role-based FIR and evidence management system for law enforcement workflows.",
    longDescription:
      "A permissioned platform where officers, officials, and citizens each get scoped access to file, track, and verify FIRs and evidence records, with an audit-friendly data model.",
    tags: ["React", "Node.js", "MongoDB", "RBAC", "Express"],
    href: "https://jurichain.netlify.app/",
    status: "live",
    accent: "cyan",
  },
  {
    id: "openbankx",
    title: "OpenBankX",
    description: "A decentralized banking platform — currently under development.",
    longDescription:
      "An in-progress exploration of decentralized banking primitives: ledger-backed accounts, transparent transaction trails, and programmable rules for transfers.",
    tags: ["Next.js", "TypeScript", "Blockchain", "Node.js"],
    status: "building",
    accent: "emerald",
  },
];
