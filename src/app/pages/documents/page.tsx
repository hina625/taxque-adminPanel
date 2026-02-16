'use client';

import React, { useState } from 'react';

type ViewMode = 'dashboard' | 'clients' | 'analytics' | 'settings';

export default function DocumentsPage() {
    const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const toggleUploadModal = () => setIsUploadModalOpen(!isUploadModalOpen);

    const renderDashboard = () => (
        <div className="space-y-6 animate-fade-in">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Storage', value: '45.2 GB', sub: 'Used of 1TB', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', color: 'blue' },
                    { title: 'Total Files', value: '12,450', sub: '+125 this week', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'emerald' },
                    { title: 'Clients', value: '845', sub: 'Active Folders', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'purple' },
                    { title: 'Pending Requests', value: '12', sub: 'Requires Action', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'amber' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path>
                                </svg>
                            </div>
                        </div>
                        <div className={`flex items-center gap-2 text-${stat.color}-600 bg-${stat.color}-50 w-fit px-3 py-1 rounded-lg`}>
                            <span className="text-xs font-bold">{stat.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent & Pinned */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Recent Uploads
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'TR-GST-July2025.pdf', size: '2.4 MB', type: 'PDF', user: 'Amit Mehta', time: '2 mins ago', color: 'red' },
                            { name: 'Financial_Report_Q3.xlsx', size: '1.8 MB', type: 'Excel', user: 'Priya Kapoor', time: '1 hour ago', color: 'emerald' },
                            { name: 'Client_Agreement_V2.docx', size: '856 KB', type: 'Word', user: 'Rahul Sharma', time: '3 hours ago', color: 'blue' },
                            { name: 'Invoice_#8842.pdf', size: '156 KB', type: 'PDF', user: 'System', time: '5 hours ago', color: 'red' },
                        ].map((file, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition cursor-pointer group">
                                <div className={`w-12 h-12 rounded-xl bg-${file.color}-100 flex items-center justify-center text-${file.color}-600 font-black text-lg shadow-sm`}>
                                    {file.type === 'PDF' && 'PDF'}
                                    {file.type === 'Excel' && 'XLS'}
                                    {file.type === 'Word' && 'DOC'}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-800 group-hover:text-primary transition-colors">{file.name}</p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Uploaded by <span className="font-bold text-slate-700">{file.user}</span> • {file.size}</p>
                                </div>
                                <span className="text-xs font-bold text-slate-400">{file.time}</span>
                                <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition opacity-0 group-hover:opacity-100">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                        Quick Access
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Tax Returns', 'Legal Docs', 'Invoices', 'Client KYC'].map((folder, i) => (
                            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition cursor-pointer text-center group">
                                <svg className="w-10 h-10 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2.165 19.551c.086 0 .172.001.258.006l.035.001h15.75c.086 0 .172-.001.259-.006l.035-.001c1.944-.066 3.498-1.63 3.498-3.551v-6c0-1.921-1.554-3.486-3.498-3.551l-.035-.001-.259-.006H7.835c-.086 0-.172.001-.258.006l-.035.001c-1.944.066-3.498 1.63-3.498 3.551v6c0 1.921 1.554 3.486 3.498 3.551l.035.001.258.006h-5.67c-.086 0-.172.001-.258.006l-.035.001c-1.944.066-3.498 1.63-3.498 3.551v.15c0 1.967 1.626 3.55 3.593 3.55h15.75c1.967 0 3.593-1.583 3.593-3.55v-.15c0-1.921-1.554-3.486-3.498-3.551l-.035-.001-.258-.006H2.458l-.035.001-.258.006zM7.835 8.5h10.33c.691.024 1.25.591 1.25 1.25 0 .659-.559 1.226-1.25 1.25H7.835c-.691-.024-1.25-.591-1.25-1.25 0-.659.559-1.226 1.25-1.25z"></path>
                                </svg>
                                <p className="font-bold text-sm text-slate-700">{folder}</p>
                                <p className="text-xs text-slate-400 font-semibold mt-1">12 files</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={toggleUploadModal} className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-teal-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Upload Document
                    </button>
                </div>
            </div>
        </div>
    );

    const renderClients = () => (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
            {/* Toolbar */}
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
                <h3 className="text-xl font-black text-slate-800">Client Directory</h3>
                <div className="flex gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                            <th className="p-4">Client Name</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Documents</th>
                            <th className="p-4">Last Activity</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((client, i) => (
                            <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center font-bold">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">Client Name {i + 1}</p>
                                            <p className="text-xs text-slate-500 font-semibold">ID: CL-{202400 + i}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm">
                                        <p className="flex items-center gap-2 text-slate-700">
                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            client{i + 1}@example.com
                                        </p>
                                        <p className="flex items-center gap-2 text-slate-700 mt-1">
                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                            +91 98765 4321{i}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">12 Files</span>
                                </td>
                                <td className="p-4 text-sm text-slate-600 font-medium">
                                    2 days ago
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-primary font-bold text-sm hover:underline">View Folder</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="w-full p-6 font-sans text-gray-900 bg-white min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-slate-800">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
                    <p className="text-slate-500 font-medium mt-1">Securely manage and organize your documents.</p>
                </div>

                {/* View Switcher pills */}
                <div className="bg-slate-100 p-1 rounded-xl flex">
                    {(['dashboard', 'clients', 'analytics', 'settings'] as const).map((view) => (
                        <button
                            key={view}
                            onClick={() => setCurrentView(view)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentView === view ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'clients' && renderClients()}
            {currentView === 'analytics' && <div className="text-center p-12 text-slate-400 font-bold text-xl">Analytics Module Coming Soon</div>}
            {currentView === 'settings' && <div className="text-center p-12 text-slate-400 font-bold text-xl">Settings Module Coming Soon</div>}

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-black text-slate-800">Upload Document</h3>
                            <button onClick={toggleUploadModal} className="text-slate-400 hover:text-red-500 transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition cursor-pointer">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="font-bold text-slate-700">Click to upload or drag and drop</p>
                                <p className="text-xs text-slate-500 mt-1">PDF, DOCX, XLSX (Max 10MB)</p>
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Select Client (Optional)</label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-semibold text-slate-600">
                                    <option>Select a client...</option>
                                    <option>Client A</option>
                                    <option>Client B</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                            <button onClick={toggleUploadModal} className="px-6 py-2.5 bg-white border border-gray-300 text-slate-700 font-bold rounded-xl hover:bg-gray-50 transition">Cancel</button>
                            <button onClick={toggleUploadModal} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition">Upload</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
