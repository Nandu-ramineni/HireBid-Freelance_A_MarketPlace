"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, HardDrive, Activity, Zap, Download, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

export function DatabaseManagement() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Database Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor database performance, manage backups, and optimize system resources.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Backup Now
                    </Button>
                    <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Optimize
                    </Button>
                </div>
            </div>

            {/* Database Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Database Size</CardTitle>
                        <Database className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4 GB</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
                        <HardDrive className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">68%</div>
                        <Progress value={68} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Query Performance</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">120ms</div>
                        <p className="text-xs text-muted-foreground">Average response time</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
                        <Activity className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">Current connections</p>
                    </CardContent>
                </Card>
            </div>

            {/* Database Management Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="backups">Backups</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Database Health</CardTitle>
                                <CardDescription>Current system status and health metrics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Connection Pool</span>
                                    <Badge variant="default" className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" />
                                        Healthy
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Replication Status</span>
                                    <Badge variant="default" className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" />
                                        Active
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Index Health</span>
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3" />
                                        Needs Optimization
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Backup Status</span>
                                    <Badge variant="default" className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" />
                                        Up to Date
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Table Statistics</CardTitle>
                                <CardDescription>Overview of database tables and their sizes</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Users</span>
                                        <span>2,847 rows (45 MB)</span>
                                    </div>
                                    <Progress value={25} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Projects</span>
                                        <span>1,234 rows (78 MB)</span>
                                    </div>
                                    <Progress value={45} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Transactions</span>
                                        <span>15,678 rows (156 MB)</span>
                                    </div>
                                    <Progress value={85} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Messages</span>
                                        <span>8,945 rows (23 MB)</span>
                                    </div>
                                    <Progress value={15} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="backups" className="space-y-6">
                    <div className="text-center py-12">
                        <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Database Backups</h3>
                        <p className="text-muted-foreground mb-4">Manage automated backups and restore points</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                    <div className="text-center py-12">
                        <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Performance Monitoring</h3>
                        <p className="text-muted-foreground mb-4">Real-time database performance metrics</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-6">
                    <div className="text-center py-12">
                        <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Database Maintenance</h3>
                        <p className="text-muted-foreground mb-4">Schedule maintenance tasks and optimizations</p>
                        <Button>Coming Soon</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
