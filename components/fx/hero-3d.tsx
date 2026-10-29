"use client"

import * as React from "react"
import { asset } from "@/lib/data"

/**
 * My 3D bust, built in Blender, rendered live with three.js. The model holds
 * perfectly still; only the eyes follow the cursor, slowly, the way someone
 * glances at you across a room. Until the model has loaded (or if WebGL is
 * unavailable) a Blender still of the same bust stands in its place.
 */
export function Hero3D({ className }: { className?: string }) {
  const box = React.useRef<HTMLDivElement>(null)
  const poster = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const el = box.current
    if (!el) return
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const THREE = await import("three")
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js")
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js")
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js")
      if (disposed) return

      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
      } catch {
        return
      }
      renderer.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 0.95
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .8s ease"
      renderer.domElement.setAttribute("aria-hidden", "true")
      el.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      scene.environmentIntensity = 0.55

      const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100)
      camera.position.set(0, -0.2, 13)
      camera.lookAt(0, -0.55, 0)

      // a warm key from the left, a strong saffron rim from behind, a cool low fill
      const key = new THREE.DirectionalLight(0xfff1e0, 1.15)
      key.position.set(-4, 4, 6)
      const rim = new THREE.DirectionalLight(0xf2a33a, 3.6)
      rim.position.set(5, 2.5, -4)
      const rim2 = new THREE.DirectionalLight(0xf2a33a, 1.4)
      rim2.position.set(-5, 1, -4)
      const fill = new THREE.DirectionalLight(0xbfcfff, 0.5)
      fill.position.set(3, -1, 6)
      scene.add(key, rim, rim2, fill, new THREE.AmbientLight(0xffffff, 0.15))

      const draco = new DRACOLoader().setDecoderPath(asset("/draco/"))
      const loader = new GLTFLoader().setDRACOLoader(draco)
      const gltf = await loader.loadAsync(asset("/3d/meharwan.glb")).catch(() => null)
      if (!gltf || disposed) {
        renderer.dispose()
        renderer.domElement.remove()
        return
      }
      const model = gltf.scene
      // the scan's textures already carry their own light: keep the skin and cloth matte
      model.traverse((o) => {
        const mesh = o as InstanceType<typeof THREE.Mesh>
        if (!mesh.isMesh) return
        const m = mesh.material as InstanceType<typeof THREE.MeshStandardMaterial>
        if (m.name === "Sclera") {
          m.color.multiplyScalar(0.82)
          return
        }
        if (m.name === "Iris") return
        m.metalness = 0
        m.roughness = Math.max(m.roughness, 0.72)
        m.envMapIntensity = 0.6
      })
      scene.add(model)
      const eyes = ["EyeL", "EyeR"].map((n) => model.getObjectByName(n)).filter(Boolean) as InstanceType<typeof THREE.Object3D>[]

      const size = () => {
        const w = el.clientWidth
        const h = el.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        // keep the whole bust in frame on tall phones
        camera.fov = w / h < 0.8 ? 30 : 24
        camera.updateProjectionMatrix()
      }
      size()
      const ro = new ResizeObserver(size)
      ro.observe(el)

      // where the cursor points, as a spot in the air in front of the face
      const target = new THREE.Vector3(0, 0, 6)
      const look = { x: 0, y: 0 }
      const now = { x: 0, y: 0 }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const onMove = (e: PointerEvent) => {
        look.x = (e.clientX / window.innerWidth) * 2 - 1
        look.y = -((e.clientY / window.innerHeight) * 2 - 1)
      }
      window.addEventListener("pointermove", onMove, { passive: true })

      let visible = true
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
      io.observe(el)

      const eyeWorld = new THREE.Vector3()
      let last = ""
      let raf = 0
      const clock = new THREE.Clock()
      const frame = () => {
        raf = requestAnimationFrame(frame)
        if (!visible) return
        const t = clock.getElapsedTime()
        // slow: the eyes take a moment to catch up, and drift a little when idle
        const k = reduced ? 1 : 0.035
        const idleX = Math.sin(t * 0.35) * 0.12
        const idleY = Math.sin(t * 0.27) * 0.06
        now.x += (look.x + idleX - now.x) * k
        now.y += (look.y + idleY - now.y) * k
        target.set(now.x * 4.2, now.y * 2.6 - 0.1, 6)
        for (const eye of eyes) {
          eye.getWorldPosition(eyeWorld)
          const dx = target.x - eyeWorld.x
          const dy = target.y - eyeWorld.y
          const dz = target.z - eyeWorld.z
          const yaw = Math.max(-0.42, Math.min(0.42, Math.atan2(dx, dz)))
          const pitch = Math.max(-0.28, Math.min(0.28, -Math.atan2(dy, Math.hypot(dx, dz))))
          eye.rotation.set(pitch, yaw, 0, "YXZ")
        }
        // only draw when the eyes have actually moved
        const key = eyes.map((e) => e.rotation.x.toFixed(4) + e.rotation.y.toFixed(4)).join() + renderer.domElement.width
        if (key === last) return
        last = key
        renderer.render(scene, camera)
      }
      frame()
      renderer.domElement.style.opacity = "1"
      if (poster.current) poster.current.style.opacity = "0"

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        window.removeEventListener("pointermove", onMove)
        draco.dispose()
        pmrem.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div ref={box} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={poster}
        src={asset("/3d/front.webp")}
        alt="Meharwan Singh, 3D model"
        className="pointer-events-none absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain transition-opacity duration-700"
      />
    </div>
  )
}
