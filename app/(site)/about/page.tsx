import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { HorizontalTimeline, ScrollWords } from "@/components/fx/pinned"
import { Identity } from "@/components/site/identity"
import { timeline } from "@/lib/data"

export const metadata: Metadata = { title: "About" }

const values = [
  { k: "Craft", v: "Every project gets unwavering dedication, however small the brief." },
  { k: "Curiosity", v: "Continuous learning is the job, not a side task." },
  { k: "Range", v: "Code, design and motion feed each other. I keep all three sharp." },
  { k: "Story", v: "Whether it is a page or a reel, it should make someone want the next frame." },
]

export default function AboutPage() {
  return (
    <div className="page-in">
      <PageHeader index="02" eyebrow="Get to know more" title="About me" intro="History by degree. Storytelling by craft." />

      {/* story: the page locks while the statement writes itself in */}
      <ScrollWords
        eyebrow="Keep scrolling"
        text="I studied *history.* Now I bring stories back to life — in thumbnails, edits, motion and code. Every story deserves to be *told well,* however small the brief."
      />

      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-12 sm:px-6">
        <Reveal className="grid gap-8 text-lg leading-relaxed text-muted-foreground md:grid-cols-3">
          <p>
            A degree in History from the University of Delhi taught me that every story deserves to be told well. Design, video editing and animation
            are how I do it.
          </p>
          <p>
            Since 2024 I&apos;ve designed for Musafir Media Publications in New Delhi, rising from Graphic &amp; Web Designer to Head Designer and then
            Production Head, and running The Musafir Podcast&apos;s YouTube channel end to end. I also design for Booking Junction, a B2B travel company.
          </p>
          <p>
            Alongside that I create for two own brands: Bhujangyy, for cinematic Sikh storytelling, and Vectoristory, where ancient sacred stories are
            animated in vector motion. My professional work began with Giani Birbal Singh Ji, and we still create together.
          </p>
        </Reveal>
      </section>

      <Identity />

      {/* timeline: scrolling down slides the career sideways */}
      <section id="timeline" className="scroll-mt-0">
        <HorizontalTimeline
          items={timeline}
          title={
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-accent">Experience</span> — newest first
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-6xl">The path so far</h2>
            </div>
          }
        />
      </section>

      {/* values */}
      <section id="values" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.k} delay={i * 80} className="group rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-foreground/30">
              <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-6 font-display text-4xl transition group-hover:text-accent">{v.k}</h3>
              <p className="mt-3 text-muted-foreground">{v.v}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex justify-center">
          <Link href="/work" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background">
            Now see the work <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
