"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    PaperPlaneRight,
    CheckCircle
} from '@phosphor-icons/react';

export default function SMTPSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [smtp, setSmtp] = useState({
        host: '',
        port: '',
        encryption: 'TLS',
        fromName: '',
        user: '',
        password: '',
        fromEmail: '',
        replyTo: ''
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
            {renderHeader('SMTP Configuration', 'Manage email server and delivery settings.')}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-gray-700 pb-4 transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Mail Server Details</h3>
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50 transition-colors flex items-center gap-2">
                            <PaperPlaneRight weight="bold" />
                            Send Test Email
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">Mail Host</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" placeholder="smtp.gmail.com" value={smtp.host} onChange={(e) => setSmtp({ ...smtp, host: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">Mail Port</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" placeholder="587" value={smtp.port} onChange={(e) => setSmtp({ ...smtp, port: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">Encryption</label>
                            <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" value={smtp.encryption} onChange={(e) => setSmtp({ ...smtp, encryption: e.target.value })}>
                                <option className="dark:bg-gray-800">TLS</option>
                                <option className="dark:bg-gray-800">SSL</option>
                                <option className="dark:bg-gray-800">None</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">Sender Name</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" placeholder="e.g. TaxQue Support" value={smtp.fromName} onChange={(e) => setSmtp({ ...smtp, fromName: e.target.value })} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-gray-700 transition-colors">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">SMTP Username</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" placeholder="user@domain.com" value={smtp.user} onChange={(e) => setSmtp({ ...smtp, user: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">SMTP Password</label>
                            <input type="password" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" placeholder="App Password" value={smtp.password} onChange={(e) => setSmtp({ ...smtp, password: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">From Email</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" placeholder="noreply@domain.com" value={smtp.fromEmail} onChange={(e) => setSmtp({ ...smtp, fromEmail: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2 transition-colors">Reply-To Email</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors" placeholder="support@domain.com" value={smtp.replyTo} onChange={(e) => setSmtp({ ...smtp, replyTo: e.target.value })} />
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
