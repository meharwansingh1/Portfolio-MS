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
  behance: "https://www.behance.net/meharramgarh1a",
  cv: asset("/images/CV.pdf"),
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
] as const

export type Skill = { name: string; note: string; level: number }
export type SkillGroup = { id: string; title: string; blurb: string; art: ArtPreset; skills: Skill[] }

export const skillGroups: SkillGroup[] = [
  {
    id: "build",
    title: "Build",
    blurb: "The code that holds a page up and makes it move.",
    art: "glacier",
    skills: [
      { name: "HTML", note: "Semantic, accessible structure that works on every device.", level: 92 },
      { name: "CSS", note: "Layout, motion and responsive systems from first principles.", level: 88 },
      { name: "JavaScript", note: "Interactivity and dynamic interfaces in the browser.", level: 78 },
      { name: "Bootstrap", note: "Fast, mobile-first layouts from a proven grid.", level: 80 },
      { name: "jQuery", note: "DOM traversal, events and quick animation.", level: 74 },
      { name: "Python", note: "Scripting and automation beyond the browser.", level: 62 },
    ],
  },
  {
    id: "design",
    title: "Design",
    blurb: "Shape, colour and type before a single line of code.",
    art: "dusk",
    skills: [
      { name: "UI / UX", note: "Interfaces that read clearly and feel considered.", level: 82 },
      { name: "Graphic Design", note: "Posters, brand pieces and social visuals.", level: 86 },
      { name: "Adobe Illustrator", note: "Clean vector artwork and characters.", level: 84 },
    ],
  },
  {
    id: "motion",
    title: "Motion",
    blurb: "Stories told frame by frame, with sound to carry them.",
    art: "ember",
    skills: [
      { name: "After Effects", note: "Vector motion, intros, teasers and long-form animation.", level: 85 },
      { name: "Video Editing", note: "Reels and long videos cut to narration and music.", level: 88 },
      { name: "AI-assisted visuals", note: "Cinematic scene prompting with locked character design.", level: 80 },
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
  links: { label: string; href: string }[]
}

/** The main body of work, strongest first. */
export const projects: Project[] = [
  {
    slug: "bhujangyy",
    title: "Bhujangyy",
    kind: "My brand",
    year: "2026 — now",
    summary:
      "My own brand for Sikh and Gurmat storytelling, built around an original young Nihang Singh character. Everything I make in this space lives here, from cinematic katha series to motion-designed intros and teasers.",
    highlights: [
      "Kharag Singh Yudh: 40+ cinematic reels from the Dasam Granth, and a multi-part long-form video with Giani Sher Singh Ji's katha",
      "Dussehra Mahatam: a collaboration series with Giani Birbal Singh Ji",
      "A consistent motion-design identity: character, intros and teasers",
    ],
    tags: ["Brand", "Motion design", "AI visuals", "Editing"],
    art: "ember",
    links: [{ label: "Instagram", href: "https://www.instagram.com/bhujangyy/" }],
  },
  {
    slug: "giani-birbal-singh-ji",
    title: "Giani Birbal Singh Ji",
    kind: "Content & collaboration",
    year: "First role — now",
    summary:
      "Where my professional work began: reels, graphics and recorded series for Giani Birbal Singh Ji across platforms. We still create together.",
    highlights: [
      "Dussehra Mahatam (October 2026): nine days of recorded katha from 11 October, closing with the bhog samagam live on the tenth day, released across both pages with Bhujangyy",
      "Reels, graphics and recorded series for his pages",
    ],
    tags: ["Video editing", "Graphic design", "Social"],
    art: "verdant",
    links: [{ label: "Instagram", href: "https://www.instagram.com/gianibirbalsinghji/" }],
  },
  {
    slug: "vectoristory",
    title: "Vectoristory",
    kind: "Motion series",
    year: "2026 — now",
    summary:
      "Vector-motion reels and long videos retelling ancient sacred stories, animated in After Effects, with a new animated story every day.",
    highlights: ["Samudra Manthan", "Part 2: Mohini & the Stolen Amrit", "Untold-story reels from many faiths"],
    tags: ["After Effects", "Vector motion", "Storytelling"],
    art: "dusk",
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
    links: [
      { label: "Live site", href: "https://meharwansingh1.github.io/portfolioo/" },
      { label: "Source code", href: "https://github.com/meharwansingh1/portfolioo" },
    ],
  },
]

/** Where it started: the first pieces on Behance. */
export const earlyWork = [
  {
    title: "My Travel Vlogs",
    text: "A responsive travel-vlog web template — designed on Behance, then built and shipped live.",
    links: [
      { label: "Live demo", href: "https://meharwansingh1.github.io/MyTravelVlogs/" },
      { label: "Behance", href: "https://www.behance.net/gallery/179151969/Web-Template" },
    ],
  },
  {
    title: "Behance profile",
    text: "My first design pieces — layouts, graphics and the experiments that got me here.",
    links: [{ label: "View on Behance", href: "https://www.behance.net/meharramgarh1a" }],
  },
]

export const timeline = [
  {
    when: "First role",
    title: "Content & design for Giani Birbal Singh Ji",
    text: "Where I learned to make work that people actually watch: reels, graphics and recorded series across platforms. We still collaborate, most recently on Dussehra Mahatam.",
  },
  {
    when: "Since",
    title: "Frontend developer & designer",
    text: "Building and styling the web by day, while growing my own brand, Bhujangyy, and my motion series, Vectoristory.",
  },
  {
    when: "Now",
    title: "Open to remote roles",
    text: "Looking for a remote team where development, design and motion can sit in the same pair of hands.",
  },
]
