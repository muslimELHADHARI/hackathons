"use client"

import { motion } from "framer-motion"

interface TextAnimationProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
  type?: "wave" | "fade" | "slide" | "bounce"
}

export function TextAnimation({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  type = "wave",
}: TextAnimationProps) {
  const letters = text.split("")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay * i },
    }),
  }

  const getChildVariants = () => {
    switch (type) {
      case "wave":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              duration,
            },
          },
        }
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
            },
          },
        }
      case "slide":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              duration,
            },
          },
        }
      case "bounce":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 8,
              stiffness: 300,
              duration,
            },
          },
        }
      default:
        return {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              duration,
            },
          },
        }
    }
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={getChildVariants()}
          className="inline-block"
          style={{
            whiteSpace: letter === " " ? "pre" : "normal",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}
