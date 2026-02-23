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
            'Admin': 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/30',
            'Manager': 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/30',
            'Agent': 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/30',
            'Customer': 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/30',
        };
        return styles[role] || 'bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-400 border-slate-100 dark:border-gray-700';
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
        <div className="min-h-screen bg-[#f1f5f9] dark:bg-gray-950 p-6 md:p-10 font-sans text-slate-800 dark:text-gray-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                    <div className="relative pl-4">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Team Members</h1>
                        <p className="text-slate-500 dark:text-gray-400 mt-1 font-medium transition-colors">Manage access and roles for your organization.</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-200/50 dark:shadow-none flex items-center gap-2 font-semibold group active:scale-95"
                    >
                        <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                            <Plus weight="bold" size={14} />
                        </div>
                        <span>Add New User</span>
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-gray-800 rounded-2xl shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden flex flex-col min-h-[500px] transition-colors">

                    {/* Toolbar */}
                    <div className="p-5 border-b border-slate-100 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 flex gap-3 transition-colors">
                        <div className="relative flex-1 max-w-sm group">
                            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-lg group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-750 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
                            <Funnel weight="regular" />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 dark:bg-gray-800/80 border-b border-slate-200 dark:border-gray-700 text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400 font-bold transition-colors">
                                    <th className="px-6 py-4 pl-8">User Profile</th>
                                    <th className="px-6 py-4">Assigned Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                    <th className="px-6 py-4 text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-gray-800 bg-white/60 dark:bg-gray-900/40 transition-colors">
                                {filteredUsers.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-all duration-200 group animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                        <td className="px-6 py-4 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border transition-all ${getRoleStyles(user.role).split(' ')[0]} ${getRoleStyles(user.role).split(' ')[1]} ${getRoleStyles(user.role).split(' ')[2]}`}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900 dark:text-white text-sm transition-colors">{user.name}</div>
                                                    <div className="text-xs text-slate-500 dark:text-gray-400 transition-colors">{user.email}</div>
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
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${user.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30' : 'text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 border-slate-200 dark:border-gray-700'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-gray-500'}`}></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-400 font-medium font-mono transition-colors">
                                            {user.date}
                                        </td>
                                        <td className="px-6 py-4 text-right pr-8">
                                            <button className="text-slate-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                                                <PencilSimple weight="bold" size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-inner transition-colors">
                                    <UsersThree weight="duotone" className="text-4xl text-slate-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">No team members found</h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm mt-1 max-w-xs mx-auto transition-colors">Get started by adding a new user to your organization.</p>
                                <button onClick={() => setIsModalOpen(true)} className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline transition-colors transition-all">Add user now &rarr;</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in transition-colors">
                    <div className="w-full max-w-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-gray-800 overflow-hidden transform animate-scale-up transition-colors">

                        {/* Decorative Top Bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50 transition-colors">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Invite Team Member</h3>
                                <p className="text-sm text-slate-500 dark:text-gray-400 mt-0.5 transition-colors">Fill in the details to create a new account.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400 flex items-center justify-center transition-colors">
                                <X weight="bold" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleCreateUser} className="px-8 py-6 space-y-5 bg-white/40 dark:bg-gray-900/40 transition-colors">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1.5 transition-colors">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors" weight="duotone" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-gray-500 font-medium"
                                            placeholder="e.g. Sarah Connor"
                                            value={newUser.name}
                                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1.5 transition-colors">Email Address</label>
                                    <div className="relative group">
                                        <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors" weight="duotone" />
                                        <input
                                            type="email"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-gray-500 font-medium"
                                            placeholder="sarah@company.com"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1.5 transition-colors">Role</label>
                                        <div className="relative">
                                            <select
                                                className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none cursor-pointer font-medium transition-colors"
                                                value={newUser.role}
                                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                            >
                                                {ROLES.map(role => (
                                                    <option key={role} value={role} className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">{role}</option>
                                                ))}
                                            </select>
                                            <CaretDown weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1.5 transition-colors">Status</label>
                                        <div className="relative">
                                            <select
                                                className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none cursor-pointer font-medium transition-colors"
                                                value={newUser.status}
                                                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                            >
                                                <option value="Active" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">Active</option>
                                                <option value="Inactive" className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white">Inactive</option>
                                            </select>
                                            <CaretDown weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3 transition-colors">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform active:scale-95">
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
                    <div className="bg-slate-900/90 dark:bg-gray-800/95 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-xl border border-slate-700 dark:border-gray-700 max-w-sm transition-colors">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 flex-shrink-0">
                            <Check weight="bold" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm transition-colors">Invitation Sent</h4>
                            <p className="text-xs text-slate-300 dark:text-gray-400 mt-0.5 transition-colors">User <b>{newUser.name || 'User'}</b> added successfully.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
