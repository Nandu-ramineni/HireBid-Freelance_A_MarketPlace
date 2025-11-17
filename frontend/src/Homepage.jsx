import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import img from './assets/img.png'
import nxtWave from './assets/nxtwave.png'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Search, User, Menu, Briefcase, Globe, Shield, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const Homepage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const logoScrollRef = useRef(null)

    const testimonials = [
        { name: "Alice Johnson", role: "Freelance Developer", quote: "DecentralFreelance has opened up a world of opportunities for me. The platform's security and global reach are unmatched." },
        { name: "Bob Smith", role: "Project Manager", quote: "Finding top-tier talent has never been easier. The smart contract system ensures smooth transactions every time." },
        { name: "Carol Williams", role: "Graphic Designer", quote: "As a creative professional, I love the diverse range of projects available. It's been a game-changer for my career." },
    ]

    const trustedCompanies = [
        nxtWave, nxtWave, nxtWave, nxtWave, nxtWave, nxtWave,
        nxtWave, nxtWave, nxtWave, nxtWave
    ]

    useEffect(() => {
        const scrollLogos = () => {
            if (logoScrollRef.current) {
                logoScrollRef.current.scrollLeft += 1
                if (logoScrollRef.current.scrollLeft >= logoScrollRef.current.scrollWidth / 2) {
                    logoScrollRef.current.scrollLeft = 0
                }
            }
        }

        const scrollInterval = setInterval(scrollLogos, 30)
        return () => clearInterval(scrollInterval)
    }, [])

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <Briefcase className="h-6 w-6" />
                    <span className="ml-2 text-lg font-bold">DecentralFreelance</span>
                </Link>
                <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Find Work
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Find Talent
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Why Us
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Enterprise
                    </Link>
                </nav>
                <div className="flex items-center gap-4 ml-auto">
                    <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Login</span>
                    </Button>
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-4">
                                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsMenuOpen(false)}>
                                    Find Work
                                </Link>
                                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsMenuOpen(false)}>
                                    Find Talent
                                </Link>
                                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsMenuOpen(false)}>
                                    Why Us
                                </Link>
                                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsMenuOpen(false)}>
                                    Enterprise
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none ">
                                        Decentralized Freelancing
                                    </h1>
                                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                        Connect with global talent, work on exciting projects, and earn cryptocurrency. All in one decentralized platform.
                                    </p>
                                </div>
                                <div className="w-full max-w-sm space-y-2">
                                    <form className="flex space-x-2">
                                        <Input className="max-w-lg flex-1" placeholder="Enter your skill" type="text" />
                                        <Button type="submit">Search Jobs</Button>
                                    </form>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <Button size="lg" className="group">
                                        Post a Job
                                        <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                    <Button size="lg" variant="outline" className="group">
                                        Find Talent
                                        <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full filter blur-3xl opacity-50"></div>
                                    <img
                                        src={img}
                                        alt="Decentralized Freelancing"
                                        className="relative z-10 w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Services</h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <Briefcase className="w-12 h-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Project Matching</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Connect with the perfect projects that match your skills and interests.</p>
                                <Button variant="outline" className="group">
                                    Find Projects
                                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Shield className="w-12 h-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Enjoy peace of mind with our blockchain-based escrow system.</p>
                                <Button variant="outline" className="group">
                                    Learn More
                                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Globe className="w-12 h-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Global Network</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Access a worldwide community of clients and freelancers.</p>
                                <Button variant="outline" className="group">
                                    Join Network
                                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About DecentralFreelance</h2>
                                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    DecentralFreelance is revolutionizing the way people work and hire. Our platform leverages blockchain technology to create a transparent, secure, and efficient marketplace for freelancers and clients worldwide.
                                </p>
                                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Founded in 2023, were on a mission to empower individuals and businesses to thrive in the decentralized economy. Join us in shaping the future of work.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                    <Button size="lg" className="group">
                                        Join Our Community
                                        <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                    <Button size="lg" variant="outline" className="group">
                                        Read Our Whitepaper
                                        <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    src="https://img.freepik.com/free-photo/group-people-working-team_23-2147656716.jpg?uid=R114405257&ga=GA1.1.1972047194.1718351086&semt=ais_hybrid"
                                    alt="About DecentralFreelance"
                                    className="rounded-lg object-cover"
                                    width={600}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
                        <div className="relative">
                            <div className="flex items-center justify-center">
                                <Button variant="outline" size="icon" onClick={prevTestimonial} className="absolute left-0 z-10">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Previous testimonial</span>
                                </Button>
                                <div className="max-w-2xl mx-auto text-center">
                                    <p className="text-lg italic mb-4">{testimonials[currentTestimonial].quote}</p>
                                    <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                                    <p className="text-sm text-gray-500 mb-6">{testimonials[currentTestimonial].role}</p>
                                    <Button className="group">
                                        Start Your Journey
                                        <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </div>
                                <Button variant="outline" size="icon" onClick={nextTestimonial} className="absolute right-0 z-10">
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="sr-only">Next testimonial</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Trusted by Industry Leaders</h2>
                        <div className="relative">
                            <div
                                ref={logoScrollRef}
                                className="flex space-x-8 overflow-hidden"
                                style={{ width: `${trustedCompanies.length * 200}px` }}
                            >
                                {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                                    <div key={index} className="flex-shrink-0 w-64">
                                        <img
                                            src={`${company}`}
                                            alt={company}
                                            className="h-32 w-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <Button size="lg" className="group">
                                Join These Leading Companies
                                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Contact Us form section */}
<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
    <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Contact Us</h2>
        <div className="max-w-2xl mx-auto">
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email Address" type="email" />
                <Textarea placeholder="Your Message" rows={5} />
                <Button size="lg" type="submit" className="group">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
            </form>
        </div>
    </div>
</section>

            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 DecentralFreelance. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

export default Homepage
