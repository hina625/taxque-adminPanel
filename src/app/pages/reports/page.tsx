'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import {
    TrendingUp, TrendingDown, Currency, ShoppingCart, Users,
    BarChart2, Calendar, Filter, Download, Package, Clock,
    CornerUpLeft, Star, FileText, BookOpen, Clipboard, Video
} from 'lucide-react';
import { Chart } from 'chart.js/auto';

const ReportsPage = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        // We'll initialize the chart in the Script onLoad, but if we navigate back,
        // we might need to re-initialize or cleanup.
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="p-6 min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* PAGE HEADER */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3 text-slate-900 mb-1">
                        <BarChart2 className="text-indigo-600 w-8 h-8" />
                        E-commerce Reports
                    </h1>
                    <p className="text-slate-500 text-sm">Real-time sales analytics and performance metrics • Updated: Dec 17, 2025 at 1:32 PM</p>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/10 transition-all cursor-pointer group">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>Last 30 Days</span>
                        <Filter className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 ml-1" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-slate-900 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors font-semibold text-sm">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transform">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                {/* KPI 1 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Revenue</div>
                            <div className="text-3xl font-extrabold text-slate-900 mb-3">₹8,45,230</div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                                <TrendingUp className="w-4 h-4" />
                                <span>+12.5%</span>
                                <span className="text-slate-500 font-medium">vs last month</span>
                            </div>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <Currency className="w-7 h-7" />
                        </div>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-rose-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Orders</div>
                            <div className="text-3xl font-extrabold text-slate-900 mb-3">1,247</div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                                <TrendingUp className="w-4 h-4" />
                                <span>+8.2%</span>
                                <span className="text-slate-500 font-medium">vs last month</span>
                            </div>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-400 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-200">
                            <ShoppingCart className="w-7 h-7" />
                        </div>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Customers</div>
                            <div className="text-3xl font-extrabold text-slate-900 mb-3">324</div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                                <TrendingUp className="w-4 h-4" />
                                <span>+15.7%</span>
                                <span className="text-slate-500 font-medium">vs last month</span>
                            </div>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-200">
                            <Users className="w-7 h-7" />
                        </div>
                    </div>
                </div>

                {/* KPI 4 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-300"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Conversion Rate</div>
                            <div className="text-3xl font-extrabold text-slate-900 mb-3">3.8%</div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-rose-500">
                                <TrendingDown className="w-4 h-4" />
                                <span>-2.3%</span>
                                <span className="text-slate-500 font-medium">vs last month</span>
                            </div>
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                            <BarChart2 className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ADDITIONAL STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
                <StatBox icon={<Package className="w-6 h-6" />} label="Products Sold" value="156" gradient="from-indigo-500 to-purple-600" />
                <StatBox icon={<Clock className="w-6 h-6" />} label="Pending Orders" value="23" gradient="from-fuchsia-400 to-rose-500" />
                <StatBox icon={<CornerUpLeft className="w-6 h-6" />} label="Returns" value="8" gradient="from-sky-400 to-cyan-400" />
                <StatBox icon={<Star className="w-6 h-6" />} label="Avg Rating" value="4.8" gradient="from-emerald-400 to-teal-400" />
                <StatBox icon={<BarChart2 className="w-6 h-6" />} label="Avg Order Value" value="₹6,780" gradient="from-pink-400 to-yellow-400" />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* REVENUE CHART */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-indigo-600" />
                            Revenue Overview
                        </h3>
                        <div className="bg-slate-50 p-1 rounded-lg flex gap-1">
                            <button className="px-3 py-1.5 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-sm">7 Days</button>
                            <button className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-white transition-all">30 Days</button>
                            <button className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-white transition-all">90 Days</button>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <canvas id="revenueChart" ref={chartRef}></canvas>
                    </div>
                </div>

                {/* TOP PRODUCTS */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-500" />
                            Top Products
                        </h3>
                        <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All →</a>
                    </div>
                    <div className="flex flex-col gap-1">
                        <ProductItem
                            rank={1}
                            icon={<Package className="w-5 h-5 text-indigo-700" />}
                            iconBg="bg-indigo-100"
                            name="GST Filing Software"
                            category="Digital Product"
                            sales="₹2,45,000"
                            units="196 units"
                            rankGradient="from-amber-300 to-amber-500"
                        />
                        <ProductItem
                            rank={2}
                            icon={<BookOpen className="w-5 h-5 text-emerald-700" />}
                            iconBg="bg-emerald-100"
                            name="Tax Guide 2025"
                            category="E-book"
                            sales="₹1,89,500"
                            units="2,107 units"
                            rankGradient="from-slate-400 to-slate-600"
                        />
                        <ProductItem
                            rank={3}
                            icon={<Clipboard className="w-5 h-5 text-amber-700" />}
                            iconBg="bg-amber-100"
                            name="Consultation Package"
                            category="Service"
                            sales="₹1,56,200"
                            units="26 units"
                            rankGradient="from-orange-400 to-orange-600"
                        />
                        <ProductItem
                            rank={4}
                            icon={<Video className="w-5 h-5 text-rose-700" />}
                            iconBg="bg-rose-100"
                            name="Online Course"
                            category="Course"
                            sales="₹1,23,800"
                            units="354 units"
                        />
                        <ProductItem
                            rank={5}
                            icon={<FileText className="w-5 h-5 text-purple-700" />}
                            iconBg="bg-purple-100"
                            name="Tax Templates"
                            category="Documents"
                            sales="₹98,750"
                            units="76 units"
                        />
                    </div>
                </div>
            </div>

            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
                onLoad={() => {
                    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
                    if (ctx) {
                        // Destroy existing chart if it exists to prevent duplicates on hot reload
                        if (chartInstance.current) {
                            chartInstance.current.destroy();
                        }

                        // @ts-ignore
                        chartInstance.current = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                datasets: [
                                    {
                                        label: 'Revenue',
                                        data: [12000, 19000, 15000, 22000, 20000, 23000, 31000],
                                        borderColor: '#4f46e5',
                                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                        borderWidth: 3,
                                        tension: 0.4,
                                        fill: true,
                                        pointBackgroundColor: '#ffffff',
                                        pointBorderColor: '#4f46e5',
                                        pointBorderWidth: 2,
                                        pointRadius: 4,
                                        pointHoverRadius: 6
                                    },
                                    {
                                        label: 'Orders',
                                        data: [8000, 12000, 11000, 14000, 13000, 16000, 21000],
                                        borderColor: '#f43f5e',
                                        backgroundColor: 'transparent',
                                        borderWidth: 3,
                                        tension: 0.4,
                                        borderDash: [5, 5],
                                        pointBackgroundColor: '#ffffff',
                                        pointBorderColor: '#f43f5e',
                                        pointBorderWidth: 2,
                                        pointRadius: 4,
                                        pointHoverRadius: 6
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        align: 'end',
                                        labels: {
                                            usePointStyle: true,
                                            boxWidth: 8,
                                            font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }
                                        }
                                    },
                                    tooltip: {
                                        backgroundColor: '#1e293b',
                                        padding: 12,
                                        titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 },
                                        bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 },
                                        cornerRadius: 8,
                                        displayColors: false
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: { color: '#f1f5f9' },
                                        ticks: { callback: function (value: any) { return '₹' + value / 1000 + 'k'; }, font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: '#64748b' }
                                    },
                                    x: {
                                        grid: { display: false },
                                        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: '#64748b' }
                                    }
                                }
                            }
                        });
                    }
                }}
            />
        </div>
    );
};

// Helper Components
const StatBox = ({ icon, label, value, gradient }: { icon: React.ReactNode, label: string, value: string, gradient: string }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all">
        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl shadow-sm`}>
            {icon}
        </div>
        <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
    </div>
);

const ProductItem = ({ rank, icon, iconBg, name, category, sales, units, rankGradient }: any) => (
    <div className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
        <div className={`w-7 h-7 rounded-lg ${rankGradient ? `bg-gradient-to-br ${rankGradient} text-white` : 'bg-slate-100 text-slate-600'} flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
            {rank}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-900 text-sm truncate">{name}</div>
            <div className="text-xs text-slate-500 truncate">{category}</div>
        </div>
        <div className="text-right">
            <div className="font-bold text-slate-900 text-sm">{sales}</div>
            <div className="text-xs text-slate-500">{units}</div>
        </div>
    </div>
);

export default ReportsPage;
