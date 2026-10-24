import type { Metadata } from "next"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { Showcase } from "@/components/site/showcase"
import { compact, pieces, totalViews } from "@/lib/showcase"

export const metadata: Metadata = { title: "Showcase" }

export default function ShowcasePage() {
  const stats = [
    { n: compact(totalViews) + "+", l: "plays and views" },
    { n: String(pieces.length), l: "published pieces" },
    { n: "3", l: "channels: Bhujangyy, Vectoristory, web" },
  ]
  return (
    <div className="page-in">
      <PageHeader
        index="05"
        eyebrow="Everything I've published"
        title="Showcase"
        intro="Reels, long videos and websites — tap any piece to play it right here."
      />
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80} className="bg-background p-7">
              <p className="font-display text-5xl">{s.n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Showcase />
    </div>
  )
}
