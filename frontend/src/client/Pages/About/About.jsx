import { useEffect, useState, useRef } from "react"
import { motion,  useInView, useScroll, useTransform } from "framer-motion"
import {
  ChevronDown,
  Globe,
  User,
  FileSearch,
  MessageSquare,
  CheckCircle,
  Star,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom"
import { Clock01Icon, Shield01Icon } from "hugeicons-react"
import ReactPlayer from "react-player";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Features from "./Features"
import Works from "./Works"
import Technology from "./Technology"
import CtaFaqSection from "./CTA"
export default function About() {
  const [activeStep, setActiveStep] = useState(0)
  const location = useLocation()
  const [open, setOpen] = useState(false);
  // Refs for scroll animations
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const technologyRef = useRef(null)
  const ctaRef = useRef(null)
  const faqRef = useRef(null)

  // Check if sections are in view
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.2 })
  const howItWorksInView = useInView(howItWorksRef, { once: false, amount: 0.2 })
  const technologyInView = useInView(technologyRef, { once: false, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 })
  const faqInView = useInView(faqRef, { once: false, amount: 0.2 })

  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const heroTextY = useTransform(scrollY, [0, 500], [0, 100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [location])

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % howItWorks.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Shield01Icon,
      title: "Secure Transactions",
      description: "End-to-end encrypted payment system with multi-signature protection",
      color: "bg-gradient-to-br from-violet-500 to-purple-700",
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Connect with talent and clients from over 190 countries worldwide",
      color: "bg-gradient-to-br from-blue-500 to-cyan-600",
    },
    {
      icon: Clock01Icon,
      title: "Time Efficiency",
      description: "Automated workflows reduce administrative tasks by up to 75%",
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Verified profiles and reputation system for guaranteed quality",
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
  ]

  const howItWorks = [
    {
      title: "Create an Account",
      description: "Sign up as a freelancer or client using Google OAuth or email.",
      icon: User,
      bgImage:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    },
    {
      title: "Post or Find Jobs",
      description: "Clients post projects, freelancers browse and bid on suitable opportunities.",
      icon: FileSearch,
      bgImage:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Collaborate Securely",
      description: "Use our built-in messaging system for seamless communication.",
      icon: MessageSquare,
      bgImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Complete Projects",
      description: "Finish work and receive payment through our secure escrow system.",
      icon: CheckCircle,
      bgImage:
        "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Rate and Review",
      description: "Provide feedback to build trust within the community.",
      icon: Star,
      bgImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ]

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  }

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }
  const imageUrls = [
    "https://www.bilevi.com/cdn/shop/articles/dressing-for-success-a-guide-to-office-attire-for-women-607338.jpg?v=1691239553&width=2048",
    "https://media.istockphoto.com/id/1369199360/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?s=612x612&w=0&k=20&c=ujyGdu8jKI2UB5515XZA33Tt4DBhDU19dKSTUTMZvrg=",
    "https://img.freepik.com/free-photo/business-woman-with-tablet-standing-office_1303-25394.jpg",
    "https://img.freepik.com/free-photo/medium-shot-smiley-man-sitting-desk_23-2149927603.jpg"
  ];

  return (
    <div className="min-h-screen w-fit overflow-hidden">
      <section className="relative min-h-[100vh] overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50">
        {/* Light version of Blockchain Grid */}
        <BlockchainGrid />

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <FloatingElements />
        </div>

        {/* Content */}
        <div className="container relative z-20 mx-auto px-4 h-full flex flex-col items-center justify-center pt-14 pb-16">
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-8 left-8 flex items-center"
          >
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">BlockFreelance</span>
          </motion.div> */}

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-left"
            >
              <div className="inline-block mb-4 px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
                Next Generation Freelancing Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 heroText">
                <span className="block">Revolutionizing</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-purple-600">
                  Freelancing
                </span>
                <span className="block">with Blockchain</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                Secure, transparent, and efficient collaboration for freelancers and clients worldwide, powered by
                cutting-edge blockchain technology.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 border-0 text-white"
                  >
                    <span>Get Started</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <span>Watch Demo</span>
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="max-w-2xl">
                    <ReactPlayer url="https://youtu.be/Vsq1_kewchQ?si=cb_eMZW7sjfqRNsc" controls width="100%" />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {imageUrls.map((url, i) => (
                    <motion.img
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      src={url}
                      alt={`User ${i + 1}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">300+</span> freelancers joined this month
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative z-10 bg-white p-1 rounded-2xl border border-gray-200 shadow-xl">
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-gray-500 text-xs">Smart Contract Interface</div>
                    <div></div>
                  </div>

                  <div className="p-6">
                    <CodeBlock />

                    <div className="mt-6 p-4 rounded-lg bg-white border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-600">Current Transaction</div>
                        <div className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">Verified</div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-gray-500">Contract ID</div>
                        <div className="text-sm text-gray-700 font-mono">0x7a2d...f83e</div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-gray-500">Amount</div>
                        <div className="text-sm text-gray-700 font-mono">1.45 ETH</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">Status</div>
                        <div className="text-sm text-green-600">Completed</div>
                      </div>

                      <div className="mt-4 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full blur-xl"></div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                <ChevronDown className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Projects", value: "200+" },
                  { label: "Freelancers", value: "500+" },
                  { label: "Success Rate", value: "98.7%" },
                  { label: "Total Volume", value: "₹45M+" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Features/>
      <Works />
      <Technology />
      <CtaFaqSection />

      
      
     
    </div>
  )
}

// Animated particles background component
function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Particle settings
    const particlesArray = []
    const numberOfParticles = 100

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function connect() {
      const maxDistance = 150
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

// Blockchain Grid component
function BlockchainGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Grid settings
    const gridSize = 30
    const nodeRadius = 1
    const nodeColor = "rgba(59, 130, 246, 0.2)" // Lighter blue color with transparency
    const lineColor = "rgba(59, 130, 246, 0.1)"
    const highlightColor = "rgba(59, 130, 246, 0.6)"
    const activeNodes = []
    const maxActiveNodes = 5

    // Calculate grid dimensions
    const cols = Math.ceil(canvas.width / gridSize)
    const rows = Math.ceil(canvas.height / gridSize)

    // Create grid nodes
    const nodes = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          x: i * gridSize,
          y: j * gridSize,
          active: false,
          opacity: 0.2 + Math.random() * 0.1,
        })
      }
    }

    // Activate random nodes periodically
    const activateRandomNode = () => {
      if (activeNodes.length >= maxActiveNodes) return

      const randomIndex = Math.floor(Math.random() * nodes.length)
      const node = nodes[randomIndex]

      if (!node.active) {
        node.active = true
        node.opacity = 0.8
        activeNodes.push({
          node,
          path: [],
          currentNodeIndex: randomIndex,
          step: 0,
          maxSteps: 15 + Math.floor(Math.random() * 20),
        })
      }
    }

    // Update active nodes
    const updateActiveNodes = () => {
      for (let i = activeNodes.length - 1; i >= 0; i--) {
        const activeNode = activeNodes[i]
        activeNode.step++

        if (activeNode.step >= activeNode.maxSteps) {
          activeNode.node.active = false
          activeNode.node.opacity = 0.2 + Math.random() * 0.1
          activeNodes.splice(i, 1)
          continue
        }

        if (activeNode.step % 3 === 0) {
          // Find neighboring nodes
          const currentNode = nodes[activeNode.currentNodeIndex]
          const neighbors = []

          for (let j = 0; j < nodes.length; j++) {
            const node = nodes[j]
            const dx = node.x - currentNode.x
            const dy = node.y - currentNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance <= gridSize * 1.5 && distance > 0) {
              neighbors.push({ node, index: j })
            }
          }

          if (neighbors.length > 0) {
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
            randomNeighbor.node.active = true
            randomNeighbor.node.opacity = 0.8

            activeNode.path.push({
              from: { x: currentNode.x, y: currentNode.y },
              to: { x: randomNeighbor.node.x, y: randomNeighbor.node.y },
              progress: 0,
              maxProgress: 10,
            })

            activeNode.currentNodeIndex = randomNeighbor.index
          }
        }

        // Update path progress
        for (let j = 0; j < activeNode.path.length; j++) {
          const path = activeNode.path[j]
          path.progress++
        }
      }
    }

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 0.5

      // Draw horizontal lines
      for (let i = 0; i <= rows; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * gridSize)
        ctx.lineTo(canvas.width, i * gridSize)
        ctx.stroke()
      }

      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath()
        ctx.moveTo(i * gridSize, 0)
        ctx.lineTo(i * gridSize, canvas.height)
        ctx.stroke()
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        ctx.fillStyle = node.active ? highlightColor : `rgba(59, 130, 246, ${node.opacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw active paths
      for (let i = 0; i < activeNodes.length; i++) {
        const activeNode = activeNodes[i]

        for (let j = 0; j < activeNode.path.length; j++) {
          const path = activeNode.path[j]
          const progress = path.progress / path.maxProgress

          if (progress < 1) {
            const x = path.from.x + (path.to.x - path.from.x) * progress
            const y = path.from.y + (path.to.y - path.from.y) * progress

            ctx.strokeStyle = highlightColor
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(path.from.x, path.from.y)
            ctx.lineTo(x, y)
            ctx.stroke()
          } else {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 - (path.progress - path.maxProgress) * 0.04})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(path.from.x, path.from.y)
            ctx.lineTo(path.to.x, path.to.y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (Math.random() < 0.05) {
        activateRandomNode()
      }

      updateActiveNodes()
      draw()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

// Floating Elements component
function FloatingElements() {
  return (
    <>
      {[...Array(15)].map((_, index) => {
        const size = 10 + Math.random() * 40
        const duration = 15 + Math.random() * 30
        const initialX = Math.random() * 100
        const initialY = Math.random() * 100
        const delay = Math.random() * 5

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-blue-100/30 backdrop-blur-md"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration,
              delay,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </>
  )
}

// Code Block component
function CodeBlock() {
  const codeLines = [
    "contract FreelanceEscrow {",
    "  address public client;",
    "  uint256 public amount;",
    "  bool public workCompleted;",
    "",
    "  event ProjectCompleted();",
    "",
    "  constructor(address _freelancer) payable {",
    "    client = msg.sender;",
    "    freelancer = _freelancer;",
    "    amount = msg.value;",
    "  }",
    "",
    "  function releasePayment() external {",
    "    require(workCompleted);",
    "    require(!fundsReleased);",
    "    fundsReleased = true;",
    "    payable(freelancer).transfer(amount);",
    "    emit PaymentReleased();",
    "  }",
    "}",
  ]

  return (
    <div className="font-mono text-xs text-gray-700 bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-hidden">
      {codeLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.8 + index * 0.02 }}
          className={`${line.trim() === "" ? "h-4" : ""}`}
        >
          <span className="text-gray-400 mr-4">{index + 1}</span>
          {line.includes("contract") && <span className="text-purple-600">contract </span>}
          {line.includes("function") && <span className="text-blue-600">function </span>}
          {line.includes("event") && <span className="text-yellow-600">event </span>}
          {line.includes("require") && <span className="text-red-600">require</span>}
          {line.includes("emit") && <span className="text-yellow-600">emit </span>}
          {line.includes("public") && <span className="text-blue-600">public </span>}
          {line.includes("external") && <span className="text-blue-600">external </span>}
          {line.includes("payable") && <span className="text-green-600">payable</span>}
          {line.includes("constructor") && <span className="text-purple-600">constructor</span>}
          {line.includes("address") && <span className="text-blue-600">address </span>}
          {line.includes("uint256") && <span className="text-blue-600">uint256 </span>}
          {line.includes("bool") && <span className="text-blue-600">bool </span>}
          {line.includes("msg.sender") && <span className="text-green-600">msg.sender</span>}
          {line.includes("msg.value") && <span className="text-green-600">msg.value</span>}
          {line.includes("transfer") && <span className="text-green-600">transfer</span>}
          {!line.includes("contract") &&
            !line.includes("function") &&
            !line.includes("event") &&
            !line.includes("require") &&
            !line.includes("emit") &&
            !line.includes("public") &&
            !line.includes("external") &&
            !line.includes("payable") &&
            !line.includes("constructor") &&
            !line.includes("address") &&
            !line.includes("uint256") &&
            !line.includes("bool") &&
            !line.includes("msg.sender") &&
            !line.includes("msg.value") &&
            !line.includes("transfer") &&
            line.trim() !== "" && <span>{line}</span>}
        </motion.div>
      ))}
    </div>
  )
}

