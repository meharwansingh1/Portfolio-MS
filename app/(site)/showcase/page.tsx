import type { Metadata } from "next"
import { PageHeader } from "@/components/site/page-header"
import { Showcase } from "@/components/site/showcase"

export const metadata: Metadata = { title: "Showcase" }

export default function ShowcasePage() {
  return (
    <div className="page-in">
      <PageHeader
        index="05"
        eyebrow="The work, by craft"
        title="Showcase"
        intro="Graphic design, video editing, motion animation, AI animation and web — tap any piece to view or play it right here."
      />
      <Showcase />
    </div>
  )
}
