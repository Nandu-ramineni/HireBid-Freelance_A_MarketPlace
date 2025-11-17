

import { useState, useMemo } from "react"
import { GigsOverview } from "./GigsOverview"
import { GigCard } from "./GigCard"

export default function ClientGigs({ clientGigs,loading,error }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")

    const filteredAndSortedGigs = useMemo(() => {
        const filtered = clientGigs.filter((gig) => {
            const matchesSearch =
                gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gig.category.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || gig.status === statusFilter

            return matchesSearch && matchesStatus
        })

        // Sort the filtered results
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                case "oldest":
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                case "budget-high":
                    return b.budget - a.budget
                case "budget-low":
                    return a.budget - b.budget
                case "deadline":
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                default:
                    return 0
            }
        })

        return filtered
    }, [searchQuery, statusFilter, sortBy, clientGigs])

    const stats = useMemo(() => {
        const totalGigs = clientGigs.length
        const activeGigs = clientGigs.filter((gig) => gig.status === "open" || gig.status === "in-progress").length
        const completedGigs = clientGigs.filter((gig) => gig.status === "completed").length
        const totalBudget = clientGigs.reduce((sum, gig) => sum + gig.budget, 0)

        return { totalGigs, activeGigs, completedGigs, totalBudget }
    }, [clientGigs])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500 text-lg">Loading gigs...</div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-lg">Error loading gigs: {error.message}</div>
            </div>
        )
    }

    return (
        <div className="h-[90vh] overflow-y-scroll bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8" style={{scrollbarWidth: "none"}}>
            <div className="mx-auto max-w-7xl space-y-8">
                <GigsOverview {...stats} onSearch={setSearchQuery} onFilter={setStatusFilter} onSort={setSortBy} />

                {/* Gigs Grid */}
                <div className="space-y-6">
                    {filteredAndSortedGigs.length > 0 ? (
                        filteredAndSortedGigs.map((gig) => <GigCard key={gig._id} gig={gig} />)
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg">No gigs found matching your criteria</div>
                            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
