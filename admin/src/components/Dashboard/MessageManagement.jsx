"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    MessageSquare,
    Search,
    Send,
    Paperclip,
    MoreHorizontal,
    Star,
    Archive,
    Trash2,
    Filter,
    Users,
    Clock,
    AlertCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const conversations = [
    {
        id: 1,
        participants: [
            {
                name: "Alice Johnson",
                email: "alice@example.com",
                avatar: "/placeholder.svg?height=40&width=40",
                role: "freelancer",
                status: "online",
            },
            {
                name: "TechCorp Inc.",
                email: "client@techcorp.com",
                avatar: "/placeholder.svg?height=40&width=40",
                role: "client",
                status: "offline",
            },
        ],
        subject: "E-commerce Website Development - Project Discussion",
        lastMessage:
            "I've completed the initial wireframes and would like your feedback before proceeding to the next phase.",
        lastMessageTime: "2024-01-15T14:30:00Z",
        unreadCount: 3,
        priority: "high",
        status: "active",
        projectId: "PRJ-001",
        tags: ["urgent", "development"],
        messages: [
            {
                id: 1,
                senderId: "alice@example.com",
                senderName: "Alice Johnson",
                content:
                    "Hi! I'm excited to work on your e-commerce project. I've reviewed the requirements and have a few questions.",
                timestamp: "2024-01-15T10:00:00Z",
                type: "text",
                read: true,
            },
            {
                id: 2,
                senderId: "client@techcorp.com",
                senderName: "TechCorp Inc.",
                content: "Great! Please go ahead with your questions. We're looking forward to getting started.",
                timestamp: "2024-01-15T10:15:00Z",
                type: "text",
                read: true,
            },
            {
                id: 3,
                senderId: "alice@example.com",
                senderName: "Alice Johnson",
                content:
                    "I've completed the initial wireframes and would like your feedback before proceeding to the next phase.",
                timestamp: "2024-01-15T14:30:00Z",
                type: "text",
                read: false,
                attachments: [{ name: "wireframes.pdf", size: "2.4 MB", type: "pdf" }],
            },
        ],
    },
    {
        id: 2,
        participants: [
            {
                name: "Bob Smith",
                email: "bob@example.com",
                avatar: "/placeholder.svg?height=40&width=40",
                role: "freelancer",
                status: "online",
            },
            {
                name: "StartupXYZ",
                email: "founder@startupxyz.com",
                avatar: "/placeholder.svg?height=40&width=40",
                role: "client",
                status: "online",
            },
        ],
        subject: "Mobile App UI/UX Design - Milestone Update",
        lastMessage:
            "The design mockups are ready for review. I've incorporated all your feedback from the previous iteration.",
        lastMessageTime: "2024-01-15T12:45:00Z",
        unreadCount: 1,
        priority: "medium",
        status: "active",
        projectId: "PRJ-002",
        tags: ["design", "milestone"],
        messages: [
            {
                id: 1,
                senderId: "bob@example.com",
                senderName: "Bob Smith",
                content:
                    "The design mockups are ready for review. I've incorporated all your feedback from the previous iteration.",
                timestamp: "2024-01-15T12:45:00Z",
                type: "text",
                read: false,
                attachments: [
                    { name: "app-mockups.fig", size: "15.2 MB", type: "figma" },
                    { name: "design-specs.pdf", size: "1.8 MB", type: "pdf" },
                ],
            },
        ],
    },
    {
        id: 3,
        participants: [
            {
                name: "Carol Davis",
                email: "carol@example.com",
                avatar: "/placeholder.svg?height=40&width=40",
                role: "freelancer",
                status: "offline",
            },
            {
                name: "BlogMaster",
                email: "editor@blogmaster.com",
                avatar: "/placeholder.svg?height=40&width=40",
                role: "client",
                status: "offline",
            },
        ],
        subject: "Content Writing - Article Submission",
        lastMessage:
            "I've submitted the first batch of articles. Please review and let me know if any revisions are needed.",
        lastMessageTime: "2024-01-15T09:20:00Z",
        unreadCount: 0,
        priority: "low",
        status: "resolved",
        projectId: "PRJ-003",
        tags: ["content", "completed"],
        messages: [
            {
                id: 1,
                senderId: "carol@example.com",
                senderName: "Carol Davis",
                content:
                    "I've submitted the first batch of articles. Please review and let me know if any revisions are needed.",
                timestamp: "2024-01-15T09:20:00Z",
                type: "text",
                read: true,
            },
        ],
    },
]

const stats = [
    {
        title: "Total Messages",
        value: "1,247",
        change: "+12.5%",
        trend: "up",
        icon: MessageSquare,
        color: "blue",
    },
    {
        title: "Active Conversations",
        value: "89",
        change: "+8.2%",
        trend: "up",
        icon: Users,
        color: "green",
    },
    {
        title: "Unread Messages",
        value: "23",
        change: "-15.4%",
        trend: "down",
        icon: AlertCircle,
        color: "yellow",
    },
    {
        title: "Avg Response Time",
        value: "2.4h",
        change: "-0.8h",
        trend: "up",
        icon: Clock,
        color: "purple",
    },
]

export function MessagesManagement() {
    const [selectedConversation, setSelectedConversation] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [newMessage, setNewMessage] = useState("")

    const filteredConversations = conversations.filter((conv) => {
        const matchesSearch =
            conv.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.participants.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesStatus = selectedStatus === "all" || conv.status === selectedStatus

        return matchesSearch && matchesStatus
    })

    const selectedConv = conversations.find((c) => c.id === selectedConversation)

    const formatTime = (timestamp  ) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 1) {
            return `${Math.floor(diffInHours * 60)}m ago`
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
        }
    }

    const getPriorityColor = (priority  ) => {
        switch (priority) {
            case "high":
                return "text-red-600 dark:text-red-400"
            case "medium":
                return "text-yellow-600 dark:text-yellow-400"
            case "low":
                return "text-green-600 dark:text-green-400"
            default:
                return "text-gray-600 dark:text-gray-400"
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "default"
            case "resolved":
                return "secondary"
            case "archived":
                return "outline"
            default:
                return "secondary"
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Messages Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor and manage all communications between clients and freelancers.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Archive className="mr-2 h-4 w-4" />
                        Archive Selected
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Send className="mr-2 h-4 w-4" />
                                New Message
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Send New Message</DialogTitle>
                                <DialogDescription>Send a message to users or broadcast to multiple recipients.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="recipients" className="text-right text-sm font-medium">
                                        Recipients
                                    </label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select recipients" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all-freelancers">All Freelancers</SelectItem>
                                            <SelectItem value="all-clients">All Clients</SelectItem>
                                            <SelectItem value="specific">Specific Users</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="subject" className="text-right text-sm font-medium">
                                        Subject
                                    </label>
                                    <Input id="subject" placeholder="Message subject" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="message" className="text-right text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea id="message" placeholder="Type your message..." className="col-span-3" rows={4} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                                <stat.icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from last
                                month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Messages Interface */}
            <div className="grid gap-6 lg:grid-cols-3 h-[600px]">
                {/* Conversations List */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Conversations</CardTitle>
                            <Button variant="ghost" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search conversations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[480px]">
                            <div className="space-y-1 p-4">
                                {filteredConversations.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${selectedConversation === conversation.id ? "bg-muted" : ""
                                            }`}
                                        onClick={() => setSelectedConversation(conversation.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex -space-x-2">
                                                {conversation.participants.slice(0, 2).map((participant, index) => (
                                                    <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback className="text-xs">
                                                            {participant.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ))}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-medium text-sm truncate">{conversation.subject}</h4>
                                                    {conversation.unreadCount > 0 && (
                                                        <Badge className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                                                            {conversation.unreadCount}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={getStatusColor(conversation.status)} className="text-xs">
                                                            {conversation.status}
                                                        </Badge>
                                                        <span className={`text-xs ${getPriorityColor(conversation.priority)}`}>
                                                            {conversation.priority}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatTime(conversation.lastMessageTime)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Message Thread */}
                <Card className="lg:col-span-2">
                    {selectedConv ? (
                        <>
                            <CardHeader className="border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {selectedConv.participants.map((participant, index) => (
                                                <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                                    <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback className="text-xs">
                                                        {participant.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{selectedConv.subject}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {selectedConv.participants.map((p) => p.name).join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Star className="mr-2 h-4 w-4" />
                                                Mark as Important
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Archive className="mr-2 h-4 w-4" />
                                                Archive Conversation
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete Conversation
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-[360px]">
                                    <div className="space-y-4 p-4">
                                        {selectedConv.messages.map((message) => (
                                            <div key={message.id} className="flex gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                                    <AvatarFallback className="text-xs">
                                                        {message.senderName
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm">{message.senderName}</span>
                                                        <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                                                        {!message.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                                                    </div>
                                                    <div className="bg-muted/50 rounded-lg p-3">
                                                        <p className="text-sm">{message.content}</p>
                                                        {message.attachments && message.attachments.length > 0 && (
                                                            <div className="mt-2 space-y-1">
                                                                {message.attachments.map((attachment, index) => (
                                                                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                        <Paperclip className="h-3 w-3" />
                                                                        <span>{attachment.name}</span>
                                                                        <span>({attachment.size})</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="border-t p-4">
                                    <div className="flex gap-2">
                                        <Textarea
                                            placeholder="Type your message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            className="flex-1 min-h-[60px]"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <Button size="icon" variant="outline">
                                                <Paperclip className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon">
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <CardContent className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Select a conversation</h3>
                                <p className="text-sm text-muted-foreground">Choose a conversation from the list to view messages</p>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    )
}
