import { lazy, useState } from "react"
import { Link } from "react-router-dom"
import { Menu,  ChevronRight, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import CustomButtons from "./CustomButtons"
import { ArrowDown01Icon } from "hugeicons-react"
import Logo from "@/assets/logos/Logo.png"
const navItems = [
    {
        title: "Browse Jobs",
        items: [
            { name: "All Jobs", route: "/jobs" },
            { name: "Remote Jobs", route: "/jobs/remote" },
            { name: "Full-time Jobs", route: "/jobs/full-time" },
            { name: "Part-time Jobs", route: "/jobs/part-time" },
            { name: "Freelance Jobs", route: "/jobs/freelance" },
        ],
    },
    {
        title: "Find Talent",
        items: [
            { name: "Freelancers", route: "/find-talent/freelancers" },
            { name: "Agencies", route: "/find-talent/agencies" },
            { name: "Enterprise Solutions", route: "/find-talent/enterprise" },
            { name: "Hire by Skill", route: "/find-talent/skills" },
        ],
    },
    {
        title: "Resources",
        items: [
            { name: "Blog", route: "/resources/blog" },
            { name: "Guides", route: "/resources/guides" },
            { name: "Tutorials", route: "/resources/tutorials" },
            { name: "Webinars", route: "/resources/webinars" },
            { name: "Community", route: "/resources/community" },
        ],
    },
    {
        title: "About",
        items: [
            { name: "Our Story", route: "/about" },
            { name: "How It Works", route: "/about/#how-it-works" },
            { name: "Testimonials", route: "/about/testimonials" },
            { name: "Careers", route: "/about/careers" },
            { name: "Contact Us", route: "/about/contact" },
        ],
    },
]

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)

    const handleMouseEnter = (index) => {
        setActiveDropdown(index)
    }

    const handleMouseLeave = () => {
        setActiveDropdown(null)
    }

    return (
        <div className="sticky top-0 z-50 rounded-xl shadow-sm lg:px-4 glass">
            <header className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link className="flex items-center justify-center" to="/">
                    <img src={Logo} alt="Logo" loading={lazy} className="w-9 h-auto"/>
                    <span className="ml-2 text-xl font-bold Logo">HireBid</span>
                </Link>
                <nav className="hidden lg:flex items-center justify-center space-x-6">
                    <Link className="text-md font-medium" to="/">
                        Home
                    </Link>
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="text-md font-medium flex items-center outline-none group-hover:text-primary">
                                {item.title} <ArrowDown01Icon className="h-5 w-5" />
                            </button>
                            <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out ${activeDropdown === index ? 'opacity-100 visible' : ''}`}>
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {item.items.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={subItem.route}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </nav>
                <div className="flex items-center space-x-2">
                    <CustomButtons />
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-4">
                                <Link className="text-sm font-medium" to="/" onClick={() => setIsMenuOpen(false)}>
                                    Home
                                </Link>
                                {navItems.map((item, index) => (
                                    <Collapsible key={index}>
                                        <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium">
                                            {item.title}
                                            <ChevronRight className="h-4 w-4" />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="pl-4 mt-2 space-y-2">
                                            {item.items.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    className="block text-sm hover:underline underline-offset-4"
                                                    to={subItem.route}
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </div>
    )
}

export default Navbar
