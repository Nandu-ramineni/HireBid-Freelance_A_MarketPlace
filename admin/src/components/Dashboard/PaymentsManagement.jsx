"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DollarSign,
    Search,
    Filter,
    Download,
    Upload,
    CreditCard,
    Wallet,
    AlertCircle,
    CheckCircle,
    Clock,
    RefreshCw,
    Eye,
    MoreHorizontal,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const paymentsData = [
    {
        id: "PAY-001",
        projectId: "PRJ-001",
        projectTitle: "E-commerce Website Development",
        client: {
            name: "TechCorp Inc.",
            email: "client@techcorp.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        freelancer: {
            name: "Alice Johnson",
            email: "alice@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        amount: "$4,800",
        fee: "$240",
        netAmount: "$4,560",
        status: "completed",
        method: "stripe",
        type: "milestone",
        milestone: "Frontend Development Complete",
        createdAt: "2024-01-15T10:30:00Z",
        completedAt: "2024-01-15T11:45:00Z",
        currency: "USD",
        escrowReleased: true,
        invoiceId: "INV-001",
    },
    {
        id: "PAY-002",
        projectId: "PRJ-002",
        projectTitle: "Mobile App UI/UX Design",
        client: {
            name: "StartupXYZ",
            email: "founder@startupxyz.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        freelancer: {
            name: "Bob Smith",
            email: "bob@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        amount: "$3,000",
        fee: "$150",
        netAmount: "$2,850",
        status: "pending",
        method: "paypal",
        type: "project_completion",
        milestone: "Final Design Delivery",
        createdAt: "2024-01-14T14:20:00Z",
        completedAt: null,
        currency: "USD",
        escrowReleased: false,
        invoiceId: "INV-002",
    },
    {
        id: "PAY-003",
        projectId: "PRJ-003",
        projectTitle: "Content Writing for Blog",
        client: {
            name: "BlogMaster",
            email: "editor@blogmaster.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        freelancer: {
            name: "Carol Davis",
            email: "carol@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        amount: "$750",
        fee: "$37.50",
        netAmount: "$712.50",
        status: "failed",
        method: "bank_transfer",
        type: "milestone",
        milestone: "Article Batch 1",
        createdAt: "2024-01-13T09:15:00Z",
        completedAt: null,
        currency: "USD",
        escrowReleased: false,
        invoiceId: "INV-003",
        failureReason: "Insufficient funds",
    },
    {
        id: "PAY-004",
        projectId: "PRJ-004",
        projectTitle: "Digital Marketing Campaign",
        client: {
            name: "Fashion Brand Co.",
            email: "marketing@fashionbrand.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        freelancer: {
            name: "David Wilson",
            email: "david@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        amount: "$2,200",
        fee: "$110",
        netAmount: "$2,090",
        status: "processing",
        method: "stripe",
        type: "advance",
        milestone: "Campaign Setup",
        createdAt: "2024-01-12T16:45:00Z",
        completedAt: null,
        currency: "USD",
        escrowReleased: false,
        invoiceId: "INV-004",
    },
]

const stats = [
    {
        title: "Total Payments",
        value: "$125,430",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        color: "green",
    },
    {
        title: "Pending Payments",
        value: "$8,750",
        change: "+5.2%",
        trend: "up",
        icon: Clock,
        color: "yellow",
    },
    {
        title: "Failed Payments",
        value: "$1,200",
        change: "-8.7%",
        trend: "down",
        icon: AlertCircle,
        color: "red",
    },
    {
        title: "Platform Fees",
        value: "$6,271",
        change: "+15.3%",
        trend: "up",
        icon: Wallet,
        color: "blue",
    },
]

export function PaymentsManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedMethod, setSelectedMethod] = useState("all")
    const [activeTab, setActiveTab] = useState("all")

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "default"
            case "pending":
                return "secondary"
            case "processing":
                return "outline"
            case "failed":
                return "destructive"
            default:
                return "secondary"
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4" />
            case "pending":
                return <Clock className="h-4 w-4" />
            case "processing":
                return <RefreshCw className="h-4 w-4" />
            case "failed":
                return <AlertCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const getMethodIcon = (method) => {
        switch (method) {
            case "stripe":
                return <CreditCard className="h-4 w-4" />
            case "paypal":
                return <Wallet className="h-4 w-4" />
            case "bank_transfer":
                return <DollarSign className="h-4 w-4" />
            default:
                return <CreditCard className="h-4 w-4" />
        }
    }

    const filteredPayments = paymentsData.filter((payment) => {
        const matchesSearch =
            payment.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus
        const matchesMethod = selectedMethod === "all" || payment.method === selectedMethod
        const matchesTab = activeTab === "all" || payment.status === activeTab

        return matchesSearch && matchesStatus && matchesMethod && matchesTab
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
                    <h1 className="text-3xl font-bold">Payments Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor and manage all payments, transactions, and financial operations.
                    </p>
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
                            <Button>
                                <DollarSign className="mr-2 h-4 w-4" />
                                Process Payment
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Process Manual Payment</DialogTitle>
                                <DialogDescription>Process a payment manually for a specific project or milestone.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">Project</label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="prj-001">E-commerce Website Development</SelectItem>
                                            <SelectItem value="prj-002">Mobile App UI/UX Design</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">Amount</label>
                                    <Input placeholder="$0.00" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">Method</label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="stripe">Stripe</SelectItem>
                                            <SelectItem value="paypal">PayPal</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Process Payment</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from last
                                month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Payments Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Payment Transactions</CardTitle>
                            <CardDescription>Monitor all payment transactions and their status</CardDescription>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search payments..."
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
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Methods</SelectItem>
                                    <SelectItem value="stripe">Stripe</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
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
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="processing">Processing</TabsTrigger>
                            <TabsTrigger value="failed">Failed</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Payment ID</TableHead>
                                        <TableHead>Project & Parties</TableHead>
                                        <TableHead>Amount & Fees</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPayments.map((payment) => (
                                        <TableRow key={payment.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">
                                                <div className="space-y-1">
                                                    <div className="font-mono text-sm">{payment.id}</div>
                                                    <Badge variant="outline" className="text-xs">
                                                        {payment.type.replace("_", " ")}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-2">
                                                    <div className="font-medium text-sm">{payment.projectTitle}</div>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={payment.client.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback className="text-xs">
                                                                {payment.client.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-xs text-muted-foreground">{payment.client.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={payment.freelancer.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback className="text-xs">
                                                                {payment.freelancer.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-xs text-muted-foreground">{payment.freelancer.name}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-semibold">{payment.amount}</div>
                                                    <div className="text-xs text-muted-foreground">Fee: {payment.fee}</div>
                                                    <div className="text-xs font-medium text-green-600">Net: {payment.netAmount}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getMethodIcon(payment.method)}
                                                    <span className="text-sm capitalize">{payment.method.replace("_", " ")}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusColor(payment.status)} className="flex items-center gap-1 w-fit">
                                                    {getStatusIcon(payment.status)}
                                                    {payment.status.toUpperCase()}
                                                </Badge>
                                                {payment.status === "failed" && payment.failureReason && (
                                                    <div className="text-xs text-red-600 mt-1">{payment.failureReason}</div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="text-sm">{formatDate(payment.createdAt)}</div>
                                                    {payment.completedAt && (
                                                        <div className="text-xs text-muted-foreground">
                                                            Completed: {formatDate(payment.completedAt)}
                                                        </div>
                                                    )}
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
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download Invoice
                                                        </DropdownMenuItem>
                                                        {payment.status === "failed" && (
                                                            <DropdownMenuItem>
                                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                                Retry Payment
                                                            </DropdownMenuItem>
                                                        )}
                                                        {payment.status === "pending" && (
                                                            <DropdownMenuItem>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Mark as Completed
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
