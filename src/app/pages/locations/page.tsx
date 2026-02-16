'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';

// Initial Data
const INITIAL_LOCATIONS = [
    { id: 1, state: "Jammu and Kashmir", code: "01", active: true },
    { id: 2, state: "Himachal Pradesh", code: "02", active: true },
    { id: 3, state: "Punjab", code: "03", active: false },
    { id: 4, state: "Delhi", code: "07", active: true },
    { id: 5, state: "Haryana", code: "06", active: true },
    { id: 6, state: "Uttar Pradesh", code: "09", active: true },
    { id: 7, state: "Maharashtra", code: "27", active: true },
    { id: 8, state: "Karnataka", code: "29", active: false },
];

const LocationsPage = () => {
    const [locations, setLocations] = useState(INITIAL_LOCATIONS);
    const [newLocation, setNewLocation] = useState({ state: '', code: '', active: 'true' });
    const [searchQuery, setSearchQuery] = useState('');

    // Handlers
    const handleAddLocation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLocation.state || !newLocation.code) {
            alert("Please fill State Name and Code");
            return;
        }

        const newItem = {
            id: locations.length + 1,
            state: newLocation.state,
            code: newLocation.code,
            active: newLocation.active === 'true'
        };

        setLocations([...locations, newItem]);
        setNewLocation({ state: '', code: '', active: 'true' });
    };

    const handleDelete = (id: number) => {
        if (confirm("Delete this state?")) {
            setLocations(locations.filter(loc => loc.id !== id));
        }
    };

    const toggleStatus = (id: number) => {
        setLocations(locations.map(loc =>
            loc.id === id ? { ...loc, active: !loc.active } : loc
        ));
    };

    // Filter
    const filteredLocations = locations.filter(loc =>
        loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.code.includes(searchQuery)
    );

    return (
        <div className="p-6 min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* PAGE HEADER */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3 text-slate-900 mb-1">
                        <MapPin className="text-indigo-600 w-8 h-8" />
                        Location Management
                    </h1>
                    <p className="text-slate-500 text-sm">Manage Indian states and GST codes for tax compliance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: LIST */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h2 className="font-bold text-lg text-slate-800">State List</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search state or code..."
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 w-64"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-gray-200">
                                        <th className="p-4 w-16 text-center">S.N.</th>
                                        <th className="p-4">State Name</th>
                                        <th className="p-4 w-32 text-center">Code (GST)</th>
                                        <th className="p-4 w-32 text-center">Status</th>
                                        <th className="p-4 w-24 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredLocations.length > 0 ? (
                                        filteredLocations.map((loc, index) => (
                                            <tr key={loc.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-4 text-center font-medium text-slate-400">{index + 1}</td>
                                                <td className="p-4 font-semibold text-slate-800">{loc.state}</td>
                                                <td className="p-4 text-center font-mono text-slate-600 bg-slate-50/50 rounded-lg m-2">{loc.code}</td>
                                                <td className="p-4 text-center">
                                                    <button
                                                        onClick={() => toggleStatus(loc.id)}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loc.active ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                                    >
                                                        <span className={`${loc.active ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                    </button>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <button
                                                        onClick={() => handleDelete(loc.id)}
                                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Delete Location"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-400">
                                                No states found matching "{searchQuery}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: ADD FORM */}
                <div>
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-indigo-600" />
                            Add New Location
                        </h3>

                        <form onSubmit={handleAddLocation} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">State Name</label>
                                <input
                                    type="text"
                                    value={newLocation.state}
                                    onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
                                    placeholder="e.g. Maharashtra"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">State Code (GST)</label>
                                <input
                                    type="number"
                                    value={newLocation.code}
                                    onChange={(e) => setNewLocation({ ...newLocation, code: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
                                    placeholder="e.g. 27"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
                                <div className="relative">
                                    <select
                                        value={newLocation.active}
                                        onChange={(e) => setNewLocation({ ...newLocation, active: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                            >
                                <Plus className="w-5 h-5" />
                                Add Location
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="bg-indigo-50 rounded-xl p-4 flex gap-3 text-indigo-800 text-xs font-medium leading-relaxed">
                                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="font-bold">i</span>
                                </div>
                                GST state codes are standard 2-digit codes used for tax identification. Ensure accuracy when adding new states.
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default LocationsPage;
