"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

// Données simulées pour le profil utilisateur
const userData = {
  name: "Sarah Ben Ali",
  username: "@sarahbenali",
  avatar: "/images/avatars/user1.png",
  bio: "Passionnée de cuisine et engagée dans la lutte contre le gaspillage alimentaire. Je partage mes astuces et recettes anti-gaspi!",
  location: "Tunis, Tunisie",
  joinedDate: "Septembre 2023",
  stats: {
    foodSaved: 45,
    recipesCreated: 12,
    postsShared: 28,
    wasteReduction: 68,
  },
  badges: [
    {
      id: 1,
      name: "Guerrier Anti-Gaspi",
      description: "A réduit son gaspillage de 50%",
      image: "/images/badges/waste-warrior.png",
      date: "2023-11-15",
    },
    {
      id: 2,
      name: "Maître du Frigo",
      description: "A optimisé l'utilisation de son réfrigérateur",
      image: "/images/badges/fridge-master.png",
      date: "2023-10-22",
    },
    {
      id: 3,
      name: "Sauveur de Pain",
      description: "A sauvé 10kg de pain du gaspillage",
      image: "/images/badges/bread-savior.png",
      date: "2023-09-30",
    },
    {
      id: 4,
      name: "Chef Créatif",
      description: "A créé 10 recettes anti-gaspi",
      image: "/images/badges/creative-chef.png",
      date: "2023-11-05",
    },
    {
      id: 5,
      name: "Héros Écologique",
      description: "A économisé 100kg de CO2",
      image: "/images/badges/eco-hero.png",
      date: "2023-10-10",
    },
    {
      id: 6,
      name: "Partageur Communautaire",
      description: "A partagé 20 posts dans la communauté",
      image: "/images/badges/community-sharer.png",
      date: "2023-11-20",
    },
  ],
  activities: [
    { id: 1, type: "recipe", title: "A créé une recette: Pain perdu aux fruits", date: "2023-11-28" },
    { id: 2, type: "food", title: "A ajouté 5 nouveaux aliments à l'inventaire", date: "2023-11-26" },
    { id: 3, type: "badge", title: "A obtenu le badge: Héros Écologique", date: "2023-11-20" },
    { id: 4, type: "community", title: "A partagé un post: Conservation des herbes fraîches", date: "2023-11-18" },
    { id: 5, type: "waste", title: "A réduit son gaspillage de 5% cette semaine", date: "2023-11-15" },
    { id: 6, type: "recipe", title: "A créé une recette: Soupe de légumes", date: "2023-11-10" },
  ],
  savedRecipes: [
    { id: 1, name: "Pain perdu aux fruits", image: "/images/recipes/pain-perdu.png", date: "2023-11-28" },
    { id: 3, name: "Salade de pâtes", image: "/images/recipes/salade-pates.png", date: "2023-11-15" },
    { id: 6, name: "Crumble de légumes", image: "/images/recipes/crumble-legumes.png", date: "2023-10-22" },
  ],
}

// Composant pour un badge
function BadgeCard({ badge }: { badge: any }) {
  return (
    <div className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-500 dark:to-blue-500 flex items-center justify-center p-1 shadow-lg group-hover:shadow-emerald-200/50 dark:group-hover:shadow-emerald-700/50 transition-all duration-300">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image src={badge.image || "/placeholder.svg"} alt={badge.name} fill className="object-cover" />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900">
          ✓
        </div>
      </div>
      <div className="mt-3 text-center">
        <h4 className="text-sm font-medium">{badge.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {badge.description}
        </p>
      </div>
    </div>
  )
}

// Composant pour une activité
function ActivityItem({ activity }: { activity: any }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "recipe":
        return "🍳"
      case "food":
        return "🥕"
      case "badge":
        return "🏆"
      case "community":
        return "👥"
      case "waste":
        return "♻️"
      default:
        return "📝"
    }
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-800 dark:to-blue-800 flex items-center justify-center text-lg">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="text-sm">{activity.title}</p>
        <div className="flex items-center gap-1 mt-1">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
        </div>
      </div>
    </div>
  )
}

// Composant pour une recette sauvegardée
function SavedRecipeCard({ recipe }: { recipe: any }) {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h4 className="text-white font-medium text-sm">{recipe.name}</h4>
        <div className="flex items-center gap-1 mt-1">
          <Calendar className="w-3 h-3 text-gray-300" />
          <span className="text-xs text-gray-300">{recipe.date}</span>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* En-tête du profil */}
      <div className="relative mb-8">
        {/* Bannière */}
        <div className="h-48 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-400 to-blue-500 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
        </div>

        {/* Informations du profil */}
        <div className="flex flex-col md:flex-row gap-6 relative -mt-16 px-4">
          <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-lg bg-white dark:bg-gray-900">
            <Image src={userData.avatar || "/placeholder.svg"} alt={userData.name} fill className="object-cover" />
          </div>

          <div className="flex-1 pt-4 md:pt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{userData.username}</p>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                Modifier le profil
              </Button>
            </div>

            <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl">{userData.bio}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span className="text-gray-700 dark:text-gray-300">📍</span> {userData.location}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-700 dark:text-gray-300">📅</span> Membre depuis {userData.joinedDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-none shadow-md">
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{userData.stats.foodSaved}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Aliments sauvés</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-none shadow-md">
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{userData.stats.recipesCreated}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Recettes créées</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-none shadow-md">
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {userData.stats.postsShared}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Posts partagés</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-none shadow-md">
          <CardContent className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{userData.stats.wasteReduction}%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Réduction du gaspillage</p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-800/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="badges" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Badges
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Activités
          </TabsTrigger>
          <TabsTrigger value="recipes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Recettes
          </TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badges récents */}
            <Card>
              <CardHeader>
                <CardTitle>Badges récents</CardTitle>
                <CardDescription>Vos dernières récompenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {userData.badges.slice(0, 3).map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activités récentes */}
            <Card>
              <CardHeader>
                <CardTitle>Activités récentes</CardTitle>
                <CardDescription>Vos dernières actions</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-y-auto">
                <div className="space-y-1">
                  {userData.activities.slice(0, 4).map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recettes sauvegardées */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recettes sauvegardées</CardTitle>
                <CardDescription>Vos recettes préférées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userData.savedRecipes.map((recipe) => (
                    <SavedRecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Badges */}
        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Tous les badges</CardTitle>
              <CardDescription>Vos récompenses et accomplissements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {userData.badges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activités */}
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Historique d'activités</CardTitle>
              <CardDescription>Toutes vos actions récentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {userData.activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recettes */}
        <TabsContent value="recipes">
          <Card>
            <CardHeader>
              <CardTitle>Mes recettes</CardTitle>
              <CardDescription>Recettes que vous avez créées ou sauvegardées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userData.savedRecipes.map((recipe) => (
                  <SavedRecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
