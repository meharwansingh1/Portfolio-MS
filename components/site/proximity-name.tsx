"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A name set in a variable font whose letters swell bolder as the cursor comes
 * near and thin out as it leaves. Letters also rise into place on load.
 * Touch devices and reduced-motion visitors simply see the resting weight.
 */
export function ProximityName({
  lines,
  className,
  min = 380,
  max = 820,
  rest = 600,
  radius = 260,
}: {
  lines: { text: string; className?: string }[]
  className?: string
  min?: number
  max?: number
  rest?: number
  radius?: number
}) {
  const root = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    const el = root.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(hover: none)").matches) return
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"))
    let raf = 0
    let x = -1e4
    let y = -1e4
    const paint = () => {
      raf = 0
      for (const l of letters) {
        const r = l.getBoundingClientRect()
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2))
        const t = Math.max(0, 1 - d / radius) // 1 right under the cursor, 0 at the edge of the radius
        const ring = Math.max(0, 1 - Math.abs(d - radius) / (radius * 0.6)) // a thin halo just outside the swell
        const w = rest + (max - rest) * t * t - (rest - min) * ring * (1 - t)
        l.style.fontWeight = String(Math.round(w))
      }
    }
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const leave = () => {
      x = y = -1e4
      if (!raf) raf = requestAnimationFrame(paint)
    }
    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerleave", leave)
      cancelAnimationFrame(raf)
    }
  }, [min, max, rest, radius])

  let n = 0
  return (
    <h1 ref={root} className={cn("font-display", className)} aria-label={lines.map((l) => l.text).join(" ")}>
      {lines.map((line) => (
        <span key={line.text} aria-hidden="true" className={cn("rise block whitespace-nowrap", line.className)}>
          {Array.from(line.text).map((ch, i) => (
            <span
              key={i}
              data-l
              style={{ animationDelay: 100 + n++ * 45 + "ms", fontWeight: rest, transition: "font-weight .35s cubic-bezier(.2,.8,.2,1)" }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
