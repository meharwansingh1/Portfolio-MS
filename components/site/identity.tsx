"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Reveal } from "./reveal"
import { Signature } from "./signature"

const palette = [
  { name: "Frost", hex: "#F6F8FB", note: "Where every idea starts", dark: false },
  { name: "Ink", hex: "#0B0F1A", note: "What gets said", dark: true },
  { name: "Nihang Blue", hex: "#2245D6", note: "What you remember", dark: true },
]

const wiring = [
  { from: "History", to: "the stories" },
  { from: "Graphic design", to: "the stills that stop the scroll" },
  { from: "Video editing", to: "the timing" },
  { from: "Motion & AI", to: "the worlds" },
  { from: "Web", to: "the home for all of it" },
]

function Swatch({ s }: { s: (typeof palette)[number] }) {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(s.hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${s.name} ${s.hex}`}
      className="group flex min-w-0 flex-1 flex-col justify-between rounded-2xl border border-border p-2.5 text-left transition hover:-translate-y-1"
      style={{ background: s.hex, color: s.dark ? "#F6F8FB" : "#0B0F1A" }}
    >
      <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] opacity-80">
        {s.name}
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5 opacity-0 transition group-hover:opacity-100" />}
      </span>
      <span className="mt-10">
        <span className="block truncate font-mono text-[11px]">{copied ? "Copied" : s.hex}</span>
        <span className="mt-0.5 block text-[11px] opacity-70">{s.note}</span>
      </span>
    </button>
  )
}

/**
 * Identity without a photo: a signature that writes itself, and a one-page
 * personal brand sheet — mark, palette, type and how the crafts connect.
 */
export function Identity() {
  return (
    <section id="identity" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6">
      <Reveal className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-accent">Identity</span> — no photo needed
        </p>
        <h2 className="mt-4 font-display text-5xl sm:text-6xl">The brand behind the work</h2>
      </Reveal>

      {/* signed */}
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-14 text-background sm:px-14 sm:py-20">
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-96 rounded-full bg-accent/40 blur-3xl" />
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(90deg,transparent,#000)]" />
        <p className="relative font-mono text-xs uppercase tracking-[0.2em] opacity-60">Signed</p>
        <div className="relative mt-4 text-[17vw] text-background sm:text-[7.5rem] lg:text-[9rem]">
          <Signature className="text-background [&_.signature-stroke]:text-accent" />
        </div>
        <p className="relative mt-8 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">
          History by degree. <span className="text-accent">Storytelling</span> by craft.
        </p>
      </Reveal>

      {/* the sheet */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={60} className="flex flex-col rounded-3xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">01 · Mark</p>
          <div className="my-8 grid flex-1 place-items-center">
            <span className="grid size-28 place-items-center rounded-full bg-foreground font-display text-5xl text-background ring-8 ring-accent/15 transition duration-700 hover:rotate-[-10deg]">
              MS
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Two letters in one circle — the mark on everything I ship.</p>
        </Reveal>

        <Reveal delay={120} className="flex flex-col rounded-3xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">02 · Palette</p>
          <div className="mt-5 flex min-w-0 flex-1 gap-1.5">
            {palette.map((s) => (
              <Swatch key={s.name} s={s} />
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Tap a colour to copy it.</p>
        </Reveal>

        <Reveal delay={180} className="flex flex-col rounded-3xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">03 · Type</p>
          <div className="mt-5 flex-1 space-y-4">
            <div>
              <p className="font-display text-5xl leading-none">Aa</p>
              <p className="mt-1 text-xs text-muted-foreground">Inter Tight · headlines</p>
            </div>
            <div>
              <p className="text-lg">The quick story</p>
              <p className="text-xs text-muted-foreground">Geist · reading</p>
            </div>
            <div>
              <p className="font-mono text-sm">01 · labels</p>
              <p className="text-xs text-muted-foreground">Geist Mono · details</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={240} className="flex flex-col rounded-3xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">04 · How I&apos;m wired</p>
          <ul className="mt-5 flex-1 space-y-3">
            {wiring.map((w) => (
              <li key={w.from} className="text-sm leading-snug">
                <span className="font-medium">{w.from}</span>
                <span className="text-accent"> → </span>
                <span className="text-muted-foreground">{w.to}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
