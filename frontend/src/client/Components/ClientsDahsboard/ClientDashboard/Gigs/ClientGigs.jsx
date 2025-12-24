

import { useState, useMemo } from "react"
import { GigsOverview } from "./GigsOverview"
import { GigCard } from "./GigCard"
import { PlusCircle, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Briefcase01Icon } from "hugeicons-react"
export default function ClientGigs({ clientGigs, loading, error }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const navigate = useNavigate()
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
    // if (error) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <div className="text-red-500 text-lg">Error loading gigs: {error.message}</div>
    //         </div>
    //     )
    // }

    return (
        <div className="h-[90vh] overflow-y-scroll bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8" style={{ scrollbarWidth: "none" }}>
            <div className="mx-auto max-w-7xl space-y-8">
                <GigsOverview {...stats} onSearch={setSearchQuery} onFilter={setStatusFilter} onSort={setSortBy} />

                {/* Gigs Grid */}
                <div className="space-y-6">
                    {filteredAndSortedGigs.length > 0 ? (
                        filteredAndSortedGigs.map((gig) => (
                            <GigCard key={gig._id} gig={gig} />
                        ))
                    ) : clientGigs.length === 0 ? (
                        // 👉 No gigs at all — encourage creation
                        <div className="flex items-center justify-center py-1">
                            <div className="max-w-lg w-full text-center bg-background border rounded-2xl shadow-sm p-10">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Briefcase01Icon className="h-8 w-8 text-primary" />
                                </div>

                                <h2 className="text-2xl font-semibold mb-2">
                                    Create your first gig
                                </h2>

                                <p className="text-muted-foreground mb-6">
                                    You haven’t posted any gigs yet. Create one now to start receiving bids
                                    from skilled freelancers.
                                </p>

                                <Button
                                    size="lg"
                                    className="gap-2"
                                    onClick={() => navigate("/client-dashboard/create-gig")}
                                >
                                    <PlusCircle className="h-5 w-5" />
                                    Create Gig
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // 👉 Gigs exist, but filters/search removed them
                        <div className="flex items-center justify-center py-16">
                            <div className="max-w-md w-full text-center bg-background border rounded-2xl shadow-sm p-8">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                                    <SearchX className="h-7 w-7 text-muted-foreground" />
                                </div>

                                <h3 className="text-lg font-semibold mb-2">
                                    No gigs match your filters
                                </h3>

                                <p className="text-sm text-muted-foreground mb-6">
                                    Try adjusting your search or filters to see more gigs.
                                </p>

                                <div className="flex justify-center gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setStatusFilter("all")
                                            setSortBy("newest")
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                    <Button onClick={() => setSearchQuery("")}>
                                        Reset Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
