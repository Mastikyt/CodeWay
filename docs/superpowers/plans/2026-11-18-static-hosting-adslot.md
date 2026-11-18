# Static Hosting and Ad Slot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prepare the complete CodeWay static frontend for Cloudflare Pages, add a responsive visible ad placeholder to `/`, and provide a source-backed hosting comparison for submission.

**Architecture:** Keep Vite's two HTML entries: CodeWay remains `/` and the Tailwind showcase remains `/tailwind`. Add a reusable Vue ad-slot component to the main app and Cloudflare Pages rewrite rules for both entry points; document static-backend limitations and compare four hosts using current primary sources.

**Tech Stack:** Vue 3, Vite 8, Tailwind CSS 4, Cloudflare Pages, Markdown.

**Spec:** `docs/superpowers/specs/2026-11-18-static-hosting-and-ad-slot-design.md`

## Global Constraints

- Keep CodeWay at `/` and the Tailwind showcase at `/tailwind`.
- Use Cloudflare Pages build command `npm run build` and output directory `dist`.
- Do not claim a live deployment URL unless a deployment is actually completed and verified.
- Do not claim localhost API functions are a production backend; state localStorage fallback limitations.
- Hosting limits and policies must use dated, linked sources; clearly distinguish official terms from support statements.

## Review Focus

- Direct navigation and refresh under `/tailwind/*` must serve the Tailwind entry, not CodeWay (`public/_redirects` verification).
- Root and all hashed assets must work from the domain root (`npm run build` and preview check).
- Ad slot must remain visible and legible at narrow widths and in dark mode (component props/classes and rendered page check).
- Hosting policy statements must not present ambiguous/undocumented advertising permission as certainty (report source audit).
- Static pages must not imply `localhost:3001` API is remotely available (README/report disclosure).

---

### Task 1: Ad slot on the CodeWay home page

**Files:**
- Create: `src/components/AdSlot.vue`
- Modify: `src/views/HomePage.vue`

**Interfaces:**
- Produces: `<AdSlot size="banner" />` and `<AdSlot size="sidebar" />`; default size is `banner`.

- [x] Inspect home page layout and place the banner after its main introductory content.
- [x] Implement accessible placeholder with dashed border, light surface, label “Рекламное место”, Tailwind styling, responsive width, dark mode, and the two documented size presets.
- [x] Run `npm run build`; expected: both Vite entries compile.

### Task 2: Cloudflare Pages routing and deployment notes

**Files:**
- Create: `public/_redirects`
- Modify: `README.md`

**Interfaces:**
- Cloudflare Pages serves `/` from `index.html`; `/tailwind` and `/tailwind/*` from `tailwind.html`.

- [x] Add Pages rewrites for `/tailwind` and its nested SPA routes, followed by root SPA fallback to `/index.html`.
- [x] Document build command, output directory, deployment requirement for a Git repository, and static API/localStorage caveat.
- [x] Verify `dist/_redirects` exists after build and contains the expected routes.

### Task 3: Hosting comparison report

**Files:**
- Create: `docs/hosting-platforms-comparison.md`

**Interfaces:**
- Produces: Russian submission report comparing Cloudflare Pages, GitHub Pages, Netlify, and Vercel with official source links and a clear recommendation.

- [x] Verify current free-tier limits and policies from primary official sources.
- [x] Write 600–1000 words excluding the comparison table; include policy risk warning, recommendation, alternative, and decision factors.
- [x] Check every policy/limit statement has a linked source or is clearly marked as uncertain.

### Task 4: End-to-end verification and handoff

**Files:**
- Build output: `dist/`
- Screenshot: `artifacts/ad-slot-home.png` if browser capture is available

- [x] Run `npm run build` and `npm run preview`; verify `/`, `/tailwind`, and a nested Tailwind route.
- [x] Capture the actual rendered ad slot if browser tools are available; otherwise state why no screenshot was produced.
- [x] Report the exact build/deploy status; give only a verified live URL, or explain the remaining GitHub/Cloudflare account/repository step.
