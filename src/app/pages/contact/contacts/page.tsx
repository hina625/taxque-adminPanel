"use client";
import React, { useState } from 'react';
import { Plus, X, Trash, User } from '@phosphor-icons/react';
import { Mail, Phone, Globe, Building2 } from 'lucide-react';

interface Contact { id: number; name: string; email: string; phone: string; company: string; type: 'lead' | 'customer' | 'partner'; status: 'active' | 'inactive'; joined: string; }

const INITIAL: Contact[] = [
    { id: 1, name: 'Alice Smith', email: 'alice@company.com', phone: '+1 555-0101', company: 'Acme Corp', type: 'customer', status: 'active', joined: '2024-01-10' },
    { id: 2, name: 'John Doe', email: 'john.doe@gmail.com', phone: '+1 555-0202', company: '-', type: 'lead', status: 'active', joined: '2024-03-15' },
    { id: 3, name: 'Michael Scott', email: 'mscott@dundermifflin.com', phone: '+1 555-0303', company: 'Dunder Mifflin', type: 'partner', status: 'active', joined: '2023-11-20' },
];

export default function ContactsListPage() {
    const [contacts, setContacts] = useState<Contact[]>(INITIAL);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Contact | null>(null);
    const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', type: 'lead' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setContacts([...contacts, { id: Date.now(), name: form.name, email: form.email, phone: form.phone, company: form.company || '-', type: form.type as any, status: 'active', joined: new Date().toISOString().split('T')[0] }]);
        setShowModal(false);
        setForm({ name: '', email: '', phone: '', company: '', type: 'lead' });
    };

    const typeColor = (t: string) => t === 'customer' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : t === 'partner' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Contacts</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage all your leads, customers, and partners</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> Add Contact
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map(c => (
                    <div key={c.id} onClick={() => setSelected(c)} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-11 h-11 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-base shrink-0">
                                {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{c.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-gray-400 flex items-center gap-1 mt-0.5"><Building2 className="w-3 h-3" />{c.company}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${typeColor(c.type)}`}>{c.type}</span>
                        </div>
                        <div className="space-y-1.5 text-xs text-slate-500 dark:text-gray-400">
                            <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{c.email}</div>
                            <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{c.phone}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Contact Details</h2>
                            <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-xl">{selected.name.split(' ').map(n => n[0]).join('')}</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selected.name}</h3>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${typeColor(selected.type)}`}>{selected.type}</span>
                                </div>
                            </div>
                            {[['Email', selected.email], ['Phone', selected.phone], ['Company', selected.company], ['Joined', selected.joined]].map(([label, val]) => (
                                <div key={label} className="flex justify-between py-2 border-b border-slate-100 dark:border-gray-700">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">{val}</span>
                                </div>
                            ))}
                            <div className="flex justify-end gap-3 pt-2">
                                <button onClick={() => { setContacts(contacts.filter(c => c.id !== selected.id)); setSelected(null); }} className="px-4 py-2 text-rose-600 dark:text-rose-400 text-sm font-bold flex items-center gap-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors"><Trash size={16} weight="bold" /> Delete</button>
                                <button onClick={() => setSelected(null)} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Contact Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add Contact</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            {[['Full Name', 'name', 'text', 'John Smith'], ['Email Address', 'email', 'email', 'john@example.com'], ['Phone Number', 'phone', 'text', '+1 555-0000'], ['Company', 'company', 'text', 'Acme Corp (optional)']].map(([label, field, type, placeholder]) => (
                                <div key={field as string}>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">{label}</label>
                                    <input type={type as string} required={field !== 'company'} className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder={placeholder as string} value={(form as any)[field as string]} onChange={e => setForm({ ...form, [field as string]: e.target.value })} />
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Type</label>
                                <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                    <option value="lead">Lead</option><option value="customer">Customer</option><option value="partner">Partner</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Add Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
