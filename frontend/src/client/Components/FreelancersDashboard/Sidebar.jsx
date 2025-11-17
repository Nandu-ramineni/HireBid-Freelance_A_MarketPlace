import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LogOut,
  Menu,
  StarIcon,
} from 'lucide-react';
import Cookies from 'js-cookie';
import { Bookmark01Icon, Briefcase02Icon, Message01Icon, OfficeIcon, Settings01Icon, UserCircle02Icon, Wallet01Icon } from 'hugeicons-react';


const routes = [
  {
    href: '/freelancer-dashboard',
    icon: UserCircle02Icon,
    title: 'Profile',
  },
  {
    href: '/freelancer-dashboard/dashboard',
    icon: OfficeIcon,
    title: 'Dashboard',
  },
  {
    href: '/freelancer-dashboard/bids',
    icon: Briefcase02Icon,
    title: 'My Bids',
  },
  {
    href: '/freelancer-dashboard/earnings',
    icon: Wallet01Icon,
    title: 'Earnings',
  },
  // {
  //   href: '/freelancer-dashboard/messages',
  //   icon: Message01Icon,
  //   title: 'Messages',
  // },
  {
    href: '/freelancer-dashboard/reviews',
    icon: StarIcon,
    title: 'Reviews',
  },
  {
    href: '/freelancer-dashboard/saved-gigs',
    icon: Bookmark01Icon,
    title: 'Saved Gigs',
  },
  // {
  //   href: '/freelancer-dashboard/settings',
  //   icon: Settings01Icon,
  //   title: 'Settings',
  // },
];

export default function Sidebar({ isOpen, setIsOpen, user }) {
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
    )} style={{ height: 'calc(100vh - 4.5rem)', }}>
      <div className="flex flex-col h-full ">
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
                <route.icon className="w-5 h-5 mr-3 text-[#929394]" />
                {route.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="flex items-center justify-between h-14 px-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <img src={user?.profile} alt="" className='w-8 h-8 rounded-full' />
            <div>
              <p className="text-sm font-medium truncate">{user?.firstName} </p>
              <p className="text-[9px] text-gray-500 ">{user?.email}</p>
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
