"use client"

import { motion } from "framer-motion"

interface FluidStatCardProps {
  value: string
  label: string
  description: string
  color: string
  index: number
}

export default function FluidStatCard({ value, label, description, color, index }: FluidStatCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        <div
          className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${color} rounded-full opacity-10 -mr-20 -mt-20 group-hover:opacity-20 transition-opacity duration-300`}
        />

        <motion.div
          className={`text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${color}`}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {value}
        </motion.div>

        <p className="text-lg font-medium mb-2">{label}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>

        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
        />
      </div>
    </motion.div>
  )
}
