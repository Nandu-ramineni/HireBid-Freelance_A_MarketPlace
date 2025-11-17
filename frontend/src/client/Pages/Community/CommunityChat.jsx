"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  Hash,
  Users,
  Settings,
  Search,
  MoreVertical,
  Smile,
  Paperclip,
  Phone,
  Video,
  Info,
  Bell,
  BellOff,
  Star,
  Reply,
  Share2,
  Plus,
  X,
  Mic,
} from "lucide-react"

// Mock data for chat system
const channels = [
  {
    id: "general",
    name: "general",
    type: "public",
    description: "General community discussions",
    memberCount: 1247,
    unreadCount: 3,
    isActive: true,
  },
  {
    id: "agencies",
    name: "agencies",
    type: "public",
    description: "Agency owners and discussions",
    memberCount: 456,
    unreadCount: 0,
    isActive: false,
  },
  {
    id: "freelancers",
    name: "freelancers",
    type: "public",
    description: "Freelancer community",
    memberCount: 789,
    unreadCount: 7,
    isActive: false,
  },
  {
    id: "tech-talk",
    name: "tech-talk",
    type: "public",
    description: "Technology discussions",
    memberCount: 234,
    unreadCount: 0,
    isActive: false,
  },
  {
    id: "job-board",
    name: "job-board",
    type: "public",
    description: "Job postings and opportunities",
    memberCount: 567,
    unreadCount: 12,
    isActive: false,
  },
]

const directMessages = [
  {
    id: "dm1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      company: "PixelPerfect Studios",
    },
    lastMessage: "Thanks for the feedback on the project!",
    timestamp: "2 min ago",
    unreadCount: 2,
  },
  {
    id: "dm2",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      company: "TechFusion Agency",
    },
    lastMessage: "Let's schedule a call tomorrow",
    timestamp: "1 hour ago",
    unreadCount: 0,
  },
  {
    id: "dm3",
    user: {
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      company: "Visionary Design Co",
    },
    lastMessage: "Great work on the presentation!",
    timestamp: "3 hours ago",
    unreadCount: 0,
  },
]

const messages = [
  {
    id: "msg1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "PixelPerfect Studios",
      role: "Agency Owner",
    },
    content:
      "Hey everyone! Just wanted to share our latest project success. We completed a major e-commerce redesign for a Fortune 500 client. The HireBid community connections really helped us find the right specialists for this project! 🎉",
    timestamp: "10:30 AM",
    reactions: [
      { emoji: "👏", count: 12, users: ["Michael Chen", "Alex Rivera"] },
      { emoji: "🎉", count: 8, users: ["David Kim"] },
      { emoji: "❤️", count: 5, users: ["Maria Rodriguez"] },
    ],
    replies: 3,
    isEdited: false,
  },
  {
    id: "msg2",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "TechFusion Agency",
      role: "Developer",
    },
    content:
      "That's amazing, Sarah! Congratulations on the success. Would love to hear more about how you structured the team for such a large project.",
    timestamp: "10:32 AM",
    reactions: [{ emoji: "👍", count: 6, users: ["Sarah Johnson"] }],
    replies: 0,
    isEdited: false,
    replyTo: "msg1",
  },
  {
    id: "msg3",
    user: {
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Visionary Design Co",
      role: "Designer",
    },
    content:
      "Quick question for the community - what's everyone's preferred tool for client collaboration? We're looking to upgrade our workflow.",
    timestamp: "10:45 AM",
    reactions: [{ emoji: "🤔", count: 4, users: ["David Kim", "Maria Rodriguez"] }],
    replies: 8,
    isEdited: false,
  },
  {
    id: "msg4",
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Pixel Perfect Design",
      role: "Creative Director",
    },
    content:
      "We've been using Figma for design collaboration and Notion for project management. The combination works really well for us!",
    timestamp: "10:47 AM",
    reactions: [{ emoji: "💡", count: 7, users: ["Alex Rivera", "Sarah Johnson"] }],
    replies: 0,
    isEdited: false,
    replyTo: "msg3",
  },
  {
    id: "msg5",
    user: {
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Global Creative Solutions",
      role: "Project Manager",
    },
    content:
      "For anyone interested, I'm hosting a workshop next week on 'Scaling Your Agency Operations'. It's based on our journey from 3 to 25 team members. Link in bio! 📚",
    timestamp: "11:15 AM",
    reactions: [
      { emoji: "🔥", count: 15, users: ["Sarah Johnson", "Michael Chen", "Alex Rivera"] },
      { emoji: "📚", count: 9, users: ["David Kim"] },
    ],
    replies: 12,
    isEdited: false,
  },
]

const onlineUsers = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    activity: "In #general",
  },
  {
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    activity: "Typing...",
  },
  {
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "away",
    activity: "Away",
  },
  {
    name: "David Kim",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    activity: "In #tech-talk",
  },
  {
    name: "Maria Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    activity: "In #agencies",
  },
]

export default function CommunityChat() {
  const [activeChannel, setActiveChannel] = useState("general")
  const [activeTab, setActiveTab] = useState("channels")
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", newMessage)
      setNewMessage("")
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleTyping = (value) => {
    setNewMessage(value)
    setIsTyping(value.length > 0)
  }

  const addReaction = (messageId, emoji) => {
    // In a real app, this would update the message reactions
    console.log("Adding reaction:", emoji, "to message:", messageId)
  }

  const formatTime = (timestamp) => {
    return timestamp
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-[800px] bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden"
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <motion.div variants={itemVariants} className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">HireBid Community</h2>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search channels, messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="flex-1 mt-4">
              <ScrollArea className="h-full px-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-700">Public Channels</h3>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {channels.map((channel) => (
                    <motion.button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-colors ${
                        activeChannel === channel.id
                          ? "bg-purple-100 text-purple-700"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Hash className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium truncate">{channel.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {channel.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                            {channel.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="messages" className="flex-1 mt-4">
              <ScrollArea className="h-full px-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-700">Direct Messages</h3>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {directMessages.map((dm) => (
                    <motion.button
                      key={dm.id}
                      className="w-full flex items-center gap-3 p-2 rounded-md text-left hover:bg-slate-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={dm.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{dm.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                            dm.user.status,
                          )}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm truncate">{dm.user.name}</span>
                          <span className="text-xs text-slate-500">{dm.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 truncate">{dm.lastMessage}</p>
                      </div>
                      {dm.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[16px] h-4 flex items-center justify-center">
                          {dm.unreadCount}
                        </Badge>
                      )}
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <motion.div variants={itemVariants} className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-slate-500" />
                <div>
                  <h3 className="font-semibold text-slate-900">{channels.find((c) => c.id === activeChannel)?.name}</h3>
                  <p className="text-sm text-slate-500">
                    {channels.find((c) => c.id === activeChannel)?.description} •{" "}
                    {channels.find((c) => c.id === activeChannel)?.memberCount} members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowUserInfo(!showUserInfo)}>
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <motion.div variants={containerVariants} className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  variants={itemVariants}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {message.replyTo && (
                    <div className="ml-12 mb-1 flex items-center gap-2 text-xs text-slate-500">
                      <Reply className="h-3 w-3" />
                      <span>Replying to {messages.find((m) => m.id === message.replyTo)?.user.name}</span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 mt-0.5">
                      <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900">{message.user.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {message.user.role}
                        </Badge>
                        <span className="text-xs text-slate-500">{message.timestamp}</span>
                        {message.isEdited && <span className="text-xs text-slate-400">(edited)</span>}
                      </div>

                      <div className="text-slate-700 leading-relaxed mb-2">{message.content}</div>

                      {/* Reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {message.reactions.map((reaction, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => addReaction(message.id, reaction.emoji)}
                              className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-sm transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-xs font-medium">{reaction.count}</span>
                            </motion.button>
                          ))}
                          <motion.button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="flex items-center justify-center w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Plus className="h-3 w-3" />
                          </motion.button>
                        </div>
                      )}

                      {/* Reply count */}
                      {message.replies > 0 && (
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                          {message.replies} {message.replies === 1 ? "reply" : "replies"}
                        </button>
                      )}
                    </div>

                    {/* Message Actions */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Reply className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-4 py-2 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-slate-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-slate-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-slate-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                    />
                  </div>
                  <span>Michael Chen is typing...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message Input */}
          <motion.div variants={itemVariants} className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-end gap-3">
              <Button size="sm" variant="ghost" className="mb-2">
                <Paperclip className="h-4 w-4" />
              </Button>

              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${activeChannel}`}
                  className="pr-20 resize-none"
                  multiline
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="mb-2" size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Emoji Picker */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-20 right-4 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50"
                >
                  <div className="grid grid-cols-8 gap-2">
                    {["😀", "😂", "😍", "🤔", "👍", "👎", "❤️", "🎉", "🔥", "💡", "👏", "🚀"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setNewMessage(newMessage + emoji)
                          setShowEmojiPicker(false)
                        }}
                        className="text-xl hover:bg-slate-100 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Sidebar - User Info */}
        <AnimatePresence>
          {showUserInfo && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 border-l border-slate-200 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Channel Info</h3>
                  <Button size="sm" variant="ghost" onClick={() => setShowUserInfo(false)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">About</h4>
                    <p className="text-sm text-slate-600">
                      {channels.find((c) => c.id === activeChannel)?.description}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Online Members ({onlineUsers.length})</h4>
                    <div className="space-y-2">
                      {onlineUsers.map((user, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                                user.status,
                              )}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-slate-900 truncate">{user.name}</div>
                            <div className="text-xs text-slate-500 truncate">{user.activity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Star className="h-4 w-4 mr-2" />
                        Star Channel
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Notification Settings
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Invite Members
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
