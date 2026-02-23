"use client";
import React, { useState } from 'react';
import { UserPlus, X, Trash } from '@phosphor-icons/react';

interface Contact { id: number; name: string; role: string; department: string; email: string; status: string; avatar: string; }

const INITIAL_CONTACTS: Contact[] = [
    { id: 1, name: 'Priya Kapoor', role: 'Associate', department: 'Tax Filing', email: 'priya.k@taxque.com', status: 'online', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Rahul Sharma', role: 'Client', department: 'Operations', email: 'rahul.s@client.com', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Amit Mehta', role: 'Associate', department: 'Accounts', email: 'amit.m@taxque.com', status: 'away', avatar: 'https://i.pravatar.cc/150?u=3' },
];

export default function MessengerUsersPage() {
    const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', role: 'Client', department: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newContact: Contact = {
            id: contacts.length + 1,
            name: form.name,
            email: form.email,
            role: form.role,
            department: form.department,
            status: 'offline',
            avatar: `https://i.pravatar.cc/150?u=${contacts.length + 10}`,
        };
        setContacts([...contacts, newContact]);
        setShowModal(false);
        setForm({ name: '', email: '', role: 'Client', department: '' });
    };

    const handleDelete = (id: number) => setContacts(contacts.filter(c => c.id !== id));

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Contacts</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage your messenger contacts</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <UserPlus weight="bold" size={18} /> Add Contact
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map(contact => (
                    <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover" alt={contact.name} />
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${contact.status === 'online' ? 'bg-emerald-500' : contact.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{contact.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-gray-400">{contact.role} · {contact.department}</p>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(contact.id)} className="text-slate-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1">
                                <Trash size={16} weight="bold" />
                            </button>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-gray-400 bg-slate-50 dark:bg-gray-900 px-3 py-2 rounded-lg mb-3">{contact.email}</div>
                        <button className="w-full py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">Message</button>
                    </div>
                ))}
            </div>

            {/* Add Contact Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add Contact</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email</label>
                                <input type="email" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Role</label>
                                    <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                                        <option>Client</option><option>Associate</option><option>Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Department</label>
                                    <input type="text" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Accounts" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all">Add Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
