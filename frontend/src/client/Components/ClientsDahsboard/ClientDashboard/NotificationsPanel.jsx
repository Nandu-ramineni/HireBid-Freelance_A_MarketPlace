import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react"

export function NotificationsPanel() {
    const notifications = [
        {
            id: 1,
            type: "success",
            title: "Project Milestone Completed",
            message: "E-commerce app Phase 2 has been successfully completed",
            time: "5 minutes ago",
            unread: true,
        },
        {
            id: 2,
            type: "warning",
            title: "Payment Due Soon",
            message: "Invoice #INV-2024-001 is due in 2 days",
            time: "1 hour ago",
            unread: true,
        },
        {
            id: 3,
            type: "info",
            title: "Team Meeting Tomorrow",
            message: "Weekly sync meeting scheduled for 10:00 AM",
            time: "3 hours ago",
            unread: false,
        },
        {
            id: 4,
            type: "success",
            title: "New Team Member Added",
            message: "Sarah Johnson joined your development team",
            time: "1 day ago",
            unread: false,
        },
    ]

    const getNotificationIcon = (type) => {
        switch (type) {
            case "success":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "warning":
                return <AlertTriangle className="h-4 w-4 text-orange-600" />
            case "info":
                return <Info className="h-4 w-4 text-blue-600" />
            default:
                return <Bell className="h-4 w-4" />
        }
    }

    return (
        <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle>Notifications</CardTitle>
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                            {notifications.filter((n) => n.unread).length} new
                        </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                        Mark all read
                    </Button>
                </div>
                <CardDescription>Stay updated with your latest activities</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-3 rounded-lg border transition-colors ${notification.unread ? "bg-blue-50/50 border-blue-200" : "bg-white/50"
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    {getNotificationIcon(notification.type)}
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold">{notification.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
