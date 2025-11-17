
import { useState, useRef, useEffect } from "react"
import {Link} from "react-router-dom"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft, RefreshCw, Compass, AlertTriangle, Sparkles, Zap, MousePointer } from "lucide-react"
import '@/App.css'
// Particle system component
const ParticleSystem = ({ count = 40 }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    className={cn(
                        "absolute rounded-full",
                        i % 4 === 0
                            ? "bg-primary/30"
                            : i % 4 === 1
                                ? "bg-indigo-500/30"
                                : i % 4 === 2
                                    ? "bg-purple-500/30"
                                    : "bg-blue-500/30",
                        i % 3 === 0 ? "h-2 w-2" : i % 3 === 1 ? "h-3 w-3" : "h-4 w-4",
                    )}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 0.7, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    )
}

// Glowing orb component
const GlowingOrb = ({
    color,
    size = 300,
    opacity = 0.2,
    blur = 70,
    className = "",
    animate = true,
}) => {
    return (
        <motion.div
            className={cn("rounded-full absolute", className)}
            style={{
                width: size,
                height: size,
                background: color,
                opacity: opacity,
                filter: `blur(${blur}px)`,
            }}
            animate={
                animate
                    ? {
                        scale: [1, 1.2, 1],
                    }
                    : undefined
            }
            transition={
                animate
                    ? {
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }
                    : undefined
            }
        />
    )
}

// Floating element component
const FloatingElement = ({
    children,
    delay = 0,
    duration = 4,
    yOffset = 20,
    className = "",
}) => {
    return (
        <motion.div
            className={cn("relative", className)}
            animate={{
                y: [-yOffset / 2, yOffset / 2, -yOffset / 2],
            }}
            transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    )
}

// 3D digit component
const Digit3D = ({
    digit,
    color = "from-primary to-indigo-600",
    delay = 0,
}) => {
    return (
        <motion.div
            className="relative perspective-1000 w-32 h-40 md:w-40 md:h-52"
            initial={{ opacity: 0, y: 50, rotateY: -90 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{
                duration: 0.8,
                delay: delay,
                type: "spring",
                stiffness: 100,
            }}
        >
            <motion.div
                className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br",
                    color,
                    "flex items-center justify-center text-white text-7xl md:text-8xl font-bold shadow-xl",
                )}
                animate={{
                    rotateY: [0, 10, 0, -10, 0],
                    rotateX: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: delay,
                }}
            >
                {digit}
                <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm opacity-50" />
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50 blur-sm" />
            </motion.div>
        </motion.div>
    )
}

// Broken link visualization
const BrokenLink = () => {
    const controls = useAnimation()

    useEffect(() => {
        const sequence = async () => {
            await controls.start({
                pathLength: 1,
                transition: { duration: 2, ease: "easeInOut" },
            })
            await controls.start({
                pathOffset: 1,
                transition: { duration: 2, ease: "easeInOut" },
            })
            controls.start({
                pathLength: 0,
                pathOffset: 0,
                transition: { duration: 0 },
            })
            sequence()
        }

        sequence()
    }, [controls])

    return (
        <div className="relative w-full max-w-xs mx-auto h-24 my-8">
            <svg viewBox="0 0 200 50" className="w-full h-full">
                <motion.path
                    d="M20,25 L80,25 M120,25 L180,25"
                    stroke="url(#linkGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="transparent"
                    animate={controls}
                    initial={{ pathLength: 0, pathOffset: 0 }}
                />
                <circle cx="100" cy="25" r="15" fill="url(#circleGradient)" />
                <defs>
                    <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#c026d3" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </radialGradient>
                </defs>
            </svg>

            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                <AlertTriangle className="w-6 h-6 text-white" />
            </motion.div>
        </div>
    )
}

// Suggestion card component
const SuggestionCard = ({
    icon: Icon,
    title,
    description,
    href = "/",
    delay = 0,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-slate-200 shadow-lg"
        >
            <Link href={href} className="block">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-900 mb-1">{title}</h3>
                        <p className="text-sm text-slate-600">{description}</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.3 })
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    // Track mouse position for spotlight effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault()
        if (!searchQuery) return

        setIsSearching(true)
        setTimeout(() => {
            setIsSearching(false)
            setSearchQuery("")
        }, 2000)
    }

    return (
        <main
            ref={containerRef}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-20"
        >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <GlowingOrb color="rgba(79, 70, 229, 0.1)" size={600} className="top-[-200px] right-[-200px]" blur={100} />
                <GlowingOrb color="rgba(147, 51, 234, 0.1)" size={500} className="bottom-[-100px] left-[-100px]" blur={80} />
            </div>

            {/* Particle system */}
            <ParticleSystem count={60} />

            {/* Spotlight effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30 hidden md:block"
                style={{
                    background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), transparent)`,
                    transition: "background 0.2s",
                }}
            />

            <div className="container max-w-5xl mx-auto relative z-10">
                {/* 404 digits */}
                <div className="flex justify-center gap-4 mb-8">
                    <Digit3D digit="4" delay={0} />
                    <Digit3D digit="0" color="from-fuchsia-500 to-purple-600" delay={0.2} />
                    <Digit3D digit="4" delay={0.4} />
                </div>

                {/* Broken link visualization */}
                <BrokenLink />

                {/* Error message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
                    <p className="text-slate-600 max-w-lg mx-auto">
                        The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you find your way back.
                    </p>
                </motion.div>

                {/* Search form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="max-w-md mx-auto mb-12"
                >
                    <form onSubmit={handleSearch} className="relative">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full py-3 pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>

                            <AnimatePresence>
                                {isSearching && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <RefreshCw className="h-5 w-5 text-primary animate-spin" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            type="submit"
                            className="absolute right-2 top-1.5 bg-primary text-white rounded-full py-2 px-4 font-medium text-sm flex items-center gap-1.5 overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Search</span>
                            <Zap className="h-4 w-4 relative z-10" />
                            <motion.span
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.button>
                    </form>
                </motion.div>

                {/* Navigation suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <SuggestionCard icon={Home} title="Return Home" description="Go back to the main page" delay={0.9} />
                    <SuggestionCard
                        icon={Compass}
                        title="Explore Features"
                        description="Discover what our platform offers"
                        to="/features"
                        delay={1.0}
                    />
                    <SuggestionCard
                        icon={Search}
                        title="Browse Projects"
                        description="Find work or talent"
                        to="/projects"
                        delay={1.1}
                    />
                </div>

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex justify-center"
                >
                    <FloatingElement yOffset={10} duration={3}>
                        <div className="relative group">
                            <Button
                                asChild
                                size="lg"
                                className="relative bg-white text-primary hover:bg-white/90 border border-slate-200 shadow-lg px-6 py-6 text-lg font-medium overflow-hidden group"
                            >
                                <Link to="/">
                                    <span className="relative z-10 flex items-center">
                                        <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                        Back to Home
                                        <Sparkles className="ml-2 h-4 w-4" />
                                    </span>
                                    <motion.span
                                        className="absolute inset-0 bg-primary/5"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </Link>
                            </Button>
                            <motion.div
                                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            />
                        </div>
                    </FloatingElement>
                </motion.div>

                {/* Easter egg - hidden portal */}
                <motion.div
                    className="absolute bottom-4 right-4 opacity-30 hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link to="/" className="block">
                        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-3 rounded-full border border-white/20">
                            <MousePointer className="h-5 w-5 text-primary" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}

