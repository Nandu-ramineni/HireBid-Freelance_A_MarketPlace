import { useDispatch, useSelector } from "react-redux"
import { AcceptedBids } from "./AcceptedBids"
import { useEffect } from "react"
import { getClientBids } from "@/client/Redux/Actions/bidActions"
import Logo from "@/assets/logos/Logo.png"
import { Button } from "@/components/ui/button"
export default function Messages() {
    const dispatch = useDispatch()
    const { clientBids, loading, error } = useSelector((state) => state.bids)
    // const fetchClientBids = async () => {
    //     try {
    //         await 
    //     } catch (error) {
    //         console.error("Error fetching client bids:", error)
    //     }
    // }
    useEffect(() => {
        dispatch(getClientBids())
    }, [dispatch])
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F2F4F7]">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        {/* Spinning Border */}
                        <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        {/* Centered Image */}
                        <div className="flex items-center justify-center w-full h-full">
                            <img src={Logo} alt="Logo" className="w-8 h-8" />
                        </div>
                    </div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }
    const normalizeError = (error) => {
        // Extract message safely from ALL possible shapes
        const rawMessage =
            typeof error === "string"
                ? error
                : error?.message ||
                error?.response?.data?.message ||
                ""

        const msg = rawMessage.toLowerCase().trim()

        // ✅ EXACT MATCH for your backend error
        if (msg.includes("no in-progress jobs found")) {
            return {
                kind: "empty",
                title: "No active jobs yet",
                desc:
                    "You don’t have any ongoing or in-progress jobs at the moment. Once a job is started, invoices will appear here.",
                icon: "📭",
            }
        }

        // fallback
        return {
            kind: "error",
            title: "Error loading invoices",
            desc: rawMessage || "Something went wrong. Please try again.",
            icon: "⚠️",
        }
    }


    const err = normalizeError(error)
    console.log("RAW ERROR:", error)
console.log("NORMALIZED MESSAGE:", normalizeError(error))


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
                <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
                    <div
                        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${err.kind === "empty" ? "bg-yellow-100" : "bg-red-100"
                            }`}
                    >
                        {err.icon}
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        {err.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                        {err.desc}
                    </p>

                    <div className="mt-6 flex justify-center gap-3">
                        {err.kind === "error" && (
                            <Button variant="destructive" onClick={() => window.location.reload()}>
                                Retry
                            </Button>
                        )}
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className=" ">
            <AcceptedBids acceptedBids={clientBids} />
        </div>
    )
}
