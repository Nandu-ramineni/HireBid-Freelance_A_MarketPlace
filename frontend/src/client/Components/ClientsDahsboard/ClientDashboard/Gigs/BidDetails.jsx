import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getBidsByJobId, acceptBid } from "@/client/Redux/Actions/bidActions"
import FreelancerDetailsModal from "./FreelancerDetailsModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar02Icon, DangerIcon, UserGroupIcon,
  Wallet01Icon
} from "hugeicons-react"
import {
  Calendar, DollarSign, Star, Clock, CheckCircle, XCircle,
  MessageSquare, Users, TrendingUp, Grid3X3, List, Filter,
  ArrowUpDown, Sparkles, Award, Zap, IndianRupee
} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import AlternativeNoBidsState from "./NoBidsState"
import AcceptedBid from "./AcceptedBid"
import CompletedBid from "./CompletedBid"
import { deleteJob } from "../../../../Redux/Actions/jobActions"

const BidDetails = () => {
  const { jobId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedFreelancer, setSelectedFreelancer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState("list")
  const [processing, setProcessing] = useState({ bidId: null, action: null });
  const { bidDetails, loading, error } = useSelector((state) => state.bids)
  const job = bidDetails?.bids?.[0]?.bid?.jobId

  useEffect(() => {
    if (typeof jobId === 'string' && jobId.trim() !== '') {
      dispatch(getBidsByJobId(jobId))
    }
  }, [dispatch, jobId])

  if(loading){
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Circular spinning border */}
      <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

      {/* Your logo */}
      <img
        src="https://res.cloudinary.com/nanduvarma/image/upload/v1751466565/samples/Logo_n3lmxf.png"
        alt="HireBid Logo"
        className="w-12 h-12 z-10"
      />
    </div>
  </div>
    )
  }
  if( !bidDetails?.bids || bidDetails?.bids?.length === 0) {
    return <AlternativeNoBidsState bidDetails={bidDetails} />
  }
  
  const acceptedBid = bidDetails?.bids?.find(b => b.bid.status === "accepted");
  const completedBid = bidDetails?.bids?.filter(b => b.bid.status === "completed");


  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  })

  const formatCurrency = (amount) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: "INR"
  }).format(amount)

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 hover:text-amber-900"
      case "accepted": return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "rejected": return "bg-rose-100 text-rose-800 border-rose-200"
      default: return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    return diffInHours < 24 ? `${diffInHours}h ago` : `${Math.floor(diffInHours / 24)}d ago`
  }

  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
  ))

  const handleBidStatus = async (bidId, status) => {
    try {
      setProcessing({ bidId, action: status });
      await dispatch(acceptBid(bidId, status))
      dispatch(getBidsByJobId(jobId))
      if(status === "accepted") {
        toast.success("Bid accepted successfully!")
      } else {
        toast.warning("Bid declined successfully!")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
      console.error("Error:", error)
    } finally {
      setProcessing({ bidId: null, action: null });
    }
  }

  const handleDeleteJob = async (jobId) => {
    try {
      await dispatch(deleteJob(jobId))
      toast.success("Job deleted successfully!")
      navigate('/client-dashboard/gigs')
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
      console.error("Error:", error)
    }
  }

  const sortedBids = [...(bidDetails?.bids || [])].sort((a, b) => {
    switch (sortBy) {
      case "date": return new Date(b.bid.createdAt) - new Date(a.bid.createdAt)
      case "price-low": return a.bid.amount - b.bid.amount
      case "price-high": return b.bid.amount - a.bid.amount
      case "rating": return (b.freelancer.rating || 0) - (a.freelancer.rating || 0)
      case "experience": return b.freelancer.traction.loginsCount - a.freelancer.traction.loginsCount
      case "Accepted": return (b.bid.status === "accepted") - (a.bid.status === "accepted")
      default: return 0
    }
  })

  const openFreelancerModal = (freelancer) => {
    setSelectedFreelancer(freelancer)
    setIsModalOpen(true)
  }

  const closeFreelancerModal = () => {
    setIsModalOpen(false)
    setSelectedFreelancer(null)
  }

  const GridView = () => (
    <div className="grid gap-8">
      {sortedBids.map((bidData, index) => (
        <Card
          key={bidData.bid._id}
          className="group border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-8 relative">
            <div className="flex items-start gap-8">
              {/* Freelancer Brief Info */}
              <div
                className="flex items-center gap-6 flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 p-6 rounded-xl transition-all duration-300"
                onClick={() => openFreelancerModal(bidData.freelancer)}
              >
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-xl ring-2 ring-blue-100">
                    <AvatarImage
                      src={bidData.freelancer.profile || "/placeholder.svg"}
                      alt={bidData.freelancer.firstName}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                      {bidData.freelancer.firstName?.charAt(0)}
                      {bidData.freelancer.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {bidData.freelancer.firstName} {bidData.freelancer.lastName}
                    </h3>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                      @{bidData.freelancer.username}
                    </Badge>
                    {bidData.freelancer.rating >= 4.8 && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Top Rated
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 text-lg leading-relaxed">{bidData.freelancer.bio}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">{renderStars(bidData.freelancer.rating || 4.5)}</div>
                      <span className="font-semibold">{bidData.freelancer.rating || 4.5}</span>
                      <span className="text-gray-400">(12 reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>Active {getTimeAgo(bidData.freelancer.traction.lastLogin)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">₹{bidData.freelancer.freelancerProfile.hourlyRate}/hr</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bidData.freelancer.freelancerProfile.skills
                      .slice(0, 4)
                      .map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all"
                        >
                          {skill}
                        </Badge>
                      ))}
                    {bidData.freelancer.freelancerProfile.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs bg-gray-50 hover:bg-gray-100 transition-colors">
                        +{bidData.freelancer.freelancerProfile.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Bid Details */}
              <div className="w-96 space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className={`${getStatusColor(bidData.bid.status)} px-3 py-1`}>
                    {bidData.bid.status.charAt(0).toUpperCase() + bidData.bid.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500 font-medium">{getTimeAgo(bidData.bid.createdAt)}</span>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Wallet01Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-green-700 font-semibold">Proposed Amount</span>
                  </div>
                  <p className="text-3xl font-bold text-green-800 mb-1">{formatCurrency(bidData.bid.amount)}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-green-700 font-medium">
                      {formatCurrency(job.budget - bidData.bid.amount)} under budget
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    Proposal Message
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{bidData.bid.message}</p>
                </div>

                <div className="flex gap-3">
                  {acceptedBid ? (
                    // Only show action buttons if THIS is the accepted bid
                    acceptedBid.bid._id === bidData.bid._id ? (
                      <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-2 font-medium">
                        ✅ This bid is accepted
                      </Badge>
                    ) : null // hide buttons for all other bids
                  ) : (
                    <>
                      <Button
                      disabled={acceptedBid}
                        onClick={() => handleBidStatus(bidData.bid._id, "accepted")}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                      disabled={acceptedBid}
                        onClick={() => handleBidStatus(bidData.bid._id, "rejected")}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 bg-transparent hover:border-red-300 transition-all duration-300"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-transparent hover:bg-blue-50 border-blue-200 text-blue-600 hover:border-blue-300 transition-all duration-300"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>

              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const ListView = () => (
    <div className="space-y-4">
      {sortedBids.map((bidData, index) => (
        <Card
          key={bidData.bid._id}
          className="group border-0 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              {/* Freelancer Avatar */}
              <div className="cursor-pointer" onClick={() => openFreelancerModal(bidData.freelancer)}>
                <Avatar className="w-16 h-16 border-3 border-white shadow-lg ring-2 ring-blue-100">
                  <AvatarImage
                    src={bidData.freelancer.profile || "/placeholder.svg"}
                    alt={bidData.freelancer.firstName}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
                    {bidData.freelancer.firstName?.charAt(0)}
                    {bidData.freelancer.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Freelancer Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3
                    className="text-lg font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => openFreelancerModal(bidData.freelancer)}
                  >
                    {bidData.freelancer.firstName} {bidData.freelancer.lastName}
                  </h3>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                    @{bidData.freelancer.username}
                  </Badge>
                  {bidData.freelancer.rating >= 4.8 && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Top
                    </Badge>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-2 line-clamp-1">{bidData.freelancer.bio}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    {renderStars(bidData.freelancer.rating || 4.5).slice(0, 5)}
                    <span className="ml-1 font-medium">{bidData.freelancer.rating || 4.5}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{getTimeAgo(bidData.freelancer.traction.lastLogin)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    <span>{bidData.freelancer.freelancerProfile.hourlyRate}/hr</span>
                  </div>
                </div>
              </div>

              {/* Bid Amount */}
              <div className="text-center px-4">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(bidData.bid.amount)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(job.budget - bidData.bid.amount)} under</p>
              </div>

              {/* Status */}
              <div className="text-center px-4">
                <Badge className={`${getStatusColor(bidData.bid.status)} text-xs`}>{bidData.bid.status.charAt(0).toUpperCase() + bidData.bid.status.slice(1)}</Badge>
                <p className="text-xs text-gray-500 mt-1">{getTimeAgo(bidData.bid.createdAt)}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => handleBidStatus(bidData.bid._id, "accepted")}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {processing.bidId === bidData.bid._id && processing.action === "accepted"
                    ? "Accepting..."
                    : "Accept"}
                </Button>

                <Button
                  onClick={() => handleBidStatus(bidData.bid._id, "rejected")}
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 bg-transparent hover:border-red-300 transition-all duration-300"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  {processing.bidId === bidData.bid._id && processing.action === "rejected"
                    ? "Declining..."
                    : "Decline"}
                </Button>

                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-blue-50 border-blue-200 text-blue-600 hover:border-blue-300 transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>


            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <ToastContainer/>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Job Proposals
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Review and manage freelancer proposals</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm px-4 py-2 flex items-center gap-2 bg-white/80 backdrop-blur-sm">
              <UserGroupIcon className="w-5 h-5" />
              {bidDetails.totalBids} {bidDetails.totalBids === 1 ? "Proposal" : "Proposals"}
            </Badge>
            <div>
              <Button onClick={() => handleDeleteJob(job._id)} variant="destructive" className="bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  Delete Gig
              </Button>
            </div>
          </div>
        </div>

        {/* Job Overview */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-6 relative">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden  flex items-center justify-center shadow-lg">
                <img src={job?.image || "/placeholder.svg"} alt={job?.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl text-gray-900 mb-3 font-bold">{job?.title}</CardTitle>
                <p className="text-gray-700 mb-4">{job?.description?.slice(0, 150)}{job?.description?.length > 150 ? "..." : ""}</p>
                <div className="flex flex-wrap items-center gap-6 text-base text-gray-600">
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-lg">
                    <IndianRupee className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-700">{job?.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
                    <Calendar02Icon className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700">Due {formatDate(job?.deadline)}</span>
                  </div>
                  <Badge variant="secondary" className="capitalize bg-purple-100 text-purple-700 px-3 py-1">
                    {job?.category?.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {acceptedBid && (
          <AcceptedBid acceptedBid={acceptedBid} />
        )}
        
        {completedBid && (
          <CompletedBid completedBid={completedBid[0]} />
        )}
        {/* Toolbar */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Received Proposals
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/80">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Latest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button variant={viewMode === "grid" ? "default" : "ghost"} onClick={() => setViewMode("grid")}>
                  <Grid3X3 className="w-4 h-4 mr-1" /> Grid
                </Button>
                <Button variant={viewMode === "list" ? "default" : "ghost"} onClick={() => setViewMode("list")}>
                  <List className="w-4 h-4 mr-1" /> List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        

        {/* Proposals View */}
        {acceptedBid || completedBid ? (
          // 🔒 Locked View Mode with reduced opacity and no toggle buttons
          <div className="relative opacity-60 pointer-events-none select-none">
            {viewMode === "grid" ? <GridView /> : <ListView />}
            <div className="absolute inset-0 bg-white opacity-0" />
          </div>
        ) : (
          // ✅ Normal mode toggle + interactive view
          <>
            <div className="hidden items-center bg-gray-100 rounded-lg p-1 mb-4 ">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-white text-blue-600" : "text-gray-600"}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-white text-blue-600" : "text-gray-600"}
              >
                List
              </Button>
            </div>

            {viewMode === "grid" ? <GridView /> : <ListView />}
          </>
        )}

      </div>

      {/* Freelancer Modal */}
      <FreelancerDetailsModal
        freelancer={selectedFreelancer}
        isOpen={isModalOpen}
        onClose={closeFreelancerModal}
      />
    </div>
  )
}

export default BidDetails
