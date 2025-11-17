
import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    BookOpen,
    Clock,
    Users,
    Star,
    Download,
    Search,
    Filter,
    ChevronRight,
    Target,
    TrendingUp,
    Award,
    ArrowRight,
    Bookmark,
    Share2,
    Eye,
    Zap,
} from "lucide-react"

// Mock data for guides
const guidesData = [
    {
        id: 1,
        title: "Guide to Building a Successful Agency",
        description:
            "Everything you need to know about starting, growing, and scaling your digital agency from zero to seven figures.",
        category: "Agency Growth",
        difficulty: "Beginner",
        readTime: "45 min",
        author: {
            name: "Sarah Johnson",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyJaDGTfeDton6EmQvE-KYkmvUXAwd5JHqA&s",
            company: "PixelPerfect Studios",
            expertise: "Agency Owner",
        },
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Business Strategy", "Growth", "Management"],
        rating: 4.9,
        reviews: 234,
        downloads: 1250,
        views: 5670,
        likes: 892,
        publishedDate: "2024-12-15",
        chapters: [
            "Foundation & Business Setup",
            "Finding Your Niche",
            "Building Your Team",
            "Client Acquisition Strategies",
            "Scaling Operations",
            "Financial Management",
        ],
        featured: true,
        premium: false,
    },
    {
        id: 2,
        title: "Freelancer's Guide to Premium Pricing",
        description:
            "Learn how to position yourself as a premium service provider and command higher rates for your expertise.",
        category: "Freelancing",
        difficulty: "Intermediate",
        readTime: "30 min",
        author: {
            name: "Michael Chen",
            avatar: "https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740",
            company: "Independent Consultant",
            expertise: "Pricing Strategist",
        },
        image: "https://images.unsplash.com/photo-1603201667230-bd139210db18?q=80&w=1188&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Pricing", "Strategy", "Value Proposition"],
        rating: 4.8,
        reviews: 189,
        downloads: 980,
        views: 3420,
        likes: 567,
        publishedDate: "2024-12-10",
        chapters: [
            "Understanding Value-Based Pricing",
            "Market Research & Positioning",
            "Creating Premium Packages",
            "Negotiation Techniques",
            "Client Communication",
        ],
        featured: false,
        premium: true,
    },
    {
        id: 3,
        title: "Client Onboarding Mastery",
        description: "Create seamless client experiences that reduce churn and increase project success rates.",
        category: "Client Management",
        difficulty: "Intermediate",
        readTime: "25 min",
        author: {
            name: "Alex Rivera",
            avatar: "https://media.istockphoto.com/id/1289461335/photo/portrait-of-a-handsome-black-man.jpg?s=612x612&w=0&k=20&c=gDibbpmkeV04ta3ociwAgpqcjdeU5sI1nnd78wrnz-g=",
            company: "Visionary Design Co",
            expertise: "Project Manager",
        },
        image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Client Relations", "Process", "Communication"],
        rating: 4.7,
        reviews: 156,
        downloads: 750,
        views: 2890,
        likes: 423,
        publishedDate: "2024-12-05",
        chapters: [
            "Pre-Project Planning",
            "Welcome Process Design",
            "Expectation Setting",
            "Communication Frameworks",
            "Success Metrics",
        ],
        featured: false,
        premium: false,
    },
    {
        id: 4,
        title: "Digital Marketing for Service Providers",
        description: "Comprehensive guide to marketing your services online and building a strong digital presence.",
        category: "Marketing",
        difficulty: "Beginner",
        readTime: "40 min",
        author: {
            name: "Emma Thompson",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi0H2fhOwp8LmXWibHH5AYE_3Ad34UKX2Ug&s",
            company: "Growth Marketing Pro",
            expertise: "Marketing Strategist",
        },
        image: "https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Digital Marketing", "SEO", "Content Strategy"],
        rating: 4.6,
        reviews: 203,
        downloads: 1100,
        views: 4560,
        likes: 678,
        publishedDate: "2024-11-28",
        chapters: [
            "Digital Marketing Fundamentals",
            "Content Marketing Strategy",
            "SEO for Service Providers",
            "Social Media Marketing",
            "Email Marketing",
            "Analytics & Optimization",
        ],
        featured: false,
        premium: false,
    },
    {
        id: 5,
        title: "Remote Team Management Excellence",
        description:
            "Best practices for managing distributed teams and maintaining productivity in remote work environments.",
        category: "Team Management",
        difficulty: "Advanced",
        readTime: "35 min",
        author: {
            name: "David Kim",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQiUvtYCuHnxrQ9iJVqomIDZ-QUVdSUwyKgQ&s",
            company: "Remote First Agency",
            expertise: "Team Lead",
        },
        image: "https://images.unsplash.com/photo-1630673507885-1754499d2d03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Remote Work", "Team Building", "Productivity"],
        rating: 4.8,
        reviews: 167,
        downloads: 890,
        views: 3210,
        likes: 534,
        publishedDate: "2024-11-20",
        chapters: [
            "Remote Culture Building",
            "Communication Tools & Processes",
            "Performance Management",
            "Team Collaboration",
            "Work-Life Balance",
        ],
        featured: false,
        premium: true,
    },
    {
        id: 6,
        title: "Financial Planning for Creative Businesses",
        description: "Essential financial strategies for agencies and freelancers to ensure long-term sustainability.",
        category: "Finance",
        difficulty: "Intermediate",
        readTime: "50 min",
        author: {
            name: "Maria Rodriguez",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwLGMs0rN3kmPrzHe6GtSH-aTfBX7qRo2QyA&s",
            company: "Financial Advisor",
            expertise: "Business Finance",
        },
        image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Finance", "Budgeting", "Cash Flow"],
        rating: 4.9,
        reviews: 145,
        downloads: 670,
        views: 2340,
        likes: 389,
        publishedDate: "2024-11-15",
        chapters: [
            "Financial Planning Basics",
            "Cash Flow Management",
            "Tax Strategies",
            "Investment Planning",
            "Risk Management",
        ],
        featured: false,
        premium: true,
    },
]

const categories = [
    { name: "All Guides", count: 24, icon: <BookOpen className="h-4 w-4" /> },
    { name: "Agency Growth", count: 8, icon: <TrendingUp className="h-4 w-4" /> },
    { name: "Freelancing", count: 6, icon: <Users className="h-4 w-4" /> },
    { name: "Client Management", count: 5, icon: <Target className="h-4 w-4" /> },
    { name: "Marketing", count: 4, icon: <Zap className="h-4 w-4" /> },
    { name: "Team Management", count: 3, icon: <Users className="h-4 w-4" /> },
    { name: "Finance", count: 2, icon: <Award className="h-4 w-4" /> },
]

const featuredStats = [
    { label: "Total Guides", value: "50+", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Expert Authors", value: "25+", icon: <Users className="h-5 w-5" /> },
    { label: "Downloads", value: "15K+", icon: <Download className="h-5 w-5" /> },
    { label: "Avg Rating", value: "4.8", icon: <Star className="h-5 w-5" /> },
]

export default function Guides() {
    const [selectedCategory, setSelectedCategory] = useState("All Guides")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [filteredGuides, setFilteredGuides] = useState(guidesData)
    const [showFilters, setShowFilters] = useState(false)
    const [bookmarkedGuides, setBookmarkedGuides] = useState(new Set())
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
        let filtered = guidesData

        // Filter by category
        if (selectedCategory !== "All Guides") {
            filtered = filtered.filter((guide) => guide.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(
                (guide) =>
                    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    guide.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
            )
        }

        // Sort guides
        switch (sortBy) {
            case "newest":
                filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
                break
            case "popular":
                filtered.sort((a, b) => b.views - a.views)
                break
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case "downloads":
                filtered.sort((a, b) => b.downloads - a.downloads)
                break
        }

        setFilteredGuides(filtered)
    }, [selectedCategory, searchQuery, sortBy])

    const toggleBookmark = (guideId) => {
        const newBookmarks = new Set(bookmarkedGuides)
        if (newBookmarks.has(guideId)) {
            newBookmarks.delete(guideId)
        } else {
            newBookmarks.add(guideId)
        }
        setBookmarkedGuides(newBookmarks)
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

    const cardVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 8 },
        },
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden px-4 py-2 md:px-16 md:py-16" >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 top-0 h-[40rem] w-[40rem] rounded-full bg-purple-500/10 blur-3xl"></div>
                <div
                    className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
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
                            className="mb-6 inline-flex items-center rounded-full border border-purple-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm"
                        >
                            <Badge className="mr-2 bg-purple-600 text-white hover:bg-purple-700">New</Badge>
                            <span className="mr-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Expert
                            </span>
                            Guides & Resources
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
                                Master Your
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="mt-1 block bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent"
                            >
                                Business Journey
                            </motion.span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-2xl text-xl text-slate-600">
                            Comprehensive guides written by industry experts to help you build, grow, and scale your business with
                            proven strategies and actionable insights.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                                >
                                    Browse All Guides <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                                    Download Free Guide
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {featuredStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-sm text-slate-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4 relative z-10">
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
                                    placeholder="Search guides, topics, or authors..."
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
                                    <option value="downloads">Most Downloaded</option>
                                </select>
                                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
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
                                                        ? "bg-purple-100 border-purple-300 text-purple-700"
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
                                                    <div className="text-xs text-slate-500">{category.count} guides</div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Featured Guide */}
            {filteredGuides.find((guide) => guide.featured) && (
                <section className="py-12 relative">
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-700">Featured Guide</Badge>
                            <h2 className="text-3xl font-bold mb-4">Editor's Pick</h2>
                        </motion.div>

                        {(() => {
                            const featuredGuide = filteredGuides.find((guide) => guide.featured)
                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    whileHover={{ y: -5 }}
                                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 p-1"
                                >
                                    <div className="bg-white rounded-xl p-8">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Badge className={getDifficultyColor(featuredGuide.difficulty)}>
                                                        {featuredGuide.difficulty}
                                                    </Badge>
                                                    <Badge variant="outline">{featuredGuide.category}</Badge>
                                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                                        <Clock className="h-4 w-4" />
                                                        {featuredGuide.readTime}
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-bold mb-4">{featuredGuide.title}</h3>
                                                <p className="text-slate-600 mb-6">{featuredGuide.description}</p>

                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={featuredGuide.author.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback>{featuredGuide.author.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium text-sm">{featuredGuide.author.name}</div>
                                                            <div className="text-xs text-slate-500">{featuredGuide.author.expertise}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-medium">{featuredGuide.rating}</span>
                                                        <span className="text-slate-500 text-sm">({featuredGuide.reviews})</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                                                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline">
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => toggleBookmark(featuredGuide.id)}
                                                        className={bookmarkedGuides.has(featuredGuide.id) ? "text-purple-600" : ""}
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <motion.div
                                                    className="relative rounded-xl overflow-hidden shadow-2xl"
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <img
                                                        src={featuredGuide.image || "/placeholder.svg"}
                                                        alt={featuredGuide.title}
                                                        className="w-full h-64 object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <div className="flex items-center justify-between text-white">
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex items-center gap-1">
                                                                    <Eye className="h-4 w-4" />
                                                                    <span className="text-sm">{featuredGuide.views.toLocaleString()}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Download className="h-4 w-4" />
                                                                    <span className="text-sm">{featuredGuide.downloads.toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                            <Badge className="bg-white/20 text-white">{featuredGuide.chapters.length} Chapters</Badge>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })()}
                    </div>
                </section>
            )}

            {/* Guides Grid */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-2">
                                {selectedCategory === "All Guides" ? "All Guides" : selectedCategory}
                            </h2>
                            <p className="text-slate-600">
                                Showing {filteredGuides.length} guide{filteredGuides.length !== 1 ? "s" : ""}
                                {searchQuery && ` for "${searchQuery}"`}
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGuides.map((guide, index) => (
                            <motion.div
                                key={guide.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:border-purple-200">
                                    <div className="relative">
                                        <img
                                            src={guide.image || "/placeholder.svg"}
                                            alt={guide.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
                                            {guide.premium && <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>}
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleBookmark(guide.id)}
                                                className={`bg-white/80 backdrop-blur-sm hover:bg-white ${bookmarkedGuides.has(guide.id) ? "text-purple-600" : "text-slate-600"
                                                    }`}
                                            >
                                                <Bookmark className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            <Badge className="bg-white/90 text-slate-700">{guide.chapters.length} Chapters</Badge>
                                        </div>
                                    </div>

                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline">{guide.category}</Badge>
                                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                                <Clock className="h-3 w-3" />
                                                {guide.readTime}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl line-clamp-2 group-hover:text-purple-600 transition-colors">
                                            {guide.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">{guide.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="pb-2">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Avatar className="h-8 w-8 ">
                                                <AvatarImage src={guide.author.avatar || "/placeholder.svg"} className="object-cover"/>
                                                <AvatarFallback>{guide.author.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-sm">{guide.author.name}</div>
                                                <div className="text-xs text-slate-500">{guide.author.expertise}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                <span className="font-medium">{guide.rating}</span>
                                                <span>({guide.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    <span>{guide.views.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Download className="h-3 w-3" />
                                                    <span>{guide.downloads.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {guide.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-0">
                                        <div className="flex gap-2 w-full">
                                            <Button className="flex-1 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                Read Guide
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="h-4 w-4" />
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

                    {filteredGuides.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                            <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">No guides found</h3>
                            <p className="text-slate-600 max-w-md mx-auto">
                                Try adjusting your search terms or filters to find the guides you're looking for.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4 bg-transparent"
                                onClick={() => {
                                    setSearchQuery("")
                                    setSelectedCategory("All Guides")
                                }}
                            >
                                Clear Filters
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 p-2"
                    >
                        <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm p-8 md:p-12 lg:p-16 text-center">
                            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Stay Updated</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get New Guides First</h2>
                            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                                Subscribe to our newsletter and be the first to access new guides, expert insights, and exclusive
                                resources.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                />
                                <Button className="bg-white text-purple-700 hover:bg-blue-50 whitespace-nowrap">Subscribe</Button>
                            </div>
                            <p className="text-white/70 text-sm mt-3">Join 10,000+ professionals. Unsubscribe anytime.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
