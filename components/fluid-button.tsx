"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FluidButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  loading?: boolean
  href?: string
}

export function FluidButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  href,
}: FluidButtonProps) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:shadow-lg hover:shadow-emerald-500/20",
    secondary:
      "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
    outline: "bg-transparent border border-emerald-500 text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500/10",
    ghost: "bg-transparent text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500/10",
  }

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5 rounded-lg",
    md: "px-4 py-2 rounded-xl",
    lg: "text-lg px-6 py-3 rounded-2xl",
  }

  const ButtonComponent = motion.button

  const buttonProps = {
    className: cn(
      "relative font-medium transition-all duration-300 flex items-center justify-center",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      disabled || loading ? "opacity-70 cursor-not-allowed" : "",
      className,
    ),
    onClick,
    disabled: disabled || loading,
    whileHover: { scale: disabled || loading ? 1 : 1.03 },
    whileTap: { scale: disabled || loading ? 1 : 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  }

  const content = (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <span className={cn("flex items-center", loading ? "opacity-0" : "")}>
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </span>

      {variant === "primary" && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  )

  if (href) {
    return (
      <motion.a href={href} {...buttonProps}>
        {content}
      </motion.a>
    )
  }

  return <ButtonComponent {...buttonProps}>{content}</ButtonComponent>
}

// Ajout d'une exportation par défaut pour la compatibilité
export default FluidButton
