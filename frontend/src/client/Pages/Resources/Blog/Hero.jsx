import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Sparkles, ArrowRight, Play } from "lucide-react"

export function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Background Visuals */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-float" />
                <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-emerald-400/15 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float-slow" />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 animate-float-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}

                {/* Grid Pattern */}
                <div
  className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat animate-pulse"
/>



                {/* Mouse Follower */}
                <div
                    className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <Badge className="mb-8 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 border-emerald-200/50 px-6 py-2 text-sm font-medium shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        Latest Insights & Trends
                        <TrendingUp className="w-4 h-4 ml-2" />
                    </Badge>
                </div>

                {/* Main Heading */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 leading-tight">
                        The Future of
                        <span className="block relative">
                            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
                                Freelancing
                            </span>
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 blur-2xl animate-pulse" />
                        </span>
                        <span className="block text-slate-700">Starts Here</span>
                    </h1>
                </div>

                {/* Subtitle */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                        Discover expert insights, industry trends, and actionable strategies to elevate your freelance career.
                        <span className="text-emerald-600 font-medium"> Join thousands of professionals</span> who trust HireBid for their success.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" style={{ animationDelay: "0.8s" }}>
                    <Button
                        size="lg"
                        className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center">
                            Explore Articles
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="group border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm hover:border-emerald-300 hover:text-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Watch Demo
                    </Button>
                </div>

                {/* Stats Section */}
                <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {[
                        { number: "500K+", label: "Articles Published", delay: "1.2s" },
                        { number: "2M+", label: "Active Readers", delay: "1.4s" },
                        { number: "150+", label: "Expert Contributors", delay: "1.6s" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:bg-white/80 hover:border-emerald-200/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up"
                            style={{ animationDelay: stat.delay }}
                        >
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.number}
                            </div>
                            <div className="text-slate-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mt-2 animate-pulse" />
                </div>
            </div>
            
        </section>
    )
}
