"use client";

import React, { useState } from 'react';
import {
    MagnifyingGlass,
    Funnel,
    ArrowsClockwise,
    DownloadSimple,
    Plus,
    TrendUp,
    CurrencyInr,
    UserList,
    Eye,
    Pencil,
    X,
    CheckCircle,
    Clock,
    Phone,
    Envelope,
    Buildings,
    WarningCircle
} from '@phosphor-icons/react';

// Types
interface Referral {
    id: string;
    date: string;
    time: string;
    partnerName: string;
    partnerTier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
    partnerInitials: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    service: string;
    serviceCategory: string;
    value: number;
    commission: number;
    commissionRate: string;
    status: 'New lead' | 'Contacted' | 'Qualified' | 'Converted' | 'Rejected';
}

export default function ReferralTrackingPage() {
    // State
    const [referrals, setReferrals] = useState<Referral[]>([
        {
            id: 'REF-001',
            date: '17 Dec 2025',
            time: '6:45 PM',
            partnerName: 'PrimeSoft Solutions',
            partnerTier: 'Platinum',
            partnerInitials: 'PS',
            customerName: 'Rohan Sharma',
            customerPhone: '+91-98765-00001',
            customerEmail: 'rohan.sharma@example.com',
            service: 'GST Registration',
            serviceCategory: 'Tax Services',
            value: 5000,
            commission: 1500,
            commissionRate: '30%',
            status: 'Converted'
        },
        {
            id: 'REF-002',
            date: '16 Dec 2025',
            time: '4:12 PM',
            partnerName: 'NorthGate Tech',
            partnerTier: 'Gold',
            partnerInitials: 'NG',
            customerName: 'Meera Iyer',
            customerPhone: '+91-98765-00002',
            customerEmail: 'meera.iyer@example.com',
            service: 'Business Incorporation',
            serviceCategory: 'Corporate',
            value: 15000,
            commission: 3750,
            commissionRate: '25%',
            status: 'Qualified'
        },
        {
            id: 'REF-003',
            date: '15 Dec 2025',
            time: '11:05 AM',
            partnerName: 'Elara Alliance',
            partnerTier: 'Silver',
            partnerInitials: 'EA',
            customerName: 'Arjun Patil',
            customerPhone: '+91-98765-00003',
            customerEmail: 'arjun.patil@example.com',
            service: 'Engine Parts – Bulk',
            serviceCategory: 'Elara Spares',
            value: 50000,
            commission: 6600,
            commissionRate: '13.2%',
            status: 'New lead'
        },
        {
            id: 'REF-004',
            date: '15 Dec 2025',
            time: '9:30 AM',
            partnerName: 'PrimeSoft Solutions',
            partnerTier: 'Platinum',
            partnerInitials: 'PS',
            customerName: 'Kavya Nair',
            customerPhone: '+91-98765-00004',
            customerEmail: 'kavya.nair@example.com',
            service: 'Income Tax Filing',
            serviceCategory: 'Tax Services',
            value: 2500,
            commission: 563,
            commissionRate: '22.5%',
            status: 'Contacted'
        },
        {
            id: 'REF-005',
            date: '14 Dec 2025',
            time: '3:18 PM',
            partnerName: 'TechWave Solutions',
            partnerTier: 'Bronze',
            partnerInitials: 'TW',
            customerName: 'Vikram Singh',
            customerPhone: '+91-98765-00005',
            customerEmail: 'vikram.singh@example.com',
            service: 'TaxQue Professional',
            serviceCategory: 'SaaS',
            value: 12000,
            commission: 3000,
            commissionRate: 'Not eligible',
            status: 'Rejected'
        },
        {
            id: 'REF-006',
            date: '13 Dec 2025',
            time: '2:45 PM',
            partnerName: 'Elara Alliance',
            partnerTier: 'Silver',
            partnerInitials: 'EA',
            customerName: 'Priya Deshmukh',
            customerPhone: '+91-98765-00006',
            customerEmail: 'priya.d@example.com',
            service: 'Brake Systems',
            serviceCategory: 'Elara Spares',
            value: 15000,
            commission: 1650,
            commissionRate: '11%',
            status: 'Converted'
        },
        {
            id: 'REF-007',
            date: '12 Dec 2025',
            time: '5:20 PM',
            partnerName: 'PrimeSoft Solutions',
            partnerTier: 'Platinum',
            partnerInitials: 'PS',
            customerName: 'Ankit Gupta',
            customerPhone: '+91-98765-00007',
            customerEmail: 'ankit.g@example.com',
            service: 'GST Registration',
            serviceCategory: 'Tax Services',
            value: 5000,
            commission: 1500,
            commissionRate: '30%',
            status: 'Qualified'
        }
    ]);

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

    // Filters
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [partnerFilter, setPartnerFilter] = useState('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('month');

    // Filter Logic
    const filteredReferrals = referrals.filter(ref => {
        const matchesSearch = search === '' ||
            ref.customerName.toLowerCase().includes(search.toLowerCase()) ||
            ref.partnerName.toLowerCase().includes(search.toLowerCase()) ||
            ref.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === '' || ref.status === statusFilter;
        const matchesPartner = partnerFilter === '' || ref.partnerName === partnerFilter; // Simplified
        const matchesService = serviceFilter === '' || ref.serviceCategory === serviceFilter || ref.service === serviceFilter; // Simplified

        return matchesSearch && matchesStatus && matchesPartner && matchesService;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New lead': return 'bg-amber-100 text-amber-700';
            case 'Contacted': return 'bg-sky-100 text-sky-700';
            case 'Qualified': return 'bg-blue-100 text-blue-700';
            case 'Converted': return 'bg-emerald-100 text-emerald-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedReferral(null);
    };

    const handleUpdateStatus = (newStatus: string) => {
        if (selectedReferral) {
            setReferrals(referrals.map(r => r.id === selectedReferral.id ? { ...r, status: newStatus as any } : r));
            closeModal();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Referral Tracking</h1>
                    <p className="mt-1 text-sm text-slate-500">Monitor all partner referrals, track conversion status, and manage commission payouts in real-time.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border bg-white hover:bg-slate-50 shadow-sm text-slate-700">
                        <DownloadSimple size={16} /> Export report
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-teal-700 text-white hover:bg-teal-800 shadow-sm" onClick={() => setActiveModal('addReferral')}>
                        <Plus size={16} /> Add referral
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total referrals</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{referrals.length}</p>
                    <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1"><TrendUp size={12} weight="bold" /> 34 this month</p>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Conversion rate</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">62%</p>
                    <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1"><TrendUp size={12} weight="bold" /> 8% vs last month</p>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total commission</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">₹ 4.8L</p>
                    <p className="mt-1 text-xs text-slate-500">Earned by partners</p>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Active leads</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{referrals.filter(r => r.status !== 'Converted' && r.status !== 'Rejected').length}</p>
                    <p className="mt-1 text-xs text-amber-600">In pipeline</p>
                </div>
            </section>

            {/* Filters */}
            <section className="bg-white rounded-xl border shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">Search</label>
                        <div className="relative">
                            <input type="text" placeholder="Customer, partner, email..." className="w-full pl-8 pr-3 py-2 text-xs border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-teal-500" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <MagnifyingGlass className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Status</label>
                        <select className="w-full px-3 py-2 text-xs border rounded-lg bg-white outline-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">All statuses</option>
                            <option value="New lead">New lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Converted">Converted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Partner</label>
                        <select className="w-full px-3 py-2 text-xs border rounded-lg bg-white outline-none" value={partnerFilter} onChange={(e) => setPartnerFilter(e.target.value)}>
                            <option value="">All partners</option>
                            <option value="PrimeSoft Solutions">PrimeSoft Solutions</option>
                            <option value="NorthGate Tech">NorthGate Tech</option>
                            <option value="Elara Alliance">Elara Alliance</option>
                            <option value="TechWave Solutions">TechWave Solutions</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Service</label>
                        <select className="w-full px-3 py-2 text-xs border rounded-lg bg-white outline-none" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
                            <option value="">All services</option>
                            <option value="GST Registration">GST Registration</option>
                            <option value="Income Tax Filing">Income Tax Filing</option>
                            <option value="Business Incorporation">Business Incorporation</option>
                            <option value="Elara Spares">Elara Spares</option>
                            <option value="SaaS">TaxQue Subscription</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Date range</label>
                        <select className="w-full px-3 py-2 text-xs border rounded-lg bg-white outline-none" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                            <option value="all">All time</option>
                            <option value="today">Today</option>
                            <option value="week">Last 7 days</option>
                            <option value="month">This month</option>
                            <option value="quarter">This quarter</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <button className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1" onClick={() => { setSearch(''); setStatusFilter(''); setPartnerFilter(''); setServiceFilter(''); setDateFilter('month'); }}>
                        <X size={12} /> Clear all filters
                    </button>
                    <span className="text-xs text-slate-500">
                        Showing <span className="font-semibold">{filteredReferrals.length}</span> of <span className="font-semibold">{referrals.length}</span> referrals
                    </span>
                </div>
            </section>

            {/* Referral Table */}
            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
                    <div>
                        <p className="text-sm font-semibold text-slate-900">All Referrals</p>
                        <p className="text-xs text-slate-500">Complete list of partner referrals with status and commission tracking</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-50 text-xs flex items-center gap-1">
                        <ArrowsClockwise size={14} /> Refresh
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs sm:text-sm text-left">
                        <thead className="bg-slate-50 text-[11px] uppercase text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-3">Ref ID</th>
                                <th className="px-4 py-3">Date & time</th>
                                <th className="px-4 py-3">Partner</th>
                                <th className="px-4 py-3">Customer details</th>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">Value (₹)</th>
                                <th className="px-4 py-3">Commission (₹)</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredReferrals.map((ref) => (
                                <tr key={ref.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-xs font-semibold text-teal-700">{ref.id}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-xs font-medium text-slate-900">{ref.date}</p>
                                        <p className="text-[11px] text-slate-500">{ref.time}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-[10px] font-bold">
                                                {ref.partnerInitials}
                                            </span>
                                            <div>
                                                <p className="text-xs font-medium text-slate-900">{ref.partnerName}</p>
                                                <p className="text-[11px] text-slate-500">{ref.partnerTier}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-xs font-medium text-slate-900">{ref.customerName}</p>
                                        <p className="text-[11px] text-slate-500">{ref.customerPhone}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-xs font-medium text-slate-900">{ref.service}</p>
                                        <p className="text-[11px] text-slate-500">{ref.serviceCategory}</p>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900">
                                        ₹ {ref.value.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`font-medium ${ref.commissionRate === 'Not eligible' ? 'text-slate-400 line-through' : 'text-emerald-600'}`}>
                                            ₹ {ref.commission.toLocaleString()}
                                        </span>
                                        <p className="text-[11px] text-slate-500">{ref.commissionRate} {ref.commissionRate !== 'Not eligible' && `(${ref.partnerTier})`}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex px-2 py-0.5 text-[11px] rounded-full font-medium ${getStatusColor(ref.status)}`}>
                                            {ref.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-slate-400 hover:text-teal-600" onClick={() => { setSelectedReferral(ref); setActiveModal('viewDetails'); }} title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button className="text-slate-400 hover:text-teal-600" onClick={() => { setSelectedReferral(ref); setActiveModal('updateStatus'); }} title="Update">
                                                <Pencil size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredReferrals.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                                        No referrals found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* MODAL: View Referral Details */}
            {activeModal === 'viewDetails' && selectedReferral && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Referral Details</h3>
                                <p className="text-sm text-slate-500">{selectedReferral.id}</p>
                            </div>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Partner & Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2"><Buildings size={14} /> Partner Information</p>
                                    <div className="space-y-2 text-sm">
                                        <p className="flex justify-between"><span className="text-slate-500">Name:</span> <span className="font-medium text-slate-900">{selectedReferral.partnerName}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Tier:</span> <span className="font-medium text-slate-900">{selectedReferral.partnerTier}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">ID:</span> <span className="font-medium text-slate-900">PART-8892</span></p>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2"><UserList size={14} /> Customer Information</p>
                                    <div className="space-y-2 text-sm">
                                        <p className="flex justify-between"><span className="text-slate-500">Name:</span> <span className="font-medium text-slate-900">{selectedReferral.customerName}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Phone:</span> <span className="font-medium text-slate-900">{selectedReferral.customerPhone}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Email:</span> <span className="font-medium text-slate-900">{selectedReferral.customerEmail}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Service & Commission */}
                            <div className="rounded-xl bg-teal-50 border border-teal-100 p-4">
                                <div className="grid grid-cols-3 gap-4 text-center divide-x divide-teal-200/50">
                                    <div>
                                        <p className="text-xs text-teal-600 mb-1">Service</p>
                                        <p className="font-semibold text-teal-900">{selectedReferral.service}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-teal-600 mb-1">Value</p>
                                        <p className="font-semibold text-teal-900">₹ {selectedReferral.value.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-teal-600 mb-1">Commission</p>
                                        <p className="font-bold text-emerald-600 text-lg">₹ {selectedReferral.commission.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <p className="text-sm font-bold text-slate-900 mb-4">Activity Timeline</p>
                                <div className="space-y-0 relative">
                                    {/* Timeline items (mocked for demo based on status) */}
                                    <div className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                                            <div className="w-0.5 h-full bg-slate-100 group-last:hidden min-h-[40px]"></div>
                                        </div>
                                        <div className="pb-6">
                                            <p className="text-sm font-medium text-slate-900">Referral converted</p>
                                            <p className="text-xs text-slate-500">{selectedReferral.date}, {selectedReferral.time}</p>
                                            <p className="text-xs text-slate-600 mt-1">Customer purchased service. Commission approved.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                                            <div className="w-0.5 h-full bg-slate-100 group-last:hidden min-h-[40px]"></div>
                                        </div>
                                        <div className="pb-6">
                                            <p className="text-sm font-medium text-slate-900">Lead qualified</p>
                                            <p className="text-xs text-slate-500">17 Dec 2025, 2:30 PM</p>
                                            <p className="text-xs text-slate-600 mt-1">Customer expressed interest. Quote sent.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-slate-900 mb-2">Notes</p>
                                <textarea className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none" rows={3} placeholder="Add internal notes..."></textarea>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">Close</button>
                            <button className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 text-sm font-medium">Save Notes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Update Status */}
            {activeModal === 'updateStatus' && selectedReferral && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Update Status</h3>
                                <p className="text-sm text-slate-500">{selectedReferral.id}</p>
                            </div>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Status</label>
                                <div className="px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-700">{selectedReferral.status}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Status</label>
                                <select className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-teal-500" onChange={(e) => handleUpdateStatus(e.target.value)}>
                                    <option>New lead</option>
                                    <option>Contacted</option>
                                    <option>Qualified</option>
                                    <option>Converted</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Comments</label>
                                <textarea className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none" rows={3} placeholder="Reason for status change..."></textarea>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-3 flex gap-3 text-xs text-amber-800">
                                <WarningCircle size={20} className="shrink-0" />
                                <p>Marking as "Converted" will approve commission payout. Marking as "Rejected" will cancel commission eligibility.</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">Cancel</button>
                            <button className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 text-sm font-medium">Update Status</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Add Referral (Placeholder) */}
            {activeModal === 'addReferral' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h3 className="text-lg font-bold text-slate-900">Add New Referral</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500">Form implementation placeholder...</p>
                        </div>
                        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">Cancel</button>
                            <button onClick={closeModal} className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 text-sm font-medium">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
