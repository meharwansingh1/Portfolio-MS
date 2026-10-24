"use client"

import { FitFolder } from "./fit-folder"
import type { Project } from "@/lib/data"

/** A project as a folder: its links become files you can open. */
export function ProjectFolder({ project, index }: { project: Project; index: number }) {
  const files = [
    ...project.links.map((l, i) => ({ name: l.label, meta: new URL(l.href).hostname.replace("www.", ""), href: l.href, art: i === 0 ? project.art : undefined })),
    ...project.tags.slice(0, Math.max(1, 3 - project.links.length)).map((t, i) => ({ name: t, meta: project.kind, art: i % 2 ? project.art : undefined })),
  ]
  return (
    <FitFolder
      max={400}
      label={project.title}
      meta={project.kind}
      art={project.art}
      seed={index * 7 + 1}
      tone={index % 2 ? "light" : "dark"}
      action="none"
      labelPlacement={index % 3 === 1 ? "top-left" : "bottom-left"}
      files={files}
    />
  )
}
