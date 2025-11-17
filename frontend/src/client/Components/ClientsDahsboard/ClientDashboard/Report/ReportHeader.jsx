import React from 'react'
import { Calendar, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
const ReportHeader = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    return (
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-8 w-8" />
                        <h1 className="text-3xl font-bold">HireBid</h1>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Project Analytics Report</h2>
                    <p className="text-blue-100">Comprehensive overview of project performance and revenue</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2 text-blue-100 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>Generated on</span>
                    </div>
                    <p className="text-lg font-semibold">{currentDate}</p>
                </div>
            </div>
        </Card>
    )
}

export default ReportHeader