'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';


export default function PartnerManagementPage() {
    // Mock Data from HTML
    const [partners, setPartners] = useState([
        {
            id: 'ps',
            name: 'PrimeSoft Solutions',
            email: 'contact@primesoft.in',
            tier: 'Platinum',
            region: 'India',
            revenue: 11240000,
            formattedRevenue: '1,12,40,000',
            pipeline: '18 deals · ₹ 54,30,000',
            health: 'Healthy',
            manager: 'Ananya Rao',
            phone: '+91-98765-12345',
            notes: 'Top performer in India. Strong in mid-market SaaS deals.',
            initials: 'PS',
            color: 'bg-teal-100 text-teal-700', // customized from primarySoft
            referrals: 124,
            lastReferral: '17 Dec 2025, 6:45 PM'
        },
        {
            id: 'ng',
            name: 'NorthGate Technologies',
            email: 'sales@northgate.co',
            tier: 'Gold',
            region: 'EMEA',
            revenue: 5860000,
            formattedRevenue: '58,60,000',
            pipeline: '9 deals · ₹ 23,15,000',
            health: 'Stable',
            manager: 'Rahul Verma',
            phone: '+44-20-1234-5678',
            notes: 'Strong in enterprise but slow deal cycles. Needs enablement on new product line.',
            initials: 'NG',
            color: 'bg-slate-100 text-slate-700',
            referrals: 57,
            lastReferral: '15 Dec 2025, 9:18 PM'
        },
        {
            id: 'ea',
            name: 'Elara Alliance',
            email: 'partners@elara.com',
            tier: 'Silver',
            region: 'APAC',
            revenue: 2140000,
            formattedRevenue: '21,40,000',
            pipeline: '5 deals · ₹ 9,70,000',
            health: 'At risk',
            manager: 'Imran Khan',
            phone: '+65-6789-1234',
            notes: 'Good fit for Elara Spares. Pipeline slowing in last 60 days; schedule Q1 enablement.',
            initials: 'EA',
            color: 'bg-slate-100 text-slate-700',
            referrals: 32,
            lastReferral: '12 Dec 2025, 3:09 PM'
        }
    ]);

    const [selectedPartner, setSelectedPartner] = useState<any>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    // Helper to handle row click
    const handlePartnerClick = (partner: any) => {
        setSelectedPartner(partner);
        const detailPanel = document.getElementById('detailPanel');
        if (detailPanel) {
            // In a real app, we'd use state to control visibility, 
            // but here we can just ensure it's scrolled into view or handled via state
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-900 dark:text-gray-100 transition-colors duration-300">
            {/* Header + filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight dark:text-white transition-colors">Partner Management</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-400 transition-colors">
                        Add partners, review applications, track referrals and manage opportunities.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <select className="text-xs sm:text-sm border dark:border-gray-800 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-slate-900 dark:text-white shadow-sm outline-none focus:ring-1 focus:ring-teal-700 transition-colors">
                        <option>All tiers</option>
                        <option>Platinum</option>
                        <option>Gold</option>
                        <option>Silver</option>
                    </select>
                    <select className="text-xs sm:text-sm border dark:border-gray-800 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-slate-900 dark:text-white shadow-sm outline-none focus:ring-1 focus:ring-teal-700 transition-colors">
                        <option>All regions</option>
                        <option>India</option>
                        <option>APAC</option>
                        <option>EMEA</option>
                    </select>
                    <button className="px-3 py-2 text-xs sm:text-sm rounded-lg border dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 shadow-sm transition-all">
                        Export partners
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-teal-700 text-white hover:bg-teal-800 shadow-sm transition-all"
                    >
                        + Add partner
                    </button>

                </div>
            </div>

            {/* KPIs */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6 transition-colors">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Active partners</p>
                    <p className="mt-2 text-2xl font-semibold dark:text-white">86</p>
                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">▲ 11 new this quarter</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Partner‑sourced revenue</p>
                    <p className="mt-2 text-2xl font-semibold dark:text-white">₹ 2.48Cr</p>
                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">▲ 24% vs last year</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Pending applications</p>
                    <p className="mt-2 text-2xl font-semibold dark:text-white">5</p>
                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-medium">Awaiting review</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Partner health score</p>
                    <p className="mt-2 text-2xl font-semibold dark:text-white">82 / 100</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">Composite of revenue, pipeline and engagement.</p>
                </div>
            </section>
            {/* TABLE + DETAILS PANEL */}
            <section className="grid gap-4 lg:grid-cols-3">
                {/* Partner list */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm lg:col-span-2 flex flex-col transition-colors">
                    <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800 transition-colors">
                        <div>
                            <p className="text-sm font-semibold dark:text-white transition-colors">Active Partners</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 transition-colors">
                                Click a row to see details. Use action buttons to manage partner activities.
                            </p>
                        </div>
                        <input
                            type="text"
                            placeholder="Search partner, email, region..."
                            className="hidden md:block text-xs sm:text-sm px-3 py-1.5 border dark:border-gray-800 rounded-lg bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                        />
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full text-xs sm:text-sm">
                            <thead className="bg-slate-50 dark:bg-gray-800/50 text-[11px] uppercase text-slate-500 dark:text-gray-400 transition-colors">
                                <tr>
                                    <th className="px-3 py-2 text-left">Partner</th>
                                    <th className="px-3 py-2 text-left">Tier</th>
                                    <th className="px-3 py-2 text-left">Region</th>
                                    <th className="px-3 py-2 text-left">Revenue (₹)</th>
                                    <th className="px-3 py-2 text-left">Referrals</th>
                                    <th className="px-3 py-2 text-left">Health</th>
                                    <th className="px-3 py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-gray-800 transition-colors">
                                {partners.map((partner) => (
                                    <tr
                                        key={partner.id}
                                        className="hover:bg-slate-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                                        onClick={() => handlePartnerClick(partner)}
                                    >
                                        <td className="px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${partner.tier === 'Platinum' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' : 'bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300'}`}>
                                                    {partner.initials}
                                                </span>
                                                <div>
                                                    <p className="text-xs font-medium dark:text-white transition-colors">{partner.name}</p>
                                                    <p className="text-[11px] text-slate-500 dark:text-gray-400 transition-colors">{partner.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className={`inline-flex px-2 py-0.5 text-[11px] rounded-full transition-colors
                                                ${partner.tier === 'Platinum' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                                                    partner.tier === 'Gold' ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400' :
                                                        'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400'}`}>
                                                {partner.tier}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 dark:text-gray-300 transition-colors">{partner.region}</td>
                                        <td className="px-3 py-2 dark:text-gray-300 transition-colors font-medium">{partner.formattedRevenue}</td>
                                        <td className="px-3 py-2 transition-colors">
                                            <span className="text-xs font-medium dark:text-gray-200">{partner.referrals} referrals</span><br />
                                            <span className="text-[11px] text-slate-500 dark:text-gray-400">Last: {partner.lastReferral}</span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className={`inline-flex px-2 py-0.5 text-[11px] rounded-full transition-colors
                                                ${partner.health === 'Healthy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                                    partner.health === 'Stable' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                                        'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                                                {partner.health}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <button className="text-xs text-teal-700 dark:text-teal-400 hover:underline" onClick={(e) => { e.stopPropagation(); /* Logic for view referrals */ }}>
                                                View referrals
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-3 border-t dark:border-gray-800 text-[11px] text-slate-500 dark:text-gray-400 transition-colors">
                        <span>Showing 1–10 of 86 partners</span>
                        <div className="flex items-center gap-1">
                            <button className="px-2 py-1 rounded border dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">Prev</button>
                            <button className="px-2 py-1 rounded bg-teal-700 text-white shadow-sm">1</button>
                            <button className="px-2 py-1 rounded border dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">2</button>
                            <button className="px-2 py-1 rounded border dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">3</button>
                            <button className="px-2 py-1 rounded border dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">Next</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar detail */}
                <aside className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm p-4 sm:p-5 flex flex-col h-fit sticky top-4 transition-colors">
                    {!selectedPartner ? (
                        <div className="text-center py-10 transition-colors">
                            <p className="text-sm font-semibold dark:text-white transition-colors">Select a partner</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 transition-colors">Click a row on the left to view partner details.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between mb-3 transition-colors">
                                <div>
                                    <p className="text-sm font-semibold dark:text-white transition-colors">{selectedPartner.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 transition-colors">{selectedPartner.email}</p>
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 transition-colors">
                                    {selectedPartner.tier}
                                </span>
                            </div>

                            <div className="text-xs space-y-2 mb-4 transition-colors">
                                <p><span className="font-medium dark:text-gray-200 transition-colors">Region:</span> <span className="dark:text-gray-300 transition-colors">{selectedPartner.region}</span></p>
                                <p><span className="font-medium dark:text-gray-200 transition-colors">Partner manager:</span> <span className="dark:text-gray-300 transition-colors">{selectedPartner.manager}</span></p>
                                <p><span className="font-medium dark:text-gray-200 transition-colors">Phone:</span> <span className="dark:text-gray-300 transition-colors">{selectedPartner.phone}</span></p>
                                <p><span className="font-medium dark:text-gray-200 transition-colors">Health:</span> <span className="dark:text-gray-300 transition-colors">{selectedPartner.health}</span></p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                                <div className="rounded-xl bg-slate-50 dark:bg-gray-800 p-3 transition-colors">
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400 transition-colors">Total revenue</p>
                                    <p className="mt-1 text-base font-semibold dark:text-white transition-colors">₹ {selectedPartner.formattedRevenue}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 dark:bg-gray-800 p-3 transition-colors">
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400 transition-colors">Active pipeline</p>
                                    <div className="mt-1 transition-colors">
                                        <p className="text-base font-semibold dark:text-white transition-colors">{selectedPartner.pipeline.split('·')[0]}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-gray-400 transition-colors">{selectedPartner.pipeline.split('·')[1]}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="mb-4 rounded-xl bg-teal-50/60 dark:bg-teal-900/20 p-3 text-xs transition-colors">
                                <p className="font-semibold mb-1 dark:text-teal-400 transition-colors">Last referral</p>
                                <p className="text-[11px] text-slate-700 dark:text-teal-300 transition-colors">{selectedPartner.lastReferral}</p>
                            </div>

                            <div className="mb-4 transition-colors">
                                <p className="text-xs font-semibold mb-1 dark:text-white transition-colors">Notes</p>
                                <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed transition-colors">
                                    {selectedPartner.notes}
                                </p>
                            </div>

                            <div className="mt-auto pt-3 border-t dark:border-gray-800 transition-colors">
                                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-gray-400 mb-1 transition-colors">Partner actions</p>
                                <div className="flex flex-wrap gap-2 text-[11px]">
                                    <button className="px-3 py-1.5 rounded-full border dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">
                                        Open profile
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full border dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">
                                        Opportunities
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full border dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">
                                        Log touchpoint
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full bg-teal-700 text-white hover:bg-teal-800 shadow-sm transition-all">
                                        Email partner
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </aside>
            </section>

            {/* Modals */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
                            <h2 className="text-lg font-semibold dark:text-white">Add New Partner</h2>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="p-6 space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            // Logic to add partner would go here
                            setIsAddModalOpen(false);
                        }}>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Partner Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Acme Corp"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="contact@acme.com"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all shadow-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Tier</label>
                                    <select className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all shadow-sm">
                                        <option>Platinum</option>
                                        <option>Gold</option>
                                        <option>Silver</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Region</label>
                                    <select className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all shadow-sm">
                                        <option>India</option>
                                        <option>APAC</option>
                                        <option>EMEA</option>
                                        <option>Americas</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    placeholder="+91-00000-00000"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all shadow-sm"
                                />
                            </div>

                            <div className="pt-2 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-teal-700 text-white hover:bg-teal-800 shadow-sm transition-all"
                                >
                                    Add Partner
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

