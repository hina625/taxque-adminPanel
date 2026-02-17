"use client";

import React, { useState } from 'react';
import {
    SquaresFour,
    Files,
    Users,
    CurrencyInr,
    Briefcase,
    FileText,
    Receipt,
    ChartBar,
    Bell,
    MagnifyingGlass,
    UserPlus,
    X,
    CheckCircle,
    TrendUp,
    Warning,
    Clock,
    Envelope,
    Phone,
    Certificate,
    PencilSimple,
    PlusCircle,
    Funnel
} from '@phosphor-icons/react';

// --- Types ---

interface Associate {
    id: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    initials: string;
    color: string;
    status: 'Active' | 'Pending' | 'Rejected';
    activeCount: number;
    doneCount: number;
    rate: number;
}

const ASSOCIATES_DATA: Associate[] = [
    {
        id: 'ASC-001',
        name: 'Rahul Sharma',
        email: 'rahul@taxque.com',
        phone: '+91-98765-11111',
        specialization: 'GST Specialist',
        initials: 'RS',
        color: 'bg-blue-500',
        status: 'Active',
        activeCount: 8,
        doneCount: 45,
        rate: 88
    },
    {
        id: 'ASC-002',
        name: 'Priya Kapoor',
        email: 'priya@taxque.com',
        phone: '+91-98765-22222',
        specialization: 'ITR Filing Expert',
        initials: 'PK',
        color: 'bg-purple-500',
        status: 'Active',
        activeCount: 12,
        doneCount: 58,
        rate: 95
    },
    {
        id: 'ASC-003',
        name: 'Amit Mehta',
        email: 'amit@taxque.com',
        phone: '+91-98765-33333',
        specialization: 'Company Formation',
        initials: 'AM',
        color: 'bg-emerald-500',
        status: 'Active',
        activeCount: 5,
        doneCount: 32,
        rate: 82
    }
];

export default function NewPartnerPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'associates' | 'commission' | 'assign-service' | 'documents' | 'payments' | 'reports'>('dashboard');
    const [associates, setAssociates] = useState<Associate[]>(ASSOCIATES_DATA);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    // --- Stats Data ---
    const stats = [
        { label: 'Total Associates', value: '8', sub: '6 Active • 2 Inactive', trend: '25%', color: 'blue', icon: <Users weight="fill" /> },
        { label: 'Pending Applications', value: '3', sub: 'Awaiting Review', trend: 'Urgent', color: 'amber', icon: <Warning weight="fill" /> },
        { label: 'Commission Paid', value: '₹38K', sub: 'From 45 Services', trend: 'This Month', color: 'emerald', icon: <CurrencyInr weight="bold" /> },
        { label: 'Completed Services', value: '7', sub: '88% Success Rate', trend: 'Today', color: 'purple', icon: <CheckCircle weight="fill" /> }
    ];

    const filteredAssociates = associates.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderDashboard = () => (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-800 mb-2">Dashboard Overview</h2>
                <p className="text-slate-500 font-semibold">Welcome back, Admin! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded bg-${stat.color}-50 text-${stat.color}-600`}>{stat.trend}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">{stat.label}</p>
                        <p className="text-3xl font-black text-slate-800 mb-2">{stat.value}</p>
                        <p className="text-xs text-slate-500 font-medium">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur border border-slate-100 rounded-2xl p-8 mb-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <SquaresFour weight="bold" className="text-slate-400" /> Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => setShowModal(true)} className="p-4 bg-gradient-to-br from-teal-600 to-teal-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-teal-200 transition-all flex items-center justify-center gap-2">
                        <UserPlus weight="bold" size={20} /> Add Associate
                    </button>
                    <button onClick={() => setActiveTab('applications')} className="p-4 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2">
                        <Files weight="bold" size={20} /> Review Apps
                    </button>
                    <button onClick={() => setActiveTab('commission')} className="p-4 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2">
                        <CurrencyInr weight="bold" size={20} /> Commission Setup
                    </button>
                    <button className="p-4 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2">
                        <Bell weight="bold" size={20} /> Announcement
                    </button>
                </div>
            </div>

            {/* Top Performers & Activity */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white/90 backdrop-blur border border-slate-100 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-xl font-black text-slate-800 mb-6">Top Performers</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { name: 'Priya Kapoor', role: 'ITR Expert', rev: '₹15,600', rate: '95%', rank: '🏆', bg: 'amber' },
                            { name: 'Rahul Sharma', role: 'GST Specialist', rev: '₹10,400', rate: '88%', rank: '🥈', bg: 'slate' },
                            { name: 'Amit Mehta', role: 'Compliance', rev: '₹6,500', rate: '82%', rank: '🥉', bg: 'orange' }
                        ].map((p, i) => (
                            <div key={i} className={`p-5 rounded-xl border-2 border-${p.bg}-100 bg-gradient-to-br from-${p.bg}-50 to-white relative overflow-hidden`}>
                                <div className="absolute top-2 right-2 text-2xl opacity-20">{p.rank}</div>
                                <div className="font-bold text-slate-900 mb-0.5">{p.name}</div>
                                <div className="text-xs font-semibold text-slate-500 mb-3">{p.role}</div>
                                <div className="flex justify-between items-end">
                                    <div className="text-lg font-black text-slate-800">{p.rev}</div>
                                    <div className={`text-xs font-bold px-2 py-1 rounded bg-${p.bg}-100 text-${p.bg}-700`}>{p.rate}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/90 backdrop-blur border border-slate-100 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-xl font-black text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { text: 'New application from Rahul V.', time: '2h ago', color: 'blue' },
                            { text: 'Priya K. completed GST Filing', time: '4h ago', color: 'emerald' },
                            { text: 'Document submitted by Amit M.', time: '5h ago', color: 'purple' },
                            { text: 'Commission paid to Rahul S.', time: '1d ago', color: 'amber' }
                        ].map((act, i) => (
                            <div key={i} className="flex gap-3 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors">
                                <div className={`w-2 h-2 rounded-full bg-${act.color}-500 mt-2 shrink-0`} />
                                <div>
                                    <p className="text-sm font-bold text-slate-700 leading-snug">{act.text}</p>
                                    <p className="text-xs text-slate-400 font-medium mt-1">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAssociates = () => (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Associates Management</h2>
                    <p className="text-slate-500 font-semibold">Manage all registered associates and profiles</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition flex items-center gap-2 text-sm shadow-lg shadow-teal-200">
                    <PlusCircle weight="bold" size={18} /> Add New Associate
                </button>
            </div>

            <div className="bg-white rounded-2xl p-2 mb-8 shadow-sm flex items-center border border-slate-200 focus-within:ring-2 ring-teal-500/20 transition-all">
                <MagnifyingGlass className="text-slate-400 ml-4" size={20} />
                <input
                    type="text"
                    placeholder="Search associates by name, email, specialization..."
                    className="w-full p-3 bg-transparent outline-none font-medium placeholder:text-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssociates.map(associate => (
                    <div key={associate.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl ${associate.color} text-white flex items-center justify-center font-black text-lg shadow-lg`}>
                                    {associate.initials}
                                </div>
                                <div>
                                    <div className="font-extrabold text-slate-900 text-lg">{associate.name}</div>
                                    <div className="text-xs font-semibold text-slate-400">{associate.id}</div>
                                </div>
                            </div>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {associate.status}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                <Envelope weight="bold" className="text-slate-400" /> {associate.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                <Phone weight="bold" className="text-slate-400" /> {associate.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-teal-700 bg-teal-50 p-2 rounded-lg">
                                <Certificate weight="fill" className="text-teal-500" /> {associate.specialization}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="text-center p-3 rounded-xl bg-slate-50">
                                <div className="text-xs font-bold text-slate-400 uppercase">Active</div>
                                <div className="text-xl font-black text-slate-800">{associate.activeCount}</div>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-slate-50">
                                <div className="text-xs font-bold text-slate-400 uppercase">Done</div>
                                <div className="text-xl font-black text-slate-800">{associate.doneCount}</div>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-slate-50">
                                <div className="text-xs font-bold text-slate-400 uppercase">Rate</div>
                                <div className="text-xl font-black text-slate-800">{associate.rate}%</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition">View Details</button>
                            <button className="px-4 py-2.5 bg-amber-50 text-amber-600 rounded-xl font-bold text-sm hover:bg-amber-100 transition"><PencilSimple weight="bold" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f1f5f9] font-sans">
            {/* Custom Header for this Module */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white font-black shadow-md">TQ</div>
                    <div>
                        <h1 className="text-lg font-black text-slate-800 leading-none">Admin Panel</h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Associate Management System</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"><Bell weight="bold" size={20} /></button>
                    <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-500 text-xs">AD</div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] overflow-hidden">
                {/* Internal Sidebar */}
                <aside className="w-full lg:w-64 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block">
                    <div className="p-4 space-y-1">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: <SquaresFour /> },
                            { id: 'applications', label: 'Applications', icon: <Files />, badge: '3' },
                            { id: 'associates', label: 'Associates', icon: <Users />, badge: '8' },
                            { id: 'commission', label: 'Commission', icon: <CurrencyInr /> },
                            { id: 'assign-service', label: 'Assign Service', icon: <Briefcase /> },
                            { id: 'documents', label: 'Documents', icon: <FileText />, badge: '12' },
                            { id: 'payments', label: 'Payments', icon: <Receipt /> },
                            { id: 'reports', label: 'Reports', icon: <ChartBar /> }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === item.id
                                    ? 'bg-teal-50 text-teal-700 shadow-sm'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                                {item.badge && <span className={`ml-auto px-2 py-0.5 rounded-md text-[10px] ${activeTab === item.id ? 'bg-teal-200 text-teal-800' : 'bg-slate-200 text-slate-600'}`}>{item.badge}</span>}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Mobile Nav Trigger (Visible on small screens) */}
                <div className="lg:hidden p-4 bg-white border-b overflow-x-auto flex gap-2 no-scrollbar">
                    {[
                        { id: 'dashboard', label: 'Dashboard' },
                        { id: 'associates', label: 'Associates' },
                        { id: 'commission', label: 'Commission' },
                        // Add others as needed
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === item.id
                                ? 'bg-teal-600 text-white shadow-md'
                                : 'bg-white border text-slate-500'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'associates' && renderAssociates()}
                    {/* Placeholder for other tabs */}
                    {['applications', 'commission', 'assign-service', 'documents', 'payments', 'reports'].includes(activeTab) && activeTab !== 'associates' && (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                <Funnel weight="fill" size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
                            <p className="text-slate-500 font-medium max-w-md mx-auto">This module is currently under development. Please check back later or contact support.</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-scale-up relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X weight="bold" size={20} /></button>
                        <h2 className="text-xl font-black text-slate-800 mb-6">Add New Associate</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition" placeholder="e.g. Rahul Sharma" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                                <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition" placeholder="e.g. rahul@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Specialization</label>
                                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition">
                                    <option>GST Registration</option>
                                    <option>ITR Filing</option>
                                    <option>Company Formation</option>
                                </select>
                            </div>
                            <button className="w-full py-3.5 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 transition mt-2">
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
