import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield, User, Lock, Sun, Moon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { adminLogin } from "@/Redux/Actions/authAction"
import { Navigate, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { DataContext } from "@/context/DataProvider"
import Logo from "@/assets/Logo.png"
export default function AdminSignIn() {
    const dispatch = useDispatch();
    const { admin, loading, error } = useSelector((state) => state.auth)
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [fieldErrors, setFieldErrors] = useState({
        email: "",
        password: "",
    });

    const [isDarkTheme, setIsDarkTheme] = useState(false)

    // useEffect(() => {
    //     const token = Cookies.get("accessToken");
    //     if (token) {
    //         setAccount(token)
    //         navigate('/')
    //     }
    // }, [navigate,setAccount])
    useEffect(() => {
        if (admin) {
            setAccount(admin)
            navigate('/')
        }
    }, [admin, navigate, setAccount])
    useEffect(() => {
        if (error) {
            if (error.toLowerCase().includes("email")) {
                setFieldErrors({ email: error, password: "" });
            } else if (error.toLowerCase().includes("password")) {
                setFieldErrors({ email: "", password: error });
            } else {
                setFieldErrors({ email: "", password: "" });
            }
        }
    }, [error]);

    const token = Cookies.get("accessToken");
    if (token) {
        return <Navigate to="/" replace />;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(adminLogin(formData));
        } catch (error) {
            console.log(error);
        }

    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${isDarkTheme
                ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
                : "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100"
                }`}
        >
            {/* Background Pattern */}
            <div
                className={`absolute inset-0 opacity-20 ${isDarkTheme
                    ? "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
                    : "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366F1%22%20fillOpacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
                    }`}
            ></div>

            {/* Theme Toggle */}
            <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isDarkTheme
                    ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-xl border border-white/20"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
            >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative w-full max-w-lg">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center ">
                        {/* <Shield className="w-8 h-8 text-white" /> */}
                        <img src={Logo} alt="HirdeBid Logo" className="w-8 h-8" />
                    </div>
                    <h1 className={`text-3xl font-bold mb-2 ${isDarkTheme ? "text-white" : "text-gray-900"}`}>HirdeBid</h1>
                    <p className={`text-sm font-medium ${isDarkTheme ? "text-purple-200" : "text-gray-600"}`}>
                        Admin Panel Access
                    </p>
                </div>

                {/* Main Card */}
                <Card
                    className={`shadow-2xl transition-all duration-300 ${isDarkTheme
                        ? "backdrop-blur-xl bg-white/10 border-white/20"
                        : "bg-white/80 backdrop-blur-xl border-gray-200/50"
                        }`}
                >
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className={`text-2xl font-bold text-center ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
                            Welcome Back
                        </CardTitle>
                        <CardDescription className={`text-center ${isDarkTheme ? "text-purple-200" : "text-gray-600"}`}>
                            Sign in to access the admin dashboard
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email/Username Input */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className={`font-medium ${isDarkTheme ? "text-white" : "text-gray-700"}`}
                                >
                                    Email or Username
                                </Label>
                                <div className="relative">
                                    <User
                                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkTheme ? "text-purple-300" : "text-gray-400"
                                            }`}
                                    />
                                    <Input
                                        id="emailOrUsername"
                                        type="text"
                                        placeholder="Enter your email or username"
                                        value={formData.email}
                                        onChange={(e) => {
                                            handleInputChange("email", e.target.value);
                                            setFieldErrors((prev) => ({ ...prev, email: "" }));
                                        }}
                                        className={`pl-10 h-12 transition-all duration-200 ${isDarkTheme
                                            ? `bg-white/10 border-white/20 text-white placeholder:text-purple-300 ${fieldErrors.email ? "border-red-500 focus:border-red-500 ring-red-500/30" : ""
                                            }`
                                            : `bg-white/50 border ${fieldErrors.email ? "border-red-500 focus:border-red-500 ring-red-500/30" : "border-gray-300"
                                            } text-gray-900 placeholder:text-gray-500`
                                            }`}
                                        required
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className={`font-medium ${isDarkTheme ? "text-white" : "text-gray-700"}`}>
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock
                                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkTheme ? "text-purple-300" : "text-gray-400"
                                            }`}
                                    />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => {
                                            handleInputChange("password", e.target.value);
                                            setFieldErrors((prev) => ({ ...prev, password: "" }));
                                        }}
                                        className={`pl-10 pr-10 h-12 transition-all duration-200 ${isDarkTheme
                                                ? `bg-white/10 border-white/20 text-white placeholder:text-purple-300 ${fieldErrors.password ? "border-red-500 focus:border-red-500 ring-red-500/30" : ""
                                                }`
                                                : `bg-white/50 border ${fieldErrors.password ? "border-red-500 focus:border-red-500 ring-red-500/30" : "border-gray-300"
                                                } text-gray-900 placeholder:text-gray-500`
                                            }`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${isDarkTheme ? "text-purple-300 hover:text-white" : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {fieldErrors.password && (
                                    <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label
                                    className={`flex items-center space-x-2 cursor-pointer ${isDarkTheme ? "text-purple-200" : "text-gray-600"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className={`rounded focus:ring-purple-400/20 ${isDarkTheme
                                            ? "border-white/20 bg-white/10 text-purple-600"
                                            : "border-gray-300 bg-white text-purple-600"
                                            }`}
                                    />
                                    <span>Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className={`font-medium transition-colors ${isDarkTheme ? "text-purple-300 hover:text-white" : "text-purple-600 hover:text-purple-800"
                                        }`}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            {/* {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )} */}
                            {/* Sign In Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Sign In to Dashboard"
                                )}
                            </Button>
                        </form>

                        {/* Security Notice */}
                        <div
                            className={`mt-6 p-4 rounded-lg border transition-all duration-200 ${isDarkTheme ? "bg-white/5 border-white/10" : "bg-gray-50/50 border-gray-200/50"
                                }`}
                        >
                            <div
                                className={`flex items-center space-x-2 text-xs ${isDarkTheme ? "text-purple-200" : "text-gray-600"}`}
                            >
                                <Shield className="w-4 h-4" />
                                <span>Secure admin access protected by enterprise-grade encryption</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div
                    className={`text-center mt-8 text-sm transition-all duration-200 ${isDarkTheme ? "text-purple-300" : "text-gray-600"
                        }`}
                >
                    <p>© 2024 HirdeBid. All rights reserved.</p>
                    <p className="mt-1">Need help? Contact system administrator</p>
                </div>
            </div>
        </div>
    )
}
