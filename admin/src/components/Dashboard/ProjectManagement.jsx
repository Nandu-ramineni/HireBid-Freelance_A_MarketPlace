import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
    Briefcase,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Edit,
    Calendar,
    DollarSign,
    User,
    Clock,
    CheckCircle,
    Download,
    Upload,
    EyeIcon,
    MapPin,
    Building,
    Star,
    FileText,
    Target,
    Users,
    X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar01Icon, Delete01Icon, PencilEdit02Icon } from "hugeicons-react"

export function ProjectsManagement({ gigs }) {
    const [selectedProject, setSelectedProject] = useState(null)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)

    const stats = [
        {
            title: "Total Projects",
            value: `${gigs?.totalProjects || 0}`,
            change: "+12.5%",
            trend: "up",
            icon: Briefcase,
            color: "blue",
        },
        {
            title: "Active Projects",
            value: `${gigs?.activeProjects || 0}`,
            change: "+8.2%",
            trend: "up",
            icon: CheckCircle,
            color: "green",
        },
        {
            title: "Completed",
            value: `${gigs?.completedProjects || 0}`,
            change: "+15.4%",
            trend: "up",
            icon: CheckCircle,
            color: "purple",
        },
        {
            title: "Avg. Completion",
            value: `${gigs?.avgCompletionRate || 0}`,
            change: "-2.1 days",
            trend: "up",
            icon: Clock,
            color: "orange",
        },
    ]

    const colorMap = {
        blue: {
            bg: "bg-blue-100 dark:bg-blue-900/20",
            text: "text-blue-600 dark:text-blue-400",
        },
        green: {
            bg: "bg-green-100 dark:bg-green-900/20",
            text: "text-green-600 dark:text-green-400",
        },
        purple: {
            bg: "bg-purple-100 dark:bg-purple-900/20",
            text: "text-purple-600 dark:text-purple-400",
        },
        orange: {
            bg: "bg-orange-100 dark:bg-orange-900/20",
            text: "text-orange-600 dark:text-orange-400",
        },
    }

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProjects = gigs?.projects?.filter((project) => {
        const matchesSearch =
            project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project?.clientInfo?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project?.freelancerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus =
            selectedStatus === "all" || project?.status?.toLowerCase().replace(/\s/g, "") === selectedStatus
        const matchesCategory =
            selectedCategory === "all" || project?.category?.toLowerCase().replace(/\s/g, "") === selectedCategory
        return matchesSearch && matchesStatus && matchesCategory
    })

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
            case "in-progress":
                return "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800"
            case "review":
                return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
            default:
                return "bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800"
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "text-red-600 dark:text-red-400"
            case "Medium":
                return "text-yellow-600 dark:text-yellow-400"
            case "Low":
                return "text-green-600 dark:text-green-400"
            default:
                return "text-gray-600 dark:text-gray-400"
        }
    }

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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(value)
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString("en-IN", options)
    }

    const handleViewDetails = (project) => {
        setSelectedProject(project)
        setIsViewModalOpen(true)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Projects Management
                    </h1>
                    <p className="text-muted-foreground mt-1">Monitor and manage all projects, timelines, and deliverables.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Import
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Set up a new project with all the necessary details and requirements.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input id="title" placeholder="Project title" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea id="description" placeholder="Project description" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="budget" className="text-right">
                                        Budget
                                    </Label>
                                    <Input id="budget" placeholder="$5,000" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="deadline" className="text-right">
                                        Deadline
                                    </Label>
                                    <Input id="deadline" type="date" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="web-development">Web Development</SelectItem>
                                            <SelectItem value="mobile-development">Mobile Development</SelectItem>
                                            <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                                            <SelectItem value="content-writing">Content Writing</SelectItem>
                                            <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Project</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <div className={`-mt-4 rounded-lg ${colorMap[stat.color].bg}`}>
                                <stat.icon className={`h-4 w-4 ${colorMap[stat.color].text}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from last
                                month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters and Search */}
            <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Project Directory</CardTitle>
                    <CardDescription>Search and filter projects by status, category, and other criteria</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search projects, clients, or freelancers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="review">Review</SelectItem>
                                    <SelectItem value="onhold">On Hold</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="webdevelopment">Web Development</SelectItem>
                                    <SelectItem value="ui/uxdesign">UI/UX Design</SelectItem>
                                    <SelectItem value="contentwriting">Content Writing</SelectItem>
                                    <SelectItem value="digitalmarketing">Digital Marketing</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Projects Table */}
            <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[28rem]">Project</TableHead>
                                <TableHead>Client & Freelancer</TableHead>
                                <TableHead>Budget & Progress</TableHead>
                                <TableHead>Timeline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProjects?.length > 0 ? (
                                filteredProjects?.map((project) => (
                                    <TableRow key={project.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                        <TableCell className="font-medium w-[28rem]">
                                            <div className="space-y-1">
                                                <div className="font-medium w-96 truncate overflow-hidden whitespace-nowrap">
                                                    {project.title}
                                                </div>
                                                <div className="text-sm text-muted-foreground w-96 truncate overflow-hidden whitespace-nowrap">
                                                    {project.description}
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {project.skills.slice(0, 3).map((skill, index) => (
                                                        <Badge
                                                            key={index}
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
                                                    {project.skills.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{project.skills.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage
                                                            src={project?.clientInfo?.profilePic || `/placeholder.svg?height=24&width=24`}
                                                        />
                                                        <AvatarFallback className="text-xs">
                                                            {project?.clientInfo?.company
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="text-sm font-medium">{project?.clientInfo?.company}</div>
                                                        <div className="text-xs text-muted-foreground">Client</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage
                                                            src={project?.freelancerInfo?.profilePic || `/placeholder.svg?height=24&width=24`}
                                                        />
                                                        <AvatarFallback className="text-xs">
                                                            {project?.freelancerInfo?.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="text-sm font-medium">{project?.freelancerInfo?.name}</div>
                                                        <div className="text-xs text-muted-foreground">Freelancer</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-medium">{formatCurrency(project.budget)}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span>Progress</span>
                                                        <span>{project.progress}%</span>
                                                    </div>
                                                    <Progress value={project.progress} className="h-2" />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Calendar01Icon className="h-3 w-3" />
                                                    <span>Due: {formatDate(project.deadline)}</span>
                                                </div>
                                                <div className="text-xs text-muted-foreground">Started: {formatDate(project.createdAt)}</div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    <span>
                                                        {project.workedHours}/{project.totalHours}h
                                                    </span>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Updated: <span>{formatDate(project.updatedAt)}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`${getStatusColor(project.status)} capitalize`}>{project.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                                                {project.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewDetails(project)}>
                                                        <EyeIcon className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <PencilEdit02Icon className="mr-2 h-4 w-4" />
                                                        Edit Project
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <User className="mr-2 h-4 w-4" />
                                                        Assign Freelancer
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Calendar01Icon className="mr-2 h-4 w-4" />
                                                        Update Timeline
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Delete01Icon className="mr-2 h-4 w-4" />
                                                        Archive Project
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="text-4xl">🗂️</span>
                                            <span>No projects found</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Project Details Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="w-full md:w-1/2 max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="space-y-4 ">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    {selectedProject?.title}
                                </DialogTitle>
                                <div className="flex items-center gap-3">
                                    <Badge className={`${getStatusColor(selectedProject?.status)} capitalize`}>
                                        {selectedProject?.status}
                                    </Badge>
                                    <Badge variant="outline" className="text-slate-600 dark:text-slate-400">
                                        {selectedProject?.category}
                                    </Badge>
                                    <span className={`text-sm font-medium ${getPriorityColor(selectedProject?.priority)}`}>
                                        {selectedProject?.priority} Priority
                                    </span>
                                </div>
                            </div>
                            {/* <Button variant="ghost" size="icon" onClick={() => setIsViewModalOpen(false)} className="h-6 w-6">
                                <X className="h-4 w-4" />
                            </Button> */}
                        </div>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Overview Section */}
                        <Card className="border-slate-200/60 dark:border-slate-800/60">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    Project Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <DollarSign className="h-4 w-4" />
                                            Budget
                                        </div>
                                        <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                            {formatCurrency(selectedProject?.budget)}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <Target className="h-4 w-4" />
                                            Progress
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                                {selectedProject?.progress}%
                                            </div>
                                            <Progress value={selectedProject?.progress} className="h-2" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <Clock className="h-4 w-4" />
                                            Time Tracked
                                        </div>
                                        <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                            {selectedProject?.workedHours}h
                                        </div>
                                        <div className="text-sm text-muted-foreground">of {selectedProject?.totalHours}h estimated</div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Description</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {selectedProject?.description}
                                    </p>
                                </div>
                                {selectedProject?.detailDesc && (
                                    <div>
                                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Detailed Description</h4>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                            {selectedProject?.detailDesc}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Team Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-slate-200/60 dark:border-slate-800/60">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Building className="h-5 w-5 text-green-600" />
                                        Client Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={selectedProject?.clientInfo?.profilePic || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                {selectedProject?.clientInfo?.company
                                                    ?.split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-slate-100">
                                                {selectedProject?.clientInfo?.company}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Client Company</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200/60 dark:border-slate-800/60">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Users className="h-5 w-5 text-purple-600" />
                                        Freelancer Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={selectedProject?.freelancerInfo?.profilePic || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                {selectedProject?.freelancerInfo?.name
                                                    ?.split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-slate-100">
                                                {selectedProject?.freelancerInfo?.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Assigned Freelancer</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Project Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-slate-200/60 dark:border-slate-800/60">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Calendar className="h-5 w-5 text-orange-600" />
                                        Timeline & Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Job Type</div>
                                            <div className="text-sm text-slate-900 dark:text-slate-100">{selectedProject?.jobType}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Experience Level</div>
                                            <div className="text-sm text-slate-900 dark:text-slate-100">
                                                {selectedProject?.experienceLevel}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Location</div>
                                            <div className="flex items-center gap-1 text-sm text-slate-900 dark:text-slate-100">
                                                <MapPin className="h-3 w-3" />
                                                {selectedProject?.location}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Deadline</div>
                                            <div className="text-sm text-slate-900 dark:text-slate-100">
                                                {formatDate(selectedProject?.deadline)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Created</div>
                                            <div className="text-sm text-slate-900 dark:text-slate-100">
                                                {formatDate(selectedProject?.createdAt)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Updated</div>
                                            <div className="text-sm text-slate-900 dark:text-slate-100">
                                                {formatDate(selectedProject?.updatedAt)}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200/60 dark:border-slate-800/60">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Star className="h-5 w-5 text-yellow-600" />
                                        Skills & Benefits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Required Skills</div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject?.skills?.map((skill, index) => (
                                                <Badge
                                                    key={index}
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
                                    {selectedProject?.benefits && (
                                        <div>
                                            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Benefits</div>
                                            <ul className="text-sm text-slate-900 dark:text-slate-100 space-y-1">
                                                {selectedProject?.benefits?.map((benefit, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Requirements */}
                        {selectedProject?.requirements && (
                            <Card className="border-slate-200/60 dark:border-slate-800/60">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <FileText className="h-5 w-5 text-red-600" />
                                        Requirements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="text-sm text-slate-900 dark:text-slate-100 space-y-2">
                                        {selectedProject?.requirements?.map((requirement, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                                                {requirement}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Milestones */}
                        {selectedProject?.milestones && (
                            <Card className="border-slate-200/60 dark:border-slate-800/60">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Target className="h-5 w-5 text-indigo-600" />
                                        Project Milestones
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {selectedProject?.milestones?.map((milestone, index) => (
                                            <div
                                                key={milestone._id}
                                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${milestone.isPaid
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                                                            }`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-slate-100">
                                                            {milestone.description}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">{formatCurrency(milestone.amount)}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        className={
                                                            milestone.isPaid
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                                                        }
                                                    >
                                                        {milestone.isPaid ? "Paid" : "Pending"}
                                                    </Badge>
                                                    {milestone.invoice && (
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={milestone.invoice} target="_blank" rel="noopener noreferrer">
                                                                <Download className="h-3 w-3 mr-1" />
                                                                Invoice
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                            Close
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
