"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Search, Filter, MoreHorizontal } from "lucide-react";
import { LeadModal, Lead } from "../components/Modals";

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

    useEffect(() => {
        setLeads([
            { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@innovate.com', company: 'Innovate Digital', phone: '+1234567890', status: 'New', value: 24500, source: 'Website', notes: 'Interested in our services', created: new Date().toISOString() }
        ]);
    }, []);

    const handleAddLead = (lead: Omit<Lead, 'id' | 'created'>) => {
        const newLead: Lead = { ...lead, id: Date.now(), created: new Date().toISOString() };
        setLeads([...leads, newLead]);
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Leads Management</h1>
                    <p className="text-slate-500 dark:text-gray-400">Track and convert potential customers</p>
                </div>
                <button onClick={() => setIsLeadModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-sm transition-colors">
                    <UserPlus className="w-5 h-5" /> Add Lead
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-b border-slate-200 dark:border-gray-700 font-semibold text-slate-500 dark:text-gray-400 text-sm uppercase">
                            <div>Name</div>
                            <div>Company</div>
                            <div>Status</div>
                            <div>Value</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-gray-700">
                            {leads.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No leads yet. Click "Add Lead" to create one.</div>
                            ) : (
                                leads.map((lead) => (
                                    <div key={lead.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-sm">
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-gray-100">{lead.firstName} {lead.lastName}</div>
                                            <div className="text-slate-600 dark:text-gray-400 text-xs">{lead.email}</div>
                                        </div>
                                        <div className="text-slate-600 dark:text-gray-400">{lead.company}</div>
                                        <div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${lead.status === 'New' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                                lead.status === 'Contacted' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                                                    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-slate-700 dark:text-gray-300">${lead.value.toLocaleString()}</div>
                                        <div>
                                            <button className="text-slate-400 hover:text-indigo-600 p-1"><MoreHorizontal className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onSave={handleAddLead} />
        </div>
    );
}
