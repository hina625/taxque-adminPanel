'use client';

import React, { useState } from 'react';
import {
    LayoutTemplate, Mail, Users, Settings, Plus,
    Send, Edit, Trash2, Eye, MousePointer2,
    AlertCircle, CheckCircle, Search, Filter,
    BarChart3, Calendar, MoreHorizontal, UserPlus
} from 'lucide-react';

const NewslettersPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSubscriberModal, setShowSubscriberModal] = useState(false);

    // Mock Data
    const NEWSLETTERS = [
        { id: 1, subject: "March Product Update", status: "sent", date: "Mar 15, 2024", audience: "All Users", openRate: "45%", clickRate: "12%" },
        { id: 2, subject: "Weekly Digest #42", status: "sent", date: "Mar 08, 2024", audience: "Subscribers", openRate: "38%", clickRate: "10%" },
        { id: 3, subject: "Special Offer Inside", status: "scheduled", date: "Mar 20, 2024", audience: "Paid Members", openRate: "-", clickRate: "-" },
        { id: 4, subject: "Community Highlights", status: "draft", date: "Created 2d ago", audience: "All Users", openRate: "-", clickRate: "-" },
    ];

    const SUBSCRIBERS = [
        { id: 1, email: "sarah.j@company.com", name: "Sarah Jenkins", status: "Active", joined: "Jan 12, 2024" },
        { id: 2, email: "mike.t@gmail.com", name: "Mike Tyson", status: "Active", joined: "Feb 05, 2024" },
        { id: 3, email: "alex.dev@tech.io", name: "Alex Developer", status: "Unsubscribed", joined: "Mar 01, 2024" },
        { id: 4, email: "lisa.w@design.net", name: "Lisa Wong", status: "Bounced", joined: "Mar 10, 2024" },
    ];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'sent': return 'emerald';
            case 'scheduled': return 'amber';
            case 'draft': return 'slate';
            case 'active': return 'emerald';
            case 'unsubscribed': return 'rose';
            case 'bounced': return 'orange';
            default: return 'slate';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-gray-900 pb-12 transition-colors duration-300">
            {/* Header */}
            <div className="mb-8 p-6">
                <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2 flex items-center gap-3 transition-colors">
                    <Mail className="text-indigo-600 dark:text-indigo-400" size={32} strokeWidth={2.5} /> MailFlow
                </h1>
                <p className="text-slate-500 dark:text-gray-400 font-medium transition-colors">Manage your newsletter campaigns and subscriber audience.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation (Desktop: Side, Mobile: Top) */}
                <div className="w-full lg:w-64 shrink-0 px-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 sticky top-6 transition-colors">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: LayoutTemplate },
                            { id: 'newsletters', label: 'Newsletters', icon: Send },
                            { id: 'subscribers', label: 'Subscribers', icon: Users },
                            { id: 'settings', label: 'Settings', icon: Settings },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all mb-1 ${activeTab === tab.id
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                    : 'text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700/50 hover:text-slate-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-end transition-colors">
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 dark:text-white transition-colors">Overview</h2>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors">Performance metrics at a glance.</p>
                                </div>
                                <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none">
                                    <Plus size={18} /> New Campaign
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 transition-colors">
                                        <Users size={20} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-800 dark:text-white mb-1 transition-colors">1,240</div>
                                    <div className="text-sm font-bold text-slate-500 dark:text-gray-400 transition-colors">Total Subscribers</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 transition-colors">
                                        <Eye size={20} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-800 dark:text-white mb-1 transition-colors">42.8%</div>
                                    <div className="text-sm font-bold text-slate-500 dark:text-gray-400 transition-colors">Average Open Rate</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 transition-colors">
                                        <MousePointer2 size={20} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-800 dark:text-white mb-1 transition-colors">12.5%</div>
                                    <div className="text-sm font-bold text-slate-500 dark:text-gray-400 transition-colors">Average Click Rate</div>
                                </div>
                            </div>

                            {/* Recent Campaigns Table */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700 transition-colors">
                                    <h3 className="font-bold text-slate-800 dark:text-white transition-colors">Recent Campaigns</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 dark:bg-gray-900/50 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase transition-colors">
                                            <tr>
                                                <th className="px-6 py-4 text-left">Campaign Name</th>
                                                <th className="px-6 py-4 text-left">Status</th>
                                                <th className="px-6 py-4 text-left">Sent Date</th>
                                                <th className="px-6 py-4 text-left">Open Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm transition-colors">
                                            {NEWSLETTERS.slice(0, 3).map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white transition-colors">{item.subject}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${getStatusColor(item.status)}-50 dark:bg-${getStatusColor(item.status)}-900/30 text-${getStatusColor(item.status)}-600 dark:text-${getStatusColor(item.status)}-400 capitalize transition-colors`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(item.status)}-500`}></span>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 dark:text-gray-400 font-medium transition-colors">{item.date}</td>
                                                    <td className="px-6 py-4 text-slate-800 dark:text-white font-bold transition-colors">{item.openRate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NEWSLETTERS TAB */}
                    {activeTab === 'newsletters' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={18} />
                                    <input type="text" placeholder="Search campaigns..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-gray-900 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 transition-colors" />
                                </div>
                                <div className="flex gap-2">
                                    {['All', 'Sent', 'Drafts'].map(filter => (
                                        <button key={filter} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 dark:bg-gray-900 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-700 dark:hover:text-gray-200 transition-all">
                                            {filter}
                                        </button>
                                    ))}
                                    <button onClick={() => setShowCreateModal(true)} className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none">
                                        <Plus size={16} /> Create New
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                                <table className="w-full">
                                    <thead className="bg-slate-50 dark:bg-gray-900/50 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase transition-colors">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Subject</th>
                                            <th className="px-6 py-4 text-left">Status</th>
                                            <th className="px-6 py-4 text-left">Audience</th>
                                            <th className="px-6 py-4 text-left">Date</th>
                                            <th className="px-6 py-4 text-left">Metrics</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm transition-colors">
                                        {NEWSLETTERS.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white transition-colors">{item.subject}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${getStatusColor(item.status)}-50 dark:bg-${getStatusColor(item.status)}-900/30 text-${getStatusColor(item.status)}-600 dark:text-${getStatusColor(item.status)}-400 capitalize transition-colors`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(item.status)}-500`}></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-gray-400 font-medium transition-colors">{item.audience}</td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-gray-400 font-medium transition-colors">{item.date}</td>
                                                <td className="px-6 py-4">
                                                    {item.openRate !== '-' ? (
                                                        <div className="flex gap-3 text-xs font-bold">
                                                            <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded transition-colors">O: {item.openRate}</span>
                                                            <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded transition-colors">C: {item.clickRate}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400 dark:text-gray-600 text-xs italic transition-colors">No data</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-slate-50 dark:hover:bg-gray-700/50 rounded-lg text-slate-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* SUBSCRIBERS TAB */}
                    {activeTab === 'subscribers' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 transition-colors" size={18} />
                                    <input type="text" placeholder="Search subscribers..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-gray-900 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 transition-colors" />
                                </div>
                                <button onClick={() => setShowSubscriberModal(true)} className="px-4 py-2 border-2 border-slate-100 dark:border-gray-700 text-slate-600 dark:text-gray-400 rounded-lg font-bold text-xs hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-2">
                                    <UserPlus size={16} /> Add Subscriber
                                </button>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                                <table className="w-full">
                                    <thead className="bg-slate-50 dark:bg-gray-900/50 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase transition-colors">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Email</th>
                                            <th className="px-6 py-4 text-left">Name</th>
                                            <th className="px-6 py-4 text-left">Status</th>
                                            <th className="px-6 py-4 text-left">Joined Date</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm transition-colors">
                                        {SUBSCRIBERS.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white transition-colors">{item.email}</td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-gray-400 font-medium transition-colors">{item.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${getStatusColor(item.status)}-50 dark:bg-${getStatusColor(item.status)}-900/30 text-${getStatusColor(item.status)}-600 dark:text-${getStatusColor(item.status)}-400 capitalize transition-colors`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(item.status)}-500`}></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-gray-400 font-medium transition-colors">{item.joined}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg text-slate-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <div className="max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
                            <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2 transition-colors">
                                <Settings className="text-slate-400 dark:text-gray-500" /> Newsletter Settings
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Publication Name</label>
                                    <input type="text" defaultValue="My Awesome Newsletter" className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Sender Email</label>
                                    <input type="email" defaultValue="hello@mailflow.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Reply-To Address</label>
                                    <input type="email" defaultValue="support@mailflow.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors" />
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end transition-colors">
                                    <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* CREATE NEWSLETTER MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white transition-colors">Draft Newsletter</h2>
                            <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-400 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-600 hover:text-slate-600 dark:hover:text-gray-200 transition-all">
                                <AlertCircle size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Subject Line</label>
                                <input type="text" placeholder="Enter compelling subject..." className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Audience</label>
                                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 transition-colors">
                                    <option className="bg-white dark:bg-gray-800">All Subscribers</option>
                                    <option className="bg-white dark:bg-gray-800">Paid Members</option>
                                    <option className="bg-white dark:bg-gray-800">Free Members</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Content Preview</label>
                                <textarea rows={5} placeholder="Start typing your newsletter content..." className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-slate-700 dark:text-white outline-none focus:border-indigo-500 resize-none transition-colors"></textarea>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none">Save as Draft</button>
                            <button onClick={() => setShowCreateModal(false)} className="px-6 py-3 border-2 border-slate-100 dark:border-gray-700 text-slate-600 dark:text-gray-400 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* CREATE SUBSCRIBER MODAL */}
            {showSubscriberModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white transition-colors">Add Subscriber</h2>
                            <button onClick={() => setShowSubscriberModal(false)} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-400 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-600 hover:text-slate-600 dark:hover:text-gray-200 transition-all">
                                <AlertCircle size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setShowSubscriberModal(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none">Add Person</button>
                            <button onClick={() => setShowSubscriberModal(false)} className="px-6 py-3 border-2 border-slate-100 dark:border-gray-700 text-slate-600 dark:text-gray-400 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NewslettersPage;
