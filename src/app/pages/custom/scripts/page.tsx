"use client";
import React, { useState } from 'react';
import { Plus, X, Trash, Code } from '@phosphor-icons/react';

interface Script { id: number; name: string; src: string; location: 'head' | 'body' | 'footer'; enabled: boolean; added: string; }

const INITIAL: Script[] = [
    { id: 1, name: 'Google Analytics', src: 'https://www.googletagmanager.com/gtag/js?id=GA_ID', location: 'head', enabled: true, added: '2024-01-01' },
    { id: 2, name: 'Hotjar Session Recording', src: 'https://static.hotjar.com/c/hotjar-xxxx.js', location: 'head', enabled: true, added: '2024-02-15' },
    { id: 3, name: 'Live Chat Widget', src: 'https://embed.tawk.to/xxxx/default', location: 'footer', enabled: false, added: '2024-03-10' },
];

export default function ScriptsPage() {
    const [scripts, setScripts] = useState<Script[]>(INITIAL);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', src: '', location: 'head' as 'head' | 'body' | 'footer' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setScripts([...scripts, { id: Date.now(), name: form.name, src: form.src, location: form.location, enabled: true, added: new Date().toISOString().split('T')[0] }]);
        setShowModal(false);
        setForm({ name: '', src: '', location: 'head' });
    };

    const toggle = (id: number) => setScripts(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Custom Scripts</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage third-party and custom JavaScript scripts</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> Add Script
                </button>
            </div>

            <div className="space-y-3">
                {scripts.map(s => (
                    <div key={s.id} className={`bg-white dark:bg-gray-800 rounded-xl border transition-all group p-5 flex items-center gap-4 ${s.enabled ? 'border-slate-200 dark:border-gray-700' : 'border-slate-100 dark:border-gray-800 opacity-60'}`}>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                            <Code size={20} weight="bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${s.location === 'head' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : s.location === 'footer' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'bg-slate-100 dark:bg-gray-700 text-slate-500'}`}>{s.location}</span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-gray-500 truncate font-mono">{s.src}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <button onClick={() => toggle(s.id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${s.enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-gray-600'}`}>
                                <span className={`inline-block h-3 w-3 rounded-full bg-white transform transition-transform ${s.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                            </button>
                            <button onClick={() => setScripts(scripts.filter(x => x.id !== s.id))} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"><Trash size={15} weight="bold" /></button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add Script</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Script Name</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500" placeholder="e.g. Google Analytics" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Script URL</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 font-mono" placeholder="https://example.com/script.js" value={form.src} onChange={e => setForm({ ...form, src: e.target.value })} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Insert Location</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500" value={form.location} onChange={e => setForm({ ...form, location: e.target.value as any })}><option value="head">Head</option><option value="body">Body</option><option value="footer">Footer</option></select></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Add Script</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
