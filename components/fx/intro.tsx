"use client"

import * as React from "react"
import { finishIntro } from "@/lib/intro"

const NAME = "MEHARWAN"
const WORD = "PORTFOLIO"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * The opening: a dot drops onto a dark stage and stands up as an exclamation
 * mark, whose stroke tips over and spills out my name — the dot ends up as its
 * full stop. Then the letters flip, one by one, into PORTFOLIO, and the word
 * glides down onto the hero title it becomes.
 */
export function Intro() {
  const stage = React.useRef<HTMLDivElement>(null)
  const row = React.useRef<HTMLDivElement>(null)
  const dot = React.useRef<HTMLSpanElement>(null)
  const bar = React.useRef<HTMLSpanElement>(null)
  const glow = React.useRef<HTMLDivElement>(null)
  const letters = React.useRef<HTMLSpanElement[]>([])
  const skipped = React.useRef(false)

  React.useEffect(() => {
    const el = stage.current
    if (!el || !document.documentElement.classList.contains("intro-on")) return
    document.documentElement.style.overflow = "hidden"
    let cancelled = false

    const end = () => {
      if (cancelled) return
      cancelled = true
      document.documentElement.style.overflow = ""
      el.style.display = "none"
      finishIntro()
    }

    const run = async () => {
      const L = letters.current
      const d = dot.current!
      const b = bar.current!
      const r = row.current!
      await document.fonts?.ready
      if (cancelled) return

      // where the dot sits at the end (the full stop) vs. the middle of the screen
      const dr = d.getBoundingClientRect()
      const dx = window.innerWidth / 2 - (dr.left + dr.width / 2)
      const dy = window.innerHeight / 2 - (dr.top + dr.height / 2)
      L.forEach((l) => (l.style.opacity = "0"))
      r.style.opacity = "1"

      glow.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, fill: "forwards" })

      // 1. the dot drops in and bounces
      await d.animate(
        [
          { transform: `translate(${dx}px, ${dy - window.innerHeight * 0.6}px)`, offset: 0 },
          { transform: `translate(${dx}px, ${dy}px)`, offset: 0.45, easing: "ease-out" },
          { transform: `translate(${dx}px, ${dy - 70}px)`, offset: 0.65, easing: "ease-in" },
          { transform: `translate(${dx}px, ${dy}px)`, offset: 0.82, easing: "ease-out" },
          { transform: `translate(${dx}px, ${dy - 14}px)`, offset: 0.91, easing: "ease-in" },
          { transform: `translate(${dx}px, ${dy}px)`, offset: 1 },
        ],
        { duration: 1100, fill: "forwards", easing: "ease-in" },
      ).finished
      if (cancelled) return

      // 2. it stands up as "!"
      b.style.opacity = "1"
      await b.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 320, easing: "cubic-bezier(.2,1.4,.4,1)", fill: "forwards" }).finished
      await wait(220)
      if (cancelled) return

      // 3. the stroke tips over and the name spills out while the dot rolls to its place
      b.animate(
        [
          { transform: "scaleY(1) rotate(0deg)", opacity: 1 },
          { transform: "scaleY(1) rotate(-100deg)", opacity: 1, offset: 0.6 },
          { transform: "scaleY(0.2) rotate(-100deg)", opacity: 0 },
        ],
        { duration: 520, easing: "cubic-bezier(.6,0,.4,1)", fill: "forwards" },
      )
      d.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0,0)" }], {
        duration: 260 + NAME.length * 85,
        easing: "cubic-bezier(.5,0,.2,1)",
        fill: "forwards",
      })
      for (let i = 0; i < NAME.length; i++) {
        L[i].animate(
          [
            { opacity: 0, transform: "translateY(-0.55em) rotateX(90deg) rotateZ(-28deg)" },
            { opacity: 1, transform: "translateY(0) rotateX(0deg) rotateZ(0deg)" },
          ],
          { duration: 480, delay: 160 + i * 85, easing: "cubic-bezier(.2,1.3,.4,1)", fill: "forwards" },
        )
      }
      await wait(160 + NAME.length * 85 + 480 + 420)
      if (cancelled) return

      // 4. the name flips into PORTFOLIO, letter by letter; the full stop bows out
      d.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(0)", opacity: 0 }], { duration: 300, delay: 500, fill: "forwards" })
      await Promise.all(
        Array.from(WORD).map(async (ch, i) => {
          await wait(i * 80)
          const l = L[i]
          if (i >= NAME.length) {
            l.textContent = ch
            l.style.width = ""
            await l.animate([{ opacity: 0, transform: "rotateX(-90deg)" }, { opacity: 1, transform: "rotateX(0deg)" }], { duration: 260, fill: "forwards", easing: "ease-out" }).finished
            return
          }
          if (l.textContent === ch) return
          await l.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(90deg)" }], { duration: 130, fill: "forwards", easing: "ease-in" }).finished
          l.textContent = ch
          await l.animate([{ transform: "rotateX(-90deg)" }, { transform: "rotateX(0deg)" }], { duration: 200, fill: "forwards", easing: "ease-out" }).finished
        }),
      )
      d.style.display = "none"
      await wait(380)
      if (cancelled) return

      // 5. glide onto the hero title and lift the curtain
      const title = document.getElementById("hero-title")
      const from = r.getBoundingClientRect()
      if (title) {
        const to = title.getBoundingClientRect()
        const s = to.width / from.width
        const tx = to.left + to.width / 2 - (from.left + from.width / 2)
        const ty = to.top + to.height / 2 - (from.top + from.height / 2)
        r.animate([{ transform: "none" }, { transform: `translate(${tx}px, ${ty}px) scale(${s})` }], { duration: 900, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" })
      }
      await el.animate([{ backgroundColor: "rgba(14,17,22,1)" }, { backgroundColor: "rgba(14,17,22,1)", offset: 0.55 }, { backgroundColor: "rgba(14,17,22,0)" }], { duration: 900, fill: "forwards" }).finished
      end()
    }

    run()
    const skip = () => {
      skipped.current = true
      end()
    }
    el.addEventListener("click", skip)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip()
    window.addEventListener("keydown", onKey)
    return () => {
      el.removeEventListener("click", skip)
      window.removeEventListener("keydown", onKey)
      cancelled = true
      document.documentElement.style.overflow = ""
    }
  }, [])

  return (
    <div ref={stage} aria-hidden="true" className="intro-overlay fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[#0e1116] select-none">
      <div ref={glow} className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(242,163,58,.16),transparent_70%)] opacity-0" />
      <div className="absolute inset-0 grid place-items-center px-4">
        <div ref={row} className="hero-word chrome-row flex items-baseline opacity-0 [perspective:800px]">
          {Array.from(WORD).map((_, i) => (
            <span
              key={i}
              ref={(n) => {
                if (n) letters.current[i] = n
              }}
              className="chrome inline-block origin-bottom"
            >
              {NAME[i] ?? ""}
            </span>
          ))}
          <span ref={dot} className="relative inline-block size-[0.17em] translate-y-[-0.02em] rounded-full bg-[#f2a33a]">
            <span ref={bar} className="absolute bottom-[160%] left-1/2 -ml-[0.07em] h-[0.62em] w-[0.14em] origin-bottom rounded-[0.03em] bg-gradient-to-b from-white to-[#d9a865] opacity-0" />
          </span>
        </div>
      </div>
      <span className="absolute right-5 bottom-5 font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">Click to skip</span>
    </div>
  )
}
