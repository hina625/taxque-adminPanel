'use client';

import React, { useState } from 'react';
import {
    XCircle, Download, CreditCard, AlertTriangle,
    TrendingDown, Clock, CheckCircle, RefreshCcw,
    Search, Mail, Phone, Package, FileText,
    Calculator, MessageSquare, MapPin, X, Check
} from 'lucide-react';

const CancellationsPage = () => {
    const [activeTab, setActiveTab] = useState('all');

    // Mock Data
    const CANCELLATIONS = [
        {
            id: "TQ-2025-0789",
            customer: { name: "Rajesh Kumar", email: "rajesh.k@example.com", phone: "+91 98765 43210", initials: "RK", color: "bg-red-500" },
            status: "pending",
            reason: { title: "Customer Requested Cancellation", text: "Found another service provider with lower price. Need immediate refund as payment already deducted from my account." },
            items: [
                { name: "GST Filing - Monthly", category: "Compliance Service", price: "₹2,500", icon: FileText, iconColor: "text-blue-600 bg-blue-50" },
                { name: "ITR Filing - Individual", category: "Income Tax Service", price: "₹1,999", icon: Calculator, iconColor: "text-emerald-600 bg-emerald-50" }
            ],
            refundAmount: "₹4,499",
            meta: { orderDate: "Dec 15, 2025", cancelledOn: "Dec 16, 2025 at 11:30 AM", paymentMethod: "UPI - PhonePe", refundStatus: "Pending Approval" },
            timeText: "Cancelled 1 day ago"
        },
        {
            id: "TQ-2025-0776",
            customer: { name: "Priya Sharma", email: "priya.s@example.com", phone: "+91 98234 56789", initials: "PS", color: "bg-orange-500" },
            status: "processing",
            reason: { title: "Service Not Required Anymore", text: "Business plans changed. Already filed GST through CA. Kindly process refund at the earliest." },
            items: [
                { name: "Private Limited Registration", category: "Business Setup", price: "₹12,999", icon: Package, iconColor: "text-amber-700 bg-amber-50" }
            ],
            refundAmount: "₹12,999",
            meta: { orderDate: "Dec 12, 2025", cancelledOn: "Dec 14, 2025 at 3:45 PM", paymentMethod: "Credit Card", refundStatus: "Processing (3-5 days)" },
            timeText: "Refund initiated 3 days ago"
        },
        {
            id: "TQ-2025-0765",
            customer: { name: "Amit Patel", email: "amit.p@example.com", phone: "+91 99887 76655", initials: "AP", color: "bg-emerald-500" },
            status: "completed",
            reason: { title: "Service Delay", text: "Order not processed on time. Missed the GST filing deadline. Request full refund." },
            items: [
                { name: "GST Registration", category: "Registration Service", price: "₹3,500", icon: FileText, iconColor: "text-blue-600 bg-blue-50" },
                { name: "Tax Consultation", category: "Advisory Service", price: "₹2,999", icon: MessageSquare, iconColor: "text-red-700 bg-red-50" }
            ],
            refundAmount: "₹6,499",
            meta: { orderDate: "Dec 8, 2025", cancelledOn: "Dec 10, 2025 at 2:15 PM", paymentMethod: "UPI - Google Pay", refundStatus: "Completed on Dec 14" },
            timeText: "Refund completed 3 days ago"
        },
        {
            id: "TQ-2025-0791",
            customer: { name: "Sneha Kapoor", email: "sneha.k@example.com", phone: "+91 97654 32108", initials: "SK", color: "bg-indigo-500" },
            status: "pending",
            reason: { title: "Accidental Order", text: "Accidentally placed order twice for same service. Please cancel one and refund amount." },
            items: [
                { name: "ITR Filing - Salaried", category: "Income Tax Service", price: "₹1,499", icon: Calculator, iconColor: "text-emerald-600 bg-emerald-50" }
            ],
            refundAmount: "₹1,499",
            meta: { orderDate: "Dec 17, 2025", cancelledOn: "Dec 17, 2025 at 10:20 AM", paymentMethod: "Debit Card", refundStatus: "Pending Approval" },
            timeText: "Cancelled 4 hours ago"
        }
    ];

    const filteredCancellations = activeTab === 'all'
        ? CANCELLATIONS
        : CANCELLATIONS.filter(c => c.status === activeTab);

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">
            {/* Header */}
            <div className="bg-white border text-card-foreground shadow-sm rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                            <XCircle className="text-rose-500" size={28} />
                            Order Cancellations & Refunds
                        </h1>
                        <p className="text-slate-500 font-medium">Manage cancelled orders and process refunds • Updated: Dec 17, 2025</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-slate-700 font-bold rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition">
                            <Download size={18} /> Export Report
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                            <CreditCard size={18} /> Process Refunds
                        </button>
                    </div>
                </div>

                {/* Alert Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4 mb-6">
                    <div className="p-2 bg-amber-100/50 rounded-lg text-amber-700 shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-800 text-base">Pending Refund Actions</h3>
                        <p className="text-amber-700 text-sm mt-1">
                            <strong>12 refunds</strong> are pending approval. <strong>₹67,450</strong> total refund amount. Process refunds within 48 hours as per policy.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Cancelled", value: "34", sub: "Last 30 days", icon: XCircle, color: "rose", footer: "8% cancellation rate", footerIcon: TrendingDown },
                        { label: "Pending Refunds", value: "12", sub: "Awaiting approval", icon: Clock, color: "orange", footer: "₹67,450 value", footerIcon: CreditCard },
                        { label: "Processing", value: "8", sub: "In progress", icon: RefreshCcw, color: "amber", footer: "3-5 business days", footerIcon: Clock },
                        { label: "Completed", value: "14", sub: "This month", icon: CheckCircle, color: "emerald", footer: "₹89,250 refunded", footerIcon: CreditCard },
                    ].map((stat, i) => (
                        <div key={i} className={`bg-white border border-gray-100 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition duration-200`}>
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-${stat.color}-500`}></div>
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                                    <div className="text-3xl font-black text-slate-800 mb-1">{stat.value}</div>
                                    <div className="text-xs font-bold text-slate-400">{stat.sub}</div>
                                </div>
                                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
                                    <stat.icon size={24} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-50 flex items-center gap-2 text-xs font-bold text-slate-500">
                                <stat.footerIcon size={14} /> {stat.footer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border text-card-foreground shadow-sm rounded-xl p-1 mb-6 flex overflow-x-auto">
                {[
                    { id: 'all', label: 'All Cancellations', count: 34, icon: Package },
                    { id: 'pending', label: 'Pending Refunds', count: 12, icon: Clock },
                    { id: 'processing', label: 'Processing', count: 8, icon: RefreshCcw },
                    { id: 'completed', label: 'Completed', count: 14, icon: CheckCircle },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded text-xs ${activeTab === tab.id ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white border text-card-foreground shadow-sm rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Package size={20} className="text-slate-400" /> Recent Cancellations
                    </h2>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search by order ID, customer..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredCancellations.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl hover:border-rose-200 hover:shadow-md transition duration-200 group overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-l-xl"></div>

                            <div className="p-5">
                                {/* Card Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl ${item.customer.color} text-white flex items-center justify-center font-bold text-lg shadow-sm`}>
                                            {item.customer.initials}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-lg">{item.customer.name}</div>
                                            <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                                <span className="flex items-center gap-1"><Mail size={14} /> {item.customer.email}</span>
                                                <span className="flex items-center gap-1"><Phone size={14} /> {item.customer.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg">#{item.id}</span>
                                        {item.status === 'pending' && <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg flex items-center gap-1"><Clock size={14} /> Pending Refund</span>}
                                        {item.status === 'processing' && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1"><RefreshCcw size={14} /> Refund Processing</span>}
                                        {item.status === 'completed' && <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1"><CheckCircle size={14} /> Refund Completed</span>}
                                    </div>
                                </div>

                                {/* Reason Content */}
                                <div className="ml-2 mb-4 bg-rose-50 border border-rose-100 rounded-lg p-4">
                                    <div className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-2 flex items-center gap-1">
                                        <AlertTriangle size={14} /> Cancellation Reason
                                    </div>
                                    <div className="bg-white border border-rose-100 rounded-lg p-3">
                                        <div className="font-bold text-rose-900 text-sm mb-1">{item.reason.title}</div>
                                        <div className="text-rose-800 text-sm leading-relaxed">"{item.reason.text}"</div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="ml-2 mb-4 bg-slate-50 rounded-lg p-4">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                                        <Package size={14} /> Cancelled Services ({item.items.length})
                                    </div>
                                    <div className="space-y-2">
                                        {item.items.map((srv, idx) => (
                                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg ${srv.iconColor} flex items-center justify-center`}>
                                                        <srv.icon size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-sm">{srv.name}</div>
                                                        <div className="text-xs font-medium text-slate-500">{srv.category}</div>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-slate-800">{srv.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 bg-rose-100 rounded-lg p-3 flex justify-between items-center text-rose-900">
                                        <span className="font-bold text-sm uppercase">Refund Amount</span>
                                        <span className="font-black text-xl">{item.refundAmount}</span>
                                    </div>
                                </div>

                                {/* Meta Grid */}
                                <div className="ml-2 grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Order Date</div>
                                        <div className="font-bold text-slate-700 text-sm">{item.meta.orderDate}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Cancelled On</div>
                                        <div className="font-bold text-slate-700 text-sm">{item.meta.cancelledOn}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Payment Method</div>
                                        <div className="font-bold text-slate-700 text-sm">{item.meta.paymentMethod}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Refund Status</div>
                                        <div className="font-bold text-slate-700 text-sm">
                                            <span className={`px-2 py-0.5 rounded text-xs ${item.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                    item.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {item.meta.refundStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="ml-2 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                        <div className="bg-slate-100 p-1.5 rounded-full"><Clock size={14} /></div>
                                        {item.timeText}
                                    </div>
                                    <div className="flex gap-2">
                                        {item.status === 'pending' && (
                                            <>
                                                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition text-sm">
                                                    <Check size={16} /> Approve Refund
                                                </button>
                                                <button className="flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-600 font-bold rounded-lg hover:bg-rose-50 transition text-sm">
                                                    <X size={16} /> Reject
                                                </button>
                                            </>
                                        )}
                                        {item.status === 'processing' && (
                                            <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-sm">
                                                <MapPin size={16} /> Track Refund
                                            </button>
                                        )}
                                        {item.status === 'completed' && (
                                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition text-sm">
                                                <Download size={16} /> Download Receipt
                                            </button>
                                        )}
                                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition text-sm">
                                            <Phone size={16} /> Contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CancellationsPage;
