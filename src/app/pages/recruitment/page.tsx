"use client";

import React, { useState } from "react";
import {
    Briefcase,
    Users,
    FileText,
    CalendarCheck,
    UserPlus,
    CheckCircle,
    ChartLine,
} from "@phosphor-icons/react";

// --- Types ---
interface Job {
    id: number;
    status: "active" | "draft" | "closed";
}

interface Application {
    id: number;
    candidateName: string;
    jobTitle: string;
    status: "new" | "screening" | "interview" | "rejected" | "hired";
    appliedDate: string;
}

interface Activity {
    id: number;
    message: string;
    type: string;
    time: string;
}

export default function RecruitmentDashboard() {
    // --- Data State (Simplified for Dashboard) ---
    const jobs: Job[] = [
        { id: 1, status: 'active' },
        { id: 2, status: 'active' },
        { id: 3, status: 'active' },
        { id: 4, status: 'active' },
    ];

    const candidatesCount = 150;

    const applications: Application[] = [
        { id: 1, candidateName: 'Sarah Johnson', jobTitle: 'Senior Software Engineer', status: 'interview', appliedDate: '2025-12-10T10:00:00Z' },
        { id: 2, candidateName: 'Michael Chen', jobTitle: 'Product Manager', status: 'screening', appliedDate: '2025-12-11T14:30:00Z' },
        { id: 3, candidateName: 'Emily Rodriguez', jobTitle: 'UX/UI Designer', status: 'new', appliedDate: '2025-12-12T09:15:00Z' },
    ];

    const activities: Activity[] = [
        { id: 1, message: 'New application from Emily Rodriguez for UX/UI Designer', type: 'application', time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
        { id: 2, message: 'Interview scheduled with Sarah Johnson', type: 'interview', time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    ];

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        const diffMins = Math.floor((new Date().getTime() - date.getTime()) / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] bg-[#f8f9fa] dark:bg-gray-950 p-6 text-sm transition-colors duration-300">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1f2937] dark:text-white">Recruitment Dashboard</h1>
                <p className="text-[#6b7280] dark:text-gray-400">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="space-y-6 overflow-y-auto pr-2 pb-10">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg"><Briefcase size={24} weight="bold" /></div>
                            <span className="text-green-600 text-xs font-medium">+5%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{jobs.length}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Active Jobs</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg"><FileText size={24} weight="bold" /></div>
                            <span className="text-green-600 text-xs font-medium">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{applications.length}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">New Applications</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg"><Users size={24} weight="bold" /></div>
                            <span className="text-green-600 text-xs font-medium">+8%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{candidatesCount}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Total Candidates</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-lg"><CalendarCheck size={24} weight="bold" /></div>
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">This Week</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Interviews</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg"><UserPlus size={24} weight="bold" /></div>
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Active</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Onboarding</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Applications */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Applications</h2>
                        </div>
                        <div className="p-6">
                            {applications.map(app => (
                                <div key={app.id} className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-6 px-6 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
                                            {app.candidateName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">{app.candidateName}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{app.jobTitle}</div>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${app.status === 'new' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400'}`}>
                                        {app.status.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {activities.map(activity => (
                                <div key={activity.id} className="flex gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.type === 'application' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400'}`}>
                                        {activity.type === 'application' ? <FileText size={16} /> : <CalendarCheck size={16} />}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-900 dark:text-gray-200">{activity.message}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{formatTime(activity.time)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
