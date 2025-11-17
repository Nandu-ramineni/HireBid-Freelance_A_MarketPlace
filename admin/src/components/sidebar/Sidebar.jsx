import {  BarChart3,  Users,  Briefcase,  DollarSign,  Settings,  Shield,  FileText,  Bell,  TrendingUp,  UserCheck,  Wallet,  MessageSquare,  Database,  Crown,} from "lucide-react";
import { Link } from "react-router-dom";
import {  Sidebar,  SidebarContent,  SidebarFooter,  SidebarGroup,  SidebarGroupContent,  SidebarGroupLabel,  SidebarHeader,  SidebarMenu,  SidebarMenuButton,  SidebarMenuItem,  SidebarSeparator,} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Logo from "@/assets/Logo.png";
const navigationItems = [
    {
        id: "overview",
        title: "Overview",
        icon: BarChart3,
        badge: null,
        path: "/",
    },
    {
        id: "analytics",
        title: "Analytics",
        icon: TrendingUp,
        badge: null,
        path: "/analytics",
    },
];

const managementItems = [
    {
        id: "clients",
        title: "Clients",
        icon: Users,
        badge: "1,247",
        path: "/clients",
    },
    {
        id: "freelancers",
        title: "Freelancers",
        icon: UserCheck,
        badge: "892",
        path: "/freelancers",
    },
    {
        id: "projects",
        title: "Projects",
        icon: Briefcase,
        badge: "156",
        path: "/projects",
    },
    {
        id: "bids",
        title: "Bids",
        icon: FileText,
        badge: "2,341",
        path: "/bids",
    },
    // {
    //     id: "messages",
    //     title: "Messages",
    //     icon: MessageSquare,
    //     badge: "47",
    //     path: "/messages",
    // },
];

const financialItems = [
    {
        id: "payments",
        title: "Payments",
        icon: DollarSign,
        badge: null,
        path: "/payments",
    },
    {
        id: "transactions",
        title: "Transactions",
        icon: Wallet,
        badge: null,
        path: "/transactions",
    },
    {
        id: "reports",
        title: "Reports",
        icon: FileText,
        badge: null,
        path: "/reports",
    },
];

const systemItems = [
    {
        id: "notifications",
        title: "Notifications",
        icon: Bell,
        badge: "12",
        path: "/notifications",
    },
    {
        id: "security",
        title: "Security",
        icon: Shield,
        badge: null,
        path: "/security",
    },
    {
        id: "database",
        title: "Database",
        icon: Database,
        badge: null,
        path: "/database",
    },
    {
        id: "settings",
        title: "Settings",
        icon: Settings,
        badge: null,
        path: "/settings",
    },
];

export function AdminSidebar({ activeSection, setActiveSection }) {
    return (
        <Sidebar className="border-r border-slate-200/60 dark:border-slate-800/60">
            <SidebarHeader className="border-b border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 px-3 py-4">
                    <div className="flex h-10 w-10 items-center justify-center   text-white ">
                        {/* <Crown className="h-5 w-5" /> */}
                        <img src={Logo} alt="Logo" className="h-10 w-10" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                            HireBid
                        </span>
                        <span className="text-xs text-muted-foreground">Admin Panel</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm overflow-x-hidden">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <Link to={item.path}>
                                        <SidebarMenuButton
                                            onClick={() => setActiveSection(item.id)}
                                            isActive={activeSection === item.id}
                                            className="hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 cursor-pointer"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                            {item.badge && (
                                                <Badge variant="secondary" className="ml-auto text-xs">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="bg-slate-200/60 dark:bg-slate-800/60" />

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {managementItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <Link to={item.path}>
                                        <SidebarMenuButton
                                            onClick={() => setActiveSection(item.id)}
                                            isActive={activeSection === item.id}
                                            className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 cursor-pointer"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                            {item.badge && (
                                                <Badge
                                                    variant="outline"
                                                    className="ml-auto text-xs border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="bg-slate-200/60 dark:bg-slate-800/60" />

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Financial
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {financialItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <Link to={item.path}>
                                        <SidebarMenuButton
                                            onClick={() => setActiveSection(item.id)}
                                            isActive={activeSection === item.id}
                                            className="hover:bg-amber-50 dark:hover:bg-amber-950/50 hover:text-amber-700 dark:hover:text-amber-300 transition-all duration-200 cursor-pointer"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="bg-slate-200/60 dark:bg-slate-800/60" />

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        System
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {systemItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <Link to={item.path}>
                                        <SidebarMenuButton
                                            onClick={() => setActiveSection(item.id)}
                                            isActive={activeSection === item.id}
                                            className="hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 cursor-pointer"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                            {item.badge && (
                                                <Badge variant="destructive" className="ml-auto text-xs">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 px-3 py-4">
                    <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-semibold">
                            AD
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">Admin User</span>
                        <span className="text-xs text-muted-foreground truncate">admin@hirebid.com</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}