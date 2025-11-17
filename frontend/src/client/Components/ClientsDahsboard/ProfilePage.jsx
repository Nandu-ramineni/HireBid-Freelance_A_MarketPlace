import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Globe, Calendar, Activity, Clock, Star, Briefcase, Edit, Mail, User, UserCircleIcon, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import { Activity01Icon, Briefcase05Icon, Calendar03Icon, Call02Icon, Clock01Icon, Location01Icon, Mail01Icon, OfficeIcon, PencilEdit02Icon, StarCircleIcon } from "hugeicons-react"


export default function ProfilePage({ client }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!client) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Loading profile...</p>
            </div>
        );
    }

    const rating = client.clientProfile?.avgRating || 0
    const totalStars = 5

    return (
        <div className="h-[87vh] p-4 md:p-8 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
            <div className="mx-auto max-w-6xl space-y-8">
                {/* HEADER SECTION */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                            <Avatar className="h-24 w-24 border-4 border-white/20 shadow-xl">
                                <AvatarImage src={client.profile || "/placeholder.svg"} alt={client.username} />
                                <AvatarFallback className="bg-white/20 text-2xl font-bold">
                                    {client.username?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold">{client.username}</h1>
                                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                                        <UserCircleIcon className="mr-1 h-3 w-3" />
                                        {client.role}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <Mail01Icon className="h-4 w-4" />
                                    <span>{client.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <Calendar03Icon className="h-4 w-4" />
                                    <span>Member since {formatDate(client.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/client-dashboard/settings">
                            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                                <PencilEdit02Icon className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Logins</CardTitle>
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                                <Activity01Icon className="h-5 w-5 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{client.traction?.loginsCount || 0}</div>
                            <p className="text-xs text-muted-foreground">Account activity</p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Last Login</CardTitle>
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
                                <Clock01Icon className="h-5 w-5 text-green-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Recent</div>
                            <p className="text-xs text-muted-foreground">
                                {client.traction?.lastLogin ? formatDateTime(client.traction.lastLogin) : "N/A"}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-white/60 backdrop-blur-sm md:col-span-2 lg:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Profile Status</CardTitle>
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 text-yellow-600">
                                <StarCircleIcon className="h-5 w-5 text-yellow-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">Active</div>
                            <p className="text-xs text-muted-foreground">Last updated {formatDate(client.updatedAt)}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* COMPANY INFO */}
                <Card className="border-0 bg-white/60 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <OfficeIcon className="h-5 w-5 text-blue-600" />
                            Company Information
                        </CardTitle>
                        <CardDescription>Business details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    Company Name
                                </div>
                                <p className="text-lg font-semibold">{client.clientProfile?.company || "N/A"}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Location01Icon className="h-4 w-4" />
                                    Location
                                </div>
                                <p className="text-lg font-semibold">{client.clientProfile?.location || "N/A"}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Globe className="h-4 w-4" />
                                    Website
                                </div>
                                <a
                                    href={`https://${client.clientProfile?.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-semibold text-blue-600 hover:underline"
                                >
                                    {client.clientProfile?.website || "N/A"}
                                </a>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <TrendingUp className="h-4 w-4" />
                                    Industry
                                </div>
                                <p className="text-lg font-semibold">{client.clientProfile?.industry || "N/A"}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Call02Icon className="h-4 w-4" />
                                    Phone Number
                                </div>
                                <p className="text-lg font-semibold">{client.clientProfile?.phoneNumber || "N/A"}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Star className="h-4 w-4" />
                                    Rating
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalStars)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`h-4 w-4 ${index < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                    <p className="text-sm font-semibold text-muted-foreground ml-2">
                                        {rating > 0 ? `${rating} / 5` : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
            </div>
        </div>
    );
}
