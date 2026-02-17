'use client';

import React, { useState } from 'react';
import {
    Building2, FileText, Calculator, Scale, MessageCircle, Users,
    LayoutGrid, List, Plus, Search, Tag, Pencil, Trash,
    ChevronRight, FolderTree, X, Image as ImageIcon
} from 'lucide-react';

export default function ProductCategoriesPage() {
    const [viewMode, setViewMode] = useState('grid');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);

    const categories = [
        { id: 1, name: 'Incorporation', icon: Building2, color: 'blue', items: 12, status: 'Active' },
        { id: 2, name: 'Compliances', icon: FileText, color: 'green', items: 8, status: 'Active' },
        { id: 3, name: 'Tax Filing', icon: Calculator, color: 'orange', items: 15, status: 'Active' },
        { id: 4, name: 'Legal Services', icon: Scale, color: 'purple', items: 6, status: 'Inactive' },
        { id: 5, name: 'Advisory', icon: MessageCircle, color: 'cyan', items: 4, status: 'Active' },
        { id: 6, name: 'Payroll', icon: Users, color: 'pink', items: 9, status: 'Active' },
    ];

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setShowAddModal(true);
    };

    const handleSubcategories = (category: any) => {
        setEditingCategory(category);
        setShowSubModal(true);
    };

    return (
        <main className="min-h-screen p-6 bg-slate-100/50 text-slate-900">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 text-slate-900">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-1">Product Categories</h1>
                    <p className="text-sm text-slate-500 font-medium">Organize and manage your service catalog structure.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white p-1 rounded-xl border border-gray-200 flex shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                    <button
                        onClick={() => { setEditingCategory(null); setShowAddModal(true); }}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span>Add Category</span>
                    </button>
                </div>
            </div>

            {/* Search & Statistics */}
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
                <div className="lg:col-span-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center">
                    <div className="p-3 text-slate-400"><Search size={20} /></div>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="flex-1 bg-transparent border-none outline-none font-medium text-slate-700 placeholder:text-slate-400"
                    />
                    <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
                    <select className="bg-transparent border-none outline-none text-sm font-bold text-slate-500 cursor-pointer hover:text-indigo-600 p-2">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200 flex items-center justify-between">
                    <div>
                        <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Total Categories</p>
                        <h3 className="text-3xl font-black">24</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Tag size={24} fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* GRID VIEW */}
            {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:border-indigo-100 transition duration-300 group relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-${cat.color}-50 rounded-bl-[100px] -mr-4 -mt-4 transition group-hover:bg-${cat.color}-100`}></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-50 flex items-center justify-center text-${cat.color}-600 text-2xl shadow-sm group-hover:scale-110 transition duration-300`}>
                                        <cat.icon size={24} />
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleEdit(cat)} className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition">
                                            <Pencil size={16} />
                                        </button>
                                        <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition">
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-slate-800 mb-1">{cat.name}</h3>
                                <p className="text-sm font-medium text-slate-500 mb-4">{cat.items} Subcategories</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                        {cat.status === 'Active' ? 'Active' : 'Inactive'}
                                    </span>
                                    <button onClick={() => handleSubcategories(cat)} className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                                        Manage <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* LIST VIEW */
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 animate-in fade-in duration-300">
                    {categories.map((cat) => (
                        <div key={cat.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition">
                            <div className={`w-12 h-12 rounded-xl bg-${cat.color}-50 flex items-center justify-center text-${cat.color}-600 text-xl`}>
                                <cat.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800">{cat.name}</h4>
                                <p className="text-xs font-medium text-slate-500 uppercase">{cat.items} Items</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {cat.status}
                                </span>
                                <div className="flex gap-2 border-l pl-4 border-gray-200">
                                    <button onClick={() => handleSubcategories(cat)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"><FolderTree size={20} /></button>
                                    <button onClick={() => handleEdit(cat)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"><Pencil size={20} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ADD/EDIT MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-slate-800">{editingCategory ? 'Edit Category' : 'New Category'}</h2>
                            <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category Name</label>
                                <input type="text" defaultValue={editingCategory?.name} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition" placeholder="e.g. Legal Services" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Icon Class (Phosphor)</label>
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl text-slate-500"><ImageIcon size={24} /></div>
                                    <input type="text" className="flex-1 px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500" placeholder="ph-buildings" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Color Theme</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500">
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="orange">Orange</option>
                                        <option value="purple">Purple</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Status</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
                            <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition">Cancel</button>
                            <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">Save Category</button>
                        </div>
                    </div>
                </div>
            )}

            {/* SUB-CATEGORY MODAL */}
            {showSubModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                        <div className="p-6 bg-slate-50 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-slate-800">{editingCategory?.name}</h2>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Manage Subcategories</p>
                            </div>
                            <button onClick={() => setShowSubModal(false)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"><X size={20} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-0">
                            <div className="p-4 bg-indigo-50/50 border-b border-indigo-100">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="New subcategory name..." className="flex-1 px-4 py-2 bg-white border border-indigo-200 rounded-lg text-sm font-bold text-indigo-900 placeholder:text-indigo-300 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-sm">Add</button>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 group transition">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs">{i}</div>
                                            <span className="font-bold text-slate-700 text-sm">Example Subcategory {i}</span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                            <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"><Pencil size={16} /></button>
                                            <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"><Trash size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                            <button onClick={() => setShowSubModal(false)} className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition">Done</button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}
