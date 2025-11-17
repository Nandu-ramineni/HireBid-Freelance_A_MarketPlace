import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {  Eye, MapPin, } from "lucide-react"
import { ArrowLeft01Icon, ArrowRight01Icon, Briefcase05Icon, Calendar01Icon, Delete01Icon, Menu01Icon, MoreVerticalIcon, Wallet01Icon } from 'hugeicons-react'
import { Button } from '@/components/ui/button'
const JobsTable = ({ jobs }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800 border-green-200"
            case "in-progress":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "open":
                return "bg-orange-100 text-orange-800 border-orange-200"
            case "closed":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getTypeColor = (type) => {
        switch (type) {
            case "Contract":
                return "bg-pink-100 text-pink-800"
            case "Full Time":
                return "bg-green-100 text-green-800"
            case "Part Time":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const tagStyles = [
        {
            text: { light: "#5925DC", dark: "#BDB4FE" },
            bg: { light: "#5925DC14", dark: "#BDB4FE0D" },
            border: { light: "#5925DC33", dark: "#BDB4FE33" },
            hoverBg: { light: "#0ACC920D", dark: "#77C7AF0D" },
        },
        {
            text: { light: "#8F6C1A", dark: "#E0BE70" },
            bg: { light: "#FFC02E1A", dark: "#E0BE700D" },
            border: { light: "#8F6C1A33", dark: "#E0BE7033" },
            hoverBg: { light: "#FFC02E0D", dark: "#E0BE700D" },
        },
        {
            text: { light: "#9F1AB1", dark: "#EEAAFD" },
            bg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
            border: { light: "#9F1AB114", dark: "#EEAAFD33" },
            hoverBg: { light: "#9F1AB10D", dark: "#EEAAFD0D" },
        },
        {
            text: { light: "#067A57", dark: "#77C7AF" },
            bg: { light: "#0ACC9214", dark: "#77C7AF0D" },
            border: { light: "#026AA233", dark: "#7CD4FD33" },
            hoverBg: { light: "#026AA20D", dark: "#7CD4FD0D" },
        },
        {
            text: { light: "#C4320A", dark: "#FCA89F" },
            bg: { light: "#F970661A", dark: "#FCA89F0D" },
            border: { light: "#C4320A33", dark: "#FCA89F33" },
            hoverBg: { light: "#F970660D", dark: "#FCA89F1A" },
        },
        {
            text: { light: "#1D3A5F", dark: "#8FB3E8" },
            bg: { light: "#2E90FA14", dark: "#8FB3E80D" },
            border: { light: "#1D3A5F33", dark: "#8FB3E833" },
            hoverBg: { light: "#2E90FA0D", dark: "#8FB3E80D" },
        },
    ]
    const paginatedJobs = jobs.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const totalPages = Math.ceil(jobs.length / pageSize)

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1)
        if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1)
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Project Details</CardTitle>
                <p className="text-sm text-slate-500">Overview of the projects and their statuses</p>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead className="w-[300px]">Project</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Paid</TableHead>
                                <TableHead>Pending</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedJobs.map((job) => (
                                <TableRow key={job._id} className="hover:bg-slate-50 align-top">
                                    <TableCell className="align-top text-sm font-semibold text-slate-800">PRJ_{job._id.slice(-4).toUpperCase()}</TableCell>
                                    <TableCell className="align-top">
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-slate-800 line-clamp-1">{job.title}</h4>
                                            {/* <p className="text-sm text-slate-600 line-clamp-2">{job.description}</p> */}
                                            <div className="flex flex-wrap gap-1">
                                                {job.skills.slice(0, 3).map((skill, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs"
                                                        style={{
                                                            color: tagStyles[index % tagStyles.length].text.light,
                                                            backgroundColor: tagStyles[index % tagStyles.length].bg.light,
                                                            borderColor: tagStyles[index % tagStyles.length].border?.light || "transparent",
                                                        }}
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {job.skills.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{job.skills.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Briefcase05Icon className="h-3 w-3" />
                                                    {job.experienceLevel}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <span className="font-semibold">₹{job.budget.toLocaleString()}</span>
                                        {/* <div className="flex items-center gap-1">
                                            <Wallet01Icon className="h-4 w-4 text-slate-500" />
                                            <span className="font-semibold">₹{job.budget.toLocaleString()}</span>
                                        </div> */}
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <span className="text-green-600 font-semibold">₹{job.paidAmount.toLocaleString()}</span>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <span className="text-orange-600 font-semibold">₹{job.unpaidAmount.toLocaleString()}</span>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        {formatDate(job.deadline)}
                                        {/* <div className="flex items-center gap-1 text-sm">
                                            <Calendar01Icon className="h-4 w-4 text-slate-500" />
                                            {formatDate(job.deadline)}
                                        </div> */}
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <Badge className={`capitalize ${getStatusColor(job.status)}`}>{job.status}</Badge>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <Badge variant="outline" className={getTypeColor(job.jobType)}>{job.jobType}</Badge>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <Button variant="ghost" size="icon" ><Eye className="h-4 w-4 text-yellow-500" /></Button>
                                        <Button variant="ghost" size="icon"><Delete01Icon className="h-4 w-4 text-red-500" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                            <ArrowLeft01Icon className='h-5 w-5 text-slate-500' /> Previous
                        </Button>
                        <Button variant="outline" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                            Next <ArrowRight01Icon className='h-5 w-5 text-slate-500' />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default JobsTable