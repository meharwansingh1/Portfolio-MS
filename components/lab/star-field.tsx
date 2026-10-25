"use client"

import * as React from "react"

/** A slow, twinkling field of stars drawn on a canvas, scaled for sharp screens. */
export function StarField({ count = 160 }: { count?: number }) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0
    let h = 0
    let raf = 0
    const stars = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.2, p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() }))

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const a = still ? 0.6 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.p + t * 0.001 * s.s))
        ctx.fillStyle = `rgba(243, 222, 170, ${a})`
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!still) raf = requestAnimationFrame(draw)
    }
    size()
    draw(0)
    const ro = new ResizeObserver(() => {
      size()
      if (still) draw(0)
    })
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [count])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full" />
}
