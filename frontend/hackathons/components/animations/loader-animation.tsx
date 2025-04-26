"use client"

import { motion } from "framer-motion"

interface LoaderAnimationProps {
  size?: number
  color?: string
  thickness?: number
  speed?: number
  className?: string
  type?: "spinner" | "dots" | "pulse" | "wave"
}

export function LoaderAnimation({
  size = 40,
  color = "#4ADE80",
  thickness = 4,
  speed = 1.2,
  className = "",
  type = "spinner",
}: LoaderAnimationProps) {
  const spinTransition = {
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
    duration: speed,
  }

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [0, -10, 0] },
  }

  const dotTransition = (delay: number) => ({
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
    duration: speed,
    delay: delay * 0.2,
  })

  const pulseVariants = {
    initial: { scale: 0.8, opacity: 0.6 },
    animate: { scale: 1, opacity: 1 },
  }

  const waveVariants = {
    initial: { scaleY: 0.4 },
    animate: { scaleY: [0.4, 1, 0.4] },
  }

  const waveTransition = (delay: number) => ({
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
    duration: speed,
    delay: delay * 0.1,
  })

  switch (type) {
    case "spinner":
      return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
          <motion.span
            className="absolute inset-0 border-t-transparent rounded-full"
            style={{
              width: size,
              height: size,
              borderWidth: thickness,
              borderStyle: "solid",
              borderColor: color,
            }}
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
        </div>
      )

    case "dots":
      return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: size / 3,
                height: size / 3,
                backgroundColor: color,
                borderRadius: "50%",
              }}
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={dotTransition(i)}
            />
          ))}
        </div>
      )

    case "pulse":
      return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
          <motion.div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: "50%",
            }}
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: speed,
            }}
          />
        </div>
      )

    case "wave":
      return (
        <div className={`flex items-end justify-center gap-1 ${className}`} style={{ height: size }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              style={{
                width: size / 5,
                height: size,
                backgroundColor: color,
              }}
              variants={waveVariants}
              initial="initial"
              animate="animate"
              transition={waveTransition(i)}
            />
          ))}
        </div>
      )

    default:
      return null
  }
}
