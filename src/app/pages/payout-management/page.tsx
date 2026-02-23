'use client';

import React, { useState } from 'react';

export default function PayoutManagementPage() {
    const [activeTab, setActiveTab] = useState('payouts');

    return (
        <main className="min-h-screen text-slate-900 dark:text-gray-100 p-6 bg-slate-100/50 dark:bg-gray-950 transition-colors duration-300">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Payout Management</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                        Manage partner bank accounts, verify details, process commission payouts and track payment history.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm font-medium transition-colors">
                        📊 Export report
                    </button>
                    <button className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-teal-700 text-white hover:bg-teal-800 shadow-sm font-medium">
                        💸 Process bulk payout
                    </button>
                </div>
            </div>

            {/* Summary cards */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Pending payouts</p>
                    <p className="mt-2 text-2xl font-semibold">₹ 2.4L</p>
                    <p className="mt-1 text-xs text-amber-600">18 partners awaiting payment</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Paid this month</p>
                    <p className="mt-2 text-2xl font-semibold">₹ 4.8L</p>
                    <p className="mt-1 text-xs text-emerald-600">▲ 24% vs last month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Verified accounts</p>
                    <p className="mt-2 text-2xl font-semibold">68</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">Bank details approved</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-5 transition-colors">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Pending verification</p>
                    <p className="mt-2 text-2xl font-semibold">5</p>
                    <p className="mt-1 text-xs text-amber-600">Awaiting approval</p>
                </div>
            </section>

            {/* BANK VERIFICATION REQUESTS */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6 transition-colors">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <p className="text-sm font-semibold">Bank Account Verification Requests</p>
                        <p className="text-xs text-slate-500 dark:text-gray-400">
                            Review and approve partner bank details submissions
                        </p>
                    </div>
                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-medium">
                        5 pending
                    </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-gray-700">
                    {/* Request 1 */}
                    <div className="p-4 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <span className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center text-sm font-semibold">
                                    TW
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-semibold">TechWave Solutions Pvt Ltd</p>
                                        <span className="inline-flex px-2 py-0.5 text-[11px] rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                                            Pending verification
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 mb-2">Submitted: 17 Dec 2025, 5:30 PM</p>

                                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-gray-700 rounded-lg p-3">
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">Account holder name</p>
                                            <p className="font-medium">TechWave Solutions Private Limited</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">Bank name</p>
                                            <p className="font-medium">HDFC Bank</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">Account number</p>
                                            <p className="font-medium font-mono">50200123456789</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">IFSC code</p>
                                            <p className="font-medium font-mono">HDFC0001234</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">
                                        <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs shadow-sm">
                                            ✓ Approve &amp; verify
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 text-xs shadow-sm transition-colors">
                                            ✕ Reject
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 text-xs shadow-sm transition-colors">
                                            Request corrections
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Request 2 */}
                    <div className="p-4 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <span className="h-10 w-10 rounded-full bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 flex items-center justify-center text-sm font-semibold">
                                    GC
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-semibold">Global Consulting Partners</p>
                                        <span className="inline-flex px-2 py-0.5 text-[11px] rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                                            Pending verification
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 mb-2">Submitted: 16 Dec 2025, 2:15 PM</p>

                                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-gray-700 rounded-lg p-3">
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">Account holder name</p>
                                            <p className="font-medium">Global Consulting Partners LLP</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">Bank name</p>
                                            <p className="font-medium">ICICI Bank</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">Account number</p>
                                            <p className="font-medium font-mono">001234567890</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-gray-400 text-[11px]">IFSC code</p>
                                            <p className="font-medium font-mono">ICIC0001234</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">
                                        <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs shadow-sm">
                                            ✓ Approve &amp; verify
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 text-xs shadow-sm transition-colors">
                                            ✕ Reject
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 text-xs shadow-sm transition-colors">
                                            Request corrections
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PAYOUT REQUESTS & PROCESSING */}
            <section className="grid gap-4 lg:grid-cols-2 mb-6">
                {/* Pending payout requests */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm font-semibold">Payout Requests</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400">Partners requesting commission withdrawal</p>
                        </div>
                        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-medium">
                            6 pending
                        </span>
                    </div>
                    <div className="p-3 space-y-2 max-h-96 overflow-y-auto">

                        {/* Payout request 1 */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-xs font-semibold">PrimeSoft Solutions</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">Requested: 17 Dec 2025</p>
                                </div>
                                <span className="text-sm font-bold text-emerald-600">₹ 45,800</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] text-slate-500 dark:text-gray-400">
                                    <span className="inline-flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Bank verified
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="px-2 py-1 rounded text-[11px] bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
                                        Process
                                    </button>
                                    <button className="px-2 py-1 rounded text-[11px] border border-gray-200 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-600 shadow-sm transition-colors">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Payout request 2 */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-xs font-semibold">NorthGate Technologies</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">Requested: 16 Dec 2025</p>
                                </div>
                                <span className="text-sm font-bold text-emerald-600">₹ 28,500</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] text-slate-500 dark:text-gray-400">
                                    <span className="inline-flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Bank verified
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="px-2 py-1 rounded text-[11px] bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
                                        Process
                                    </button>
                                    <button className="px-2 py-1 rounded text-[11px] border border-gray-200 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-600 shadow-sm transition-colors">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Payout request - Bank not verified */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-gray-700/50 bg-amber-50/30 dark:bg-amber-900/10 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-xs font-semibold">Asia Pacific Networks</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">Requested: 14 Dec 2025</p>
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-gray-400">₹ 12,400</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] text-amber-600">
                                    <span className="inline-flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                        Bank not verified
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="px-2 py-1 rounded text-[11px] bg-slate-200 dark:bg-gray-600 text-slate-500 dark:text-gray-400 cursor-not-allowed" disabled>
                                        Cannot process
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Recent transactions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm font-semibold">Recent Transactions</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400">Last processed payouts</p>
                        </div>
                    </div>
                    <div className="p-3 space-y-2 max-h-96 overflow-y-auto">

                        {/* Transaction 1 */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-xs font-semibold">Strategic Partners Ltd</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">17 Dec 2025, 2:30 PM</p>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">₹ 56,700</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex px-2 py-0.5 text-[11px] rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                                    Completed
                                </span>
                                <p className="text-[11px] text-slate-500 dark:text-gray-400">TXN-2025-001234</p>
                            </div>
                        </div>

                        {/* Transaction 3 - Processing */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-gray-700/50 bg-blue-50/30 dark:bg-blue-900/10 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-xs font-semibold">TechVenture Partners</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">15 Dec 2025, 4:45 PM</p>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">₹ 41,800</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex px-2 py-0.5 text-[11px] rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400">
                                    Processing
                                </span>
                                <p className="text-[11px] text-slate-500 dark:text-gray-400">TXN-2025-001232</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PAYOUT HISTORY TABLE */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <p className="text-sm font-semibold">Payout History</p>
                        <p className="text-xs text-slate-500 dark:text-gray-400">
                            Complete record of all commission payouts to partners
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 dark:text-gray-200 outline-none focus:ring-1 focus:ring-teal-700 transition-colors">
                            <option>All status</option>
                            <option>Completed</option>
                            <option>Processing</option>
                            <option>Failed</option>
                        </select>
                        <select className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 dark:text-gray-200 outline-none focus:ring-1 focus:ring-teal-700 transition-colors">
                            <option>This month</option>
                            <option>Last month</option>
                            <option>Last 3 months</option>
                            <option>All time</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs sm:text-sm">
                        <thead className="bg-slate-50 dark:bg-gray-700/50 text-[11px] uppercase text-slate-500 dark:text-gray-400">
                            <tr>
                                <th className="px-3 py-2 text-left">Transaction ID</th>
                                <th className="px-3 py-2 text-left">Date &amp; time</th>
                                <th className="px-3 py-2 text-left">Partner</th>
                                <th className="px-3 py-2 text-left">Bank account</th>
                                <th className="px-3 py-2 text-left">Amount (₹)</th>
                                <th className="px-3 py-2 text-left">Referrals</th>
                                <th className="px-3 py-2 text-left">Status</th>
                                <th className="px-3 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                            <tr className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-3 py-2 font-mono text-xs font-semibold">TXN-2025-001234</td>
                                <td className="px-3 py-2">
                                    <p className="text-xs">17 Dec 2025</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">2:30 PM</p>
                                </td>
                                <td className="px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center text-[10px] font-semibold">SP</span>
                                        <div>
                                            <p className="text-xs font-medium">Strategic Partners</p>
                                            <p className="text-[11px] text-slate-500 dark:text-gray-400">Platinum</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    <p className="text-xs font-mono">HDFC •••• 6789</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">HDFC0001234</p>
                                </td>
                                <td className="px-3 py-2 font-semibold text-emerald-600">₹ 56,700</td>
                                <td className="px-3 py-2 text-xs">24 referrals</td>
                                <td className="px-3 py-2">
                                    <span className="inline-flex px-2 py-0.5 text-[11px] rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">Completed</span>
                                </td>
                                <td className="px-3 py-2 text-right">
                                    <button className="text-xs text-teal-700 dark:text-teal-400 hover:underline">View</button>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-gray-700/50 bg-blue-50/20 dark:bg-blue-900/10 transition-colors">
                                <td className="px-3 py-2 font-mono text-xs font-semibold">TXN-2025-001232</td>
                                <td className="px-3 py-2">
                                    <p className="text-xs">15 Dec 2025</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">4:45 PM</p>
                                </td>
                                <td className="px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 flex items-center justify-center text-[10px] font-semibold">TV</span>
                                        <div>
                                            <p className="text-xs font-medium">TechVenture</p>
                                            <p className="text-[11px] text-slate-500 dark:text-gray-400">Silver</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    <p className="text-xs font-mono">SBI •••• 8901</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">SBIN0003456</p>
                                </td>
                                <td className="px-3 py-2 font-semibold text-blue-600">₹ 41,800</td>
                                <td className="px-3 py-2 text-xs">19 referrals</td>
                                <td className="px-3 py-2">
                                    <span className="inline-flex px-2 py-0.5 text-[11px] rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400">Processing</span>
                                </td>
                                <td className="px-3 py-2 text-right">
                                    <button className="text-xs text-teal-700 dark:text-teal-400 hover:underline">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-[11px] text-slate-500 dark:text-gray-400">
                    <span>Showing 1–10 of 156 transactions</span>
                    <div className="flex items-center gap-1">
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">Prev</button>
                        <button className="px-2 py-1 rounded bg-teal-700 text-white">1</button>
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">2</button>
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">3</button>
                        <button className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">Next</button>
                    </div>
                </div>
            </section>

        </main>
    );
}
