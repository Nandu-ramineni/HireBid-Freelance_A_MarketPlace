import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Bell, Send, Settings, Users, AlertCircle, CheckCircle, Info, MessageSquare } from "lucide-react"

const notificationSettings = [
    {
        category: "User Activity",
        description: "Notifications about user registrations, profile updates, and account changes",
        settings: [
            { key: "new_user_registration", label: "New User Registration", enabled: true },
            { key: "profile_verification", label: "Profile Verification", enabled: true },
            { key: "account_suspension", label: "Account Suspension", enabled: true },
        ],
    },
    {
        category: "Project Management",
        description: "Notifications about project creation, updates, and completion",
        settings: [
            { key: "new_project_posted", label: "New Project Posted", enabled: true },
            { key: "project_completed", label: "Project Completed", enabled: true },
            { key: "milestone_reached", label: "Milestone Reached", enabled: false },
        ],
    },
    {
        category: "Financial",
        description: "Notifications about payments, transactions, and financial activities",
        settings: [
            { key: "payment_received", label: "Payment Received", enabled: true },
            { key: "payment_failed", label: "Payment Failed", enabled: true },
            { key: "withdrawal_processed", label: "Withdrawal Processed", enabled: true },
        ],
    },
    {
        category: "System",
        description: "System alerts, maintenance notifications, and technical updates",
        settings: [
            { key: "system_maintenance", label: "System Maintenance", enabled: true },
            { key: "security_alerts", label: "Security Alerts", enabled: true },
            { key: "performance_issues", label: "Performance Issues", enabled: false },
        ],
    },
]

const recentNotifications = [
    {
        id: 1,
        type: "user",
        title: "New User Registration",
        message: "John Doe has registered as a freelancer",
        timestamp: "2024-01-15T14:30:00Z",
        read: false,
        priority: "medium",
        recipients: 5,
    },
    {
        id: 2,
        type: "payment",
        title: "Payment Processed",
        message: "$2,500 payment completed for Project #1234",
        timestamp: "2024-01-15T13:45:00Z",
        read: true,
        priority: "high",
        recipients: 2,
    },
    {
        id: 3,
        type: "system",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur tonight from 2-4 AM EST",
        timestamp: "2024-01-15T12:00:00Z",
        read: true,
        priority: "low",
        recipients: 1247,
    },
]

export function NotificationsManagement() {
    const [activeTab, setActiveTab] = useState("recent")
    const [searchTerm, setSearchTerm] = useState("")

    const getTypeIcon = (type) => {
        switch (type) {
            case "user":
                return <Users className="h-4 w-4 text-blue-600" />
            case "payment":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "system":
                return <AlertCircle className="h-4 w-4 text-orange-600" />
            case "project":
                return <MessageSquare className="h-4 w-4 text-purple-600" />
            default:
                return <Info className="h-4 w-4" />
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "destructive"
            case "medium":
                return "secondary"
            case "low":
                return "outline"
            default:
                return "secondary"
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Notifications Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage notification settings, send announcements, and monitor system alerts.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Notification Settings</DialogTitle>
                                <DialogDescription>Configure which notifications are sent to administrators.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                                {notificationSettings.map((category, index) => (
                                    <div key={index} className="space-y-3">
                                        <div>
                                            <h4 className="font-medium">{category.category}</h4>
                                            <p className="text-sm text-muted-foreground">{category.description}</p>
                                        </div>
                                        <div className="space-y-2">
                                            {category.settings.map((setting, settingIndex) => (
                                                <div key={settingIndex} className="flex items-center justify-between">
                                                    <Label htmlFor={setting.key} className="text-sm">
                                                        {setting.label}
                                                    </Label>
                                                    <Switch id={setting.key} defaultChecked={setting.enabled} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Settings</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Send className="mr-2 h-4 w-4" />
                                Send Notification
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Send Notification</DialogTitle>
                                <DialogDescription>
                                    Send a notification to users or broadcast to all platform members.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="recipients" className="text-right">
                                        Recipients
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select recipients" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Users</SelectItem>
                                            <SelectItem value="freelancers">All Freelancers</SelectItem>
                                            <SelectItem value="clients">All Clients</SelectItem>
                                            <SelectItem value="admins">Administrators</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">
                                        Type
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Notification type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="announcement">Announcement</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                            <SelectItem value="security">Security Alert</SelectItem>
                                            <SelectItem value="feature">New Feature</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="priority" className="text-right">
                                        Priority
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Priority level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input id="title" placeholder="Notification title" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="message" className="text-right">
                                        Message
                                    </Label>
                                    <Textarea id="message" placeholder="Notification message..." className="col-span-3" rows={3} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Notification
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Notification Management */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="recent">Recent Notifications</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Notifications</CardTitle>
                                    <CardDescription>Latest notifications sent to users</CardDescription>
                                </div>
                                <div className="relative">
                                    <Input
                                        placeholder="Search notifications..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-64"
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="mt-1">{getTypeIcon(notification.type)}</div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">{notification.title}</h4>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                                                    <span className="text-sm text-muted-foreground">{formatDate(notification.timestamp)}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">
                                                    Sent to {notification.recipients} recipient{notification.recipients !== 1 ? "s" : ""}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                                                    <Button variant="ghost" size="sm">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="templates" className="space-y-6">
                    <div className="text-center py-12">
                        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Notification Templates</h3>
                        <p className="text-muted-foreground mb-4">Create and manage reusable notification templates</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                    <div className="text-center py-12">
                        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Notification Analytics</h3>
                        <p className="text-muted-foreground mb-4">Track notification delivery rates and user engagement</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
