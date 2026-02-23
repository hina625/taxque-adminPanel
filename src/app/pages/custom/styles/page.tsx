"use client";
import React, { useState } from 'react';
import { Plus, X, Trash } from '@phosphor-icons/react';

interface StyleBlock { id: number; name: string; code: string; scope: string; enabled: boolean; }

const INITIAL: StyleBlock[] = [
    { id: 1, name: 'Button Overrides', code: '.btn-primary { border-radius: 12px; font-weight: 700; }', scope: 'Global', enabled: true },
    { id: 2, name: 'Dark Mode Tweaks', code: 'body.dark { background: #0f172a; }', scope: 'Dark Mode', enabled: true },
    { id: 3, name: 'Hero Banner Style', code: '.hero { background: linear-gradient(135deg, #6366f1, #8b5cf6); }', scope: 'Landing Page', enabled: false },
];

export default function StylesPage() {
    const [styles, setStyles] = useState<StyleBlock[]>(INITIAL);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', code: '', scope: 'Global' });
    const [expanded, setExpanded] = useState<number | null>(null);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setStyles([...styles, { id: Date.now(), name: form.name, code: form.code, scope: form.scope, enabled: true }]);
        setShowModal(false);
        setForm({ name: '', code: '', scope: 'Global' });
    };

    const toggle = (id: number) => setStyles(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Custom CSS</h1>
                    <p className="text-slate-500 dark:text-gray-400">Inject custom CSS styles into your pages</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> Add CSS Block
                </button>
            </div>

            <div className="space-y-3">
                {styles.map(s => (
                    <div key={s.id} className={`bg-white dark:bg-gray-800 rounded-xl border transition-all group ${s.enabled ? 'border-slate-200 dark:border-gray-700' : 'border-slate-100 dark:border-gray-800 opacity-60'}`}>
                        <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs font-mono font-bold shrink-0">CSS</div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</h3>
                                <p className="text-xs text-slate-400 dark:text-gray-500">{s.scope}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <button onClick={e => { e.stopPropagation(); toggle(s.id); }} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${s.enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-gray-600'}`}>
                                    <span className={`inline-block h-3 w-3 rounded-full bg-white transform transition-transform ${s.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                                </button>
                                <button onClick={e => { e.stopPropagation(); setStyles(styles.filter(x => x.id !== s.id)); }} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"><Trash size={15} weight="bold" /></button>
                            </div>
                        </div>
                        {expanded === s.id && (
                            <div className="border-t border-slate-100 dark:border-gray-700 p-4">
                                <pre className="text-xs font-mono text-slate-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">{s.code}</pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add CSS Block</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Name</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500" placeholder="Button Overrides" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Scope</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500" value={form.scope} onChange={e => setForm({ ...form, scope: e.target.value })}><option>Global</option><option>Dark Mode</option><option>Landing Page</option><option>Dashboard</option></select></div>
                            </div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">CSS Code</label><textarea required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 font-mono focus:outline-none focus:border-indigo-500 min-h-[120px]" placeholder=".example { color: red; }" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} /></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Add CSS Block</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
