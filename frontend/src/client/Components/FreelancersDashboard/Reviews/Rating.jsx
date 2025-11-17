import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Send } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import { postReview } from "@/client/Services/api"



const Rating = ({ bidId, clientId, clientName, jobTitle,jobId}) => {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [review, setReview] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleStarClick = (starValue) => {
        setRating(starValue)
    }

    const handleStarHover = (starValue) => {
        setHoveredRating(starValue)
    }

    const handleStarLeave = () => {
        setHoveredRating(0)
    }

    const handleSubmitRating = async () => {
        if (rating === 0) {
            toast.warning("Please select a star rating before submitting.")
            return
        }

        if (review.trim().length < 10) {
            toast.warning("Please provide a review with at least 10 characters.")
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call - replace with your actual API endpoint
            const ratingData = {
                reviewee: clientId,
                rating,
                comment: review.trim(),
                job: jobId,
                type: "freelancer-to-client" // Assuming this is a freelancer to client
            }

            const response = await postReview(ratingData)
            toast.success("Rating submitted successfully!")
            setHasSubmitted(true)
            
        } catch (error) {
            toast.error(error.response?.data.message || "Error submitting rating. Please try again.")
            console.error("Error submitting rating:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const getRatingText = (stars) => {
        switch (stars) {
            case 1:
                return "Poor"
            case 2:
                return "Fair"
            case 3:
                return "Good"
            case 4:
                return "Very Good"
            case 5:
                return "Excellent"
            default:
                return "Rate this freelancer"
        }
    }

    if (hasSubmitted) {
        return (
            <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                        <div className="flex justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                            ))}
                        </div>
                        <p className="text-sm font-medium text-green-700">Rating submitted successfully!</p>
                        <p className="text-xs text-green-600">Thank you for your feedback on {clientName}</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <ToastContainer />
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">Rate Your Experience</CardTitle>
                <p className="text-sm text-muted-foreground">How was working with <span className="font-semibold">{clientName}</span>?</p>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Star Rating */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Rating</Label>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => handleStarHover(star)}
                                onMouseLeave={handleStarLeave}
                            >
                                <Star
                                    className={`h-6 w-6 transition-colors cursor-pointer ${star <= (hoveredRating || rating)
                                            ? "fill-yellow-400 text-yellow-400 hover:fill-yellow-500 hover:text-yellow-500"
                                            : "text-gray-300 hover:text-yellow-300"
                                        }`}
                                />
                            </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">{getRatingText(hoveredRating || rating)}</span>
                    </div>
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                    <Label htmlFor="review" className="text-sm font-medium">
                        Review (Optional)
                    </Label>
                    <Textarea
                        id="review"
                        placeholder={`Share your experience working with ${clientName} on "${jobTitle}". What went well? Any areas for improvement?`}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="min-h-[100px] resize-none"
                        maxLength={500}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Minimum 10 characters</span>
                        <span>{review.length}/500</span>
                    </div>
                </div>

                {/* Submit Button */}
                <Button onClick={handleSubmitRating} disabled={isSubmitting || rating === 0} className="w-full">
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Rating
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}

export default Rating
