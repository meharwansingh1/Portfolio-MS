"use client"

import * as React from "react"
import { noticeEnds } from "@/lib/data"
import { cn } from "@/lib/utils"

const END = new Date(noticeEnds).getTime()
const noop = () => () => {}

/**
 * True once the notice period is over. Read in the visitor's browser, so the
 * site switches over on 10 November without being rebuilt. The pre-rendered
 * HTML shows the notice-period text, which is correct until that day.
 */
export function useNoticeOver() {
  return React.useSyncExternalStore(noop, () => Date.now() >= END, () => false)
}

/** The short status line: "Serving notice · …" now, "Open to …" from 10 Nov 2026. */
export function AvailabilityText({ short }: { short?: boolean }) {
  const over = useNoticeOver()
  if (over) return <>Open to remote work &amp; freelance</>
  return <>{short ? "Open to remote & freelance from 10 Nov" : "Serving notice · open to remote & freelance from 10 Nov 2026"}</>
}

/** A pill with a status dot: amber while on notice, green once available. */
export function AvailabilityBadge({ className, short }: { className?: string; short?: boolean }) {
  const over = useNoticeOver()
  const dot = over ? "bg-emerald-500" : "bg-amber-500"
  return (
    <p className={cn("flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground", className)}>
      <span className="relative flex size-2">
        <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", dot)} />
        <span className={cn("relative inline-flex size-2 rounded-full", dot)} />
      </span>
      <AvailabilityText short={short} />
    </p>
  )
}

/** Hides its children once the notice period is over (for "right now" items that end then). */
export function UntilNoticeEnds({ children }: { children: React.ReactNode }) {
  return useNoticeOver() ? null : <>{children}</>
}
