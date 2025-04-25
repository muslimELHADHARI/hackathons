"use client"

import type React from "react"

import { type ReactNode, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Card3DEffectProps {
  children: ReactNode
  className?: string
  intensity?: number
  perspective?: number
  glareOpacity?: number
  borderRadius?: number
  scale?: number
}

export function Card3DEffect({
  children,
  className = "",
  intensity = 15,
  perspective = 1000,
  glareOpacity = 0.2,
  borderRadius = 16,
  scale = 1.02,
}: Card3DEffectProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const glareX = useTransform(rotateX, [-intensity, intensity], ["-80%", "80%"])
  const glareY = useTransform(rotateY, [-intensity, intensity], ["-80%", "80%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective,
        borderRadius,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isHovered ? glareX : "50%"} ${isHovered ? glareY : "50%"}, rgba(255, 255, 255, ${glareOpacity}), transparent)`,
            opacity: isHovered ? 1 : 0,
            borderRadius,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
