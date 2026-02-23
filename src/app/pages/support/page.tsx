"use client";

import React from 'react';
import Link from 'next/link';
import {
    Ticket, Users, BookOpen, TrendUp, TrendDown,
    CheckCircle, Fire, FolderOpen
} from '@phosphor-icons/react';

const stats = [
    { label: 'Total Tickets', value: '1,248', trend: '+12.5%', up: true, icon: Ticket, color: 'blue' },
    { label: 'Open Tickets', value: '86', trend: '-5.2%', up: false, icon: FolderOpen, color: 'amber' },
    { label: 'Resolved Today', value: '42', trend: '+18.3%', up: true, icon: CheckCircle, color: 'emerald' },
    { label: 'Urgent Tickets', value: '7', trend: '-3', up: false, icon: Fire, color: 'rose' },
];

const colorMap: Record<string, string> = {
    blue: 'bg-blue-500 text-blue-600 bg-blue-50',
    amber: 'bg-amber-500 text-amber-600 bg-amber-50',
    emerald: 'bg-emerald-500 text-emerald-600 bg-emerald-50',
    rose: 'bg-rose-500 text-rose-600 bg-rose-50',
};

const quickLinks = [
    { name: 'All Tickets', href: '/pages/support/tickets', icon: Ticket, desc: 'View & manage all tickets' },
    { name: 'Customers', href: '/pages/support/customers', icon: Users, desc: 'Manage customers & agents' },
    { name: 'Knowledge Base', href: '/pages/support/knowledge-base', icon: BookOpen, desc: 'Help articles & guides' },
];

export default function SupportPage() {
    return (
        <main className="max-w-[1600px] mx-auto p-6 lg:p-8 overflow-y-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Support Overview</h1>
                    <p className="text-slate-500 dark:text-gray-400">Monitor and manage your customer support operations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map(stat => {
                        const [bgAccent, textColor, iconBg] = colorMap[stat.color].split(' ');
                        return (
                            <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm relative overflow-hidden group transition-colors">
                                <div className={`absolute top-0 left-0 w-1 h-full ${bgAccent}`} />
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-slate-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stat.value}</h3>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl ${iconBg} dark:bg-gray-700 flex items-center justify-center ${textColor} dark:text-gray-300 group-hover:scale-110 transition-transform`}>
                                        <stat.icon size={24} weight="fill" />
                                    </div>
                                </div>
                                <div className={`flex items-center text-xs font-bold gap-1 ${stat.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                                    {stat.up ? <TrendUp weight="bold" /> : <TrendDown weight="bold" />}
                                    <span>{stat.trend}</span>
                                    <span className="text-slate-400 font-medium ml-1">from last month</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickLinks.map(link => (
                        <Link key={link.name} href={link.href} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 transition-colors">
                                    <link.icon size={22} weight="fill" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{link.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-gray-400">{link.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
