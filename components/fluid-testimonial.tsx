"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  content: string
}

export default function FluidTestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarra Belhaj",
      location: "Tunis",
      avatar: "/images/avatars/user1.png",
      content:
        "Grâce à cette application, j'ai réduit mon gaspillage de pain de 70%. Je suis plus consciente de ma consommation réelle et j'économise de l'argent chaque mois.",
    },
    {
      id: 2,
      name: "Mehdi Khelifi",
      location: "Sousse",
      avatar: "/images/avatars/user2.png",
      content:
        "Les alertes de péremption m'ont sauvé plusieurs fois. Je ne jette presque plus rien et j'utilise le chatbot pour créer des recettes avec ce que j'ai dans mon frigo.",
    },
    {
      id: 3,
      name: "Leila Mansour",
      location: "Sfax",
      avatar: "/images/avatars/user3.png",
      content:
        "En tant que mère de famille, cette application m'a aidée à mieux gérer les courses et les repas. Mes enfants adorent aussi participer au suivi de notre inventaire.",
    },
    {
      id: 4,
      name: "Ahmed Trabelsi",
      location: "Monastir",
      avatar: "/images/avatars/user4.png",
      content:
        "L'interface est intuitive et les fonctionnalités sont vraiment utiles. J'apprécie particulièrement la communauté qui permet de partager les surplus alimentaires.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5" />

      <div className="container mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ce que disent nos utilisateurs
        </motion.h2>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full blur-md opacity-50" />
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 relative">
                    <AvatarImage
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback>{testimonials[currentIndex].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <blockquote className="text-xl italic mb-6">"{testimonials[currentIndex].content}"</blockquote>

                <div>
                  <p className="font-medium text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-full bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 md:translate-x-full bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
