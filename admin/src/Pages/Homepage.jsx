import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import { DashboardContent } from '@/components/Dashboard/DashboardContent';
import { AnalyticsContent } from '@/components/Dashboard/AnalyticsContent';
import { UsersManagement } from '@/components/Dashboard/UserManagement';
import { FreelancersManagement } from '@/components/Dashboard/FreelancerManagement';
import { ProjectsManagement } from '@/components/Dashboard/ProjectManagement';
import { BidsManagement } from '@/components/Dashboard/BidManagement';
import { MessagesManagement } from '@/components/Dashboard/MessageManagement';
import { PaymentsManagement } from '@/components/Dashboard/PaymentsManagement';
import { TransactionsManagement } from '@/components/Dashboard/TransactionManagement';
import { ReportsContent } from '@/components/Dashboard/ReportsContent';
import { NotificationsManagement } from '@/components/Dashboard/NotificationsManagement';
import { SecuritySettings } from '@/components/Dashboard/SecuritySettings';
import { DatabaseManagement } from '@/components/Dashboard/DatabaseManagement';
import { SystemSettings } from '@/components/Dashboard/Settings';
import AdminSignIn from '@/components/Auth/Signin';
import useTokenValidation from '@/hooks/useTokenValidation';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalClients, getTotalFreelancers, getTotalUsers } from '@/Redux/Actions/userAction';
import { getBidsList, getGigList } from '@/Redux/Actions/gigAction';
import { getAPILatency, getDBStats, getServerStats } from '@/Redux/Actions/dbActions';


const queryClient = new QueryClient();

const Homepage = () => {
    useTokenValidation();
    const dispatch = useDispatch();
    const { users, clients, freelancers, refresh } = useSelector((state) => state.users);
    const { gigs } = useSelector((state) => state.gigs);
    const { bids } = useSelector((state) => state.bids);
    const { dbStats, serverStats, apiLatency } = useSelector((state) => state.db);
    useEffect(() => {
        dispatch(getTotalUsers());
        dispatch(getTotalClients());
        dispatch(getGigList());
        dispatch(getTotalFreelancers());
        dispatch(getBidsList());
        dispatch(getDBStats());
        dispatch(getServerStats());
        dispatch(getAPILatency());
    }, [dispatch, refresh]);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/login" element={<AdminSignIn />} />
                        <Route element={<Layout />}>
                            <Route path="/" element={<DashboardContent users={users} gigs={gigs} />} />
                            <Route path="/analytics" element={<AnalyticsContent gigs={gigs} users={users} />} />
                            <Route
                                path="/clients"
                                element={
                                    clients ? (
                                        <UsersManagement clients={clients} />
                                    ) : (
                                        <div className="p-10 text-center text-muted-foreground">
                                            Loading clients...
                                        </div>
                                    )
                                }
                            />
                            
                            <Route
                                path="/freelancers"
                                element={
                                    freelancers ? (
                                        <FreelancersManagement freelancers={freelancers} />
                                    ) : (
                                        <div className="p-10 text-center text-muted-foreground">
                                            Loading freelancers...
                                        </div>
                                    )
                                }
                            />
                            <Route path="/projects" element={<ProjectsManagement gigs={gigs} />} />
                            <Route path="/bids" element={<BidsManagement bids={bids} />} />
                            <Route path="/messages" element={<MessagesManagement />} />
                            <Route path="/payments" element={<PaymentsManagement />} />
                            <Route path="/transactions" element={<TransactionsManagement />} />
                            <Route path="/reports" element={<ReportsContent />} />
                            <Route path="/notifications" element={<NotificationsManagement />} />
                            <Route path="/security" element={<SecuritySettings />} />
                            <Route path="/database" element={<DatabaseManagement dbStats={dbStats} serverStats={serverStats} apiLatency={apiLatency} />} />
                            <Route path="/settings" element={<SystemSettings />} />
                        </Route>
                    </Routes>
                </AnimatePresence>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default Homepage;
