"use client";

import React, { useState, useEffect } from 'react';
import {
    Hexagon,
    Bell,
    RefreshCw,
    TrendingUp,
    FileText,
    CalendarCheck
} from 'lucide-react';
import { Deal, Lead, Task, Ticket } from './components/Modals';
import Link from 'next/link';

export default function CRMPage() {
    // --- State ---
    const [deals, setDeals] = useState<Deal[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    // --- Init Data ---
    useEffect(() => {
        setDeals([
            { id: 1, name: 'Innovate Digital', company: 'Innovate Digital Inc', value: 24500, stage: 'lead', description: 'Digital transformation project', contact: 'John Smith', created: new Date().toISOString() }
        ]);
        setLeads([
            { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@innovate.com', company: 'Innovate Digital', phone: '+1234567890', status: 'New', value: 24500, source: 'Website', notes: 'Interested in our services', created: new Date().toISOString() }
        ]);
        setTasks([
            { id: 1, title: 'Prepare Q2 Sales Report', description: 'Compile revenue and conversion data', dueDate: '2025-12-25', priority: 'high', status: 'pending', assignedTo: 'Alex Davis', relatedTo: '', created: new Date().toISOString() }
        ]);
        setTickets([
            { id: 1001, subject: 'Login Issue', description: 'Cannot access customer portal', customer: 'TechCorp Solutions', email: 'support@techcorp.com', priority: 'high', category: 'technical', status: 'open', assignedTo: 'Support Team', created: new Date().toISOString() }
        ]);
    }, []);

    const stats = {
        revenue: deals.reduce((sum, d) => sum + d.value, 0),
        deals: deals.length,
        leads: leads.length,
        tasks: tasks.filter(t => t.status !== 'completed').length,
        tickets: tickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 font-sans text-slate-900 dark:text-gray-100 transition-colors duration-300">
            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto p-6 lg:p-8 overflow-y-auto">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">CRM Overview</h1>
                            <p className="text-slate-500 dark:text-gray-400">Welcome back! Here's your business performance today.</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-gray-600 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800 shadow-sm">
                            <RefreshCw className="w-4 h-4" /> Refresh
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 text-sm">
                        <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="+18.2%" trendUp={true} href="/pages/crm/pipeline" />
                        <StatCard label="Active Deals" value={stats.deals.toString()} href="/pages/crm/pipeline" />
                        <StatCard label="Total Leads" value={stats.leads.toString()} href="/pages/crm/leads" />
                        <StatCard label="Pending Tasks" value={stats.tasks.toString()} href="/pages/crm/tasks" />
                        <StatCard label="Open Tickets" value={stats.tickets.toString()} href="/pages/crm/tickets" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden p-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                            <div className="divide-y divide-slate-100 dark:divide-gray-700">
                                <div className="grid grid-cols-[2fr_1fr_1fr] py-4 items-center hover:bg-slate-50 dark:hover:bg-gray-700/30 transition-colors px-2 rounded-lg">
                                    <div className="font-medium text-slate-900 dark:text-gray-200">System initialized</div>
                                    <div><span className="px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">System</span></div>
                                    <div className="text-slate-500 dark:text-gray-400 text-xs">Just now</div>
                                </div>
                                <div className="grid grid-cols-[2fr_1fr_1fr] py-4 items-center hover:bg-slate-50 dark:hover:bg-gray-700/30 transition-colors px-2 rounded-lg">
                                    <div className="font-medium text-slate-900 dark:text-gray-200">New lead: John Smith</div>
                                    <div><span className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">Lead</span></div>
                                    <div className="text-slate-500 dark:text-gray-400 text-xs">2 hours ago</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden p-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Links</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                                <Link href="/pages/crm/leads" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-gray-700/30 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 transition-all">
                                    <TrendingUp className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                                    <span>Manage Leads</span>
                                </Link>
                                <Link href="/pages/crm/pipeline" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-gray-700/30 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 transition-all">
                                    <FileText className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                                    <span>Sales Pipeline</span>
                                </Link>
                                <Link href="/pages/crm/tasks" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-gray-700/30 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 transition-all">
                                    <CalendarCheck className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                                    <span>My Tasks</span>
                                </Link>
                                <Link href="/pages/crm/tickets" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-gray-700/30 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 transition-all">
                                    <Bell className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                                    <span>Support Tickets</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ label, value, trend, trendUp, href }: { label: string, value: string, trend?: string, trendUp?: boolean, href: string }) {
    return (
        <Link href={href} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-xs font-medium text-slate-500 dark:text-gray-400 mb-1">{label}</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{value}</div>
            {trend && (
                <div className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                    {trend}
                </div>
            )}
        </Link>
    );
}
