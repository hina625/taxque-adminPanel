"use client";

import React, { useState } from 'react';
import {
    TrendUp,
    TrendDown,
    CurrencyInr,
    Users,
    Target,
    Diamond,
    Funnel,
    DownloadSimple,
    ArrowsClockwise,
    CaretDown
} from '@phosphor-icons/react';

export default function ReferralAnalyticsPage() {
    const [dateRange, setDateRange] = useState('30');

    // --- Mock Data & Components ---

    const MetricCard = ({ title, value, trend, trendValue, icon, color }: any) => (
        <div className={`bg-gradient-to-br ${color} rounded-2xl shadow-lg p-5 text-white`}>
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase tracking-wide opacity-90">{title}</p>
                <span className="text-2xl">{icon}</span>
            </div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs mt-2 opacity-90 flex items-center gap-1">
                {trend === 'up' ? '▲' : '▼'} {trendValue}
            </p>
        </div>
    );

    const FunnelStage = ({ label, count, percentage, color, width }: any) => (
        <div>
            <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium">{label}</span>
                <span className={`font-bold ${label === 'Converted' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {count} ({percentage}%)
                </span>
            </div>
            <div className="h-8 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${color} rounded-full flex items-center justify-center text-white text-xs font-semibold`}
                    style={{ width: width }}
                >
                    {count}
                </div>
            </div>
        </div>
    );

    const PartnerRow = ({ rank, name, tier, initials, referrals, converted, convRate, revenue, avgDeal, trend }: any) => (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-3 py-2">
                <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${rank === 1 ? 'bg-amber-100 text-amber-700' : rank === 2 ? 'bg-slate-100 text-slate-600' : rank === 3 ? 'bg-orange-100 text-orange-700' : 'text-slate-400'}`}>
                    {rank}
                </span>
            </td>
            <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-[10px] font-bold">
                        {initials}
                    </span>
                    <p className="text-xs font-medium text-slate-900">{name}</p>
                </div>
            </td>
            <td className="px-3 py-2">
                <span className={`inline-flex px-2 py-0.5 text-[11px] rounded-full font-medium ${tier === 'Platinum' ? 'bg-amber-100 text-amber-700' :
                        tier === 'Gold' ? 'bg-sky-100 text-sky-700' :
                            tier === 'Silver' ? 'bg-lime-100 text-lime-700' :
                                'bg-orange-100 text-orange-700'
                    }`}>
                    {tier}
                </span>
            </td>
            <td className="px-3 py-2 text-right font-semibold text-slate-700">{referrals}</td>
            <td className="px-3 py-2 text-right font-semibold text-emerald-600">{converted}</td>
            <td className="px-3 py-2 text-right">
                <span className="font-semibold text-emerald-700">{convRate}</span>
            </td>
            <td className="px-3 py-2 text-right font-semibold text-slate-900">{revenue}</td>
            <td className="px-3 py-2 text-right text-slate-600">{avgDeal}</td>
            <td className="px-3 py-2">
                <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {trend.startsWith('+') ? '▲' : '▼'} {trend.replace('+', '').replace('-', '')}
                </span>
            </td>
        </tr>
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Referral Analytics</h1>
                    <p className="mt-1 text-sm text-slate-500">Comprehensive analytics and insights on partner referral performance, conversions and revenue.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="appearance-none text-xs border rounded-lg pl-3 pr-8 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="365">Last year</option>
                            <option value="all">All time</option>
                        </select>
                        <CaretDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
                    </div>

                    <button className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white hover:bg-slate-50 shadow-sm text-slate-700 transition-colors">
                        <DownloadSimple size={16} /> Export report
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded-lg bg-teal-700 text-white hover:bg-teal-800 shadow-sm transition-colors">
                        <ArrowsClockwise size={16} /> Refresh data
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <MetricCard
                    title="Total Referrals"
                    value="1,284"
                    trend="up"
                    trendValue="142 vs last period (+12.4%)"
                    icon={<TrendUp weight="fill" />}
                    color="from-blue-500 to-blue-600"
                />
                <MetricCard
                    title="Conversion Rate"
                    value="62.4%"
                    trend="up"
                    trendValue="4.2% improvement"
                    icon={<Target weight="fill" />}
                    color="from-emerald-500 to-emerald-600"
                />
                <MetricCard
                    title="Total Revenue"
                    value="₹ 48.2L"
                    trend="up"
                    trendValue="₹8.6L vs last period"
                    icon={<CurrencyInr weight="bold" />}
                    color="from-amber-500 to-amber-600"
                />
                <MetricCard
                    title="Avg Deal Value"
                    value="₹ 37,500"
                    trend="down"
                    trendValue="₹2,100 vs last period"
                    icon={<Diamond weight="fill" />}
                    color="from-purple-500 to-purple-600"
                />
            </section>

            {/* Conversion Funnel & Top Partners */}
            <section className="grid gap-4 lg:grid-cols-2 mb-6">

                {/* Conversion Funnel */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800">Conversion Funnel</p>
                        <p className="text-xs text-slate-500">Referral journey from lead to conversion</p>
                    </div>
                    <div className="p-5 space-y-4">
                        <FunnelStage label="Referrals Received" count="1,284" percentage="100" color="from-blue-500 to-blue-600" width="100%" />
                        <FunnelStage label="Contacted" count="1,156" percentage="90" color="from-sky-500 to-sky-600" width="90%" />
                        <FunnelStage label="Qualified" count="928" percentage="72" color="from-teal-500 to-teal-600" width="72%" />
                        <FunnelStage label="Converted" count="801" percentage="62.4" color="from-emerald-500 to-emerald-600" width="62.4%" />

                        {/* Drop-off stats */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-xs">
                            <div className="rounded-lg bg-red-50 p-2 text-center text-red-700">
                                <p className="text-[10px] opacity-70 mb-1">Not Contacted</p>
                                <p className="font-bold">128</p>
                            </div>
                            <div className="rounded-lg bg-amber-50 p-2 text-center text-amber-700">
                                <p className="text-[10px] opacity-70 mb-1">Not Qualified</p>
                                <p className="font-bold">228</p>
                            </div>
                            <div className="rounded-lg bg-red-50 p-2 text-center text-red-700">
                                <p className="text-[10px] opacity-70 mb-1">Not Converted</p>
                                <p className="font-bold">127</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Performing Partners */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800">Top Performing Partners</p>
                        <p className="text-xs text-slate-500">Based on conversion rate and revenue</p>
                    </div>
                    <div className="p-4 space-y-3">
                        {[
                            { rank: 1, name: 'PrimeSoft Solutions', tier: 'Platinum', refs: 124, rev: '₹ 11.2L', conv: '68%', initials: 'PS', color: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: '🥇' },
                            { rank: 2, name: 'NorthGate Technologies', tier: 'Gold', refs: 87, rev: '₹ 8.4L', conv: '65%', initials: 'NG', color: 'bg-slate-50 border-slate-200', text: 'text-slate-600', icon: '🥈' },
                            { rank: 3, name: 'Elara Alliance', tier: 'Silver', refs: 96, rev: '₹ 6.8L', conv: '61%', initials: 'EA', color: 'bg-orange-50 border-orange-200', text: 'text-orange-700', icon: '🥉' },
                            { rank: 4, name: 'Digital Solutions Inc', tier: 'Gold', refs: 72, rev: '₹ 5.2L', conv: '59%', initials: 'DS', color: 'bg-white border-slate-100 hover:bg-slate-50', text: 'text-slate-400', icon: '#4' },
                            { rank: 5, name: 'TechWave Solutions', tier: 'Bronze', refs: 64, rev: '₹ 4.1L', conv: '57%', initials: 'TW', color: 'bg-white border-slate-100 hover:bg-slate-50', text: 'text-slate-400', icon: '#5' }
                        ].map((p, i) => (
                            <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${p.color} transition-all`}>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-center w-8">
                                        <span className="text-xl">{p.icon.startsWith('#') ? '' : p.icon}</span>
                                        <span className={`text-[10px] font-bold ${p.text}`}>{p.icon.startsWith('#') ? p.icon : ''}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{p.name}</p>
                                        <p className="text-xs text-slate-500">{p.tier} • {p.refs} referrals</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-600">{p.rev}</p>
                                    <p className="text-xs text-slate-500">{p.conv} conv.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Analytics Table */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 border-b border-slate-100 gap-3">
                    <div>
                        <p className="text-sm font-bold text-slate-800">Partner-wise Detailed Analytics</p>
                        <p className="text-xs text-slate-500">Comprehensive performance metrics for all partners</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search partner..."
                                className="text-xs border rounded-lg pl-3 pr-8 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all w-full sm:w-48"
                            />
                            <Funnel className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                        </div>
                        <select className="text-xs border rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all">
                            <option>All tiers</option>
                            <option>Platinum</option>
                            <option>Gold</option>
                            <option>Silver</option>
                            <option>Bronze</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs sm:text-sm text-left">
                        <thead className="bg-slate-50 text-[11px] uppercase text-slate-500 font-bold border-b border-slate-100">
                            <tr>
                                <th className="px-3 py-3">Rank</th>
                                <th className="px-3 py-3">Partner</th>
                                <th className="px-3 py-3">Tier</th>
                                <th className="px-3 py-3 text-right">Referrals</th>
                                <th className="px-3 py-3 text-right">Converted</th>
                                <th className="px-3 py-3 text-right">Conv. Rate</th>
                                <th className="px-3 py-3 text-right">Revenue (₹)</th>
                                <th className="px-3 py-3 text-right">Avg Deal (₹)</th>
                                <th className="px-3 py-3">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <PartnerRow rank={1} name="PrimeSoft Solutions" tier="Platinum" initials="PS" referrals="124" converted="84" convRate="67.7%" revenue="11,24,000" avgDeal="13,381" trend="+12%" />
                            <PartnerRow rank={2} name="NorthGate Technologies" tier="Gold" initials="NG" referrals="87" converted="57" convRate="65.5%" revenue="8,40,000" avgDeal="14,737" trend="+8%" />
                            <PartnerRow rank={3} name="Elara Alliance" tier="Silver" initials="EA" referrals="96" converted="58" convRate="60.4%" revenue="6,80,000" avgDeal="11,724" trend="-3%" />
                            <PartnerRow rank={4} name="Digital Solutions Inc" tier="Gold" initials="DS" referrals="72" converted="42" convRate="58.3%" revenue="5,20,000" avgDeal="12,380" trend="+5%" />
                            <PartnerRow rank={5} name="TechWave Solutions" tier="Bronze" initials="TW" referrals="64" converted="36" convRate="56.2%" revenue="4,10,000" avgDeal="11,388" trend="-1%" />
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex justify-center">
                    <button className="text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors">View All Partners</button>
                </div>
            </section>
        </div>
    );
}
