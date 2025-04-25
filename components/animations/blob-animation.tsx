"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface BlobAnimationProps {
  color?: string
  size?: number
  speed?: number
  complexity?: number
  className?: string
}

export function BlobAnimation({
  color = "rgba(74, 222, 128, 0.2)",
  size = 300,
  speed = 0.002,
  complexity = 5,
  className = "",
}: BlobAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = size * 2
    canvas.height = size * 2

    const drawBlob = (time: number) => {
      if (!ctx || !canvas) return

      timeRef.current += speed

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = size * 0.8

      ctx.beginPath()

      for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        let radiusOffset = 0

        for (let i = 1; i <= complexity; i++) {
          radiusOffset += Math.sin(angle * i + timeRef.current * i) * (radius / (i * 2))
        }

        const x = centerX + (radius + radiusOffset) * Math.cos(angle)
        const y = centerY + (radius + radiusOffset) * Math.sin(angle)

        if (angle === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()

      animationRef.current = requestAnimationFrame(drawBlob)
    }

    drawBlob(0)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [color, size, speed, complexity])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    />
  )
}
