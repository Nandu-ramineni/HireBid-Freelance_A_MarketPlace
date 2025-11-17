import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, DollarSign, Globe, Mail, Verified } from "lucide-react"
import { Link } from "react-router-dom"
import { UserIdVerificationIcon } from "hugeicons-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { saveFreelancerProfile } from "@/client/Services/api"
import { toast, ToastContainer } from "react-toastify"

export function FreelancerCard({ freelancer }) {
    const { firstName, lastName, profile, bio, email, freelancerProfile } = freelancer
    const { skills = [], languages = [], availability = "", hourlyRate = 0, experience = "",avgRating= 0 } = freelancerProfile || {}

    const getInitials = (first, last) => {
        return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase()
    }

    const formatAvailability = (availability) => {
        return availability
            ?.split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }
    const tagStyles = [
        {
            text: { light: "#5925DC", dark: "#BDB4FE" },
            bg: { light: "#5925DC14", dark: "#BDB4FE0D" },
            hoverBg: { light: "#0ACC920D", dark: "#77C7AF0D" },
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
            text: { light: "#8F6C1A", dark: "#E0BE70" },
            bg: { light: "#FFC02E1A", dark: "#E0BE700D" },
            border: { light: "#8F6C1A33", dark: "#E0BE7033" },
            hoverBg: { light: "#FFC02E0D", dark: "#E0BE700D" },
        }
    ]

    const handleSaveProfile = async() => {
        try {
            const data = {
                freelancerId: freelancer._id
            }
            await saveFreelancerProfile(data);
            toast.success("Freelancer Saved")
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.log("Error while saving profile",error)
        }
    }

    return (
        <Card className="w-full max-w-2xl cursor-pointer bg-[#fdfdfd] hover:border-[#0C0E1226] dark:bg-[#1D1E26] dark:hover:border-[#FFFFFF26] transition-all duration-300 shadow-none border border-transparent rounded-[1rem]">
            <ToastContainer/>
            <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={profile || "/placeholder.svg"} alt={`${firstName} ${lastName}`} />
                        <AvatarFallback className="text-lg font-semibold">{getInitials(firstName, lastName)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    {firstName} {lastName}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Verified className="h-5 w-5 text-green-600 cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Verified Freelancer</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </h3>

                                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                    <Mail className="h-3 w-3 text-blue-500" />
                                    <Link to={`mailto:${email}`} >{email}</Link>
                                </p>
                                <p>

                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-green-600">
                                    <span className="font-semibold">₹{hourlyRate}/hr</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#5925DC]">
                                    <Clock className="h-4 w-4" />
                                    <span className="capitalize">{formatAvailability(availability)}</span>
                                </div>
                            </div>
                        </div>

                        {bio && <p className="text-gray-700 mt-2 text-sm leading-relaxed">{bio}</p>}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => {
                                const styleSet = tagStyles[index % tagStyles.length]
                                return (
                                    <span
                                        key={index}
                                        className="text-xs px-2 py-1 rounded-full font-medium"
                                        style={{
                                            color: styleSet.text.light,
                                            backgroundColor: styleSet.bg.light,
                                            
                                        }}
                                    >
                                        {skill}
                                    </span>
                                )
                            })}
                        </div>
                    </div>


                    {/* Languages */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {languages.map((language, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {language}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    </div>

                    {/* Experience Preview */}
                    {experience && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Experience</h4>
                            <p className="text-sm text-gray-600 line-clamp-2 h-9">
                                {experience.length > 150 ? `${experience.substring(0, 150)}...` : experience}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                            View Profile
                        </Button>
                        <Button onClick={handleSaveProfile} size="sm" variant="outline" className="flex-1 bg-transparent">
                            Save Profile
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
