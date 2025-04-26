"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorEffectProps {
  color?: string
  size?: number
  trailSize?: number
  trailCount?: number
  trailDelay?: number
}

export function CursorEffect({
  color = "rgba(74, 222, 128, 0.6)",
  size = 20,
  trailSize = 5,
  trailCount = 5,
  trailDelay = 0.02,
}: CursorEffectProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [trailXSprings, setTrailXSprings] = useState<useSpring[]>([])
  const [trailYSprings, setTrailYSprings] = useState<useSpring[]>([])

  useEffect(() => {
    const initialTrailXSprings = Array.from({ length: trailCount }).map((_, i) => {
      const delay = trailDelay * (i + 1)
      return useSpring(cursorX, { ...springConfig, delay })
    })

    const initialTrailYSprings = Array.from({ length: trailCount }).map((_, i) => {
      const delay = trailDelay * (i + 1)
      return useSpring(cursorY, { ...springConfig, delay })
    })

    setTrailXSprings(initialTrailXSprings)
    setTrailYSprings(initialTrailYSprings)
  }, [trailCount, trailDelay, cursorX, cursorY, springConfig])

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY, size])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size,
          height: size,
          backgroundColor: color,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Cursor trails */}
      {trailXSprings.map((trailX, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference"
          style={{
            x: trailX,
            y: trailYSprings[index],
            width: trailSize,
            height: trailSize,
            backgroundColor: color,
            opacity: isVisible ? 0.5 - index * 0.08 : 0,
          }}
        />
      ))}
    </>
  )
}
