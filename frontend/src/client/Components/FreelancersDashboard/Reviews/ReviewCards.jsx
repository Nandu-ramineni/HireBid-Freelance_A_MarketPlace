import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Rating from "./Rating"
import {
    BriefcaseIcon as Briefcase02Icon,
    CalendarIcon as Calendar02Icon,
    WalletIcon as Wallet02Icon,
    Search,
    CalendarIcon,
    X,
} from "lucide-react"
import { format } from "date-fns"

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

const ReviewCards = ({ rateBids }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedJobTitle, setSelectedJobTitle] = useState("all") // Updated default value to "all"
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [placeholderIndex, setPlaceholderIndex] = useState(0)

    const placeholders = [
        "Search client name...",
        "Search job title...",
        "Search by username...",
        "Search skills...",
        "Search project details...",
    ]

    // Animated placeholder effect
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    if (!rateBids || rateBids.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">No completed bids to review</p>
            </div>
        )
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    // Get unique job titles for dropdown
    const uniqueJobTitles = useMemo(() => {
        const titles = rateBids?.completedBids?.map((item) => item.bid.jobId?.title) || []
        return [...new Set(titles)].sort()
    }, [rateBids])

    // Filter the data
    const filteredBids = useMemo(() => {
        if (!rateBids?.completedBids) return []

        return rateBids.completedBids.filter((item) => {
            const { bid, firstName, lastName, username, skills } = item
            const { jobId, updatedAt } = bid

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const freelancerName = `${firstName} ${lastName}`.toLowerCase()
                const jobTitle = jobId.title.toLowerCase()
                const usernameLower = username.toLowerCase()
                const skillsText = skills?.join(" ").toLowerCase() || ""

                const matchesSearch =
                    freelancerName.includes(query) ||
                    jobTitle.includes(query) ||
                    usernameLower.includes(query) ||
                    skillsText.includes(query)

                if (!matchesSearch) return false
            }

            // Job title filter
            if (selectedJobTitle !== "all" && jobId.title !== selectedJobTitle) {
                return false
            }

            // Date filter
            if (dateFrom || dateTo) {
                const bidDate = new Date(updatedAt)
                if (dateFrom && bidDate < dateFrom) return false
                if (dateTo && bidDate > dateTo) return false
            }

            return true
        })
    }, [rateBids, searchQuery, selectedJobTitle, dateFrom, dateTo])

    const clearFilters = () => {
        setSearchQuery("")
        setSelectedJobTitle("all") // Updated default value to "all"
        setDateFrom(null)
        setDateTo(null)
    }

    const hasActiveFilters = searchQuery || selectedJobTitle !== "all" || dateFrom || dateTo

    return (
        <div className="space-y-6 p-4">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Review Completed Projects</h2>
                <p className="text-muted-foreground">Rate your experience with freelancers on completed projects</p>
            </div>

            {/* Filters */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder={placeholders[placeholderIndex]}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 transition-all duration-300 bg-white focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Job Title Dropdown */}
                    <Select value={selectedJobTitle} onValueChange={setSelectedJobTitle}>
                        <SelectTrigger className="w-full sm:w-[200px] bg-white">
                            <SelectValue placeholder="Filter by job title" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All job titles</SelectItem>
                            {uniqueJobTitles.map((title) => (
                                <SelectItem key={title} value={title}>
                                    {title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Date Range Filter */}
                    <div className="flex gap-2">
                        <Popover >
                            <PopoverTrigger asChild className="bg-white">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-[140px] justify-start text-left font-normal bg-transparent"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateFrom ? format(dateFrom, "MMM dd") : "From date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild className="bg-white">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-[140px] justify-start text-left font-normal bg-transparent"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateTo ? format(dateTo, "MMM dd") : "To date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 " align="start">
                                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                            <X className="mr-2 h-4 w-4" />
                            Clear filters
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            {filteredBids.length} of {rateBids?.completedBids?.length || 0} projects
                        </span>
                    </div>
                )}
            </div>

            {/* Results */}
            {filteredBids.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-muted-foreground mb-2">No projects match your filters</p>
                        {hasActiveFilters && (
                            <Button variant="outline" onClick={clearFilters}>
                                Clear filters
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {filteredBids.map((item, index) => {
                        const { bid, clientName, username, clientProfile, bio, skills } = item
                        const { jobId, amount, updatedAt } = bid
                        return (
                            <Card key={bid._id} className="w-full hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16 border-2">
                                            <AvatarImage src={clientProfile || "/placeholder.svg"} alt={`${clientName}`} />
                                            <AvatarFallback className="text-lg">
                                                {clientName?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <div>
                                                <h3 className="text-xl font-semibold">
                                                    {clientName}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">@{username}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {skills?.slice(0, 3).map((skill, index) => (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        className="text-xs"
                                                        style={{
                                                            color: tagStyles[index % tagStyles.length].text.light,
                                                            backgroundColor: tagStyles[index % tagStyles.length].bg.light,
                                                            borderColor: tagStyles[index % tagStyles.length].border?.light || "transparent",
                                                        }}
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {skills?.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{skills.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Separator />
                                    {/* Job Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <Briefcase02Icon className="h-4 w-4 mt-1 text-muted-foreground" />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm mb-1">{jobId?.title}</h4>
                                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Wallet02Icon className="h-3 w-3" />
                                                        Budget: {formatCurrency(jobId?.budget)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar02Icon className="h-3 w-3" />
                                                        Deadline: {formatDate(jobId?.deadline)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {jobId?.skills?.slice(0, 4).map((skill, index) => (
                                                <Badge
                                                    key={skill}
                                                    variant="outline"
                                                    className="text-xs"
                                                    style={{
                                                        color: tagStyles[index % tagStyles.length].text.light,
                                                        backgroundColor: tagStyles[index % tagStyles.length].bg.light,
                                                        borderColor: tagStyles[index % tagStyles.length].border?.light || "transparent",
                                                    }}
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    {/* Bid Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Bid Amount:</span>
                                            <span className="text-lg font-bold text-green-600">{formatCurrency(amount)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Bid Completed:</span>
                                            <span className="text-lg font-bold text-green-600">{formatDate(updatedAt)}</span>
                                        </div>
                                    </div>
                                    <Separator />
                                    {/* Rating Section */}
                                    <div className="pt-2">
                                        <Rating
                                            bidId={bid._id}
                                            clientId={item.clientId}
                                            clientName={`${item.clientName}`}
                                            jobTitle={jobId?.title}
                                            jobId={jobId?._id}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ReviewCards
