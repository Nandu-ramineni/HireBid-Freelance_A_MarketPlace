import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Send,
    Paperclip,
    Smile,
    MoreVertical,
    Search,
    Phone,
    Video,
    Settings,
    Users,
    Hash,
    Lock,
    Mic,
    MicOff,
    ImageIcon,
    File,
    CheckCheck,
    Check,
} from "lucide-react"

const teamMembers = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Product Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        lastSeen: "now",
    },
    {
        id: 2,
        name: "Mike Chen",
        role: "Lead Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        lastSeen: "2 min ago",
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "UI/UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
        lastSeen: "15 min ago",
    },
    {
        id: 4,
        name: "Alex Rodriguez",
        role: "DevOps Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        lastSeen: "2 hours ago",
    },
    {
        id: 5,
        name: "Lisa Wang",
        role: "QA Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        lastSeen: "now",
    },
]

const channels = [
    { id: 1, name: "general", type: "public", unread: 0 },
    { id: 2, name: "development", type: "public", unread: 3 },
    { id: 3, name: "design", type: "public", unread: 1 },
    { id: 4, name: "random", type: "public", unread: 0 },
    { id: 5, name: "project-alpha", type: "private", unread: 5 },
]

const initialMessages = [
    {
        id: 1,
        user: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "Good morning team! Ready for today's sprint review?",
        timestamp: "09:15 AM",
        status: "read",
        reactions: [{ emoji: "👍", count: 3, users: ["Mike Chen", "Emily Davis", "Lisa Wang"] }],
    },
    {
        id: 2,
        user: "Mike Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "I've finished the API integration we discussed yesterday.",
        timestamp: "09:17 AM",
        status: "read",
    },
    {
        id: 3,
        user: "Emily Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "The new mockups are ready for review. I'll share them in the design channel.",
        timestamp: "09:20 AM",
        status: "read",
        attachments: [{ name: "Dashboard_Mockup_v2.fig", type: "figma", size: "2.4 MB" }],
    },
    {
        id: 4,
        user: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "CI/CD pipeline is running smoothly. All tests are passing ✅",
        timestamp: "09:25 AM",
        status: "delivered",
    },
    {
        id: 5,
        user: "Lisa Wang",
        avatar: "/placeholder.svg?height=32&width=32",
        message: "Found a minor bug in the user authentication flow. Creating a ticket now.",
        timestamp: "09:30 AM",
        status: "sent",
    },
]

export default function TeamChat() {
    const [messages, setMessages] = useState(initialMessages)
    const [newMessage, setNewMessage] = useState("")
    const [selectedChannel, setSelectedChannel] = useState(channels[0])
    const [isTyping, setIsTyping] = useState(false)
    const [typingUsers, setTypingUsers] = useState([])
    const messagesEndRef = useRef(null)
    const [isMuted, setIsMuted] = useState(false)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: messages.length + 1,
                user: "You",
                avatar: "/placeholder.svg?height=32&width=32",
                message: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                status: "sent" ,
            }
            setMessages([...messages, message])
            setNewMessage("")

            // Simulate message status updates
            setTimeout(() => {
                setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)))
            }, 1000)

            setTimeout(() => {
                setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "read" } : msg)))
            }, 2000)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "sent":
                return <Check className="w-3 h-3 text-slate-400" />
            case "delivered":
                return <CheckCheck className="w-3 h-3 text-slate-400" />
            case "read":
                return <CheckCheck className="w-3 h-3 text-blue-500" />
            default:
                return null
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "online":
                return "bg-green-500"
            case "away":
                return "bg-yellow-500"
            case "offline":
                return "bg-slate-400"
            default:
                return "bg-slate-400"
        }
    }

    return (
        <div className="h-[calc(100vh-4.5rem)] bg-slate-50 flex">
            {/* Sidebar */}
            <div className="w-80 bg-slate-900 text-white flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">Team Workspace</h1>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
                            <Settings className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Channels */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-6">
                            {/* Channels Section */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Channels</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-slate-400 hover:text-white hover:bg-slate-800 h-6 w-6 p-0"
                                    >
                                        <span className="text-lg">+</span>
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    {channels.map((channel) => (
                                        <div
                                            key={channel.id}
                                            onClick={() => setSelectedChannel(channel)}
                                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedChannel.id === channel.id
                                                    ? "bg-slate-700 text-white"
                                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {channel.type === "private" ? <Lock className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                                                <span className="text-sm font-medium">{channel.name}</span>
                                            </div>
                                            {channel.unread > 0 && (
                                                <Badge className="bg-red-500 text-white text-xs h-5 min-w-5 flex items-center justify-center">
                                                    {channel.unread}
                                                </Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="bg-slate-700" />

                            {/* Team Members */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Team Members</h3>
                                    <Users className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="space-y-2">
                                    {teamMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-200"
                                        >
                                            <div className="relative">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                                    <AvatarFallback className="bg-slate-600 text-white text-xs">
                                                        {member.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${getStatusColor(member.status)}`}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{member.name}</p>
                                                <p className="text-xs text-slate-400 truncate">{member.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            {selectedChannel.type === "private" ? (
                                <Lock className="w-5 h-5 text-slate-600" />
                            ) : (
                                <Hash className="w-5 h-5 text-slate-600" />
                            )}
                            <h2 className="text-lg font-semibold text-slate-900">{selectedChannel.name}</h2>
                        </div>
                        <Badge variant="outline" className="text-xs">
                            {teamMembers.filter((m) => m.status === "online").length} online
                        </Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                            <Search className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                            <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                            <Video className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-600 hover:text-slate-900"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {messages.map((message, index) => (
                                <div key={message.id} className="group">
                                    <div className="flex items-start space-x-3">
                                        <Avatar className="w-10 h-10 flex-shrink-0">
                                            <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.user} />
                                            <AvatarFallback className="bg-slate-200 text-slate-700 text-sm">
                                                {message.user
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-semibold text-slate-900">{message.user}</span>
                                                <span className="text-xs text-slate-500">{message.timestamp}</span>
                                                {message.user === "You" && (
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {getStatusIcon(message.status)}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-slate-700 leading-relaxed">{message.message}</div>

                                            {message.attachments && (
                                                <div className="mt-3 space-y-2">
                                                    {message.attachments.map((attachment, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border max-w-sm"
                                                        >
                                                            <div className="p-2 bg-blue-100 rounded">
                                                                <File className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-slate-900 truncate">{attachment.name}</p>
                                                                <p className="text-xs text-slate-500">{attachment.size}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {message.reactions && (
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {message.reactions.map((reaction, idx) => (
                                                        <Button
                                                            key={idx}
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-7 px-2 text-xs hover:bg-slate-50 bg-transparent"
                                                        >
                                                            <span className="mr-1">{reaction.emoji}</span>
                                                            <span>{reaction.count}</span>
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {typingUsers.length > 0 && (
                                <div className="flex items-center space-x-2 text-slate-500 text-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                        <div
                                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        />
                                    </div>
                                    <span>
                                        {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
                                    </span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>
                </div>

                {/* Message Input */}
                <div className="border-t border-slate-200 p-4 bg-white">
                    <div className="flex items-end space-x-3">
                        <div className="flex-1">
                            <div className="relative">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={`Message #${selectedChannel.name}`}
                                    className="min-h-[44px] pr-20 resize-none border-slate-300 focus:border-slate-500"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700">
                                        <Paperclip className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700">
                                        <ImageIcon className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700">
                                        <Smile className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="h-11 px-4 bg-slate-900 hover:bg-slate-800 text-white"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
