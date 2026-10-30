"use client"
/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import Link from "next/link"
import { ArrowDownRight, Download } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { asset, site } from "@/lib/data"
import { posterFiles, posterSrc } from "@/lib/showcase"
import { AvailabilityBadge } from "@/components/site/availability"
import { RotatingWord } from "@/components/site/rotating-word"

const yt = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
const w = (code: string) => asset(`/work/${code}.jpg`)
const p = (name: keyof typeof posterFiles) => posterSrc(name)

// three rows of the wall, each drifting its own way
const ROWS: { src: string; wide?: boolean }[][] = [
  [{ src: w("De2-7D0BEHB") }, { src: yt("FQ76hjBlx78"), wide: true }, { src: p("mehar") }, { src: w("DbNKXuaMsUM") }, { src: yt("PkQGxPIoazg"), wide: true }, { src: p("tandoor") }, { src: w("Dewq-vvTCi8") }],
  [{ src: p("vectoristory") }, { src: w("Db2XXqpuTmJ") }, { src: yt("vaTk8Kx-EJo"), wide: true }, { src: w("DRa01OHk9w9") }, { src: p("dhund") }, { src: w("Da4kXYvs5uV") }, { src: yt("Fi959u_T1xQ"), wide: true }],
  [{ src: w("DetvuhmTaks") }, { src: p("kite") }, { src: yt("nSyyCXZpXw4"), wide: true }, { src: w("DeqFOaaB7zp") }, { src: p("kharag") }, { src: w("Da7IBY9M6W3") }, { src: p("akhara") }, { src: w("DaCfw-XMJgF") }, { src: p("itr") }],
]

function Row({ items, dir, i }: { items: (typeof ROWS)[number]; dir: 1 | -1; i: number }) {
  // the row is drawn twice so the loop is seamless
  const all = [...items, ...items]
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="reel-row flex h-full shrink-0 gap-3 pr-3" style={{ animationDirection: dir === 1 ? "normal" : "reverse", animationDuration: `${60 + i * 12}s` }}>
        {all.map((it, k) => (
          <img
            key={k}
            src={it.src}
            alt=""
            loading={k < 4 ? "eager" : "lazy"}
            decoding="async"
            className={`h-full shrink-0 rounded-xl object-cover ${it.wide ? "aspect-video" : "aspect-[4/5]"}`}
            onError={(e) => {
              const img = e.currentTarget
              if (img.src.includes("maxresdefault")) img.src = img.src.replace("maxresdefault", "hqdefault")
            }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * The cover: my name set huge, with a slot cut into it that shows a moving
 * wall of my work. Scroll, and the slot opens until the wall fills the screen,
 * the name parts to let it through, and one line lands on top.
 */
export function HeroReel() {
  const root = React.useRef<HTMLElement>(null)
  const slot = React.useRef<HTMLSpanElement>(null)
  const wall = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = root.current
    const s = slot.current
    const m = wall.current
    if (!el || !s || !m) return
    gsap.registerPlugin(ScrollTrigger)

    // the wall is clipped to the slot's rectangle
    const inset = () => {
      const r = s.getBoundingClientRect()
      const b = el.getBoundingClientRect()
      const rad = Math.min(r.height / 2, 999)
      return `inset(${r.top - b.top}px ${b.right - r.right}px ${b.bottom - r.bottom}px ${r.left - b.left}px round ${rad}px)`
    }
    const place = () => gsap.set(m, { clipPath: inset() })
    place()

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: 0.6, invalidateOnRefresh: true },
      })
      tl.fromTo(m, { clipPath: () => inset() }, { clipPath: "inset(0px 0px 0px 0px round 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .to("[data-part=left]", { xPercent: -60, opacity: 0, ease: "power2.in", duration: 0.7 }, 0)
        .to("[data-part=right]", { xPercent: 60, opacity: 0, ease: "power2.in", duration: 0.7 }, 0)
        .to("[data-part=fade]", { y: 40, opacity: 0, ease: "power1.in", duration: 0.4 }, 0)
        .fromTo("[data-part=scrim]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.55)
        .fromTo("[data-part=line] > span", { yPercent: 110 }, { yPercent: 0, stagger: 0.08, ease: "power3.out", duration: 0.45 }, 0.6)
      return () => tl.kill()
    })
    mm.add("(prefers-reduced-motion: reduce)", () => {
      window.addEventListener("resize", place)
      return () => window.removeEventListener("resize", place)
    })
    // fonts change the slot's size once they load
    document.fonts?.ready.then(() => {
      place()
      ScrollTrigger.refresh()
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="relative h-svh min-h-[600px] overflow-hidden bg-background">
      {/* the moving wall, seen through the slot */}
      <div ref={wall} aria-hidden="true" className="absolute inset-0 z-10 flex flex-col gap-3 bg-[#111] p-3 will-change-[clip-path]">
        {ROWS.map((r, i) => (
          <Row key={i} items={r} i={i} dir={i % 2 ? -1 : 1} />
        ))}
        <div data-part="scrim" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(17,17,17,.82),rgba(17,17,17,.45))] opacity-0" />
        <p className="absolute inset-0 grid place-content-center px-4 text-center font-display text-[13vw] leading-[0.86] font-black tracking-[-0.02em] text-[#f3f0ea] uppercase [font-stretch:68%] md:text-[9vw]">
          <span data-part="line" className="block overflow-hidden pb-[0.04em]">
            <span className="block">Every story</span>
          </span>
          <span data-part="line" className="block overflow-hidden pb-[0.04em]">
            <span className="block">
              deserves <span className="text-[#ff4a2b]">a frame.</span>
            </span>
          </span>
        </p>
      </div>

      <div className="relative mx-auto flex h-full max-w-[96rem] flex-col px-4 pt-24 pb-6 sm:px-6 md:pt-28 md:pb-8">
        <div data-part="fade" className="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          <AvailabilityBadge short className="w-fit rounded-full border border-border px-3 py-1.5 normal-case tracking-normal" />
          <span className="hidden sm:block">Portfolio — ©2026</span>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <h1 className="select-none">
            <span className="sr-only">Meharwan Singh — designer and video editor</span>
            <span aria-hidden="true" className="flex justify-center">
              <span data-part="left" id="hero-title" className="hero-word block text-foreground" style={{ fontSize: "min(19.5vw, 22rem)" }}>
                MEHARWAN
              </span>
            </span>
            <span aria-hidden="true" className="mt-[0.06em] flex items-center justify-center gap-[2vw] leading-[0.86]" style={{ fontSize: "min(19.5vw, 22rem)" }}>
              <span ref={slot} className="block h-[0.78em] w-[34vw] max-w-[40rem] min-w-[6rem] shrink rounded-full" />
              <span data-part="right" className="hero-word block text-foreground" style={{ fontSize: "1em" }}>
                SINGH<span className="text-accent">.</span>
              </span>
            </span>
          </h1>
        </div>

        <div data-part="fade" className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-lg leading-snug sm:text-2xl">
              Graphic Designer &amp; <span className="font-display text-accent">Video Editor</span>
            </p>
            <p className="mt-1 text-muted-foreground sm:text-lg">
              I tell stories in{" "}
              <span className="text-foreground">
                <RotatingWord words={["posters.", "edits.", "motion.", "AI animation.", "code."]} />
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/showcase" className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition hover:gap-3">
              Watch the work <ArrowDownRight className="size-4 transition group-hover:-rotate-45" />
            </Link>
            <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition hover:border-foreground">
              <Download className="size-4" /> CV
            </a>
            <Link href="/contact" className="rounded-full border border-border px-5 py-3 text-sm transition hover:border-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
