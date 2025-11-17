import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Menu, User, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { DashboardStats } from "./DashboardStats"
import { ProjectOverview } from "./ProjectOverview"
import { RevenueChart } from "./RevenueChart"
import { QuickActions } from "./QuickActions"
import { RecentActivity } from "./RecentActivity"
import { NotificationsPanel } from "./NotificationsPanel"
import { OfficeIcon, Search01Icon } from "hugeicons-react"

export default function PremiumDashboard({client,clientGigs}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex items-center justify-center h-full w-full">
                  <OfficeIcon className="h-6 w-6 text-white " />
                </div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {client?.clientProfile?.company || "Client Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* <div className="relative hidden md:block text-slate-800">
              <Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"  />
              <Input
                placeholder="Search projects, clients..."
                className="w-64 pl-10 bg-slate-100 backdrop-blur-sm border-0"
              />
            </div> */}


            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs text-center flex justify-center bg-red-500">3</Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://res.cloudinary.com/nanduvarma/image/upload/v1729357587/profile_images/1729357561839-me.jpg" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">clientuser</p>
                    <p className="text-xs leading-none text-muted-foreground">client@gmail.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Welcome back, {client?.clientProfile?.company || "Client User"}! 👋</h2>
          <p className="text-muted-foreground">Here's what's happening with your projects and business today.</p>
        </div>

        {/* Stats Overview */}
        <DashboardStats clientGigs={clientGigs} />

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <RevenueChart  clientGigs={clientGigs}/>
            <ProjectOverview clientGigs={clientGigs}/>
            <NotificationsPanel />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
            <div className="grid gap-4 md:grid-cols-1">
            <div className="p-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <h3 className="text-lg font-semibold mb-2">This Month</h3>
              <div className="text-3xl font-bold">$67,500</div>
              <p className="text-green-100">Revenue Generated</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Active Now</h3>
              <div className="text-3xl font-bold">12</div>
              <p className="text-blue-100">Team Members Online</p>
            </div>
          </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          

          {/* Performance Metrics */}
          
        </div>
      </main>
    </div>
  )
}
