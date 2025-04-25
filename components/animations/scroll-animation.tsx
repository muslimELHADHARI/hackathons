"use client"

import { type ReactNode, useRef, useEffect } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode
  type?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "rotate"
  duration?: number
  delay?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function ScrollAnimation({
  children,
  type = "fade",
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, threshold })
  const controls = useAnimation()

  const getVariants = (): Variants => {
    switch (type) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case "slide-up":
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "slide-down":
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "slide-left":
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "slide-right":
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "scale":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }
      case "rotate":
        return {
          hidden: { rotate: -5, opacity: 0 },
          visible: { rotate: 0, opacity: 1 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
