"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { ArrowUpRight, Globe, Play, X } from "lucide-react"
import { compact, filters, pieces, type Piece } from "@/lib/showcase"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

type FilterId = (typeof filters)[number]["id"]

const where = (p: Piece) => (p.href.includes("youtube") ? "YouTube" : p.href.includes("instagram") ? "Instagram" : "the site")

/* ------------------------------------------------------------------ cover */

function Cover({ piece, className }: { piece: Piece; className?: string }) {
  const [failed, setFailed] = React.useState(false)
  const ref = React.useRef<HTMLImageElement>(null)
  React.useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) queueMicrotask(() => setFailed(true))
  }, [])

  if (!piece.cover || failed) {
    // no picture: a typographic cover in the brand colours
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between p-5 pt-12 text-white",
          piece.channel === "Web"
            ? "bg-[radial-gradient(120%_100%_at_0%_0%,#6f97c2_0%,#22395e_45%,#0b0b0c_100%)]"
            : "bg-[radial-gradient(120%_100%_at_0%_0%,#ef4a2b_0%,#3e2850_50%,#0b0b0c_100%)]",
          className,
        )}
      >
        {piece.channel === "Web" ? <Globe className="size-6 opacity-70" /> : <Play className="size-6 opacity-70" />}
        <p className={cn("font-display text-5xl leading-none opacity-15", piece.shape === "wide" && "hidden")}>{piece.channel}</p>
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={piece.cover}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]", className)}
    />
  )
}

/* ------------------------------------------------------------------- card */

function Card({ piece, onOpen, big }: { piece: Piece; onOpen: (p: Piece) => void; big?: boolean }) {
  const playable = !!piece.embed
  return (
    <button
      type="button"
      onClick={() => onOpen(piece)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-[1.75rem] bg-muted text-left outline-none ring-accent ring-offset-4 ring-offset-background focus-visible:ring-2",
        piece.shape === "tall" ? "aspect-[9/16]" : "aspect-video",
      )}
    >
      <Cover piece={piece} />
      {/* legibility gradient */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 transition duration-500 group-hover:from-black/90" />

      {/* top row */}
      <span className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
        <span className="rounded-full bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
          {piece.format}
        </span>
        {piece.views ? (
          <span className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-medium text-black">
            {compact(piece.views)} {piece.href.includes("youtube") ? "views" : "plays"}
          </span>
        ) : null}
      </span>

      {/* play / open */}
      <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-white/95 text-black opacity-0 shadow-2xl transition duration-500 group-hover:scale-100 group-hover:opacity-100">
        {playable ? <Play className="ml-0.5 size-5 fill-current" /> : <ArrowUpRight className="size-5" />}
      </span>

      {/* caption */}
      <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
        {piece.collab ? (
          <span className="mb-2 inline-block rounded-full border border-white/30 px-2 py-0.5 text-[10px] tracking-wide text-white/90">
            Collab · {piece.collab.replace("with ", "")}
          </span>
        ) : null}
        <span className={cn("block font-display leading-tight", big ? "text-2xl sm:text-3xl" : "text-lg")}>{piece.title}</span>
        <span className="mt-1 block text-xs text-white/70">
          {piece.channel} · {piece.series}
        </span>
      </span>
    </button>
  )
}

/* --------------------------------------------------------------- lightbox */

function Player({ piece, onClose }: { piece: Piece; onClose: () => void }) {
  const closeRef = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const tall = piece.shape === "tall"
  // rendered straight into <body> so no page layer or the nav can sit above it
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={piece.title} className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button type="button" aria-label="Close" onClick={onClose} className="page-in absolute inset-0 bg-black/80 backdrop-blur-xl" />
      <div className="page-in relative flex max-h-full w-full flex-col items-center gap-4 [animation-duration:.5s] md:flex-row md:items-stretch md:justify-center md:gap-8">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-3xl bg-black shadow-2xl",
            tall ? "aspect-[9/16] max-h-[78vh] max-w-[min(420px,44vh)]" : "aspect-video max-w-4xl",
          )}
        >
          <iframe
            src={piece.embed}
            title={piece.title}
            className="absolute inset-0 size-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="flex w-full max-w-sm flex-col justify-end text-white md:pb-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            {piece.channel} · {piece.format}
          </p>
          <h3 className="mt-2 font-display text-3xl leading-tight">{piece.title}</h3>
          <p className="mt-1 text-white/70">{piece.series}</p>
          {piece.collab ? <p className="mt-3 text-sm text-white/80">In collaboration {piece.collab}</p> : null}
          {piece.views ? <p className="mt-3 font-mono text-sm text-white/80">{piece.views.toLocaleString("en-IN")} {piece.href.includes("youtube") ? "views" : "plays"}</p> : null}
          <a
            href={piece.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:gap-3"
          >
            Open on {where(piece)} <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close player"
        className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:rotate-90 hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
    </div>,
    document.body,
  )
}

/* ------------------------------------------------------------------- page */

export function Showcase() {
  const [filter, setFilter] = React.useState<FilterId>("all")
  const [open, setOpen] = React.useState<Piece | null>(null)

  // the URL hash picks the filter, so other pages can link straight to a series
  React.useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1)
      if (filters.some((f) => f.id === h)) setFilter(h as FilterId)
    }
    read()
    window.addEventListener("hashchange", read)
    return () => window.removeEventListener("hashchange", read)
  }, [])

  const choose = (id: FilterId) => {
    setFilter(id)
    history.replaceState(null, "", id === "all" ? window.location.pathname : "#" + id)
  }

  const openPiece = React.useCallback((p: Piece) => {
    if (p.embed) setOpen(p)
    else window.open(p.href, "_blank", "noopener,noreferrer")
  }, [])

  const active = filters.find((f) => f.id === filter)!
  const shown = pieces.filter(active.test)
  const top = [...pieces].filter((p) => p.views).sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 3)

  return (
    <>
      {/* ---------- most watched ---------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl sm:text-4xl">Most watched</h2>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Ranked by plays</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {top.map((p, i) => (
            <Reveal key={p.id} delay={i * 100} className="relative">
              <span className="pointer-events-none absolute -top-6 -left-2 z-10 font-display text-7xl text-foreground/10 sm:text-8xl">{i + 1}</span>
              <Card piece={p} onOpen={openPiece} big />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- filters ---------- */}
      <div className="sticky top-20 z-30 mt-24 px-4">
        <div className="mx-auto flex max-w-6xl justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-background/75 p-1.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,.4)] backdrop-blur-xl [scrollbar-width:none]">
            {filters.map((f) => {
              const n = pieces.filter(f.test).length
              const on = f.id === filter
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => choose(f.id)}
                  aria-pressed={on}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                    on ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.label}
                  <span className={cn("font-mono text-[10px]", on ? "opacity-60" : "opacity-50")}>{n}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ---------- the wall ---------- */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div key={filter} className="columns-2 gap-4 sm:gap-5 lg:columns-3 xl:columns-4">
          {shown.map((p, i) => (
            <div key={p.id} className="page-in mb-4 break-inside-avoid sm:mb-5" style={{ animationDelay: Math.min(i, 12) * 45 + "ms" }}>
              <Card piece={p} onOpen={openPiece} />
            </div>
          ))}
        </div>
      </section>

      {open ? <Player piece={open} onClose={() => setOpen(null)} /> : null}
    </>
  )
}
