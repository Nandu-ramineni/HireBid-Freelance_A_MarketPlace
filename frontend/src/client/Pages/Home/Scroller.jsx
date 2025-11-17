import upwork from "../../../assets/logos/upwork.png"
import monster from "../../../assets/logos/monster.png"
import job from "../../../assets/logos/jobIsJob.png"
import free from "../../../assets/logos/free.png"
import elance from "../../../assets/logos/elegance.png"
import lance from "../../../assets/logos/lance.png"
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function LogoScroller() {
    const logoScrollRef = useRef(null)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Company logos with placeholder images
    const trustedCompanies = [
        {
            name: "Upwork",
            logo: upwork,
            color: "from-emerald-500 to-teal-500",
        },
        {
            name: "Monster",
            logo: monster,
            color: "from-purple-500 to-indigo-500",
        },
        {
            name: "JobIsJob",
            logo: job,
            color: "from-amber-500 to-orange-500",
        },
        {
            name: "Freelancer",
            logo: free,
            color: "from-blue-500 to-cyan-500",
        },
        {
            name: "Elance",
            logo: elance,
            color: "from-rose-500 to-pink-500",
        },
        {
            name: "Lancer",
            logo: lance,
            color: "from-emerald-500 to-teal-500",
        },
    ]

    useEffect(() => {
        const scrollLogos = () => {
            if (logoScrollRef.current && !isPaused) {
                logoScrollRef.current.scrollLeft += 1
                if (logoScrollRef.current.scrollLeft >= logoScrollRef.current.scrollWidth / 2) {
                    logoScrollRef.current.scrollLeft = 0
                }
            }
        }

        const scrollInterval = setInterval(scrollLogos, 30)
        return () => clearInterval(scrollInterval)
    }, [isPaused])

    return (
        <section className="w-full py-16 md:py-24 overflow-hidden relative ">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-3xl bg-emerald-300" />
                <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-3xl bg-indigo-300" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 mb-4">
                        <span className="text-sm font-medium text-emerald-800">Global partnerships</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6 rounded-full" />
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Join thousands of businesses that have found the perfect talent for their projects
                    </p>
                </motion.div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Gradient fades on the sides */}
                    {/* <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10" /> */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-xl p-2"
                    >
                        <div
                            ref={logoScrollRef}
                            className="flex space-x-16 overflow-hidden py-8"
                            onMouseEnter={() => {
                                setIsPaused(true)
                                setIsHovered(true)
                            }}
                            onMouseLeave={() => {
                                setIsPaused(false)
                                setIsHovered(false)
                            }}
                        >
                            {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                                <motion.div key={index} className="flex-shrink-0 group" whileHover={{ y: -5 }}>
                                    <div className="relative w-32 md:w-40  flex items-center justify-center">
                                        {/* Logo */}
                                        <img
                                            src={company.logo || "/placeholder.svg"}
                                            alt={`${company.name} logo`}
                                            className={cn(
                                                "h-12 md:h-20 w-auto transition-all duration-300 filter grayscale hover:grayscale-0",
                                                isHovered && "opacity-70 group-hover:opacity-100",
                                            )}
                                        />

                                        {/* Hover glow effect */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 bg-gradient-to-br rounded-lg blur-xl transition-opacity duration-300 opacity-0 -z-10",
                                                company.color,
                                                "group-hover:opacity-20",
                                            )}
                                        />

                                        {/* Company name on hover */}
                                        <div
                                            className={cn(
                                                "absolute -bottom-8 left-0 right-0 text-center text-sm font-medium transition-all duration-300 opacity-0 transform translate-y-2",
                                                "group-hover:opacity-100 group-hover:translate-y-0",
                                                "text-gray-600 dark:text-gray-300",
                                            )}
                                        >
                                            {company.name}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Button
                        size="lg"
                        className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-full shadow-lg text-white font-medium text-base transition-all duration-300 hover:shadow-emerald-200/50 hover:shadow-xl px-8 py-6"
                    >
                        <span>Join These Leading Companies</span>
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

