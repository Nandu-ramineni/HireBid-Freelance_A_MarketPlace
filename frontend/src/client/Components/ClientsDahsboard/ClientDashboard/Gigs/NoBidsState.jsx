import { Inbox, Clock, Eye, Edit3, RefreshCw, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


export default function AlternativeNoBidsState({ bidDetails }) {
    if (!bidDetails?.bids || bidDetails?.bids?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
                {/* Main Container */}
                <div className="max-w-lg w-full">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-6">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                <Inbox className="w-10 h-10 text-slate-400" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">0</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Waiting for Bids</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Your job is live and visible to thousands of talented freelancers. The perfect match is just around the
                            corner!
                        </p>
                    </div>

                    {/* Status Cards */}
                    

                    {/* Improvement Suggestions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 text-sm">💡</span>
                            </div>
                            <h3 className="font-semibold text-slate-800">Boost Your Job's Appeal</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-slate-700">Add a detailed project description</span>
                                <Badge variant="secondary" className="ml-auto text-xs">
                                    High Impact
                                </Badge>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-slate-700">Include your budget range</span>
                                <Badge variant="outline" className="ml-auto text-xs">
                                    Medium
                                </Badge>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-sm text-slate-700">Add relevant skill requirements</span>
                                <Badge variant="outline" className="ml-auto text-xs">
                                    Medium
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh Page
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-11 border-slate-300 hover:bg-slate-50 rounded-xl bg-transparent">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Job
                            </Button>

                            <Button variant="outline" className="h-11 border-slate-300 hover:bg-slate-50 rounded-xl bg-transparent">
                                View Job
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-blue-800">
                            <span className="font-medium">Average response time:</span> 6-12 hours
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Most jobs receive their first bid within the first day</p>
                    </div>
                </div>
            </div>
        )
    }

    return null
}
