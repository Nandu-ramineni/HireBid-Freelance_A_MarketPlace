
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
    ArrowLeft,
    ArrowRight,
    Upload,
    Building,
    Instagram,
    Linkedin,
    Twitter,
    Facebook,
    CheckCircle,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { OfficeIcon } from "hugeicons-react"

// Form validation schema
const formSchema = z.object({
    // Step 1: Basic Information
    name: z.string().min(2, { message: "Agency name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),

    // Step 2: Agency Details
    location: z.string().min(2, { message: "Location is required" }),
    foundedYear: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year" }),
    size: z.string(),
    description: z.string().min(50, { message: "Description must be at least 50 characters" }),

    // Step 3: Services & Expertise
    primaryService: z.string(),
    services: z.array(z.string()).min(1, { message: "Select at least one service" }),
    expertise: z.array(z.string()).min(1, { message: "Select at least one area of expertise" }),

    // Step 4: Rates & Portfolio
    rateRange: z.array(z.number()),
    rateType: z.enum(["hourly", "project", "retainer"]),
    portfolioLinks: z.array(z.string().url({ message: "Please enter valid URLs" })).optional(),

    // Step 5: Additional Information
    socialLinks: z.object({
        linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL" }).optional().or(z.literal("")),
        twitter: z.string().url({ message: "Please enter a valid Twitter URL" }).optional().or(z.literal("")),
        instagram: z.string().url({ message: "Please enter a valid Instagram URL" }).optional().or(z.literal("")),
        facebook: z.string().url({ message: "Please enter a valid Facebook URL" }).optional().or(z.literal("")),
    }),
    acceptTerms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions" }),
    allowMarketing: z.boolean().optional(),
})

export default function RegisterAgency() {
    const router = useNavigate()
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [portfolioLinks, setPortfolioLinks] = useState([""])
    const [logoPreview, setLogoPreview] = useState(null)

    const totalSteps = 5

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            website: "",
            location: "",
            foundedYear: "",
            size: "",
            description: "",
            primaryService: "",
            services: [],
            expertise: [],
            rateRange: [50, 150],
            rateType: "hourly",
            portfolioLinks: [""],
            socialLinks: {
                linkedin: "",
                twitter: "",
                instagram: "",
                facebook: "",
            },
            acceptTerms: false,
            allowMarketing: false,
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
        trigger,
    } = form

    const onSubmit = async (data) => {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log("Form submitted:", data)
        setIsSubmitting(false)
        setIsSuccess(true)

        // Redirect after success
        setTimeout(() => {
            router("/")
        }, 5000)
    }

    const nextStep = async () => {
        // Validate current step fields
        let fieldsToValidate = []

        switch (step) {
            case 1:
                fieldsToValidate = ["name", "email", "phone", "website"]
                break
            case 2:
                fieldsToValidate = ["location", "foundedYear", "size", "description"]
                break
            case 3:
                fieldsToValidate = ["primaryService", "services", "expertise"]
                break
            case 4:
                fieldsToValidate = ["rateRange", "rateType"]
                break
            case 5:
                fieldsToValidate = ["acceptTerms"]
                break
        }

        const isStepValid = await trigger(fieldsToValidate)

        if (isStepValid) {
            setStep((prev) => Math.min(prev + 1, totalSteps))
            window.scrollTo(0, 0)
        }
    }

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1))
        window.scrollTo(0, 0)
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const addPortfolioLink = () => {
        setPortfolioLinks([...portfolioLinks, ""])
    }

    const updatePortfolioLink = (index, value) => {
        const updatedLinks = [...portfolioLinks]
        updatedLinks[index] = value
        setPortfolioLinks(updatedLinks)
        setValue(
            "portfolioLinks",
            updatedLinks.filter((link) => link !== ""),
        )
    }

    const removePortfolioLink = (index) => {
        const updatedLinks = portfolioLinks.filter((_, i) => i !== index)
        setPortfolioLinks(updatedLinks.length ? updatedLinks : [""])
        setValue(
            "portfolioLinks",
            updatedLinks.filter((link) => link !== ""),
        )
    }

    // Services and expertise options
    const serviceOptions = [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Graphic Design",
        "Digital Marketing",
        "SEO",
        "Content Creation",
        "Branding",
        "Video Production",
        "Social Media Management",
        "E-commerce Development",
        "Software Development",
        "AR/VR Development",
        "AI Solutions",
        "Blockchain Development",
    ]

    const expertiseOptions = [
        "JavaScript",
        "React",
        "Angular",
        "Vue.js",
        "Node.js",
        "Python",
        "Ruby on Rails",
        "PHP",
        "WordPress",
        "Shopify",
        "iOS Development",
        "Android Development",
        "Flutter",
        "React Native",
        "Figma",
        "Adobe XD",
        "Photoshop",
        "Illustrator",
        "After Effects",
        "3D Modeling",
        "Motion Graphics",
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.2 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 },
        },
    }

    const progressPercentage = (step / totalSteps) * 100

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Register Your Agency</h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Join our network of top agencies and start receiving high-quality project leads
                        </p>
                    </motion.div>

                    {!isSuccess ? (
                        <>
                            <div className="mb-8">
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>
                                        Step {step} of {totalSteps}
                                    </span>
                                    <span>{Math.round(progressPercentage)}% Complete</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>

                            <Card className="border-slate-200 dark:border-slate-700">
                                <CardHeader>
                                    <CardTitle>
                                        {step === 1 && "Basic Information"}
                                        {step === 2 && "Agency Details"}
                                        {step === 3 && "Services & Expertise"}
                                        {step === 4 && "Rates & Portfolio"}
                                        {step === 5 && "Additional Information"}
                                    </CardTitle>
                                    <CardDescription>
                                        {step === 1 && "Let's start with your agency's basic contact information"}
                                        {step === 2 && "Tell us more about your agency"}
                                        {step === 3 && "What services do you offer and what are your areas of expertise?"}
                                        {step === 4 && "Share your rate information and portfolio"}
                                        {step === 5 && "Almost done! Just a few more details"}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <AnimatePresence mode="wait">
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    variants={containerVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="space-y-6"
                                                >
                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="logo" className="block">
                                                            Agency Logo <span className="text-sm text-slate-500">(Optional)</span>
                                                        </Label>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="h-20 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                                                                {logoPreview ? (
                                                                    <img
                                                                        src={logoPreview || "/placeholder.svg"}
                                                                        alt="Agency logo preview"
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                                        <OfficeIcon className="h-8 w-8" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => document.getElementById("logo-upload").click()}
                                                                >
                                                                    <Upload className="mr-2 h-4 w-4" />
                                                                    Upload Logo
                                                                </Button>
                                                                <input
                                                                    id="logo-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={handleLogoChange}
                                                                />
                                                                <p className="mt-1 text-xs text-slate-500">PNG, JPG or GIF, max 2MB</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="name" className="block">
                                                            Agency Name <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            placeholder="e.g., Creative Solutions Agency"
                                                            {...register("name")}
                                                            className={errors.name ? "border-red-500" : ""}
                                                        />
                                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="email" className="block">
                                                            Business Email <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="contact@youragency.com"
                                                            {...register("email")}
                                                            className={errors.email ? "border-red-500" : ""}
                                                        />
                                                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="phone" className="block">
                                                            Phone Number <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id="phone"
                                                            placeholder="+1 (555) 123-4567"
                                                            {...register("phone")}
                                                            className={errors.phone ? "border-red-500" : ""}
                                                        />
                                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="website" className="block">
                                                            Website <span className="text-sm text-slate-500">(Optional)</span>
                                                        </Label>
                                                        <Input
                                                            id="website"
                                                            placeholder="https://youragency.com"
                                                            {...register("website")}
                                                            className={errors.website ? "border-red-500" : ""}
                                                        />
                                                        {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                                                    </motion.div>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    variants={containerVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="space-y-6"
                                                >
                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="location" className="block">
                                                            Location <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id="location"
                                                            placeholder="City, Country"
                                                            {...register("location")}
                                                            className={errors.location ? "border-red-500" : ""}
                                                        />
                                                        {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="foundedYear" className="block">
                                                            Year Founded <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id="foundedYear"
                                                            placeholder="e.g., 2018"
                                                            {...register("foundedYear")}
                                                            className={errors.foundedYear ? "border-red-500" : ""}
                                                        />
                                                        {errors.foundedYear && <p className="text-sm text-red-500">{errors.foundedYear.message}</p>}
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="size" className="block">
                                                            Agency Size <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Select onValueChange={(value) => setValue("size", value)} defaultValue={watch("size")}>
                                                            <SelectTrigger className={errors.size ? "border-red-500" : ""}>
                                                                <SelectValue placeholder="Select team size" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1-5">1-5 employees</SelectItem>
                                                                <SelectItem value="6-10">6-10 employees</SelectItem>
                                                                <SelectItem value="11-25">11-25 employees</SelectItem>
                                                                <SelectItem value="26-50">26-50 employees</SelectItem>
                                                                <SelectItem value="51-100">51-100 employees</SelectItem>
                                                                <SelectItem value="100+">100+ employees</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.size && <p className="text-sm text-red-500">{errors.size.message}</p>}
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="description" className="block">
                                                            Agency Description <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Textarea
                                                            id="description"
                                                            placeholder="Tell potential clients about your agency, your mission, and what makes you unique..."
                                                            rows={5}
                                                            {...register("description")}
                                                            className={errors.description ? "border-red-500" : ""}
                                                        />
                                                        <div className="flex justify-between">
                                                            {errors.description ? (
                                                                <p className="text-sm text-red-500">{errors.description.message}</p>
                                                            ) : (
                                                                <p className="text-xs text-slate-500">Minimum 50 characters</p>
                                                            )}
                                                            <p className="text-xs text-slate-500">{watch("description")?.length || 0} / 500</p>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            )}

                                            {step === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    variants={containerVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="space-y-6"
                                                >
                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label htmlFor="primaryService" className="block">
                                                            Primary Service <span className="text-red-500">*</span>
                                                        </Label>
                                                        <Select
                                                            onValueChange={(value) => setValue("primaryService", value)}
                                                            defaultValue={watch("primaryService")}
                                                        >
                                                            <SelectTrigger className={errors.primaryService ? "border-red-500" : ""}>
                                                                <SelectValue placeholder="Select your main service" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {serviceOptions.map((service) => (
                                                                    <SelectItem key={service} value={service}>
                                                                        {service}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.primaryService && (
                                                            <p className="text-sm text-red-500">{errors.primaryService.message}</p>
                                                        )}
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <div>
                                                            <Label className="block mb-2">
                                                                Services Offered <span className="text-red-500">*</span>
                                                            </Label>
                                                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                                                                {serviceOptions.map((service) => (
                                                                    <div key={service} className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={`service-${service}`}
                                                                            checked={watch("services")?.includes(service)}
                                                                            onCheckedChange={(checked) => {
                                                                                const currentServices = watch("services") || []
                                                                                if (checked) {
                                                                                    setValue("services", [...currentServices, service])
                                                                                } else {
                                                                                    setValue(
                                                                                        "services",
                                                                                        currentServices.filter((s) => s !== service),
                                                                                    )
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Label htmlFor={`service-${service}`} className="text-sm font-normal">
                                                                            {service}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {errors.services && (
                                                                <p className="mt-2 text-sm text-red-500">{errors.services.message}</p>
                                                            )}
                                                        </div>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <div>
                                                            <Label className="block mb-2">
                                                                Areas of Expertise <span className="text-red-500">*</span>
                                                            </Label>
                                                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                                                                {expertiseOptions.map((expertise) => (
                                                                    <div key={expertise} className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={`expertise-${expertise}`}
                                                                            checked={watch("expertise")?.includes(expertise)}
                                                                            onCheckedChange={(checked) => {
                                                                                const currentExpertise = watch("expertise") || []
                                                                                if (checked) {
                                                                                    setValue("expertise", [...currentExpertise, expertise])
                                                                                } else {
                                                                                    setValue(
                                                                                        "expertise",
                                                                                        currentExpertise.filter((e) => e !== expertise),
                                                                                    )
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Label htmlFor={`expertise-${expertise}`} className="text-sm font-normal">
                                                                            {expertise}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {errors.expertise && (
                                                                <p className="mt-2 text-sm text-red-500">{errors.expertise.message}</p>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            )}

                                            {step === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    variants={containerVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="space-y-6"
                                                >
                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label className="block">
                                                            Rate Type <span className="text-red-500">*</span>
                                                        </Label>
                                                        <RadioGroup
                                                            defaultValue={watch("rateType")}
                                                            onValueChange={(value) => setValue("rateType", value)}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="hourly" id="hourly" />
                                                                <Label htmlFor="hourly" className="font-normal">
                                                                    Hourly Rate
                                                                </Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="project" id="project" />
                                                                <Label htmlFor="project" className="font-normal">
                                                                    Project-Based
                                                                </Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="retainer" id="retainer" />
                                                                <Label htmlFor="retainer" className="font-normal">
                                                                    Monthly Retainer
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label className="block">
                                                            Rate Range (USD) <span className="text-red-500">*</span>
                                                        </Label>
                                                        <div className="px-2">
                                                            <Slider
                                                                defaultValue={watch("rateRange")}
                                                                min={0}
                                                                max={500}
                                                                step={5}
                                                                onValueChange={(value) => setValue("rateRange", value)}
                                                                className="mb-2"
                                                            />
                                                            <div className="flex justify-between text-sm text-slate-500">
                                                                <span>${watch("rateRange")[0]}</span>
                                                                <span>${watch("rateRange")[1]}</span>
                                                            </div>
                                                            <p className="mt-1 text-xs text-slate-500">
                                                                {watch("rateType") === "hourly" && "Per hour"}
                                                                {watch("rateType") === "project" && "Average project minimum/maximum"}
                                                                {watch("rateType") === "retainer" && "Monthly retainer minimum/maximum"}
                                                            </p>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-2">
                                                        <Label className="block">
                                                            Portfolio Links <span className="text-sm text-slate-500">(Optional)</span>
                                                        </Label>
                                                        <div className="space-y-3">
                                                            {portfolioLinks.map((link, index) => (
                                                                <div key={index} className="flex items-center space-x-2">
                                                                    <Input
                                                                        placeholder="https://example.com/project"
                                                                        value={link}
                                                                        onChange={(e) => updatePortfolioLink(index, e.target.value)}
                                                                    />
                                                                    {portfolioLinks.length > 1 && (
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            size="icon"
                                                                            onClick={() => removePortfolioLink(index)}
                                                                        >
                                                                            <span className="sr-only">Remove</span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24"
                                                                                height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="h-4 w-4"
                                                                            >
                                                                                <path d="M18 6 6 18" />
                                                                                <path d="m6 6 12 12" />
                                                                            </svg>
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={addPortfolioLink}
                                                                className="mt-2"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="mr-2 h-4 w-4"
                                                                >
                                                                    <path d="M5 12h14" />
                                                                    <path d="M12 5v14" />
                                                                </svg>
                                                                Add Another Link
                                                            </Button>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            )}

                                            {step === 5 && (
                                                <motion.div
                                                    key="step5"
                                                    variants={containerVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="space-y-6"
                                                >
                                                    <motion.div variants={itemVariants} className="space-y-4">
                                                        <Label className="block">
                                                            Social Media Links <span className="text-sm text-slate-500">(Optional)</span>
                                                        </Label>
                                                        <div className="space-y-3">
                                                            <div className="flex items-center space-x-2">
                                                                <Linkedin className="h-5 w-5 text-slate-400" />
                                                                <Input
                                                                    placeholder="LinkedIn URL"
                                                                    {...register("socialLinks.linkedin")}
                                                                    className={errors.socialLinks?.linkedin ? "border-red-500" : ""}
                                                                />
                                                            </div>
                                                            {errors.socialLinks?.linkedin && (
                                                                <p className="text-sm text-red-500">{errors.socialLinks.linkedin.message}</p>
                                                            )}

                                                            <div className="flex items-center space-x-2">
                                                                <Twitter className="h-5 w-5 text-slate-400" />
                                                                <Input
                                                                    placeholder="Twitter URL"
                                                                    {...register("socialLinks.twitter")}
                                                                    className={errors.socialLinks?.twitter ? "border-red-500" : ""}
                                                                />
                                                            </div>
                                                            {errors.socialLinks?.twitter && (
                                                                <p className="text-sm text-red-500">{errors.socialLinks.twitter.message}</p>
                                                            )}

                                                            <div className="flex items-center space-x-2">
                                                                <Instagram className="h-5 w-5 text-slate-400" />
                                                                <Input
                                                                    placeholder="Instagram URL"
                                                                    {...register("socialLinks.instagram")}
                                                                    className={errors.socialLinks?.instagram ? "border-red-500" : ""}
                                                                />
                                                            </div>
                                                            {errors.socialLinks?.instagram && (
                                                                <p className="text-sm text-red-500">{errors.socialLinks.instagram.message}</p>
                                                            )}

                                                            <div className="flex items-center space-x-2">
                                                                <Facebook className="h-5 w-5 text-slate-400" />
                                                                <Input
                                                                    placeholder="Facebook URL"
                                                                    {...register("socialLinks.facebook")}
                                                                    className={errors.socialLinks?.facebook ? "border-red-500" : ""}
                                                                />
                                                            </div>
                                                            {errors.socialLinks?.facebook && (
                                                                <p className="text-sm text-red-500">{errors.socialLinks.facebook.message}</p>
                                                            )}
                                                        </div>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants} className="space-y-4">
                                                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                                                            <div className="flex items-start space-x-2">
                                                                <Checkbox
                                                                    id="acceptTerms"
                                                                    checked={watch("acceptTerms")}
                                                                    onCheckedChange={(checked) => setValue("acceptTerms", checked)}
                                                                    className="mt-1"
                                                                />
                                                                <div>
                                                                    <Label htmlFor="acceptTerms" className="font-medium">
                                                                        Terms and Conditions <span className="text-red-500">*</span>
                                                                    </Label>
                                                                    <p className="text-sm text-slate-500">
                                                                        I agree to the{" "}
                                                                        <a href="#" className="text-primary underline">
                                                                            Terms of Service
                                                                        </a>{" "}
                                                                        and{" "}
                                                                        <a href="#" className="text-primary underline">
                                                                            Privacy Policy
                                                                        </a>
                                                                    </p>
                                                                    {errors.acceptTerms && (
                                                                        <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-start space-x-2">
                                                            <Switch
                                                                id="allowMarketing"
                                                                checked={watch("allowMarketing")}
                                                                onCheckedChange={(checked) => setValue("allowMarketing", checked)}
                                                            />
                                                            <div>
                                                                <Label htmlFor="allowMarketing" className="font-medium">
                                                                    Marketing Communications
                                                                </Label>
                                                                <p className="text-sm text-slate-500">
                                                                    I'd like to receive updates about new features, client opportunities, and marketing
                                                                    communications.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </CardContent>

                                <CardFooter className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Button>

                                    {step < totalSteps ? (
                                        <Button type="button" onClick={nextStep}>
                                            Next
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <svg
                                                        className="mr-2 h-4 w-4 animate-spin"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Application
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="border-slate-200 dark:border-slate-700">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                            <CheckCircle className="h-10 w-10" />
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold">Application Submitted!</h2>
                                        <p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
                                            Thank you for registering your agency with HireBid. Our team will review your application and get
                                            back to you within 2-3 business days.
                                        </p>
                                        <Button onClick={() => router.push("/")}>Return to Home</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
