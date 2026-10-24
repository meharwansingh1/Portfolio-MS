"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/** Fades and un-blurs its children the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: React.ElementType
}) {
  const ref = React.useRef<HTMLElement>(null)
  const [shown, setShown] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} data-shown={shown || undefined} className={cn("reveal", className)} style={{ transitionDelay: delay + "ms" }}>
      {children}
    </Tag>
  )
}

/** Splits a line into letters that rise in one after another. */
export function RiseText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={cn("rise", className)} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ animationDelay: delay + i * 35 + "ms" }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  )
}
