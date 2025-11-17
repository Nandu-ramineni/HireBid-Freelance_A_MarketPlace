

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, BarChart3, TrendingUp, Clock, DollarSign, IndianRupee } from "lucide-react"
import { useNavigate } from "react-router-dom"


export function GigsOverview({
    totalGigs,
    activeGigs,
    completedGigs,
    totalBudget,
    onSearch,
    onFilter,
    onSort,
}) {
    const navigate = useNavigate()
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        My Gigs
                    </h1>
                    <p className="text-muted-foreground">Manage and track your project gigs</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => navigate("/client-dashboard/create-gig")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Gig
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium opacity-90">Total Gigs</CardTitle>
                        <div className="flex justify-center items-center h-8 w-8 bg-gradient-to-r from-blue-800 to-blue-500 rounded-full">
                            <BarChart3 className="h-4 w-4 " />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalGigs}</div>
                        <p className="text-xs opacity-90">All time projects</p>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium opacity-90">Active Gigs</CardTitle>
                        <div className="flex justify-center items-center h-8 w-8 bg-gradient-to-r from-green-800 to-green-500 rounded-full">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeGigs}</div>
                        <p className="text-xs opacity-90">Currently running</p>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium opacity-90">Completed</CardTitle>
                        <div className="flex justify-center items-center h-8 w-8 bg-gradient-to-r from-purple-800 to-purple-500 rounded-full">
                            <Clock className="h-4 w-4 " />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedGigs}</div>
                        <p className="text-xs opacity-90">Successfully finished</p>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium opacity-90">Total Value</CardTitle>
                        <div className="flex justify-center items-center h-8 w-8 bg-gradient-to-r from-orange-800 to-orange-500 rounded-full">
                            <IndianRupee className="h-4 w-4 " />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                        <p className="text-xs opacity-90">Combined budget</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search gigs..."
                                    className="pl-10 w-full md:w-64 bg-white/80"
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </div>

                            <Select onValueChange={onFilter}>
                                <SelectTrigger className="w-full md:w-48 bg-white/80">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="paused">Paused</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={onSort}>
                                <SelectTrigger className="w-full md:w-40 bg-white/80">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                                    <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                                    <SelectItem value="deadline">Deadline</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {activeGigs} Active
                            </Badge>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {completedGigs} Completed
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
