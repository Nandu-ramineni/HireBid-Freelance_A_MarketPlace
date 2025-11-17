import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle, AlertCircle, Users, FileText, MessageSquare } from "lucide-react"

export function RecentActivity() {
    const activities = [
        {
            id: 1,
            type: "project",
            title: "E-commerce Platform completed",
            description: "Successfully delivered the mobile app project",
            time: "2 hours ago",
            status: "completed",
            icon: <CheckCircle className="h-4 w-4" />,
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: 2,
            type: "meeting",
            title: "Client meeting scheduled",
            description: "Quarterly review meeting with Tech Builders team",
            time: "4 hours ago",
            status: "scheduled",
            icon: <Users className="h-4 w-4" />,
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: 3,
            type: "document",
            title: "Contract signed",
            description: "New project agreement for Q2 2024",
            time: "1 day ago",
            status: "signed",
            icon: <FileText className="h-4 w-4" />,
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: 4,
            type: "message",
            title: "New message received",
            description: "Project update from development team",
            time: "2 days ago",
            status: "unread",
            icon: <MessageSquare className="h-4 w-4" />,
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: 5,
            type: "alert",
            title: "Payment reminder",
            description: "Invoice #INV-2024-001 due in 3 days",
            time: "3 days ago",
            status: "pending",
            icon: <AlertCircle className="h-4 w-4" />,
            avatar: "/placeholder.svg?height=32&width=32",
        },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800"
            case "scheduled":
                return "bg-blue-100 text-blue-800"
            case "signed":
                return "bg-purple-100 text-purple-800"
            case "unread":
                return "bg-yellow-100 text-yellow-800"
            case "pending":
                return "bg-orange-100 text-orange-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Recent Activity
                </CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors"
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{activity.icon}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <Badge variant="secondary" className={getStatusColor(activity.status)}>
                                        {activity.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
