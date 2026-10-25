import type { Metadata } from "next"
import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/cormorant-garamond/500-italic.css"
import { ArrowUpRight, Play } from "lucide-react"
import { LabBar, LabFooterNote } from "@/components/lab/lab-bar"
import { Reveal } from "@/components/site/reveal"
import { StarField } from "@/components/lab/star-field"

export const metadata: Metadata = {
  title: "Vectoristory — concept website",
  description: "A concept website for Vectoristory: ancient stories, retold in vector motion.",
}

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' }
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

const featured = { id: "FQ76hjBlx78", title: "The Churning of the Ocean of Milk", kicker: "Samudra Manthan · The full story", length: "5:43" }

const episodes = [
  { id: "DDlEpPzR6UY", title: "Mohini: How Vishnu Tricked the Demons", tag: "Samudra Manthan · Part 2", short: false },
  { id: "DkwZ0D6srJY", title: "The temple that opens only when Ravan burns", tag: "Untold story", short: true },
  { id: "WJh1PfAsKXc", title: "Lakshman never drew the Lakshman Rekha", tag: "Untold story", short: true },
  { id: "Ll46kod8Hwg", title: "Narasimha: not by man, not by beast", tag: "Untold story", short: true },
  { id: "lga3ndhb4cQ", title: "One joke destroyed Krishna's dynasty", tag: "Untold story", short: true },
  { id: "YyCDBgLsCGI", title: "Why is Shiva's throat blue?", tag: "In 60 seconds", short: true },
]

const process = [
  { n: "I", t: "Find the untold detail", d: "Every story starts with a moment most people have never heard." },
  { n: "II", t: "Draw the world", d: "Characters and settings are built as clean, detailed vectors." },
  { n: "III", t: "Bring it to life", d: "Every scene is animated frame by frame in After Effects." },
  { n: "IV", t: "Give it a voice", d: "Narration leads; music and effects sit gently underneath." },
]

const channel = "https://www.youtube.com/@vectoristory"
const watch = (id: string, short: boolean) => (short ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`)

export default function VectoristoryConcept() {
  return (
    <div className="min-h-screen bg-[#07060f] text-[#f3ecdc]">
      <LabBar />

      {/* ---------- hero ---------- */}
      <header className="relative overflow-hidden">
        <StarField />
        <div aria-hidden="true" className="absolute top-1/3 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#c9a24b33,transparent_65%)]" />
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <span className="text-2xl tracking-[0.25em] uppercase" style={serif}>
            Vectoristory
          </span>
          <div className="flex items-center gap-6 text-sm text-[#f3ecdc]/70">
            <a href="#stories" className="hidden transition hover:text-[#e6c06a] sm:inline">Stories</a>
            <a href="#craft" className="hidden transition hover:text-[#e6c06a] sm:inline">Craft</a>
            <a href={channel} target="_blank" rel="noreferrer" className="rounded-full border border-[#e6c06a]/50 px-4 py-2 text-[#e6c06a] transition hover:bg-[#e6c06a] hover:text-[#07060f]">
              Subscribe
            </a>
          </div>
        </nav>

        <div className="relative mx-auto max-w-5xl px-5 pt-16 pb-28 text-center sm:px-8 sm:pt-24 sm:pb-36">
          <p className="page-in text-xs tracking-[0.4em] text-[#e6c06a] uppercase">A new animated story every day</p>
          <h1 className="page-in mt-6 text-6xl leading-[0.95] font-medium sm:text-8xl lg:text-9xl [animation-delay:.15s]" style={serif}>
            Ancient stories,
            <br />
            <em className="text-[#e6c06a]">retold in motion.</em>
          </h1>
          <p className="page-in mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#f3ecdc]/70 [animation-delay:.3s]">
            Vector-animated retellings of the stories our grandparents told — and the little-known details hidden inside them.
          </p>
          <div className="page-in mt-10 flex flex-wrap justify-center gap-3 [animation-delay:.45s]">
            <a href="#featured" className="inline-flex items-center gap-2 rounded-full bg-[#e6c06a] px-7 py-3.5 text-sm font-medium text-[#07060f] transition hover:gap-3">
              <Play className="size-4 fill-current" /> Watch the latest
            </a>
            <a href="#stories" className="rounded-full border border-[#f3ecdc]/25 px-7 py-3.5 text-sm transition hover:border-[#f3ecdc]/60">
              Browse stories
            </a>
          </div>
        </div>
      </header>

      {/* ---------- featured ---------- */}
      <section id="featured" className="mx-auto max-w-6xl scroll-mt-10 px-5 sm:px-8">
        <Reveal>
          <a href={watch(featured.id, false)} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-[2rem] border border-[#e6c06a]/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(featured.id)} alt="" className="aspect-video w-full object-cover transition duration-1000 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-[#07060f]/30 to-transparent" />
            <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e6c06a] text-[#07060f] shadow-[0_0_60px_#e6c06a80] transition duration-500 group-hover:scale-110">
              <Play className="ml-1 size-7 fill-current" />
            </span>
            <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-10">
              <span>
                <span className="block text-xs tracking-[0.3em] text-[#e6c06a] uppercase">{featured.kicker}</span>
                <span className="mt-2 block text-3xl leading-tight sm:text-5xl" style={serif}>
                  {featured.title}
                </span>
              </span>
              <span className="rounded-full bg-black/50 px-3 py-1 font-mono text-xs backdrop-blur">{featured.length}</span>
            </span>
          </a>
        </Reveal>
      </section>

      {/* ---------- stories ---------- */}
      <section id="stories" className="mx-auto max-w-6xl scroll-mt-10 px-5 py-28 sm:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-5xl sm:text-6xl" style={serif}>
            The stories
          </h2>
          <a href={channel} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-[#e6c06a]">
            All on YouTube <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e, i) => (
            <Reveal key={e.id} delay={i * 70}>
              <a href={watch(e.id, e.short)} target="_blank" rel="noreferrer" className="group block">
                <span className="relative block overflow-hidden rounded-2xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(e.id)} alt="" loading="lazy" className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase backdrop-blur">
                    {e.short ? "Short" : "Episode"}
                  </span>
                </span>
                <span className="mt-4 block text-xs tracking-[0.25em] text-[#e6c06a]/80 uppercase">{e.tag}</span>
                <span className="mt-1 block text-2xl leading-snug transition group-hover:text-[#e6c06a]" style={serif}>
                  {e.title}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- craft ---------- */}
      <section id="craft" className="scroll-mt-10 border-y border-white/10 bg-[#0d0b1a]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal>
            <p className="text-xs tracking-[0.4em] text-[#e6c06a] uppercase">How a story is made</p>
            <h2 className="mt-4 max-w-2xl text-5xl leading-tight sm:text-6xl" style={serif}>
              Four steps from a forgotten verse to a finished film.
            </h2>
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 90} className="bg-[#0d0b1a] p-7">
                <span className="text-4xl text-[#e6c06a]" style={serif}>
                  {p.n}
                </span>
                <h3 className="mt-6 text-2xl" style={serif}>
                  {p.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f3ecdc]/60">{p.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- subscribe ---------- */}
      <section className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8">
        <Reveal>
          <h2 className="text-5xl leading-tight sm:text-7xl" style={serif}>
            One story, <em className="text-[#e6c06a]">every day.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[#f3ecdc]/60">Join the channel and never miss the next one.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={channel} target="_blank" rel="noreferrer" className="rounded-full bg-[#e6c06a] px-7 py-3.5 text-sm font-medium text-[#07060f]">
              Subscribe on YouTube
            </a>
            <a href="https://www.instagram.com/vectoristory/" target="_blank" rel="noreferrer" className="rounded-full border border-[#f3ecdc]/25 px-7 py-3.5 text-sm">
              Follow on Instagram
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center sm:px-8">
        <LabFooterNote />
      </footer>
    </div>
  )
}
