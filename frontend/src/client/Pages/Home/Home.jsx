import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Shield, CheckCircle, Star, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import CountUp from 'react-countup'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Categories from './Categories'
import Scroler from './Scroller'
import TrendingServices from './TrendingServices'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import CTASection from '../../Components/Footer/CTASection'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const { scrollY } = useScroll()

    // Parallax effects
    // const heroImageY = useTransform(scrollY, [0, 500], [0, 100])
    const heroContentY = useTransform(scrollY, [0, 500], [0, 50])
    // const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5])

    // Popular searches with tags
    const popularSearches = [
        { name: "Web Development", tag: "Trending" },
        { name: "Logo Design", tag: "" },
        { name: "Digital Marketing", tag: "Popular" },
        { name: "Mobile App Development", tag: "Hot" },
        { name: "AI Services", tag: "New" },
        { name: "Content Writing", tag: "" },
    ]

    // Stats with icons and descriptions
    const stats = [
        {
            number: 500,
            label: "Freelancers",
            icon: <Users className="h-5 w-5 text-emerald-500" />,
            description: "Verified professionals ready to work",
        },
        {
            number: 100,
            label: "Clients",
            icon: <Shield className="h-5 w-5 text-indigo-500" />,
            description: "Satisfied businesses worldwide",
        },
        {
            number: 50,
            label: "Projects",
            icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
            description: "Successfully completed",
        },
        {
            number: 200,
            label: "Reviews",
            icon: <Star className="h-5 w-5 text-rose-500" />,
            description: "5-star ratings from clients",
        },
    ]

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return (
        <div className="relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[30%] rounded-full opacity-20 blur-3xl bg-emerald-300" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[30%] rounded-full opacity-20 blur-3xl bg-indigo-300" />
                <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full opacity-10 blur-3xl bg-amber-300" />
            </div>

            <section className="w-full relative overflow-hidden px-4 py-2 md:px-16 md:py-12 ">
                <div className=" px-4 my-6 md:px-6 relative z-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
                        <motion.div className="flex flex-col justify-center space-y-6" style={{ y: heroContentY }}>
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 mb-2 self-start">
                                <Sparkles className="h-4 w-4 text-emerald-600 mr-2" />
                                <span className="text-sm font-medium text-emerald-800">Trusted by 500+ businesses</span>
                            </div>

                            <h1 className="text-4xl  heroText md:text-5xl lg:text-6xl font-bold">
                                Find the perfect <span className="text-emerald-600 dark:text-emerald-400 heroText">freelance</span> services for
                                your business
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-[600px]">
                                Work with talented people at the most affordable price to get the most out of your time and cost
                            </p>

                            {/* Search form */}
                            <div className="w-full pt-4">
                                <form className="relative">
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div className="relative flex-grow">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                className="pl-12 pr-4 py-6 rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-lg focus-visible:ring-emerald-500 text-base"
                                                placeholder="What are you looking for?"
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                <SelectTrigger className="w-full md:w-[180px] py-6 rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg focus:ring-emerald-500">
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="design">Design</SelectItem>
                                                    <SelectItem value="development">Development</SelectItem>
                                                    <SelectItem value="marketing">Marketing</SelectItem>
                                                    <SelectItem value="prototype">Prototype</SelectItem>
                                                    <SelectItem value="realtors">Real Estate</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Button
                                                type="submit"
                                                onClick={()=> navigate('/jobs')}
                                                className="w-full md:w-auto py-6 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-full shadow-lg text-white font-medium text-base transition-all duration-300 hover:shadow-emerald-200/50 hover:shadow-xl"
                                            >
                                                <span>Search</span>
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Popular searches */}
                            <div className="space-y-3">
                                <h2 className="text-base font-medium text-gray-700 dark:text-gray-300">Popular searches</h2>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.map((search, index) => (
                                        <div key={index} className="relative group">
                                            <Button
                                                variant="outline"
                                                className="rounded-full border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                                            >
                                                {search.name}
                                            </Button>
                                            {search.tag && (
                                                <span
                                                    className={cn(
                                                        "absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white",
                                                        search.tag === "Trending"
                                                            ? "bg-rose-500"
                                                            : search.tag === "Popular"
                                                                ? "bg-indigo-500"
                                                                : search.tag === "Hot"
                                                                    ? "bg-amber-500"
                                                                    : "bg-emerald-500",
                                                    )}
                                                >
                                                    {search.tag}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 pb-8 md:pb-0">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        className="flex flex-col items-center p-4 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                                            {stat.icon}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                                            <CountUp end={stat.number} duration={2.5} enableScrollSpy scrollSpyOnce />
                                            <span className="text-emerald-500 ml-1">+</span>
                                        </h3>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{stat.label}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{stat.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        <div className="relative hidden lg:block">
                            <img
                                alt="Freelancer working outdoors"
                                className="mx-auto aspect-[4/3] rounded-xl object-cover"
                                height="400"
                                // src="https://img.freepik.com/free-photo/indian-woman-working-laptop-street-cafe-wearing-stylish-smart-clothes-jacket-glasses_1157-48457.jpg?t=st=1740592757~exp=1740596357~hmac=39d03e99e2c71de43f0244a63f41610dc3f5edd30607740dccae5759566d2a8f&w=1380"
                                src="https://img.freepik.com/free-photo/metaverse-avatar-collage-concept_52683-96430.jpg?t=st=1743924788~exp=1743928388~hmac=1f2c76cb6dfe598aba7698f1d9ec69fba43014abdd5263b8cbf7a855fc345a2e&w=1380"
                                width="650"
                            />
                            <motion.div
                                className="absolute top-1/4 -left-4 bg-white p-4 rounded-lg shadow-lg"
                                animate={{
                                    y: [0, -10, 0],
                                    transition: {
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    },
                                }}
                            >
                                <Shield className="h-6 w-6 text-[#40916c]" />
                                <p className="font-semibold mt-2">Proof of quality</p>
                                <p className="text-sm text-gray-600">Verified professionals</p>
                            </motion.div>
                            <motion.div
                                className="absolute top-8 -right-4 bg-white p-4 rounded-lg shadow-lg"
                                animate={{
                                    y: [0, -10, 0],
                                    transition: {
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    },
                                }}
                            >
                                <CheckCircle className="h-6 w-6 text-[#40916c]" />
                                <p className="font-semibold mt-2">Safe and secure</p>
                                <p className="text-sm text-gray-600">Protected payments</p>
                            </motion.div>
                            <motion.div
                                className="absolute bottom-64 left-[35%] bg-white p-2 rounded-full shadow-lg"
                                animate={{
                                    y: [0, -10, 0],
                                    transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    },
                                }}
                            >
                                <div className="flex items-center justify-center space-x-2 ">
                                    <div className="flex -space-x-3">
                                        {[...Array(4)].map((_, i) => (
                                            <img
                                                key={i}
                                                alt="User"
                                                className="w-8 h-8 rounded-full border-2 border-white"
                                                height="32"
                                                src="https://img.freepik.com/premium-photo/young-happy-professional-business-woman-employee-sitting-desk-working-laptop_1023984-70.jpg"
                                                style={{ zIndex: 4 - i }}
                                                width="32"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium">100+ Professionals</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-4 py-2 md:px-16 md:py-12">
                <Categories />
            </section>
            <section className="mx-4 py-2 md:mx-16 rounded-md md:py-12 bg-gray-100">
                <Scroler />
            </section>
            {/* <section className="px-4 py-2 md:px-16 md:py-12">
                <TrendingServices />
            </section> */}
            <section>
                <CTASection />
            </section>
        </div>
    )
}

export default Home
