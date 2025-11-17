"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, CreditCard, Globe, Headphones, Laptop, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <polyline points="7 8 12 13 17 8" />
            </svg>
        ),
        title: "Development & IT",
        services: 8,
        description: "Software Engineer, Web / Mobile Developer & More",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        ),
        title: "Design & Creative",
        services: 8,
        description: "Website Design Adobe XD, Figma, Adobe Photoshop",
        color: "from-purple-500 to-indigo-500",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
        ),
        title: "Digital Marketing",
        services: 1,
        description: "Service Digital and Social Media Management",
        color: "from-amber-500 to-orange-500",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                <path d="M6 12h12" />
            </svg>
        ),
        title: "Writing & Translation",
        services: 1,
        description: "Writing, Translation Project, get It Quickly done",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
        ),
        title: "Music & Audio",
        services: 0,
        description: "Freelancer Music, Audio Services, Music Projects",
        color: "from-rose-500 to-pink-500",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
        ),
        title: "Video & Animation",
        services: 0,
        description: "Animation Video Maker that Brings Studio Quality",
        color: "from-indigo-500 to-blue-500",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="12" y1="2" x2="12" y2="22" />
            </svg>
        ),
        title: "Programming & Tech",
        services: 1,
        description: "Programmers and coders Both for Your Project",
        color: "from-cyan-500 to-blue-500",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-12 h-12"
            >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        title: "Finance & Accounting",
        services: 4,
        description: "Team Works, Collaboration Meet for Your Business",
        color: "from-emerald-500 to-teal-500",
    },
]

const features = [
    {
        icon: <Laptop className="h-12 w-12" />,
        title: "Post a job",
        description: "Easily create a job listing with your project details and requirements.",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: <Users className="h-12 w-12" />,
        title: "Choose freelancers",
        description: "Browse profiles, reviews, and portfolios to find the perfect match for your project.",
        color: "from-purple-500 to-indigo-500",
    },
    {
        icon: <CreditCard className="h-12 w-12" />,
        title: "Pay safely",
        description: "Secure payment systems ensure your funds are protected throughout the project.",
        color: "from-amber-500 to-orange-500",
    },
    {
        icon: <Headphones className="h-12 w-12" />,
        title: "We're here to help",
        description: "Our support team is available 24/7 to assist you with any questions or issues.",
        color: "from-rose-500 to-pink-500",
    },
]

const services = [
    {
        icon: <Briefcase className="w-12 h-12" />,
        title: "Project Matching",
        description: "Connect with the perfect projects that match your skills and interests.",
        color: "from-emerald-500 to-teal-500",
        buttonText: "Find Projects",
    },
    {
        icon: <Shield className="w-12 h-12" />,
        title: "Secure Payments",
        description: "Enjoy peace of mind with our blockchain-based escrow system.",
        color: "from-purple-500 to-indigo-500",
        buttonText: "Learn More",
    },
    {
        icon: <Globe className="w-12 h-12" />,
        title: "Global Network",
        description: "Access a worldwide community of clients and freelancers.",
        color: "from-amber-500 to-orange-500",
        buttonText: "Join Network",
    },
]

export default function Categories() {
    const [hoveredCategory, setHoveredCategory] = useState(null)
    const [hoveredFeature, setHoveredFeature] = useState(null)
    const [hoveredService, setHoveredService] = useState(null)

    return (
        <div className="w-full">
            {/* Categories Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-3">
                            Browse Talent By Category
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">Get some inspiration from 1800+ skills</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            variant="outline"
                            className="group rounded-full border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300"
                        >
                            <span>View more</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative group"
                            onMouseEnter={() => setHoveredCategory(index)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <div className="h-full p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {/* Animated gradient background on hover */}
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-5",
                                        category.color,
                                    )}
                                />

                                {/* Animated blob */}
                                <div
                                    className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500 group-hover:scale-125"
                                    style={{
                                        background: `linear-gradient(to bottom right, var(--${index % 2 === 0 ? "emerald" : "indigo"}-500), var(--${index % 2 === 0 ? "teal" : "purple"}-500))`,
                                    }}
                                />

                                {/* Service count badge */}
                                <div className="absolute top-4 right-4">
                                    <div
                                        className={cn(
                                            "px-2 py-1 text-xs font-medium rounded-full",
                                            category.services > 0
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
                                        )}
                                    >
                                        {category.services} Services
                                    </div>
                                </div>

                                {/* Icon with animated glow */}
                                <div className="relative mb-6">
                                    <div
                                        className={cn(
                                            "text-emerald-600 dark:text-emerald-400 transition-all duration-500 relative z-10",
                                            hoveredCategory === index && "scale-110",
                                        )}
                                    >
                                        {category.icon}
                                    </div>
                                    <div
                                        className={cn(
                                            "absolute -inset-1 bg-gradient-to-br rounded-full blur-lg transition-opacity duration-500 opacity-0",
                                            category.color,
                                            hoveredCategory === index && "opacity-20",
                                        )}
                                    />
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                    {category.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{category.description}</p>

                                {/* Animated arrow on hover */}
                                <div className="mt-4 overflow-hidden h-6">
                                    <div
                                        className={cn(
                                            "transform transition-transform duration-300 flex items-center text-emerald-600 dark:text-emerald-400 font-medium",
                                            hoveredCategory === index ? "translate-y-0" : "translate-y-10",
                                        )}
                                    >
                                        <span>Explore</span>
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Services Section */}
            <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-3xl bg-emerald-300" />
                    <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-3xl bg-indigo-300" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4">
                            Our Services
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6 rounded-full" />
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Premium services tailored to help you succeed in the digital marketplace
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                                onMouseEnter={() => setHoveredService(index)}
                                onMouseLeave={() => setHoveredService(null)}
                            >
                                <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
                                    {/* Animated gradient background */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 rounded-2xl group-hover:opacity-5",
                                            service.color,
                                        )}
                                    />

                                    {/* Icon with animated glow */}
                                    <div className="relative mb-6">
                                        <div
                                            className={cn(
                                                "p-4 rounded-full bg-gray-50 dark:bg-gray-700 transition-all duration-500 relative z-10",
                                                hoveredService === index && "scale-110 bg-gradient-to-br text-white",
                                                hoveredService === index && service.color,
                                            )}
                                        >
                                            {service.icon}
                                        </div>
                                        <div
                                            className={cn(
                                                "absolute -inset-4 bg-gradient-to-br rounded-full blur-xl transition-opacity duration-500 opacity-0",
                                                service.color,
                                                hoveredService === index && "opacity-20",
                                            )}
                                        />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{service.description}</p>

                                    <Button
                                        variant="outline"
                                        className="group rounded-full border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300"
                                    >
                                        <span>{service.buttonText}</span>
                                        <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4">
                        Need something done?
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6 rounded-full" />
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Most viewed and all-time top-selling services
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group"
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                        >
                            <div className="h-full p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
                                {/* Animated gradient background */}
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 rounded-2xl group-hover:opacity-5",
                                        feature.color,
                                    )}
                                />

                                {/* Icon with animated glow */}
                                <div className="relative mb-6">
                                    <div
                                        className={cn(
                                            "p-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 transition-all duration-500 relative z-10",
                                            hoveredFeature === index && "scale-110 bg-gradient-to-br text-white",
                                            hoveredFeature === index && feature.color,
                                        )}
                                    >
                                        {feature.icon}
                                    </div>
                                    <div
                                        className={cn(
                                            "absolute -inset-4 bg-gradient-to-br rounded-full blur-xl transition-opacity duration-500 opacity-0",
                                            feature.color,
                                            hoveredFeature === index && "opacity-20",
                                        )}
                                    />
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>

                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>

                                {/* Animated line on hover */}
                                <div className="w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 mt-4 transition-all duration-300 group-hover:w-16" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

