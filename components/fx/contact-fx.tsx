"use client"

import * as React from "react"
import { useReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------ scramble text */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=/<>?!0123456789"

/** Text that decodes itself out of random glyphs on load, and again on hover. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const run = React.useCallback(() => {
    const el = ref.current
    if (!el || reduced) return
    let frame = 0
    const total = 28
    const step = () => {
      frame++
      el.textContent = Array.from(text)
        .map((ch, i) => {
          if (ch === " " || ch === "'") return ch
          const settle = (i / text.length) * total * 0.7 + total * 0.3
          return frame >= settle ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join("")
      if (frame < total) requestAnimationFrame(step)
      else el.textContent = text
    }
    requestAnimationFrame(step)
  }, [text, reduced])
  React.useEffect(() => {
    run()
  }, [run])
  return (
    <span ref={ref} aria-label={text} onPointerEnter={run} className={cn("inline-block", className)}>
      {text}
    </span>
  )
}

/* ---------------------------------------------------------------- magnetic */

/** Leans toward the cursor while it is near, and springs back when it leaves. */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || reduced || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transition = "transform 0.15s ease-out"
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 0.7s cubic-bezier(.2,1.6,.4,1)"
    el.style.transform = ""
  }
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} className={cn("block will-change-transform", className)}>
      {children}
    </span>
  )
}

/* ---------------------------------------------------------------- dot field */

/**
 * A field of dots that parts around the cursor like iron filings around a
 * magnet, glowing in the accent colour where it passes, then settles back.
 */
export function DotField({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  React.useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const GAP = 26
    const RADIUS = 150
    let w = 0, h = 0, dpr = 1
    let dots: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = []
    const m = { x: -9999, y: -9999 }
    let ink = "#888", accent = "#e2381b"

    const colours = () => {
      const cs = getComputedStyle(document.documentElement)
      ink = cs.getPropertyValue("--muted-foreground").trim() || ink
      accent = cs.getPropertyValue("--accent").trim() || accent
    }
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
    }
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      m.x = e.clientX - r.left
      m.y = e.clientY - r.top
    }
    const onLeave = () => {
      m.x = m.y = -9999
    }

    let raf = 0
    let frame = 0
    const draw = () => {
      if (frame++ % 60 === 0) colours()
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        const dx = d.x - m.x
        const dy = d.y - m.y
        const dist = Math.hypot(dx, dy)
        if (!reduced && dist < RADIUS && dist > 0.01) {
          const f = (1 - dist / RADIUS) * 2.4
          d.vx += (dx / dist) * f
          d.vy += (dy / dist) * f
        }
        d.vx += (d.ox - d.x) * 0.06
        d.vy += (d.oy - d.y) * 0.06
        d.vx *= 0.82
        d.vy *= 0.82
        d.x += d.vx
        d.y += d.vy
        const near = Math.max(0, 1 - Math.hypot(d.x - m.x, d.y - m.y) / RADIUS)
        ctx.globalAlpha = 0.22 + near * 0.78
        ctx.fillStyle = near > 0.05 ? accent : ink
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.2 + near * 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    colours()
    size()
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      if (e.isIntersecting) raf = requestAnimationFrame(draw)
    })
    io.observe(cv)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [reduced])

  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none size-full", className)} />
}

/* ------------------------------------------------------------- local clock */

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })

function tickEverySecond(cb: () => void) {
  const id = setInterval(cb, 1000)
  return () => clearInterval(id)
}

/** The time where I am, live, with a guess at whether I'm awake to answer. */
export function LocalClock() {
  const time = React.useSyncExternalStore(tickEverySecond, () => fmt.format(new Date()), () => "")
  const hour = time ? +time.slice(0, 2) : 12
  const awake = hour >= 8 && hour < 24
  return (
    <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] uppercase">
      <span className={cn("size-2 rounded-full", awake ? "animate-pulse bg-emerald-500" : "bg-muted-foreground")} />
      <span className="text-muted-foreground">New Delhi</span>
      <span className="tabular-nums">{time || "--:--:--"} IST</span>
      <span className="hidden text-muted-foreground sm:inline">· {awake ? "likely to reply today" : "asleep — I'll reply in the morning"}</span>
    </span>
  )
}
