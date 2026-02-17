"use client";

import React, { useState } from 'react';
import {
    CurrencyInr,
    PlusCircle,
    ListBullets,
    Table,
    LinkSimple,
    Clock,
    PencilSimple,
    Trash,
    X,
    ArrowRight,
    CheckCircle,
    Money,
    Buildings,
    Tag
} from '@phosphor-icons/react';

// --- Types ---

interface Service {
    id: number;
    name: string;
}

interface Plan {
    id: number;
    name: string;
    status: 'published' | 'draft';
}

interface Mapping {
    id: number;
    serviceId: number;
    planId: number;
    billing: 'monthly' | 'half_yearly' | 'yearly' | 'one_time';
    salePrice: number;
    marketPrice: number;
    govtFee: number;
    features: string[];
}

// --- Constants ---

const INITIAL_SERVICES: Service[] = [
    { id: 1, name: "GST Registration" },
    { id: 2, name: "GST Return Filing" },
    { id: 3, name: "ITR Filing" }
];

const INITIAL_PLANS: Plan[] = [
    { id: 1, name: "Basic Plan", status: "published" },
    { id: 2, name: "Standard Plan", status: "published" },
    { id: 3, name: "Premium Plan", status: "draft" }
];

const INITIAL_MAPPINGS: Mapping[] = [
    {
        id: 1,
        serviceId: 1,
        planId: 1,
        billing: "one_time",
        salePrice: 1499,
        marketPrice: 2499,
        govtFee: 200,
        features: ["Document check", "GST portal filing", "Email support"]
    },
    {
        id: 2,
        serviceId: 1,
        planId: 2,
        billing: "yearly",
        salePrice: 4999,
        marketPrice: 6999,
        govtFee: 0,
        features: ["Multi-state support", "Basic notice reply"]
    },
    {
        id: 3,
        serviceId: 2,
        planId: 2,
        billing: "monthly",
        salePrice: 1999,
        marketPrice: 2999,
        govtFee: 100,
        features: ["Monthly GSTR-1 & 3B", "Input tax review"]
    }
];

// --- Component ---

export default function ServicePricePlanPage() {
    // State
    const [services] = useState<Service[]>(INITIAL_SERVICES);
    const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
    const [mappings, setMappings] = useState<Mapping[]>(INITIAL_MAPPINGS);

    const [currentServiceId, setCurrentServiceId] = useState<number>(services[0].id);

    // Modals
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [planForm, setPlanForm] = useState<Partial<Plan>>({});

    const [showMappingModal, setShowMappingModal] = useState(false);
    const [mappingForm, setMappingForm] = useState<Partial<Mapping> & { featuresText?: string }>({});

    // Toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // derived state
    const currentService = services.find(s => s.id === currentServiceId);
    const currentMappings = mappings.filter(m => m.serviceId === currentServiceId);

    // Helpers
    const formatINR = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const getBillingLabel = (code: string) => {
        switch (code) {
            case "monthly": return "Monthly";
            case "half_yearly": return "Half-Yearly";
            case "yearly": return "Yearly";
            case "one_time": return "One-Time";
            default: return code;
        }
    };

    const getBillingBadgeClass = (code: string) => {
        switch (code) {
            case "monthly": return "bg-indigo-50 text-indigo-700 border-indigo-100";
            case "half_yearly": return "bg-sky-50 text-sky-700 border-sky-100";
            case "yearly": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "one_time": return "bg-amber-50 text-amber-700 border-amber-100";
            default: return "bg-slate-50 text-slate-600 border-slate-200";
        }
    };

    const showNotification = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Plan Actions
    const handleCreatePlan = () => {
        setPlanForm({ name: '', status: 'draft' });
        setShowPlanModal(true);
    };

    const handleSavePlan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!planForm.name) return;

        const newPlan: Plan = {
            id: Math.max(0, ...plans.map(p => p.id)) + 1,
            name: planForm.name,
            status: planForm.status as 'published' | 'draft'
        };

        setPlans([...plans, newPlan]);
        setShowPlanModal(false);
        showNotification('Plan created successfully');
    };

    // Mapping Actions
    const handleAttachPlan = () => {
        setMappingForm({
            serviceId: currentServiceId,
            billing: 'monthly',
            salePrice: 0,
            marketPrice: 0,
            govtFee: 0,
            featuresText: ''
        });
        setShowMappingModal(true);
    };

    const handleEditMapping = (mapping: Mapping) => {
        setMappingForm({
            ...mapping,
            featuresText: mapping.features.join('\n')
        });
        setShowMappingModal(true);
    };

    const handleDeleteMapping = (id: number) => {
        if (confirm('Remove this plan from service?')) {
            setMappings(prev => prev.filter(m => m.id !== id));
            showNotification('Plan removed from service');
        }
    };

    const handleSaveMapping = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mappingForm.planId || !mappingForm.billing) {
            alert('Please select plan and billing type');
            return;
        }

        const features = mappingForm.featuresText
            ?.split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 0) || [];

        const mappingData: Mapping = {
            id: mappingForm.id || Math.max(0, ...mappings.map(m => m.id)) + 1,
            serviceId: currentServiceId,
            planId: mappingForm.planId,
            billing: mappingForm.billing as any,
            salePrice: Number(mappingForm.salePrice),
            marketPrice: Number(mappingForm.marketPrice),
            govtFee: Number(mappingForm.govtFee),
            features
        };

        if (mappingForm.id) {
            setMappings(prev => prev.map(m => m.id === mappingData.id ? mappingData : m));
            showNotification('Mapping updated successfully');
        } else {
            setMappings(prev => [...prev, mappingData]);
            showNotification('Plan attached successfully');
        }
        setShowMappingModal(false);
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                            <CurrencyInr weight="bold" />
                            Service ↔ Plans
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                            Map Services to Plans
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Configure pricing and plans for each of your services.
                        </p>
                    </div>
                    <button
                        onClick={handleCreatePlan}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
                    >
                        <PlusCircle size={18} weight="bold" />
                        Create New Plan
                    </button>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-[300px_1fr] gap-6 items-start">

                    {/* Sidebar: Services */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sticky top-6">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <ListBullets size={18} className="text-indigo-500" weight="bold" />
                            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Services</h2>
                        </div>
                        <div className="space-y-1">
                            {services.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setCurrentServiceId(s.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between gap-2 transition-all ${s.id === currentServiceId
                                            ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="truncate">{s.name}</span>
                                    {s.id === currentServiceId && <ArrowRight weight="bold" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main: Mappings */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div>
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Table size={18} className="text-indigo-500" weight="bold" />
                                    Plans for <span className="text-slate-900">{currentService?.name}</span>
                                </h2>
                            </div>
                            <button
                                onClick={handleAttachPlan}
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition-colors"
                            >
                                <LinkSimple size={16} weight="bold" />
                                Attach Plan
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Plan Name</th>
                                        <th className="px-6 py-3 font-semibold text-center">Billing</th>
                                        <th className="px-6 py-3 font-semibold text-right">Sale Price</th>
                                        <th className="px-6 py-3 font-semibold text-right">Market Price</th>
                                        <th className="px-6 py-3 font-semibold text-right">Govt Fee</th>
                                        <th className="px-6 py-3 font-semibold text-right">Total</th>
                                        <th className="px-6 py-3 font-semibold">Features</th>
                                        <th className="px-6 py-3 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {currentMappings.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Tag size={48} className="text-slate-200" />
                                                    <p>No plans attached to this service yet.</p>
                                                    <button onClick={handleAttachPlan} className="text-indigo-600 font-semibold text-xs hover:underline">
                                                        Attach a plan now
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentMappings.map(m => {
                                            const plan = plans.find(p => p.id === m.planId);
                                            const total = (Number(m.salePrice) || 0) + (Number(m.govtFee) || 0);

                                            return (
                                                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="font-bold text-slate-900">{plan?.name}</div>
                                                        <div className="text-xs text-slate-500 capitalize">{plan?.status}</div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top text-center">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wide ${getBillingBadgeClass(m.billing)}`}>
                                                            <Clock weight="bold" />
                                                            {getBillingLabel(m.billing)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 align-top text-right font-medium text-slate-600">{formatINR(m.salePrice)}</td>
                                                    <td className="px-6 py-4 align-top text-right text-slate-400 line-through text-xs">{formatINR(m.marketPrice)}</td>
                                                    <td className="px-6 py-4 align-top text-right text-xs text-slate-500">{formatINR(m.govtFee)}</td>
                                                    <td className="px-6 py-4 align-top text-right">
                                                        <div className="font-bold text-emerald-600">{formatINR(total)}</div>
                                                        <div className="text-[10px] text-slate-400">Inc. Fees</div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="flex flex-wrap gap-1">
                                                            {m.features.map((f, i) => (
                                                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] border border-slate-200">
                                                                    {f}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleEditMapping(m)}
                                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <PencilSimple size={16} weight="bold" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteMapping(m.id)}
                                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <Trash size={16} weight="bold" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            {/* Plan Modal */}
            {showPlanModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowPlanModal(false)} />
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-900">Create New Plan</h3>
                            <button onClick={() => setShowPlanModal(false)} className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100">
                                <X size={20} weight="bold" />
                            </button>
                        </div>
                        <form onSubmit={handleSavePlan} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Plan Name <span className="text-red-500">*</span></label>
                                <input
                                    autoFocus
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                                    placeholder="e.g. Enterprise Plan"
                                    value={planForm.name}
                                    onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Status</label>
                                <select
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                    value={planForm.status}
                                    onChange={(e) => setPlanForm({ ...planForm, status: e.target.value as any })}
                                >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowPlanModal(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">Save Plan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Mapping Modal */}
            {showMappingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowMappingModal(false)} />
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-in">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="font-bold text-slate-900">{mappingForm.id ? 'Edit Plan Mapping' : 'Attach Plan to Service'}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Configure pricing and features for this plan</p>
                            </div>
                            <button onClick={() => setShowMappingModal(false)} className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100">
                                <X size={20} weight="bold" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveMapping} className="p-6 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Plan <span className="text-red-500">*</span></label>
                                    <select
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                        value={mappingForm.planId}
                                        onChange={(e) => setMappingForm({ ...mappingForm, planId: Number(e.target.value) })}
                                        disabled={!!mappingForm.id} // Disable plan change on edit
                                    >
                                        <option value="">Select Plan</option>
                                        {plans.map(p => (
                                            <option key={p.id} value={p.id}>{p.name} ({p.status})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Billing Cycle <span className="text-red-500">*</span></label>
                                    <select
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                        value={mappingForm.billing}
                                        onChange={(e) => setMappingForm({ ...mappingForm, billing: e.target.value as any })}
                                    >
                                        <option value="monthly">Monthly</option>
                                        <option value="half_yearly">Half-Yearly</option>
                                        <option value="yearly">Yearly</option>
                                        <option value="one_time">One-Time</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Sale Price <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Money size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="number"
                                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                                            value={mappingForm.salePrice}
                                            onChange={(e) => setMappingForm({ ...mappingForm, salePrice: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Market Price</label>
                                    <div className="relative">
                                        <Money size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="number"
                                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                                            value={mappingForm.marketPrice}
                                            onChange={(e) => setMappingForm({ ...mappingForm, marketPrice: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Govt Fee</label>
                                    <div className="relative">
                                        <Buildings size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="number"
                                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                                            value={mappingForm.govtFee}
                                            onChange={(e) => setMappingForm({ ...mappingForm, govtFee: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Features (One per line)</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 min-h-[100px]"
                                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                    value={mappingForm.featuresText}
                                    onChange={(e) => setMappingForm({ ...mappingForm, featuresText: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowMappingModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">Save Changes</button>
                            </div>
                        </form>
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
