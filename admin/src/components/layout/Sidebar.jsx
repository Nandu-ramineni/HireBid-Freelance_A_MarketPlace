import { Link, NavLink, useLocation } from 'react-router-dom';
import {
    Box,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    LayoutDashboard,
    Package,
    Settings,
    ShoppingBag,
    Truck,
    Users,
    FileText,
    Pill,
    Bell,
    Warehouse as WarehouseIcon,
    Building2,
    CircleUserRound,
    Store,
    BookOpen,
    Bookmark,
    Calculator,
    ListChecks,
    CalendarClock,
    FileSpreadsheet,
    LockKeyhole,
    BarChart3,
    ShoppingCart,
    Wallet,
    SendToBack,
    Headset,
    CreditCardIcon,
    Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AnalyticsUpIcon, Briefcase07Icon, File01Icon, MessengerIcon, UserGroupIcon, UserMultipleIcon, WaterfallDown01Icon } from 'hugeicons-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Logo from '@/assets/Logo.png';
const NavItem = ({ to, icon: Icon, label, isCollapsed }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <NavLink to={to} className="w-full">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                            isActive
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        <Icon className={cn("h-6 w-6 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                        {!isCollapsed && <span className="truncate">{label}</span>}
                    </Button>
                </NavLink>
            </TooltipTrigger>
            {isCollapsed && (
                <TooltipContent side="right" className="bg-background shadow-md border border-border/60">
                    {label}
                </TooltipContent>
            )}
        </Tooltip>
    );
};

const NavGroup = ({ title, children, isCollapsed }) => (
    <div className="space-y-1 pb-2 border-b -mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase ">
        {!isCollapsed && (
            <div className="px-3 py-2">
                <h3 className=" font-medium text-muted-foreground tracking-wider">{title}</h3>
            </div>
        )}
        {children}
    </div>
);

const Sidebar = ({ isCollapsed, setIsCollapsed, className }) => {
    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen overflow-y-scroll border-r border-border/60 bg-background/95 backdrop-blur-sm transition-all duration-300 ease-apple",
                isCollapsed ? "w-16" : "w-60",
                className
            )}
            style={{ scrollbarWidth: 'none', }}
        >
            <div className="border-b border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm h-16">
                <div className="flex items-center gap-3 px-3 py-4 m-auto pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl ">
                        <img src={Logo} alt="Logo" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                HireBid
                            </span>
                            <span className="text-xs text-muted-foreground">Admin Panel</span>
                        </div>
                    )}
                </div>
            </div>
            {/* {isCollapsed && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(false)}
                    className="absolute right-[-18px] top-4 z-10  group-hover:flex   rounded-full p-1  hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                    <ChevronRight className="h-4 w-4 mr-2" />
                </Button>
            )} */}
            <div
                className={cn(
                    "flex flex-col gap-4 overflow-y-scroll py-4 ",
                    isCollapsed && "items-center",
                    "h-[calc(100vh-8rem)]"
                )}
            >{/* nav groups below */}
                <NavGroup title="Dashboard" isCollapsed={isCollapsed}>
                    <NavItem to="/" icon={WaterfallDown01Icon} label="Overview" isCollapsed={isCollapsed} />
                    <NavItem to="/analytics" icon={AnalyticsUpIcon} label="Analytics" isCollapsed={isCollapsed} />
                </NavGroup>
                <NavGroup title="Management" isCollapsed={isCollapsed} className="border border-amber-300 border-b" >
                    <NavItem to="/staff&customers" icon={UserGroupIcon} label="Clients" isCollapsed={isCollapsed} />
                    <NavItem to="/store" icon={UserMultipleIcon} label="Freelancers" isCollapsed={isCollapsed} />
                    <NavItem to="/warehouse" icon={Briefcase07Icon} label="Projects" isCollapsed={isCollapsed} />
                    <NavItem to="/delivery-man" icon={File01Icon} label="Bids" isCollapsed={isCollapsed} />
                    <NavItem to="/orders" icon={MessengerIcon} label="Messages" isCollapsed={isCollapsed} />
                </NavGroup>
                <NavGroup title="Financial" isCollapsed={isCollapsed}>
                    <NavItem to="/payments" icon={ShoppingCart} label="Payments" isCollapsed={isCollapsed} />
                    <NavItem to="/transactions" icon={Pill} label="Transactions" isCollapsed={isCollapsed} />
                    <NavItem to='/reports' icon={Package} label="Reports" isCollapsed={isCollapsed} />
                </NavGroup>
                <NavGroup title="System" isCollapsed={isCollapsed}>
                    <NavItem to="/settings" icon={Settings} label="Notifications" isCollapsed={isCollapsed} />
                    <NavItem to="/support" icon={Headset} label="Security" isCollapsed={isCollapsed} />
                    <NavItem to="/support" icon={Headset} label="Database" isCollapsed={isCollapsed} />
                    <NavItem to="/support" icon={Headset} label="Settings" isCollapsed={isCollapsed} />
                </NavGroup>
            </div>
            <div className=" border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm h-16">
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
            </div>
        </aside>
    );
};

export default Sidebar;
