import  React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Briefcase, Clock, Target, Award, IndianRupee } from "lucide-react"
import { Award04Icon, Briefcase05Icon, Clock01Icon, Target01Icon, UserMultipleIcon } from "hugeicons-react"



function StatCard({ title, value, change, trend, icon, description }) {
    return (
        <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-blue-600 h-8 w-8 bg-slate-200 rounded-full flex justify-center items-center">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold pb-2">{value}</div>
                <div className="flex items-center space-x-2 text-xs">
                    <div className={`flex items-center ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="ml-1">{change}</span>
                    </div>
                    <span className="text-muted-foreground">{description}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export function DashboardStats({clientGigs}) {
    const activeGigs = clientGigs.filter((gig) => gig.status === "open" || gig.status === "in-progress").length
    const completedGigs = clientGigs.filter((gig) => gig.status === "completed").length
    const totalBudget = clientGigs.reduce((sum, gig) => sum + gig.budget, 0)
    const formatBudget = (budget) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(budget)
    }
    const stats = [
        {
            title: "Total Revenue",
            value: formatBudget(totalBudget),
            change: "+12.5%",
            trend: "up" ,
            icon: <IndianRupee className="h-4 w-4" />,
            description: "from last month",
        },
        {
            title: "Active Projects",
            value: activeGigs,
            change: "+2",
            trend: "up" ,
            icon: <Briefcase05Icon className="h-4 w-4" />,
            description: "new this month",
        },
        {
            title: "Completed Projects",
            value: completedGigs,
            change: "+4",
            trend: "up" ,
            icon: <UserMultipleIcon className="h-4 w-4" />,
            description: "total members",
        },
        {
            title: "Avg. Response Time",
            value: "2.4h",
            change: "-15%",
            trend: "up" ,
            icon: <Clock01Icon className="h-4 w-4" />,
            description: "improved",
        },
        {
            title: "Success Rate",
            value: "98.5%",
            change: "+2.1%",
            trend: "up" ,
            icon: <Target01Icon className="h-4 w-4" />,
            description: "project completion",
        },
        // {
        //     title: "Client Satisfaction",
        //     value: "4.9/5",
        //     change: "+0.2",
        //     trend: "up" ,
        //     icon: <Award04Icon className="h-4 w-4" />,
        //     description: "average rating",
        // },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    )
}
