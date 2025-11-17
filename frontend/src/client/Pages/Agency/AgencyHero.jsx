

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Briefcase, Award, Users, TrendingUp, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"


export default function AgencyHero() {
    const router = useNavigate()
    const [isVisible, setIsVisible] = useState(false)
    const heroRef = useRef(null)

    useEffect(() => {
        setIsVisible(true)

        const handleMouseMove = (e) => {
            const cards = document.querySelectorAll(".parallax-card")
            const decorations = document.querySelectorAll(".decoration")

            cards.forEach((card) => {
                const speed = 0.02
                const x = (window.innerWidth / 2 - e.pageX) * speed
                const y = (window.innerHeight / 2 - e.pageY) * speed
                card.style.transform = `translateX(${x}px) translateY(${y}px)`
            })

            decorations.forEach((el, index) => {
                const speed = 0.05 + index * 0.01
                const x = (window.innerWidth / 2 - e.pageX) * speed
                const y = (window.innerHeight / 2 - e.pageY) * speed
                el.style.transform = `translateX(${x}px) translateY(${y}px)`
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const handleRegisterClick = () => {
        router("/find-talent/register-agency")
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

    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/25"></div>

            <div className="decoration absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"></div>
            <div className="decoration absolute top-40 -left-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl"></div>
            <div className="decoration absolute -bottom-40 right-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl"></div>

            <motion.div
                className="absolute top-1/4 left-10 h-6 w-6 rounded-full bg-purple-500/30"
                animate={{
                    y: [0, 100, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-10 h-4 w-4 rounded-full bg-emerald-500/30"
                animate={{
                    y: [0, -80, 0],
                    opacity: [0.2, 0.7, 0.2],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/2 right-1/4 h-5 w-5 rounded-full bg-amber-500/30"
                animate={{
                    x: [0, 60, 0],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 18,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <div className="relative mx-auto px-4 py-2 md:px-16 md:py-16">
                <motion.div
                    ref={heroRef}
                    className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {/* Left column - Content */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            variants={itemVariants}
                            className="mt-2 md:mt-0"
                        >
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 mb-2 self-start">
                                <Sparkles className="h-4 w-4 text-emerald-600 mr-2" />
                                <span className="text-sm font-medium text-emerald-800 ">Now Accepting Agencies</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="mb-6 pt-4 space-y-2 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
                        >
                            <motion.span
                                className="block"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                Grow Your Agency
                            </motion.span>
                            <motion.span
                                className="block text-primary "
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                with <span className="text-emerald-600 dark:text-emerald-400 heroText">HireBid</span>
                            </motion.span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="mb-8 max-w-md text-lg text-slate-600 dark:text-slate-400">
                            Join our exclusive network of top-tier agencies and get matched with high-quality clients looking for your
                            specific expertise.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {[
                                {
                                    title: "No commission fees",
                                    description: "Keep 100% of what you earn",
                                },
                                {
                                    title: "Verified clients only",
                                    description: "Work with serious businesses",
                                },
                                {
                                    title: "Project matching",
                                    description: "AI-powered project recommendations",
                                },
                                {
                                    title: "Premium exposure",
                                    description: "Stand out to potential clients",
                                },
                            ].map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                >
                                    <motion.div animate={floatingAnimation}>
                                        <CheckCircle2 className="mr-3 h-5 w-5 text-emerald-600" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-medium">{benefit.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{benefit.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                        >
                            <Button
                                size="lg"
                                className="group bg-emerald-600 hover:bg-[#89AC46]"
                                onClick={handleRegisterClick}
                                as={motion.button}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                
                            >
                                Register your agency
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                >
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </motion.span>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                as={motion.button}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Learn more
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right column - Stats & Form */}
                    <motion.div variants={itemVariants} className="relative">
                        {/* Decorative elements */}
                        <div className="decoration absolute -right-4 -top-4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
                        <div className="decoration absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"></div>

                        <motion.div
                            className="parallax-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <Card className="relative overflow-hidden border-slate-200 bg-white/80  dark:border-slate-800 dark:bg-slate-950/80 mb-4">
                                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-emerald-600"></div>
                                <CardContent className="p-6 sm:p-8">
                                    <motion.div
                                        className="mb-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <h2 className="mb-2 text-2xl font-bold">Join 250+ agencies</h2>
                                        <p className="text-slate-500 dark:text-slate-400">
                                            Top agencies are growing their business on HireBid
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="mb-8 grid grid-cols-3 gap-6 md:grid-cols-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        {[
                                            {
                                                icon: <Briefcase className="h-5 w-5" />,
                                                value: "8.5K+",
                                                label: "Projects completed",
                                                color: "emerald",
                                            },
                                            {
                                                icon: <Award className="h-5 w-5" />,
                                                value: "96%",
                                                label: "Client satisfaction",
                                                color: "amber",
                                            },
                                            {
                                                icon: <TrendingUp className="h-5 w-5" />,
                                                value: "₹25L+",
                                                label: "Revenue generated",
                                                color: "violet",
                                            },
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                className={`rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50`}
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <motion.div
                                                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-${stat.color}-100 text-${stat.color}-600 dark:bg-${stat.color}-900/30 dark:text-${stat.color}-400`}
                                                    animate={floatingAnimation}
                                                >
                                                    {stat.icon}
                                                </motion.div>
                                                <motion.div
                                                    className="text-2xl font-bold"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                                >
                                                    {stat.value}
                                                </motion.div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        className="space-y-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <div className="flex flex-col md:flex-row items-center space-x-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map((i) => (
                                                    <motion.img
                                                        key={i}
                                                        src={`https://img.freepik.com/premium-photo/young-happy-professional-business-woman-employee-sitting-desk-working-laptop_1023984-70.jpg`}
                                                        alt="Agency logo"
                                                        className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-slate-800"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 1 + i * 0.1 }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                                Joined by agencies from 5+ countries
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-emerald-600 hover:bg-[#89AC46]"
                                            size="lg"
                                            onClick={handleRegisterClick}
                                            as={motion.button}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            Apply to join
                                        </Button>

                                        <p className="text-end text-xs text-slate-500 dark:text-slate-400">
                                            Free to join. Premium features available.
                                        </p>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Testimonial */}
                        <motion.div
                            className="absolute hidden -bottom-6 -left-6 max-w-xs transform rounded-lg border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:block md:-left-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <motion.div
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                                    animate={floatingAnimation}
                                >
                                    <Users className="h-5 w-5 text-primary" />
                                </motion.div>
                                <div>
                                    <div className="text-sm font-medium">PixelPerfect Studios</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Joined 8 months ago</div>
                                </div>
                            </div>
                            <div className="mt-2 text-sm">
                                "We{"'"}ve increased our client base by 40% since joining HireBid. The quality of leads is exceptional."
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
