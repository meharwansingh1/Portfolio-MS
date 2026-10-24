"use client"

import * as React from "react"

/** Cycles through words in place, each sliding up into view. */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])

  return (
    <span className="relative inline-grid overflow-hidden text-left align-bottom">
      {/* the widest word reserves the space, so the line never jumps */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span key={i} aria-live="polite" className="word-in col-start-1 row-start-1 text-accent">
        {words[i]}
      </span>
    </span>
  )
}
