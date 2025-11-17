
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Eye, Heart, MessageCircle, Filter } from "lucide-react"
import { useState } from "react"

export function BlogGrid() {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const blogPosts = [
        {
            id: 2,
            title: "Building Your Personal Brand as a Freelancer",
            excerpt:
                "Learn essential strategies to establish and grow your personal brand in the competitive freelance market.",
            author: "Marcus Rodriguez",
            authorImage: "https://img.freepik.com/free-photo/left-sideways-american-black-person_23-2148749585.jpg?semt=ais_hybrid&w=740",
            date: "Dec 12, 2024",
            readTime: "6 min read",
            views: "1.8k",
            likes: 89,
            comments: 15,
            category: "Career Growth",
            image: "https://images.unsplash.com/photo-1484981138541-3d074aa97716?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 3,
            title: "Pricing Strategies That Actually Work",
            excerpt: "Discover proven pricing models and negotiation tactics that help freelancers maximize their earnings.",
            author: "Emily Watson",
            authorImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            date: "Dec 10, 2024",
            readTime: "10 min read",
            views: "3.1k",
            likes: 234,
            comments: 41,
            category: "Business Tips",
            image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 4,
            title: "Client Communication Best Practices",
            excerpt:
                "Master the art of professional communication to build stronger client relationships and secure repeat business.",
            author: "David Kim",
            authorImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
            date: "Dec 8, 2024",
            readTime: "7 min read",
            views: "1.5k",
            likes: 67,
            comments: 12,
            category: "Client Relations",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 5,
            title: "Remote Work Tools for Maximum Productivity",
            excerpt: "Essential tools and techniques to boost your productivity while working remotely as a freelancer.",
            author: "Lisa Park",
            authorImage: "/placeholder.svg?height=40&width=40",
            date: "Dec 6, 2024",
            readTime: "5 min read",
            views: "2.2k",
            likes: 145,
            comments: 28,
            category: "Productivity",
            image: "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?q=80&w=1132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 6,
            title: "Tax Tips for Freelancers in 2024",
            excerpt: "Navigate the complex world of freelance taxes with these expert tips and strategies for the new year.",
            author: "Robert Chen",
            authorImage: "/placeholder.svg?height=40&width=40",
            date: "Dec 4, 2024",
            readTime: "12 min read",
            views: "1.9k",
            likes: 98,
            comments: 19,
            category: "Finance",
            image: "https://images.unsplash.com/photo-1523540939399-141cbff6a8d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 7,
            title: "The Art of Portfolio Presentation",
            excerpt: "Create a stunning portfolio that showcases your skills and attracts high-paying clients.",
            author: "Anna Thompson",
            authorImage: "/placeholder.svg?height=40&width=40",
            date: "Dec 2, 2024",
            readTime: "8 min read",
            views: "2.7k",
            likes: 187,
            comments: 34,
            category: "Portfolio",
            image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ]

    const categories = [
        "All",
        "Career Growth",
        "Business Tips",
        "Client Relations",
        "Productivity",
        "Finance",
        "Portfolio",
    ]

    const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory)

    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
                    <div className="animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Latest Articles</h2>
                        <p className="text-xl text-slate-600 max-w-2xl">
                            Stay updated with the latest trends, insights, and expert advice from the freelance world
                        </p>
                    </div>

                    <div
                        className="flex items-center space-x-4 mt-8 lg:mt-0 animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                        <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50">
                            View All Articles
                        </Button>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    {categories.map((category, index) => (
                        <Badge
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            variant={index === 0 ? "default" : "secondary"}
                            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${index === 0
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {category}
                        </Badge>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                            <Card className="group h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white transform hover:scale-[1.02]">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className="bg-white/90 text-slate-700 backdrop-blur-sm">
                                            {post.category}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <Heart className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-xl h-14 font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} className="object-cover" />
                                                <AvatarFallback className="text-xs bg-emerald-100 text-emerald-700">
                                                    {post.author
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{post.author}</p>
                                                <p className="text-xs text-slate-500">{post.date}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{post.readTime}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{post.views}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
                                                <Heart className="w-4 h-4" />
                                                <span>{post.likes}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 hover:text-emerald-500 transition-colors cursor-pointer">
                                                <MessageCircle className="w-4 h-4" />
                                                <span>{post.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                    <Button size="lg" variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 px-8 py-3 text-lg">
                        Load More Articles
                    </Button>
                </div>
            </div>
        </section>
    )
}
