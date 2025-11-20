import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    FileText,
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    Star,
    MessageSquare,
    Download,
    TrendingUp,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount)
    }


export function BidsManagement({ bids }) {
    const stats = [
        {
            title: "Total Bids",
            value: bids?.totalBids || "0",
            change: "+18.2%",
            trend: "up",
            icon: FileText,
            color: "blue",
        },
        {
            title: "Pending Review",
            value: bids.pendingBids || "0",
            change: "+12.5%",
            trend: "up",
            icon: Clock,
            color: "yellow",
        },
        {
            title: "Accepted Bids",
            value: bids.acceptedBids || "0",
            change: "+8.7%",
            trend: "up",
            icon: CheckCircle,
            color: "green",
        },
        {
            title: "Avg. Bid Value",
            value: formatCurrency(bids.averageBidValue || 0),
            change: "+5.3%",
            trend: "up",
            icon: DollarSign,
            color: "purple",
        },
    ]
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedPriority, setSelectedPriority] = useState("all")
    const [activeTab, setActiveTab] = useState("all")

    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
            case "pending":
                return "bg-blue-300 text-blue-700 dark:bg-yellow-900/20 dark:text-yellow-400";
            case "under_review":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
            case "rejected":
                return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
            case "completed":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };


    const getStatusIcon = (status) => {
        switch (status) {
            case "accepted":
                return <CheckCircle className="h-4 w-4" />
            case "pending":
                return <Clock className="h-4 w-4" />
            case "under_review":
                return <Eye className="h-4 w-4" />
            case "rejected":
                return <XCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    // const getPriorityColor = (priority) => {
    //     switch (priority) {
    //         case "high":
    //             return "text-red-600 dark:text-red-400"
    //         case "medium":
    //             return "text-yellow-600 dark:text-yellow-400"
    //         case "low":
    //             return "text-green-600 dark:text-green-400"
    //         default:
    //             return "text-gray-600 dark:text-gray-400"
    //     }
    // }

    const filteredBids = bids.bids.filter((bid) => {
        const projectTitle = bid.job?.title || "";
        const freelancerName = bid.freelancerInfo?.name || "";
        const clientName = bid.clientInfo?.name || "";

        // Search match
        const matchesSearch =
            projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            clientName.toLowerCase().includes(searchTerm.toLowerCase());

        // Status match
        const matchesStatus =
            selectedStatus === "all" || bid.status === selectedStatus;


        // Tab match
        const matchesTab =
            activeTab === "all" || bid.status === activeTab;

        return matchesSearch && matchesStatus && matchesTab;
    });


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatProjectId = (projectId) => {
        if (!projectId) return "N/A";
        const part1 = projectId.slice(0, 3).toUpperCase();      // First 3 chars
        const part2 = projectId.slice(-3).toUpperCase();        // Last 3 chars
        return `PRJ-${part1}${part2}`;
    };

    const calculateEstimatedHours = (createdAt, deadline) => {
        if (!createdAt || !deadline) return "N/A";

        const start = new Date(createdAt);
        const end = new Date(deadline);

        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);

        return Math.max(0, diffHours.toFixed(1)); // avoid negative & keep 1 decimal
    };



    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Bids Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Review and manage all project bids, proposals, and freelancer applications.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Bids
                    </Button>
                    <Button variant="outline">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Analytics
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                                <stat.icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-green-600 dark:text-green-400">{stat.change}</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs and Filters */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Bid Directory</CardTitle>
                            <CardDescription>Review and manage all project bids and proposals</CardDescription>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search bids, projects, or freelancers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="under_review">Under Review</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priority</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all">All Bids</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="accepted">Accepted</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-6">
                            <div className="space-y-4">
                                {filteredBids.map((bid) => (
                                    <Card key={bid._id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="grid gap-6 lg:grid-cols-3">
                                                {/* Left Column - Project & Freelancer Info */}
                                                <div className="lg:col-span-2 space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-semibold text-lg">{bid?.job?.title}</h3>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {formatProjectId(bid?._id)}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                <span>Client: {bid.clientInfo.name}</span>
                                                                <span>•</span>
                                                                <span>Submitted: {formatDate(bid.updatedAt)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                variant="outline"
                                                                className={`flex items-center gap-1 ${getStatusColor(bid.status)}`}
                                                            >
                                                                {getStatusIcon(bid.status)}
                                                                {bid.status.replace("_", " ").toUpperCase()}
                                                            </Badge>

                                                            {/* <span className={`text-sm font-medium ${getPriorityColor(bid.priority)}`}>
                                                                {bid?.priority.toUpperCase()}
                                                            </span> */}
                                                        </div>
                                                    </div>

                                                    {/* Freelancer Info */}
                                                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage src={bid.freelancerInfo.profilePic || "/placeholder.svg"} />
                                                            <AvatarFallback>
                                                                {bid.freelancerInfo.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-medium">{bid.freelancerInfo.name}</h4>
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                                    <span className="text-sm font-medium">{bid.freelancerInfo.rating}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                {/* <span>{bid.freelancerInfo.completedProjects} projects completed</span> */}
                                                                <span>•</span>
                                                                <span>{bid.freelancerInfo.bio}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold text-primary">{formatCurrency(bid.amount)}</div>
                                                            <div className="text-sm text-muted-foreground">Budget: {formatCurrency(bid?.job?.budget)}</div>
                                                        </div>
                                                    </div>

                                                    {/* Proposal */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium">Proposal</h5>
                                                        <p className="text-sm text-muted-foreground line-clamp-3">{bid.message}</p>
                                                    </div>

                                                    {/* Skills */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium">Skills</h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {bid?.job?.skills.map((skill, index) => (
                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column - Details & Actions */}
                                                <div className="space-y-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">Timeline</span>
                                                            <span className="font-medium">{formatDate(bid?.job?.deadline)}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">Estimated Hours</span>
                                                            <span className="font-medium">{calculateEstimatedHours(bid?.job?.createdAt, bid?.job?.deadline)}h</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">Milestones</span>
                                                            <span className="font-medium">{bid?.job?.milestones.length}</span>
                                                        </div>
                                                    </div>

                                                    {/* Milestones */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium text-sm">Project Milestones</h5>
                                                        <div className="space-y-2">
                                                            {bid?.job?.milestones.map((milestone, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded"
                                                                >
                                                                    <div>
                                                                        <div className="font-medium">{milestone.description}</div>
                                                                        {/* <div className="text-muted-foreground">{milestone.isPaid ? "Paid" : "Unpaid"}</div> */}
                                                                    </div>
                                                                    <div className="font-medium">{milestone.amount}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="space-y-2">
                                                        {(bid.status === "pending" ) && (
                                                            <>
                                                                <Button className="w-full" size="sm">
                                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                                    Accept Bid
                                                                </Button>
                                                                <Button variant="outline" className="w-full bg-transparent" size="sm">
                                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                                    Message Freelancer
                                                                </Button>
                                                                <Button variant="destructive" className="w-full" size="sm">
                                                                    <XCircle className="mr-2 h-4 w-4" />
                                                                    Reject Bid
                                                                </Button>
                                                            </>
                                                        )}
                                                        {bid.status === "under_review" && (
                                                            <>
                                                                <Button variant="outline" className="w-full bg-transparent" size="sm">
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    Review Details
                                                                </Button>
                                                                <Button variant="outline" className="w-full bg-transparent" size="sm">
                                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                                    Request Changes
                                                                </Button>
                                                            </>
                                                        )}
                                                        {bid.status === "accepted" || bid.status === "completed" && (
                                                            <Button variant="outline" className="w-full bg-transparent" size="sm">
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Project
                                                            </Button>
                                                        )}
                                                        {bid.status === "rejected" && (
                                                            <Button variant="outline" className="w-full bg-transparent" size="sm" disabled>
                                                                <XCircle className="mr-2 h-4 w-4" />
                                                                Rejected
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
