"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { DealModal, Deal } from "../components/Modals";

export default function PipelinePage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);

    useEffect(() => {
        setDeals([
            { id: 1, name: 'Innovate Digital', company: 'Innovate Digital Inc', value: 24500, stage: 'lead', description: 'Digital transformation project', contact: 'John Smith', created: new Date().toISOString() }
        ]);
    }, []);

    const handleAddDeal = (deal: Omit<Deal, 'id' | 'created'>) => {
        const newDeal: Deal = { ...deal, id: Date.now(), created: new Date().toISOString() };
        setDeals([...deals, newDeal]);
    };

    const stages = [
        { id: 'lead', name: 'Lead Generation' },
        { id: 'qualification', name: 'Qualification' },
        { id: 'proposal', name: 'Proposal' },
        { id: 'negotiation', name: 'Negotiation' },
        { id: 'closed', name: 'Closed Won' }
    ];

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sales Pipeline</h1>
                    <p className="text-slate-500 dark:text-gray-400">Drag and drop deals between stages</p>
                </div>
                <button onClick={() => setIsDealModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-sm transition-colors">
                    <Plus className="w-5 h-5" /> New Deal
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
                {stages.map(stage => {
                    const stageDeals = deals.filter(d => d.stage === stage.id);
                    const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
                    return (
                        <div key={stage.id} className="flex-shrink-0 w-80 bg-slate-100 dark:bg-gray-800 rounded-xl p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-semibold text-slate-800 dark:text-gray-100">{stage.name}</h3>
                                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full">{stageDeals.length}</span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">${totalValue.toLocaleString()} potential value</div>
                            <div className="flex flex-col gap-3 min-h-[100px]">
                                {stageDeals.map(deal => (
                                    <div key={deal.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-transparent hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-slate-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{deal.name}</h4>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-3">{deal.company}</p>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-slate-700 dark:text-gray-300">${deal.value.toLocaleString()}</span>
                                            <span className="text-slate-400 dark:text-gray-500">Today</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <DealModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} onSave={handleAddDeal} />
        </div>
    );
}
