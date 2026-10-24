import type { Metadata } from "next"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { SkillFolder } from "@/components/site/skill-folder"
import { skillGroups } from "@/lib/data"

export const metadata: Metadata = { title: "Skills" }

export default function SkillsPage() {
  return (
    <div className="page-in">
      <PageHeader index="03" eyebrow="Explore my" title="Skills" intro="Three toolkits that keep borrowing from each other: building, designing and moving." />

      <div className="mx-auto max-w-6xl space-y-28 px-4 py-12 sm:px-6">
        {skillGroups.map((g, gi) => (
          <section key={g.id} id={g.id} className="grid grid-cols-1 scroll-mt-28 items-center gap-12 md:grid-cols-[1fr_1.25fr]">
            <Reveal className={gi % 2 ? "md:order-2" : ""}>
              <SkillFolder group={g} index={gi} />
            </Reveal>
            <div>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">0{gi + 1}</p>
                <h2 className="mt-3 font-display text-6xl italic sm:text-7xl">{g.title}</h2>
                <p className="mt-3 text-muted-foreground">{g.blurb}</p>
              </Reveal>
              <ul className="mt-10 divide-y divide-border border-y border-border">
                {g.skills.map((s, i) => (
                  <Reveal as="li" key={s.name} delay={i * 60} className="group py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl font-medium tracking-tight transition group-hover:translate-x-1">{s.name}</h3>
                      <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full origin-left rounded-full bg-foreground transition-all duration-700 group-hover:bg-accent" style={{ width: s.level + "%" }} />
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
