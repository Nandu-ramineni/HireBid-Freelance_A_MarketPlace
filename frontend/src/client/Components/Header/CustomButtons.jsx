
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { User, LayoutDashboard, UserCircle, Settings, LogOut, Bell } from 'lucide-react'
import Cookies from 'js-cookie'
import { CrownIcon, OfficeIcon, Search01Icon, Settings01Icon, UserCircle02Icon } from 'hugeicons-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscription } from '@/client/Redux/Actions/subscriptionActions'

export default function CustomButtons() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('accessToken')) // Check token on mount
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { subscription } = useSelector((state) => state.subscriptions)
    const role = localStorage.getItem('role')
    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(!!Cookies.get('accessToken'))
        }

        const interval = setInterval(checkAuth, 1000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getSubscription())
        }
    }, [isLoggedIn, dispatch])

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        localStorage.removeItem('role')
        setIsLoggedIn(false)
        navigate('/')
    }

    const menuItems = [
        { icon: UserCircle, label: 'Profile', onClick: () => navigate('/dashboard') },
        { icon: OfficeIcon, label: 'Dashboard', onClick: () => navigate('client-dashboard/dashboard') },
        { icon: Settings01Icon, label: 'Settings', onClick: () => navigate('/client-dashboard/edit-profile') },
        { icon: LogOut, label: 'Logout', onClick: handleLogout },
    ]



    return (
        <div className="flex items-center space-x-2">

            {isLoggedIn ? (
                <>
                    {role === 'freelancer' && subscription && (
                        <>
                            {subscription?.activePlan  === 'Basic' && (
                                <Button
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 flex gap-2 rounded-md"
                                    onClick={() => navigate('/buy-membership')}
                                >
                                    <CrownIcon className='w-5 h-5' /> Buy a Membership
                                    <span className="sr-only">Buy a Membership</span>
                                </Button>
                            )}
                            {subscription?.activePlan  === 'Premium' && (
                                <Button
                                    className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-4 py-2 flex gap-2 rounded-md"
                                    onClick={() => navigate('/buy-membership')}
                                >
                                    <CrownIcon className='w-5 h-5' /> Upgrade to Enterprise
                                    <span className="sr-only">Upgrade</span>
                                </Button>
                            )}
                            {subscription?.activePlan  === 'Enterprise' && (
                                <Button
                                    disabled
                                    className="bg-gradient-to-r from-pink-800 to-red-500  dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-md cursor-default"
                                >
                                    <CrownIcon className='w-5 h-5 text-yellow-500' /> Enterprise Plan
                                    <span className="sr-only">Current Plan</span>
                                </Button>
                            )}
                        </>
                    )}

                    <Button variant="ghost" size="icon">
                        <Search01Icon className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <UserCircle02Icon className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-4">
                            <div className="mb-2 font-semibold text-sm text-gray-700">User Menu</div>
                            <nav className="flex flex-col space-y-2">
                                {menuItems.map((item, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className="justify-start w-full"
                                        onClick={item.onClick}

                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Button>
                                ))}
                            </nav>
                        </PopoverContent>
                    </Popover>

                </>
            ) : (
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" asChild className="hidden md:flex py-2 px-4 border border-[#0C0E1226] rounded-xl bg-[#FFFFFF] text-[#12131AA6] shadow-sm dark:bg-[#1D1E26] dark:border-[#FFFFFF1F] dark:text-[#FFFFFFC7]" >
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button onClick={handleLogin} asChild className="py-2 px-4 bg-emerald-600 rounded-xl shadow-md border border-emerald-600/70 text-white hover:bg-[#6F8D39] font-semibold">
                        <Link to="/signup">Signup</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}