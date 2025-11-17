import { getFreelancerBids } from "@/client/Redux/Actions/bidActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, CheckCircle, Clock, Eye, XCircle } from "lucide-react";
import { Wallet01Icon } from "hugeicons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bids, loading } = useSelector(state => state.bids);

    useEffect(() => {
        dispatch(getFreelancerBids());
    }, [dispatch]);

    const handleGigDetails = (bid) => {
        if (bid.status === "accepted") {
            navigate(`/freelancer-dashboard/bids/${bid._id}`);
        } else {
            toast.info("Your gig is still in review.");
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "accepted":
                return <CheckCircle className="w-4 h-4" />
            case "rejected":
                return <XCircle className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }
    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
            case "rejected":
                return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
            default:
                return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Skeleton className="h-12 w-64 mx-auto mb-4" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-12 h-12 rounded-xl" />
                                        <div className="flex-1">
                                            <Skeleton className="h-6 w-48 mb-2" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <Skeleton className="h-8 w-20 rounded-full" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-16 w-full mb-4" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="h-[91vh] overflow-y-scroll  dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 py-6 pb-20" style={{ scrollbarWidth: "thin", }}>
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className=" flex items-start justify-between pb-8 ">
                    <div>
                        <h1 className="text-3xl md:text-4xl   font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent pb-2 ">
                            Project Proposals
                        </h1>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Track your submitted proposals and manage your active projects in one place
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium ">
                        <Wallet01Icon className="w-4 h-4" />
                        My Active Bids
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Total Bids</p>
                                    <p className="text-3xl font-bold">{bids.length}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Eye className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium">Accepted</p>
                                    <p className="text-3xl font-bold">{bids.filter((bid) => bid.status === "accepted").length}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-amber-100 text-sm font-medium">Pending</p>
                                    <p className="text-3xl font-bold">{bids.filter((bid) => bid.status === "pending").length}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Clock className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bids Grid */}
                {bids.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {bids.map((bid) => (
                            <Card
                                key={bid._id}
                                onClick={() => handleGigDetails(bid)}
                                className="group cursor-pointer bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <CardHeader className="relative z-10 pb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <img
                                                src={bid.jobId?.image || "/placeholder.svg?height=48&width=48"}
                                                alt="Project"
                                                className="w-14 h-14 object-contain rounded-xl border-2 border-slate-200 dark:border-slate-700 group-hover:border-emerald-400 dark:group-hover:border-blue-600 transition-colors duration-300"
                                            />
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-1 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                                {bid.jobId.title}
                                            </CardTitle>
                                            <Badge
                                                variant="secondary"
                                                className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                            >
                                                {bid.jobId.category}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
                                            <Wallet01Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                            <span className="font-bold text-emerald-700 dark:text-emerald-300">
                                                ₹{bid.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="relative z-10 pt-0">
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 h-10">
                                        {bid.jobId.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                            <CalendarDays className="w-4 h-4" />
                                            <span>Submitted {formatDate(bid.createdAt)}</span>
                                        </div>

                                        <Badge
                                            className={`flex items-center gap-1.5 px-3 py-1 font-medium border ${getStatusColor(bid.status)}`}
                                        >
                                            {getStatusIcon(bid.status)}
                                            <span className="capitalize">{bid.status}</span>
                                        </Badge>
                                    </div>
                                    <Button
                                        disabled={bid.status !== "accepted"}
                                        className="w-full mt-4 bg-emerald-600 text-white hover:bg-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleGigDetails(bid)
                                        }}
                                    >
                                        View Project Details
                                    </Button>

                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Eye className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No bids found</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">Start bidding on projects to see them here</p>
                        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                            Browse Projects
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects;
