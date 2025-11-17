import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '../sidebar/Sidebar';
import { SidebarProvider } from '../ui/sidebar';
import { AdminHeader } from '../sidebar/Header';
import useTokenValidation from '@/hooks/useTokenValidation';

const Layout = ({ children }) => {
    useTokenValidation();
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        const currentPath = location.pathname.split('/')[1] || 'overview';
        setActiveSection(currentPath);
    }, [location]);

    return (
        <SidebarProvider className="flex min-h-screen">
            <AdminSidebar isCollapsed={isCollapsed} activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className='flex-1 flex flex-col'>
                <AdminHeader title={pageTitle} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                <main className="flex-1 overflow-y-auto p-6">
                    <AnimatePresence mode="wait">
                        <PageTransition key={location.pathname}>
                            {children || <Outlet />}
                        </PageTransition>
                    </AnimatePresence>
                </main>
            </div>
        </SidebarProvider>
    );
};

function getPageTitle(pathname) {
    switch (pathname) {
        case '/':
            return 'Dashboard';
        case '/company':
            return 'Company Management';
        case '/staff&customers':
            return 'Staff and Customers';
        case '/role':
            return 'Role Management';
        case '/store':
            return 'Store Management';
        case '/stock':
            return 'Stock Management'
        case '/store/add-store':
            return 'Add Store';
        case '/orders':
            return 'Order Management';
        case '/deliveries':
            return 'Delivery Tracking';
        case '/delivery-man':
            return 'Delivery Tracking';
        case '/medicines':
            return 'Medicine Library';
        case '/medicines/add-medicine':
            return 'Add Medicine';
        case '/products':
            return 'Product Management';
        case '/products/add-product':
            return 'Add Product';
        case '/warehouse':
            return 'Warehouse Management';
        case '/wallet':
            return 'Wallet Management';
        case '/cart':
            return 'Cart Management';
        case '/billing':
            return 'Billing & Reports';
        case '/settings':
            return 'Settings';
        case '/support':
            return 'Support';
        case '/returns':
            return 'Returns Management';
        case '/avail-credit':
            return 'Available Credit';
        case '/notifications':
            return 'Notifications';
        case '/login':
            return 'Login';
        case '/register':
            return 'Register';
        default:
            return 'Dashboard';
    }
}

export default Layout;
