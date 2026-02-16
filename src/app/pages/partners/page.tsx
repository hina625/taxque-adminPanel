'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard, Users, FileText, Briefcase, CreditCard,
    BarChart3, UserPlus, Search, Edit, X, Save,
    CheckCircle, Clock, AlertCircle, ChevronRight,
    Mail, Phone, MapPin, Building, Award, Star,
    TrendingUp, Download, Filter, MoreVertical,
    Shield, DollarSign, Briefcase as BriefcaseIcon
} from 'lucide-react';

const PartnersPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAssociate, setSelectedAssociate] = useState<any>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    // Mock Data for Associates
    const ASSOCIATES = [
        {
            id: 'ASC-001',
            name: 'Rahul Sharma',
            email: 'rahul@taxque.com',
            phone: '+91-98765-11111',
            role: 'GST Specialist',
            status: 'Active',
            initials: 'RS',
            color: 'blue',
            stats: { active: 8, done: 45, rate: '88%' },
            joined: '15 Jan 2024',
            address: '123, Green Valley, Mumbai',
            bank: { name: 'HDFC Bank', account: '5020****6789' }
        },
        {
            id: 'ASC-002',
            name: 'Priya Kapoor',
            email: 'priya@taxque.com',
            phone: '+91-98765-22222',
            role: 'ITR Filing Expert',
            status: 'Active',
            initials: 'PK',
            color: 'purple',
            stats: { active: 12, done: 58, rate: '95%' },
            joined: '20 Feb 2024',
            address: '456, Blue Ridge, Pune',
            bank: { name: 'ICICI Bank', account: '1234****5678' }
        },
        {
            id: 'ASC-003',
            name: 'Amit Mehta',
            email: 'amit@taxque.com',
            phone: '+91-98765-33333',
            role: 'Company Formation',
            status: 'Active',
            initials: 'AM',
            color: 'emerald',
            stats: { active: 5, done: 32, rate: '82%' },
            joined: '10 Mar 2024',
            address: '789, Golden Heights, Delhi',
            bank: { name: 'SBI', account: '0000****1111' }
        }
    ];

    const handleViewAssociate = (associate: any) => {
        setSelectedAssociate(associate);
        setViewModalOpen(true);
    };

    const handleEditAssociate = (associate: any) => {
        setSelectedAssociate(associate);
        setEditModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 mb-2">Partner Management</h1>
                <p className="text-slate-500 font-medium">Manage associates, commissions, and performance reports.</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-1">
                {[
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { id: 'associates', label: 'Associates', icon: Users },
                    { id: 'commission', label: 'Commission', icon: DollarSign },
                    { id: 'applications', label: 'Applications', icon: FileText, count: 3 },
                    { id: 'assign', label: 'Assign Service', icon: Briefcase },
                    { id: 'reports', label: 'Reports', icon: BarChart3 },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-bold transition-all relative top-[1px] ${activeTab === tab.id
                                ? 'bg-white text-indigo-600 border border-gray-200 border-b-white shadow-[0_-2px_10px_rgba(0,0,0,0.02)]'
                                : 'text-slate-500 hover:text-indigo-600 hover:bg-white/50'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                        {tab.count && (
                            <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT: DASHBOARD */}
            {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Users size={24} strokeWidth={2.5} />
                                </div>
                                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">↑ 25%</span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Associates</p>
                            <h3 className="text-3xl font-black text-slate-800 mt-1">8</h3>
                            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">6 Active • 2 Inactive</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                    <FileText size={24} strokeWidth={2.5} />
                                </div>
                                <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2 py-1 rounded-lg">Urgent</span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Applications</p>
                            <h3 className="text-3xl font-black text-slate-800 mt-1">3</h3>
                            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">Awaiting Review</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <DollarSign size={24} strokeWidth={2.5} />
                                </div>
                                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">This Month</span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Commission Paid</p>
                            <h3 className="text-3xl font-black text-slate-800 mt-1">₹38K</h3>
                            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">From 45 Services</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                    <CheckCircle size={24} strokeWidth={2.5} />
                                </div>
                                <span className="bg-purple-50 text-purple-600 text-xs font-bold px-2 py-1 rounded-lg">Today</span>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Completed Services</p>
                            <h3 className="text-3xl font-black text-slate-800 mt-1">7</h3>
                            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full" style={{ width: '88%' }}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">88% Success Rate</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-slate-800 mb-5">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <button onClick={() => setShowAddModal(true)} className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-bold font-sm hover:translate-y-[-2px] transition shadow-lg shadow-teal-200">
                                <UserPlus size={20} /> Add Associate
                            </button>
                            <button
                                onClick={() => setActiveTab('applications')}
                                className="flex items-center justify-center gap-2 p-4 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold font-sm hover:border-indigo-600 hover:text-indigo-600 transition"
                            >
                                <Search size={20} /> Review Applications
                            </button>
                            <button
                                onClick={() => setActiveTab('commission')}
                                className="flex items-center justify-center gap-2 p-4 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold font-sm hover:border-indigo-600 hover:text-indigo-600 transition"
                            >
                                <DollarSign size={20} /> Commission Setup
                            </button>
                            <button className="flex items-center justify-center gap-2 p-4 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold font-sm hover:border-indigo-600 hover:text-indigo-600 transition">
                                <Mail size={20} /> Send Announcement
                            </button>
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-slate-800 mb-5">Top Performers This Month</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { name: 'Priya Kapoor', role: '12 Services • ₹15,600', rate: '95%', rank: '🏆', color: 'amber' },
                                { name: 'Rahul Sharma', role: '8 Services • ₹10,400', rate: '88%', rank: '🥈', color: 'gray' },
                                { name: 'Amit Mehta', role: '5 Services • ₹6,500', rate: '82%', rank: '🥉', color: 'orange' },
                            ].map((p, i) => (
                                <div key={i} className={`p-5 rounded-xl border-2 ${p.color === 'amber' ? 'bg-amber-50/50 border-amber-100' :
                                        p.color === 'gray' ? 'bg-slate-50 border-slate-100' : 'bg-orange-50/50 border-orange-100'
                                    }`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-3xl">{p.rank}</div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{p.name}</h4>
                                            <p className="text-xs text-slate-500 font-semibold">{p.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-400">Success Rate</span>
                                        <span className={`font-black text-${p.color === 'amber' ? 'amber' : p.color === 'gray' ? 'slate' : 'orange'}-600`}>{p.rate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-slate-800 mb-5">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { text: 'New application received from Rahul Verma', sub: '2 hours ago', action: 'Review Now', color: 'blue' },
                                { text: 'Priya Kapoor completed GST Filing service', sub: '4 hours ago • Commission: ₹1,300', color: 'emerald' },
                                { text: 'Document submitted by Amit Mehta for review', sub: '5 hours ago', action: 'View Document', color: 'purple' },
                            ].map((item, i) => (
                                <div key={i} className={`flex gap-4 p-4 rounded-xl border ${item.color === 'blue' ? 'bg-blue-50/50 border-blue-100' :
                                        item.color === 'emerald' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-purple-50/50 border-purple-100'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.color === 'blue' ? 'bg-blue-500' :
                                            item.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'
                                        }`}></div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-800">{item.text}</p>
                                        <p className="text-xs text-slate-500 font-medium mt-1">
                                            {item.sub} {item.action && <span className={`ml-2 text-${item.color}-600 hover:underline cursor-pointer`}>{item.action}</span>}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}

            {/* TAB CONTENT: ASSOCIATES */}
            {activeTab === 'associates' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-black text-slate-800">Associates List</h2>
                            <p className="text-sm text-slate-500 font-medium">View and manage all registered associates.</p>
                        </div>
                        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition flex items-center gap-2">
                            <UserPlus size={18} /> Add New
                        </button>
                    </div>

                    {/* Search */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                        <Search className="text-slate-400" size={20} />
                        <input type="text" placeholder="Search associates by name, email, specialization..." className="flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400" />
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><Filter size={20} /></button>
                    </div>

                    {/* Associate Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ASSOCIATES.map((associate) => (
                            <div key={associate.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg bg-gradient-to-br ${associate.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                                associate.color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-emerald-500 to-emerald-600'
                                            }`}>
                                            {associate.initials}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg text-slate-800">{associate.name}</h3>
                                            <p className="text-xs text-slate-500 font-bold">{associate.id}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> {associate.status}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Mail size={14} className="text-slate-400" /> {associate.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Phone size={14} className="text-slate-400" /> {associate.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Award size={14} className="text-slate-400" /> {associate.role}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    <div className="text-center bg-slate-50 p-2 rounded-lg">
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Active</div>
                                        <div className="font-black text-slate-800">{associate.stats.active}</div>
                                    </div>
                                    <div className="text-center bg-slate-50 p-2 rounded-lg">
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Done</div>
                                        <div className="font-black text-slate-800">{associate.stats.done}</div>
                                    </div>
                                    <div className="text-center bg-slate-50 p-2 rounded-lg">
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Rate</div>
                                        <div className="font-black text-emerald-600">{associate.stats.rate}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button onClick={() => handleViewAssociate(associate)} className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition">View Profile</button>
                                    <button onClick={() => handleEditAssociate(associate)} className="flex-1 py-2 rounded-lg bg-amber-50 text-amber-600 text-xs font-bold hover:bg-amber-100 transition">Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB CONTENT: COMMISSION */}
            {activeTab === 'commission' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Total Earned', value: '₹52,000', sub: 'All Time', color: 'emerald' },
                            { title: 'This Month', value: '₹10,400', sub: 'From 8 Services', color: 'blue' },
                            { title: 'Pending', value: '₹4,200', sub: 'To be paid', color: 'amber' },
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <p className={`text-xs font-bold text-${card.color}-600 uppercase tracking-wider mb-2`}>{card.title}</p>
                                <h3 className="text-4xl font-black text-slate-800 mb-2">{card.value}</h3>
                                <p className="text-xs text-slate-400 font-medium">{card.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Commission Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                            <DollarSign className="text-indigo-600" /> Commission Rate Setup
                        </h3>

                        <div className="space-y-8">
                            {[
                                { title: 'GST Services', items: [{ l: 'GST Registration', v: 1300 }, { l: 'GST Filing', v: 800 }] },
                                { title: 'ITR Services', items: [{ l: 'ITR Filing', v: 1000 }, { l: 'ITR Revision', v: 600 }] },
                                { title: 'Company Formation', items: [{ l: 'Company Registration', v: 3500 }, { l: 'LLP Formation', v: 3000 }] }
                            ].map((section, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                                    <h4 className="font-bold text-slate-800 mb-4">{section.title}</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {section.items.map((field, fIdx) => (
                                            <div key={fIdx}>
                                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">{field.l} Commission</label>
                                                <div className="flex gap-2">
                                                    <span className="flex items-center justify-center w-10 bg-white border border-gray-300 rounded-lg text-slate-500 font-bold">₹</span>
                                                    <input type="number" defaultValue={field.v} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-bold text-slate-700" />
                                                    <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white text-sm font-medium">
                                                        <option>Fixed</option>
                                                        <option>%</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                Save Commission Rates
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW MODAL */}
            {viewModalOpen && selectedAssociate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800">Associate Details</h2>
                                <p className="text-sm font-medium text-slate-500">{selectedAssociate.id}</p>
                            </div>
                            <button onClick={() => setViewModalOpen(false)} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Left Column: Profile */}
                                <div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                                        <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl mb-4 bg-gradient-to-br ${selectedAssociate.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                                selectedAssociate.color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-emerald-500 to-emerald-600'
                                            }`}>
                                            {selectedAssociate.initials}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-800">{selectedAssociate.name}</h3>
                                        <p className="text-sm text-slate-500 font-medium mb-4">{selectedAssociate.role}</p>
                                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Active Status</span>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Email</label>
                                            <div className="text-sm font-bold text-slate-700">{selectedAssociate.email}</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Phone</label>
                                            <div className="text-sm font-bold text-slate-700">{selectedAssociate.phone}</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Joined</label>
                                            <div className="text-sm font-bold text-slate-700">{selectedAssociate.joined}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Detailed Info */}
                                <div className="md:col-span-2 space-y-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-4 border border-gray-100 rounded-xl text-center bg-blue-50/50">
                                            <div className="text-3xl font-black text-blue-600 mb-1">{selectedAssociate.stats.active}</div>
                                            <div className="text-xs font-bold text-slate-400 uppercase">Active Cases</div>
                                        </div>
                                        <div className="p-4 border border-gray-100 rounded-xl text-center bg-emerald-50/50">
                                            <div className="text-3xl font-black text-emerald-600 mb-1">{selectedAssociate.stats.done}</div>
                                            <div className="text-xs font-bold text-slate-400 uppercase">Completed</div>
                                        </div>
                                        <div className="p-4 border border-gray-100 rounded-xl text-center bg-purple-50/50">
                                            <div className="text-3xl font-black text-purple-600 mb-1">{selectedAssociate.stats.rate}</div>
                                            <div className="text-xs font-bold text-slate-400 uppercase">Success Rate</div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-100 rounded-2xl p-6">
                                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <MapPin size={18} className="text-slate-400" /> Address Details
                                        </h4>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{selectedAssociate.address}</p>
                                    </div>

                                    <div className="bg-white border border-gray-100 rounded-2xl p-6">
                                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <CreditCard size={18} className="text-slate-400" /> Bank Information
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Bank Name</label>
                                                <div className="text-sm font-bold text-slate-700">{selectedAssociate.bank.name}</div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Account Number</label>
                                                <div className="text-sm font-bold text-slate-700 font-mono">{selectedAssociate.bank.account}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => { setViewModalOpen(false); handleEditAssociate(selectedAssociate); }} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                            Edit Profile
                                        </button>
                                        <button onClick={() => setViewModalOpen(false)} className="px-6 py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL PLACEHOLDER (Basic implementation similar to View) */}
            {editModalOpen && selectedAssociate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-black text-slate-800 mb-6">Edit Associate</h2>
                        <p className="text-slate-500 mb-8">Editing profile for <span className="font-bold text-slate-800">{selectedAssociate.name}</span></p>

                        <div className="space-y-4">
                            <input type="text" defaultValue={selectedAssociate.name} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500" placeholder="Full Name" />
                            <input type="email" defaultValue={selectedAssociate.email} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500" placeholder="Email Address" />
                            <input type="text" defaultValue={selectedAssociate.role} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500" placeholder="Role / Specialization" />
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setEditModalOpen(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">Save Changes</button>
                            <button onClick={() => setEditModalOpen(false)} className="px-6 py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Other Tabs Placeholder */}
            {['applications', 'assign', 'reports'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                        <BriefcaseIcon size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Coming Soon</h3>
                    <p className="text-slate-500">The {activeTab} module is currently under development.</p>
                </div>
            )}

        </div>
    );
};

export default PartnersPage;
