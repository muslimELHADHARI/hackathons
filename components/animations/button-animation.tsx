"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ButtonAnimationProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  ripple?: boolean
  hover3D?: boolean
}

export function ButtonAnimation({
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "md",
  ripple = true,
  hover3D = true,
}: ButtonAnimationProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
      case "secondary":
        return "bg-gradient-to-r from-violet-400 to-purple-500 text-white"
      case "outline":
        return "bg-transparent border-2 border-emerald-400 text-emerald-500"
      case "ghost":
        return "bg-transparent hover:bg-emerald-100 text-emerald-500"
      default:
        return "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm py-1.5 px-3"
      case "md":
        return "text-base py-2 px-4"
      case "lg":
        return "text-lg py-3 px-6"
      default:
        return "text-base py-2 px-4"
    }
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      whileHover={hover3D && !disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* Ripple effect */}
      {ripple && !disabled && (
        <motion.span
          className="absolute inset-0 bg-white rounded-lg"
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
        />
      )}

      {/* Gradient overlay for hover */}
      {!disabled && variant !== "outline" && variant !== "ghost" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-400"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.button>
  )
}
