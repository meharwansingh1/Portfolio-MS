import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { ProjectFolder } from "@/components/site/project-folder"
import { projects } from "@/lib/data"

export const metadata: Metadata = { title: "Work" }

export default function WorkPage() {
  return (
    <div className="page-in">
      <PageHeader index="04" eyebrow="Browse my recent" title="Work" intro="Websites, graphics and motion series. Each folder holds a project — open it up." />

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
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition hover:gap-3 " +
                        (li === 0 ? "bg-foreground text-background" : "border border-border hover:border-foreground")
                      }
                    >
                      {l.label} <ArrowUpRight className="size-4" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Ongoing · links coming soon</p>
              )}
            </Reveal>
          </article>
        ))}
      </div>
    </div>
  )
}
