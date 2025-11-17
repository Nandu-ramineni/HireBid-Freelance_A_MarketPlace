
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Users, Briefcase, Star, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import DataTable from './DataTable'
import { columns } from './Columns'
import { ActivityFeed } from './ActivityFeed'
import DateRangePicker from './DateRangePicker'
import { Wallet01Icon } from "hugeicons-react"
import Projects from "./Projects"

const monthlyData = [
  { name: "Jan", total: 4500, clients: 35, completed: 180 },
  { name: "Feb", total: 5200, clients: 42, completed: 220 },
  { name: "Mar", total: 4800, clients: 38, completed: 210 },
  { name: "Apr", total: 6100, clients: 45, completed: 250 },
  { name: "May", total: 7200, clients: 52, completed: 290 },
  { name: "Jun", total: 6800, clients: 48, completed: 270 },
  { name: "Jul", total: 7500, clients: 55, completed: 310 },
  { name: "Aug", total: 8200, clients: 60, completed: 340 },
  { name: "Sep", total: 8800, clients: 65, completed: 360 },
  { name: "Oct", total: 9100, clients: 68, completed: 380 },
  { name: "Nov", total: 9500, clients: 72, completed: 400 },
  { name: "Dec", total: 10200, clients: 78, completed: 430 },
]

const categoryData = [
  { name: "Web Development", value: 35 },
  { name: "Mobile Apps", value: 25 },
  { name: "UI/UX Design", value: 20 },
  { name: "Consulting", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]



const Dashboard = ({ financialOverview, freelancerAnalytics, user }) => {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })
  //   const [period, setPeriod] = useState("year")

  // Calculate summary statistics
  const totalEarnings = monthlyData.reduce((sum, item) => sum + item.total, 0)
  const totalCompleted = freelancerAnalytics?.totalCompletedJobs || monthlyData.reduce((sum, item) => sum + item.completed, 0)
  const totalClients = freelancerAnalytics?.totalActiveProjects || monthlyData[monthlyData.length - 1].clients

  // Generate table data
  const generateTableData = () => {
  if (!freelancerAnalytics?.allProjects) return []
  const statusMap = {
    "in-progress": "In-Progress",
    "pending": "Pending",
    "completed": "Completed",
    "canceled": "Canceled",
    "open": "Pending", // optional, if "open" jobs exist
    "closed": "Canceled", // optional, for archived jobs
  };

  return freelancerAnalytics?.allProjects?.map((project, i) => ({
    id: `PRJ-${1000 + i}`,
    project: project?.job?.title,
    client: project?.job?.clientCompanyName,
    amount: project?.job?.budget,
    status: statusMap[project?.job?.status] || "Pending", // fallback to Pending
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  }));
};

const tableData = generateTableData();


  // Calculate percentage changes
  const earningsChange = (
    ((financialOverview?.data?.thisMonthEarnings - financialOverview?.data?.lastMonthEarnings) /
      financialOverview?.data?.totalEarnings) *
    100
  ).toFixed(1) || 0
  const completedChange = (
    ((monthlyData[monthlyData.length - 1].completed - monthlyData[monthlyData.length - 2].completed) /
      monthlyData[monthlyData.length - 2].completed) *
    100
  ).toFixed(1) || 0
  const clientsChange = (
    ((monthlyData[monthlyData.length - 1].clients - monthlyData[monthlyData.length - 2].clients) /
      monthlyData[monthlyData.length - 2].clients) *
    100
  ).toFixed(1)
  const ratingChange = "+7.0"
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex flex-col gap-4 p-6 h-[91vh] overflow-y-scroll" style={{ scrollbarWidth: "thin" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your business performance at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker date={dateRange} setDate={setDateRange} />
          <Select defaultValue="year">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full">
              <Wallet01Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-1">{formatCurrency(financialOverview?.data?.totalEarnings || 0)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {Number.parseFloat(earningsChange) > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={Number.parseFloat(earningsChange) > 0 ? "text-emerald-500" : "text-red-500"}>
                {earningsChange || 0}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {Number.parseFloat(completedChange) > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={Number.parseFloat(completedChange) > 0 ? "text-emerald-500" : "text-red-500"}>
                {completedChange || 0}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {Number.parseFloat(clientsChange) > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={Number.parseFloat(clientsChange) > 0 ? "text-emerald-500" : "text-red-500"}>
                {clientsChange}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full">
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.freelancerProfile?.avgRating}/5</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">{ratingChange}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    total: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[350px]"
                >
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Project Categories</CardTitle>
                <CardDescription>Distribution by project type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Clients and completed projects over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    clients: {
                      label: "Active Clients",
                      color: "hsl(var(--chart-2))",
                    },
                    completed: {
                      label: "Completed Projects",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[350px]"
                >
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="clients"
                      stroke="var(--color-clients)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="var(--color-completed)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Details of your most recent projects</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={tableData} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export</Button>
              <Button>View All Projects</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed performance metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  total: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-total)"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>Generated reports for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12">Reports content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Track and manage all your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Projects freelancerAnalytics={freelancerAnalytics} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
