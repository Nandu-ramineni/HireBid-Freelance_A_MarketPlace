"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check } from "lucide-react"

const BidReview = ({ job, onClose }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState("form") // form, review, success
  const [bidAmount, setBidAmount] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")
  const [coverLetter, setCoverLetter] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep("review")
  }

  const handleConfirm = () => {
    // Here you would typically send the bid data to your backend
    // For now, we'll just simulate a successful bid
    setTimeout(() => {
      setStep("success")
    }, 1000)
  }

  const handleBack = () => {
    if (step === "review") {
      setStep("form")
    } else {
      onClose()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{step === "success" ? "Bid Placed Successfully" : "Place Your Bid"}</CardTitle>
      </CardHeader>
      <CardContent>
        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="bidAmount">Bid Amount (₹)</Label>
              <Input
                id="bidAmount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid amount"
                required
              />
            </div>
            <div>
              <Label htmlFor="deliveryTime">Delivery Time (days)</Label>
              <Input
                id="deliveryTime"
                type="number"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                placeholder="Enter delivery time in days"
                required
              />
            </div>
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a brief cover letter..."
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Review Bid
            </Button>
          </form>
        )}

        {step === "review" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Bid</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bid Amount</p>
                <p className="font-medium">₹{bidAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivery Time</p>
                <p className="font-medium">{deliveryTime} days</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Cover Letter</p>
              <p className="mt-1">{coverLetter}</p>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("form")}>
                Edit Bid
              </Button>
              <Button onClick={handleConfirm}>Confirm and Place Bid</Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Your bid has been placed successfully!</h3>
            <p className="text-muted-foreground">The client will review your proposal and get back to you soon.</p>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              Go to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" onClick={handleBack} className="mr-auto">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BidReview

