import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { SmartLink } from "@/components/site/smart-link"
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

      {/* story */}
      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6">
        <Reveal className="max-w-4xl">
          <p className="font-display text-3xl leading-snug sm:text-4xl">
            I studied <span className="text-accent">history</span>. Now I bring stories back to life — in thumbnails, edits, motion and code.
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              A degree in History from the University of Delhi taught me that every story deserves to be told well. Design, video editing and animation
              are how I do it, and I bring the same dedication to every brief, however small.
            </p>
            <p>
              Since 2024 I&apos;ve designed for Musafir Media Publications in New Delhi, rising from Graphic &amp; Web Designer to Head Designer and then
              Production Head, and running The Musafir Podcast&apos;s YouTube channel end to end. I also design for Booking Junction, a B2B travel company.
            </p>
            <p>
              Alongside that I create for two own brands: Bhujangyy, for cinematic Sikh storytelling, and Vectoristory, where ancient sacred stories are
              animated in vector motion. My professional work began with Giani Birbal Singh Ji, and we still create together.
            </p>
          </div>
        </Reveal>
      </section>

      <Identity />

      {/* timeline */}
      <section id="timeline" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-accent">Experience</span> — newest first
            </p>
            <h2 className="mt-4 font-display text-5xl sm:text-6xl">The path so far</h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">Every role links to the work it produced.</p>
        </Reveal>
        <ol className="relative mt-14">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-accent via-border to-transparent md:left-[calc(30%+7px)]" />
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.org} delay={i * 80} className="group relative grid gap-4 pb-14 pl-10 last:pb-0 md:grid-cols-[30%_1fr] md:gap-0 md:pl-0">
              <div className="md:pr-12 md:text-right">
                <span
                  className={
                    "inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] " +
                    (t.kind === "Own brand" ? "bg-accent text-white" : t.kind === "Education" ? "border border-border text-muted-foreground" : "bg-foreground text-background")
                  }
                >
                  {t.kind}
                </span>
                <ul className="mt-3 space-y-2">
                  {t.roles.map((r) => (
                    <li key={r.title}>
                      <p className="text-lg leading-snug font-medium">{r.title}</p>
                      <p className="font-mono text-xs text-accent">{r.when}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="absolute top-1.5 left-0 size-[15px] rounded-full border-[3px] border-background bg-foreground ring-1 ring-border transition duration-500 group-hover:scale-125 group-hover:bg-accent md:left-[30%]" />
              <SmartLink
                href={t.href}
                className="block rounded-3xl border border-transparent transition duration-500 hover:border-border hover:bg-card md:ml-10 md:-mt-5 md:p-5"
              >
                <h3 className="font-display text-3xl sm:text-4xl">{t.org}</h3>
                {t.place ? <p className="mt-1 text-sm text-muted-foreground">{t.place}</p> : null}
                <p className="mt-3 max-w-xl text-muted-foreground">{t.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {t.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition group-hover:text-foreground">
                  See the work <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </SmartLink>
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
