"use client"

import { useRouter } from "next/navigation"
import type { FolderFile } from "@/components/ui/glass-folder-cards"
import type { FolderLink } from "@/lib/data"

/** A folder sheet that knows where it goes. */
export type LinkedFile = FolderFile & { to: string }

export const toFolderFile = (f: FolderLink): LinkedFile => ({ name: f.name, meta: f.meta, image: f.image, art: f.art, to: f.to })

/**
 * Opens a sheet's destination: pages on this site in place (the router adds the
 * base path), anything external in a new tab so the portfolio stays open.
 */
export function useOpenLink() {
  const router = useRouter()
  return (file: FolderFile) => {
    const to = (file as LinkedFile).to
    if (!to) return
    if (/^https?:\/\//.test(to)) window.open(to, "_blank", "noopener,noreferrer")
    else router.push(to)
  }
}
