"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    GoogleLogo,
    FacebookLogo,
    LinkedinLogo,
    XLogo,
    CheckCircle
} from '@phosphor-icons/react';

export default function OAuthSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [oauth, setOauth] = useState({
        google: { enabled: true, clientId: '', secret: '' },
        facebook: { enabled: false, appId: '', secret: '' },
        linkedin: { enabled: false, clientId: '', secret: '' },
        twitter: { enabled: false, clientId: '', secret: '' }
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
            {renderHeader('OAuth Login Providers', 'Enable users to login via third-party services.')}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Google */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#DB4437] flex items-center justify-center text-white">
                                        <GoogleLogo weight="bold" size={18} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Google</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={oauth.google.enabled} onChange={() => setOauth({ ...oauth, google: { ...oauth.google, enabled: !oauth.google.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="Client ID" value={oauth.google.clientId} onChange={(e) => setOauth({ ...oauth, google: { ...oauth.google, clientId: e.target.value } })} disabled={!oauth.google.enabled} />
                                <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="Client Secret" value={oauth.google.secret} onChange={(e) => setOauth({ ...oauth, google: { ...oauth.google, secret: e.target.value } })} disabled={!oauth.google.enabled} />
                            </div>
                        </div>

                        {/* Facebook */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white">
                                        <FacebookLogo weight="bold" size={18} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">Facebook</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={oauth.facebook.enabled} onChange={() => setOauth({ ...oauth, facebook: { ...oauth.facebook, enabled: !oauth.facebook.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="App ID" value={oauth.facebook.appId} onChange={(e) => setOauth({ ...oauth, facebook: { ...oauth.facebook, appId: e.target.value } })} disabled={!oauth.facebook.enabled} />
                                <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="App Secret" value={oauth.facebook.secret} onChange={(e) => setOauth({ ...oauth, facebook: { ...oauth.facebook, secret: e.target.value } })} disabled={!oauth.facebook.enabled} />
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0077b5] flex items-center justify-center text-white">
                                        <LinkedinLogo weight="bold" size={18} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">LinkedIn</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={oauth.linkedin.enabled} onChange={() => setOauth({ ...oauth, linkedin: { ...oauth.linkedin, enabled: !oauth.linkedin.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="Client ID" value={oauth.linkedin.clientId} onChange={(e) => setOauth({ ...oauth, linkedin: { ...oauth.linkedin, clientId: e.target.value } })} disabled={!oauth.linkedin.enabled} />
                                <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="Client Secret" value={oauth.linkedin.secret} onChange={(e) => setOauth({ ...oauth, linkedin: { ...oauth.linkedin, secret: e.target.value } })} disabled={!oauth.linkedin.enabled} />
                            </div>
                        </div>

                        {/* X */}
                        <div className="border border-slate-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-gray-700 pb-3 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white">
                                        <XLogo weight="bold" size={18} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm transition-colors">X (Twitter)</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={oauth.twitter.enabled} onChange={() => setOauth({ ...oauth, twitter: { ...oauth.twitter, enabled: !oauth.twitter.enabled } })} />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success transition-colors"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="Client ID" value={oauth.twitter.clientId} onChange={(e) => setOauth({ ...oauth, twitter: { ...oauth.twitter, clientId: e.target.value } })} disabled={!oauth.twitter.enabled} />
                                <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-100 transition-colors" placeholder="Client Secret" value={oauth.twitter.secret} onChange={(e) => setOauth({ ...oauth, twitter: { ...oauth.twitter, secret: e.target.value } })} disabled={!oauth.twitter.enabled} />
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
