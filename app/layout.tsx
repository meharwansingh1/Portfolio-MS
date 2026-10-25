import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "@fontsource-variable/inter-tight"
import "@fontsource/mrs-saint-delafield/400.css"
import "./globals.css"
import { themeScript } from "@/components/site/theme-toggle"


export const metadata: Metadata = {
  title: { default: "Meharwan Singh — Developer, Designer, Storyteller", template: "%s · Meharwan Singh" },
  description: "Portfolio of Meharwan Singh: frontend development, graphic design and motion storytelling.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans">{children}</body>
    </html>
  )
}
