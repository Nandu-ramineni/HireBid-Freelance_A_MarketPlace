import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { MessageCircle, Search, CalendarIcon, X, Filter } from "lucide-react"
import { MessagingInterface } from "./MessagingInterface"
import { Calendar01Icon, UserCircle02Icon, Wallet01Icon } from "hugeicons-react"
import { format } from "date-fns"

export function AcceptedBids({ acceptedBids }) {
    const [selectedBid, setSelectedBid] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [budgetRange, setBudgetRange] = useState([0, 500000])
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
    const [showFilters, setShowFilters] = useState(false)

    const placeholders = [
        "Search freelancer name...",
        "Search project title...",
        "Search by username...",
        "Search skills...",
        "Search project category...",
    ]

    // Animated placeholder effect
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    const sortedAcceptedBids = acceptedBids?.acceptedBids?.sort(
        (a, b) => new Date(b.bid.updatedAt) - new Date(a.bid.updatedAt),
    )

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

    // Get unique categories and statuses for dropdowns
    const uniqueCategories = useMemo(() => {
        const categories = sortedAcceptedBids?.map((bid) => bid.bid.jobId.category)
        return [...new Set(categories)].sort()
    }, [acceptedBids])

    const uniqueStatuses = useMemo(() => {
        const statuses = sortedAcceptedBids?.map((bid) => bid.bid.status)
        return [...new Set(statuses)].sort()
    }, [acceptedBids])

    // Get budget range for slider
    const budgetExtent = useMemo(() => {
        if (!sortedAcceptedBids || sortedAcceptedBids.length === 0) {
            return { min: 0, max: 500000 }
        }
        const amounts = sortedAcceptedBids.map((bid) => bid.bid.amount)
        return {
            min: Math.min(...amounts, 0),
            max: Math.max(...amounts, 500000),
        }
    }, [sortedAcceptedBids])

    // Update budget range when data changes
    useEffect(() => {
        if (budgetExtent.min !== Number.POSITIVE_INFINITY && budgetExtent.max !== Number.NEGATIVE_INFINITY) {
            setBudgetRange([budgetExtent.min, budgetExtent.max])
        }
    }, [budgetExtent])

    // Filter the data
    const filteredBids = useMemo(() => {
        return sortedAcceptedBids?.filter((acceptedBid) => {
            const { bid, firstName, lastName, username, skills } = acceptedBid
            const { jobId, amount, updatedAt, status } = bid

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const freelancerName = `${firstName} ${lastName}`.toLowerCase()
                const jobTitle = jobId.title.toLowerCase()
                const usernameLower = username.toLowerCase()
                const skillsText = skills?.join(" ").toLowerCase() || ""
                const category = jobId.category.toLowerCase()

                const matchesSearch =
                    freelancerName.includes(query) ||
                    jobTitle.includes(query) ||
                    usernameLower.includes(query) ||
                    skillsText.includes(query) ||
                    category.includes(query)

                if (!matchesSearch) return false
            }

            // Category filter
            if (selectedCategory !== "all" && jobId.category !== selectedCategory) {
                return false
            }

            // Status filter
            if (selectedStatus !== "all" && status !== selectedStatus) {
                return false
            }

            // Date filter
            if (dateFrom || dateTo) {
                const acceptedDate = new Date(updatedAt)
                if (dateFrom && acceptedDate < dateFrom) return false
                if (dateTo && acceptedDate > dateTo) return false
            }

            // Budget filter
            if (amount < budgetRange[0] || amount > budgetRange[1]) {
                return false
            }

            return true
        })
    }, [acceptedBids, searchQuery, selectedCategory, selectedStatus, dateFrom, dateTo, budgetRange])

    const clearFilters = () => {
        setSearchQuery("")
        setSelectedCategory("all")
        setSelectedStatus("all")
        setDateFrom(null)
        setDateTo(null)
        setBudgetRange([budgetExtent.min, budgetExtent.max])
    }

    const hasActiveFilters =
        searchQuery ||
        selectedCategory !== "all" ||
        selectedStatus !== "all" ||
        dateFrom ||
        dateTo ||
        budgetRange[0] !== budgetExtent.min ||
        budgetRange[1] !== budgetExtent.max

    if (selectedBid) {
        return <MessagingInterface selectedBid={selectedBid} onBack={() => setSelectedBid(null)} />
    }

    return (
        <div
            className="mx-auto p-6 h-[90vh] overflow-y-scroll"
            style={{ scrollbarWidth: "none", scrollbarColor: "#cbd5e1 #f3f4f6" }}
        >
            <div className="flex items-center justify-between pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Project Communications</h1>
                    <p className="text-gray-600 mt-2">Manage your active projects and communicate with freelancers</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                        {filteredBids?.length} Active {filteredBids?.length === 1 ? "Project" : "Projects"}
                    </Button>
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="space-y-4 mb-6 p-4 bg-white rounded-lg">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder={placeholders[placeholderIndex]}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 transition-all duration-300"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full lg:w-[180px]">
                                <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All categories</SelectItem>
                                {uniqueCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Status Dropdown */}
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-full lg:w-[150px]">
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All statuses</SelectItem>
                                {uniqueStatuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Date Range Filter */}
                        <div className="flex gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full lg:w-[140px] justify-start text-left font-normal bg-white"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateFrom ? format(dateFrom, "MMM dd") : "From date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                                </PopoverContent>
                            </Popover>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full lg:w-[140px] justify-start text-left font-normal bg-white"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateTo ? format(dateTo, "MMM dd") : "To date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Budget Range Filter */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Budget Range:</span>
                                <span className="text-sm text-gray-600">
                                    {formatCurrency(budgetRange[0])} - {formatCurrency(budgetRange[1])}
                                </span>
                            </div>
                            <Slider
                                value={budgetRange}
                                onValueChange={setBudgetRange}
                                max={budgetExtent.max}
                                min={budgetExtent.min}
                                step={1000}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                                <X className="mr-2 h-4 w-4" />
                                Clear filters
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                {filteredBids.length} of {sortedAcceptedBids.length} projects
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Results */}
            {filteredBids?.length === 0 ? (
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
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
                    {filteredBids?.map((acceptedBid) => (
                        <Card key={acceptedBid.bid._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={acceptedBid.profile || "/placeholder.svg"} alt={acceptedBid.firstName} />
                                            <AvatarFallback>
                                                {acceptedBid.firstName[0]}
                                                {acceptedBid.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">
                                                {acceptedBid.firstName} {acceptedBid.lastName}
                                            </CardTitle>
                                            <p className="text-sm text-gray-600">@{acceptedBid.username}</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        {acceptedBid.bid.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{acceptedBid.bid.jobId.title}</h3>
                                        <Badge variant="outline">{acceptedBid.bid.jobId.category}</Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <Wallet01Icon className="h-4 w-4 text-gray-500" />
                                            <span>Bid: {formatCurrency(acceptedBid.bid.amount)}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar01Icon className="h-4 w-4 text-gray-500" />
                                            <span>Deadline: {formatDate(acceptedBid.bid.jobId.deadline)}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <UserCircle02Icon className="h-4 w-4 text-gray-500" />
                                            <span>Accepted: {formatDate(acceptedBid.bid.updatedAt)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Freelancer Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {acceptedBid.skills.slice(0, 3).map((skill, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {acceptedBid.skills.length > 3 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{acceptedBid.skills.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t">
                                        <p className="text-sm text-gray-600 italic">"{acceptedBid.bid.message.substring(0, 60)}..."</p>
                                        <Button onClick={() => setSelectedBid(acceptedBid)} className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>Message</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
