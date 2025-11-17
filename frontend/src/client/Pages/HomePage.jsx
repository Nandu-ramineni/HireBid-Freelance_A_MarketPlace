import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Components/Header/Navbar"
import Home from "./Home/Home"
import Login from "../Components/Auth/Login"
import SignUp from "../Components/Auth/SignUp"
import About from "./About/About"
// import PasswordReset from "../Components/Auth/PasswordReset"
import DataProvider from "../Context/DataProvider"
import PrivateRoute from "../Components/PrivateRoutes/PrivateRoutes"
import Dashboard from "../Components/ClientsDahsboard/Dashboard"
import NewPassword from "../Components/Auth/NewPassword"
import FreelanceDashboard from "../Components/FreelancersDashboard/FreelanceDashboard"
import Jobs from "./Jobs/Jobs"
import JobDetails from "./Jobs/JobDetails"
import BidReview from "./Jobs/BidReview"
import NotFound from "./Home/NotFound"
import { useEffect, useState } from "react"
import PasswordResetPage from "../Components/Auth/PasswordReset"
import Footer from "../Components/Footer/Footer"
import ScrollToTop from "../Components/Header/ScrollToTop"
import Agency from "./Agency/Agency"
import RegisterAgency from "./Agency/RegisterAgency"
import EnterpriseSolutions from "./Agency/EnterpriseSolutions"
import SubscriptionPage from "./Home/SubscriptionPage"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import Community from "./Community/Community"
import GetAllFreelancers from "./Agency/GetAllFreelancers"
import Guides from "./Resources/Guides"
import Tutorials from "./Resources/Tutorials"
import Webinars from "./Resources/Webinars"
import Blog from "./Resources/Blog/Blog"
import useTokenValidation from "@/hooks/useTokenValidation"
import RoleRedirectRoute from "../Components/PrivateRoutes/RoleRedirectRoute"
import TopBar from "../Components/Header/TopBar"


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    useTokenValidation();
    return (
        <DataProvider>
            {/* <TopBar/> */}
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/buy-membership" element={<SubscriptionPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/find-talent/freelancers" element={<GetAllFreelancers/>} />
                <Route path="/find-talent/agencies" element={<Agency />} />
                <Route path="/find-talent/register-agency" element={<RegisterAgency />} />
                <Route path="/find-talent/enterprise" element={<EnterpriseSolutions />} />
                <Route path="/resources/community" element={<Community />} />
                <Route path="/resources/guides" element={<Guides/>} />
                <Route path="/resources/tutorials" element={<Tutorials />} />
                <Route path="/resources/webinars" element={<Webinars />} />
                <Route path="/resources/blog" element={<Blog />} />
                <Route path="/forgot-password" element={<PasswordResetPage />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/jobid" element={<JobDetails />} />
                <Route path="/jobs/bidreview" element={<BidReview />} />
                <Route path="/dashboard" element={<RoleRedirectRoute/>} />
                <Route element={<PrivateRoute />}>
                    <Route path="/client-dashboard/*" element={<Dashboard />} />
                    <Route path="/freelancer-dashboard/*" element={<FreelanceDashboard />} />
                </Route>
                <Route path="reset-password/:resetToken" element={<NewPassword />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
            {/* <Footer /> */}
        </DataProvider>
    )
}

export default HomePage
