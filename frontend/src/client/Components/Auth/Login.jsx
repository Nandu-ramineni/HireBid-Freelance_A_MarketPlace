import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
// import google from '../../../assets/google.svg';
// import facebook from '../../../assets/facebook.svg';
import microsoft from '../../../assets/microsoft.svg';
import { authenticateLogin, GoogleAuthentication } from '@/client/Services/api';
import Cookies from 'js-cookie';
import { AlertCircle, ChevronRight, Loader2, Lock, Mail } from 'lucide-react';
import { auth, provider, signInWithPopup } from '../../../firebase';
// import LoginImage from '@/assets/Images/LoginImage.jpg';
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Mail01Icon } from 'hugeicons-react';
const LoginInitialValues = {
    email: "",
    password: "",
};

const Login = () => {
    const [data, setData] = useState(LoginInitialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [googleError, setGoogleError] = useState(null);
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (e.target.name === "email") setEmailError(null);
        if (e.target.name === "password") setPasswordError(null);

    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setEmailError(null);
        setPasswordError(null);
        setError(null);
        try {
            const response = await authenticateLogin(data);
            if (response.status === 200) {
                Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
                Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });
                navigate('/');
            } else {
                if (response.data.message === "Invalid email") {
                    setEmailError("Invalid Email");
                } else if (response.data.message === "Invalid password") {
                    setPasswordError("Invalid Password");
                } else if (response.data.message === "Google Login failed") {
                    setGoogleError("Google Login failed");
                } else {
                    setError(response.data.message);
                }
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            const res = await GoogleAuthentication(token);
            Cookies.set('accessToken', res.data.accessToken, { expires: 7 });
            Cookies.set('refreshToken', res.data.refreshToken, { expires: 7 });
            navigate('/dashboard');
        } catch (err) {
            setEmailError('Google Login failed');
            console.error(err);
        }
    };

    return (
        <div
            className={cn(
                " w-full flex items-center justify-center overflow-hidden transition-colors duration-300 h-auto md:h-[calc(100vh-5rem)]",
                isDarkMode ? "bg-[#0F172A]" : "bg-[#F8FAFC]",
            )}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={cn(
                        "absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-30 blur-3xl",
                        isDarkMode ? "bg-purple-700" : "bg-blue-300",
                    )}
                />
                <div
                    className={cn(
                        "absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-30 blur-3xl",
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
                className="w-full max-w-7xl flex flex-col lg:flex-row mx-1"
            >
                {/* Left side - Branding */}
                <div className="w-full lg:w-5/12 p-2 lg:p-12 flex flex-col justify-center relative order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className={cn(
                            "relative z-10 p-8 rounded-3xl",
                            isDarkMode
                                ? "bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800"
                                : "bg-white/80 backdrop-blur-kg shadow-2xl border border-gray-100",
                        )}
                    >
                        <div className="mb-4 md:mb-8">
                            <h1 className={cn("text-2xl md:text-4xl font-bold tracking-tight pb-0 md:pb-2", isDarkMode ? "text-white" : "text-gray-900")}>
                                Welcome back
                            </h1>
                            <p className={cn("text-sm md:text-lg", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                                Sign in to continue your journey
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

                        <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
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
                                        <Mail01Icon className="h-5 w-5" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        onChange={changeHandler}
                                        className={cn(
                                            "pl-10 py-6 rounded-xl transition-all",
                                            isDarkMode
                                                ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                                : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                            emailError &&
                                            (isDarkMode
                                                ? "border-red-900 focus-visible:ring-red-500"
                                                : "border-red-300 focus-visible:ring-red-500"),
                                        )}
                                    />
                                </div>
                                {emailError && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="flex items-center gap-2 text-red-500 text-sm mt-1 pl-1"
                                    >
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{emailError}</span>
                                    </motion.div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                    >
                                        Password
                                    </Label>
                                    <Link
                                        to="/forgot-password"
                                        className={cn(
                                            "text-sm font-medium hover:underline",
                                            isDarkMode ? "text-indigo-400 hover:text-indigo-300" : "text-green-600 hover:text-green-700",
                                        )}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
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
                                            passwordError &&
                                            (isDarkMode
                                                ? "border-red-900 focus-visible:ring-red-500"
                                                : "border-red-300 focus-visible:ring-red-500"),
                                        )}
                                    />
                                </div>
                                {passwordError && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="flex items-center gap-2 text-red-500 text-sm mt-1 pl-1"
                                    >
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{passwordError}</span>
                                    </motion.div>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="remember-me"
                                        checked={rememberMe}
                                        onCheckedChange={setRememberMe}
                                        className={rememberMe ? (isDarkMode ? "bg-indigo-600" : "bg-green-600") : ""}
                                    />
                                    <Label
                                        htmlFor="remember-me"
                                        className={cn("text-sm cursor-pointer", isDarkMode ? "text-gray-300" : "text-gray-700")}
                                    >
                                        Remember me
                                    </Label>
                                </div>
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
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
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

                        {googleError && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className={cn("flex items-center gap-2 text-sm mt-4", isDarkMode ? "text-red-400" : "text-red-500")}
                            >
                                <AlertCircle className="h-4 w-4" />
                                <span>{googleError}</span>
                            </motion.div>
                        )}

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className={isDarkMode ? "bg-gray-700" : ""} />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className={cn("px-2", isDarkMode ? "bg-gray-900 text-gray-500" : "bg-white text-gray-500")}>
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mt-6">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                    onClick={handleGoogleLogin}
                                    className={cn(
                                        "flex items-center justify-center p-2 rounded-xl transition-all",
                                        isDarkMode
                                            ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                                            : "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm",
                                    )}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                        <path d="M1 1h22v22H1z" fill="none" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                    className={cn(
                                        "flex items-center justify-center p-2 rounded-xl transition-all",
                                        isDarkMode
                                            ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                                            : "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm",
                                    )}
                                >
                                    <img src={microsoft} alt="microsoft" className='h-6 w-6' />
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                    className={cn(
                                        "flex items-center justify-center p-2 rounded-xl transition-all",
                                        isDarkMode
                                            ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                                            : "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm",
                                    )}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                            fill="#1877F2"
                                        />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>

                        <p className={cn("text-center mt-8", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                            Don{"'"}t have an account?{" "}
                            <Link
                                to="/signup"
                                className={cn(
                                    "font-medium hover:underline",
                                    isDarkMode ? "text-indigo-400 hover:text-indigo-300" : "text-green-600 hover:text-green-700",
                                )}
                            >
                                Sign Up
                            </Link>
                        </p>
                    </motion.div>
                </div>

                {/* Right side - Illustration */}
                <div className="w-full lg:w-7/12 p-6 lg:p-0 hidden md:flex items-center justify-center order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative w-full max-w-lg aspect-square"
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
                                    src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?t=st=1743863997~exp=1743867597~hmac=f38275931f3be205d57d5ab954a26f4705481524541672a2d9cb8479ed06147e&w=1380"
                                    alt="Login Illustration"
                                    width={600}
                                    height={600}
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
                                Seamless Experience
                            </h3>
                            <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                                Access your account to continue your journey with our premium services and exclusive features.
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
    );
};

export default Login;
