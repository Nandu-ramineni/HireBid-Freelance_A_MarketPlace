import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { UserPlus, FileText, Code, CheckCircle, ChevronRight, MousePointer, ArrowRight, Sparkles } from "lucide-react"

const steps = [
    {
        id: 1,
        title: "Create Your Profile",
        description: "Sign up as a freelancer or client using Google OAuth or email.",
        icon: UserPlus,
        Image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        color: "from-blue-500 to-cyan-400",
        detailedDescription: [
            "Complete your professional profile with verified credentials",
            "Showcase your portfolio with previous work samples",
            "Set your availability and preferred working hours",
        ],
    },
    {
        id: 2,
        title: "Post or Find Jobs",
        description: "Clients post projects, freelancers browse and bid on suitable opportunities",
        icon: FileText,
        Image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        color: "from-purple-500 to-indigo-500",
        detailedDescription: [
            "Use AI-assisted tools to define clear project requirements",
            "Set up milestone-based deliverables with specific criteria",
            "Establish communication protocols and feedback loops",
        ],
    },
    {
        id: 3,
        title: "Collaborate Securely",
        description: "Collaborate through our integrated development environment",
        icon: Code,
        Image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        color: "from-emerald-500 to-green-500",
        detailedDescription: [
            "Real-time collaboration with version control integration",
            "Automated testing and quality assurance checkpoints",
            "Secure code repository with access management",
        ],
    },
    {
        id: 4,
        title: "Project Completion",
        description: "Verify deliverables and release secure blockchain payments",
        icon: CheckCircle,
        Image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        color: "from-amber-500 to-orange-500",
        detailedDescription: [
            "Multi-signature verification of completed deliverables",
            "Automated smart contract payment release",
            "Comprehensive project documentation and handover",
        ],
    },
]
const Works = () => {
    const [activeStep, setActiveStep] = useState(null)
    const [hoveredStep, setHoveredStep] = useState(null)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.1 })

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const pathLength = useTransform(smoothProgress, [0, 0.8], [0, 1])
    const pathOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1])

    // Parallax effect for background elements
    const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"])

    // Auto-advance steps on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return

            const container = containerRef.current
            const containerTop = container.getBoundingClientRect().top
            const containerHeight = container.offsetHeight
            const windowHeight = window.innerHeight

            // Calculate how far we've scrolled into the section (0 to 1)
            const scrollProgress = Math.min(Math.max((windowHeight - containerTop) / (containerHeight + windowHeight), 0), 1)

            // Map scroll progress to step index
            const stepIndex = Math.min(Math.floor(scrollProgress * 5), steps.length - 1)

            if (stepIndex >= 0 && stepIndex < steps.length) {
                setActiveStep(stepIndex)
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initialize on mount

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <section ref={containerRef} className="relative px-6 md:px-24 py-4 md:py-16 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"
                    style={{ y: backgroundY }}
                />

                {/* Animated grid pattern */}
                <motion.div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                linear-gradient(to right, var(--primary) 1px, transparent 1px),
                linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
              `,
                        backgroundSize: "60px 60px",
                        y: useTransform(smoothProgress, [0, 1], ["0%", "20%"]),
                    }}
                />

                {/* Floating orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                "absolute rounded-full blur-xl opacity-20",
                                i % 4 === 0
                                    ? "bg-blue-500"
                                    : i % 4 === 1
                                        ? "bg-purple-500"
                                        : i % 4 === 2
                                            ? "bg-emerald-500"
                                            : "bg-amber-500",
                            )}
                            style={{
                                width: `${100 + i * 50}px`,
                                height: `${100 + i * 50}px`,
                                left: `${10 + ((i * 10) % 80)}%`,
                                top: `${10 + ((i * 15) % 70)}%`,
                            }}
                            animate={{
                                x: [0, 30, 0, -30, 0],
                                y: [0, -30, 0, 30, 0],
                                scale: [1, 1.1, 1, 0.9, 1],
                            }}
                            transition={{
                                duration: 20 + i * 5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative">
                {/* Section header */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center justify-center mb-4"
                    >
                        <span className="relative inline-block">
                            <span className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                            <span className="relative bg-primary/10 text-primary rounded-full px-6 py-2 font-medium flex items-center">
                                Streamlined Process
                                <Sparkles className="h-4 w-4 ml-2" />
                            </span>
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-5xl md:text-6xl font-bold mb-6"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                            How It Works
                        </span>
                    </motion.h2>

                    <motion.p
                        className="max-w-2xl mx-auto text-lg text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Our revolutionary platform simplifies the freelancing process with blockchain-powered security and seamless
                        collaboration tools
                    </motion.p>
                </motion.div>

                {/* 3D Process Flow */}
                <div className="relative">
                    {/* Central connecting path */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 2 100" preserveAspectRatio="none">
                            <motion.path
                                d="M1,0 L1,100"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                strokeDasharray="1"
                                fill="none"
                                style={{
                                    pathLength,
                                    opacity: pathOpacity,
                                }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                                    <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Steps */}
                    <div className="space-y-32 md:space-y-64 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                                className={cn(
                                    "flex flex-col md:flex-row items-center gap-8 md:gap-16",
                                    index % 2 === 1 ? "md:flex-row-reverse" : "",
                                )}
                            >
                                {/* Step number and connecting line */}
                                <div className="relative hidden md:block">
                                    <motion.div
                                        className={cn(
                                            "absolute top-1/2 -translate-y-1/2",
                                            index % 2 === 0 ? "right-full mr-8" : "left-full ml-8",
                                            "w-16 h-[2px] bg-gradient-to-r",
                                            `bg-gradient-to-r ${step.color}`,
                                        )}
                                        initial={{ scaleX: 0 }}
                                        animate={activeStep === index ? { scaleX: 1 } : { scaleX: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            originX: index % 2 === 0 ? 1 : 0,
                                        }}
                                    />
                                </div>

                                {/* Step content */}
                                <motion.div
                                    className={cn("w-full md:w-1/2 perspective-1000", activeStep === index ? "z-20" : "z-10")}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={
                                        activeStep === index
                                            ? { opacity: 1, y: 0 }
                                            : activeStep !== null && activeStep > index
                                                ? { opacity: 0.5, y: -50 }
                                                : { opacity: 0.5, y: 50 }
                                    }
                                    transition={{ duration: 0.8 }}
                                >
                                    <motion.div
                                        className={cn(
                                            "relative rounded-2xl overflow-hidden",
                                            "bg-background/80 backdrop-blur-sm border border-primary/10",
                                            "shadow-[0_10px_40px_rgba(0,0,0,0.03)]",
                                            "p-8 md:p-10",
                                            activeStep === index ? "shadow-lg" : "",
                                        )}
                                        whileHover={{
                                            scale: 1.02,
                                            rotateY: index % 2 === 0 ? 2 : -2,
                                            transition: { duration: 0.3 },
                                        }}
                                        onHoverStart={() => setHoveredStep(index)}
                                        onHoverEnd={() => setHoveredStep(null)}
                                    >
                                        {/* Gradient background */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 opacity-0 transition-opacity duration-500",
                                                hoveredStep === index || activeStep === index ? "opacity-10" : "",
                                                "bg-gradient-to-br",
                                                step.color,
                                            )}
                                        />

                                        <div className="relative z-10">
                                            {/* Step number */}
                                            <div className="flex items-center mb-6">
                                                <motion.div
                                                    className={cn(
                                                        "flex items-center justify-center w-14 h-14 rounded-full",
                                                        "text-white font-bold text-xl",
                                                        "bg-gradient-to-r",
                                                        step.color,
                                                    )}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={activeStep === index ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.7 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    {step.id}
                                                </motion.div>
                                                <div className="ml-4">
                                                    <h3 className="text-2xl font-bold">{step.title}</h3>
                                                    <p className="text-muted-foreground">{step.description}</p>
                                                </div>
                                            </div>

                                            {/* Step icon */}
                                            <div className="mb-6">
                                                <motion.div
                                                    className={cn(
                                                        "inline-flex items-center justify-center p-4 rounded-xl",
                                                        "bg-gradient-to-br",
                                                        step.color,
                                                        "bg-opacity-10",
                                                    )}
                                                    initial={{ scale: 0.9, opacity: 0.5 }}
                                                    animate={activeStep === index ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.5 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <step.icon className="h-8 w-8 text-primary" />
                                                </motion.div>
                                            </div>

                                            {/* Detailed description */}
                                            <AnimatePresence>
                                                {(activeStep === index || hoveredStep === index) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <ul className="space-y-2 mb-6">
                                                            {step.detailedDescription.map((item, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ duration: 0.3, delay: 0.1 * i }}
                                                                    className="flex items-start"
                                                                >
                                                                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                                    <span className="ml-2">{item}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>

                                                        <motion.button
                                                            className="flex items-center text-primary font-medium"
                                                            whileHover={{ x: 5 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            Learn more about this step
                                                            <ArrowRight className="ml-2 h-4 w-4" />
                                                        </motion.button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Decorative elements */}
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 -z-0 blur-xl" />
                                        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/5 -z-0 blur-xl" />
                                    </motion.div>
                                </motion.div>

                                {/* Step visualization */}
                                <motion.div
                                    className={cn(
                                        "w-full md:w-1/2 h-[300px] md:h-[400px]",
                                        "rounded-2xl overflow-hidden relative perspective-1000",
                                    )}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={
                                        activeStep === index
                                            ? { opacity: 1, scale: 1 }
                                            : activeStep !== null && activeStep > index
                                                ? { opacity: 0.3, scale: 0.8 }
                                                : { opacity: 0.3, scale: 0.8 }
                                    }
                                    transition={{ duration: 0.8 }}
                                >
                                    {/* 3D visualization container */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-primary/10 rounded-2xl overflow-hidden"
                                        whileHover={{
                                            scale: 1.02,
                                            rotateY: index % 2 === 0 ? -2 : 2,
                                            transition: { duration: 0.3 },
                                        }}
                                    >
                                        {/* Step visualization content - replace with actual visualizations */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Animated background pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <motion.div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: `radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 70%)`,
                                                    }}
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.1, 0.2, 0.1],
                                                    }}
                                                    transition={{
                                                        duration: 8,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            </div>

                                            {/* Step icon (large) */}
                                            <motion.div
                                                className={cn(
                                                    "relative flex items-center justify-center w-full h-full rounded-full",
                                                    "bg-gradient-to-br",
                                                    step.color,
                                                    "bg-opacity-20",
                                                )}
                                                animate={{
                                                    scale: [1, 1.05, 1],
                                                    rotate: [0, 5, 0, -5, 0],
                                                }}
                                                transition={{
                                                    duration: 10,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <img src={step.Image} alt="" className="h-full w-full object-cover" />

                                                {/* Orbiting elements */}
                                                {Array.from({ length: 3 }).map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute rounded-full bg-primary/30 w-4 h-4 flex items-center justify-center"
                                                        style={{
                                                            boxShadow: "0 0 20px rgba(var(--primary), 0.3)",
                                                        }}
                                                        animate={{
                                                            rotate: [0, 360],
                                                        }}
                                                        transition={{
                                                            duration: 10 + i * 2,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                            ease: "linear",
                                                        }}
                                                    >
                                                        <motion.div
                                                            className="absolute"
                                                            style={{
                                                                width: `${120 + i * 40}px`,
                                                                height: `${120 + i * 40}px`,
                                                                borderRadius: "100%",
                                                                border: "1px dashed rgba(var(--primary), 0.2)",
                                                            }}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-col items-center mt-32"
                >
                    <div className="relative group">
                        <motion.button
                            className="relative px-8 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-full overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center">
                                Start Your Journey
                                <MousePointer className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                            </span>
                            <motion.span
                                className="absolute inset-0 bg-primary-foreground/10"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.button>
                        <motion.div
                            className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
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

export default Works