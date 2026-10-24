# Meharwan Singh — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4, in the shadcn project structure.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Add your own files

Copy your old site's `images` folder into `public/`, so these exist:

- `public/images/sec-pic.jpg` — home page portrait
- `public/images/ms2.jpg` — about page portrait
- `public/images/CV.pdf` — the "Download CV" button

Until the photos are there, an "MS" monogram shows instead of a broken image.

## Where things live

| Path | What it is |
| --- | --- |
| `lib/data.ts` | **All your content**: name, links, skills, projects, timeline. Edit here first. |
| `app/page.tsx` | Home |
| `app/about`, `app/skills`, `app/work`, `app/contact` | One full page each |
| `components/ui/glass-folder-cards.tsx` | The 21st.dev Glass Folder component, unchanged |
| `components/ui/glass-folder-cards-demo.tsx` | Its original demo, for reference |
| `components/site/*` | Nav, footer, theme toggle, scroll reveals, folder wrappers |
| `components.json` | shadcn config, so `npx shadcn@latest add <component>` drops new components into `components/ui` |

### Why `components/ui`?
That's where the shadcn CLI (and 21st.dev's copy-paste instructions) put components, and every
import uses the `@/components/ui/...` alias. Keeping that folder means you can paste in more
21st.dev components later without changing any paths.

## Deploy
Push to GitHub and import the repo on Vercel — no settings needed.
