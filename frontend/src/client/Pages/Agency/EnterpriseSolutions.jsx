
import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    CheckCircle,
    ChevronRight,
    LucideShield,
    TrendingUp,
    Zap,
    Database,
    Network,
    LineChart,
    Layers,
    ArrowRight,
    BarChart3,
    Cpu,
    Lock,
    Users,
} from "lucide-react"

// Counter animation hook
const useCounter = (end, duration = 2) => {
    const nodeRef = useRef(null)
    const inView = useInView(nodeRef, { once: true, threshold: 0.3 })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (inView) {
            let start = 0
            const step = end / (duration * 60) // 60fps

            const timer = setInterval(() => {
                start += step
                if (start > end) {
                    setCount(end)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
            }, 1000 / 60)

            return () => clearInterval(timer)
        }
    }, [inView, end, duration])

    return { count, nodeRef }
}

// Particle component
const Particle = ({ className }) => {
    return (
        <motion.div
            className={`absolute rounded-full bg-white opacity-20 ${className}`}
            animate={{
                y: ["0%", `${Math.random() * 100}%`],
                x: ["0%", `${Math.random() * 100}%`],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
            }}
            transition={{
                duration: 10 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
        />
    )
}

export default function EnterpriseSolutions() {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, threshold: 0.2 })
    const [activeTab, setActiveTab] = useState("overview")
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [showForm, setShowForm] = useState(false)

    // Statistics with animated counters
    const stats = [
        {
            value: 75,
            label: "Faster hiring",
            description: "Average reduction in time-to-hire",
            suffix: "%",
            color: "blue",
        },
        {
            value: 3500,
            label: "Businesses",
            description: "Enterprises using our platform",
            suffix: "+",
            color: "purple",
        },
        {
            value: 60,
            label: "Cost savings",
            description: "Average reduction in recruitment costs",
            suffix: "%",
            color: "green",
        },
    ]

    // Counter hooks for statistics
    const talentCounter = useCounter(50000)
    const projectsCounter = useCounter(12500)
    const clientsCounter = useCounter(250)

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

    const enterpriseFeatures = [
        {
            icon: <Database className="h-5 w-5" />,
            title: "Talent Database Access",
            description: "Access our curated database of 50,000+ verified professionals and agencies.",
        },
        {
            icon: <Network className="h-5 w-5" />,
            title: "Dedicated Account Manager",
            description: "Personal support from an experienced account manager who understands your business needs.",
        },
        {
            icon: <LineChart className="h-5 w-5" />,
            title: "Advanced Analytics",
            description: "Comprehensive reporting and analytics dashboard to track ROI and project metrics.",
        },
        {
            icon: <Zap className="h-5 w-5" />,
            title: "Priority Matching",
            description: "AI-powered priority matching to connect you with the perfect talent for your projects.",
        },
        {
            icon: <LucideShield className="h-5 w-5" />,
            title: "Enterprise-grade Security",
            description: "SOC 2 compliance, SSO integration, and advanced data protection protocols.",
        },
        {
            icon: <Layers className="h-5 w-5" />,
            title: "Custom Workflow Integration",
            description: "Seamlessly integrate with your existing tools like JIRA, Slack, and Microsoft Teams.",
        },
    ]

    const caseStudies = [
        {
            company: "GlobalTech Solutions",
            logo: "/placeholder.svg?height=80&width=80",
            industry: "Software & Technology",
            challenge: "Needed to scale their development team quickly during a major product launch.",
            solution: "HireBid Enterprise provided a custom talent pool and streamlined onboarding process.",
            results: "Reduced hiring time by 70% and successfully launched their product on schedule.",
            testimonial: "HireBid Enterprise has transformed how we approach talent acquisition for our critical projects.",
            author: "Sarah Johnson",
            role: "CTO",
        },
        {
            company: "NexGen Financial",
            logo: "/placeholder.svg?height=80&width=80",
            industry: "Financial Services",
            challenge: "Struggled with finding specialized talent for their blockchain initiative.",
            solution: "HireBid provided pre-vetted blockchain developers and implementation consultants.",
            results: "Completed their blockchain implementation 2 months ahead of schedule.",
            testimonial:
                "The quality of talent HireBid connected us with was exceptional. Their enterprise service is worth every penny.",
            author: "Michael Chen",
            role: "Head of Innovation",
        },
        {
            company: "HealthCore Systems",
            logo: "/placeholder.svg?height=80&width=80",
            industry: "Healthcare",
            challenge: "Needed to develop HIPAA-compliant applications with specialized expertise.",
            solution: "HireBid provided healthcare-focused developers with compliance experience.",
            results: "Successfully launched three compliant applications in under 12 months.",
            testimonial:
                "Finding developers who understood both healthcare and compliance was a game-changer for our projects.",
            author: "Dr. Emily Roberts",
            role: "Director of Digital Health",
        },
    ]

    const enterpriseTiers = [
        {
            name: "Growth",
            description: "Perfect for growing companies with multiple projects",
            price: "$2,499",
            period: "per month",
            features: [
                "Up to 10 concurrent projects",
                "Access to 10,000+ verified professionals",
                "Basic analytics dashboard",
                "Email support within 24 hours",
                "Standard security features",
            ],
            cta: "Get Started",
            popular: false,
        },
        {
            name: "Professional",
            description: "Ideal for medium to large businesses with regular staffing needs",
            price: "$4,999",
            period: "per month",
            features: [
                "Up to 25 concurrent projects",
                "Access to 30,000+ verified professionals",
                "Advanced analytics and reporting",
                "Dedicated account manager",
                "Priority matching algorithm",
                "SSO integration",
                "Phone support",
            ],
            cta: "Talk to Sales",
            popular: true,
        },
        {
            name: "Enterprise",
            description: "Custom solution for large enterprises with complex requirements",
            price: "Custom",
            period: "pricing",
            features: [
                "Unlimited concurrent projects",
                "Full database access",
                "Custom analytics and reporting",
                "Executive account manager",
                "Custom workflow integration",
                "Full security suite with audit logs",
                "24/7 priority support",
                "Quarterly business reviews",
            ],
            cta: "Contact Us",
            popular: false,
        },
    ]

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950 py-20 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute left-0 top-0 h-[40rem] w-[40rem] rounded-full bg-purple-500/10 blur-3xl"></div>
                <div
                    className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
                    style={{
                        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * -20}px, ${(mousePosition.y / window.innerHeight - 0.5) * -20}px)`,
                    }}
                ></div>
                <div className="absolute bottom-0 left-1/4 h-[35rem] w-[35rem] rounded-full bg-emerald-500/10 blur-3xl"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwaC0ydi00aDJ2NHptLTQgMGgtMnYtNGgydjR6bTgtNGgtMnYtNGgydjR6bS00IDBoLTJ2LTRoMnY0em0tNCAwaC0ydi00aDJ2NHpNMzQgMjJoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTQgMGgtMnYtNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"
                    style={{
                        transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 10}px, ${(mousePosition.y / window.innerHeight - 0.5) * 10}px)`,
                    }}
                ></div>

                {/* Floating Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <Particle
                        key={i}
                        className={`h-${Math.floor(Math.random() * 3) + 1} w-${Math.floor(Math.random() * 3) + 1} left-[${Math.random() * 100}%] top-[${Math.random() * 100}%]`}
                    />
                ))}
            </div>

            <div className="container relative mx-auto px-6 md:px-24 z-10">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="mb-24 text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-4 inline-flex flex-wrap items-center justify-center rounded-full border border-purple-700/30 bg-purple-900/30 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
                    >
                        <Badge className="mr-2 bg-purple-500 text-white hover:bg-purple-600">New</Badge>
                        <span className="mr-1 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Introducing
                        </span>
                        <span className="w-full text-center sm:w-auto sm:text-left text-white">
                            HireBid Enterprise Solutions
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="block"
                        >
                            Enterprise Talent{" "}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-1 block bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent"
                        >
                            Acquisition Platform
                        </motion.span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-2xl text-xl text-slate-300">
                        Transform how your enterprise sources, vets, and manages top-tier freelance and agency talent with our
                        comprehensive solution.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                size="lg"
                                className="relative overflow-hidden rounded-full border-none bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            >
                                <span className="flex items-center z-10">
                                    Request Demo <ChevronRight className="ml-2 h-4 w-4" />
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
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-purple-500/50 bg-transparent text-white hover:bg-purple-500/10"
                            >
                                View Solutions
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Glowing cursor follower */}
                    <motion.div
                        className="pointer-events-none fixed left-0 top-0 h-32 w-32 rounded-full bg-purple-500 opacity-20 blur-3xl"
                        animate={{
                            x: mousePosition.x - 64,
                            y: mousePosition.y - 64,
                        }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </motion.div>

                {/* Animated Stats Section */}
                <motion.div variants={containerVariants} initial="hidden" animate={controls} className="mb-32">
                    <div className="relative">
                        {/* 3D Effect Card */}
                        <motion.div
                            className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/70 via-purple-900/30 to-slate-900/70 backdrop-blur-sm before:absolute before:inset-0 before:rounded-2xl before:border before:border-slate-700/30 before:p-px"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{
                                transformStyle: "preserve-3d",
                                transform: `perspective(1000px) rotateX(${(mousePosition.y / window.innerHeight - 0.5) * -5}deg) rotateY(${(mousePosition.x / window.innerWidth - 0.5) * 5}deg)`,
                            }}
                        >
                            <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:grid-cols-4">
                                {/* Platform Summary */}
                                <motion.div className="col-span-1 flex flex-col justify-center lg:col-span-1" variants={itemVariants}>
                                    <Badge className="w-fit bg-blue-600 text-white hover:bg-blue-700">Platform Overview</Badge>
                                    <h3 className="mt-3 text-xl font-bold">Enterprise Platform</h3>
                                    <p className="mt-2 text-slate-300">
                                        A complete solution for enterprise talent acquisition and management
                                    </p>
                                    <motion.div className="mt-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                        <Button className="group gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
                                            Learn More
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </motion.div>
                                </motion.div>

                                {/* Animated Number Cards */}
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        variants={scaleAnimationVariants}
                                        className={`rounded-lg border border-${stat.color}-500/20 bg-gradient-to-br from-slate-900 to-slate-900/50 p-6 backdrop-blur-sm`}
                                        whileHover={{ scale: 1.03, boxShadow: `0 0 20px 0 rgba(124, 58, 237, 0.3)` }}
                                    >
                                        <div
                                            className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-${stat.color}-500/20 text-${stat.color}-400`}
                                        >
                                            {index === 0 && <Zap className="h-6 w-6" />}
                                            {index === 1 && <Users className="h-6 w-6" />}
                                            {index === 2 && <TrendingUp className="h-6 w-6" />}
                                        </div>
                                        <div className="flex items-baseline">
                                            <motion.div className="text-3xl font-bold" ref={useCounter(stat.value).nodeRef}>
                                                {useCounter(stat.value).count}
                                            </motion.div>
                                            <div className={`ml-1 text-3xl font-bold text-${stat.color}-400`}>{stat.suffix}</div>
                                        </div>
                                        <div className="mt-1 font-medium">{stat.label}</div>
                                        <div className="mt-1 text-sm text-slate-400">{stat.description}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Trusted By Section */}
                <motion.div variants={containerVariants} initial="hidden" animate={controls} className="mb-24">
                    <motion.p
                        variants={itemVariants}
                        className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-slate-400"
                    >
                        Trusted by leading enterprises worldwide
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-10">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <motion.div
                                key={index}
                                className="h-12 w-32 overflow-hidden"
                                whileHover={{ scale: 1.1 }}
                                style={{
                                    opacity: 0.6,
                                    filter: "grayscale(1) brightness(2)",
                                }}
                            >
                                <div className="h-full w-full rounded bg-white/5 backdrop-blur-sm"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Features Grid */}
                <motion.div variants={containerVariants} initial="hidden" animate={controls} className="mb-24">
                    <motion.div variants={itemVariants} className="mb-16 text-center">
                        <Badge className="mb-3 bg-purple-600 text-white hover:bg-purple-700">Features</Badge>
                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                            Enterprise-grade platform <span className="block text-purple-400">built for global scale</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {enterpriseFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 40px -15px rgba(125, 40, 230, 0.5)",
                                }}
                                className="group relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/50 p-6 transition-all duration-300 hover:border-purple-500/50"
                            >
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-800/0 via-purple-800/5 to-blue-800/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900/50 text-purple-400 ring-1 ring-purple-700/30 transition-all duration-300 group-hover:scale-110 group-hover:ring-purple-500">
                                        <motion.div
                                            animate={{
                                                rotate: [0, 5, 0, -5, 0],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatType: "loop",
                                            }}
                                        >
                                            {feature.icon}
                                        </motion.div>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                                    <p className="text-slate-300">{feature.description}</p>
                                </div>

                                {/* Corner accent */}
                                <div className="absolute -right-2 -top-2 h-16 w-16 overflow-hidden">
                                    <div className="absolute h-2 w-2 translate-x-[6px] translate-y-[6px] rotate-45 rounded-sm bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Animated Platform Overview */}
                <motion.div variants={containerVariants} initial="hidden" animate={controls} className="mb-24">
                    <motion.div variants={itemVariants} className="mb-16 text-center">
                        <Badge className="mb-3 bg-blue-600 text-white hover:bg-blue-700">How It Works</Badge>
                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                            Our enterprise platform <span className="block text-blue-400">adapts to your needs</span>
                        </h2>
                    </motion.div>

                    <div className="relative mx-auto flex max-w-5xl items-center justify-center rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-900 p-8 shadow-2xl">
                        {/* Perspective grid floor effect */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-purple-500/5 to-transparent"
                            style={{
                                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)",
                            }}
                        ></div>

                        {/* Animated platform illustration */}
                        <div className="relative grid grid-cols-12 gap-4">
                            {/* Connection lines */}
                            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                    d="M200,100 C300,150 400,50 500,100"
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />
                                <motion.path
                                    d="M200,100 C300,150 400,50 500,100"
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />
                                <motion.path
                                    d="M200,200 C350,180 400,250 500,200"
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 2, delay: 0.8 }}
                                />
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#7e22ce" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Left side nodes */}
                            <motion.div
                                className="col-span-4 flex flex-col space-y-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                {[
                                    { icon: <Users />, title: "Talent Sourcing" },
                                    { icon: <CheckCircle />, title: "Verification" },
                                    { icon: <Cpu />, title: "AI Matching" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center space-x-3 rounded-lg border border-slate-800 bg-slate-900 p-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.2 }}
                                        whileHover={{
                                            x: 5,
                                            backgroundColor: "rgba(139, 92, 246, 0.1)",
                                            borderColor: "rgba(139, 92, 246, 0.3)",
                                        }}
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-800">
                                            {item.icon}
                                        </div>
                                        <span className="font-medium">{item.title}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Center platform */}
                            <motion.div
                                className="col-span-4 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                <div className="relative h-40 w-40">
                                    <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500/20 blur-xl"></div>
                                    <div className="relative flex h-full w-full items-center justify-center rounded-full border border-purple-500/30 bg-slate-900 p-6 text-center">
                                        <div>
                                            <div className="font-semibold text-white">HireBid Platform</div>
                                            <div className="mt-1 text-xs text-slate-400">Enterprise Core</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right side nodes */}
                            <motion.div
                                className="col-span-4 flex flex-col space-y-6"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                {[
                                    { icon: <BarChart3 />, title: "Analytics" },
                                    { icon: <Network />, title: "Team Management" },
                                    { icon: <Lock />, title: "Security Controls" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center space-x-3 rounded-lg border border-slate-800 bg-slate-900 p-3"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.2 }}
                                        whileHover={{
                                            x: -5,
                                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                                            borderColor: "rgba(59, 130, 246, 0.3)",
                                        }}
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-800">
                                            {item.icon}
                                        </div>
                                        <span className="font-medium">{item.title}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Key metrics */}
                    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <motion.div
                            className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -5, borderColor: "rgba(139, 92, 246, 0.5)" }}
                        >
                            <div className="text-3xl font-bold" ref={talentCounter.nodeRef}>
                                {talentCounter.count.toLocaleString()}+
                            </div>
                            <div className="mt-2 text-slate-400">Pre-vetted professionals</div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            whileHover={{ y: -5, borderColor: "rgba(139, 92, 246, 0.5)" }}
                        >
                            <div className="text-3xl font-bold" ref={projectsCounter.nodeRef}>
                                {projectsCounter.count.toLocaleString()}+
                            </div>
                            <div className="mt-2 text-slate-400">Projects completed</div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ y: -5, borderColor: "rgba(139, 92, 246, 0.5)" }}
                        >
                            <div className="text-3xl font-bold" ref={clientsCounter.nodeRef}>
                                {clientsCounter.count.toLocaleString()}+
                            </div>
                            <div className="mt-2 text-slate-400">Enterprise clients</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Tabs Section */}
                <motion.div variants={containerVariants} initial="hidden" animate={controls} className="mb-24">
                    <motion.div variants={itemVariants} className="mb-12 text-center">
                        <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-700">Solutions</Badge>
                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                            Enterprise solutions <span className="block text-emerald-400">tailored to your needs</span>
                        </h2>
                    </motion.div>

                    <Tabs defaultValue="pricing" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                        <div className="flex justify-center">
                            <motion.div
                                className="group relative mb-12 inline-block rounded-full p-1 before:absolute before:inset-0 before:rounded-full "
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <TabsList className="relative z-10 bg-transparent">
                                    <TabsTrigger
                                        value="overview"
                                        className={
                                            activeTab === "overview"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        Platform Overview
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="pricing"
                                        className={
                                            activeTab === "pricing"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        Enterprise Pricing
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="case-studies"
                                        className={
                                            activeTab === "case-studies"
                                                ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                                                : ""
                                        }
                                    >
                                        Case Studies
                                    </TabsTrigger>
                                </TabsList>
                            </motion.div>
                        </div>

                        <div className="relative mt-6">
                            <AnimatePresence mode="wait">
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="grid grid-cols-1 gap-12 lg:grid-cols-2"
                                    >
                                        <div className="flex flex-col justify-center">
                                            <Badge className="mb-4 w-fit bg-purple-600 text-white hover:bg-purple-700">
                                                Enterprise Platform
                                            </Badge>
                                            <h3 className="mb-4 text-2xl font-bold">Complete talent management solution</h3>
                                            <p className="mb-6 text-slate-300">
                                                Our enterprise platform provides a comprehensive solution for your talent needs, from sourcing
                                                and vetting to onboarding and payment.
                                            </p>

                                            <motion.ul
                                                className="space-y-3"
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                variants={{
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.2,
                                                        },
                                                    },
                                                }}
                                            >
                                                {[
                                                    "AI-powered talent matching for your specific requirements",
                                                    "Verified professionals with proven enterprise experience",
                                                    "Streamlined compliance and onboarding processes",
                                                    "Centralized project and resource management",
                                                    "Detailed reporting and analytics dashboard",
                                                ].map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        className="flex items-start"
                                                        variants={{
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                                                        }}
                                                    >
                                                        <div className="mr-3 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
                                                            <CheckCircle className="h-5 w-5 text-transparent" />
                                                        </div>
                                                        <span>{item}</span>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>

                                            <motion.div className="mt-8 self-start" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                                                    Schedule Platform Demo
                                                </Button>
                                            </motion.div>
                                        </div>

                                        <div className="relative flex items-center justify-center">
                                            <motion.div
                                                className="absolute -inset-4 rounded-3xl border border-purple-500/20 bg-slate-900/50"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                                style={{
                                                    boxShadow: "0 0 40px 5px rgba(139, 92, 246, 0.15)",
                                                }}
                                            ></motion.div>
                                            <motion.div
                                                className="relative h-[400px] w-full rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            >
                                                <div className="absolute left-0 right-0 top-0 h-10 rounded-t-2xl bg-slate-800">
                                                    <div className="ml-4 mt-3 flex space-x-2">
                                                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                                                        <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                                                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-10 flex h-[calc(100%-40px)] w-full justify-center rounded-b-2xl">
                                                    {/* Dashboard mockup */}
                                                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-bl-2xl rounded-br-2xl border border-slate-800 bg-slate-900/50 "> 
                                                        <img src="https://img.freepik.com/premium-vector/user-interface-screen-including-analysis-charts_109293-5.jpg?uid=R114405257&ga=GA1.1.792639287.1743599003&semt=ais_hybrid&w=740" alt="" className="object-cover w-full h-auto" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "pricing" && (
                                    <motion.div
                                        key="pricing"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="grid grid-cols-1 gap-8 md:grid-cols-3"
                                    >
                                        {enterpriseTiers.map((tier, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                whileHover={{ y: -10 }}
                                            >
                                                <Card
                                                    className={`relative h-full overflow-hidden border-slate-800 bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 ${tier.popular ? "border-purple-500" : ""}`}
                                                >
                                                    {tier.popular && (
                                                        <div className="absolute right-0 top-0 overflow-hidden">
                                                            <div className="relative h-20 w-20 translate-x-10 -translate-y-10 rotate-45 bg-gradient-to-r from-purple-600 to-blue-600">
                                                                <div className="absolute bottom-1 left-0 right-0 text-center text-[10px] font-semibold uppercase text-white">
                                                                    Popular
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center justify-between">
                                                            <span className="text-white">{tier.name}</span>
                                                            {tier.popular && (
                                                                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                                                                    Most Popular
                                                                </Badge>
                                                            )}
                                                        </CardTitle>
                                                        <CardDescription className="text-slate-400">{tier.description}</CardDescription>
                                                        <div className="mt-4">
                                                            <motion.div
                                                                className="text-3xl font-bold text-white"
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                                            >
                                                                {tier.price}
                                                            </motion.div>
                                                            <span className="text-slate-400"> {tier.period}</span>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <ul className="space-y-3">
                                                            {tier.features.map((feature, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    className="flex items-start text-slate-400"
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.4 + i * 0.05 + index * 0.1, duration: 0.3 }}
                                                                >
                                                                    <div className="mr-3 bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text">
                                                                        <CheckCircle className="h-5 w-5 " />
                                                                    </div>
                                                                    <span>{feature}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </CardContent>
                                                    <CardFooter className="flex items-center justify-end m-auto">
                                                        <motion.div className="w-full m-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                                            <Button
                                                                className={`w-full ${tier.popular ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500" : "bg-slate-800 hover:bg-slate-700"}`}
                                                            >
                                                                {tier.cta}
                                                            </Button>
                                                        </motion.div>
                                                    </CardFooter>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === "case-studies" && (
                                    <motion.div
                                        key="case-studies"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-8"
                                    >
                                        {caseStudies.map((study, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                whileHover={{ y: -5 }}
                                                className="group"
                                            >
                                                <Card className="overflow-hidden border-slate-800 bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 dark:border-slate-800">
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="group-hover:bg-gradient-to-b from-slate-900 to-purple-900/20 flex flex-col border-b border-slate-800 p-6 transition-colors duration-300 md:w-64 md:border-b-0 md:border-r">
                                                            <div className="mb-4 overflow-hidden rounded-lg bg-slate-800 p-4 ring-1 ring-slate-700 transition-all duration-300 group-hover:ring-purple-500/30">
                                                                <img
                                                                    src={study.logo || "/placeholder.svg"}
                                                                    alt={`${study.company} logo`}
                                                                    className="h-12 w-full object-contain"
                                                                />
                                                            </div>
                                                            <h3 className="mb-1 text-lg font-bold">{study.company}</h3>
                                                            <p className="mb-4 text-sm text-slate-400">{study.industry}</p>
                                                        </div>
                                                        <div className="flex-1 p-6">
                                                            <div className="mb-6 space-y-4">
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    whileInView={{ opacity: 1, y: 0 }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                                >
                                                                    <h4 className="font-medium text-slate-400">Challenge</h4>
                                                                    <p className="text-slate-300">{study.challenge}</p>
                                                                </motion.div>
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    whileInView={{ opacity: 1, y: 0 }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ duration: 0.3, delay: 0.2 }}
                                                                >
                                                                    <h4 className="font-medium text-slate-400">Solution</h4>
                                                                    <p className="text-slate-300">{study.solution}</p>
                                                                </motion.div>
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    whileInView={{ opacity: 1, y: 0 }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ duration: 0.3, delay: 0.3 }}
                                                                >
                                                                    <h4 className="font-medium text-slate-400">Results</h4>
                                                                    <p className="text-slate-300">{study.results}</p>
                                                                </motion.div>
                                                            </div>
                                                            <motion.div
                                                                className="relative overflow-hidden rounded-lg border-l-4 border-purple-500 bg-slate-800/50 p-4 ring-1 ring-purple-500/10"
                                                                initial={{ opacity: 0, scale: 0.98 }}
                                                                whileInView={{ opacity: 1, scale: 1 }}
                                                                viewport={{ once: true }}
                                                                transition={{ duration: 0.4, delay: 0.4 }}
                                                            >
                                                                {/* Animated gradient background */}
                                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-slate-800/0 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                                                <div className="relative">
                                                                    <p className="mb-2 italic text-slate-300">"{study.testimonial}"</p>
                                                                    <div className="flex items-center">
                                                                        <span className="font-medium text-white">{study.author}</span>
                                                                        <span className="mx-2 text-slate-500">•</span>
                                                                        <span className="text-slate-400">{study.role}</span>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Tabs>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="relative mb-24 overflow-hidden rounded-3xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700">
                        <div className="absolute inset-0">
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)]"></div>
                            </div>
                            {/* Grid pattern */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTQgMGgtMnYtNGgydjR6bTgtNGgtMnYtNGgydjR6bS00IDBoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptOC04aC0ydi00aDJ2NHptLTQgMGgtMnYtNGgydjR6bS00IDBoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                        </div>
                    </div>

                    <motion.div
                        className="relative grid grid-cols-1 gap-12 p-8 md:grid-cols-2 md:p-12 lg:p-16"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="flex flex-col justify-center">
                            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                                Ready to transform your talent strategy?
                            </h2>
                            <p className="mb-8 text-blue-100">
                                Let's discuss how HireBid Enterprise can help you build better teams faster and more efficiently.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="bg-white font-medium text-purple-700 hover:bg-blue-50"
                                    >
                                        Schedule Consultation
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white bg-transparent text-white hover:bg-white/10"
                                    >
                                        View Solutions Guide
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="relative overflow-hidden border-none bg-white/10 backdrop-blur-sm">
                                {showForm ? (
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 text-xl font-bold text-white">Request more information</h3>
                                        <motion.form
                                            className="space-y-4"
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: {
                                                    opacity: 1,
                                                    transition: {
                                                        staggerChildren: 0.1,
                                                    },
                                                },
                                            }}
                                        >
                                            <motion.div
                                                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 },
                                                }}
                                            >
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="text-white">
                                                        Full Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
                                                        placeholder="John Smith"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="company" className="text-white">
                                                        Company
                                                    </Label>
                                                    <Input
                                                        id="company"
                                                        className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
                                                        placeholder="Company Inc."
                                                    />
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 },
                                                }}
                                            >
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-white">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
                                                        placeholder="john@company.com"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-white">
                                                        Phone
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
                                                        placeholder="+1 (555) 123-4567"
                                                    />
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                className="space-y-2"
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 },
                                                }}
                                            >
                                                <Label htmlFor="message" className="text-white">
                                                    Message
                                                </Label>
                                                <textarea
                                                    id="message"
                                                    rows={3}
                                                    className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60"
                                                    placeholder="Tell us about your needs..."
                                                ></textarea>
                                            </motion.div>
                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 },
                                                }}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button type="submit" className="w-full bg-white font-medium text-purple-700 hover:bg-white/90">
                                                    Submit Request
                                                </Button>
                                            </motion.div>
                                        </motion.form>
                                    </CardContent>
                                ) : (
                                    <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="mb-6 rounded-full bg-white/20 p-4"
                                        >
                                            <Users className="h-8 w-8 text-white" />
                                        </motion.div>
                                        <motion.h3
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            className="mb-2 text-2xl font-bold text-white"
                                        >
                                            Get enterprise access
                                        </motion.h3>
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="mb-6 text-blue-100"
                                        >
                                            Fill out a quick form to get more information about our enterprise solutions
                                        </motion.p>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                onClick={() => setShowForm(true)}
                                                className="bg-white font-medium text-purple-700 hover:bg-blue-50"
                                            >
                                                Request Information
                                            </Button>
                                        </motion.div>
                                    </CardContent>
                                )}
                            </Card>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* FAQ Teaser */}
                <motion.div variants={containerVariants} initial="hidden" animate={controls} className="mb-12 text-center">
                    <motion.h2 variants={itemVariants} className="mb-6 text-2xl font-bold">
                        Have more questions about HireBid Enterprise?
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mb-8 text-slate-400">
                        Our enterprise team is ready to help you understand how HireBid can transform your talent strategy.
                    </motion.p>
                    <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            variant="outline"
                            className="border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/10"
                        >
                            View Enterprise FAQ
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
