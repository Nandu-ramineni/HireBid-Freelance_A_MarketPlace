import { getClientReport } from '@/client/Redux/Actions/jobActions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReportPage from './ReportPage';
import Logo from "@/assets/logos/Logo.png"
import { generateClientReport } from '@/client/Services/api';
const Report = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { report, error } = useSelector((state) => state.getJobs);
    const fetchClientReport = async () => {
        setLoading(true);
        try {
            // await dispatch(getClientReport());
            const response = await generateClientReport();
            setData(response.data.report);
        } catch (error) {
            console.error("Error fetching client report:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchClientReport();
    }, []);
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
                    <p className="text-muted-foreground">Generating Report...</p>
                </div>
            </div>
        )
    }
    if (error) {
        return <div className="p-4 text-red-500 text-center">Failed to load report: {error}</div>;
    }

    return (
        <div className="h-[90vh] overflow-y-scroll bg-gradient-to-br from-slate-50 to-slate-100" style={{scrollbarWidth: 'thin'}}>
            {data ? <ReportPage data={data} /> : <p className="text-center p-6">No report data available.</p>}
        </div>
    );

}

export default Report