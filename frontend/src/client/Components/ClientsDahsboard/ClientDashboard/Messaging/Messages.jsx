import { useDispatch, useSelector } from "react-redux"
import { AcceptedBids } from "./AcceptedBids"
import { useEffect } from "react"
import { getClientBids } from "@/client/Redux/Actions/bidActions"
import Logo from "@/assets/logos/Logo.png"

export default function Messages() {
    const dispatch = useDispatch()
    const {clientBids,loading,error} = useSelector((state) => state.bids)
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
        if (error) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-red-50">
                    <div className="text-center space-y-2">
                        <p className="text-red-600 font-semibold">Error loading invoices</p>
                        <p className="text-sm text-red-500">{error}</p>
                    </div>
                </div>
            );
        }
    return (
        <div className=" ">
            <AcceptedBids acceptedBids={clientBids} />
        </div>
    )
}
