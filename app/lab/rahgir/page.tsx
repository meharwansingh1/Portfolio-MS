import type { Metadata } from "next"
import "@fontsource/space-grotesk/400.css"
import "@fontsource/space-grotesk/500.css"
import "@fontsource/space-grotesk/700.css"
import { ArrowDown, Compass, Map, Sparkles } from "lucide-react"
import { LabBar, LabFooterNote } from "@/components/lab/lab-bar"
import { MoodPicker, TripBuilder } from "@/components/lab/rahgir"
import { Reveal } from "@/components/site/reveal"

export const metadata: Metadata = {
  title: "Rahgir — concept website",
  description: "A concept website for Rahgir, a fictional travel-planning brand.",
}

const steps = [
  { icon: Compass, t: "Pick a mood", d: "Mountains, coast, desert or rainforest — start with a feeling, not a map." },
  { icon: Map, t: "Shape the trip", d: "Choose the days and the people. The plan adjusts as you go." },
  { icon: Sparkles, t: "Just go", d: "Every stay, ride and sunrise, lined up in one simple itinerary." },
]

const faqs = [
  { q: "Is Rahgir a real company?", a: "No — Rahgir is a fictional brand, created to design and build this concept website." },
  { q: "What is this page showing?", a: "A playful, interactive travel landing page: mood tabs, illustrated postcards drawn in code, and a live trip estimator." },
  { q: "How was it built?", a: "With Next.js and Tailwind CSS. The landscapes are SVG, so the whole page loads without a single photo." },
]

export default function RahgirConcept() {
  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#111]" style={{ fontFamily: '"Space Grotesk", ui-sans-serif, sans-serif' }}>
      <LabBar tone="light" />

      {/* ---------- hero ---------- */}
      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute top-24 -right-20 size-72 rounded-full bg-[#ff5c8a]" />
        <div aria-hidden="true" className="absolute bottom-10 -left-16 size-56 rounded-[3rem] bg-[#c6f36d] rotate-12" />
        <div aria-hidden="true" className="absolute top-1/2 right-1/4 size-24 rounded-full border-2 border-[#111]" />

        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <span className="text-2xl font-bold tracking-tight">rahgir.</span>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#moods" className="hidden hover:underline sm:inline">Moods</a>
            <a href="#plan" className="hidden hover:underline sm:inline">Plan</a>
            <a href="#plan" className="rounded-full border-2 border-[#111] bg-[#111] px-5 py-2 text-[#fffdf7] shadow-[3px_3px_0_#ff5c8a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
              Plan a trip
            </a>
          </div>
        </nav>

        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-28 sm:px-8 md:pt-24">
          <p className="page-in inline-block rounded-full border-2 border-[#111] bg-[#fffdf7] px-4 py-1.5 text-sm font-medium">Trips planned by mood ✦</p>
          <h1 className="page-in mt-8 max-w-4xl text-6xl leading-[0.95] font-bold tracking-tight sm:text-8xl [animation-delay:.15s]">
            Don&apos;t pick a place.
            <br />
            <span className="relative inline-block">
              Pick a <span className="relative z-10">feeling.</span>
              <span aria-hidden="true" className="absolute right-0 bottom-2 left-[47%] h-5 -rotate-1 bg-[#c6f36d] sm:h-7" />
            </span>
          </h1>
          <p className="page-in mt-8 max-w-lg text-xl text-[#111]/70 [animation-delay:.3s]">
            Tell Rahgir how you want to feel, and get a trip across India that matches — in three taps.
          </p>
          <a href="#moods" className="page-in mt-10 inline-flex items-center gap-2 rounded-full border-2 border-[#111] bg-[#ff5c8a] px-7 py-4 font-bold shadow-[5px_5px_0_#111] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none [animation-delay:.45s]">
            Find my trip <ArrowDown className="size-4" />
          </a>
        </div>
      </header>

      {/* ---------- moods ---------- */}
      <section id="moods" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-20 sm:px-8">
        <Reveal className="mb-10">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">What&apos;s the mood?</h2>
        </Reveal>
        <MoodPicker />
      </section>

      {/* ---------- how ---------- */}
      <section className="border-y-2 border-[#111] bg-[#111] text-[#fffdf7]">
        <div className="mx-auto grid max-w-6xl gap-px px-5 py-20 sm:px-8 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 100} className="py-6">
              <span className="grid size-14 place-items-center rounded-2xl bg-[#c6f36d] text-[#111]">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-3xl font-bold">{s.t}</h3>
              <p className="mt-2 text-[#fffdf7]/65">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- planner ---------- */}
      <section id="plan" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-24 sm:px-8">
        <Reveal className="mb-10">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">Build it in seconds.</h2>
        </Reveal>
        <TripBuilder />
      </section>

      {/* ---------- faq ---------- */}
      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <h2 className="mb-6 text-3xl font-bold">Good to know</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-3xl border-2 border-[#111] bg-[#fffdf7] p-5 open:shadow-[5px_5px_0_#111]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-[#111] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[#111]/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-[#111] px-5 py-8 text-center sm:px-8">
        <LabFooterNote tone="light" />
      </footer>
    </div>
  )
}
