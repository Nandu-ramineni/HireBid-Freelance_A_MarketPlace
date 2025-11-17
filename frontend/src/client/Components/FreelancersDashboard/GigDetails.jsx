import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getBidDetails } from "@/client/Redux/Actions/bidActions"
import { useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Album01Icon, Attachment01Icon, Location01Icon, SentIcon } from "hugeicons-react"
import { getChats, sentMessage } from "@/client/Redux/Actions/chatActions"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import io from "socket.io-client";

const socket = io("http://localhost:9000");



const GigDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { bidDetails, loading } = useSelector((state) => state.bids)
    const [message, setMessage] = useState("")
    const { messages } = useSelector((state) => state.getChats)
    const messagesEndRef = useRef(null);
    const token = Cookies.get("accessToken");
    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    useEffect(() => {
        if (id) {
            dispatch(getBidDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (bidDetails?.bid?.jobId?._id) {
            dispatch(getChats(bidDetails.bid.jobId._id));
        }
    }, [dispatch, bidDetails?.bid?.jobId?._id]);
    useEffect(() => {
        if (!bidDetails?.bid?.jobId?._id) return;

        const jobId = bidDetails.bid.jobId._id;

        socket.on(`chat:${jobId}`, (data) => {
            dispatch({
                type: "ADD_MESSAGE",
                payload: {
                    id: Date.now().toString(),
                    message: data.message,
                    sender: data.sender,
                    timestamp: new Date(),
                },
            });
        });

        return () => {
            socket.off(`chat:${jobId}`);
        };
    }, [bidDetails?.bid?.jobId?._id]);



    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        const data = {
            message: message,
            clientId: bidDetails.bid.clientId,
            jobId: bidDetails.bid.jobId._id,
            freelancerId: bidDetails.bid.freelancerId,
        }
        try {
            dispatch(sentMessage(data))
            socket.emit(`chat:${bidDetails.bid.jobId._id}`, {
                message: message,
                sender: userId, // or "freelancer", depending on current user
            });
            setMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-center text-gray-500">Loading...</p>
            </div>
        )
    }

    if (!bidDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-center text-gray-500">Bid not found</p>
            </div>
        )
    }


    const formatDate = (timestamp) => {
        const date = new Date(timestamp); // ✅ Convert timestamp string to Date object
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        }
    };

    return (
        <main className="py-10 bg-gray-100 overflow-y-scroll min-h-[80vh]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="mx-auto px-4">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left side - Bid details */}
                    <div className="lg:col-span-1">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gig Details</h1>
                        <Card className="bg-[#FFFFFF] dark:bg-[#1D1E26] transition-all duration-300 shadow-none border border-[#0C0E1226] dark:border-[#FFFFFF26] rounded-[1rem] sticky top-6">
                            <CardHeader className="relative">
                                <div className="flex items-center gap-[0.75rem]">
                                    <img
                                        src={bidDetails?.bid?.jobId?.image || "/placeholder.svg?height=48&width=48"}
                                        alt="logo"
                                        className="w-12 h-12 object-contain p-1 rounded-xl border border-[#0C0E1226]"
                                    />
                                    <div className="flex-1">
                                        <CardTitle className="text-[#12131AE5] dark:text-[#FFFFFFC7] text-[1.125rem] font-bold">
                                            {bidDetails?.bid?.jobId?.title || "Job Title"}
                                        </CardTitle>
                                        <p className="text-sm text-[0.75rem] text-[#12131AA6] dark:text-[#A1A1A1]">
                                            {bidDetails?.bid?.jobId?.category || "Category"}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <div
                                    className="flex items-center gap-1 px-3 py-1 rounded-md text-[0.75rem] font-medium self-start"
                                    style={{
                                        backgroundColor: "#E8F5E9",
                                        color: "#067A57",
                                    }}
                                >
                                    <span>💰 ₹{bidDetails?.bid?.amount?.toLocaleString() || "0"}</span>
                                </div>

                                <p className="text-sm font-normal text-[#12131AA6] dark:text-[#C7C7C7]">
                                    {bidDetails?.bid?.message || "No message provided"}
                                </p>

                                <div className="flex flex-col gap-2 mt-4">
                                    <p className="text-sm font-normal text-[#12131AA6] dark:text-[#C7C7C7]">
                                        Submitted on {moment(bidDetails?.bid?.updatedAt).format("MMMM D, YYYY h:mm A")}
                                    </p>
                                    <span
                                        className={`px-3 py-1 text-sm font-medium rounded-full self-start
                                            ${bidDetails?.bid?.jobId?.status === "in-progress"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : bidDetails?.bid?.jobId?.status === "accepted"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-800"
                                            }
                                        `}
                                    >
                                        {bidDetails?.bid?.jobId?.status === "in-progress" ? "In-Progress" : ""}
                                    </span>
                                </div>

                                {/* Additional job details */}
                                <div className="mt-4 space-y-3">
                                    <Separator />
                                    <h3 className="font-medium text-[#12131AE5] dark:text-[#FFFFFFC7]">Job Details</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm text-[#12131AA6] dark:text-[#C7C7C7]">
                                            <span className="font-medium">Budget:</span> ₹{bidDetails?.bid?.amount?.toLocaleString() || "N/A"}
                                        </p>
                                        <p className="text-sm text-[#12131AA6] dark:text-[#C7C7C7]">
                                            <span className="font-medium">Deadline:</span> {moment(bidDetails?.bid?.jobId?.deadline).format("MMMM D, YYYY") || "N/A"}
                                        </p>
                                        <p className="text-sm text-[#12131AA6] dark:text-[#C7C7C7]">
                                            <span className="font-medium">Skills:</span> {bidDetails?.bid?.jobId?.skills?.join(", ") || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right side - Chat */}
                    <div className="lg:col-span-2">
                        <Card className="bg-[#FFFFFF] dark:bg-[#1D1E26] transition-all duration-300 shadow-none border border-[#0C0E1226] dark:border-[#FFFFFF26] rounded-[1rem] h-[calc(100vh-12rem)] overflow-hidden">
                            {/* Chat Header */}
                            <CardHeader className="border-b border-[#0C0E1210] dark:border-[#FFFFFF10] py-3 px-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-[#0C0E1210]">
                                            <AvatarImage src={bidDetails?.bid?.clientProfile || "/placeholder.svg?height=32&width=32"} className="h-full w-full object-cover" />
                                            <AvatarFallback className="bg-primary/10 text-primary">CL</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-[#12131AE5] dark:text-[#FFFFFFC7] text-base">
                                                {bidDetails?.bid?.clientName || "Client"}
                                            </CardTitle>
                                            <div className="flex items-center gap-1.5">
                                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                <p className="text-xs text-[#12131AA6] dark:text-[#A1A1A1]">Online</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[#12131AA6] dark:text-[#A1A1A1]"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                            </svg>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[#12131AA6] dark:text-[#A1A1A1]"
                                            >
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="19" cy="12" r="1" />
                                                <circle cx="5" cy="12" r="1" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Chat Messages */}
                            <div className="flex flex-col h-[calc(100%-4.5rem)]">
                                <div
                                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FAFB] dark:bg-[#1A1B23]"
                                    style={{
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "rgba(0,0,0,0.2) transparent",

                                    }}
                                >
                                    {messages.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center">
                                            <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-primary"
                                                >
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-[#12131AE5] dark:text-[#FFFFFFC7]">
                                                Start the conversation
                                            </h3>
                                            <p className="text-sm text-[#12131AA6] dark:text-[#A1A1A1] max-w-xs mt-1">
                                                Send a message to begin discussing the project details with the client
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Sample messages */}
                                            {messages.map((msg, index) => {
                                                const showDate = index === 0 || formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);
                                                return (
                                                    <div key={msg.id} className="space-y-1">
                                                        {showDate && (
                                                            <div className="flex justify-center mb-4">
                                                                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                                    {formatDate(msg.timestamp)}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className={`flex ${msg.sender === userId ? "justify-end" : "justify-start"}`}>
                                                            {msg.sender !== userId && (
                                                                <Avatar className="h-8 w-8 mr-2 mt-1">
                                                                    <AvatarImage src={bidDetails.bid.clientProfile} />
                                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">CL</AvatarFallback>
                                                                </Avatar>
                                                            )}
                                                            <div
                                                                className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.sender === userId
                                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                                    : "bg-[#F2F2F7] dark:bg-[#2C2D36] text-[#12131AE5] dark:text-[#FFFFFFC7] rounded-tl-none"
                                                                    }`}
                                                                style={{
                                                                    boxShadow: msg.sender === userId ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
                                                                }}
                                                            >
                                                                <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                                                            </div>
                                                        </div>

                                                        {/* Message info */}
                                                        <div className={`flex ${msg.sender === userId ? "justify-end" : "justify-start"} px-2`}>
                                                            <div className="flex items-center gap-1">
                                                                <p className="text-[10px] text-[#12131A80] dark:text-[#FFFFFF80]">
                                                                    {moment(msg.timestamp).format("h:mm A")}
                                                                </p>
                                                                {msg.sender === userId && (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="14"
                                                                        height="14"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="text-primary"
                                                                    >
                                                                        <polyline points="20 6 9 17 4 12" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Message Input */}
                                <div className="py-2 px-2 border-t border-[#0C0E1210] dark:border-[#FFFFFF10] bg-white dark:bg-[#1D1E26]">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full h-7 w-7 text-[#12131AA6] dark:text-[#A1A1A1] hover:text-primary hover:bg-primary/10"
                                            >
                                                <Location01Icon className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full h-7 w-7 text-[#12131AA6] dark:text-[#A1A1A1] hover:text-primary hover:bg-primary/10"
                                            >
                                                <Album01Icon className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full h-7 w-7 text-[#12131AA6] dark:text-[#A1A1A1] hover:text-primary hover:bg-primary/10"
                                            >
                                                <Attachment01Icon className="h-5 w-5" />
                                            </Button>
                                        </div>

                                        <div className="relative flex-1">
                                            <Input
                                                placeholder="Type a message..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="rounded-2xl pr-12py-3 bg-[#F2F2F7] dark:bg-[#2C2D36] border-0 focus-visible:ring-1 focus-visible:ring-primary"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault()
                                                        sendMessage()
                                                    }
                                                }}
                                            />

                                        </div>

                                        <Button
                                            onClick={sendMessage}
                                            className="rounded-full py-2.5 px-2 flex items-center justify-center bg-green-600"
                                            disabled={!message.trim()}
                                        >
                                            <SentIcon className="h-5 w-5 pt-.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default GigDetails

