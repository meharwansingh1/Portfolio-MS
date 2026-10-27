"use client"

import * as React from "react"

const query = "(prefers-reduced-motion: reduce)"

function subscribe(cb: () => void) {
  const m = window.matchMedia(query)
  m.addEventListener("change", cb)
  return () => m.removeEventListener("change", cb)
}

/** true when the visitor has asked the OS for less motion */
export function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Calls `fn(progress)` on every animation frame while `ref` is near the viewport.
 * progress is 0 when the element's top reaches the top of the screen and 1 when its
 * bottom reaches the bottom: exactly the stretch where a sticky child stays pinned.
 */
export function usePinProgress(ref: React.RefObject<HTMLElement | null>, fn: (p: number) => void) {
  const cb = React.useRef(fn)
  React.useEffect(() => {
    cb.current = fn
  })
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let last = -1
    const tick = () => {
      const r = el.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? clamp(-r.top / travel) : 0
      if (p !== last) {
        last = p
        cb.current(p)
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
  }, [ref])
}
