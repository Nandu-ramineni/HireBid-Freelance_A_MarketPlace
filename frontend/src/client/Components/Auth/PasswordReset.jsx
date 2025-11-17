

import { useState, useRef, useEffect } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Loader2, AlertCircle, Mail, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { forgotPassword, sendOTP, verifyOTP } from "@/client/Services/api"
import { useNavigate } from "react-router-dom"



export default function PasswordResetPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const navigate = useNavigate()
  const otpRefs = useRef([])

  useEffect(() => {
    if (step === 2) {
      otpRefs.current[0]?.focus()
    }

    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(false)
    }
  }, [step])

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendOTP({ email })
      if (response.status === 200) {
        setStep(2)
      } else {
        setError(response.data.message || "Failed to send OTP. Please try again.")
      }
    } catch (error) {
      setError("An error occurred while sending the OTP. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const otpCode = otp.join("")
      const response = await verifyOTP({ email, otp: otpCode })
      if (response.status === 200) {
        await forgotPassword({ email })
        setStep(3)
      } else {
        setError("Invalid OTP. Please try again.")
      }
    } catch (error) {
      setError("An error occurred while verifying the OTP. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value !== "" && index < 5) {
        otpRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigate("/login")
    }
  }

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
          <Button
            variant="ghost"
            className={cn(
              "mb-6 -ml-2",
              isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100",
            )}
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="mb-8 text-center">
            <h1 className={cn("text-3xl font-bold tracking-tight mb-2", isDarkMode ? "text-white" : "text-gray-900")}>
              Reset Password
            </h1>
            <p className={cn("text-lg", isDarkMode ? "text-gray-400" : "text-gray-600")}>
              {step === 1 && "Enter your email to reset your password"}
              {step === 2 && "Enter the verification code sent to your email"}
              {step === 3 && "Check your email for the reset link"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleEmailSubmit}
                className="space-y-6"
              >
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
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "pl-10 py-6 rounded-xl transition-all",
                        isDarkMode
                          ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                          : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                      )}
                    />
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
                        <span>Sending code...</span>
                      </>
                    ) : (
                      "Send Verification Code"
                    )}
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left",
                      isDarkMode ? "bg-indigo-700" : "bg-green-700",
                    )}
                  />
                </Button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleOtpSubmit}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div
                    className={cn(
                      "p-4 rounded-xl text-sm",
                      isDarkMode
                        ? "bg-gray-800/50 text-gray-300 border border-gray-700"
                        : "bg-gray-50 text-gray-700 border border-gray-200",
                    )}
                  >
                    <p>
                      We{"'"}ve sent a verification code to <span className="font-medium">{email}</span>
                    </p>
                  </div>

                  <Label
                    htmlFor="otp-0"
                    className={cn("text-sm font-medium block mb-3", isDarkMode ? "text-gray-300" : "text-gray-700")}
                  >
                    Enter verification code
                  </Label>

                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="\d{1}"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        ref={(el) => (otpRefs.current[index] = el)}
                        required
                        className={cn(
                          "w-12 h-14 text-center text-lg rounded-xl transition-all",
                          isDarkMode
                            ? "bg-gray-800/50 border-gray-700 text-white focus-visible:ring-indigo-500"
                            : "bg-gray-50 border-gray-200 focus-visible:ring-green-500",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full py-6 rounded-xl text-white font-medium text-base transition-all relative overflow-hidden group",
                    isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700",
                  )}
                  disabled={isLoading || otp.some((digit) => digit === "")}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left",
                      isDarkMode ? "bg-indigo-700" : "bg-green-700",
                    )}
                  />
                </Button>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center",
                      isDarkMode ? "bg-indigo-500/20" : "bg-green-100",
                    )}
                  >
                    <CheckCircle className={cn("h-8 w-8", isDarkMode ? "text-indigo-400" : "text-green-600")} />
                  </div>
                  <p className={cn("text-lg font-medium", isDarkMode ? "text-gray-200" : "text-gray-800")}>
                    Password reset link has been sent to your email
                  </p>
                  <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                    Please check your inbox and follow the instructions to reset your password
                  </p>
                </div>

                <Button
                  onClick={() => navigate("/login")}
                  className={cn(
                    "w-full py-6 rounded-xl text-white font-medium text-base transition-all relative overflow-hidden group",
                    isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700",
                  )}
                >
                  <span className="relative z-10">Back to Login</span>
                  <span
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left",
                      isDarkMode ? "bg-indigo-700" : "bg-green-700",
                    )}
                  />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

