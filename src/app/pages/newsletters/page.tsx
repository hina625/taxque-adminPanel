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
        <div className="min-h-screen bg-slate-50/50 pb-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-3">
                    <Mail className="text-indigo-600" size={32} strokeWidth={2.5} /> MailFlow
                </h1>
                <p className="text-slate-500 font-medium">Manage your newsletter campaigns and subscriber audience.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation (Desktop: Side, Mobile: Top) */}
                <div className="w-full lg:w-64 shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sticky top-6">
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
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
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
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-xl font-black text-slate-800">Overview</h2>
                                    <p className="text-sm text-slate-500">Performance metrics at a glance.</p>
                                </div>
                                <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-200">
                                    <Plus size={18} /> New Campaign
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                        <Users size={20} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-800 mb-1">1,240</div>
                                    <div className="text-sm font-bold text-slate-500">Total Subscribers</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                        <Eye size={20} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-800 mb-1">42.8%</div>
                                    <div className="text-sm font-bold text-slate-500">Average Open Rate</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                                        <MousePointer2 size={20} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-800 mb-1">12.5%</div>
                                    <div className="text-sm font-bold text-slate-500">Average Click Rate</div>
                                </div>
                            </div>

                            {/* Recent Campaigns Table */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="font-bold text-slate-800">Recent Campaigns</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                                            <tr>
                                                <th className="px-6 py-4 text-left">Campaign Name</th>
                                                <th className="px-6 py-4 text-left">Status</th>
                                                <th className="px-6 py-4 text-left">Sent Date</th>
                                                <th className="px-6 py-4 text-left">Open Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-sm">
                                            {NEWSLETTERS.slice(0, 3).map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                                    <td className="px-6 py-4 font-bold text-slate-800">{item.subject}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${getStatusColor(item.status)}-50 text-${getStatusColor(item.status)}-600 capitalize`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(item.status)}-500`}></span>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium">{item.date}</td>
                                                    <td className="px-6 py-4 text-slate-800 font-bold">{item.openRate}</td>
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
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" placeholder="Search campaigns..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                                </div>
                                <div className="flex gap-2">
                                    {['All', 'Sent', 'Drafts'].map(filter => (
                                        <button key={filter} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition">
                                            {filter}
                                        </button>
                                    ))}
                                    <button onClick={() => setShowCreateModal(true)} className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition flex items-center gap-2">
                                        <Plus size={16} /> Create New
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Subject</th>
                                            <th className="px-6 py-4 text-left">Status</th>
                                            <th className="px-6 py-4 text-left">Audience</th>
                                            <th className="px-6 py-4 text-left">Date</th>
                                            <th className="px-6 py-4 text-left">Metrics</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {NEWSLETTERS.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4 font-bold text-slate-800">{item.subject}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${getStatusColor(item.status)}-50 text-${getStatusColor(item.status)}-600 capitalize`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(item.status)}-500`}></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">{item.audience}</td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">{item.date}</td>
                                                <td className="px-6 py-4">
                                                    {item.openRate !== '-' ? (
                                                        <div className="flex gap-3 text-xs font-bold">
                                                            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">O: {item.openRate}</span>
                                                            <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">C: {item.clickRate}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs italic">No data</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition">
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
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" placeholder="Search subscribers..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                                </div>
                                <button onClick={() => setShowSubscriberModal(true)} className="px-4 py-2 border-2 border-slate-100 text-slate-600 rounded-lg font-bold text-xs hover:border-indigo-600 hover:text-indigo-600 transition flex items-center gap-2">
                                    <UserPlus size={16} /> Add Subscriber
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Email</th>
                                            <th className="px-6 py-4 text-left">Name</th>
                                            <th className="px-6 py-4 text-left">Status</th>
                                            <th className="px-6 py-4 text-left">Joined Date</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {SUBSCRIBERS.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4 font-bold text-slate-800">{item.email}</td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">{item.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${getStatusColor(item.status)}-50 text-${getStatusColor(item.status)}-600 capitalize`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(item.status)}-500`}></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">{item.joined}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition">
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
                        <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                <Settings className="text-slate-400" /> Newsletter Settings
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Publication Name</label>
                                    <input type="text" defaultValue="My Awesome Newsletter" className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Sender Email</label>
                                    <input type="email" defaultValue="hello@mailflow.com" className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Reply-To Address</label>
                                    <input type="email" defaultValue="support@mailflow.com" className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex justify-end">
                                    <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-800">Draft Newsletter</h2>
                            <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
                                <AlertCircle size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Subject Line</label>
                                <input type="text" placeholder="Enter compelling subject..." className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Audience</label>
                                <select className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500">
                                    <option>All Subscribers</option>
                                    <option>Paid Members</option>
                                    <option>Free Members</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Content Preview</label>
                                <textarea rows={5} placeholder="Start typing your newsletter content..." className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-medium text-slate-700 outline-none focus:border-indigo-500 resize-none"></textarea>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">Save as Draft</button>
                            <button onClick={() => setShowCreateModal(false)} className="px-6 py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* CREATE SUBSCRIBER MODAL */}
            {showSubscriberModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-800">Add Subscriber</h2>
                            <button onClick={() => setShowSubscriberModal(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
                                <AlertCircle size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500" />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setShowSubscriberModal(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">Add Person</button>
                            <button onClick={() => setShowSubscriberModal(false)} className="px-6 py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NewslettersPage;
