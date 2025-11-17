"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Filter,
    Download,
    TrendingUp,
    DollarSign,
    CreditCard,
    RefreshCw,
} from "lucide-react"

const transactionsData = [
    {
        id: "TXN-001",
        type: "payment_in",
        description: "Project payment from TechCorp Inc.",
        amount: "$4,800",
        fee: "$240",
        netAmount: "$4,560",
        status: "completed",
        method: "stripe",
        from: "TechCorp Inc.",
        to: "Alice Johnson",
        projectId: "PRJ-001",
        timestamp: "2024-01-15T11:45:00Z",
        reference: "pi_1234567890",
        currency: "USD",
    },
    {
        id: "TXN-002",
        type: "withdrawal",
        description: "Freelancer withdrawal to bank account",
        amount: "$2,850",
        fee: "$15",
        netAmount: "$2,835",
        status: "processing",
        method: "bank_transfer",
        from: "Platform Wallet",
        to: "Bob Smith",
        projectId: null,
        timestamp: "2024-01-15T10:30:00Z",
        reference: "wd_0987654321",
        currency: "USD",
    },
    {
        id: "TXN-003",
        type: "refund",
        description: "Refund for cancelled project",
        amount: "$750",
        fee: "$0",
        netAmount: "$750",
        status: "completed",
        method: "stripe",
        from: "Platform",
        to: "BlogMaster",
        projectId: "PRJ-003",
        timestamp: "2024-01-14T16:20:00Z",
        reference: "re_1122334455",
        currency: "USD",
    },
    {
        id: "TXN-004",
        type: "fee_collection",
        description: "Platform fee collection",
        amount: "$110",
        fee: "$0",
        netAmount: "$110",
        status: "completed",
        method: "automatic",
        from: "Fashion Brand Co.",
        to: "Platform",
        projectId: "PRJ-004",
        timestamp: "2024-01-14T14:15:00Z",
        reference: "fee_5566778899",
        currency: "USD",
    },
]

const stats = [
    {
        title: "Total Volume",
        value: "$245,680",
        change: "+18.2%",
        trend: "up",
        icon: TrendingUp,
        color: "blue",
    },
    {
        title: "Successful Transactions",
        value: "1,847",
        change: "+12.5%",
        trend: "up",
        icon: ArrowUpRight,
        color: "green",
    },
    {
        title: "Processing",
        value: "23",
        change: "+5.7%",
        trend: "up",
        icon: RefreshCw,
        color: "yellow",
    },
    {
        title: "Failed Transactions",
        value: "12",
        change: "-8.3%",
        trend: "down",
        icon: ArrowDownLeft,
        color: "red",
    },
]

export function TransactionsManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")

    const getTypeColor = (type) => {
        switch (type) {
            case "payment_in":
                return "default"
            case "withdrawal":
                return "secondary"
            case "refund":
                return "outline"
            case "fee_collection":
                return "destructive"
            default:
                return "secondary"
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case "payment_in":
                return <ArrowDownLeft className="h-4 w-4 text-green-600" />
            case "withdrawal":
                return <ArrowUpRight className="h-4 w-4 text-blue-600" />
            case "refund":
                return <RefreshCw className="h-4 w-4 text-orange-600" />
            case "fee_collection":
                return <DollarSign className="h-4 w-4 text-purple-600" />
            default:
                return <DollarSign className="h-4 w-4" />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "default"
            case "processing":
                return "secondary"
            case "failed":
                return "destructive"
            case "pending":
                return "outline"
            default:
                return "secondary"
        }
    }

    const filteredTransactions = transactionsData.filter((transaction) => {
        const matchesSearch =
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = selectedType === "all" || transaction.type === selectedType
        const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus

        return matchesSearch && matchesType && matchesStatus
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
                    <h1 className="text-3xl font-bold">Transactions Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor all financial transactions, transfers, and platform activities.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
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
                                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from last
                                month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Transactions Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>Complete record of all financial transactions on the platform</CardDescription>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="payment_in">Payment In</SelectItem>
                                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                                    <SelectItem value="refund">Refund</SelectItem>
                                    <SelectItem value="fee_collection">Fee Collection</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Type & Description</TableHead>
                                <TableHead>From → To</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Reference</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id} className="hover:bg-muted/50">
                                    <TableCell className="font-mono text-sm font-medium">{transaction.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(transaction.type)}
                                            <div>
                                                <Badge variant={getTypeColor(transaction.type)} className="mb-1">
                                                    {transaction.type.replace("_", " ").toUpperCase()}
                                                </Badge>
                                                <div className="text-sm text-muted-foreground">{transaction.description}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium">{transaction.from}</div>
                                            <div className="text-xs text-muted-foreground">↓</div>
                                            <div className="text-sm font-medium">{transaction.to}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-semibold">{transaction.amount}</div>
                                            {transaction.fee !== "$0" && (
                                                <div className="text-xs text-muted-foreground">Fee: {transaction.fee}</div>
                                            )}
                                            <div className="text-xs font-medium text-green-600">Net: {transaction.netAmount}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {transaction.method === "stripe" && <CreditCard className="h-4 w-4" />}
                                            {transaction.method === "bank_transfer" && <DollarSign className="h-4 w-4" />}
                                            {transaction.method === "automatic" && <RefreshCw className="h-4 w-4" />}
                                            <span className="text-sm capitalize">{transaction.method.replace("_", " ")}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusColor(transaction.status)}>{transaction.status.toUpperCase()}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{formatDate(transaction.timestamp)}</TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">{transaction.reference}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
