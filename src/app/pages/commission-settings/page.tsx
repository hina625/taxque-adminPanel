'use client';

import React, { useState } from 'react';
import {
    Save,
    RotateCcw,
    RefreshCw,
    Plus,
    Edit2,
    Check,
    X,
    Trash2,
    DollarSign,
    Percent,
    Briefcase,
    Users,
    TrendingUp,
    Clock
} from 'lucide-react';

interface ServiceCommission {
    id: number;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    commissionType: 'Percentage' | 'Flat';
    commissionValue: number;
    partnerEarns: number;
}

interface TierCommission {
    tier: string;
    description: string;
    multiplier: number;
    exampleBase: number; // Base earnings for calculation example
    benefits: string;
}

export default function CommissionSettingsPage() {
    // Service Data State
    const [services, setServices] = useState<ServiceCommission[]>([
        {
            id: 1,
            name: "GST Registration",
            description: "New GSTIN application & filing",
            category: "Tax Services",
            basePrice: 5000,
            commissionType: "Percentage",
            commissionValue: 20,
            partnerEarns: 1000
        },
        {
            id: 2,
            name: "Income Tax Return Filing",
            description: "Individual ITR 1/2/3",
            category: "Tax Services",
            basePrice: 2500,
            commissionType: "Percentage",
            commissionValue: 15,
            partnerEarns: 375
        },
        {
            id: 3,
            name: "Business Incorporation",
            description: "Pvt Ltd Company Registration",
            category: "Corporate",
            basePrice: 15000,
            commissionType: "Flat",
            commissionValue: 3000,
            partnerEarns: 3000
        },
        {
            id: 4,
            name: "Trademark Registration",
            description: "Brand name & logo protection",
            category: "Corporate",
            basePrice: 8500,
            commissionType: "Percentage",
            commissionValue: 17,
            partnerEarns: 1445
        }
    ]);

    // Tier Data State
    const [tiers, setTiers] = useState<TierCommission[]>([
        {
            tier: "Platinum",
            description: "Top performers, enterprise partners",
            multiplier: 1.5,
            exampleBase: 1000,
            benefits: "Priority support, co-marketing, dedicated manager"
        },
        {
            tier: "Gold",
            description: "High-volume partners",
            multiplier: 1.25,
            exampleBase: 1000,
            benefits: "Quarterly bonuses, training resources"
        },
        {
            tier: "Silver",
            description: "Standard partners",
            multiplier: 1.0,
            exampleBase: 1000,
            benefits: "Standard support"
        }
    ]);

    const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<ServiceCommission>>({});

    const startEditing = (service: ServiceCommission) => {
        setEditingServiceId(service.id);
        setEditForm({ ...service });
    };

    const cancelEditing = () => {
        setEditingServiceId(null);
        setEditForm({});
    };

    const saveService = () => {
        if (editingServiceId && editForm) {
            setServices(services.map(s => {
                if (s.id === editingServiceId) {
                    const updated = { ...s, ...editForm } as ServiceCommission;
                    // Recalculate earnings
                    if (updated.commissionType === 'Percentage') {
                        updated.partnerEarns = (updated.basePrice * updated.commissionValue) / 100;
                    } else {
                        updated.partnerEarns = updated.commissionValue;
                    }
                    return updated;
                }
                return s;
            }));
            setEditingServiceId(null);
            setEditForm({});
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof ServiceCommission) => {
        let value: any = e.target.value;
        if (field === 'basePrice' || field === 'commissionValue') {
            value = parseFloat(value);
        }
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 lg:p-8 transition-colors duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Commission Settings</h1>
                    <p className="text-slate-500 dark:text-gray-400 mt-1">Configure commission rates for partners. Services auto-synced from catalog.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                        <RefreshCw className="w-4 h-4" /> Sync Services
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800 shadow-sm transition-colors">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Services" value={services.length} subtitle="With commission enabled" icon={<Briefcase className="w-5 h-5 text-indigo-600" />} />
                <StatCard title="Partner Tiers" value={tiers.length} subtitle="Platinum, Gold, Silver" icon={<Users className="w-5 h-5 text-emerald-600" />} />
                <StatCard title="Avg. Commission" value="18.5%" subtitle="Industry competitive rate" icon={<TrendingUp className="w-5 h-5 text-amber-600" />} />
                <StatCard title="Last Synced" value="Just now" subtitle="Dec 17, 2025, 8:36 PM" icon={<Clock className="w-5 h-5 text-slate-600" />} />
            </div>

            {/* Service Commission Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden mb-8 transition-colors">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 transition-colors">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide">Service-wise Commission Rates</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Base prices are standard rates; partners earn commission on each sale.</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 text-white text-xs font-medium rounded-md hover:bg-teal-800 transition-colors">
                        <Plus className="w-3 h-3" /> Add Service
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-gray-900/30 border-b border-slate-200 dark:border-gray-700 text-xs uppercase text-slate-500 dark:text-gray-400 font-semibold transition-colors">
                                <th className="px-6 py-3">Service Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Base Price (₹)</th>
                                <th className="px-6 py-3">Commission Type</th>
                                <th className="px-6 py-3">Commission Rate</th>
                                <th className="px-6 py-3">Partner Earns (₹)</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                            {services.map(service => (
                                <tr key={service.id} className="group hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white transition-colors">{service.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-gray-400 transition-colors">{service.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${service.category === 'Tax Services' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                            service.category === 'Corporate' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                                                'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300'
                                            }`}>
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingServiceId === service.id ? (
                                            <input
                                                type="number"
                                                value={editForm.basePrice}
                                                onChange={(e) => handleInputChange(e, 'basePrice')}
                                                className="w-24 px-2 py-1 text-sm border border-slate-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                                            />
                                        ) : (
                                            <span className="text-sm font-medium text-slate-700 dark:text-gray-300 transition-colors">₹ {service.basePrice.toLocaleString()}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400 transition-colors">
                                        {editingServiceId === service.id ? (
                                            <select
                                                value={editForm.commissionType}
                                                onChange={(e) => handleInputChange(e, 'commissionType')}
                                                className="w-28 px-2 py-1 text-sm border border-slate-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                                            >
                                                <option value="Percentage">Percentage</option>
                                                <option value="Flat">Flat Amount</option>
                                            </select>
                                        ) : (
                                            <span>{service.commissionType}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-gray-300 transition-colors">
                                        {editingServiceId === service.id ? (
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="number"
                                                    value={editForm.commissionValue}
                                                    onChange={(e) => handleInputChange(e, 'commissionValue')}
                                                    className="w-20 px-2 py-1 text-sm border border-slate-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                                                />
                                                <span className="text-xs text-slate-500 dark:text-gray-400">{editForm.commissionType === 'Percentage' ? '%' : '₹'}</span>
                                            </div>
                                        ) : (
                                            <span>
                                                {service.commissionValue}{service.commissionType === 'Percentage' ? '%' : ' ₹'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 transition-colors">₹ {service.partnerEarns.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {editingServiceId === service.id ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={saveService} className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 rounded transition-colors" title="Save">
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button onClick={cancelEditing} className="p-1 text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-600 dark:hover:text-gray-300 rounded transition-colors" title="Cancel">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEditing(service)} className="text-xs font-medium text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 transition-colors">
                                                    <Edit2 className="w-3 h-3" /> Update
                                                </button>
                                                <button className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 transition-colors">
                                                    <Trash2 className="w-3 h-3" /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tier Commission Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 transition-colors">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide">Tier-wise Commission Multipliers</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Additional commission multipliers based on partner tier.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-gray-900/30 border-b border-slate-200 dark:border-gray-700 text-xs uppercase text-slate-500 dark:text-gray-400 font-semibold transition-colors">
                                <th className="px-6 py-3">Partner Tier</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Bonus Multiplier</th>
                                <th className="px-6 py-3">Example: GST Reg (₹5000)</th>
                                <th className="px-6 py-3">Benefits</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                            {tiers.map((tier, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${tier.tier === 'Platinum' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                                            tier.tier === 'Gold' ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400' :
                                                'bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-gray-300'
                                            }`}>
                                            {tier.tier}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400 transition-colors">
                                        {tier.description}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white transition-colors">
                                        {tier.multiplier}x
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500 dark:text-gray-500 transition-colors">Base: ₹{tier.exampleBase.toLocaleString()}</p>
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 transition-colors">Total: ₹{(tier.exampleBase * tier.multiplier).toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400 transition-colors">
                                        {tier.benefits}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-medium text-teal-700 dark:text-teal-400 hover:underline flex items-center justify-end gap-1 w-full transition-colors">
                                            <Edit2 className="w-3 h-3" /> Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

function StatCard({ title, value, subtitle, icon }: { title: string, value: string | number, subtitle: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
                <p className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between transition-colors">
                    {title}
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">{value}</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-500 mt-2 transition-colors">{subtitle}</p>
        </div>
    );
}
