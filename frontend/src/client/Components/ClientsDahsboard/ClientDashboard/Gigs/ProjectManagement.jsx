
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction,  AlertDialogCancel,  AlertDialogContent,  AlertDialogDescription,  AlertDialogFooter,  AlertDialogHeader,  AlertDialogTitle,  AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import {   X,   CreditCard,   MessageSquare,   CheckCircle,   Clock,   DollarSign,   Calendar,   User,   FileText,   Send,   Phone,   Video,  Paperclip,   Star,   AlertCircle,   TrendingUp,   Download,} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { acceptBid, completeBid, getBidsByJobId } from "@/client/Redux/Actions/bidActions"
import { Calendar02Icon, Wallet02Icon } from "hugeicons-react"
import { toast, ToastContainer } from "react-toastify"
import { milestonePaymentCapture, payMilestones } from "@/client/Redux/Actions/paymentActions"
import { getClientGigs } from "@/client/Redux/Actions/jobActions"

export function ProjectManagement({ gig, isOpen, onClose }) {
    if (!gig) return null
    const dispatch = useDispatch()
    const [milestones, setMilestones] = useState(gig.milestones || [])
    const [message, setMessage] = useState("")
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(null)
    const [isSendingMessage, setIsSendingMessage] = useState(false)
    const { bidDetails, loading,error } = useSelector((state) => state.bids)
    const acceptedBid = bidDetails?.bids?.find((b) => b.bid.status === "accepted" || b.bid.status === "completed") || {}
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true); 

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };


    const handlePayMilestone = async ({amount, currency,  freelancerId, bidId, jobId, milestoneId}) => {
        try {
            const res = await loadRazorpayScript();
            if (!res) {
                toast.error("Razorpay SDK failed to load. Please try again later.");
                return;
            }
            const subResponse = await dispatch(payMilestones({amount, currency, freelancerId, bidId, jobId, milestoneId}));
            if (!subResponse) {
                toast.error("Failed to initiate payment. Please try again.");
                return;
            }
            const options = {
                key: 'rzp_test_kzINWtT3ElrntA',
                amount: amount * 100, 
                currency: 'INR',
                name: 'HireBid',
                description: 'Milestones Transaction',
                order_id: subResponse.orderId,
                handler: async (razorpayResponse) => {
                    const paymentDetails = {
                        orderId: subResponse.orderId,
                        razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                        razorpay_order_id: razorpayResponse.razorpay_order_id,
                        razorpay_signature: razorpayResponse.razorpay_signature
                    };
                    const razorpayPaymentId = razorpayResponse.razorpay_payment_id;
                    const razorpayOrderId = subResponse.orderId;
                    const razorpaySignature = razorpayResponse.razorpay_signature;
                    try {
                        await dispatch(milestonePaymentCapture({ razorpayOrderId, razorpayPaymentId, razorpaySignature }));
                        toast.success("Payment successful!");
                        dispatch(getClientGigs());
                    } catch (error) {
                        console.error('Error validating payment:', error);
                        toast.error(error.response?.data?.message || "Something went wrong");
                    }
                },
                prefill: {
                    name: acceptBid?.freelancer?.firstName + " " + acceptBid?.freelancer?.lastName,
                    email: acceptBid?.freelancer?.email || 'customer@example.com',
                    contact: acceptBid?.freelancer?.contact || '9999999999'
                },
                theme: {
                    color: '#8EC44C'
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
            
        } catch (error) {
            toast.error("An error occurred while processing payment. Please try again.");
        }
    }

    const handleSendMessage = async () => {
        if (!message.trim()) return

        setIsSendingMessage(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        setMessage("")
        setIsSendingMessage(false)
    }

    const completedMilestones = milestones.filter((m) => m.isPaid).length
    const totalMilestones = milestones.length
    const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0
    const totalPaid = milestones.filter((m) => m.isPaid).reduce((sum, m) => sum + m.amount, 0)
    const remainingAmount = gig.budget - totalPaid
    const invoices = milestones.filter((m) => m.isPaid).map((m) => ({
        id: m._id,
        description: m.description,
        amount: m.amount,
        invoiceUrl: m.invoice || "",
        date: m.date || new Date().toISOString(),
    }));
    useEffect(() => {
        if (gig?._id) {
            dispatch(getBidsByJobId(gig._id))
            setMilestones(gig.milestones || [])
        }
    }, [dispatch, gig])


    if (!isOpen) return null
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="relative flex items-center justify-center w-24 h-24">
                    {/* Circular spinning border */}
                    <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

                    {/* Your logo */}
                    <img
                        src="https://res.cloudinary.com/nanduvarma/image/upload/v1751466565/samples/Logo_n3lmxf.png"
                        alt="HireBid Logo"
                        className="w-12 h-12 z-10"
                    />
                </div>
            </div>
        )
    }

    const updateBidStatus = async (bidId, status) => {
    try {
        await dispatch(completeBid(bidId, status));
        toast.success("Bid marked as complete successfully!");
    } catch (error) {
        toast.error(error.response?.data?.error || error.response?.data?.message || "Something went wrong");
        console.error("Error:", error);
    }
};


    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={false} >
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto ">
                <DialogHeader>
                    <ToastContainer/>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                                <AvatarImage src={gig.image || "/placeholder.svg"} alt={gig.category} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg">
                                    {gig.category.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <section className="flex justify-between w-full ">
                            <div>
                                <DialogTitle className="text-2xl font-bold text-gray-900">{gig.title}</DialogTitle>
                                <DialogDescription className="text-gray-600 mt-1 w-full md:w-3/4">{gig.description}</DialogDescription>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                        {gig.status === "in-progress" ? "In Progress" : gig.status}
                                    </Badge>
                                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                                        {gig.category}
                                    </Badge>
                                </div>
                            </div>
                            <div className="pr-4">
                                    {acceptedBid?.bid?.status === "accepted" ? (
                                        <Button
                                            onClick={() => updateBidStatus(acceptedBid?.bid?._id, "completed")}
                                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                                        >
                                            Mark as Complete
                                        </Button>

                                    ):(
                                        <Button
                                            
                                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                                        >
                                            Bid Completed
                                        </Button>
                                    )}
                                </div>
                            </section>
                        </div>

                    </div>
                </DialogHeader>

                <div className="grid gap-6 lg:grid-cols-3 mt-6">
                    {/* Left Column - Project Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Project Overview */}
                        <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                    Project Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <Wallet02Icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-green-600">{formatCurrency(acceptedBid?.bid?.amount)}</div>
                                        <p className="text-sm text-gray-600">Total Budget</p>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <Calendar02Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-blue-600">{formatDate(gig.deadline)}</div>
                                        <p className="text-sm text-gray-600">Deadline</p>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</div>
                                        <p className="text-sm text-gray-600">Completed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Milestones Management */}
                        <Card className="border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        Milestones & Payments
                                    </CardTitle>
                                    <div className="text-sm text-gray-600">
                                        {completedMilestones}/{totalMilestones} completed
                                    </div>
                                </div>
                                <Progress value={progressPercentage} className="h-3" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {milestones.map((milestone, index) => (
                                    <div
                                        key={milestone._id}
                                        className={`p-4 rounded-lg border transition-all duration-200 ${milestone.isPaid
                                            ? "bg-green-50 border-green-200 shadow-sm"
                                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {milestone.isPaid ? (
                                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                                ) : (
                                                    <Clock className="h-6 w-6 text-gray-400" />
                                                )}
                                                <div>
                                                    <h4 className={`font-semibold ${milestone.isPaid ? "text-green-800" : "text-gray-700"}`}>
                                                        Milestone {index + 1}
                                                    </h4>
                                                    <p className={`text-sm ${milestone.isPaid ? "text-green-700" : "text-gray-600"}`}>
                                                        {milestone.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className={`text-lg font-bold ${milestone.isPaid ? "text-green-800" : "text-gray-700"}`}>
                                                        {formatCurrency(milestone.amount)}
                                                    </div>
                                                    {milestone.isPaid && (
                                                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                                            Paid
                                                        </Badge>
                                                    )}
                                                </div>
                                                {!milestone.isPaid && (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                                                disabled={isPaymentProcessing === milestone._id}
                                                            >
                                                                <CreditCard className="w-4 h-4 mr-2" />
                                                                {isPaymentProcessing === milestone._id ? "Processing..." : "Pay Now"}
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to pay {formatCurrency(milestone.amount)} for "
                                                                    {milestone.description}"? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handlePayMilestone({
                                                                        milestoneId: milestone._id,
                                                                        amount: milestone.amount,
                                                                        currency: "INR",
                                                                        freelancerId: acceptedBid?.freelancer?._id,
                                                                        bidId: acceptedBid?.bid?._id,
                                                                        jobId: gig._id,
                                                                    })}
                                                                    className="bg-gradient-to-r from-green-600 to-green-700"
                                                                >
                                                                    Confirm Payment
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Separator />

                                {/* Payment Summary */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-lg font-bold text-green-600">{formatCurrency(totalPaid)}</div>
                                            <p className="text-sm text-gray-600">Total Paid</p>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-orange-600">{formatCurrency(remainingAmount)}</div>
                                            <p className="text-sm text-gray-600">Remaining</p>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-blue-600">
                                                {completedMilestones}/{totalMilestones}
                                            </div>
                                            <p className="text-sm text-gray-600">Milestones Paid</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Files & Deliverables */}
                        <Card className="border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    Project Files & Invoices
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {invoices.length > 0 ? (
                                        invoices.map((invoice) => (
                                            <div key={invoice.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-semibold">{invoice.description}</h4>
                                                    <p className="text-sm text-gray-600">Amount: {formatCurrency(invoice.amount)}</p>
                                                    <p className="text-xs text-gray-500">Date: {formatDate(invoice.date)}</p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-2 bg-transparent"
                                                    onClick={() => window.open(invoice.invoiceUrl, "_blank")}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download Invoice
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center">No invoices or project files available.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Communication */}
                    <div className="space-y-6">
                        {/* Freelancer Info */}
                        <Card className="border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-purple-600" />
                                    Freelancer
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={acceptedBid?.freelancer?.profile || "/placeholder.svg?height=48&width=48"} />
                                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                            JD
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold">{acceptedBid?.freelancer?.firstName} {acceptedBid?.freelancer?.lastName}</h4>
                                        <p className="text-sm text-gray-600">Senior Developer</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-xs text-gray-600 ml-1">4.9 (127 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                        <Video className="w-4 h-4 mr-2" />
                                        Video
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Message */}
                        <Card className="border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-blue-600" />
                                    Send Message
                                </CardTitle>
                                <CardDescription>Communicate directly with your freelancer</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Type your message here..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="min-h-[100px] resize-none"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <Paperclip className="w-4 h-4 mr-2" />
                                        Attach
                                    </Button>
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim() || isSendingMessage}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        {isSendingMessage ? "Sending..." : "Send Message"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Messages */}
                        <Card className="border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Recent Messages</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                            <AvatarFallback className="text-xs">JD</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm">I've completed the first milestone. Please review the deliverables.</p>
                                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                            <AvatarFallback className="text-xs">You</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm">Great work! I'll review and provide feedback by tomorrow.</p>
                                            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Actions */}
                        <Card className="border-0 bg-gradient-to-r from-orange-50 to-red-50">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-orange-600" />
                                    Project Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Request Extension
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Generate Report
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                                    size="sm"
                                >
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    Report Issue
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
