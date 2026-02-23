"use client";
import React, { useState } from 'react';
import { Plus, Trash, X } from '@phosphor-icons/react';
import { CreditCard, Code, UserCog, List } from 'lucide-react';

const ICONS = { CreditCard, Code, UserCog, List };
type IconKey = keyof typeof ICONS;

interface Category { id: string; name: string; iconKey: IconKey; count: number; description: string; }

const INITIAL_CATEGORIES: Category[] = [
    { id: 'billing', name: 'Billing & Plans', iconKey: 'CreditCard', count: 12, description: 'Questions about payments, invoices and subscriptions.' },
    { id: 'technical', name: 'Technical Support', iconKey: 'Code', count: 8, description: 'Technical troubleshooting and integration help.' },
    { id: 'account', name: 'Account Management', iconKey: 'UserCog', count: 6, description: 'Account settings, security, and profile management.' },
];

export default function FAQCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', description: '', iconKey: 'List' as IconKey });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newCat: Category = {
            id: form.name.toLowerCase().replace(/\s+/g, '-'),
            name: form.name,
            iconKey: form.iconKey,
            count: 0,
            description: form.description,
        };
        setCategories([...categories, newCat]);
        setShowModal(false);
        setForm({ name: '', description: '', iconKey: 'List' });
    };

    const handleDelete = (id: string) => setCategories(categories.filter(c => c.id !== id));

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">FAQ Categories</h1>
                    <p className="text-slate-500 dark:text-gray-400">Organize FAQs into categories for easy navigation</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus size={18} /> New Category
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => {
                    const Icon = ICONS[cat.iconKey];
                    return (
                        <div key={cat.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 hover:shadow-md transition-all group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <button onClick={() => handleDelete(cat.id)} className="text-slate-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash size={16} weight="bold" />
                                </button>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{cat.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mb-4">{cat.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{cat.count} FAQs</span>
                                <button className="text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">View All →</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Category Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Category</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Category Name</label>
                                <input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Returns & Refunds" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</label>
                                <textarea className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 min-h-[80px] transition-colors" placeholder="Short description of this category..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Icon</label>
                                <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.iconKey} onChange={e => setForm({ ...form, iconKey: e.target.value as IconKey })}>
                                    <option value="List">General</option>
                                    <option value="CreditCard">Billing</option>
                                    <option value="Code">Technical</option>
                                    <option value="UserCog">Account</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all">Create Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
