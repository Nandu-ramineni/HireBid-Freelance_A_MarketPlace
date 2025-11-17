import { getFreelancerSavedGigs, unsaveGig } from "@/client/Redux/Actions/jobActions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent,  SelectItem,  SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
    BookmarkMinus,
    Calendar,
    Clock,
    DollarSign,
    ExternalLink,
    Filter,
    MapPin,
    Search,
    Briefcase,
    Award,
    CheckCircle2,
} from "lucide-react"
import { format } from "date-fns"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Calendar01Icon, Wallet01Icon } from "hugeicons-react"
import { toast, ToastContainer } from "react-toastify"

const tagStyles = [
    {
        text: { light: "#5925DC", dark: "#BDB4FE" },
        bg: { light: "#5925DC14", dark: "#BDB4FE0D" },
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
]
const SavedGigs = () => {
    const dispatch = useDispatch()
    const { savedGigs, loading } = useSelector((state) => state.getJobs)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [selectedGig, setSelectedGig] = useState(null)
    useEffect(() => {
        dispatch(getFreelancerSavedGigs())
    }, [dispatch])
    

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

  

    // Filter gigs based on search term and category
    const filteredGigs = savedGigs
        ? savedGigs.filter((gig) => {
            const matchesSearch =
                gig.jobId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gig.jobId.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = categoryFilter === "all" || gig.jobId.category === categoryFilter
            return matchesSearch && matchesCategory
        })
        : []

  

    // Handle removing a gig from saved
    const handleRemoveGig = async(gigId) => {
        try {
            await dispatch(unsaveGig(gigId))
            toast.success("Gig unsaved successfully");
            dispatch(getFreelancerSavedGigs())
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    // Open gig details dialog
    const openGigDetails = (gig) => {
        setSelectedGig(gig)
    }
    
    // Render loading skeletons
    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex flex-col space-y-4 mb-6">
                    <Skeleton className="h-8 w-64" />
                    <div className="flex flex-col md:flex-row gap-4">
                        <Skeleton className="h-10 w-full md:w-1/3" />
                        <Skeleton className="h-10 w-full md:w-1/4" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="h-[320px]">
                            <CardHeader className="pb-2">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-4" />
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-24" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-24" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-9 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }
    

    // Render empty state
    if (!savedGigs || savedGigs.length === 0) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <BookmarkMinus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Saved Gigs</h2>
                    <p className="text-muted-foreground mb-6">
                        You haven{"'"}t saved any gigs yet. Browse available jobs and save the ones you{"'"}re interested in.
                    </p>
                    <Button>Browse Jobs</Button>
                </div>
            </div>
        )
    }
    

    return (
        <div className="mx-auto p-6">
            <ToastContainer/>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Saved Gigs</h1>
                <p className="text-muted-foreground">
                    {filteredGigs.length} {filteredGigs.length === 1 ? "gig" : "gigs"} saved for future reference
                </p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search saved gigs..."
                        className="pl-10 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[220px] bg-white">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="mobile-development">Mobile Development</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="writing">Writing</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="data-entry">Data Entry</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Gigs grid */}
            {filteredGigs.length === 0 ? (
                <div className="text-center py-12">
                    <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No matching gigs found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchTerm("")
                            setCategoryFilter("all")
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGigs.map((gig) => (
                        <Card key={gig._id} className="flex flex-col h-full">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <img src={gig.jobId.image} alt="" className=" h-12 w-12 border rounded-lg p-1 object-contain" />
                                        <CardTitle className="text-lg line-clamp-1">{gig.jobId.title}</CardTitle>
                                    </div>
                                    <Badge variant={gig.jobId.status === "open" ? "success" : "secondary"}>{gig.jobId.status}</Badge>
                                </div>
                                <CardDescription className="flex items-center gap-1">
                                    <Briefcase className="h-3.5 w-3.5" />
                                    {gig.jobId.jobType} • {gig.jobId.experienceLevel}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{gig.jobId.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {gig.jobId.skills.slice(0, 3).map((skill, index) => {
                                        const styleIndex = index % tagStyles.length;
                                        const style = tagStyles[styleIndex];

                                        return (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-sm rounded-md font-normal border"
                                                style={{
                                                    color: style.text.light,
                                                    backgroundColor: style.bg.light,
                                                    borderColor: style.border?.light || 'transparent',
                                                    borderWidth: style.border ? '1px' : '0px',
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        );
                                    })}
                                    {gig.jobId.skills.length > 3 && (
                                        <span className="px-3 py-1 text-sm rounded-md font-normal border border-gray-300 bg-gray-100 text-gray-600">
                                            +{gig.jobId.skills.length - 3} more
                                        </span>
                                    )}
                                </div>


                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <Wallet01Icon className="h-4 w-4 text-emerald-500" />
                                        <span className="font-medium">{formatCurrency(gig.jobId.budget)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar01Icon className="h-4 w-4 text-amber-500" />
                                        <span>{format(new Date(gig.jobId.deadline), "MMM d, yyyy")}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2 flex gap-2">
                                <Button variant="outline" className="flex-1" onClick={() => openGigDetails(gig)}>
                                    View Details
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleRemoveGig(gig.jobId._id)}>
                                    <BookmarkMinus className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Gig details dialog */}
            {selectedGig && (
                <Dialog open={!!selectedGig} onOpenChange={(open) => !open && setSelectedGig(null)}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                        <DialogHeader>
                            <DialogTitle className="text-xl">{selectedGig.jobId.title}</DialogTitle>
                            <DialogDescription className="flex flex-wrap gap-2 items-center">
                                <Badge variant={selectedGig.jobId.status === "open" ? "success" : "secondary"}>
                                    {selectedGig.jobId.status}
                                </Badge>
                                <span className="flex items-center gap-1 text-sm">
                                    <Briefcase className="h-3.5 w-3.5" />
                                    {selectedGig.jobId.jobType}
                                </span>
                                <span className="flex items-center gap-1 text-sm">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {selectedGig.jobId.location}
                                </span>
                                <span className="flex items-center gap-1 text-sm">
                                    <Award className="h-3.5 w-3.5" />
                                    {selectedGig.jobId.experienceLevel}
                                </span>
                                <span className="flex items-center gap-1 text-sm">
                                    <Clock className="h-3.5 w-3.5" />
                                    Saved {format(new Date(selectedGig.createdAt), "MMM d, yyyy")}
                                </span>
                            </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-6">
                                {/* Budget section */}
                                <div>
                                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-emerald-500" />
                                        Budget
                                    </h3>
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                            <span>Total Budget</span>
                                            <span className="font-bold">{formatCurrency(selectedGig.jobId.budget)}</span>
                                        </div>
                                        <Progress value={100} className="h-2 mb-4" />

                                        <h4 className="text-sm font-medium mb-2">Milestones</h4>
                                        <div className="space-y-3">
                                            {selectedGig.jobId.milestones.map((milestone, index) => (
                                                <div key={index} className="flex justify-between items-center text-sm">
                                                    <div className="flex items-start gap-2">
                                                        <div className="mt-0.5">
                                                            {milestone.isPaid ? (
                                                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                            ) : (
                                                                <div className="h-4 w-4 rounded-full border border-muted-foreground flex items-center justify-center">
                                                                    <span className="text-xs">{index + 1}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="line-clamp-2">{milestone.description}</span>
                                                    </div>
                                                    <span className="font-medium">{formatCurrency(milestone.amount)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Description section */}
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Description</h3>
                                    <div className="text-sm whitespace-pre-line">
                                        {selectedGig.jobId.detailDesc || selectedGig.jobId.description}
                                    </div>
                                </div>

                                {/* Skills section */}
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Skills Required</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {selectedGig.jobId.skills.map((skill, index) => {
                                            const style = tagStyles[index % tagStyles.length] || tagStyles[0]
                                            return (
                                                <Badge
                                                    key={index}
                                                    className="text-[0.75rem] font-medium cursor-pointer shadow-none"
                                                    style={{
                                                        color: style.text.light,
                                                        backgroundColor: style.bg.light,
                                                    }}
                                                >
                                                    {skill}
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Requirements section */}
                                {selectedGig.jobId.requirements && selectedGig.jobId.requirements.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Requirements</h3>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            {selectedGig.jobId.requirements.map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Benefits section */}
                                {selectedGig.jobId.benefits && selectedGig.jobId.benefits.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Benefits</h3>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            {selectedGig.jobId.benefits.map((benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Deadline section */}
                                <div>
                                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-amber-500" />
                                        Deadline
                                    </h3>
                                    <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between">
                                        <span>Project Deadline</span>
                                        <span className="font-medium">{format(new Date(selectedGig.jobId.deadline), "MMMM d, yyyy")}</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>

                        <DialogFooter className="mt-4 gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setSelectedGig(null)}>
                                Close
                            </Button>
                            <Button variant="destructive" onClick={() => handleRemoveGig(selectedGig._id)}>
                                Remove from Saved
                            </Button>
                            <Button onClick={() => window.open(`/jobs/jobid?slug=${encodeURIComponent(selectedGig.jobId.title)}}`, "_blank")}>
                                Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

export default SavedGigs
