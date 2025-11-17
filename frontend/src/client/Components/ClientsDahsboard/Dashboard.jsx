import { useEffect, useState } from "react";
import Sidebar from "./Sidebar"
import { Button } from "@/components/ui/button";
import { Menu01Icon } from "hugeicons-react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import EditProfile from "./EditProfile";
import PremiumDashboard from "./ClientDashboard/PremiumDashboard";
import { getClient } from "@/client/Services/api";
import useTokenValidation from "@/hooks/useTokenValidation";
import { useDispatch, useSelector } from "react-redux";
import { getClientGigs } from "@/client/Redux/Actions/jobActions";
import ClientGigs from "./ClientDashboard/Gigs/ClientGigs";
import CreateGig from "./ClientDashboard/Gigs/CreateGig";
import ClientPayments from "./ClientDashboard/ClientPayments";
import JobBidDetails from "./ClientDashboard/Gigs/JobBidDetails";
import BidDetails from "./ClientDashboard/Gigs/BidDetails";
import { ProjectManagement } from "./ClientDashboard/Gigs/ProjectManagement";
import Messages from "./ClientDashboard/Messaging/Messages";
import SavedProfiles from "./ClientDashboard/SavedProfiles/SavedProfiles";
import Reviews from "./ClientDashboard/Reviews/Reviews";
import Report from "./ClientDashboard/Report/Report";
import Invoices from "./ClientDashboard/Report/Invoices";
import ScheduleMeeting from "./ClientDashboard/ScheduleMeeting";
import TeamChat from "./ClientDashboard/TeamChat";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [client,setClient] = useState(null);
    useTokenValidation();
    const dispatch  = useDispatch();
    const { clientGigs,loading,error } = useSelector((state) => state.getJobs);
    const fetchClient = async () => {
        try {
            const response = await getClient();
            if (response && response.status === 200) {
                setClient(response.data);
            }
        } catch (error) {
            console.error("Error fetching client data:", error);
            
        }
    }
    const fetchClientProjects = async () => {
        try {
            const response = await dispatch(getClientGigs());
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchClient();
        fetchClientProjects();
    }, []);
    return (
        <div className="flex  bg-gray-100">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} client={client}/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex md:hidden items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu01Icon className="w-6 h-6" />
                        <span className="sr-only">Open sidebar</span>
                    </Button>
                </header>
                {/* className="flex-1 overflow-y-scroll p-4 h-1/2" */}
                <main className="flex-1   h-1/2">
                    <Routes>
                        <Route path="/" element={<ProfilePage client={client} />} />
                        <Route path="/settings" element={<EditProfile client={client} setClient={setClient}/>} />
                        <Route path="/dashboard" element={<PremiumDashboard client={client} clientGigs={clientGigs} loading={loading} error={error} />} />
                        <Route path="/gigs" element={<ClientGigs clientGigs={clientGigs} loading={loading} error={error}/>} />
                        <Route path="/create-gig" element={<CreateGig/>} />
                        <Route path="/wallet" element={<ClientPayments/>} />
                        <Route path="/gig/:jobId" element={<BidDetails/>} />
                        <Route path="/gig/:jobId/project-management" element={<ProjectManagement/>} />
                        <Route path="/messages" element={<Messages/>} />
                        <Route path="/saved-freelancers" element={<SavedProfiles/>} />
                        <Route path="/reviews" element={<Reviews/>} />
                        <Route path="/generate-report" element={<Report/>} />
                        <Route path="/client/invoices" element={<Invoices/>} />
                        <Route path="/meetings" element={<ScheduleMeeting/>} />
                        <Route path="/chat" element={<TeamChat client={client}/>} />
                    </Routes>
                </main>
            </div>
            <p></p>
        </div>
    )
}

export default Dashboard
