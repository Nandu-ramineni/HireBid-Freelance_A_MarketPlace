"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    FileText,
    Download,
    Calendar,
    TrendingUp,
    Users,
    Briefcase,
    BarChart3,
    PieChart,
    LineChart,
} from "lucide-react"

export function ReportsContent() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground mt-1">Generate comprehensive reports and analyze platform performance.</p>
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
                        <Calendar className="mr-2 h-4 w-4" />
                        Custom Range
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export All
                    </Button>
                </div>
            </div>

            {/* Report Categories */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Platform Summary</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Executive Report</div>
                                <p className="text-xs text-muted-foreground">Complete platform overview</p>
                                <Button size="sm" className="mt-3 w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Revenue Analysis</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$125,430</div>
                                <p className="text-xs text-muted-foreground">Total revenue this month</p>
                                <Button size="sm" className="mt-3 w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">User Activity</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2,847</div>
                                <p className="text-xs text-muted-foreground">Active users</p>
                                <Button size="sm" className="mt-3 w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Project Stats</CardTitle>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">156</div>
                                <p className="text-xs text-muted-foreground">Active projects</p>
                                <Button size="sm" className="mt-3 w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Trends</CardTitle>
                                <CardDescription>Monthly revenue growth analysis</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                                    <div className="text-center">
                                        <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Revenue trend chart would be displayed here</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>User Distribution</CardTitle>
                                <CardDescription>Breakdown of user types and activity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                                    <div className="text-center">
                                        <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">User distribution chart would be displayed here</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="financial" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Summary</CardTitle>
                                <CardDescription>Complete financial overview</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Revenue</span>
                                    <span className="font-semibold">$125,430</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Platform Fees</span>
                                    <span className="font-semibold">$6,271</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payouts</span>
                                    <span className="font-semibold">$119,159</span>
                                </div>
                                <Button className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Methods</CardTitle>
                                <CardDescription>Breakdown by payment method</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Stripe</span>
                                    <span className="font-semibold">65%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">PayPal</span>
                                    <span className="font-semibold">25%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Bank Transfer</span>
                                    <span className="font-semibold">10%</span>
                                </div>
                                <Button className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction Volume</CardTitle>
                                <CardDescription>Monthly transaction analysis</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">This Month</span>
                                    <span className="font-semibold">1,847</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last Month</span>
                                    <span className="font-semibold">1,623</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Growth</span>
                                    <span className="font-semibold text-green-600">+13.8%</span>
                                </div>
                                <Button className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-6">
                    <div className="text-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">User Reports</h3>
                        <p className="text-muted-foreground mb-4">Comprehensive user analytics and reports</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                    <div className="text-center py-12">
                        <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Project Reports</h3>
                        <p className="text-muted-foreground mb-4">Detailed project analytics and performance metrics</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                    <div className="text-center py-12">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Performance Reports</h3>
                        <p className="text-muted-foreground mb-4">Platform performance and system analytics</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
