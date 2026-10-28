"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { SmartLink } from "@/components/site/smart-link"
import type { Chapter } from "@/lib/data"
import { clamp, usePinProgress, useReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------ scroll words */

/**
 * The page locks while a statement writes itself in: each word lights up as you
 * scroll, then the page lets go. Words wrapped in *asterisks* are set in the accent.
 */
export function ScrollWords({ text, eyebrow }: { text: string; eyebrow: string }) {
  const reduced = useReducedMotion()
  const box = React.useRef<HTMLDivElement>(null)
  const words = React.useRef<HTMLSpanElement[]>([])
  const bar = React.useRef<HTMLSpanElement>(null)
  const list = text.split(" ")

  usePinProgress(box, (p) => {
    const n = words.current.length
    const at = clamp(p / 0.85) * n
    words.current.forEach((w, i) => {
      const o = clamp(at - i, 0, 1)
      w.style.opacity = String(0.12 + o * 0.88)
      w.style.filter = `blur(${(1 - o) * 4}px)`
    })
    if (bar.current) bar.current.style.transform = `scaleX(${p})`
  })

  const body = list.map((w, i) => {
    const accent = w.startsWith("*")
    const clean = w.replace(/\*/g, "")
    return (
      <React.Fragment key={i}>
        <span
          ref={(el) => {
            if (el) words.current[i] = el
          }}
          className={cn("transition-[opacity,filter] duration-150", accent && "text-accent italic")}
          style={reduced ? undefined : { opacity: 0.12 }}
        >
          {clean}
        </span>{" "}
      </React.Fragment>
    )
  })

  if (reduced)
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="max-w-5xl font-display text-4xl leading-[1.1] sm:text-6xl">{body}</p>
      </section>
    )

  return (
    <div ref={box} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <span className="relative block h-px w-24 overflow-hidden bg-border">
              <span ref={bar} className="absolute inset-0 origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
            </span>
            {eyebrow}
          </p>
          <p className="max-w-5xl font-display text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">{body}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------ horizontal timeline */

function ChapterCard({ t, i, total }: { t: Chapter; i: number; total: number }) {
  return (
    <SmartLink
      href={t.href}
      className="group relative flex h-full w-[82vw] shrink-0 flex-col rounded-[2rem] border border-border bg-card p-7 transition duration-500 hover:border-accent/50 sm:w-[28rem] sm:p-9"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] uppercase",
            t.kind === "Own brand" ? "bg-accent text-accent-foreground" : t.kind === "Education" ? "border border-border text-muted-foreground" : "bg-foreground text-background",
          )}
        >
          {t.kind}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-8 font-display text-4xl leading-none sm:text-5xl">{t.org}</h3>
      {t.place ? <p className="mt-2 text-sm text-muted-foreground">{t.place}</p> : null}
      <ul className="mt-5 space-y-1">
        {t.roles.map((r) => (
          <li key={r.title} className="flex flex-wrap items-baseline justify-between gap-x-3">
            <span className="font-medium">{r.title}</span>
            <span className="font-mono text-xs text-accent">{r.when}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-muted-foreground">{t.text}</p>
      <ul className="mt-4 space-y-1.5">
        {t.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-sm">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            {pt}
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-muted-foreground transition group-hover:text-foreground">
        See the work <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </SmartLink>
  )
}

/**
 * Scrolling down moves the career sideways: the section locks to the screen and
 * the cards slide past until the last one is in view, then the page carries on.
 */
export function HorizontalTimeline({ items, title }: { items: Chapter[]; title: React.ReactNode }) {
  const reduced = useReducedMotion()
  const box = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLDivElement>(null)
  const bar = React.useRef<HTMLSpanElement>(null)
  const count = React.useRef<HTMLSpanElement>(null)
  const dist = React.useRef(0)

  // the section is exactly as tall as the sideways distance, plus one screen
  React.useEffect(() => {
    if (reduced) return
    const size = () => {
      const t = track.current
      const b = box.current
      if (!t || !b) return
      dist.current = Math.max(0, t.scrollWidth - window.innerWidth)
      b.style.height = `${dist.current + window.innerHeight}px`
    }
    size()
    const ro = new ResizeObserver(size)
    if (track.current) ro.observe(track.current)
    window.addEventListener("resize", size)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", size)
    }
  }, [reduced])

  usePinProgress(box, (p) => {
    if (track.current) track.current.style.transform = `translate3d(${-p * dist.current}px,0,0)`
    if (bar.current) bar.current.style.transform = `scaleX(${p})`
    if (count.current) count.current.textContent = String(Math.min(items.length, Math.floor(p * items.length) + 1)).padStart(2, "0")
  })

  if (reduced)
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        {title}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((t, i) => (
            <div key={t.org} className="[&>a]:w-full">
              <ChapterCard t={t} i={i} total={items.length} />
            </div>
          ))}
        </div>
      </section>
    )

  return (
    <div ref={box} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16">
        <div className="mx-auto mb-8 flex w-full max-w-6xl items-end justify-between gap-6 px-4 sm:px-6">
          {title}
          <div className="hidden shrink-0 items-center gap-4 font-mono text-xs text-muted-foreground sm:flex">
            <span>
              <span ref={count} className="text-foreground">
                01
              </span>{" "}
              / {String(items.length).padStart(2, "0")}
            </span>
            <span className="relative block h-px w-32 overflow-hidden bg-border">
              <span ref={bar} className="absolute inset-0 origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
            </span>
          </div>
        </div>
        <div ref={track} className="flex w-max items-stretch gap-5 px-4 will-change-transform sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {items.map((t, i) => (
            <ChapterCard key={t.org} t={t} i={i} total={items.length} />
          ))}
          <div className="flex w-[60vw] shrink-0 items-center sm:w-[22rem]">
            <p className="font-display text-4xl leading-tight text-muted-foreground">
              …and the <span className="text-accent italic">next chapter</span> could be with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
