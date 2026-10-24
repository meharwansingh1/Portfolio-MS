"use client"

import { FitFolder } from "./fit-folder"
import type { SkillGroup } from "@/lib/data"

export function SkillFolder({ group, index }: { group: SkillGroup; index: number }) {
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
      files={group.skills.slice(0, 4).map((s, i) => ({
        name: s.name,
        meta: s.level + "%",
        art: i % 2 === 0 ? group.art : undefined,
      }))}
    />
  )
}
