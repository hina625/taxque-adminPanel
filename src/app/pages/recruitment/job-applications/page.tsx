"use client";

import React, { useState } from "react";
import {
    Briefcase,
    Users,
    FileText,
    CalendarCheck,
    UserPlus,
    Plus,
    MagnifyingGlass,
    Funnel,
    DownloadSimple,
    DotsThreeVertical,
    CheckCircle,
    Clock,
    MapPin,
    ChartLine,
    Eye,
    Pencil,
    X,
} from "@phosphor-icons/react";

// --- Types ---
interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    salary: string;
    openings: number;
    description: string;
    skills: string;
    status: "active" | "draft" | "closed";
    created: string;
}

interface Application {
    id: number;
    candidateId: number;
    candidateName: string;
    jobId: number;
    jobTitle: string;
    status: "new" | "screening" | "interview" | "rejected" | "hired";
    appliedDate: string;
    resume: string;
}

export default function JobApplicationsPage() {
    // --- Data State ---
    const [jobs, setJobs] = useState<Job[]>([
        { id: 1, title: 'Senior Software Engineer', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-time', experience: 'Senior Level', salary: '$120,000 - $160,000', openings: 2, description: 'We are seeking an experienced Senior Software Engineer...', skills: 'JavaScript, React, Node.js, AWS', status: 'active', created: '2025-12-01T10:00:00Z' },
        { id: 2, title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time', experience: 'Mid Level', salary: '$100,000 - $140,000', openings: 1, description: 'Looking for a Product Manager...', skills: 'Product Strategy, Agile, Analytics', status: 'active', created: '2025-12-03T14:30:00Z' },
    ]);

    const [applications, setApplications] = useState<Application[]>([
        { id: 1, candidateId: 1, candidateName: 'Sarah Johnson', jobId: 1, jobTitle: 'Senior Software Engineer', status: 'interview', appliedDate: '2025-12-10T10:00:00Z', resume: 'resume_sarah.pdf' },
        { id: 2, candidateId: 2, candidateName: 'Michael Chen', jobId: 2, jobTitle: 'Product Manager', status: 'screening', appliedDate: '2025-12-11T14:30:00Z', resume: 'resume_michael.pdf' },
    ]);

    const [filters, setFilters] = useState({ jobs: 'all', applications: 'all' });
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // --- Helpers ---
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    const handleSaveJob = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const jobData: any = Object.fromEntries(formData.entries());

        if (selectedItem) {
            setJobs(jobs.map(j => j.id === selectedItem.id ? { ...j, ...jobData, status: jobData.status } : j));
        } else {
            setJobs([...jobs, { ...jobData, id: Date.now(), created: new Date().toISOString(), openings: Number(jobData.openings) }]);
        }
        closeModal();
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedItem(null);
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Applications</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your job postings and candidate applications</p>
                </div>
                <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-md active:scale-95" onClick={() => { setSelectedItem(null); setActiveModal('jobModal'); }}>
                    <Plus size={20} weight="bold" /> Post New Job
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Jobs Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Job Postings</h2>
                    <div className="grid gap-4">
                        {jobs.map(job => (
                            <div key={job.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{job.department} • {job.location}</p>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${job.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'}`}>
                                        {job.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-between items-center text-sm">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{job.openings} Openings</span>
                                    <span className="text-gray-400 dark:text-gray-500">{formatDate(job.created)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Applications Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Applications</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden text-sm transition-colors">
                        <div className="grid grid-cols-[2fr_2fr_1fr] p-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400">
                            <div>Candidate</div>
                            <div>Job</div>
                            <div>Status</div>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {applications.map(app => (
                                <div key={app.id} className="grid grid-cols-[2fr_2fr_1fr] p-3 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="font-medium text-gray-900 dark:text-white">{app.candidateName}</div>
                                    <div className="text-gray-600 dark:text-gray-400 truncate">{app.jobTitle}</div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-center w-fit ${app.status === 'new' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400'}`}>
                                        {app.status.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {activeModal === 'jobModal' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedItem ? 'Edit Job' : 'Create Job'}</h2>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" onClick={closeModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveJob} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Job Title</label>
                                <input name="title" placeholder="e.g. Senior Software Engineer" required className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Department</label>
                                <input name="department" placeholder="e.g. Engineering" required className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Description</label>
                                <textarea name="description" placeholder="Brief job description..." rows={4} className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                                {selectedItem ? 'Save Changes' : 'Post Job'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

