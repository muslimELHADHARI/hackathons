"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface TestimonialData {
  id: number
  name: string
  title: string
  image: string
  quote: string
}

export default function ParallaxTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"])

  const testimonials: TestimonialData[] = [
    {
      id: 1,
      name: "Sarra Belhaj",
      title: "Étudiante",
      image: "/images/avatars/user1.png",
      quote:
        "Cette application a transformé ma façon de gérer mon alimentation. Je gaspille beaucoup moins et j'économise de l'argent chaque mois.",
    },
    {
      id: 2,
      name: "Mehdi Khelifi",
      title: "Entrepreneur",
      image: "/images/avatars/user2.png",
      quote:
        "Les fonctionnalités de suivi de l'inventaire et de planification des repas sont incroyablement utiles. Je recommande vivement cette application.",
    },
    {
      id: 3,
      name: "Leila Mansour",
      title: "Mère au foyer",
      image: "/images/avatars/user3.png",
      quote:
        "Grâce à cette application, j'ai pu réduire considérablement le gaspillage alimentaire de ma famille. C'est un outil indispensable pour une gestion responsable.",
    },
  ]

  return (
    <section className="relative h-[600px] overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="absolute inset-0">
        <motion.img
          src="/images/testimonials/background.png"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Témoignages</h2>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="max-w-2xl mx-auto">
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-white italic text-lg">{testimonial.quote}</p>
              <p className="text-gray-300 font-medium mt-2">
                {testimonial.name}, {testimonial.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
