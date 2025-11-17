import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Flag, Mail, MoreVerticalIcon, Paperclip, Pin, Smile, Star, UserIcon } from "lucide-react"
import { ChatWindow } from "./ChatWindow"
import { Call02Icon, Flag01Icon, Flag02Icon, InformationCircleIcon, Mail01Icon, Video01Icon } from "hugeicons-react"

import { ToastContainer , toast} from "react-toastify"



export function MessagingInterface({ selectedBid, onBack }) {
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
    const capitalizeUsername = (username) => {
        return username.charAt(0).toUpperCase() + username.slice(1);
    }

    return (
        <div className="mx-auto p-6 ">
            <ToastContainer/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Freelancer Profile Card */}
                <div className="lg:col-span-1">
                    <div className="mb-6">
                        <Button variant="secondary" onClick={onBack} className="flex items-center space-x-2 mb-4 bg-white">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Projects</span>
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">Project Interaction Panel</h1>
                    </div>
                    <Card className="sticky top-6  shadow-md">
                        <div className="absolute top-5 left-8 z-10 text-red-500 rotate-[-15deg]">
                            <Pin className="h-5 w-5" />
                        </div>

                        {/* Right Pin */}
                        <div className="absolute top-5 right-8 z-10 text-blue-500 rotate-[15deg]">
                            <Pin className="h-5 w-5" />
                        </div>
                        <CardHeader className="text-center">
                            <Avatar className="h-20 w-20 mx-auto mb-4">
                                <AvatarImage src={selectedBid.profile || "/placeholder.svg"} alt={selectedBid.firstName} />
                                <AvatarFallback className="text-lg">
                                    {selectedBid.firstName[0]}
                                    {selectedBid.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-xl">
                                {selectedBid.firstName} {selectedBid.lastName}
                            </CardTitle>
                            <p className="text-gray-600">@{selectedBid.username}</p>

                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Contact Information</h4>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Mail01Icon className="h-4 w-4 text-gray-500" />
                                    <span>{selectedBid.email}</span>
                                </div>
                            </div>

                            {/* <div>
                                <h4 className="font-semibold mb-2">Bio</h4>
                                <p className="text-sm text-gray-600">{selectedBid.bio}</p>
                            </div> */}

                            {/* <div>
                                <h4 className="font-semibold mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedBid.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div> */}

                            <div className="pt-4 border-t">
                                <h4 className="font-semibold mb-3">Project Details</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Project Title:</span>
                                        <span className="font-semibold">{selectedBid.bid.jobId.title}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Bid Amount:</span>
                                        <span className="font-semibold">{formatCurrency(selectedBid.bid.amount)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Project Budget:</span>
                                        <span>{formatCurrency(selectedBid.bid.jobId.budget)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Deadline:</span>
                                        <span>{formatDate(selectedBid.bid.jobId.deadline)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            {selectedBid.bid.jobId.status === "in-progress" ? "In Progress" : "Completed"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <button
                                    onClick={() => {
                                        toast.warn("Flagged this freelancer for review. Our team will look into it.")
                                    }}
                                    className="flex items-center justify-center m-auto gap-2 text-sm text-red-600 hover:underline font-medium"
                                >
                                    <Flag02Icon className="h-4 w-4" />
                                    Flag this freelancer
                                </button>
                            </div>


                            {/* <div className="pt-4 border-t">
                                <h4 className="font-semibold mb-2">Project Skills Required</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedBid.bid.jobId.skills.map((skill, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div> */}
                        </CardContent>
                    </Card>
                </div>

                {/* Chat Window */}
                <div className="lg:col-span-2">
                    <Card className="h-[620px] flex flex-col">
                        <div className="border-b px-4 py-3 ">
                            <div className="flex items-center justify-between m-auto">
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={selectedBid.profile || "/placeholder.svg"} alt={selectedBid.firstName} />
                                            <AvatarFallback className="text-lg">
                                                {selectedBid.firstName[0]}
                                                {selectedBid.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h1 className="text-base font-semibold">{selectedBid.firstName} {selectedBid.lastName}</h1>
                                            <p className="text-xs ">{capitalizeUsername(selectedBid.username)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="ghost" size="icon" className="text-gray-500">
                                        <Call02Icon className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-500">
                                        <Video01Icon className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-500">
                                        <MoreVerticalIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <CardContent className="flex-1 p-0">
                            <ChatWindow
                                key={`${selectedBid.bid.jobId._id}-${selectedBid.freelancerId}-${selectedBid.clientId}`}
                                jobId={selectedBid.bid.jobId._id}
                                freelancerId={selectedBid.freelancerId}
                                clientId={selectedBid.clientId}
                                freelancerName={`${selectedBid.firstName} ${selectedBid.lastName}`}
                                freelancerAvatar={selectedBid.profile}
                                initialMessage={selectedBid.bid.message}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
