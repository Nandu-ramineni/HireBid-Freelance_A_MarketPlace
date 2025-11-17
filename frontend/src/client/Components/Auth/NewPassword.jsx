import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '@/client/Services/api';
import { AlertCircle, CheckCircle, Loader2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion"
const NewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false)
    const navigate = useNavigate();
    const { resetToken } = useParams();
    const [passwordStrength, setPasswordStrength] = useState(0)
    useEffect(() => {
        // Check system preference for dark mode
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDarkMode(false)
        }
    }, [])
    useEffect(() => {
        // Simple password strength checker
        if (!newPassword) {
            setPasswordStrength(0)
            return
        }

        let strength = 0

        // Length check
        if (newPassword.length >= 8) strength += 1

        // Contains number
        if (/\d/.test(newPassword)) strength += 1

        // Contains lowercase
        if (/[a-z]/.test(newPassword)) strength += 1

        // Contains uppercase
        if (/[A-Z]/.test(newPassword)) strength += 1

        // Contains special char
        if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1

        setPasswordStrength(strength)
    }, [newPassword])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (passwordStrength < 3) {
            setError("Please use a stronger password")
            return
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await resetPassword(resetToken, { newPassword });
            if (response.status === 200) {
                setSuccessMessage("Password updated successfully!");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(response.data.message || "Failed to reset password.");
            }
        } catch (error) {
            setError("An error occurred while resetting your password.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={cn(
                "h-[calc(100svh-5rem)] w-full flex items-center justify-center overflow-hidden transition-colors duration-300",
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
            <div className="relative z-10 w-full max-w-md mx-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "relative p-8 rounded-3xl",
                        isDarkMode
                            ? "bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800"
                            : "bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-100",
                    )}
                >
                    <div className="mb-8 text-center">
                        <h1 className={cn("text-3xl font-bold tracking-tight mb-2", isDarkMode ? "text-white" : "text-gray-900")}>
                            Set New Password
                        </h1>
                        <p className={cn("text-lg", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                            Create a strong password for your account
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

                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex items-center gap-2 p-4 mb-6 rounded-xl",
                                isDarkMode
                                    ? "bg-green-950/50 text-green-300 border border-green-900/50"
                                    : "bg-green-50 text-green-600 border border-green-100",
                            )}
                        >
                            <CheckCircle className="h-5 w-5 flex-shrink-0" />
                            <span>{successMessage}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="newPassword"
                                className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                            >
                                New Password
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
                                    id="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={cn(
                                        "pl-10 py-6 rounded-xl transition-all",
                                        isDarkMode
                                            ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                            : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                    )}
                                />
                            </div>

                            {/* Password strength indicator */}
                            {newPassword && (
                                <div className="mt-2">
                                    <div className="flex justify-between mb-1">
                                        <span className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                                            Password strength:
                                        </span>
                                        <span
                                            className={cn(
                                                "text-xs font-medium",
                                                passwordStrength === 0
                                                    ? isDarkMode
                                                        ? "text-red-400"
                                                        : "text-red-500"
                                                    : passwordStrength <= 2
                                                        ? isDarkMode
                                                            ? "text-yellow-400"
                                                            : "text-yellow-600"
                                                        : passwordStrength <= 4
                                                            ? isDarkMode
                                                                ? "text-green-400"
                                                                : "text-green-600"
                                                            : isDarkMode
                                                                ? "text-indigo-400"
                                                                : "text-indigo-600",
                                            )}
                                        >
                                            {passwordStrength === 0
                                                ? "Very weak"
                                                : passwordStrength <= 2
                                                    ? "Weak"
                                                    : passwordStrength <= 4
                                                        ? "Good"
                                                        : "Strong"}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                        <div
                                            className={cn(
                                                "h-full transition-all duration-300",
                                                passwordStrength === 0
                                                    ? "w-0"
                                                    : passwordStrength === 1
                                                        ? "w-1/5"
                                                        : passwordStrength === 2
                                                            ? "w-2/5"
                                                            : passwordStrength === 3
                                                                ? "w-3/5"
                                                                : passwordStrength === 4
                                                                    ? "w-4/5"
                                                                    : "w-full",
                                                passwordStrength === 0
                                                    ? ""
                                                    : passwordStrength <= 2
                                                        ? isDarkMode
                                                            ? "bg-yellow-400"
                                                            : "bg-yellow-500"
                                                        : passwordStrength <= 4
                                                            ? isDarkMode
                                                                ? "bg-green-400"
                                                                : "bg-green-500"
                                                            : isDarkMode
                                                                ? "bg-indigo-400"
                                                                : "bg-indigo-600",
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="confirmPassword"
                                className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                            >
                                Confirm New Password
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
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={cn(
                                        "pl-10 py-6 rounded-xl transition-all",
                                        isDarkMode
                                            ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                                            : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                                        confirmPassword && newPassword !== confirmPassword
                                            ? isDarkMode
                                                ? "border-red-700"
                                                : "border-red-300"
                                            : "",
                                    )}
                                />
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className={cn("text-xs mt-1 flex items-center", isDarkMode ? "text-red-400" : "text-red-500")}>
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Passwords don{"'"}t match
                                </p>
                            )}
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
                                        <span>Updating password...</span>
                                    </>
                                ) : (
                                    "Reset Password"
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
                </motion.div>
            </div>
        </div>
    );
};

export default NewPassword;
