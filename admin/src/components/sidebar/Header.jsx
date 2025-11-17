import { Bell, Search, Settings, Moon, Sun, User, LogOut, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

const notifications = [
    {
        id: 1,
        title: "New user registration",
        description: "John Doe has registered as a freelancer",
        time: "2m ago",
        type: "user",
        read: false,
    },
    {
        id: 2,
        title: "Payment processed",
        description: "$2,500 payment completed for Project #1234",
        time: "5m ago",
        type: "payment",
        read: false,
    },
    {
        id: 3,
        title: "System alert",
        description: "Server load is above 80%",
        time: "10m ago",
        type: "system",
        read: true,
    },
    {
        id: 4,
        title: "Project completed",
        description: "Mobile App UI/UX Design has been completed",
        time: "1h ago",
        type: "project",
        read: true,
    },
    {
        id: 5,
        title: "New bid submitted",
        description: "Alice Johnson submitted a bid for Web Development project",
        time: "2h ago",
        type: "bid",
        read: true,
    },
];

export function AdminHeader() {
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        }
    }, []);
    useEffect(() => {
        setMounted(true);
        setUnreadCount(notifications.filter((n) => !n.read).length);
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    };


    if (!mounted) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <div className="w-64 h-10 bg-muted animate-pulse rounded-md" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted animate-pulse rounded-md" />
                        <div className="w-10 h-10 bg-muted animate-pulse rounded-md" />
                        <div className="w-10 h-10 bg-muted animate-pulse rounded-full" />
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <div className="relative flex-1 w-80 ">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search users, projects, transactions..."
                            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative items-center cursor-pointer">
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                {unreadCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                                        {unreadCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel className="font-semibold">Notifications ({unreadCount} unread)</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className="flex flex-col items-start gap-1 p-4 cursor-pointer"
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <span className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                                                {notification.title}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                                                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                                            </div>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{notification.description}</span>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-center justify-center">View all notifications</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Admin User</p>
                                    <p className="text-xs leading-none text-muted-foreground">admin@hirebid.com</p>
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
                            <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Security</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <HelpCircle className="mr-2 h-4 w-4" />
                                <span>Help & Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}