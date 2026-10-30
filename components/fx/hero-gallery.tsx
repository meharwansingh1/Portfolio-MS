"use client"
/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import Link from "next/link"
import { ArrowDownRight, Download } from "lucide-react"
import { asset, site } from "@/lib/data"
import { posterSrc } from "@/lib/showcase"
import { AvailabilityBadge } from "@/components/site/availability"
import { RotatingWord } from "@/components/site/rotating-word"
import { cn } from "@/lib/utils"

const w = (code: string) => asset(`/work/${code}.jpg`)

/**
 * The cards hanging in the air. x and y are the card's centre as a % of the
 * stage; z is its depth in px (negative = further away); r is a slight tilt;
 * s is its width in vw. `phone` cards stay on small screens.
 */
type Card = { src: string; x: number; y: number; z: number; r: number; s: number; ratio: "4/5" | "9/16"; href: string; phone?: boolean }
const CARDS: Card[] = [
  // far back, framing the name
  { src: posterSrc("kite"), x: 50, y: 14, z: -520, r: 2, s: 13, ratio: "4/5", href: "/showcase/#graphic-design" },
  { src: w("DbNKXuaMsUM"), x: 30, y: 22, z: -420, r: -4, s: 9, ratio: "9/16", href: "/showcase/#video-editing" },
  { src: posterSrc("dhund"), x: 71, y: 24, z: -460, r: 5, s: 12, ratio: "4/5", href: "/showcase/#graphic-design" },
  { src: w("Dewq-vvTCi8"), x: 46, y: 86, z: -480, r: 3, s: 9, ratio: "9/16", href: "/showcase/#ai-animation" },
  // middle ring
  { src: posterSrc("mehar"), x: 13, y: 28, z: -160, r: -7, s: 15, ratio: "4/5", href: "/showcase/#graphic-design", phone: true },
  { src: w("De2-7D0BEHB"), x: 87, y: 30, z: -120, r: 7, s: 11, ratio: "9/16", href: "/showcase/#ai-animation", phone: true },
  { src: posterSrc("tandoor"), x: 20, y: 76, z: -200, r: 6, s: 14, ratio: "4/5", href: "/showcase/#graphic-design", phone: true },
  { src: posterSrc("vectoristory"), x: 79, y: 76, z: -180, r: -6, s: 14, ratio: "4/5", href: "/showcase/#graphic-design", phone: true },
  { src: w("DRa01OHk9w9"), x: 63, y: 90, z: -260, r: -3, s: 9, ratio: "9/16", href: "/showcase/#video-editing" },
  { src: w("Da4kXYvs5uV"), x: 34, y: 90, z: -300, r: 4, s: 9, ratio: "9/16", href: "/showcase/#video-editing" },
  // close to the eye, at the very edges
  { src: posterSrc("kharag"), x: 3, y: 58, z: 180, r: 9, s: 15, ratio: "4/5", href: "/showcase/#graphic-design" },
  { src: posterSrc("akhara"), x: 97, y: 60, z: 220, r: -9, s: 15, ratio: "4/5", href: "/showcase/#graphic-design" },
  { src: posterSrc("itr"), x: 92, y: 6, z: 120, r: -5, s: 10, ratio: "4/5", href: "/showcase/#graphic-design" },
  { src: w("Db2XXqpuTmJ"), x: 7, y: 4, z: 90, r: 6, s: 8, ratio: "9/16", href: "/showcase/#video-editing" },
]

/**
 * The cover: my name floating in a room full of my work. Posters and covers
 * hang at different depths and the whole room turns gently with the cursor
 * (or the phone's tilt). Scroll, and the cards fly past you as the name falls
 * away. Pure CSS 3D — no WebGL — so it stays light on every device.
 */
export function HeroGallery() {
  const root = React.useRef<HTMLElement>(null)
  const room = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = root.current
    const r = room.current
    if (!el || !r) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const aim = { x: 0, y: 0 }
    const now = { x: 0, y: 0 }
    let raf = 0
    let visible = true

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      aim.x = (e.clientX / window.innerWidth) * 2 - 1
      aim.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = performance.now() / 1000
      // without a mouse, the room sways on its own
      const idleX = Math.sin(t * 0.35) * 0.35
      const idleY = Math.cos(t * 0.28) * 0.25
      const tx = matchMedia("(hover: hover)").matches ? aim.x + idleX * 0.3 : idleX
      const ty = matchMedia("(hover: hover)").matches ? aim.y + idleY * 0.3 : idleY
      now.x += (tx - now.x) * 0.05
      now.y += (ty - now.y) * 0.05
      const rect = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.9)))
      el.style.setProperty("--p", p.toFixed(4))
      r.style.transform = `translateZ(${p * 900}px) rotateX(${(-now.y * 7).toFixed(3)}deg) rotateY(${(now.x * 10).toFixed(3)}deg)`
    }

    if (reduced) {
      el.style.setProperty("--p", "0")
      return
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <section ref={root} className="hero-gallery relative h-[100svh] min-h-[620px] overflow-hidden bg-background [--p:0]">
      {/* the room */}
      <div aria-hidden="true" className="absolute inset-0 [perspective:1100px] [perspective-origin:50%_45%]">
        <div ref={room} className="absolute inset-0 [transform-style:preserve-3d] will-change-transform">
          {CARDS.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              tabIndex={-1}
              className={cn("hg-card group absolute block", !c.phone && "max-md:hidden")}
              style={
                {
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: `max(${c.s}vw, ${Math.round(c.s * 7.5)}px)`,
                  "--z": `${c.z}px`,
                  "--r": `${c.r}deg`,
                  "--dx": `${(c.x - 50) * 1.6}%`,
                  "--d": `${(i % 5) * -1.3}s`,
                } as React.CSSProperties
              }
            >
              <span className="hg-float block">
                <img
                  src={c.src}
                  alt=""
                  loading={i < 8 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="block w-full rounded-[10px] object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,.45)] ring-1 ring-black/5 transition duration-500 group-hover:scale-[1.04]"
                  style={{ aspectRatio: c.ratio }}
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* a soft wash so the name always reads over the cards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_50%,var(--background)_35%,transparent_100%)]" />

      <div className="pointer-events-none relative mx-auto flex h-full max-w-[96rem] flex-col px-4 pt-24 pb-6 sm:px-6 md:pt-28 md:pb-8">
        <div className="hg-out flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          <AvailabilityBadge short className="pointer-events-auto w-fit rounded-full border border-border bg-background/70 px-3 py-1.5 tracking-normal normal-case backdrop-blur" />
          <span className="hidden sm:block">Portfolio — ©2026</span>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <h1 className="hg-name text-center select-none">
            <span className="sr-only">Meharwan Singh — designer and video editor</span>
            <span aria-hidden="true" id="hero-title" className="hero-word block text-foreground" style={{ fontSize: "min(17vw, 15rem)" }}>
              MEHARWAN
            </span>
            <span aria-hidden="true" className="hero-word block text-foreground" style={{ fontSize: "min(17vw, 15rem)" }}>
              SINGH<span className="text-accent">.</span>
            </span>
          </h1>
        </div>

        <div className="hg-out pointer-events-auto grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="w-fit rounded-2xl bg-background/75 p-3 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none">
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
            <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-3 text-sm backdrop-blur transition hover:border-foreground">
              <Download className="size-4" /> CV
            </a>
            <Link href="/contact" className="rounded-full border border-border bg-background/70 px-5 py-3 text-sm backdrop-blur transition hover:border-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
