"use client";
import React, { useState } from 'react';
import { Plus, X, Trash, FileText } from '@phosphor-icons/react';

interface Template { id: number; name: string; category: string; desc: string; updated: string; }

const INITIAL: Template[] = [
    { id: 1, name: 'Welcome Email', category: 'Onboarding', desc: 'Sent to new users upon signup.', updated: '2 days ago' },
    { id: 2, name: 'Monthly Newsletter', category: 'Marketing', desc: 'Standard monthly newsletter layout.', updated: '1 week ago' },
    { id: 3, name: 'Tax Deadline Alert', category: 'Compliance', desc: 'Alert email for upcoming tax deadlines.', updated: '3 days ago' },
];

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>(INITIAL);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', category: 'Marketing', desc: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setTemplates([...templates, { id: Date.now(), name: form.name, category: form.category, desc: form.desc, updated: 'Just now' }]);
        setShowModal(false);
        setForm({ name: '', category: 'Marketing', desc: '' });
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Templates</h1>
                    <p className="text-slate-500 dark:text-gray-400">Reusable email templates for your campaigns</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> New Template
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(t => (
                    <div key={t.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                            <FileText size={20} weight="fill" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mb-4">{t.desc}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">{t.category}</span>
                            <span className="text-xs text-slate-400 dark:text-gray-500">Updated {t.updated}</span>
                        </div>
                        <button onClick={() => setTemplates(templates.filter(x => x.id !== t.id))} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100">
                            <Trash size={15} weight="bold" />
                        </button>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Template</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Template Name</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Welcome Email" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Category</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>Marketing</option><option>Onboarding</option><option>Compliance</option><option>Support</option></select></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</label><textarea className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 min-h-[80px] transition-colors" placeholder="Brief description..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} /></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Create Template</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
