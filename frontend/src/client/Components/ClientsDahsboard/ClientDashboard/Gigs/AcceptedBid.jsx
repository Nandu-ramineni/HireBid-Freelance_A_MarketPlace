import { CheckCircle, Calendar, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar02Icon, CheckmarkCircle02Icon } from "hugeicons-react"


export default function AcceptedBid({ acceptedBid }) {
    if (!acceptedBid) return null

    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }

    const formatDate = (dateString) => {
        if (!dateString) return ""
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 mb-6 shadow-lg">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-30" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-100 rounded-full translate-y-12 -translate-x-12 opacity-20" />

            <div className="relative flex items-start gap-4">
                {/* Success Icon */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckmarkCircle02Icon className="w-7 h-7 text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                            <Award className="w-3 h-3 mr-1" />
                            Bid Accepted
                        </Badge>
                        <span className="text-sm text-emerald-600 font-medium">{formatDate(acceptedBid.acceptedAt)}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-emerald-900 mb-3">
                        Congratulations! Your project has been assigned
                    </h3>

                    {/* Freelancer Info */}
                    <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-emerald-100">
                        <Avatar className="w-10 h-10 border-2 border-emerald-200">
                            <AvatarImage src={acceptedBid.freelancer.profile || "/placeholder.svg"} />
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                                {getInitials(acceptedBid.freelancer.firstName, acceptedBid.freelancer.lastName)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                    {acceptedBid.freelancer.firstName} {acceptedBid.freelancer.lastName}
                                </span>
                                {acceptedBid.freelancer.rating && (
                                    <div className="flex items-center gap-1">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => {
                                                const isActive = i < Math.floor(acceptedBid.freelancer?.rating || 0);
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`w-3 h-3 ${isActive ? "text-yellow-400" : "text-gray-300"}`}
                                                    >
                                                        ★
                                                    </div>
                                                );
                                            })}

                                        </div>
                                        <span className="text-xs text-gray-600 ml-1">{acceptedBid.freelancer.rating}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">Selected Freelancer</p>
                        </div>

                        {acceptedBid.bid.amount && (
                            <div className="text-right">
                                <div className="text-lg font-bold text-emerald-700">₹{acceptedBid.bid.amount.toLocaleString()}</div>
                                <p className="text-xs text-gray-600">Project Value</p>
                            </div>
                        )}
                    </div>

                    {/* Next Steps */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-800">
                            <Calendar02Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">Next Steps</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">
                            The freelancer will contact you soon to discuss project details and timeline.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
