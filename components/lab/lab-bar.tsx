import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A slim bar on every concept site: back to the portfolio on one side,
 * an honest "concept website" credit on the other.
 */
export function LabBar({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark"
  return (
    <div
      className={cn(
        "relative z-50 flex items-center justify-between gap-4 px-4 py-2.5 font-mono text-[11px] tracking-wide sm:px-6",
        dark ? "bg-white/[0.06] text-white/70" : "bg-black/[0.04] text-black/60",
        className,
      )}
    >
      <Link href="/work/#web-lab" className={cn("inline-flex items-center gap-1.5 transition", dark ? "hover:text-white" : "hover:text-black")}>
        <ArrowLeft className="size-3.5" /> Meharwan Singh · Portfolio
      </Link>
      <span className="hidden sm:inline">Concept website · designed &amp; built with Next.js + Tailwind CSS</span>
    </div>
  )
}

export function LabFooterNote({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <p className={cn("text-xs", tone === "dark" ? "text-white/40" : "text-black/45")}>
      A concept website designed and built by{" "}
      <Link href="/" className="underline underline-offset-4">
        Meharwan Singh
      </Link>
      .
    </p>
  )
}
