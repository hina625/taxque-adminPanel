"use client";

import React, { useState } from 'react';
import {
    Ticket,
    Users,
    ChartBar,
    BookOpen,
    Gear,
    MagnifyingGlass,
    Bell,
    Plus,
    Funnel,
    Clock,
    CheckCircle,
    Warning,
    Fire,
    FolderOpen,
    User,
    EnvelopeSimple,
    PaperPlaneRight,
    Trash,
    X,
    Paperclip,
    CaretLeft,
    CaretRight,
    TrendUp,
    TrendDown,
    Smiley,
    ChatCircleDots
} from '@phosphor-icons/react';

// --- Types ---

interface TicketData {
    id: string;
    subject: string;
    customer: string;
    email: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    assignedTo: string;
    created: string;
    updated: string;
    category: string;
    conversation?: Message[];
}

interface Message {
    id: string;
    author: string;
    role: 'agent' | 'customer';
    time: string;
    text: string;
}

interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'Customer' | 'Agent' | 'Admin';
    status: 'active' | 'inactive';
    tickets: number;
    joined: string;
}

interface KBArticle {
    id: string;
    title: string;
    category: string;
    author: string;
    views: number;
    helpful: number;
    status: 'published' | 'draft';
    updated: string;
}

// --- Mock Data ---

const INITIAL_TICKETS: TicketData[] = [
    {
        id: 'TKT-001',
        subject: 'Unable to login to account',
        customer: 'John Smith',
        email: 'john@example.com',
        priority: 'high',
        status: 'open',
        assignedTo: 'John Doe',
        created: '2 hours ago',
        updated: '1 hour ago',
        category: 'Technical',
        conversation: [
            { id: '1', author: 'John Doe', role: 'agent', time: '1 hour ago', text: 'Thank you for contacting support. I have unlocked your account.' },
            { id: '2', author: 'John Smith', role: 'customer', time: '30 mins ago', text: 'Thanks, it works now!' }
        ]
    },
    {
        id: 'TKT-002',
        subject: 'Billing inquiry for invoice #1234',
        customer: 'Sarah Johnson',
        email: 'sarah@example.com',
        priority: 'medium',
        status: 'in-progress',
        assignedTo: 'Sarah Smith',
        created: '5 hours ago',
        updated: '3 hours ago',
        category: 'Billing'
    },
    {
        id: 'TKT-003',
        subject: 'Feature request: Dark mode',
        customer: 'Mike Wilson',
        email: 'mike@example.com',
        priority: 'low',
        status: 'open',
        assignedTo: 'Unassigned',
        created: '1 day ago',
        updated: '1 day ago',
        category: 'Feature Request'
    },
    {
        id: 'TKT-004',
        subject: 'Critical bug in payment gateway',
        customer: 'Emily Brown',
        email: 'emily@example.com',
        priority: 'urgent',
        status: 'in-progress',
        assignedTo: 'Mike Johnson',
        created: '30 minutes ago',
        updated: '15 minutes ago',
        category: 'Bug Report'
    },
    {
        id: 'TKT-005',
        subject: 'How to export data?',
        customer: 'David Lee',
        email: 'david@example.com',
        priority: 'low',
        status: 'resolved',
        assignedTo: 'John Doe',
        created: '2 days ago',
        updated: '6 hours ago',
        category: 'General'
    }
];

const INITIAL_USERS: UserData[] = [
    { id: 'USR-001', name: 'John Smith', email: 'john@example.com', role: 'Customer', status: 'active', tickets: 12, joined: '2024-01-15' },
    { id: 'USR-002', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', status: 'active', tickets: 8, joined: '2024-03-20' },
    { id: 'AGT-001', name: 'John Doe', email: 'john.doe@company.com', role: 'Agent', status: 'active', tickets: 156, joined: '2023-06-10' },
];

const INITIAL_KB: KBArticle[] = [
    { id: 'KB-001', title: 'How to reset your password', category: 'Technical', author: 'John Doe', views: 1234, helpful: 987, status: 'published', updated: '2 days ago' },
    { id: 'KB-002', title: 'Understanding your billing cycle', category: 'Billing', author: 'Sarah Smith', views: 856, helpful: 742, status: 'published', updated: '1 week ago' },
];

// --- Component ---

export default function SupportPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'tickets' | 'users' | 'analytics' | 'knowledge'>('dashboard');
    const [tickets, setTickets] = useState<TicketData[]>(INITIAL_TICKETS);
    const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);
    const [kbArticles, setKbArticles] = useState<KBArticle[]>(INITIAL_KB);

    // Modal States
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
    const [replyText, setReplyText] = useState('');

    // Form States (New Ticket)
    const [newTicketForm, setNewTicketForm] = useState({
        customer: '',
        email: '',
        subject: '',
        priority: 'medium',
        category: 'technical',
        description: ''
    });

    // --- Handlers ---

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        const newTicket: TicketData = {
            id: `TKT-00${tickets.length + 1}`,
            subject: newTicketForm.subject,
            customer: newTicketForm.customer,
            email: newTicketForm.email,
            priority: newTicketForm.priority as any,
            status: 'open',
            assignedTo: 'Unassigned',
            created: 'Just now',
            updated: 'Just now',
            category: newTicketForm.category
        };
        setTickets([newTicket, ...tickets]);
        setShowNewTicketModal(false);
        setNewTicketForm({ customer: '', email: '', subject: '', priority: 'medium', category: 'technical', description: '' });
    };

    const handleSendReply = () => {
        if (!selectedTicket || !replyText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            author: 'Admin User',
            role: 'agent',
            time: 'Just now',
            text: replyText
        };

        const updatedTicket = {
            ...selectedTicket,
            conversation: [...(selectedTicket.conversation || []), newMessage],
            updated: 'Just now'
        };

        setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
        setSelectedTicket(updatedTicket);
        setReplyText('');
    };

    const handleDeleteTicket = (id: string) => {
        setTickets(tickets.filter(t => t.id !== id));
        setSelectedTicket(null);
    };

    const handleStatusChange = (id: string, newStatus: TicketData['status']) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
        if (selectedTicket && selectedTicket.id === id) {
            setSelectedTicket({ ...selectedTicket, status: newStatus });
        }
    };

    // --- Render Helpers ---

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'urgent': return 'text-rose-600 bg-rose-50';
            case 'high': return 'text-orange-600 bg-orange-50';
            case 'medium': return 'text-amber-600 bg-amber-50';
            case 'low': return 'text-emerald-600 bg-emerald-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'resolved': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'open': return 'text-sky-600 bg-sky-50 border-sky-100';
            case 'in-progress': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'closed': return 'text-slate-600 bg-slate-50 border-slate-100';
            default: return 'text-slate-600 bg-slate-50 border-slate-100';
        }
    };

    // --- Views ---

    const renderDashboard = () => (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Total Tickets</p>
                            <h3 className="text-3xl font-bold text-slate-800">1,248</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Ticket size={24} weight="fill" />
                        </div>
                    </div>
                    <div className="flex items-center text-emerald-600 text-xs font-bold gap-1">
                        <TrendUp weight="bold" />
                        <span>12.5%</span>
                        <span className="text-slate-400 font-medium ml-1">from last month</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Open Tickets</p>
                            <h3 className="text-3xl font-bold text-slate-800">86</h3>
                        </div>
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                            <FolderOpen size={24} weight="fill" />
                        </div>
                    </div>
                    <div className="flex items-center text-emerald-600 text-xs font-bold gap-1">
                        <TrendDown weight="bold" />
                        <span>5.2%</span>
                        <span className="text-slate-400 font-medium ml-1">from last week</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Resolved Today</p>
                            <h3 className="text-3xl font-bold text-slate-800">42</h3>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                            <CheckCircle size={24} weight="fill" />
                        </div>
                    </div>
                    <div className="flex items-center text-emerald-600 text-xs font-bold gap-1">
                        <TrendUp weight="bold" />
                        <span>18.3%</span>
                        <span className="text-slate-400 font-medium ml-1">increase</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Urgent Tickets</p>
                            <h3 className="text-3xl font-bold text-slate-800">7</h3>
                        </div>
                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                            <Fire size={24} weight="fill" />
                        </div>
                    </div>
                    <div className="flex items-center text-emerald-600 text-xs font-bold gap-1">
                        <TrendDown weight="bold" />
                        <span>3</span>
                        <span className="text-slate-400 font-medium ml-1">from yesterday</span>
                    </div>
                </div>
            </div>

            {/* Recent Tickets Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Recent Tickets</h3>
                    <button onClick={() => setActiveTab('tickets')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 text-left">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {tickets.slice(0, 5).map(ticket => (
                                <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600 group-hover:text-indigo-700">{ticket.id}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">{ticket.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{ticket.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)} uppercase tracking-wide`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)} capitalize`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{ticket.created}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">

            {/* Sidebar */}
            <aside className="w-[260px] bg-slate-900 flex-shrink-0 flex flex-col overflow-y-auto border-r border-white/5">
                <div className="p-6">
                    <div className="flex items-center gap-3 text-white font-bold text-lg mb-8">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                            <Ticket weight="fill" className="text-white" />
                        </div>
                        SupportDesk
                    </div>

                    <div className="space-y-1">
                        <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                            <ChartBar size={20} weight={activeTab === 'dashboard' ? 'fill' : 'regular'} />
                            Dashboard
                        </button>
                        <button onClick={() => setActiveTab('tickets')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'tickets' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                            <Ticket size={20} weight={activeTab === 'tickets' ? 'fill' : 'regular'} />
                            All Tickets
                        </button>
                        <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                            <Users size={20} weight={activeTab === 'users' ? 'fill' : 'regular'} />
                            Users
                        </button>
                        <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                            <TrendUp size={20} weight={activeTab === 'analytics' ? 'fill' : 'regular'} />
                            Analytics
                        </button>
                        <button onClick={() => setActiveTab('knowledge')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'knowledge' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                            <BookOpen size={20} weight={activeTab === 'knowledge' ? 'fill' : 'regular'} />
                            Knowledge Base
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">

                {/* Header */}
                <header className="bg-white px-8 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex-1 max-w-lg relative">
                        <input
                            type="text"
                            placeholder="Search tickets, users, or keywords..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                        />
                        <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                        <button className="relative w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                            <Bell size={20} weight="bold" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/30">
                                AD
                            </div>
                            <div className="hidden md:block">
                                <div className="text-sm font-bold text-slate-800">Admin User</div>
                                <div className="text-xs text-slate-500 font-medium">Administrator</div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">

                    {activeTab === 'dashboard' && renderDashboard()}

                    {activeTab === 'tickets' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-slate-900">All Tickets</h2>
                                <button onClick={() => setShowNewTicketModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
                                    <Plus weight="bold" size={18} />
                                    New Ticket
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500">
                                        <option value="">All Status</option>
                                        <option value="open">Open</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Priority</label>
                                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500">
                                        <option value="">All Priorities</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assigned To</label>
                                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500">
                                        <option value="">All Agents</option>
                                        <option value="john">John Doe</option>
                                        <option value="sarah">Sarah Smith</option>
                                    </select>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-slate-50 text-left">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {tickets.map(ticket => (
                                            <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600 group-hover:text-indigo-700">{ticket.id}</td>
                                                <td className="px-6 py-4 text-sm text-slate-700 font-medium">{ticket.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{ticket.customer}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)} uppercase tracking-wide`}>
                                                        {ticket.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)} capitalize`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                        <CaretRight size={20} weight="bold" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <div className="flex items-center justify-between p-4 border-t border-slate-100">
                                    <div className="text-sm text-slate-500">Showing 1 to 5 of {tickets.length} entries</div>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"><CaretLeft weight="bold" /></button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">1</button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">2</button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"><CaretRight weight="bold" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
                                    <Plus weight="bold" size={18} />
                                    Add User
                                </button>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-slate-50 text-left">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tickets</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {users.map(user => (
                                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div className="text-sm font-bold text-slate-900">{user.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-md uppercase">{user.role}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wide">Active</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-700">{user.tickets}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                        <Gear size={20} weight="bold" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Ticket Details Modal */}
                {selectedTicket && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-slate-800">Ticket Details</h2>
                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{selectedTicket.id}</span>
                                </div>
                                <button onClick={() => setSelectedTicket(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500">
                                    <X weight="bold" size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8">
                                <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-slate-100">
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</div>
                                        <div><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedTicket.status)} capitalize`}>{selectedTicket.status}</span></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</div>
                                        <div><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityColor(selectedTicket.priority)} uppercase tracking-wide`}>{selectedTicket.priority}</span></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</div>
                                        <div className="text-sm font-bold text-slate-700">{selectedTicket.customer}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned To</div>
                                        <div className="text-sm font-bold text-slate-700">{selectedTicket.assignedTo}</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedTicket.subject}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                            <ChatCircleDots size={20} className="text-indigo-600" weight="fill" />
                                            Conversation
                                        </h4>

                                        {selectedTicket.conversation?.map(msg => (
                                            <div key={msg.id} className={`flex gap-4 ${msg.role === 'agent' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md ${msg.role === 'agent' ? 'bg-indigo-600' : 'bg-slate-400'}`}>
                                                    {msg.author.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className={`flex-1 max-w-[80%] space-y-1 ${msg.role === 'agent' ? 'items-end flex flex-col' : ''}`}>
                                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                                        <span className="font-bold text-slate-700">{msg.author}</span>
                                                        <span>•</span>
                                                        <span>{msg.time}</span>
                                                    </div>
                                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'agent' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-600 rounded-tl-none'}`}>
                                                        {msg.text}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-slate-100">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-700">Add Reply</label>
                                            <textarea
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all min-h-[100px]"
                                                placeholder="Type your response here..."
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                            ></textarea>
                                            <div className="flex justify-between items-center">
                                                <button className="text-slate-500 hover:text-indigo-600 text-sm font-bold flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                                                    <Paperclip size={18} weight="bold" />
                                                    Attach File
                                                </button>
                                                <button onClick={handleSendReply} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
                                                    <PaperPlaneRight weight="bold" />
                                                    Send Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                                <button
                                    onClick={() => handleDeleteTicket(selectedTicket.id)}
                                    className="text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                                >
                                    <Trash weight="bold" size={18} />
                                    Delete Ticket
                                </button>
                                <div className="flex gap-3">
                                    <select
                                        className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer hover:border-indigo-300 transition-colors"
                                        value={selectedTicket.status}
                                        onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value as any)}
                                    >
                                        <option value="open">Mark as Open</option>
                                        <option value="in-progress">Mark as In Progress</option>
                                        <option value="resolved">Mark as Resolved</option>
                                        <option value="closed">Mark as Closed</option>
                                    </select>
                                    <button onClick={() => setSelectedTicket(null)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Ticket Modal */}
                {showNewTicketModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
                            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h2 className="text-xl font-bold text-slate-800">Create New Ticket</h2>
                                <button onClick={() => setShowNewTicketModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500">
                                    <X weight="bold" size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleCreateTicket} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Customer Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="John Doe"
                                            value={newTicketForm.customer}
                                            onChange={e => setNewTicketForm({ ...newTicketForm, customer: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="john@example.com"
                                            value={newTicketForm.email}
                                            onChange={e => setNewTicketForm({ ...newTicketForm, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="Brief description of the issue"
                                        value={newTicketForm.subject}
                                        onChange={e => setNewTicketForm({ ...newTicketForm, subject: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Priority</label>
                                        <select
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            value={newTicketForm.priority}
                                            onChange={e => setNewTicketForm({ ...newTicketForm, priority: e.target.value as any })}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                                        <select
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            value={newTicketForm.category}
                                            onChange={e => setNewTicketForm({ ...newTicketForm, category: e.target.value })}
                                        >
                                            <option value="technical">Technical Support</option>
                                            <option value="billing">Billing</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="feature">Feature Request</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                                    <textarea
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors min-h-[120px]"
                                        placeholder="Detailed description of the issue..."
                                        value={newTicketForm.description}
                                        onChange={e => setNewTicketForm({ ...newTicketForm, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={() => setShowNewTicketModal(false)} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-200">
                                        Create Ticket
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
