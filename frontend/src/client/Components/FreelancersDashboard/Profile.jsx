import { getUser, userUpdate } from "@/client/Services/api"
import { useEffect, useState, useRef } from "react"
import {
  Edit,
  Save,
  Plus,
  X,
  Camera,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Link,
  Sparkles,
  Clock,
  DollarSign,
  User,
  FileText,
  Zap,
  RefreshCw,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  StarIcon,
  MessageCircle,
  Share2,
  Download,
  IndianRupee,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Alert02Icon, AlertSquareIcon, Briefcase02Icon, Briefcase05Icon, CheckmarkCircle01Icon, Clock01Icon, File01Icon, Globe02Icon, Link01Icon, Mortarboard01Icon, PencilEdit02Icon, UserCircle02Icon, Wallet01Icon, ZapIcon } from "hugeicons-react"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToastContainer,toast } from "react-toastify"

const profileInitialState = {
  firstName: "",
  lastName: "",
  skills: [],
  hourlyRate: 0,
  availability: "",
  experience: "",
  education: "",
  languages: [],
  portfolio: [],
  bio: "",
}

// Skill badge component without animation
const SkillBadge = ({ skill, onRemove, isEditing = false }) => {
  return (
    <div className="inline-flex">
      <Badge
        variant="secondary"
        className={cn(
          "px-3 py-1 text-sm font-medium rounded-full",
          "bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10",
          "border border-primary/20",
        )}
      >
        {skill}
        {isEditing && onRemove && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-1 h-4 w-4 p-0 text-primary/70 hover:text-primary hover:bg-transparent"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </Badge>
    </div>
  )
}

// Profile stat card component
const StatCard = ({ icon: Icon, title, value, color = "from-primary to-indigo-600" }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="font-semibold text-slate-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Replace the PublicProfileCard component with this improved version
const PublicProfileCard = ({ profile, isOpen, setIsOpen }) => {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("about")

  const copyProfileLink = () => {
    // In a real app, this would be the actual profile URL
    const profileUrl = `https://yourplatform.com/profile/${profile.username || profile._id}`
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.info("Profile link copied to clipboard")
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white rounded-xl max-h-[90vh] flex flex-col">
        {/* Header with banner */}
        <div className="relative z-10 h-40 bg-gradient-to-r from-primary/80 to-indigo-600/80 overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'url("https://img.freepik.com/free-photo/robot-handshake-human-background-futuristic-digital-age_53876-129770.jpg?uid=R114405257&ga=GA1.1.792639287.1743599003&semt=ais_hybrid&w=740")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Profile image */}
          <div className="absolute top-12 left-6 ">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={profile.profile || "/placeholder.svg?height=96&width=96"}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-xl">
                {profile.firstName?.[0]}
                {profile.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-14 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full"
                    onClick={copyProfileLink}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Profile content */}
        <div className=" px-6 pb-0 flex-grow overflow-y-scroll flex flex-col" style={{ scrollbarWidth: "thin" }}>
          {/* Name and basic info */}
          <div className="mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-slate-500">{profile.freelancerProfile?.title || "Freelance Professional"}</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                Available for work
              </Badge>
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{profile.location || "Remote"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate max-w-[200px]">{profile.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Member since {formatDate(profile.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="text-primary text-xl font-bold">${profile.freelancerProfile?.hourlyRate || 0}</div>
              <div className="text-xs text-slate-500">Hourly Rate</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="text-primary text-xl font-bold">100%</div>
              <div className="text-xs text-slate-500">Job Success</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center text-amber-500 text-xl font-bold">
                4.9 <StarIcon className="h-4 w-4 ml-1 fill-current" />
              </div>
              <div className="text-xs text-slate-500">Rating</div>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            <div className="overflow-y-scroll pr-2 flex-grow" style={{ scrollbarWidth: "thin" }}>
              <TabsContent value="about" className="mt-0 h-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-2">About</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600 leading-relaxed">{profile.bio || "No bio provided yet."}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-2">Languages</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.freelancerProfile?.languages?.length > 0 ? (
                          profile.freelancerProfile.languages.map((language) => (
                            <SkillBadge key={language} skill={language} />
                          ))
                        ) : (
                          <p className="text-slate-500 italic text-sm">No languages added yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-0 h-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-2">Skills & Expertise</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.freelancerProfile?.skills?.length > 0 ? (
                          profile.freelancerProfile.skills.map((skill) => <SkillBadge key={skill} skill={skill} />)
                        ) : (
                          <p className="text-slate-500 italic text-sm">No skills added yet.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-2">Top Skills</h3>
                    <div className="space-y-3">
                      {profile.freelancerProfile?.skills?.slice(0, 3).map((skill, index) => (
                        <div key={skill} className="bg-slate-50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">{skill}</span>
                            <span className="text-xs text-slate-500">
                              {index === 0 ? "Expert" : index === 1 ? "Advanced" : "Intermediate"}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div
                              className="bg-primary h-1.5 rounded-full"
                              style={{ width: index === 0 ? "95%" : index === 1 ? "85%" : "75%" }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-0 h-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-2">Professional Experience</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      {profile?.freelancerProfile?.experience ? (
                        <div className="text-sm text-slate-600 whitespace-pre-line">
                          {profile.freelancerProfile.experience}
                        </div>
                      ) : (
                        <p className="text-slate-500 italic text-sm">No experience added yet.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-900 mb-2">Education</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      {profile?.freelancerProfile?.education ? (
                        <div className="text-sm text-slate-600 whitespace-pre-line">
                          {profile.freelancerProfile.education}
                        </div>
                      ) : (
                        <p className="text-slate-500 italic text-sm">No education added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-0 h-full">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Portfolio</h3>
                  {profile.freelancerProfile?.portfolio?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profile.freelancerProfile.portfolio.map((item) => (
                        <a
                          key={item}
                          href={item.startsWith("http") ? item : `https://${item}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:-translate-y-1 hover:shadow-md transition-all"
                        >
                          <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                            <div className="h-32 bg-slate-100 flex items-center justify-center">
                              <div className="text-slate-400">
                                <Link className="h-8 w-8" />
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-slate-900 text-sm truncate max-w-[180px]">
                                  {item.replace(/^https?:\/\//, "").split("/")[0]}
                                </h4>
                                <ExternalLink className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-500 italic text-sm">No portfolio items added yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer with contact button */}
        <DialogFooter className="bg-slate-50 px-6 py-4 mt-4 flex-shrink-0">
          <Button className="w-full" size="lg">
            Contact {profile.firstName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Profile = ({freelancerAnalytics}) => {
  const [profile, setProfile] = useState(profileInitialState)
  const [updateProfile, setUpdateProfile] = useState(profileInitialState)
  const [image, setImage] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [newPortfolioItem, setNewPortfolioItem] = useState("")
  const [activeTab, setActiveTab] = useState("personal")
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isPublicProfileOpen, setIsPublicProfileOpen] = useState(false)

  const headerRef = useRef(null)

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const response = await getUser()
      const profileData = {
        ...response.data,
        skills: response.data.skills || [],
        languages: response.data.languages || [],
        portfolio: response.data.portfolio || [],
      }
      setProfile(profileData)
      setUpdateProfile(profileData)
      calculateCompletionPercentage(profileData)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to fetch profile data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateCompletionPercentage = (profileData) => {
  const flatFields = ["firstName", "lastName", "bio", "username", "profile"]
  const nestedFields = [
    "skills",
    "languages",
    "portfolio",
    "experience",
    "education",
    "hourlyRate",
    "availability",
    "avgRating"
  ]

  let filledFields = 0
  const totalFields = flatFields.length + nestedFields.length

  // Check top-level flat fields
  flatFields.forEach((field) => {
    const value = profileData[field]
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(typeof value === "number" && value === 0)
    ) {
      filledFields++
    }
  })

  // Check nested freelancerProfile fields
  nestedFields.forEach((field) => {
    const value = profileData.freelancerProfile?.[field]
    if (Array.isArray(value)) {
      if (value.length > 0) filledFields++
    } else if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(typeof value === "number" && value === 0)
    ) {
      filledFields++
    }
  })

  const percentage = Math.round((filledFields / totalFields) * 100)
  setCompletionPercentage(percentage)
}



  const handleUpdateProfile = (e) => {
    const { name, value } = e.target
    setUpdateProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("firstName", updateProfile.firstName)
      formData.append("lastName", updateProfile.lastName)
      formData.append("bio", updateProfile.bio || "")
      if (image) formData.append("profileImage", image)
      formData.append(
        "freelancerProfile",
        JSON.stringify({
          skills: updateProfile.skills || [],
          hourlyRate: Number(updateProfile.hourlyRate),
          availability: updateProfile.availability,
          experience: updateProfile.experience,
          education: updateProfile.education,
          languages: updateProfile.languages || [],
          portfolio: updateProfile.portfolio || [],
        }),
      )

      const response = await userUpdate(formData)
      setProfile(response.data)
      setIsEditing(false)
      toast.success("Your profile has been updated successfully.")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
      fetchProfile()
    }
  }

  const addItem = (field, value, setValue) => {
    if (value.trim()) {
      setUpdateProfile((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
      setValue("")
    }
  }

  const removeItem = (field, index) => {
    setUpdateProfile((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div
      className="relative h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 pb-20 p-2 md:p-6"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <ToastContainer/>
      <div>
        {completionPercentage < 100 && (
          <div className="bg-yellow-300 text-yellow-800 px-3 py-1 rounded-md overflow-hidden animate-marquee whitespace-nowrap text-sm font-medium text-center w-full md:w-2/6 flex justify-center gap-2 mx-auto ">
            <AlertSquareIcon className="h-5 w-5 " /> Complete your profile to get hired by clients!  
          </div>
        )}
        
      </div>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="rounded-full absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-primary/5 blur-[100px]" />
        <div className="rounded-full absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/5 blur-[80px]" />
      </div>

      <div className="container px-4 py-8 relative z-10">
        <div>
          <Card className="w-full overflow-hidden border-none shadow-xl">
            {/* Profile header with banner */}
            <CardHeader ref={headerRef} className="relative h-64 p-0 overflow-hidden rounded-t-xl">
              <div className="absolute inset-0 " />

              {/* Background pattern */}
              <div
                loading="lazy"
                className="absolute -inset-2 "
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1393&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                  backgroundSize: "cover",
                }}
              />

              {/* Profile completion indicator */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20">
                <div className="flex items-center gap-2">
                  {completionPercentage === 100 ? (
                    <span className="text-xs font-medium text-emerald-400">Profile Completed</span>
                  ) : (
                    <>
                      <div className="relative w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-white transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-white">{completionPercentage}%</span>
                    </>
                  )}
                </div>

              </div>

              {/* Profile image and name */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <div
                      className="relative"
                      onMouseEnter={() => setIsImageHovered(true)}
                      onMouseLeave={() => setIsImageHovered(false)}
                    >
                      <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={imagePreview || profile.profile || "/placeholder.svg?height=96&width=96"}
                          alt="Profile"
                          className="object-cover"
                          loading="lazy"
                        />
                        <AvatarFallback className="bg-primary text-white text-xl">
                          {profile.firstName?.[0]}
                          {profile.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      {isEditing && isImageHovered && (
                        <label
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                          htmlFor="profile-image"
                        >
                          <Camera className="h-6 w-6 text-white" />
                          <input
                            type="file"
                            id="profile-image"
                            className="sr-only"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                      )}
                    </div>

                    {/* Status indicator */}
                    <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                      {profile.firstName} {profile.lastName}
                      <Badge className="ml-2 bg-white/20 text-white border-white/10">Pro</Badge>
                    </h1>
                    <p className="text-white/80">{profile.email}</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 px-6 pb-8 bg-white">
              {/* Action buttons */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <Badge variant="outline" className="px-3 py-1 bg-primary/5 border-primary/20 text-primary">
                    <User className="h-3.5 w-3.5 mr-1" />
                    {profile.username || "Username"}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="px-3 py-1 bg-emerald-500/5 border-emerald-500/20 text-emerald-600"
                  >
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {profile.availability || "Available"}
                  </Badge>
                </div>

                <div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    className={cn(
                      "relative overflow-hidden group",
                      isEditing ? "bg-primary text-white" : "border-primary/20 text-primary hover:bg-primary/5",
                    )}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          {isEditing ? "Saving..." : "Loading..."}
                        </>
                      ) : (
                        <>
                          {isEditing ? <Save className="h-4 w-4 mr-1" /> : <PencilEdit02Icon className="h-4 w-4 mr-1" />}
                          {isEditing ? "Save Profile" : "Edit Profile"}
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Stats row */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard icon={CheckmarkCircle01Icon} title="Completed Projects" value={freelancerAnalytics?.totalCompletedJobs} color="from-emerald-500 to-teal-600" />
                  <StatCard
                    icon={IndianRupee}
                    title="Hourly Rate"
                    value={`₹${profile?.freelancerProfile?.hourlyRate || 0}/hr`}
                    color="from-amber-500 to-orange-600"
                  />
                  <StatCard icon={Star} title="Rating" value={`${profile?.freelancerProfile?.avgRating || 0}/5`} color="from-yellow-500 to-amber-600" />
                  <StatCard icon={Clock01Icon} title="Response Time" value="< 2 hours" color="from-blue-500 to-indigo-600" />
                </div>
              </div>

              {/* Tabs section */}
              <div>
                <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-100 p-1 rounded-lg">
                    {[
                      { id: "personal", label: "Personal", icon: UserCircle02Icon },
                      { id: "professional", label: "Professional", icon: Briefcase02Icon },
                      { id: "experience", label: "Experience", icon: Award },
                      { id: "portfolio", label: "Portfolio", icon: Link01Icon },
                    ].map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className={cn(
                          "flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm",
                          "transition-all duration-300 data-[state=active]:text-primary",
                        )}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
                    <TabsContent value="personal" className="mt-0">
                      <div>
                        <CardTitle className="mb-6 flex items-center gap-2 text-slate-900">
                          <User className="h-5 w-5 text-primary" />
                          Personal Information
                        </CardTitle>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                                First Name
                              </Label>
                              {isEditing ? (
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  value={updateProfile.firstName}
                                  onChange={handleUpdateProfile}
                                  className="border-slate-200 focus:border-primary focus:ring-primary/20"
                                />
                              ) : (
                                <div className="p-2.5 bg-white rounded-md border border-slate-200 text-slate-700">
                                  {profile.firstName || "Not specified"}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                                Last Name
                              </Label>
                              {isEditing ? (
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  value={updateProfile.lastName}
                                  onChange={handleUpdateProfile}
                                  className="border-slate-200 focus:border-primary focus:ring-primary/20"
                                />
                              ) : (
                                <div className="p-2.5 bg-white rounded-md border border-slate-200 text-slate-700">
                                  {profile.lastName || "Not specified"}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label htmlFor="bio" className="text-sm font-medium text-slate-700">
                                Bio
                              </Label>
                              {isEditing ? (
                                <Textarea
                                  id="bio"
                                  name="bio"
                                  value={updateProfile.bio || ""}
                                  onChange={handleUpdateProfile}
                                  className="min-h-[120px] border-slate-200 focus:border-primary focus:ring-primary/20"
                                  placeholder="Tell us about yourself..."
                                />
                              ) : (
                                <div className="p-2.5 bg-white rounded-md border border-slate-200 text-slate-700 min-h-[120px]">
                                  {profile.bio || "No bio provided yet."}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="professional" className="mt-0">
                      <div>
                        <CardTitle className="mb-6 flex items-center gap-2 text-slate-900">
                          <Briefcase05Icon className="h-5 w-5 text-primary" />
                          Professional Profile
                        </CardTitle>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label
                                htmlFor="skills"
                                className="text-sm font-medium text-slate-700 flex items-center gap-1.5"
                              >
                                <ZapIcon className="h-4 w-4 text-primary" />
                                Skills
                              </Label>

                              <div className="p-4 bg-white rounded-md border border-slate-200 min-h-[120px]">
                                {isEditing ? (
                                  <div className="flex flex-wrap gap-2">
                                    {updateProfile.skills.map((skill, index) => (
                                      <SkillBadge
                                        key={skill}
                                        skill={skill}
                                        onRemove={() => removeItem("skills", index)}
                                        isEditing={true}
                                      />
                                    ))}

                                    <div className="flex gap-2 mt-2">
                                      <Input
                                        id="newSkill"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Add a skill"
                                        className="w-40 border-slate-200 focus:border-primary focus:ring-primary/20"
                                      />
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addItem("skills", newSkill, setNewSkill)}
                                        className="border-primary/20 text-primary hover:bg-primary/5"
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-wrap gap-2">
                                    {profile?.freelancerProfile?.skills?.length > 0 ? (
                                      profile?.freelancerProfile?.skills.map((skill) => (
                                        <SkillBadge key={skill} skill={skill} />
                                      ))
                                    ) : (
                                      <p className="text-slate-500 italic">No skills added yet.</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="hourlyRate"
                                className="text-sm font-medium text-slate-700 flex items-center gap-1.5"
                              >
                                <Wallet01Icon className="h-4 w-4 text-primary" />
                                Hourly Rate
                              </Label>
                              {isEditing ? (
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                  <Input
                                    id="hourlyRate"
                                    name="hourlyRate"
                                    type="number"
                                    value={updateProfile.hourlyRate}
                                    onChange={handleUpdateProfile}
                                    className="pl-8 border-slate-200 focus:border-primary focus:ring-primary/20"
                                  />
                                </div>
                              ) : (
                                <div className="p-2.5 bg-white rounded-md border border-slate-200 text-slate-700">
                                  ${profile?.freelancerProfile?.hourlyRate || 0}/hr
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label
                                htmlFor="availability"
                                className="text-sm font-medium text-slate-700 flex items-center gap-1.5"
                              >
                                <Clock className="h-4 w-4 text-primary" />
                                Availability
                              </Label>
                              {isEditing ? (
                                <Input
                                  id="availability"
                                  name="availability"
                                  value={updateProfile.availability}
                                  onChange={handleUpdateProfile}
                                  className="border-slate-200 focus:border-primary focus:ring-primary/20"
                                  placeholder="e.g. Full-time, 40hrs/week"
                                />
                              ) : (
                                <div className="p-2.5 bg-white rounded-md border border-slate-200 text-slate-700">
                                  {profile?.freelancerProfile?.availability || "Not specified"}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="languages"
                                className="text-sm font-medium text-slate-700 flex items-center gap-1.5"
                              >
                                <Globe02Icon className="h-4 w-4 text-primary" />
                                Languages
                              </Label>
                              <div className="p-4 bg-white rounded-md border border-slate-200 min-h-[120px]">
                                {isEditing ? (
                                  <div className="flex flex-wrap gap-2">
                                    {updateProfile.languages.map((language, index) => (
                                      <SkillBadge
                                        key={language}
                                        skill={language}
                                        onRemove={() => removeItem("languages", index)}
                                        isEditing={true}
                                      />
                                    ))}

                                    <div className="flex gap-2 mt-2">
                                      <Input
                                        id="newLanguage"
                                        value={newLanguage}
                                        onChange={(e) => setNewLanguage(e.target.value)}
                                        placeholder="Add a language"
                                        className="w-40 border-slate-200 focus:border-primary focus:ring-primary/20"
                                      />
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addItem("languages", newLanguage, setNewLanguage)}
                                        className="border-primary/20 text-primary hover:bg-primary/5"
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-wrap gap-2">
                                    {profile?.freelancerProfile?.languages?.length > 0 ? (
                                      profile.freelancerProfile.languages.map((language) => (
                                        <SkillBadge key={language} skill={language} />
                                      ))
                                    ) : (
                                      <p className="text-slate-500 italic">No languages added yet.</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="mt-0">
                      <div>
                        <CardTitle className="mb-6 flex items-center gap-2 text-slate-900">
                          <Award className="h-5 w-5 text-primary" />
                          Experience & Education
                        </CardTitle>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <Label
                              htmlFor="experience"
                              className="text-sm font-medium text-slate-700 flex items-center gap-1.5"
                            >
                              <Briefcase05Icon className="h-4 w-4 text-primary" />
                              Professional Experience
                            </Label>
                            {isEditing ? (
                              <Textarea
                                id="experience"
                                name="experience"
                                value={updateProfile.experience}
                                onChange={handleUpdateProfile}
                                className="min-h-[200px] border-slate-200 focus:border-primary focus:ring-primary/20"
                                placeholder="Describe your professional experience..."
                              />
                            ) : (
                              <div className="p-4 bg-white rounded-md border border-slate-200 text-slate-700 min-h-[200px]">
                                {profile?.freelancerProfile?.experience ? (
                                  <div className="whitespace-pre-line">{profile.freelancerProfile.experience}</div>
                                ) : (
                                  <p className="text-slate-500 italic">No experience added yet.</p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="education"
                              className="text-sm font-medium text-slate-700 flex items-center gap-1.5"
                            >
                              <Mortarboard01Icon className="h-4 w-4 text-primary" />
                              Education
                            </Label>
                            {isEditing ? (
                              <Textarea
                                id="education"
                                name="education"
                                value={updateProfile.education}
                                onChange={handleUpdateProfile}
                                className="min-h-[200px] border-slate-200 focus:border-primary focus:ring-primary/20"
                                placeholder="Describe your educational background..."
                              />
                            ) : (
                              <div className="p-4 bg-white rounded-md border border-slate-200 text-slate-700 min-h-[200px]">
                                {profile?.freelancerProfile?.education ? (
                                  <div className="whitespace-pre-line">{profile.freelancerProfile.education}</div>
                                ) : (
                                  <p className="text-slate-500 italic">No education added yet.</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="portfolio" className="mt-0">
                      <div>
                        <CardTitle className="mb-6 flex items-center gap-2 text-slate-900">
                          <Link className="h-5 w-5 text-primary" />
                          Portfolio
                        </CardTitle>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="portfolio"
                              className="text-sm font-medium text-slate-700 flex items-center gap-1.5"
                            >
                              <File01Icon className="h-4 w-4 text-primary" />
                              Portfolio Items
                            </Label>
                            <div className="p-4 bg-white rounded-md border border-slate-200 min-h-[120px]">
                              {isEditing ? (
                                <div className="flex flex-wrap gap-2">
                                  {updateProfile.portfolio.map((item, index) => (
                                    <SkillBadge
                                      key={item}
                                      skill={item}
                                      onRemove={() => removeItem("portfolio", index)}
                                      isEditing={true}
                                    />
                                  ))}

                                  <div className="flex gap-2 mt-2">
                                    <Input
                                      id="newPortfolioItem"
                                      value={newPortfolioItem}
                                      onChange={(e) => setNewPortfolioItem(e.target.value)}
                                      placeholder="Add portfolio item URL"
                                      className="w-64 border-slate-200 focus:border-primary focus:ring-primary/20"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => addItem("portfolio", newPortfolioItem, setNewPortfolioItem)}
                                      className="border-primary/20 text-primary hover:bg-primary/5"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {profile?.freelancerProfile?.portfolio?.length > 0 ? (
                                    profile?.freelancerProfile?.portfolio.map((item) => (
                                      <a
                                        key={item}
                                        href={item.startsWith("http") ? item : `https://${item}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Badge
                                          variant="outline"
                                          className="px-3 py-1 flex items-center gap-1 hover:bg-primary/5 transition-colors"
                                        >
                                          <Link className="h-3 w-3" />
                                          {item}
                                          <ExternalLink className="h-3 w-3 ml-1" />
                                        </Badge>
                                      </a>
                                    ))
                                  ) : (
                                    <p className="text-slate-500 italic">No portfolio items added yet.</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Portfolio preview section */}
                          {profile.portfolio?.length > 0 && !isEditing && (
                            <div className="mt-8">
                              <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-primary" />
                                Portfolio Preview
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {profile.portfolio.slice(0, 3).map((item) => (
                                  <a
                                    key={item}
                                    href={item.startsWith("http") ? item : `https://${item}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:-translate-y-1 hover:shadow-md transition-all"
                                  >
                                    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                      <div className="h-40 bg-slate-100 flex items-center justify-center">
                                        <div className="text-slate-400">
                                          <Link className="h-10 w-10" />
                                        </div>
                                      </div>
                                      <div className="p-4">
                                        <div className="flex items-center justify-between">
                                          <h4 className="font-medium text-slate-900 truncate">
                                            {item.replace(/^https?:\/\//, "").split("/")[0]}
                                          </h4>
                                          <ExternalLink className="h-4 w-4 text-slate-400" />
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Call to action */}
              <div className="mt-10">
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="py-2 px-4 bg-emerald-600 rounded-xl shadow-md border border-[#89AC46]/70 text-white hover:bg-[#6F8D39] font-semibold"
                    onClick={() => setIsPublicProfileOpen(true)}
                  >
                    <span className="relative z-10 flex items-center">View Public Profile</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Public Profile Card Modal */}
      <PublicProfileCard profile={profile} isOpen={isPublicProfileOpen} setIsOpen={setIsPublicProfileOpen} />
    </div>
  )
}

// Star icon component
const Star = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default Profile
