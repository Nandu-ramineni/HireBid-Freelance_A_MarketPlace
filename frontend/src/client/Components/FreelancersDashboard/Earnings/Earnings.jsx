import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Wallet,
    TrendingUp,
    DollarSign,
    CreditCard,
    BanknoteIcon as Bank,
    Plus,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    CheckCircle,
    Clock,
    AlertCircle,
    Edit,
    Trash2,
    IndianRupee,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getFreelancerFinancialOverview, getFreelancerTransactionHistory } from "@/client/Redux/Actions/jobActions"
import { toast, ToastContainer } from "react-toastify"
import { ArrowDownLeft01Icon, Calendar03Icon, Clock01Icon, DownloadCircle01Icon, Wallet01Icon } from "hugeicons-react"



const mockBankAccounts = [
    {
        id: "1",
        bankName: "State Bank of India",
        accountNumber: "****1234",
        accountType: "Savings",
        isDefault: true,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxDUPSOY0c4zGBZlQ9bvJwfAGcphuXMDdwQ&s"
    },
    {
        id: "2",
        bankName: "HDFC Bank",
        accountNumber: "****5678",
        accountType: "Current",
        isDefault: false,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSquouX3qJzp6uZwleCOtTBppHfDKlN6vDHg&s"
    },
]

const Earnings = ({ financialOverview, paymentHistory }) => {
    const dispatch = useDispatch();
    const [bankAccounts, setBankAccounts] = useState(mockBankAccounts)
    const [showAddBankDialog, setShowAddBankDialog] = useState(false)
    const [withdrawAmount, setWithdrawAmount] = useState(financialOverview?.data?.availableToWithdraw || "")
    const transactions = paymentHistory?.data || []
    console.log("Payment History:", paymentHistory);

    const handleWithdraw = () => {
        if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0) {
            toast.error("Please enter a valid amount")
            return
        }
        if (Number.parseFloat(withdrawAmount) > financialOverview?.data?.availableToWithdraw) {
            toast.error("Insufficient balance")
            return
        }
        toast.success("Withdrawal request submitted successfully")
        setWithdrawAmount("")
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getTransactionIcon = (type, status) => {
        if (status === "pending") return <Clock01Icon className="w-4 h-4 text-amber-500" />
        if (type === "credit") return <ArrowDownLeft01Icon className="w-4 h-4 text-emerald-500" />
        return <ArrowUpRight className="w-4 h-4 text-blue-500" />
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return (
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
                        Completed
                    </Badge>
                )
            case "pending":
                return (
                    <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300">
                        Pending
                    </Badge>
                )
            default:
                return <Badge variant="secondary">Unknown</Badge>
        }
    }

    return (
        <div className="h-[90vh] bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Wallet className="w-4 h-4" />
                        Earnings Dashboard
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-800 dark:from-slate-100 dark:via-emerald-200 dark:to-teal-200 bg-clip-text text-transparent mb-4">
                        Financial Overview
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Manage your earnings, track payments, and handle withdrawals seamlessly
                    </p>
                </div>

                {/* Earnings Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 border-0 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Wallet01Icon className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-emerald-200" />
                            </div>
                            <p className="text-emerald-100 text-sm font-medium mb-1">Total Earnings</p>
                            <p className="text-3xl font-bold">{formatCurrency(financialOverview?.data?.totalEarnings || 0)}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <IndianRupee className="w-6 h-6" />
                                </div>
                                <CheckCircle className="w-5 h-5 text-blue-200" />
                            </div>
                            <p className="text-blue-100 text-sm font-medium mb-1">Available Balance</p>
                            <p className="text-3xl font-bold">{formatCurrency(financialOverview?.data?.availableToWithdraw || 0)}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-0 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Clock01Icon className="w-6 h-6" />
                                </div>
                                <AlertCircle className="w-5 h-5 text-amber-200" />
                            </div>
                            <p className="text-amber-100 text-sm font-medium mb-1">Pending Payments</p>
                            <p className="text-3xl font-bold">{formatCurrency(financialOverview?.data?.pendingPayments || 0)}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Calendar03Icon className="w-6 h-6" />
                                </div>
                                <div className="text-purple-200 text-xs">
                                    +
                                    {(
                                        ((financialOverview?.data?.thisMonthEarnings - financialOverview?.data?.lastMonthEarnings) /
                                            financialOverview?.data?.totalEarnings) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </div>
                            </div>
                            <p className="text-purple-100 text-sm font-medium mb-1">This Month</p>
                            <p className="text-3xl font-bold">{formatCurrency(financialOverview?.data?.thisMonthEarnings || 0)}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="transactions" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg">
                        <TabsTrigger
                            value="transactions"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
                        >
                            Transactions
                        </TabsTrigger>
                        <TabsTrigger
                            value="withdraw"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                        >
                            Withdraw Funds
                        </TabsTrigger>
                        <TabsTrigger
                            value="bank-accounts"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                        >
                            Bank Accounts
                        </TabsTrigger>
                    </TabsList>

                    {/* Transactions Tab */}
                    {/* Transactions Tab */}
                    <TabsContent value="transactions" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Transaction History</h2>
                            <Button variant="outline" className="gap-2 bg-transparent">
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <Card
                                    key={transaction.id}
                                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                                                    {getTransactionIcon(transaction?.type, transaction?.status)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                        {transaction?.jobTitle} | {transaction?.milestoneDescription}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        • {transaction?.clientName} • {transaction?.paymentMethod} • {formatDate(transaction?.paidAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-2">
                                                <p
                                                    className={`text-lg font-bold mb-1 ${transaction?.type === "credit"
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : transaction?.type === "failed"
                                                            ? "text-red-600 dark:text-red-400"
                                                            : "text-yellow-600 dark:text-yellow-400"
                                                        }`}
                                                >
                                                    {transaction?.type === "credit" ? "+" : "-"}
                                                    {formatCurrency(transaction?.amount)}
                                                </p>
                                                {getStatusBadge(transaction?.status)}
                                                {transaction?.invoice && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-1 mt-1"
                                                        onClick={() => window.open(transaction.invoice, "_blank")}
                                                    >
                                                        <DownloadCircle01Icon className="w-4 h-4" />
                                                        Invoice
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>


                    {/* Withdraw Tab */}
                    <TabsContent value="withdraw" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5" />
                                        Withdraw Funds
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <Label htmlFor="amount">Withdrawal Amount</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            Available balance: {formatCurrency(financialOverview?.data?.availableToWithdraw)}
                                        </p>
                                    </div>

                                    <div>
                                        <Label>Select Bank Account</Label>
                                        <Select>
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Choose bank account" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bankAccounts.map((account) => (
                                                    <SelectItem key={account.id} value={account.id}>
                                                        {account.bankName} - {account.accountNumber}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        onClick={handleWithdraw}
                                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                                    >
                                        Withdraw Funds
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-0">
                                <CardHeader>
                                    <CardTitle className="text-blue-900 dark:text-blue-100">Withdrawal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                                        <span className="text-blue-700 dark:text-blue-300">Processing Time</span>
                                        <span className="font-semibold text-blue-900 dark:text-blue-100">1-3 Business Days</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                                        <span className="text-blue-700 dark:text-blue-300">Minimum Amount</span>
                                        <span className="font-semibold text-blue-900 dark:text-blue-100">₹500</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                                        <span className="text-blue-700 dark:text-blue-300">Transaction Fee</span>
                                        <span className="font-semibold text-blue-900 dark:text-blue-100">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-blue-700 dark:text-blue-300">Daily Limit</span>
                                        <span className="font-semibold text-blue-900 dark:text-blue-100">₹1,00,000</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Bank Accounts Tab */}
                    <TabsContent value="bank-accounts" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Bank Accounts</h2>
                            <Dialog open={showAddBankDialog} onOpenChange={setShowAddBankDialog}>
                                <DialogTrigger asChild>
                                    <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                        <Plus className="w-4 h-4" />
                                        Add Bank Account
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Add Bank Account</DialogTitle>
                                        <DialogDescription>Add a new bank account for receiving payments</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="bankName">Bank Name</Label>
                                            <Input id="bankName" placeholder="Enter bank name" className="mt-2" />
                                        </div>
                                        <div>
                                            <Label htmlFor="accountNumber">Account Number</Label>
                                            <Input id="accountNumber" placeholder="Enter account number" className="mt-2" />
                                        </div>
                                        <div>
                                            <Label htmlFor="ifscCode">IFSC Code</Label>
                                            <Input id="ifscCode" placeholder="Enter IFSC code" className="mt-2" />
                                        </div>
                                        <div>
                                            <Label htmlFor="accountType">Account Type</Label>
                                            <Select>
                                                <SelectTrigger className="mt-2">
                                                    <SelectValue placeholder="Select account type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="savings">Savings</SelectItem>
                                                    <SelectItem value="current">Current</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button
                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                            onClick={() => {
                                                toast.success("Bank account added successfully")
                                                setShowAddBankDialog(false)
                                            }}
                                        >
                                            Add Account
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bankAccounts.map((account) => (
                                <Card
                                    key={account.id}
                                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-1 rounded-xl">
                                                    <img
                                                        src={account.logo}
                                                        alt={`${account.bankName} logo`}
                                                        className="w-12 h-12 object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{account.bankName}</h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{account.accountType} Account</p>
                                                </div>
                                            </div>
                                            {account.isDefault && (
                                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
                                                    Default
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Account Number</p>
                                            <p className="font-mono text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                {account.accountNumber}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Earnings
