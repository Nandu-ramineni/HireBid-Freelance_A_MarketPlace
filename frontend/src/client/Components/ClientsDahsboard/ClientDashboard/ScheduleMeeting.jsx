import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Clock, Video, Phone, MapPin, User, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

const consultationTypes = [
    {
        id: "strategy",
        name: "Strategy Consultation",
        duration: "60 min",
        price: "₹5,000",
        description: "Comprehensive business strategy discussion",
        icon: <Sparkles className="w-5 h-5" />,
        color: "bg-purple-100 text-purple-700",
    },
    {
        id: "technical",
        name: "Technical Review",
        duration: "45 min",
        price: "₹3,500",
        description: "Code review and technical guidance",
        icon: <Video className="w-5 h-5" />,
        color: "bg-blue-100 text-blue-700",
    },
    {
        id: "design",
        name: "Design Consultation",
        duration: "30 min",
        price: "₹2,500",
        description: "UI/UX design feedback and recommendations",
        icon: <User className="w-5 h-5" />,
        color: "bg-green-100 text-green-700",
    },
]

const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
]

const meetingModes = [
    { id: "video", name: "Video Call", icon: <Video className="w-4 h-4" />, description: "Google Meet/Zoom" },
    { id: "phone", name: "Phone Call", icon: <Phone className="w-4 h-4" />, description: "Voice only" },
    { id: "in-person", name: "In Person", icon: <MapPin className="w-4 h-4" />, description: "Office meeting" },
]

export default function ScheduleMeeting(client) {
    const [step, setStep] = useState(1)
    const [selectedDate, setSelectedDate] = useState()
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedConsultation, setSelectedConsultation] = useState("")
    const [selectedMode, setSelectedMode] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    })
    const [isBooked, setIsBooked] = useState(false)

    const handleBooking = () => {
        setIsBooked(true)
        setTimeout(() => {
            setStep(4)
        }, 1500)
    }

    const isStepComplete = (stepNumber) => {
        switch (stepNumber) {
            case 1:
                return selectedConsultation !== ""
            case 2:
                return selectedDate && selectedTime !== ""
            case 3:
                return formData.name && formData.email && selectedMode
            default:
                return false
        }
    }

    if (step === 4) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-white shadow-2xl border-0">
                    <CardContent className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900">Meeting Scheduled!</h3>
                            <p className="text-slate-600">Your consultation has been confirmed</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-left">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Date:</span>
                                <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Time:</span>
                                <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Type:</span>
                                <span className="font-medium">
                                    {consultationTypes.find((c) => c.id === selectedConsultation)?.name}
                                </span>
                            </div>
                        </div>
                        <Button onClick={() => window.location.reload()} className="w-full bg-slate-900 hover:bg-slate-800">
                            Schedule Another Meeting
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
            <div className="max-w-6xl mx-auto py-8">
                {/* Header */}
                <div className="text-center mb-8 space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                        Schedule Your Consultation
                    </h1>
                    <p className="text-slate-600 text-lg">Book a personalized session with our experts</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {[1, 2, 3].map((stepNumber) => (
                            <div key={stepNumber} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${step >= stepNumber
                                            ? "bg-slate-900 text-white shadow-lg"
                                            : isStepComplete(stepNumber)
                                                ? "bg-green-500 text-white"
                                                : "bg-slate-200 text-slate-600"
                                        }`}
                                >
                                    {isStepComplete(stepNumber) ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                                </div>
                                {stepNumber < 3 && (
                                    <div
                                        className={`w-12 h-1 mx-2 transition-all duration-300 ${step > stepNumber ? "bg-slate-900" : "bg-slate-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                                <CardTitle className="text-xl text-slate-900">
                                    {step === 1 && "Choose Consultation Type"}
                                    {step === 2 && "Select Date & Time"}
                                    {step === 3 && "Your Information"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {/* Step 1: Consultation Type */}
                                {step === 1 && (
                                    <div className="space-y-4">
                                        {consultationTypes.map((consultation) => (
                                            <div
                                                key={consultation.id}
                                                onClick={() => setSelectedConsultation(consultation.id)}
                                                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedConsultation === consultation.id
                                                        ? "border-slate-900 bg-slate-50 shadow-md"
                                                        : "border-slate-200 hover:border-slate-300"
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <div className={`p-3 rounded-lg ${consultation.color}`}>{consultation.icon}</div>
                                                        <div className="space-y-2">
                                                            <h3 className="font-semibold text-slate-900">{consultation.name}</h3>
                                                            <p className="text-slate-600 text-sm">{consultation.description}</p>
                                                            <div className="flex items-center space-x-4 text-sm">
                                                                <Badge variant="outline" className="flex items-center space-x-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span>{consultation.duration}</span>
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold text-slate-900">{consultation.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Step 2: Date & Time */}
                                {step === 2 && (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h3 className="font-semibold text-slate-900 flex items-center space-x-2">
                                                <CalendarIcon className="w-5 h-5" />
                                                <span>Select Date</span>
                                            </h3>
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                                                className="rounded-lg border shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="font-semibold text-slate-900 flex items-center space-x-2">
                                                <Clock className="w-5 h-5" />
                                                <span>Available Times</span>
                                            </h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {timeSlots.map((time) => (
                                                    <Button
                                                        key={time}
                                                        variant={selectedTime === time ? "default" : "outline"}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`h-12 ${selectedTime === time ? "bg-slate-900 hover:bg-slate-800" : "hover:bg-slate-50"
                                                            }`}
                                                    >
                                                        {time}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Information */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-slate-900 font-medium">
                                                    Full Name *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="h-12"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-slate-900 font-medium">
                                                    Email Address *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="h-12"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-slate-900 font-medium">
                                                Company/Organization
                                            </Label>
                                            <Input
                                                id="company"
                                                value={client.clientProfile?.company || formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="h-12"
                                                placeholder="Enter your company name"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-slate-900 font-medium">Meeting Mode *</Label>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                {meetingModes.map((mode) => (
                                                    <div
                                                        key={mode.id}
                                                        onClick={() => setSelectedMode(mode.id)}
                                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${selectedMode === mode.id
                                                                ? "border-slate-900 bg-slate-50"
                                                                : "border-slate-200 hover:border-slate-300"
                                                            }`}
                                                    >
                                                        <div className="text-center space-y-2">
                                                            <div className="flex justify-center">{mode.icon}</div>
                                                            <h4 className="font-medium text-slate-900">{mode.name}</h4>
                                                            <p className="text-xs text-slate-600">{mode.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-slate-900 font-medium">
                                                Additional Notes
                                            </Label>
                                            <Textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="min-h-[100px]"
                                                placeholder="Tell us about your project or specific questions..."
                                            />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Booking Summary */}
                        <Card className="bg-white shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                                <CardTitle className="text-lg">Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {selectedConsultation && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-600">Consultation Type</p>
                                        <p className="font-semibold text-slate-900">
                                            {consultationTypes.find((c) => c.id === selectedConsultation)?.name}
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900">
                                            {consultationTypes.find((c) => c.id === selectedConsultation)?.price}
                                        </p>
                                    </div>
                                )}

                                {selectedDate && selectedTime && (
                                    <>
                                        <Separator />
                                        <div className="space-y-2">
                                            <p className="text-sm text-slate-600">Date & Time</p>
                                            <p className="font-semibold text-slate-900">
                                                {selectedDate.toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                            <p className="font-semibold text-slate-900">{selectedTime}</p>
                                        </div>
                                    </>
                                )}

                                {selectedMode && (
                                    <>
                                        <Separator />
                                        <div className="space-y-2">
                                            <p className="text-sm text-slate-600">Meeting Mode</p>
                                            <p className="font-semibold text-slate-900">
                                                {meetingModes.find((m) => m.id === selectedMode)?.name}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            {step < 3 && (
                                <Button
                                    onClick={() => setStep(step + 1)}
                                    disabled={!isStepComplete(step)}
                                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center space-x-2"
                                >
                                    <span>Continue</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            )}

                            {step === 3 && (
                                <Button
                                    onClick={handleBooking}
                                    disabled={!isStepComplete(step) || isBooked}
                                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                                >
                                    {isBooked ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Booking...</span>
                                        </div>
                                    ) : (
                                        "Confirm Booking"
                                    )}
                                </Button>
                            )}

                            {step > 1 && (
                                <Button onClick={() => setStep(step - 1)} variant="outline" className="w-full h-12">
                                    Back
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
