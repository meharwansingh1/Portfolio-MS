"use client"

import { FitFolder } from "./fit-folder"
import { toFolderFile, useOpenLink, type LinkedFile } from "./use-open-link"
import { asset, projects, skillGroups } from "@/lib/data"

/**
 * The home page's doorway: one glass folder per part of the site. Click a
 * folder to open it, then pick a sheet to go straight there.
 */
export function HomeFolders() {
  const open = useOpenLink()

  // the stack shows its last items nearest the glass, so the strongest work goes last
  const work: LinkedFile[] = [...projects].reverse().map((p) => ({ name: p.title, meta: p.kind, art: p.art, to: "/work/#" + p.slug }))
  const showcase: LinkedFile[] = [
    toFolderFile({ name: "Vectoristory", meta: "YouTube", to: "/showcase/#vectoristory", image: "https://i.ytimg.com/vi/FQ76hjBlx78/hqdefault.jpg" }),
    toFolderFile({ name: "Kharag Singh Yudh", meta: "Reels", to: "/showcase/#kharag-singh-yudh", image: asset("/work/Dewq-vvTCi8.jpg") }),
    toFolderFile({ name: "Dussehra Mahatam", meta: "10 days", to: "/showcase/#dussehra-mahatam", image: asset("/work/DeqFOaaB7zp.jpg") }),
  ]
  const about: LinkedFile[] = [
    { name: "What I value", meta: "Read", to: "/about/#values" },
    { name: "Experience", meta: "Timeline", art: "glacier", to: "/about/#timeline" },
    { name: "My story", meta: "Read", to: "/about/#story" },
  ]
  const skills: LinkedFile[] = skillGroups.map((g) => ({ name: g.title, meta: g.skills.length + " skills", art: g.art, to: "/skills/#" + g.id }))

  return (
    <div className="grid grid-cols-1 items-end justify-items-center gap-x-16 gap-y-16 sm:grid-cols-2">
      <FitFolder max={400} label="Work" meta={projects.length + " projects"} art="ember" seed={11} tone="dark" action="none" labelPlacement="top-right" files={work} onFileSelect={open} />
      <FitFolder max={400} label="Showcase" meta="Reels & videos" art="dusk" seed={5} action="none" appearDelay={120} files={showcase} onFileSelect={open} />
      <FitFolder max={400} label="About me" art="aurora" seed={3} action="none" appearDelay={200} files={about} onFileSelect={open} />
      <FitFolder
        max={400}
        label="Skills"
        meta={skillGroups.reduce((n, g) => n + g.skills.length, 0) + " tools"}
        art="verdant"
        seed={7}
        tone="dark"
        action="none"
        labelPlacement="top-left"
        appearDelay={280}
        files={skills}
        onFileSelect={open}
      />
    </div>
  )
}
