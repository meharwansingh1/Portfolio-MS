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
    slug: "musafir-podcast",
    title: "The Musafir Podcast",
    kind: "Musafir Media Publications",
    year: "Sep 2024 — Nov 2026",
    summary:
      "I ran The Musafir Podcast's YouTube channel end to end at Musafir Media Publications in New Delhi — growing from Graphic & Web Designer to Head Designer to Production Head.",
    highlights: [
      "Top episode: 111K views — Distress Deals Flooding Noida Real Estate",
      "Long-form podcasts, teasers and the channel launch with Raftaar",
      "Brand, web and graphic design across Musafir Media",
    ],
    tags: ["Production Head", "YouTube", "Adobe Creative Suite", "Web"],
    art: "glacier",
    files: [
      { name: "The Musafir Podcast", meta: "YouTube", to: "https://www.youtube.com/@themusafirpodcast-tmp" },
      { name: "All episodes I made", meta: "Showcase", to: "/showcase/#musafir-podcast", image: ytCover("PkQGxPIoazg") },
      { name: "High-Rise Building Secrets", meta: "39.8K views", to: "https://www.youtube.com/watch?v=vaTk8Kx-EJo", image: ytCover("vaTk8Kx-EJo") },
      { name: "Noida Distress Deals", meta: "111K views", to: "https://www.youtube.com/watch?v=nSyyCXZpXw4", image: ytCover("nSyyCXZpXw4") },
    ],
    links: [
      { label: "YouTube channel", href: "https://www.youtube.com/@themusafirpodcast-tmp" },
      { label: "See the episodes", href: "/showcase/#musafir-podcast" },
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
    files: [
      { name: "bookingjunction.co.in", meta: "Website", to: "https://bookingjunction.co.in" },
      { name: "All reels", meta: "Showcase", to: "/showcase/#booking-junction", image: reelCover("Da4kXYvs5uV") },
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
    href: "/showcase/#booking-junction",
  },
  {
    org: "Musafir Media Publications",
    place: "MusafirMediaHub · New Delhi",
    kind: "Job",
    roles: [
      { title: "Production Head", when: "Jun 2025 — 10 Nov 2026" },
      { title: "Head Designer", when: "Until Jun 2025" },
      { title: "Graphic & Web Designer", when: "From Sep 2024" },
    ],
    text: "Ran The Musafir Podcast's YouTube channel end to end, from design to production, and led design across the company.",
    points: ["The Musafir Podcast: top episode at 111K views", "Brand, web and graphic design", "Adobe Creative Suite, website building"],
    href: "/showcase/#musafir-podcast",
  },
  {
    org: "Bhujangyy",
    place: "My own brand",
    kind: "Own brand",
    roles: [{ title: "Founder & creator", when: "2026 — now" }],
    text: "Cinematic Sikh storytelling around an original Nihang Singh character.",
    points: ["Kharag Singh Yudh: 40+ reels from the Dasam Granth", "Dussehra Mahatam with Giani Birbal Singh Ji: 140K+ plays"],
    href: "/showcase/#bhujangyy",
  },
  {
    org: "Vectoristory",
    place: "YouTube & Instagram",
    kind: "Own brand",
    roles: [{ title: "Creator & animator", when: "2026 — now" }],
    text: "Vector-motion reels and long videos retelling ancient sacred stories.",
    points: ["Animated in After Effects", "Long videos and untold-story shorts"],
    href: "/showcase/#vectoristory",
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
