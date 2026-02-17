"use client";

import React, { useState, useEffect } from 'react';
import {
    Tag,
    CheckCircle,
    PlusCircle,
    Plus,
    Stack,
    Eye,
    FolderOpen,
    Trash,
    X
} from '@phosphor-icons/react';

// --- Services Data ---

const SERVICES_DATA = [
    { id: 1, name: 'GST Registration', category: 'GST', collections: [] as string[] },
    { id: 2, name: 'GST Filing - Monthly', category: 'GST', collections: [] as string[] },
    { id: 3, name: 'GST Filing - Quarterly', category: 'GST', collections: [] as string[] },
    { id: 4, name: 'GST Annual Return', category: 'GST', collections: [] as string[] },
    { id: 5, name: 'ITR Filing - Salaried', category: 'Income Tax', collections: [] as string[] },
    { id: 6, name: 'ITR Filing - Business', category: 'Income Tax', collections: [] as string[] },
    { id: 7, name: 'TDS Return Filing', category: 'Income Tax', collections: [] as string[] },
    { id: 8, name: 'Private Limited Company', category: 'Registration', collections: [] as string[] },
    { id: 9, name: 'LLP Registration', category: 'Registration', collections: [] as string[] },
    { id: 10, name: 'One Person Company', category: 'Registration', collections: [] as string[] },
    { id: 11, name: 'Sole Proprietorship', category: 'Registration', collections: [] as string[] },
    { id: 12, name: 'FSSAI License', category: 'License', collections: [] as string[] },
    { id: 13, name: 'Trademark Registration', category: 'License', collections: [] as string[] },
    { id: 14, name: 'IEC Code', category: 'License', collections: [] as string[] },
    { id: 15, name: 'Digital Signature', category: 'Compliance', collections: [] as string[] },
    { id: 16, name: 'MSME/Udyam Registration', category: 'Compliance', collections: [] as string[] },
    { id: 17, name: 'EPF Registration', category: 'Compliance', collections: [] as string[] },
    { id: 18, name: 'Accounting & Bookkeeping', category: 'Other', collections: [] as string[] },
    { id: 19, name: 'Audit Services', category: 'Other', collections: [] as string[] },
    { id: 20, name: 'Tax Planning', category: 'Other', collections: [] as string[] }
];

const COLLECTIONS = [
    { id: 'special-offer', name: 'Special Offer', icon: '🏷️', color: 'bg-amber-100' },
    { id: 'sale', name: 'Sale', icon: '💰', color: 'bg-red-100' },
    { id: 'popular', name: 'Popular', icon: '🔥', color: 'bg-blue-100' },
    { id: 'new', name: 'New', icon: '✨', color: 'bg-emerald-100' },
    { id: 'featured', name: 'Featured', icon: '⭐', color: 'bg-purple-100' },
    { id: 'trending', name: 'Trending', icon: '📈', color: 'bg-pink-100' }
];

export default function ServiceCollectionsPage() {
    const [services, setServices] = useState(SERVICES_DATA);
    const [selectedCollection, setSelectedCollection] = useState('special-offer');
    const [selectedService, setSelectedService] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingCollection, setViewingCollection] = useState<typeof COLLECTIONS[0] | null>(null);

    const getCollectionCount = (collectionId: string) => {
        return services.filter(s => s.collections.includes(collectionId)).length;
    };

    const handleAddService = () => {
        if (!selectedService) {
            alert('⚠️ Please select a service');
            return;
        }

        const serviceId = parseInt(selectedService);
        const serviceIndex = services.findIndex(s => s.id === serviceId);

        if (serviceIndex === -1) return;

        const updatedServices = [...services];
        const service = updatedServices[serviceIndex];

        if (service.collections.includes(selectedCollection)) {
            alert('⚠️ This service is already in this collection');
            return;
        }

        service.collections.push(selectedCollection);
        setServices(updatedServices);
        setSelectedService('');

        const collectionName = COLLECTIONS.find(c => c.id === selectedCollection)?.name;
        showNotification(`✅ Added "${service.name}" to ${collectionName}!`);
    };

    const handleRemoveService = (serviceId: number, collectionId: string) => {
        const updatedServices = services.map(service => {
            if (service.id === serviceId) {
                return {
                    ...service,
                    collections: service.collections.filter(c => c !== collectionId)
                };
            }
            return service;
        });
        setServices(updatedServices);
    };

    const showNotification = (msg: string) => {
        setAlertMessage(msg);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const openModal = (collectionId: string) => {
        const collection = COLLECTIONS.find(c => c.id === collectionId);
        if (collection) {
            setViewingCollection(collection);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
                        <Tag weight="bold" />
                        Service Collections Management
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">Add special labels to services and manage collections</p>
                </div>

                {/* Alert */}
                {showAlert && (
                    <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 rounded-xl p-4 mb-6 flex items-center gap-3 font-semibold animate-fade-in-down">
                        <CheckCircle weight="bold" size={20} />
                        {alertMessage}
                    </div>
                )}

                {/* Add Section */}
                <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
                    <div className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <PlusCircle weight="bold" />
                        Add Service to Collection
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-sm text-slate-600">Select Collection</label>
                            <select
                                value={selectedCollection}
                                onChange={(e) => setSelectedCollection(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            >
                                {COLLECTIONS.map(c => (
                                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-sm text-slate-600">Select Service</label>
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            >
                                <option value="">-- Choose Service --</option>
                                {['GST', 'Income Tax', 'Registration', 'License', 'Compliance', 'Other'].map(cat => (
                                    <optgroup key={cat} label={`${cat} Services`}>
                                        {services.filter(s => s.category === cat).map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleAddService}
                            className="px-7 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transform active:scale-95 transition-all flex items-center gap-2 h-[52px]"
                        >
                            <Plus weight="bold" /> Add
                        </button>
                    </div>
                </div>

                {/* Collections Table */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Stack weight="bold" />
                        All Collections
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b-2 border-slate-200">
                                    <th className="px-6 py-4 text-left font-bold text-xs text-slate-500 uppercase tracking-wider">Collection</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs text-slate-500 uppercase tracking-wider">Services Count</th>
                                    <th className="px-6 py-4 text-left font-bold text-xs text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {COLLECTIONS.map(collection => (
                                    <tr
                                        key={collection.id}
                                        onClick={() => openModal(collection.id)}
                                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${collection.color}`}>
                                                    {collection.icon}
                                                </div>
                                                <span className="font-bold text-base text-slate-900">{collection.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-4 py-1.5 rounded-full font-bold text-sm bg-slate-100 text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                {getCollectionCount(collection.id)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); openModal(collection.id); }}
                                                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition-colors flex items-center gap-2"
                                            >
                                                <Eye weight="bold" /> View Services
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal */}
            {isModalOpen && viewingCollection && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-scale-up">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${viewingCollection.color}`}>
                                    {viewingCollection.icon}
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{viewingCollection.name} Services</h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                                <X weight="bold" size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
                            {services.filter(s => s.collections.includes(viewingCollection.id)).length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <FolderOpen weight="fill" size={64} className="mx-auto mb-4 opacity-50" />
                                    <p className="font-medium">No services in this collection yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {services.filter(s => s.collections.includes(viewingCollection.id)).map(service => (
                                        <div key={service.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:bg-white hover:shadow-sm transition-all">
                                            <div>
                                                <div className="font-bold text-slate-900">{service.name}</div>
                                                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-0.5">{service.category}</div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveService(service.id, viewingCollection.id)}
                                                className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-bold text-xs hover:bg-red-200 transition-colors flex items-center gap-1.5 opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash weight="bold" /> Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-5 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
