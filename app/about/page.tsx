import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { Portrait } from "@/components/site/portrait"
import { site, timeline } from "@/lib/data"

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
      <PageHeader index="02" eyebrow="Get to know more" title="About me" intro="Developer, designer and storyteller — learning in public, one project at a time." />

      {/* story */}
      <section id="story" className="mx-auto grid max-w-6xl grid-cols-1 scroll-mt-28 gap-12 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <Portrait src={site.aboutPortrait} alt={site.name} className="aspect-[4/5] rounded-[2.5rem]" />
        </Reveal>
        <Reveal delay={120} className="flex flex-col justify-center">
          <p className="font-display text-3xl leading-snug sm:text-4xl">
            I&apos;m thrilled to be on my journey in the creative realms of <span className="italic text-accent">UI/UX design</span>, video editing and
            graphic design.
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m deeply passionate about these fields and have a burning desire to excel in each of them. I tackle every project with dedication and
              enthusiasm, eager to soak up knowledge and grow with every opportunity that comes my way.
            </p>
            <p>
              Alongside frontend work, I run my own storytelling channels — animating ancient sacred stories in vector motion, and producing cinematic
              Sikh content with an original character at its heart.
            </p>
          </div>
        </Reveal>
      </section>

      {/* timeline */}
      <section id="timeline" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6">
        <Reveal>
          <h2 className="font-display text-5xl italic sm:text-6xl">The path so far</h2>
        </Reveal>
        <ol className="mt-14 border-l border-border">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 100} className="group relative pb-14 pl-10 last:pb-0">
              <span className="absolute top-2 -left-[7px] size-3.5 rounded-full border-2 border-background bg-foreground ring-1 ring-border transition group-hover:scale-150 group-hover:bg-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.when}</p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">{t.title}</h3>
              <p className="mt-3 max-w-xl text-muted-foreground">{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* values */}
      <section id="values" className="mx-auto max-w-6xl scroll-mt-28 px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.k} delay={i * 80} className="group rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-foreground/30">
              <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-6 font-display text-4xl italic transition group-hover:text-accent">{v.k}</h3>
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
