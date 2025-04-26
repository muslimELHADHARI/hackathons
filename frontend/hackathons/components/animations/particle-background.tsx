"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  emoji: string
}

interface ParticleBackgroundProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  className?: string
  useEmojis?: boolean
}

export function ParticleBackground({
  count = 50,
  colors = ["#4ADE80", "#34D399", "#2DD4BF", "#22D3EE", "#38BDF8"],
  minSize = 10,
  maxSize = 24,
  minSpeed = 0.2,
  maxSpeed = 0.8,
  className = "",
  useEmojis = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      const foodEmojis = [
        "🍎",
        "🍐",
        "🍊",
        "🍋",
        "🍌",
        "🍉",
        "🍇",
        "🍓",
        "🍒",
        "🥕",
        "🥦",
        "🥬",
        "🥒",
        "🍆",
        "🌽",
        "🥑",
        "🥝",
        "🍅",
        "🍍",
        "🥭",
        "🥔",
      ]
      particlesRef.current = []
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
          speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)],
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        if (useEmojis) {
          // Dessiner l'emoji
          ctx.font = `${particle.size}px Arial`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(particle.emoji, particle.x, particle.y)
        } else {
          // Dessiner un cercle (ancien comportement)
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle =
            particle.color +
            Math.floor(particle.opacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.fill()
        }

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [count, colors, minSize, maxSize, minSpeed, maxSpeed, useEmojis])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
