"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, BarChart2, Users, ChefHat, Camera, Award } from "lucide-react"
import { FluidButton } from "@/components/fluid-button"
import { Card, CardContent } from "@/components/ui/card"
import { ParticleBackground } from "@/components/animations/particle-background"
import { TextAnimation } from "@/components/animations/text-animation"
import { ScrollAnimation } from "@/components/animations/scroll-animation"
import { Card3DEffect } from "@/components/animations/card-3d-effect"
import Link from "next/link"

// Composant pour les statistiques
function StatCard({
  value,
  label,
  icon,
  color,
  delay,
}: { value: string; label: string; icon: React.ReactNode; color: string; delay: number }) {
  return (
    <ScrollAnimation type="slide-up" delay={delay} once={true}>
      <Card3DEffect>
        <Card className="border-none shadow-lg overflow-hidden h-full">
          <CardContent className="p-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4`}>{icon}</div>
            <h3 className="text-3xl font-bold mb-1">{value}</h3>
            <p className="text-gray-600 dark:text-gray-400">{label}</p>
          </CardContent>
        </Card>
      </Card3DEffect>
    </ScrollAnimation>
  )
}

// Composant pour les fonctionnalités
function FeatureCard({
  title,
  description,
  icon,
  color,
  delay,
}: { title: string; description: string; icon: React.ReactNode; color: string; delay: number }) {
  return (
    <ScrollAnimation type="slide-up" delay={delay} once={true}>
      <Card3DEffect>
        <Card className="border-none shadow-lg overflow-hidden h-full">
          <CardContent className="p-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4`}>{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </CardContent>
        </Card>
      </Card3DEffect>
    </ScrollAnimation>
  )
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Section Héro */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <ParticleBackground
          count={20}
          colors={["#10B981", "#3B82F6", "#8B5CF6"]}
          minSize={16}
          maxSize={32}
          useEmojis={true}
        />

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <TextAnimation
                text="Réduisez le gaspillage alimentaire"
                className="text-4sxl md:text-4xl font-bold mb-6 fluid-text-gradient" // Adjusted sizes
                type="wave"
                staggerChildren={0.03}
              />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Une approche innovante pour gérer vos aliments, réduire le gaspillage et économiser de l'argent tout en
              préservant la planète.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/register">
                <FluidButton variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                  Commencer maintenant
                </FluidButton>
              </Link>
              <Link href="/dashboard">
                <FluidButton variant="outline">Découvrir</FluidButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <ScrollAnimation type="fade" once={true}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fluid-text-gradient">
              L'Impact du Gaspillage en Tunisie
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              value="900,000"
              label="Baguettes gaspillées par jour"
              icon={<Leaf className="h-6 w-6 text-white" />}
              color="bg-emerald-500 text-white"
              delay={0.1}
            />
            <StatCard
              value="16%"
              label="Du budget alimentaire gaspillé"
              icon={<BarChart2 className="h-6 w-6 text-white" />}
              color="bg-blue-500 text-white"
              delay={0.2}
            />
            <StatCard
              value="68 kg"
              label="Nourriture gaspillée par personne"
              icon={<Users className="h-6 w-6 text-white" />}
              color="bg-purple-500 text-white"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <ScrollAnimation type="fade" once={true}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 fluid-text-gradient">
              Fonctionnalités Principales
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Découvrez comment notre application vous aide à réduire le gaspillage alimentaire avec des outils
              innovants et intuitifs.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Inventaire Intelligent"
              description="Suivez vos aliments et recevez des alertes avant qu'ils n'expirent pour réduire le gaspillage."
              icon={<BarChart2 className="h-6 w-6 text-white" />}
              color="bg-emerald-500 text-white"
              delay={0.1}
            />
            <FeatureCard
              title="Recettes Anti-Gaspi"
              description="Découvrez des recettes personnalisées basées sur les ingrédients que vous avez déjà."
              icon={<ChefHat className="h-6 w-6 text-white" />}
              color="bg-blue-500 text-white"
              delay={0.2}
            />
            <FeatureCard
              title="Scanner d'Aliments"
              description="Scannez vos aliments pour les ajouter automatiquement à votre inventaire."
              icon={<Camera className="h-6 w-6 text-white" />}
              color="bg-purple-500 text-white"
              delay={0.3}
            />
            <FeatureCard
              title="Communauté Engagée"
              description="Partagez vos surplus avec votre communauté locale et échangez des astuces."
              icon={<Users className="h-6 w-6 text-white" />}
              color="bg-amber-500 text-white"
              delay={0.4}
            />
            <FeatureCard
              title="Statistiques Détaillées"
              description="Visualisez votre impact sur l'environnement et vos économies réalisées."
              icon={<BarChart2 className="h-6 w-6 text-white" />}
              color="bg-pink-500 text-white"
              delay={0.5}
            />
            <FeatureCard
              title="Système de Récompenses"
              description="Gagnez des badges et des points en réduisant votre gaspillage alimentaire."
              icon={<Award className="h-6 w-6 text-white" />}
              color="bg-indigo-500 text-white"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-500 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] bg-repeat"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation type="fade" once={true}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à réduire votre gaspillage alimentaire?</h2>
              <p className="text-xl mb-8 text-white/80">
                Rejoignez des milliers d'utilisateurs qui font une différence chaque jour. Commencez gratuitement dès
                maintenant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <FluidButton variant="secondary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                    S'inscrire gratuitement
                  </FluidButton>
                </Link>
                <Link href="/login">
                  <FluidButton variant="outline" className="border-white text-white hover:bg-white/10">
                    Se connecter
                  </FluidButton>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}
