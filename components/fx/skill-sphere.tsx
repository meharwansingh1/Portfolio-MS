"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { asset, type SkillGroup } from "@/lib/data"
import { useReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Tag = { name: string; href: string; group: number; level: number }

/**
 * Every skill floats on a slowly turning 3D sphere. Drag (or swipe) to spin it —
 * it keeps the momentum and eases back to a drift. Tags nearer to you are larger
 * and brighter. Click one to see it in the work.
 */
export function SkillSphere({ groups }: { groups: SkillGroup[] }) {
  const tags: Tag[] = React.useMemo(() => groups.flatMap((g, gi) => g.skills.map((s) => ({ name: s.name, href: s.href, group: gi, level: s.level }))), [groups])
  const reduced = useReducedMotion()
  const router = useRouter()
  const stage = React.useRef<HTMLDivElement>(null)
  const els = React.useRef<HTMLAnchorElement[]>([])
  const state = React.useRef({ ax: 0.35, ay: 0, vx: 0, vy: 0.004, drag: false, lx: 0, ly: 0, moved: 0, hover: false })

  // even points on a sphere (the "golden spiral")
  const pts = React.useMemo(() => {
    const n = tags.length
    return tags.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const t = Math.PI * (3 - Math.sqrt(5)) * i
      return [Math.cos(t) * r, y, Math.sin(t) * r] as const
    })
  }, [tags])

  React.useEffect(() => {
    let raf = 0
    const s = state.current
    const tick = () => {
      const box = stage.current
      if (box) {
        const R = Math.min(box.clientWidth, box.clientHeight) * (box.clientWidth < 480 ? 0.33 : 0.4)
        if (!s.drag) {
          s.vx *= 0.95
          s.vy = s.vy * 0.95 + (s.hover || reduced ? 0 : 0.004) * 0.05
        }
        s.ax += s.vx
        s.ay += s.vy
        const cx = Math.cos(s.ax), sx = Math.sin(s.ax), cy = Math.cos(s.ay), sy = Math.sin(s.ay)
        pts.forEach(([x, y, z], i) => {
          // turn around y, then around x
          const x1 = x * cy + z * sy
          const z1 = -x * sy + z * cy
          const y2 = y * cx - z1 * sx
          const z2 = y * sx + z1 * cx
          const k = (z2 + 2) / 3 // 0.33 (back) … 1 (front)
          const el = els.current[i]
          if (!el) return
          el.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, 0) scale(${0.55 + k * 0.6})`
          el.style.opacity = String(0.15 + k * 0.85)
          el.style.zIndex = String(Math.round(k * 100))
          el.style.filter = k < 0.55 ? `blur(${(0.55 - k) * 4}px)` : "none"
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [pts, reduced])

  const down = (e: React.PointerEvent) => {
    const s = state.current
    s.drag = true
    s.moved = 0
    s.lx = e.clientX
    s.ly = e.clientY
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const move = (e: React.PointerEvent) => {
    const s = state.current
    if (!s.drag) return
    const dx = e.clientX - s.lx
    const dy = e.clientY - s.ly
    s.moved += Math.abs(dx) + Math.abs(dy)
    s.vy = dx * 0.006
    s.vx = -dy * 0.006
    s.lx = e.clientX
    s.ly = e.clientY
  }
  const up = (e: React.PointerEvent) => {
    const s = state.current
    s.drag = false
    // a tap (not a drag) on a tag opens it
    if (s.moved < 6) {
      const hit = document.elementsFromPoint(e.clientX, e.clientY).find((n) => (n as HTMLElement).dataset?.href) as HTMLElement | undefined
      const href = hit?.dataset.href
      if (href) {
        if (/^https?:/.test(href)) window.open(href, "_blank", "noopener,noreferrer")
        else router.push(href)
      }
    }
  }

  const tones = ["bg-accent text-accent-foreground", "bg-foreground text-background", "border border-border bg-card text-foreground"]

  return (
    <div
      ref={stage}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={() => (state.current.drag = false)}
      onPointerEnter={() => (state.current.hover = true)}
      onPointerLeave={() => (state.current.hover = false)}
      className="relative mx-auto aspect-square w-full max-w-[34rem] cursor-grab touch-pan-y select-none active:cursor-grabbing"
      role="group"
      aria-label="Skills sphere. Drag to spin."
    >
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-border" />
      <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-border [transform:rotateX(70deg)]" />
      {tags.map((t, i) => (
        <a
          key={t.name}
          ref={(el) => {
            if (el) els.current[i] = el
          }}
          href={/^https?:/.test(t.href) ? t.href : asset(t.href)}
          data-href={t.href}
          onClick={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === "Enter") router.push(t.href)
          }}
          className={cn(
            "absolute top-1/2 left-1/2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-lg will-change-transform outline-none hover:ring-2 hover:ring-accent focus-visible:ring-2 focus-visible:ring-accent",
            tones[t.group % 3],
          )}
        >
          {t.name}
        </a>
      ))}
    </div>
  )
}

/* ------------------------------------------------------- spotlight + rings */

/** A card whose border and surface light up under the cursor like a torch. */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty("--x", `${e.clientX - r.left}px`)
        el.style.setProperty("--y", `${e.clientY - r.top}px`)
      }}
      className={cn(
        "spotlight group/spot relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 sm:p-9",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** A ring that fills to `level` percent when it scrolls into view. */
export function LevelRing({ level }: { level: number }) {
  const ref = React.useRef<SVGCircleElement>(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.strokeDashoffset = String(100 - level)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [level])
  return (
    <span className="relative grid size-14 shrink-0 place-items-center">
      <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
        <circle cx="18" cy="18" r="15.9155" pathLength={100} fill="none" className="stroke-muted" strokeWidth="2.5" />
        <circle
          ref={ref}
          cx="18"
          cy="18"
          r="15.9155"
          pathLength={100}
          fill="none"
          className="stroke-accent transition-[stroke-dashoffset] duration-[1600ms] ease-out"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>
      <span className="font-mono text-[11px] tabular-nums">{level}</span>
    </span>
  )
}
