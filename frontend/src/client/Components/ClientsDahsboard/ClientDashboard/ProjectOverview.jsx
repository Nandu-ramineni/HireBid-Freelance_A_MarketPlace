import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, ExternalLink } from "lucide-react"
import moment from "moment"
import { Calendar03Icon } from "hugeicons-react"

export function ProjectOverview({ clientGigs }) {
    // Filter in-progress projects
    const projects = clientGigs
        .filter((gig) => gig.status === "in-progress")
        .map((gig) => {
            const totalMilestones = gig.milestones.length
            const paidMilestones = gig.milestones.filter((m) => m.isPaid).length
            const progress = totalMilestones > 0 ? Math.round((paidMilestones / totalMilestones) * 100) : 0

            const daysLeft = moment(gig.deadline).diff(moment(), "days")
            let priority = "Low"
            if (daysLeft <= 10) priority = "High"
            else if (daysLeft <= 30) priority = "Medium"

            return {
                id: gig._id,
                name: gig.title,
                category: gig.category || "General",
                client: gig.clientId || "Client",
                progress,
                status: "In Progress",
                dueDate: moment(gig.deadline).format("MMM DD, YYYY"),
                team: Math.floor(Math.random() * 5) + 2, // simulate team size
                priority,
                budget: `₹${gig.budget.toLocaleString()}`,
            }
        })

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800"
            case "In Progress":
                return "bg-blue-100 text-blue-800"
            case "Planning":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-800"
            case "Medium":
                return "bg-orange-100 text-orange-800"
            case "Low":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getCategoryColor = (category) => {
        switch (category) {
            case "Cybersecurity":
                return "bg-purple-100 text-purple-800"
            case "Video Editing":
                return "bg-pink-100 text-pink-800"
            case "web-development":
                return "bg-green-100 text-green-800"
            case "General":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Active Projects</CardTitle>
                        <CardDescription>Overview of your current projects and their progress</CardDescription>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                        View All Projects
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {projects.map((project) => (
                        <div key={project.id} className="p-4 rounded-lg border bg-white/50 hover:bg-white/70 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-semibold text-lg pb-1">{project.name}</h3>
                                    <Badge variant="secondary" className={getCategoryColor(project.category)}>
                                        {project.category}
                                    </Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className={getStatusColor(project.status)}>
                                        {project.status}
                                    </Badge>
                                    <Badge variant="secondary" className={getPriorityColor(project.priority)}>
                                        {project.priority}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar03Icon className="h-4 w-4" />
                                            <span>{project.dueDate}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>{project.team} members</span>
                                        </div>
                                    </div>
                                    <div className="font-semibold text-foreground">{project.budget}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
