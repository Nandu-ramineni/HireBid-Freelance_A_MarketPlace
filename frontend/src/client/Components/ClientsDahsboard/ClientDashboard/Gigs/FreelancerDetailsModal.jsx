

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Clock,
  Briefcase,
  GraduationCap,
  Globe,
  ExternalLink,
  MessageSquare,
  Calendar,
  Activity,
  Award,
} from "lucide-react"



export default function FreelancerDetailsModal({ freelancer, isOpen, onClose }) {
  if (!freelancer) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Freelancer Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={freelancer.profile || "/placeholder.svg"} alt={freelancer.firstName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                {freelancer.firstName?.charAt(0)}
                {freelancer.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {freelancer.firstName} {freelancer.lastName}
                  </h2>
                  <p className="text-gray-600 text-lg">@{freelancer.username}</p>
                  <p className="text-gray-700 mt-2 leading-relaxed">{freelancer.bio}</p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">New</span>
                    <span className="text-gray-600 text-sm">(0 reviews)</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Activity className="w-3 h-3 mr-1" />
                    Active {getTimeAgo(freelancer.traction.lastLogin)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-blue-600">${freelancer.freelancerProfile.hourlyRate}</p>
                  <p className="text-sm text-gray-600">per hour</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-green-600">{freelancer.traction.loginsCount}</p>
                  <p className="text-sm text-gray-600">logins</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-gray-600">projects</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-orange-600 capitalize">
                    {freelancer.freelancerProfile.availability.split("-")[0]}
                  </p>
                  <p className="text-sm text-gray-600">availability</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.freelancerProfile.languages.map((language, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Availability
                    </h4>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 capitalize">
                      {freelancer.freelancerProfile.availability}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Member Since
                    </h4>
                    <p className="text-gray-700">{formatDate(freelancer.createdAt)}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Last Active
                    </h4>
                    <p className="text-gray-700">{getTimeAgo(freelancer.traction.lastLogin)}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-gray-900 mb-4">Technical Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {freelancer.freelancerProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1 text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Experience
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{freelancer.freelancerProfile.experience}</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{freelancer.freelancerProfile.education}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4 mt-6">
              <div className="grid gap-4">
                {freelancer.freelancerProfile.portfolio.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">Portfolio Website</h4>
                      <p className="text-sm text-gray-600 truncate">{link}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-green-800">
                      <span className="font-semibold">Last login:</span> {getTimeAgo(freelancer.traction.lastLogin)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-blue-800">
                      <span className="font-semibold">Total logins:</span> {freelancer.traction.loginsCount}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-purple-800">
                      <span className="font-semibold">Member since:</span> {formatDate(freelancer.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Award className="w-4 h-4 mr-2" />
              View Reviews
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
