import type { Metadata } from "next"
import { ArrowUpRight, BriefcaseBusiness, Mail, Palette } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/site/reveal"
import { ContactForm } from "@/components/site/contact-form"
import { site } from "@/lib/data"

export const metadata: Metadata = { title: "Contact" }

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: "mailto:" + site.email },
  { icon: BriefcaseBusiness, label: "LinkedIn", value: "meharwan-singh", href: site.linkedin },
  { icon: Palette, label: "Behance", value: "meharramgarh1a", href: site.behance },
]

export default function ContactPage() {
  return (
    <div className="page-in">
      <PageHeader index="05" eyebrow="Get in touch" title="Let's talk" intro="A role, a project or just a hello — my inbox is open." />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-8 sm:px-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-5 rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-foreground/30"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-accent group-hover:text-white">
                  <c.icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.label}</span>
                  <span className="mt-1 block truncate text-lg">{c.value}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
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
