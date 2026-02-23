"use client";

import React, { useState } from 'react';
import {
    Ticket, Plus, CaretLeft, CaretRight, CaretRight as ChevronRight,
    MagnifyingGlass, Funnel, X, PaperPlaneRight, Paperclip,
    Trash, ChatCircleDots, TrendUp, TrendDown
} from '@phosphor-icons/react';

interface TicketData {
    id: string; subject: string; customer: string; email: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    assignedTo: string; created: string; updated: string;
    category: string; conversation?: Message[];
}
interface Message { id: string; author: string; role: 'agent' | 'customer'; time: string; text: string; }

const INITIAL_TICKETS: TicketData[] = [
    { id: 'TKT-001', subject: 'Unable to login to account', customer: 'John Smith', email: 'john@example.com', priority: 'high', status: 'open', assignedTo: 'John Doe', created: '2 hours ago', updated: '1 hour ago', category: 'Technical', conversation: [{ id: '1', author: 'John Doe', role: 'agent', time: '1 hour ago', text: 'Thank you for contacting support. I have unlocked your account.' }, { id: '2', author: 'John Smith', role: 'customer', time: '30 mins ago', text: 'Thanks, it works now!' }] },
    { id: 'TKT-002', subject: 'Billing inquiry for invoice #1234', customer: 'Sarah Johnson', email: 'sarah@example.com', priority: 'medium', status: 'in-progress', assignedTo: 'Sarah Smith', created: '5 hours ago', updated: '3 hours ago', category: 'Billing' },
    { id: 'TKT-003', subject: 'Feature request: Dark mode', customer: 'Mike Wilson', email: 'mike@example.com', priority: 'low', status: 'open', assignedTo: 'Unassigned', created: '1 day ago', updated: '1 day ago', category: 'Feature Request' },
    { id: 'TKT-004', subject: 'Critical bug in payment gateway', customer: 'Emily Brown', email: 'emily@example.com', priority: 'urgent', status: 'in-progress', assignedTo: 'Mike Johnson', created: '30 minutes ago', updated: '15 minutes ago', category: 'Bug Report' },
    { id: 'TKT-005', subject: 'How to export data?', customer: 'David Lee', email: 'david@example.com', priority: 'low', status: 'resolved', assignedTo: 'John Doe', created: '2 days ago', updated: '6 hours ago', category: 'General' },
];

export default function SupportTicketsPage() {
    const [tickets, setTickets] = useState<TicketData[]>(INITIAL_TICKETS);
    const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
    const [replyText, setReplyText] = useState('');
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [newTicketForm, setNewTicketForm] = useState({ customer: '', email: '', subject: '', priority: 'medium', category: 'technical', description: '' });

    const getPriorityColor = (p: string) => { switch (p) { case 'urgent': return 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'; case 'high': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'; case 'medium': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'; default: return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'; } };
    const getStatusColor = (s: string) => { switch (s) { case 'resolved': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'; case 'open': return 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-sky-100 dark:border-sky-900/30'; case 'in-progress': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'; default: return 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-400 border-slate-100 dark:border-gray-700'; } };

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        const newTicket: TicketData = { id: `TKT-00${tickets.length + 1}`, subject: newTicketForm.subject, customer: newTicketForm.customer, email: newTicketForm.email, priority: newTicketForm.priority as any, status: 'open', assignedTo: 'Unassigned', created: 'Just now', updated: 'Just now', category: newTicketForm.category };
        setTickets([newTicket, ...tickets]);
        setShowNewTicketModal(false);
        setNewTicketForm({ customer: '', email: '', subject: '', priority: 'medium', category: 'technical', description: '' });
    };

    const handleSendReply = () => {
        if (!selectedTicket || !replyText.trim()) return;
        const newMessage: Message = { id: Date.now().toString(), author: 'Admin User', role: 'agent', time: 'Just now', text: replyText };
        const updatedTicket = { ...selectedTicket, conversation: [...(selectedTicket.conversation || []), newMessage], updated: 'Just now' };
        setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
        setSelectedTicket(updatedTicket);
        setReplyText('');
    };

    const handleDeleteTicket = (id: string) => { setTickets(tickets.filter(t => t.id !== id)); setSelectedTicket(null); };
    const handleStatusChange = (id: string, newStatus: TicketData['status']) => { setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t)); if (selectedTicket?.id === id) setSelectedTicket({ ...selectedTicket, status: newStatus }); };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">All Tickets</h1>
                    <p className="text-slate-500 dark:text-gray-400">Manage and respond to customer support tickets</p>
                </div>
                <button onClick={() => setShowNewTicketModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 flex items-center gap-2">
                    <Plus weight="bold" size={18} /> New Ticket
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm flex flex-wrap gap-4">
                {['Status', 'Priority', 'Assigned To'].map(label => (
                    <div key={label} className="flex-1 min-w-[180px]">
                        <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">{label}</label>
                        <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm font-medium dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors">
                            <option>All {label}</option>
                        </select>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-gray-900/50 text-left">
                        <tr>{['Ticket ID', 'Subject', 'Customer', 'Priority', 'Status', 'Created', ''].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                        {tickets.map(ticket => (
                            <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group">
                                <td className="px-6 py-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">{ticket.id}</td>
                                <td className="px-6 py-4 text-sm text-slate-700 dark:text-gray-200 font-medium">{ticket.subject}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400">{ticket.customer}</td>
                                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span></td>
                                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${getStatusColor(ticket.status)}`}>{ticket.status}</span></td>
                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-500">{ticket.created}</td>
                                <td className="px-6 py-4"><ChevronRight size={20} weight="bold" className="text-slate-300 dark:text-gray-600 group-hover:text-indigo-500" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between p-4 border-t border-slate-100 dark:border-gray-700">
                    <div className="text-sm text-slate-500 dark:text-gray-400">Showing 1 to {tickets.length} of {tickets.length} entries</div>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-gray-600 text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"><CaretLeft weight="bold" /></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-gray-600 text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"><CaretRight weight="bold" /></button>
                    </div>
                </div>
            </div>

            {/* Ticket Detail Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Ticket Details</h2>
                                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">{selectedTicket.id}</span>
                            </div>
                            <button onClick={() => setSelectedTicket(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400"><X weight="bold" size={20} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-slate-100 dark:border-gray-700">
                                {[['Status', <span key="s" className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${getStatusColor(selectedTicket.status)}`}>{selectedTicket.status}</span>], ['Priority', <span key="p" className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(selectedTicket.priority)}`}>{selectedTicket.priority}</span>], ['Customer', selectedTicket.customer], ['Assigned To', selectedTicket.assignedTo]].map(([label, val]) => (
                                    <div key={String(label)}><div className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">{label}</div><div className="text-sm font-bold text-slate-700 dark:text-gray-200">{val}</div></div>
                                ))}
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{selectedTicket.subject}</h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm bg-slate-50 dark:bg-gray-900/50 p-4 rounded-xl border border-slate-100 dark:border-gray-700">Customer描述details appear here.</p>
                                </div>
                                {selectedTicket.conversation && (
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2"><ChatCircleDots size={20} className="text-indigo-600" weight="fill" />Conversation</h4>
                                        {selectedTicket.conversation.map(msg => (
                                            <div key={msg.id} className={`flex gap-4 ${msg.role === 'agent' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xs ${msg.role === 'agent' ? 'bg-indigo-600' : 'bg-slate-400 dark:bg-gray-600'}`}>{msg.author.split(' ').map(n => n[0]).join('')}</div>
                                                <div className={`flex-1 max-w-[80%] space-y-1 ${msg.role === 'agent' ? 'items-end flex flex-col' : ''}`}>
                                                    <div className="flex items-center gap-2 text-xs text-slate-400"><span className="font-bold text-slate-700 dark:text-gray-300">{msg.author}</span><span>•</span><span>{msg.time}</span></div>
                                                    <div className={`p-4 rounded-2xl text-sm ${msg.role === 'agent' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300 rounded-tl-none'}`}>{msg.text}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="pt-6 border-t border-slate-100 dark:border-gray-700 space-y-3">
                                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Add Reply</label>
                                    <textarea className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 min-h-[100px]" placeholder="Type your response..." value={replyText} onChange={e => setReplyText(e.target.value)} />
                                    <div className="flex justify-end">
                                        <button onClick={handleSendReply} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2"><PaperPlaneRight weight="bold" />Send Reply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 py-5 border-t border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 flex justify-between items-center">
                            <button onClick={() => handleDeleteTicket(selectedTicket.id)} className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Trash weight="bold" size={18} />Delete</button>
                            <div className="flex gap-3">
                                <select className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm font-bold dark:text-gray-300 focus:outline-none cursor-pointer" value={selectedTicket.status} onChange={e => handleStatusChange(selectedTicket.id, e.target.value as any)}>
                                    <option value="open">Mark as Open</option><option value="in-progress">Mark as In Progress</option><option value="resolved">Mark as Resolved</option><option value="closed">Mark as Closed</option>
                                </select>
                                <button onClick={() => setSelectedTicket(null)} className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* New Ticket Modal */}
            {showNewTicketModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Create New Ticket</h2>
                            <button onClick={() => setShowNewTicketModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleCreateTicket} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Customer Name</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" value={newTicketForm.customer} onChange={e => setNewTicketForm({ ...newTicketForm, customer: e.target.value })} /></div>
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label><input type="email" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" value={newTicketForm.email} onChange={e => setNewTicketForm({ ...newTicketForm, email: e.target.value })} /></div>
                            </div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Subject</label><input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Brief description of the issue" value={newTicketForm.subject} onChange={e => setNewTicketForm({ ...newTicketForm, subject: e.target.value })} /></div>
                            <div className="grid grid-cols-2 gap-6">
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Priority</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={newTicketForm.priority} onChange={e => setNewTicketForm({ ...newTicketForm, priority: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></div>
                                <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Category</label><select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={newTicketForm.category} onChange={e => setNewTicketForm({ ...newTicketForm, category: e.target.value })}><option value="technical">Technical</option><option value="billing">Billing</option><option value="general">General</option><option value="bug">Bug Report</option><option value="feature">Feature Request</option></select></div>
                            </div>
                            <div><label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</label><textarea className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 min-h-[100px] transition-colors" placeholder="Describe the issue in detail..." value={newTicketForm.description} onChange={e => setNewTicketForm({ ...newTicketForm, description: e.target.value })} /></div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowNewTicketModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all">Create Ticket</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
