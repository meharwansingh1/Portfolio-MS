import type { Metadata } from "next"
import { ArrowUpRight, Hand } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { SmartLink } from "@/components/site/smart-link"
import { LevelRing, SkillSphere, Spotlight } from "@/components/fx/skill-sphere"
import { skillGroups } from "@/lib/data"

export const metadata: Metadata = { title: "Skills" }

const dots = ["bg-accent", "bg-foreground", "border border-foreground/40 bg-card"]

export default function SkillsPage() {
  return (
    <div className="page-in">
      <PageHeader index="03" eyebrow="Explore my" title="Skills" intro="Three toolkits that keep borrowing from each other: building, designing and moving." />

      {/* ---------- the sphere ---------- */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-20 sm:px-6 md:grid-cols-[1.3fr_1fr]">
        <SkillSphere groups={skillGroups} />
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
            <Hand className="size-3.5" /> Drag to spin · tap to open
          </p>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            {skillGroups.reduce((n, g) => n + g.skills.length, 0)} tools, <span className="text-muted-foreground">one orbit.</span>
          </h2>
          <ul className="mt-8 space-y-3">
            {skillGroups.map((g, i) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="group flex items-center gap-3 text-lg">
                  <span className={`size-3 rounded-full ${dots[i % 3]}`} />
                  <span className="font-medium">{g.title}</span>
                  <span className="text-sm text-muted-foreground">· {g.skills.length} skills</span>
                  <ArrowUpRight className="size-4 rotate-90 text-muted-foreground transition group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ---------- the toolkits ---------- */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.id} delay={gi * 100} className="h-full">
            <Spotlight className="h-full">
              <div id={g.id} className="relative scroll-mt-28">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">0{gi + 1}</p>
                <h2 className="mt-3 font-display text-5xl">{g.title}</h2>
                <p className="mt-3 text-muted-foreground">{g.blurb}</p>
                <ul className="mt-8 space-y-1">
                  {g.skills.map((s) => (
                    <li key={s.name}>
                      <SmartLink href={s.href} className="group -mx-2 flex items-center gap-4 rounded-2xl p-2 transition hover:bg-muted/60">
                        <LevelRing level={s.level} />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5 font-medium">
                            {s.name}
                            <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition group-hover:text-accent group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 block text-sm text-muted-foreground">{s.note}</span>
                        </span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
