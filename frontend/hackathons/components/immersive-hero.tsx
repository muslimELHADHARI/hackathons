"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function ImmersiveHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      const blobs = container.querySelectorAll(".hero-blob")
      blobs.forEach((blob, index) => {
        const factor = (index + 1) * 10
        const blobElement = blob as HTMLElement
        blobElement.style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Decorative blobs */}
      <div className="hero-blob fluid-blob absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/20" />
      <div className="hero-blob fluid-blob absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20" />
      <div className="hero-blob fluid-blob absolute top-1/3 right-1/4 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20" />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="fluid-text-gradient">Réduisez</span> le gaspillage alimentaire
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Une approche innovante pour gérer vos aliments, réduire le gaspillage et économiser de l'argent tout en
            préservant la planète.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="fluid-button-primary group">
              Commencer maintenant
              <ArrowRight className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
            </button>
            <button className="fluid-button-secondary">En savoir plus</button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
