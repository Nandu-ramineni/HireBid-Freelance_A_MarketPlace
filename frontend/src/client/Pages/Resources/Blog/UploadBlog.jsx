
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ImageIcon, Send } from "lucide-react"

export function UploadBlog() {
    return (
        <section className="py-20 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Share Your Expertise</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Join our community of thought leaders and share your insights with thousands of freelancers worldwide. Your
                        knowledge could be the key to someone's success.
                    </p>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="text-center pb-8 bg-gradient-to-r from-emerald-50 to-teal-50">
                            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                                <Upload className="w-10 h-10 text-white" />
                            </div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Submit Your Article
                            </CardTitle>
                            <CardDescription className="text-lg text-slate-600 mt-2">
                                Share your knowledge and help fellow freelancers succeed
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-8 space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center">
                                        <FileText className="w-4 h-4 mr-2 text-emerald-600" />
                                        Article Title
                                    </label>
                                    <Input
                                        placeholder="Enter your compelling article title"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 group-hover:border-emerald-300"
                                    />
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-slate-700">Category</label>
                                    <Input
                                        placeholder="e.g., Career Growth, Business Tips"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 group-hover:border-emerald-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 group">
                                <label className="text-sm font-semibold text-slate-700">Article Summary</label>
                                <Textarea
                                    placeholder="Write a compelling summary that captures the essence of your article (150-200 words)"
                                    className="min-h-[120px] resize-none border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 group-hover:border-emerald-300"
                                />
                            </div>

                            <div className="space-y-3 group">
                                <label className="text-sm font-semibold text-slate-700">Full Article Content</label>
                                <Textarea
                                    placeholder="Share your expertise, insights, and actionable advice here..."
                                    className="min-h-[250px] resize-none border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 group-hover:border-emerald-300"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-slate-700">Author Name</label>
                                    <Input
                                        placeholder="Your full name"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 group-hover:border-emerald-300"
                                    />
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-slate-700">Author Bio</label>
                                    <Input
                                        placeholder="Brief professional bio (optional)"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 group-hover:border-emerald-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700 flex items-center">
                                    <ImageIcon className="w-4 h-4 mr-2 text-emerald-600" />
                                    Featured Image (Optional)
                                </label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors duration-300 group cursor-pointer">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors duration-300">
                                        <ImageIcon className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <p className="text-slate-600 mb-2">Drop your image here or click to browse</p>
                                    <p className="text-sm text-slate-500">PNG, JPG up to 5MB</p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Submit Article for Review
                                </Button>
                            </div>

                            <div className="text-center text-sm text-slate-500 pt-4">
                                <p>Your article will be reviewed by our editorial team within 24-48 hours.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
