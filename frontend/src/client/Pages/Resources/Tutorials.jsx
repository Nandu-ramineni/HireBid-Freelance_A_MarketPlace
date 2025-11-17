
import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
    Play,
    Clock,
    Users,
    Star,
    Search,
    Filter,
    Video,
    Code,
    Lightbulb,
    Target,
    TrendingUp,
    Bookmark,
    Share2,
    Eye,
    Globe,
    Zap,
    PlayCircle,
} from "lucide-react"

// Mock data for tutorials
const tutorialsData = [
    {
        id: 1,
        title: "Building Your First Agency Website",
        description: "Step-by-step tutorial on creating a professional agency website using modern web technologies.",
        category: "Web Development",
        difficulty: "Beginner",
        duration: "2h 30m",
        lessons: 12,
        author: {
            name: "Sarah Johnson",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsEkxVIubLIxRcsQTaXSrxQWhWCvv4mwPnA&s",
            company: "PixelPerfect Studios",
            expertise: "Full-Stack Developer",
        },
        thumbnail: "https://images.unsplash.com/photo-1642132652860-471b4228023e?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        videoUrl: "/placeholder-video.mp4",
        tags: ["React", "Next.js", "Tailwind CSS"],
        rating: 4.9,
        reviews: 456,
        enrollments: 2340,
        views: 12500,
        likes: 1890,
        publishedDate: "2024-12-15",
        lastUpdated: "2024-12-20",
        featured: true,
        premium: false,
        completed: 0,
        chapters: [
            { title: "Project Setup & Planning", duration: "15 min", completed: false },
            { title: "Design System Creation", duration: "25 min", completed: false },
            { title: "Header & Navigation", duration: "20 min", completed: false },
            { title: "Hero Section Design", duration: "18 min", completed: false },
            { title: "Services Section", duration: "22 min", completed: false },
            { title: "Portfolio Showcase", duration: "30 min", completed: false },
            { title: "About Us Page", duration: "15 min", completed: false },
            { title: "Contact Form Integration", duration: "25 min", completed: false },
            { title: "SEO Optimization", duration: "20 min", completed: false },
            { title: "Performance Optimization", duration: "18 min", completed: false },
            { title: "Deployment Setup", duration: "12 min", completed: false },
            { title: "Final Testing & Launch", duration: "10 min", completed: false },
        ],
    },
    {
        id: 2,
        title: "Advanced React Patterns for Agencies",
        description:
            "Master advanced React patterns and techniques to build scalable applications for your agency clients.",
        category: "Frontend Development",
        difficulty: "Advanced",
        duration: "4h 15m",
        lessons: 18,
        author: {
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            company: "TechFusion Agency",
            expertise: "React Specialist",
        },
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        videoUrl: "/placeholder-video.mp4",
        tags: ["React", "TypeScript", "State Management"],
        rating: 4.8,
        reviews: 234,
        enrollments: 1560,
        views: 8900,
        likes: 1234,
        publishedDate: "2024-12-10",
        lastUpdated: "2024-12-18",
        featured: false,
        premium: true,
        completed: 35,
        chapters: [
            { title: "Advanced Component Patterns", duration: "20 min", completed: true },
            { title: "Custom Hooks Deep Dive", duration: "25 min", completed: true },
            { title: "Context API Best Practices", duration: "18 min", completed: true },
            { title: "Performance Optimization", duration: "30 min", completed: true },
            { title: "Error Boundaries", duration: "15 min", completed: true },
            { title: "Code Splitting Strategies", duration: "22 min", completed: true },
            { title: "Testing Advanced Components", duration: "28 min", completed: false },
            { title: "State Management Patterns", duration: "25 min", completed: false },
        ],
    },
    {
        id: 3,
        title: "Client Communication Mastery",
        description: "Learn effective communication strategies to manage client relationships and project expectations.",
        category: "Business Skills",
        difficulty: "Intermediate",
        duration: "1h 45m",
        lessons: 8,
        author: {
            name: "Alex Rivera",
            avatar: "/placeholder.svg?height=40&width=40",
            company: "Visionary Design Co",
            expertise: "Project Manager",
        },
        thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        videoUrl: "/placeholder-video.mp4",
        tags: ["Communication", "Project Management", "Client Relations"],
        rating: 4.7,
        reviews: 189,
        enrollments: 980,
        views: 5670,
        likes: 789,
        publishedDate: "2024-12-05",
        lastUpdated: "2024-12-15",
        featured: false,
        premium: false,
        completed: 0,
        chapters: [
            { title: "Understanding Client Psychology", duration: "15 min", completed: false },
            { title: "Setting Clear Expectations", duration: "12 min", completed: false },
            { title: "Regular Check-ins & Updates", duration: "18 min", completed: false },
            { title: "Handling Difficult Conversations", duration: "20 min", completed: false },
            { title: "Scope Creep Management", duration: "16 min", completed: false },
            { title: "Feedback Collection & Implementation", duration: "14 min", completed: false },
            { title: "Project Closure & Follow-up", duration: "10 min", completed: false },
        ],
    },
    {
        id: 4,
        title: "Figma to Code Workflow",
        description: "Streamline your design-to-development process with efficient Figma to code workflows.",
        category: "Design & Development",
        difficulty: "Intermediate",
        duration: "3h 20m",
        lessons: 15,
        author: {
            name: "Emma Thompson",
            avatar: "/placeholder.svg?height=40&width=40",
            company: "Design Systems Pro",
            expertise: "UI/UX Designer",
        },
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        videoUrl: "/placeholder-video.mp4",
        tags: ["Figma", "CSS", "Design Systems"],
        rating: 4.6,
        reviews: 156,
        enrollments: 1200,
        views: 7890,
        likes: 945,
        publishedDate: "2024-11-28",
        lastUpdated: "2024-12-12",
        featured: false,
        premium: true,
        completed: 60,
        chapters: [
            { title: "Figma Basics for Developers", duration: "18 min", completed: true },
            { title: "Design Token Extraction", duration: "22 min", completed: true },
            { title: "Component Architecture", duration: "25 min", completed: true },
            { title: "Responsive Design Principles", duration: "20 min", completed: true },
            { title: "CSS Grid & Flexbox", duration: "28 min", completed: true },
            { title: "Animation Implementation", duration: "15 min", completed: true },
            { title: "Cross-browser Testing", duration: "12 min", completed: false },
        ],
    },
    {
        id: 5,
        title: "Agency Pricing Strategies",
        description: "Master the art of pricing your agency services for maximum profitability and client satisfaction.",
        category: "Business Strategy",
        difficulty: "Intermediate",
        duration: "2h 10m",
        lessons: 10,
        author: {
            name: "David Kim",
            avatar: "/placeholder.svg?height=40&width=40",
            company: "Business Growth Consultant",
            expertise: "Pricing Strategist",
        },
        thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QWdlbmN5JTIwUHJpY2luZyUyMFN0cmF0ZWdpZXN8ZW58MHx8MHx8fDA%3D",
        videoUrl: "/placeholder-video.mp4",
        tags: ["Pricing", "Business Strategy", "Negotiation"],
        rating: 4.8,
        reviews: 203,
        enrollments: 1450,
        views: 9230,
        likes: 1123,
        publishedDate: "2024-11-20",
        lastUpdated: "2024-12-08",
        featured: false,
        premium: true,
        completed: 0,
        chapters: [
            { title: "Value-Based Pricing Fundamentals", duration: "15 min", completed: false },
            { title: "Market Research & Analysis", duration: "18 min", completed: false },
            { title: "Creating Pricing Packages", duration: "22 min", completed: false },
            { title: "Negotiation Techniques", duration: "20 min", completed: false },
            { title: "Handling Price Objections", duration: "16 min", completed: false },
            { title: "Pricing Psychology", duration: "14 min", completed: false },
            { title: "Contract Structuring", duration: "12 min", completed: false },
            { title: "Pricing Review & Optimization", duration: "13 min", completed: false },
        ],
    },
    {
        id: 6,
        title: "Node.js API Development",
        description: "Build robust and scalable APIs using Node.js, Express, and modern backend technologies.",
        category: "Backend Development",
        difficulty: "Advanced",
        duration: "5h 30m",
        lessons: 22,
        author: {
            name: "Maria Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
            company: "Backend Solutions Inc",
            expertise: "Backend Engineer",
        },
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwWBd1_37ShBWTu8upf3OVIljmBdS65l-EPA&s",
        videoUrl: "/placeholder-video.mp4",
        tags: ["Node.js", "Express", "MongoDB", "API"],
        rating: 4.9,
        reviews: 178,
        enrollments: 890,
        views: 6540,
        likes: 823,
        publishedDate: "2024-11-15",
        lastUpdated: "2024-12-05",
        featured: false,
        premium: true,
        completed: 25,
        chapters: [
            { title: "Node.js Fundamentals", duration: "20 min", completed: true },
            { title: "Express.js Setup", duration: "15 min", completed: true },
            { title: "Database Integration", duration: "25 min", completed: true },
            { title: "Authentication & Authorization", duration: "30 min", completed: true },
            { title: "API Security Best Practices", duration: "22 min", completed: true },
            { title: "Error Handling", duration: "18 min", completed: false },
            { title: "Testing Strategies", duration: "25 min", completed: false },
            { title: "Deployment & Monitoring", duration: "20 min", completed: false },
        ],
    },
]

const categories = [
    { name: "All Tutorials", count: 45, icon: <Video className="h-4 w-4" /> },
    { name: "Web Development", count: 12, icon: <Code className="h-4 w-4" /> },
    { name: "Frontend Development", count: 8, icon: <Globe className="h-4 w-4" /> },
    { name: "Backend Development", count: 6, icon: <Zap className="h-4 w-4" /> },
    { name: "Design & Development", count: 7, icon: <Lightbulb className="h-4 w-4" /> },
    { name: "Business Skills", count: 5, icon: <Target className="h-4 w-4" /> },
    { name: "Business Strategy", count: 4, icon: <TrendingUp className="h-4 w-4" /> },
]

const learningPaths = [
    {
        title: "Complete Agency Developer",
        description: "Master full-stack development for agency work",
        tutorials: 8,
        duration: "24h",
        level: "Beginner to Advanced",
        color: "from-purple-500 to-blue-500",
    },
    {
        title: "Business Growth Mastery",
        description: "Learn to scale and grow your agency business",
        tutorials: 6,
        duration: "18h",
        level: "Intermediate",
        color: "from-emerald-500 to-teal-500",
    },
    {
        title: "Design to Development",
        description: "Bridge the gap between design and code",
        tutorials: 5,
        duration: "15h",
        level: "Intermediate",
        color: "from-orange-500 to-red-500",
    },
]

export default function Tutorials() {
    const [selectedCategory, setSelectedCategory] = useState("All Tutorials")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [filteredTutorials, setFilteredTutorials] = useState(tutorialsData)
    const [showFilters, setShowFilters] = useState(false)
    const [bookmarkedTutorials, setBookmarkedTutorials] = useState(new Set())
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [activeTab, setActiveTab] = useState("tutorials")
    const [playingVideo, setPlayingVideo] = useState(null)

    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, threshold: 0.2 })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        let filtered = tutorialsData

        if (selectedCategory !== "All Tutorials") {
            filtered = filtered.filter((tutorial) => tutorial.category === selectedCategory)
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (tutorial) =>
                    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    tutorial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
            )
        }

        switch (sortBy) {
            case "newest":
                filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
                break
            case "popular":
                filtered.sort((a, b) => b.enrollments - a.enrollments)
                break
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case "duration":
                filtered.sort((a, b) => a.duration.localeCompare(b.duration))
                break
        }

        setFilteredTutorials(filtered)
    }, [selectedCategory, searchQuery, sortBy])

    const toggleBookmark = (tutorialId) => {
        const newBookmarks = new Set(bookmarkedTutorials)
        if (newBookmarks.has(tutorialId)) {
            newBookmarks.delete(tutorialId)
        } else {
            newBookmarks.add(tutorialId)
        }
        setBookmarkedTutorials(newBookmarks)
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-100 text-green-700"
            case "Intermediate":
                return "bg-yellow-100 text-yellow-700"
            case "Advanced":
                return "bg-red-100 text-red-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden px-4 py-2 md:px-16 md:py-16">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 top-0 h-[40rem] w-[40rem] rounded-full bg-blue-500/10 blur-3xl"></div>
                <div
                    className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-purple-500/10 blur-3xl"
                    style={{
                        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * -20}px, ${(mousePosition.y / window.innerHeight - 0.5) * -20
                            }px)`,
                    }}
                ></div>
                <div className="absolute bottom-0 left-1/4 h-[35rem] w-[35rem] rounded-full bg-emerald-500/10 blur-3xl"></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="container relative mx-auto px-4 z-10">
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={controls}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm"
                        >
                            <Badge className="mr-2 bg-blue-600 text-white hover:bg-blue-700">Learn</Badge>
                            <span className="mr-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Interactive
                            </span>
                            Video Tutorials
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="block"
                            >
                                Learn by
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="mt-1 pb-2 block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
                            >
                                Doing
                            </motion.span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-2xl text-xl text-slate-600">
                            Master new skills with hands-on video tutorials created by industry experts. Build real projects and
                            advance your career.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                                >
                                    <Play className="mr-2 h-4 w-4" />
                                    Start Learning
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                                    Browse Tutorials
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Tabs */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="flex justify-center mb-12">
                            <motion.div
                                className="inline-block rounded-full p-1 bg-white border border-slate-200 shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <TabsList className="bg-transparent">
                                    <TabsTrigger
                                        value="tutorials"
                                        className={
                                            activeTab === "tutorials"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        <Video className="h-4 w-4 mr-2" />
                                        All Tutorials
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="paths"
                                        className={
                                            activeTab === "paths"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        <Target className="h-4 w-4 mr-2" />
                                        Learning Paths
                                    </TabsTrigger>
                                </TabsList>
                            </motion.div>
                        </div>

                        <TabsContent value="tutorials">
                            {/* Search and Filters */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-12"
                            >
                                <div className="flex flex-col lg:flex-row gap-4 items-center">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input
                                            placeholder="Search tutorials, topics, or technologies..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="h-12 px-4 border border-slate-200 rounded-lg bg-white"
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="popular">Most Popular</option>
                                            <option value="rating">Highest Rated</option>
                                            <option value="duration">Shortest First</option>
                                        </select>
                                        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Categories
                                        </Button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {showFilters && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-6 pt-6 border-t border-slate-200"
                                        >
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                                                {categories.map((category, index) => (
                                                    <motion.button
                                                        key={category.name}
                                                        onClick={() => setSelectedCategory(category.name)}
                                                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${selectedCategory === category.name
                                                                ? "bg-blue-100 border-blue-300 text-blue-700"
                                                                : "bg-white border-slate-200 hover:border-slate-300"
                                                            }`}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {category.icon}
                                                        <div className="text-left">
                                                            <div className="text-sm font-medium">{category.name}</div>
                                                            <div className="text-xs text-slate-500">{category.count} tutorials</div>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Featured Tutorial */}
                            {filteredTutorials.find((tutorial) => tutorial.featured) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-12"
                                >
                                    <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-700">Featured Tutorial</Badge>
                                    <h2 className="text-3xl font-bold mb-8">Start Here</h2>

                                    {(() => {
                                        const featuredTutorial = filteredTutorials.find((tutorial) => tutorial.featured)
                                        return (
                                            <motion.div
                                                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 p-1"
                                                whileHover={{ scale: 1.01 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="bg-white rounded-xl overflow-hidden">
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                                        <div className="relative group">
                                                            <img
                                                                src={featuredTutorial.thumbnail || "/placeholder.svg"}
                                                                alt={featuredTutorial.title}
                                                                className="w-full h-64 lg:h-full object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <motion.button
                                                                    className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors"
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => setPlayingVideo(featuredTutorial.id)}
                                                                >
                                                                    <Play className="h-8 w-8 text-blue-600" />
                                                                </motion.button>
                                                            </div>
                                                            <div className="absolute top-4 left-4">
                                                                <Badge className="bg-white/90 text-slate-700">
                                                                    <PlayCircle className="h-3 w-3 mr-1" />
                                                                    {featuredTutorial.lessons} Lessons
                                                                </Badge>
                                                            </div>
                                                            <div className="absolute bottom-4 right-4">
                                                                <Badge className="bg-white/90 text-slate-700">{featuredTutorial.duration}</Badge>
                                                            </div>
                                                        </div>

                                                        <div className="p-8">
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <Badge className={getDifficultyColor(featuredTutorial.difficulty)}>
                                                                    {featuredTutorial.difficulty}
                                                                </Badge>
                                                                <Badge variant="outline">{featuredTutorial.category}</Badge>
                                                                {featuredTutorial.premium && (
                                                                    <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>
                                                                )}
                                                            </div>

                                                            <h3 className="text-2xl font-bold mb-4">{featuredTutorial.title}</h3>
                                                            <p className="text-slate-600 mb-6">{featuredTutorial.description}</p>

                                                            <div className="flex items-center gap-4 mb-6">
                                                                <div className="flex items-center gap-2">
                                                                    <Avatar className="h-10 w-10">
                                                                        <AvatarImage src={featuredTutorial.author.avatar || "/placeholder.svg"} />
                                                                        <AvatarFallback>{featuredTutorial.author.name.charAt(0)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="font-medium text-sm">{featuredTutorial.author.name}</div>
                                                                        <div className="text-xs text-slate-500">{featuredTutorial.author.expertise}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                                    <span className="font-medium">{featuredTutorial.rating}</span>
                                                                    <span className="text-slate-500 text-sm">({featuredTutorial.reviews})</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-wrap gap-2 mb-6">
                                                                {featuredTutorial.tags.map((tag, index) => (
                                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>

                                                            <div className="flex gap-3">
                                                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
                                                                    <Play className="h-4 w-4 mr-2" />
                                                                    Start Tutorial
                                                                </Button>
                                                                <Button variant="outline">
                                                                    <Bookmark className="h-4 w-4 mr-2" />
                                                                    Save for Later
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    })()}
                                </motion.div>
                            )}

                            {/* Tutorials Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredTutorials.map((tutorial, index) => (
                                    <motion.div
                                        key={tutorial.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="group"
                                    >
                                        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:border-blue-200">
                                            <div className="relative">
                                                <img
                                                    src={tutorial.thumbnail || "/placeholder.svg"}
                                                    alt={tutorial.title}
                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <motion.button
                                                        className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setPlayingVideo(tutorial.id)}
                                                    >
                                                        <Play className="h-6 w-6 text-blue-600" />
                                                    </motion.button>
                                                </div>
                                                <div className="absolute top-4 left-4 flex gap-2">
                                                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                                                    {tutorial.premium && <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>}
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => toggleBookmark(tutorial.id)}
                                                        className={`bg-white/80 backdrop-blur-sm hover:bg-white ${bookmarkedTutorials.has(tutorial.id) ? "text-blue-600" : "text-slate-600"
                                                            }`}
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="absolute bottom-4 left-4">
                                                    <Badge className="bg-white/90 text-slate-700">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {tutorial.duration}
                                                    </Badge>
                                                </div>
                                                <div className="absolute bottom-4 right-4">
                                                    <Badge className="bg-white/90 text-slate-700">{tutorial.lessons} Lessons</Badge>
                                                </div>
                                            </div>

                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline">{tutorial.category}</Badge>
                                                    {tutorial.completed > 0 && (
                                                        <Badge className="bg-green-100 text-green-700">{tutorial.completed}% Complete</Badge>
                                                    )}
                                                </div>
                                                <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                    {tutorial.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-3">{tutorial.description}</CardDescription>
                                            </CardHeader>

                                            <CardContent className="pb-2">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={tutorial.author.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>{tutorial.author.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium text-sm">{tutorial.author.name}</div>
                                                        <div className="text-xs text-slate-500">{tutorial.author.expertise}</div>
                                                    </div>
                                                </div>

                                                {tutorial.completed > 0 && (
                                                    <div className="mb-4">
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span>Progress</span>
                                                            <span>{tutorial.completed}%</span>
                                                        </div>
                                                        <Progress value={tutorial.completed} className="h-2" />
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-medium">{tutorial.rating}</span>
                                                        <span>({tutorial.reviews})</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1">
                                                            <Users className="h-3 w-3" />
                                                            <span>{tutorial.enrollments.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="h-3 w-3" />
                                                            <span>{tutorial.views.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {tutorial.tags.slice(0, 3).map((tag, tagIndex) => (
                                                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>

                                            <CardFooter className="pt-0">
                                                <div className="flex gap-2 w-full">
                                                    <Button className="flex-1 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        <Play className="h-4 w-4 mr-2" />
                                                        {tutorial.completed > 0 ? "Continue" : "Start"}
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="paths">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl font-bold mb-4">Structured Learning Paths</h2>
                                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                    Follow curated learning paths designed to take you from beginner to expert in specific areas.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {learningPaths.map((path, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="group"
                                    >
                                        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl">
                                            <div className={`h-32 bg-gradient-to-r ${path.color} relative overflow-hidden`}>
                                                <div className="absolute inset-0 bg-black/10"></div>
                                                <div className="absolute bottom-4 left-4 text-white">
                                                    <Badge className="bg-white/20 text-white mb-2">{path.level}</Badge>
                                                    <h3 className="text-xl font-bold">{path.title}</h3>
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <p className="text-slate-600 mb-4">{path.description}</p>
                                                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Video className="h-4 w-4" />
                                                        <span>{path.tutorials} tutorials</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{path.duration}</span>
                                                    </div>
                                                </div>
                                                <Button className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                    Start Learning Path
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Video Player Modal */}
            <AnimatePresence>
                {playingVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setPlayingVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative bg-black aspect-video">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <PlayCircle className="h-16 w-16 mx-auto mb-4" />
                                        <p>Video Player Placeholder</p>
                                        <p className="text-sm opacity-70">
                                            Tutorial: {tutorialsData.find((t) => t.id === playingVideo)?.title}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setPlayingVideo(null)}
                                        className="text-white hover:bg-white/20"
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Newsletter CTA */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 p-2"
                    >
                        <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm p-8 md:p-12 lg:p-16 text-center">
                            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">New Tutorials Weekly</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Never Miss a Tutorial</h2>
                            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                                Get notified when new tutorials are released and receive exclusive learning resources directly in your
                                inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                />
                                <Button className="bg-white text-blue-700 hover:bg-blue-50 whitespace-nowrap">Subscribe</Button>
                            </div>
                            <p className="text-white/70 text-sm mt-3">Join 15,000+ learners. Unsubscribe anytime.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
