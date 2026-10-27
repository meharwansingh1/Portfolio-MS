"use client"

import * as React from "react"
import { asset } from "@/lib/data"
import { afterIntro } from "@/lib/intro"
import { clamp } from "@/lib/motion"

type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; sx: number; sy: number; d: number; b: number; ph: number }

const BUCKETS = 10

/**
 * My portrait, rebuilt from thousands of tiny squares. They fly in from all over
 * the screen and settle into the picture, part around the cursor, breathe a
 * little while idle, and blow away like dust as you scroll past the hero.
 */
export function ParticlePortrait({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const touch = !window.matchMedia("(hover: hover)").matches

    let src: ImageData | null = null
    let parts: P[] = []
    let byBucket: P[][] = []
    let w = 0, h = 0, size = 2
    let started = false
    let t0 = 0
    let raf = 0
    let visible = true
    const m = { x: -9999, y: -9999 }

    // dark pixels (turban, beard) become deep Nihang blue; light ones go to silver-white
    const fills = Array.from({ length: BUCKETS }, (_, i) => {
      const k = i / (BUCKETS - 1)
      const r = Math.round(95 + (245 - 95) * k)
      const g = Math.round(125 + (248 - 125) * k)
      const b = Math.round(255)
      return `rgb(${r},${g},${b})`
    })

    const build = () => {
      if (!src) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // the picture sits behind the title, feet on the bottom of the hero
      const narrow = w < 640
      const dispH = Math.min(h * (narrow ? 0.55 : 0.86), (w * (narrow ? 1 : 0.62) * src.height) / src.width)
      const s = dispH / src.height
      const ox = (w - src.width * s) / 2
      const oy = narrow ? Math.max(72, h * 0.1) : h - dispH - h * 0.04

      const target = narrow ? 8000 : 18000
      let opaque = 0
      for (let i = 3; i < src.data.length; i += 4) if (src.data[i] > 140) opaque++
      const step = Math.max(1, Math.sqrt(opaque / target))
      size = Math.max(1.4, step * s * 0.48)

      const old = parts
      parts = []
      for (let y = 0; y < src.height; y += step) {
        for (let x = 0; x < src.width; x += step) {
          const i = (Math.floor(y) * src.width + Math.floor(x)) * 4
          if (src.data[i + 3] <= 140) continue
          const raw = (0.299 * src.data[i] + 0.587 * src.data[i + 1] + 0.114 * src.data[i + 2]) / 255
          // stretch the contrast so eyes, brows and beard read against the skin
          const lum = clamp((raw - 0.22) / 0.6)
          // dark areas (turban, beard, eyes) thin out, so the face reads clearly
          if (Math.random() > 0.5 + 0.5 * Math.pow(lum, 0.8)) continue
          const hx = ox + x * s + (Math.random() - 0.5) * step * s * 0.5
          const hy = oy + y * s + (Math.random() - 0.5) * step * s * 0.5
          const a = Math.random() * Math.PI * 2
          const spread = (0.35 + Math.random() * 0.75) * Math.max(w, h)
          const prev = old[parts.length]
          parts.push({
            hx,
            hy,
            x: prev ? prev.x : Math.random() * w,
            y: prev ? prev.y : Math.random() * h,
            vx: 0,
            vy: 0,
            sx: Math.cos(a) * spread,
            sy: Math.sin(a) * spread - h * 0.25,
            d: Math.random() * 0.9,
            b: Math.min(BUCKETS - 1, Math.floor(Math.pow(lum, 0.9) * BUCKETS)),
            ph: Math.random() * Math.PI * 2,
          })
        }
      }
      if (reduced || (started && old.length)) parts.forEach((p) => ((p.x = p.hx), (p.y = p.hy)))
      byBucket = Array.from({ length: BUCKETS }, () => [])
      parts.forEach((p) => byBucket[p.b].push(p))
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const t = started ? (now - t0) / 1000 : -1
      const rect = cv.getBoundingClientRect()
      // 0 while the hero fills the screen, 1 once it has scrolled most of the way off
      const sp = reduced ? 0 : clamp(-rect.top / (rect.height * 0.75))
      const ease = sp * sp * (3 - 2 * sp)
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        if (started && t > p.d) {
          const tx = p.hx + p.sx * ease + Math.sin(t * 1.3 + p.ph) * 0.6
          const ty = p.hy + p.sy * ease + Math.cos(t * 1.1 + p.ph) * 0.6
          p.vx += (tx - p.x) * 0.045
          p.vy += (ty - p.y) * 0.045
          const dx = p.x - m.x
          const dy = p.y - m.y
          const d2 = dx * dx + dy * dy
          if (d2 < 14400 && d2 > 0.1) {
            const d = Math.sqrt(d2)
            const f = (1 - d / 120) * 3.2
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
          p.vx *= 0.84
          p.vy *= 0.84
          p.x += p.vx
          p.y += p.vy
        } else if (!started || t <= p.d) {
          // waiting in the dust: a slow drift
          p.x += Math.sin(now / 900 + p.ph) * 0.15
          p.y += Math.cos(now / 1100 + p.ph) * 0.15
        }
      }
      const fade = 1 - ease * 0.85
      for (let b = 0; b < BUCKETS; b++) {
        ctx.fillStyle = fills[b]
        ctx.globalAlpha = (0.45 + Math.pow(b / (BUCKETS - 1), 1.2) * 0.55) * fade * (started ? 1 : 0.35)
        for (const p of byBucket[b]) ctx.fillRect(p.x, p.y, size, size)
      }
      ctx.globalAlpha = 1
    }

    const onMove = (e: PointerEvent) => {
      if (touch) return
      const r = cv.getBoundingClientRect()
      m.x = e.clientX - r.left
      m.y = e.clientY - r.top
    }
    const onLeave = () => {
      m.x = m.y = -9999
    }

    const img = new Image()
    img.src = asset("/me/portrait.png")
    let stopIntro = () => {}
    img.onload = () => {
      const off = document.createElement("canvas")
      off.width = img.naturalWidth
      off.height = img.naturalHeight
      const o = off.getContext("2d", { willReadFrequently: true })
      if (!o) return
      o.drawImage(img, 0, 0)
      src = o.getImageData(0, 0, off.width, off.height)
      build()
      raf = requestAnimationFrame(frame)
      stopIntro = afterIntro(() => {
        started = true
        t0 = performance.now()
      })
    }

    const ro = new ResizeObserver(() => build())
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      stopIntro()
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
