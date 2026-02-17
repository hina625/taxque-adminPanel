"use client";

import React, { useState, useEffect } from 'react';
import {
    Sliders,
    Package,
    MagnifyingGlass,
    Check,
    ArrowRight,
    ArrowLeft,
    ArrowCounterClockwise,
    CheckCircle,
    Files,
    Star,
    ListBullets,
    ListNumbers,
    CurrencyInr,
    ShieldCheck,
    FileText,
    Trash,
    Plus
} from '@phosphor-icons/react';

// --- Types ---

interface AttributeData {
    attribute: string;
    userHeading: string;
    description: string;
    points: string[];
    notes: string;
}

// --- Constants ---

const ALL_ATTRIBUTES = [
    'GST Returns Explained', 'Benefits of DSC', 'Role & Usage', 'Documents Required',
    'Step Issuance Process', 'GST Filing Checklist', 'Documents Required for GST',
    'fssai License Categories', 'Pre-Application Checklist', 'Benefits of FSSAI License',
    'Turnover Threshold Limits', 'Types of GST Registration', 'Essential GST Returns',
    'Compliance Calendar & Penalties', 'Hassle-Free Filing Process', 'Key GST Returns',
    'Documents Checklist', 'Time Limit for Application', 'Revocation Process',
    'Benefits of IEC Code', 'Legal Framework', 'Compliance Requirements',
    'Understanding Core Concepts', 'Who Can Apply?', 'Certification Process',
    'Key Features of LLP', 'Pre-Registration Checklist', 'New MSME Classification',
    'Key Features of OPC', 'Benefits for Solo Founders', 'Eligibility Criteria',
    'Why Choose', 'Fees & Charges', 'Mandatory MCA Compliances',
    'Regular vs. Composition Scheme', 'Compulsory Registration', 'What can you Trademark',
    'Government Fees', 'Registration Process', 'Benefits of Udyam Registration',
    'Bookkeeping vs Accounting', 'Why Outsource?', 'Duties of Designated Partner',
    'Appointment Process', 'Pvt Ltd Company Compliances', 'Appointment Procedure',
    'Why Increase Capital', 'Guidelines & Rules', 'Common Changes in LLP',
    'Why Modify the Agreement', 'Amendment Process', 'What is a Registered Office',
    'Types of Address Change', 'Compliance Forms', 'Filing Requirements',
    'Corporate Tax Rates', 'Who Needs to File', 'Our EPF Services',
    'Benefits for Employees', 'Who Must File ITR', 'e-Filing Procedure',
    'Benefits of Filing ITR', 'Eligibility for Strike Off', 'Closure Process',
    'Types of Certificates', 'Who is a Director', 'Ways to Remove a Director',
    'Removal by Shareholders', 'Removal by Tribunal (NCLT)', 'Who Needs This License',
    'Strike Off Process', 'Restoration of Company', 'Return Due Dates',
    'Common TDS Rates'
];

const SERVICE_OPTIONS = [
    {
        label: "GST Services", options: [
            { value: "gst-registration", label: "GST Registration" },
            { value: "gst-filing", label: "GST Filing" },
            { value: "gst-returns", label: "GST Returns" }
        ]
    },
    {
        label: "Income Tax", options: [
            { value: "itr-filing", label: "ITR Filing" },
            { value: "tds-filing", label: "TDS Filing" }
        ]
    },
    {
        label: "Business Registration", options: [
            { value: "pvt-ltd", label: "Private Limited Company" },
            { value: "llp", label: "LLP Registration" },
            { value: "opc", label: "One Person Company" }
        ]
    },
    {
        label: "Licenses", options: [
            { value: "fssai", label: "FSSAI License" },
            { value: "iec-code", label: "IEC Code" },
            { value: "trademark", label: "Trademark Registration" }
        ]
    },
    {
        label: "Compliance", options: [
            { value: "dsc", label: "Digital Signature" },
            { value: "msme", label: "MSME/Udyam Registration" },
            { value: "epf", label: "EPF Registration" }
        ]
    }
];

// --- Helper Functions ---

const getAttributeIcon = (attrName: string) => {
    const name = attrName.toLowerCase();
    if (name.includes('document') || name.includes('checklist')) return Files;
    if (name.includes('benefit') || name.includes('feature')) return Star;
    if (name.includes('type') || name.includes('categor')) return ListBullets;
    if (name.includes('process') || name.includes('procedure') || name.includes('step')) return ListNumbers;
    if (name.includes('eligibility') || name.includes('who')) return CheckCircle;
    if (name.includes('fee') || name.includes('charge') || name.includes('rate')) return CurrencyInr;
    if (name.includes('compliance') || name.includes('requirement')) return ShieldCheck;
    return FileText;
};

// --- Component ---

export default function ServiceAttributesPage() {
    // State
    const [currentService, setCurrentService] = useState<string>('');
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [viewState, setViewState] = useState<'selection' | 'form'>('selection');
    const [formData, setFormData] = useState<Record<string, AttributeData>>({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Filtered Attributes
    const filteredAttributes = ALL_ATTRIBUTES.filter(attr =>
        attr.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handlers
    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentService(e.target.value);
        if (!e.target.value) {
            setSelectedAttributes([]);
            setViewState('selection');
        }
    };

    const toggleAttribute = (attr: string) => {
        setSelectedAttributes(prev =>
            prev.includes(attr)
                ? prev.filter(a => a !== attr)
                : [...prev, attr]
        );
    };

    const handleProceed = () => {
        if (selectedAttributes.length === 0) return;

        // Initialize form data for selected attributes if not exists
        const newFormData = { ...formData };
        selectedAttributes.forEach(attr => {
            if (!newFormData[attr]) {
                newFormData[attr] = {
                    attribute: attr,
                    userHeading: attr,
                    description: '',
                    points: [''], // Start with one empty point
                    notes: ''
                };
            }
        });
        setFormData(newFormData);
        setViewState('form');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setViewState('selection');
    };

    const handleFormChange = (attr: string, field: keyof AttributeData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [attr]: { ...prev[attr], [field]: value }
        }));
    };

    const handlePointChange = (attr: string, index: number, value: string) => {
        const points = [...formData[attr].points];
        points[index] = value;
        handleFormChange(attr, 'points', points);
    };

    const addPoint = (attr: string) => {
        const points = [...formData[attr].points, ''];
        handleFormChange(attr, 'points', points);
    };

    const removePoint = (attr: string, index: number) => {
        const points = [...formData[attr].points];
        if (points.length > 1) {
            points.splice(index, 1);
            handleFormChange(attr, 'points', points);
        }
    };

    const handleReset = () => {
        if (confirm('⚠️ Reset all fields? This will clear all unsaved changes.')) {
            // Reset form data for selected items
            const resetData = { ...formData };
            selectedAttributes.forEach(attr => {
                resetData[attr] = {
                    attribute: attr,
                    userHeading: attr,
                    description: '',
                    points: [''],
                    notes: ''
                };
            });
            setFormData(resetData);
        }
    };

    const handleUpdate = () => {
        // Validation
        let hasError = false;
        selectedAttributes.forEach(attr => {
            if (!formData[attr].userHeading.trim()) {
                alert(`⚠️ Please enter a heading for "${attr}"`);
                hasError = true;
            }
            if (formData[attr].points.filter(p => p.trim()).length === 0) {
                alert(`⚠️ Please add at least one point for "${attr}"`);
                hasError = true;
            }
        });

        if (hasError) return;

        // "Save" (Mock)
        console.log("Saving Attributes:", formData);
        const serviceName = SERVICE_OPTIONS.flatMap(g => g.options).find(o => o.value === currentService)?.label;

        setToastMessage(`✅ Successfully updated ${selectedAttributes.length} attribute(s) for ${serviceName}!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        // Reset and go back after delay
        setTimeout(() => {
            setViewState('selection');
            setSelectedAttributes([]);
            setFormData({});
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans p-4 md:p-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                        <Sliders size={32} weight="bold" />
                        Attribute Management
                    </h1>
                    <p className="text-slate-500 text-sm">Select service and choose attributes to update content displayed to users</p>
                </div>

                {/* Service Selector */}
                <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl p-8 mb-8 shadow-md text-white">
                    <label className="text-xs font-bold uppercase tracking-wider mb-3 block opacity-90">
                        <div className="flex items-center gap-2">
                            <Package size={16} weight="bold" />
                            Select Service
                        </div>
                    </label>
                    <select
                        value={currentService}
                        onChange={handleServiceChange}
                        className="w-full p-4 border-2 border-white/30 rounded-xl text-lg font-semibold bg-white/15 text-white focus:outline-none focus:bg-white/25 focus:border-white transition-all cursor-pointer placeholder-white/50"
                    >
                        <option value="" className="text-slate-900">-- Choose Service --</option>
                        {SERVICE_OPTIONS.map((group, idx) => (
                            <optgroup key={idx} label={group.label} className="text-slate-900">
                                {group.options.map(opt => (
                                    <option key={opt.value} value={opt.value} className="text-slate-900">{opt.label}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Attributes Section */}
                {currentService && viewState === 'selection' && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b-2 border-slate-100 gap-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-slate-900">Select Attributes</h2>
                                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {filteredAttributes.length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {selectedAttributes.length > 0 && (
                                    <>
                                        <span className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold animate-pulse">
                                            {selectedAttributes.length} Selected
                                        </span>
                                        <button
                                            onClick={handleProceed}
                                            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5"
                                        >
                                            <ArrowRight size={18} weight="bold" />
                                            Update Selected
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative mb-6">
                            <MagnifyingGlass size={20} weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search attributes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            />
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredAttributes.map(attr => {
                                const isSelected = selectedAttributes.includes(attr);
                                return (
                                    <div
                                        key={attr}
                                        onClick={() => toggleAttribute(attr)}
                                        className={`
                                            p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3
                                            ${isSelected
                                                ? 'bg-[#ede9fe] border-indigo-600 shadow-md transform -translate-y-px'
                                                : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-indigo-400'
                                            }
                                        `}
                                    >
                                        <div className={`
                                            w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors
                                            ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'}
                                        `}>
                                            {isSelected && <Check size={14} weight="bold" />}
                                        </div>
                                        <span className="font-semibold text-sm text-slate-900">{attr}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Form Section */}
                {currentService && viewState === 'form' && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm animate-fade-in">

                        {/* Form Header */}
                        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-slate-100">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">Update Attributes</h2>
                                <p className="text-slate-500 text-sm">Configure content displayed to users</p>
                            </div>
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-700 rounded-xl font-semibold transition-all"
                            >
                                <ArrowLeft size={18} weight="bold" />
                                Back
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="space-y-8">
                            {selectedAttributes.map(attr => {
                                const data = formData[attr];
                                const Icon = getAttributeIcon(attr);
                                if (!data) return null;

                                return (
                                    <div key={attr} className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-200">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center text-white shadow-sm">
                                                <Icon size={20} weight="bold" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900">{attr}</h3>
                                        </div>

                                        <div className="grid gap-6">
                                            {/* User Heading */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    User-Facing Heading <span className="text-red-500">*</span>
                                                    <span className="text-slate-400 font-normal ml-2 text-xs">(Displayed to users on website)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.userHeading}
                                                    onChange={(e) => handleFormChange(attr, 'userHeading', e.target.value)}
                                                    placeholder="Enter heading"
                                                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">Description/Introduction</label>
                                                <textarea
                                                    value={data.description}
                                                    onChange={(e) => handleFormChange(attr, 'description', e.target.value)}
                                                    placeholder="Brief introduction or overview..."
                                                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm min-h-[100px] focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all resize-y"
                                                />
                                            </div>

                                            {/* Points */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Content Points <span className="text-red-500">*</span>
                                                </label>
                                                <div className="border-2 border-slate-200 rounded-xl p-4 bg-white space-y-3">
                                                    {data.points.map((point, idx) => (
                                                        <div key={idx} className="flex gap-3 items-center">
                                                            <div className="w-7 h-7 bg-indigo-600 text-white rounded-md flex items-center justify-center font-bold text-xs flex-shrink-0">
                                                                {idx + 1}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={point}
                                                                onChange={(e) => handlePointChange(attr, idx, e.target.value)}
                                                                placeholder="Enter point"
                                                                className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-indigo-600"
                                                            />
                                                            <button
                                                                onClick={() => removePoint(attr, idx)}
                                                                disabled={data.points.length <= 1}
                                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${data.points.length <= 1 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white'}`}
                                                            >
                                                                <Trash size={16} weight="bold" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => addPoint(attr)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-all mt-2"
                                                    >
                                                        <Plus size={16} weight="bold" />
                                                        Add Point
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">Additional Notes</label>
                                                <textarea
                                                    value={data.notes}
                                                    onChange={(e) => handleFormChange(attr, 'notes', e.target.value)}
                                                    placeholder="Any additional information or notes..."
                                                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm min-h-[80px] focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all resize-y"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 mt-8 pt-8 border-t-2 border-slate-100">
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-700 rounded-xl font-bold transition-all"
                            >
                                <ArrowCounterClockwise size={20} weight="bold" />
                                Reset
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1"
                            >
                                <CheckCircle size={20} weight="bold" />
                                Update All Attributes
                            </button>
                        </div>
                    </div>
                )}
            </div>

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
