"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    Star,
    CheckCircle,
    Trash,
    PencilSimple,
    PlusCircle,
    MagnifyingGlass,
    Funnel,
    SortAscending,
    SortDescending,
    GoogleLogo,
    PaperPlaneRight,
    X,
    ChatCircle,
    Tray,
    Warning
} from '@phosphor-icons/react';

// --- Types ---

interface Testimonial {
    id: number;
    name: string;
    title: string;
    avatar: string;
    text: string;
    rating: number;
    status: 'published' | 'draft';
    featured: boolean;
    date: string;
    source: string;
    externalId: string;
    isVerified: boolean;
}

// --- Mock Data ---

const INITIAL_TESTIMONIALS: Testimonial[] = [
    { id: 1, name: "John Smith", title: "CEO, Tech Solutions Inc.", avatar: "JS", text: "The platform has completely transformed how we manage our projects. The interface is intuitive and the customer support is exceptional.", rating: 5, status: "published", featured: true, date: "2023-10-15", source: "https://www.google.com/review/jsmith", externalId: "GR12345", isVerified: true },
    { id: 2, name: "Sarah Johnson", title: "Marketing Director", avatar: "SJ", text: "Our team's productivity has increased by 40% since implementing this solution. Highly recommended for any growing business.", rating: 5, status: "published", featured: true, date: "2023-10-12", source: "https://www.internalcrm.com/review/sj2023", externalId: "CR9876", isVerified: true },
    { id: 3, name: "Mike Wilson", title: "Founder, StartupXYZ", avatar: "MW", text: "The best decision we made for our startup. The features are exactly what we needed and the pricing is very reasonable.", rating: 4, status: "published", featured: false, date: "2023-10-10", source: "Manual Client Entry", externalId: "", isVerified: false },
    { id: 5, name: "Alex Chen", title: "CTO, Innovate Co.", avatar: "AC", text: "The API integration was seamless and the documentation is comprehensive. Great product overall.", rating: 4, status: "draft", featured: false, date: "2023-10-05", source: "https://facebook.com/review/alex", externalId: "FB54321", isVerified: false },
];

// --- Component ---

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

    // Filters
    const [statusFilter, setStatusFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [sortFilter, setSortFilter] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');

    // Modals
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isFetchModalOpen, setIsFetchModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Form States
    const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Notifications
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    // --- Computed ---

    const stats = useMemo(() => {
        return {
            total: testimonials.length,
            published: testimonials.filter(t => t.status === 'published').length,
            draft: testimonials.filter(t => t.status === 'draft').length,
            featured: testimonials.filter(t => t.featured).length,
            verified: testimonials.filter(t => t.isVerified).length
        };
    }, [testimonials]);

    const filteredTestimonials = useMemo(() => {
        return testimonials.filter(t => {
            if (statusFilter === 'featured' && !t.featured) return false;
            if (statusFilter === 'verified' && !t.isVerified) return false;
            if (statusFilter && statusFilter !== 'featured' && statusFilter !== 'verified' && t.status !== statusFilter) return false;
            if (ratingFilter && t.rating !== parseInt(ratingFilter)) return false;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    t.name.toLowerCase().includes(query) ||
                    t.title.toLowerCase().includes(query) ||
                    t.text.toLowerCase().includes(query) ||
                    t.externalId.toLowerCase().includes(query)
                );
            }
            return true;
        }).sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            if (sortFilter === 'featured') return (b.featured === a.featured) ? dateB - dateA : (b.featured ? 1 : -1);
            if (sortFilter === 'rating') return b.rating - a.rating;
            if (sortFilter === 'oldest') return dateA - dateB;
            return dateB - dateA; // newest
        });
    }, [testimonials, statusFilter, ratingFilter, sortFilter, searchQuery]);

    // --- Handlers ---

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Review Modal
    const openReviewModal = (testimonial?: Testimonial) => {
        if (testimonial) {
            setCurrentTestimonial(testimonial);
            setIsEditing(true);
        } else {
            setCurrentTestimonial({
                name: '', title: '', text: '', rating: 5, source: '', externalId: '',
                status: 'published', featured: false, isVerified: false
            });
            setIsEditing(false);
        }
        setIsReviewModalOpen(true);
    };

    const handleSaveReview = (e: React.FormEvent) => {
        e.preventDefault();
        const data = currentTestimonial;

        if (!data.name || !data.text) {
            showNotification('Name and Review Text are required.', 'error');
            return;
        }

        if (isEditing && data.id) {
            setTestimonials(prev => prev.map(t => t.id === data.id ? { ...t, ...data } as Testimonial : t));
            showNotification(`Review by ${data.name} updated successfully!`, 'success');
        } else {
            const newId = (testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) : 0) + 1;
            const newTestimonial: Testimonial = {
                ...data,
                id: newId,
                avatar: data.name.substring(0, 2).toUpperCase(),
                date: new Date().toISOString().split('T')[0]
            } as Testimonial;
            setTestimonials(prev => [...prev, newTestimonial]);
            showNotification(`New review by ${data.name} added!`, 'success');
        }
        setIsReviewModalOpen(false);
    };

    // Featured Toggle
    const toggleFeatured = (id: number) => {
        setTestimonials(prev => prev.map(t => {
            if (t.id === id) {
                const newFeatured = !t.featured;
                showNotification(`Review by ${t.name} ${newFeatured ? 'featured' : 'unfeatured'}!`, 'info');
                return { ...t, featured: newFeatured };
            }
            return t;
        }));
    };

    // Delete
    const openDeleteModal = (id: number) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            const t = testimonials.find(t => t.id === deleteId);
            setTestimonials(prev => prev.filter(t => t.id !== deleteId));
            showNotification(`Review by ${t?.name || 'Unknown'} deleted permanently.`, 'error');
            setDeleteId(null);
            setIsDeleteModalOpen(false);
        }
    };

    // Simulation Handlers
    const handleFetchReviews = () => {
        setIsFetchModalOpen(false);
        showNotification('Simulating API call to fetch reviews from GOOGLE...', 'info');

        setTimeout(() => {
            const newReviews: Testimonial[] = [
                { id: Date.now() + 1, name: "New Google User", title: "External Source", avatar: "NU", text: "Got exactly what I needed. Highly recommend this service.", rating: 5, status: "draft", featured: false, date: new Date().toISOString().split('T')[0], source: "https://google.com/review/newa", externalId: "GNEW1", isVerified: true },
                { id: Date.now() + 2, name: "Anonymous Client", title: "Internal Form", avatar: "AC", text: "Great value, minor delay in delivery.", rating: 4, status: "draft", featured: false, date: new Date().toISOString().split('T')[0], source: "Internal CRM API", externalId: "CNEW2", isVerified: true }
            ];
            setTestimonials(prev => [...prev, ...newReviews]);
            showNotification(`Successfully imported ${newReviews.length} new reviews from GOOGLE.`, 'success');
        }, 1500);
    };

    const handleSendRequest = (e: React.FormEvent) => {
        e.preventDefault();
        setIsRequestModalOpen(false);
        showNotification('Request sent successfully!', 'success');
    };

    // Only for avatar colors
    const getAvatarColor = (name: string) => {
        const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500', 'bg-blue-500'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa] p-8 font-sans text-slate-800">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white/90 backdrop-blur-xl p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-4 mb-2">
                            Review Automation Dashboard
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">Centralized management for user reviews with advanced filtering and verification.</p>
                    </div>
                    <button onClick={() => openReviewModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 flex items-center gap-2 font-bold transition-all active:scale-95">
                        <PlusCircle weight="bold" size={20} />
                        Add New Review
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div onClick={() => setStatusFilter('')} className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl shadow-sm border border-slate-200 cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl shadow-lg shadow-indigo-200">
                                <ChatCircle weight="fill" />
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-slate-800">{stats.total}</div>
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Total Reviews</div>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => setStatusFilter('published')} className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl shadow-sm border border-slate-200 cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xl shadow-lg shadow-emerald-200">
                                <CheckCircle weight="fill" />
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-slate-800">{stats.published}</div>
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Published</div>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => setStatusFilter('draft')} className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl shadow-sm border border-slate-200 cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-pink-500 text-white flex items-center justify-center text-xl shadow-lg shadow-pink-200">
                                <Tray weight="fill" />
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-slate-800">{stats.draft}</div>
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Drafts Pending</div>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => setStatusFilter('featured')} className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl shadow-sm border border-slate-200 cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-white flex items-center justify-center text-xl shadow-lg shadow-orange-200">
                                <Star weight="fill" />
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-slate-800">{stats.featured}</div>
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Featured</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Utility Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200">
                    <button onClick={() => setStatusFilter('draft')} className="bg-gradient-to-r from-amber-400 to-rose-500 text-white px-5 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <Tray weight="bold" /> Go to Drafts ({stats.draft})
                    </button>
                    <button onClick={() => setIsFetchModalOpen(true)} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <GoogleLogo weight="bold" /> Fetch Reviews
                    </button>
                    <button onClick={() => setIsRequestModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <PaperPlaneRight weight="bold" /> Send Request
                    </button>
                </div>

                {/* Filtering Panel */}
                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 appearance-none"
                            >
                                <option value="">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="featured">Featured</option>
                                <option value="verified">Verified Only</option>
                            </select>
                            <Funnel className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" weight="bold" />
                        </div>
                        <div className="relative">
                            <select
                                value={ratingFilter}
                                onChange={(e) => setRatingFilter(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 appearance-none"
                            >
                                <option value="">All Ratings</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                            <Star className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" weight="bold" />
                        </div>
                        <div className="relative">
                            <select
                                value={sortFilter}
                                onChange={(e) => setSortFilter(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 appearance-none"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="rating">Highest Rating</option>
                                <option value="featured">Featured First</option>
                            </select>
                            {sortFilter === 'newest' ? <SortDescending className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" weight="bold" /> : <SortAscending className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" weight="bold" />}
                        </div>
                    </div>
                    <div className="relative">
                        <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" weight="bold" size={18} />
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Search customer, text, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="p-7 bg-white/60">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${getAvatarColor(testimonial.name)} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 leading-tight">{testimonial.name}</h4>
                                        <p className="text-sm font-medium text-slate-500">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-7 pt-0">
                                <div className="text-xs text-slate-400 font-medium flex items-center gap-2 mb-4">
                                    {testimonial.isVerified && <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold"><CheckCircle weight="fill" /> Verified</span>}
                                    <span>Source: {testimonial.source.startsWith('http') ? <a href={testimonial.source} target="_blank" className="text-indigo-600 hover:underline">Link</a> : (testimonial.source || 'Manual')}</span>
                                    {testimonial.externalId && <span className="text-slate-300">(ID: {testimonial.externalId})</span>}
                                </div>

                                <div className="flex text-amber-400 text-sm gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} weight={i < testimonial.rating ? "fill" : "regular"} className={i < testimonial.rating ? "text-amber-400" : "text-slate-300"} />
                                    ))}
                                </div>

                                <p className="text-slate-700 italic text-base leading-relaxed mb-6 pl-4 border-l-4 border-indigo-100 relative">
                                    <span className="absolute -top-3 left-1 text-4xl text-indigo-100 font-serif leading-none">“</span>
                                    {testimonial.text}
                                </p>

                                <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${testimonial.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {testimonial.status}
                                        </span>
                                        {testimonial.featured && <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Star weight="fill" /> Featured</span>}
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => openReviewModal(testimonial)} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110">
                                            <PencilSimple weight="bold" />
                                        </button>
                                        <button onClick={() => toggleFeatured(testimonial.id)} className={`w-9 h-9 flex items-center justify-center rounded-full transition-all transform hover:scale-110 ${testimonial.featured ? 'bg-amber-100 text-amber-500 hover:bg-amber-500 hover:text-white' : 'bg-slate-100 text-slate-400 hover:bg-amber-500 hover:text-white'}`}>
                                            <Star weight={testimonial.featured ? "fill" : "bold"} />
                                        </button>
                                        <button onClick={() => openDeleteModal(testimonial.id)} className="w-9 h-9 flex items-center justify-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110">
                                            <Trash weight="bold" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTestimonials.length === 0 && (
                    <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <ChatCircle size={40} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No Reviews Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mb-6">Try adjusting your filters or search criteria. You can also add a new review manually.</p>
                        <button onClick={() => { setStatusFilter(''); setRatingFilter(''); setSortFilter('newest'); setSearchQuery(''); }} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-left">
                    <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                {isEditing ? <PencilSimple className="text-indigo-600" weight="bold" /> : <PlusCircle className="text-indigo-600" weight="bold" />}
                                {isEditing ? 'Edit Review' : 'Add New Review'}
                            </h3>
                            <button onClick={() => setIsReviewModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X weight="bold" size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveReview} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Customer Name <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Enter customer name"
                                    value={currentTestimonial.name}
                                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Title/Company</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="CEO, Company Name"
                                    value={currentTestimonial.title}
                                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Review Text <span className="text-rose-500">*</span></label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                    placeholder="Enter testimonial..."
                                    value={currentTestimonial.text}
                                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, text: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setCurrentTestimonial({ ...currentTestimonial, rating: star })}
                                            className="focus:outline-none transition-transform active:scale-95"
                                        >
                                            <Star
                                                size={28}
                                                weight={(currentTestimonial.rating || 0) >= star ? "fill" : "regular"}
                                                className={(currentTestimonial.rating || 0) >= star ? "text-amber-400" : "text-slate-300"}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-2 text-sm font-bold text-slate-500">{(currentTestimonial.rating || 0)} Stars</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Source Link</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="Google Review URL"
                                        value={currentTestimonial.source}
                                        onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, source: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">External ID</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="GNEW1"
                                        value={currentTestimonial.externalId}
                                        onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, externalId: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                                        checked={currentTestimonial.status === 'published'}
                                        onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, status: e.target.checked ? 'published' : 'draft' })}
                                    />
                                    <span className="text-sm font-bold text-slate-700">Publish on website</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                                        checked={currentTestimonial.featured}
                                        onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, featured: e.target.checked })}
                                    />
                                    <span className="text-sm font-bold text-slate-700">Featured Review</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                                        checked={currentTestimonial.isVerified}
                                        onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, isVerified: e.target.checked })}
                                    />
                                    <span className="text-sm font-bold text-slate-700">Verified Source</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors">
                                    {isEditing ? 'Save Changes' : 'Create Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Fetch Modal */}
            {isFetchModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-center">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
                        <button onClick={() => setIsFetchModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X weight="bold" size={24} />
                        </button>
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                            <GoogleLogo weight="bold" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Fetch External Reviews</h3>
                        <p className="text-slate-500 mb-8">Simulate API integration to pull new reviews directly from Google Business Profile.</p>

                        <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                            <h4 className="font-bold text-slate-700 mb-4">Google Business Profile</h4>
                            <button onClick={handleFetchReviews} className="w-full bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                                <GoogleLogo weight="bold" className="text-rose-500" /> Fetch Google Reviews
                            </button>
                        </div>

                        <button onClick={() => setIsFetchModalOpen(false)} className="text-slate-500 font-bold hover:text-slate-700">Close</button>
                    </div>
                </div>
            )}

            {/* Send Request Modal */}
            {isRequestModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-left">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
                        <button onClick={() => setIsRequestModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X weight="bold" size={24} />
                        </button>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl">
                                <PaperPlaneRight weight="fill" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Send Review Request</h3>
                                <p className="text-xs text-slate-500">Send a personalized email request.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSendRequest} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Recipient Email</label>
                                <input type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-colors" placeholder="customer@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Name (Optional)</label>
                                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button type="button" onClick={() => setIsRequestModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-colors">Send Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-center">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl">
                        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                            <Trash weight="fill" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Review?</h3>
                        <p className="text-slate-500 mb-6">Are you sure you want to permanently delete this review? This action cannot be undone.</p>

                        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl text-left mb-8">
                            <div className="flex items-start gap-3">
                                <Warning className="text-rose-600 mt-0.5" weight="bold" size={20} />
                                <p className="text-sm text-rose-800 font-medium">This will permanently remove the review from your database.</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                            <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200 transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-10 right-10 z-[100] animate-slide-up">
                    <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border ${notification.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : notification.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-slate-800 border-slate-700 text-white'}`}>
                        {notification.type === 'success' && <CheckCircle weight="fill" size={24} className="text-emerald-500" />}
                        {notification.type === 'error' && <Warning weight="fill" size={24} className="text-rose-500" />}
                        {notification.type === 'info' && <ChatCircle weight="fill" size={24} className="text-blue-400" />}
                        <div className="font-bold text-sm">{notification.message}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
