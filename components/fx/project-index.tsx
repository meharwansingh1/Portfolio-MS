"use client"
/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/data"
import { clamp, lerp, useReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

const rows = projects.map((p) => ({
  slug: p.slug,
  title: p.title === "This Portfolio" ? "This website" : p.title,
  kind: p.kind,
  year: p.year,
  image: p.files.find((f) => f.image)?.image,
}))

/**
 * A big typographic index of the work. On a mouse, a preview card trails the
 * cursor with a little lag, tilting with the speed it is dragged at, and swaps
 * its picture as you move from row to row. On touch it shows a thumbnail.
 */
export function ProjectIndex() {
  const reduced = useReducedMotion()
  const [active, setActive] = React.useState<number | null>(null)
  const card = React.useRef<HTMLDivElement>(null)
  const target = React.useRef({ x: 0, y: 0 })
  const pos = React.useRef({ x: 0, y: 0, r: 0 })
  const live = React.useRef(false)

  React.useEffect(() => {
    let raf = 0
    const tick = () => {
      const c = card.current
      if (c && live.current) {
        const p = pos.current
        const t = target.current
        const k = reduced ? 1 : 0.14
        const nx = lerp(p.x, t.x, k)
        const ny = lerp(p.y, t.y, k)
        p.r = lerp(p.r, clamp((nx - p.x) * 0.6, -14, 14), 0.2)
        p.x = nx
        p.y = ny
        c.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${reduced ? 0 : p.r}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return
    target.current = { x: e.clientX, y: e.clientY }
    if (!live.current) {
      pos.current = { x: e.clientX, y: e.clientY, r: 0 }
      live.current = true
    }
  }

  return (
    <div
      onPointerMove={move}
      onPointerLeave={() => {
        setActive(null)
        live.current = false
      }}
      className="group/list relative"
    >
      <ol className="border-t border-border">
        {rows.map((r, i) => (
          <li key={r.slug} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)} className="transition-opacity duration-500 group-hover/list:opacity-30 hover:!opacity-100">
            <Link href={`/work/#${r.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-border py-6 sm:grid-cols-[4rem_1fr_auto] md:py-8">
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                {/* the title rolls up and is replaced by an accent copy of itself */}
                <span className="relative block overflow-hidden font-display text-4xl leading-[1.05] sm:text-6xl md:text-7xl">
                  <span className="block truncate transition duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full">{r.title}</span>
                  <span aria-hidden="true" className="absolute inset-0 block translate-y-full truncate text-accent italic transition duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-y-0">
                    {r.title}
                  </span>
                </span>
                <span className="mt-2 block font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  {r.kind} · {r.year}
                </span>
              </span>
              <span className="flex items-center gap-4">
                {r.image ? <img src={r.image} alt="" loading="lazy" className="size-14 rounded-xl object-cover md:hidden" /> : null}
                <ArrowUpRight className="hidden size-8 -rotate-45 text-muted-foreground transition duration-500 group-hover:rotate-0 group-hover:text-accent md:block" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* the trailing preview (mouse only) */}
      <div
        ref={card}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[4/5] w-64 overflow-hidden rounded-2xl shadow-2xl transition-[opacity,scale] duration-300 md:block lg:w-72",
          active === null ? "scale-75 opacity-0" : "scale-100 opacity-100",
        )}
      >
        {rows.map((r, i) =>
          r.image ? (
            <img key={r.slug} src={r.image} alt="" className={cn("absolute inset-0 size-full object-cover transition duration-500", active === i ? "scale-100 opacity-100" : "scale-110 opacity-0")} />
          ) : (
            <span
              key={r.slug}
              className={cn(
                "absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_20%_10%,#5b7cff,#0b1230_70%)] font-display text-6xl text-white transition duration-500",
                active === i ? "opacity-100" : "opacity-0",
              )}
            >
              MS.
            </span>
          ),
        )}
      </div>
    </div>
  )
}

/** Counts up from zero the first time it scrolls into view. Non-numeric values just appear. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  React.useEffect(() => {
    const el = ref.current
    const m = value.match(/^(\d+)(.*)$/)
    if (!el || !m || reduced) return
    const end = +m[1]
    const rest = m[2]
    el.textContent = "0" + rest
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t: number) => {
        const k = clamp((t - t0) / 1400)
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + rest
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, reduced])
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
