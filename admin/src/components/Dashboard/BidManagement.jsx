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

const bidsData = [
    {
        id: 1,
        projectId: "PRJ-001",
        projectTitle: "E-commerce Website Development",
        freelancer: {
            name: "Alice Johnson",
            email: "alice@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.8,
            completedProjects: 12,
            successRate: 95,
        },
        client: {
            name: "TechCorp Inc.",
            email: "client@techcorp.com",
        },
        bidAmount: "$4,800",
        originalBudget: "$5,000",
        proposedTimeline: "6 weeks",
        submittedAt: "2024-01-15T10:30:00Z",
        status: "pending",
        priority: "high",
        proposal:
            "I have extensive experience in e-commerce development with React and Node.js. I can deliver a fully functional platform with payment integration, user management, and admin dashboard.",
        skills: ["React", "Node.js", "MongoDB", "Stripe"],
        portfolio: ["https://example1.com", "https://example2.com"],
        estimatedHours: 160,
        milestones: [
            { title: "UI/UX Design", duration: "1 week", amount: "$1,200" },
            { title: "Frontend Development", duration: "3 weeks", amount: "$2,400" },
            { title: "Backend & Integration", duration: "2 weeks", amount: "$1,200" },
        ],
    },
    {
        id: 2,
        projectId: "PRJ-002",
        projectTitle: "Mobile App UI/UX Design",
        freelancer: {
            name: "Bob Smith",
            email: "bob@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.6,
            completedProjects: 18,
            successRate: 89,
        },
        client: {
            name: "StartupXYZ",
            email: "founder@startupxyz.com",
        },
        bidAmount: "$3,000",
        originalBudget: "$3,200",
        proposedTimeline: "4 weeks",
        submittedAt: "2024-01-14T14:20:00Z",
        status: "accepted",
        priority: "medium",
        proposal:
            "I specialize in mobile app design with a focus on user experience. I'll create wireframes, prototypes, and final designs for both iOS and Android platforms.",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        portfolio: ["https://design1.com", "https://design2.com"],
        estimatedHours: 120,
        milestones: [
            { title: "Research & Wireframes", duration: "1 week", amount: "$750" },
            { title: "UI Design", duration: "2 weeks", amount: "$1,500" },
            { title: "Prototyping & Testing", duration: "1 week", amount: "$750" },
        ],
    },
    {
        id: 3,
        projectId: "PRJ-003",
        projectTitle: "Content Writing for Blog",
        freelancer: {
            name: "Carol Davis",
            email: "carol@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.2,
            completedProjects: 8,
            successRate: 92,
        },
        client: {
            name: "BlogMaster",
            email: "editor@blogmaster.com",
        },
        bidAmount: "$750",
        originalBudget: "$800",
        proposedTimeline: "3 weeks",
        submittedAt: "2024-01-13T09:15:00Z",
        status: "rejected",
        priority: "low",
        proposal:
            "I'm a professional content writer with expertise in SEO optimization. I can create engaging, well-researched articles that drive traffic and engagement.",
        skills: ["SEO", "Content Writing", "Research", "WordPress"],
        portfolio: ["https://blog1.com", "https://blog2.com"],
        estimatedHours: 60,
        milestones: [
            { title: "Content Strategy", duration: "3 days", amount: "$150" },
            { title: "Article Writing", duration: "2 weeks", amount: "$450" },
            { title: "SEO Optimization", duration: "4 days", amount: "$150" },
        ],
    },
    {
        id: 4,
        projectId: "PRJ-004",
        projectTitle: "Digital Marketing Campaign",
        freelancer: {
            name: "David Wilson",
            email: "david@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.9,
            completedProjects: 25,
            successRate: 96,
        },
        client: {
            name: "Fashion Brand Co.",
            email: "marketing@fashionbrand.com",
        },
        bidAmount: "$2,200",
        originalBudget: "$2,500",
        proposedTimeline: "8 weeks",
        submittedAt: "2024-01-12T16:45:00Z",
        status: "under_review",
        priority: "high",
        proposal:
            "I'll create and manage a comprehensive digital marketing campaign including social media strategy, content creation, and paid advertising across multiple platforms.",
        skills: ["Social Media", "Google Ads", "Analytics", "Content Strategy"],
        portfolio: ["https://campaign1.com", "https://campaign2.com"],
        estimatedHours: 200,
        milestones: [
            { title: "Strategy Development", duration: "1 week", amount: "$400" },
            { title: "Content Creation", duration: "3 weeks", amount: "$900" },
            { title: "Campaign Management", duration: "4 weeks", amount: "$900" },
        ],
    },
]

const stats = [
    {
        title: "Total Bids",
        value: "2,341",
        change: "+18.2%",
        trend: "up",
        icon: FileText,
        color: "blue",
    },
    {
        title: "Pending Review",
        value: "156",
        change: "+12.5%",
        trend: "up",
        icon: Clock,
        color: "yellow",
    },
    {
        title: "Accepted Bids",
        value: "1,847",
        change: "+8.7%",
        trend: "up",
        icon: CheckCircle,
        color: "green",
    },
    {
        title: "Avg. Bid Value",
        value: "$2,450",
        change: "+5.3%",
        trend: "up",
        icon: DollarSign,
        color: "purple",
    },
]

export function BidsManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedPriority, setSelectedPriority] = useState("all")
    const [activeTab, setActiveTab] = useState("all")

    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return "default"
            case "pending":
                return "secondary"
            case "under_review":
                return "outline"
            case "rejected":
                return "destructive"
            default:
                return "secondary"
        }
    }

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

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "text-red-600 dark:text-red-400"
            case "medium":
                return "text-yellow-600 dark:text-yellow-400"
            case "low":
                return "text-green-600 dark:text-green-400"
            default:
                return "text-gray-600 dark:text-gray-400"
        }
    }

    const filteredBids = bidsData.filter((bid) => {
        const matchesSearch =
            bid.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bid.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bid.client.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = selectedStatus === "all" || bid.status === selectedStatus
        const matchesPriority = selectedPriority === "all" || bid.priority === selectedPriority
        const matchesTab = activeTab === "all" || bid.status === activeTab

        return matchesSearch && matchesStatus && matchesPriority && matchesTab
    })

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

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
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="all">All Bids</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="under_review">Review</TabsTrigger>
                            <TabsTrigger value="accepted">Accepted</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-6">
                            <div className="space-y-4">
                                {filteredBids.map((bid) => (
                                    <Card key={bid.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="grid gap-6 lg:grid-cols-3">
                                                {/* Left Column - Project & Freelancer Info */}
                                                <div className="lg:col-span-2 space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-semibold text-lg">{bid.projectTitle}</h3>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {bid.projectId}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                <span>Client: {bid.client.name}</span>
                                                                <span>•</span>
                                                                <span>Submitted: {formatDate(bid.submittedAt)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={getStatusColor(bid.status)} className="flex items-center gap-1">
                                                                {getStatusIcon(bid.status)}
                                                                {bid.status.replace("_", " ").toUpperCase()}
                                                            </Badge>
                                                            <span className={`text-sm font-medium ${getPriorityColor(bid.priority)}`}>
                                                                {bid.priority.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Freelancer Info */}
                                                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage src={bid.freelancer.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback>
                                                                {bid.freelancer.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-medium">{bid.freelancer.name}</h4>
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                                    <span className="text-sm font-medium">{bid.freelancer.rating}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                <span>{bid.freelancer.completedProjects} projects completed</span>
                                                                <span>•</span>
                                                                <span>{bid.freelancer.successRate}% success rate</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold text-primary">{bid.bidAmount}</div>
                                                            <div className="text-sm text-muted-foreground">Budget: {bid.originalBudget}</div>
                                                        </div>
                                                    </div>

                                                    {/* Proposal */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium">Proposal</h5>
                                                        <p className="text-sm text-muted-foreground line-clamp-3">{bid.proposal}</p>
                                                    </div>

                                                    {/* Skills */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium">Skills</h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {bid.skills.map((skill, index) => (
                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column - Details & Actions */}
                                                <div className="space-y-4">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">Timeline</span>
                                                            <span className="font-medium">{bid.proposedTimeline}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">Estimated Hours</span>
                                                            <span className="font-medium">{bid.estimatedHours}h</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">Milestones</span>
                                                            <span className="font-medium">{bid.milestones.length}</span>
                                                        </div>
                                                    </div>

                                                    {/* Milestones */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium text-sm">Project Milestones</h5>
                                                        <div className="space-y-2">
                                                            {bid.milestones.map((milestone, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded"
                                                                >
                                                                    <div>
                                                                        <div className="font-medium">{milestone.title}</div>
                                                                        <div className="text-muted-foreground">{milestone.duration}</div>
                                                                    </div>
                                                                    <div className="font-medium">{milestone.amount}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="space-y-2">
                                                        {bid.status === "pending" && (
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
                                                        {bid.status === "accepted" && (
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
