import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "@fontsource-variable/inter-tight"
import "@fontsource-variable/archivo/wdth.css"
import "@fontsource/mrs-saint-delafield/400.css"
import "./globals.css"
import { themeScript } from "@/components/site/theme-toggle"
import { introBootScript } from "@/lib/intro"


// some older YouTube videos have no full-HD thumbnail; fall back to the smaller one
const ytFallback = `document.addEventListener("error",function(e){var t=e.target;if(t&&t.tagName==="IMG"&&t.src.indexOf("maxresdefault")>-1){t.src=t.src.replace("maxresdefault","hqdefault")}},true)`

export const metadata: Metadata = {
  title: { default: "Meharwan Singh — Developer, Designer, Storyteller", template: "%s · Meharwan Singh" },
  description: "Portfolio of Meharwan Singh: frontend development, graphic design and motion storytelling.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <script dangerouslySetInnerHTML={{ __html: ytFallback }} />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans">{children}</body>
    </html>
  )
}
