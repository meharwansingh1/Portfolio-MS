/**
 * The opening sequence plays once per visit. Other parts of the hero (the
 * particle portrait, the title) wait for it to finish before they start.
 */
const KEY = "ms-intro-seen"
let done = false
const listeners = new Set<() => void>()

export function introShouldPlay() {
  if (done) return false
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
    if (sessionStorage.getItem(KEY)) return false
  } catch {
    /* storage blocked: just play it */
  }
  return true
}

export function finishIntro() {
  if (done) return
  done = true
  try {
    sessionStorage.setItem(KEY, "1")
  } catch {
    /* ignore */
  }
  document.documentElement.classList.remove("intro-on")
  listeners.forEach((f) => f())
  listeners.clear()
}

/** Runs `fn` once the intro is over (straight away if it isn't playing). */
export function afterIntro(fn: () => void) {
  if (done || !document.documentElement.classList.contains("intro-on")) {
    fn()
    return () => {}
  }
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/**
 * Inline script for the page head: decides before first paint whether the
 * overlay should show, so returning visitors never see a flash of it.
 */
export const introBootScript = `try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('${KEY}');if(!r&&!s){document.documentElement.classList.add('intro-on')}}catch(e){document.documentElement.classList.add('intro-on')}`
