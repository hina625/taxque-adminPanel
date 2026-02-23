"use client";

import React, { useState } from "react";
import { FloppyDisk } from "@phosphor-icons/react";

export default function CareerSettingsPage() {
    const [settings, setSettings] = useState({
        companyName: 'RecruitPro Technologies',
        tagline: 'Join our team and shape the future',
        about: 'We are a leading technology company...',
        primaryColor: '#7c3aed',
        secondaryColor: '#10b981',
        email: 'careers@recruitpro.com'
    });

    return (
        <div className="p-6 space-y-6 bg-[#f8f9fa] min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900">Career Settings</h1>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input defaultValue={settings.companyName} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                        <input defaultValue={settings.tagline} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">About Us</label>
                        <textarea defaultValue={settings.about} rows={4} className="w-full p-2 border rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                            <input type="color" defaultValue={settings.primaryColor} className="w-full h-10 p-1 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <input type="email" defaultValue={settings.email} className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <button type="button" className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        <FloppyDisk size={20} /> Save Settings
                    </button>
                </form>
            </div>
        </div>
    );
}
