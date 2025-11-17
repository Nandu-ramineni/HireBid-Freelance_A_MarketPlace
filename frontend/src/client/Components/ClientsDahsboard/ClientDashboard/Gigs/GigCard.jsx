import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    Calendar,
    DollarSign,
    MapPin,
    Clock,
    Users,
    CheckCircle,
    AlertCircle,
    Eye,
    Edit,
    Star,
    Briefcase,
    Target,
    Award,
    TrendingUp,
    IndianRupee,
} from "lucide-react"
import { ProjectManagement } from "./ProjectManagement"
import { useState } from "react"
import { Calendar01Icon } from "hugeicons-react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"




export function GigCard({ gig }) {
    const navigate = useNavigate()
    const [isProjectManagementOpen, setIsProjectManagementOpen] = useState(false)
    const [selectedGig, setSelectedGig] = useState(null)
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "open":
                return "bg-green-100 text-green-800 border-green-200"
            case "in-progress":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "completed":
                return "bg-purple-100 text-purple-800 border-purple-200"
            case "paused":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getExperienceLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "beginner":
                return "bg-green-100 text-green-800"
            case "intermediate":
                return "bg-blue-100 text-blue-800"
            case "expert":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getJobTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case "full time":
                return "bg-indigo-100 text-indigo-800"
            case "part time":
                return "bg-orange-100 text-orange-800"
            case "contract":
                return "bg-teal-100 text-teal-800"
            case "freelance":
                return "bg-pink-100 text-pink-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }
    const tagStyles = [
        {
            text: { light: "#5925DC", dark: "#BDB4FE" },
            bg: { light: "#5925DC14", dark: "#BDB4FE0D" },
            border: { light: "#5925DC33", dark: "#BDB4FE33" },
            hoverBg: { light: "#0ACC920D", dark: "#77C7AF0D" },
        },
        {
            text: { light: "#8F6C1A", dark: "#E0BE70" },
            bg: { light: "#FFC02E1A", dark: "#E0BE700D" },
            border: { light: "#8F6C1A33", dark: "#E0BE7033" },
            hoverBg: { light: "#FFC02E0D", dark: "#E0BE700D" },
        },
        {
            text: { light: "#9F1AB1", dark: "#EEAAFD" },
            bg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
            border: { light: "#9F1AB114", dark: "#EEAAFD33" },
            hoverBg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
        },
        {
            text: { light: "#067A57", dark: "#77C7AF" },
            bg: { light: "#0ACC9214", dark: "#77C7AF0D" },
            border: { light: "#026AA233", dark: "#7CD4FD33" },
            hoverBg: { light: "#026AA20D", dark: "#7CD4FD0D" },
        },
        {
            text: { light: "#C4320A", dark: "#FCA89F" },
            bg: { light: "#F970661A", dark: "#FCA89F0D" },
            border: { light: "#C4320A33", dark: "#FCA89F33" },
            hoverBg: { light: "#F970660D", dark: "#FCA89F1A" },
        },
        {
            text: { light: "#1D3A5F", dark: "#8FB3E8" },
            bg: { light: "#2E90FA14", dark: "#8FB3E80D" },
            border: { light: "#1D3A5F33", dark: "#8FB3E833" },
            hoverBg: { light: "#2E90FA0D", dark: "#8FB3E80D" },
        },
    ]


    const completedMilestones = gig.milestones.filter((m) => m.isPaid).length
    const totalMilestones = gig.milestones.length
    const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

    const isDeadlineNear = () => {
        const deadline = new Date(gig.deadline)
        const today = new Date()
        const diffTime = deadline.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7 && diffDays > 0
    }

    const handleNavigateToBidDetails = (jobId) => {
        navigate(`/client-dashboard/gig/${jobId}`)
    }

    const handleManageProject = (gig) => {
        if(gig.status !== "in-progress" && gig.status !== "completed") {
            toast.info("Project is not in progress or completed. You can only manage projects that are currently in progress or completed.")
            return
        }
        setSelectedGig(gig)
        setIsProjectManagementOpen(true)
    }

    

    return (
        <>
            <ToastContainer/>
            <Card className="group border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                                <AvatarImage src={gig.image || "/placeholder.svg"} alt={gig.category} className="flex object-contain" />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                                    {gig.category.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {gig.title}
                                    </CardTitle>
                                    <Badge variant="outline" className={getStatusColor(gig.status)}>
                                        {gig.status === "in-progress"
                                            ? "In Progress"
                                            : gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                                    </Badge>
                                </div>
                                <CardDescription className="text-gray-600 line-clamp-2 mb-3">{gig.description}</CardDescription>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className={getJobTypeColor(gig.jobType)}>
                                        <Briefcase className="w-3 h-3 mr-1" />
                                        {gig.jobType}
                                    </Badge>
                                    <Badge variant="secondary" className={getExperienceLevelColor(gig.experienceLevel)}>
                                        <Award className="w-3 h-3 mr-1" />
                                        {gig.experienceLevel}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {gig.location}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent hover:bg-blue-50" onClick={() => handleNavigateToBidDetails(gig._id)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent hover:bg-green-50">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Budget and Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <IndianRupee className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-green-800">Total Budget</p>
                                <p className="text-lg font-bold text-green-900">{formatCurrency(gig.budget)}</p>
                            </div>
                        </div>

                        <div
                            className={`flex items-center gap-3 border p-3 rounded-lg ${isDeadlineNear() ? "bg-orange-50 border-orange-200" : "bg-blue-50 border-blue-200"}`}
                        >
                            <div className={`p-2 rounded-lg ${isDeadlineNear() ? "bg-orange-100 " : "bg-blue-100"}`}>
                                <Calendar01Icon className={`w-5 h-5 ${isDeadlineNear() ? "text-orange-600" : "text-blue-600"}`} />
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${isDeadlineNear() ? "text-orange-800" : "text-blue-800"}`}>
                                    Deadline
                                </p>
                                <p className={`text-lg font-bold ${isDeadlineNear() ? "text-orange-900" : "text-blue-900"}`}>
                                    {formatDate(gig.deadline)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Target className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-purple-800">Category</p>
                                <p className="text-lg font-bold text-purple-900">{gig.category}</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {gig.skills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                                    style={{
                                        color: tagStyles[index % tagStyles.length].text.light,
                                        backgroundColor: tagStyles[index % tagStyles.length].bg.light,
                                        borderColor: tagStyles[index % tagStyles.length].border?.light || "transparent",
                                    }}
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Milestones Progress */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Project Milestones
                            </h4>
                            <span className="text-sm text-gray-600">
                                {completedMilestones}/{totalMilestones} completed
                            </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 mb-3" />
                        <div className="space-y-2">
                            {gig.milestones.map((milestone, index) => (
                                <div
                                    key={milestone._id}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${milestone.isPaid ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {milestone.isPaid ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-gray-400" />
                                        )}
                                        <span className={`text-sm ${milestone.isPaid ? "text-green-800" : "text-gray-700"}`}>
                                            {milestone.description}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-semibold ${milestone.isPaid ? "text-green-800" : "text-gray-700"}`}>
                                            {formatCurrency(milestone.amount)}
                                        </span>
                                        {milestone.isPaid && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                                Paid
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    {gig.benefits.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Benefits
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {gig.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Created {formatDate(gig.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {gig.proposals} {gig.proposals == 1 ? "Proposal" : "Proposals"}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                                View Details
                            </Button>
                            <Button
                                onClick={() => handleManageProject(gig)}
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                Manage Project
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <ProjectManagement gig={selectedGig} isOpen={isProjectManagementOpen} onClose={() => setIsProjectManagementOpen(false)} />
        </>
    )
}
