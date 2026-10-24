"use client"

import { FitFolder } from "./fit-folder"
import { useOpenLink, type LinkedFile } from "./use-open-link"
import type { SkillGroup } from "@/lib/data"

/** Each skill is a sheet that opens the work where that skill shows. */
export function SkillFolder({ group, index }: { group: SkillGroup; index: number }) {
  const open = useOpenLink()
  const files: LinkedFile[] = group.skills.slice(0, 4).map((s, i) => ({
    name: s.name,
    meta: "See it →",
    art: i % 2 === 0 ? group.art : undefined,
    to: s.href,
  }))
  return (
    <FitFolder
      max={380}
      label={group.title}
      meta={group.skills.length + " skills"}
      art={group.art}
      seed={index * 5 + 2}
      tone={index === 1 ? "light" : "dark"}
      action="none"
      labelPlacement={index % 2 ? "top-right" : "bottom-left"}
      files={files}
      onFileSelect={open}
    />
  )
}
