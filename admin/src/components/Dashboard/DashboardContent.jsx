import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, DollarSign,  Briefcase,  TrendingUp,  ArrowUpRight,  ArrowDownRight,  MoreHorizontal,  Eye,  Edit,  Trash2, IndianRupee,} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy01Icon } from "hugeicons-react"
import { toast } from "sonner"
import useTokenValidation from "@/hooks/useTokenValidation"

export function DashboardContent({ users, gigs }) {
    useTokenValidation();
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(value);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    }

    const statsCards = [
        {
            title: "Total Users",
            value: `${users?.totalUsers || 0}`,
            change: "+12.5%",
            trend: "up",
            icon: Users,
            description: "Active users this month",
            color: "blue",
        },
        {
            title: "Revenue",
            value: `${formatCurrency(users?.totalRevenue) || 0}`,
            change: "+8.2%",
            trend: "up",
            icon: IndianRupee,
            description: "Total revenue this month",
            color: "green",
        },
        {
            title: "Active Projects",
            value: `${users?.totalActiveProjects || 0}`,
            change: "-2.4%",
            trend: "down",
            icon: Briefcase,
            description: "Currently active projects",
            color: "purple",
        },
        {
            title: "Growth Rate",
            value: `${users?.totalGrowth || 0}%`,
            change: "+4.1%",
            trend: "up",
            icon: TrendingUp,
            description: "Monthly growth rate",
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
    };

    const statusColor = (type) => {
        switch (type) {
            case "Active":
                return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
            case "Pending":
                return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
            case "Suspended":
                return "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800";
            default:
                return "bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800";
        }
    }

    const roleColor = (type) => {
        switch (type) {
            case "freelancer":
                return "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800";
            case "client":
                return "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800";
            default:
                return "bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800";
        }
    }

    const projectStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
            case "in-progress":
                return "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800";
            case "review":
                return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
            default:
                return "bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800";
        }
    }

    const projectProgressColor = (progress) => {
        if (progress >= 75) {
            return "bg-yellow-500";
        }
        if (progress >= 50) {
            return "bg-orange-500";
        }
        if (progress >= 25) {
            return "bg-red-500";
        }
        return "bg-red-500";
    }

    const deadlineColor = (deadline) => {
        const today = new Date();
        const dueDate = new Date(deadline);
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 5) {
            return " text-red-600 dark:text-red-400 ";
        }
        if (diffDays <= 15) {
            return " text-yellow-600 dark:text-yellow-400 ";
        }
        return "text-green-600 dark:text-green-400 ";
    }

    
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Welcome back, Admin
                    </h1>
                    <p className="text-muted-foreground mt-1">Here's what's happening with your platform today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-200 dark:border-slate-700 bg-transparent">
                        <Eye className="mr-2 h-4 w-4" />
                        View Reports
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Analytics
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat, index) => (
                    <Card
                        key={index}
                        className="relative overflow-hidden border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 gap-2"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg ${colorMap[stat.color].bg}`}>
                                <stat.icon className={`h-4 w-4 ${colorMap[stat.color].text}`} />
                            </div>

                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                                )}
                                <span
                                    className={
                                        stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    }
                                >
                                    {stat.change}
                                </span>
                                <span>from last month</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Users */}
                <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold">Recent Users</CardTitle>
                                <CardDescription>Latest user registrations and activity</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Projects</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.users?.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.profile || `/placeholder.svg?height=32&width=32`} />
                                                    <AvatarFallback className="text-xs">
                                                        {user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`${roleColor(user.role)} capitalize`}>{user.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={statusColor(user?.isActive ? "Active" : "Suspended")}>{user?.isActive ? "Active" : "Inactive"}</Badge>
                                        </TableCell>
                                        <TableCell>{user.projects}</TableCell>
                                        <TableCell>
                                            {user.averageRating > 0 ? (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-medium">{user.averageRating}</span>
                                                    <span className="text-xs text-yellow-500">★</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">N/A</span>
                                            )}
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
                                                        Edit User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Suspend User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Platform Health</CardTitle>
                        <CardDescription>System performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Server Load</span>
                                <span className="font-medium">68%</span>
                            </div>
                            <Progress value={68} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Database Usage</span>
                                <span className="font-medium">45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">API Response Time</span>
                                <span className="font-medium">120ms</span>
                            </div>
                            <Progress value={80} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Active Sessions</span>
                                <span className="font-medium">1,247</span>
                            </div>
                            <Progress value={62} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Projects */}
            <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
                            <CardDescription>Latest project activities and status updates</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            Manage Projects
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead className="w-96">Project</TableHead>
                                <TableHead >Client</TableHead>
                                <TableHead>Freelancer</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-32">Progress</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gigs?.projects?.map((project) => (
                                <TableRow key={project._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm"> PRJ-{project._id.slice(3, 6)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium w-96 flex items-center gap-2">
                                        {/* <div className="w-8 h-8 p-1 rounded-md overflow-hidden  shadow-xs flex items-center justify-center">
                                            <img src={project?.image} alt="img " className="object-contain" />
                                        </div> */}
                                        <div>
                                            <div className="font-medium w-80 truncate overflow-hidden whitespace-nowrap">{project.title}</div>
                                            <div className="text-sm text-muted-foreground">Due: <span className={deadlineColor(project.deadline)}>{formatDate(project.deadline)}</span></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{project?.clientInfo?.company}</TableCell>
                                    <TableCell>{project?.freelancerInfo?.name}</TableCell>
                                    <TableCell className="font-medium">{formatCurrency(project?.budget)}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${projectStatusColor(project?.status)} capitalize`}
                                        >
                                            {project?.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="w-32">
                                        <div className="flex items-center gap-2">
                                            <Progress value={Math.min(project?.progress, 100)} className={`h-2 ${projectProgressColor(project?.progress)}`} />
                                            <span className="text-sm text-muted-foreground">{project?.progress}%</span>
                                        </div>
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
                                                    <Copy01Icon className="mr-2 h-4 w-4" />
                                                    <button onClick={() => { navigator.clipboard.writeText(`PRJ-${project._id.slice(0, 6)}`); toast("Project ID copied to clipboard!", { description: `PRJ-${project._id.slice(0, 6)}` }); }}>
                                                        Copy Project ID
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Project
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Archive Project
                                                </DropdownMenuItem>
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
