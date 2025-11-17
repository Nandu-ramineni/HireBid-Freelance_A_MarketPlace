import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
const RevenueChart = ({ monthlyRevenue }) => {
    const chartData = Object.entries(monthlyRevenue)
        .map(([month, data]) => {
            // Parse the month string (e.g., "2025-07") properly
            const [year, monthNum] = month.split("-")
            const date = new Date(Number.parseInt(year), Number.parseInt(monthNum) - 1)

            return {
                month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                paid: data.paid,
                unpaid: data.unpaid,
                total: data.paid + data.unpaid,
            }
        })
        .sort((a, b) => {
            // Sort by date
            const dateA = new Date(a.month)
            const dateB = new Date(b.month)
            return dateA.getTime() - dateB.getTime()
        })

    const formatCurrency = (value) => `₹${(value / 1000).toFixed(0)}K`

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
                            <Tooltip
                                formatter={(value) => [formatCurrency(value), ""]}
                                labelStyle={{ color: "#1e293b" }}
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="paid" name="Paid" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="unpaid" name="Unpaid" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}


export default RevenueChart