
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Camera, Save, User, Mail, Building2, MapPin, Globe, Upload } from "lucide-react"
import { Link } from "react-router-dom"
import { AlignBoxBottomCenterIcon, Call02Icon, Camera02Icon, Globe02Icon, IdentityCardIcon, Location01Icon, Mail01Icon, OfficeIcon, TextCircleIcon, UserCircle02Icon } from "hugeicons-react"
import { clientProfileUpdate, getClient } from "@/client/Services/api"
import { toast, ToastContainer } from "react-toastify"




export default function EditProfile({ client, setClient }) {
    const [formData, setFormData] = useState(client)
    const [isLoading, setIsLoading] = useState(false)
    const [locationInput, setLocationInput] = useState(formData.clientProfile?.location || "");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const API = import.meta.env.VITE_LOC_API_KEY;

    const fetchLocations = async (query) => {
        if (!query || query.length < 2) {
            setLocationSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {
            const response = await fetch(
                `https://api.locationiq.com/v1/autocomplete.php?key=${API}&q=${encodeURIComponent(query)}&format=json`
            );

            const data = await response.json();

            if (Array.isArray(data)) {
                setLocationSuggestions(data.map((item) => item.display_name));
                setShowSuggestions(true);
            } else {
                setLocationSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
            setLocationSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleLocationChange = async (e) => {
        const value = e.target.value;
        setLocationInput(value);

        setFormData((prev) => ({
            ...prev,
            clientProfile: {
                ...prev.clientProfile,
                location: value,
            },
        }));

        fetchLocations(value);
    };

    const handleSelectSuggestion = (selected) => {
        setLocationInput(selected);
        setFormData((prev) => ({
            ...prev,
            clientProfile: {
                ...prev.clientProfile,
                location: selected,
            },
        }));
        setShowSuggestions(false);
        setLocationSuggestions([]);
    };


    const handleInputChange = (field, value) => {
    if (field.startsWith("clientProfile.")) {
        const key = field.split(".")[1];
        setFormData((prev) => ({
            ...prev,
            clientProfile: {
                ...prev.clientProfile,
                [key]: value,
            },
        }));
    } else {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }
};


    const handleSave = async () => {
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append("username", formData.username || "");
            data.append("bio", formData.bio || "");

            const clientProfile = {
                company: formData.clientProfile?.company || "",
                location: formData.clientProfile?.location || "",
                website: formData.clientProfile?.website || "",
                industry: formData.clientProfile?.industry || "",
                phoneNumber: formData.clientProfile?.phoneNumber || "",
            };

            data.append("clientProfile", JSON.stringify(clientProfile));

            // Optional: if you're allowing profile image uploads
            if (formData.profileImage instanceof File) {
                data.append("profileImage", formData.profileImage);
            }

            const response = await clientProfileUpdate(data);
            if (response?.status === 200) {
                toast.success(response.data.message || "Profile updated successfully!");
                const updated = await getClient();
                setFormData(updated.data);
                setClient(updated.data);
            } else {
                toast.error(response.data?.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating client profile:", error);
            toast.error("Failed to update profile.");
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        if (client) {
            setFormData(client);
        }
    }, [client]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            <ToastContainer />
            <div className="mx-auto  space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/profile">
                            <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Edit Profile</h1>
                            <p className="text-muted-foreground">Update your account information and preferences</p>
                        </div>
                    </div>
                    <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Profile Picture Section */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Camera02Icon className="h-5 w-5" />
                                    Profile Picture
                                </CardTitle>
                                <CardDescription>Update your profile image</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                                        <AvatarImage src={formData?.profile || "/placeholder.svg"} loading="lazy" />
                                        <AvatarFallback className="text-2xl font-bold">
                                            {formData.username?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2 text-center">
                                        <Button asChild variant="outline" className="w-full bg-transparent">
                                            <label>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload New Photo
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }))
                                                    }
                                                />
                                            </label>
                                        </Button>

                                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 5MB.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <IdentityCardIcon className="h-5 w-5" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription>Update your personal and business details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                                    {/* Personal Details */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold">Account Details</h3>
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="username" className="flex items-center gap-2">
                                                    <UserCircle02Icon className="h-4 w-4" />
                                                    Username
                                                </Label>
                                                <Input
                                                    id="username"
                                                    value={formData.username}
                                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                                    placeholder="Enter your username"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-2">
                                                    <Mail01Icon className="h-4 w-4" />
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    disabled
                                                    className="bg-gray-200 cursor-not-allowed"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Details */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold">Business Information</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="company" className="flex items-center gap-2">
                                                    <OfficeIcon className="h-4 w-4" />
                                                    Company Name
                                                </Label>
                                                <Input
                                                    id="company"
                                                    value={formData.clientProfile?.company}
                                                    onChange={(e) => handleInputChange("clientProfile.company", e.target.value)}
                                                    placeholder="Enter your company name"
                                                />
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                                <div className="space-y-2 relative">
                                                    <Label htmlFor="location" className="flex items-center gap-2">
                                                        <Location01Icon className="h-4 w-4" />
                                                        Location
                                                    </Label>
                                                    <Input
                                                        id="location"
                                                        value={locationInput}
                                                        onChange={handleLocationChange}
                                                        placeholder="Enter your location"
                                                        autoComplete="off"
                                                    />
                                                    {showSuggestions && locationSuggestions.length > 0 && (
                                                        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                                                            {locationSuggestions.map((suggestion, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    onClick={() => handleSelectSuggestion(suggestion)}
                                                                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm"
                                                                >
                                                                    {suggestion}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="website" className="flex items-center gap-2">
                                                        <Globe02Icon className="h-4 w-4" />
                                                        Website
                                                    </Label>
                                                    <Input
                                                        id="website"
                                                        value={formData.clientProfile?.website}
                                                        onChange={(e) => handleInputChange("clientProfile.website", e.target.value)}
                                                        placeholder="www.yourwebsite.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Separator */}
                                    <Separator className="col-span-1 lg:col-span-2" />

                                    {/* Additional Information */}
                                    <div className="space-y-4 col-span-1 lg:col-span-2">
                                        <h3 className="text-lg font-semibold">Additional Information</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="bio" className="flex items-center gap-2"><AlignBoxBottomCenterIcon className="h-4 w-4" /> Company Description</Label>
                                                <Textarea
                                                    id="bio"
                                                    value={formData.bio}
                                                    onChange={(e) => handleInputChange("bio", e.target.value)}
                                                    placeholder="Tell us about your company and what you do..."
                                                    className="min-h-[120px]"
                                                />

                                            </div>
                                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="phoneNumber" className="flex items-center gap-2"><Call02Icon className="h-4 w-4" /> Phone Number</Label>
                                                    <Input id="phoneNumber" placeholder="+91 98765 43210" value={formData.clientProfile?.phoneNumber} onChange={(e) => handleInputChange("clientProfile.phoneNumber", e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="industry" className="flex items-center gap-2"><OfficeIcon className="h-4 w-4" /> Industry</Label>
                                                    <Input id="industry" placeholder="e.g., Technology, Healthcare" value={formData.clientProfile?.industry} onChange={(e) => handleInputChange("clientProfile.industry", e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
