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
    blurb: "The code that holds a page up and makes it move.",
    art: "glacier",
    skills: [
      { name: "HTML", note: "Semantic, accessible structure that works on every device.", level: 92, href: "/work/#portfolio" },
      { name: "CSS", note: "Layout, motion and responsive systems from first principles.", level: 88, href: "/work/#portfolio" },
      { name: "JavaScript", note: "Interactivity and dynamic interfaces in the browser.", level: 78, href: "https://meharwansingh1.github.io/MyTravelVlogs/" },
      { name: "Bootstrap", note: "Fast, mobile-first layouts from a proven grid.", level: 80, href: "https://www.behance.net/gallery/179151969/Web-Template" },
      { name: "jQuery", note: "DOM traversal, events and quick animation.", level: 74, href: "https://meharwansingh1.github.io/MyTravelVlogs/" },
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
      { name: "Graphic Design", note: "Posters, brand pieces and social visuals.", level: 86, href: "/showcase/#dussehra-mahatam" },
      { name: "Adobe Illustrator", note: "Clean vector artwork and characters.", level: 84, href: "https://www.behance.net/meharramgarh1a" },
    ],
  },
  {
    id: "motion",
    title: "Motion",
    blurb: "Stories told frame by frame, with sound to carry them.",
    art: "ember",
    skills: [
      { name: "After Effects", note: "Vector motion, intros, teasers and long-form animation.", level: 85, href: "/showcase/#vectoristory" },
      { name: "Video Editing", note: "Reels and long videos cut to narration and music.", level: 88, href: "/showcase/#bhujangyy" },
      { name: "AI-assisted visuals", note: "Cinematic scene prompting with locked character design.", level: 80, href: "/showcase/#kharag-singh-yudh" },
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
  /** the sheets inside the project's glass folder; each one opens somewhere specific */
  files: FolderLink[]
}

/** A sheet in a glass folder. `to` is a page on this site ("/showcase/#…") or a full URL. */
export type FolderLink = { name: string; meta: string; to: string; image?: string; art?: ArtPreset }

const reelCover = (code: string) => asset(`/work/${code}.jpg`)
const ytCover = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

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
    files: [
      { name: "All Bhujangyy reels", meta: "Showcase", to: "/showcase/#bhujangyy" },
      { name: "Dussehra Mahatam · Day 9", meta: "30.6K plays", to: "https://www.instagram.com/reel/DeqFOaaB7zp/", image: reelCover("DeqFOaaB7zp") },
      { name: "Kharag Singh Yudh · Part 41", meta: "Latest", to: "https://www.instagram.com/reel/De2-7D0BEHB/", image: reelCover("De2-7D0BEHB") },
      { name: "Kharag Singh Yudh · Part 40", meta: "29.5K plays", to: "https://www.instagram.com/reel/Dewq-vvTCi8/", image: reelCover("Dewq-vvTCi8") },
    ],
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
    files: [
      { name: "Giani Birbal Singh Ji", meta: "Instagram", to: "https://www.instagram.com/gianibirbalsinghji/" },
      { name: "All 10 days", meta: "Showcase", to: "/showcase/#dussehra-mahatam", art: "verdant" },
      { name: "Day 10 · Bhog", meta: "Dussehra Mahatam", to: "https://www.instagram.com/reel/DesAiuEzkA_/", image: reelCover("DesAiuEzkA_") },
      { name: "Shahidi Bagh, Anandpur Sahib", meta: "21.1K plays", to: "https://www.instagram.com/reel/DetvuhmTaks/", image: reelCover("DetvuhmTaks") },
    ],
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
    files: [
      { name: "YouTube channel", meta: "@vectoristory", to: "https://www.youtube.com/@vectoristory" },
      { name: "Mohini · Part 2", meta: "4:50", to: "https://www.youtube.com/watch?v=DDlEpPzR6UY", image: ytCover("DDlEpPzR6UY") },
      { name: "The temple that opens when Ravan burns", meta: "2.4K views", to: "https://www.youtube.com/shorts/DkwZ0D6srJY", image: ytCover("DkwZ0D6srJY") },
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
    files: [
      { name: "Source code", meta: "GitHub", to: "https://github.com/meharwansingh1/portfolioo" },
      { name: "Showcase page", meta: "Built here", to: "/showcase/", art: "aurora" },
      { name: "Live site", meta: "github.io", to: "https://meharwansingh1.github.io/portfolioo/", art: "glacier" },
    ],
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

/** Career so far, newest first. */
export const timeline = [
  {
    when: "Oct 2026",
    role: "Collaborator",
    org: "Bhujangyy × Giani Birbal Singh Ji",
    text: "Dussehra Mahatam: ten days of katha released across both pages, from 11 October to the bhog samagam.",
    points: ["A reel for every day, released on both pages", "140K+ plays across the series on Bhujangyy"],
    href: "/showcase/#dussehra-mahatam",
  },
  {
    when: "2026 — now",
    role: "Founder & creator",
    org: "Bhujangyy",
    text: "My own brand for cinematic Sikh storytelling, built around an original Nihang Singh character.",
    points: ["Kharag Singh Yudh: 40+ reels from the Dasam Granth", "Multi-part long-form katha video in production", "Brand identity, intros and teasers in After Effects"],
    href: "/showcase/#bhujangyy",
  },
  {
    when: "2026 — now",
    role: "Creator & animator",
    org: "Vectoristory",
    text: "Vector-motion reels and long videos retelling ancient sacred stories, on YouTube and Instagram.",
    points: ["Animated in After Effects with Indian-English narration", "Long videos and untold-story shorts"],
    href: "/showcase/#vectoristory",
  },
  {
    when: "Current role",
    role: "Frontend Developer & Graphic Designer",
    org: "",
    text: "Building and styling interfaces, and designing the graphics that go on them.",
    points: ["HTML, CSS and JavaScript interfaces", "Graphic and UI design"],
    href: "/skills/",
  },
  {
    when: "First role",
    role: "Content & design",
    org: "Giani Birbal Singh Ji",
    text: "Where my professional work began: reels, graphics and recorded series across platforms.",
    points: ["Video editing for reels and recorded series", "Social graphics and covers"],
    href: "https://www.instagram.com/gianibirbalsinghji/",
  },
]
