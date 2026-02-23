'use client';

import React, { useState } from 'react';
import {
    Building2,
    MapPin,
    Briefcase,
    FileText,
    Save,
    Upload,
    CheckCircle,
    X
} from 'lucide-react';

export default function CompanyInfoPage() {
    const [formData, setFormData] = useState({
        legalName: '',
        brandName: '',
        email: '',
        phone: '',
        website: '',
        regAddress1: '',
        regAddress2: '',
        regCity: '',
        regState: 'Maharashtra',
        regZip: '',
        sameAsRegistered: false,
        corpAddress1: '',
        corpAddress2: '',
        corpCity: '',
        corpState: 'Maharashtra',
        corpZip: '',
        gstin: '',
        pan: '',
        cin: '',
        msme: ''
    });

    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setFormData(prev => {
            const newData = { ...prev, sameAsRegistered: checked };
            if (checked) {
                newData.corpAddress1 = prev.regAddress1;
                newData.corpAddress2 = prev.regAddress2;
                newData.corpCity = prev.regCity;
                newData.corpState = prev.regState;
                newData.corpZip = prev.regZip;
            } else {
                newData.corpAddress1 = '';
                newData.corpAddress2 = '';
                newData.corpCity = '';
                newData.corpZip = '';
            }
            return newData;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            setSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 lg:p-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Company Settings</h1>
                        <p className="text-slate-500 dark:text-gray-400 mt-1">Manage business details for invoices and orders</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-slate-300 dark:border-gray-700 rounded-lg text-slate-700 dark:text-gray-300 font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-all ${saveSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {saving ? (
                                <>Saving...</>
                            ) : saveSuccess ? (
                                <><CheckCircle className="w-4 h-4" /> Saved Successfully!</>
                            ) : (
                                <><Save className="w-4 h-4" /> Save Changes</>
                            )}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 flex items-center gap-2 transition-colors">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold text-slate-800 dark:text-white">General Information</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Legal Entity Name *</label>
                                <input
                                    type="text"
                                    name="legalName"
                                    value={formData.legalName}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Acme Solutions Pvt Ltd"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Brand Name (For Display)</label>
                                <input
                                    type="text"
                                    name="brandName"
                                    value={formData.brandName}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Acme Corp"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Primary Email (Billing)</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="accounts@acme.com"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    placeholder="https://www.acme.com"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Logo Upload</label>
                                <div className="border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-indigo-400 transition-all group">
                                    <Upload className="w-8 h-8 text-slate-400 dark:text-gray-500 mx-auto mb-2 group-hover:text-indigo-500 transition-colors" />
                                    <p className="text-xs text-slate-500 dark:text-gray-400 group-hover:text-indigo-600">Click to upload company logo</p>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registered Office Address */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 flex items-center gap-2 transition-colors">
                            <MapPin className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold text-slate-800 dark:text-white">Registered Office Address</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Address Line 1 *</label>
                                <input
                                    type="text"
                                    name="regAddress1"
                                    value={formData.regAddress1}
                                    onChange={handleInputChange}
                                    placeholder="Building, Street, Area"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Address Line 2</label>
                                <input
                                    type="text"
                                    name="regAddress2"
                                    value={formData.regAddress2}
                                    onChange={handleInputChange}
                                    placeholder="Landmark, etc."
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">City</label>
                                <input
                                    type="text"
                                    name="regCity"
                                    value={formData.regCity}
                                    onChange={handleInputChange}
                                    placeholder="Mumbai"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">State</label>
                                <select
                                    name="regState"
                                    value={formData.regState}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                >
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Karnataka">Karnataka</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Pincode</label>
                                <input
                                    type="text"
                                    name="regZip"
                                    value={formData.regZip}
                                    onChange={handleInputChange}
                                    placeholder="400001"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Country</label>
                                <input type="text" value="India" readOnly className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-400 cursor-not-allowed transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Corporate Office Address */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between transition-colors">
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-600" />
                                <h3 className="font-semibold text-slate-800 dark:text-white">Corporate / Branch Office</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="sameAddress"
                                    checked={formData.sameAsRegistered}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-indigo-600 dark:text-indigo-400 rounded border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-indigo-500"
                                />
                                <label htmlFor="sameAddress" className="text-sm font-medium text-slate-700 dark:text-gray-300 cursor-pointer transition-colors">Same as Registered</label>
                            </div>
                        </div>
                        <div className={`p-6 grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity ${formData.sameAsRegistered ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Address Line 1</label>
                                <input
                                    type="text"
                                    name="corpAddress1"
                                    value={formData.corpAddress1}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Address Line 2</label>
                                <input
                                    type="text"
                                    name="corpAddress2"
                                    value={formData.corpAddress2}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">City</label>
                                <input
                                    type="text"
                                    name="corpCity"
                                    value={formData.corpCity}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">State</label>
                                <select
                                    name="corpState"
                                    value={formData.corpState}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                >
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Karnataka">Karnataka</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">Pincode</label>
                                <input
                                    type="text"
                                    name="corpZip"
                                    value={formData.corpZip}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tax & Legal Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden mb-10 transition-colors">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 flex items-center gap-2 transition-colors">
                            <FileText className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold text-slate-800 dark:text-white">Tax & Legal Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">GSTIN Number</label>
                                <input
                                    type="text"
                                    name="gstin"
                                    value={formData.gstin}
                                    onChange={handleInputChange}
                                    placeholder="27ABCDE1234F1Z5"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">PAN Number</label>
                                <input
                                    type="text"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleInputChange}
                                    placeholder="ABCDE1234F"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">CIN (Corporate Identity Number)</label>
                                <input
                                    type="text"
                                    name="cin"
                                    value={formData.cin}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-300">MSME / Udyam No. (Optional)</label>
                                <input
                                    type="text"
                                    name="msme"
                                    value={formData.msme}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
