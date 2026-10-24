"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * "Meharwan Singh" in handwriting that signs itself, left to right, the first
 * time it scrolls into view — then a single pen stroke underlines it.
 */
export function Signature({ className }: { className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [signed, setSigned] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSigned(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} data-signed={signed || undefined} className={cn("signature relative inline-block", className)} aria-label="Signed, Meharwan Singh">
      <span aria-hidden="true" className="signature-ink block whitespace-nowrap px-[0.15em] font-signature leading-[1.25]">
        Meharwan Singh
      </span>
      <svg aria-hidden="true" viewBox="0 0 400 24" preserveAspectRatio="none" className="signature-stroke absolute -bottom-[0.05em] left-[4%] h-[0.22em] w-[88%] overflow-visible">
        <path d="M2 16 C 80 4, 170 22, 250 10 S 360 6, 398 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength={1} />
      </svg>
    </span>
  )
}
