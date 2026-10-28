"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  // read the theme straight off <html>, and re-read whenever its class changes
  const dark = React.useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb)
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
      return () => mo.disconnect()
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  )

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark")
    const apply = () => {
      document.documentElement.classList.toggle("dark", next)
      try {
        localStorage.setItem("ms-theme", next ? "dark" : "light")
      } catch {}
    }
    // a circular wipe where the browser supports view transitions
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    if (doc.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) doc.startViewTransition(apply)
    else apply()
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition hover:rotate-12 hover:scale-105"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

/** Runs before paint so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem("ms-theme");var d=t?t==="dark":true;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`
