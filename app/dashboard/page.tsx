"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import ConsumptionChart from "@/components/dashboard/consumption-chart"
import WasteReductionChart from "@/components/dashboard/waste-reduction-chart"
import UpcomingExpirations from "@/components/dashboard/upcoming-expirations"
import ShoppingList from "@/components/dashboard/shopping-list"
import { ImpactCard } from "@/components/statistics/impact-card"
import FluidButton from "@/components/fluid-button"
import WasteTracking from "@/components/dashboard/waste-tracking"
import ConsumptionAnalysis from "@/components/dashboard/consumption-analysis"
import MealPlanning from "@/components/dashboard/meal-planning"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
    <motion.div
      className="container mx-auto py-8 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
            Tableau de Bord
          </h1>
          <p className="text-muted-foreground">Suivez votre consommation et réduisez votre gaspillage alimentaire.</p>
        </div>
        <FluidButton variant="primary" icon={<Plus className="h-4 w-4" />}>
          Ajouter un aliment
        </FluidButton>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8" variants={itemVariants}>
        <ImpactCard
          title="Économies ce mois"
          value={45}
          unit="DT"
          image="/images/stats/money-saved.png"
          trend={{ value: 12.5, isPositive: true }}
        />

        <ImpactCard
          title="Gaspillage réduit"
          value={68}
          unit="%"
          image="/images/stats/waste-reduction.png"
          trend={{ value: 5.2, isPositive: true }}
        />

        <ImpactCard
          title="Aliments suivis"
          value={24}
          image="/images/stats/food-tracked.png"
          trend={{ value: 3, isPositive: true }}
        />

        <ImpactCard
          title="Alertes actives"
          value={5}
          image="/images/stats/alerts.png"
          trend={{ value: 2, isPositive: false }}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="fluid-tabs">
            <TabsTrigger value="overview" className="fluid-tab">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="consumption" className="fluid-tab">
              Consommation
            </TabsTrigger>
            <TabsTrigger value="waste" className="fluid-tab">
              Gaspillage
            </TabsTrigger>
            <TabsTrigger value="planning" className="fluid-tab">
              Planification
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1 overflow-hidden fluid-card">
                    <CardHeader>
                      <CardTitle>Consommation Hebdomadaire</CardTitle>
                      <CardDescription>Votre consommation d'aliments essentiels cette semaine</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <ConsumptionChart />
                    </CardContent>
                  </Card>

                  <Card className="col-span-1 overflow-hidden fluid-card">
                    <CardHeader>
                      <CardTitle>Réduction du Gaspillage</CardTitle>
                      <CardDescription>Votre progression dans la réduction du gaspillage</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <WasteReductionChart />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1 overflow-hidden fluid-card">
                    <CardHeader>
                      <CardTitle>Dates de Péremption</CardTitle>
                      <CardDescription>Aliments qui vont bientôt expirer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <UpcomingExpirations />
                    </CardContent>
                  </Card>

                  <Card className="col-span-1 overflow-hidden fluid-card">
                    <CardHeader>
                      <CardTitle>Liste de Courses Recommandée</CardTitle>
                      <CardDescription>Basée sur votre consommation et inventaire actuel</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ShoppingList />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="consumption" className="space-y-4">
                <ConsumptionAnalysis />
              </TabsContent>

              <TabsContent value="waste" className="space-y-4">
                <WasteTracking />
              </TabsContent>

              <TabsContent value="planning" className="space-y-4">
                <MealPlanning />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
