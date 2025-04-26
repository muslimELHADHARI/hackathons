"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Share2, ThumbsUp, MapPin, Filter, Search } from "lucide-react"
import { FluidButton } from "@/components/fluid-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Données simulées pour la communauté
const communityCategories = [
  { id: "all", name: "Tous" },
  { id: "events", name: "Événements" },
  { id: "exchanges", name: "Échanges" },
  { id: "tips", name: "Astuces" },
  { id: "discussions", name: "Discussions" },
]

const communityPosts = [
  {
    id: 1,
    type: "event",
    title: "Atelier cuisine anti-gaspi",
    description: "Rejoignez-nous pour apprendre à cuisiner avec des restes et réduire le gaspillage alimentaire.",
    author: {
      name: "Marie L.",
      avatar: "/images/avatars/user1.png",
    },
    date: "2023-12-15",
    location: "Centre culturel, Tunis",
    likes: 24,
    comments: 8,
    shares: 12,
    image: "/images/community/workshop.jpg",
  },
  {
    id: 2,
    type: "exchange",
    title: "Fruits et légumes à partager",
    description: "J'ai trop de tomates et courgettes de mon jardin. Qui veut en profiter?",
    author: {
      name: "Ahmed K.",
      avatar: "/images/avatars/user2.png",
    },
    date: "2023-12-10",
    location: "La Marsa, Tunis",
    likes: 18,
    comments: 15,
    shares: 5,
    image: "/images/community/vegetables.jpg",
  },
  {
    id: 3,
    type: "tip",
    title: "Conservation des herbes fraîches",
    description: "Astuce: congelez vos herbes fraîches dans des bacs à glaçons avec de l'huile d'olive!",
    author: {
      name: "Sophia B.",
      avatar: "/images/avatars/user3.png",
    },
    date: "2023-12-08",
    likes: 42,
    comments: 7,
    shares: 28,
    image: "/images/community/herbs.jpg",
  },
  {
    id: 4,
    type: "discussion",
    title: "Meilleure façon de composter en appartement?",
    description:
      "Je vis en appartement et je cherche des solutions pour composter mes déchets alimentaires. Des idées?",
    author: {
      name: "Karim M.",
      avatar: "/images/avatars/user4.png",
    },
    date: "2023-12-05",
    likes: 15,
    comments: 23,
    shares: 3,
  },
  {
    id: 5,
    type: "event",
    title: "Marché de producteurs locaux",
    description: "Venez découvrir les produits frais et locaux de notre région ce weekend!",
    author: {
      name: "Association Terre Vivante",
      avatar: "/images/avatars/user1.png",
    },
    date: "2023-12-17",
    location: "Place centrale, Sousse",
    likes: 31,
    comments: 4,
    shares: 19,
    image: "/images/community/market.jpg",
  },
  {
    id: 6,
    type: "tip",
    title: "Réutiliser les épluchures",
    description: "Ne jetez plus vos épluchures de légumes! Voici 5 façons créatives de les utiliser.",
    author: {
      name: "Leila T.",
      avatar: "/images/avatars/user3.png",
    },
    date: "2023-12-03",
    likes: 37,
    comments: 12,
    shares: 24,
    image: "/images/community/peels.jpg",
  },
]

// Composant pour un post communautaire
function CommunityPostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(false)

  const typeColors = {
    event: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    exchange: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    tip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    discussion: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  }

  const typeLabels = {
    event: "Événement",
    exchange: "Échange",
    tip: "Astuce",
    discussion: "Discussion",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group"
    >
      <Card className="overflow-hidden fluid-card h-full">
        <CardContent className="p-0">
          {post.image && (
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <Badge className={typeColors[post.type as keyof typeof typeColors]}>
                {typeLabels[post.type as keyof typeof typeLabels]}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </span>
            </div>

            <h3 className="font-medium text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.description}</p>

            {post.location && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{post.location}</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{post.author.name}</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  className={`flex items-center text-xs ${liked ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}
                  onClick={() => setLiked(!liked)}
                >
                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                  <span>{liked ? post.likes + 1 : post.likes}</span>
                </button>
                <button className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Share2 className="h-3.5 w-3.5 mr-1" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Composant principal de la page communautaire
export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(communityPosts)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    let posts = [...communityPosts]

    // Filtrer par catégorie
    if (activeCategory !== "all") {
      const categoryMap: Record<string, string> = {
        events: "event",
        exchanges: "exchange",
        tips: "tip",
        discussions: "discussion",
      }
      posts = posts.filter((post) => post.type === categoryMap[activeCategory])
    }

    // Filtrer par recherche
    if (searchQuery) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredPosts(posts)
  }, [activeCategory, searchQuery])

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
            Communauté
          </h1>
          <p className="text-muted-foreground">
            Partagez, échangez et apprenez avec d'autres personnes engagées contre le gaspillage
          </p>
        </div>
        <FluidButton variant="primary" icon={<MessageSquare className="h-4 w-4" />}>
          Créer un post
        </FluidButton>
      </motion.div>

      <motion.div className="mb-6 flex flex-col md:flex-row gap-4" variants={itemVariants}>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Rechercher dans la communauté..."
            className="pl-9 fluid-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <FluidButton variant="outline" icon={<Filter className="h-4 w-4" />}>
          Filtrer
        </FluidButton>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveCategory}>
          <TabsList className="fluid-tabs flex flex-nowrap overflow-x-auto pb-1 mb-2 w-full">
            {communityCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="fluid-tab whitespace-nowrap">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => <CommunityPostCard key={post.id} post={post} />)
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Aucun post trouvé. Soyez le premier à partager quelque chose!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
