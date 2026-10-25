import { cn } from "@/lib/utils"

/**
 * A designed cover for an early project: a browser window holding the
 * project's name, so the card reads as a piece of work rather than a blank.
 */
export function EarlyCover({ title, kind, year, tone }: { title: string; kind: string; year: string; tone: "travel" | "behance" }) {
  const travel = tone === "travel"
  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden p-5 sm:p-7",
        travel ? "bg-[linear-gradient(160deg,#9cc9ff_0%,#e9f3ff_55%,#f6f8fb_100%)]" : "bg-[linear-gradient(160deg,#0b1230_0%,#1d2f6b_55%,#2245d6_100%)]",
      )}
    >
      {/* the window */}
      <div className={cn("relative h-full overflow-hidden rounded-xl border shadow-xl", travel ? "border-black/10 bg-white" : "border-white/15 bg-[#0d1220]")}>
        <div className={cn("flex items-center gap-1.5 border-b px-3 py-2", travel ? "border-black/5" : "border-white/10")}>
          <i className="size-2 rounded-full bg-[#ff5f57]" />
          <i className="size-2 rounded-full bg-[#febc2e]" />
          <i className="size-2 rounded-full bg-[#28c840]" />
          <span className={cn("ml-2 h-2 w-1/3 rounded-full", travel ? "bg-black/5" : "bg-white/10")} />
        </div>
        {travel ? (
          <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-3/4 w-full" aria-hidden="true">
            <circle cx="320" cy="48" r="20" fill="#fff4c2" />
            <path d="M0 110 L70 60 L130 95 L210 40 L290 90 L340 65 L400 95 V150 H0Z" fill="#7a86b8" />
            <path d="M210 40 L226 54 L218 57 L210 49 L202 57 L194 54Z" fill="#fff" />
            <path d="M0 135 L90 100 L170 128 L260 98 L400 132 V150 H0Z" fill="#3d4778" />
          </svg>
        ) : (
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2" aria-hidden="true">
            {[0, 1, 2].map((k) => (
              <span key={k} className={cn("aspect-[4/3] rounded-md", k === 1 ? "bg-[#2245d6]/70" : "bg-white/10")} />
            ))}
          </div>
        )}
        <div className="relative px-4 pt-3">
          <p className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", travel ? "text-black/45" : "text-white/50")}>
            {kind} · {year}
          </p>
          <p className={cn("mt-1 font-display text-xl sm:text-2xl", travel ? "text-[#0b0f1a]" : "text-white")}>{title}</p>
        </div>
      </div>
    </div>
  )
}
