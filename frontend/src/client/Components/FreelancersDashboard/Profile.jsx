
import { Badge } from "@/components/ui/badge"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  MessageCircle,
  CheckCircle,
  Share2,
  Download,
  ExternalLink,
  Award,
  Clock,
  User,
  IndianRupee,
  StarIcon,
  RefreshCw,
  Save,
  Camera,
  Plus,
  X,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  UserIcon,
} from "lucide-react"
import {
  AlertSquareIcon as HugeAlertSquareIcon,
  Briefcase02Icon as HugeBriefcase02Icon,
  CheckmarkCircle01Icon as HugeCheckmarkCircle01Icon,
  Clock01Icon as HugeClock01Icon,
  Link01Icon as HugeLink01Icon,
  PencilEdit02Icon as HugePencilEdit02Icon,
  UserCircle02Icon as HugeUserCircle02Icon,
} from "hugeicons-react"
import { getUser, userUpdate } from "@/client/Services/api"
import { Link } from "react-router-dom"

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

const SkillBadge = ({ skill, onRemove, isEditing = false }) => {
  return (
    <div className="inline-flex">
      <Badge
        variant="secondary"
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-lg",
          "bg-primary/10 hover:bg-primary/15",
          "border border-primary/20 hover:border-primary/30",
          "transition-all duration-200",
        )}
      >
        {skill}
        {isEditing && onRemove && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 h-4 w-4 p-0 text-primary/70 hover:text-primary hover:bg-transparent"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </Badge>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, color = "from-primary to-indigo-600" }) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-sm`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const PublicProfileCard = ({ profile, isOpen, setIsOpen }) => {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("about")

  const copyProfileLink = () => {
    const profileUrl = `https://yourplatform.com/profile/${profile.username || profile._id}`
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.info("Profile link copied to clipboard")
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white rounded-xl max-h-[90vh] flex flex-col">
        <div className="relative z-10 h-40 bg-gradient-to-br from-primary via-primary/90 to-indigo-600 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Profile image */}
          <div className="absolute top-12 left-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl ring-2 ring-primary/20">
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

          <div className="absolute top-4 right-14 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full shadow-lg"
                  >
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
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full shadow-lg"
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
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full shadow-lg"
                  >
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
        <div className="px-6 pb-0 flex-grow overflow-y-scroll flex flex-col" style={{ scrollbarWidth: "thin" }}>
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

const Profile = ({ freelancerAnalytics }) => {
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
      const data = response.data

      const profileData = {
        ...data,

        // flatten freelancerProfile into top-level fields for your form/UI
        skills: data.freelancerProfile?.skills || [],
        languages: data.freelancerProfile?.languages || [],
        portfolio: data.freelancerProfile?.portfolio || [],
        experience: data.freelancerProfile?.experience || "",
        education: data.freelancerProfile?.education || "",
        hourlyRate: data.freelancerProfile?.hourlyRate || 0,
        availability: data.freelancerProfile?.availability || "",
      }

      setProfile(profileData)
      setUpdateProfile(profileData)
      calculateCompletionPercentage(profileData)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch profile data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateCompletionPercentage = (profileData) => {
    const flatFields = ["firstName", "lastName", "bio", "username", "profile"]
    const nestedFields = ["skills", "languages", "portfolio", "experience", "education", "hourlyRate", "availability"]

    let filledFields = 0
    const totalFields = flatFields.length + nestedFields.length

    flatFields.forEach((field) => {
      const value = profileData[field]
      if (value !== null && value !== undefined && value !== "" && !(typeof value === "number" && value === 0)) {
        filledFields++
      }
    })

    nestedFields.forEach((field) => {
      const value = profileData.freelancerProfile?.[field]
      if (Array.isArray(value)) {
        if (value.length > 0) filledFields++
      } else if (value !== null && value !== undefined && value !== "" && !(typeof value === "number" && value === 0)) {
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
    <div className="h-[91vh] overflow-y-scroll bg-slate-50 pb-20 p-4 md:p-8" style={{ scrollbarWidth: "thin" }}>
      <ToastContainer />

      <div className="max-w-7xl mx-auto">
        {completionPercentage < 100 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-5 py-3.5 rounded-xl mb-6 flex items-center gap-3 shadow-sm">
            <HugeAlertSquareIcon className="h-5 w-5 flex-shrink-0 text-amber-600" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Complete your profile to get more opportunities</p>
              <p className="text-xs text-amber-700 mt-0.5">{completionPercentage}% complete</p>
            </div>
            <div className="w-32 h-2 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="relative mb-4"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                  >
                    <Avatar className="h-32 w-32 border-4 border-primary/10 shadow-lg">
                      <AvatarImage
                        src={imagePreview || profile.profile || "/placeholder.svg?height=128&width=128"}
                        alt="Profile"
                        className="object-cover"
                        loading="lazy"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-600 text-white text-3xl font-bold">
                        {profile.firstName?.[0]}
                        {profile.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    {isEditing && isImageHovered && (
                      <label
                        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full cursor-pointer transition-all"
                        htmlFor="profile-image"
                      >
                        <Camera className="h-8 w-8 text-white drop-shadow-lg" />
                        <input
                          type="file"
                          id="profile-image"
                          className="sr-only"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    )}

                    <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-emerald-500 border-3 border-white shadow-lg" />
                  </div>

                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-sm text-muted-foreground mb-3">{profile.email}</p>

                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 capitalize">
                      <UserIcon className="h-3 w-3 mr-1" />
                      {profile.username || "Username"}
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 capitalize">
                      <Clock className="h-3 w-3 mr-1" />
                      {profile.availability || "Available"}
                    </Badge>
                  </div>

                  <div className="w-full space-y-2">
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      className="w-full"
                      onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          {isEditing ? "Saving..." : "Loading..."}
                        </>
                      ) : (
                        <>
                          {isEditing ? (
                            <Save className="h-4 w-4 mr-2" />
                          ) : (
                            <HugePencilEdit02Icon className="h-4 w-4 mr-2" />
                          )}
                          {isEditing ? "Save Profile" : "Edit Profile"}
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setIsPublicProfileOpen(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Profile
                    </Button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Performance Overview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Profile Completion</span>
                        <span className="font-semibold text-foreground">{completionPercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-indigo-600 transition-all duration-500"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Success Rate</span>
                        <span className="font-semibold text-emerald-600">100%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full" />
                      </div>
                    </div>
                  </div>
                  {/* <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Projects</span>
                      <span className="font-semibold text-foreground">
                        {freelancerAnalytics?.totalCompletedJobs || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Hourly Rate</span>
                      <span className="font-semibold text-foreground">
                        ₹{profile?.freelancerProfile?.hourlyRate || 0}/hr
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        {profile?.freelancerProfile?.avgRating || 0}/5
                        <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="font-semibold text-foreground">{"< 2 hours"}</span>
                    </div>
                  </div> */}
                </div>

                {/* {updateProfile.skills.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Top Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {updateProfile.skills.slice(0, 5).map((skill) => (
                        <SkillBadge key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>

            {/* <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Performance Overview
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span className="font-semibold text-foreground">{completionPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-indigo-600 transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-semibold text-emerald-600">100%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={HugeCheckmarkCircle01Icon}
                title="Completed"
                value={freelancerAnalytics?.totalCompletedJobs || 0}
                color="from-emerald-500 to-teal-600"
              />
              <StatCard
                icon={IndianRupee}
                title="Rate"
                value={`₹${profile?.freelancerProfile?.hourlyRate || 0}`}
                color="from-amber-500 to-orange-600"
              />
              <StatCard
                icon={StarIcon}
                title="Rating"
                value={`${profile?.freelancerProfile?.avgRating || 0}/5`}
                color="from-yellow-500 to-amber-600"
              />
              <StatCard icon={HugeClock01Icon} title="Response" value="< 2h" color="from-blue-500 to-indigo-600" />
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-100 p-1 rounded-lg">
                    {[
                      { id: "personal", label: "Personal", icon: HugeUserCircle02Icon },
                      { id: "professional", label: "Professional", icon: HugeBriefcase02Icon },
                      { id: "experience", label: "Experience", icon: Award },
                      { id: "portfolio", label: "Portfolio", icon: HugeLink01Icon },
                    ].map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className={cn(
                          "flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md",
                          "transition-all duration-200 data-[state=active]:text-primary font-medium text-sm",
                        )}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Personal Tab */}
                  <TabsContent value="personal" className="mt-0 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={updateProfile.firstName}
                            onChange={handleUpdateProfile}
                            disabled={!isEditing}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={updateProfile.lastName}
                            onChange={handleUpdateProfile}
                            disabled={!isEditing}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={updateProfile.bio}
                        onChange={handleUpdateProfile}
                        rows={2}
                        disabled={!isEditing}
                        className="mt-1.5"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-3 border rounded-lg bg-slate-50">
                        {updateProfile.skills.length > 0 ? (
                          updateProfile.skills.map((skill, index) => (
                            <SkillBadge
                              key={skill}
                              skill={skill}
                              onRemove={() => removeItem("skills", index)}
                              isEditing={isEditing}
                            />
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground italic">No skills added yet</span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2 mt-3">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill (e.g., React, Node.js)"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addItem("skills", newSkill, setNewSkill)
                              }
                            }}
                          />
                          <Button onClick={() => addItem("skills", newSkill, setNewSkill)} variant="secondary">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-3 border rounded-lg bg-slate-50">
                        {updateProfile.languages.length > 0 ? (
                          updateProfile.languages.map((lang, index) => (
                            <SkillBadge
                              key={lang}
                              skill={lang}
                              onRemove={() => removeItem("languages", index)}
                              isEditing={isEditing}
                            />
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground italic">No languages added yet</span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2 mt-3">
                          <Input
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            placeholder="Add a language (e.g., English, Spanish)"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addItem("languages", newLanguage, setNewLanguage)
                              }
                            }}
                          />
                          <Button onClick={() => addItem("languages", newLanguage, setNewLanguage)} variant="secondary">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Professional Tab */}
                  <TabsContent value="professional" className="mt-0 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">Professional Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hourlyRate" className="text-sm font-medium">
                            Hourly Rate (₹)
                          </Label>
                          <Input
                            id="hourlyRate"
                            name="hourlyRate"
                            type="number"
                            value={updateProfile.hourlyRate}
                            onChange={handleUpdateProfile}
                            disabled={!isEditing}
                            placeholder="e.g., 500"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="availability" className="text-sm font-medium">
                            Availability
                          </Label>
                          <Input
                            id="availability"
                            name="availability"
                            value={updateProfile.availability}
                            onChange={handleUpdateProfile}
                            disabled={!isEditing}
                            placeholder="e.g., Full-time, Part-time"
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Skill Proficiency</Label>
                      <div className="space-y-3 mt-3">
                        {updateProfile.skills.slice(0, 5).map((skill, index) => (
                          <div key={skill} className="bg-slate-50 rounded-lg p-4 border">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-sm text-foreground">{skill}</span>
                              <span className="text-xs text-muted-foreground font-medium px-2 py-1 bg-white rounded-md border">
                                {index === 0
                                  ? "Expert"
                                  : index === 1
                                    ? "Advanced"
                                    : index === 2
                                      ? "Intermediate"
                                      : "Beginner"}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary to-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: index === 0 ? "95%" : index === 1 ? "85%" : index === 2 ? "70%" : "55%",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        {updateProfile.skills.length === 0 && (
                          <p className="text-sm text-muted-foreground italic p-4 bg-slate-50 rounded-lg text-center">
                            No skills added yet. Add skills in the Personal tab.
                          </p>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Experience Tab */}
                  <TabsContent value="experience" className="mt-0 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">Experience & Education</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="experience" className="text-sm font-medium">
                            Professional Experience
                          </Label>
                          <Textarea
                            id="experience"
                            name="experience"
                            value={updateProfile.experience}
                            onChange={handleUpdateProfile}
                            rows={8}
                            disabled={!isEditing}
                            className="mt-1.5"
                            placeholder="Describe your work experience, projects, and achievements..."
                          />
                        </div>

                        <div>
                          <Label htmlFor="education" className="text-sm font-medium">
                            Education
                          </Label>
                          <Textarea
                            id="education"
                            name="education"
                            value={updateProfile.education}
                            onChange={handleUpdateProfile}
                            rows={6}
                            disabled={!isEditing}
                            className="mt-1.5"
                            placeholder="List your educational background, degrees, and certifications..."
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Portfolio Tab */}
                  <TabsContent value="portfolio" className="mt-0 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">Portfolio</h3>

                      {updateProfile.portfolio.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {updateProfile.portfolio.map((item, index) => (
                            <div key={item} className="relative group">
                              <a
                                href={item.startsWith("http") ? item : `https://${item}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <div className="bg-slate-50 border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                  <div className="h-40 bg-gradient-to-br from-primary/10 to-indigo-600/10 flex items-center justify-center">
                                    <HugeLink01Icon className="h-10 w-10 text-primary/40" />
                                  </div>
                                  <div className="p-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium text-sm text-foreground truncate max-w-[200px]">
                                        {item.replace(/^https?:\/\//, "").split("/")[0]}
                                      </h4>
                                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    </div>
                                  </div>
                                </div>
                              </a>

                              {isEditing && (
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeItem("portfolio", index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 bg-slate-50 rounded-lg text-center border-2 border-dashed">
                          <HugeLink01Icon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground italic">
                            No portfolio items added yet. Add your projects below.
                          </p>
                        </div>
                      )}

                      {isEditing && (
                        <div className="mt-4">
                          <Label htmlFor="portfolio" className="text-sm font-medium">
                            Add Portfolio Link
                          </Label>
                          <div className="flex gap-2 mt-2">
                            <Input
                              id="portfolio"
                              value={newPortfolioItem}
                              onChange={(e) => setNewPortfolioItem(e.target.value)}
                              placeholder="https://your-project.com"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  addItem("portfolio", newPortfolioItem, setNewPortfolioItem)
                                }
                              }}
                            />
                            <Button
                              onClick={() => addItem("portfolio", newPortfolioItem, setNewPortfolioItem)}
                              variant="secondary"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Public Profile Preview Modal */}
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
