import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"

/** The portfolio's frame: menu, page, footer. The concept sites in /lab use their own. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
