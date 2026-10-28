"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { clamp, lerp, useReducedMotion } from "@/lib/motion"

/**
 * A soft dot that trails the mouse. Over anything marked `data-cursor="Play"`
 * it swells into a disc that reads the label. Mouse only; touch is untouched.
 */
export function CursorLabel() {
  const dot = React.useRef<HTMLDivElement>(null)
  const text = React.useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  React.useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const el = dot.current
    if (!el) return
    const t = { x: -100, y: -100 }
    const p = { x: -100, y: -100, s: 0 }
    let label = ""
    let seen = false
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      t.x = e.clientX
      t.y = e.clientY
      if (!seen) {
        p.x = t.x
        p.y = t.y
        seen = true
      }
      const hit = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null
      const next = hit?.dataset.cursor ?? ""
      if (next !== label) {
        label = next
        if (text.current) text.current.textContent = label
        el.dataset.on = label ? "1" : ""
      }
    }
    const onLeave = () => {
      seen = false
      p.x = t.x = -100
      p.y = t.y = -100
    }
    let raf = 0
    const tick = () => {
      const k = reduced ? 1 : 0.2
      p.x = lerp(p.x, t.x, k)
      p.y = lerp(p.y, t.y, k)
      p.s = lerp(p.s, label ? 1 : 0, 0.18)
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${0.18 + p.s * 0.82})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [reduced, mounted])

  if (!mounted) return null
  return createPortal(
    <div
      ref={dot}
      aria-hidden="true"
      className="group/c pointer-events-none fixed top-0 left-0 z-[70] hidden size-24 place-items-center rounded-full bg-accent text-accent-foreground mix-blend-normal [@media(hover:hover)_and_(pointer:fine)]:grid"
      style={{ transform: "translate3d(-100px,-100px,0)" }}
    >
      <span ref={text} className="font-mono text-xs tracking-[0.2em] uppercase opacity-0 transition-opacity duration-200 group-data-[on=1]/c:opacity-100" />
    </div>,
    document.body,
  )
}

/**
 * Leans its content with the speed of the scroll — a quick flick tilts the wall
 * of work, and it settles back upright as the page slows down.
 */
export function VelocitySkew({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  React.useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    let last = window.scrollY
    let skew = 0
    let raf = 0
    const tick = () => {
      const y = window.scrollY
      const v = y - last
      last = y
      skew = lerp(skew, clamp(v * 0.12, -5, 5), 0.12)
      el.style.transform = Math.abs(skew) < 0.01 ? "" : `skewY(${skew.toFixed(3)}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])
  return (
    <div ref={ref} className={className} style={{ transformOrigin: "50% 50%", willChange: "transform" }}>
      {children}
    </div>
  )
}
