"use client";

import React, { useState } from "react";
import { UserPlus, Plus, Eye } from "@phosphor-icons/react";

interface Onboarding {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    startDate: string;
    progress: number;
}

export default function OnboardingPage() {
    const [onboarding, setOnboarding] = useState<Onboarding[]>([
        { id: 1, firstName: 'Amanda', lastName: 'White', position: 'Senior Software Engineer', startDate: '2025-12-23', progress: 75 },
    ]);

    return (
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Onboarding</h1>
                <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                    <Plus size={20} weight="bold" /> Add New Hire
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                <div className="grid grid-cols-[2fr_2fr_1fr_2fr_80px] p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400 text-sm">
                    <div>Employee</div>
                    <div>Position</div>
                    <div>Start Date</div>
                    <div>Progress</div>
                    <div>Actions</div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {onboarding.map(o => (
                        <div key={o.id} className="grid grid-cols-[2fr_2fr_1fr_2fr_80px] p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm transition-colors">
                            <div className="font-medium text-gray-900 dark:text-white">{o.firstName} {o.lastName}</div>
                            <div className="text-gray-600 dark:text-gray-300">{o.position}</div>
                            <div className="text-gray-600 dark:text-gray-300">{o.startDate}</div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 dark:bg-green-600" style={{ width: `${o.progress}%` }}></div>
                                </div>
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{o.progress}%</span>
                            </div>
                            <button className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded transition-colors"><Eye size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

