"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Calendar,
    Clock,
    Users,
    Star,
    Search,
    Filter,
    Play,
    Video,
    Bell,
    Download,
    Share2,
    Bookmark,
    Eye,
    CheckCircle,
    Zap,
    Target,
    TrendingUp,
    Award,
    Lightbulb,
    UserCheck,
} from "lucide-react"

// Mock data for webinars
const webinarsData = [
    {
        id: 1,
        title: "The Future of Agency Business: AI Integration Strategies",
        description:
            "Discover how leading agencies are leveraging AI to streamline operations, enhance creativity, and deliver better results for clients.",
        category: "Business Strategy",
        type: "live",
        status: "upcoming",
        date: "2025-01-15",
        time: "2:00 PM EST",
        duration: "90 min",
        timezone: "EST",
        host: {
            name: "Sarah Johnson",
            avatar: "https://media.istockphoto.com/id/1163294201/photo/smiling-confident-businesswoman-posing-with-arms-folded.jpg?s=612x612&w=0&k=20&c=9SY62tujbyx46_NbVH6pYAauliGvM0ixcaEfup9y_kU=",
            company: "PixelPerfect Studios",
            title: "CEO & Founder",
            bio: "15+ years in digital agency leadership",
        },
        speakers: [
            {
                name: "Michael Chen",
                avatar: "https://img.freepik.com/premium-photo/accountant-portrait-happy-man-office-with-finance-career-professional-experience-confidence-asian-consultant-financial-advisor-with-pride-investment-advice-business-workplace_590464-467493.jpg?semt=ais_hybrid&w=740",
                company: "TechFusion Agency",
                title: "CTO",
            },
            {
                name: "Alex Rivera",
                avatar: "https://img.freepik.com/premium-photo/young-business-man-office-inviting-come_1368-91056.jpg",
                company: "AI Solutions Inc",
                title: "AI Strategist",
            },
        ],
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["AI", "Business Strategy", "Agency Growth"],
        attendees: 1247,
        maxAttendees: 2000,
        price: "Free",
        featured: true,
        agenda: [
            { time: "2:00 PM", topic: "Welcome & Introductions", duration: "10 min" },
            { time: "2:10 PM", topic: "Current State of AI in Agencies", duration: "20 min" },
            { time: "2:30 PM", topic: "Practical AI Implementation", duration: "25 min" },
            { time: "2:55 PM", topic: "Case Studies & Success Stories", duration: "20 min" },
            { time: "3:15 PM", topic: "Q&A Session", duration: "15 min" },
        ],
        learningOutcomes: [
            "Understand AI tools available for agencies",
            "Learn implementation strategies",
            "Discover ROI measurement techniques",
            "Get actionable next steps",
        ],
    },
    {
        id: 2,
        title: "Scaling Your Freelance Business to 7 Figures",
        description:
            "Learn the exact strategies and systems used by successful freelancers to build million-dollar businesses.",
        category: "Business Growth",
        type: "live",
        status: "upcoming",
        date: "2025-01-22",
        time: "1:00 PM EST",
        duration: "120 min",
        timezone: "EST",
        host: {
            name: "Emma Thompson",
            avatar: "https://t3.ftcdn.net/jpg/08/78/46/14/360_F_878461461_4z68LUNUevX2DEHjDjnM9AQ6QWOgKDLy.jpg",
            company: "Growth Consulting Pro",
            title: "Business Growth Consultant",
            bio: "Helped 500+ freelancers scale their businesses",
        },
        speakers: [
            {
                name: "David Kim",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2SZeWfjX3qKKLUD_HIUjuymEsDjDLsNOyC_LHFEzKNIXitebqoVGfztiKIncPDaVSJM&usqp=CAU",
                company: "Design Empire",
                title: "Founder",
            },
        ],
        thumbnail: "https://images.unsplash.com/photo-1657697071046-1eef624e96e9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Freelancing", "Business Growth", "Scaling"],
        attendees: 892,
        maxAttendees: 1500,
        price: "$49",
        featured: false,
        agenda: [
            { time: "1:00 PM", topic: "Mindset Shift: From Freelancer to CEO", duration: "20 min" },
            { time: "1:20 PM", topic: "Building Systems & Processes", duration: "30 min" },
            { time: "1:50 PM", topic: "Team Building & Delegation", duration: "25 min" },
            { time: "2:15 PM", topic: "Pricing & Package Strategies", duration: "20 min" },
            { time: "2:35 PM", topic: "Live Q&A", duration: "25 min" },
        ],
        learningOutcomes: [
            "Develop a CEO mindset",
            "Create scalable business systems",
            "Master delegation strategies",
            "Optimize pricing for growth",
        ],
    },
    {
        id: 3,
        title: "Advanced React Patterns for Production Apps",
        description:
            "Deep dive into advanced React patterns, performance optimization, and best practices for large-scale applications.",
        category: "Development",
        type: "workshop",
        status: "upcoming",
        date: "2025-01-28",
        time: "10:00 AM EST",
        duration: "180 min",
        timezone: "EST",
        host: {
            name: "Maria Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
            company: "React Masters",
            title: "Senior React Developer",
            bio: "React core contributor with 8+ years experience",
        },
        speakers: [],
        thumbnail: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["React", "JavaScript", "Development"],
        attendees: 456,
        maxAttendees: 800,
        price: "$99",
        featured: false,
        agenda: [
            { time: "10:00 AM", topic: "Advanced Component Patterns", duration: "45 min" },
            { time: "10:45 AM", topic: "Performance Optimization", duration: "45 min" },
            { time: "11:30 AM", topic: "Break", duration: "15 min" },
            { time: "11:45 AM", topic: "State Management Strategies", duration: "45 min" },
            { time: "12:30 PM", topic: "Testing & Debugging", duration: "30 min" },
        ],
        learningOutcomes: [
            "Master advanced React patterns",
            "Optimize app performance",
            "Implement effective state management",
            "Build production-ready applications",
        ],
    },
    {
        id: 4,
        title: "Client Communication Masterclass",
        description:
            "Master the art of client communication to reduce conflicts, increase satisfaction, and grow your business.",
        category: "Client Management",
        type: "live",
        status: "recorded",
        date: "2024-12-15",
        time: "3:00 PM EST",
        duration: "75 min",
        timezone: "EST",
        host: {
            name: "Alex Rivera",
            avatar: "/placeholder.svg?height=40&width=40",
            company: "Visionary Design Co",
            title: "Project Manager",
            bio: "Expert in client relationship management",
        },
        speakers: [],
        thumbnail: "https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Communication", "Client Management", "Business Skills"],
        attendees: 1156,
        maxAttendees: 1500,
        price: "Free",
        featured: false,
        views: 3420,
        rating: 4.8,
        agenda: [
            { time: "3:00 PM", topic: "Understanding Client Psychology", duration: "20 min" },
            { time: "3:20 PM", topic: "Setting Clear Expectations", duration: "25 min" },
            { time: "3:45 PM", topic: "Handling Difficult Conversations", duration: "20 min" },
            { time: "4:05 PM", topic: "Q&A Session", duration: "10 min" },
        ],
        learningOutcomes: [
            "Understand client psychology",
            "Set clear project expectations",
            "Handle difficult conversations",
            "Build long-term relationships",
        ],
    },
    {
        id: 5,
        title: "Design Systems for Agencies",
        description:
            "Learn how to create and maintain design systems that scale across multiple client projects and team members.",
        category: "Design",
        type: "workshop",
        status: "recorded",
        date: "2024-12-08",
        time: "11:00 AM EST",
        duration: "150 min",
        timezone: "EST",
        host: {
            name: "Jessica Williams",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbyCvFLBT8sTGKetCu9xH4nkuYkAfOYGLqfsDpNUUsw2Ghor6-ej9LkmZ_Zi5jlSSeEQk&usqp=CAU",
            company: "Design Systems Co",
            title: "Design Systems Lead",
            bio: "10+ years in design systems and UX",
        },
        speakers: [
            {
                name: "Tom Anderson",
                avatar: "/placeholder.svg?height=40&width=40",
                company: "Component Library",
                title: "Frontend Architect",
            },
        ],
        thumbnail: "https://images.unsplash.com/photo-1700619663094-be321751b545?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Design Systems", "UI/UX", "Figma"],
        attendees: 678,
        maxAttendees: 1000,
        price: "$79",
        featured: false,
        views: 2340,
        rating: 4.9,
        agenda: [
            { time: "11:00 AM", topic: "Design System Fundamentals", duration: "30 min" },
            { time: "11:30 AM", topic: "Building Component Libraries", duration: "45 min" },
            { time: "12:15 PM", topic: "Documentation & Governance", duration: "30 min" },
            { time: "12:45 PM", topic: "Implementation Strategies", duration: "15 min" },
        ],
        learningOutcomes: [
            "Create scalable design systems",
            "Build component libraries",
            "Establish design governance",
            "Implement across projects",
        ],
    },
    {
        id: 6,
        title: "Remote Team Leadership Excellence",
        description:
            "Essential strategies for leading distributed teams, maintaining culture, and driving productivity in remote environments.",
        category: "Leadership",
        type: "live",
        status: "upcoming",
        date: "2025-02-05",
        time: "4:00 PM EST",
        duration: "90 min",
        timezone: "EST",
        host: {
            name: "Robert Chen",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbyo1iLRdqLr9dvpU302FG8vIn3SdEuvtZ02KzbjxD9HfwmboBsMtxXzTcrEftbOiEN-s&usqp=CAU",
            company: "Remote Leadership Institute",
            title: "Leadership Coach",
            bio: "15+ years in remote team management",
        },
        speakers: [
            {
                name: "Lisa Park",
                avatar: "/placeholder.svg?height=40&width=40",
                company: "Global Remote Co",
                title: "VP of People",
            },
        ],
        thumbnail: "https://images.unsplash.com/photo-1642406415849-a410b5d01a94?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: ["Leadership", "Remote Work", "Team Management"],
        attendees: 234,
        maxAttendees: 1200,
        price: "$39",
        featured: false,
        agenda: [
            { time: "4:00 PM", topic: "Remote Leadership Fundamentals", duration: "25 min" },
            { time: "4:25 PM", topic: "Building Remote Culture", duration: "25 min" },
            { time: "4:50 PM", topic: "Performance Management", duration: "20 min" },
            { time: "5:10 PM", topic: "Tools & Technologies", duration: "15 min" },
            { time: "5:25 PM", topic: "Q&A Session", duration: "5 min" },
        ],
        learningOutcomes: [
            "Master remote leadership skills",
            "Build strong team culture",
            "Implement effective processes",
            "Use the right tools",
        ],
    },
]

const categories = [
    { name: "All Webinars", count: 24, icon: <Video className="h-4 w-4" /> },
    { name: "Business Strategy", count: 8, icon: <TrendingUp className="h-4 w-4" /> },
    { name: "Business Growth", count: 6, icon: <Target className="h-4 w-4" /> },
    { name: "Development", count: 5, icon: <Zap className="h-4 w-4" /> },
    { name: "Design", count: 4, icon: <Lightbulb className="h-4 w-4" /> },
    { name: "Client Management", count: 3, icon: <Users className="h-4 w-4" /> },
    { name: "Leadership", count: 2, icon: <Award className="h-4 w-4" /> },
]

const upcomingHighlights = [
    {
        title: "Weekly Agency Roundtable",
        description: "Join fellow agency owners for open discussions",
        date: "Every Friday",
        time: "3:00 PM EST",
        type: "recurring",
    },
    {
        title: "Monthly Expert Interview",
        description: "Industry leaders share insights and strategies",
        date: "First Monday",
        time: "2:00 PM EST",
        type: "recurring",
    },
    {
        title: "Quarterly Business Review",
        description: "Analyze trends and plan for the next quarter",
        date: "End of Quarter",
        time: "1:00 PM EST",
        type: "recurring",
    },
]

export default function Webinars() {
    const [selectedCategory, setSelectedCategory] = useState("All Webinars")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("date")
    const [filteredWebinars, setFilteredWebinars] = useState(webinarsData)
    const [showFilters, setShowFilters] = useState(false)
    const [bookmarkedWebinars, setBookmarkedWebinars] = useState(new Set())
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [activeTab, setActiveTab] = useState("upcoming")
    const [selectedWebinar, setSelectedWebinar] = useState(null)

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
        let filtered = webinarsData

        // Filter by tab
        if (activeTab === "upcoming") {
            filtered = filtered.filter((webinar) => webinar.status === "upcoming")
        } else if (activeTab === "recorded") {
            filtered = filtered.filter((webinar) => webinar.status === "recorded")
        }

        // Filter by category
        if (selectedCategory !== "All Webinars") {
            filtered = filtered.filter((webinar) => webinar.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(
                (webinar) =>
                    webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    webinar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    webinar.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
            )
        }

        // Sort webinars
        switch (sortBy) {
            case "date":
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
                break
            case "popularity":
                filtered.sort((a, b) => b.attendees - a.attendees)
                break
            case "price":
                filtered.sort((a, b) => {
                    const priceA = a.price === "Free" ? 0 : Number.parseInt(a.price.replace("$", ""))
                    const priceB = b.price === "Free" ? 0 : Number.parseInt(b.price.replace("$", ""))
                    return priceA - priceB
                })
                break
        }

        setFilteredWebinars(filtered)
    }, [selectedCategory, searchQuery, sortBy, activeTab])

    const toggleBookmark = (webinarId) => {
        const newBookmarks = new Set(bookmarkedWebinars)
        if (newBookmarks.has(webinarId)) {
            newBookmarks.delete(webinarId)
        } else {
            newBookmarks.add(webinarId)
        }
        setBookmarkedWebinars(newBookmarks)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "upcoming":
                return "bg-blue-100 text-blue-700"
            case "live":
                return "bg-red-100 text-red-700"
            case "recorded":
                return "bg-green-100 text-green-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case "live":
                return <Video className="h-4 w-4" />
            case "workshop":
                return <Zap className="h-4 w-4" />
            default:
                return <Video className="h-4 w-4" />
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
        <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50 overflow-hidden px-4 py-2 md:px-16 md:py-16">
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
                            <Badge className="mr-2 bg-purple-600 text-white hover:bg-purple-700">Live</Badge>
                            <span className="mr-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Expert
                            </span>
                            Webinars & Workshops
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
                                Learn from
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="mt-1 block bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent"
                            >
                                Industry Experts
                            </motion.span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-2xl text-xl text-slate-600">
                            Join live webinars and interactive workshops led by successful agency owners, developers, and business
                            experts.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    View Schedule
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                                    Browse Recordings
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Upcoming Highlights */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {upcomingHighlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                >
                                    <Badge className="mb-2 bg-purple-100 text-purple-700">{highlight.type}</Badge>
                                    <h3 className="font-semibold mb-1">{highlight.title}</h3>
                                    <p className="text-sm text-slate-600 mb-2">{highlight.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Calendar className="h-3 w-3" />
                                        <span>{highlight.date}</span>
                                        <Clock className="h-3 w-3" />
                                        <span>{highlight.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
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
                                        value="upcoming"
                                        className={
                                            activeTab === "upcoming"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Upcoming
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="recorded"
                                        className={
                                            activeTab === "recorded"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        Recorded
                                    </TabsTrigger>
                                </TabsList>
                            </motion.div>
                        </div>

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
                                        placeholder="Search webinars, topics, or speakers..."
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
                                        <option value="date">Sort by Date</option>
                                        <option value="popularity">Most Popular</option>
                                        <option value="price">Price: Low to High</option>
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
                                                        <div className="text-xs text-slate-500">{category.count} webinars</div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <TabsContent value="upcoming">
                            {/* Featured Webinar */}
                            {filteredWebinars.find((webinar) => webinar.featured) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-12"
                                >
                                    <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-700">Featured Webinar</Badge>
                                    <h2 className="text-3xl font-bold mb-8">Don't Miss This</h2>

                                    {(() => {
                                        const featuredWebinar = filteredWebinars.find((webinar) => webinar.featured)
                                        return (
                                            <motion.div
                                                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 p-1"
                                                whileHover={{ scale: 1.01 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="bg-white rounded-xl overflow-hidden">
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                                        <div className="relative">
                                                            <img
                                                                src={featuredWebinar.thumbnail || "/placeholder.svg"}
                                                                alt={featuredWebinar.title}
                                                                className="w-full h-64 lg:h-full object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                            <div className="absolute top-4 left-4 flex gap-2">
                                                                <Badge className={getStatusColor(featuredWebinar.status)}>
                                                                    {featuredWebinar.status}
                                                                </Badge>
                                                                <Badge className="bg-white/90 text-slate-700">
                                                                    {getTypeIcon(featuredWebinar.type)}
                                                                    <span className="ml-1">{featuredWebinar.type}</span>
                                                                </Badge>
                                                            </div>
                                                            <div className="absolute bottom-4 left-4 text-white">
                                                                <div className="flex items-center gap-4 mb-2">
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="h-4 w-4" />
                                                                        <span>{new Date(featuredWebinar.date).toLocaleDateString()}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Clock className="h-4 w-4" />
                                                                        <span>{featuredWebinar.time}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Users className="h-4 w-4" />
                                                                    <span>{featuredWebinar.attendees} registered</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-8">
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <Badge variant="outline">{featuredWebinar.category}</Badge>
                                                                <Badge
                                                                    className={
                                                                        featuredWebinar.price === "Free"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : "bg-blue-100 text-blue-700"
                                                                    }
                                                                >
                                                                    {featuredWebinar.price}
                                                                </Badge>
                                                            </div>

                                                            <h3 className="text-2xl font-bold mb-4">{featuredWebinar.title}</h3>
                                                            <p className="text-slate-600 mb-6">{featuredWebinar.description}</p>

                                                            <div className="flex items-center gap-4 mb-6">
                                                                <div className="flex items-center gap-2">
                                                                    <Avatar className="h-10 w-10">
                                                                        <AvatarImage src={featuredWebinar.host.avatar || "/placeholder.svg"} />
                                                                        <AvatarFallback>{featuredWebinar.host.name.charAt(0)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="font-medium text-sm">{featuredWebinar.host.name}</div>
                                                                        <div className="text-xs text-slate-500">{featuredWebinar.host.title}</div>
                                                                    </div>
                                                                </div>
                                                                {featuredWebinar.speakers.length > 0 && (
                                                                    <div className="flex -space-x-2">
                                                                        {featuredWebinar.speakers.slice(0, 3).map((speaker, index) => (
                                                                            <Avatar key={index} className="h-8 w-8 border-2 border-white">
                                                                                <AvatarImage src={speaker.avatar || "/placeholder.svg"} />
                                                                                <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                                                                            </Avatar>
                                                                        ))}
                                                                        {featuredWebinar.speakers.length > 3 && (
                                                                            <div className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                                                                                +{featuredWebinar.speakers.length - 3}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex flex-wrap gap-2 mb-6">
                                                                {featuredWebinar.tags.map((tag, index) => (
                                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>

                                                            <div className="flex gap-3">
                                                                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                                                                    <UserCheck className="h-4 w-4 mr-2" />
                                                                    Register Now
                                                                </Button>
                                                                <Button variant="outline" onClick={() => setSelectedWebinar(featuredWebinar)}>
                                                                    View Details
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    onClick={() => toggleBookmark(featuredWebinar.id)}
                                                                    className={bookmarkedWebinars.has(featuredWebinar.id) ? "text-purple-600" : ""}
                                                                >
                                                                    <Bookmark className="h-4 w-4" />
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

                            {/* Upcoming Webinars Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredWebinars
                                    .filter((w) => !w.featured)
                                    .map((webinar, index) => (
                                        <motion.div
                                            key={webinar.id}
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
                                                        src={webinar.thumbnail || "/placeholder.svg"}
                                                        alt={webinar.title}
                                                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-4 left-4 flex gap-2">
                                                        <Badge className={getStatusColor(webinar.status)}>{webinar.status}</Badge>
                                                        <Badge className="bg-white/90 text-slate-700">
                                                            {getTypeIcon(webinar.type)}
                                                            <span className="ml-1">{webinar.type}</span>
                                                        </Badge>
                                                    </div>
                                                    <div className="absolute top-4 right-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => toggleBookmark(webinar.id)}
                                                            className={`bg-white/80 backdrop-blur-sm hover:bg-white ${bookmarkedWebinars.has(webinar.id) ? "text-purple-600" : "text-slate-600"
                                                                }`}
                                                        >
                                                            <Bookmark className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="absolute bottom-4 left-4">
                                                        <Badge
                                                            className={
                                                                webinar.price === "Free" ? "bg-green-500/90 text-white" : "bg-blue-500/90 text-white"
                                                            }
                                                        >
                                                            {webinar.price}
                                                        </Badge>
                                                    </div>
                                                    <div className="absolute bottom-4 right-4">
                                                        <Badge className="bg-white/90 text-slate-700">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {webinar.duration}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <CardHeader className="pb-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="outline">{webinar.category}</Badge>
                                                        <div className="flex items-center gap-1 text-sm text-slate-500">
                                                            <Calendar className="h-3 w-3" />
                                                            {new Date(webinar.date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-xl line-clamp-2 group-hover:text-purple-600 transition-colors">
                                                        {webinar.title}
                                                    </CardTitle>
                                                    <CardDescription className="line-clamp-3">{webinar.description}</CardDescription>
                                                </CardHeader>

                                                <CardContent className="pb-2">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={webinar.host.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback>{webinar.host.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium text-sm">{webinar.host.name}</div>
                                                            <div className="text-xs text-slate-500">{webinar.host.title}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span>
                                                                {webinar.time} {webinar.timezone}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Users className="h-3 w-3" />
                                                            <span>{webinar.attendees} registered</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-1 mb-4">
                                                        {webinar.tags.slice(0, 3).map((tag, tagIndex) => (
                                                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardContent>

                                                <CardFooter className="pt-0">
                                                    <div className="flex gap-2 w-full">
                                                        <Button className="flex-1 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                            <UserCheck className="h-4 w-4 mr-2" />
                                                            Register
                                                        </Button>
                                                        <Button variant="outline" size="sm" onClick={() => setSelectedWebinar(webinar)}>
                                                            Details
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

                        <TabsContent value="recorded">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredWebinars.map((webinar, index) => (
                                    <motion.div
                                        key={webinar.id}
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
                                                    src={webinar.thumbnail || "/placeholder.svg"}
                                                    alt={webinar.title}
                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <motion.button
                                                        className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Play className="h-6 w-6 text-blue-600" />
                                                    </motion.button>
                                                </div>
                                                <div className="absolute top-4 left-4 flex gap-2">
                                                    <Badge className="bg-green-100 text-green-700">Recorded</Badge>
                                                    <Badge className="bg-white/90 text-slate-700">
                                                        {getTypeIcon(webinar.type)}
                                                        <span className="ml-1">{webinar.type}</span>
                                                    </Badge>
                                                </div>
                                                <div className="absolute bottom-4 left-4">
                                                    <Badge className="bg-white/90 text-slate-700">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        {webinar.views?.toLocaleString()} views
                                                    </Badge>
                                                </div>
                                                <div className="absolute bottom-4 right-4">
                                                    <Badge className="bg-white/90 text-slate-700">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {webinar.duration}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline">{webinar.category}</Badge>
                                                    {webinar.rating && (
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                            <span className="text-sm font-medium">{webinar.rating}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                    {webinar.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-3">{webinar.description}</CardDescription>
                                            </CardHeader>

                                            <CardContent className="pb-2">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={webinar.host.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>{webinar.host.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium text-sm">{webinar.host.name}</div>
                                                        <div className="text-xs text-slate-500">{webinar.host.title}</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {webinar.tags.slice(0, 3).map((tag, tagIndex) => (
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
                                                        Watch Now
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
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Webinar Details Modal */}
            <AnimatePresence>
                {selectedWebinar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedWebinar(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img
                                    src={selectedWebinar.thumbnail || "/placeholder.svg"}
                                    alt={selectedWebinar.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute top-4 right-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedWebinar(null)}
                                        className="bg-white/20 text-white hover:bg-white/30"
                                    >
                                        ✕
                                    </Button>
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className={getStatusColor(selectedWebinar.status)}>{selectedWebinar.status}</Badge>
                                        <Badge className="bg-white/20 text-white">{selectedWebinar.type}</Badge>
                                    </div>
                                    <h2 className="text-2xl font-bold">{selectedWebinar.title}</h2>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2">
                                        <p className="text-slate-600 mb-6 text-lg">{selectedWebinar.description}</p>

                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                                            <ul className="space-y-2">
                                                {selectedWebinar.learningOutcomes.map((outcome, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span>{outcome}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-4">Agenda</h3>
                                            <div className="space-y-3">
                                                {selectedWebinar.agenda.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                                                        <div className="text-sm font-medium text-slate-600 min-w-[80px]">{item.time}</div>
                                                        <div className="flex-1">
                                                            <div className="font-medium">{item.topic}</div>
                                                        </div>
                                                        <div className="text-sm text-slate-500">{item.duration}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-4">Speakers</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={selectedWebinar.host.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>{selectedWebinar.host.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-semibold">{selectedWebinar.host.name}</div>
                                                        <div className="text-sm text-slate-600">{selectedWebinar.host.title}</div>
                                                        <div className="text-sm text-slate-500">{selectedWebinar.host.company}</div>
                                                        <div className="text-sm text-slate-600 mt-1">{selectedWebinar.host.bio}</div>
                                                    </div>
                                                </div>
                                                {selectedWebinar.speakers.map((speaker, index) => (
                                                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage src={speaker.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-semibold">{speaker.name}</div>
                                                            <div className="text-sm text-slate-600">{speaker.title}</div>
                                                            <div className="text-sm text-slate-500">{speaker.company}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="bg-slate-50 rounded-xl p-6 sticky top-4">
                                            <div className="text-center mb-6">
                                                <div className="text-3xl font-bold text-purple-600 mb-2">{selectedWebinar.price}</div>
                                                {selectedWebinar.status === "upcoming" && (
                                                    <div className="text-sm text-slate-600">
                                                        {selectedWebinar.attendees} / {selectedWebinar.maxAttendees} registered
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-slate-500" />
                                                    <span className="text-sm">{new Date(selectedWebinar.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-slate-500" />
                                                    <span className="text-sm">
                                                        {selectedWebinar.time} {selectedWebinar.timezone}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Video className="h-4 w-4 text-slate-500" />
                                                    <span className="text-sm">{selectedWebinar.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-slate-500" />
                                                    <span className="text-sm">{selectedWebinar.attendees} attendees</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {selectedWebinar.status === "upcoming" ? (
                                                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                                                        <UserCheck className="h-4 w-4 mr-2" />
                                                        Register Now
                                                    </Button>
                                                ) : (
                                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500">
                                                        <Play className="h-4 w-4 mr-2" />
                                                        Watch Recording
                                                    </Button>
                                                )}
                                                <Button variant="outline" className="w-full bg-transparent">
                                                    <Bell className="h-4 w-4 mr-2" />
                                                    Add to Calendar
                                                </Button>
                                                <Button variant="outline" className="w-full bg-transparent">
                                                    <Share2 className="h-4 w-4 mr-2" />
                                                    Share
                                                </Button>
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-slate-200">
                                                <div className="flex flex-wrap gap-1">
                                                    {selectedWebinar.tags.map((tag, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 p-2"
                    >
                        <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm p-8 md:p-12 lg:p-16 text-center">
                            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Weekly Updates</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Never Miss a Webinar</h2>
                            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                                Get notified about upcoming webinars, exclusive workshops, and receive early access to recordings.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                />
                                <Button className="bg-white text-purple-700 hover:bg-blue-50 whitespace-nowrap">Subscribe</Button>
                            </div>
                            <p className="text-white/70 text-sm mt-3">Join 20,000+ professionals. Unsubscribe anytime.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
