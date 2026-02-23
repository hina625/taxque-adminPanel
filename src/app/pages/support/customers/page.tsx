"use client";

import React, { useState } from 'react';
import { Plus, Gear, X } from '@phosphor-icons/react';

interface UserData { id: string; name: string; email: string; role: 'Customer' | 'Agent' | 'Admin'; status: 'active' | 'inactive'; tickets: number; joined: string; }

const INITIAL_USERS: UserData[] = [
    { id: 'USR-001', name: 'John Smith', email: 'john@example.com', role: 'Customer', status: 'active', tickets: 12, joined: '2024-01-15' },
    { id: 'USR-002', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', status: 'active', tickets: 8, joined: '2024-03-20' },
    { id: 'AGT-001', name: 'John Doe', email: 'john.doe@company.com', role: 'Agent', status: 'active', tickets: 156, joined: '2023-06-10' },
    { id: 'AGT-002', name: 'Sarah Smith', email: 'sarah.smith@company.com', role: 'Agent', status: 'active', tickets: 98, joined: '2023-09-01' },
];

export default function SupportCustomersPage() {
    const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', role: 'Customer' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: UserData = {
            id: `USR-00${users.length + 1}`,
            name: form.name,
            email: form.email,
            role: form.role as any,
            status: 'active',
            tickets: 0,
            joined: new Date().toISOString().split('T')[0],
        };
        setUsers([...users, newUser]);
        setShowModal(false);
        setForm({ name: '', email: '', role: 'Customer' });
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Customers & Agents</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage users, customers, and support agents</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 flex items-center gap-2">
                    <Plus weight="bold" size={18} /> Add User
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-gray-900/50 text-left">
                        <tr>
                            {['Name', 'Email', 'Role', 'Tickets', 'Status', 'Actions'].map(h => (
                                <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-400">Joined {user.joined}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase ${user.role === 'Agent' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : user.role === 'Admin' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-gray-300">{user.tickets}</td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full uppercase">Active</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Gear size={20} weight="bold" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add User</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                <input type="email" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Role</label>
                                <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                                    <option value="Customer">Customer</option>
                                    <option value="Agent">Agent</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all">Add User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
