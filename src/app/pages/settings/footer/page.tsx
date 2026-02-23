"use client";

import React, { useState } from 'react';
import {
    FloppyDisk,
    Plus,
    Trash,
    CheckCircle
} from '@phosphor-icons/react';

interface FooterLink {
    platform: string;
    url: string;
}

export default function FooterSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [footerLinks, setFooterLinks] = useState<FooterLink[]>([
        { platform: 'Facebook', url: 'https://fb.com' },
        { platform: 'Instagram', url: 'https://inst.com' }
    ]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 800);
    };

    const addFooterLink = () => {
        setFooterLinks([...footerLinks, { platform: 'Facebook', url: '' }]);
    };

    const removeFooterLink = (index: number) => {
        setFooterLinks(footerLinks.filter((_, i) => i !== index));
    };

    const updateFooterLink = (index: number, field: keyof FooterLink, value: string) => {
        const newLinks = [...footerLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setFooterLinks(newLinks);
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
            {renderHeader('Footer Links', 'Manage social icons in the website footer.')}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                    <div className="mb-6 border-b border-slate-100 dark:border-gray-700 pb-4 transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Social Links</h3>
                    </div>
                    <div className="space-y-4">
                        {footerLinks.map((link, i) => (
                            <div key={i} className="flex gap-4 items-center animate-scale-in">
                                <select
                                    className="w-40 px-3 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors"
                                    value={link.platform}
                                    onChange={(e) => updateFooterLink(i, 'platform', e.target.value)}
                                >
                                    <option className="dark:bg-gray-800">Facebook</option>
                                    <option className="dark:bg-gray-800">Instagram</option>
                                    <option className="dark:bg-gray-800">LinkedIn</option>
                                    <option className="dark:bg-gray-800">Twitter</option>
                                    <option className="dark:bg-gray-800">YouTube</option>
                                </select>
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 transition-colors"
                                    placeholder="https://..."
                                    value={link.url}
                                    onChange={(e) => updateFooterLink(i, 'url', e.target.value)}
                                />
                                <button
                                    onClick={() => removeFooterLink(i)}
                                    className="p-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl border border-transparent hover:border-rose-100 dark:hover:border-rose-900/50 transition-colors"
                                >
                                    <Trash size={18} weight="bold" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addFooterLink}
                            className="mt-4 flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-4 py-2 rounded-xl transition-colors border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50"
                        >
                            <Plus weight="bold" /> Add New Link
                        </button>
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
