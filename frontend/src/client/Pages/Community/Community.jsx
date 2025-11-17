"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CommunityChat from "./CommunityChat"
import {
    Calendar,
    Users,
    MessageSquare,
    ArrowRight,
    MapPin,
    Clock,
    Heart,
    Share2,
    BookOpen,
    Lightbulb,
    Zap,
    Globe,
    CheckCircle,
    ChevronRight,
} from "lucide-react"

// Counter animation hook
const useCounter = (end, duration = 2) => {
    const nodeRef = useRef(null)
    const inView = useInView(nodeRef, { once: true, threshold: 0.3 })
    const [count, setCount] = useState(0)
    const [start, setStart] = useState(0)

    useEffect(() => {
        if (inView) {
            setStart(0)
            const step = end / (duration * 60)

            const timer = setInterval(() => {
                setStart((prevStart) => {
                    const newStart = prevStart + step
                    if (newStart > end) {
                        setCount(end)
                        clearInterval(timer)
                        return end
                    } else {
                        setCount(Math.floor(newStart))
                        return newStart
                    }
                })
            }, 1000 / 60)

            return () => clearInterval(timer)
        }
    }, [inView, end, duration])

    return { count, nodeRef }
}

export default function Community() {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, threshold: 0.2 })
    const [activeTab, setActiveTab] = useState("events")
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [showChat, setShowChat] = useState(false)

    // Community stats with animated counters
    const membersCounter = useCounter(12500)
    const eventsCounter = useCounter(350)
    const discussionsCounter = useCounter(8750)

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

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

    const scaleAnimationVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 8 },
        },
    }

    const floatingAnimation = {
        y: ["-4px", "4px"],
        transition: {
            y: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
            },
        },
    }

    // Community benefits
    const communityBenefits = [
        {
            icon: <Users className="h-5 w-5" />,
            title: "Networking",
            description: "Connect with like-minded professionals, agencies, and potential clients.",
        },
        {
            icon: <BookOpen className="h-5 w-5" />,
            title: "Knowledge Sharing",
            description: "Access exclusive resources, tutorials, and industry insights.",
        },
        {
            icon: <Lightbulb className="h-5 w-5" />,
            title: "Mentorship",
            description: "Learn from industry veterans and share your expertise with others.",
        },
        {
            icon: <Calendar className="h-5 w-5" />,
            title: "Events",
            description: "Participate in webinars, workshops, and in-person meetups.",
        },
        {
            icon: <MessageSquare className="h-5 w-5" />,
            title: "Real-time Chat",
            description: "Engage in live conversations with community members.",
        },
        {
            icon: <Zap className="h-5 w-5" />,
            title: "Exclusive Opportunities",
            description: "Get early access to projects and partnership opportunities.",
        },
    ]

    // Upcoming events
    const upcomingEvents = [
        {
            title: "Agency Growth Masterclass",
            date: "June 15, 2025",
            time: "2:00 PM - 4:00 PM EST",
            location: "Virtual",
            description: "Learn proven strategies to scale your agency from industry leaders.",
            image: "/placeholder.svg?height=200&width=400",
            attendees: 156,
            category: "Workshop",
        },
        {
            title: "HireBid Community Mixer",
            date: "June 28, 2025",
            time: "6:30 PM - 9:00 PM",
            location: "New York, NY",
            description: "Network with fellow community members in a relaxed setting.",
            image: "/placeholder.svg?height=200&width=400",
            attendees: 89,
            category: "Networking",
        },
        {
            title: "Future of Remote Work Panel",
            date: "July 10, 2025",
            time: "1:00 PM - 2:30 PM EST",
            location: "Virtual",
            description: "Industry experts discuss the evolving landscape of remote work.",
            image: "/placeholder.svg?height=200&width=400",
            attendees: 213,
            category: "Panel",
        },
    ]

    // Discussion topics
    const discussionTopics = [
        {
            title: "Best practices for client onboarding",
            author: {
                name: "Sarah Johnson",
                avatar: "/placeholder.svg?height=40&width=40",
                company: "PixelPerfect Studios",
            },
            replies: 24,
            likes: 47,
            category: "Agency Management",
            preview: "I've been refining our client onboarding process and wanted to share some insights...",
        },
        {
            title: "How are you handling AI integration in your workflow?",
            author: {
                name: "Michael Chen",
                avatar: "/placeholder.svg?height=40&width=40",
                company: "TechFusion Agency",
            },
            replies: 36,
            likes: 52,
            category: "Technology",
            preview: "We've started implementing AI tools for content generation and wondering how others...",
        },
        {
            title: "Pricing strategies for enterprise clients",
            author: {
                name: "Alex Rivera",
                avatar: "/placeholder.svg?height=40&width=40",
                company: "Visionary Design Co",
            },
            replies: 19,
            likes: 31,
            category: "Business Development",
            preview: "Looking for advice on structuring pricing for large enterprise projects...",
        },
    ]

    // Success stories
    const successStories = [
        {
            title: "From Freelancer to Agency Owner",
            author: "Jessica Williams",
            company: "Digital Nomad Studio",
            quote:
                "The HireBid community provided the support and connections I needed to transform my freelance business into a thriving agency with 12 team members.",
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            title: "Landing Our First Enterprise Client",
            author: "David Kim",
            company: "Pixel Perfect Design",
            quote:
                "Through a connection made at a HireBid community event, we secured our first six-figure enterprise client, which completely transformed our business.",
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            title: "Growing Beyond Borders",
            author: "Maria Rodriguez",
            company: "Global Creative Solutions",
            quote:
                "The international network of the HireBid community helped us expand from a local agency to one with clients in 7 countries across 3 continents.",
            image: "/placeholder.svg?height=80&width=80",
        },
    ]

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden px-4 py-2 md:px-16 md:py-12">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute left-0 top-0 h-[40rem] w-[40rem] rounded-full bg-purple-500/10 blur-3xl"></div>
                <div
                    className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
                    style={{
                        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * -20}px, ${(mousePosition.y / window.innerHeight - 0.5) * -20
                            }px)`,
                    }}
                ></div>
                <div className="absolute bottom-0 left-1/4 h-[35rem] w-[35rem] rounded-full bg-emerald-500/10 blur-3xl"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY3REUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptLTQgMGgtMnYtNGgydjR6bS00IDBoLTJ2LTRoMnY0em04LTRoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTQgMGgtMnYtNGgydjR6bTgtOGgtMnYtNGgydjR6bS00IDBoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"
                    style={{
                        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 10}px, ${(mousePosition.y / window.innerHeight - 0.5) * 10
                            }px)`,
                    }}
                ></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="container relative mx-auto px-4 z-10">
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={controls}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left Column - Content */}
                        <motion.div variants={itemVariants} className="max-w-2xl">
                            <motion.div
                                variants={itemVariants}
                                className="mb-6 inline-flex items-center rounded-full border border-purple-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm"
                            >
                                <Badge className="mr-2 bg-purple-600 text-white hover:bg-purple-700">Join</Badge>
                                <span className="mr-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    The HireBid
                                </span>
                                Community
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
                                    Connect, Learn, and
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="mt-1 block bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent"
                                >
                                    Grow Together
                                </motion.span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="mb-8 text-xl text-slate-600">
                                Join a thriving community of agencies, freelancers, and businesses collaborating to elevate the industry
                                and create meaningful connections.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        size="lg"
                                        className="relative overflow-hidden rounded-full border-none bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Join the Community <ChevronRight className="ml-2 h-4 w-4" />
                                        </span>
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Button size="lg" variant="outline" className="rounded-full" onClick={() => setShowChat(!showChat)}>
                                        {showChat ? "Hide Chat" : "Try Live Chat"}
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Community Stats */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-12 grid grid-cols-3 gap-4 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <div>
                                    <motion.div
                                        className="text-3xl font-bold text-purple-600"
                                        ref={membersCounter.nodeRef}
                                        animate={floatingAnimation}
                                    >
                                        {membersCounter.count.toLocaleString()}+
                                    </motion.div>
                                    <div className="text-sm text-slate-600">Community Members</div>
                                </div>
                                <div>
                                    <motion.div
                                        className="text-3xl font-bold text-blue-600"
                                        ref={eventsCounter.nodeRef}
                                        animate={floatingAnimation}
                                    >
                                        {eventsCounter.count}+
                                    </motion.div>
                                    <div className="text-sm text-slate-600">Events Hosted</div>
                                </div>
                                <div>
                                    <motion.div
                                        className="text-3xl font-bold text-emerald-600"
                                        ref={discussionsCounter.nodeRef}
                                        animate={floatingAnimation}
                                    >
                                        {discussionsCounter.count.toLocaleString()}+
                                    </motion.div>
                                    <div className="text-sm text-slate-600">Discussions</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Illustration */}
                        <motion.div
                            variants={scaleAnimationVariants}
                            className="relative hidden lg:block"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative">
                                {/* Main illustration */}
                                <motion.div
                                    className="relative z-10 rounded-lg bg-white p-4 shadow-xl"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1569292567777-e5d61a759322?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D"
                                        alt="Community illustration"
                                        className="rounded-lg"
                                    />
                                </motion.div>

                                {/* Floating elements */}
                                <motion.div
                                    className="absolute -top-10 -left-10 z-20 rounded-lg bg-white p-3 shadow-lg"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-purple-100 p-2">
                                            <Users className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">New connections</div>
                                            <div className="text-slate-500">15 new members today</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-8 right-10 z-20 rounded-lg bg-white p-3 shadow-lg"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                   
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-blue-100 p-2">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">Upcoming event</div>
                                            <div className="text-slate-500">Agency Growth Masterclass</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute top-1/2 -right-12 z-20 rounded-lg bg-white p-3 shadow-lg"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-emerald-100 p-2">
                                            <MessageSquare className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">Live chat active</div>
                                            <div className="text-slate-500">Join the conversation</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Live Chat Section */}
            {showChat && (
                <section className="py-20 relative">
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-8"
                        >
                            <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-700">Live Chat</Badge>
                            <h2 className="text-3xl font-bold leading-tight sm:text-4xl mb-4">
                                Join the <span className="text-emerald-600">Conversation</span>
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg text-slate-600">
                                Connect with community members in real-time. Share ideas, ask questions, and build relationships.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <CommunityChat />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Community Benefits Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-3 bg-blue-600 text-white hover:bg-blue-700">Benefits</Badge>
                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl mb-4">
                            Why Join Our <span className="text-blue-600">Community?</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600">
                            Connect with industry peers, access exclusive resources, and accelerate your professional growth.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {communityBenefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                className="bg-white rounded-xl border border-slate-200 p-6 transition-all duration-300"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <motion.div animate={floatingAnimation}>{benefit.icon}</motion.div>
                                </div>
                                <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
                                <p className="text-slate-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Content Tabs */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Badge className="mb-3 bg-purple-600 text-white hover:bg-purple-700">Explore</Badge>
                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl mb-4">
                            Discover What's <span className="text-purple-600">Happening</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600">
                            Stay up-to-date with the latest events, discussions, and success stories from our community.
                        </p>
                    </motion.div>

                    <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="flex justify-center">
                            <motion.div
                                className="mb-8 inline-block rounded-full p-1 bg-slate-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <TabsList>
                                    <TabsTrigger
                                        value="events"
                                        className={
                                            activeTab === "events"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        Upcoming Events
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="discussions"
                                        className={
                                            activeTab === "discussions"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        Active Discussions
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="success"
                                        className={
                                            activeTab === "success"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        Success Stories
                                    </TabsTrigger>
                                </TabsList>
                            </motion.div>
                        </div>

                        <TabsContent value="events" className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {upcomingEvents.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="group"
                                    >
                                        <Card className="overflow-hidden h-full transition-all duration-300 hover:border-purple-200 hover:shadow-md">
                                            <div className="relative">
                                                <img
                                                    src={event.image || "/placeholder.svg"}
                                                    alt={event.title}
                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <Badge className="absolute top-4 right-4 bg-purple-600 text-white hover:bg-purple-700">
                                                    {event.category}
                                                </Badge>
                                            </div>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-xl">{event.title}</CardTitle>
                                                <CardDescription className="flex items-center gap-1 text-slate-500">
                                                    <Calendar className="h-4 w-4" /> {event.date}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="pb-2">
                                                <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                                                    <Clock className="h-4 w-4" /> {event.time}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
                                                    <MapPin className="h-4 w-4" /> {event.location}
                                                </div>
                                                <p className="text-slate-600 mb-4">{event.description}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map((i) => (
                                                            <Avatar key={i} className="h-6 w-6 border-2 border-white">
                                                                <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                                                                <AvatarFallback>U</AvatarFallback>
                                                            </Avatar>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-slate-500">{event.attendees} attending</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors"
                                                    variant="outline"
                                                >
                                                    Register Now
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-10 text-center">
                                <Button variant="outline" className="rounded-full">
                                    View All Events <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="discussions" className="mt-4">
                            <div className="space-y-6">
                                {discussionTopics.map((topic, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -3 }}
                                    >
                                        <Card className="overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200">{topic.category}</Badge>
                                                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <MessageSquare className="h-4 w-4" /> {topic.replies}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Heart className="h-4 w-4" /> {topic.likes}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-slate-600 mb-4">{topic.preview}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={topic.author.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium text-sm text-slate-900 truncate">{topic.author.name}</div>
                                                            <div className="text-sm text-slate-500">{topic.author.company}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="ghost" className="text-slate-500">
                                                            <Share2 className="h-4 w-4 mr-1" /> Share
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            View Discussion
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-10 text-center">
                                <Button variant="outline" className="rounded-full">
                                    Browse All Discussions <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="success" className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {successStories.map((story, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Card className="overflow-hidden h-full transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-16 w-16 border-4 border-emerald-100">
                                                        <AvatarImage src={story.image || "/placeholder.svg"} />
                                                        <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-lg">{story.title}</CardTitle>
                                                        <CardDescription>
                                                            {story.author} • {story.company}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="relative">
                                                    <div className="absolute -top-2 -left-2 text-emerald-300 opacity-30">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="48"
                                                            height="48"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            stroke="none"
                                                        >
                                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-slate-600 italic pl-6 pr-2">{story.quote}</p>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button variant="outline" className="w-full">
                                                    Read Full Story
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-10 text-center">
                                <Button variant="outline" className="rounded-full">
                                    View All Success Stories <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Join the Community CTA */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 p-2"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTQgMGgtMnYtNGgydjR6bTgtNGgtMnYtNGgydjR6bS00IDBoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptOC04aC0ydi00aDJ2NHptLTQgMGgtMnYtNGgydjR6bS00IDBoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>

                        <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm p-8 md:p-12 lg:p-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Join Today</Badge>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        Become Part of Our Growing Community
                                    </h2>
                                    <p className="text-blue-100 mb-8 text-lg">
                                        Connect with like-minded professionals, access exclusive resources, and accelerate your growth with
                                        HireBid's community.
                                    </p>

                                    <div className="space-y-4">
                                        {[
                                            "Free membership with premium upgrade options",
                                            "Weekly virtual events and monthly in-person meetups",
                                            "Private discussion forums and real-time chat",
                                            "Early access to new HireBid features and updates",
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center gap-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                            >
                                                <CheckCircle className="h-5 w-5 text-emerald-300 flex-shrink-0" />
                                                <span className="text-white">{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                                        <CardHeader>
                                            <CardTitle className="text-white">Join Our Community</CardTitle>
                                            <CardDescription className="text-blue-100">
                                                Fill out this form to get started with your free membership
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form className="space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Input
                                                            placeholder="First Name"
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Input
                                                            placeholder="Last Name"
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Input
                                                        type="email"
                                                        placeholder="Email Address"
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="Company / Organization"
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <select className="w-full rounded-md border border-white/20 bg-white/10 p-2 text-white">
                                                        <option value="" className="bg-slate-800">
                                                            Select your primary role
                                                        </option>
                                                        <option value="agency_owner" className="bg-slate-800">
                                                            Agency Owner
                                                        </option>
                                                        <option value="freelancer" className="bg-slate-800">
                                                            Freelancer
                                                        </option>
                                                        <option value="business" className="bg-slate-800">
                                                            Business Owner
                                                        </option>
                                                        <option value="other" className="bg-slate-800">
                                                            Other
                                                        </option>
                                                    </select>
                                                </div>
                                            </form>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full bg-white text-purple-700 hover:bg-blue-50">Join the Community</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Global Community Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-700">Global</Badge>
                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl mb-4">
                            A Truly <span className="text-emerald-600">Global Community</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600">
                            Connect with professionals from around the world and expand your network across borders.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-3xl border border-emerald-500/20 bg-emerald-50/30"></div>
                                <div className="relative rounded-2xl overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=400&width=600"
                                        alt="Global community map"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">Connect Across Borders</h3>
                            <p className="text-slate-600 mb-6">
                                Our community spans across 40+ countries, bringing together diverse perspectives and expertise from
                                around the globe.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-emerald-100 p-2 mt-1">
                                        <Globe className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1">Regional Chapters</h4>
                                        <p className="text-slate-600">
                                            Join local chapters in major cities for in-person networking and collaboration opportunities.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-emerald-100 p-2 mt-1">
                                        <Calendar className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1">Global Events</h4>
                                        <p className="text-slate-600">
                                            Participate in virtual events scheduled across multiple time zones to accommodate our global
                                            membership.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-emerald-100 p-2 mt-1">
                                        <Users className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1">Cross-Border Collaboration</h4>
                                        <p className="text-slate-600">
                                            Find partners and collaborators from different countries to bring diverse perspectives to your
                                            projects.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500">
                                    Find Your Local Chapter <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <Badge className="mb-3 bg-purple-600 text-white hover:bg-purple-700">Newsletter</Badge>
                        <h2 className="text-3xl font-bold mb-4">Stay Updated with Community News</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Subscribe to our newsletter to receive updates on upcoming events, new resources, and community
                            highlights.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
                            <Input placeholder="Enter your email" className="flex-grow" />
                            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 whitespace-nowrap">
                                Subscribe
                            </Button>
                        </div>
                        <p className="text-sm text-slate-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
