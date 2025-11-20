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
import {
    Users,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Mail,
    Phone,
    MapPin,
    Star,
    Ban,
    CheckCircle,
    AlertCircle,
    Download,
    Upload,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch } from "react-redux"
import { updateUserStatus } from "@/Redux/Actions/userAction"
import { Mail01Icon } from "hugeicons-react"
import { toast, ToastContainer } from "react-toastify"
import { REFRESH_USERS_DATA } from "@/Redux/Constants/userConstants"
import useTokenValidation from "@/hooks/useTokenValidation"
export function UsersManagement({ clients }) {
    useTokenValidation();
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    }
    const stats = [
    {
        title: "Total clients",
        value: clients?.totalClients,
        change: "+12.5%",
        trend: "up",
        icon: Users,
    },
    {
        title: "Active Users",
        value: clients?.totalActiveUsers,
        change: "+8.2%",
        trend: "up",
        icon: CheckCircle,
    },
    {
        title: "Clients Billing",
        value: formatCurrency(clients?.totalRevenue) || formatCurrency(0),
        change: "-2.4%",
        trend: "down",
        icon: AlertCircle,
    },
    {
        title: "Suspended Users",
        value: clients?.totalInactiveUsers || 0,
        change: "+4.1%",
        trend: "up",
        icon: Ban,
    },
]

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRole, setSelectedRole] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const dispatch = useDispatch();
    const filteredUsers = clients?.clients?.filter((user) => {
        const matchesSearch =
            user?.client?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.client?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole =
            selectedRole === "all" || user.client.role?.toLowerCase() === selectedRole;
        const matchesStatus =
            selectedStatus === "all" || user.client.userStatus?.toLowerCase() === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });
    const formatLastLogin = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
    const handleUserStatusChange = async (userId, newStatus) => {
        try {
            await dispatch(updateUserStatus(userId, { userStatus: newStatus }));
            dispatch({ type: REFRESH_USERS_DATA });
            toast.success(`User has been ${newStatus === 'active' ? 'activated' : 'suspended'} successfully.`);
        } catch (error) {
            console.error("Failed to update user status:", error);
            toast.error("Failed to update user status. Please try again.");
        }
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
    if (!clients || !clients.clients) {
    return (
        <div className="p-10 text-center text-muted-foreground">
            Loading clients...
        </div>
    );
}
    
    return (
        <div className="space-y-2">
            <ToastContainer />
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Client Management
                    </h1>
                    <p className="text-muted-foreground mt-1">Manage all clients on your platform.</p>
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
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                                <DialogDescription>
                                    Create a new user account. Fill in the required information below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" placeholder="John Doe" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" placeholder="john@example.com" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">
                                        Role
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="freelancer">Freelancer</SelectItem>
                                            <SelectItem value="client">Client</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">
                                        Phone
                                    </Label>
                                    <Input id="phone" placeholder="+1 (555) 123-4567" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create User</Button>
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
                            <stat.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                    <CardTitle className="text-lg font-semibold">User Directory</CardTitle>
                    <CardDescription>Search and filter users by various criteria</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={selectedRole} onValueChange={setSelectedRole}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="freelancer">Freelancer</SelectItem>
                                    <SelectItem value="client">Client</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Contact</TableHead> 
                                {/* <TableHead>Role</TableHead> */}
                                <TableHead>Status</TableHead>
                                <TableHead>Projects</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Earnings/Spent</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.client?._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user.client.profile} />
                                                <AvatarFallback>
                                                    {user.client.username.split(" ").map(n => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium flex items-center gap-2">
                                                    {user.client.username}
                                                    
                                                </div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {user.client.clientProfile.location || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm flex items-center gap-1">
                                                <Mail01Icon className="h-3 w-3" />
                                                {user.client.email}
                                            </div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Phone className="h-3 w-3" />
                                                {user.client.clientProfile.phoneNumber || "N/A"}
                                            </div>
                                        </div>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Badge variant={user.client.role === "Freelancer" ? "default" : "secondary"}>{user.client.role}</Badge>
                                        {user.client.role === "client" && user.clientProfile?.company && (
                                            <div className="text-xs text-muted-foreground mt-1">{user.clientProfile?.company || "N/A"}</div>
                                        )}
                                        {user.client.role === "Freelancer" && user.skills && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {user.skills.slice(0, 2).map((skill, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {user.skills.length > 2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{user.skills.length - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </TableCell> */}
                                    <TableCell>
                                        <Badge className={statusColor(user.client.userStatus)}>
                                            {user.client.userStatus.charAt(0).toUpperCase() + user.client.userStatus.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.projects}</TableCell>
                                    <TableCell>
                                        {user.client.clientProfile.avgRating ? (
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">
                                                    {user.client.clientProfile.avgRating}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">N/A</span>
                                        )}

                                    </TableCell>
                                    <TableCell className="font-medium">{formatCurrency(user.totalRevenue)}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{formatLastLogin(user.client.traction.lastLogin)}</TableCell>
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
                                                <DropdownMenuItem>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Send Message
                                                </DropdownMenuItem>
                                                {user.client.userStatus === "active" ? (
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleUserStatusChange(user.client._id, 'suspended')}>
                                                        <Ban className="mr-2 h-4 w-4" />
                                                        Suspend User
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem className="text-green-600" onClick={() => handleUserStatusChange(user.client._id, 'active')}>
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Activate User
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete User
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
