import type { Metadata } from "next"
import { ArrowUpRight, BriefcaseBusiness, FileText, Mail, Palette } from "lucide-react"
import { Reveal } from "@/components/site/reveal"
import { ContactForm } from "@/components/site/contact-form"
import { AvailabilityBadge } from "@/components/site/availability"
import { DotField, LocalClock, Magnetic, ScrambleText } from "@/components/fx/contact-fx"
import { site } from "@/lib/data"

export const metadata: Metadata = { title: "Contact" }

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: "mailto:" + site.email },
  { icon: BriefcaseBusiness, label: "LinkedIn", value: "meharwan-singh", href: site.linkedin },
  { icon: Palette, label: "Behance", value: "MeharwanSinghh", href: site.behance },
  { icon: FileText, label: "CV", value: "Download as PDF", href: site.cv },
]

export default function ContactPage() {
  return (
    <div className="page-in">
      {/* ---------- header over a field of dots that part around the cursor ---------- */}
      <section className="relative overflow-hidden">
        <DotField className="absolute inset-0 [mask-image:radial-gradient(75%_70%_at_50%_45%,#000,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-36 pb-16 sm:px-6 sm:pt-44">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <span className="text-accent">06</span>
            <span className="h-px w-10 bg-border" />
            Get in touch
          </div>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight sm:text-8xl md:text-9xl">
            <ScrambleText text="Let's talk" />
          </h1>
          <p className="page-in mt-8 max-w-xl text-lg text-muted-foreground [animation-delay:.4s]">A remote role, a freelance project or just a hello — my inbox is open.</p>
          <div className="page-in mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between [animation-delay:.55s]">
            <LocalClock />
            <AvailabilityBadge className="w-fit rounded-full border border-border bg-background/70 px-4 py-2.5 backdrop-blur" />
          </div>
        </div>
      </section>

      {/* ---------- the big hello ---------- */}
      <section className="mx-auto flex max-w-6xl justify-center px-4 pb-20 sm:px-6">
        <Magnetic strength={0.35}>
          <a
            href={"mailto:" + site.email}
            className="group relative grid size-56 place-items-center overflow-hidden rounded-full bg-foreground text-center text-background sm:size-64"
          >
            <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-y-0" />
            <span className="relative">
              <span className="block font-display text-4xl">Say hello</span>
              <span className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.2em] uppercase opacity-70">
                Write an email <ArrowUpRight className="size-3.5" />
              </span>
            </span>
          </a>
        </Magnetic>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-8 sm:px-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <Magnetic strength={0.08}>
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-5 rounded-3xl border border-border bg-card p-6 transition hover:border-foreground/30"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground text-background transition group-hover:rotate-[-8deg] group-hover:bg-accent group-hover:text-accent-foreground">
                    <c.icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.label}</span>
                    <span className="mt-1 block truncate text-lg">{c.value}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  )
}
