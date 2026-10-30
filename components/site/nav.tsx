"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { nav, site } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
  const path = usePathname()
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  // over the dark cover at the top of Home, the bar switches to light-on-dark
  const [cover, setCover] = React.useState(false)

  // close the mobile menu whenever the route changes
  const [lastPath, setLastPath] = React.useState(path)
  if (path !== lastPath) {
    setLastPath(path)
    setOpen(false)
  }
  React.useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24)
      const c = document.querySelector("[data-cover]")
      setCover(!!c && c.getBoundingClientRect().bottom > 60)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    const id = setTimeout(on, 50)
    return () => {
      clearTimeout(id)
      window.removeEventListener("scroll", on)
    }
  }, [path])

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href))
  const dark = cover && !open

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500",
          scrolled
            ? dark
              ? "border-white/10 bg-black/40 backdrop-blur-xl"
              : "border-border bg-background/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,.35)] backdrop-blur-xl"
            : "border-transparent",
          dark && "text-white [&_.nav-mute]:text-white/60 [&_.nav-mute:hover]:text-white",
        )}
      >
        <Link href="/" className="group flex items-center gap-2 pl-2" aria-label="Home">
          <span className={cn("grid size-9 place-items-center rounded-full font-display text-lg transition group-hover:rotate-[-8deg]", dark ? "bg-white text-[#111111]" : "bg-foreground text-background")}>
            {site.short}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active(l.href) ? (dark ? "bg-white text-[#111111]" : "bg-foreground text-background") : "nav-mute text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden items-center gap-1 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition hover:gap-2 sm:flex"
          >
            Hire me <ArrowUpRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn("grid size-10 place-items-center rounded-full border md:hidden", dark ? "border-white/20" : "border-border")}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* full-screen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 -z-10 flex flex-col justify-center bg-background px-8 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] md:hidden",
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]",
        )}
      >
        <ul className="space-y-2">
          {nav.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: open ? 150 + i * 60 + "ms" : "0ms" }} className={cn("transition duration-500", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}>
              <Link href={l.href} className="flex items-baseline gap-4 py-1">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <span className={cn("font-display text-5xl", active(l.href) && "text-accent")}>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
