"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { asset } from "@/lib/data"
import { cn } from "@/lib/utils"

/**
 * The hero's showreel: an editing suite in miniature. A program monitor plays
 * whatever clip the playhead is crossing on a four-track timeline (Graphic,
 * Edit, Motion, AI) built from real work. Hover the timeline to scrub it like
 * an editor; click a clip to open that craft on the Showcase page.
 */

type Clip = { track: number; from: number; to: number; title: string; img: string; tall?: boolean; craft: string }

const yt = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

const TRACKS = [
  { id: "V4", name: "AI Animation", craft: "ai-animation" },
  { id: "V3", name: "Motion", craft: "motion-animation" },
  { id: "V2", name: "Edit", craft: "video-editing" },
  { id: "V1", name: "Graphic", craft: "graphic-design" },
]

// laid out as a cascade, so the playhead climbs from track to track
const CLIPS: Clip[] = [
  { track: 3, from: 0.0, to: 0.125, title: "Podcast thumbnail", img: yt("nSyyCXZpXw4"), craft: "graphic-design" },
  { track: 2, from: 0.125, to: 0.25, title: "Podcast edit", img: yt("vaTk8Kx-EJo"), craft: "video-editing" },
  { track: 1, from: 0.25, to: 0.375, title: "Samudra Manthan", img: yt("FQ76hjBlx78"), craft: "motion-animation" },
  { track: 0, from: 0.375, to: 0.5, title: "Kharag Singh Yudh · Part 40", img: asset("/work/Dewq-vvTCi8.jpg"), tall: true, craft: "ai-animation" },
  { track: 3, from: 0.5, to: 0.625, title: "Dussehra Mahatam cover", img: asset("/work/DeqFOaaB7zp.jpg"), tall: true, craft: "graphic-design" },
  { track: 2, from: 0.625, to: 0.75, title: "Bali reel", img: asset("/work/DbNKXuaMsUM.jpg"), tall: true, craft: "video-editing" },
  { track: 1, from: 0.75, to: 0.875, title: "Mohini · Part 2", img: yt("DDlEpPzR6UY"), craft: "motion-animation" },
  { track: 0, from: 0.875, to: 1.0, title: "Kharag Singh Yudh · Part 41", img: asset("/work/De2-7D0BEHB.jpg"), tall: true, craft: "ai-animation" },
]

const LOOP = 24 // seconds for one pass of the playhead
const FPS = 25

function timecode(p: number) {
  const t = p * LOOP
  const s = Math.floor(t)
  const f = Math.floor((t - s) * FPS)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `00:00:${pad(s)}:${pad(f)}`
}

/** an image that quietly disappears (or swaps for a fallback) if it can't load — even if it failed before React hydrated */
function SafeImg({ src, className, fallback }: { src: string; className?: string; fallback?: React.ReactNode }) {
  const ref = React.useRef<HTMLImageElement>(null)
  const [ok, setOk] = React.useState(true)
  React.useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) queueMicrotask(() => setOk(false))
  }, [])
  if (!ok) return <>{fallback ?? null}</>
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt="" onError={() => setOk(false)} className={className} />
}

/** a clip on the monitor; a dark frame in brand colours if the cover can't load */
function Frame({ clip, className, blur }: { clip: Clip; className?: string; blur?: boolean }) {
  return (
    <SafeImg
      src={clip.img}
      className={cn("absolute inset-0 size-full", blur ? "scale-110 object-cover blur-2xl brightness-50" : clip.tall ? "object-contain" : "object-cover", className)}
      fallback={blur ? null : <div className={cn("absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,#ef4a2b_0%,#3e2850_55%,#0b0b0c_100%)]", className)} />}
    />
  )
}

export function HeroEditor() {
  const router = useRouter()
  const [p, setP] = React.useState(0)
  const scrub = React.useRef<number | null>(null)
  const lanes = React.useRef<HTMLDivElement>(null)

  // the playhead: runs on its own, or follows the pointer while scrubbing
  React.useEffect(() => {
    let raf = 0
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // no motion: park the playhead on one clip, still scrubbable by hand
      const hold = () => {
        setP(scrub.current ?? 0.42)
        raf = requestAnimationFrame(hold)
      }
      raf = requestAnimationFrame(hold)
      return () => cancelAnimationFrame(raf)
    }
    let last = performance.now()
    let pos = 0
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      pos = scrub.current ?? (pos + dt / LOOP) % 1
      setP(pos)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onMove = (e: React.PointerEvent) => {
    const r = lanes.current?.getBoundingClientRect()
    if (!r) return
    scrub.current = Math.min(0.999, Math.max(0, (e.clientX - r.left) / r.width))
  }

  const current = CLIPS.find((c) => p >= c.from && p < c.to) ?? CLIPS[0]
  const track = TRACKS[current.track]

  return (
    <div className="relative">
      {/* glow behind the window */}
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-[3rem] bg-accent/25 blur-3xl" />

      <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#111113] text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)]">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="flex gap-1.5">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" />
            <i className="size-2.5 rounded-full bg-[#febc2e]" />
            <i className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="truncate font-mono text-[11px] text-white/50">Meharwan_Singh_Showreel.prproj</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-white/60">
            <i className="size-1.5 animate-pulse rounded-full bg-[#ff3b30]" /> REC
          </span>
        </div>

        {/* program monitor */}
        <div className="p-3 pb-0 sm:p-4 sm:pb-0">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            {CLIPS.map((c) => {
              const on = c === current
              return (
                <div key={c.title} className={cn("absolute inset-0 transition-opacity duration-500", on ? "opacity-100" : "opacity-0")}>
                  {c.tall ? <Frame clip={c} blur /> : null}
                  <Frame clip={c} className={cn("transition-transform duration-[3000ms] ease-out", on ? "scale-105" : "scale-100")} />
                </div>
              )
            })}
            {/* safe-area brackets */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-3">
              <i className="absolute top-0 left-0 size-4 border-t border-l border-white/60" />
              <i className="absolute top-0 right-0 size-4 border-t border-r border-white/60" />
              <i className="absolute bottom-0 left-0 size-4 border-b border-l border-white/60" />
              <i className="absolute right-0 bottom-0 size-4 border-r border-b border-white/60" />
            </span>
            <span className="absolute top-4 left-5 rounded bg-black/55 px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] text-white/80 backdrop-blur">
              {track.id} · {track.name.toUpperCase()}
            </span>
            <span className="absolute top-4 right-5 font-mono text-[11px] text-white/90 tabular-nums">{timecode(p)}</span>
            <span className="absolute bottom-4 left-5 max-w-[70%] truncate text-sm font-medium drop-shadow">{current.title}</span>
          </div>
        </div>

        {/* timeline */}
        <div className="p-3 sm:p-4">
          {/* ruler */}
          <div className="ml-14 flex justify-between pb-1.5 font-mono text-[9px] text-white/35 sm:ml-20">
            {[0, 4, 8, 12, 16, 20].map((s) => (
              <span key={s}>00:{String(s).padStart(2, "0")}</span>
            ))}
          </div>
          <div className="relative flex">
            {/* track headers */}
            <div className="w-14 shrink-0 space-y-1 sm:w-20">
              {TRACKS.map((t, i) => (
                <div
                  key={t.id}
                  className={cn(
                    "flex h-8 items-center gap-1.5 rounded-l-md border-r border-white/10 bg-white/[0.04] px-2 font-mono text-[9px] transition-colors sm:h-9",
                    i === current.track ? "text-white" : "text-white/40",
                  )}
                >
                  <b className={cn("font-normal", i === current.track && "text-accent")}>{t.id}</b>
                  <span className="hidden truncate sm:inline">{t.name}</span>
                </div>
              ))}
              <div className="flex h-6 items-center rounded-l-md bg-white/[0.04] px-2 font-mono text-[9px] text-white/40">A1</div>
            </div>

            {/* lanes */}
            <div
              ref={lanes}
              onPointerMove={onMove}
              onPointerLeave={() => (scrub.current = null)}
              className="relative flex-1 cursor-ew-resize space-y-1"
              role="presentation"
            >
              {TRACKS.map((t, i) => (
                <div key={t.id} className="relative h-8 rounded-r-md bg-white/[0.025] sm:h-9">
                  {CLIPS.filter((c) => c.track === i).map((c) => {
                    const on = c === current
                    return (
                      <button
                        key={c.title}
                        type="button"
                        onClick={() => router.push("/showcase/#" + c.craft)}
                        title={c.title}
                        aria-label={`${c.title} — open ${t.name} in the showcase`}
                        className={cn(
                          "absolute inset-y-0.5 overflow-hidden rounded-md border text-left transition",
                          on ? "border-accent ring-1 ring-accent" : "border-white/15 hover:border-white/40",
                        )}
                        style={{ left: c.from * 100 + "%", width: (c.to - c.from) * 100 + "%" }}
                      >
                        <span className="absolute inset-0 flex">
                          {[0, 1, 2].map((k) => (
                            <SafeImg key={k} src={c.img} className="h-full min-w-0 flex-1 object-cover opacity-70" />
                          ))}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                        <span className="relative block truncate px-1.5 pt-0.5 text-[9px] font-medium text-white/90">{c.title}</span>
                      </button>
                    )
                  })}
                </div>
              ))}

              {/* audio: a waveform under everything */}
              <div className="relative h-6 overflow-hidden rounded-r-md bg-emerald-500/10">
                <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="absolute inset-0 size-full text-emerald-400/70">
                  {Array.from({ length: 100 }, (_, k) => {
                    const h = 3 + Math.abs(Math.sin(k * 0.9) * Math.cos(k * 0.23)) * 17
                    return <rect key={k} x={k * 2} y={12 - h / 2} width="1.1" height={h} fill="currentColor" />
                  })}
                </svg>
              </div>

              {/* playhead */}
              <div aria-hidden="true" className="pointer-events-none absolute -top-5 bottom-0 z-10 w-px bg-accent" style={{ left: p * 100 + "%" }}>
                <span className="absolute -top-1 -left-[5px] block size-[11px] rotate-45 rounded-[2px] bg-accent" />
              </div>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[10px] text-white/35">Hover the timeline to scrub · click a clip to open it</p>
        </div>
      </div>
    </div>
  )
}
