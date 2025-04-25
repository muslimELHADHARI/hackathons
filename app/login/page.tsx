"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { FluidButton } from "@/components/fluid-button"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/dashboard")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
      <motion.div className="relative w-full max-w-md" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Background blobs */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full">
          <div className="fluid-blob absolute top-0 -left-20 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-400/5"></div>
          <div className="fluid-blob animation-delay-2000 absolute bottom-0 -right-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5"></div>
        </div>

        <motion.div
          className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
          variants={itemVariants}
        >
          <div className="p-8">
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
                Connexion
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Bienvenue sur Gaspillage, réduisez votre gaspillage alimentaire
              </p>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="fluid-input w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="fluid-input w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
              </div>

              <div>
                <FluidButton
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                  icon={<LogIn className="h-4 w-4" />}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </FluidButton>
              </div>
            </motion.form>

            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pas encore de compte?{" "}
                <Link
                  href="/register"
                  className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  S'inscrire
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
