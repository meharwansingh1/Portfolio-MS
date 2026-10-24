"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { site } from "@/lib/data"

/**
 * No server needed: the form composes an email in the visitor's own mail app.
 * Swap the submit handler for Formspree, Resend or an API route later if you
 * want messages to arrive without that step.
 */
export function ContactForm() {
  const [sent, setSent] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const subject = encodeURIComponent(String(d.get("subject") || "Hello from your portfolio"))
    const body = encodeURIComponent(String(d.get("message") || "") + "\n\n— " + String(d.get("name") || ""))
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field =
    "peer w-full border-b border-border bg-transparent pt-6 pb-2 text-lg outline-none transition placeholder:text-transparent focus:border-foreground"
  const label =
    "pointer-events-none absolute top-6 left-0 text-muted-foreground transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-border bg-card p-8 sm:p-10">
      <div className="space-y-8">
        <div className="relative">
          <input id="name" name="name" required placeholder="Your name" className={field} />
          <label htmlFor="name" className={label}>Your name</label>
        </div>
        <div className="relative">
          <input id="subject" name="subject" placeholder="Subject" className={field} />
          <label htmlFor="subject" className={label}>Subject</label>
        </div>
        <div className="relative">
          <textarea id="message" name="message" required rows={4} placeholder="Message" className={field + " resize-none"} />
          <label htmlFor="message" className={label}>Message</label>
        </div>
      </div>
      <button type="submit" className="group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:bg-accent hover:text-white">
        {sent ? "Opening your mail app…" : "Send message"}
        <Send className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>
    </form>
  )
}
