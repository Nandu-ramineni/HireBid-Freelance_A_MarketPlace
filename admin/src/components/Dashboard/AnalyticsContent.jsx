import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, DollarSign, Briefcase, Calendar, Download, RefreshCw, ArrowUpRight, ArrowDownRight, } from "lucide-react"
import { Briefcase02Icon, UserGroupIcon, Wallet01Icon } from "hugeicons-react"

export function AnalyticsContent({users}) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(value);
    }
    const analyticsData = {
        overview: {
            totalRevenue: `${formatCurrency(users?.totalRevenue) || 0}`,
            revenueChange: "+12.5%",
            totalUsers: `${users?.totalUsers || 0}`,
            usersChange: "+8.2%",
            activeProjects:  `${users?.totalActiveProjects || 0}`,
            projectsChange: "-2.4%",
            conversionRate: `${users?.totalGrowth || 0}%`,
            conversionChange: "+0.8%",
        },
        monthlyData: [
            { month: "Jan", revenue: 12000, users: 150, projects: 45 },
            { month: "Feb", revenue: 15000, users: 180, projects: 52 },
            { month: "Mar", revenue: 18000, users: 220, projects: 48 },
            { month: "Apr", revenue: 22000, users: 280, projects: 65 },
            { month: "May", revenue: 25000, users: 320, projects: 72 },
            { month: "Jun", revenue: 28000, users: 380, projects: 68 },
        ],
        topCategories: [
            { name: "Web Development", projects: 45, revenue: "$35,200", growth: "+15%" },
            { name: "Mobile Apps", projects: 32, revenue: "$28,500", growth: "+8%" },
            { name: "UI/UX Design", projects: 28, revenue: "$22,100", growth: "+12%" },
            { name: "Content Writing", projects: 24, revenue: "$18,300", growth: "+5%" },
            { name: "Digital Marketing", projects: 18, revenue: "$15,800", growth: "+18%" },
        ],
        userMetrics: {
            totalUsers: 2847,
            activeUsers: 2156,
            newUsers: 234,
            returningUsers: 1922,
            userRetention: 76,
            avgSessionDuration: "8m 32s",
        },
        revenueMetrics: {
            totalRevenue: 125430,
            monthlyRecurring: 45200,
            oneTimePayments: 80230,
            averageOrderValue: 285,
            revenueGrowth: 12.5,
            topPayingClients: [
                { name: "TechCorp Inc.", amount: "$12,500", projects: 8 },
                { name: "StartupXYZ", amount: "$9,800", projects: 5 },
                { name: "DesignStudio", amount: "$8,200", projects: 6 },
            ],
        },
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">Comprehensive insights into your platform performance.</p>
                </div>
                <div className="flex gap-3">
                    <Select defaultValue="30days">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="1year">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                            <Wallet01Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {analyticsData.overview.totalRevenue}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">{analyticsData.overview.revenueChange}</span>
                            <span>from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <UserGroupIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {analyticsData.overview.totalUsers}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">{analyticsData.overview.usersChange}</span>
                            <span>from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <Briefcase02Icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {analyticsData.overview.activeProjects}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <ArrowDownRight className="h-3 w-3 text-red-500" />
                            <span className="text-red-600 dark:text-red-400">{analyticsData.overview.projectsChange}</span>
                            <span>from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {analyticsData.overview.conversionRate}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">{analyticsData.overview.conversionChange}</span>
                            <span>from last month</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Revenue Chart Placeholder */}
                        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
                                <CardDescription>Monthly revenue growth over the last 6 months</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <div className="text-center">
                                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Revenue Chart Visualization</p>
                                        <p className="text-xs text-muted-foreground mt-1">Interactive chart would be displayed here</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Categories */}
                        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Top Categories</CardTitle>
                                <CardDescription>Most popular project categories by revenue</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {analyticsData.topCategories.map((category, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">{category.name}</span>
                                                <span className="text-sm font-semibold">{category.revenue}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{category.projects} projects</span>
                                                <span className="text-green-600 dark:text-green-400">{category.growth}</span>
                                            </div>
                                            <Progress value={(category.projects / 50) * 100} className="h-2 mt-2" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">User Metrics</CardTitle>
                                <CardDescription>Key user engagement statistics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Total Users</span>
                                    <span className="font-semibold">{analyticsData.userMetrics.totalUsers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Active Users</span>
                                    <span className="font-semibold">{analyticsData.userMetrics.activeUsers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">New Users</span>
                                    <span className="font-semibold">{analyticsData.userMetrics.newUsers}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Returning Users</span>
                                    <span className="font-semibold">{analyticsData.userMetrics.returningUsers.toLocaleString()}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">User Retention</span>
                                        <span className="font-semibold">{analyticsData.userMetrics.userRetention}%</span>
                                    </div>
                                    <Progress value={analyticsData.userMetrics.userRetention} className="h-2" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Avg Session Duration</span>
                                    <span className="font-semibold">{analyticsData.userMetrics.avgSessionDuration}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
                                <CardDescription>User acquisition and retention trends</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <div className="text-center">
                                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">User Growth Chart</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Interactive user analytics would be displayed here
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="revenue" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Revenue Breakdown</CardTitle>
                                <CardDescription>Revenue sources and metrics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                                    <span className="font-semibold">${analyticsData.revenueMetrics.totalRevenue.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Monthly Recurring</span>
                                    <span className="font-semibold">
                                        ${analyticsData.revenueMetrics.monthlyRecurring.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">One-time Payments</span>
                                    <span className="font-semibold">
                                        ${analyticsData.revenueMetrics.oneTimePayments.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Average Order Value</span>
                                    <span className="font-semibold">${analyticsData.revenueMetrics.averageOrderValue}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Revenue Growth</span>
                                        <span className="font-semibold text-green-600">+{analyticsData.revenueMetrics.revenueGrowth}%</span>
                                    </div>
                                    <Progress value={analyticsData.revenueMetrics.revenueGrowth * 5} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Top Paying Clients</CardTitle>
                                <CardDescription>Highest revenue generating clients</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {analyticsData.revenueMetrics.topPayingClients.map((client, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                    >
                                        <div>
                                            <div className="font-medium">{client.name}</div>
                                            <div className="text-sm text-muted-foreground">{client.projects} projects</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-green-600">{client.amount}</div>
                                            <Badge variant="outline" className="text-xs">
                                                #{index + 1}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Project Status Distribution</CardTitle>
                                <CardDescription>Current status of all projects</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <div className="text-center">
                                        <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Project Status Chart</p>
                                        <p className="text-xs text-muted-foreground mt-1">Pie chart showing project distribution</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Project Timeline</CardTitle>
                                <CardDescription>Project completion trends over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <div className="text-center">
                                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Project Timeline Chart</p>
                                        <p className="text-xs text-muted-foreground mt-1">Timeline visualization of project milestones</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
