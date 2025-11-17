import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import moment from "moment"

export function RevenueChart({ clientGigs }) {
  const monthMap = new Map()

  clientGigs.forEach((gig) => { gig.milestones.forEach((milestone) => {
      const month = moment(gig.updatedAt).format("MMM")
      const current = monthMap.get(month) || {
        paidAmount: 0,
        unpaidAmount: 0,
        projectsSet: new Set(),
      }

      if (milestone.isPaid) {
        current.paidAmount += milestone.amount
        current.projectsSet.add(gig._id)
      } else {
        current.unpaidAmount += milestone.amount
      }
      monthMap.set(month, current)
    })
  })

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const data = Array.from(monthMap.entries())
    .map(([month, value]) => ({
      month,
      paidAmount: value.paidAmount,
      unpaidAmount: value.unpaidAmount,
      totalRevenue: value.paidAmount + value.unpaidAmount,
      projects: value.projectsSet.size,
    }))
    .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month))

  const maxRevenue = Math.max(...data.map((d) => d.totalRevenue), 1)
  const formatBudget = (budget) => {
    return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(budget)
  }
  return (
    <Card className="border-0 bg-white/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Revenue Overview
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardTitle>
        <CardDescription>Monthly revenue with paid vs unpaid breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-muted-foreground">{item.month}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    {formatBudget(item.totalRevenue)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.projects} projects
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 relative overflow-hidden">
                  {/* Full bar (unpaid + paid) - base background */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"
                    style={{ width: `${(item.totalRevenue / maxRevenue) * 100}%` }}
                  />
                  {/* Paid bar - overlay */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${(item.paidAmount / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
