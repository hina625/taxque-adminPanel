'use client';

import React, { useState } from 'react';

interface DiscountCode {
    id: number;
    code: string;
    type: 'Percentage' | 'Flat Amount';
    value: string;
    usage: string;
    status: 'Active' | 'Expired' | 'Scheduled';
    expiry: string;
}

export default function DiscountsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState<'active' | 'expired' | 'scheduled'>('active');

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const checkAll = () => {

    };

    const mockDiscounts: DiscountCode[] = [
        { id: 1, code: 'WELCOME50', type: 'Percentage', value: '50% OFF', usage: '125/500', status: 'Active', expiry: 'Dec 31, 2025' },
        { id: 2, code: 'SAVE200', type: 'Flat Amount', value: '₹200 OFF', usage: '45/100', status: 'Active', expiry: 'Jan 15, 2026' },
        { id: 3, code: 'TAXSEASON', type: 'Percentage', value: '20% OFF', usage: '890/1000', status: 'Active', expiry: 'Mar 31, 2026' },
        { id: 4, code: 'EARLYBIRD', type: 'Flat Amount', value: '₹500 OFF', usage: '10/50', status: 'Scheduled', expiry: 'Apr 01, 2026' },
        { id: 5, code: 'DIWALI24', type: 'Percentage', value: '30% OFF', usage: '500/500', status: 'Expired', expiry: 'Nov 15, 2024' },
    ];

    const filteredDiscounts = mockDiscounts.filter(d => {
        if (currentTab === 'active') return d.status === 'Active';
        if (currentTab === 'expired') return d.status === 'Expired';
        if (currentTab === 'scheduled') return d.status === 'Scheduled';
        return true;
    });

    return (
        <div className="w-full p-6 font-sans text-gray-900 bg-white min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in-down">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Discounts & Offers</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage coupons, track redemptions, and boost sales.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Export Data
                    </button>
                    <button
                        onClick={toggleModal}
                        className="px-5 py-2.5 bg-gradient-to-r from-primary to-teal-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Create Discount
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Total Revenue Generated</p>
                            <h2 className="text-3xl font-black text-slate-800">₹12.4L</h2>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <span className="font-bold">₹</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <span className="text-xs font-bold">12% vs last month</span>
                    </div>
                </div>


                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Total Discounts Given</p>
                            <h2 className="text-3xl font-black text-slate-800">₹85,000</h2>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 w-fit px-3 py-1 rounded-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <span className="text-xs font-bold">5% vs last month</span>
                    </div>
                </div>

                {/* Redemptions */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Total Redemptions</p>
                            <h2 className="text-3xl font-black text-slate-800">1,245</h2>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <span className="text-xs font-bold">24 new today</span>
                    </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Avg. Conversion Rate</p>
                            <h2 className="text-3xl font-black text-slate-800">18.4%</h2>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-violet-600 bg-violet-50 w-fit px-3 py-1 rounded-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <span className="text-xs font-bold">2.1% increase</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Analytics Chart */}
                <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-slate-800">Redemption Trends</h3>
                        <select className="bg-slate-50 border-none text-slate-600 font-bold text-sm rounded-lg focus:ring-0 cursor-pointer hover:bg-slate-100 transition">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    {/* Custom CSS Bar Chart using Tailwind Grid */}
                    <div className="h-64 flex items-end gap-2 md:gap-4 mt-8 pb-4 border-b border-gray-100 relative">
                        {/* Y-axis grid lines (simplified) */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            <div className="border-t border-gray-50 h-0 w-full"></div>
                            <div className="border-t border-gray-50 h-0 w-full"></div>
                            <div className="border-t border-gray-50 h-0 w-full"></div>
                            <div className="border-t border-gray-50 h-0 w-full"></div>
                        </div>

                        {/* Bars */}
                        {[35, 55, 40, 70, 60, 45, 80, 75, 50, 65, 85, 90].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                                <div className="text-xs font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">
                                    {height}
                                </div>
                                <div
                                    className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden group-hover:bg-slate-200 transition-colors"
                                    style={{ height: `${height}%` }}
                                >
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-primary/80 to-teal-400/80 rounded-t-lg transition-all duration-500"
                                        style={{ height: '0%', animation: `growUp 1s ease forwards ${i * 0.1}s` }}
                                    ></div>
                                    <style jsx>{`
                                        @keyframes growUp {
                                            to { height: 100%; }
                                        }
                                    `}</style>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                        <span>1</span><span>3</span><span>5</span><span>7</span><span>9</span><span>11</span><span>13</span><span>15</span><span>17</span><span>19</span><span>21</span><span>23</span>
                    </div>
                </div>

                {/* Popular Coupons / Feed */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-black text-slate-800 mb-6">Live Redemptions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md ${i % 2 === 0 ? 'bg-gradient-to-br from-purple-500 to-indigo-500' : 'bg-gradient-to-br from-pink-500 to-rose-500'}`}>
                                    {i % 2 === 0 ? 'JD' : 'AS'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">{i % 2 === 0 ? 'John Doe' : 'Alice Smith'} <span className="text-slate-400 font-normal">used</span></p>
                                    <p className="text-xs font-black text-primary bg-primary/10 w-fit px-2 py-0.5 rounded mt-1">WELCOME50</p>
                                </div>
                                <span className="text-xs font-bold text-slate-400">{i * 5 + 2}m ago</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition">
                        View All Activity
                    </button>
                </div>
            </div>

            {/* Coupons Table Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-100 flex overflow-x-auto">
                    {(['active', 'scheduled', 'expired'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setCurrentTab(tab)}
                            className={`px-8 py-4 font-bold text-sm tracking-wide transition-colors relative whitespace-nowrap ${currentTab === tab ? 'text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-gray-50'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} Coupons
                            {currentTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search coupons..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm transition-all"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-3 bg-white border border-gray-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                            </svg>
                        </button>
                        <button className="p-3 bg-white border border-gray-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                                <th className="p-4 w-12 text-center">
                                    <input type="checkbox" onChange={checkAll} className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer w-4 h-4" />
                                </th>
                                <th className="p-4">Coupon Code</th>
                                <th className="p-4">Discount</th>
                                <th className="p-4">Usage</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Expiry</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredDiscounts.map((discount) => (
                                <tr key={discount.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 text-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer w-4 h-4" />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl text-slate-600">
                                                🏷️
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{discount.code}</p>
                                                <p className="text-xs text-slate-500 font-semibold">{discount.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{discount.value}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="w-full max-w-[120px]">
                                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                                <span>{discount.usage}</span>
                                                <span>{Math.round((parseInt(discount.usage.split('/')[0]) / parseInt(discount.usage.split('/')[1])) * 100)}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${parseInt(discount.usage.split('/')[0]) / parseInt(discount.usage.split('/')[1]) > 0.8 ? 'bg-red-500' : 'bg-primary'}`}
                                                    style={{ width: `${(parseInt(discount.usage.split('/')[0]) / parseInt(discount.usage.split('/')[1])) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${discount.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            discount.status === 'Expired' ? 'bg-red-100 text-red-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${discount.status === 'Active' ? 'bg-emerald-500' :
                                                discount.status === 'Expired' ? 'bg-red-500' :
                                                    'bg-amber-500'
                                                }`}></span>
                                            {discount.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm font-semibold text-slate-600">{discount.expiry}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                </svg>
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-slate-500 font-semibold">Showing <span className="text-slate-900 font-bold">1-10</span> of <span className="text-slate-900 font-bold">50</span></p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-slate-600 hover:bg-slate-50 font-bold text-sm disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark shadow-md shadow-primary/20">Next</button>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide animate-scale-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-2xl font-black text-slate-800">Create New Discount</h3>
                            <button onClick={toggleModal} className="text-slate-400 hover:text-red-500 transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Code Generation */}
                            <div className="relative">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Coupon Code</label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="e.g. SUMMER2024"
                                        className="flex-1 px-4 py-3 bg-fuchsia-50/50 border-2 border-fuchsia-100 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none font-bold text-slate-800 tracking-wider uppercase transition-all"
                                    />
                                    <button className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        Generate
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 font-semibold">Customers will enter this code at checkout.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Discount Type</label>
                                    <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-semibold text-slate-600">
                                        <option>Percentage Off (%)</option>
                                        <option>Fixed Amount (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Discount Value</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="20"
                                            className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-slate-800"
                                        />
                                        <span className="absolute right-4 top-3.5 font-bold text-slate-400">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                                    <input type="date" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-semibold text-slate-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">End Date (Optional)</label>
                                    <input type="date" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-semibold text-slate-600" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Usage Limit</label>
                                <input
                                    type="number"
                                    placeholder="Total number of times this coupon can be used (e.g. 100)"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-semibold text-slate-600"
                                />
                            </div>

                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex gap-3">
                                <svg className="w-6 h-6 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <h4 className="font-bold text-amber-900 text-sm">Summary</h4>
                                    <p className="text-xs text-amber-800 mt-1 font-semibold">
                                        This code will give <span className="font-bold">20% OFF</span> to the first <span className="font-bold">100 customers</span>. Valid until <span className="font-bold">Dec 31, 2025</span>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                            <button onClick={toggleModal} className="px-6 py-3 bg-white border border-gray-300 text-slate-700 font-bold rounded-xl hover:bg-gray-50 transition">Cancel</button>
                            <button onClick={toggleModal} className="px-6 py-3 bg-gradient-to-r from-primary to-teal-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition">Create Discount</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
