"use client"

import * as React from "react"

export function TravelForm() {
  const [sent, setSent] = React.useState(false)
  if (sent) {
    return (
      <div className="border-2 border-[#1f1f1f] p-10 text-center">
        <p className="text-3xl font-bold">Thank you!</p>
        <p className="mt-3 text-[#1f1f1f]/70">Your message is on its way. Happy travels.</p>
        <button onClick={() => setSent(false)} className="mt-8 text-sm font-medium underline underline-offset-4">
          Send another
        </button>
      </div>
    )
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Name*</span>
          <input required className="mt-2 w-full rounded-md border-2 border-[#1f1f1f] bg-transparent px-4 py-3 outline-none focus:bg-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email*</span>
          <input required type="email" className="mt-2 w-full rounded-md border-2 border-[#1f1f1f] bg-transparent px-4 py-3 outline-none focus:bg-white" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium">Message</span>
        <textarea rows={6} placeholder="Write something here..." className="mt-2 w-full resize-none rounded-md border-2 border-[#1f1f1f] bg-transparent px-4 py-3 outline-none placeholder:text-[#1f1f1f]/50 focus:bg-white" />
      </label>
      <button className="w-full rounded-md bg-[#1f1f1f] px-8 py-4 font-medium text-white transition hover:bg-black sm:w-auto">Submit Email</button>
    </form>
  )
}
