'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function DashboardPage() {
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const serviceChartRef = useRef<HTMLCanvasElement>(null);
  const chartsRef = useRef<{ revenue: any; service: any }>({ revenue: null, service: null });

  const initCharts = () => {
    if (typeof window === 'undefined' || !(window as any).Chart) return;
    const Chart = (window as any).Chart;

    // Destroy existing charts if they exist
    if (chartsRef.current.revenue) chartsRef.current.revenue.destroy();
    if (chartsRef.current.service) chartsRef.current.service.destroy();

    // Revenue Chart
    if (revenueChartRef.current) {
      const revenueCtx = revenueChartRef.current.getContext('2d');
      if (revenueCtx) {
        chartsRef.current.revenue = new Chart(revenueCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Revenue (₹)',
              data: [45000, 52000, 48000, 61000, 58000, 67000, 72000, 68000, 75000, 82000, 79000, 85000],
              borderColor: '#0f766e',
              backgroundColor: 'rgba(15, 118, 110, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointRadius: 5,
              pointBackgroundColor: '#0f766e',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                callbacks: {
                  label: function (context: any) {
                    return '₹' + context.parsed.y.toLocaleString('en-IN');
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value: any) {
                    return '₹' + (value / 1000) + 'K';
                  }
                }
              }
            }
          }
        });
      }
    }

    // Service Chart
    if (serviceChartRef.current) {
      const serviceCtx = serviceChartRef.current.getContext('2d');
      if (serviceCtx) {
        chartsRef.current.service = new Chart(serviceCtx, {
          type: 'doughnut',
          data: {
            labels: ['Completed', 'In Progress', 'Pending', 'On Hold'],
            datasets: [{
              data: [45, 18, 23, 8],
              backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
              borderWidth: 0,
              hoverOffset: 10
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  font: { size: 12, weight: 'bold' },
                  usePointStyle: true
                }
              }
            }
          }
        });
      }
    }
  };

  return (
    <div className="w-full p-6 font-sans text-gray-900 bg-white min-h-screen">
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="lazyOnload"
        onLoad={initCharts}
      />

      <div className="max-w-full">

        {/* Welcome Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-6 relative overflow-hidden animate-fade-in-down">
          <div className="absolute inset-0 rounded-2xl border-[3px] border-transparent bg-gradient-to-br from-teal-700 to-teal-500 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] -z-10 opacity-10"></div>
          <div className="absolute inset-0 rounded-2xl border-[3px] border-transparent bg-gradient-to-br from-teal-700 to-teal-500 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] -z-10 opacity-10"></div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl shadow-lg">
                👋
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-800 mb-1">Welcome back, Admin!</h2>
                <p className="text-slate-600 font-semibold">Wednesday, December 17, 2025 • 11:47 PM IST</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-teal-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                New Service
              </button>
              <button className="px-6 py-3 bg-white border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          {/* Metric 1: Total Revenue */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-700 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-radial-gradient from-white/10 to-transparent rounded-full translate-x-[30%] -translate-y-[30%] pointer-events-none"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <span className="text-emerald-600 font-black text-sm">+24.5%</span>
              </div>
            </div>
            <p className="text-slate-500 font-bold text-sm mb-2">Total Revenue</p>
            <h3 className="text-4xl font-black text-slate-800 mb-3">₹2,40,500</h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">This Month</span>
              <span className="text-emerald-600 font-bold">↑ ₹47K from last month</span>
            </div>
            <div className="mt-4 h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full w-[78%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Metric 2: Active Associates */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-700 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <span className="text-blue-600 font-black text-sm">+25%</span>
              </div>
            </div>
            <p className="text-slate-500 font-bold text-sm mb-2">Active Associates</p>
            <h3 className="text-4xl font-black text-slate-800 mb-3">8</h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">6 Active • 2 Inactive</span>
              <span className="text-blue-600 font-bold">+2 this month</span>
            </div>
            <div className="mt-4 h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-[85%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Metric 3: Pending Tasks */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-700 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-lg">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-amber-600 font-black text-sm">Urgent</span>
              </div>
            </div>
            <p className="text-slate-500 font-bold text-sm mb-2">Pending Tasks</p>
            <h3 className="text-4xl font-black text-slate-800 mb-3">23</h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">Needs Attention</span>
              <span className="text-amber-600 font-bold">5 due today</span>
            </div>
            <div className="mt-4 h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full w-[62%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Metric 4: Completion Rate */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-700 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-lg">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <span className="text-purple-600 font-black text-sm">+12%</span>
              </div>
            </div>
            <p className="text-slate-500 font-bold text-sm mb-2">Completion Rate</p>
            <h3 className="text-4xl font-black text-slate-800 mb-3">92%</h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">Average Score</span>
              <span className="text-purple-600 font-bold">Excellent</span>
            </div>
            <div className="mt-4 h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full w-[92%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <span className="text-sm font-bold text-blue-900">Add Associate</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border-2 border-emerald-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <span className="text-sm font-bold text-emerald-900">New Service</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-2 border-purple-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <span className="text-sm font-bold text-purple-900">Documents</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-2 border-amber-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-sm font-bold text-amber-900">Payments</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 border-2 border-pink-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <span className="text-sm font-bold text-pink-900">Reports</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 border-2 border-cyan-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                </svg>
              </div>
              <span className="text-sm font-bold text-cyan-900">Announce</span>
            </button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">

          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 animate-fade-in-down">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800 mb-1">Revenue Analytics</h3>
                <p className="text-sm text-slate-500 font-semibold">Monthly performance overview</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">Monthly</button>
                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200">Weekly</button>
              </div>
            </div>
            <div className="relative h-[300px]">
              <canvas ref={revenueChartRef} id="revenueChart"></canvas>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 animate-fade-in-down">
            <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
              Top Performers
            </h3>
            <div className="space-y-4">
              {/* Rank 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 hover:shadow-lg transition cursor-pointer">
                <div className="text-4xl">🏆</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-black shadow-lg">
                  PK
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm text-slate-800">Priya Kapoor</p>
                  <p className="text-xs text-slate-500 font-semibold">12 services • ₹15,600</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-amber-600">95%</p>
                  <p className="text-xs text-amber-600 font-bold">Success</p>
                </div>
              </div>

              {/* Rank 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-lg transition cursor-pointer">
                <div className="text-4xl">🥈</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-black shadow-lg">
                  RS
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm text-slate-800">Rahul Sharma</p>
                  <p className="text-xs text-slate-500 font-semibold">8 services • ₹10,400</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-blue-600">88%</p>
                  <p className="text-xs text-blue-600 font-bold">Success</p>
                </div>
              </div>

              {/* Rank 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:shadow-lg transition cursor-pointer">
                <div className="text-4xl">🥉</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-black shadow-lg">
                  AM
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm text-slate-800">Amit Mehta</p>
                  <p className="text-xs text-slate-500 font-semibold">5 services • ₹6,500</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-600">82%</p>
                  <p className="text-xs text-emerald-600 font-bold">Success</p>
                </div>
              </div>

              {/* View All Button */}
              <button className="w-full py-3 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-bold rounded-xl hover:from-slate-200 hover:to-slate-300 transition">
                View All Associates →
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 animate-fade-in-down">
          <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Recent Activity
            <span className="ml-auto text-xs text-slate-500 font-semibold">Live Updates</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200 hover:shadow-md transition cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-800">New Service Assigned</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">GST Filing</span> assigned to Priya Kapoor</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-blue-600 font-semibold">2 minutes ago</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800">NEW</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 hover:shadow-md transition cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-800">Service Completed</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">ITR Filing</span> completed by Rahul Sharma</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-emerald-600 font-semibold">15 minutes ago</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">COMPLETED</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 border border-purple-200 hover:shadow-md transition cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-800">Document Uploaded</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">GST Certificate.pdf</span> uploaded by Amit Mehta</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-purple-600 font-semibold">1 hour ago</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800">DOCUMENT</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200 hover:shadow-md transition cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-800">Payment Received</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">₹5,000</span> received from ABC Traders</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-amber-600 font-semibold">2 hours ago</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-800">PAYMENT</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-200 hover:shadow-md transition cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-800">Deadline Alert</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">Company Formation</span> deadline approaching (2 days left)</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-red-600 font-semibold">3 hours ago</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800">URGENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Distribution & Alerts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Service Status Chart */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 animate-fade-in-down">
            <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Service Distribution
            </h3>
            <div className="relative h-[300px]">
              <canvas ref={serviceChartRef} id="serviceChart"></canvas>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 animate-fade-in-down">
            <h3 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Important Alerts
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">5 New</span>
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm text-red-900">5 Deadlines Approaching</p>
                    <p className="text-xs text-red-600 font-semibold">Due in 2 days</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition">
                  View All Tasks
                </button>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm text-amber-900">₹45,000 Pending</p>
                    <p className="text-xs text-amber-600 font-semibold">From 8 clients</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition">
                  Send Payment Reminders
                </button>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm text-blue-900">3 New Applications</p>
                    <p className="text-xs text-blue-600 font-semibold">Awaiting review</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">
                  Review Applications
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

