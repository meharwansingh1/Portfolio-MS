"use client"

import * as React from "react"
import GlassFolder, { type ArtPreset, type ArtRecipe, type FolderArt, type FolderFile, type GlassFolderProps } from "@/components/ui/glass-folder-cards"

/** The site's own palette for folder artwork: the warm presets are swapped for blues. */
const BLUES: Partial<Record<ArtPreset, ArtRecipe>> = {
  // deep Nihang-blue ink folding through night
  ember: { style: "marble", colors: ["#05070d", "#0f1a3a", "#1f3bb3", "#0a0f1f", "#3f63ff", "#9fb4ff", "#e8eeff"], scale: 0.62, warp: 3.2, angle: -0.5, gloss: 0.55, veins: 0.6 },
  // a cool long exposure: frost, royal blue and steel
  aurora: { style: "streak", colors: ["#f4f7fd", "#c9d6f5", "#2245d6", "#0b1230", "#1d2f6b", "#7d9ae6", "#eef2fb"], scale: 0.7, warp: 1.4, angle: -0.62, gloss: 0.18, veins: 0 },
  // indigo and periwinkle, swirled
  dusk: { style: "marble", colors: ["#0b0a1a", "#28235c", "#6b6fd6", "#141233", "#3a4fc9", "#b8c3f2", "#f1f3ff"], scale: 0.75, warp: 3.6, angle: 0.8, gloss: 0.5, veins: 0.5 },
}
const blue = <T extends FolderArt | ArtRecipe | undefined>(art: T): T => (typeof art === "string" && art in BLUES ? (BLUES[art as ArtPreset] as T) : art)
const blueFiles = (files?: FolderFile[]) => files?.map((f) => ({ ...f, art: blue(f.art) }))

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
      <GlassFolder {...props} art={blue(props.art)} files={blueFiles(props.files)} width={w} />
    </div>
  )
}
