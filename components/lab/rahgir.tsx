"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

type Trip = {
  id: string
  mood: string
  place: string
  region: string
  /** postcard colours: sky, far hills, near hills */
  sky: [string, string]
  hills: [string, string]
  sun: string
  perDay: number
  days: { d: string; t: string }[]
}

const TRIPS: Trip[] = [
  {
    id: "mountains",
    mood: "Mountains",
    place: "Ladakh",
    region: "High desert, India",
    sky: ["#9cc9ff", "#e9f3ff"],
    hills: ["#7a86b8", "#3d4778"],
    sun: "#fff4c2",
    perDay: 4200,
    days: [
      { d: "Day 1", t: "Land in Leh, rest and acclimatise by the Shanti Stupa." },
      { d: "Day 2", t: "Over Khardung La to the dunes of Nubra Valley." },
      { d: "Day 3", t: "Sunrise at Pangong Tso, when the lake turns blue." },
    ],
  },
  {
    id: "coast",
    mood: "Coast",
    place: "Kerala",
    region: "Backwaters, India",
    sky: ["#ffc9a8", "#fff1e3"],
    hills: ["#3fa38a", "#1f6b5a"],
    sun: "#ffe08a",
    perDay: 3600,
    days: [
      { d: "Day 1", t: "Fort Kochi streets, Chinese fishing nets at sunset." },
      { d: "Day 2", t: "A night on a houseboat through the Alleppey backwaters." },
      { d: "Day 3", t: "Tea hills and misty mornings in Munnar." },
    ],
  },
  {
    id: "desert",
    mood: "Desert",
    place: "Rajasthan",
    region: "Thar Desert, India",
    sky: ["#ffb36b", "#ffe7c4"],
    hills: ["#e08a4c", "#b45a2c"],
    sun: "#fff3d1",
    perDay: 3900,
    days: [
      { d: "Day 1", t: "The blue lanes of Jodhpur under Mehrangarh Fort." },
      { d: "Day 2", t: "Jaisalmer's golden fort, a camel ride into the dunes." },
      { d: "Day 3", t: "A night under the stars at a Thar desert camp." },
    ],
  },
  {
    id: "northeast",
    mood: "Rainforest",
    place: "Meghalaya",
    region: "Northeast, India",
    sky: ["#a9e3c9", "#effaf4"],
    hills: ["#4f9a6e", "#245a3e"],
    sun: "#f6ffd1",
    perDay: 3300,
    days: [
      { d: "Day 1", t: "Shillong's cafés and the view from Laitlum." },
      { d: "Day 2", t: "Walk the living root bridges of Nongriat." },
      { d: "Day 3", t: "Crystal water at Dawki and Mawlynnong village." },
    ],
  },
]

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN")

/** A layered landscape drawn in SVG from a trip's colours — no photos needed. */
function Postcard({ trip }: { trip: Trip }) {
  const g = `sky-${trip.id}`
  return (
    <svg viewBox="0 0 400 260" className="size-full" role="img" aria-label={`Illustrated postcard of ${trip.place}`}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={trip.sky[0]} />
          <stop offset="1" stopColor={trip.sky[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${g})`} />
      <circle cx="300" cy="78" r="34" fill={trip.sun} />
      {trip.id === "coast" ? (
        <>
          <path d="M0 170 Q 100 140 200 165 T 400 158 V260 H0Z" fill={trip.hills[0]} />
          <path d="M0 205 Q 120 190 240 205 T 400 200 V260 H0Z" fill="#2f7fbf" opacity=".85" />
          <path d="M0 225 Q 120 215 240 228 T 400 222 V260 H0Z" fill="#1d5f99" />
        </>
      ) : trip.id === "desert" ? (
        <>
          <path d="M0 190 Q 90 140 180 185 T 400 175 V260 H0Z" fill={trip.hills[0]} />
          <path d="M0 220 Q 140 175 260 215 T 400 210 V260 H0Z" fill={trip.hills[1]} />
        </>
      ) : (
        <>
          <path d="M0 175 L70 110 L130 160 L210 80 L290 150 L340 115 L400 160 V260 H0Z" fill={trip.hills[0]} />
          <path d="M210 80 L232 100 L222 104 L210 92 L198 104 L188 100Z" fill="#ffffff" opacity={trip.id === "mountains" ? 0.95 : 0} />
          <path d="M0 215 L90 165 L170 205 L260 160 L400 210 V260 H0Z" fill={trip.hills[1]} />
        </>
      )}
    </svg>
  )
}

export function MoodPicker() {
  const [id, setId] = React.useState(TRIPS[0].id)
  const trip = TRIPS.find((t) => t.id === id)!
  return (
    <div>
      <div role="tablist" aria-label="Pick a mood" className="flex flex-wrap gap-2">
        {TRIPS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === id}
            onClick={() => setId(t.id)}
            className={cn(
              "rounded-full border-2 px-5 py-2.5 text-sm font-medium transition",
              t.id === id ? "border-[#111] bg-[#111] text-[#fffdf7]" : "border-[#111]/15 hover:border-[#111]/50",
            )}
          >
            {t.mood}
          </button>
        ))}
      </div>

      <div key={trip.id} className="page-in mt-8 grid gap-6 md:grid-cols-[1.15fr_1fr]">
        <div className="overflow-hidden rounded-[2rem] border-2 border-[#111] shadow-[8px_8px_0_#111]">
          <div className="aspect-[400/260]">
            <Postcard trip={trip} />
          </div>
          <div className="flex items-end justify-between gap-4 border-t-2 border-[#111] bg-[#fffdf7] p-5">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#111]/50 uppercase">{trip.region}</p>
              <p className="text-4xl font-bold tracking-tight">{trip.place}</p>
            </div>
            <p className="text-right text-sm">
              from <b className="text-lg">{inr(trip.perDay)}</b>
              <br />
              <span className="text-[#111]/50">per person / day</span>
            </p>
          </div>
        </div>
        <ol className="space-y-3">
          {trip.days.map((d, i) => (
            <li key={d.d} className="page-in rounded-3xl border-2 border-[#111] bg-[#fffdf7] p-5" style={{ animationDelay: 120 + i * 90 + "ms" }}>
              <p className="text-xs font-bold tracking-[0.2em] text-[#ff5c8a] uppercase">{d.d}</p>
              <p className="mt-1 text-lg leading-snug font-medium">{d.t}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function TripBuilder() {
  const [days, setDays] = React.useState(5)
  const [people, setPeople] = React.useState(2)
  const [trip, setTrip] = React.useState(TRIPS[0].id)
  const t = TRIPS.find((x) => x.id === trip)!
  const total = t.perDay * days * people

  return (
    <div className="grid gap-6 rounded-[2rem] border-2 border-[#111] bg-[#c6f36d] p-6 shadow-[8px_8px_0_#111] sm:p-10 md:grid-cols-[1.3fr_1fr]">
      <div className="space-y-8">
        <label className="block">
          <span className="text-sm font-bold">Where to?</span>
          <select value={trip} onChange={(e) => setTrip(e.target.value)} className="mt-2 w-full rounded-2xl border-2 border-[#111] bg-[#fffdf7] px-4 py-3 text-lg font-medium">
            {TRIPS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.place}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex justify-between text-sm font-bold">
            How many days? <span>{days}</span>
          </span>
          <input type="range" min={2} max={14} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-3 w-full accent-[#111]" />
        </label>

        <div>
          <span className="text-sm font-bold">Travellers</span>
          <div className="mt-2 flex w-fit items-center gap-4 rounded-2xl border-2 border-[#111] bg-[#fffdf7] px-2 py-1.5">
            <button aria-label="One fewer traveller" onClick={() => setPeople((p) => Math.max(1, p - 1))} className="grid size-9 place-items-center rounded-xl hover:bg-[#111]/10">
              <Minus className="size-4" />
            </button>
            <span className="w-6 text-center text-lg font-bold">{people}</span>
            <button aria-label="One more traveller" onClick={() => setPeople((p) => Math.min(10, p + 1))} className="grid size-9 place-items-center rounded-xl hover:bg-[#111]/10">
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-3xl border-2 border-[#111] bg-[#fffdf7] p-6">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#111]/50 uppercase">Sample estimate</p>
          <p aria-live="polite" className="mt-2 text-5xl font-bold tracking-tight tabular-nums">
            {inr(total)}
          </p>
          <p className="mt-2 text-sm text-[#111]/60">
            {t.place} · {days} days · {people} {people === 1 ? "traveller" : "travellers"}
          </p>
        </div>
        <p className="mt-6 text-xs text-[#111]/50">A concept: prices are illustrative, not a real offer.</p>
      </div>
    </div>
  )
}
