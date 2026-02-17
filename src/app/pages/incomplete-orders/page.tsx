"use client";

import React, { useState } from 'react';
import {
    XCircle,
    DownloadSimple,
    Envelope,
    CurrencyCircleDollar,
    CreditCard,
    ShoppingCart,
    NotePencil,
    ArrowCounterClockwise,
    Warning,
    ChartLine,
    Clock,
    List,
    MagnifyingGlass,
    Package,
    FileText,
    Calculator,
    Chats,
    Notepad,
    Scales,
    UserCircle,
    Link as LinkIcon,
    Phone,
    Percent,
    ClockClockwise,
    CheckCircle
} from '@phosphor-icons/react';

// --- Types ---

interface OrderItem {
    name: string;
    category: string;
    price: string;
    icon: React.ReactNode;
}

interface Order {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        avatar: string;
        avatarColor: string;
    };
    timeAgo: string;
    items: OrderItem[];
    total: string;
    status: 'Payment Failed' | 'Checkout Abandoned' | 'Form Incomplete';
    meta: {
        label1: string;
        value1: string;
        label2: string;
        value2: string;
        startedAt: string;
    };
    lastActivity: string;
}

// --- Mock Data ---

const MOCK_ORDERS: Order[] = [
    {
        id: 'INC-2025-0234',
        customer: {
            name: 'Ramesh Kumar',
            email: 'ramesh.k@example.com',
            phone: '+91 98765 43210',
            avatar: 'RK',
            avatarColor: 'from-red-500 to-red-600'
        },
        timeAgo: '25 mins ago',
        items: [
            {
                name: 'GST Filing - Monthly',
                category: 'Compliance Service',
                price: '₹2,500',
                icon: <FileText weight="bold" />
            },
            {
                name: 'ITR Filing - Individual',
                category: 'Income Tax Service',
                price: '₹1,999',
                icon: <Calculator weight="bold" />
            }
        ],
        total: '₹4,499',
        status: 'Payment Failed',
        meta: {
            label1: 'Failure Reason',
            value1: 'Insufficient Funds',
            label2: 'Payment Method',
            value2: 'UPI - PhonePe',
            startedAt: 'Dec 17, 2025 at 1:40 PM'
        },
        lastActivity: '25 minutes ago'
    },
    {
        id: 'INC-2025-0235',
        customer: {
            name: 'Priya Sharma',
            email: 'priya.s@example.com',
            phone: '+91 98234 56789',
            avatar: 'PS',
            avatarColor: 'from-orange-500 to-orange-600'
        },
        timeAgo: '2 hours ago',
        items: [
            {
                name: 'Private Limited Registration',
                category: 'Business Setup',
                price: '₹12,999',
                icon: <Clock weight="bold" /> // Using generic icon
            }
        ],
        total: '₹12,999',
        status: 'Checkout Abandoned',
        meta: {
            label1: 'Last Step',
            value1: 'Payment Page Viewed',
            label2: 'Drop-off Point',
            value2: 'Select Payment Method',
            startedAt: 'Dec 17, 2025 at 12:05 PM'
        },
        lastActivity: '2 hours ago'
    },
    {
        id: 'INC-2025-0236',
        customer: {
            name: 'Amit Patel',
            email: 'amit.p@example.com',
            phone: '+91 99887 76655',
            avatar: 'AP',
            avatarColor: 'from-red-500 to-red-600'
        },
        timeAgo: '45 mins ago',
        items: [
            {
                name: 'GST Registration',
                category: 'Registration Service',
                price: '₹3,500',
                icon: <FileText weight="bold" />
            },
            {
                name: 'Tax Consultation',
                category: 'Advisory Service',
                price: '₹2,999',
                icon: <Chats weight="bold" />
            },
            {
                name: 'Bookkeeping - Monthly',
                category: 'Accounting Service',
                price: '₹3,500',
                icon: <Notepad weight="bold" />
            }
        ],
        total: '₹9,999',
        status: 'Payment Failed',
        meta: {
            label1: 'Failure Reason',
            value1: 'Transaction Timeout',
            label2: 'Payment Method',
            value2: 'Credit Card',
            startedAt: 'Dec 17, 2025 at 1:20 PM'
        },
        lastActivity: '45 minutes ago'
    },
    {
        id: 'INC-2025-0237',
        customer: {
            name: 'Sneha Kapoor',
            email: 'sneha.k@example.com',
            phone: '+91 97654 32108',
            avatar: 'SK',
            avatarColor: 'from-amber-500 to-amber-600'
        },
        timeAgo: '3 hours ago',
        items: [
            {
                name: 'ITR Filing - Salaried',
                category: 'Income Tax Service',
                price: '₹1,499',
                icon: <Calculator weight="bold" />
            }
        ],
        total: '₹1,499',
        status: 'Form Incomplete',
        meta: {
            label1: 'Completed',
            value1: 'Personal Info (60%)',
            label2: 'Pending',
            value2: 'Document Upload, Payment',
            startedAt: 'Dec 17, 2025 at 11:05 AM'
        },
        lastActivity: '3 hours ago'
    },
    {
        id: 'INC-2025-0238',
        customer: {
            name: 'Vikram Joshi',
            email: 'vikram.j@example.com',
            phone: '+91 96543 21098',
            avatar: 'VJ',
            avatarColor: 'from-orange-500 to-orange-600'
        },
        timeAgo: '5 hours ago',
        items: [
            {
                name: 'GST Audit Support',
                category: 'Audit Service',
                price: '₹8,500',
                icon: <Scales weight="bold" />
            },
            {
                name: 'Tax Planning - Annual',
                category: 'Advisory Service',
                price: '₹7,999',
                icon: <ChartLine weight="bold" />
            }
        ],
        total: '₹16,499',
        status: 'Checkout Abandoned',
        meta: {
            label1: 'Last Step',
            value1: 'Reviewing Order',
            label2: 'Drop-off Point',
            value2: 'Before Payment Page',
            startedAt: 'Dec 17, 2025 at 9:05 AM'
        },
        lastActivity: '5 hours ago'
    },
    {
        id: 'INC-2025-0239',
        customer: {
            name: 'Anjali Mehta',
            email: 'anjali.m@example.com',
            phone: '+91 95432 10987',
            avatar: 'AM',
            avatarColor: 'from-red-500 to-red-600'
        },
        timeAgo: '1 hour ago',
        items: [
            {
                name: 'Proprietorship Registration',
                category: 'Business Setup',
                price: '₹4,999',
                icon: <UserCircle weight="bold" />
            }
        ],
        total: '₹4,999',
        status: 'Payment Failed',
        meta: {
            label1: 'Failure Reason',
            value1: 'Bank Server Down',
            label2: 'Payment Method',
            value2: 'Net Banking - SBI',
            startedAt: 'Dec 17, 2025 at 1:05 PM'
        },
        lastActivity: '1 hour ago'
    }
];

export default function IncompleteOrdersPage() {
    const [activeTab, setActiveTab] = useState<'All' | 'Payment Failed' | 'Checkout Abandoned' | 'Form Incomplete'>('All');
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);

    // --- Actions ---

    const showNotification = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleExportReport = () => {
        alert(`📊 Export Incomplete Orders Report\n\nReport will include:\n• All incomplete orders\n• Payment failure analysis\n• Checkout abandonment reasons\n• Recovery attempt history\n• Potential revenue data\n\nFormat: Excel/CSV\nDate Range: Last 30 days`);
    };

    const handleSendRecoveryEmails = () => {
        if (confirm(`📨 Send Bulk Recovery Emails\n\nThis will send personalized recovery emails to:\n• 18 Payment Failed customers\n• 23 Checkout Abandoned customers\n• 15 Form Incomplete customers\n\nTotal: 56 emails\n\nContinue?`)) {
            showNotification("Recovery Campaign Started! Emails queued for sending.");
        }
    };

    const handleViewOrder = (orderId: string) => {
        alert(`📋 Viewing Incomplete Order Details\n\nOrder ID: ${orderId}\n\nThis would show:\n• Complete order information\n• Customer details & history\n• Services selected\n• Checkout journey timeline`);
    };

    const handleSendPaymentLink = (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        showNotification(`Payment link sent to customer for Order ${orderId}`);
    };

    const handleCallCustomer = (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        alert(`📞 Call Customer\n\nOrder ID: ${orderId}\n\nInitiating call via integrated softphone...`);
    };

    const handleSendReminder = (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        showNotification(`Recovery reminder sent for Order ${orderId}`);
    };

    const handleOfferDiscount = (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        const discount = prompt("Enter discount percentage (e.g., 10):", "10");
        if (discount) {
            showNotification(`${discount}% discount offer sent for Order ${orderId}`);
        }
    };

    const handleSendFormLink = (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        showNotification(`Form completion link sent for Order ${orderId}`);
    };

    // --- Badge Helpers ---
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Payment Failed':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-800"><CreditCard weight="fill" /> Payment Failed</span>;
            case 'Checkout Abandoned':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-100 text-orange-800"><ShoppingCart weight="fill" /> Checkout Abandoned</span>;
            case 'Form Incomplete':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800"><NotePencil weight="fill" /> Form Incomplete</span>;
            default:
                return null;
        }
    };

    const getCardBorderClass = (status: string) => {
        switch (status) {
            case 'Payment Failed': return 'before:bg-red-500 border-l-4 border-l-red-500';
            case 'Checkout Abandoned': return 'before:bg-orange-500 border-l-4 border-l-orange-500';
            case 'Form Incomplete': return 'before:bg-amber-500 border-l-4 border-l-amber-500';
            default: return '';
        }
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] p-6 font-sans">

            {/* Header */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <XCircle weight="bold" className="text-red-500" size={32} />
                            Incomplete Orders & Abandoned Checkouts
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium text-sm">Track customers who didn't complete their purchase • Updated: Just now</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button onClick={handleExportReport} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors bg-white text-sm">
                            <DownloadSimple weight="bold" size={18} />
                            Export Report
                        </button>
                        <button onClick={handleSendRecoveryEmails} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-transform active:scale-95 text-sm">
                            <Envelope weight="bold" size={18} />
                            Send Recovery Emails
                        </button>
                    </div>
                </div>

                {/* Alert Box */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-5 mb-6 flex items-start gap-4">
                    <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center text-red-700 text-2xl flex-shrink-0">
                        <CurrencyCircleDollar weight="fill" />
                    </div>
                    <div>
                        <div className="font-bold text-red-900 mb-1">Potential Revenue at Risk: ₹3,87,450</div>
                        <div className="text-red-800 text-sm leading-relaxed">
                            <strong>47 customers</strong> started checkout but didn't complete payment. <strong>18 had payment failures</strong>. Send reminders to recover lost sales.
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Payment Failed */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Payment Failed</div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">18</div>
                                <div className="text-xs font-semibold text-slate-400">Last 7 days</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xl shadow-lg shadow-red-200">
                                <CreditCard weight="bold" />
                            </div>
                        </div>
                        <div className="pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <Warning weight="bold" className="text-red-500" />
                            <span>₹1,24,350 value</span>
                        </div>
                    </div>

                    {/* Checkout Abandoned */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500"></div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Checkout Abandoned</div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">23</div>
                                <div className="text-xs font-semibold text-slate-400">Reached checkout page</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl shadow-lg shadow-orange-200">
                                <ShoppingCart weight="bold" />
                            </div>
                        </div>
                        <div className="pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <CurrencyCircleDollar weight="bold" className="text-orange-500" />
                            <span>₹1,87,900 value</span>
                        </div>
                    </div>

                    {/* Form Incomplete */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Form Incomplete</div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">15</div>
                                <div className="text-xs font-semibold text-slate-400">Partial submission</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-xl shadow-lg shadow-amber-200">
                                <NotePencil weight="bold" />
                            </div>
                        </div>
                        <div className="pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <Clock weight="bold" className="text-amber-500" />
                            <span>₹75,200 value</span>
                        </div>
                    </div>

                    {/* Total Potential */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500"></div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Potential</div>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">₹3.8L</div>
                                <div className="text-xs font-semibold text-slate-400">Can be recovered</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-200">
                                <ArrowCounterClockwise weight="bold" />
                            </div>
                        </div>
                        <div className="pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <ChartLine weight="bold" className="text-purple-500" />
                            <span>28% avg recovery rate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border border-slate-200 rounded-xl p-1 mb-6 shadow-sm overflow-x-auto">
                <div className="flex space-x-1 min-w-max">
                    {['All', 'Payment Failed', 'Checkout Abandoned', 'Form Incomplete'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === tab
                                    ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            {tab === 'All' && <List weight="bold" />}
                            {tab === 'Payment Failed' && <CreditCard weight="bold" />}
                            {tab === 'Checkout Abandoned' && <ShoppingCart weight="bold" />}
                            {tab === 'Form Incomplete' && <NotePencil weight="bold" />}
                            {tab}
                            <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                                {tab === 'All' ? orders.length : orders.filter(o => o.status === tab).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <List weight="bold" />
                        Recent Incomplete Orders
                    </h2>
                    <div className="relative group w-full md:w-auto">
                        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone..."
                            className="w-full md:w-80 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredOrders.map(order => (
                        <div
                            key={order.id}
                            onClick={() => handleViewOrder(order.id)}
                            className={`bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group ${getCardBorderClass(order.status)}`}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${order.customer.avatarColor}`}>
                                        {order.customer.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">{order.customer.name}</div>
                                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5"><Envelope weight="bold" /> {order.customer.email}</span>
                                            <span className="flex items-center gap-1.5"><Phone weight="bold" /> {order.customer.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${order.status === 'Payment Failed' ? 'bg-red-100 text-red-800' :
                                            order.status === 'Checkout Abandoned' ? 'bg-orange-100 text-orange-800' :
                                                'bg-amber-100 text-amber-800'
                                        }`}>
                                        <Clock weight="fill" />
                                        {order.timeAgo}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Package weight="bold" />
                                    Services Selected ({order.items.length})
                                </div>
                                <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-lg">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                                                    <div className="text-xs text-slate-500">{item.category}</div>
                                                </div>
                                            </div>
                                            <div className="font-bold text-slate-900">{item.price}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 bg-indigo-50 rounded-lg p-3 flex justify-between items-center text-indigo-900">
                                    <span className="font-bold text-sm uppercase tracking-wide">Order Total</span>
                                    <span className="font-extrabold text-lg">{order.total}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status</div>
                                    <div>{getStatusBadge(order.status)}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{order.meta.label1}</div>
                                    <div className="font-bold text-slate-800 text-sm">{order.meta.value1}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{order.meta.label2}</div>
                                    <div className="font-bold text-slate-800 text-sm">{order.meta.value2}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Checkout Started</div>
                                    <div className="font-bold text-slate-800 text-sm">{order.meta.startedAt}</div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                                    <ClockClockwise weight="bold" />
                                    Last activity: {order.lastActivity}
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    {order.status === 'Payment Failed' && (
                                        <button onClick={(e) => handleSendPaymentLink(e, order.id)} className="flex-1 sm:flex-none py-1.5 px-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5">
                                            <LinkIcon weight="bold" /> Send Payment Link
                                        </button>
                                    )}
                                    {order.status === 'Checkout Abandoned' && (
                                        <button onClick={(e) => handleSendReminder(e, order.id)} className="flex-1 sm:flex-none py-1.5 px-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5">
                                            <Envelope weight="bold" /> Send Reminder
                                        </button>
                                    )}
                                    {order.status === 'Form Incomplete' && (
                                        <button onClick={(e) => handleSendFormLink(e, order.id)} className="flex-1 sm:flex-none py-1.5 px-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5">
                                            <LinkIcon weight="bold" /> Send Form Link
                                        </button>
                                    )}

                                    {order.status === 'Checkout Abandoned' && (
                                        <button onClick={(e) => handleOfferDiscount(e, order.id)} className="flex-1 sm:flex-none py-1.5 px-3 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5">
                                            <Percent weight="bold" /> Offer Discount
                                        </button>
                                    )}

                                    <button onClick={(e) => handleCallCustomer(e, order.id)} className="flex-1 sm:flex-none py-1.5 px-3 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5">
                                        <Phone weight="bold" /> Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <List className="text-slate-300 text-2xl" />
                            </div>
                            <h3 className="text-slate-900 font-bold">No orders found</h3>
                            <p className="text-slate-500 text-sm">Try changing the filter or search terms</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
                    <div className="bg-slate-800 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3">
                        <CheckCircle weight="fill" className="text-emerald-400 text-xl" />
                        <div>
                            <h4 className="font-bold text-sm">Success</h4>
                            <p className="text-xs text-slate-300 mt-0.5">{toastMessage}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
