import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Loader2 } from "lucide-react"
import jsPDF from "jspdf"
import { format } from 'date-fns'

const ExportButton = ({ isExporting, setIsExporting, data }) => {
    const getImageDataUrl = async (url) => {
        const res = await fetch(url)
        const blob = await res.blob()
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.readAsDataURL(blob)
        })
    }

    const getQrDataUrl = async (url) => {
        const res = await fetch(url)
        const blob = await res.blob()
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.readAsDataURL(blob)
        })
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            // style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (date) => {
        return format(new Date(date), 'dd MMMM yyyy') // e.g., "17 June 2025"
    }

    const formatDateTime = (date) => {
        return format(new Date(date), 'dd MMMM yyyy, HH:mm:ss') // e.g., "17 June 2025, 14:30:00"
    }

    const generateAdvancedPDF = async () => {
        setIsExporting(true)

        try {
            const pdf = new jsPDF("p", "mm", "a4")
            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()
            let currentPage = 1
            let yPosition = 20
            const footerMargin = 20

            const logoUrl = "https://res.cloudinary.com/nanduvarma/image/upload/v1751466565/samples/Logo_n3lmxf.png"
            const logoBase64 = await getImageDataUrl(logoUrl)
            const qrUrl = "https://res.cloudinary.com/nanduvarma/image/upload/v1752131974/qrreport_l2rxvb.jpg"
            const qrBase64 = await getQrDataUrl(qrUrl)

            const ensureSpace = (requiredSpace = 40) => {
                if (yPosition + requiredSpace > pageHeight - footerMargin) {
                    addNewPage()
                }
            }

            const addNewPage = () => {
                pdf.addPage()
                currentPage++
                yPosition = 20
                addPageHeader()
            }

            const addPageHeader = () => {
                if (currentPage > 1) {
                    pdf.setFillColor(59, 130, 246)
                    pdf.rect(0, 0, pageWidth, 15, "F")
                    pdf.setTextColor(255, 255, 255)
                    pdf.setFontSize(10)
                    pdf.setFont("helvetica", "bold")
                    pdf.text("HireBid - Project Analytics Report", 20, 10)
                    pdf.text(`Page ${currentPage}`, pageWidth - 30, 10)
                    yPosition = 25
                    
                }
            }

            const addFooter = () => {
                const footerY = pageHeight - 10
                pdf.setFontSize(8)
                pdf.setTextColor(128, 128, 128)
                pdf.text("HireBid - Client Internal Report", 20, footerY)
                pdf.text(`Generated: ${formatDateTime(new Date())}`, pageWidth - 80, footerY)
            }

            // COVER PAGE
            pdf.setFillColor(59, 130, 246)
            pdf.rect(0, 0, pageWidth, 60, "F")

            // Logo and Title
            pdf.addImage(logoBase64, "PNG", 20, 20, 20, 20)
            pdf.setTextColor(255, 255, 255)
            pdf.setFontSize(32)
            pdf.setFont("helvetica", "bold")
            pdf.text("HireBid", 45, 35)
            pdf.addImage(qrBase64,"PNG",pageWidth - 40, 15, 20, 20)

            pdf.setFontSize(16)
            pdf.setFont("helvetica", "normal")
            pdf.text("Freelance Project Management Platform", 20, 50)

            yPosition = 80
            pdf.setFillColor(248, 250, 252)
            pdf.rect(20, yPosition, pageWidth - 40, 50, "F")
            pdf.setDrawColor(226, 232, 240)
            pdf.rect(20, yPosition, pageWidth - 40, 50, "S")

            pdf.setTextColor(0, 0, 0)
            pdf.setFontSize(14)
            pdf.setFont("helvetica", "bold")
            pdf.text("Company Information", 25, yPosition + 10)

            pdf.setFontSize(10)
            pdf.setFont("helvetica", "normal")
            const companyInfo = [
                "HireBid Technologies Pvt. Ltd.",
                "Address: 3-88/9 Tech Park, Cyber City, Hyderabad - 500081",
                "Phone: +91 40 1234 5678 | Email: contact@hirebid.com",
                "Website: www.hirebid.com | CIN: U72900TG2023PTC123456",
            ]
            companyInfo.forEach((info, index) => {
                pdf.text(info, 25, yPosition + 20 + index * 6)
            })

            // Title and Summary
            yPosition = 150
            pdf.setFontSize(24)
            pdf.setFont("helvetica", "bold")
            pdf.setTextColor(30, 41, 59)
            pdf.text("PROJECT ANALYTICS REPORT", 20, yPosition)

            yPosition += 15
            pdf.setFontSize(12)
            pdf.setFont("helvetica", "normal")
            pdf.setTextColor(100, 116, 139)
            pdf.text(`Report Period: ${formatDate(new Date())} | Generated by: Hirebid Analytics Team`, 20, yPosition)

            yPosition = 180
            pdf.setFillColor(239, 246, 255)
            pdf.rect(20, yPosition, pageWidth - 40, 60, "F")
            pdf.setDrawColor(59, 130, 246)
            pdf.rect(20, yPosition, pageWidth - 40, 60, "S")

            pdf.setTextColor(30, 41, 59)
            pdf.setFontSize(16)
            pdf.setFont("helvetica", "bold")
            pdf.text("Executive Summary", 25, yPosition + 15)

            pdf.setFontSize(11)
            pdf.setFont("helvetica", "normal")
            const totalRevenue = Object.values(data.monthlyRevenue).reduce((acc, month) => acc + month.paid + month.unpaid, 0)
            const totalPaid = Object.values(data.monthlyRevenue).reduce((acc, month) => acc + month.paid, 0)
            const completionRate = ((data.statusCount.completed / data.totalJobs) * 100).toFixed(1)
            const summaryText = [
                `This report provides a comprehensive analysis of ${data.totalJobs} projects with a total value of Rs ${formatCurrency(totalRevenue)}.`,
                `Project completion rate stands at ${completionRate}% with Rs ${formatCurrency(totalPaid)} successfully collected.`,
                `Currently ${data.statusCount["in-progress"]} projects are in progress, representing significant ongoing revenue potential.`,
            ]

            summaryText.forEach((text, index) => {
                const lines = pdf.splitTextToSize(text, pageWidth - 50)
                pdf.text(lines, 25, yPosition + 25 + index * (lines.length * 4 + 2))
            })

            // NEW PAGE
            addNewPage()

            // Key Metrics
            ensureSpace(60)
            pdf.setTextColor(30, 41, 59)
            pdf.setFontSize(18)
            pdf.setFont("helvetica", "bold")
            pdf.text("Key Performance Indicators", 20, yPosition)
            yPosition += 15

            const metrics = [
                { label: "Total Projects", value: data.totalJobs.toString(), color: [59, 130, 246] },
                { label: "Completed", value: data.statusCount.completed.toString(), color: [16, 185, 129] },
                { label: "In Progress", value: data.statusCount["in-progress"].toString(), color: [245, 158, 11] },
                { label: "Success Rate", value: `${completionRate}%`, color: [139, 69, 19] },
            ]

            const metricsPerRow = 2
            const metricWidth = (pageWidth - 60) / metricsPerRow
            const metricHeight = 25

            metrics.forEach((metric, index) => {
                const row = Math.floor(index / metricsPerRow)
                const col = index % metricsPerRow
                const x = 20 + col * (metricWidth + 10)
                const y = yPosition + row * (metricHeight + 10)
                pdf.setFillColor(...metric.color)
                pdf.rect(x, y, metricWidth, metricHeight, "F")
                pdf.setTextColor(255, 255, 255)
                pdf.setFontSize(14)
                pdf.setFont("helvetica", "bold")
                pdf.text(metric.value, x + 10, y + 12)
                pdf.setFontSize(10)
                pdf.setFont("helvetica", "normal")
                pdf.text(metric.label, x + 10, y + 20)
            })

            yPosition += 70
            ensureSpace(60)

            // Financial Overview
            pdf.setTextColor(30, 41, 59)
            pdf.setFontSize(18)
            pdf.setFont("helvetica", "bold")
            pdf.text("Financial Overview", 20, yPosition)
            yPosition += 15

            const financialData = [
                ["Metric", "Amount (Rs)", "Percentage"],
                ["Total Budget", formatCurrency(totalRevenue), "100%"],
                ["Amount Spent", formatCurrency(totalPaid), `${((totalPaid / totalRevenue) * 100).toFixed(1)}%`],
                ["Amount Pending", formatCurrency(totalRevenue - totalPaid), `${(((totalRevenue - totalPaid) / totalRevenue) * 100).toFixed(1)}%`],
                ["Average Project Value", formatCurrency(Math.round(data.jobs.reduce((acc, job) => acc + job.budget, 0) / data.jobs.length)), "-"],
            ]

            const tableStartY = yPosition
            const rowHeight = 8
            const colWidths = [60, 50, 30]

            financialData.forEach((row, rowIndex) => {
                let xPos = 20
                ensureSpace(12)
                if (rowIndex === 0) {
                    pdf.setFillColor(59, 130, 246)
                    pdf.rect(20, yPosition, pageWidth - 40, rowHeight, "F")
                    pdf.setTextColor(255, 255, 255)
                    pdf.setFont("helvetica", "bold")
                } else {
                    if (rowIndex % 2 === 0) {
                        pdf.setFillColor(248, 250, 252)
                        pdf.rect(20, yPosition, pageWidth - 40, rowHeight, "F")
                    }
                    pdf.setTextColor(0, 0, 0)
                    pdf.setFont("helvetica", "normal")
                }

                pdf.setFontSize(10)
                row.forEach((cell, colIndex) => {
                    pdf.text(cell, xPos + 5, yPosition + 6)
                    xPos += colWidths[colIndex]
                })

                yPosition += rowHeight
            })

            yPosition += 20

            // Detailed Project Analysis
            pdf.setTextColor(30, 41, 59)
            pdf.setFontSize(18)
            pdf.setFont("helvetica", "bold")
            pdf.text("Detailed Project Analysis", 20, yPosition)
            yPosition += 20

            data.jobs.forEach((job, index) => {
                ensureSpace(50)
                const statusColors = {
                    completed: [16, 185, 129],
                    "in-progress": [59, 130, 246],
                    open: [245, 158, 11],
                    closed: [239, 68, 68],
                }
                const statusColor = statusColors[job.status] || [107, 114, 128]

                pdf.setFillColor(241, 245, 249)
                pdf.rect(20, yPosition - 5, pageWidth - 40, 35, "F")
                pdf.setDrawColor(203, 213, 225)
                pdf.rect(20, yPosition - 5, pageWidth - 40, 35, "S")
                pdf.setTextColor(30, 41, 59)
                pdf.setFontSize(14)
                pdf.setFont("helvetica", "bold")
                pdf.text(`${index + 1}. ${job.title}`, 25, yPosition + 5)

                pdf.setFillColor(...statusColor)
                pdf.rect(pageWidth - 70, yPosition - 2, 40, 8, "F")
                pdf.setTextColor(255, 255, 255)
                pdf.setFontSize(8)
                pdf.setFont("helvetica", "bold")
                pdf.text(job.status.toUpperCase(), pageWidth - 65, yPosition + 3)

                pdf.setFont("helvetica", "normal")
                pdf.setFontSize(10)
                pdf.setTextColor(71, 85, 105)

                const projectDetails = [
                    `Budget: Rs ${job.budget.toLocaleString()} | Paid: Rs ${job.paidAmount.toLocaleString()} | Pending: Rs ${job.unpaidAmount.toLocaleString()}`,
                    `Category: ${job.category} | Type: ${job.jobType} | Location: ${job.location}`,
                    `Deadline: ${new Date(job.deadline).toLocaleDateString()} | Experience: ${job.experienceLevel}`,
                ]
                projectDetails.forEach((detail, detailIndex) => {
                    const lines = pdf.splitTextToSize(detail, pageWidth - 50)
                    pdf.text(lines, 25, yPosition + 15 + detailIndex * lines.length * 4)
                })

                yPosition += 40
                const description = job.description.length > 200 ? job.description.substring(0, 200) + "..." : job.description
                const descLines = pdf.splitTextToSize(`Description: ${description}`, pageWidth - 50)
                pdf.setFontSize(10)
                pdf.text(descLines, 25, yPosition)
                yPosition += descLines.length * 4 + 5

                if (job.skills?.length) {
                    pdf.setFont("helvetica", "bold")
                    pdf.text("Skills: ", 25, yPosition)
                    pdf.setFont("helvetica", "normal")
                    pdf.text(job.skills.join(", "), 40, yPosition)
                    yPosition += 8
                }

                if (job.milestones?.length) {
                    pdf.setFont("helvetica", "bold")
                    pdf.text("Milestones:", 25, yPosition)
                    yPosition += 6
                    job.milestones.forEach((milestone, mIndex) => {
                        const milestoneText = `${mIndex + 1}. ${milestone.description} - Rs ${milestone.amount.toLocaleString()} ${milestone.isPaid ? "(Paid)" : "(Pending)"}`
                        const milestoneLines = pdf.splitTextToSize(milestoneText, pageWidth - 60)
                        pdf.setFont("helvetica", "normal")
                        pdf.setFontSize(10)
                        pdf.text(milestoneLines, 30, yPosition)
                        yPosition += milestoneLines.length * 4 + 2
                    })
                }

                yPosition += 10
            })

            // Footer on all pages
            const totalPages = pdf.getNumberOfPages()
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i)
                addFooter()
            }

            pdf.save(`HireBid-Analytics-Report-${new Date().toISOString().split("T")[0]}.pdf`)
        } catch (error) {
            console.error("Error generating PDF:", error)
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Export Report
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                    Generate a comprehensive professional PDF report with detailed analytics, company information, and project breakdowns.
                </p>

                <Button onClick={generateAdvancedPDF} disabled={isExporting} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" size="lg">
                    {isExporting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </>
                    )}
                </Button>

                <div className="text-xs text-slate-500 space-y-1">
                    <p>✓ Professional cover page with company info</p>
                    <p>✓ Executive summary & KPIs</p>
                    <p>✓ Financial overview with charts</p>
                    <p>✓ Detailed project analysis</p>
                    <p>✓ Milestone tracking</p>
                    <p>✓ Multi-page professional layout</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ExportButton
