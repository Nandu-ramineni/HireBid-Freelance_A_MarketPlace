import React, { useState } from 'react'
import ReportHeader from './ReportHeader'
import StatusOverview from './StatusOverview'
import ExportButton from './ExportButton'
import RevenueChart from './RevenueChart'
import JobsTable from './JobsTable'
import { Card } from '@/components/ui/card'

const ReportPage = ({data}) => {
    const [isExporting, setIsExporting] = useState(false)
    return (
        <div className="container mx-auto p-6 space-y-8">
            <div id="report-content">
                <ReportHeader />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <StatusOverview statusCount={data?.statusCount} totalJobs={data?.totalJobs} />
                    </div>
                    <div>
                        <ExportButton isExporting={isExporting} setIsExporting={setIsExporting} data={data} />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                    <RevenueChart monthlyRevenue={data?.monthlyRevenue} />
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-slate-800">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Total Revenue</span>
                                <span className="font-semibold text-green-600">
                                    ₹
                                    {Object.values(data?.monthlyRevenue)
                                        .reduce((acc, month) => acc + month.paid + month.unpaid, 0)
                                        .toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Paid Amount</span>
                                <span className="font-semibold text-green-600">
                                    ₹
                                    {Object.values(data?.monthlyRevenue)
                                        .reduce((acc, month) => acc + month.paid, 0)
                                        .toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Pending Amount</span>
                                <span className="font-semibold text-orange-600">
                                    ₹
                                    {Object.values(data?.monthlyRevenue)
                                        .reduce((acc, month) => acc + month.unpaid, 0)
                                        .toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Average Job Value</span>
                                <span className="font-semibold text-blue-600">
                                    ₹{Math.round(data?.jobs.reduce((acc, job) => acc + job.budget, 0) / data?.jobs.length).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                <JobsTable jobs={data?.jobs} />
            </div>
        </div>
    )
}


export default ReportPage