"use client";
import React, { useState } from 'react';
import { Plus, X, Trash, Clipboard, Check } from '@phosphor-icons/react';

interface Snippet { id: number; name: string; code: string; lang: string; desc: string; }

const INITIAL: Snippet[] = [
    { id: 1, name: 'WhatsApp Button', lang: 'HTML', code: '<a href="https://wa.me/923001234567" target="_blank" class="whatsapp-btn">Chat on WhatsApp</a>', desc: 'Floating WhatsApp chat button' },
    { id: 2, name: 'Meta Pixel', lang: 'JS', code: "fbq('init', 'YOUR_PIXEL_ID');\nfbq('track', 'PageView');", desc: 'Facebook meta pixel tracking' },
    { id: 3, name: 'Cookie Banner', lang: 'HTML', code: '<div id="cookie-banner">We use cookies. <button onclick="this.parentNode.remove()">Accept</button></div>', desc: 'Simple cookie consent banner' },
];

export default function SnippetsPage() {
    const [snippets, setSnippets] = useState<Snippet[]>(INITIAL);
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState<number | null>(null);
    const [form, setForm] = useState({ name: '', lang: 'HTML', desc: '', code: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setSnippets([...snippets, { id: Date.now(), name: form.name, lang: form.lang, desc: form.desc, code: form.code }]);
        setShowModal(false);
        setForm({ name: '', lang: 'HTML', desc: '', code: '' });
    };

    const handleCopy = (id: number, code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Code Snippets</h1>
                    <p className="text-slate-500 dark:text-gray-400">Save and reuse commonly used code blocks</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> New Snippet
                </button>
            </div>

            <div className="space-y-4">
                {snippets.map(s => (
                    <div key={s.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden group hover:shadow-md transition-all">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-gray-700">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</h3>
                                <p className="text-xs text-slate-400 dark:text-gray-500 mt-0.5">{s.desc}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-md">{s.lang}</span>
                                <button onClick={() => handleCopy(s.id, s.code)} className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    {copied === s.id ? <Check size={16} weight="bold" className="text-emerald-500" /> : <Clipboard size={16} weight="bold" />}
                                </button>
                                <button onClick={() => setSnippets(snippets.filter(x => x.id !== s.id))} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"><Trash size={15} weight="bold" /></button>
                            </div>
                        </div>
                        <pre className="text-xs font-mono text-slate-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-900 p-4 overflow-x-auto whitespace-pre-wrap">{s.code}</pre>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Snippet</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Name</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500" placeholder="WhatsApp Button" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Language</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500" value={form.lang} onChange={e => setForm({ ...form, lang: e.target.value })}><option>HTML</option><option>JS</option><option>CSS</option></select></div>
                            </div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</label><input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500" placeholder="Short description..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Code</label><textarea required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 font-mono focus:outline-none focus:border-indigo-500 min-h-[100px]" placeholder="Paste your code here..." value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} /></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Save Snippet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
