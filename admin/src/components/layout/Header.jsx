import { Bell, LogOut, Search, Settings, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Moon01Icon, Moon02Icon, SidebarLeft01Icon, Sun01Icon } from 'hugeicons-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';



const Header = ({ title = "Overview", setIsCollapsed, isCollapsed }) => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        }
    }, []);

    const handleLogout = () => {
        toast.success("Logged out successfully");
        navigate("/login");
    };
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


    return (
        <header className={cn(
            "fixed top-0 z-30 flex h-16 items-center justify-between px-6 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300",
            isCollapsed ? "w-[calc(100%-4rem)]" : "w-[calc(100%-15rem)]"
        )}
        >
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    onClick={() => setIsCollapsed(prev => !prev)} // toggle collapse
                >
                    <SidebarLeft01Icon className='h-6 w-6' />
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64 pl-8 bg-background border border-border/50 focus-visible:ring-primary/20"
                    />
                    
                </div>

                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-green-600"></span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 mr-4">
                            <div className="space-y-1">
                                <h4 className="font-medium">Notifications</h4>
                                <p className="text-sm text-muted-foreground">You have 3 unread notifications.</p>
                            </div>
                            <div className="mt-4 space-y-2">
                                {[1, 2, 3].map((n) => (
                                    <div key={n} className="flex gap-4 items-start p-2 rounded-md hover:bg-muted cursor-pointer">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                            <Bell className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">New order received</p>
                                            <p className="text-xs text-muted-foreground">Order #4839 needs approval</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-2 border-t">
                                <Button variant="link" className="w-full justify-center" size="sm">
                                    View all notifications
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent cursor-pointer"
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? (
                            <Moon02Icon className="h-5 w-5" />
                        ) : (
                            <Sun01Icon className="h-5 w-5 text-yellow-400" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent"
                        onClick={() => navigate("/settings")}
                    >
                        <Settings className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full" size="icon">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium">John Doe</p>
                                    <p className="text-xs text-muted-foreground">admin@example.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate("/settings")}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/settings")}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;
