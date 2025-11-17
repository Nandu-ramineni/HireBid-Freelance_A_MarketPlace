

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send, CheckCircle } from "lucide-react"

export function NewsletterCTA() {
    return (
        <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in-up">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <Mail className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Ahead of the Curve</h2>
                    <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Get weekly insights, industry trends, and exclusive tips delivered straight to your inbox. Join the
                        community that's shaping the future of freelancing.
                    </p>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="bg-white/20 backdrop-blur-sm border-white/30 h-14 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50 transition-all duration-300"
                        />
                        <Button
                            size="lg"
                            className="bg-white text-emerald-600 hover:bg-slate-100 h-14 px-8 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Subscribe
                        </Button>
                    </div>

                    <div className="flex items-center justify-center space-x-6 text-emerald-100">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">50,000+ subscribers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">Weekly insights</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">Unsubscribe anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
