"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import FluidStatCard from "@/components/fluid-stat-card"

export default function WaveStatisticsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  const stats = [
    {
      value: "900,000",
      label: "Baguettes gaspillées par jour",
      description: "En Tunisie, près d'un million de baguettes sont jetées quotidiennement.",
      color: "from-emerald-500 to-green-500",
    },
    {
      value: "16%",
      label: "Du budget alimentaire gaspillé",
      description: "Les ménages tunisiens jettent environ 16% de leur budget alimentaire.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "68 kg",
      label: "Nourriture gaspillée par personne",
      description: "Chaque Tunisien gaspille en moyenne 68 kg de nourriture par an.",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-6 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Vagues animées en haut */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          className="relative block w-full h-[60px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,43.79,192.25,57.69,250.85,68.95,262.5,80.24,321.39,56.44Z"
            fill="currentColor"
            className="text-white dark:text-gray-900"
            animate={{
              d: [
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,43.79,192.25,57.69,250.85,68.95,262.5,80.24,321.39,56.44Z",
                "M321.39,80.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,55,906.67,96,985.66,116.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,67.79,192.25,81.69,250.85,92.95,262.5,104.24,321.39,80.44Z",
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,43.79,192.25,57.69,250.85,68.95,262.5,80.24,321.39,56.44Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 25,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 fluid-text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          L'Impact du Gaspillage en Tunisie
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <FluidStatCard
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              color={stat.color}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Vagues animées en bas */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[60px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,43.79,192.25,57.69,250.85,68.95,262.5,80.24,321.39,56.44Z"
            fill="currentColor"
            className="text-white dark:text-gray-900"
            animate={{
              d: [
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,43.79,192.25,57.69,250.85,68.95,262.5,80.24,321.39,56.44Z",
                "M321.39,80.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,55,906.67,96,985.66,116.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,67.79,192.25,81.69,250.85,92.95,262.5,104.24,321.39,80.44Z",
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,43.79,192.25,57.69,250.85,68.95,262.5,80.24,321.39,56.44Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 25,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </section>
  )
}
