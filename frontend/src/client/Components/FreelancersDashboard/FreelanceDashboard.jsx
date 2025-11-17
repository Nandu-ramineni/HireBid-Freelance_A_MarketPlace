import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
import Profile from './Profile';
import Projects from './Projects';
import GigDetails from './GigDetails';
import Dashboard from './DashboardTracking/Dashboard';
import SavedGigs from './SavedGigs';
import useTokenValidation from '@/hooks/useTokenValidation';
import Earnings from './Earnings/Earnings';
import { useDispatch, useSelector } from 'react-redux';
import { getFreelancerAnalytics, getFreelancerFinancialOverview, getFreelancerTransactionHistory } from '@/client/Redux/Actions/jobActions';
import { getUser } from '@/client/Services/api';
import Reviews from './Reviews/Reviews';


const FreelanceDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    useTokenValidation();
    const dispatch = useDispatch();
    const { financialOverview,freelancerAnalytics, paymentHistory } = useSelector((state) => state.getJobs)
    const fetchUser = async () => {
        try {
            const response = await getUser();
            if (response.status === 200) {
                setUser(response.data);
            } else {
                console.error("Error fetching user data:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        dispatch(getFreelancerFinancialOverview())
        dispatch(getFreelancerAnalytics())
        dispatch(getFreelancerTransactionHistory())
        fetchUser();
    }, [dispatch])

    return (
        <div className="flex  bg-gray-100" >
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
            <div className="flex-1 flex flex-col overflow-hidden" >
                <header className="flex md:hidden items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Open sidebar</span>
                    </Button>
                </header>
                <main className="flex-1   h-1/2 " style={{ scrollbarWidth: "none" }}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard financialOverview={financialOverview} freelancerAnalytics={freelancerAnalytics} user={user}/>} />
                        <Route path="/bids" element={<Projects />} />
                        <Route path='/bids/:id' element={<GigDetails />} />
                        <Route path="/earnings" element={<Earnings financialOverview={financialOverview} paymentHistory={paymentHistory} />} />
                        <Route path="/messages" element={<div>Messages Content</div>} />
                        <Route path="/reviews" element={<Reviews/>} />
                        <Route path="/settings" element={<div>Settings Content</div>} />
                        <Route path="/saved-gigs" element={<SavedGigs />} />
                        <Route path="/" element={<Profile freelancerAnalytics={freelancerAnalytics}/>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default FreelanceDashboard;
