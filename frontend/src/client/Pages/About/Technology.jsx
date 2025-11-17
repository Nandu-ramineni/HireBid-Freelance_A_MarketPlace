import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    Database,
    Lock,
    Shield,
    FileText,
    Zap,
    Layers,
    Code,
    Server,
    Cpu,
    Network,
    Key,
    Fingerprint,
    ChevronRight,
    ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const technologies = [
    {
        id: "blockchain",
        title: "Blockchain Foundation",
        icon: Database,
        color: "from-blue-600 to-indigo-700",
        description:
            "Our platform is built on a robust blockchain infrastructure, ensuring security, transparency, and immutability.",
        features: [
            {
                id: "immutable",
                title: "Immutable Records",
                description:
                    "All transactions are permanently recorded on the blockchain, creating an unalterable audit trail.",
                icon: FileText,
            },
            {
                id: "decentralized",
                title: "Decentralized Storage",
                description: "Data is distributed across a network of nodes, eliminating single points of failure.",
                icon: Server,
            },
            {
                id: "security",
                title: "Enhanced Security",
                description: "Cryptographic protocols protect all data and transactions from unauthorized access.",
                icon: Shield,
            },
            {
                id: "cost",
                title: "Reduced Costs",
                description: "Elimination of intermediaries leads to lower transaction fees and operational costs.",
                icon: Zap,
            },
        ],
    },
    {
        id: "smart-contracts",
        title: "Smart Contract Integration",
        icon: Code,
        color: "from-emerald-600 to-teal-700",
        description: "Smart contracts automate and secure the freelancing process with code-enforced agreements.",
        features: [
            {
                id: "payments",
                title: "Automatic Payments",
                description:
                    "Funds are automatically released when predefined conditions are met, without manual intervention.",
                icon: Zap,
            },
            {
                id: "milestones",
                title: "Milestone Management",
                description: "Projects are broken down into verifiable milestones with conditional payment releases.",
                icon: Layers,
            },
            {
                id: "disputes",
                title: "Dispute Resolution",
                description: "Built-in arbitration mechanisms ensure fair resolution of any disagreements.",
                icon: Lock,
            },
            {
                id: "transparency",
                title: "Transparent Fees",
                description: "All platform fees are clearly defined in the contract code and visible to all parties.",
                icon: FileText,
            },
        ],
    },
    {
        id: "cryptography",
        title: "Advanced Cryptography",
        icon: Key,
        color: "from-purple-600 to-fuchsia-700",
        description: "State-of-the-art cryptographic protocols ensure the highest level of security and privacy.",
        features: [
            {
                id: "encryption",
                title: "End-to-End Encryption",
                description: "All communications and data transfers are encrypted to prevent unauthorized access.",
                icon: Lock,
            },
            {
                id: "zero-knowledge",
                title: "Zero-Knowledge Proofs",
                description: "Verify information without revealing sensitive data, maintaining complete privacy.",
                icon: Fingerprint,
            },
            {
                id: "multi-sig",
                title: "Multi-Signature Security",
                description: "Critical operations require multiple authorized signatures for enhanced security.",
                icon: Shield,
            },
            {
                id: "quantum",
                title: "Quantum-Resistant Algorithms",
                description: "Future-proof security measures to protect against quantum computing threats.",
                icon: Cpu,
            },
        ],
    },
    {
        id: "network",
        title: "Distributed Network",
        icon: Network,
        color: "from-amber-600 to-orange-700",
        description: "A global network of nodes ensures high availability, speed, and resilience against attacks.",
        features: [
            {
                id: "global",
                title: "Global Infrastructure",
                description: "Strategically positioned nodes across continents ensure low-latency access worldwide.",
                icon: Network,
            },
            {
                id: "consensus",
                title: "Advanced Consensus",
                description: "Our proprietary consensus mechanism ensures fast finality while maintaining security.",
                icon: Layers,
            },
            {
                id: "scaling",
                title: "Layer-2 Scaling",
                description: "Off-chain processing for routine operations dramatically increases throughput.",
                icon: Zap,
            },
            {
                id: "interop",
                title: "Cross-Chain Interoperability",
                description: "Seamless integration with other blockchain networks for maximum flexibility.",
                icon: Cpu,
            },
        ],
    },
]
const Hexagon = ({
    children,
    className,
    onClick,
    isActive,
    color,
}) => {
    return (
        <motion.div
            className={cn("relative cursor-pointer", className)}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
        >
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{ filter: isActive ? "drop-shadow(0 0 10px rgba(255,255,255,0.3))" : "none" }}
            >
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className={`stop-${color.split("-")[0]}`} />
                        <stop offset="100%" className={`stop-${color.split("-")[1]}`} />
                    </linearGradient>
                </defs>
                <motion.polygon
                    points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25"
                    className={cn(
                        "fill-white/5 stroke-white/20",
                        isActive ? "fill-[url(#gradient-blue-indigo)]/10 stroke-[url(#gradient-blue-indigo)]" : "",
                    )}
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">{children}</div>
        </motion.div>
    )
}
const Connector = ({
    start,
    end,
    color = "white",
    thickness = 2,
    animated = false,
}) => {
    const pathLength = useMotionValue(0)
    const springPathLength = useSpring(pathLength, { stiffness: 100, damping: 30 })

    useEffect(() => {
        if (animated) {
            pathLength.set(1)
        }
    }, [animated, pathLength])

    // Calculate the path
    const dx = end.x - start.x
    const dy = end.y - start.y
    const length = Math.sqrt(dx * dx + dy * dy)

    // Calculate control points for a curved line
    const curvature = 0.2
    const mx = start.x + dx * 0.5
    const my = start.y + dy * 0.5
    const cpx1 = start.x + dx * 0.25
    const cpy1 = start.y + dy * 0.1
    const cpx2 = start.x + dx * 0.75
    const cpy2 = end.y - dy * 0.1

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            <motion.path
                d={`M${start.x},${start.y} C${cpx1},${cpy1} ${cpx2},${cpy2} ${end.x},${end.y}`}
                fill="none"
                stroke={color}
                strokeWidth={thickness}
                strokeDasharray={length}
                strokeDashoffset={animated ? useTransform(springPathLength, (v) => length * (1 - v)) : 0}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.5 }}
            />
        </svg>
    )
}

// Particle effect component
const ParticleEffect = ({ color }) => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full ${color}`}
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: 0.3,
                    }}
                    animate={{
                        y: [0, -200, 0],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    )
}
const Technology = () => {
    const [activeTech, setActiveTech] = useState("blockchain")
    const [activeFeature, setActiveFeature] = useState(null)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.1 })
    const [hexPositions, setHexPositions] = useState({})
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    // Get the active technology
    const activeTechnology = technologies.find((tech) => tech.id === activeTech)

    // Update window size on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        // Initial size
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Update hexagon positions when window size changes
    useEffect(() => {
        if (containerRef.current && windowSize.width > 0) {
            const container = containerRef.current
            const hexagons = container.querySelectorAll("[data-hex-id]")
            const newPositions = {};


            hexagons.forEach((hex) => {
                const id = hex.getAttribute("data-hex-id")
                if (id) {
                    const rect = hex.getBoundingClientRect()
                    const containerRect = container.getBoundingClientRect()

                    newPositions[id] = {
                        x: rect.left + rect.width / 2 - containerRect.left,
                        y: rect.top + rect.height / 2 - containerRect.top,
                    }
                }
            })

            setHexPositions(newPositions)
        }
    }, [windowSize])
    return (
        <section
            ref={containerRef}
            className="relative px-6 md:px-24 py-4 md:py-16 overflow-hidden "

        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px]" />
                <div className="absolute bottom-1/4 -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[100px]" />
            </div>

            {activeTech === "blockchain" && <ParticleEffect color="bg-blue-500/20" />}
            {activeTech === "smart-contracts" && <ParticleEffect color="bg-emerald-500/20" />}
            {activeTech === "cryptography" && <ParticleEffect color="bg-purple-500/20" />}
            {activeTech === "network" && <ParticleEffect color="bg-amber-500/20" />}

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header with advanced animation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block"
                    >
                        <Badge variant="outline" className="mb-3 px-4 py-1 border-primary/30 text-primary">
                            Advanced Infrastructure
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold text-center pb-4 heroText"
                    >
                        Powered by Cutting-Edge Technology
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center text-muted-foreground max-w-2xl mx-auto"
                    >
                        Our platform leverages the latest advancements in blockchain, cryptography, and distributed systems to
                        create a secure, efficient, and transparent ecosystem.
                    </motion.p>
                </motion.div>

                {/* Interactive technology visualization */}
                <div className="mb-16">
                    {/* Technology hexagon grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={tech.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                data-hex-id={tech.id}
                            >
                                <Hexagon
                                    onClick={() => {
                                        setActiveTech(tech.id)
                                        setActiveFeature(null)
                                    }}
                                    isActive={activeTech === tech.id}
                                    color={tech.color.split(" ")[1]}
                                    className="w-full aspect-square max-w-[180px] mx-auto "
                                >
                                    <div className="flex flex-col items-center text-center p-4">
                                        <div
                                            className={cn(
                                                "p-3 rounded-xl mb-3",
                                                "bg-gradient-to-br",
                                                tech.color,
                                                activeTech === tech.id ? "shadow-lg shadow-primary/20 " : "",
                                            )}
                                        >
                                            <tech.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className={cn(activeTech === tech.id ? "text-sm font-medium text-white" : "text-black")}>{tech.title}</h3>
                                    </div>
                                </Hexagon>
                            </motion.div>
                        ))}
                    </div>

                    {/* Draw connectors between hexagons */}
                    {/* {Object.keys(hexPositions).length > 0 && (
                        <>
                            {technologies.map((tech, index) => {
                                const nextTech = technologies[(index + 1) % technologies.length]
                                if (hexPositions[tech.id] && hexPositions[nextTech.id]) {
                                    return (
                                        <Connector
                                            key={`${tech.id}-${nextTech.id}`}
                                            start={hexPositions[tech.id]}
                                            end={hexPositions[nextTech.id]}
                                            color="rgba(0, 0, 0, 0.6)"
                                            thickness={0.5}
                                        />
                                    )
                                }
                                return null
                            })}
                        </>
                    )} */}

                    {/* Active technology details */}
                    <AnimatePresence mode="wait">
                        {activeTechnology && (
                            <motion.div
                                key={activeTechnology.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl"
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className={cn("p-4 rounded-xl", "bg-gradient-to-br", activeTechnology.color, "shadow-lg")}>
                                        <activeTechnology.icon className="h-8 w-8 text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-black mb-2">{activeTechnology.title}</h3>
                                        <p className="text-black/70 mb-6">{activeTechnology.description}</p>

                                        {/* Features grid */}
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {activeTechnology.features.map((feature, index) => (
                                                <motion.div
                                                    key={feature.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                                    className={cn(
                                                        "group cursor-pointer p-4 rounded-xl transition-all duration-300",
                                                        "border border-white/10 hover:border-white/20",
                                                        "bg-white/5 hover:bg-black/10",
                                                        activeFeature === feature.id ? "bg-white/10 border-white/20 ring-1 ring-white/20" : "",
                                                    )}
                                                    onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                                                    data-hex-id={`feature-${feature.id}`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div
                                                            className={cn("p-2 rounded-lg", "bg-gradient-to-br", activeTechnology.color, "shadow-lg")}
                                                        >
                                                            <feature.icon className="h-5 w-5 text-white" />
                                                        </div>

                                                        <div>
                                                            <h4 className="text-lg font-semibold text-black mb-1">{feature.title}</h4>

                                                            <AnimatePresence>
                                                                {activeFeature === feature.id && (
                                                                    <motion.p
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: "auto" }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className="text-black/70 text-sm"
                                                                    >
                                                                        {feature.description}
                                                                    </motion.p>
                                                                )}
                                                            </AnimatePresence>

                                                            {activeFeature !== feature.id && (
                                                                <motion.button
                                                                    className="flex items-center text-xs font-medium text-black/60 hover:text-black"
                                                                    whileHover={{ x: 5 }}
                                                                >
                                                                    <span>Details</span>
                                                                    <ChevronRight className="h-3 w-3 ml-1" />
                                                                </motion.button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="flex flex-col items-center mt-16"
                >
                    <Button variant="outline" className="bg-black/70 border-black/20 text-white hover:bg-white/20 group">
                        <span>Explore Our Technology</span>
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

export default Technology