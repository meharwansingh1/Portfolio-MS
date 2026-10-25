/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next"
import Link from "next/link"
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/700.css"
import { ArrowLeft, Plane } from "lucide-react"
import { TravelForm } from "@/components/lab/travel-form"
import { Reveal } from "@/components/site/reveal"
import { asset } from "@/lib/data"

export const metadata: Metadata = {
  title: "My Travel Vlogs",
  description: "A travel-vlog website template by Meharwan Singh.",
}

const img = (n: string) => asset(`/lab/travel/${n}.jpg`)

const places = [
  {
    name: "Golden Temple",
    where: "Amritsar, Punjab",
    image: "golden-temple",
    text: "Sri Harmandir Sahib glows on the Amrit Sarovar from dawn to night — the langar here feeds tens of thousands every single day.",
  },
  {
    name: "Hemkund Sahib",
    where: "Chamoli, Uttarakhand",
    image: "hemkund-sahib",
    text: "Situated in one of the most scenic spots in India, 4,600 m up in the Himalaya beside a glacial lake ringed by seven peaks.",
  },
  {
    name: "Kashmir",
    where: "Jammu & Kashmir",
    image: "kashmir",
    text: "Snow-dusted peaks, pine valleys and the still waters of Dal Lake — the valley people call paradise on earth.",
  },
]

const tips = [
  { q: "Stay in well-known areas of major cities and tourist sites", a: "Pick stays with good reviews close to the main sights, and keep a copy of your ID and bookings on your phone." },
  { q: "Travellers have been robbed and assaulted after consuming spiked drinks", a: "Never leave a drink unattended, and only accept food or drinks from people you trust." },
  { q: "Don't leave your bags unattended or accept food or parcels from strangers", a: "Keep valuables close in crowded places — railway stations, markets and gurdwara or temple queues." },
  { q: "Respect local customs at every holy place you visit", a: "Cover your head at gurdwaras, remove your shoes where asked, and dress modestly at places of worship." },
]

function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`text-lg font-bold tracking-tight ${className}`}>My Travel Vlogs</span>
}

export default function MyTravelVlogs() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#d9d9d9] text-[#1f1f1f]" style={{ fontFamily: '"Poppins", ui-sans-serif, sans-serif' }}>
      <div className="relative z-50 flex items-center justify-between gap-4 bg-[#1f1f1f] px-4 py-2.5 font-mono text-[11px] tracking-wide text-white/65 sm:px-6">
        <Link href="/work/" className="inline-flex items-center gap-1.5 transition hover:text-white">
          <ArrowLeft className="size-3.5" /> Meharwan Singh · Portfolio
        </Link>
        <span className="hidden sm:inline">Web template · HTML, CSS &amp; JavaScript</span>
      </div>

      {/* ---------- hero ---------- */}
      <header id="home" className="relative flex min-h-[92svh] flex-col overflow-hidden">
        <img src={img("golden-temple")} alt="The Golden Temple at sunset, Amritsar" className="page-in absolute inset-0 size-full scale-105 object-cover object-[center_35%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
        <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <Wordmark className="text-[#1f1f1f]" />
          <div className="flex items-center gap-7 text-sm font-medium">
            <a href="#places" className="hidden hover:underline md:inline">Places</a>
            <a href="#destinations" className="hidden hover:underline md:inline">Destinations</a>
            <a href="#tips" className="hidden hover:underline md:inline">Travel tips</a>
            <a href="#contact" className="rounded-md border-2 border-[#1f1f1f] px-6 py-2 transition hover:bg-[#1f1f1f] hover:text-white">
              Contact
            </a>
          </div>
        </nav>
        <div className="relative mx-auto mt-auto w-full max-w-6xl px-5 pb-14 sm:px-8">
          <p className="page-in text-sm font-medium tracking-[0.3em] text-white/85 uppercase [animation-delay:.2s]">Amritsar · Punjab</p>
          <h1 className="page-in mt-3 max-w-2xl text-5xl leading-[1.05] font-bold text-white sm:text-7xl [animation-delay:.35s]">
            Travel. Film. Remember.
          </h1>
        </div>
      </header>

      {/* ---------- see places ---------- */}
      <section id="places" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-28 sm:px-8 md:py-36">
        <Reveal className="relative">
          <Plane className="absolute -top-14 right-2 size-10 -rotate-12 sm:right-[18%]" strokeWidth={1.5} />
          <h2 className="max-w-3xl text-5xl leading-[1.05] font-bold sm:text-7xl">See places you&apos;ve never been before</h2>
          <span className="mt-6 block h-[3px] w-40 bg-[#1f1f1f]" />
          <p className="mt-6 text-lg font-light">Live your life by a compass, not a clock…</p>
        </Reveal>
      </section>

      {/* ---------- khalsa ---------- */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-28 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <img src={img("anandpur-sahib")} alt="Takht Sri Keshgarh Sahib, Anandpur Sahib" loading="lazy" className="aspect-[5/4] w-full object-cover" />
        </Reveal>
        <Reveal delay={120}>
          <p className="text-2xl leading-tight font-medium">The birth place of</p>
          <h2 className="text-6xl font-bold sm:text-7xl">Khalsa</h2>
          <p className="mt-6 font-light text-[#1f1f1f]/75">
            Sri Anandpur Sahib, at the foot of the Shivaliks, is where Guru Gobind Singh Ji created the Khalsa on Vaisakhi, 1699. Takht Sri Keshgarh Sahib stands on that very spot — and every
            Hola Mohalla, the whole town comes alive.
          </p>
        </Reveal>
      </section>

      {/* ---------- choose anywhere ---------- */}
      <section className="bg-[#1f1f1f] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:py-32">
          <Reveal>
            <h2 className="text-5xl leading-[1.05] font-bold sm:text-6xl">Choose anywhere you&apos;d like to be</h2>
            <p className="mt-6 text-lg font-medium">Travel</p>
            <p className="mt-2 font-light text-white/70">
              Travel means you&apos;re open to new experiences. It takes courage to leave the comfort of home, step into the unknown and find different ways of seeing the world.
            </p>
            <a href="#destinations" className="mt-8 inline-block rounded-md border-2 border-white px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-[#1f1f1f]">
              View destinations
            </a>
          </Reveal>
          <Reveal delay={120}>
            <img src={img("taj-mahal")} alt="A minaret of the Taj Mahal, Agra" loading="lazy" className="mx-auto aspect-[3/4] w-full max-w-sm object-cover" />
          </Reveal>
        </div>
      </section>

      {/* ---------- create a memory ---------- */}
      <section id="destinations" className="scroll-mt-6">
        <div className="bg-[#1f1f1f] text-white">
          <Reveal className="mx-auto max-w-3xl px-5 pt-4 pb-24 text-center sm:px-8">
            <span className="mx-auto mb-16 block h-px w-full bg-white/15" />
            <h2 className="text-5xl leading-[1.05] font-bold sm:text-6xl">Create a memory to remember</h2>
            <p className="mx-auto mt-6 max-w-2xl font-light text-white/70">
              India is home to several holy shrines and religious destinations of different faiths, including Sikhism, Christianity, Hinduism, Jainism, Islam, Buddhism and more. Several religions have
              their roots in India. You can go through the vlogs catering to religious tours in India and choose the one that best meets your requirements.
            </p>
            <a href="#vlogs" className="mt-9 inline-block rounded-md border-2 border-white px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-[#1f1f1f]">
              My Travel Vlogs
            </a>
          </Reveal>
        </div>
        <div id="vlogs" className="mx-auto grid max-w-6xl scroll-mt-6 grid-cols-1 gap-10 px-5 py-24 sm:px-8 md:grid-cols-3">
          {places.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="group">
              <div className="overflow-hidden">
                <img src={img(p.image)} alt={p.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-xs font-medium tracking-[0.25em] text-[#1f1f1f]/55 uppercase">{p.where}</p>
              <h3 className="mt-1 text-3xl font-bold">{p.name}</h3>
              <p className="mt-3 font-light text-[#1f1f1f]/75">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- travel tips ---------- */}
      <section id="tips" className="mx-auto max-w-6xl scroll-mt-6 px-5 pb-28 sm:px-8">
        <Reveal>
          <h2 className="text-6xl leading-[0.95] font-bold sm:text-8xl">
            Take a hike and
            <br />
            breathe
          </h2>
          <p className="mt-6 max-w-lg font-light">A few safety tips before you pack your bags.</p>
        </Reveal>
        <div className="mt-12 border-t-[3px] border-[#1f1f1f]">
          {tips.map((t) => (
            <details key={t.q} className="group border-b-[3px] border-[#1f1f1f]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg sm:text-xl">
                {t.q}
                <span className="text-3xl leading-none font-light transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-6 font-light text-[#1f1f1f]/75">{t.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section id="contact" className="scroll-mt-6 border-t-[3px] border-[#1f1f1f]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="text-5xl leading-[1.05] font-bold sm:text-6xl">Plan your next trip with us</h2>
            <p className="mt-6 font-light text-[#1f1f1f]/75">Questions about a place, a route or a vlog? Drop a message and we&apos;ll write back.</p>
          </Reveal>
          <Reveal delay={120}>
            <TravelForm />
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#1f1f1f] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Wordmark />
          <p className="text-xs text-white/50">
            Designed &amp; built by{" "}
            <Link href="/" className="underline underline-offset-4">
              Meharwan Singh
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
