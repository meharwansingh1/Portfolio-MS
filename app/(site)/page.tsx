import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { site } from "@/lib/data"
import { Signature } from "@/components/site/signature"
import { Intro } from "@/components/fx/intro"
import { HeroGallery } from "@/components/fx/hero-gallery"
import { CraftPanels } from "@/components/fx/craft-panels"


export default function Home() {
  return (
    <>
      <Intro />

      <HeroGallery />

      {/* ---------- crafts: panels that open under the cursor ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 md:pt-36">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-accent">01</span> — What I do
            </p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-none sm:text-6xl">
              Five crafts, <span className="text-muted-foreground">one storyteller.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">Hover a panel to open it. Click to see that work in the showcase.</p>
        </div>
        <CraftPanels />
      </section>

      {/* ---------- closing card ---------- */}
      <section className="px-3 pt-28 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0b0b0b] text-[#f3f0ea] shadow-[0_0_90px_-30px_#e2381b] ring-1 ring-[#e2381b]/60">
          <div aria-hidden="true" className="absolute top-0 left-1/2 h-7 w-52 -translate-x-1/2 rounded-b-[1.4rem] bg-background" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(226,56,27,.3),transparent_70%)]" />
          <div className="relative grid gap-10 px-6 pt-20 sm:px-10 md:grid-cols-[1fr_2fr_1fr] md:items-center">
            <nav aria-label="Pages" className="order-2 md:order-1">
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">Pages</p>
              <ul className="mt-3 space-y-1 font-display text-2xl font-bold uppercase">
                {[["/about", "About"], ["/work", "Work"], ["/showcase", "Showcase"], ["/skills", "Skills"], ["/contact", "Contact"]].map(([h, l]) => (
                  <li key={h}>
                    <Link href={h} className="transition hover:text-[#e2381b]">{l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="relative order-1 text-center md:order-2">
              <p className="font-display text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-7xl">
                Always telling
                <br />
                <span className="text-[#e2381b]">the story.</span>
              </p>
              <span className="pointer-events-none mt-1 block text-5xl text-white/90 sm:text-6xl">
                <Signature className="-rotate-[10deg] [&_.signature-stroke]:text-[#e2381b]" />
              </span>
            </div>
            <nav aria-label="Elsewhere" className="order-3 md:text-right">
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">Follow</p>
              <ul className="mt-3 space-y-1 font-display text-2xl font-bold uppercase">
                {[[site.linkedin, "LinkedIn"], [site.behance, "Behance"], ["https://www.instagram.com/bhujangyy/", "Instagram"], ["https://www.youtube.com/@vectoristory", "YouTube"]].map(([h, l]) => (
                  <li key={h}>
                    <a href={h} target="_blank" rel="noreferrer" className="transition hover:text-[#e2381b]">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Link href="/contact" className="relative mx-auto mt-12 mb-10 flex w-fit items-center gap-2 rounded-full bg-[#e2381b] px-6 py-3 text-sm font-medium text-white shadow-xl transition hover:gap-3">
            Hire me <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
