"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    InstagramLogo,
    LinkedinLogo,
    FacebookLogo,
    Storefront,
    CheckCircle
} from '@phosphor-icons/react';

export default function AutoPostSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [autoPost, setAutoPost] = useState({
        instagram: { enabled: false, id: '', token: '' },
        linkedin: { enabled: false, orgId: '', token: '' },
        facebook: { enabled: true, pageId: '', token: '' },
        google: { enabled: false, locId: '', token: '' }
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
            {renderHeader('Social Media Auto-Posting', 'Automatically publish blog posts to connected accounts.')}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Instagram */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white">
                                        <InstagramLogo weight="fill" size={20} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Instagram Business</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={autoPost.instagram.enabled} onChange={() => setAutoPost({ ...autoPost, instagram: { ...autoPost.instagram, enabled: !autoPost.instagram.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">IG Account ID</label>
                                    <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="17841..." value={autoPost.instagram.id} onChange={(e) => setAutoPost({ ...autoPost, instagram: { ...autoPost.instagram, id: e.target.value } })} disabled={!autoPost.instagram.enabled} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Access Token</label>
                                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="IGQJ..." value={autoPost.instagram.token} onChange={(e) => setAutoPost({ ...autoPost, instagram: { ...autoPost.instagram, token: e.target.value } })} disabled={!autoPost.instagram.enabled} />
                                </div>
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#0077b5] flex items-center justify-center text-white">
                                        <LinkedinLogo weight="fill" size={20} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">LinkedIn Company</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={autoPost.linkedin.enabled} onChange={() => setAutoPost({ ...autoPost, linkedin: { ...autoPost.linkedin, enabled: !autoPost.linkedin.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Organization ID</label>
                                    <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="urn:li:organization:..." value={autoPost.linkedin.orgId} onChange={(e) => setAutoPost({ ...autoPost, linkedin: { ...autoPost.linkedin, orgId: e.target.value } })} disabled={!autoPost.linkedin.enabled} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Access Token</label>
                                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="AQV..." value={autoPost.linkedin.token} onChange={(e) => setAutoPost({ ...autoPost, linkedin: { ...autoPost.linkedin, token: e.target.value } })} disabled={!autoPost.linkedin.enabled} />
                                </div>
                            </div>
                        </div>

                        {/* Facebook */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center text-white">
                                        <FacebookLogo weight="fill" size={20} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Facebook Page</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={autoPost.facebook.enabled} onChange={() => setAutoPost({ ...autoPost, facebook: { ...autoPost.facebook, enabled: !autoPost.facebook.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Page ID</label>
                                    <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="10293..." value={autoPost.facebook.pageId} onChange={(e) => setAutoPost({ ...autoPost, facebook: { ...autoPost.facebook, pageId: e.target.value } })} disabled={!autoPost.facebook.enabled} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Page Token</label>
                                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="EAA..." value={autoPost.facebook.token} onChange={(e) => setAutoPost({ ...autoPost, facebook: { ...autoPost.facebook, token: e.target.value } })} disabled={!autoPost.facebook.enabled} />
                                </div>
                            </div>
                        </div>

                        {/* Google Business */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#4285F4] flex items-center justify-center text-white">
                                        <Storefront weight="fill" size={20} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Google Business</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={autoPost.google.enabled} onChange={() => setAutoPost({ ...autoPost, google: { ...autoPost.google, enabled: !autoPost.google.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Location ID</label>
                                    <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="locations/..." value={autoPost.google.locId} onChange={(e) => setAutoPost({ ...autoPost, google: { ...autoPost.google, locId: e.target.value } })} disabled={!autoPost.google.enabled} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-gray-400 mb-1 transition-colors">Refresh Token</label>
                                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="1//0..." value={autoPost.google.token} onChange={(e) => setAutoPost({ ...autoPost, google: { ...autoPost.google, token: e.target.value } })} disabled={!autoPost.google.enabled} />
                                </div>
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
