"use client";

import React, { useState } from 'react';
import {
    ArrowsClockwise,
    FileText,
    Buildings,
    Calculator,
    Code,
    TrademarkRegistered,
    CheckCircle,
    X
} from '@phosphor-icons/react';

// --- Types ---

type ServiceMode = 'Online' | 'Offline' | 'Hybrid';

interface Service {
    id: number;
    name: string;
    code: string;
    time: string;
    mode: ServiceMode;
    type: 'tax' | 'reg' | 'dev' | 'other';
}

// --- Constants ---

const INITIAL_SERVICES: Service[] = [
    {
        id: 1,
        name: 'GST Registration',
        code: 'TAX-GST-01',
        time: '3-5 Working Days',
        mode: 'Online',
        type: 'tax'
    },
    {
        id: 2,
        name: 'Pvt Ltd Company Reg',
        code: 'REG-PVT-05',
        time: '10-15 Days',
        mode: 'Online',
        type: 'reg'
    },
    {
        id: 3,
        name: 'Income Tax Audit',
        code: 'TAX-AUD-99',
        time: '7 Days',
        mode: 'Offline',
        type: 'tax'
    },
    {
        id: 4,
        name: 'Web Development',
        code: 'DEV-WEB-01',
        time: '15-30 Days',
        mode: 'Hybrid',
        type: 'dev'
    },
    {
        id: 5,
        name: 'Trademark Filing',
        code: 'REG-TM-02',
        time: '1 Day Filing',
        mode: 'Online',
        type: 'reg'
    }
];

// --- Helper Components ---

const ServiceIcon = ({ type }: { type: Service['type'] }) => {
    switch (type) {
        case 'tax':
            return <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl"><FileText weight="bold" /></div>;
        case 'reg':
            return <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl"><Buildings weight="bold" /></div>;
        case 'dev':
            return <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center text-2xl"><Code weight="bold" /></div>;
        default:
            return <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-2xl"><TrademarkRegistered weight="bold" /></div>;
    }
};

const ModeBadge = ({ mode }: { mode: ServiceMode }) => {
    switch (mode) {
        case 'Online':
            return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">Online</span>;
        case 'Offline':
            return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">Offline</span>;
        case 'Hybrid':
            return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">Hybrid</span>;
    }
};

// --- Main Component ---

export default function ServiceTimelinePage() {
    const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
    const [isSyncing, setIsSyncing] = useState(false);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState<{ time: string; mode: ServiceMode }>({ time: '', mode: 'Online' });

    // Toast State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            showNotification('Services synced successfully');
        }, 1000);
    };

    const showNotification = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setFormData({ time: service.time, mode: service.mode });
        setShowModal(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingService) return;

        setServices(prev => prev.map(s =>
            s.id === editingService.id
                ? { ...s, time: formData.time, mode: formData.mode }
                : s
        ));

        setShowModal(false);
        showNotification('Service updated successfully');
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans p-4 md:p-8">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">Service Standards & Timeline</h2>
                        <p className="text-slate-500 text-sm">Manage delivery estimates and execution modes for your catalog.</p>
                    </div>
                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-semibold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-all disabled:opacity-70 shadow-sm"
                    >
                        <ArrowsClockwise size={18} weight="bold" className={isSyncing ? "animate-spin" : ""} />
                        {isSyncing ? 'Syncing...' : 'Sync Services'}
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map(service => (
                        <div key={service.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group">
                            <ServiceIcon type={service.type} />

                            <h3 className="text-lg font-bold text-slate-900 mt-4 mb-1">{service.name}</h3>
                            <span className="text-xs font-mono text-slate-400 block mb-5">CODE: {service.code}</span>

                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex justify-between items-center mb-5">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Time</div>
                                    <div className="text-sm font-semibold text-slate-800">{service.time}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mode</div>
                                    <ModeBadge mode={service.mode} />
                                </div>
                            </div>

                            <button
                                onClick={() => openEditModal(service)}
                                className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-200"
                            >
                                Update Standard
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            {/* Edit Modal */}
            {showModal && editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Update Service Standards</h3>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">Service Name</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={editingService.name}
                                        className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">Estimated Delivery Timeline</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                        placeholder="e.g. 3-5 Working Days"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    />
                                    <p className="text-xs text-slate-400 mt-1.5">This will be shown to clients on checkout.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">Mode of Delivery</label>
                                    <select
                                        value={formData.mode}
                                        onChange={(e) => setFormData(prev => ({ ...prev, mode: e.target.value as ServiceMode }))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                    >
                                        <option value="Online">Online (Digital)</option>
                                        <option value="Offline">Offline (Physical Visit)</option>
                                        <option value="Hybrid">Hybrid (Mixed)</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                    >
                                        Save Updates
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            <div className={`fixed bottom-8 right-8 z-50 transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
                <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                    <CheckCircle size={24} weight="bold" />
                    <span className="font-semibold">{toastMessage}</span>
                </div>
            </div>
        </div>
    );
}
