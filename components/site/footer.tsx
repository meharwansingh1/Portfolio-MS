import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { nav, site } from "@/lib/data"
import { NotOnHome } from "./not-on-home"

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <NotOnHome>
        <div className="mb-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Have an idea?</p>
            <Link href="/contact" className="group mt-3 inline-flex items-center gap-3 font-display text-5xl sm:text-6xl">
              Let&apos;s talk
              <ArrowUpRight className="size-10 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-foreground">LinkedIn</a>
            </li>
            <li>
              <a href={site.behance} target="_blank" rel="noreferrer" className="transition hover:text-foreground">Behance</a>
            </li>
          </ul>
        </div>
        </NotOnHome>
        <p className="text-xs text-muted-foreground">© 2026 {site.name}. All rights reserved.</p>
      </div>
      <p aria-hidden="true" className="pointer-events-none -mb-[0.22em] select-none text-center font-display text-[22vw] leading-none text-foreground/[0.04]">
        Meharwan
      </p>
    </footer>
  )
}
