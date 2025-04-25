"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface WaveAnimationProps {
  color?: string
  height?: number
  amplitude?: number
  frequency?: number
  speed?: number
  className?: string
}

export function WaveAnimation({
  color = "rgba(74, 222, 128, 0.2)",
  height = 50,
  amplitude = 20,
  frequency = 0.02,
  speed = 0.1,
  className = "",
}: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const offsetRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = height
    }

    const drawWave = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()

      offsetRef.current += speed
      if (offsetRef.current > 1000) offsetRef.current = 0

      ctx.moveTo(0, canvas.height / 2)

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * frequency + offsetRef.current) * amplitude + canvas.height / 2
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()

      ctx.fillStyle = color
      ctx.fill()

      animationRef.current = requestAnimationFrame(drawWave)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    drawWave()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [color, height, amplitude, frequency, speed])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute bottom-0 left-0 w-full pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
