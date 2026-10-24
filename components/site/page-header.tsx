import { RiseText } from "./reveal"

export function PageHeader({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-36 pb-12 sm:px-6 sm:pt-44">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-border" />
        {eyebrow}
      </div>
      <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight sm:text-8xl md:text-9xl">
        <RiseText text={title} />
      </h1>
      {intro ? <p className="page-in mt-8 max-w-xl text-lg text-muted-foreground [animation-delay:.4s]">{intro}</p> : null}
    </section>
  )
}
