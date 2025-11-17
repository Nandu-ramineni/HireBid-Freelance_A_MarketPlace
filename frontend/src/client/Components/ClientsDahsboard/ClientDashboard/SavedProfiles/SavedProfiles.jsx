import { useEffect, useState } from "react"
import { Search, Clock, DollarSign, Mail,  ExternalLink,  Heart,  HeartOff,  User,  Calendar,  Globe,  Award,  BookOpen,  Verified,} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSavedProfiles } from "@/client/Services/api"
import { Mail01Icon, RefreshIcon, Wallet01Icon } from "hugeicons-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


const tagStyles = [
    {
        text: { light: "#5925DC", dark: "#BDB4FE" },
        bg: { light: "#5925DC14", dark: "#BDB4FE0D" },
        border: { light: "#5925DC33", dark: "#BDB4FE33" },
        hoverBg: { light: "#0ACC920D", dark: "#77C7AF0D" },
    },
    {
        text: { light: "#8F6C1A", dark: "#E0BE70" },
        bg: { light: "#FFC02E1A", dark: "#E0BE700D" },
        border: { light: "#8F6C1A33", dark: "#E0BE7033" },
        hoverBg: { light: "#FFC02E0D", dark: "#E0BE700D" },
    },
    {
        text: { light: "#9F1AB1", dark: "#EEAAFD" },
        bg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
        border: { light: "#9F1AB114", dark: "#EEAAFD33" },
        hoverBg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
    },
    {
        text: { light: "#067A57", dark: "#77C7AF" },
        bg: { light: "#0ACC9214", dark: "#77C7AF0D" },
        border: { light: "#026AA233", dark: "#7CD4FD33" },
        hoverBg: { light: "#026AA20D", dark: "#7CD4FD0D" },
    },
    {
        text: { light: "#C4320A", dark: "#FCA89F" },
        bg: { light: "#F970661A", dark: "#FCA89F0D" },
        border: { light: "#C4320A33", dark: "#FCA89F33" },
        hoverBg: { light: "#F970660D", dark: "#FCA89F1A" },
    },
    {
        text: { light: "#1D3A5F", dark: "#8FB3E8" },
        bg: { light: "#2E90FA14", dark: "#8FB3E80D" },
        border: { light: "#1D3A5F33", dark: "#8FB3E833" },
        hoverBg: { light: "#2E90FA0D", dark: "#8FB3E80D" },
    },
]

const SavedProfiles = () => {
    const [savedProfiles, setSavedProfiles] = useState([])
    const [filteredProfiles, setFilteredProfiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [skillFilter, setSkillFilter] = useState("")
    const [availabilityFilter, setAvailabilityFilter] = useState("")
    const [sortBy, setSortBy] = useState("recent")
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
    const placeholders = [
        "Search by name...",
        "Search by skills...",
        "Search by bio...",
        "Search for freelancers...",
        "Search profiles by skills...",
        "Search for saved profiles...",
    ]

    const fetchSavedProfiles = async () => {
        try {
            setLoading(true)
            const response = await getSavedProfiles()
            if (response.status === 200) {
                setSavedProfiles(response.data)
                setFilteredProfiles(response.data)
            }
        } catch (error) {
            console.error("Error fetching saved profiles:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSavedProfiles()
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        const filtered = savedProfiles.filter((profile) => {
            const matchesSearch =
                profile.freelancer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.freelancer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.freelancer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.freelancer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.freelancer.freelancerProfile.skills.some((skill) =>
                    skill.toLowerCase().includes(searchTerm.toLowerCase()),
                )

            const matchesSkill =
                !skillFilter ||
                profile.freelancer.freelancerProfile.skills.some((skill) =>
                    skill.toLowerCase().includes(skillFilter.toLowerCase()),
                )

            const matchesAvailability =
                !availabilityFilter || profile.freelancer.freelancerProfile.availability === availabilityFilter

            return matchesSearch && matchesSkill && matchesAvailability
        })

        // Sort profiles
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "rate-low":
                    return a.freelancer.freelancerProfile.hourlyRate - b.freelancer.freelancerProfile.hourlyRate
                case "rate-high":
                    return b.freelancer.freelancerProfile.hourlyRate - a.freelancer.freelancerProfile.hourlyRate
                case "name":
                    return a.freelancer.firstName.localeCompare(b.freelancer.firstName)
                case "recent":
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
        })

        setFilteredProfiles(filtered)
    }, [savedProfiles, searchTerm, skillFilter, availabilityFilter, sortBy])

    const handleUnsaveProfile = (profileId) => {
        setSavedProfiles((prev) => prev.filter((profile) => profile._id !== profileId))
    }

    const formatLastLogin = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return "Active now"
        if (diffInHours < 24) return `Active ${diffInHours}h ago`
        const diffInDays = Math.floor(diffInHours / 24)
        return `Active ${diffInDays}d ago`
    }

    const getAllSkills = () => {
        const skills = new Set()
        savedProfiles.forEach((profile) => {
            profile.freelancer.freelancerProfile.skills.forEach((skill) => skills.add(skill))
        })
        return Array.from(skills)
    }


    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="h-3 bg-gray-200 rounded"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className=" mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Saved Profiles</h1>
                        <p className="text-muted-foreground">
                            {filteredProfiles.length} of {savedProfiles.length} profiles
                        </p>
                    </div>
                    <Button variant="outline" onClick={fetchSavedProfiles}>
                        <RefreshIcon className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder={placeholders[placeholderIndex]}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white"
                        />
                    </div>

                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                        <SelectTrigger className="w-full md:w-48 bg-white">
                            <SelectValue placeholder="Filter by skill" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="allSkills">All Skills</SelectItem>
                            {getAllSkills().map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                    {skill}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                        <SelectTrigger className="w-full md:w-48 bg-white">
                            <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="allAvailability">All Availability</SelectItem>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="part-time">Part Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full md:w-48 bg-white">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Recently Saved</SelectItem>
                            <SelectItem value="name">Name A-Z</SelectItem>
                            <SelectItem value="rate-low">Rate: Low to High</SelectItem>
                            <SelectItem value="rate-high">Rate: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Profiles Grid */}
            {filteredProfiles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProfiles.map((profile) => (
                        <Card key={profile._id} className="hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={profile.freelancer.profile || "/placeholder.svg"}
                                                alt={profile.freelancer.firstName}
                                            />
                                            <AvatarFallback>
                                                {profile.freelancer.firstName[0]}
                                                {profile.freelancer.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                                {profile.freelancer.firstName} {profile.freelancer.lastName}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Verified className="h-5 w-5 text-green-600 cursor-pointer" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Verified Freelancer</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </h3>
                                            <p className="text-sm text-muted-foreground">@{profile.freelancer.username}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleUnsaveProfile(profile._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <HeartOff className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Bio */}
                                <p className="text-sm text-gray-600 line-clamp-1">{profile.freelancer.bio}</p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1">
                                    {profile.freelancer.freelancerProfile.skills.slice(0, 3).map((skill,index) => (
                                        <Badge key={skill} variant="secondary" className="text-xs" style={{
                                        color: tagStyles[index % tagStyles.length].text.light,
                                        backgroundColor: tagStyles[index % tagStyles.length].bg.light,
                                        borderColor: tagStyles[index % tagStyles.length].border?.light || "transparent",
                                    }}>
                                            {skill}
                                        </Badge>
                                    ))}
                                    {profile.freelancer.freelancerProfile.skills.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{profile.freelancer.freelancerProfile.skills.length - 3}
                                        </Badge>
                                    )}
                                </div>

                                {/* Rate and Availability */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-1">
                                        <Wallet01Icon className="h-4 w-4 text-green-600" />
                                        <span className="font-semibold">₹{profile.freelancer.freelancerProfile.hourlyRate}/hr</span>
                                    </div>
                                    <Badge
                                        variant={
                                            profile.freelancer.freelancerProfile.availability === "full-time" ? "default" : ""
                                        }
                                        className="capitalize bg-[#5925DC]"
                                    >
                                        {profile.freelancer.freelancerProfile.availability}
                                    </Badge>
                                </div>

                                {/* Languages */}
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Globe className="h-4 w-4" />
                                    <span>{profile.freelancer.freelancerProfile.languages.join(", ")}</span>
                                </div>

                                {/* Last Active */}
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatLastLogin(profile.freelancer.traction.lastLogin)}</span>
                                </div>

                                <Separator />

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                    <Button size="sm"  className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                                        <Mail01Icon className="h-4 w-4 mr-2" />
                                        <a href={`mailto:${profile.freelancer.email}`}>Contact</a>
                                    </Button>
                                    {profile.freelancer.freelancerProfile.portfolio.length > 0 && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(profile.freelancer.freelancerProfile.portfolio[0], "_blank")}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No saved profiles found</h3>
                    <p className="text-muted-foreground">
                        {searchTerm || skillFilter || availabilityFilter
                            ? "Try adjusting your filters to see more results."
                            : "Start saving freelancer profiles to see them here."}
                    </p>
                </div>
            )}
        </div>
    )
}

export default SavedProfiles
