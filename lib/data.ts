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
  portrait: asset("/images/sec-pic.jpg"),
  aboutPortrait: asset("/images/ms2.jpg"),
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
  tags: string[]
  art: ArtPreset
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
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
  {
    slug: "travel-vlogs",
    title: "My Travel Vlogs",
    kind: "Website",
    year: "2023",
    summary: "A responsive travel-vlog web template, designed first in Behance and then built and shipped live.",
    tags: ["HTML", "CSS", "JavaScript"],
    art: "glacier",
    links: [
      { label: "Live demo", href: "https://meharwansingh1.github.io/MyTravelVlogs/" },
      { label: "Behance", href: "https://www.behance.net/gallery/179151969/Web-Template" },
    ],
  },
  {
    slug: "illustrator",
    title: "Illustrator Series",
    kind: "Graphic Design",
    year: "2023",
    summary: "A collection of vector illustration and graphic pieces made in Adobe Illustrator.",
    tags: ["Illustrator", "Vector", "Branding"],
    art: "dusk",
    links: [{ label: "Behance", href: "https://www.behance.net/gallery/186112193/Adobe-Illustrator" }],
  },
  {
    slug: "vectoristory",
    title: "Vectoristory",
    kind: "Motion Series",
    year: "2026",
    summary:
      "A page of vector-motion reels and long videos retelling ancient sacred stories, starting with Samudra Manthan and its sequel, Mohini & the Stolen Amrit. Animated in After Effects.",
    tags: ["After Effects", "Vector motion", "Storytelling"],
    art: "ember",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@vectoristory" },
      { label: "Instagram", href: "https://www.instagram.com/vectoristory/" },
    ],
  },
  {
    slug: "bhujangyy",
    title: "Bhujangyy",
    kind: "Channel & Brand",
    year: "2026",
    summary:
      "Sikh and Gurmat content for Instagram, built around an original young Nihang Singh character, with a consistent motion-design identity of intros and teasers.",
    tags: ["Motion design", "Character", "Social"],
    art: "dusk",
    links: [{ label: "Instagram", href: "https://www.instagram.com/bhujangyy/" }],
  },
  {
    slug: "kharag-singh-yudh",
    title: "Kharag Singh Yudh",
    kind: "Cinematic Series",
    year: "2026",
    summary:
      "A long-running reel series and multi-part long-form katha video, with ultra-real cinematic scenes, on-screen Gurbani and katha narration.",
    tags: ["AI visuals", "Editing", "Long-form"],
    art: "verdant",
    links: [{ label: "Watch the reels", href: "https://www.instagram.com/bhujangyy/" }],
  },
]

export const timeline = [
  {
    when: "First role",
    title: "Content & design for Giani Birbal Singh Ji",
    text: "Where I learned to make work that people actually watch: reels, graphics and recorded series across platforms.",
  },
  {
    when: "Since",
    title: "Frontend developer & designer",
    text: "Building and styling the web by day, while growing my own channels in motion and storytelling.",
  },
  {
    when: "Now",
    title: "Open to remote roles",
    text: "Looking for a remote team where development, design and motion can sit in the same pair of hands.",
  },
]
