import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { ProjectFolder } from "@/components/site/project-folder"
import { SmartLink } from "@/components/site/smart-link"
import { earlyWork, projects } from "@/lib/data"

export const metadata: Metadata = { title: "Work" }

export default function WorkPage() {
  return (
    <div className="page-in">
      <PageHeader index="04" eyebrow="Browse my recent" title="Work" intro="My brand, the companies I design for, my collaborations and my motion series — with where it all started at the end." />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {projects.map((p, i) => (
          <article key={p.slug} id={p.slug} className="group grid grid-cols-1 scroll-mt-28 items-center gap-10 border-t border-border py-16 md:grid-cols-2 md:gap-16">
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <ProjectFolder project={p} index={i} />
            </Reveal>
            <Reveal delay={120}>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                {p.kind} · {p.year}
              </div>
              <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">{p.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">{p.summary}</p>
              {p.highlights ? (
                <ul className="mt-6 max-w-md space-y-2.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-border px-3 py-1 text-xs">
                    {t}
                  </li>
                ))}
              </ul>
              {p.links.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {p.links.map((l, li) => (
                    <SmartLink
                      key={l.href}
                      href={l.href}
                      className={
                        "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition hover:gap-3 " +
                        (li === 0 ? "bg-foreground text-background" : "border border-border hover:border-foreground")
                      }
                    >
                      {l.label} <ArrowUpRight className="size-4" />
                    </SmartLink>
                  ))}
                </div>
              ) : (
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Ongoing · links coming soon</p>
              )}
            </Reveal>
          </article>
        ))}
      </div>

      {/* where it started */}
      <section id="early" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-12 sm:px-6">
        <Reveal className="border-t border-border pt-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-accent">00</span> — Where it started
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">My starting work</h2>
          <p className="mt-3 max-w-md text-muted-foreground">The first pieces I put out on Behance, before the brand and the series.</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {earlyWork.map((w, i) => (
            <Reveal key={w.title} delay={i * 80} className="flex flex-col rounded-3xl border border-border bg-card p-8">
              <h3 className="font-display text-2xl">{w.title}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{w.text}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                {w.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
                    {l.label} <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
