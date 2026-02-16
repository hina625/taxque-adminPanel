'use client';

import React, { useState } from 'react';
import {
    BookOpen, Plus, Search, MoreVertical, ChevronDown,
    Trash, X, Check, Tag, CreditCard, Code, UserCog, List
} from 'lucide-react';

// Mock Data
const INITIAL_CATEGORIES = [
    { id: 'all', name: 'All FAQs', icon: List },
    { id: 'billing', name: 'Billing & Plans', icon: CreditCard },
    { id: 'technical', name: 'Technical Support', icon: Code },
    { id: 'account', name: 'Account Management', icon: UserCog }
];

const INITIAL_FAQS = [
    { id: 1, question: "How do I download my invoice?", answer: "Go to Billing > Invoices. You will see a list of all past invoices available for download as PDF.", category: "billing", status: "Published" },
    { id: 2, question: "Can I change my subscription plan?", answer: "Yes, you can upgrade or downgrade your plan at any time from the settings page.", category: "billing", status: "Published" },
    { id: 3, question: "How to integrate with Slack?", answer: "Navigate to Integrations, find Slack, and click 'Connect'. Follow the OAuth steps.", category: "technical", status: "Draft" },
    { id: 4, question: "Resetting 2FA credentials", answer: "If you lost your 2FA device, please contact support with your recovery codes to reset access.", category: "account", status: "Published" },
];

const FAQsPage = () => {
    const [faqs, setFaqs] = useState(INITIAL_FAQS);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFaq, setCurrentFaq] = useState<any>(null);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    // Filter Logic
    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handlers
    const handleOpenModal = (faq?: any) => {
        setCurrentFaq(faq || { id: '', question: '', answer: '', category: 'billing', status: 'Published' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentFaq(null);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentFaq.id) {
            // Edit
            setFaqs(faqs.map(f => f.id === currentFaq.id ? currentFaq : f));
        } else {
            // Create
            const newFaq = { ...currentFaq, id: faqs.length + 1 };
            setFaqs([...faqs, newFaq]);
        }
        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this FAQ?")) {
            setFaqs(faqs.filter(f => f.id !== id));
            handleCloseModal();
        }
    };

    return (
        <div className="flex h-[calc(100vh-theme('spacing.16'))] bg-slate-50 text-slate-800 font-sans overflow-hidden">

            {/* SIDEBAR NAVIGATION */}
            <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-indigo-700">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-slate-900">Knowledge Base</span>
                    </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
                    <nav className="space-y-1">
                        {INITIAL_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${activeCategory === cat.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                    {cat.name}
                                </div>
                                {cat.id !== 'all' && (
                                    <span className="bg-white border border-gray-200 text-xs px-1.5 py-0.5 rounded text-slate-500 font-bold group-hover:border-gray-300">
                                        {faqs.filter(f => f.category === cat.id).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button className="w-full py-2.5 px-4 rounded-xl border border-dashed border-gray-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm font-semibold flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> New Category
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex justify-between items-center px-8 sticky top-0 z-10 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {INITIAL_CATEGORIES.find(c => c.id === activeCategory)?.name || 'Search Results'}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">Manage questions and answers for your help center.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-64 bg-slate-100 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400"
                                placeholder="Search questions..."
                            />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-200 flex items-center gap-2 font-semibold transition-transform active:scale-95"
                        >
                            <Plus className="w-4 h-4" /> Add Question
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-6 pb-20">

                        {filteredFaqs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                    <Search className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">No results found</h3>
                                <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
                            </div>
                        ) : (
                            filteredFaqs.map(item => (
                                <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
                                    <div
                                        className="flex items-center justify-between p-5 cursor-pointer bg-white"
                                        onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="cursor-grab text-slate-300 hover:text-slate-500">
                                                <MoreVertical className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-bold text-slate-800 text-lg">{item.question}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${item.status === 'Published'
                                                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                            : 'bg-slate-100 text-slate-600 border-slate-200'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                    <Tag className="w-3 h-3" />
                                                    {INITIAL_CATEGORIES.find(c => c.id === item.category)?.name || item.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleOpenModal(item); }}
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <div className="w-5 h-5" >✏️</div>
                                            </button>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedFaq === item.id ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>

                                    {expandedFaq === item.id && (
                                        <div className="border-t border-slate-50 bg-slate-50/50 px-5 py-5 text-sm text-slate-600 font-medium leading-relaxed pl-14 animate-in slide-in-from-top-2 duration-200">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </main>

            {/* CREATE/EDIT MODAL */}
            {isModalOpen && currentFaq && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-2xl">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{currentFaq.id ? 'Edit FAQ' : 'Create FAQ'}</h3>
                                <p className="text-sm text-slate-500 font-medium">Add a new question to the knowledge base.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Question</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentFaq.question}
                                        onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                        placeholder="e.g. How do I change my billing cycle?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                    <div className="relative">
                                        <select
                                            value={currentFaq.category}
                                            onChange={(e) => setCurrentFaq({ ...currentFaq, category: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none bg-white font-medium cursor-pointer"
                                        >
                                            {INITIAL_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                                    <div className="relative">
                                        <select
                                            value={currentFaq.status}
                                            onChange={(e) => setCurrentFaq({ ...currentFaq, status: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none bg-white font-medium cursor-pointer"
                                        >
                                            <option value="Published">Published</option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Answer</label>
                                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                                    <div className="bg-slate-50 border-b border-gray-200 px-3 py-2 flex gap-2">
                                        {/* Fake Toolbar */}
                                        <div className="flex gap-1">
                                            {['B', 'I', 'U'].map((tool, i) => (
                                                <button key={i} type="button" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-200 rounded text-xs font-bold">
                                                    {tool}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <textarea
                                        rows={5}
                                        required
                                        value={currentFaq.answer}
                                        onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                                        className="w-full px-4 py-3 border-none outline-none resize-none font-medium text-slate-600 leading-relaxed"
                                        placeholder="Type the detailed answer here..."
                                    ></textarea>
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="px-8 py-5 border-t border-gray-100 bg-slate-50 rounded-b-2xl flex justify-between items-center">
                            {currentFaq.id ? (
                                <button type="button" onClick={() => handleDelete(currentFaq.id)} className="text-rose-600 hover:text-rose-700 font-bold text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors">
                                    <Trash className="w-4 h-4" /> Delete
                                </button>
                            ) : <div></div>}

                            <div className="flex gap-3 ml-auto">
                                <button onClick={handleCloseModal} className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200/50 rounded-xl transition-colors">Cancel</button>
                                <button onClick={handleSave} className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">Save Changes</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default FAQsPage;
