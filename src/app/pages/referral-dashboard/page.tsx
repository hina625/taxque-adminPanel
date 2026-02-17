"use client";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    Link as LinkIcon,
    Users,
    TrendUp,
    CurrencyDollar,
    Lightning,
    WarningCircle,
    Prohibit,
    ShareNetwork,
    DownloadSimple,
    Gear
} from '@phosphor-icons/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ReferralDashboardPage() {
    const chartData = {
        labels: ['Day 1', 'Day 7', 'Day 14', 'Day 21', 'Day 30'],
        datasets: [
            {
                label: 'Referrals',
                data: [35, 40, 30, 50, 42],
                backgroundColor: '#4f46e5',
                borderRadius: 4,
            },
            {
                label: 'Conversions',
                data: [20, 25, 15, 30, 35],
                backgroundColor: '#22c55e',
                borderRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Referral Analytics</h1>
                    <p className="mt-1 text-sm text-slate-500">Monitor how your referral program is driving new users, revenue and engagement.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <select className="text-sm border rounded-lg px-3 py-2 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Last 7 days</option>
                        <option selected>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>All time</option>
                    </select>
                    <select className="text-sm border rounded-lg px-3 py-2 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All Programs</option>
                        <option>Public Campaign</option>
                        <option>VIP Partners</option>
                    </select>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border bg-white hover:bg-slate-50 shadow-sm text-slate-700">
                        <DownloadSimple size={16} /> Export report
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm">
                        <Gear size={16} /> Configure program
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
                {/* Total Referrals */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total referrals</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">3,482</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <LinkIcon size={24} weight="bold" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center text-green-600 font-medium">
                            <TrendUp size={14} className="mr-1" /> 18.6%
                        </span>
                        <span className="text-slate-500">vs last 30 days</span>
                    </div>
                </div>

                {/* Referred Customers */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Referred customers</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">1,204</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-green-600">
                            <Users size={24} weight="bold" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center text-green-600 font-medium">
                            <TrendUp size={14} className="mr-1" /> 9.3%
                        </span>
                        <span className="text-slate-500">First purchase via referral</span>
                    </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Referral conversion rate</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">23.7%</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500">
                            <TrendUp size={24} weight="bold" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center text-green-600 font-medium">
                            <TrendUp size={14} className="mr-1" /> 3.1 pts
                        </span>
                        <span className="text-slate-500">Target: 18–22%</span>
                    </div>
                </div>

                {/* Referral Revenue */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Revenue from referrals</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">₹ 8,72,940</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                            <CurrencyDollar size={24} weight="bold" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center text-green-600 font-medium">
                            <TrendUp size={14} className="mr-1" /> 26.4%
                        </span>
                        <span className="text-slate-500">ROI improving month‑on‑month</span>
                    </div>
                </div>
            </section>

            {/* Charts Section */}
            <section className="grid gap-6 lg:grid-cols-3 mb-6">
                {/* Chart */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 lg:col-span-2">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-slate-900">Referral performance over time</h3>
                        <p className="text-xs text-slate-500">Daily referrals vs successful conversions.</p>
                    </div>
                    <div className="h-64">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Funnel */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <h3 className="text-base font-semibold text-slate-900 mb-1">Referral funnel</h3>
                    <p className="text-xs text-slate-500 mb-6">From link shares to paying customers.</p>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-700">Referral link clicks</span>
                                <span className="text-slate-500">12,430</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-indigo-600 w-full" style={{ width: '100%' }}></div>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">Top sources: WhatsApp, Email, Direct.</p>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-700">Sign‑ups from referrals</span>
                                <span className="text-slate-500">3,482</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-indigo-400" style={{ width: '62%' }}></div>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">Participation rate and landing page UX impact this step.</p>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-700">First purchase via referral</span>
                                <span className="text-slate-500">1,204</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-emerald-400" style={{ width: '35%' }}></div>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">Key KPI: referral conversion rate.</p>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-700">Repeat customers</span>
                                <span className="text-slate-500">642</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-emerald-600" style={{ width: '19%' }}></div>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">Tracks lifetime value and repeat‑purchase rate.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Section */}
            <section className="grid gap-6 lg:grid-cols-3">
                {/* Top Referrers Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-base font-semibold text-slate-900">Top referrers</h3>
                            <p className="text-xs text-slate-500">Users bringing the most high‑value customers.</p>
                        </div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                                <tr>
                                    <th className="px-4 py-3 text-left rounded-l-lg">User</th>
                                    <th className="px-4 py-3 text-left">Referrals</th>
                                    <th className="px-4 py-3 text-left">Conversion</th>
                                    <th className="px-4 py-3 text-left">Revenue</th>
                                    <th className="px-4 py-3 text-left">Avg order</th>
                                    <th className="px-4 py-3 text-right rounded-r-lg">Reward</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { name: 'Rahul Verma', handle: '@rahul.taxque', initials: 'RV', bg: 'bg-indigo-50', text: 'text-indigo-600', refs: 142, conv: '28.1%', rev: '₹ 1,85,240', avg: '₹ 1,305', reward: '₹ 7,500' },
                                    { name: 'Anita Desai', handle: '@anita_d', initials: 'AD', bg: 'bg-slate-100', text: 'text-slate-700', refs: 96, conv: '24.3%', rev: '₹ 1,12,680', avg: '₹ 1,173', reward: '₹ 5,200' },
                                    { name: 'Imran Khan', handle: '@imran_k', initials: 'IK', bg: 'bg-slate-100', text: 'text-slate-700', refs: 75, conv: '20.8%', rev: '₹ 86,430', avg: '₹ 1,152', reward: '₹ 4,000' },
                                ].map((referrer, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`h-8 w-8 rounded-full ${referrer.bg} ${referrer.text} flex items-center justify-center text-xs font-bold`}>
                                                    {referrer.initials}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">{referrer.name}</p>
                                                    <p className="text-xs text-slate-500">{referrer.handle}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">{referrer.refs}</td>
                                        <td className="px-4 py-3 text-slate-600">{referrer.conv}</td>
                                        <td className="px-4 py-3 text-slate-600">{referrer.rev}</td>
                                        <td className="px-4 py-3 text-slate-600">{referrer.avg}</td>
                                        <td className="px-4 py-3 text-right text-emerald-600 font-semibold">{referrer.reward}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Program Health */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">Program health</h3>
                        <p className="text-xs text-slate-500">Overall engagement and alerts.</p>
                    </div>

                    <div className="rounded-lg bg-indigo-50 text-indigo-700 px-4 py-3 text-sm flex items-start gap-3">
                        <Lightning size={20} weight="fill" className="mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold">High‑performing program</p>
                            <p className="text-xs text-indigo-600/80 mt-1 leading-relaxed">
                                Referral rate and conversion are above industry benchmarks for SaaS and ecommerce.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">WhatsApp shares up 31%</p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Most new members discovered the program via mobile share links in the last 7 days.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-amber-400 shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Landing page drop‑off</p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    38% of visitors abandon on the referral landing page. Test shorter copy.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-red-500 shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Suspicious activity detected</p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    12 referrals from same IP range flagged for manual review.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Quick actions</p>
                        <div className="flex flex-wrap gap-2">
                            <button className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors">
                                View fraud queue
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors">
                                Edit rewards
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
                                Invite more members
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
