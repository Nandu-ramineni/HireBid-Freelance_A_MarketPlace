
import Logo from "@/assets/logos/Logo.png"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
    Flag,
    Globe,
    Heart,
    IndianRupee,
    Loader,
    Rss,
    Share2,
    Star,
    X,
} from "lucide-react"
import { ArrowLeft01Icon, Briefcase01Icon, Briefcase05Icon, Calendar03Icon, Clock01Icon, Location01Icon, Mail01Icon } from "hugeicons-react"
import { useDispatch, useSelector } from "react-redux"
import { getJobById, saveGig } from "@/client/Redux/Actions/jobActions"
import moment from "moment"
import { Label } from "@/components/ui/label"
import { placeBid } from "@/client/Redux/Actions/bidActions"
import Cookies from "js-cookie"
import { ToastContainer, toast } from 'react-toastify';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon
} from "react-share";
// Sample job data - in a real app, you would fetch this based on the jobId
const sampleJobData = {
    _id: "job123",
    title: "Senior React Developer for E-commerce Platform",
    company: "TechSolutions Inc.",
    companyLogo: "/placeholder.svg",
    category: "Web Development",
    budget: 5000,
    duration: "3 months",
    location: "Remote",
    experience: "Expert",
    postedDate: "2023-05-15",
    deadline: "2023-06-15",
    description: `
    <p>We are looking for a Senior React Developer to join our team and help build a cutting-edge e-commerce platform. The ideal candidate will have extensive experience with React, Redux, and modern frontend development practices.</p>
    
    <h3>Project Overview:</h3>
    <p>Our client is a leading retailer looking to revamp their online shopping experience. You will be responsible for developing key features of their new e-commerce platform, including product browsing, cart functionality, checkout process, and user account management.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Develop responsive and accessible UI components using React</li>
      <li>Implement state management using Redux or Context API</li>
      <li>Optimize application performance and loading times</li>
      <li>Collaborate with backend developers to integrate APIs</li>
      <li>Write clean, maintainable, and well-documented code</li>
      <li>Participate in code reviews and provide constructive feedback</li>
    </ul>
  `,
    skills: ["React", "Redux", "JavaScript", "TypeScript", "HTML/CSS", "REST APIs", "Git"],
    requirements: [
        "5+ years of experience in frontend development",
        "3+ years of experience with React and its ecosystem",
        "Strong understanding of JavaScript, HTML, and CSS",
        "Experience with responsive design and cross-browser compatibility",
        "Familiarity with modern frontend build tools and workflows",
        "Excellent problem-solving and communication skills",
    ],
    benefits: [
        "Competitive compensation",
        "Flexible working hours",
        "Remote work option",
        "Professional development opportunities",
        "Collaborative and supportive team environment",
    ],
    companyInfo: {
        name: "TechSolutions Inc.",
        description:
            "TechSolutions Inc. is a leading software development company specializing in e-commerce solutions, mobile applications, and enterprise software. With over 10 years of experience in the industry, we have helped numerous businesses transform their digital presence and achieve their goals.",
        website: "www.techsolutions.com",
        employees: "50-100",
        founded: 2010,
        location: "San Francisco, CA",
        projects: 150,
        rating: 4.8,
        reviews: 42,
    },
    similarJobs: [
        {
            _id: "job124",
            title: "Frontend Developer for SaaS Dashboard",
            company: "CloudWare",
            budget: 4000,
            skills: ["React", "JavaScript", "UI/UX"],
        },
        {
            _id: "job125",
            title: "React Native Mobile Developer",
            company: "AppGenius",
            budget: 4500,
            skills: ["React Native", "JavaScript", "Mobile Development"],
        },
        {
            _id: "job126",
            title: "Full Stack JavaScript Developer",
            company: "WebTech Solutions",
            budget: 6000,
            skills: ["React", "Node.js", "MongoDB"],
        },
    ],
}

const tagStyles = [
    {
        text: { light: "#5925DC", dark: "#BDB4FE" },
        bg: { light: "#5925DC14", dark: "#BDB4FE0D" },
        hoverBg: { light: "#0ACC920D", dark: "#77C7AF0D" },
    },
    {
        text: { light: "#8F6C1A", dark: "#E0BE70" },
        bg: { light: "#FFC02E1A", dark: "#E0BE700D" },
        border: { light: "#8F6C1A33", dark: "#E0BE7033" },
        hoverBg: { light: "#FFC02E0D", dark: "#E0BE700D" },
    },
    {
        text: { light: "#9F1AB1", dark: "#EEAAFD" },
        bg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
        border: { light: "#9F1AB114", dark: "#EEAAFD33" },
        hoverBg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
    },
    {
        text: { light: "#067A57", dark: "#77C7AF" },
        bg: { light: "#0ACC9214", dark: "#77C7AF0D" },
        border: { light: "#026AA233", dark: "#7CD4FD33" },
        hoverBg: { light: "#026AA20D", dark: "#7CD4FD0D" },
    },
    {
        text: { light: "#C4320A", dark: "#FCA89F" },
        bg: { light: "#F970661A", dark: "#FCA89F0D" },
        border: { light: "#C4320A33", dark: "#FCA89F33" },
        hoverBg: { light: "#F970660D", dark: "#FCA89F1A" },
    },
    {
        text: { light: "#1D3A5F", dark: "#8FB3E8" },
        bg: { light: "#2E90FA14", dark: "#8FB3E80D" },
        border: { light: "#1D3A5F33", dark: "#8FB3E833" },
        hoverBg: { light: "#2E90FA0D", dark: "#8FB3E80D" },
    },
]

const bidData = {
    amount: '',
    message: ''
}

const JobDetails = () => {
    const [data, setData] = useState(bidData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { jobDetails, } = useSelector((state) => state.getJobs)
    const [jobId, setJobId] = useState(null)
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saved] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    useEffect(() => {
        const id = sessionStorage.getItem("jobId")
        setJobId(id)
        dispatch(getJobById(id))

        const timer = setTimeout(() => {
            setJob(sampleJobData)
            setLoading(false)
        }, 10)

        return () => clearTimeout(timer)
    }, [dispatch])

    const handleApply = () => {
        const token = Cookies.get("accessToken")
        if (!token) {
            navigate("/login")
            return
        }
        setShowModal(true)
    }
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handlePlaceBid = async () => {
        const id = sessionStorage.getItem("jobId");
        const bid = {
            ...data, jobId: id
        }
        setLoading(true)
        try {
            await dispatch(placeBid(bid))
            setLoading(false)
            toast.success("Bid placed successfully")
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.message || "Something went wrong")
        }


    }
    const handleSave = async (jobId) => {
        const token = Cookies.get("accessToken")
        if (!token) {
            navigate("/login")
            return
        }
        try {
            await dispatch(saveGig(jobId));
            toast.success("Gig saved successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    const shareUrl = window.location.href;
    const title = "Check out this job Oppurtunity"


    const handleShare = () => {
        setShowShareModal(true)
    }

    const handleReport = () => {
        // Handle job reporting logic
        console.log("Reporting job:", jobId)
    }

    const handleBack = () => {
        navigate(-1)
    }
    const formattedDate = moment(jobDetails.deadline).format("DD MMM, YYYY");
    const postedDate = moment(jobDetails.updatedAt).format("DD MMM, YYYY");
    const found = moment(jobDetails?.clientInfo?.since).format("YYYY");
    if (loading || !jobDetails || Object.keys(jobDetails).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F2F4F7]">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        {/* Spinning Border */}
                        <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        {/* Centered Image */}
                        <div className="flex items-center justify-center w-full h-full">
                            <img src={Logo} alt="Logo" className="w-8 h-8" />
                        </div>
                    </div>
                    <p className="text-muted-foreground">Loading Gig details...</p>
                </div>
            </div>
        )
    }

    return (
        <main className="px-6 md:px-24 py-4 md:py-6 bg-[#F2F4F7]">
            <ToastContainer />
            <Button variant="ghost" className="mb-6 flex items-center gap-2 bg-white rounded-lg" onClick={handleBack}>
                <ArrowLeft01Icon className="h-4 w-4" />
                Back to Jobs
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Job Header */}
                    <Card className="bg-white dark:bg-[#1D1E26] shadow-none border rounded-[1rem]">
                        <CardContent className="p-6">
                            <div className="flex  gap-4 md:items-center mb-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={jobDetails.image || "/placeholder.svg"}
                                        alt={jobDetails.title}
                                        className="w-16 h-16 object-contain p-2 rounded-xl border border-[#0C0E1226]"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h1 className="text-2xl font-bold text-[#12131AE5] dark:text-[#FFFFFFC7] mb-1">{jobDetails.title}</h1>
                                    <div className="flex flex-wrap items-center gap-2 text-[#12131AA6] dark:text-[#A1A1A1] text-sm">
                                        <span>{jobDetails?.clientInfo?.company}</span>
                                        <span>•</span>
                                        <span>{jobDetails.category}</span>
                                        <span>•</span>
                                        <span>Posted {postedDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                                        <IndianRupee className="h-4 w-4 text-[#067A57]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#12131AA6] dark:text-[#A1A1A1]">Budget</p>
                                        <p className="font-medium text-[#12131AE5] dark:text-[#FFFFFFC7]">₹{jobDetails.budget}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#EDE7F6] flex items-center justify-center">
                                        <Calendar03Icon className="h-4 w-4 text-[#5925DC]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#12131AA6] dark:text-[#A1A1A1]">Deadline</p>
                                        <p className="font-medium text-[#12131AE5] dark:text-[#FFFFFFC7]">{formattedDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                                        <Globe className="h-4 w-4 text-[#8F6C1A]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#12131AA6] dark:text-[#A1A1A1]">Location</p>
                                        <p className="font-medium text-[#12131AE5] dark:text-[#FFFFFFC7]">{jobDetails.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#F3E5F5] flex items-center justify-center">
                                        <Star className="h-4 w-4 text-[#9F1AB1]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#12131AA6] dark:text-[#A1A1A1]">Experience</p>
                                        <p className="font-medium text-[#12131AE5] dark:text-[#FFFFFFC7]">{jobDetails.experienceLevel}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {jobDetails?.skills?.map((skill, index) => {
                                    const style = tagStyles[index % tagStyles.length] || tagStyles[0]
                                    return (
                                        <Badge
                                            key={index}
                                            className="text-[0.75rem] font-medium cursor-pointer shadow-none"
                                            style={{
                                                color: style.text.light,
                                                backgroundColor: style.bg.light,
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = style.hoverBg.light)}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = style.bg.light)}
                                        >
                                            {skill}
                                        </Badge>
                                    )
                                })}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button className="flex-1 md:flex-none bg-[#89AC46] hover:bg-[#6F8D39]" onClick={handleApply}>
                                    Place Bid
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`flex items-center gap-2 ${saved ? "text-red-500" : ""}`}
                                    onClick={() => handleSave(jobDetails._id)}
                                >
                                    <Heart className={`h-4 w-4 ${saved ? "fill-red-500" : ""}`} />
                                    {saved ? "Saved" : "Save Job"}
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2" onClick={handleShare}>
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                {showShareModal && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white dark:bg-[#1D1E26] p-6 rounded-lg shadow-lg w-[90%] max-w-md space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">Share this Job</h2>
                                                <X className="h-6 w-6 cursor-pointer" onClick={() => setShowShareModal(false)} />
                                            </div>
                                            <div className="flex justify-around">
                                                <FacebookShareButton url={shareUrl} quote={title}>
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                                <TwitterShareButton url={shareUrl} title={title}>
                                                    <TwitterIcon size={32} round />
                                                </TwitterShareButton>
                                                <WhatsappShareButton url={shareUrl} title={title}>
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton>
                                                <LinkedinShareButton url={shareUrl} title={title}>
                                                    <LinkedinIcon size={32} round />
                                                </LinkedinShareButton>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Button variant="ghost" size="icon" className="ml-auto" onClick={handleReport}>
                                    <Flag className="h-4 w-4 text-muted-foreground" />
                                    <span className="sr-only">Report Job</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Job Details Tabs */}
                    <Card className="bg-white dark:bg-[#1D1E26] shadow-none border rounded-[1rem] overflow-hidden">
                        <Tabs defaultValue="description" className="w-full">
                            <div className="border-b">
                                <TabsList className="h-auto p-0 bg-transparent">
                                    <TabsTrigger
                                        value="description"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4"
                                    >
                                        Description
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="requirements"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4"
                                    >
                                        Requirements
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="milestones"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4"
                                    >
                                        Milestones
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="description" className="p-6 space-y-6 m-0">
                                <div
                                    className="prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: (jobDetails.detailDesc || job.description)?.replace(/\n/g, "<br />")
                                    }}
                                />


                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                                    <ul className="space-y-2">
                                        {jobDetails.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center mt-0.5">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#067A57"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <span className="text-[#12131AE5] dark:text-[#FFFFFFC7]">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Key Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Clock01Icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">Posted:</span>{" "}
                                                {postedDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar03Icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">Deadline:</span>{" "}
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase01Icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">Job Type:</span> {jobDetails.jobType}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Location01Icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">Location:</span> {jobDetails.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="requirements" className="p-6 space-y-6 m-0">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {jobDetails.skills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                                    style={{
                                        color: tagStyles[index % tagStyles.length].text.light,
                                        backgroundColor: tagStyles[index % tagStyles.length].bg.light,
                                        borderColor: tagStyles[index % tagStyles.length].border?.light || "transparent",
                                    }}
                                >
                                    {skill}
                                </Badge>
                            ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                                    <ul className="space-y-2">
                                        {jobDetails.requirements.map((requirement, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-[#EDE7F6] flex items-center justify-center mt-0.5">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#5925DC"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <span className="text-[#12131AE5] dark:text-[#FFFFFFC7]">{requirement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </TabsContent>

                            <TabsContent value="milestones" className="p-6 space-y-6 m-0">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">Project Milestones</h3>
                                        <div className="text-sm font-medium bg-[#F8F9FA] dark:bg-[#2A2B36] px-3 py-1 rounded-md">
                                            Total: ₹{jobDetails.milestones.reduce((total, milestone) => total + milestone.amount, 0)}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {jobDetails.milestones.map((milestone, index) => (
                                            <div key={milestone._id} className="border rounded-lg p-4 bg-[#F8F9FA] dark:bg-[#2A2B36]">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#EDE7F6] flex items-center justify-center text-[#5925DC] font-medium">
                                                            {index + 1}
                                                        </div>
                                                        <h4 className="font-medium">{milestone.description}</h4>
                                                    </div>
                                                    <Badge
                                                        variant={milestone.isPaid ? "default" : "outline"}
                                                        className={milestone.isPaid ? "bg-[#E8F5E9] text-[#067A57] hover:bg-[#E8F5E9]" : ""}
                                                    >
                                                        {milestone.isPaid ? "Paid" : "Pending"}
                                                    </Badge>
                                                </div>
                                                <div className="ml-11">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Payment amount</span>
                                                        <span className="font-medium">₹{milestone.amount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Payment Schedule</h3>
                                    <div className="bg-[#F8F9FA] dark:bg-[#2A2B36] rounded-lg p-4">
                                        <div className="space-y-3">
                                            <p className="text-sm">
                                                Payments are released when milestones are completed and approved. Each milestone must be
                                                reviewed and accepted before payment is processed.
                                            </p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="w-3 h-3 rounded-full bg-[#89AC46]"></div>
                                                <span>Paid milestones</span>
                                                <div className="w-3 h-3 rounded-full border border-[#0C0E1226] ml-4"></div>
                                                <span>Pending milestones</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Milestone completion</p>
                                        <p className="font-medium">
                                            {jobDetails.milestones.filter((m) => m.isPaid).length} of {jobDetails.milestones.length} completed
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Payment progress</p>
                                        <p className="font-medium">
                                            ₹{jobDetails.milestones.filter((m) => m.isPaid).reduce((total, m) => total + m.amount, 0)} of ₹
                                            {jobDetails.milestones.reduce((total, m) => total + m.amount, 0)}
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Apply Card */}
                    <Card className="bg-white dark:bg-[#1D1E26] shadow-none border rounded-[1rem]">
                        <CardHeader>
                            <CardTitle>Ready to Bid?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Budget:</span>
                                <span className="font-medium">₹{jobDetails.budget}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Deadline:</span>
                                <span className="font-medium">{formattedDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Location</span>
                                <span className="font-medium">{jobDetails.location}</span>
                            </div>
                            <Separator />
                            <Button className="w-full bg-[#89AC46] hover:bg-[#6F8D39]" onClick={handleApply}>
                                Place Bid
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                You{"'"}ll be able to review your application before submitting
                            </p>
                        </CardContent>
                    </Card>

                    {/* Company Card */}
                    <Card className="bg-white dark:bg-[#1D1E26] shadow-none border rounded-[1rem]">
                        <CardHeader>
                            <CardTitle>About the Client</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={jobDetails.clientInfo.profile || "/placeholder.svg"}
                                    alt={job.company}
                                    className="w-10 h-10 object-cover p-1 rounded-full border border-[#0C0E1226]"
                                />
                                <div>
                                    <p className="font-medium">{jobDetails.clientInfo.company}</p>
                                    <p className="text-xs text-muted-foreground">{jobDetails.clientInfo.location || job.companyInfo.location}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail01Icon className="h-4 w-4 text-muted-foreground" />
                                    <a href={`mailto:${jobDetails.clientInfo.email}`} className="hover:text-blue-500">{jobDetails.clientInfo.email || job.companyInfo.employees}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Rss className="h-4 w-4 text-muted-foreground" />
                                    <a href={jobDetails.clientInfo.website.startsWith("http") ? jobDetails.clientInfo.website : `https://${jobDetails.clientInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">{jobDetails.clientInfo.website || job.companyInfo.rating}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar03Icon className="h-4 w-4 text-muted-foreground" />
                                    <span>Since {found || job.companyInfo.founded}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase05Icon className="h-4 w-4 text-muted-foreground" />
                                    <span>{job.companyInfo.projects}+ Projects</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">
                                View Company Profile
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Similar Jobs */}
                    <Card className="bg-white dark:bg-[#1D1E26] shadow-none border rounded-[1rem]">
                        <CardHeader>
                            <CardTitle>Similar Jobs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {job.similarJobs.map((similarJob) => (
                                <div key={similarJob._id} className="border-b pb-4 last:border-0 last:pb-0">
                                    <h4 className="font-medium mb-1 hover:text-primary cursor-pointer">{similarJob.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-2">{similarJob.company}</p>
                                    <div className="flex items-center justify-between mb-2">
                                        <div
                                            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[0.7rem] font-medium"
                                            style={{
                                                backgroundColor: "#E8F5E9",
                                                color: "#067A57",
                                            }}
                                        >
                                            <span>₹{similarJob.budget}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">Remote</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {similarJob.skills.map((skill, index) => (
                                            <Badge key={index} variant="outline" className="text-[0.65rem] font-medium bg-transparent">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full text-primary">
                                View More Similar Jobs
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-[#1D1E26] p-6 rounded-lg shadow-lg w-[90%] max-w-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold ">Place Your Bid</h2>
                            <X className="h-6 w-6 cursor-pointer" onClick={() => setShowModal(false)} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">

                            <div className="flex flex-col items-center ">
                                <span className="text-muted-foreground">Budget:</span>
                                <span className="font-medium">₹{jobDetails.budget}</span>
                            </div>
                            <div className="flex flex-col items-center ">
                                <span className="text-muted-foreground">Deadline:</span>
                                <span className="font-medium">{formattedDate}</span>
                            </div>
                            <div className="flex flex-col items-center ">
                                <span className="text-muted-foreground">Location</span>
                                <span className="font-medium">{jobDetails.location}</span>
                            </div>

                        </div>
                        <Separator />
                        {/* Amount Input */}
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Amount (₹)
                            </Label>
                            <input
                                type="text"
                                name="amount"
                                onChange={changeHandler}
                                className="w-full p-2 border rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="Enter your bid amount"
                            />
                        </div>

                        {/* What do you want to place a bid input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                What makes to you place a bid?
                            </label>
                            <textarea
                                rows="3"
                                name="message"
                                onChange={changeHandler}
                                className="w-full p-2 border rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="Describe your offer..."
                            ></textarea>
                        </div>
                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:border-gray-600"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#6F8D39]" onClick={handlePlaceBid}>
                                {loading ? <p className="flex items-center gap-1">Placing Bid <Loader className="w-4 h-4 animate-spin" /></p> : "Submit Bid"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default JobDetails

