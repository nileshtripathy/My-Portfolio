import { Github, Linkedin, Code2, ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "LeetCode", href: siteConfig.links.leetcode, icon: Code2 },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-border/60 py-12">
      <div className="section-container flex flex-col items-center gap-6 text-center">
        <a
          href="#top"
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </a>

        <div className="flex items-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-accent-cyan"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; a lot of coffee.
        </p>
      </div>
    </footer>
  );
}
