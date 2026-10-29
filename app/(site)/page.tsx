import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react"
import { asset, site } from "@/lib/data"
import { Signature } from "@/components/site/signature"
import { AvailabilityBadge } from "@/components/site/availability"
import { RotatingWord } from "@/components/site/rotating-word"
import { Intro } from "@/components/fx/intro"
import { Hero3D } from "@/components/fx/hero-3d"
import { PixelReveal } from "@/components/fx/home-fx"
import { CraftPanels } from "@/components/fx/craft-panels"


export default function Home() {
  return (
    <>
      <Intro />

      {/* ---------- cover: my 3D bust on a midnight stage ---------- */}
      <section data-cover className="relative h-svh min-h-[640px] overflow-hidden bg-[#0e1116] text-[#f4f1ea]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(42%_48%_at_50%_58%,rgba(242,163,58,.22),transparent_70%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(244,241,234,1)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,234,1)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
        <h1 id="hero-title" className="hero-word chrome absolute top-[15%] left-1/2 w-fit -translate-x-1/2 md:top-[13%]">
          <span className="sr-only">Meharwan Singh — </span>PORTFOLIO
        </h1>
        <Hero3D className="absolute inset-x-0 top-[16%] bottom-0 md:top-[10%]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0e1116] via-[#0e1116]/80 to-transparent md:h-48 md:via-transparent" />

        <AvailabilityBadge short className="absolute top-24 left-[max(1rem,calc((100vw-80rem)/2+1.5rem))] w-fit rounded-full border border-[#f4f1ea]/15 bg-[#0e1116]/60 px-3.5 py-2 text-[#f4f1ea]/80 backdrop-blur md:top-28" />
        <p className="absolute top-1/2 right-4 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-[#f4f1ea]/40 uppercase md:block">He&apos;s watching your cursor</p>

        <div className="absolute inset-x-0 bottom-0 mx-auto grid max-w-7xl gap-5 px-4 pb-7 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:pb-10">
          <div>
            <p className="text-xl leading-snug sm:text-2xl">
              <span className="font-semibold">Meharwan Singh</span> <span className="text-[#f4f1ea]/45">—</span> Graphic Designer &amp;{" "}
              <span className="font-display text-[#f2a33a] italic">Video Editor</span>
            </p>
            <p className="mt-1.5 text-[#f4f1ea]/60 sm:text-lg">
              Visual storyteller. I tell stories in{" "}
              <span className="text-[#f2a33a]">
                <RotatingWord words={["thumbnails.", "edits.", "motion.", "AI animation.", "code."]} />
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/showcase" className="group inline-flex items-center gap-2 rounded-full bg-[#f2a33a] px-5 py-2.5 text-sm font-medium text-[#0e1116] shadow-[0_8px_30px_-8px_rgba(242,163,58,.6)] transition hover:gap-3">
              Watch the work <ArrowDownRight className="size-4 transition group-hover:-rotate-45" />
            </Link>
            <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#f4f1ea]/20 px-5 py-2.5 text-sm transition hover:border-[#f4f1ea]/70">
              <Download className="size-4" /> CV
            </a>
            <Link href="/contact" className="rounded-full border border-[#f4f1ea]/20 px-5 py-2.5 text-sm transition hover:border-[#f4f1ea]/70">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- statement ---------- */}
      <section className="relative overflow-hidden pt-32 pb-10">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="font-display text-[13vw] leading-[0.88] font-extrabold tracking-[-0.05em] uppercase md:text-[10.5vw] xl:text-[9.5rem]">
            Every story
            <br />
            <PixelReveal cols={16} rows={2}>
              <span className="text-accent">deserves</span>
            </PixelReveal>{" "}
            a frame.
          </p>
          <span className="pointer-events-none mt-2 block text-[13vw] text-accent md:-mt-4 md:text-[6.5rem]">
            <Signature className="-rotate-[6deg]" />
          </span>
        </div>
        <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          <p className="text-center font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">Made for</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-display text-xl text-muted-foreground sm:text-2xl">
            {["Musafir Media", "The Musafir Podcast", "Booking Junction", "Giani Birbal Singh Ji", "Bhujangyy", "Vectoristory"].map((n) => (
              <li key={n} className="transition hover:text-foreground">{n}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- crafts: panels that open under the cursor ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
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
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#090b0f] text-[#f4f1ea] shadow-[0_0_90px_-30px_#f2a33a] ring-1 ring-[#f2a33a]/60">
          <div aria-hidden="true" className="absolute top-0 left-1/2 h-7 w-52 -translate-x-1/2 rounded-b-[1.4rem] bg-background" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(242,163,58,.3),transparent_70%)]" />
          <div className="relative grid gap-10 px-6 pt-20 sm:px-10 md:grid-cols-[1fr_2fr_1fr] md:items-center">
            <nav aria-label="Pages" className="order-2 md:order-1">
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">Pages</p>
              <ul className="mt-3 space-y-1 font-display text-2xl font-bold uppercase">
                {[["/about", "About"], ["/work", "Work"], ["/showcase", "Showcase"], ["/skills", "Skills"], ["/contact", "Contact"]].map(([h, l]) => (
                  <li key={h}>
                    <Link href={h} className="transition hover:text-[#f2a33a]">{l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="relative order-1 text-center md:order-2">
              <p className="font-display text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-7xl">
                Always telling
                <br />
                <span className="text-[#f2a33a]">the story.</span>
              </p>
              <span className="pointer-events-none mt-1 block text-5xl text-white/90 sm:text-6xl">
                <Signature className="-rotate-[10deg] [&_.signature-stroke]:text-[#f2a33a]" />
              </span>
            </div>
            <nav aria-label="Elsewhere" className="order-3 md:text-right">
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">Follow</p>
              <ul className="mt-3 space-y-1 font-display text-2xl font-bold uppercase">
                {[[site.linkedin, "LinkedIn"], [site.behance, "Behance"], ["https://www.instagram.com/bhujangyy/", "Instagram"], ["https://www.youtube.com/@vectoristory", "YouTube"]].map(([h, l]) => (
                  <li key={h}>
                    <a href={h} target="_blank" rel="noreferrer" className="transition hover:text-[#f2a33a]">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/3d/front.webp")} alt="" className="relative mx-auto -mb-1 mt-6 h-72 w-auto object-contain sm:h-96" />
          <Link href="/contact" className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#f2a33a] px-6 py-3 text-sm font-medium text-[#0e1116] shadow-xl transition hover:gap-3">
            Hire me <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
