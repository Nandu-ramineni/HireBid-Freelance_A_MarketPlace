

import { Link } from "react-router-dom"
import { useState } from "react"
import {  Facebook, Twitter, Instagram, Linkedin, ChevronUp, Mail, Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logo from "@/assets/logos/Logo.png"
const Footer = () => {
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)
    const currentYear = new Date().getFullYear()

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            // Here you would typically send this to your API
            console.log("Subscribing email:", email)
            setSubscribed(true)
            setEmail("")

            // Reset the subscribed state after 3 seconds
            setTimeout(() => {
                setSubscribed(false)
            }, 3000)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <footer className="bg-gradient-to-r from-gray-50 to-gray-100 pt-16 pb-8 relative px-6">
            {/* Back to top button */}
            <button
                onClick={scrollToTop}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label="Back to top"
            >
                <ChevronUp className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    {/* Brand and Newsletter Section */}
                    <div className="lg:col-span-5">
                        <Link className="flex items-center justify-start" to="/">
                            <img src={Logo} alt="Logo" loading='lazy' className="w-9 h-auto" />
                            <span className="ml-2 text-xl font-bold Logo">HireBid</span>
                        </Link>

                        <p className="mt-4 text-gray-600 max-w-md">
                            Connecting talent with opportunities. Your one-stop freelance marketplace where professionals and
                            businesses come together to create amazing work.
                        </p>

                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Stay updated</h3>

                            {subscribed ? (
                                <div className="mt-3 flex items-center text-green-600 bg-green-50 p-3 rounded-md">
                                    <Check className="h-5 w-5 mr-2" />
                                    <p>Thanks for subscribing!</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="mt-3 sm:flex">
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <Input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-2 py-3 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                    />
                                    <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                        >
                                            Subscribe
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Download our app</h3>
                            <div className="flex mt-3 space-x-4">
                                <Link to="#">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                        alt="Google Play Store"
                                        className="h-10"
                                    />
                                </Link>
                                <Link to="#">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1024px-Download_on_the_App_Store_Badge.svg.png"
                                        alt="App Store"
                                        className="h-10"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Sections */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about/careers" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/about/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/about/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about/press" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Press Kit
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link href="/resources/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources/guides" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources/tutorials" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources/community" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources/webinars" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Webinars
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link href="/legal/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/disclaimer" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Disclaimer
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/accessibility" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Accessibility
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact and Language Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="/support/ticket" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Submit a Ticket
                                </Link>
                            </li>
                            <li className="pt-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center">
                                            <Globe className="h-4 w-4 mr-2" />
                                            <span>English</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>English</DropdownMenuItem>
                                        <DropdownMenuItem>Español</DropdownMenuItem>
                                        <DropdownMenuItem>Français</DropdownMenuItem>
                                        <DropdownMenuItem>Deutsch</DropdownMenuItem>
                                        <DropdownMenuItem>日本語</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Media and Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex space-x-6 md:order-2">
                            <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="mailto:contact@hirebid.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <span className="sr-only">Email</span>
                                <Mail className="h-5 w-5" />
                            </Link>
                        </div>
                        <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
                            &copy; {currentYear} HireBid. All rights reserved.
                        </p>
                    </div>

                    <div className="mt-4 text-sm text-gray-500 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <span>All systems operational</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                            <Link href="/sitemap" className="hover:text-blue-600 transition-colors">
                                Sitemap
                            </Link>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                            <span>Made with ❤️ globally</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

