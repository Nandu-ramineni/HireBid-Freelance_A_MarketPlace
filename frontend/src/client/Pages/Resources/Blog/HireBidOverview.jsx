import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Star, Briefcase, TrendingUp, Shield, Zap, Globe, Award } from "lucide-react"
import hirebid from "@/assets/hirebid.png"
export function HireBidOverview() {
    const features = [
        {
            icon: Users,
            title: "Global Network",
            description: "Connect with clients from 150+ countries",
            color: "from-emerald-500 to-teal-600",
        },
        {
            icon: Star,
            title: "Quality Assurance",
            description: "Verified profiles and skill assessments",
            color: "from-teal-500 to-cyan-600",
        },
        {
            icon: Shield,
            title: "Secure Payments",
            description: "Protected transactions and escrow services",
            color: "from-cyan-500 to-emerald-600",
        },
        {
            icon: Zap,
            title: "Fast Matching",
            description: "AI-powered project matching system",
            color: "from-emerald-600 to-teal-500",
        },
    ]

    const stats = [
        { icon: Briefcase, number: "500K+", label: "Projects Completed", delay: "0.2s" },
        { icon: Users, number: "2M+", label: "Active Users", delay: "0.4s" },
        { icon: Globe, number: "150+", label: "Countries", delay: "0.6s" },
        { icon: Award, number: "4.9/5", label: "Average Rating", delay: "0.8s" },
    ]

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background SVG Grid */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Why Choose
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> HireBid</span>?
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        The premier platform connecting top freelancers with innovative companies worldwide.
                        Experience the future of work today.
                    </p>
                </div>

                {/* Two Column Grid */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
                    {/* Features List */}
                    <div className="animate-fade-in-up">
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                            Empowering Freelancers
                            <span className="block text-emerald-600">Globally</span>
                        </h3>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            HireBid revolutionizes the freelance marketplace by providing cutting-edge tools,
                            transparent pricing, and unmatched support for both freelancers and clients.
                            Our platform ensures fair compensation, secure payments, and meaningful connections.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 group animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                                            {feature.title}
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl px-8 py-3"
                        >
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Start Your Journey
                        </Button>
                    </div>

                    {/* Image Section */}
                    <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl transform rotate-3 animate-float"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/15 to-cyan-500/15 rounded-3xl transform -rotate-2 animate-float-delayed"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                            <img
                                src={hirebid}
                                alt="HireBid Platform Dashboard"
                                width={600}
                                height={500}
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-slate-50/50 animate-fade-in-up"
                            style={{ animationDelay: stat.delay }}
                        >
                            <CardContent className="pt-8 pb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                                    {stat.number}
                                </h3>
                                <p className="text-slate-600 font-medium">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
