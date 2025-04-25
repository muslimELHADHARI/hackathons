"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FluidFeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color?: string
  onClick?: () => void
}

export default function FluidFeatureCard({
  title,
  description,
  icon,
  color = "emerald",
  onClick,
}: FluidFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    emerald: "from-emerald-500 to-emerald-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
    amber: "from-amber-500 to-amber-600",
  }

  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.emerald

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-500 p-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background blob */}
      <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 fluid-blob bg-gradient-to-br from-emerald-500 to-blue-500" />

      <div className="relative z-10 p-6">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${selectedColor} text-white mb-4`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

        <motion.div
          className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          <span>En savoir plus</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}
