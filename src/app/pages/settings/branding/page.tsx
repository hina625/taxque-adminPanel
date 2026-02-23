"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    Image,
    Star,
    CheckCircle
} from '@phosphor-icons/react';

export default function BrandingSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [branding, setBranding] = useState({
        appName: 'TaxQue Admin',
        supportEmail: 'support@taxque.com'
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 800);
    };

    const renderHeader = (title: string, desc: string) => (
        <div className="bg-white dark:bg-gray-800 px-8 py-5 border-b border-slate-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10 transition-colors">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{title}</h2>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 transition-colors">{desc}</p>
            </div>
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-70"
            >
                {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin transition-colors" />
                ) : (
                    <FloppyDisk size={18} weight="bold" />
                )}
                Save Changes
            </button>
        </div>
    );

    return (
        <>
            {renderHeader('Branding & Logos', 'Manage site identity and visual assets.')}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-gray-700 pb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Site Identity</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Application Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                                value={branding.appName}
                                onChange={(e) => setBranding({ ...branding, appName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Support Email</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                                value={branding.supportEmail}
                                onChange={(e) => setBranding({ ...branding, supportEmail: e.target.value })}
                            />
                        </div>
                    </div>
                </div>


                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-gray-700 pb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Logos & Favicon</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400">Upload separate logos for Light and Dark modes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Website Logo (Light Mode)</label>
                            <div className="border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer group min-h-[180px]">
                                <Image className="text-slate-300 dark:text-gray-600 group-hover:text-indigo-400 dark:group-hover:text-indigo-400 mb-3 transition-colors" size={40} weight="duotone" />
                                <div className="text-sm font-bold text-slate-600 dark:text-gray-400">Click to Upload</div>
                                <div className="text-xs text-slate-400 dark:text-gray-500 mt-1">For White Backgrounds</div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Website Logo (Dark Mode)</label>
                            <div className="border-2 border-dashed border-slate-600 dark:border-gray-400 bg-slate-800 dark:bg-gray-950 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-white transition-colors cursor-pointer group min-h-[180px]">
                                <Image className="text-slate-500 dark:text-gray-400 group-hover:text-white mb-3 transition-colors" size={40} weight="duotone" />
                                <div className="text-sm font-bold text-slate-200 dark:text-gray-300">Click to Upload</div>
                                <div className="text-xs text-slate-400 dark:text-gray-500 mt-1">For Dark Backgrounds</div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Favicon (Browser Tab)</label>
                            <div className="border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer group min-h-[180px]">
                                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-3 text-sky-600 dark:text-sky-400 transition-colors">
                                    <Star weight="bold" size={20} />
                                </div>
                                <div className="text-sm font-bold text-slate-600 dark:text-gray-400">Upload .ICO</div>
                                <div className="text-xs text-slate-400 dark:text-gray-500 mt-1">32x32px Recommended</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Toast */}
            <div className={`fixed bottom-8 right-8 z-50 transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
                <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                    <CheckCircle size={24} weight="bold" />
                    <div>
                        <strong className="block text-sm">Success</strong>
                        <span className="text-xs opacity-90">Settings saved successfully.</span>
                    </div>
                </div>
            </div>
        </>
    );
}
