import {  getFreelancerCompletedBids } from '@/client/Redux/Actions/bidActions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReviewCards from './ReviewCards'
import Logo from "@/assets/logos/Logo.png"

const Reviews = () => {
    const dispatch = useDispatch()
    const { completedBids, loading, error } = useSelector((state) => state.bids)
    const fetchClientBids = async () => {
        try {
            await dispatch(getFreelancerCompletedBids())
        } catch (error) {
            console.error("Error fetching client bids:", error)
        }
    }
    useEffect(() => {
        fetchClientBids()
    }, [])
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
        return <div className="p-4 text-red-500 text-center">Failed to load report: {error}</div>;
    }
    return (
        <main className='h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100' style={{ scrollbarWidth: "thin"}}>
            <ReviewCards rateBids={completedBids} />
        </main>
    )
}

export default Reviews