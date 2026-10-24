import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "@fontsource/instrument-serif/400.css"
import "@fontsource/instrument-serif/400-italic.css"
import "./globals.css"
import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"
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
      <body className="grain flex min-h-screen flex-col overflow-x-hidden font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
