import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react"
import { site, projects } from "@/lib/data"
import { Reveal, RiseText } from "@/components/site/reveal"
import { HomeFolders } from "@/components/site/home-folders"
import { Signature } from "@/components/site/signature"
import { AvailabilityBadge, UntilNoticeEnds } from "@/components/site/availability"
import { HeroEditor } from "@/components/site/hero-editor"
import { RotatingWord } from "@/components/site/rotating-word"

const now = [
  { label: "Building Bhujangyy", note: "own brand", href: "/work/#bhujangyy" },
  { label: "Designing for Booking Junction", note: "freelance", href: "/work/#booking-junction" },
  { label: "Production Head, Musafir Media", note: "until 10 Nov", href: "/work/#musafir-podcast", endsWithNotice: true },
  { label: "Animating Vectoristory", note: "daily stories", href: "/work/#vectoristory" },
]

export default function Home() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_60%_40%,#000,transparent)]" />
        <div aria-hidden="true" className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-accent/20 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-32 pb-20 sm:px-6 md:pt-40 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <AvailabilityBadge short className="page-in" />
            <h1 className="mt-6 font-display text-[17vw] leading-[0.88] tracking-tight sm:text-[7.5rem] lg:text-[6.4rem] xl:text-[7.4rem]">
              <RiseText text="Meharwan" className="block whitespace-nowrap" delay={100} />
              <RiseText text="Singh." className="block whitespace-nowrap text-accent" delay={450} />
            </h1>
            <p className="page-in mt-8 font-display text-2xl leading-snug sm:text-3xl [animation-delay:.6s]">
              Visual storyteller. <span className="text-muted-foreground">I tell stories in</span> <RotatingWord words={["thumbnails.", "edits.", "motion.", "AI animation.", "code."]} />
            </p>
            <p className="page-in mt-5 max-w-md text-lg leading-relaxed text-muted-foreground [animation-delay:.75s]">
              Graphic design, video editing, motion and AI animation aren&apos;t four jobs — they&apos;re one craft: taking a story from the first frame
              to the final upload.
            </p>
            <div className="page-in mt-9 flex flex-wrap gap-3 [animation-delay:.9s]">
              <Link href="/showcase" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:gap-3">
                Watch the work <ArrowDownRight className="size-4 transition group-hover:-rotate-45" />
              </Link>
              <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition hover:border-foreground">
                <Download className="size-4" /> Download CV
              </a>
            </div>
          </div>

          <div className="page-in [animation-delay:.35s]">
            <HeroEditor />
          </div>
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
