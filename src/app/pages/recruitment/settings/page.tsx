"use client";

import React, { useState } from "react";
import { Gear } from "@phosphor-icons/react";

export default function RecruitmentSettingsPage() {
    return (
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recruitment Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">General Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Email Notifications</span>
                            <div className="w-12 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full relative cursor-pointer ring-4 ring-indigo-500/10">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Auto-response to applicants</span>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-400 rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Permissions</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage who can view and edit recruitment data within your team.</p>
                    <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1">
                        Configure roles <span className="text-xl">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

