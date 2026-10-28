import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react"
import { asset, site, projects } from "@/lib/data"
import { Reveal } from "@/components/site/reveal"
import { CountUp } from "@/components/fx/count-up"
import { ProjectStack } from "@/components/fx/project-stack"
import { Signature } from "@/components/site/signature"
import { AvailabilityBadge, UntilNoticeEnds } from "@/components/site/availability"
import { RotatingWord } from "@/components/site/rotating-word"
import { Intro } from "@/components/fx/intro"
import { RenderPortrait } from "@/components/fx/render-portrait"
import { Collage, PixelReveal, SocialFan } from "@/components/fx/home-fx"

const now = [
  { label: "Building Bhujangyy", note: "own brand", href: "/work/#bhujangyy" },
  { label: "Designing for Booking Junction", note: "freelance", href: "/work/#booking-junction" },
  { label: "Production Head, Musafir Media", note: "until 10 Nov", href: "/work/#musafir-podcast", endsWithNotice: true },
  { label: "Animating Vectoristory", note: "daily stories", href: "/work/#vectoristory" },
]

export default function Home() {
  return (
    <>
      <Intro />

      {/* ---------- cover: a living render of me in a studio ---------- */}
      <section className="relative h-svh min-h-[620px] overflow-hidden bg-[#e6e9ef] dark:bg-[#070a12]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,#ffffff,transparent_70%)] dark:bg-[radial-gradient(60%_55%_at_50%_45%,rgba(91,124,255,.16),transparent_70%)]" />
        <h1 id="hero-title" className="hero-word ink absolute top-[17%] left-1/2 w-fit -translate-x-1/2 md:top-[19%]">
          <span className="sr-only">Meharwan Singh — </span>PORTFOLIO
        </h1>
        <RenderPortrait className="absolute bottom-0 left-1/2 aspect-[900/883] h-[64%] -translate-x-1/2 sm:h-[78%] md:h-[88%]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#e6e9ef] via-[#e6e9ef]/85 to-transparent md:h-40 md:via-transparent dark:from-[#070a12] dark:via-[#070a12]/85 md:dark:via-transparent" />

        <AvailabilityBadge short className="absolute top-24 left-[max(1rem,calc((100vw-80rem)/2+1.5rem))] w-fit rounded-full border border-border bg-background/60 px-3.5 py-2 backdrop-blur sm:left-6 md:top-28" />
        <p className="absolute top-1/2 right-4 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase md:block">Hover over me</p>

        <div className="absolute inset-x-0 bottom-0 mx-auto grid max-w-7xl gap-5 px-4 pb-7 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:pb-10">
          <div>
            <p className="text-xl leading-snug sm:text-2xl">
              <span className="font-semibold">Meharwan Singh</span> <span className="text-muted-foreground">—</span> Graphic Designer &amp;{" "}
              <span className="font-display text-accent italic">Video Editor</span>
            </p>
            <p className="mt-1.5 text-muted-foreground sm:text-lg">
              Visual storyteller. I tell stories in{" "}
              <span className="text-foreground">
                <RotatingWord words={["thumbnails.", "edits.", "motion.", "AI animation.", "code."]} />
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/showcase" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:gap-3">
              Watch the work <ArrowDownRight className="size-4 transition group-hover:-rotate-45" />
            </Link>
            <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/50 px-5 py-2.5 text-sm backdrop-blur transition hover:border-foreground">
              <Download className="size-4" /> CV
            </a>
            <Link href="/contact" className="rounded-full border border-foreground/20 bg-background/50 px-5 py-2.5 text-sm backdrop-blur transition hover:border-foreground">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- right now ---------- */}
      <section className="relative">
        {/* right now */}
        <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            {now.map((n) => {
              const cell = (
                <Link key={n.label} href={n.href} className="group flex flex-col gap-1 border-b border-border p-5 transition hover:bg-card sm:border-r lg:border-b-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Right now · {n.note}</span>
                  <span className="flex items-center justify-between gap-2 font-medium">
                    {n.label} <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:text-accent" />
                  </span>
                </Link>
              )
              return "endsWithNotice" in n ? <UntilNoticeEnds key={n.label}>{cell}</UntilNoticeEnds> : cell
            })}
          </div>
        </div>
      </section>

      {/* ---------- statement: a signature across big type ---------- */}
      <section className="relative overflow-hidden pt-32 pb-8">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="relative z-10 font-display text-[13vw] leading-[0.88] font-extrabold tracking-[-0.05em] uppercase md:text-[10.5vw] xl:text-[9.5rem]">
            Every story
            <br />
            <PixelReveal cols={16} rows={2}>
              <span className="text-accent">deserves</span>
            </PixelReveal>{" "}
            a frame.
          </p>
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 w-[22vw] max-w-[15rem] min-w-[7.5rem] -translate-x-1/2 -translate-y-1/2 -rotate-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/me/designed.webp")} alt="" className="aspect-[4/5] w-full rounded-lg bg-[#e6e9ef] object-cover object-[50%_15%] shadow-2xl" />
          </div>
          <span className="pointer-events-none relative z-20 mt-2 block text-[13vw] text-accent md:-mt-6 md:text-[7rem]">
            <Signature className="-rotate-[8deg]" />
          </span>
        </div>
      </section>

      {/* ---------- the work: a deck that deals itself as you scroll ---------- */}
      <section className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-accent">01</span> — Selected work
            </p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-none sm:text-6xl">
              One project <span className="text-muted-foreground">at a time.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">Keep scrolling — each project locks in place while the next one slides over it.</p>
        </Reveal>
        <ProjectStack />
      </section>

      {/* ---------- off the desk: covers drifting at different depths ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <Collage>
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <span className="text-accent">02</span> — Off the desk
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Reels, posters and stories <PixelReveal cols={10} rows={1}>since 2023.</PixelReveal>
          </h2>
          <p className="mt-4 text-muted-foreground">For creators, brands and my own pages — hover a cover to bring back its colour, click to open it.</p>
          <Link href="/showcase" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
            See everything <ArrowUpRight className="size-4" />
          </Link>
        </Collage>
      </section>

      {/* ---------- socials: a hand of phones ---------- */}
      <section className="mx-auto max-w-6xl px-4 pt-24 pb-28 text-center sm:px-6">
        <h2 className="font-display text-5xl leading-none uppercase sm:text-7xl">
          What&apos;s up <PixelReveal cols={9} rows={1}><span className="text-accent">on socials</span></PixelReveal>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">Follow the brands I build and the work in progress.</p>
        <div className="mt-14">
          <SocialFan />
        </div>
      </section>

      {/* ---------- numbers ---------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {[
            ["3", "disciplines in one pair of hands"],
            [String(projects.length), "featured projects"],
            ["40+", "reels in a single series"],
            ["Daily", "new animated stories"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 80} className="bg-background p-8">
              <CountUp value={n} className="block font-display text-5xl" />
              <p className="mt-2 text-sm text-muted-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- closing card ---------- */}
      <section className="px-3 pt-28 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#05070d] text-white shadow-[0_0_90px_-30px_var(--accent)] ring-1 ring-accent/60">
          <div aria-hidden="true" className="absolute top-0 left-1/2 h-7 w-52 -translate-x-1/2 rounded-b-[1.4rem] bg-background" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(91,124,255,.35),transparent_70%)]" />
          <div className="relative grid gap-10 px-6 pt-20 sm:px-10 md:grid-cols-[1fr_2fr_1fr] md:items-center">
            <nav aria-label="Pages" className="order-2 md:order-1">
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">Pages</p>
              <ul className="mt-3 space-y-1 font-display text-2xl font-bold uppercase">
                {[["/about", "About"], ["/work", "Work"], ["/showcase", "Showcase"], ["/skills", "Skills"], ["/contact", "Contact"]].map(([h, l]) => (
                  <li key={h}>
                    <Link href={h} className="transition hover:text-accent">{l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="relative order-1 text-center md:order-2">
              <p className="font-display text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-7xl">
                Always telling
                <br />
                <span className="text-accent">the story.</span>
              </p>
              <span className="pointer-events-none mt-1 block text-5xl text-white/90 sm:text-6xl">
                <Signature className="-rotate-[10deg] [&_.signature-stroke]:text-accent" />
              </span>
            </div>
            <nav aria-label="Elsewhere" className="order-3 md:text-right">
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">Follow</p>
              <ul className="mt-3 space-y-1 font-display text-2xl font-bold uppercase">
                {[[site.linkedin, "LinkedIn"], [site.behance, "Behance"], ["https://www.instagram.com/bhujangyy/", "Instagram"], ["https://www.youtube.com/@vectoristory", "YouTube"]].map(([h, l]) => (
                  <li key={h}>
                    <a href={h} target="_blank" rel="noreferrer" className="transition hover:text-accent">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/me/designed.webp")} alt="" className="relative mx-auto -mb-1 mt-6 h-64 w-auto object-contain sm:h-80" />
          <Link href="/contact" className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-xl transition hover:gap-3">
            Hire me <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
