"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    Palette,
    CheckCircle,
    TextT
} from '@phosphor-icons/react';

export default function ColorSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [colors, setColors] = useState({
        headingColor: '#111827',
        bodyTextColor: '#4b5563',
        linkColor: '#4f46e5',
        linkHoverColor: '#4338ca',
        mutedTextColor: '#9ca3af'
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

    const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
        <div className="bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-slate-100 dark:border-gray-800 transition-colors">
            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-3">{label}</label>
            <div className="flex items-center gap-3">
                <input
                    type="color"
                    className="w-12 h-12 p-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg cursor-pointer transition-colors shadow-sm"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <input
                    type="text"
                    className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm font-mono dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors uppercase"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );

    return (
        <>
            {renderHeader('Text Color Settings', 'Manage font colors for headings, paragraphs, and links.')}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-gray-700 pb-4">
                        <Palette size={20} weight="bold" className="text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Typography Colors</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ColorInput
                            label="Heading Color"
                            value={colors.headingColor}
                            onChange={(val) => setColors({ ...colors, headingColor: val })}
                        />
                        <ColorInput
                            label="Body Text Color"
                            value={colors.bodyTextColor}
                            onChange={(val) => setColors({ ...colors, bodyTextColor: val })}
                        />
                        <ColorInput
                            label="Muted Text Color"
                            value={colors.mutedTextColor}
                            onChange={(val) => setColors({ ...colors, mutedTextColor: val })}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-gray-700 pb-4">
                        <TextT size={20} weight="bold" className="text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Link Colors</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ColorInput
                            label="Default Link Color"
                            value={colors.linkColor}
                            onChange={(val) => setColors({ ...colors, linkColor: val })}
                        />
                        <ColorInput
                            label="Link Hover Color"
                            value={colors.linkHoverColor}
                            onChange={(val) => setColors({ ...colors, linkHoverColor: val })}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-8 shadow-sm transition-colors">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-6">Live Preview</h3>
                    <div className="space-y-4">
                        <h1 style={{ color: colors.headingColor }} className="text-3xl font-bold transition-colors">Main Heading Preview</h1>
                        <p style={{ color: colors.bodyTextColor }} className="text-base transition-colors">
                            This is how your standard body text will appear. Color selection is crucial for readability and accessibility.
                            <span style={{ color: colors.mutedTextColor }} className="ml-1 transition-colors">(This is muted or secondary text)</span>
                        </p>
                        <div className="flex gap-4">
                            <a href="#" style={{ color: colors.linkColor }} className="underline transition-colors">Standard Link</a>
                            <a href="#" style={{ color: colors.linkHoverColor }} className="underline transition-colors font-medium cursor-default">Link Hover State</a>
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
                        <span className="text-xs opacity-90">Text colors saved.</span>
                    </div>
                </div>
            </div>
        </>
    );
}
