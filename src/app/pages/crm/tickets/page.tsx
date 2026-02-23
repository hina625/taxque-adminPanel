"use client";

import React, { useState, useEffect } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { TicketModal, Ticket } from "../components/Modals";

export default function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

    useEffect(() => {
        setTickets([
            { id: 1001, subject: 'Login Issue', description: 'Cannot access customer portal', customer: 'TechCorp Solutions', email: 'support@techcorp.com', priority: 'high', category: 'technical', status: 'open', assignedTo: 'Support Team', created: new Date().toISOString() }
        ]);
    }, []);

    const handleAddTicket = (ticket: Omit<Ticket, 'id' | 'created'>) => {
        const newTicket: Ticket = { ...ticket, id: Date.now(), created: new Date().toISOString() };
        setTickets([...tickets, newTicket]);
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Support Tickets</h1>
                    <p className="text-slate-500 dark:text-gray-400 transition-colors">Manage customer support requests</p>
                </div>
                <button onClick={() => setIsTicketModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-sm transition-colors">
                    <Plus className="w-5 h-5" /> New Ticket
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[100px_2fr_1fr_1fr_1fr_100px] px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-b border-slate-200 dark:border-gray-700 font-semibold text-slate-500 dark:text-gray-400 text-sm uppercase">
                            <div>Ticket ID</div>
                            <div>Subject</div>
                            <div>Customer</div>
                            <div>Priority</div>
                            <div>Status</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-gray-700">
                            {tickets.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No tickets found.</div>
                            ) : (
                                tickets.map((ticket) => (
                                    <div key={ticket.id} className="grid grid-cols-[100px_2fr_1fr_1fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-sm">
                                        <div className="font-mono text-slate-500 dark:text-gray-400">#{ticket.id}</div>
                                        <div className="font-medium text-slate-900 dark:text-gray-100">{ticket.subject}</div>
                                        <div className="text-slate-600 dark:text-gray-400">{ticket.customer}</div>
                                        <div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ticket.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                                                {ticket.priority.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ticket.status === 'resolved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <div><button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1"><MoreHorizontal className="w-5 h-5" /></button></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} onSave={handleAddTicket} />
        </div>
    );
}
