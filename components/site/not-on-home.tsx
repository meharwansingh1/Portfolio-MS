"use client"

import { usePathname } from "next/navigation"

/** Renders its children everywhere except the home page (which has its own closing card). */
export function NotOnHome({ children }: { children: React.ReactNode }) {
  return usePathname() === "/" ? null : <>{children}</>
}
