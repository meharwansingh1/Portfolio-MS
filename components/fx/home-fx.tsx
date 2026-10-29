"use client"
/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { asset } from "@/lib/data"
import { clamp, useReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------ pixel reveal */

/**
 * A line of type hidden under a grid of accent blocks that clear away in a
 * jagged, pixel-by-pixel sweep the first time it scrolls into view.
 */
export function PixelReveal({ children, className, cols = 14, rows = 3 }: { children: React.ReactNode; className?: string; cols?: number; rows?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [on, setOn] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // a fixed pseudo-random order so the sweep is ragged but the same every time
  const cells = React.useMemo(
    () =>
      Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols
        const r = Math.floor(i / cols)
        const jitter = ((c * 37 + r * 91) % 7) * 35
        return c * 45 + jitter + r * 20
      }),
    [cols, rows],
  )
  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-1 inset-y-0 grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      >
        {cells.map((d, i) => (
          <span
            key={i}
            className="bg-accent transition-opacity duration-150 motion-reduce:hidden"
            style={{ opacity: on ? 0 : 1, transitionDelay: `${d}ms` }}
          />
        ))}
      </span>
    </span>
  )
}

/* --------------------------------------------------------- parallax collage */

const COVERS = [
  { src: "De2-7D0BEHB", x: 6, y: 8, w: 15, s: 0.6, href: "/showcase/#ai-animation" },
  { src: "DbNKXuaMsUM", x: 74, y: 4, w: 13, s: 1.3, href: "/work/#booking-junction" },
  { src: "DeqFOaaB7zp", x: 82, y: 52, w: 12, s: 0.8, href: "/work/#bhujangyy" },
  { src: "Dewq-vvTCi8", x: 14, y: 58, w: 11, s: 1.5, href: "/showcase/#ai-animation" },
  { src: "Db2XXqpuTmJ", x: 30, y: 2, w: 9, s: 1.9, href: "/work/#booking-junction" },
  { src: "DRa01OHk9w9", x: 60, y: 70, w: 10, s: 0.5, href: "/work/#giani-birbal-singh-ji" },
  { src: "DetvuhmTaks", x: 2, y: 34, w: 8, s: 2.2, href: "/work/#giani-birbal-singh-ji" },
  { src: "Da4kXYvs5uV", x: 88, y: 28, w: 9, s: 1.7, href: "/work/#booking-junction" },
]

/**
 * Covers of my work scattered around a short line of text, each drifting at its
 * own speed as you scroll, so the wall seems to have depth.
 */
export function Collage({ children }: { children: React.ReactNode }) {
  const box = React.useRef<HTMLDivElement>(null)
  const items = React.useRef<HTMLAnchorElement[]>([])
  const reduced = useReducedMotion()
  React.useEffect(() => {
    const el = box.current
    if (!el || reduced) return
    let raf = 0
    const tick = () => {
      const r = el.getBoundingClientRect()
      const p = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height)) - 0.5
      items.current.forEach((n, i) => {
        if (n) n.style.transform = `translate3d(0, ${-p * COVERS[i].s * 260}px, 0)`
      })
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      if (e.isIntersecting) raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduced])
  return (
    <div ref={box} className="relative h-[min(110svh,62rem)] overflow-hidden">
      {COVERS.map((c, i) => (
        <Link
          key={c.src}
          href={c.href}
          ref={(n) => {
            if (n) items.current[i] = n
          }}
          aria-label="Open this piece of work"
          className={cn("group absolute block will-change-transform", i >= 5 && "hidden md:block")}
          style={{ left: `${c.x}%`, top: `${c.y}%`, width: `max(${c.w}%, ${Math.round(c.w * 6.5)}px)` }}
        >
          <img
            src={asset(`/work/${c.src}.jpg`)}
            alt=""
            loading="lazy"
            className="aspect-[4/5] w-full rounded-md object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        </Link>
      ))}
      <div className="pointer-events-none absolute inset-0 grid place-items-center px-6">
        <div className="pointer-events-auto max-w-md rounded-3xl bg-background/80 p-6 text-center backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none">{children}</div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- social fan */

const SOCIALS: { label: string; sub: string; href: string; img?: string }[] = [
  { label: "Bhujangyy", sub: "Instagram", href: "https://www.instagram.com/bhujangyy/", img: "/work/De2-7D0BEHB.jpg" },
  { label: "Vectoristory", sub: "YouTube", href: "https://www.youtube.com/@vectoristory" },
  { label: "LinkedIn", sub: "Meharwan Singh", href: "https://www.linkedin.com/in/meharwan-singh-316388278/", img: "/3d/bust.webp" },
  { label: "Behance", sub: "Design work", href: "https://www.behance.net/MeharwanSinghh", img: "/work/DbNKXuaMsUM.jpg" },
  { label: "Vectoristory", sub: "Instagram", href: "https://www.instagram.com/vectoristory/" },
]

/** Phones held like a hand of cards: they fan open when they come into view. */
export function SocialFan() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOpen(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const n = SOCIALS.length
  return (
    <div ref={ref} className="relative mx-auto h-[22rem] w-full max-w-3xl sm:h-[26rem]">
      {SOCIALS.map((s, i) => {
        const k = i - (n - 1) / 2
        return (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="group absolute bottom-0 left-1/2 w-32 origin-[50%_130%] transition-transform duration-700 ease-[cubic-bezier(.2,.9,.3,1.15)] hover:z-10 sm:w-40"
            style={{
              transform: `translateX(-50%) rotate(${open ? k * 13 : k * 2}deg) translateY(${open ? Math.abs(k) * 14 : 0}px)`,
              transitionDelay: `${Math.abs(k) * 60}ms`,
            }}
          >
            <span className="block overflow-hidden rounded-[1.6rem] border-4 border-[#0b0f1a] bg-[#0b0f1a] shadow-2xl transition duration-300 group-hover:-translate-y-6">
              {s.img ? (
                <img src={asset(s.img)} alt="" loading="lazy" className={cn("aspect-[9/16] w-full object-cover", s.img.startsWith("/3d/") && "bg-[radial-gradient(70%_60%_at_50%_40%,#3a2610,#0e1116)] object-[50%_30%]")} />
              ) : (
                <span className="grid aspect-[9/16] w-full place-items-center bg-[radial-gradient(120%_80%_at_30%_0%,#f2a33a,#1a1206_70%)] p-3 text-center font-serif text-xl text-[#f5e3b0] italic">
                  {s.label}
                </span>
              )}
              <span className="absolute inset-x-1 bottom-1 rounded-b-[1.3rem] bg-gradient-to-t from-black/85 to-transparent px-3 pt-8 pb-3 text-white">
                <span className="block text-sm font-semibold">{s.label}</span>
                <span className="flex items-center gap-1 text-[11px] text-white/75">
                  {s.sub} <ArrowUpRight className="size-3" />
                </span>
              </span>
            </span>
          </a>
        )
      })}
    </div>
  )
}
