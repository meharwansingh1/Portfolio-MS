"use client"

import * as React from "react"
import GlassFolder, { type GlassFolderProps } from "@/components/ui/glass-folder-cards"

/**
 * The glass folder takes a fixed pixel width. This wrapper measures the space
 * it is given and hands it the largest width that fits, up to `max`, so the
 * folders never overflow a phone screen.
 */
export function FitFolder({ max = 340, ...props }: GlassFolderProps & { max?: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [w, setW] = React.useState(max)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.max(240, Math.min(max, Math.floor(e.contentRect.width)))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [max])
  return (
    <div ref={ref} className="flex w-full min-w-0 justify-center">
      <GlassFolder {...props} width={w} />
    </div>
  )
}
