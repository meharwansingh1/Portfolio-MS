import type { ArtPreset } from "@/components/ui/glass-folder-cards"

/** Prefixes files in /public with the base path, for hosting under a sub-folder. */
export const asset = (path: string) => (process.env.NEXT_PUBLIC_BASE_PATH || "") + path

/** Everything personal lives here, so the pages stay about layout. */
export const site = {
  name: "Meharwan Singh",
  short: "MS",
  role: "Frontend Developer, Graphic Designer & Motion Storyteller",
  email: "meharramgarhia16@gmail.com",
  linkedin: "https://www.linkedin.com/in/meharwan-singh-316388278/",
  behance: "https://www.behance.net/MeharwanSinghh",
  cv: asset("/cv/Meharwan-Singh-CV.pdf"),
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/work", label: "Work" },
  { href: "/showcase", label: "Showcase" },
  { href: "/contact", label: "Contact" },
] as const

/** `href` is where that skill can be seen in action: a page on this site or a piece of work. */
export type Skill = { name: string; note: string; level: number; href: string }
export type SkillGroup = { id: string; title: string; blurb: string; art: ArtPreset; skills: Skill[] }

export const skillGroups: SkillGroup[] = [
  {
    id: "build",
    title: "Build",
    blurb: "The code that holds a page up and makes it move — from hand-written HTML to Next.js.",
    art: "glacier",
    skills: [
      { name: "Next.js", note: "Multi-page React sites, statically exported and deployed to GitHub Pages.", level: 76, href: "/work/#portfolio" },
      { name: "Tailwind CSS", note: "Utility-first styling for fast, consistent, responsive layouts.", level: 84, href: "/lab/rahgir/" },
      { name: "HTML", note: "Semantic, accessible structure that works on every device.", level: 92, href: "/work/#portfolio" },
      { name: "CSS", note: "Layout, motion and responsive systems from first principles.", level: 88, href: "/work/#portfolio" },
      { name: "JavaScript", note: "Interactivity and dynamic interfaces in the browser.", level: 78, href: "https://meharwansingh1.github.io/portfolioo/mehar/" },
      { name: "Bootstrap", note: "Fast, mobile-first layouts from a proven grid.", level: 80, href: "https://www.behance.net/gallery/179151969/Web-Template" },
      { name: "jQuery", note: "DOM traversal, events and quick animation.", level: 74, href: "https://meharwansingh1.github.io/portfolioo/mehar/" },
      { name: "Python", note: "Scripting and automation beyond the browser.", level: 62, href: "https://github.com/meharwansingh1" },
    ],
  },
  {
    id: "design",
    title: "Design",
    blurb: "Shape, colour and type before a single line of code.",
    art: "dusk",
    skills: [
      { name: "UI / UX", note: "Interfaces that read clearly and feel considered.", level: 82, href: "https://www.behance.net/gallery/179151969/Web-Template" },
      { name: "Graphic Design", note: "Posters, brand pieces and social visuals.", level: 86, href: "/showcase/#graphic-design" },
      { name: "Adobe Illustrator", note: "Clean vector artwork and characters.", level: 84, href: "https://www.behance.net/MeharwanSinghh" },
    ],
  },
  {
    id: "motion",
    title: "Motion",
    blurb: "Stories told frame by frame, with sound to carry them.",
    art: "ember",
    skills: [
      { name: "After Effects", note: "Vector motion, intros, teasers and long-form animation.", level: 85, href: "/showcase/#motion-animation" },
      { name: "Video Editing", note: "Reels and long videos cut to narration and music.", level: 88, href: "/showcase/#video-editing" },
      { name: "AI-assisted visuals", note: "Cinematic scene prompting with locked character design.", level: 80, href: "/showcase/#ai-animation" },
    ],
  },
]

export type Project = {
  slug: string
  title: string
  kind: string
  year: string
  summary: string
  /** the pieces of work inside a project, shown as a short list */
  highlights?: string[]
  tags: string[]
  art: ArtPreset
  /** a picture for the folder's front; without it the folder shows its art */
  cover?: string
  links: { label: string; href: string }[]
  /** the sheets inside the project's glass folder; each one opens somewhere specific */
  files: FolderLink[]
}

/** A sheet in a glass folder. `to` is a page on this site ("/showcase/#…") or a full URL. */
export type FolderLink = { name: string; meta: string; to: string; image?: string; art?: ArtPreset }

const reelCover = (code: string) => asset(`/work/${code}.jpg`)
const ytCover = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
const shot = (name: string) => asset(`/work/crafts/${name}.jpg`)

/** The main body of work, strongest first. */
export const projects: Project[] = [
  {
    slug: "bhujangyy",
    title: "Bhujangyy",
    kind: "Own brand",
    year: "2026 — now",
    summary:
      "An own brand for Sikh and Gurmat storytelling, built around an original young Nihang Singh character — home to cinematic katha series, motion-designed intros and teasers.",
    highlights: [
      "Kharag Singh Yudh: 40+ cinematic reels from the Dasam Granth, and a multi-part long-form video with Giani Sher Singh Ji's katha",
      "Dussehra Mahatam: a collaboration series with Giani Birbal Singh Ji",
      "A consistent motion-design identity: character, intros and teasers",
    ],
    tags: ["Brand", "Motion design", "AI visuals", "Editing"],
    art: "ember",
    cover: shot("ksy-all"),
    files: [
      { name: "All Bhujangyy reels", meta: "Showcase", to: "/showcase/#ai-animation", image: shot("ksy-all") },
      { name: "Dussehra Mahatam · Day 9", meta: "Katha reel", to: "https://www.instagram.com/reel/DeqFOaaB7zp/", image: reelCover("DeqFOaaB7zp") },
      { name: "Kharag Singh Yudh · Part 41", meta: "Latest", to: "https://www.instagram.com/reel/De2-7D0BEHB/", image: reelCover("De2-7D0BEHB") },
      { name: "Kharag Singh Yudh · Part 40", meta: "AI cinematic reel", to: "https://www.instagram.com/reel/Dewq-vvTCi8/", image: reelCover("Dewq-vvTCi8") },
    ],
    links: [{ label: "Instagram", href: "https://www.instagram.com/bhujangyy/" }],
  },
  {
    slug: "musafir-podcast",
    title: "The Musafir Podcast",
    kind: "Musafir Media Publications",
    year: "Sep 2024 — Nov 2026",
    summary:
      "I ran The Musafir Podcast's YouTube channel end to end at Musafir Media Publications in New Delhi — growing from Graphic & Web Designer to Head Designer to Production Head.",
    highlights: [
      "Full podcast episodes edited end to end, plus their thumbnails",
      "Long-form podcasts, teasers and the channel launch with Raftaar",
      "Brand, web and graphic design across Musafir Media",
    ],
    tags: ["Production Head", "YouTube", "Adobe Creative Suite", "Web"],
    art: "glacier",
    cover: ytCover("PkQGxPIoazg"),
    files: [
      { name: "The Musafir Podcast", meta: "YouTube", to: "https://www.youtube.com/@themusafirpodcast-tmp", image: ytCover("l8C4EreYkgk") },
      { name: "All episodes I made", meta: "Showcase", to: "/showcase/#video-editing", image: ytCover("PkQGxPIoazg") },
      { name: "High-Rise Building Secrets", meta: "Episode", to: "https://www.youtube.com/watch?v=vaTk8Kx-EJo", image: ytCover("vaTk8Kx-EJo") },
      { name: "Noida Distress Deals", meta: "Episode", to: "https://www.youtube.com/watch?v=nSyyCXZpXw4", image: ytCover("nSyyCXZpXw4") },
    ],
    links: [
      { label: "YouTube channel", href: "https://www.youtube.com/@themusafirpodcast-tmp" },
      { label: "See the episodes", href: "/showcase/#video-editing" },
    ],
  },
  {
    slug: "booking-junction",
    title: "Booking Junction",
    kind: "Design partner",
    year: "Mar 2026 — now",
    summary:
      "I handle design for Booking Junction, a B2B travel company: event posters, daily posts and destination reels for their Instagram.",
    highlights: ["Event posters and daily social posts", "Destination reels: Japan, Bali, Europe, Dubai and more"],
    tags: ["Social design", "Posters", "Reels"],
    art: "verdant",
    cover: shot("bj-posts"),
    files: [
      { name: "bookingjunction.co.in", meta: "Website", to: "https://bookingjunction.co.in", image: reelCover("Da4kXYvs5uV") },
      { name: "All reels", meta: "Showcase", to: "/showcase/#video-editing", image: reelCover("Da4kXYvs5uV") },
      { name: "Bali", meta: "Reel", to: "https://www.instagram.com/reel/DbNKXuaMsUM/", image: reelCover("DbNKXuaMsUM") },
      { name: "Japan", meta: "Reel", to: "https://www.instagram.com/reel/Db2XXqpuTmJ/", image: reelCover("Db2XXqpuTmJ") },
    ],
    links: [
      { label: "Instagram", href: "https://www.instagram.com/booking.junction/" },
      { label: "Website", href: "https://bookingjunction.co.in" },
    ],
  },
  {
    slug: "giani-birbal-singh-ji",
    title: "Giani Birbal Singh Ji",
    kind: "Content & collaboration",
    year: "Mar 2023 — now",
    summary:
      "Where my professional work began: video editing and graphic design for Giani Birbal Singh Ji's YouTube channel from Sri Anandpur Sahib, remotely, from March 2023 to September 2024. We still create together.",
    highlights: [
      "Dussehra Mahatam (October 2026): nine days of recorded katha from 11 October, closing with the bhog samagam live on the tenth day, released across both pages with Bhujangyy",
      "Reels, graphics and recorded series for his pages",
    ],
    tags: ["Video editing", "Graphic design", "Social"],
    art: "verdant",
    cover: reelCover("DRa01OHk9w9"),
    files: [
      { name: "Giani Birbal Singh Ji", meta: "Instagram", to: "https://www.instagram.com/gianibirbalsinghji/", image: reelCover("DRa01OHk9w9") },
      { name: "YouTube channel", meta: "@gianibirbalsinghji", to: "https://www.youtube.com/@gianibirbalsinghji", image: ytCover("Fi959u_T1xQ") },
      { name: "Hola Mahalla di Upma", meta: "YouTube", to: "https://www.youtube.com/watch?v=Fi959u_T1xQ", image: ytCover("Fi959u_T1xQ") },
      { name: "Guru Tegh Bahadur Ji", meta: "Viral reel", to: "https://www.instagram.com/reel/DRa01OHk9w9/", image: reelCover("DRa01OHk9w9") },
    ],
    links: [
      { label: "Instagram", href: "https://www.instagram.com/gianibirbalsinghji/" },
      { label: "YouTube", href: "https://www.youtube.com/@gianibirbalsinghji" },
    ],
  },
  {
    slug: "vectoristory",
    title: "Vectoristory",
    kind: "Own brand",
    year: "2026 — now",
    summary:
      "Vector-motion reels and long videos retelling ancient sacred stories, animated in After Effects, with a new animated story every day.",
    highlights: ["Samudra Manthan", "Part 2: Mohini & the Stolen Amrit", "Untold-story reels from many faiths"],
    tags: ["After Effects", "Vector motion", "Storytelling"],
    art: "dusk",
    cover: shot("site-vectoristory"),
    files: [
      { name: "YouTube channel", meta: "@vectoristory", to: "https://www.youtube.com/@vectoristory", image: ytCover("FQ76hjBlx78") },
      { name: "Mohini · Part 2", meta: "4:50", to: "https://www.youtube.com/watch?v=DDlEpPzR6UY", image: ytCover("DDlEpPzR6UY") },
      { name: "The temple that opens when Ravan burns", meta: "Animated short", to: "https://www.youtube.com/shorts/DkwZ0D6srJY", image: ytCover("DkwZ0D6srJY") },
      { name: "Samudra Manthan", meta: "5:43", to: "https://www.youtube.com/watch?v=FQ76hjBlx78", image: ytCover("FQ76hjBlx78") },
    ],
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@vectoristory" },
      { label: "Instagram", href: "https://www.instagram.com/vectoristory/" },
    ],
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    kind: "Website",
    year: "2026",
    summary:
      "The site you're on: a multi-page Next.js build with glass folders whose artwork is generated in code, dark mode, and automatic deploys to GitHub Pages.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    art: "aurora",
    cover: shot("web"),
    files: [
      { name: "Source code", meta: "GitHub", to: "https://github.com/meharwansingh1/portfolioo", image: shot("web") },
      { name: "Showcase page", meta: "Built here", to: "/showcase/", image: shot("site-showcase") },
      { name: "Live site", meta: "github.io", to: "https://meharwansingh1.github.io/portfolioo/", image: shot("web") },
    ],
    links: [
      { label: "Live site", href: "https://meharwansingh1.github.io/portfolioo/" },
      { label: "Source code", href: "https://github.com/meharwansingh1/portfolioo" },
    ],
  },
  {
    slug: "web-lab",
    title: "Web Lab",
    kind: "Concept websites",
    year: "2026",
    summary:
      "Three concept websites, each with its own look and its own interaction — built to show range beyond this portfolio.",
    highlights: [
      "Vectoristory: cinematic, a live starfield and an episode grid",
      "Bhujangyy: Gurmukhi titles and an interactive ten-day picker",
      "Rahgir: a fictional travel brand with SVG postcards and a live estimator",
    ],
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    art: "glacier",
    cover: shot("site-rahgir"),
    files: [
      { name: "Rahgir", meta: "Travel concept", to: "/lab/rahgir/", image: shot("site-rahgir") },
      { name: "Bhujangyy", meta: "Brand concept", to: "/lab/bhujangyy/", image: shot("site-bhujangyy") },
      { name: "Vectoristory", meta: "Channel concept", to: "/lab/vectoristory/", image: shot("site-vectoristory") },
    ],
    links: [
      { label: "Open Rahgir", href: "/lab/rahgir/" },
      { label: "Bhujangyy", href: "/lab/bhujangyy/" },
      { label: "Vectoristory", href: "/lab/vectoristory/" },
    ],
  },
]

/** Concept websites, each its own full page under /lab. */
export const webLab = [
  { slug: "vectoristory", title: "Vectoristory", line: "A dark, cinematic site for an animation channel — starfield, gold serif type, episode grid.", tags: ["Next.js", "Canvas", "Tailwind"] },
  { slug: "bhujangyy", title: "Bhujangyy", line: "A brand site in night blue and steel, with Gurmukhi titles and a ten-day Dussehra Mahatam picker.", tags: ["Next.js", "Gurmukhi type", "Tailwind"] },
  { slug: "rahgir", title: "Rahgir", line: "A playful travel landing page for a fictional brand: mood tabs, SVG postcards, live trip estimator.", tags: ["Next.js", "SVG", "Tailwind"] },
]


/** Where it started: the first pieces on Behance. */
export const earlyWork = [
  {
    title: "MEHAR — Try the Look",
    text: "A luxury store for my own concept label MEHAR (ਮਿਹਰ): Punjabi heritage cut as streetwear. A 3D ring of six looks, then zoom from the full outfit down to a single piece and its fabric, with prices.",
    links: [{ label: "Open the store", href: "https://meharwansingh1.github.io/portfolioo/mehar/" }],
  },
  {
    title: "Behance profile",
    text: "My first design pieces — layouts, graphics and the experiments that got me here.",
    links: [{ label: "View on Behance", href: "https://www.behance.net/MeharwanSinghh" }],
  },
]

/** Career so far, newest first. Each entry links to the work it produced. */
export type Role = { title: string; when: string }
export type Chapter = {
  org: string
  place?: string
  kind: "Job" | "Freelance" | "Internship" | "Own brand" | "Collaboration" | "Education"
  roles: Role[]
  text: string
  points: string[]
  href: string
}

export const timeline: Chapter[] = [
  {
    org: "Booking Junction",
    place: "Remote · bookingjunction.co.in",
    kind: "Freelance",
    roles: [{ title: "Designer", when: "22 Mar 2026 — now" }],
    text: "Design for a B2B travel company's Instagram.",
    points: ["Event posters and daily posts", "Destination reels"],
    href: "/showcase/#video-editing",
  },
  {
    org: "Musafir Media Publications",
    place: "MusafirMediaHub · New Delhi",
    kind: "Job",
    roles: [
      { title: "Production Head", when: "Jun 2025 — 10 Nov 2026" },
      { title: "Head Designer", when: "Feb 2025 — Jun 2025" },
      { title: "Graphic & Web Designer", when: "Sep 2024 — Feb 2025" },
    ],
    text: "Ran The Musafir Podcast's YouTube channel end to end, from design to production, and led design across the company.",
    points: ["The Musafir Podcast: episodes, teasers and thumbnails", "Brand, web and graphic design", "Adobe Creative Suite, website building"],
    href: "/showcase/#video-editing",
  },
  {
    org: "Bhujangyy",
    place: "Own brand",
    kind: "Own brand",
    roles: [{ title: "Creator & designer", when: "2026 — now" }],
    text: "Cinematic Sikh storytelling around an original Nihang Singh character.",
    points: ["Kharag Singh Yudh: 40+ reels from the Dasam Granth", "Dussehra Mahatam with Giani Birbal Singh Ji: a reel and cover for every day"],
    href: "/showcase/#ai-animation",
  },
  {
    org: "Vectoristory",
    place: "YouTube & Instagram",
    kind: "Own brand",
    roles: [{ title: "Creator & animator", when: "2026 — now" }],
    text: "Vector-motion reels and long videos retelling ancient sacred stories.",
    points: ["Animated in After Effects", "Long videos and untold-story shorts"],
    href: "/showcase/#motion-animation",
  },
  {
    org: "The Purple Brick",
    place: "Gurugram · Remote",
    kind: "Internship",
    roles: [{ title: "Graphic Designer Intern", when: "May 2024 — Jul 2024" }],
    text: "A three-month design internship.",
    points: ["Typography and social graphics"],
    href: "/skills/#design",
  },
  {
    org: "Giani Birbal Singh Ji",
    place: "YouTube channel · Sri Anandpur Sahib · Remote",
    kind: "Freelance",
    roles: [{ title: "Video Editor & Graphic Designer", when: "Mar 2023 — Sep 2024" }],
    text: "Where my professional work began. We still collaborate.",
    points: ["Video editing for the YouTube channel", "Covers and graphics in Photoshop", "Premiere Pro"],
    href: "/work/#giani-birbal-singh-ji",
  },
  {
    org: "University of Delhi",
    kind: "Education",
    roles: [{ title: "Bachelor of Arts (B.A.) in History", when: "Jun 2023 — Jun 2026" }],
    text: "An undergraduate degree in History, studied alongside my design work.",
    points: ["Bachelor of Arts, History"],
    href: "/about/#story",
  },
  {
    org: "Arena Animation",
    kind: "Education",
    roles: [{ title: "UI/UX Advanced Programme", when: "May 2023 — Nov 2024" }],
    text: "Formal training in UI/UX design.",
    points: ["Interface and experience design"],
    href: "/skills/#design",
  },
]

/** Notice period at Musafir Media ends on this day; the site switches its status by itself. */
export const noticeEnds = "2026-11-10T00:00:00+05:30"
