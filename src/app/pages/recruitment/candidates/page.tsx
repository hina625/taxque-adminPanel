"use client";

import React, { useState } from "react";
import { Users, MagnifyingGlass, Funnel, Eye, X } from "@phosphor-icons/react";

interface Candidate {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    experience: string;
    skills: string;
    location: string;
    created: string;
}

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState<Candidate[]>([
        { id: 1, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@email.com', phone: '+1-555-0101', experience: '5 years', skills: 'JS, React', location: 'SF, CA', created: '2025-12-10T10:00:00Z' },
        { id: 2, firstName: 'Michael', lastName: 'Chen', email: 'm.chen@email.com', phone: '+1-555-0102', experience: '3 years', skills: 'Product Mgmt', location: 'NY, NY', created: '2025-12-11T14:30:00Z' },
    ]);

    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    return (
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidates</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage candidate database and profiles</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_80px] p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400 text-sm">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Experience</div>
                    <div>Actions</div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {candidates.map(c => (
                        <div key={c.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_80px] p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm transition-colors">
                            <div className="font-medium text-gray-900 dark:text-white">{c.firstName} {c.lastName}</div>
                            <div className="text-gray-600 dark:text-gray-300">{c.email}</div>
                            <div className="text-gray-600 dark:text-gray-300">{c.phone}</div>
                            <div className="text-gray-600 dark:text-gray-300">{c.experience}</div>
                            <button className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded transition-colors" onClick={() => setSelectedCandidate(c)}><Eye size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCandidate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 relative border border-gray-200 dark:border-gray-700 transition-colors">
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" onClick={() => setSelectedCandidate(null)}><X size={24} /></button>
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{selectedCandidate.firstName} {selectedCandidate.lastName}</h2>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <p><strong className="text-gray-900 dark:text-white">Email:</strong> {selectedCandidate.email}</p>
                            <p><strong className="text-gray-900 dark:text-white">Phone:</strong> {selectedCandidate.phone}</p>
                            <p><strong className="text-gray-900 dark:text-white">Experience:</strong> {selectedCandidate.experience}</p>
                            <p><strong className="text-gray-900 dark:text-white">Skills:</strong> {selectedCandidate.skills}</p>
                            <p><strong className="text-gray-900 dark:text-white">Location:</strong> {selectedCandidate.location}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

