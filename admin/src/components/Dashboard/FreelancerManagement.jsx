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
import {
    UserCheck,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Eye,
    Edit,
    Mail,
    MapPin,
    Star,
    Ban,
    CheckCircle,
    Award,
    Briefcase,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Mail01Icon } from "hugeicons-react"
import useTokenValidation from "@/hooks/useTokenValidation"



export function FreelancersManagement({freelancers}) {
    useTokenValidation();
    const stats = [
    {
        title: "Total Freelancers",
        value: freelancers.totalFreelancers || "1,245",
        change: "+15.2%",
        trend: "up",
        icon: UserCheck,
    },
    {
        title: "Active Freelancers",
        value: freelancers.totalActiveUsers || "1,050",
        change: "+12.8%",
        trend: "up",
        icon: CheckCircle,
    },
    {
        title: "Top Rated",
        value: "124",
        change: "+8.4%",
        trend: "up",
        icon: Award,
    },
    {
        title: "Avg. Rating",
        value: "4.6",
        change: "+0.2",
        trend: "up",
        icon: Star,
    },
]
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedSkill, setSelectedSkill] = useState("all")

    const filteredFreelancers = freelancers?.freelancers?.filter((freelancer) => {
        const name = `${freelancer.name ?? ""}`.toLowerCase()
        const email = freelancer.email?.toLowerCase() ?? ""
        const skills = freelancer?.skills || []
        const status = freelancer.userStatus?.toLowerCase() ?? ""

        const matchesSearch =
            name.includes(searchTerm.toLowerCase()) ||
            email.includes(searchTerm.toLowerCase()) ||
            skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesStatus =
            selectedStatus === "all" || status === selectedStatus.toLowerCase()

        const matchesSkill =
            selectedSkill === "all" ||
            skills.some((skill) =>
                skill.toLowerCase().includes(selectedSkill.toLowerCase())
            )

        return matchesSearch && matchesStatus && matchesSkill
    })

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount)
    }
    const statusColor = (type) => {
        switch (type) {
            case "active":
                return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
            case "pending":
                return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
            case "suspended":
                return "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800";
            default:
                return "bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800";
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

    const humanizeResponseTime = (hours) => {
    const h = Math.round(hours);
    if (h < 24) return `${h} hours`;
    const days = Math.round(h / 24);
    return ` ${days} days`;
    };

    const successProgressColor = (progress) => {
        if (progress >= 75) {
            return "bg-yellow-500";
        }
        if (progress >= 50) {
            return "bg-orange-500";
        }
        if (progress >= 25) {
            return "bg-red-500";
        }
        return "bg-gray-500";
    }

    if (!freelancers || !freelancers.freelancers) {
        return (
            <div className="p-10 text-center text-muted-foreground">
            Loading freelancers...
        </div>
        );
    }


    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Freelancers Management
                    </h1>
                    <p className="text-muted-foreground mt-1">Manage freelancer profiles, skills, and performance metrics.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Award className="mr-2 h-4 w-4" />
                        Top Rated
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Invite Freelancer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Invite Freelancer</DialogTitle>
                                <DialogDescription>
                                    Send an invitation to a potential freelancer to join your platform.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" placeholder="freelancer@example.com" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="message" className="text-right">
                                        Message
                                    </Label>
                                    <Textarea id="message" placeholder="Personal invitation message..." className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Send Invitation</Button>
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
                            <stat.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-green-600 dark:text-green-400">{stat.change}</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters and Search */}
            <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Freelancer Directory</CardTitle>
                    <CardDescription>Search and filter freelancers by skills, status, and performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or skills..."
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
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Skills" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Skills</SelectItem>
                                    <SelectItem value="react">React</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="writing">Writing</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Freelancers Table */}
            <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Freelancer</TableHead>
                                <TableHead>Skills & Rate</TableHead>
                                <TableHead>Performance</TableHead>
                                <TableHead>Projects</TableHead>
                                <TableHead>Earnings</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFreelancers.map((freelancer) => (
                                <TableRow key={freelancer.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={freelancer.profile || `/placeholder.svg?height=48&width=48`} />
                                                <AvatarFallback className="text-sm">
                                                    {freelancer.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium flex items-center gap-2">
                                                    {freelancer.name}
                                                    {freelancer?.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                                                    {freelancer?.topRated && <Award className="h-4 w-4 text-yellow-500" />}
                                                </div>
                                                {/* <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {freelancer.location}
                                                </div> */}
                                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Mail01Icon className="h-3 w-3" />
                                                    {freelancer.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm font-medium text-emerald-600">₹{freelancer.hourlyRate}/hour</div>
                                            <Badge
                                                variant={freelancer.availability === "Available" ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                {freelancer.availability}
                                            </Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {freelancer?.skills.slice(0, 3).map((skill, index) => (
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
                                                {freelancer?.skills.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{freelancer?.skills.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{freelancer?.averageRating > 0 ? freelancer.averageRating : "N/A"}</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">Success Rate: {freelancer.successRate}%</div>
                                            <Progress value={freelancer.successRate} className={`h-1 ${successProgressColor(freelancer.successRate)}`} />
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <h1>Avg completion Time:</h1>
                                                {humanizeResponseTime(freelancer.averageResponseTime)}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium">{freelancer.completedProjects} completed</div>
                                            <div className="text-sm text-muted-foreground">{freelancer.activeProjects} active</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-emerald-600">{formatCurrency(freelancer.totalRevenue)}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColor(freelancer.userStatus)}>{freelancer.userStatus.charAt(0).toUpperCase() + freelancer.userStatus.slice(1).toLowerCase()}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Send Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Briefcase className="mr-2 h-4 w-4" />
                                                    View Projects
                                                </DropdownMenuItem>
                                                {freelancer.status === "Active" ? (
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        Suspend
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem className="text-green-600">
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Activate
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
