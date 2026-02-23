"use client";
import React, { useState } from 'react';
import { Plus, X, Trash, PaperPlaneTilt } from '@phosphor-icons/react';

type CampaignStatus = 'sent' | 'scheduled' | 'draft';
interface Campaign { id: number; name: string; subject: string; status: CampaignStatus; sent: number; opened: number; clicks: number; date: string; }

const INITIAL: Campaign[] = [
    { id: 1, name: 'March Tax Deadline Reminder', subject: 'Important: File before March 31st', status: 'sent', sent: 3240, opened: 1876, clicks: 432, date: '2026-02-15' },
    { id: 2, name: 'GST Update Newsletter', subject: 'GST compliance changes you need to know', status: 'sent', sent: 2810, opened: 1540, clicks: 298, date: '2026-02-01' },
    { id: 3, name: 'Q1 2026 Newsletter', subject: "Q1 financial tips for your business", status: 'scheduled', sent: 0, opened: 0, clicks: 0, date: '2026-03-01' },
    { id: 4, name: 'Welcome Email Draft', subject: 'Welcome to Taxque!', status: 'draft', sent: 0, opened: 0, clicks: 0, date: '2026-02-23' },
];

const statusStyle: Record<CampaignStatus, string> = {
    sent: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    scheduled: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    draft: 'bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-400',
};

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', subject: '', status: 'draft' as CampaignStatus, date: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setCampaigns([...campaigns, { id: Date.now(), name: form.name, subject: form.subject, status: form.status, sent: 0, opened: 0, clicks: 0, date: form.date || new Date().toISOString().split('T')[0] }]);
        setShowModal(false);
        setForm({ name: '', subject: '', status: 'draft', date: '' });
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Campaigns</h1>
                    <p className="text-slate-500 dark:text-gray-400">Create and manage email marketing campaigns</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> New Campaign
                </button>
            </div>

            <div className="space-y-4">
                {campaigns.map(c => (
                    <div key={c.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                    <PaperPlaneTilt size={20} weight="fill" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{c.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{c.subject}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${statusStyle[c.status]}`}>{c.status}</span>
                                <button onClick={() => setCampaigns(campaigns.filter(x => x.id !== c.id))} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"><Trash size={15} weight="bold" /></button>
                            </div>
                        </div>
                        {c.status === 'sent' && (
                            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-gray-700">
                                {[['Sent', c.sent.toLocaleString()], ['Opened', `${c.opened.toLocaleString()} (${Math.round(c.opened / c.sent * 100)}%)`], ['Clicks', `${c.clicks.toLocaleString()} (${Math.round(c.clicks / c.sent * 100)}%)`]].map(([label, val]) => (
                                    <div key={label as string}>
                                        <div className="text-xs text-slate-400 dark:text-gray-500 mb-0.5">{label}</div>
                                        <div className="text-sm font-bold text-slate-700 dark:text-gray-300">{val}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Campaign</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Campaign Name</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. March Hello" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Subject</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Subject line..." value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Status</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as CampaignStatus })}><option value="draft">Draft</option><option value="scheduled">Scheduled</option></select></div>
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Date</label><input type="date" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
