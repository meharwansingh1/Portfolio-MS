"use client"

import * as React from "react"
import { asset } from "@/lib/data"
import { clamp, lerp } from "@/lib/motion"

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main(){ vUv = vec2(p.x*.5+.5, .5-p.y*.5); gl_Position = vec4(p,0.,1.); }`

/*
 * Each pixel is looked up a little off its place, by an amount set by how near
 * that part of the photo is (the depth map) and where the cursor is: near parts
 * move more than far ones, so the head seems to turn. A soft, wobbly mask drawn
 * by the cursor blends in the designed version of the same photo.
 */
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uPhoto, uDesign, uDepth, uMask;
uniform vec2 uMouse;
uniform float uTime;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
void main(){
  vec2 k = uMouse * vec2(0.016, 0.01);
  float d = texture2D(uDepth, vUv).r;
  vec2 uv = vUv - k * (d - 0.3);
  d = texture2D(uDepth, uv).r;
  uv = vUv - k * (d - 0.3);
  vec4 photo = texture2D(uPhoto, uv);
  vec4 design = texture2D(uDesign, uv);
  float m = texture2D(uMask, vUv).r;
  float n = noise(vUv * 9. + uTime * .25) * .55 + noise(vUv * 23. - uTime * .4) * .25;
  float edge = m + (n - .4) * m * 1.2;
  float reveal = smoothstep(.32, .5, edge);
  float rim = smoothstep(.22, .32, edge) - reveal;
  vec4 col = mix(photo, design, reveal);
  col.rgb = mix(col.rgb, vec3(.36, .49, 1.), rim * .55 * photo.a);
  gl_FragColor = vec4(col.rgb * col.a, col.a);
}`

function load(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image()
    i.onload = () => res(i)
    i.onerror = rej
    i.src = src
  })
}

/**
 * My photo as a living render: it turns very slightly toward the cursor, and
 * wherever the cursor passes over me it paints in the designed version.
 */
export function RenderPortrait({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const fallback = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const gl = cv.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let alive = true
    let visible = true
    const cleanup: (() => void)[] = []

    // the mask the cursor paints into
    const mc = document.createElement("canvas")
    mc.width = mc.height = 256
    const mx = mc.getContext("2d")!
    mx.fillStyle = "#000"
    mx.fillRect(0, 0, 256, 256)

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "p")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const tex = (unit: number, src: TexImageSource) => {
      const t = gl.createTexture()!
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src)
      return t
    }
    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uMouse = u("uMouse")
    const uTime = u("uTime")

    // pointer, in the canvas's own 0..1 space
    const ptr = { x: 0.5, y: 0.5, inside: false, lx: 0.5, ly: 0.5 }
    const mouse = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      ptr.x = (e.clientX - r.left) / r.width
      ptr.y = (e.clientY - r.top) / r.height
      ptr.inside = ptr.x > 0 && ptr.x < 1 && ptr.y > 0 && ptr.y < 1
    }
    const onLeave = () => (ptr.inside = false)

    Promise.all([load(asset("/me/hero.webp")), load(asset("/me/designed.webp")), load(asset("/me/depth.png"))])
      .then(([photo, design, depth]) => {
        if (!alive) return
        tex(0, photo)
        tex(1, design)
        tex(2, depth)
        const maskTex = tex(3, mc)
        gl.uniform1i(u("uPhoto"), 0)
        gl.uniform1i(u("uDesign"), 1)
        gl.uniform1i(u("uDepth"), 2)
        gl.uniform1i(u("uMask"), 3)
        if (fallback.current) fallback.current.style.opacity = "0"
        cv.style.opacity = "1"

        const size = () => {
          const dpr = Math.min(2, window.devicePixelRatio || 1)
          cv.width = Math.round(cv.clientWidth * dpr)
          cv.height = Math.round(cv.clientHeight * dpr)
          gl.viewport(0, 0, cv.width, cv.height)
        }
        size()
        const ro = new ResizeObserver(size)
        ro.observe(cv)

        const t0 = performance.now()
        const frame = (now: number) => {
          raf = requestAnimationFrame(frame)
          if (!visible) return
          const t = (now - t0) / 1000
          // the head follows the cursor only a little; at rest it sways very slowly
          const tx = ptr.inside || ptr.x !== 0.5 ? clamp((ptr.x - 0.5) * 2, -1, 1) : Math.sin(t * 0.4) * 0.3
          const ty = ptr.inside || ptr.y !== 0.5 ? clamp((ptr.y - 0.45) * 2, -1, 1) : Math.cos(t * 0.3) * 0.2
          mouse.x = lerp(mouse.x, reduced ? 0 : tx, 0.05)
          mouse.y = lerp(mouse.y, reduced ? 0 : ty, 0.05)

          // fade the mask, then paint where the cursor is (bigger when it moves fast)
          mx.fillStyle = "rgba(0,0,0,0.035)"
          mx.fillRect(0, 0, 256, 256)
          if (ptr.inside) {
            const sp = Math.hypot(ptr.x - ptr.lx, ptr.y - ptr.ly)
            const steps = Math.max(1, Math.ceil(sp * 60))
            for (let s = 1; s <= steps; s++) {
              const x = lerp(ptr.lx, ptr.x, s / steps) * 256
              const y = lerp(ptr.ly, ptr.y, s / steps) * 256
              const r = 34 + Math.min(30, sp * 900)
              const g = mx.createRadialGradient(x, y, 0, x, y, r)
              g.addColorStop(0, "rgba(255,255,255,0.5)")
              g.addColorStop(1, "rgba(255,255,255,0)")
              mx.fillStyle = g
              mx.beginPath()
              mx.arc(x, y, r, 0, Math.PI * 2)
              mx.fill()
            }
          }
          ptr.lx = ptr.x
          ptr.ly = ptr.y
          gl.activeTexture(gl.TEXTURE3)
          gl.bindTexture(gl.TEXTURE_2D, maskTex)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mc)

          gl.uniform2f(uMouse, mouse.x, mouse.y)
          gl.uniform1f(uTime, t)
          gl.clearColor(0, 0, 0, 0)
          gl.clear(gl.COLOR_BUFFER_BIT)
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }
        raf = requestAnimationFrame(frame)
        cleanup.push(() => ro.disconnect())
      })
      .catch(() => {})

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      io.disconnect()
      cleanup.forEach((f) => f())
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={fallback} src={asset("/me/hero.webp")} alt="Meharwan Singh" className="absolute inset-0 size-full object-contain transition-opacity duration-700" />
      <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full opacity-0 transition-opacity duration-700" />
    </div>
  )
}
