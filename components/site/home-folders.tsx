"use client"

import { useRouter } from "next/navigation"
import type { FolderFile } from "@/components/ui/glass-folder-cards"
import { FitFolder } from "./fit-folder"
import { projects, skillGroups } from "@/lib/data"

type Routed = FolderFile & { to: string }

/**
 * The home page's doorway: one glass folder per section. Click a folder to
 * open it, then pick a file to go straight to that part of the site.
 * (Files carry a `to` route instead of `href`, so navigation stays client-side.)
 */
export function HomeFolders() {
  const router = useRouter()
  const go = (f: FolderFile) => router.push((f as Routed).to)

  const work: Routed[] = [...projects].reverse().map((p) => ({ name: p.title, meta: p.kind, art: p.art, to: "/work#" + p.slug }))
  const about: Routed[] = [
    { name: "My story", meta: "Read", to: "/about#story" },
    { name: "Timeline", meta: "3 chapters", art: "glacier", to: "/about#timeline" },
    { name: "What I value", meta: "Read", to: "/about#values" },
  ]
  const skills: Routed[] = skillGroups.map((g) => ({ name: g.title, meta: g.skills.length + " skills", art: g.art, to: "/skills#" + g.id }))

  return (
    <div className="grid grid-cols-1 items-end justify-items-center gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      <FitFolder
        label="Work"
        meta={projects.length + " projects"}
        art="ember"
        seed={11}
        tone="dark"
        action="none"
        labelPlacement="top-right"
        files={work}
        onFileSelect={go}
      />
      <FitFolder label="About me" art="aurora" seed={3} action="none" appearDelay={140} files={about} onFileSelect={go} />
      <FitFolder
        label="Skills"
        meta={skillGroups.reduce((n, g) => n + g.skills.length, 0) + " tools"}
        art="verdant"
        seed={7}
        tone="dark"
        action="more"
        labelPlacement="top-left"
        appearDelay={280}
        menu={[
          { label: "See all skills", onSelect: () => router.push("/skills") },
          { label: "Get in touch", onSelect: () => router.push("/contact") },
        ]}
        files={skills}
        onFileSelect={go}
      />
    </div>
  )
}
