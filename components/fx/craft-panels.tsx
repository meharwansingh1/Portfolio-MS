"use client"
/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { asset } from "@/lib/data"
import { crafts } from "@/lib/showcase"
import { cn } from "@/lib/utils"

const COVERS: Record<string, string> = {
  "graphic-design": asset("/work/DeqFOaaB7zp.jpg"),
  "video-editing": asset("/work/DbNKXuaMsUM.jpg"),
  "motion-animation": "https://i.ytimg.com/vi/FQ76hjBlx78/maxresdefault.jpg",
  "ai-animation": asset("/work/De2-7D0BEHB.jpg"),
  web: asset("/mehar/img/look1.webp"),
}

/**
 * The five crafts as tall panels side by side. The one under the cursor (or
 * focused, or tapped) opens wide and comes into colour; the rest fold into
 * slim spines with their names running up the side.
 */
export function CraftPanels() {
  const [open, setOpen] = React.useState(0)
  return (
    <div className="flex h-auto flex-col gap-2 md:h-[min(72svh,40rem)] md:flex-row">
      {crafts.map((c, i) => {
        const on = open === i
        return (
          <Link
            key={c.id}
            href={`/showcase/#${c.id}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
            onFocus={() => setOpen(i)}
            onClick={(e) => {
              // on touch, the first tap opens a panel; the second follows the link
              if (!on && !window.matchMedia("(hover: hover)").matches) {
                e.preventDefault()
                setOpen(i)
              }
            }}
            className={cn(
              "group relative overflow-hidden rounded-[1.75rem] border border-border bg-card transition-[flex-grow,height] duration-700 ease-[cubic-bezier(.7,0,.2,1)] outline-none focus-visible:ring-2 focus-visible:ring-accent",
              on ? "h-[26rem] md:h-auto md:flex-[5]" : "h-20 md:h-auto md:flex-[1]",
            )}
          >
            <img
              src={COVERS[c.id]}
              alt=""
              loading="lazy"
              className={cn("absolute inset-0 size-full object-cover transition duration-700", on ? "scale-100 opacity-70 grayscale-0" : "scale-110 opacity-25 grayscale")}
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

            {/* folded: the name runs up the spine */}
            <span
              className={cn(
                "absolute inset-0 hidden items-end justify-center pb-6 transition-opacity duration-300 md:flex",
                on ? "opacity-0" : "opacity-100 delay-300",
              )}
            >
              <span className="font-display text-2xl whitespace-nowrap text-[#f3f0ea] [writing-mode:vertical-rl] rotate-180">{c.title}</span>
            </span>
            <span className={cn("absolute top-5 left-5 font-mono text-xs text-[#e2381b]", !on && "md:left-1/2 md:-translate-x-1/2")}>{String(i + 1).padStart(2, "0")}</span>

            {/* open: title, line, tools */}
            <span className={cn("absolute inset-x-0 bottom-0 p-6 text-[#f3f0ea] transition duration-500 sm:p-8", on ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0 md:opacity-0")}>
              <span className="block font-display text-4xl leading-none sm:text-6xl">{c.title}</span>
              <span className="mt-3 block max-w-md text-[#f3f0ea]/75">{c.line}</span>
              <span className="mt-5 flex flex-wrap items-center gap-2">
                {c.tools.map((t) => (
                  <span key={t} className="rounded-full border border-[#f3f0ea]/20 px-3 py-1 text-xs">
                    {t}
                  </span>
                ))}
                <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#e2381b] px-4 py-2 text-sm font-medium text-[#111111]">
                  See the work <ArrowUpRight className="size-4" />
                </span>
              </span>
            </span>
            {/* mobile, folded: the name on one line */}
            <span className={cn("absolute top-1/2 left-14 -translate-y-1/2 font-display text-2xl text-[#f3f0ea] md:hidden", on && "hidden")}>{c.title}</span>
          </Link>
        )
      })}
    </div>
  )
}
