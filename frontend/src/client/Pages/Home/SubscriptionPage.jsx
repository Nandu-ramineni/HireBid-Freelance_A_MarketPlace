import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { captureFiatPayment, createFiatPayment } from "@/client/Redux/Actions/paymentActions"
import { buySubscription } from "@/client/Redux/Actions/subscriptionActions"
import { toast, ToastContainer } from "react-toastify"

export default function SubscriptionPage() {
    const { subscription, error } = useSelector(state => state.subscriptions)
    const dispatch = useDispatch()

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true)

            const script = document.createElement("script")
            script.src = "https://checkout.razorpay.com/v1/checkout.js"
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handleBuySubscription = async ({ plan, amount, currency }) => {
        try {
            const res = await loadRazorpayScript()
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?")
                return
            }
            const subResponse = await dispatch(buySubscription({ plan, amount, currency }))
            const paymentResponse = await dispatch(createFiatPayment({
                subscriptionId: subResponse.newSubscription._id,
                amount,
                currency
            }))
            const options = {
                key: 'rzp_test_kzINWtT3ElrntA',
                amount: amount * 100,
                currency: 'INR',
                name: 'HireBid',
                description: 'Test Transaction',
                order_id: paymentResponse.orderId,
                handler: async (razorpayResponse) => {
                    try {
                        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = razorpayResponse
                        await dispatch(captureFiatPayment({
                            razorpayOrderId: razorpay_order_id,
                            razorpayPaymentId: razorpay_payment_id,
                            razorpaySignature: razorpay_signature
                        }))
                        toast.success("Payment successful!")
                    } catch (error) {
                        console.error('Error validating payment:', error)
                        toast.error(error.response?.data?.message || "Something went wrong")
                    }
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#8EC44C'
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.error("Error during subscription purchase:", error)
        }
    }

    return (
        <div className="container py-10 px-4 md:py-16">
            <ToastContainer />
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Choose Your HireBid Plan</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Select the perfect plan for your needs. Upgrade anytime to unlock premium features and grow your business.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Basic Plan */}
                <Card className="border-2 relative">
                    {subscription.activePlan === 'Basic' && (
                        <Badge className="absolute -top-3 right-4 bg-primary text-white">Your Current Plan</Badge>
                    )}
                    <CardHeader>
                        <CardTitle className="text-xl">Basic</CardTitle>
                        <CardDescription>For individuals just getting started</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">Free</span>
                            <span className="text-muted-foreground ml-1">forever</span>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[280px]">
                        <p className="text-sm text-muted-foreground mb-6">Includes:</p>
                        <ul className="space-y-3">
                            <FeatureItem>Create a profile</FeatureItem>
                            <FeatureItem>Apply to gigs</FeatureItem>
                            <FeatureItem>Basic search filters</FeatureItem>
                            <FeatureItem>Limited to low-budget gigs</FeatureItem>
                            <FeatureItem>Standard support</FeatureItem>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            className="w-full"
                            disabled={subscription.activePlan === 'Basic'}
                        >
                            {subscription.activePlan === 'Basic' ? 'Current Plan' : 'Select Basic'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Premium Plan */}
                <Card className="border-2 border-primary relative">
                    {subscription?.activePlan === 'Premium' && (
                        <Badge className="absolute -top-3 right-4 bg-primary text-white">Your Current Plan</Badge>
                    )}
                    { subscription?.activePlan === 'Basic' && (
                        <Badge className="absolute -top-3 right-4 bg-gray-300 text-gray-700">Recommended</Badge>
                    )}
                    <CardHeader>
                        <CardTitle className="text-xl">Premium</CardTitle>
                        <CardDescription>For professionals seeking more opportunities</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">₹1,999</span>
                            <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[280px]">
                        <p className="text-sm text-muted-foreground mb-6">Everything in Basic, plus:</p>
                        <ul className="space-y-3">
                            <FeatureItem>Place high-budget gigs</FeatureItem>
                            <FeatureItem>Featured profile placement</FeatureItem>
                            <FeatureItem>Advanced search filters</FeatureItem>
                            <FeatureItem>Priority application review</FeatureItem>
                            <FeatureItem>Priority support</FeatureItem>
                            <FeatureItem>Analytics dashboard</FeatureItem>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            disabled={subscription?.activePlan === 'Premium' || subscription?.activePlan === 'Enterprise'}
                            onClick={() => subscription !== 'Premium' &&
                                handleBuySubscription({ plan: 'Premium', amount: 1999, currency: 'INR' })}
                        >
                            {subscription.activePlan === 'Premium' ? 'Current Plan' : 'Upgrade to Premium'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card className="border-2 relative">
                    {subscription?.activePlan === 'Enterprise' && (
                        <Badge className="absolute -top-3 right-4 bg-primary text-white">Your Current Plan</Badge>
                    )}
                    <CardHeader>
                        <CardTitle className="text-xl">Enterprise</CardTitle>
                        <CardDescription>For businesses with advanced needs</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">₹8,999</span>
                            <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[280px]">
                        <p className="text-sm text-muted-foreground mb-6">Everything in Premium, plus:</p>
                        <ul className="space-y-3">
                            <FeatureItem>Unlimited high-budget gigs</FeatureItem>
                            <FeatureItem>Team collaboration tools</FeatureItem>
                            <FeatureItem>Custom branding options</FeatureItem>
                            <FeatureItem>Dedicated account manager</FeatureItem>
                            <FeatureItem>
                                API access
                                <FeatureTooltip text="Connect HireBid with your existing systems" />
                            </FeatureItem>
                            <FeatureItem>Bulk hiring capabilities</FeatureItem>
                            <FeatureItem>Advanced reporting</FeatureItem>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            disabled={subscription?.activePlan === 'Enterprise'}
                            onClick={() => subscription?.activePlan !== 'Enterprise' &&
                                handleBuySubscription({ plan: 'Enterprise', amount: 8999, currency: 'INR' })}
                        >
                            {subscription?.activePlan === 'Enterprise' ? 'Current Plan' : 'Upgrade to Enterprise'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-16 max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6">Compare All Features</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-4 px-4">Feature</th>
                                <th className="py-4 px-4">Basic</th>
                                <th className="py-4 px-4">Premium</th>
                                <th className="py-4 px-4">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ComparisonRow feature="Profile Creation" basic={true} premium={true} enterprise={true} />
                            <ComparisonRow feature="Apply to Gigs" basic={true} premium={true} enterprise={true} />
                            <ComparisonRow feature="High-Budget Gigs" basic={false} premium={true} enterprise={true} />
                            <ComparisonRow feature="Featured Profile" basic={false} premium={true} enterprise={true} />
                            <ComparisonRow feature="Advanced Filters" basic={false} premium={true} enterprise={true} />
                            <ComparisonRow feature="Priority Support" basic={false} premium={true} enterprise={true} />
                            <ComparisonRow feature="Analytics Dashboard" basic={false} premium={true} enterprise={true} />
                            <ComparisonRow feature="Team Collaboration" basic={false} premium={false} enterprise={true} />
                            <ComparisonRow feature="API Access" basic={false} premium={false} enterprise={true} />
                            <ComparisonRow feature="Dedicated Manager" basic={false} premium={false} enterprise={true} />
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    Our team is ready to help you select the right plan for your specific needs.
                </p>
                <Button variant="outline" asChild>
                    <Link to="/contact">Contact Sales</Link>
                </Button>
            </div>
        </div>
    )
}

// Subcomponents
function FeatureItem({ children }) {
    return (
        <li className="flex items-start">
            <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{children}</span>
        </li>
    )
}

function FeatureTooltip({ text }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground inline ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-sm">{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function ComparisonRow({ feature, basic, premium, enterprise }) {
    return (
        <tr className="border-b">
            <td className="text-left py-4 px-4">{feature}</td>
            <td className="py-4 px-4">{basic ? <Check className="h-5 w-5 text-primary mx-auto" /> : "-"}</td>
            <td className="py-4 px-4">{premium ? <Check className="h-5 w-5 text-primary mx-auto" /> : "-"}</td>
            <td className="py-4 px-4">{enterprise ? <Check className="h-5 w-5 text-primary mx-auto" /> : "-"}</td>
        </tr>
    )
}
