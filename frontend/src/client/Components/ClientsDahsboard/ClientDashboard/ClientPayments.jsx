"use client"

import { useState } from "react"
import {
    Search,
    CreditCard,
    History,
    Eye,
    EyeOff,
    Copy,
    Check,
    Wallet,
    TrendingUp,
    Users,
    Calendar,
    Filter,
    Download,
    Plus,
    Edit3,
    Trash2,
    Star,
    Shield,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "IndusInd Bank",
    "Yes Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Punjab National Bank",
    "Union Bank of India",
    "Bank of India",
    "Central Bank of India",
    "Indian Overseas Bank",
    "UCO Bank",
    "Bank of Maharashtra",
    "Indian Bank",
    "Federal Bank",
    "South Indian Bank",
    "Karur Vysya Bank",
]

const paymentHistory = [
    {
        id: "PAY001",
        date: "2024-01-15",
        amount: 15000,
        status: "completed",
        project: "E-commerce Website Development",
        freelancer: "Rajesh Kumar",
        freelancerAvatar: "/placeholder.svg?height=32&width=32",
        method: "UPI",
        rating: 5,
        type: "project",
    },
    {
        id: "PAY002",
        date: "2024-01-12",
        amount: 8500,
        status: "completed",
        project: "Mobile App UI Design",
        freelancer: "Priya Sharma",
        freelancerAvatar: "/placeholder.svg?height=32&width=32",
        method: "Bank Transfer",
        rating: 4.8,
        type: "milestone",
    },
    {
        id: "PAY003",
        date: "2024-01-10",
        amount: 12000,
        status: "processing",
        project: "Logo Design & Branding",
        freelancer: "Amit Singh",
        freelancerAvatar: "/placeholder.svg?height=32&width=32",
        method: "UPI",
        rating: 4.9,
        type: "project",
    },
    {
        id: "PAY004",
        date: "2024-01-08",
        amount: 25000,
        status: "completed",
        project: "Full Stack Web Application",
        freelancer: "Sarah Johnson",
        freelancerAvatar: "/placeholder.svg?height=32&width=32",
        method: "Bank Transfer",
        rating: 5,
        type: "project",
    },
    {
        id: "PAY005",
        date: "2024-01-05",
        amount: 3500,
        status: "failed",
        project: "WordPress Theme Customization",
        freelancer: "Vikram Patel",
        freelancerAvatar: "/placeholder.svg?height=32&width=32",
        method: "UPI",
        rating: 4.2,
        type: "milestone",
    },
]

const savedPaymentMethods = [
    {
        id: 1,
        type: "upi",
        name: "Primary UPI",
        details: "john.doe@paytm",
        isDefault: true,
        lastUsed: "2024-01-15",
    },
    {
        id: 2,
        type: "bank",
        name: "HDFC Bank",
        details: "****1234",
        isDefault: false,
        lastUsed: "2024-01-10",
    },
]

export default function ClientPayments() {
    const [showAccountNumber, setShowAccountNumber] = useState(false)
    const [selectedBank, setSelectedBank] = useState("")
    const [bankOpen, setBankOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const [activeCard, setActiveCard] = useState(null)
    const [formData, setFormData] = useState({
        accountNumber: "",
        confirmAccountNumber: "",
        ifscCode: "",
        accountHolderName: "",
        upiId: "",
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const totalSpent = paymentHistory
        .filter((payment) => payment.status === "completed")
        .reduce((sum, payment) => sum + payment.amount, 0)

    const processingAmount = paymentHistory
        .filter((payment) => payment.status === "processing")
        .reduce((sum, payment) => sum + payment.amount, 0)

    const thisMonthSpent = 35500

    return (
        <div className="h-[91vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-y-scroll" style={{scrollbarWidth: "none"}}>
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>

                {/* Floating Geometric Shapes */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300 opacity-60"></div>
                <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-700 opacity-60"></div>
                <div className="absolute bottom-20 right-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce delay-1000 opacity-60"></div>

                {/* Moving Lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 p-4 md:p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Premium Header */}
                    <div className="text-center space-y-4 py-12">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-purple-200/50 shadow-lg">
                            <Wallet className="h-5 w-5 text-purple-600" />
                            <span className="text-sm text-slate-700 font-semibold">Payment Management</span>
                        </div>
                        <h1 className="text-6xl pb-4 font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Payment Dashboard
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Manage your payment methods and track transactions with freelancers seamlessly
                        </p>

                        {/* Decorative Elements */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-400"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-400"></div>
                        </div>
                    </div>

                    {/* Premium Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200/50 hover:border-emerald-300 transition-all duration-500 group hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-emerald-700 text-sm font-semibold">Total Spent</p>
                                        <p className="text-3xl font-bold text-emerald-800">₹{totalSpent.toLocaleString()}</p>
                                        <div className="flex items-center gap-1 text-emerald-600 text-xs">
                                            <ArrowUpRight className="h-3 w-3" />
                                            <span>+12% from last month</span>
                                        </div>
                                    </div>
                                    <div className="h-16 w-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <TrendingUp className="h-8 w-8 text-emerald-700" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200/50 hover:border-orange-300 transition-all duration-500 group hover:shadow-xl hover:shadow-orange-100/50 hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-orange-700 text-sm font-semibold">Processing</p>
                                        <p className="text-3xl font-bold text-orange-800">₹{processingAmount.toLocaleString()}</p>
                                        <div className="flex items-center gap-1 text-orange-600 text-xs">
                                            <Calendar className="h-3 w-3" />
                                            <span>2-3 business days</span>
                                        </div>
                                    </div>
                                    <div className="h-16 w-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <History className="h-8 w-8 text-orange-700" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200/50 hover:border-blue-300 transition-all duration-500 group hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-blue-700 text-sm font-semibold">This Month</p>
                                        <p className="text-3xl font-bold text-blue-800">₹{thisMonthSpent.toLocaleString()}</p>
                                        <div className="flex items-center gap-1 text-blue-600 text-xs">
                                            <ArrowDownRight className="h-3 w-3" />
                                            <span>-5% from last month</span>
                                        </div>
                                    </div>
                                    <div className="h-16 w-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <Calendar className="h-8 w-8 text-blue-700" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200/50 hover:border-purple-300 transition-all duration-500 group hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-purple-700 text-sm font-semibold">Active Projects</p>
                                        <p className="text-3xl font-bold text-purple-800">8</p>
                                        <div className="flex items-center gap-1 text-purple-600 text-xs">
                                            <Users className="h-3 w-3" />
                                            <span>6 freelancers</span>
                                        </div>
                                    </div>
                                    <div className="h-16 w-16 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <Users className="h-8 w-8 text-purple-700" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Premium Tabs */}
                    <Tabs defaultValue="payment-methods" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-md border border-slate-200/50 p-1 shadow-lg">
                            <TabsTrigger
                                value="payment-methods"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-700 font-semibold transition-all duration-300"
                            >
                                Payment Methods
                            </TabsTrigger>
                            <TabsTrigger
                                value="add-method"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-700 font-semibold transition-all duration-300"
                            >
                                Add New Method
                            </TabsTrigger>
                            <TabsTrigger
                                value="transaction-history"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-700 font-semibold transition-all duration-300"
                            >
                                Transaction History
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="payment-methods" className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-slate-800">Saved Payment Methods</h2>
                                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New Method
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedPaymentMethods.map((method) => (
                                    <Card
                                        key={method.id}
                                        className={`bg-white/80 backdrop-blur-md border-slate-200/50 hover:border-purple-300 transition-all duration-500 cursor-pointer group hover:shadow-xl hover:-translate-y-1 ${method.isDefault ? "ring-2 ring-purple-400/50 shadow-lg shadow-purple-100/50" : ""
                                            }`}
                                        onMouseEnter={() => setActiveCard(method.id)}
                                        onMouseLeave={() => setActiveCard(null)}
                                    >
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg ${method.type === "upi"
                                                                ? "bg-gradient-to-br from-green-100 to-emerald-200"
                                                                : "bg-gradient-to-br from-blue-100 to-indigo-200"
                                                            }`}
                                                    >
                                                        {method.type === "upi" ? (
                                                            <Zap className="h-7 w-7 text-green-600" />
                                                        ) : (
                                                            <CreditCard className="h-7 w-7 text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800">{method.name}</h3>
                                                        <p className="text-sm text-slate-600">{method.details}</p>
                                                    </div>
                                                </div>
                                                {method.isDefault && (
                                                    <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300">
                                                        <Star className="h-3 w-3 mr-1 fill-current" />
                                                        Default
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span>Last used: {new Date(method.lastUsed).toLocaleDateString()}</span>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Add New Card */}
                                <Card className="bg-white/60 backdrop-blur-md border-slate-200/50 border-dashed hover:border-purple-300 transition-all duration-500 cursor-pointer group hover:shadow-xl hover:-translate-y-1">
                                    <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-4 min-h-[180px]">
                                        <div className="h-14 w-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <Plus className="h-7 w-7 text-slate-600" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-bold text-slate-700">Add New Method</h3>
                                            <p className="text-sm text-slate-500">Bank account or UPI</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="add-method">
                            <Card className="bg-white/80 backdrop-blur-md border-slate-200/50 shadow-xl">
                                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg border-b border-slate-200/50">
                                    <CardTitle className="flex items-center gap-2 text-slate-800">
                                        <Shield className="h-6 w-6 text-purple-600" />
                                        Add Payment Method
                                    </CardTitle>
                                    <CardDescription className="text-slate-600">
                                        Add your bank account or UPI details for secure payments
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Bank Details Section */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                                                <CreditCard className="h-6 w-6 text-blue-600" />
                                                <h3 className="text-xl font-bold text-slate-800">Bank Account Details</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="accountHolderName" className="text-slate-700 font-semibold">
                                                        Account Holder Name
                                                    </Label>
                                                    <Input
                                                        id="accountHolderName"
                                                        placeholder="Enter full name as per bank records"
                                                        value={formData.accountHolderName}
                                                        onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                                                        className="bg-white/80 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-purple-400 focus:bg-white transition-all duration-300"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="accountNumber" className="text-slate-700 font-semibold">
                                                        Account Number
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="accountNumber"
                                                            type={showAccountNumber ? "text" : "password"}
                                                            placeholder="Enter account number"
                                                            value={formData.accountNumber}
                                                            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                                                            className="bg-white/80 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-purple-400 focus:bg-white pr-12 transition-all duration-300"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-0 top-0 h-full px-3 hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                                                            onClick={() => setShowAccountNumber(!showAccountNumber)}
                                                        >
                                                            {showAccountNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="confirmAccountNumber" className="text-slate-700 font-semibold">
                                                        Confirm Account Number
                                                    </Label>
                                                    <Input
                                                        id="confirmAccountNumber"
                                                        type="text"
                                                        placeholder="Re-enter account number"
                                                        value={formData.confirmAccountNumber}
                                                        onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value)}
                                                        className="bg-white/80 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-purple-400 focus:bg-white transition-all duration-300"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-slate-700 font-semibold">Bank Name</Label>
                                                    <Popover open={bankOpen} onOpenChange={setBankOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={bankOpen}
                                                                className="w-full justify-between bg-white/80 border-slate-300 text-slate-800 hover:bg-white hover:border-purple-400 transition-all duration-300"
                                                            >
                                                                {selectedBank || "Select bank..."}
                                                                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0 bg-white/95 backdrop-blur-md border-slate-200">
                                                            <Command className="bg-transparent">
                                                                <CommandInput placeholder="Search banks..." className="text-slate-800" />
                                                                <CommandList>
                                                                    <CommandEmpty className="text-slate-600">No bank found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {banks.map((bank) => (
                                                                            <CommandItem
                                                                                key={bank}
                                                                                value={bank}
                                                                                onSelect={(currentValue) => {
                                                                                    setSelectedBank(currentValue === selectedBank ? "" : bank)
                                                                                    setBankOpen(false)
                                                                                }}
                                                                                className="text-slate-800 hover:bg-purple-50"
                                                                            >
                                                                                {bank}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="ifscCode" className="text-slate-700 font-semibold">
                                                        IFSC Code
                                                    </Label>
                                                    <Input
                                                        id="ifscCode"
                                                        placeholder="Enter IFSC code"
                                                        value={formData.ifscCode}
                                                        onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                                                        className="bg-white/80 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-purple-400 focus:bg-white transition-all duration-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* UPI Section */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                                                <Zap className="h-6 w-6 text-green-600" />
                                                <h3 className="text-xl font-bold text-slate-800">UPI Details</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="upiId" className="text-slate-700 font-semibold">
                                                        UPI ID
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="upiId"
                                                            placeholder="yourname@paytm / yourname@gpay"
                                                            value={formData.upiId}
                                                            onChange={(e) => handleInputChange("upiId", e.target.value)}
                                                            className="bg-white/80 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-green-400 focus:bg-white pr-12 transition-all duration-300"
                                                        />
                                                        {formData.upiId && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="absolute right-0 top-0 h-full px-3 hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                                                                onClick={() => copyToClipboard(formData.upiId)}
                                                            >
                                                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500">Enter your UPI ID for instant payments</p>
                                                </div>

                                                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200/50 space-y-4">
                                                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                        <Shield className="h-5 w-5 text-purple-600" />
                                                        Payment Security
                                                    </h4>
                                                    <div className="space-y-3 text-sm text-slate-700">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span>Bank Transfer: 1-3 business days</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span>UPI: Instant transfer</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span>256-bit SSL encryption</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                                            <span>PCI DSS compliant</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6 border-t border-slate-200">
                                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                            <Shield className="h-5 w-5 mr-2" />
                                            Save Payment Method
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="transaction-history">
                            <Card className="bg-white/80 backdrop-blur-md border-slate-200/50 shadow-xl">
                                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg border-b border-slate-200/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2 text-slate-800">
                                                <History className="h-6 w-6 text-slate-600" />
                                                Transaction History
                                            </CardTitle>
                                            <CardDescription className="text-slate-600">
                                                Track all payments made to freelancers
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-white/80 border-slate-300 text-slate-700 hover:bg-white hover:border-purple-400 transition-all duration-300"
                                            >
                                                <Filter className="h-4 w-4 mr-2" />
                                                Filter
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-white/80 border-slate-300 text-slate-700 hover:bg-white hover:border-purple-400 transition-all duration-300"
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                Export
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-slate-50/80 border-slate-200 hover:bg-slate-50">
                                                    <TableHead className="font-bold text-slate-800">Transaction</TableHead>
                                                    <TableHead className="font-bold text-slate-800">Freelancer</TableHead>
                                                    <TableHead className="font-bold text-slate-800">Project</TableHead>
                                                    <TableHead className="font-bold text-slate-800">Amount</TableHead>
                                                    <TableHead className="font-bold text-slate-800">Method</TableHead>
                                                    <TableHead className="font-bold text-slate-800">Status</TableHead>
                                                    <TableHead className="font-bold text-slate-800">Rating</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {paymentHistory.map((payment) => (
                                                    <TableRow
                                                        key={payment.id}
                                                        className="border-slate-200 hover:bg-slate-50/50 transition-colors duration-200"
                                                    >
                                                        <TableCell className="font-mono text-sm text-slate-700">
                                                            <div className="space-y-1">
                                                                <div className="font-semibold">{payment.id}</div>
                                                                <div className="text-xs text-slate-500">
                                                                    {new Date(payment.date).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-10 w-10 ring-2 ring-purple-100">
                                                                    <AvatarImage src={payment.freelancerAvatar || "/placeholder.svg"} />
                                                                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 text-xs font-semibold">
                                                                        {payment.freelancer
                                                                            .split(" ")
                                                                            .map((n) => n[0])
                                                                            .join("")}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-slate-800 font-semibold">{payment.freelancer}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="max-w-[200px]">
                                                            <div className="space-y-1">
                                                                <div className="text-slate-800 font-semibold truncate">{payment.project}</div>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-xs border-slate-300 text-slate-600 bg-slate-50"
                                                                >
                                                                    {payment.type}
                                                                </Badge>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="font-bold text-slate-800 text-lg">
                                                            ₹{payment.amount.toLocaleString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                {payment.method === "UPI" ? (
                                                                    <Zap className="h-4 w-4 text-green-600" />
                                                                ) : (
                                                                    <CreditCard className="h-4 w-4 text-blue-600" />
                                                                )}
                                                                <span className="text-slate-700 font-medium">{payment.method}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="outline"
                                                                className={
                                                                    payment.status === "completed"
                                                                        ? "bg-green-50 text-green-700 border-green-300"
                                                                        : payment.status === "processing"
                                                                            ? "bg-orange-50 text-orange-700 border-orange-300"
                                                                            : "bg-red-50 text-red-700 border-red-300"
                                                                }
                                                            >
                                                                {payment.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                                <span className="text-slate-700 font-semibold">{payment.rating}</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
