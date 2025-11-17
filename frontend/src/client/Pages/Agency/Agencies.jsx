

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Clock, Filter, MapPin, Search, Star, Verified } from "lucide-react"

// Sample data - replace with your actual data source
const agenciesData = [
    {
        id: 1,
        name: "PixelPerfect Studios",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo7rRsrHDih337rhum2IpoCJCYBbmcWWJUiQ&s",
        rating: 4.9,
        reviews: 124,
        location: "San Francisco, CA",
        hourlyRate: 85,
        skills: ["UI/UX Design", "Web Development", "Branding"],
        verified: true,
        completionRate: 98,
        description: "Award-winning digital agency specializing in creating stunning websites and digital experiences.",
        projectsCompleted: 215,
    },
    {
        id: 2,
        name: "CodeCraft Solutions",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s",
        rating: 4.7,
        reviews: 98,
        location: "New York, NY",
        hourlyRate: 75,
        skills: ["Full-Stack Development", "Mobile Apps", "E-commerce"],
        verified: true,
        completionRate: 95,
        description: "Expert development team delivering robust solutions for businesses of all sizes.",
        projectsCompleted: 187,
    },
    {
        id: 3,
        name: "Visionary Design Co",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDjmEJP69S602qGY_UfLY7TgJSdJDYT6T3c73tQ4NAmjgjhw_Fb4dEv42-Wh3ClEXyxTI&usqp=CAU",
        rating: 4.8,
        reviews: 112,
        location: "Austin, TX",
        hourlyRate: 90,
        skills: ["Brand Strategy", "Graphic Design", "Motion Graphics"],
        verified: false,
        completionRate: 92,
        description: "Creative design studio focused on building memorable brand experiences.",
        projectsCompleted: 156,
    },
    {
        id: 4,
        name: "TechFusion Agency",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Xc5IcSCxAxrhvb2o9Z0Y6OluzJdXu-t8PA&s",
        rating: 4.6,
        reviews: 87,
        location: "Seattle, WA",
        hourlyRate: 80,
        skills: ["Web Development", "SEO", "Digital Marketing"],
        verified: true,
        completionRate: 94,
        description: "Full-service digital agency helping businesses grow their online presence.",
        projectsCompleted: 143,
    },
    {
        id: 5,
        name: "InnovateX Solutions",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EgD1wsceDe_Crja5DEXjN-LB4pt9NN3tfcFqePuMYapcfHOQkTvEETTM2IdZKQB5AvQ&usqp=CAU",
        rating: 4.5,
        reviews: 76,
        location: "Chicago, IL",
        hourlyRate: 70,
        skills: ["Software Development", "AI Solutions", "Cloud Services"],
        verified: false,
        completionRate: 90,
        description: "Technology-focused agency delivering innovative software solutions.",
        projectsCompleted: 129,
    },
    {
        id: 6,
        name: "CreativeMinds Studio",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ2NF7Xm_srJ1cIOvqb4twjTz_c6cnYpoiFGE3-jVMSoD0br6NfI2U4e4r0PKwu8jru5E&usqp=CAU",
        rating: 4.8,
        reviews: 103,
        location: "Los Angeles, CA",
        hourlyRate: 95,
        skills: ["UI/UX Design", "Product Design", "Illustration"],
        verified: true,
        completionRate: 97,
        description: "Creative studio specializing in user-centered design and digital products.",
        projectsCompleted: 178,
    },
]

export default function Agencies() {
    const [agencies, setAgencies] = useState(agenciesData)
    const [searchTerm, setSearchTerm] = useState("")
    const [priceRange, setPriceRange] = useState([0, 100])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [verifiedOnly, setVerifiedOnly] = useState(false)
    const [sortOption, setSortOption] = useState("rating")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // All available skills from the data
    const allSkills = [...new Set(agenciesData.flatMap((agency) => agency.skills))]

    // Filter and sort agencies
    useEffect(() => {
        let filteredAgencies = [...agenciesData]

        // Search filter
        if (searchTerm) {
            filteredAgencies = filteredAgencies.filter(
                (agency) =>
                    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    agency.location.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Price range filter
        filteredAgencies = filteredAgencies.filter(
            (agency) => agency.hourlyRate >= priceRange[0] && agency.hourlyRate <= priceRange[1],
        )

        // Skills filter
        if (selectedSkills.length > 0) {
            filteredAgencies = filteredAgencies.filter((agency) =>
                selectedSkills.some((skill) => agency.skills.includes(skill)),
            )
        }

        // Verified filter
        if (verifiedOnly) {
            filteredAgencies = filteredAgencies.filter((agency) => agency.verified)
        }

        // Sort
        switch (sortOption) {
            case "rating":
                filteredAgencies.sort((a, b) => b.rating - a.rating)
                break
            case "price-low":
                filteredAgencies.sort((a, b) => a.hourlyRate - b.hourlyRate)
                break
            case "price-high":
                filteredAgencies.sort((a, b) => b.hourlyRate - a.hourlyRate)
                break
            case "projects":
                filteredAgencies.sort((a, b) => b.projectsCompleted - a.projectsCompleted)
                break
            default:
                break
        }

        setAgencies(filteredAgencies)
    }, [searchTerm, priceRange, selectedSkills, verifiedOnly, sortOption])

    const toggleSkill = (skill) => {
        setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
    }

    return (
        <div className="mx-auto px-4 py-8 md:px-16">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Top Agencies</h1>
                    <p className="text-muted-foreground">Find and hire the perfect agency for your next project</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-start">
                    {/* Mobile filter toggle */}
                    <Button
                        variant="outline"
                        className="md:hidden w-full flex items-center justify-between"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <span className="flex items-center">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </span>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                            {agencies.length} results
                        </span>
                    </Button>

                    {/* Filters sidebar */}
                    <div className={`w-full md:w-64 shrink-0 transition-all ${isFilterOpen ? "block" : "hidden md:block"}`}>
                        <div className="bg-card rounded-lg border p-4 sticky top-4">
                            <div className="space-y-5">
                                <div>
                                    <h3 className="font-medium mb-3">Price Range</h3>
                                    <div className="px-2">
                                        <Slider
                                            defaultValue={[0, 100]}
                                            max={100}
                                            step={5}
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                            className="mb-2"
                                        />
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>${priceRange[0]}/hr</span>
                                            <span>${priceRange[1]}/hr</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-3">Skills</h3>
                                    <div className="space-y-2">
                                        {allSkills.map((skill) => (
                                            <div key={skill} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`skill-${skill}`}
                                                    checked={selectedSkills.includes(skill)}
                                                    onCheckedChange={() => toggleSkill(skill)}
                                                />
                                                <label
                                                    htmlFor={`skill-${skill}`}
                                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {skill}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                                    <label
                                        htmlFor="verified"
                                        className="text-sm font-medium leading-none flex items-center peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Verified only
                                        <Verified className="ml-1 h-3 w-3 text-primary" />
                                    </label>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full "
                                    onClick={() => {
                                        setSearchTerm("")
                                        setPriceRange([0, 100])
                                        setSelectedSkills([])
                                        setVerifiedOnly(false)
                                        setSortOption("rating")
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                        <div className="mb-6 flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search agencies, skills, or locations..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={sortOption} onValueChange={setSortOption}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="projects">Most Projects</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Tabs defaultValue="grid" className="mb-6">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground">
                                    Showing <span className="font-medium text-foreground">{agencies.length}</span> agencies
                                </p>
                                <TabsList>
                                    <TabsTrigger value="grid">Grid</TabsTrigger>
                                    <TabsTrigger value="list">List</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="grid" className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {agencies.map((agency) => (
                                        <Card key={agency.id} className="overflow-hidden group">
                                            <CardHeader className="p-4 pb-2">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                                            <img
                                                                src={agency.logo || "/placeholder.svg"}
                                                                alt={`${agency.name} logo`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-base flex items-center">
                                                                {agency.name}
                                                                {agency.verified && <Verified className="ml-1 h-4 w-4 text-primary" />}
                                                            </CardTitle>
                                                            <CardDescription className="flex items-center mt-1">
                                                                <MapPin className="h-3 w-3 mr-1" />
                                                                {agency.location}
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-2">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="ml-1 font-medium">{agency.rating}</span>
                                                        <span className="text-muted-foreground text-sm ml-1">({agency.reviews})</span>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground flex items-center">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {agency.completionRate}% completion
                                                    </div>
                                                </div>
                                                <p className="text-sm line-clamp-2 mb-3">{agency.description}</p>
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {agency.skills.slice(0, 3).map((skill) => (
                                                        <Badge key={skill} variant="secondary" className="font-normal">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                                                        <span className="text-sm">{agency.projectsCompleted} projects</span>
                                                    </div>
                                                    <div className="font-semibold">₹{agency.hourlyRate}/hr</div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0">
                                                <Button className="w-full bg-emerald-600 hover:bg-[#89AC46] ">View Profile</Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="list" className="mt-4">
                                <div className="space-y-4">
                                    {agencies.map((agency) => (
                                        <Card key={agency.id} className="overflow-hidden">
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="p-4 sm:w-64 flex flex-row sm:flex-col gap-4 sm:border-r">
                                                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                                        <img
                                                            src={agency.logo || "/placeholder.svg"}
                                                            alt={`${agency.name} logo`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                            <span className="ml-1 font-medium">{agency.rating}</span>
                                                            <span className="text-muted-foreground text-sm ml-1">({agency.reviews})</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground mt-1">${agency.hourlyRate}/hr</div>
                                                        <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            {agency.location}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-semibold flex items-center">
                                                            {agency.name}
                                                            {agency.verified && <Verified className="ml-1 h-4 w-4 text-primary" />}
                                                        </h3>
                                                        <div className="text-sm text-muted-foreground flex items-center">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {agency.completionRate}% completion
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-3">{agency.description}</p>
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        {agency.skills.map((skill) => (
                                                            <Badge key={skill} variant="secondary" className="font-normal">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                                                            <span className="text-sm">{agency.projectsCompleted} projects</span>
                                                        </div>
                                                        <Button>View Profile</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>

                        {agencies.length === 0 && (
                            <div className="text-center py-12 border rounded-lg">
                                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <Search className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">No agencies found</h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    Try adjusting your search or filter criteria to find more agencies.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchTerm("")
                                        setPriceRange([0, 100])
                                        setSelectedSkills([])
                                        setVerifiedOnly(false)
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
