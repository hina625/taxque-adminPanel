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
        <div className="flex h-[calc(100vh-theme('spacing.16'))] bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-gray-100 font-sans overflow-hidden transition-colors duration-300">

            {/* SIDEBAR NAVIGATION */}
            <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col z-10 transition-colors">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center transition-colors">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white transition-colors">Knowledge Base</span>
                    </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <p className="px-3 text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2 transition-colors">Categories</p>
                    <nav className="space-y-1">
                        {INITIAL_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${activeCategory === cat.id ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700/50 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <cat.icon className={`w-5 h-5 transition-colors ${activeCategory === cat.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-gray-500 group-hover:text-slate-600 dark:group-hover:text-gray-300'}`} />
                                    {cat.name}
                                </div>
                                {cat.id !== 'all' && (
                                    <span className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs px-1.5 py-0.5 rounded text-slate-500 dark:text-gray-400 font-bold group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors">
                                        {faqs.filter(f => f.category === cat.id).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700 transition-colors">
                    <button className="w-full py-2.5 px-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-sm font-semibold flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> New Category
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                {/* Top Header */}
                <header className="h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-8 sticky top-0 z-10 shrink-0 transition-colors">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
                            {INITIAL_CATEGORIES.find(c => c.id === activeCategory)?.name || 'Search Results'}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-gray-400 font-medium mt-0.5 transition-colors">Manage questions and answers for your help center.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-64 bg-slate-100 dark:bg-gray-700 border-none rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                placeholder="Search questions..."
                            />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2 font-semibold transition-transform active:scale-95"
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
                                <div className="w-24 h-24 bg-slate-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 transition-colors">
                                    <Search className="w-10 h-10 text-slate-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">No results found</h3>
                                <p className="text-slate-500 dark:text-gray-400 mt-2 transition-colors">Try adjusting your search or category filter.</p>
                            </div>
                        ) : (
                            filteredFaqs.map(item => (
                                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all group">
                                    <div
                                        className="flex items-center justify-between p-5 cursor-pointer bg-white dark:bg-gray-800 transition-colors"
                                        onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="cursor-grab text-slate-300 dark:text-gray-600 hover:text-slate-500 dark:hover:text-gray-400 transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-bold text-slate-800 dark:text-white text-lg transition-colors">{item.question}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border transition-colors ${item.status === 'Published'
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                                        : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 border-slate-200 dark:border-gray-600'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 dark:text-gray-500 font-medium flex items-center gap-1 transition-colors">
                                                    <Tag className="w-3 h-3" />
                                                    {INITIAL_CATEGORIES.find(c => c.id === item.category)?.name || item.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleOpenModal(item); }}
                                                className="p-2 text-slate-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <div className="w-5 h-5" >✏️</div>
                                            </button>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 dark:text-gray-500 transition-all duration-300 ${expandedFaq === item.id ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>

                                    {expandedFaq === item.id && (
                                        <div className="border-t border-slate-50 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-900/30 px-5 py-5 text-sm text-slate-600 dark:text-gray-300 font-medium leading-relaxed pl-14 animate-in slide-in-from-top-2 duration-200 transition-colors">
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
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-colors" onClick={handleCloseModal}></div>
                    <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-gray-700 transition-colors">

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 rounded-t-2xl transition-colors">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{currentFaq.id ? 'Edit FAQ' : 'Create FAQ'}</h3>
                                <p className="text-sm text-slate-500 dark:text-gray-400 font-medium transition-colors">Add a new question to the knowledge base.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Question</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentFaq.question}
                                        onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600"
                                        placeholder="e.g. How do I change my billing cycle?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Category</label>
                                    <div className="relative">
                                        <select
                                            value={currentFaq.category}
                                            onChange={(e) => setCurrentFaq({ ...currentFaq, category: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none font-medium cursor-pointer transition-colors"
                                        >
                                            {INITIAL_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Status</label>
                                    <div className="relative">
                                        <select
                                            value={currentFaq.status}
                                            onChange={(e) => setCurrentFaq({ ...currentFaq, status: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none font-medium cursor-pointer transition-colors"
                                        >
                                            <option value="Published">Published</option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Answer</label>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                                    <div className="bg-slate-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 px-3 py-2 flex gap-2 transition-colors">
                                        {/* Fake Toolbar */}
                                        <div className="flex gap-1">
                                            {['B', 'I', 'U'].map((tool, i) => (
                                                <button key={i} type="button" className="w-7 h-7 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-gray-700 rounded text-xs font-bold transition-colors">
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
                                        className="w-full px-4 py-3 border-none bg-white dark:bg-gray-800 outline-none resize-none font-medium text-slate-600 dark:text-gray-300 leading-relaxed transition-colors"
                                        placeholder="Type the detailed answer here..."
                                    ></textarea>
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 rounded-b-2xl flex justify-between items-center transition-colors">
                            {currentFaq.id ? (
                                <button type="button" onClick={() => handleDelete(currentFaq.id)} className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-bold text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                                    <Trash className="w-4 h-4" /> Delete
                                </button>
                            ) : <div></div>}

                            <div className="flex gap-3 ml-auto">
                                <button onClick={handleCloseModal} className="px-6 py-2.5 text-slate-600 dark:text-gray-400 font-bold hover:bg-slate-200/50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">Cancel</button>
                                <button onClick={handleSave} className="px-6 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95">Save Changes</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default FAQsPage;
