import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Briefcase,
  DollarSign,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  User,
} from 'lucide-react';
import Cookies from 'js-cookie';
import { Bookmark01Icon, Briefcase02Icon, Message01Icon, OfficeIcon, StarIcon, UserCircle02Icon, Wallet01Icon } from 'hugeicons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const routes = [
  {
    href: '/client-dashboard',
    icon: UserCircle02Icon,
    title: 'Profile',
  },
  {
    href: '/client-dashboard/dashboard',
    icon: OfficeIcon,
    title: 'Dashboard',
  },
  {
    href: '/client-dashboard/gigs',
    icon: Briefcase02Icon,
    title: 'My Gigs',
  },
  {
    href: '/client-dashboard/wallet',
    icon: Wallet01Icon,
    title: 'Wallet',
  },
  {
    href: '/client-dashboard/messages',
    icon: Message01Icon,
    title: 'Messages',
  },
  {
    href: '/client-dashboard/reviews',
    icon: StarIcon,
    title: 'Reviews',
  },
  {
    href: '/client-dashboard/saved-freelancers',
    icon: Bookmark01Icon,
    title: 'Saved Freelancers',
  },
  {
    href: '/client-dashboard/settings',
    icon: Settings,
    title: 'Settings',
  },
];

export default function Sidebar({ isOpen, setIsOpen, client }) {
  const location = useLocation(); 
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/");
  }

  return (
    <div className={cn(
      "fixed z-50 left-0 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out transform overflow-hidden",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "md:relative md:translate-x-0" 
    )} style={{ height: 'calc(100vh - 4.5rem)' , }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 md:h-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <Menu className="w-6 h-6 z-50" />
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3 py-2">
          <nav className="flex flex-col space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  location.pathname === route.href
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:text-blue-700 focus:bg-blue-50"
                )}
                aria-current={location.pathname === route.href ? "page" : undefined}
              >
                <route.icon className="w-5 h-5 mr-3 text-gray-400" />
                {route.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="flex items-center justify-between h-14 px-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div>
              <Avatar className="h-10 w-10  border-white/20 shadow-xl">
                <AvatarImage src={client?.profile || "/placeholder.svg"} alt={client?.username} />
                <AvatarFallback className="bg-white/20 text-2xl font-bold">
                  {client?.clientProfile?.company?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm font-medium">{client?.clientProfile?.company || "John Doe"}</p>
              <p className="text-xs text-gray-500 truncate">{client?.email || "john@example.com"}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            aria-label="Log out"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
