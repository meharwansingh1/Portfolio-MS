import Link from "next/link"
import GlassFolder from "@/components/ui/glass-folder-cards"

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center gap-10 px-4 pt-32 text-center">
      <GlassFolder label="Empty folder" meta="404" art="glacier" action="none" files={[]} width={300} />
      <div>
        <h1 className="font-display text-6xl italic">Nothing filed here.</h1>
        <Link href="/" className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm text-background">
          Back home
        </Link>
      </div>
    </section>
  )
}
