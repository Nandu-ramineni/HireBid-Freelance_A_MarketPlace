import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Smile } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux"
import { getChats, sentMessage } from "@/client/Redux/Actions/chatActions"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

const socket = io("http://localhost:9000");
export function ChatWindow({ jobId, freelancerName, freelancerAvatar, freelancerId, clientId }) {
    const dispatch = useDispatch()
    const { messages } = useSelector((state) => state.getChats)
    const [newMessage, setNewMessage] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const token = Cookies.get("accessToken");
    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    useEffect(() => {
        dispatch(getChats(jobId))
    }, [dispatch, jobId]);

    useEffect(() => {
        // Subscribe to job-specific channel
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
    }, [jobId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    useEffect(() => {
        dispatch({ type: "RESET_CHAT_MESSAGES" });
    }, [jobId]);

    const handleEmojiClick = (emojiData) => {
        setNewMessage((prev) => prev + emojiData.emoji);
        inputRef.current?.focus();
    };


    const handleSendMessage = async () => {
        const data = {
            jobId: jobId,
            message: newMessage,
            freelancerId: freelancerId,
            clientId: userId,
        };
        
        try {
            await dispatch(sentMessage(data));
            socket.emit(`chat:${jobId}`, {
                message: newMessage,
                sender: userId, // or "freelancer", depending on current user
            });
            setNewMessage("");
            dispatch(getChats(jobId)); // Refresh messages after sending

        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };


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
        <div className="flex flex-col h-full">
            {/* Messages Area */}
            <div className=" overflow-y-scroll h-[65vh] p-4 space-y-4 chat" >
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
                            Send a message to begin discussing the project details with the freelancer
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => {
                            const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)
                            const isSender = message.sender === userId;
                            return (
                                <div key={message._id}>
                                    {showDate && (
                                        <div className="flex justify-center mb-4">
                                            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                {formatDate(message.timestamp)}
                                            </span>
                                        </div>
                                    )}

                                    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                                        <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isSender ? "flex-row-reverse space-x-reverse" : ""}`}>
                                            {!isSender && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={freelancerAvatar || "/placeholder.svg"} alt={freelancerName} />
                                                    <AvatarFallback className="text-xs">
                                                        {freelancerName.split(" ").map((n) => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}

                                            <div className={`rounded-lg px-4 py-2 ${isSender ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"}`}>
                                                <p className="text-sm">{message.message}</p>
                                                <p className={`text-xs mt-1 text-right ${isSender ? "text-blue-100" : "text-gray-500"}`}>
                                                    {formatTime(message.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>
            {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 z-50">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
                </div>
            )}
            {/* Message Input */}
            <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-500">
                        <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-500" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <Smile className="h-4 w-4" />
                    </Button>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()} size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
