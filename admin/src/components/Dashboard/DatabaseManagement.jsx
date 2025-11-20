"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Database,
    HardDrive,
    Activity,
    Zap,
    Download,
    RefreshCw,
    AlertTriangle,
    CheckCircle
} from "lucide-react"

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Legend
} from "recharts"

export function DatabaseManagement({ dbStats, serverStats, apiLatency }) {
    const [history, setHistory] = useState({
        memory: [],
        apiLatency: [],
        dbSize: []
    })

    useEffect(() => {
        if (!dbStats || !serverStats || !apiLatency) return

        const now = new Date().toLocaleTimeString()

        setHistory(prev => ({
            memory: [
                ...prev.memory.slice(-19),
                {
                    time: now,
                    usedPercent: Number(serverStats?.memory?.usedPercent || 0)
                }
            ],
            apiLatency: [
                ...prev.apiLatency.slice(-19),
                {
                    time: now,
                    avgResponse: Number(
                        apiLatency?.averageResponseTime?.replace(" ms", "") || 0
                    )
                }
            ],
            dbSize: [
                ...prev.dbSize.slice(-19),
                {
                    time: now,
                    totalSizeMB: Number(dbStats?.totalSizeMB || 0)
                }
            ]
        }))
    }, [dbStats, serverStats, apiLatency]) // Update charts when Redux state updates

    // const memoryData = history.memory
    // const apiLatencyData = history.apiLatency
    const dbSizeData = history.dbSize

    const recentRequestsData =
        apiLatency?.recentRequests?.map((r, i) => ({
            id: i + 1,
            route: r.route,
            duration: r.duration
        })) || []

    const formatUptime = seconds => {
        if (!seconds) return "N/A"
        const s = Math.floor(seconds)
        const d = Math.floor(s / 86400)
        const h = Math.floor((s % 86400) / 3600)
        const m = Math.floor((s % 3600) / 60)
        return d > 0 ? `${d}d ${h}h` : `${h}h ${m}m`
    }

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Database Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Real-time monitoring powered by your backend Admin APIs.
                    </p>

                    {serverStats && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Uptime: <span className="font-medium">{formatUptime(serverStats.uptime)}</span>
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Backup Now
                    </Button>
                </div>
            </div>

            {/* CARDS */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* DB Size */}
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm">Database Size</CardTitle>
                        <Database className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dbStats ? `${dbStats.totalSizeMB} MB` : "--"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Collections: {dbStats?.collections}
                        </p>
                    </CardContent>
                </Card>

                {/* Memory */}
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm">Memory Usage</CardTitle>
                        <HardDrive className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{serverStats?.memory?.usedPercent}%</div>
                        <Progress className="mt-2" value={serverStats?.memory?.usedPercent} />
                    </CardContent>
                </Card>

                {/* API Latency */}
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm">API Latency</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{apiLatency?.averageResponseTime}</div>
                        <p className="text-xs text-muted-foreground">Average response time</p>
                    </CardContent>
                </Card>

                {/* Server Status */}
                <Card>
                    <CardHeader className="flex justify-between pb-2">
                        <CardTitle className="text-sm">CPU Cores</CardTitle>
                        <Activity className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{serverStats?.cpuCores}</div>
                        <p className="text-xs text-muted-foreground">CPU Load Avg</p>
                    </CardContent>
                </Card>
            </div>

            {/* TABS */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="latency">Latency</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Database Health */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Database Health</CardTitle>
                                <CardDescription>Live health metrics</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm">Index Count</span>
                                    <Badge>{dbStats?.indexes}</Badge>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm">Average Document Size</span>
                                    <span className="font-medium">{dbStats?.avgObjSize.toFixed(1)} bytes</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* DB Size Trend */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Database Size Trend</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={dbSizeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" hide />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="totalSizeMB" stroke="currentColor" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* PERFORMANCE TAB */}
                <TabsContent value="performance" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Memory Usage Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Memory Usage Trend</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={history.memory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" hide />
                                        <YAxis unit="%" />
                                        <Tooltip />
                                        <Line dataKey="usedPercent" name="Used (%)" stroke="currentColor" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* API Latency Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>API Response Time Trend</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={history.apiLatency}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" hide />
                                        <YAxis unit="ms" />
                                        <Tooltip />
                                        <Line dataKey="avgResponse" stroke="currentColor" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* LATENCY TAB */}
                <TabsContent value="latency" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent API Request Duration</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={recentRequestsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="route" tick={{ fontSize: 10 }} />
                                    <YAxis unit="ms" />
                                    <Tooltip />
                                    <Bar dataKey="duration" fill="currentColor" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* MAINTENANCE TAB */}
                <TabsContent value="maintenance">
                    <div className="text-center py-12">
                        <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Maintenance Coming Soon</h3>
                        <Button>Schedule Tasks</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
