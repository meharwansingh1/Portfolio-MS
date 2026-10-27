import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react"
import { site, projects } from "@/lib/data"
import { Reveal } from "@/components/site/reveal"
import { CountUp, ProjectIndex } from "@/components/fx/project-index"
import { Signature } from "@/components/site/signature"
import { AvailabilityBadge, UntilNoticeEnds } from "@/components/site/availability"
import { ProximityName } from "@/components/site/proximity-name"
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
        <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />
        <div aria-hidden="true" className="absolute top-10 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[150px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-36 pb-16 text-center sm:px-6 md:pt-44">
          <AvailabilityBadge short className="page-in" />

          <div className="relative mt-8">
            <ProximityName
              className="text-[18vw] leading-[0.86] tracking-[-0.05em] md:text-[13.5vw] xl:text-[12.5rem]"
              lines={[{ text: "Meharwan" }, { text: "Singh.", className: "text-accent" }]}
            />
            {/* signed, like a poster: under the name on phones, tucked at its lower right on bigger screens */}
            <span className="page-in mt-2 block text-[13vw] text-foreground [animation-delay:1.1s] md:absolute md:-right-10 md:-bottom-[1.05em] md:mt-0 md:text-[5vw] xl:text-[4.4rem]">
              <Signature className="-rotate-[5deg] [&_.signature-stroke]:text-accent" />
            </span>
          </div>

          <p className="page-in mt-10 font-display text-2xl md:mt-28 leading-snug sm:text-4xl [animation-delay:.6s]">
            Visual storyteller. <span className="text-muted-foreground">I tell stories in</span>{" "}
            <RotatingWord words={["thumbnails.", "edits.", "motion.", "AI animation.", "code."]} />
          </p>
          <p className="page-in mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground [animation-delay:.75s]">
            Graphic design, video editing, motion and AI animation aren&apos;t four jobs — they&apos;re one craft: taking a story from the first frame to
            the final upload.
          </p>
          <div className="page-in mt-10 flex flex-wrap justify-center gap-3 [animation-delay:.9s]">
            <Link href="/showcase" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:gap-3">
              Watch the work <ArrowDownRight className="size-4 transition group-hover:-rotate-45" />
            </Link>
            <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium transition hover:border-foreground">
              <Download className="size-4" /> Download CV
            </a>
          </div>
          <p className="page-in mt-14 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 md:block [animation-delay:1.4s]">
            Move your cursor over my name
          </p>
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
