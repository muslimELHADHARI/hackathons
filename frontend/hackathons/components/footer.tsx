"use client"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Footer() {
  // État pour stocker les particules générées côté client uniquement
  const [particles, setParticles] = useState<
    Array<{
      id: number
      width: number
      height: number
      left: string
      top: string
      delay: number
      duration: number
    }>
  >([])

  // Générer les particules uniquement côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }))
    setParticles(newParticles)
  }, [])

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Accueil", href: "/" },
        { name: "Tableau de bord", href: "/dashboard" },
        { name: "Inventaire", href: "/inventory" },
        { name: "Recettes", href: "/recipes" },
        { name: "Assistant", href: "/assistant" },
      ],
    },
    {
      title: "Légal",
      links: [
        { name: "Conditions d'utilisation", href: "/terms" },
        { name: "Politique de confidentialité", href: "/privacy" },
        { name: "Politique de cookies", href: "/cookies" },
      ],
    },
    {
      title: "Contact",
      links: [
        { name: "Email: contact@anti-gaspillage.tn", href: "mailto:contact@anti-gaspillage.tn" },
        { name: "Téléphone: +216 71 123 456", href: "tel:+21671123456" },
        { name: "Adresse: Tunis, Tunisie", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 relative overflow-hidden">
      {/* Vague animée en haut */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          className="relative block w-full h-[60px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#f8fafc"
            opacity="0.25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#f8fafc"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-emerald-400 transition-colors duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm">© 2023 Anti-Gaspillage. Tous droits réservés.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="bg-gray-800 p-2 rounded-full hover:bg-emerald-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Particules animées - générées uniquement côté client */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-emerald-500 opacity-20"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </footer>
  )
}
