"use client";

import React, { useState } from "react";
import { FloppyDisk } from "@phosphor-icons/react";

export default function CareerPage() {
    const [settings, setSettings] = useState({
        companyName: 'RecruitPro Technologies',
        tagline: 'Join our team and shape the future',
        about: 'We are a leading technology company...',
        primaryColor: '#7c3aed',
        secondaryColor: '#10b981',
        email: 'careers@recruitpro.com'
    });

    return (
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Page</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 max-w-2xl transition-colors">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                        <input defaultValue={settings.companyName} className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tagline</label>
                        <input defaultValue={settings.tagline} className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Us</label>
                        <textarea defaultValue={settings.about} rows={4} className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Color</label>
                            <input type="color" defaultValue={settings.primaryColor} className="w-full h-10 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
                            <input type="email" defaultValue={settings.email} className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </div>
                    </div>
                    <button type="button" className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                        <FloppyDisk size={20} weight="bold" /> Save Page Content
                    </button>
                </form>
            </div>
        </div>
    );
}

