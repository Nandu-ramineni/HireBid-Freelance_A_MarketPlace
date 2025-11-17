import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Zap, Users, ChevronRight, ArrowRight, MousePointer, Sparkles } from "lucide-react"

const features = [
    {
        id: 1,
        title: "Secure Transactions",
        description: "End-to-end encrypted payments with multi-signature escrow protection for all parties.",
        icon: Shield,
        color: "text-emerald-500",
        bgGradient: "from-emerald-500/20 to-emerald-500/5",
    },
    {
        id: 2,
        title: "Lightning Fast Payments",
        description: "Instant cross-border payments with minimal fees using our optimized blockchain network.",
        icon: Zap,
        color: "text-amber-500",
        bgGradient: "from-amber-500/20 to-amber-500/5",
    },
    {
        id: 3,
        title: "Smart Contracts",
        description: "Automated milestone-based payments with programmable conditions and dispute resolution.",
        icon: Wallet,
        color: "text-blue-500",
        bgGradient: "from-blue-500/20 to-blue-500/5",
    },
    {
        id: 4,
        title: "Global Talent Network",
        description: "Access to verified professionals from around the world with transparent reputation systems.",
        icon: Users,
        color: "text-purple-500",
        bgGradient: "from-purple-500/20 to-purple-500/5",
    },
]
const Features = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const controls = useAnimation()
    const [activeFeature, setActiveFeature] = useState(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])
    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [isInView, controls])
    const particleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    }

    const particleItem = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: [0.2, 0.5, 0.2],
            y: i % 2 === 0 ? [0, -15, 0] : [0, -25, 0],
            x: i % 3 === 0 ? [0, 10, 0] : i % 3 === 1 ? [0, -10, 0] : [0, 5, 0],
            transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 3 + (i % 4),
                ease: "easeInOut",
            },
        }),
    }

    // Feature card variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * i,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        }),
        hover: {
            y: -15,
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" },
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 },
        },
    }

    // Feature detail variants
    const detailVariants = {
        hidden: { opacity: 0, y: 20, height: 0 },
        visible: {
            opacity: 1,
            y: 0,
            height: "auto",
            transition: {
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            height: 0,
            transition: {
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1],
            },
        },
    }
    return (
        <section
            ref={sectionRef}
            className="px-6 md:px-24 py-4 md:py-16 relative overflow-hidden"
            style={{
                background: "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.15), transparent 50%)",
            }}
        >
            {/* Animated background particles */}
            <motion.div
                variants={particleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute inset-0 pointer-events-none"
            >
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        variants={particleItem}
                        custom={i}
                        className={cn(
                            "absolute rounded-full",
                            i % 4 === 0
                                ? "bg-primary/20"
                                : i % 4 === 1
                                    ? "bg-emerald-500/20"
                                    : i % 4 === 2
                                        ? "bg-amber-500/20"
                                        : "bg-blue-500/20",
                            i % 3 === 0 ? "h-3 w-3" : i % 3 === 1 ? "h-5 w-5" : "h-4 w-4",
                        )}
                        style={{
                            left: `${10 + ((i * 5) % 80)}%`,
                            top: `${5 + ((i * 7) % 85)}%`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Spotlight effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30 hidden md:block"
                style={{
                    background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent)`,
                    transition: "background 0.1s",
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header section with enhanced animations */}
                <div className="flex flex-col items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <Badge
                            variant="outline"
                            className="mb-3 px-6 py-1.5 border-primary/30 text-primary font-medium relative overflow-hidden group"
                        >
                            <span className="relative z-10">Revolutionary Platform</span>
                            <motion.span
                                className="absolute inset-0 bg-primary/10"
                                initial={{ x: "-100%" }}
                                animate={isInView ? { x: "100%" } : { x: "-100%" }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 3,
                                }}
                            />
                            <Sparkles className="h-3.5 w-3.5 ml-1 inline-block text-primary" />
                        </Badge>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 relative">
                            <span className="heroText bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
                                Key Features
                            </span>
                            <motion.div
                                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-24"
                                initial={{ width: 0, opacity: 0 }}
                                animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            />
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center text-muted-foreground max-w-2xl text-lg"
                    >
                        Our platform combines cutting-edge blockchain technology with intuitive design to revolutionize the
                        freelancing experience
                    </motion.p>
                </div>

                {/* Interactive 3D feature cards */}
                <div className="grid gap-y-16 gap-x-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileHover="hover"
                            whileTap="tap"
                            custom={index}
                            onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-full perspective-1000">
                                <div className="transform-gpu transition-all duration-500 group-hover:rotate-y-10 preserve-3d">
                                    <div
                                        className={cn(
                                            "relative rounded-2xl p-6 h-full border border-primary/10",
                                            "bg-background/60 backdrop-blur-lg",
                                            "shadow-[0_0_25px_rgba(0,0,0,0.03)]",
                                            "group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
                                            "transition-all duration-500 overflow-hidden",
                                        )}
                                    >
                                        {/* Gradient background */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                                "bg-gradient-to-br",
                                                feature.bgGradient,
                                            )}
                                        />

                                        {/* Icon with animated background */}
                                        <div className="relative z-10 mb-5">
                                            <div
                                                className={cn(
                                                    "w-14 h-14 rounded-xl flex items-center justify-center",
                                                    "bg-background shadow-lg",
                                                    "transform-gpu transition-all duration-500",
                                                    "group-hover:scale-110 group-hover:shadow-xl",
                                                )}
                                            >
                                                <feature.icon className={cn("h-7 w-7", feature.color)} />
                                                <motion.div
                                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                                                    initial={{ scale: 0 }}
                                                    whileHover={{ scale: 1, opacity: 0.15 }}
                                                    transition={{ duration: 0.5 }}
                                                    style={{
                                                        background: `radial-gradient(circle, ${feature.color.replace("text-", "var(--")}), transparent)`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Title and description */}
                                        <h3 className="text-xl font-bold mb-2 relative z-10">{feature.title}</h3>
                                        <p className="text-muted-foreground relative z-10">{feature.description}</p>

                                        {/* Learn more indicator */}
                                        <div className="mt-4 flex items-center text-sm font-medium text-primary relative z-10">
                                            <span>Learn more</span>
                                            <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} className="ml-1">
                                                <ChevronRight className="h-4 w-4" />
                                            </motion.div>
                                        </div>

                                        {/* Decorative elements */}
                                        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/5 -z-0 blur-xl group-hover:bg-primary/10 transition-all duration-500" />
                                        <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary/5 -z-0 blur-lg group-hover:bg-primary/10 transition-all duration-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Expanded feature details */}
                            <AnimatePresence>
                                {activeFeature === feature.id && (
                                    <motion.div
                                        variants={detailVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="mt-4 bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-lg overflow-hidden"
                                    >
                                        <h4 className="text-lg font-semibold mb-2">How it works</h4>
                                        <p className="text-muted-foreground mb-4">
                                            Our {feature.title.toLowerCase()} system uses advanced blockchain protocols to ensure maximum
                                            efficiency and security for all users on the platform.
                                        </p>
                                        <Button variant="outline" className="group">
                                            <span>Explore {feature.title}</span>
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-col items-center mt-10"
                >
                    <div className="relative group">
                        <Button size="lg" className="relative px-8 py-6 text-lg font-medium overflow-hidden group">
                            <span className="relative z-10 flex items-center">
                                Get Started Now
                                <MousePointer className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                            </span>
                            <motion.span
                                className="absolute inset-0 bg-primary/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                        </Button>
                        <motion.div
                            className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
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
                </motion.div>
            </div>
        </section>
    )
}

export default Features