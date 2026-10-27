"use client"

import * as React from "react"
import { clamp, useReducedMotion } from "@/lib/motion"

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
