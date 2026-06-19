# Tag Rides Landing Page — Project Context

> **Read this first.** This file is the briefing for any new Claude Code session opened in this folder. It captures everything decided in the conversation that led to the current state, so you don't need to reference any prior chat.

---

## What this project is

The marketing landing page for **Tag Along Ltd** — the company behind **TagRides**, a ride-hailing platform under heavy active development in:

- `../tagrides-backend/` — Go services (orchestrator, analytics, simulator, etc.)
- `../tagrides-frontend/` — the rider/driver client

This repo lives at `/home/ubuntu/TagRides/tagrides-landing-page/` so the three sibling repos sit together.

Repo origin: `git@github.com:Tag-Along-Ltd/tagrides-landing-page.git`

The codebase was bootstrapped from a Next.js template called **`consua-nextjs`** (the `package.json` `name` field has since been renamed to `tagrides-landing-page`; some internal CSS class names like `consua-preloader` still linger but are cosmetic).

---

## Why this project matters to the operator

This is **dual-purpose** work — treat both purposes as first-class:

1. **Ship the actual landing page** for the TagRides Lagos market entry.
2. **Develop the skill of building premium AI-flavored landing pages as a side hustle.** The income from contract landing-page work is intended to fund the Lagos relocation. The skills the operator wants to build: 3D scenes, replayable embedded video, sleek animations, AI-driven interactive elements — the kind of sites that win Awwwards and command real contract money.

So when proposing approaches, lean toward techniques the operator will be able to reuse on contract work. "How would a premium agency build this?" is the right mental frame, not "what's the minimum viable landing page?"

---

## Current stack (as of clone)

- **Next.js 14.2.3** (App Router — `src/app/`)
- **JavaScript** (not TypeScript — there's a `jsconfig.json`, no `tsconfig.json`)
- **Bootstrap 5.3** for styling (note: NOT Tailwind — be careful before suggesting Tailwind, it's a visual rewrite)
- **Lottie** (`lottie-react`) — already in for vector animations
- **Swiper** — carousels
- **WOW.js** — scroll animations (older library; Framer Motion can replace if/when needed)
- **MongoDB driver** — present as a dep, presumably for blog/contact form
- **react-modal-video** — modal video player already available
- **react-toastify**, **react-countup**, **react-circular-progressbar**, etc.
- ESLint configured (`.eslintrc.json`); **no Prettier yet**

---

## Remote-dev workflow

- Operator's editor: **VSCode Remote-SSH** from a Mac to this EC2 box.
- Code lives **here**, on the EC2.
- Dev server (`npm run dev`) runs on the EC2 at port 3000.
- Operator views the running site in their **Mac's browser** via SSH port-forwarding:
  ```
  ssh -L 3000:localhost:3000 <ec2-user>@<ec2-host>
  ```
  then `http://localhost:3000` in the Mac browser.
- **Port 3000 is currently free** on this EC2. Other TagRides services start at 3001+. Don't change the dev port unless something else grabs 3000.
- **Don't `npm run dev` from inside a Claude session** — let the operator run it in their own terminal so they can see the live output.

---

## FIRST TASK — fix the broken install

`npm install` currently **fails** with a peer-dependency conflict:

```
Conflicting peer dependency: eslint@8.57.1
  peer eslint@"^7.23.0 || ^8.0.0" from eslint-config-next@14.2.3
```

`package.json` declares `eslint: ^9.2.0`, but `eslint-config-next@14.2.3` (Next 14's lint preset) only supports eslint 7 or 8.

**The fix** (do this first — nothing else will work without it):

1. Edit `package.json`: change `"eslint": "^9.2.0"` → `"eslint": "^8.57.1"`.
2. `rm -rf node_modules package-lock.json`
3. `npm install` — should now succeed cleanly.
4. `npm run dev` — confirm the site comes up at `localhost:3000`.

**Do NOT** use `--legacy-peer-deps` to paper over it. That stores up a worse version of the same conflict for later.

---

## Second task — add formatting/analysis tooling

The operator explicitly asked for tools to **analyze and format the code**. For a JS-on-Next project, the minimum sensible set is:

```bash
npm install -D prettier eslint-config-prettier
```

Then create:

- `.prettierrc.json` — operator-friendly defaults (single quotes, 2-space, semis, 100-col, trailing commas).
- `.prettierignore` — `.next/`, `node_modules/`, `public/`, lottie JSON files, build artifacts.
- Add to `package.json` scripts:
  ```json
  "format": "prettier --write .",
  "format:check": "prettier --check ."
  ```
- Update `.eslintrc.json` to extend `"prettier"` last in `extends`, so it disables conflicting style rules.

**Don't add TypeScript** unless the operator specifically asks. Migrating an in-progress JS Next project to TS is a real lift, and JS is fine for landing pages.

---

## The interesting work — the toolkit the operator wants to learn

This is the section that maps the operator's "3D + video + animation + AI" wish to actual libraries. **Don't install all of these up front** — each one is a real bundle-size cost. Add them when a specific feature on a specific page needs them.

### 3D scenes
- **three.js** — the base WebGL library.
- **@react-three/fiber (R3F)** — React renderer for three.js; idiomatic in Next.
- **@react-three/drei** — helpers (cameras, controls, loaders, post-processing).
- **@react-three/postprocessing** — bloom, DoF, color grading.
- **Spline** (spline.design) — design 3D in a GUI, export a React component. **Best zero-modeling path** for getting cool 3D into a landing page fast.
- Free assets: Sketchfab, Poly Haven, Blender export.

### Animation
- **Framer Motion** — declarative React animations, the modern default. Replaces WOW.js for any new work.
- **GSAP** — used in most Awwwards winners. Better for complex timelines and scroll-scrubbed sequences (GSAP `ScrollTrigger`).
- **Lenis** — smooth-scroll library used in essentially every premium landing page.
- Lottie is already in for vector animations — keep using it.

### Video
- Already have `react-modal-video`.
- Hero background autoplay loop: HTML5 `<video autoplay muted playsinline loop>`.
- Frame-accurate scroll-scrubbed video: GSAP `ScrollTrigger` + a paused `<video>`.
- Always encode both `webm` (smaller) and `mp4` (compatibility) and serve via `<source>` tags.

### AI features in the page itself
- **Vercel AI SDK (`ai` package)** — standard for streaming LLM responses in Next.
- **`@anthropic-ai/sdk`** or **`openai`** as the model provider.
- The operator already runs a **LiteLLM proxy at `127.0.0.1:4040`** on this same EC2 (see `~/llm-proxy/`). Any AI SDK call can point at that proxy as its `baseURL`, which gives them spend caps + per-key budgets out of the box. Use this rather than direct upstream keys.
- Ideas for AI-in-page: interactive product demo ("ask the product anything"), personalized hero copy, chat-with-the-driver-economics calculator, AI-generated alt copy for accessibility.

### Reference sites worth studying
Tell the operator to dissect these in DevTools — the patterns repeat:
- vercel.com, linear.app, stripe.com, arc.net, raycast.com, supabase.com
- 14islands.com (agency famous for this kind of work)
- The Awwwards "Site of the Day" archive

---

## Repo layout

```
tagrides-landing-page/
├── .eslintrc.json        ← existing ESLint config (will extend "prettier" later)
├── CONTEXT.md            ← you are here
├── CREATEBLOG.md         ← earlier notes from the operator
├── README.md             ← template's readme
├── jsconfig.json         ← JS path aliases
├── next.config.mjs       ← empty Next config (room to grow)
├── package.json          ← deps; eslint needs downgrade (see First Task)
├── package-lock.json
├── public/               ← static assets
├── src/
│   ├── app/              ← Next.js App Router pages
│   ├── components/       ← React components
│   ├── lib/              ← shared utilities
│   ├── lotties/          ← Lottie animation JSONs
│   └── utils/            ← helpers
└── (two zero-byte files at root: `consua-nextjs@0.1.0` and `next` —
    look like accidental shell-redirect artifacts. Safe to delete after
    confirming nothing references them; check `git log` first.)
```

---

## Things NOT to do

- **Don't** migrate to TypeScript without the operator asking.
- **Don't** swap Bootstrap for Tailwind without asking — it's a visual rewrite, not a refactor.
- **Don't** use `--legacy-peer-deps` to paper over dep conflicts; fix the underlying version.
- **Don't** install three.js + R3F + GSAP + Framer Motion all at once "just in case" — they're bundle-size taxes. Add per-feature.
- **Don't** run `npm run dev` from inside a Claude session; let the operator run it in their own terminal.
- **Don't** push to the repo without explicit approval.
- **Don't** delete the two zero-byte root files without checking git history.
- **Don't** point AI features directly at Anthropic/OpenAI keys — use the local LiteLLM proxy at `127.0.0.1:4040`.

---

## About the operator (so the next session calibrates correctly)

- Solo founder building TagRides; also running a small LLM-API proxy reselling side hustle to fund the work.
- Relocating to Lagos for TagRides market entry once driver happy-path coverage lands.
- Prefers **terse, substantive** responses. No pep-talks, no "great question," no padding.
- Technically strong; treat as a senior engineer who's new to this specific stack (3D/animation/AI-in-page).
- The landing page is part of a bigger thesis about under-served transportation markets — see `../tagrides-backend/` commits if you want the design taste of the architecture they've been shipping.
