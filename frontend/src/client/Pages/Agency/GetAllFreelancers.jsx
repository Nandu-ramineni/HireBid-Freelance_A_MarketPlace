import { getAllFreelancers } from '@/client/Services/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FreelancerCard } from './FreelancerCard';
import { UserGroupIcon, UserStatusIcon } from 'hugeicons-react';
import { Button } from '@/components/ui/button';
const GetAllFreelancers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFreelancers = async () => {
        setLoading(true)
        try {
            const res = await getAllFreelancers()
            const all = res.data || []

            // Filter: only include freelancers with complete profiles
            const filtered = all.filter((freelancer) => {
                const profile = freelancer.freelancerProfile
                return (
                    freelancer.firstName &&
                    freelancer.lastName &&
                    freelancer.email &&
                    freelancer.bio &&
                    profile &&
                    Array.isArray(profile.skills) && profile.skills.length > 0 &&
                    Array.isArray(profile.languages) && profile.languages.length > 0 &&
                    profile.availability &&
                    typeof profile.hourlyRate === 'number' &&
                    profile.experience
                )
            })

            setData(filtered)
        } catch (err) {
            setError(err.message || "Failed to fetch freelancers")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFreelancers();
    }, []);
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-6">
                    <Users className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">All Freelancers</h1>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="space-y-4 p-6 border rounded-lg">
                            <div className="flex items-start gap-4">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-64" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-20" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-18" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center bg-background border rounded-2xl shadow-sm p-8">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10 mx-auto mb-4">
                        <AlertCircle className="h-7 w-7 text-destructive" />
                    </div>

                    <h2 className="text-xl font-semibold mb-2">
                        Oops! Something went wrong
                    </h2>

                    <p className="text-sm text-muted-foreground mb-6">
                        It’s not you, it’s us. We’re having trouble fetching freelancers right now.
                        Please try again in a moment.
                    </p>

                    <div className="flex justify-center gap-3">
                        <Button variant="destructive">
                            Try Again
                        </Button>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Refresh Page
                        </Button>
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div className="mx-auto px-4 py-2 md:px-16 md:py-8 bg-[#F2F4F7] min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <UserStatusIcon className="h-6 w-6" />
                    <h1 className="text-xl font-bold">All Freelancers</h1>
                </div>
                <div className="text-sm text-gray-600">
                    {data.length} freelancer{data.length !== 1 ? "s" : ""} found
                </div>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No freelancers found</h3>
                    <p className="text-gray-600">There are no freelancers available at the moment.</p>
                </div>
            ) : (
                <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                    {data.map((freelancer) => (
                        <FreelancerCard key={freelancer._id} freelancer={freelancer} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default GetAllFreelancers