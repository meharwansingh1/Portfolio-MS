"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Shows your own photo from /public/images. Until it is there, a monogram
 * stands in so the layout never shows a broken image.
 */
export function Portrait({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = React.useState(false)
  const img = React.useRef<HTMLImageElement>(null)
  // the image may fail before React hydrates and attaches onError, so check once mounted
  React.useEffect(() => {
    const el = img.current
    if (el && el.complete && el.naturalWidth === 0) queueMicrotask(() => setFailed(true))
  }, [])
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={img} src={src} alt={alt} onError={() => setFailed(true)} className="absolute inset-0 size-full object-cover grayscale transition duration-700 hover:grayscale-0" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_30%_10%,#ff8a5c_0%,#a3201a_38%,#16252c_75%,#07090c_100%)]">
          <span className="font-display text-8xl text-white/90">MS</span>
        </div>
      )}
    </div>
  )
}
