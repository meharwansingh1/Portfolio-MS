import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react"
import { site, projects } from "@/lib/data"
import { Reveal } from "@/components/site/reveal"
import { CountUp, ProjectIndex } from "@/components/fx/project-index"
import { Signature } from "@/components/site/signature"
import { AvailabilityBadge, UntilNoticeEnds } from "@/components/site/availability"
import { ProximityName } from "@/components/site/proximity-name"
import { RotatingWord } from "@/components/site/rotating-word"
import { Intro } from "@/components/fx/intro"
import { ParticlePortrait } from "@/components/fx/particle-portrait"

const now = [
  { label: "Building Bhujangyy", note: "own brand", href: "/work/#bhujangyy" },
  { label: "Designing for Booking Junction", note: "freelance", href: "/work/#booking-junction" },
  { label: "Production Head, Musafir Media", note: "until 10 Nov", href: "/work/#musafir-podcast", endsWithNotice: true },
  { label: "Animating Vectoristory", note: "daily stories", href: "/work/#vectoristory" },
]

export default function Home() {
  return (
    <>
      <Intro />

      {/* ---------- cover: the portrait in particles, behind the title ---------- */}
      <section data-cover className="relative h-svh min-h-[600px] overflow-hidden bg-[#05070d] text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_42%,rgba(91,124,255,.14),transparent_70%)]" />
        <ParticlePortrait className="absolute inset-0 size-full" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05070d] to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 md:pb-14">
          <h1 id="hero-title" className="hero-word chrome text-center">
            <span className="sr-only">Meharwan Singh — </span>PORTFOLIO
          </h1>
          <div className="mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-xl leading-snug sm:text-2xl">
              <span className="font-semibold">Meharwan Singh</span> <span className="text-white/50">—</span> Graphic Designer &amp;{" "}
              <span className="font-display text-[#8fa6ff] italic">Video Editor</span>
            </p>
            <div className="flex items-center gap-3">
              <a href="#hello" aria-label="Scroll down" className="grid size-11 place-items-center rounded-full border border-white/20 transition hover:border-white/60">
                <ArrowDownRight className="size-4" />
              </a>
              <Link href="/contact" className="rounded-full border border-white/20 px-6 py-2.5 text-sm transition hover:border-white/60 hover:bg-white hover:text-[#05070d]">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <p className="absolute top-1/2 right-4 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase md:block">Scroll to scatter</p>
      </section>

      {/* ---------- hello ---------- */}
      <section id="hello" className="relative scroll-mt-0 overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />
        <div aria-hidden="true" className="absolute top-10 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[150px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-28 pb-16 text-center sm:px-6 md:pt-36">
          <AvailabilityBadge short />

          <div className="relative mt-8">
            <ProximityName
              className="text-[18vw] leading-[0.86] tracking-[-0.05em] md:text-[13.5vw] xl:text-[12.5rem]"
              lines={[{ text: "Meharwan" }, { text: "Singh.", className: "text-accent" }]}
            />
            <span className="mt-2 block text-[13vw] text-foreground md:absolute md:-right-10 md:-bottom-[1.05em] md:mt-0 md:text-[5vw] xl:text-[4.4rem]">
              <Signature className="-rotate-[5deg] [&_.signature-stroke]:text-accent" />
            </span>
          </div>

          <p className="mt-10 font-display text-2xl leading-snug sm:text-4xl md:mt-28">
            Visual storyteller. <span className="text-muted-foreground">I tell stories in</span>{" "}
            <RotatingWord words={["thumbnails.", "edits.", "motion.", "AI animation.", "code."]} />
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Graphic design, video editing, motion and AI animation aren&apos;t four jobs — they&apos;re one craft: taking a story from the first frame to
            the final upload.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/showcase" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:gap-3">
              Watch the work <ArrowDownRight className="size-4 transition group-hover:-rotate-45" />
            </Link>
            <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium transition hover:border-foreground">
              <Download className="size-4" /> Download CV
            </a>
          </div>
          <p className="mt-14 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 md:block">Move your cursor over my name</p>
        </div>

        {/* right now */}
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            {now.map((n) => {
              const cell = (
                <Link key={n.label} href={n.href} className="group flex flex-col gap-1 border-b border-border p-5 transition hover:bg-card sm:border-r lg:border-b-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Right now · {n.note}</span>
                  <span className="flex items-center justify-between gap-2 font-medium">
                    {n.label} <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:text-accent" />
                  </span>
                </Link>
              )
              return "endsWithNotice" in n ? <UntilNoticeEnds key={n.label}>{cell}</UntilNoticeEnds> : cell
            })}
          </div>
        </div>
      </section>

      {/* ---------- the index ---------- */}
      <section className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-accent">01</span> — The index
            </p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-none sm:text-6xl">
              Selected work, <span className="text-muted-foreground">one line each.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">Run your cursor down the list — a preview follows it. Click any line to open the project.</p>
        </Reveal>
        <ProjectIndex />
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
              <CountUp value={n} className="block font-display text-5xl" />
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
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] opacity-60">Who&apos;s behind this?</p>
            <p className="relative mt-6 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
              A <span className="text-accent">history graduate</span> who brings stories back to life, frame by frame.
            </p>
            <span className="relative mt-8 block text-6xl text-background sm:text-7xl">
              <Signature className="[&_.signature-stroke]:text-accent" />
            </span>
            <span className="relative mt-8 inline-flex items-center gap-2 text-sm">
              Read my story <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  )
}
