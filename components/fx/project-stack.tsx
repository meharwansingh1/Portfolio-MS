"use client"
/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/data"
import { clamp, useReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

const items = projects.map((p) => ({
  slug: p.slug,
  title: p.title === "This Portfolio" ? "This website" : p.title,
  kind: p.kind,
  year: p.year,
  summary: p.summary,
  tags: p.tags,
  images: p.files.flatMap((f) => (f.image ? [f.image] : [])).slice(0, 3),
}))

/**
 * The work as a deck of cards. Each project locks to the top of the screen while
 * the next one slides up over it; the card underneath sinks back and dims, so
 * scrolling feels like dealing the deck one card at a time.
 */
export function ProjectStack() {
  const reduced = useReducedMotion()
  const wraps = React.useRef<HTMLDivElement[]>([])
  const cards = React.useRef<HTMLDivElement[]>([])
  const box = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = box.current
    if (!el || reduced) return
    let raf = 0
    const tick = () => {
      const vh = window.innerHeight
      for (let i = 0; i < cards.current.length; i++) {
        const card = cards.current[i]
        const next = wraps.current[i + 1]
        if (!card) continue
        // how far the next card has slid over this one: 0 → 1
        const cover = next ? clamp(1 - (next.getBoundingClientRect().top - 120) / (vh - 120)) : 0
        card.style.transform = `scale(${1 - cover * 0.08}) translateY(${-cover * 2}%)`
        card.style.filter = cover > 0.001 ? `brightness(${1 - cover * 0.35})` : ""
      }
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
    <div ref={box} className="relative">
      {items.map((p, i) => (
        <div
          key={p.slug}
          ref={(n) => {
            if (n) wraps.current[i] = n
          }}
          className={cn("sticky", i < items.length - 1 ? "pb-[18vh]" : "")}
          style={{ top: `calc(6rem + ${i * 14}px)` }}
        >
          <div
            ref={(n) => {
              if (n) cards.current[i] = n
            }}
            className="origin-top overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_-20px_60px_-30px_rgba(0,0,0,.35)] will-change-transform sm:rounded-[2.5rem]"
          >
            <Link href={`/work/#${p.slug}`} className="group grid min-h-[min(68svh,40rem)] grid-cols-1 md:grid-cols-[1.05fr_1fr]">
              <div className="flex flex-col p-6 sm:p-10">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
                  </span>
                  <span className="tracking-[0.15em] uppercase">{p.year}</span>
                </div>
                <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase sm:mt-10">{p.kind}</p>
                <h3 className="mt-2 font-display text-5xl leading-[0.95] sm:text-7xl">{p.title}</h3>
                <p className="mt-4 line-clamp-3 max-w-md text-muted-foreground sm:mt-6 sm:line-clamp-none">{p.summary}</p>
                <ul className="mt-5 hidden flex-wrap gap-2 sm:flex">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border px-3 py-1 text-xs">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium sm:mt-auto sm:pt-8">
                  Open project
                  <span className="grid size-9 place-items-center rounded-full bg-foreground text-background transition duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </div>

              {/* the pictures: a fanned stack of the project's own covers */}
              <div className="relative order-first h-48 overflow-hidden bg-[radial-gradient(120%_90%_at_20%_10%,#e2381b,#1c0806_72%)] sm:h-64 md:order-none md:h-auto">
                {p.images.length ? (
                  p.images.map((src, k) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      className={cn(
                        "absolute rounded-2xl border border-white/15 object-cover shadow-2xl transition duration-700",
                        k === 0 && "top-1/2 left-1/2 z-30 h-[78%] w-auto max-w-[70%] -translate-x-1/2 -translate-y-1/2 group-hover:scale-105",
                        k === 1 && "top-1/2 left-[22%] z-20 h-[62%] w-auto max-w-[45%] -translate-x-1/2 -translate-y-1/2 -rotate-6 opacity-80 group-hover:-rotate-12",
                        k === 2 && "top-1/2 left-[78%] z-10 h-[62%] w-auto max-w-[45%] -translate-x-1/2 -translate-y-1/2 rotate-6 opacity-80 group-hover:rotate-12",
                      )}
                    />
                  ))
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-display text-8xl text-white">MS.</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
