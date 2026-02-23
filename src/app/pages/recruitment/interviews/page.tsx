"use client";

import React, { useState } from "react";
import { CalendarCheck, Plus, Pencil, X } from "@phosphor-icons/react";

interface Interview {
    id: number;
    candidateName: string;
    jobTitle: string;
    date: string;
    time: string;
    status: string;
}

export default function InterviewsPage() {
    const [interviews, setInterviews] = useState<Interview[]>([
        { id: 1, candidateName: 'Sarah Johnson', jobTitle: 'Senior Software Engineer', date: '2025-12-20', time: '10:00', status: 'scheduled' },
    ]);

    return (
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interviews</h1>
                <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                    <Plus size={20} weight="bold" /> Schedule
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_80px] p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400 text-sm">
                    <div>Candidate</div>
                    <div>Position</div>
                    <div>Date</div>
                    <div>Time</div>
                    <div>Actions</div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {interviews.map(i => (
                        <div key={i.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_80px] p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm transition-colors">
                            <div className="font-medium text-gray-900 dark:text-white">{i.candidateName}</div>
                            <div className="text-gray-600 dark:text-gray-300">{i.jobTitle}</div>
                            <div className="text-gray-600 dark:text-gray-300">{i.date}</div>
                            <div className="text-gray-600 dark:text-gray-300">{i.time}</div>
                            <button className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded transition-colors"><Pencil size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

