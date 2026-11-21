# ASAR. — The AI Universe

A cinematic, responsive personal portfolio built with **Next.js App Router**, React, TypeScript and custom CSS. The selected AI-universe portal artwork is used as the hero visual.

## Pages
- `/` Home — hero, about (with photo), what I do, short tech stack, journey (education), contact teaser
- `/tech-stack` — full tech stack in detail with an interactive 3D sphere
- `/projects` — "Coming soon" page (projects will be added later)
- `/contact` — all contact details (phone/WhatsApp, LinkedIn, GitHub, location, education)
- `/lets-talk` — freelance page with a message builder that opens WhatsApp

Shared data (phone, links, tech categories) lives in `lib/site.ts`. 3D scenes use three.js (`components/HeroCanvas.tsx`, `PageCanvas.tsx`, `TechSphere.tsx`).

## Not included yet
- Projects showcase (placeholder page only), backend / database, email address

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Keep the framework preset as Next.js.
4. Build command: `npm run build` (default is fine).
5. Deploy. No environment variables are required for this static portfolio version.

## Before publishing
- Review the bio and technology list for accuracy.
- Add a professional email address if you want an email contact link.
- Add a CV only when the final PDF is ready.
- Add projects later when you are ready to make them public.

## Visual asset
`public/images/ai-universe-portal.png` is the user-selected hero reference image.
