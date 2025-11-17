import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  Shield,
  FileText,
  Zap,
  Lock,
  Wallet,
  Users,
  ArrowRight,
  Check,
  MousePointer,
  Sparkles,
  Fingerprint,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import '@/App.css'

const faqs= [
  {
    id: "blockchain-security",
    question: "How does blockchain ensure security in freelancing?",
    answer:
      "Blockchain technology provides a decentralized and immutable ledger, ensuring that all transactions and agreements are securely recorded and cannot be altered. This creates a trustless environment where both freelancers and clients can collaborate with confidence, knowing that payment terms and project details are transparently and permanently stored.",
    icon: Shield,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "smart-contracts",
    question: "What are the benefits of using smart contracts?",
    answer:
      "Smart contracts automate the execution of agreements between freelancers and clients. They can automatically release payments when predefined conditions are met, such as the completion of project milestones. This reduces the need for intermediaries, minimizes disputes, and ensures that both parties adhere to the agreed-upon terms.",
    icon: FileText,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "escrow",
    question: "How does the escrow system work?",
    answer:
      "Our escrow system acts as a secure third party that holds the client's payment until the project is completed to satisfaction. When a job is agreed upon, the client deposits the payment into the escrow. The funds are only released to the freelancer once the work is approved, providing security for both parties and incentivizing quality work.",
    icon: Wallet,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "data-privacy",
    question: "Is my personal and financial information safe on the platform?",
    answer:
      "Yes, we prioritize the security of your data. By leveraging blockchain technology, we ensure that your personal and financial information is encrypted and stored in a decentralized manner, making it extremely difficult for unauthorized access. Additionally, we implement industry-standard security protocols to protect all communications and transactions on our platform.",
    icon: Lock,
    color: "from-purple-500 to-fuchsia-600",
  },
]

// Particle effect component
const ParticleEffect = ({ color, density = 30 }) => {
  const particles = Array.from({ length: density }).map((_, i) => ({
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

export default function CtaFaqSection() {
  const [activeFaq, setActiveFaq] = useState(null)
  const ctaSectionRef = useRef(null)
  const faqSectionRef = useRef(null)
  const isCtaInView = useInView(ctaSectionRef, { once: false, amount: 0.3 })
  const isFaqInView = useInView(faqSectionRef, { once: false, amount: 0.1 })

  // For the floating 3D effect
  const { scrollYProgress } = useMotionValue(0)



  // Generate benefits for the CTA section
  const benefits = [
    { icon: Shield, text: "Secure Payments" },
    { icon: Zap, text: "Fast Transactions" },
    { icon: Users, text: "Global Network" },
    { icon: Lock, text: "Data Privacy" },
  ]

  return (
    <>
      {/* Enhanced CTA Section */}
      <section
        ref={ctaSectionRef}
        className="relative px-6 md:px-24 py-4 md:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)",
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <GlowingOrb color="rgba(255, 255, 255, 0.2)" size={500} className="top-[-100px] right-[-100px]" />
          <GlowingOrb
            color="rgba(255, 255, 255, 0.15)"
            size={600}
            className="bottom-[-200px] left-[-100px]"
            blur={100}
          />
        </div>

        {/* Particle effects */}
        <ParticleEffect color="bg-white/30" density={50} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side: CTA content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/10 inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Join the Revolution
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Ready to Transform Your Freelancing Experience?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/90 text-lg mb-8 max-w-lg"
              >
                Join our decentralized marketplace today and experience the future of secure, efficient, and transparent
                freelancing with blockchain technology.
              </motion.p>

              {/* Benefits list */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-10"
              >
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="bg-white/20 rounded-full p-2">
                        <benefit.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white/90 font-medium">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="relative group">
                  <Button
                    size="lg"
                    className="relative bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-medium overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      Find Work
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                  <motion.div
                    className="absolute -inset-1 rounded-lg bg-white/30 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
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

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg font-medium bg-white/20"
                >
                  <span className="flex items-center">
                    Post a Job
                    <MousePointer className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right side: 3D illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <FloatingElement duration={6} yOffset={30}>
                <div className="relative">
                  {/* Main platform illustration */}
                  <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Global Talent Network</h3>
                          <p className="text-white/70 text-sm">Connect with professionals worldwide</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-500/30">Active</Badge>
                    </div>

                    <div className="space-y-4 mb-6">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center">
                              <FileText className="h-4 w-4 text-white/70" />
                            </div>
                            <div>
                              <h4 className="text-white text-sm font-medium">Project #{item}</h4>
                              <p className="text-white/50 text-xs">Milestone completed</p>
                            </div>
                          </div>
                          <div className="text-white/90 font-mono">+$250.00</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Total Earnings</span>
                        <span className="text-white font-semibold">$1,250.00</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          initial={{ width: "0%" }}
                          animate={isCtaInView ? { width: "75%" } : { width: "0%" }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <FloatingElement
                    className="absolute top-[-40px] right-[-40px] z-999"
                    delay={0.5}
                    duration={5}
                    yOffset={15}
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-emerald-300" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Payment Received</h4>
                          <p className="text-white/50 text-xs">Transaction confirmed</p>
                        </div>
                      </div>
                    </div>
                  </FloatingElement>

                  <FloatingElement
                    className="absolute bottom-[-50px] left-[-60px] z-999"
                    delay={0.3}
                    duration={4.5}
                    yOffset={20}
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg max-w-[200px]">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Shield className="h-4 w-4 text-blue-300" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Secure Escrow</h4>
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-400"
                          initial={{ width: "0%" }}
                          animate={isCtaInView ? { width: "90%" } : { width: "0%" }}
                          transition={{ duration: 1, delay: 1 }}
                        />
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section> 

      {/* Enhanced FAQ Section */}
      <section ref={faqSectionRef} className="relative overflow-hidden px-6 md:px-24 py-4 md:py-16">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <GlowingOrb color="rgba(79, 70, 229, 0.05)" size={600} className="top-[-200px] right-[-200px]" blur={100} />
          <GlowingOrb color="rgba(147, 51, 234, 0.05)" size={500} className="bottom-[-100px] left-[-100px]" blur={80} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isFaqInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <Badge variant="outline" className="mb-3 px-4 py-1 border-primary/30 text-primary">
                Common Questions
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={isFaqInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isFaqInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-slate-600 max-w-2xl mx-auto"
            >
              Everything you need to know about our blockchain-powered freelancing platform
            </motion.p>
          </motion.div>

          {/* Interactive FAQ display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: FAQ navigation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isFaqInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900">Browse Topics</h3>
                  <p className="text-slate-500 text-sm">Select a topic to learn more</p>
                </div>

                <div className="divide-y divide-slate-100">
                  {faqs.map((faq, index) => (
                    <motion.button
                      key={faq.id}
                      className={cn(
                        "w-full text-left p-4 flex items-start gap-4 transition-all",
                        activeFaq === faq.id ? "bg-slate-50" : "hover:bg-slate-50",
                      )}
                      onClick={() => setActiveFaq(faq.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={cn("p-2 rounded-lg mt-0.5", "bg-gradient-to-br", faq.color, "shadow-md")}>
                        <faq.icon className="h-4 w-4 text-white" />
                      </div>

                      <div>
                        <h4
                          className={cn(
                            "font-medium transition-colors",
                            activeFaq === faq.id ? "text-primary" : "text-slate-700",
                          )}
                        >
                          {faq.question}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{faq.answer.substring(0, 60)}...</p>
                      </div>

                      <ChevronRight
                        className={cn(
                          "h-5 w-5 ml-auto mt-1 transition-transform",
                          activeFaq === faq.id ? "text-primary rotate-90" : "text-slate-400",
                        )}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side: FAQ content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <AnimatePresence mode="wait">
                {activeFaq ? (
                  <motion.div
                    key={activeFaq}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
                  >
                    {faqs
                      .filter((faq) => faq.id === activeFaq)
                      .map((faq) => (
                        <div key={faq.id} className="p-8">
                          <div className="flex items-start gap-4 mb-6">
                            <div className={cn("p-3 rounded-xl", "bg-gradient-to-br", faq.color, "shadow-lg")}>
                              <faq.icon className="h-6 w-6 text-white" />
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold text-slate-900 mb-2">{faq.question}</h3>
                              <p className="text-slate-600">{faq.answer}</p>
                            </div>
                          </div>

                          {/* Additional content based on FAQ type */}
                          {faq.id === "blockchain-security" && (
                            <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-100">
                              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                                How Blockchain Secures Your Work
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  { title: "Immutable Records", desc: "All transactions are permanently recorded" },
                                  { title: "Decentralized", desc: "No single point of failure or control" },
                                  { title: "Transparent", desc: "All parties can verify the same information" },
                                  { title: "Cryptographically Secure", desc: "Advanced encryption protects data" },
                                ].map((item, i) => (
                                  <div key={i} className="flex items-start gap-3">
                                    <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                                      <Check className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-slate-900">{item.title}</h5>
                                      <p className="text-sm text-slate-600">{item.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {faq.id === "smart-contracts" && (
                            <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-100">
                              <h4 className="text-lg font-semibold text-slate-900 mb-4">Smart Contract Workflow</h4>
                              <div className="relative">
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
                                {[
                                  { title: "Agreement Creation", desc: "Terms are coded into a smart contract" },
                                  { title: "Milestone Setup", desc: "Project is divided into verifiable stages" },
                                  { title: "Work Submission", desc: "Freelancer submits completed milestones" },
                                  { title: "Automatic Payment", desc: "Funds release when conditions are met" },
                                ].map((item, i) => (
                                  <div key={i} className="flex items-start gap-4 mb-6 relative pl-8">
                                    <div className="absolute left-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                                      <span className="text-white text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-slate-900">{item.title}</h5>
                                      <p className="text-sm text-slate-600">{item.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {faq.id === "escrow" && (
                            <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-100">
                              <h4 className="text-lg font-semibold text-slate-900 mb-4">Escrow Protection System</h4>
                              <div className="relative p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                                      <Wallet className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-slate-900">Secure Escrow Account</h5>
                                      <p className="text-sm text-slate-500">Project funds in holding</p>
                                    </div>
                                  </div>
                                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">Active</Badge>
                                </div>

                                <div className="space-y-4 mb-4">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Total Project Value</span>
                                    <span className="font-medium text-slate-900">$2,500.00</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Released to Freelancer</span>
                                    <span className="font-medium text-slate-900">$1,000.00</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Remaining in Escrow</span>
                                    <span className="font-medium text-slate-900">$1,500.00</span>
                                  </div>
                                </div>

                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                                  <div className="h-full bg-amber-500 w-[40%]"></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                  <span>40% Complete</span>
                                  <span>60% Remaining</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {faq.id === "data-privacy" && (
                            <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-100">
                              <h4 className="text-lg font-semibold text-slate-900 mb-4">Data Protection Measures</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                  {
                                    title: "End-to-End Encryption",
                                    desc: "All communications are encrypted so only intended recipients can access them",
                                    icon: Lock,
                                    color: "bg-purple-500/10 text-purple-500",
                                  },
                                  {
                                    title: "Zero-Knowledge Proofs",
                                    desc: "Verify information without revealing the underlying data",
                                    icon: Shield,
                                    color: "bg-indigo-500/10 text-indigo-500",
                                  },
                                  {
                                    title: "Decentralized Storage",
                                    desc: "Your data is distributed across the network, not stored in one place",
                                    icon: FileText,
                                    color: "bg-blue-500/10 text-blue-500",
                                  },
                                  {
                                    title: "Biometric Authentication",
                                    desc: "Optional additional security layer for sensitive operations",
                                    icon: Fingerprint,
                                    color: "bg-emerald-500/10 text-emerald-500",
                                  },
                                ].map((item, i) => (
                                  <div key={i} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                                    <div className="flex items-start gap-3 mb-2">
                                      <div className={`${item.color} rounded-full p-2`}>
                                        <item.icon className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <h5 className="font-medium text-slate-900">{item.title}</h5>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 pl-11">{item.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-8 flex justify-end">
                            <Button
                              variant="outline"
                              className="text-primary border-primary/30 hover:bg-primary/5"
                              onClick={() => setActiveFaq(null)}
                            >
                              Back to All Questions
                            </Button>
                          </div>
                        </div>
                      ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center min-h-[300px]"
                  >
                    <div className="text-center max-w-md">
                      <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                        <ChevronRight className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Select a Question</h3>
                      <p className="text-slate-600 mb-6">
                        Choose a topic from the left to view detailed information about our platform
                      </p>
                      <Button
                        variant="outline"
                        className="text-primary border-primary/30 hover:bg-primary/5"
                        onClick={() => setActiveFaq("blockchain-security")}
                      >
                        View First Question
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

