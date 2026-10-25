import { asset } from "./data"

/**
 * Everything published, organised by craft rather than by numbers. Covers for
 * Instagram reels live in /public/work (named by the reel's shortcode);
 * YouTube covers come straight from YouTube. To add a piece, add a line.
 */

export type CraftId = "graphic-design" | "video-editing" | "motion-animation" | "ai-animation" | "web"

export type Craft = {
  id: CraftId
  title: string
  /** one line on what this craft covers */
  line: string
  tools: string[]
}

export const crafts: Craft[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    line: "Thumbnails, covers, title cards, posters and posts — the stills that make people stop.",
    tools: ["Photoshop", "Illustrator"],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    line: "Long-form podcasts cut to keep people watching, and reels cut to the beat of the story.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "motion-animation",
    title: "Motion Animation",
    line: "Vector characters and worlds animated frame by frame to retell ancient stories.",
    tools: ["After Effects", "Illustrator"],
  },
  {
    id: "ai-animation",
    title: "AI Animation",
    line: "Cinematic AI-generated scenes with locked character designs, edited into a running series.",
    tools: ["AI image & video tools", "Premiere Pro"],
  },
  {
    id: "web",
    title: "Web",
    line: "Sites designed and built by hand, from layout to code — each with its own look.",
    tools: ["Next.js", "Tailwind CSS", "HTML / CSS / JS"],
  },
]

export type Piece = {
  id: string
  craft: CraftId
  /** who or what it was for; pieces are grouped by this inside a craft */
  group: string
  title: string
  /** a second line: what it is */
  note: string
  /** video plays in place, image opens large, link opens a new tab */
  kind: "video" | "image" | "link"
  /** tall (9:16) or wide (16:9) */
  shape: "tall" | "wide"
  cover: string
  /** where the piece lives */
  href: string
  /** for video: the player URL; for image: the full-size picture */
  view?: string
  collab?: string
}

/* --------------------------------------------------------------- helpers */

const reel = (code: string) => ({
  cover: asset(`/work/${code}.jpg`),
  href: `https://www.instagram.com/reel/${code}/`,
  view: `https://www.instagram.com/reel/${code}/embed/`,
})
const video = (id: string, short = false) => ({
  cover: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  href: short ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`,
  view: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
})
/** a YouTube thumbnail shown as a piece of graphic design, at full size */
const thumb = (id: string) => ({
  cover: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  href: `https://www.youtube.com/watch?v=${id}`,
  view: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
})
/** a reel's designed cover, shown as a still */
const cover = (code: string) => ({
  cover: asset(`/work/${code}.jpg`),
  href: `https://www.instagram.com/reel/${code}/`,
  view: asset(`/work/${code}.jpg`),
})

const giani = "with Giani Birbal Singh Ji"
const TMP = "The Musafir Podcast"
const BJ = "Booking Junction"
const DM = "Dussehra Mahatam · Bhujangyy"
const VS = "Vectoristory"

export const pieces: Piece[] = [
  /* ================================================== graphic design */
  { id: "g-tmp-noida", craft: "graphic-design", group: TMP, title: "Distress Deals in Noida", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("nSyyCXZpXw4") },
  { id: "g-tmp-highrise", craft: "graphic-design", group: TMP, title: "High-Rise Building Secrets", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("vaTk8Kx-EJo") },
  { id: "g-dm-cover", craft: "graphic-design", group: DM, title: "Dussehra Mahatam", note: "Cover series for all ten days", kind: "image", shape: "tall", collab: giani, ...cover("DeqFOaaB7zp") },
  { id: "g-tmp-astrology", craft: "graphic-design", group: TMP, title: "Astrology Is Fake · Ep 2", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("30CFmklHaJE") },
  { id: "g-tmp-studio", craft: "graphic-design", group: TMP, title: "Studio Apartment Exposed", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("GFR4KLEh2H4") },
  { id: "g-ksy-41", craft: "graphic-design", group: "Kharag Singh Yudh · Bhujangyy", title: "Kharag Singh Yudh · Part 41", note: "Title card", kind: "image", shape: "tall", ...cover("De2-7D0BEHB") },
  { id: "g-tmp-noida26", craft: "graphic-design", group: TMP, title: "Noida 2026", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("QRtwT-ajv6o") },
  { id: "g-vs-samudra", craft: "graphic-design", group: VS, title: "Samudra Manthan", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("FQ76hjBlx78") },
  { id: "g-tmp-ghost", craft: "graphic-design", group: TMP, title: "Ghost of Offroading", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("PkQGxPIoazg") },
  { id: "g-ksy-40", craft: "graphic-design", group: "Kharag Singh Yudh · Bhujangyy", title: "Kharag Singh Yudh · Part 40", note: "Title card", kind: "image", shape: "tall", ...cover("Dewq-vvTCi8") },
  { id: "g-tmp-myths", craft: "graphic-design", group: TMP, title: "Real Estate Myths Busted", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("LofQS-VjP7k") },
  { id: "g-vs-mohini", craft: "graphic-design", group: VS, title: "Mohini · Part 2", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("DDlEpPzR6UY") },
  { id: "g-tmp-dua", craft: "graphic-design", group: TMP, title: "The Most Trusted Face in Travel", note: "YouTube thumbnail", kind: "image", shape: "wide", ...thumb("0N65UQGRlJ8") },
  { id: "g-bj-posts", craft: "graphic-design", group: BJ, title: "Event posters & daily posts", note: "See them on Instagram", kind: "link", shape: "tall", cover: "", href: "https://www.instagram.com/booking.junction/" },

  /* =================================================== video editing */
  { id: "e-tmp-noida", craft: "video-editing", group: TMP, title: "Distress Deals Flooding Noida Real Estate", note: "Full podcast episode", kind: "video", shape: "wide", ...video("nSyyCXZpXw4") },
  { id: "e-tmp-highrise", craft: "video-editing", group: TMP, title: "The Biggest High-Rise Building Secrets", note: "Full podcast episode", kind: "video", shape: "wide", ...video("vaTk8Kx-EJo") },
  { id: "e-tmp-astrology", craft: "video-editing", group: TMP, title: "Astrology Is Fake · Episode 2", note: "Full podcast episode", kind: "video", shape: "wide", ...video("30CFmklHaJE") },
  { id: "e-tmp-studio", craft: "video-editing", group: TMP, title: "Studio Apartment Exposed", note: "Full podcast episode", kind: "video", shape: "wide", ...video("GFR4KLEh2H4") },
  { id: "e-tmp-noida26", craft: "video-editing", group: TMP, title: "Noida 2026: Resale Deals & Scams", note: "Full podcast episode", kind: "video", shape: "wide", ...video("QRtwT-ajv6o") },
  { id: "e-tmp-ghost", craft: "video-editing", group: TMP, title: "Ghost of Offroading", note: "Full podcast episode", kind: "video", shape: "wide", ...video("PkQGxPIoazg") },
  { id: "e-tmp-myths", craft: "video-editing", group: TMP, title: "Real Estate Myths Busted", note: "Full podcast episode", kind: "video", shape: "wide", ...video("LofQS-VjP7k") },
  { id: "e-tmp-dua", craft: "video-editing", group: TMP, title: "The Most Trusted Face in Travel", note: "Full podcast episode", kind: "video", shape: "wide", ...video("0N65UQGRlJ8") },
  { id: "e-tmp-parenting", craft: "video-editing", group: TMP, title: "Biggest Parenting Mistakes in 2026", note: "Full podcast episode", kind: "video", shape: "wide", ...video("L8bzLZazqVg") },
  { id: "e-tmp-boxer", craft: "video-editing", group: TMP, title: "The BrahMos Punch", note: "Full podcast episode", kind: "video", shape: "wide", ...video("GhsN1THDDxw") },
  { id: "e-tmp-teaser", craft: "video-editing", group: TMP, title: "Official Teaser · Episode 1", note: "Teaser edit", kind: "video", shape: "wide", ...video("iL_4QLKjfpY") },
  { id: "e-tmp-anthem", craft: "video-editing", group: TMP, title: "TMP Anthem with Raftaar", note: "Channel launch edit", kind: "video", shape: "wide", ...video("l8C4EreYkgk") },

  { id: "e-dm-bagh", craft: "video-editing", group: DM, title: "Gurdwara Shahidi Bagh", note: "Sri Anandpur Sahib", kind: "video", shape: "tall", collab: giani, ...reel("DetvuhmTaks") },
  { id: "e-dm-10", craft: "video-editing", group: DM, title: "Day 10 · Bhog", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DesAiuEzkA_") },
  { id: "e-dm-9", craft: "video-editing", group: DM, title: "Day 9", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DeqFOaaB7zp") },
  { id: "e-dm-8", craft: "video-editing", group: DM, title: "Day 8", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DengdDrhElE") },
  { id: "e-dm-7", craft: "video-editing", group: DM, title: "Day 7", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("Dek7oxtBzZx") },
  { id: "e-dm-6", craft: "video-editing", group: DM, title: "Day 6", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DeiW1j6B7qq") },
  { id: "e-dm-5", craft: "video-editing", group: DM, title: "Day 5", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DegdzaezHzb") },
  { id: "e-dm-4", craft: "video-editing", group: DM, title: "Day 4", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DedNQc0hi_6") },
  { id: "e-dm-3", craft: "video-editing", group: DM, title: "Day 3", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DeaodhGhEDp") },
  { id: "e-dm-2", craft: "video-editing", group: DM, title: "Day 2", note: "Katha reel", kind: "video", shape: "tall", collab: giani, ...reel("DeYDq3bhMoB") },

  { id: "e-bj-japan", craft: "video-editing", group: BJ, title: "Japan", note: "Destination reel", kind: "video", shape: "tall", ...reel("Db2XXqpuTmJ") },
  { id: "e-bj-bali", craft: "video-editing", group: BJ, title: "Bali", note: "Destination reel", kind: "video", shape: "tall", ...reel("DbNKXuaMsUM") },
  { id: "e-bj-europe", craft: "video-editing", group: BJ, title: "Europe", note: "Destination reel", kind: "video", shape: "tall", ...reel("Da7IBY9M6W3") },
  { id: "e-bj-malaysia", craft: "video-editing", group: BJ, title: "Malaysia", note: "Destination reel", kind: "video", shape: "tall", ...reel("Da4kXYvs5uV") },
  { id: "e-bj-dubai", craft: "video-editing", group: BJ, title: "Dubai", note: "Destination reel", kind: "video", shape: "tall", ...reel("DaCfw-XMJgF") },
  { id: "e-bj-seychelles", craft: "video-editing", group: BJ, title: "Seychelles", note: "Destination reel", kind: "video", shape: "tall", ...reel("DbXe6H0MYMr") },

  /* ================================================ motion animation */
  { id: "m-samudra", craft: "motion-animation", group: VS, title: "The Churning of the Ocean of Milk", note: "Samudra Manthan · full story", kind: "video", shape: "wide", ...video("FQ76hjBlx78") },
  { id: "m-mohini", craft: "motion-animation", group: VS, title: "Mohini: How Vishnu Tricked the Demons", note: "Samudra Manthan · part 2", kind: "video", shape: "wide", ...video("DDlEpPzR6UY") },
  { id: "m-ravan", craft: "motion-animation", group: VS, title: "The temple that opens only when Ravan burns", note: "Animated short", kind: "video", shape: "tall", ...video("DkwZ0D6srJY", true) },
  { id: "m-narasimha", craft: "motion-animation", group: VS, title: "Narasimha: not by man, not by beast", note: "Animated short", kind: "video", shape: "tall", ...video("Ll46kod8Hwg", true) },
  { id: "m-lakshman", craft: "motion-animation", group: VS, title: "Lakshman never drew the Lakshman Rekha", note: "Animated short", kind: "video", shape: "tall", ...video("WJh1PfAsKXc", true) },
  { id: "m-krishna", craft: "motion-animation", group: VS, title: "One joke destroyed Krishna's dynasty", note: "Animated short", kind: "video", shape: "tall", ...video("lga3ndhb4cQ", true) },
  { id: "m-arjun", craft: "motion-animation", group: VS, title: "The Pandavas sacrificed Arjun's own son", note: "Animated short", kind: "video", shape: "tall", ...video("kZneCUOoYCM", true) },
  { id: "m-shiva", craft: "motion-animation", group: VS, title: "Why is Shiva's throat blue?", note: "Samudra Manthan in 60 seconds", kind: "video", shape: "tall", ...video("YyCDBgLsCGI", true) },

  /* ==================================================== ai animation */
  { id: "a-ksy-41", craft: "ai-animation", group: "Kharag Singh Yudh · Bhujangyy", title: "Part 41 · Rudrastra", note: "AI cinematic reel", kind: "video", shape: "tall", ...reel("De2-7D0BEHB") },
  { id: "a-ksy-40", craft: "ai-animation", group: "Kharag Singh Yudh · Bhujangyy", title: "Part 40 · Kuber's army", note: "AI cinematic reel", kind: "video", shape: "tall", ...reel("Dewq-vvTCi8") },
  { id: "a-ksy-all", craft: "ai-animation", group: "Kharag Singh Yudh · Bhujangyy", title: "All 41 parts", note: "The full series on @bhujangyy", kind: "link", shape: "tall", cover: "", href: "https://www.instagram.com/bhujangyy/" },

  /* ============================================================= web */
  { id: "w-vectoristory", craft: "web", group: "Concept websites", title: "Vectoristory", note: "Cinematic channel site", kind: "link", shape: "wide", cover: "https://i.ytimg.com/vi/FQ76hjBlx78/hqdefault.jpg", href: asset("/lab/vectoristory/") },
  { id: "w-bhujangyy", craft: "web", group: "Concept websites", title: "Bhujangyy", note: "Brand site in Gurmukhi", kind: "link", shape: "wide", cover: "", href: asset("/lab/bhujangyy/") },
  { id: "w-rahgir", craft: "web", group: "Concept websites", title: "Rahgir", note: "Interactive travel landing", kind: "link", shape: "wide", cover: "", href: asset("/lab/rahgir/") },
  { id: "w-portfolio", craft: "web", group: "Websites", title: "This portfolio", note: "Next.js · TypeScript · Tailwind", kind: "link", shape: "wide", cover: "", href: "https://meharwansingh1.github.io/portfolioo/" },
  { id: "w-travel", craft: "web", group: "Websites", title: "My Travel Vlogs", note: "HTML · CSS · JavaScript", kind: "link", shape: "wide", cover: "", href: asset("/lab/my-travel-vlogs/") },
]

/** older links on the site used these names; they now open the matching craft */
export const legacyHash: Record<string, CraftId> = {
  bhujangyy: "ai-animation",
  "kharag-singh-yudh": "ai-animation",
  "dussehra-mahatam": "video-editing",
  "musafir-podcast": "video-editing",
  "booking-junction": "video-editing",
  vectoristory: "motion-animation",
}
