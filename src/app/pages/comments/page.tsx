'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    CheckCircle,
    Clock,
    AlertTriangle,
    Search,
    Filter,
    Trash2,
    MoreVertical,
    Reply,
    Edit2,
    Check,
    X
} from 'lucide-react';

interface Comment {
    id: number;
    author: string;
    email: string;
    avatarColor: string;
    content: string;
    postTitle: string;
    postCategory: string;
    status: 'Approved' | 'Pending' | 'Spam';
    date: string;
    replies?: {
        author: string;
        content: string;
        date: string;
    }[];
}

export default function CommentsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedComments, setSelectedComments] = useState<number[]>([]);

    // Mock Data
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: "Sarah Johnson",
            email: "sarah.j@example.com",
            avatarColor: "bg-indigo-500",
            content: "This article was extremely helpful! The breakdown of tax saving strategies is exactly what I needed for my small business. One question - does the section 80C limit include PPF?",
            postTitle: "10 Tax Saving Strategies for FY 2024-25",
            postCategory: "Tax Planning",
            status: "Approved",
            date: "2 hours ago",
            replies: [
                {
                    author: "Admin",
                    content: "Yes, Sarah! The ₹1.5L limit under Section 80C is inclusive of PPF contributions.",
                    date: "1 hour ago"
                }
            ]
        },
        {
            id: 2,
            author: "Rahul Verma",
            email: "rahul.v@gmail.com",
            avatarColor: "bg-emerald-500",
            content: "Great insights on GST registration. Could you please make a detailed post about compilation scheme eligibility?",
            postTitle: "Understanding GST Registration Process",
            postCategory: "GST",
            status: "Pending",
            date: "5 hours ago"
        },
        {
            id: 3,
            author: "Crypto King",
            email: "crypto.king@spam.com",
            avatarColor: "bg-red-500",
            content: "Buy Bitcoin now! Guaranteed 500% returns in 2 days. Click here: http://bit.ly/scam-link",
            postTitle: "Investment Basics for Beginners",
            postCategory: "Finance",
            status: "Spam",
            date: "1 day ago"
        },
        {
            id: 4,
            author: "Emily Chen",
            email: "emily.c@example.com",
            avatarColor: "bg-purple-500",
            content: "I've been using TaxQue for 3 months now and it has simplified my workflow significantly. Highly recommended!",
            postTitle: "Why TaxQue is the Best Tool for CAs",
            postCategory: "Product Updates",
            status: "Approved",
            date: "2 days ago"
        }
    ]);

    const handleStatusChange = (id: number, newStatus: 'Approved' | 'Pending' | 'Spam') => {
        setComments(comments.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            setComments(comments.filter(c => c.id !== id));
        }
    };

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedComments(comments.map(c => c.id));
        } else {
            setSelectedComments([]);
        }
    };

    const toggleSelectComment = (id: number) => {
        if (selectedComments.includes(id)) {
            setSelectedComments(selectedComments.filter(cid => cid !== id));
        } else {
            setSelectedComments([...selectedComments, id]);
        }
    };

    const filteredComments = activeTab === 'all'
        ? comments
        : comments.filter(c => c.status.toLowerCase() === activeTab);

    return (
        <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-indigo-600" />
                    Comments Management
                </h1>
                <p className="text-slate-500 mt-2">Manage, moderate, and reply to user comments across your blog posts.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Comments"
                    value={comments.length}
                    icon={<MessageSquare className="w-6 h-6 text-white" />}
                    bgClass="bg-gradient-to-br from-indigo-500 to-violet-500"
                />
                <StatCard
                    title="Approved"
                    value={comments.filter(c => c.status === 'Approved').length}
                    icon={<CheckCircle className="w-6 h-6 text-white" />}
                    bgClass="bg-gradient-to-br from-emerald-500 to-teal-500"
                />
                <StatCard
                    title="Pending"
                    value={comments.filter(c => c.status === 'Pending').length}
                    icon={<Clock className="w-6 h-6 text-white" />}
                    bgClass="bg-gradient-to-br from-amber-500 to-orange-500"
                />
                <StatCard
                    title="Spam"
                    value={comments.filter(c => c.status === 'Spam').length}
                    icon={<AlertTriangle className="w-6 h-6 text-white" />}
                    bgClass="bg-gradient-to-br from-red-500 to-rose-500"
                />
            </div>

            {/* Filters & Actions */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-slate-500" /> Filter Comments
                    </h3>
                    <div className="flex gap-2">
                        {['all', 'pending', 'approved', 'spam'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === tab
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search comments..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All Categories</option>
                        <option>Tax Planning</option>
                        <option>GST</option>
                        <option>Finance</option>
                    </select>
                    <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Custom Range</option>
                    </select>
                </div>
            </div>

            {/* Bulk Actions Bar (Visible when items selected) */}
            {selectedComments.length > 0 && (
                <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2 mb-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={selectedComments.length === comments.length && comments.length > 0}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-indigo-900">{selectedComments.length} selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="text-xs border-indigo-200 rounded-md py-1.5 px-3 bg-white text-indigo-700 font-medium focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Bulk Actions</option>
                            <option>Mark as Approved</option>
                            <option>Mark as Spam</option>
                            <option>Move to Trash</option>
                        </select>
                        <button className="p-2 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="px-6 py-4 w-10">
                                    <input
                                        type="checkbox"
                                        onChange={toggleSelectAll}
                                        checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                    />
                                </th>
                                <th className="px-6 py-4">Author</th>
                                <th className="px-6 py-4 w-1/3">Comment</th>
                                <th className="px-6 py-4">In Response To</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredComments.map((comment) => (
                                <tr key={comment.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 align-top">
                                        <input
                                            type="checkbox"
                                            checked={selectedComments.includes(comment.id)}
                                            onChange={() => toggleSelectComment(comment.id)}
                                            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 mt-1"
                                        />
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-lg ${comment.avatarColor} flex items-center justify-center text-white font-semibold text-sm shrink-0`}>
                                                {comment.author.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900">{comment.author}</h4>
                                                <p className="text-xs text-slate-500">{comment.email}</p>
                                                <p className="text-xs text-slate-400 mt-1">{comment.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-100">
                                            {comment.content}
                                        </div>
                                        {comment.replies && comment.replies.map((reply, idx) => (
                                            <div key={idx} className="mt-3 ml-4 bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400 text-xs">
                                                <strong className="text-indigo-700 block mb-1">{reply.author} <span className="text-indigo-400 font-normal">• {reply.date}</span></strong>
                                                <span className="text-slate-700">{reply.content}</span>
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                                                <Reply className="w-3 h-3" /> Reply
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                                                <Edit2 className="w-3 h-3" /> Quick Edit
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <a href="#" className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors block mb-1">
                                            {comment.postTitle}
                                        </a>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                                            {comment.postCategory}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <StatusBadge status={comment.status} />
                                    </td>
                                    <td className="px-6 py-4 align-top text-right">
                                        <div className="flex flex-col gap-2">
                                            {comment.status !== 'Approved' && (
                                                <button
                                                    onClick={() => handleStatusChange(comment.id, 'Approved')}
                                                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors w-full"
                                                >
                                                    <Check className="w-3 h-3" /> Approve
                                                </button>
                                            )}
                                            {comment.status === 'Approved' && (
                                                <button
                                                    onClick={() => handleStatusChange(comment.id, 'Pending')}
                                                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors w-full"
                                                >
                                                    <Clock className="w-3 h-3" /> Unapprove
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleStatusChange(comment.id, 'Spam')}
                                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors w-full"
                                            >
                                                <AlertTriangle className="w-3 h-3" /> Spam
                                            </button>
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors w-full"
                                            >
                                                <Trash2 className="w-3 h-3" /> Trash
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredComments.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No comments found matching your filters.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm">
                        &lt;
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-200 text-sm font-medium">
                        1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm">
                        2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm">
                        3
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, bgClass }: { title: string, value: number, icon: React.ReactNode, bgClass: string }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center gap-5 hover:-translate-y-1 transition-transform cursor-pointer">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${bgClass}`}>
                {icon}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
                <p className="text-sm font-medium text-slate-500">{title}</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        Pending: 'bg-amber-50 text-amber-700 border-amber-200',
        Spam: 'bg-red-50 text-red-700 border-red-200'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
            {status}
        </span>
    );
}
