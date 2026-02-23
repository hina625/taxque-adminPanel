"use client";
import React from 'react';
import { Phone } from '@phosphor-icons/react';

const CALLS = [
    { id: 1, name: 'Priya Kapoor', type: 'Incoming', duration: '5m 23s', time: '10:30 AM', status: 'answered', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Rahul Sharma', type: 'Outgoing', duration: '12m 01s', time: '9:15 AM', status: 'answered', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Amit Mehta', type: 'Incoming', duration: '-', time: 'Yesterday', status: 'missed', avatar: 'https://i.pravatar.cc/150?u=3' },
];

export default function CallsPage() {
    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Call Logs</h1>
                    <p className="text-slate-500 dark:text-gray-400">View and manage your call history</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Phone weight="fill" size={18} /> New Call
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-gray-900/50 text-left">
                        <tr>{['Contact', 'Type', 'Duration', 'Time', 'Status', 'Actions'].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                        {CALLS.map(call => (
                            <tr key={call.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={call.avatar} className="w-8 h-8 rounded-full" />
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{call.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400">{call.type}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-gray-300">{call.duration}</td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-400">{call.time}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${call.status === 'answered' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'}`}>{call.status}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Phone size={18} weight="fill" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
