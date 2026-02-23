"use client";

import React, { useState } from 'react';
import { Plus, BookOpen, X, Trash } from '@phosphor-icons/react';

interface KBArticle { id: string; title: string; category: string; author: string; views: number; helpful: number; status: 'published' | 'draft'; updated: string; }

const INITIAL_KB: KBArticle[] = [
    { id: 'KB-001', title: 'How to reset your password', category: 'Technical', author: 'John Doe', views: 1234, helpful: 987, status: 'published', updated: '2 days ago' },
    { id: 'KB-002', title: 'Understanding your billing cycle', category: 'Billing', author: 'Sarah Smith', views: 856, helpful: 742, status: 'published', updated: '1 week ago' },
    { id: 'KB-003', title: 'Getting started guide', category: 'General', author: 'Admin', views: 3200, helpful: 2980, status: 'published', updated: '3 days ago' },
    { id: 'KB-004', title: 'API Integration tutorial', category: 'Technical', author: 'Dev Team', views: 0, helpful: 0, status: 'draft', updated: 'Today' },
];

export default function KnowledgeBasePage() {
    const [articles, setArticles] = useState<KBArticle[]>(INITIAL_KB);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: '', category: 'General', status: 'draft' as 'published' | 'draft' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newArticle: KBArticle = {
            id: `KB-00${articles.length + 1}`,
            title: form.title,
            category: form.category,
            author: 'Admin',
            views: 0,
            helpful: 0,
            status: form.status,
            updated: 'Just now',
        };
        setArticles([newArticle, ...articles]);
        setShowModal(false);
        setForm({ title: '', category: 'General', status: 'draft' });
    };

    const handleDelete = (id: string) => setArticles(articles.filter(a => a.id !== id));

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Knowledge Base</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage help articles and guides</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 flex items-center gap-2">
                    <Plus weight="bold" size={18} /> New Article
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {articles.map(article => (
                    <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                    <BookOpen size={20} weight="fill" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{article.title}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-gray-400">
                                        <span>By {article.author}</span><span>•</span>
                                        <span>{article.category}</span><span>•</span>
                                        <span>Updated {article.updated}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-bold text-slate-700 dark:text-gray-300">{article.views.toLocaleString()} views</div>
                                    <div className="text-xs text-emerald-600 dark:text-emerald-400">{article.helpful.toLocaleString()} helpful</div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${article.status === 'published' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-400'}`}>
                                    {article.status}
                                </span>
                                <button onClick={() => handleDelete(article.id)} className="text-slate-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash size={16} weight="bold" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Article Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Article</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Article Title</label>
                                <input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. How to reset your password" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Category</label>
                                <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option>General</option>
                                    <option>Technical</option>
                                    <option>Billing</option>
                                    <option>Account</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Status</label>
                                <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })}>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all">Create Article</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
