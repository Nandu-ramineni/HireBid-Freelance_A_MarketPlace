

import { useState } from "react"
import { CalendarIcon, Plus, X, Upload, DollarSign, Users, Shield, Star, IndianRupee } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { postGig } from "@/client/Redux/Actions/jobActions"
import { toast, ToastContainer } from "react-toastify"
import { IdentityCardIcon, Image01Icon, Shield01Icon, UserCircle02Icon } from "hugeicons-react"


export default function CreateGig() {
    const [skills, setSkills] = useState([])
    const [benefits, setBenefits] = useState([])
    const [requirements, setRequirements] = useState([])
    const [milestones, setMilestones] = useState([])
    const [currentSkill, setCurrentSkill] = useState("")
    const [currentBenefit, setCurrentBenefit] = useState("")
    const [currentRequirement, setCurrentRequirement] = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [detailDesc, setDetailDesc] = useState("")
    const [budget, setBudget] = useState("")
    const [location, setLocation] = useState("")
    const [jobType, setJobType] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("")
    const [category, setCategory] = useState("")
    const [deadline, setDeadline] = useState(null)
    const {loading,jobs} = useSelector((state) => state.getJobs)
    const dispatch = useDispatch();


    const addSkill = () => {
        if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
            setSkills([...skills, currentSkill.trim()])
            setCurrentSkill("")
        }
    }

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove))
    }

    const addBenefit = () => {
        if (currentBenefit.trim() && !benefits.includes(currentBenefit.trim())) {
            setBenefits([...benefits, currentBenefit.trim()])
            setCurrentBenefit("")
        }
    }

    const removeBenefit = (benefitToRemove) => {
        setBenefits(benefits.filter((benefit) => benefit !== benefitToRemove))
    }

    const addRequirement = () => {
        if (currentRequirement.trim() && !requirements.includes(currentRequirement.trim())) {
            setRequirements([...requirements, currentRequirement.trim()])
            setCurrentRequirement("")
        }
    }

    const removeRequirement = (requirementToRemove) => {
        setRequirements(requirements.filter((requirement) => requirement !== requirementToRemove))
    }

    const addMilestone = () => {
        setMilestones([...milestones, { description: "", amount: 0 }])
    }

    const updateMilestone = (index, field, value) => {
        const updatedMilestones = milestones.map((milestone, i) =>
            i === index ? { ...milestone, [field]: value } : milestone,
        )
        setMilestones(updatedMilestones)
    }

    const removeMilestone = (index) => {
        setMilestones(milestones.filter((_, i) => i !== index))
    }

    const categories = [
        "Web Development",
        "Mobile Development",
        "UI/UX Design",
        "Data Science",
        "Cybersecurity",
        "Video Editing",
        "Content Writing",
        "Digital Marketing",
        "Graphic Design",
        "Customer Support",
        "Sales & Business Development",
        "DevOps & Cloud Engineering",
        "AI & Machine Learning",
        "Blockchain Development",
        "Cloud Computing",
        "Game Development",
        "IT & Network Administration",
    ]

    const jobTypes = ["Full Time", "Part Time", "Contract", "Freelance"]
    const experienceLevels = ["Entry Level", "Intermediate", "Expert"]
    const handleSubmit = async (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("detailDesc", detailDesc);
    formData.append("budget", budget);
    formData.append("deadline", deadline?.toISOString());
    formData.append("experienceLevel", experienceLevel);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("skills", JSON.stringify(skills));
    formData.append("requirements", JSON.stringify(requirements));
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("milestones", JSON.stringify(milestones));

    if (image) {
        formData.append("image", image);
    }

    try {
        await dispatch(postGig(formData));
        toast.success("Gig posted successfully!")
        setTitle("");
        setCategory("");
        setDescription("");
        setDetailDesc("");
        setBudget("");
        setLocation("");
        setJobType("");
        setExperienceLevel("");
        setSkills([]);
        setRequirements([]);
        setBenefits([]);

    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.error("Error posting gig:", error);
    }
};


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            <ToastContainer/>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-2">
                        Create New Gig
                    </h1>
                    <p className="text-slate-600 text-lg">Post your project and find the perfect freelancer</p>
                </div>

                <form className="space-y-8 " onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2">
                                <IdentityCardIcon className="h-5 w-5 text-blue-600" />
                                Basic Information
                            </CardTitle>
                            <CardDescription>Tell us about your project</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-medium">
                                        Project Title
                                    </Label>
                                    <Input id="title" placeholder="e.g., Build a Modern E-commerce Website" className="h-11" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-medium">
                                        Category
                                    </Label>
                                    <Select  onValueChange={(value) => setCategory(value)}>
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium">
                                    Short Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief overview of your project..."
                                    className="min-h-[100px] resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="detailDesc" className="text-sm font-medium">
                                    Detailed Description
                                </Label>
                                <Textarea
                                    id="detailDesc"
                                    placeholder="Provide comprehensive details about your project, requirements, and expectations..."
                                    className="min-h-[200px] resize-none"
                                    value={detailDesc}
                                    onChange={(e) => setDetailDesc(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Project Details */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2">
                                <IndianRupee className="h-5 w-5 text-green-600" />
                                Project Details
                            </CardTitle>
                            <CardDescription>Budget, timeline, and work arrangements</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="budget" className="text-sm font-medium">
                                        Budget (₹)
                                    </Label>
                                    <Input id="budget" type="number" placeholder="50000" className="h-11" value={budget} onChange={(e) => setBudget(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Deadline</Label>
                                    <div>
                                        <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn("h-11 w-full justify-start text-left font-normal", !deadline && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {deadline ? format(deadline, "PPP") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" >
                                            <Calendar mode="single" selected={deadline} onSelect={setDeadline} initialFocus  />
                                        </PopoverContent>
                                    </Popover>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experienceLevel" className="text-sm font-medium">
                                        Experience Level
                                    </Label>
                                    <Select onValueChange={(value) => setExperienceLevel(value)}>
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {experienceLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="jobType" className="text-sm font-medium">
                                        Job Type
                                    </Label>
                                    <Select onValueChange={(value) => setJobType(value)}>
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jobTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-sm font-medium">
                                        Location
                                    </Label>
                                    <Input id="location" placeholder="Remote, New York, etc." className="h-11" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills & Requirements */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2">
                                <Shield01Icon className="h-5 w-5 text-purple-600" />
                                Skills & Requirements
                            </CardTitle>
                            <CardDescription>Define what you're looking for</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Skills */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Required Skills</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="skills"
                                        value={currentSkill}
                                        onChange={(e) => setCurrentSkill(e.target.value)}
                                        placeholder="Add a skill..."
                                        className="flex-1"
                                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                    />
                                    <Button type="button" onClick={addSkill} size="sm">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                                            {skill}
                                            <button type="button" onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-500">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Requirements */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Requirements</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="requirement"
                                        value={currentRequirement}
                                        onChange={(e) => setCurrentRequirement(e.target.value)}
                                        placeholder="Add a requirement..."
                                        className="flex-1"
                                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                                    />
                                    <Button type="button" onClick={addRequirement} size="sm">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {requirements.map((requirement, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
                                            <span className="flex-1 text-sm">{requirement}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeRequirement(requirement)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Benefits & Milestones */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2">
                                <UserCircle02Icon className="h-5 w-5 text-orange-600" />
                                Benefits & Milestones
                            </CardTitle>
                            <CardDescription>What you offer and project milestones</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Benefits */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Benefits</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="benefit"
                                        value={currentBenefit}
                                        onChange={(e) => setCurrentBenefit(e.target.value)}
                                        placeholder="Add a benefit..."
                                        className="flex-1"
                                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                                    />
                                    <Button type="button" onClick={addBenefit} size="sm">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {benefits.map((benefit) => (
                                        <Badge key={benefit} variant="outline" className="px-3 py-1">
                                            {benefit}
                                            <button type="button" onClick={() => removeBenefit(benefit)} className="ml-2 hover:text-red-500">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Milestones */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Project Milestones</Label>
                                    <Button type="button" onClick={addMilestone} size="sm" variant="outline">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Milestone
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {milestones.map((milestone, index) => (
                                        <div key={index} className="p-4 border rounded-lg bg-white">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1 space-y-3">
                                                    <Input
                                                        id="milestones"
                                                        type="text"
                                                        placeholder="Milestone description..."
                                                        value={milestone.description}
                                                        onChange={(e) => updateMilestone(index, "description", e.target.value)}
                                                    />
                                                    <Input
                                                        type="number"
                                                        placeholder="Amount ($)"
                                                        value={milestone.amount || ""}
                                                        onChange={(e) => updateMilestone(index, "amount", Number.parseInt(e.target.value) || 0)}
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeMilestone(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Project Image */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2">
                                <Image01Icon className="h-5 w-5 text-teal-600" />
                                Project Image
                            </CardTitle>
                            <CardDescription>Upload an image to represent your project (800 x 600)px</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div
                                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer"
                                onClick={() => document.getElementById("gig-image-upload").click()}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file) {
                                        setImage(file);
                                        setImagePreview(URL.createObjectURL(file));
                                    }
                                }}
                            >
                                {/* Placeholder: show only when no image is selected */}
                                {!imagePreview && (
                                    <>
                                        <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-slate-600 mb-2">Click to upload or drag and drop</p>
                                        <p className="text-sm text-slate-500">PNG, JPG, GIF up to 3MB</p>
                                    </>
                                )}

                                {/* Hidden file input */}
                                <input
                                    id="gig-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setImage(file);
                                            setImagePreview(URL.createObjectURL(file));
                                        }
                                    }}
                                    className="hidden"
                                />

                                {/* Preview */}
                                {imagePreview && (
                                    <div className="mt-4">
                                        <img
                                            src={imagePreview}
                                            alt="Gig Preview"
                                            className="max-w-full h-auto rounded-md shadow-sm mx-auto"
                                        />
                                    </div>
                                )}
                            </div>

                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <Button
                            type="submit"
                            size="lg"
                            className="px-12 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            {loading ? "Posting Gig..." : "Post Gig"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
