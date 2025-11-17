import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Play, XCircle } from "lucide-react"
const StatusOverview = ({ statusCount, totalJobs }) => {
    const statusConfig = [
        {
            key: "completed",
            label: "Completed",
            value: statusCount?.completed,
            color: "text-green-600",
            bgColor: "bg-green-100",
            icon: CheckCircle,
        },
        {
            key: "in-progress",
            label: "In Progress",
            value: statusCount["in-progress"],
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            icon: Play,
        },
        {
            key: "open",
            label: "Open",
            value: statusCount?.open,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            icon: Clock,
        },
        {
            key: "closed",
            label: "Closed",
            value: statusCount?.closed,
            color: "text-red-600",
            bgColor: "bg-red-100",
            icon: XCircle,
        },
    ]

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Project Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {statusConfig.map((status) => {
                        const Icon = status.icon
                        const percentage = totalJobs > 0 ? (status.value / totalJobs) * 100 : 0

                        return (
                            <div key={status.key} className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${status.bgColor}`}>
                                        <Icon className={`h-5 w-5 ${status.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">{status.label}</p>
                                        <p className="text-2xl font-bold text-slate-800">{status.value}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">{percentage.toFixed(1)}%</span>
                                    </div>
                                    <Progress value={percentage} className="h-2" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Total Projects</span>
                        <span className="text-2xl font-bold text-slate-800">{totalJobs}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default StatusOverview