# Nilesh Kumar — Portfolio

A premium, production-ready personal portfolio built with Next.js 15 (App
Router), React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP
(ScrollTrigger), Lenis, and shadcn/ui-style primitives.

## Stack

- **Framework:** Next.js 15 (App Router, Server Components by default)
- **UI:** React 19, Tailwind CSS, shadcn/ui-style primitives, Lucide Icons
- **Motion:** Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll
- **Forms:** React Hook Form + Zod
- **API:** Next.js Route Handlers (no Express) — `/api/github`, `/api/leetcode`, `/api/contact`
- **Email (optional):** Resend

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in optional tokens, see below
npm run dev
```

Open http://localhost:3000.

### Environment variables (all optional)

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Raises the GitHub API rate limit from 60/hr to 5,000/hr. A scopeless fine-grained token is enough since only public data is read. |
| `RESEND_API_KEY` | Enables `/api/contact` to actually send email via [Resend](https://resend.com). Without it, submissions are logged server-side only. |
| `CONTACT_TO_EMAIL` | Destination inbox for contact form submissions. |

## Before deploying

1. **Assets** — add these to `/public`:
   - `favicon.ico`, `apple-touch-icon.png`
   - `og-image.png` (1200×630 for social previews)
   - `resume.pdf`
2. **Site config** — update `lib/site.ts` with your production domain (`url`), and confirm `githubUsername` / `leetcodeUsername`.
3. **Metadata** — `siteConfig.url` feeds `app/sitemap.ts`, `app/robots.ts`, and the JSON-LD block in `app/layout.tsx`, so it only needs to change in one place.

## Architecture notes

- **Server Components by default.** Only components that need interactivity,
  browser APIs, or animation hooks are marked `"use client"` (Hero, Header,
  CustomCursor, ScrollProgress, GithubStats, LeetcodeStats, Contact,
  Projects, TextReveal, MagneticButton, LoadingScreen, SmoothScrollProvider).
- **Code-split below-the-fold sections.** `app/page.tsx` dynamically imports
  Projects, GithubStats, LeetcodeStats, and Contact so the initial JS
  payload stays focused on the hero.
- **Live data, cached.** `/api/github` and `/api/leetcode` revalidate hourly
  (`export const revalidate = 3600`) and set `Cache-Control` headers so
  repeat visits don't re-hit upstream APIs.
- **Accessibility.** Skip-to-content link, visible focus rings,
  `prefers-reduced-motion` handling in every animated component, semantic
  landmarks, and labelled form fields with inline error messages.
- **SEO.** Full Metadata API usage (title templates, Open Graph, Twitter
  cards, canonical URL), `sitemap.ts` / `robots.ts` via the native
  `MetadataRoute` API, and JSON-LD `Person` structured data.

## Project structure

```
app/
  api/github/route.ts       GitHub stats (public REST API)
  api/leetcode/route.ts     LeetCode stats (public GraphQL endpoint)
  api/contact/route.ts      Contact form handler (Zod-validated)
  layout.tsx                Root layout, metadata, providers
  page.tsx                  Section composition
  sitemap.ts / robots.ts    SEO
components/
  layout/                   Header, Footer, cursor, scroll progress, loading screen
  providers/                Lenis + GSAP smooth-scroll provider
  sections/                 Hero, About, Skills, Projects, stats, Education, Contact
  ui/                       Button, Input, Textarea, Label, Badge, GlassCard, TextReveal, MagneticButton
lib/
  data/                     Static project + skill content
  validations/              Zod schemas
  site.ts / types.ts / utils.ts
```

## Scripts

```bash
npm run dev        # start dev server (Turbopack)
npm run build      # production build
npm run start      # serve production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```
