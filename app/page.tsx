import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react"
import { site, projects } from "@/lib/data"
import { Reveal, RiseText } from "@/components/site/reveal"
import { Portrait } from "@/components/site/portrait"
import { HomeFolders } from "@/components/site/home-folders"

export default function Home() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />
        <div aria-hidden="true" className="absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-36 pb-20 sm:px-6 md:grid-cols-[1.4fr_1fr] md:pt-44">
          <div>
            <p className="page-in flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for remote work
            </p>
            <h1 className="mt-6 font-display text-[15vw] leading-[0.9] tracking-tight sm:text-8xl lg:text-[7.5rem]">
              <RiseText text="Meharwan" className="block whitespace-nowrap" delay={100} />
              <RiseText text="Singh." className="block whitespace-nowrap text-accent" delay={450} />
            </h1>
            <p className="page-in mt-8 max-w-md text-lg leading-relaxed text-muted-foreground [animation-delay:.7s]">
              I build for the web, design what goes on it, and animate the stories in between.
            </p>
            <div className="page-in mt-10 flex flex-wrap gap-3 [animation-delay:.85s]">
              <Link href="/work" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:gap-3">
                See my work <ArrowDownRight className="size-4 transition group-hover:-rotate-45" />
              </Link>
              <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition hover:border-foreground">
                <Download className="size-4" /> Download CV
              </a>
            </div>
          </div>

          <div className="page-in relative mx-auto w-full max-w-sm [animation-delay:.3s]">
            <Portrait src={site.portrait} alt={site.name} className="aspect-[4/5] rounded-[2.5rem] shadow-2xl" />
            {/* rotating badge */}
            <div className="absolute -bottom-8 -left-8 grid size-32 place-items-center rounded-full bg-background shadow-xl">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_18s_linear_infinite]" aria-hidden="true">
                <defs>
                  <path id="badge" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
                </defs>
                <text className="fill-foreground font-mono text-[8px] uppercase">
                  <textPath href="#badge" textLength="222" lengthAdjust="spacingAndGlyphs">Developer · Designer · Storyteller ·</textPath>
                </text>
              </svg>
              <span className="font-display text-3xl">MS</span>
            </div>
          </div>
        </div>

      </section>

      {/* ---------- the folders ---------- */}
      <section className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-accent">01</span> — The desk
            </p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-none sm:text-6xl">
              Everything I make, <span className="text-muted-foreground">filed neatly.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">Hover a folder to lean its glass. Click to open it, then pick a file to jump straight there.</p>
        </Reveal>
        <HomeFolders />
      </section>

      {/* ---------- numbers ---------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {[
            ["3", "disciplines in one pair of hands"],
            [String(projects.length), "featured projects"],
            ["40+", "reels in a single series"],
            ["Daily", "new animated stories"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 80} className="bg-background p-8">
              <p className="font-display text-5xl">{n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- call to action ---------- */}
      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
        <Reveal>
          <Link href="/about" className="group relative block overflow-hidden rounded-[2.5rem] bg-foreground px-8 py-16 text-background sm:px-14 sm:py-24">
            <div aria-hidden="true" className="absolute -right-20 -bottom-24 size-96 rounded-full bg-accent/60 blur-3xl transition duration-700 group-hover:scale-125" />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] opacity-60">Who is behind this?</p>
            <p className="relative mt-6 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
              A fresher with a <span className="text-accent">burning</span> desire to get very, very good at this.
            </p>
            <span className="relative mt-10 inline-flex items-center gap-2 text-sm">
              Read my story <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  )
}
