'use client';

import React, { useState } from 'react';
import {
    Code2,
    Save,
    RotateCcw,
    CheckCircle,
    Braces,
    FileCode,
    LayoutTemplate,
    History
} from 'lucide-react';

export default function CustomCodePage() {
    const [sections, setSections] = useState([
        {
            id: 'head',
            title: 'Header Scripts',
            badge: '<HEAD>',
            icon: <Braces className="w-5 h-5 text-indigo-600" />,
            description: 'Injects code between <head> and </head> tags. Ideal for tracking scripts and meta verification.',
            placeholder: '<!-- Paste Google Analytics or Meta Pixel code here -->',
            enabled: true,
            code: ''
        },
        {
            id: 'body',
            title: 'Body Scripts',
            badge: '<BODY>',
            icon: <FileCode className="w-5 h-5 text-indigo-600" />,
            description: 'Injects code immediately after the opening <body> tag.',
            placeholder: '<!-- Paste GTM No-Script code here -->',
            enabled: true,
            code: ''
        },
        {
            id: 'footer',
            title: 'Footer Scripts',
            badge: '</BODY>',
            icon: <LayoutTemplate className="w-5 h-5 text-indigo-600" />,
            description: 'Injects code before the closing </body> tag. Best for performance-heavy scripts.',
            placeholder: '<!-- Paste Chat widget or custom JS here -->',
            enabled: true,
            code: ''
        }
    ]);

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleCodeChange = (id: string, value: string) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, code: value } : s));
    };

    const toggleSection = (id: string) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    const handleReset = () => {
        if (confirm("Discard all changes and reset to blank?")) {
            setSections(prev => prev.map(s => ({ ...s, code: '' })));
        }
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col h-screen overflow-hidden transition-colors duration-300">

            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center shrink-0 z-10 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg">
                        <Code2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Custom Scripts</h1>
                        <p className="text-xs text-slate-500 dark:text-gray-400">Manage third-party integrations and custom JS</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 border border-slate-300 dark:border-gray-700 rounded-lg text-slate-700 dark:text-gray-300 font-medium bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Discard
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`px-6 py-2 rounded-lg text-white font-medium transition-colors shadow-sm flex items-center gap-2 ${saved ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {saving ? (
                            <>Saving...</>
                        ) : saved ? (
                            <><CheckCircle className="w-4 h-4" /> Saved!</>
                        ) : (
                            <><Save className="w-4 h-4" /> Save Changes</>
                        )}
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 p-4 flex flex-col gap-2 shrink-0 hidden md:flex overflow-y-auto transition-colors">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                        >
                            <span className="text-indigo-600 dark:text-indigo-400 transition-colors">{section.icon}</span>
                            {section.title}
                        </button>
                    ))}
                    <div className="h-px bg-slate-200 dark:bg-gray-700 my-2"></div>
                    <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                        <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-colors" /> Version History
                    </button>
                </aside>

                {/* Editor Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 scroll-smooth">
                    {sections.map(section => (
                        <div key={section.id} id={section.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden scroll-mt-6 transition-colors">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-indigo-600 dark:text-indigo-400 transition-colors">{section.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                                            {section.title}
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-mono tracking-wide transition-colors">
                                                {section.badge}
                                            </span>
                                        </h3>
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <span className={`text-sm font-medium ${section.enabled ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-500 dark:text-gray-500'} transition-colors`}>
                                        {section.enabled ? 'Enabled' : 'Disabled'}
                                    </span>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={section.enabled}
                                            onChange={() => toggleSection(section.id)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </div>
                                </label>
                            </div>

                            <div className="relative">
                                <textarea
                                    value={section.code}
                                    onChange={(e) => handleCodeChange(section.id, e.target.value)}
                                    placeholder={section.placeholder}
                                    disabled={!section.enabled}
                                    spellCheck={false}
                                    className={`w-full h-48 p-4 bg-slate-900 dark:bg-black text-slate-300 dark:text-gray-300 font-mono text-sm outline-none resize-y transition-colors ${!section.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                ></textarea>
                            </div>

                            <div className="px-6 py-3 bg-slate-50 dark:bg-gray-800/50 border-t border-slate-200 dark:border-gray-700 text-xs text-slate-500 dark:text-gray-400 flex items-start gap-2 transition-colors">
                                <div className="mt-0.5 min-w-[16px]"><Code2 className="w-4 h-4 text-slate-400 dark:text-gray-500" /></div>
                                {section.description}
                            </div>
                        </div>
                    ))}
                </main>

            </div>
        </div>
    );
}
