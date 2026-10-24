import { asset } from "./data"

/**
 * Everything published, in one list. Covers for Instagram reels live in
 * /public/work (named by the reel's shortcode); YouTube covers come straight
 * from YouTube. To add a piece, add an object here.
 */
export type Channel = "Bhujangyy" | "Vectoristory" | "The Musafir Podcast" | "Booking Junction" | "Web"
export type Format = "Reel" | "Short" | "Long video" | "Podcast" | "Website"

export type Piece = {
  id: string
  title: string
  /** a second line: series, day, part */
  series: string
  channel: Channel
  format: Format
  /** shown as a collaboration badge */
  collab?: string
  cover: string
  /** tall (9:16) or wide (16:9) */
  shape: "tall" | "wide"
  /** where the piece lives */
  href: string
  /** played in place when opened */
  embed?: string
  views?: number
  date: string
}

const ig = (code: string) => ({
  cover: asset(`/work/${code}.jpg`),
  href: `https://www.instagram.com/reel/${code}/`,
  embed: `https://www.instagram.com/reel/${code}/embed/`,
})
const yt = (id: string, short = false) => ({
  cover: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  href: short ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`,
  embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
})

const giani = "with Giani Birbal Singh Ji"

export const pieces: Piece[] = [
  // ---- Bhujangyy: Kharag Singh Yudh
  { id: "ksy-41", title: "Kharag Singh Yudh", series: "Part 41 · Rudrastra", channel: "Bhujangyy", format: "Reel", shape: "tall", views: 14873, date: "2026-10-24", ...ig("De2-7D0BEHB") },
  { id: "ksy-40", title: "Kharag Singh Yudh", series: "Part 40 · Kuber's army", channel: "Bhujangyy", format: "Reel", shape: "tall", views: 29480, date: "2026-10-21", ...ig("Dewq-vvTCi8") },

  // ---- Bhujangyy × Giani Birbal Singh Ji: Dussehra Mahatam
  { id: "dm-shahidi-bagh", title: "Dussehra Mahatam 2026", series: "Gurdwara Shahidi Bagh, Sri Anandpur Sahib", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 21102, date: "2026-10-20", ...ig("DetvuhmTaks") },
  { id: "dm-10", title: "Dussehra Mahatam", series: "Day 10 · Bhog", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 10613, date: "2026-10-19", ...ig("DesAiuEzkA_") },
  { id: "dm-9", title: "Dussehra Mahatam", series: "Day 9", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 30591, date: "2026-10-19", ...ig("DeqFOaaB7zp") },
  { id: "dm-8", title: "Dussehra Mahatam", series: "Day 8", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 12394, date: "2026-10-18", ...ig("DengdDrhElE") },
  { id: "dm-7", title: "Dussehra Mahatam", series: "Day 7", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 10172, date: "2026-10-17", ...ig("Dek7oxtBzZx") },
  { id: "dm-6", title: "Dussehra Mahatam", series: "Day 6", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 7257, date: "2026-10-16", ...ig("DeiW1j6B7qq") },
  { id: "dm-5", title: "Dussehra Mahatam", series: "Day 5", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 10811, date: "2026-10-15", ...ig("DegdzaezHzb") },
  { id: "dm-4", title: "Dussehra Mahatam", series: "Day 4", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 9747, date: "2026-10-14", ...ig("DedNQc0hi_6") },
  { id: "dm-3", title: "Dussehra Mahatam", series: "Day 3", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 11290, date: "2026-10-13", ...ig("DeaodhGhEDp") },
  { id: "dm-2", title: "Dussehra Mahatam", series: "Day 2", channel: "Bhujangyy", format: "Reel", collab: giani, shape: "tall", views: 17758, date: "2026-10-12", ...ig("DeYDq3bhMoB") },

  // ---- Vectoristory: long videos
  { id: "vs-samudra", title: "The Churning of the Ocean of Milk", series: "Samudra Manthan · Full story", channel: "Vectoristory", format: "Long video", shape: "wide", views: 103, date: "2026-10-19", ...yt("FQ76hjBlx78") },
  { id: "vs-mohini", title: "Mohini: How Vishnu Tricked the Demons", series: "Samudra Manthan · Part 2", channel: "Vectoristory", format: "Long video", shape: "wide", views: 8, date: "2026-10-20", ...yt("DDlEpPzR6UY") },

  // ---- Vectoristory: shorts
  { id: "vs-ravan-temple", title: "The temple that opens only when Ravan burns", series: "Untold stories", channel: "Vectoristory", format: "Short", shape: "tall", views: 2366, date: "2026-10-23", ...yt("DkwZ0D6srJY", true) },
  { id: "vs-lakshman", title: "Lakshman never drew the Lakshman Rekha", series: "Untold stories", channel: "Vectoristory", format: "Short", shape: "tall", views: 1823, date: "2026-10-20", ...yt("WJh1PfAsKXc", true) },
  { id: "vs-krishna", title: "One joke destroyed Krishna's dynasty", series: "Untold stories", channel: "Vectoristory", format: "Short", shape: "tall", views: 1310, date: "2026-10-21", ...yt("lga3ndhb4cQ", true) },
  { id: "vs-narasimha", title: "Not by man, not by beast: Narasimha", series: "Untold stories", channel: "Vectoristory", format: "Short", shape: "tall", views: 1229, date: "2026-10-23", ...yt("Ll46kod8Hwg", true) },
  { id: "vs-arjun", title: "The Pandavas sacrificed Arjun's own son", series: "Untold stories", channel: "Vectoristory", format: "Short", shape: "tall", views: 984, date: "2026-10-22", ...yt("kZneCUOoYCM", true) },
  { id: "vs-shiva", title: "Why is Shiva's throat blue?", series: "Samudra Manthan in 60 seconds", channel: "Vectoristory", format: "Short", shape: "tall", views: 259, date: "2026-10-19", ...yt("YyCDBgLsCGI", true) },

  // ---- The Musafir Podcast (Musafir Media): the channel I ran end to end.
  //      The three newest episodes are left out on purpose.
  { id: "tmp-noida-distress", title: "Distress Deals Flooding Noida Real Estate", series: "Unfiltered Truth", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 111683, date: "2026-05-08", ...yt("nSyyCXZpXw4") },
  { id: "tmp-high-rise", title: "The Biggest High-Rise Building Secrets", series: "with Kamal Chandel", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 39846, date: "2025-08-30", ...yt("vaTk8Kx-EJo") },
  { id: "tmp-astrology-ep2", title: "Astrology Is Fake — Episode 2", series: "with Nidan Guru", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 38245, date: "2025-06-28", ...yt("30CFmklHaJE") },
  { id: "tmp-studio-apartment", title: "Studio Apartment Exposed", series: "The biggest real-estate trap of 2026?", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 32648, date: "2026-07-17", ...yt("GFR4KLEh2H4") },
  { id: "tmp-noida-2026", title: "Noida 2026: ₹1 Crore Budget & Resale Deals", series: "Real-estate scams exposed", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 23156, date: "2026-04-24", ...yt("QRtwT-ajv6o") },
  { id: "tmp-ghost-offroading", title: "Ghost of Offroading", series: "with Rajiv Chawla · Episode 1", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 12168, date: "2024-11-08", ...yt("PkQGxPIoazg") },
  { id: "tmp-myths", title: "Real Estate Myths Busted", series: "ft. Saurav Sharma & Vishal Bhargava", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 11833, date: "2025-08-01", ...yt("LofQS-VjP7k") },
  { id: "tmp-manish-dua", title: "The Most Trusted Face in Travel", series: "with Manish Dua", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 7785, date: "2025-08-08", ...yt("0N65UQGRlJ8") },
  { id: "tmp-parenting", title: "Biggest Parenting Mistakes in 2026", series: "with Dr Rajat", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 4459, date: "2026-05-15", ...yt("L8bzLZazqVg") },
  { id: "tmp-boxer", title: "The BrahMos Punch", series: "with boxer Harsh Gill", channel: "The Musafir Podcast", format: "Podcast", shape: "wide", views: 4327, date: "2025-01-17", ...yt("GhsN1THDDxw") },
  { id: "tmp-anthem", title: "TMP Anthem with Raftaar", series: "Channel launch", channel: "The Musafir Podcast", format: "Long video", shape: "wide", views: 994, date: "2024-11-05", ...yt("l8C4EreYkgk") },
  { id: "tmp-teaser", title: "Official Teaser · Episode 1", series: "Ghost of Offroading", channel: "The Musafir Podcast", format: "Long video", shape: "wide", views: 984, date: "2024-11-06", ...yt("iL_4QLKjfpY") },

  // ---- Booking Junction: destination reels for a B2B travel company
  { id: "bj-japan", title: "Discover the Magic of Japan", series: "Destination reel", channel: "Booking Junction", format: "Reel", shape: "tall", views: 250, date: "2026-08-10", ...ig("Db2XXqpuTmJ") },
  { id: "bj-seychelles", title: "Seychelles", series: "Destination reel", channel: "Booking Junction", format: "Reel", shape: "tall", views: 211, date: "2026-07-29", ...ig("DbXe6H0MYMr") },
  { id: "bj-bali", title: "Bali: Island of the Gods", series: "Destination reel", channel: "Booking Junction", format: "Reel", shape: "tall", views: 241, date: "2026-07-25", ...ig("DbNKXuaMsUM") },
  { id: "bj-europe", title: "Unlock Europe", series: "Destination reel", channel: "Booking Junction", format: "Reel", shape: "tall", views: 208, date: "2026-07-18", ...ig("Da7IBY9M6W3") },
  { id: "bj-malaysia", title: "Malaysia Awaits", series: "Destination reel", channel: "Booking Junction", format: "Reel", shape: "tall", views: 204, date: "2026-07-17", ...ig("Da4kXYvs5uV") },
  { id: "bj-dubai", title: "The Best of Dubai", series: "Destination reel", channel: "Booking Junction", format: "Reel", shape: "tall", views: 204, date: "2026-06-26", ...ig("DaCfw-XMJgF") },

  // ---- Web
  { id: "web-portfolio", title: "This portfolio", series: "Next.js · TypeScript · Tailwind", channel: "Web", format: "Website", shape: "wide", date: "2026-10-24", cover: "", href: "https://meharwansingh1.github.io/portfolioo/" },
  { id: "web-travel", title: "My Travel Vlogs", series: "HTML · CSS · JavaScript", channel: "Web", format: "Website", shape: "wide", date: "2023-08-01", cover: "", href: "https://meharwansingh1.github.io/MyTravelVlogs/" },
]

/** The filters at the top of the page; `id` is also the URL hash (#bhujangyy). */
export const filters = [
  { id: "all", label: "Everything", test: () => true },
  { id: "bhujangyy", label: "Bhujangyy", test: (p: Piece) => p.channel === "Bhujangyy" },
  { id: "kharag-singh-yudh", label: "Kharag Singh Yudh", test: (p: Piece) => p.id.startsWith("ksy") },
  { id: "dussehra-mahatam", label: "Dussehra Mahatam", test: (p: Piece) => !!p.collab },
  { id: "musafir-podcast", label: "The Musafir Podcast", test: (p: Piece) => p.channel === "The Musafir Podcast" },
  { id: "booking-junction", label: "Booking Junction", test: (p: Piece) => p.channel === "Booking Junction" },
  { id: "vectoristory", label: "Vectoristory", test: (p: Piece) => p.channel === "Vectoristory" },
  { id: "web", label: "Websites", test: (p: Piece) => p.channel === "Web" },
] as const

export const totalViews = pieces.reduce((n, p) => n + (p.views ?? 0), 0)

export const compact = (n: number) =>
  n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K" : String(n)
