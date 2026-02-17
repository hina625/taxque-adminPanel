'use client';

import React, { useState } from 'react';

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
        <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-900">
            {/* Header + filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Partner Management</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Add partners, review applications, track referrals and manage opportunities.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <select className="text-xs sm:text-sm border rounded-lg px-3 py-2 bg-white shadow-sm outline-none focus:ring-1 focus:ring-teal-700">
                        <option>All tiers</option>
                        <option>Platinum</option>
                        <option>Gold</option>
                        <option>Silver</option>
                    </select>
                    <select className="text-xs sm:text-sm border rounded-lg px-3 py-2 bg-white shadow-sm outline-none focus:ring-1 focus:ring-teal-700">
                        <option>All regions</option>
                        <option>India</option>
                        <option>APAC</option>
                        <option>EMEA</option>
                    </select>
                    <button className="px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white hover:bg-slate-50 shadow-sm">
                        Export partners
                    </button>
                    <button className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-teal-700 text-white hover:bg-teal-800 shadow-sm">
                        + Add partner
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
                <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Active partners</p>
                    <p className="mt-2 text-2xl font-semibold">86</p>
                    <p className="mt-1 text-xs text-emerald-600">▲ 11 new this quarter</p>
                </div>
                <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Partner‑sourced revenue</p>
                    <p className="mt-2 text-2xl font-semibold">₹ 2.48Cr</p>
                    <p className="mt-1 text-xs text-emerald-600">▲ 24% vs last year</p>
                </div>
                <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Pending applications</p>
                    <p className="mt-2 text-2xl font-semibold">5</p>
                    <p className="mt-1 text-xs text-amber-600">Awaiting review</p>
                </div>
                <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Partner health score</p>
                    <p className="mt-2 text-2xl font-semibold">82 / 100</p>
                    <p className="mt-1 text-xs text-slate-500">Composite of revenue, pipeline and engagement.</p>
                </div>
            </section>

            {/* TABLE + DETAILS PANEL */}
            <section className="grid gap-4 lg:grid-cols-3">
                {/* Partner list */}
                <div className="bg-white rounded-2xl border shadow-sm lg:col-span-2 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <div>
                            <p className="text-sm font-semibold">Active Partners</p>
                            <p className="text-xs text-slate-500">
                                Click a row to see details. Use action buttons to manage partner activities.
                            </p>
                        </div>
                        <input
                            type="text"
                            placeholder="Search partner, email, region..."
                            className="hidden md:block text-xs sm:text-sm px-3 py-1.5 border rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                        />
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full text-xs sm:text-sm">
                            <thead className="bg-slate-50 text-[11px] uppercase text-slate-500">
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
                            <tbody className="divide-y divide-slate-100">
                                {partners.map((partner) => (
                                    <tr
                                        key={partner.id}
                                        className="hover:bg-slate-50 cursor-pointer"
                                        onClick={() => handlePartnerClick(partner)}
                                    >
                                        <td className="px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${partner.tier === 'Platinum' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {partner.initials}
                                                </span>
                                                <div>
                                                    <p className="text-xs font-medium">{partner.name}</p>
                                                    <p className="text-[11px] text-slate-500">{partner.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className={`inline-flex px-2 py-0.5 text-[11px] rounded-full 
                        ${partner.tier === 'Platinum' ? 'bg-amber-100 text-amber-700' :
                                                    partner.tier === 'Gold' ? 'bg-sky-100 text-sky-700' :
                                                        'bg-lime-100 text-lime-700'}`}>
                                                {partner.tier}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">{partner.region}</td>
                                        <td className="px-3 py-2">{partner.formattedRevenue}</td>
                                        <td className="px-3 py-2">
                                            <span className="text-xs font-medium">{partner.referrals} referrals</span><br />
                                            <span className="text-[11px] text-slate-500">Last: {partner.lastReferral}</span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className={`inline-flex px-2 py-0.5 text-[11px] rounded-full 
                        ${partner.health === 'Healthy' ? 'bg-emerald-100 text-emerald-700' :
                                                    partner.health === 'Stable' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-amber-100 text-amber-700'}`}>
                                                {partner.health}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <button className="text-xs text-teal-700 hover:underline" onClick={(e) => { e.stopPropagation(); /* Logic for view referrals */ }}>
                                                View referrals
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-3 border-t text-[11px] text-slate-500">
                        <span>Showing 1–10 of 86 partners</span>
                        <div className="flex items-center gap-1">
                            <button className="px-2 py-1 rounded border bg-white hover:bg-slate-50">Prev</button>
                            <button className="px-2 py-1 rounded bg-teal-700 text-white">1</button>
                            <button className="px-2 py-1 rounded border bg-white hover:bg-slate-50">2</button>
                            <button className="px-2 py-1 rounded border bg-white hover:bg-slate-50">3</button>
                            <button className="px-2 py-1 rounded border bg-white hover:bg-slate-50">Next</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar detail */}
                <aside className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5 flex flex-col h-fit sticky top-4">
                    {!selectedPartner ? (
                        <div className="text-center py-10">
                            <p className="text-sm font-semibold">Select a partner</p>
                            <p className="text-xs text-slate-500">Click a row on the left to view partner details.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-sm font-semibold">{selectedPartner.name}</p>
                                    <p className="text-xs text-slate-500">{selectedPartner.email}</p>
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                    {selectedPartner.tier}
                                </span>
                            </div>

                            <div className="text-xs space-y-2 mb-4">
                                <p><span className="font-medium">Region:</span> {selectedPartner.region}</p>
                                <p><span className="font-medium">Partner manager:</span> {selectedPartner.manager}</p>
                                <p><span className="font-medium">Phone:</span> {selectedPartner.phone}</p>
                                <p><span className="font-medium">Health:</span> {selectedPartner.health}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-[11px] text-slate-500">Total revenue</p>
                                    <p className="mt-1 text-base font-semibold">₹ {selectedPartner.formattedRevenue}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-[11px] text-slate-500">Active pipeline</p>
                                    <div className="mt-1">
                                        <p className="text-base font-semibold">{selectedPartner.pipeline.split('·')[0]}</p>
                                        <p className="text-[10px] text-slate-500">{selectedPartner.pipeline.split('·')[1]}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="mb-4 rounded-xl bg-teal-50/60 p-3 text-xs">
                                <p className="font-semibold mb-1">Last referral</p>
                                <p className="text-[11px] text-slate-700">{selectedPartner.lastReferral}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-xs font-semibold mb-1">Notes</p>
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                    {selectedPartner.notes}
                                </p>
                            </div>

                            <div className="mt-auto pt-3 border-t">
                                <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Partner actions</p>
                                <div className="flex flex-wrap gap-2 text-[11px]">
                                    <button className="px-3 py-1.5 rounded-full border bg-white hover:bg-slate-50">
                                        Open profile
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full border bg-white hover:bg-slate-50">
                                        Opportunities
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full border bg-white hover:bg-slate-50">
                                        Log touchpoint
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full bg-teal-700 text-white hover:bg-teal-800">
                                        Email partner
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </aside>
            </section>

            {/* Modals are placeholders for now */}
        </main>
    );
}
