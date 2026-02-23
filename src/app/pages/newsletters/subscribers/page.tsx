"use client";
import React, { useState } from 'react';
import { Plus, X, Trash, Envelope } from '@phosphor-icons/react';

interface Subscriber { id: number; name: string; email: string; status: 'active' | 'unsubscribed'; subscribed: string; tags: string[]; }

const INITIAL: Subscriber[] = [
    { id: 1, name: 'Alice Smith', email: 'alice@company.com', status: 'active', subscribed: '2024-01-10', tags: ['VIP', 'Newsletter'] },
    { id: 2, name: 'John Doe', email: 'john.doe@gmail.com', status: 'active', subscribed: '2024-03-15', tags: ['Newsletter'] },
    { id: 3, name: 'Sarah Connor', email: 'sarah.c@future.com', status: 'unsubscribed', subscribed: '2023-08-22', tags: ['Promo'] },
];

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', tag: 'Newsletter' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribers([...subscribers, { id: Date.now(), name: form.name, email: form.email, status: 'active', subscribed: new Date().toISOString().split('T')[0], tags: [form.tag] }]);
        setShowModal(false);
        setForm({ name: '', email: '', tag: 'Newsletter' });
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Subscribers</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage your email newsletter subscribers</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> Add Subscriber
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-gray-900/50">
                        <tr>{['Name', 'Email', 'Tags', 'Subscribed', 'Status', ''].map(h => <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                        {subscribers.map(sub => (
                            <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">{sub.name.split(' ').map(n => n[0]).join('')}</div>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{sub.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400">{sub.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1 flex-wrap">
                                        {sub.tags.map(t => <span key={t} className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">{t}</span>)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-400">{sub.subscribed}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${sub.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-400'}`}>{sub.status}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setSubscribers(subscribers.filter(s => s.id !== sub.id))} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"><Trash size={16} weight="bold" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add Subscriber</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Full Name</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Jane Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label><input type="email" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="jane@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Tag</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}><option>Newsletter</option><option>VIP</option><option>Promo</option><option>Announcement</option></select></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
