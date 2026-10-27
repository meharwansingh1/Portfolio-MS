"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { ArrowRight, ArrowUpRight, Expand, Globe, Play, X } from "lucide-react"
import { crafts, legacyHash, pieces, type Craft, type CraftId, type Piece } from "@/lib/showcase"
import { cn } from "@/lib/utils"
import { CursorLabel, VelocitySkew } from "@/components/fx/cursor"
import { Reveal } from "./reveal"

type Filter = "all" | CraftId

const where = (p: Piece) => (p.href.includes("youtube") ? "YouTube" : p.href.includes("instagram") ? "Instagram" : "the site")
const inCraft = (id: CraftId) => pieces.filter((p) => p.craft === id)
/** a preview that takes turns between groups, so every client shows up */
function sampler(list: Piece[], n: number) {
  const queues = groupsOf(list).map(([, l]) => [...l])
  const out: Piece[] = []
  while (out.length < n && queues.some((q) => q.length)) for (const q of queues) if (q.length && out.length < n) out.push(q.shift()!)
  return out
}

/** pieces of one craft, grouped by who they were for, in first-seen order */
function groupsOf(list: Piece[]) {
  const map = new Map<string, Piece[]>()
  for (const p of list) map.set(p.group, [...(map.get(p.group) ?? []), p])
  return [...map.entries()]
}

/* ------------------------------------------------------------------ cover */

function Cover({ piece }: { piece: Piece }) {
  const [failed, setFailed] = React.useState(false)
  const ref = React.useRef<HTMLImageElement>(null)
  React.useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) queueMicrotask(() => setFailed(true))
  }, [])

  if (!piece.cover || failed) {
    const web = piece.craft === "web"
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between p-5 pt-12 text-white",
          web
            ? "bg-[radial-gradient(120%_100%_at_0%_0%,#7d9ae6_0%,#1d2f6b_45%,#070a12_100%)]"
            : "bg-[radial-gradient(120%_100%_at_0%_0%,#3f63ff_0%,#1a2366_50%,#070a12_100%)]",
        )}
      >
        {web ? <Globe className="size-6 opacity-70" /> : piece.kind === "link" ? <ArrowUpRight className="size-6 opacity-70" /> : <Play className="size-6 opacity-70" />}
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
      className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
    />
  )
}

/* ------------------------------------------------------------------- card */

function Card({ piece, onOpen }: { piece: Piece; onOpen: (p: Piece) => void }) {
  const Icon = piece.kind === "video" ? Play : piece.kind === "image" ? Expand : ArrowUpRight
  const still = piece.kind === "image" && !!piece.cover
  return (
    <button
      type="button"
      onClick={() => onOpen(piece)}
      data-cursor={piece.kind === "video" ? "Play" : piece.kind === "image" ? "View" : "Open"}
      className={cn(
        "group relative block w-full overflow-hidden rounded-[1.5rem] bg-muted [@media(hover:hover)_and_(pointer:fine)]:cursor-none text-left outline-none ring-accent ring-offset-4 ring-offset-background focus-visible:ring-2",
        piece.shape === "tall" ? "aspect-[9/16]" : "aspect-video",
      )}
    >
      <Cover piece={piece} />
      {/* stills are design work: keep them clean and show the caption only on hover */}
      <span
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent transition duration-500",
          still ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-90 group-hover:opacity-100",
        )}
      />

      <span className={cn("absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] text-white backdrop-blur-md transition duration-500", still && "opacity-0 group-hover:opacity-100")}>
        {piece.note}
      </span>

      <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 [@media(hover:hover)_and_(pointer:fine)]:hidden -translate-y-1/2 scale-75 place-items-center rounded-full bg-white/95 text-black opacity-0 shadow-2xl transition duration-500 group-hover:scale-100 group-hover:opacity-100">
        <Icon className={cn("size-5", piece.kind === "video" && "ml-0.5 fill-current")} />
      </span>

      <span className={cn("absolute inset-x-0 bottom-0 p-4 text-white transition duration-500", still && "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100")}>
        {piece.collab ? <span className="mb-1.5 block text-[11px] text-white/75">Collab {piece.collab}</span> : null}
        <span className="block font-display text-lg leading-tight">{piece.title}</span>
      </span>
    </button>
  )
}

/* --------------------------------------------------------------- lightbox */

function Viewer({ piece, onClose }: { piece: Piece; onClose: () => void }) {
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
  const craft = crafts.find((c) => c.id === piece.craft)!
  // rendered straight into <body> so no page layer or the nav can sit above it
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={piece.title} className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button type="button" aria-label="Close" onClick={onClose} className="page-in absolute inset-0 bg-black/85 backdrop-blur-xl" />
      <div className="page-in relative flex max-h-full w-full flex-col items-center gap-4 [animation-duration:.5s] md:flex-row md:items-stretch md:justify-center md:gap-8">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-3xl bg-black shadow-2xl",
            tall ? "aspect-[9/16] max-h-[78vh] max-w-[min(420px,44vh)]" : "aspect-video max-w-4xl",
          )}
        >
          {piece.kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={piece.view} alt={piece.title} className="absolute inset-0 size-full object-contain" />
          ) : (
            <iframe src={piece.view} title={piece.title} className="absolute inset-0 size-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          )}
        </div>
        <div className="flex w-full max-w-sm flex-col justify-end text-white md:pb-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">{craft.title}</p>
          <h3 className="mt-2 font-display text-3xl leading-tight">{piece.title}</h3>
          <p className="mt-1 text-white/70">
            {piece.note} · {piece.group}
          </p>
          {piece.collab ? <p className="mt-3 text-sm text-white/80">In collaboration {piece.collab}</p> : null}
          <p className="mt-3 text-sm text-white/60">Made with {craft.tools.join(", ")}</p>
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
        aria-label="Close viewer"
        className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:rotate-90 hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
    </div>,
    document.body,
  )
}

/* ---------------------------------------------------------------- a craft */

function Grid({ list, onOpen }: { list: Piece[]; onOpen: (p: Piece) => void }) {
  const allWide = list.every((p) => p.shape === "wide")
  const allTall = list.every((p) => p.shape === "tall")
  if (allWide)
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <div key={p.id} className="page-in" style={{ animationDelay: Math.min(i, 9) * 40 + "ms" }}>
            <Card piece={p} onOpen={onOpen} />
          </div>
        ))}
      </div>
    )
  if (allTall)
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((p, i) => (
          <div key={p.id} className="page-in" style={{ animationDelay: Math.min(i, 9) * 40 + "ms" }}>
            <Card piece={p} onOpen={onOpen} />
          </div>
        ))}
      </div>
    )
  // a mix of wide and tall: masonry columns
  return (
    <div className="columns-2 gap-4 lg:columns-4">
      {list.map((p, i) => (
        <div key={p.id} className="page-in mb-4 break-inside-avoid" style={{ animationDelay: Math.min(i, 12) * 40 + "ms" }}>
          <Card piece={p} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}

function CraftSection({ craft, index, preview, onOpen, onMore }: { craft: Craft; index: number; preview: boolean; onOpen: (p: Piece) => void; onMore: () => void }) {
  const all = inCraft(craft.id)
  const PREVIEW = 8
  return (
    <section id={craft.id} className="scroll-mt-40 border-t border-border pt-14 pb-20 first:border-t-0 first:pt-4">
      <Reveal className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl">{craft.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">{craft.line}</p>
        </div>
        <ul className="flex flex-wrap gap-2 md:justify-end">
          {craft.tools.map((t) => (
            <li key={t} className="rounded-full border border-border px-3 py-1.5 text-xs">
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      {preview ? (
        <>
          <Grid list={sampler(all, PREVIEW)} onOpen={onOpen} />
          {all.length > PREVIEW ? (
            <div className="mt-8 flex justify-center">
              <button type="button" onClick={onMore} className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-foreground hover:gap-3">
                See all {craft.title.toLowerCase()} <ArrowRight className="size-4" />
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="space-y-12">
          {groupsOf(all).map(([group, list]) => (
            <div key={group}>
              <h3 className="mb-5 flex items-center gap-3 text-sm font-medium">
                <span className="size-1.5 rounded-full bg-accent" />
                {group}
              </h3>
              <Grid list={list} onOpen={onOpen} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------- page */

export function Showcase() {
  const [filter, setFilter] = React.useState<Filter>("all")
  const [open, setOpen] = React.useState<Piece | null>(null)

  // the URL hash picks the craft, so other pages can link straight to one
  React.useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1)
      const id = (legacyHash[h] ?? h) as CraftId
      if (crafts.some((c) => c.id === id)) setFilter(id)
    }
    read()
    window.addEventListener("hashchange", read)
    return () => window.removeEventListener("hashchange", read)
  }, [])

  const choose = (f: Filter) => {
    setFilter(f)
    history.replaceState(null, "", f === "all" ? window.location.pathname : "#" + f)
    document.getElementById("work-wall")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const openPiece = React.useCallback((p: Piece) => {
    if (p.kind === "link") window.open(p.href, "_blank", "noopener,noreferrer")
    else setOpen(p)
  }, [])

  const shown = filter === "all" ? crafts : crafts.filter((c) => c.id === filter)

  return (
    <>
      {/* ---------- the five crafts ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {crafts.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <button
                type="button"
                onClick={() => choose(c.id)}
                className="group flex h-full w-full flex-col rounded-3xl border border-border bg-card p-5 text-left transition hover:-translate-y-1 hover:border-foreground/30"
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-6 font-display text-2xl leading-tight">{c.title}</span>
                <span className="mt-2 flex-1 text-sm text-muted-foreground">{c.tools.join(" · ")}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition group-hover:text-foreground">
                  View <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- tabs ---------- */}
      <div id="work-wall" className="sticky top-20 z-30 scroll-mt-24 px-4">
        <div className="mx-auto flex max-w-6xl justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-background/75 p-1.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,.4)] backdrop-blur-xl [scrollbar-width:none]">
            {[{ id: "all" as Filter, title: "Everything" }, ...crafts].map((c) => {
              const on = c.id === filter
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => choose(c.id)}
                  aria-pressed={on}
                  className={cn("shrink-0 rounded-full px-4 py-2 text-sm transition", on ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
                >
                  {c.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ---------- the work, craft by craft ---------- */}
      <VelocitySkew key={filter} className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        {shown.map((c) => (
          <CraftSection key={c.id} craft={c} index={crafts.indexOf(c)} preview={filter === "all"} onOpen={openPiece} onMore={() => choose(c.id)} />
        ))}
      </VelocitySkew>
      <CursorLabel />

      {open ? <Viewer piece={open} onClose={() => setOpen(null)} /> : null}
    </>
  )
}
