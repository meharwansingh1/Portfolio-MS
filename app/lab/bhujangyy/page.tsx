import type { Metadata } from "next"
import "@fontsource/noto-serif-gurmukhi/400.css"
import "@fontsource/noto-serif-gurmukhi/700.css"
import { ArrowUpRight } from "lucide-react"
import { LabBar, LabFooterNote } from "@/components/lab/lab-bar"
import { MahatamDays, type Day } from "@/components/lab/mahatam-days"
import { Reveal } from "@/components/site/reveal"
import { asset } from "@/lib/data"

export const metadata: Metadata = {
  title: "Bhujangyy — concept website",
  description: "A concept website for Bhujangyy: cinematic Sikh storytelling.",
}

const gurmukhi = { fontFamily: '"Noto Serif Gurmukhi", serif' }
const reel = (code: string) => `https://www.instagram.com/reel/${code}/`
const cover = (code: string) => asset(`/work/${code}.jpg`)
const insta = "https://www.instagram.com/bhujangyy/"

const parts = [
  { code: "De2-7D0BEHB", part: "Part 41", line: "Krishna looses the Rudrastra into the sky." },
  { code: "Dewq-vvTCi8", part: "Part 40", line: "Kuber's whole army takes the field." },
]

const days: Day[] = [
  { day: "Day 2", title: "Why does Bachitar Natak open by saluting the Khadag?", code: "DeYDq3bhMoB" },
  { day: "Day 3", title: "Why is Chandi di Vaar read on Dussehra?", code: "DeaodhGhEDp" },
  { day: "Day 4", title: "Is Raktbeej still alive today?", code: "DedNQc0hi_6" },
  { day: "Day 5", title: "How does a defeated mind become king again?", code: "DegdzaezHzb" },
  { day: "Day 6", title: "Which war, once won, brings true peace?", code: "DeiW1j6B7qq" },
  { day: "Day 7", title: "Why did Guru Sahib write the stories of the avatars?", code: "Dek7oxtBzZx" },
  { day: "Day 8", title: "Are shastars only iron — or something more?", code: "DengdDrhElE" },
  { day: "Day 9", title: "Which Ravan really dies on Dussehra?", code: "DeqFOaaB7zp" },
  { day: "Day 10", title: "Bhog: the essence of ten days of vichaar.", code: "DesAiuEzkA_" },
].map((d) => ({ day: d.day, title: d.title, cover: cover(d.code), href: reel(d.code) }))

/** two silver rings, like the chakkars on a dumalla */
function Chakkar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 6" />
      <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function BhujangyyConcept() {
  return (
    <div className="min-h-screen bg-[#050a1a] text-white">
      <LabBar />

      {/* ---------- hero ---------- */}
      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_20%,#1f3bb366,transparent_60%),radial-gradient(60%_50%_at_10%_90%,#0e1a4a,transparent_70%)]" />
        <Chakkar className="absolute -top-24 -right-24 size-[34rem] animate-[spin_90s_linear_infinite] text-[#cfd6e4]/15" />
        <Chakkar className="absolute -bottom-40 -left-32 size-[26rem] animate-[spin_120s_linear_infinite_reverse] text-[#cfd6e4]/10" />

        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <span className="text-xl font-semibold tracking-[0.3em] uppercase">Bhujangyy</span>
          <div className="flex items-center gap-6 text-sm text-white/65">
            <a href="#series" className="hidden transition hover:text-white sm:inline">Series</a>
            <a href="#mahatam" className="hidden transition hover:text-white sm:inline">Dussehra Mahatam</a>
            <a href={insta} target="_blank" rel="noreferrer" className="rounded-full bg-[#cfd6e4] px-4 py-2 font-medium text-[#050a1a] transition hover:bg-white">
              Follow
            </a>
          </div>
        </nav>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-12 pb-24 sm:px-8 md:grid-cols-[1.2fr_1fr] md:pt-20 md:pb-32">
          <div>
            <p className="page-in font-mono text-xs tracking-[0.35em] text-[#8fb3ff] uppercase">Cinematic Sikh storytelling</p>
            <h1 className="page-in mt-6 text-6xl leading-[1.15] font-bold sm:text-8xl [animation-delay:.15s]" style={gurmukhi}>
              ਖੜਗ ਸਿੰਘ
              <br />
              <span className="bg-gradient-to-r from-[#cfd6e4] via-white to-[#8fb3ff] bg-clip-text text-transparent">ਯੁੱਧ</span>
            </h1>
            <p className="page-in mt-6 max-w-md text-lg leading-relaxed text-white/70 [animation-delay:.3s]">
              The war of Kharag Singh from the Dasam Granth, told scene by scene in cinematic reels — with Giani Sher Singh Ji&apos;s katha as the voice.
            </p>
            <div className="page-in mt-9 flex flex-wrap gap-3 [animation-delay:.45s]">
              <a href="#series" className="rounded-full bg-[#cfd6e4] px-7 py-3.5 text-sm font-medium text-[#050a1a] transition hover:bg-white">
                Watch the series
              </a>
              <a href={insta} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm transition hover:border-white/60">
                @bhujangyy <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="page-in relative mx-auto w-full max-w-sm [animation-delay:.3s]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover("De2-7D0BEHB")} alt="Kharag Singh Yudh, Part 41" className="relative z-10 aspect-[9/16] w-[78%] rounded-[1.75rem] border border-white/15 object-cover shadow-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover("Dewq-vvTCi8")} alt="" className="absolute top-10 right-0 aspect-[9/16] w-[62%] rotate-6 rounded-[1.5rem] border border-white/10 object-cover opacity-70 shadow-2xl" />
          </div>
        </div>
      </header>

      {/* ---------- series ---------- */}
      <section id="series" className="mx-auto max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-[#8fb3ff] uppercase">The series</p>
            <h2 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">41 parts and counting</h2>
          </div>
          <a href={insta} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-[#cfd6e4]">
            Every part on Instagram <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {parts.map((p, i) => (
            <Reveal key={p.code} delay={i * 100}>
              <a href={reel(p.code)} target="_blank" rel="noreferrer" className="group flex gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/30 hover:bg-white/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover(p.code)} alt="" loading="lazy" className="aspect-[9/16] w-28 shrink-0 rounded-2xl object-cover sm:w-36" />
                <span className="flex flex-col justify-center">
                  <span className="font-mono text-xs tracking-[0.3em] text-[#8fb3ff] uppercase">{p.part}</span>
                  <span className="mt-3 text-2xl leading-snug font-semibold" style={gurmukhi}>
                    ਖੜਗ ਸਿੰਘ ਯੁੱਧ
                  </span>
                  <span className="mt-2 text-white/65">{p.line}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm text-[#cfd6e4] transition group-hover:gap-2">
                    Watch <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- dussehra mahatam ---------- */}
      <section id="mahatam" className="scroll-mt-10 border-y border-white/10 bg-[#081028]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal className="mb-14">
            <p className="font-mono text-xs tracking-[0.3em] text-[#8fb3ff] uppercase">With Giani Birbal Singh Ji</p>
            <h2 className="mt-3 text-5xl font-bold sm:text-6xl" style={gurmukhi}>
              ਦੁਸਹਿਰਾ ਮਹਾਤਮ
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              Ten days of katha and vichaar, one question each day — closing with the bhog samagam at Gurdwara Shahidi Bagh, Sri Anandpur Sahib.
            </p>
          </Reveal>
          <MahatamDays days={days} />
        </div>
      </section>

      {/* ---------- follow ---------- */}
      <section className="relative overflow-hidden px-5 py-28 text-center sm:px-8">
        <Chakkar className="absolute top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 animate-[spin_100s_linear_infinite] text-[#cfd6e4]/10" />
        <Reveal className="relative">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl">Walk with Bhujangyy.</h2>
          <p className="mx-auto mt-5 max-w-md text-white/65">New parts and new katha, on Instagram.</p>
          <a href={insta} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#cfd6e4] px-8 py-4 text-sm font-medium text-[#050a1a] transition hover:bg-white">
            Follow @bhujangyy <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center sm:px-8">
        <LabFooterNote />
      </footer>
    </div>
  )
}
