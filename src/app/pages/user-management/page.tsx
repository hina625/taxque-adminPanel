"use client";

import React, { useState, useEffect } from 'react';
import {
    UsersThree,
    MagnifyingGlass,
    Funnel,
    Plus,
    X,
    User,
    Envelope,
    CaretDown,
    PencilSimple,
    Check
} from '@phosphor-icons/react';

// --- Types ---

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
    date: string;
}

// --- Mock Data ---

const INITIAL_USERS: UserData[] = [
    { id: 1, name: "Alice Admin", email: "alice@company.com", role: "Admin", status: "Active", date: "2023-11-15" },
    { id: 2, name: "Mark Manager", email: "mark@company.com", role: "Manager", status: "Active", date: "2023-12-02" },
    { id: 3, name: "Victor Viewer", email: "victor@company.com", role: "Viewer", status: "Inactive", date: "2024-01-10" },
];

const ROLES = ["Admin", "Manager", "Agent", "Employee", "Partner", "Referral", "Author", "Viewer", "Customer"];

// --- Component ---

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'Admin',
        status: 'Active'
    });

    const [showToast, setShowToast] = useState(false);

    // --- Effects ---

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = users.filter(u =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    // --- Handlers ---

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();

        const user: UserData = {
            id: users.length + 1,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status as 'Active' | 'Inactive',
            date: new Date().toISOString().split('T')[0]
        };

        setUsers(prev => [user, ...prev]);
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', role: 'Admin', status: 'Active' });

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // --- Styles Helper ---

    const getRoleStyles = (role: string) => {
        const styles: Record<string, string> = {
            'Admin': 'bg-rose-50 text-rose-600 border-rose-100',
            'Manager': 'bg-indigo-50 text-indigo-600 border-indigo-100',
            'Agent': 'bg-amber-50 text-amber-600 border-amber-100',
            'Customer': 'bg-blue-50 text-blue-600 border-blue-100',
        };
        return styles[role] || 'bg-slate-50 text-slate-600 border-slate-100';
    };

    const getRoleDot = (role: string) => {
        const dots: Record<string, string> = {
            'Admin': 'bg-rose-400',
            'Manager': 'bg-indigo-400',
            'Agent': 'bg-amber-400',
            'Customer': 'bg-blue-400',
        };
        return dots[role] || 'bg-slate-400';
    };


    return (
        <div className="min-h-screen bg-[#f1f5f9] p-6 md:p-10 font-sans text-slate-800 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                    <div className="relative pl-4">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Members</h1>
                        <p className="text-slate-500 mt-1 font-medium">Manage access and roles for your organization.</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-200/50 flex items-center gap-2 font-semibold group active:scale-95"
                    >
                        <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                            <Plus weight="bold" size={14} />
                        </div>
                        <span>Add New User</span>
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col min-h-[500px]">

                    {/* Toolbar */}
                    <div className="p-5 border-b border-slate-100 bg-white/40 flex gap-3">
                        <div className="relative flex-1 max-w-sm group">
                            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
                            <Funnel weight="regular" />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                    <th className="px-6 py-4 pl-8">User Profile</th>
                                    <th className="px-6 py-4">Assigned Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                    <th className="px-6 py-4 text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white/60">
                                {filteredUsers.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-all duration-200 group animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                        <td className="px-6 py-4 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border ${getRoleStyles(user.role).split(' ')[0]} ${getRoleStyles(user.role).split(' ')[1]} ${getRoleStyles(user.role).split(' ')[2]}`}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900 text-sm">{user.name}</div>
                                                    <div className="text-xs text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleStyles(user.role)}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${getRoleDot(user.role)}`}></span>
                                                {user.role}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${user.status === 'Active' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-slate-500 bg-slate-100 border-slate-200'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-medium font-mono">
                                            {user.date}
                                        </td>
                                        <td className="px-6 py-4 text-right pr-8">
                                            <button className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                                                <PencilSimple weight="bold" size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                    <UsersThree weight="duotone" className="text-4xl text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">No team members found</h3>
                                <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">Get started by adding a new user to your organization.</p>
                                <button onClick={() => setIsModalOpen(true)} className="mt-4 text-indigo-600 font-semibold text-sm hover:underline">Add user now &rarr;</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden transform animate-scale-up">

                        {/* Decorative Top Bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Invite Team Member</h3>
                                <p className="text-sm text-slate-500 mt-0.5">Fill in the details to create a new account.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
                                <X weight="bold" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleCreateUser} className="px-8 py-6 space-y-5 bg-white/40">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" weight="duotone" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            placeholder="e.g. Sarah Connor"
                                            value={newUser.name}
                                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                    <div className="relative group">
                                        <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" weight="duotone" />
                                        <input
                                            type="email"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                                            placeholder="sarah@company.com"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
                                        <div className="relative">
                                            <select
                                                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none cursor-pointer font-medium"
                                                value={newUser.role}
                                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                            >
                                                {ROLES.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                            <CaretDown weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                                        <div className="relative">
                                            <select
                                                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none cursor-pointer font-medium"
                                                value={newUser.status}
                                                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            <CaretDown weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95">
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[100] animate-slide-up">
                    <div className="bg-slate-900/90 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-xl border border-slate-700 max-w-sm">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 flex-shrink-0">
                            <Check weight="bold" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Invitation Sent</h4>
                            <p className="text-xs text-slate-300 mt-0.5">User <b>{newUser.name || 'User'}</b> added successfully.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
