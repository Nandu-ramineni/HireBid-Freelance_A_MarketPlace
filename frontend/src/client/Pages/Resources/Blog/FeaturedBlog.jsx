

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Eye, Heart, MessageCircle, Star } from "lucide-react"


export function FeaturedBlog() {
    const featuredPost = {
        id: 1,
        title: "The Future of Freelancing: AI and Remote Work Trends",
        excerpt:
            "Explore how artificial intelligence is reshaping the freelance landscape and what it means for remote workers worldwide. This comprehensive guide covers emerging technologies, market predictions, and actionable strategies for staying ahead in the evolving gig economy.",
        author: "Sarah Chen",
        authorImage: "https://images.pexels.com/photos/4040906/pexels-photo-4040906.jpeg?cs=srgb&dl=pexels-cottonbro-4040906.jpg&fm=jpg",
        date: "Dec 15, 2024",
        readTime: "8 min read",
        views: "2.4k",
        likes: 156,
        comments: 23,
        category: "Industry Insights",
        image: "https://images.unsplash.com/photo-1568792358202-0b9a9071b357?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }

    return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
                <div className="animate-fade-in-up">
                    <Badge className="mb-4 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200">
                        <Star className="w-4 h-4 mr-1" />
                        Editor's Pick
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Featured Article</h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Don't miss our carefully curated content that's making waves in the freelance community
                    </p>
                </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <Card className="group overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative h-80 lg:h-full overflow-hidden">
                            <img
                                src={featuredPost.image || "/placeholder.svg"}
                                alt={featuredPost.title}
                                fill
                                className="object-cover h-full group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute top-6 left-6">
                                <Badge className="bg-emerald-500 text-white shadow-lg animate-pulse">Featured</Badge>
                            </div>
                            <div className="absolute bottom-6 right-6">
                                <div className="flex items-center space-x-4 text-white/90">
                                    <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm font-medium">{featuredPost.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <Heart className="w-4 h-4" />
                                        <span className="text-sm font-medium">{featuredPost.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <Badge
                                variant="secondary"
                                className="w-fit mb-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                            >
                                {featuredPost.category}
                            </Badge>

                            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                                {featuredPost.title}
                            </h3>

                            <p className="text-slate-600 mb-8 text-lg leading-relaxed">{featuredPost.excerpt}</p>

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="w-12 h-12 ring-2 ring-emerald-100">
                                        <AvatarImage src={featuredPost.authorImage || "/placeholder.svg"} alt={featuredPost.author} className="object-cover" />
                                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                                            {featuredPost.author
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-slate-900">{featuredPost.author}</p>
                                        <p className="text-sm text-slate-500">{featuredPost.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-slate-500">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{featuredPost.readTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{featuredPost.comments}</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-fit bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-3 text-lg">
                                Read Full Article
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
