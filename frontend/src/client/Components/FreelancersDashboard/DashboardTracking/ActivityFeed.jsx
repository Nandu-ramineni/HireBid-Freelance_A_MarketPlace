
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, AlertCircle, Clock, FileText, User, DollarSign } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "completed",
    title: "Website Redesign",
    description: "Project completed successfully",
    time: "2 hours ago",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    description: "$3,500 from TechGiant",
    time: "5 hours ago",
    user: {
      name: "Finance Team",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "FT",
    },
  },
  {
    id: 3,
    type: "alert",
    title: "Deadline Approaching",
    description: "Mobile App project due in 2 days",
    time: "Yesterday",
    user: {
      name: "Project Manager",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PM",
    },
  },
  {
    id: 4,
    type: "new",
    title: "New Client",
    description: "HealthPlus joined as a client",
    time: "2 days ago",
    user: {
      name: "Sales Team",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ST",
    },
  },
  {
    id: 5,
    type: "document",
    title: "Contract Signed",
    description: "E-commerce Platform contract",
    time: "3 days ago",
    user: {
      name: "Legal Team",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LT",
    },
  },
]

export function ActivityFeed() {
  const getIcon = (type) => {
    switch (type) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "document":
        return <FileText className="h-5 w-5 text-indigo-500" />
      case "new":
        return <User className="h-5 w-5 text-violet-500" />
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="mt-1">{getIcon(activity.type)}</div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.title}</p>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  )
}
