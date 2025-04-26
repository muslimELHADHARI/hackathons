"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

export default function FluidNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "Tableau de bord", href: "/dashboard" },
    { name: "Inventaire", href: "/inventory" },
    { name: "Recettes", href: "/recipes" },
    { name: "Assistant", href: "/assistant" },
    { name: "Communauté", href: "/community" },
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        staggerDirection: 1,
        when: "beforeChildren",
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2 fluid-glass-dark shadow-lg backdrop-blur-lg" : "py-4 bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div
            className="relative h-10 w-10 fluid-blob bg-gradient-to-br from-emerald-400 to-blue-500 mr-3"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            Anti-Gaspillage
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 rounded-full"
              onMouseEnter={() => setActiveItem(item.href)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <span
                className={cn(
                  "relative z-10",
                  pathname === item.href ? "text-white font-medium" : "text-gray-300 hover:text-white",
                )}
              >
                {item.name}
              </span>
              {(pathname === item.href || activeItem === item.href) && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/80 to-blue-500/80 fluid-glass"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ModeToggle />

          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login">
              <motion.button
                className="px-4 py-2 rounded-full fluid-glass text-white hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connexion
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                S'inscrire
              </motion.button>
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <motion.button
            className="block md:hidden relative w-10 h-10 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            initial={false}
            animate={isOpen ? "open" : "closed"}
          >
            <motion.span
              className="absolute h-0.5 w-6 bg-current transform transition-transform duration-300"
              style={{ top: "calc(50% - 4px)", left: "calc(50% - 12px)" }}
              variants={{
                closed: { rotate: 0 },
                open: { rotate: 45, y: 4 },
              }}
            />
            <motion.span
              className="absolute h-0.5 w-6 bg-current transform transition-opacity duration-300"
              style={{ top: "calc(50%)", left: "calc(50% - 12px)" }}
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
            />
            <motion.span
              className="absolute h-0.5 w-6 bg-current transform transition-transform duration-300"
              style={{ top: "calc(50% + 4px)", left: "calc(50% - 12px)" }}
              variants={{
                closed: { rotate: 0 },
                open: { rotate: -45, y: -4 },
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fluid-glass-dark shadow-lg"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-2 rounded-lg",
                      pathname === item.href
                        ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-white font-medium"
                        : "text-gray-300 hover:text-white",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="pt-4 flex flex-col space-y-3">
                <Link href="/login">
                  <button className="w-full px-4 py-2 rounded-full fluid-glass text-white">Connexion</button>
                </Link>
                <Link href="/register">
                  <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                    S'inscrire
                  </button>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
