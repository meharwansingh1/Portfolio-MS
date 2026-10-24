"use client"

import { FitFolder } from "./fit-folder"
import { toFolderFile, useOpenLink } from "./use-open-link"
import type { Project } from "@/lib/data"

/** A project as a folder: every sheet inside opens a specific piece of the work. */
export function ProjectFolder({ project, index }: { project: Project; index: number }) {
  const open = useOpenLink()
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
      files={project.files.map(toFolderFile)}
      onFileSelect={open}
    />
  )
}
