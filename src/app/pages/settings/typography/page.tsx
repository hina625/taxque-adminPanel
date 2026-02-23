"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    TextT,
    CheckCircle
} from '@phosphor-icons/react';

export default function TypographySettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [typography, setTypography] = useState({
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: '1.5',
        fontFamily: 'Inter, sans-serif'
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
            {renderHeader('Typography Settings', 'Manage font sizes, families, and weights.')}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-gray-700 pb-4">
                        <TextT size={20} weight="bold" className="text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Font Configurations</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Base Font Size</label>
                            <select
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                                value={typography.fontSize}
                                onChange={(e) => setTypography({ ...typography, fontSize: e.target.value })}
                            >
                                <option value="14px">Small (14px)</option>
                                <option value="16px">Normal (16px)</option>
                                <option value="18px">Large (18px)</option>
                                <option value="20px">Extra Large (20px)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Line Height</label>
                            <select
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                                value={typography.lineHeight}
                                onChange={(e) => setTypography({ ...typography, lineHeight: e.target.value })}
                            >
                                <option value="1.2">Compact (1.2)</option>
                                <option value="1.5">Normal (1.5)</option>
                                <option value="1.8">Relaxed (1.8)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Font Family</label>
                            <select
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                                value={typography.fontFamily}
                                onChange={(e) => setTypography({ ...typography, fontFamily: e.target.value })}
                            >
                                <option value="Inter, sans-serif">Inter</option>
                                <option value="Roboto, sans-serif">Roboto</option>
                                <option value="system-ui, sans-serif">System Default</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Font Weight</label>
                            <select
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                                value={typography.fontWeight}
                                onChange={(e) => setTypography({ ...typography, fontWeight: e.target.value })}
                            >
                                <option value="light">Light</option>
                                <option value="normal">Normal</option>
                                <option value="medium">Medium</option>
                                <option value="bold">Bold</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-8 shadow-sm transition-colors overflow-hidden">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-6">Preview</h3>
                    <div style={{ fontSize: typography.fontSize, lineHeight: typography.lineHeight, fontFamily: typography.fontFamily, fontWeight: typography.fontWeight }} className="text-slate-900 dark:text-white transition-all">
                        <p className="mb-4">The quick brown fox jumps over the lazy dog.</p>
                        <p className="text-sm opacity-60 italic">This is how your website text will look with the current typography settings. You can adjust the font size, weight, and family to match your brand identity.</p>
                    </div>
                </div>
            </div>

            {/* Toast */}
            <div className={`fixed bottom-8 right-8 z-50 transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
                <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                    <CheckCircle size={24} weight="bold" />
                    <div>
                        <strong className="block text-sm">Success</strong>
                        <span className="text-xs opacity-90">Typography settings saved.</span>
                    </div>
                </div>
            </div>
        </>
    );
}
