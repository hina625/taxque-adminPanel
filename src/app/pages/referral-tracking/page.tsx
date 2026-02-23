'use client';

import React, { useState } from 'react';
import {
    MagnifyingGlass,
    Funnel,
    DownloadSimple,
    CaretLeft,
    CaretRight,
    Eye,
    ArrowsClockwise,
    X,
    CheckCircle,
    XCircle,
    Clock,
    LinkSimple,
    CurrencyDollar,
    Users,
    TrendUp,
} from '@phosphor-icons/react';

interface Referral {
    id: string;
    referrer: { name: string; email: string; initials: string; };
    referee: { name: string; email: string; initials: string; };
    program: string;
    status: 'converted' | 'pending' | 'rejected' | 'expired';
    reward: string;
    date: string;
    orderId?: string;
}

const REFERRALS: Referral[] = [
    { id: 'REF-001', referrer: { name: 'Rahul Verma', email: 'rahul@example.com', initials: 'RV' }, referee: { name: 'Pooja Sharma', email: 'pooja@example.com', initials: 'PS' }, program: 'Public Campaign', status: 'converted', reward: '₹ 500', date: '17 Dec 2025', orderId: 'ORD-8821' },
    { id: 'REF-002', referrer: { name: 'Anita Desai', email: 'anita@example.com', initials: 'AD' }, referee: { name: 'Karan Mehta', email: 'karan@example.com', initials: 'KM' }, program: 'VIP Partners', status: 'pending', reward: '₹ 750', date: '16 Dec 2025' },
    { id: 'REF-003', referrer: { name: 'Imran Khan', email: 'imran@example.com', initials: 'IK' }, referee: { name: 'Sneha Patel', email: 'sneha@example.com', initials: 'SP' }, program: 'Public Campaign', status: 'rejected', reward: '—', date: '15 Dec 2025' },
    { id: 'REF-004', referrer: { name: 'Rahul Verma', email: 'rahul@example.com', initials: 'RV' }, referee: { name: 'Arjun Bose', email: 'arjun@example.com', initials: 'AB' }, program: 'VIP Partners', status: 'converted', reward: '₹ 750', date: '14 Dec 2025', orderId: 'ORD-8803' },
    { id: 'REF-005', referrer: { name: 'Meera Iyer', email: 'meera@example.com', initials: 'MI' }, referee: { name: 'Vikram Nair', email: 'vikram@example.com', initials: 'VN' }, program: 'Public Campaign', status: 'expired', reward: '—', date: '10 Dec 2025' },
];

const STATUS_STYLES: Record<string, string> = {
    converted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    expired: 'bg-slate-100 text-slate-600 dark:bg-gray-700 dark:text-gray-400',
};

const STATUS_ICONS: Record<string, React.ElementType> = {
    converted: CheckCircle,
    pending: Clock,
    rejected: XCircle,
    expired: Clock,
};

export default function ReferralTrackingPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [programFilter, setProgramFilter] = useState('all');
    const [activeModal, setActiveModal] = useState<'viewDetails' | 'updateStatus' | null>(null);
    const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
    const [newStatus, setNewStatus] = useState<Referral['status']>('pending');

    const filtered = REFERRALS.filter(r => {
        const matchSearch = r.referrer.name.toLowerCase().includes(search.toLowerCase()) ||
            r.referee.name.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || r.status === statusFilter;
        const matchProgram = programFilter === 'all' || r.program === programFilter;
        return matchSearch && matchStatus && matchProgram;
    });

    const openView = (r: Referral) => { setSelectedReferral(r); setActiveModal('viewDetails'); };
    const openUpdate = (r: Referral) => { setSelectedReferral(r); setNewStatus(r.status); setActiveModal('updateStatus'); };
    const closeModal = () => { setActiveModal(null); setSelectedReferral(null); };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950 p-6 transition-colors duration-300">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Referral Tracking</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                        Monitor individual referral records, review status and manage rewards.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm text-slate-700 dark:text-gray-200 transition-colors">
                        <DownloadSimple size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-5 transition-colors">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Total referrals</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">3,482</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <LinkSimple size={24} weight="bold" />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-green-600 font-medium">▲ 18.6% vs last month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-5 transition-colors">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Converted</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">1,204</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <CheckCircle size={24} weight="bold" />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-gray-400">23.7% conversion rate</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-5 transition-colors">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Pending review</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">284</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-500">
                            <Clock size={24} weight="bold" />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-amber-600 font-medium">Awaiting action</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-5 transition-colors">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Rewards paid</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">₹ 6.2L</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-sky-50 dark:bg-sky-900/40 flex items-center justify-center text-sky-500">
                            <CurrencyDollar size={24} weight="bold" />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-green-600 font-medium">▲ 26.4% growth</p>
                </div>
            </section>

            {/* Filters */}
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-4 mb-6 transition-colors">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-slate-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2">
                        <MagnifyingGlass size={16} className="text-slate-400 dark:text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by referrer, referee or ID..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                        <option value="all">All Status</option>
                        <option value="converted">Converted</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="expired">Expired</option>
                    </select>
                    <select
                        value={programFilter}
                        onChange={e => setProgramFilter(e.target.value)}
                        className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                        <option value="all">All Programs</option>
                        <option value="Public Campaign">Public Campaign</option>
                        <option value="VIP Partners">VIP Partners</option>
                    </select>
                </div>
            </section>

            {/* Referral Table */}
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-gray-700/50 text-xs uppercase text-slate-500 dark:text-gray-400 font-semibold">
                            <tr>
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left">Referrer</th>
                                <th className="px-4 py-3 text-left">Referee</th>
                                <th className="px-4 py-3 text-left">Program</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Reward</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-16 text-center text-slate-500 dark:text-gray-400 text-sm">
                                        No referrals found matching your filters.
                                    </td>
                                </tr>
                            ) : filtered.map(r => {
                                const StatusIcon = STATUS_ICONS[r.status];
                                return (
                                    <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700 dark:text-gray-300">{r.id}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">{r.referrer.initials}</span>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{r.referrer.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-gray-400">{r.referrer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="h-8 w-8 rounded-full bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 flex items-center justify-center text-xs font-bold shrink-0">{r.referee.initials}</span>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{r.referee.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-gray-400">{r.referee.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-600 dark:text-gray-300">{r.program}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${STATUS_STYLES[r.status]}`}>
                                                <StatusIcon size={12} weight="bold" /> {r.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-semibold text-emerald-600">{r.reward}</td>
                                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-gray-400">{r.date}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openView(r)} className="p-1.5 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="View details">
                                                    <Eye size={16} />
                                                </button>
                                                <button onClick={() => openUpdate(r)} className="p-1.5 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-amber-50 dark:hover:bg-amber-900/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors" title="Update status">
                                                    <ArrowsClockwise size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-gray-700 text-xs text-slate-500 dark:text-gray-400">
                    <span>Showing {filtered.length} of {REFERRALS.length} referrals</span>
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">
                            <CaretLeft size={14} />
                        </button>
                        <button className="px-2.5 py-1 rounded bg-indigo-600 text-white text-xs">1</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">2</button>
                        <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">
                            <CaretRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* MODAL: View Referral Details */}
            {activeModal === 'viewDetails' && selectedReferral && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-gray-700">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Referral Details</h2>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{selectedReferral.id}</p>
                            </div>
                            <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                                    <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-3">Referrer</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-sm font-bold">{selectedReferral.referrer.initials}</span>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">{selectedReferral.referrer.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400">{selectedReferral.referrer.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                                    <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-3">Referee</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="h-10 w-10 rounded-full bg-slate-100 dark:bg-gray-600 text-slate-700 dark:text-gray-300 flex items-center justify-center text-sm font-bold">{selectedReferral.referee.initials}</span>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">{selectedReferral.referee.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400">{selectedReferral.referee.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Status', value: selectedReferral.status },
                                    { label: 'Program', value: selectedReferral.program },
                                    { label: 'Reward', value: selectedReferral.reward },
                                    { label: 'Date', value: selectedReferral.date },
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-50 dark:bg-gray-700 rounded-lg p-3 transition-colors">
                                        <p className="text-xs text-slate-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">{item.label}</p>
                                        <p className="font-semibold text-slate-900 dark:text-white capitalize">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                            {selectedReferral.orderId && (
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 flex items-center gap-3 transition-colors">
                                    <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" weight="fill" />
                                    <div>
                                        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Order Linked</p>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400">{selectedReferral.orderId}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-gray-700 flex justify-end">
                            <button onClick={closeModal} className="px-5 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-gray-600 text-sm font-medium transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Update Status */}
            {activeModal === 'updateStatus' && selectedReferral && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md transition-colors">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Update Status</h2>
                            <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-600 dark:text-gray-300">
                                Update status for referral <span className="font-semibold text-slate-900 dark:text-white">{selectedReferral.id}</span>.
                            </p>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase mb-2">New Status</label>
                                <select
                                    value={newStatus}
                                    onChange={e => setNewStatus(e.target.value as Referral['status'])}
                                    className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="converted">Converted</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-gray-700 flex gap-3 justify-end">
                            <button onClick={closeModal} className="px-5 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-gray-600 text-sm font-medium transition-colors">
                                Cancel
                            </button>
                            <button onClick={closeModal} className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
