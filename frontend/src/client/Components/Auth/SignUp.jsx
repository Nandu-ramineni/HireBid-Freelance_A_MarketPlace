import { lazy, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom"
import { authenticateSignup } from "@/client/Services/api"
import Cookies from 'js-cookie';
// import SignupImage from '@/assets/Images/SignupImage.jpg';
import { motion } from "framer-motion"
// import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { AlertCircle, ChevronRight, Loader2, Lock, Mail, User, UserCheck, UserCircle } from "lucide-react"
const signUpInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    firstName: "",
    lastName: "",
}
const SignUp = () => {
    const [data, setData] = useState(signUpInitialValues);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const navigate = useNavigate()
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const validateEMail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const response = await authenticateSignup(data)
            if (response.status === 201) {
                console.log(response)
                Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
                Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });
                setIsLoading(false);
                navigate("/dashboard");
            } else if (response.status === 400 || response.status === 500) {
                setIsLoading(false)
                setError(response.data.message)
            }
        } catch (error) {
            setIsLoading(false)
            setError("Something went wrong. Please try again.")
            console.log(error)

        }
    }
    return (
        <div
            className={cn(
                " w-full flex items-center justify-center overflow-hidden transition-colors duration-300  md:h-[calc(100vh-4.5rem)]",
                isDarkMode ? "bg-[#0F172A]" : "bg-[#F8FAFC]",
            )}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={cn(
                        "absolute -top-[30%] -left-[10%] w-[70%] h-[100%] rounded-full opacity-30 blur-3xl",
                        isDarkMode ? "bg-purple-700" : "bg-blue-300",
                    )}
                />
                <div
                    className={cn(
                        "absolute -bottom-[30%] -right-[10%] w-[70%] h-[100%] rounded-full opacity-30 blur-3xl",
                        isDarkMode ? "bg-indigo-700" : "bg-green-200",
                    )}
                />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            </div>

            {/* Theme toggle */}
            {/* <div className="absolute top-4 right-4 z-50">
        <div className="flex items-center space-x-2">
          <span className={cn("text-xs font-medium", isDarkMode ? "text-gray-400" : "text-gray-600")}>
            {isDarkMode ? "Dark" : "Light"}
          </span>
          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} className={isDarkMode ? "bg-indigo-600" : ""} />
        </div>
      </div> */}

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl flex flex-col lg:flex-row mx-0 md:mx-4"
            >
                {/* Left side - Form */}
                <div className="w-full lg:w-7/12 p-4 lg:p-12 flex flex-col justify-center relative order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className={cn(
                            "relative z-10 p-8 rounded-3xl",
                            isDarkMode
                                ? "bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800"
                                : "bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-100",
                        )}
                    >
                        <div className="mb-4">
                            <h1 className={cn("text-4xl font-bold tracking-tight mb-2", isDarkMode ? "text-white" : "text-gray-900")}>
                                Create Account
                            </h1>
                            <p className={cn("text-sm md:text-lg", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                                Join our community and start your journey
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex items-center gap-2 p-4 mb-6 rounded-xl",
                                    isDarkMode
                                        ? "bg-red-950/50 text-red-300 border border-red-900/50"
                                        : "bg-red-50 text-red-500 border border-red-100",
                                )}
                            >
                                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <form onSubmit={submitHandler} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="firstName"
                                        className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                    >
                                        First Name
                                    </Label>
                                    <div className="relative">
                                        <div
                                            className={cn(
                                                "absolute left-3 top-1/2 -translate-y-1/2",
                                                isDarkMode ? "text-gray-400" : "text-gray-500",
                                            )}
                                        >
                                            <User className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="John"
                                            required
                                            onChange={changeHandler}
                                            className={cn(
                                                "pl-10 py-6 rounded-xl transition-all",
                                                isDarkMode
                                                    ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                                    : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="lastName"
                                        className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                    >
                                        Last Name
                                    </Label>
                                    <div className="relative">
                                        <div
                                            className={cn(
                                                "absolute left-3 top-1/2 -translate-y-1/2",
                                                isDarkMode ? "text-gray-400" : "text-gray-500",
                                            )}
                                        >
                                            <User className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Doe"
                                            required
                                            onChange={changeHandler}
                                            className={cn(
                                                "pl-10 py-6 rounded-xl transition-all",
                                                isDarkMode
                                                    ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                                    : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="username"
                                    className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                >
                                    Username
                                </Label>
                                <div className="relative">
                                    <div
                                        className={cn(
                                            "absolute left-3 top-1/2 -translate-y-1/2",
                                            isDarkMode ? "text-gray-400" : "text-gray-500",
                                        )}
                                    >
                                        <UserCircle className="h-5 w-5" />
                                    </div>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="johndoe"
                                        required
                                        onChange={changeHandler}
                                        className={cn(
                                            "pl-10 py-6 rounded-xl transition-all",
                                            isDarkMode
                                                ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                                : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                >
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <div
                                        className={cn(
                                            "absolute left-3 top-1/2 -translate-y-1/2",
                                            isDarkMode ? "text-gray-400" : "text-gray-500",
                                        )}
                                    >
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        onChange={changeHandler}
                                        className={cn(
                                            "pl-10 py-6 rounded-xl transition-all",
                                            isDarkMode
                                                ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                                : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                        )}
                                    />
                                </div>
                            </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                    >
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <div
                                            className={cn(
                                                "absolute left-3 top-1/2 -translate-y-1/2",
                                                isDarkMode ? "text-gray-400" : "text-gray-500",
                                            )}
                                        >
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            onChange={changeHandler}
                                            className={cn(
                                                "pl-10 py-6 rounded-xl transition-all",
                                                isDarkMode
                                                    ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                                    : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="confirmPassword"
                                        className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                    >
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <div
                                            className={cn(
                                                "absolute left-3 top-1/2 -translate-y-1/2",
                                                isDarkMode ? "text-gray-400" : "text-gray-500",
                                            )}
                                        >
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            onChange={changeHandler}
                                            className={cn(
                                                "pl-10 py-6 rounded-xl transition-all",
                                                isDarkMode
                                                    ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                                    : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                                    I am a
                                </Label>
                                <RadioGroup
                                    defaultValue="client"
                                    name="role"
                                    onValueChange={(value) => setData((prev) => ({ ...prev, role: value }))}
                                    className="flex flex-col sm:flex-row gap-3"
                                >
                                    <div
                                        className={cn(
                                            "flex items-center justify-between rounded-xl p-4 cursor-pointer transition-all",
                                            isDarkMode
                                                ? "bg-gray-800/50 border border-gray-700 hover:border-indigo-500"
                                                : "bg-gray-50 border border-gray-200 hover:border-green-500",
                                            data.role === "client" &&
                                            (isDarkMode ? "border-indigo-500 bg-indigo-500/10" : "border-green-500 bg-green-50"),
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem
                                                value="client"
                                                id="client"
                                                className={cn(data.role === "client" && (isDarkMode ? "text-indigo-500" : "text-green-500"))}
                                            />
                                            <Label
                                                htmlFor="client"
                                                className={cn(
                                                    "text-base cursor-pointer",
                                                    isDarkMode ? "text-gray-300" : "text-gray-700",
                                                    data.role === "client" && (isDarkMode ? "text-indigo-400" : "text-green-600"),
                                                )}
                                            >
                                                Client
                                            </Label>
                                        </div>
                                        <UserCheck
                                            className={cn(
                                                "h-5 w-5",
                                                isDarkMode ? "text-gray-400" : "text-gray-500",
                                                data.role === "client" && (isDarkMode ? "text-indigo-400" : "text-green-500"),
                                            )}
                                        />
                                    </div>
                                    <div
                                        className={cn(
                                            "flex items-center justify-between rounded-xl p-4 cursor-pointer transition-all",
                                            isDarkMode
                                                ? "bg-gray-800/50 border border-gray-700 hover:border-indigo-500"
                                                : "bg-gray-50 border border-gray-200 hover:border-green-500",
                                            data.role === "freelancer" &&
                                            (isDarkMode ? "border-indigo-500 bg-indigo-500/10" : "border-green-500 bg-green-50"),
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem
                                                value="freelancer"
                                                id="freelancer"
                                                className={cn(
                                                    data.role === "freelancer" && (isDarkMode ? "text-indigo-500" : "text-green-500"),
                                                )}
                                            />
                                            <Label
                                                htmlFor="freelancer"
                                                className={cn(
                                                    "text-base cursor-pointer",
                                                    isDarkMode ? "text-gray-300" : "text-gray-700",
                                                    data.role === "freelancer" && (isDarkMode ? "text-indigo-400" : "text-green-600"),
                                                )}
                                            >
                                                Freelancer
                                            </Label>
                                        </div>
                                        <UserCheck
                                            className={cn(
                                                "h-5 w-5",
                                                isDarkMode ? "text-gray-400" : "text-gray-500",
                                                data.role === "freelancer" && (isDarkMode ? "text-indigo-400" : "text-green-500"),
                                            )}
                                        />
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button
                                type="submit"
                                className={cn(
                                    "w-full py-6 rounded-xl text-white font-medium text-base transition-all relative overflow-hidden group",
                                    isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700",
                                )}
                                disabled={isLoading}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>Creating account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </span>
                                <span
                                    className={cn(
                                        "absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left",
                                        isDarkMode ? "bg-indigo-700" : "bg-green-700",
                                    )}
                                />
                            </Button>
                        </form>

                        <p className={cn("text-center mt-8", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className={cn(
                                    "font-medium hover:underline",
                                    isDarkMode ? "text-indigo-400 hover:text-indigo-300" : "text-green-600 hover:text-green-700",
                                )}
                            >
                                Sign In
                            </Link>
                        </p>
                    </motion.div>
                </div>

                {/* Right side - Illustration */}
                <div className="w-full lg:w-5/12 p-6 lg:p-0 hidden md:flex items-center justify-center order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative w-full max-w-md aspect-square"
                    >
                        <div
                            className={cn(
                                "absolute inset-0 rounded-3xl overflow-hidden",
                                isDarkMode ? "bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm" : "",
                            )}
                        >
                            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                            <div
                                className={cn(
                                    "absolute inset-0 flex items-center justify-center",
                                    isDarkMode ? "bg-gradient-to-br from-indigo-600/10 to-purple-600/10" : "",
                                )}
                            >
                                <img
                                    src="https://img.freepik.com/free-photo/man-with-futuristic-device-medium-shot_23-2148864986.jpg?t=st=1743865615~exp=1743869215~hmac=e5e1157525e4ebfa86ef3adc37762cb47a34fb4bd6b1643c007074dde31b168d&w=826"
                                    alt="Signup Illustration"
                                    width={800}
                                    height={800}
                                    className="object-cover w-full h-full opacity-90"

                                />
                            </div>
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className={cn(
                                "absolute bottom-8 left-8 right-8 p-6 rounded-2xl backdrop-blur-md",
                                isDarkMode
                                    ? "bg-gray-900/60 border border-gray-800/50"
                                    : "bg-white/80 border border-gray-100 shadow-xl",
                            )}
                        >
                            <h3 className={cn("text-xl font-bold mb-2", isDarkMode ? "text-white" : "text-gray-900")}>
                                Join Our Community
                            </h3>
                            <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                                Create an account to access exclusive features and connect with our growing network of professionals.
                            </p>
                        </motion.div>

                        {/* Decorative elements */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 5,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 opacity-70 blur-xl"
                        />
                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                                rotate: [0, -5, 0],
                            }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 7,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-70 blur-xl"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default SignUp
