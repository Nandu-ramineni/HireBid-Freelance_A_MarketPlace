import { getClientInvoices } from "@/client/Redux/Actions/jobActions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Download, FileText, IndianRupee } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Logo from "@/assets/logos/Logo.png"


export default function Invoices() {
    const dispatch = useDispatch()
    const { invoicesData, loading, error } = useSelector((state) => state.getJobs)
    useEffect(() => {
        dispatch(getClientInvoices());
    }, [dispatch]);
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F2F4F7]">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        {/* Spinning Border */}
                        <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        {/* Centered Image */}
                        <div className="flex items-center justify-center w-full h-full">
                            <img src={Logo} alt="Logo" className="w-8 h-8" />
                        </div>
                    </div>
                    <p className="text-muted-foreground">Generating Invoices...</p>
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <div className="text-center space-y-2">
                    <p className="text-red-600 font-semibold">Error loading invoices</p>
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800 hover:bg-green-100"
            case "in-progress":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100"
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-4 h-4" />
            case "in-progress":
                return <Clock className="w-4 h-4" />
            default:
                return null
        }
    }

    const handleDownload = (invoiceUrl, jobTitle, milestoneDescription) => {
        const link = document.createElement("a")
        link.href = invoiceUrl
        link.download = `${jobTitle.replace(/[^a-zA-Z0-9]/g, "_")}_${milestoneDescription.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const totalEarnings = invoicesData?.invoices?.reduce((total, job) => {
        return (
            total +
            job.milestones.reduce((jobTotal, milestone) => {
                return jobTotal + (milestone.isPaid ? milestone.amount : 0)
            }, 0)
        )
    }, 0)

    const totalInvoices = invoicesData?.invoices?.reduce((total, job) => {
        return total + job.milestones.length
    }, 0)




    return (
        <div className="h-[90vh] overflow-y-scroll bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8" style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 #f3f4f6" }}>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-slate-900">Invoice Dashboard</h1>
                    <p className="text-slate-600 text-lg">Manage and download your project invoices</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <IndianRupee className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                                    <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalEarnings)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Invoices</p>
                                    <p className="text-2xl font-bold text-slate-900">{totalInvoices}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Active Projects</p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {invoicesData?.invoices?.filter((job) => job.status === "in-progress").length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Invoices List */}
                <div className="space-y-6">
                    {invoicesData?.invoices?.map((job) => (
                        <Card key={job.jobId} className="bg-white shadow-lg border-0 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                                    <div className="space-y-1 flex items-center gap-4">
                                        <div>
                                            <img src={job.image} alt={job.title} className="w-12 h-12 p-1 rounded-md object-contain shadow-sm bg-gradient-to-br from-slate-50 to-slate-100" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-slate-900">{job.title}</CardTitle>
                                            
                                        </div>
                                    </div>
                                    <Badge className={`${getStatusColor(job.status)} flex items-center space-x-1 w-fit`}>
                                        {getStatusIcon(job.status)}
                                        <span className="capitalize">{job.status.replace("-", " ")}</span>
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-slate-900 mb-4">Milestones & Invoices</h4>

                                    {job.milestones.map((milestone, index) => (
                                        <div key={index} className="space-y-4">
                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 p-4 bg-slate-50 rounded-lg">
                                                <div className="flex-1 space-y-2">
                                                    <p className="font-medium text-slate-900">{milestone.description}</p>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex items-center space-x-1">
                                                            <IndianRupee className="w-4 h-4 text-slate-600" />
                                                            <span className="font-semibold text-slate-900">{formatCurrency(milestone.amount)}</span>
                                                        </div>
                                                        <Badge
                                                            className={
                                                                milestone.isPaid
                                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                                                            }
                                                        >
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            {milestone.isPaid ? "Paid" : "Pending"}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => handleDownload(milestone.invoice, job.title, milestone.description)}
                                                    className="bg-emerald-600 text-white hover:bg-emerald-700 flex items-center space-x-2"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    <span>Download Invoice</span>
                                                </Button>
                                            </div>

                                            {index < job.milestones.length - 1 && <Separator className="my-4" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center py-8">
                    <p className="text-slate-500">All invoices are automatically generated and available for download</p>
                </div>
            </div>
        </div>
    )
}
