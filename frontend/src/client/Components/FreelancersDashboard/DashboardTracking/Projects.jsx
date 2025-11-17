import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Clock01Icon, MapPinIcon } from 'hugeicons-react'
import { CalendarDays, CheckCircle, FileText, IndianRupee, LinkIcon, Users } from 'lucide-react'
import React from 'react'

const Projects = ({ freelancerAnalytics }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800 border-green-200"
            case "in-progress":
                return "bg-blue-100 text-blue-800 border-blue-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }
    const getCategoryColor = (category) => {
        const colors = {
            "content-writing": "bg-purple-100 text-purple-800",
            "web-development": "bg-orange-100 text-orange-800",
            cybersecurity: "bg-red-100 text-red-800",
            "Video Editing": "bg-pink-100 text-pink-800",
            Cybersecurity: "bg-red-100 text-red-800",
        }
        return colors[category] || "bg-gray-100 text-gray-800"
    }
    const getExperienceLevelColor = (level) => {
        const colors = {
            Beginner: "bg-yellow-100 text-yellow-800",
            Intermediate: "bg-cyan-100 text-cyan-800",
            Expert: "bg-green-100 text-green-800",
        }
        return colors[level] || "bg-gray-100 text-gray-800"
    }
    const getJobTypeColor = (type) => {
        const colors = {
            "Full Time": "bg-emerald-100 text-emerald-800",
            "Part Time": "bg-purple-100 text-purple-800",
            "Contract": "bg-orange-100 text-orange-800",
            "Internship": "bg-green-100 text-green-800",
        }
        return colors[type] || "bg-gray-100 text-gray-800"
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

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">All Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {freelancerAnalytics?.allProjects?.map((project) => {
                    const progressPercentage = (project.analytics.paidMilestones / project.analytics.totalMilestones) * 100

                    return (
                        <Card key={project.job._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2 flex-1">
                                        <CardTitle className="text-lg leading-tight">{project.job.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">{project.job.description}</CardDescription>
                                    </div>
                                    <Badge className={`ml-2 capitalize ${getStatusColor(project.job.status)}`}>{project.job.status}</Badge>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    <Badge variant="outline" className={getCategoryColor(project.job.category)}>
                                        {project.job.category}
                                    </Badge>
                                    <Badge variant="outline" className={getExperienceLevelColor(project.job.experienceLevel)}>
                                        {project.job.experienceLevel}
                                    </Badge>
                                    <Badge variant="outline" className={getJobTypeColor(project.job.jobType)}>
                                        {project.job.jobType}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Project Info */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <IndianRupee className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{formatCurrency(project.job.budget)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-gray-500" />
                                        <span>{formatDate(project.job.deadline)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="h-4 w-4 text-gray-500" />
                                        <span className="truncate">{project.job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <span>{project.analytics.totalMilestones} milestones</span>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700">Skills Required</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {project.job.skills.slice(0, 4).map((skill,index) => (
                                            <Badge key={skill} variant="secondary" className="text-xs"
                                                style={{
                                                    color: tagStyles[index % tagStyles.length].text.light,
                                                    backgroundColor: tagStyles[index % tagStyles.length].bg.light,
                                                    borderColor: tagStyles[index % tagStyles.length].border?.light || "transparent",
                                                }}
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                        {project.job.skills.length > 4 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{project.job.skills.length - 4} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Progress</span>
                                        <span>
                                            {project.analytics.paidMilestones}/{project.analytics.totalMilestones} milestones
                                        </span>
                                    </div>
                                    <Progress value={progressPercentage} className="h-2" />
                                </div>

                                {/* Earnings */}
                                <div className="flex justify-between items-center pt-2 border-t">
                                    <div className="text-sm">
                                        <span className="text-gray-600">Earned: </span>
                                        <span className="font-semibold text-green-600">
                                            {formatCurrency(project.analytics.totalEarnings)}
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-600">Pending: </span>
                                        <span className="font-semibold text-orange-600">
                                            {formatCurrency(project.job.budget - project.analytics.totalEarnings)}
                                        </span>
                                    </div>
                                </div>

                                {/* Milestones */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-gray-700">Milestones</h4>
                                    <div className="space-y-2">
                                        {project.job.milestones.map((milestone) => (
                                            <div
                                                key={milestone._id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{milestone.description}</p>
                                                    <p className="text-sm text-gray-600">{formatCurrency(milestone.amount)}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {milestone.isPaid ? (
                                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Paid
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                                                            <Clock01Icon className="h-3 w-3 mr-1" />
                                                            Pending
                                                        </Badge>
                                                    )}
                                                    {milestone.invoice && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-7 px-2 bg-transparent"
                                                            onClick={() => window.open(milestone.invoice, "_blank")}
                                                        >
                                                            <FileText className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Client Info */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700">Client Information</h4>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={project?.job?.clientLogo || "/default-avatar.png"}
                                            alt="Client Logo"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-900">{project?.job?.clientCompanyName}</p>
                                            <p className="text-xs text-gray-600">{project?.job?.clientEmail}</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 px-2 bg-transparent"
                                            onClick={() => window.open(project.job.clientWebsite, "_blank")}
                                        >
                                            <LinkIcon className="h-3 w-3" />
                                        </Button>
                                    </div> */}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default Projects