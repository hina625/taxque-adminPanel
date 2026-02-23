'use client';

import React, { useState } from 'react';

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState('integrations');
    const [modalOpen, setModalOpen] = useState<string | null>(null);
    const [modalData, setModalData] = useState<any>(null);

    // Constants to match the CSS variables from HTML
    // --pm-primary: #4f46e5 (indigo-600)
    // --pm-bg: #f8fafc (slate-50)

    const openConfig = (name: string) => {
        setModalData({ name });
        setModalOpen('config');
    };

    const openRules = () => {
        setModalOpen('rules');
    };

    const openUser = (name: string, amount: string, status: string) => {
        setModalData({ name, amount, status });
        setModalOpen('user');
    };

    const openTxn = (id: string, user: string, amount: string, status: string, method: string) => {
        setModalData({ id, user, amount, status, method });
        setModalOpen('txn');
    };

    const closeModals = () => {
        setModalOpen(null);
        setModalData(null);
    };

    return (
        <div className="p-5 bg-slate-100 dark:bg-gray-900 min-h-screen text-slate-900 dark:text-gray-100 font-sans transition-colors duration-300">
            {/* MODULE CONTAINER */}
            <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl min-h-[85vh] p-8 shadow-sm max-w-[1200px] mx-auto transition-colors">

                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">Payment & Credit Dashboard</h2>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">Manage integrations, credit rules, and transaction history.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">
                        Refresh Data
                    </button>
                </header>

                {/* Tabs */}
                <nav className="flex gap-8 border-b border-slate-200 dark:border-gray-700 mb-8">
                    {['integrations', 'paylater', 'logs'].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium cursor-pointer border-b-2 transition-all capitalize ${activeTab === tab
                                ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 font-semibold'
                                : 'text-slate-500 dark:text-gray-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {tab === 'paylater' ? 'PayLater Users' : tab === 'logs' ? 'Payment Logs' : tab}
                        </div>
                    ))}
                </nav>

                {/* VIEW 1: INTEGRATIONS */}
                {activeTab === 'integrations' && (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Razorpay */}
                        <div className="bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-6 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
                                <i className="ph-bold ph-arrow-square-out"></i>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Razorpay</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 mb-5">Standard Gateway for Cards & Netbanking.</p>
                            <button onClick={() => openConfig('Razorpay')} className="w-full py-2.5 rounded-lg font-semibold text-sm border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Configure</button>
                        </div>

                        {/* Cashfree */}
                        <div className="bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-6 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400">
                                <i className="ph-bold ph-lightning"></i>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Cashfree</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 mb-5">Payouts and Collection Gateway.</p>
                            <button onClick={() => openConfig('Cashfree')} className="w-full py-2.5 rounded-lg font-semibold text-sm border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Configure</button>
                        </div>

                        {/* Paytm */}
                        <div className="bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-6 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400">
                                <i className="ph-bold ph-wallet"></i>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Paytm</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 mb-5">Wallet and Postpaid Intent flow.</p>
                            <button onClick={() => openConfig('Paytm')} className="w-full py-2.5 rounded-lg font-semibold text-sm border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Configure</button>
                        </div>

                        {/* Manual UPI */}
                        <div className="bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-6 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400">
                                <i className="ph-bold ph-qr-code"></i>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Manual UPI</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 mb-5">Display Merchant VPA & QR Code.</p>
                            <button onClick={() => openConfig('UPI')} className="w-full py-2.5 rounded-lg font-semibold text-sm border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Setup VPA</button>
                        </div>

                        {/* PayLater Rule Engine */}
                        <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 rounded-xl p-6 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
                                <i className="ph-fill ph-sliders-horizontal"></i>
                            </div>
                            <h3 className="font-bold text-lg text-rose-800 dark:text-rose-300">PayLater Rules</h3>
                            <p className="text-rose-700 dark:text-rose-400/80 text-sm mt-2 mb-5">Manage Interest, Fees & No Cost EMI.</p>
                            <button onClick={openRules} className="w-full py-2.5 rounded-lg font-semibold text-sm bg-rose-600 hover:bg-rose-700 text-white border-none transition-colors">Manage Rules</button>
                        </div>
                    </div>
                )}

                {/* VIEW 2: PAYLATER USERS */}
                {activeTab === 'paylater' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between mb-6">
                            <input type="text" placeholder="Search user..." className="w-[300px] px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all" />
                            <button className="px-4 py-2.5 rounded-lg font-semibold text-sm border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">Export CSV</button>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden transition-colors">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 dark:bg-gray-900/50 text-slate-500 dark:text-gray-400 text-xs uppercase font-bold text-left">
                                        <th className="p-4 pl-6">User Name</th>
                                        <th className="p-4">Plan</th>
                                        <th className="p-4">Next Due</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors" onClick={() => openUser('Amit Sharma', '₹12,400', 'Active')}>
                                        <td className="p-4 pl-6 text-sm text-slate-900 dark:text-white">
                                            <div className="font-semibold">Amit Sharma</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-400">amit.sh@example.com</div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300">6 Months @ 12%</td>
                                        <td className="p-4 text-sm text-slate-500 dark:text-gray-400">Dec 24, 2025</td>
                                        <td className="p-4 text-sm font-bold text-rose-600 dark:text-rose-400">₹12,400</td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 inline-flex items-center gap-1">Active</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors" onClick={() => openUser('Rahul Verma', '₹4,500', 'Overdue')}>
                                        <td className="p-4 pl-6 text-sm text-slate-900 dark:text-white">
                                            <div className="font-semibold">Rahul Verma</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-400">rahul.v@example.com</div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300">3 Months (No Cost)</td>
                                        <td className="p-4 text-sm font-semibold text-red-700 dark:text-red-400">Yesterday</td>
                                        <td className="p-4 text-sm font-bold text-rose-600 dark:text-rose-400">₹4,500</td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 inline-flex items-center gap-1">Overdue</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* VIEW 3: LOGS */}
                {activeTab === 'logs' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden transition-colors">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 dark:bg-gray-900/50 text-slate-500 dark:text-gray-400 text-xs uppercase font-bold text-left">
                                        <th className="p-4 pl-6">Transaction ID</th>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Method</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors" onClick={() => openTxn('TXN_8829', 'Amit Sharma', '₹2,100', 'Success', 'UPI')}>
                                        <td className="p-4 pl-6 font-mono font-semibold text-slate-900 dark:text-white">#TXN_8829</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300">Amit Sharma</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300 flex items-center gap-2">UPI</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300">Dec 16, 10:42 AM</td>
                                        <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">₹2,100</td>
                                        <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 inline-flex items-center gap-1">Success</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors" onClick={() => openTxn('TXN_8830', 'Priya Singh', '₹5,000', 'Failed', 'Card')}>
                                        <td className="p-4 pl-6 font-mono font-semibold text-slate-900 dark:text-white">#TXN_8830</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300">Priya Singh</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300 flex items-center gap-2">Card</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-gray-300">Dec 15, 04:15 PM</td>
                                        <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">₹5,000</td>
                                        <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 inline-flex items-center gap-1">Failed</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>

            {/* MODALS */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 transition-colors">

                        {/* CONFIG MODAL */}
                        {modalOpen === 'config' && (
                            <>
                                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Configure <span className="text-indigo-600 dark:text-indigo-400">{modalData?.name}</span></h3>
                                    <button onClick={closeModals} className="p-1 hover:bg-slate-200 dark:hover:bg-gray-700 rounded text-slate-500 dark:text-gray-400 transition-colors">✕</button>
                                </div>
                                <div className="p-6">
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">API Key / Merchant ID</label>
                                    <input type="text" className="w-full p-2.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg text-sm text-slate-900 dark:text-white mb-4 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all" placeholder="Paste Public Key" />
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">Secret Key</label>
                                    <input type="password" className="w-full p-2.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg text-sm text-slate-900 dark:text-white mb-6 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all" placeholder="Paste Secret Key" />
                                    <button onClick={closeModals} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm">Save Configuration</button>
                                </div>
                            </>
                        )}

                        {/* RULES MODAL */}
                        {modalOpen === 'rules' && (
                            <>
                                <div className="flex justify-between items-center p-6 border-b border-rose-100 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-900/20">
                                    <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300">Rule Studio</h3>
                                    <button onClick={closeModals} className="p-1 hover:bg-rose-200 dark:hover:bg-rose-900/50 rounded text-rose-800 dark:text-rose-400 transition-colors">✕</button>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4 p-3 bg-slate-50 dark:bg-gray-900/30 rounded-lg border border-slate-200 dark:border-gray-700">
                                        <div>
                                            <div className="font-semibold text-sm text-slate-900 dark:text-gray-200">Allow No Cost EMI</div>
                                            <div className="text-xs text-slate-500 dark:text-gray-400">Global override for promotions</div>
                                        </div>
                                        <input type="checkbox" className="toggle toggle-indigo" defaultChecked />
                                    </div>

                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">Annual Interest Rate (%)</label>
                                    <input type="number" defaultValue={18} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg text-sm text-slate-900 dark:text-white mb-4 outline-none focus:border-indigo-600 transition-all" />

                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">Processing Fee (₹)</label>
                                    <input type="number" defaultValue={199} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg text-sm text-slate-900 dark:text-white mb-4 outline-none focus:border-indigo-600 transition-all" />

                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">Credit Limit Cap (₹)</label>
                                    <input type="number" defaultValue={50000} className="w-full p-2.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg text-sm text-slate-900 dark:text-white mb-4 outline-none focus:border-indigo-600 transition-all" />

                                    <button onClick={closeModals} className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm mt-2">Publish Rules</button>
                                </div>
                            </>
                        )}

                        {/* USER DETAILS MODAL */}
                        {modalOpen === 'user' && (
                            <>
                                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-gray-700 transition-colors">
                                    <div>
                                        <h3 className="text-lg font-bold m-0 leading-tight text-slate-900 dark:text-white">{modalData?.name}</h3>
                                        <div className={`mt-1 inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${modalData?.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>{modalData?.status}</div>
                                    </div>
                                    <button onClick={closeModals} className="p-1 hover:bg-slate-100 dark:hover:bg-gray-700 rounded text-slate-500 dark:text-gray-400 transition-colors">✕</button>
                                </div>
                                <div className="p-6">
                                    <div className="bg-rose-50 dark:bg-rose-900/10 border border-dashed border-rose-500 dark:border-rose-900/50 p-4 rounded-lg text-center mb-5">
                                        <div className="text-xs text-rose-800 dark:text-rose-300 font-bold tracking-wider opacity-80">TOTAL OUTSTANDING</div>
                                        <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-1">{modalData?.amount}</div>
                                    </div>

                                    <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                                        Generate Payment Link
                                    </button>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <button className="py-2.5 border border-slate-200 dark:border-gray-700 rounded-lg font-semibold text-sm bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">Email</button>
                                        <button className="py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm">WhatsApp</button>
                                    </div>

                                    <hr className="my-6 border-slate-200 dark:border-gray-700" />

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-2 border border-slate-200 dark:border-gray-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors">Add Coupon</button>
                                        <button className="flex-1 py-2 border border-green-700 dark:border-green-600 rounded-lg text-sm font-semibold text-green-800 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">Pre-Close / Settle</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* TRANSACTION DETAILS MODAL */}
                        {modalOpen === 'txn' && (
                            <>
                                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-gray-700 transition-colors">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transaction Details</h3>
                                    <button onClick={closeModals} className="p-1 hover:bg-slate-100 dark:hover:bg-gray-700 rounded text-slate-500 dark:text-gray-400 transition-colors">✕</button>
                                </div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-slate-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl text-slate-400 dark:text-gray-500">
                                            <i className="ph-bold ph-receipt"></i>
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{modalData?.amount}</div>
                                        <div className={`mt-2 inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${modalData?.status === 'Success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>{modalData?.status}</div>
                                    </div>

                                    <div className="py-4 border-y border-slate-200 dark:border-gray-700 space-y-3 transition-colors">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500 dark:text-gray-400">Transaction ID</span>
                                            <span className="font-semibold font-mono text-slate-900 dark:text-white">{modalData?.id}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500 dark:text-gray-400">Customer</span>
                                            <span className="font-semibold text-slate-900 dark:text-white">{modalData?.user}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500 dark:text-gray-400">Payment Method</span>
                                            <span className="font-semibold text-slate-900 dark:text-white">{modalData?.method}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-6">
                                        <button className="py-2.5 border border-red-300 dark:border-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-semibold text-sm bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Refund</button>
                                        <button className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm">Download Invoice</button>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}
