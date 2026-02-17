"use client";

import React, { useState, useEffect } from "react";
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
    Trash,
    X,
    Buildings,
    FloppyDisk,
    WarningCircle,
    VideoCamera,
    Phone,
    User,
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

interface Interview {
    id: number;
    candidateId: number;
    candidateName: string;
    jobId: number;
    jobTitle: string;
    date: string;
    time: string;
    type: string;
    interviewer: string;
    location: string;
    status: "scheduled" | "completed" | "cancelled";
    notes: string;
}

interface Onboarding {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    startDate: string;
    manager: string;
    progress: number;
    status: "pending" | "in-progress" | "completed";
}

interface Question {
    id: number;
    question: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    department: string;
    notes: string;
}

interface Activity {
    id: number;
    message: string;
    type: string;
    time: string;
}

interface CareerPageSettings {
    companyName: string;
    tagline: string;
    about: string;
    primaryColor: string;
    secondaryColor: string;
    email: string;
}

// --- Icons Mapping (optional helper if needed, but direct usage is fine) ---

export default function RecruitmentPage() {
    const [currentView, setCurrentView] = useState("dashboard");

    // --- Data State ---
    const [jobs, setJobs] = useState<Job[]>([
        { id: 1, title: 'Senior Software Engineer', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-time', experience: 'Senior Level', salary: '$120,000 - $160,000', openings: 2, description: 'We are seeking an experienced Senior Software Engineer...', skills: 'JavaScript, React, Node.js, AWS', status: 'active', created: '2025-12-01T10:00:00Z' },
        { id: 2, title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time', experience: 'Mid Level', salary: '$100,000 - $140,000', openings: 1, description: 'Looking for a Product Manager...', skills: 'Product Strategy, Agile, Analytics', status: 'active', created: '2025-12-03T14:30:00Z' },
        { id: 3, title: 'UX/UI Designer', department: 'Design', location: 'Remote', type: 'Full-time', experience: 'Mid Level', salary: '$85,000 - $115,000', openings: 1, description: 'Creative UX/UI Designer needed...', skills: 'Figma, Sketch, User Research', status: 'active', created: '2025-12-05T09:15:00Z' },
        { id: 4, title: 'Data Scientist', department: 'Engineering', location: 'Seattle, WA', type: 'Full-time', experience: 'Senior Level', salary: '$130,000 - $170,000', openings: 1, description: 'Join our data team...', skills: 'Python, ML, SQL', status: 'active', created: '2025-12-07T11:00:00Z' },
    ]);

    const [candidates, setCandidates] = useState<Candidate[]>([
        { id: 1, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@email.com', phone: '+1-555-0101', experience: '5 years', skills: 'JS, React', location: 'SF, CA', created: '2025-12-10T10:00:00Z' },
        { id: 2, firstName: 'Michael', lastName: 'Chen', email: 'm.chen@email.com', phone: '+1-555-0102', experience: '3 years', skills: 'Product Mgmt', location: 'NY, NY', created: '2025-12-11T14:30:00Z' },
        { id: 3, firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@email.com', phone: '+1-555-0103', experience: '4 years', skills: 'UX Design', location: 'Remote', created: '2025-12-12T09:15:00Z' },
    ]);

    const [applications, setApplications] = useState<Application[]>([
        { id: 1, candidateId: 1, candidateName: 'Sarah Johnson', jobId: 1, jobTitle: 'Senior Software Engineer', status: 'interview', appliedDate: '2025-12-10T10:00:00Z', resume: 'resume_sarah.pdf' },
        { id: 2, candidateId: 2, candidateName: 'Michael Chen', jobId: 2, jobTitle: 'Product Manager', status: 'screening', appliedDate: '2025-12-11T14:30:00Z', resume: 'resume_michael.pdf' },
        { id: 3, candidateId: 3, candidateName: 'Emily Rodriguez', jobId: 3, jobTitle: 'UX/UI Designer', status: 'new', appliedDate: '2025-12-12T09:15:00Z', resume: 'resume_emily.pdf' },
    ]);

    const [interviews, setInterviews] = useState<Interview[]>([
        { id: 1, candidateId: 1, candidateName: 'Sarah Johnson', jobId: 1, jobTitle: 'Senior Software Engineer', date: '2025-12-20', time: '10:00', type: 'Technical', interviewer: 'John Smith', location: 'Zoom', status: 'scheduled', notes: 'System design focus' },
    ]);

    const [onboarding, setOnboarding] = useState<Onboarding[]>([
        { id: 1, firstName: 'Amanda', lastName: 'White', email: 'amanda.w@company.com', position: 'Senior Software Engineer', department: 'Engineering', startDate: '2025-12-23', manager: 'John Smith', progress: 75, status: 'in-progress' },
    ]);

    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, question: 'Describe your experience with React...', category: 'technical', difficulty: 'medium', department: 'Engineering', notes: 'Look for trade-offs' },
        { id: 2, question: 'Tell me about a time you handled conflict...', category: 'behavioral', difficulty: 'medium', department: '', notes: 'Communication skills' },
    ]);

    const [activities, setActivities] = useState<Activity[]>([
        { id: 1, message: 'New application from Emily Rodriguez for UX/UI Designer', type: 'application', time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
        { id: 2, message: 'Interview scheduled with Sarah Johnson', type: 'interview', time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    ]);

    const [careerPage, setCareerPage] = useState<CareerPageSettings>({
        companyName: 'RecruitPro Technologies',
        tagline: 'Join our team and shape the future',
        about: 'We are a leading technology company...',
        primaryColor: '#7c3aed',
        secondaryColor: '#10b981',
        email: 'careers@recruitpro.com'
    });

    const [departments, setDepartments] = useState(['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']);
    const [employmentTypes, setEmploymentTypes] = useState(['Full-time', 'Part-time', 'Contract', 'Internship']);
    const [experienceLevels, setExperienceLevels] = useState(['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Manager']);

    // --- UI State ---
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null); // For details/edit
    const [filters, setFilters] = useState({ jobs: 'all', applications: 'all', questions: 'all' });

    // --- Helpers ---
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        const diffMins = Math.floor((new Date().getTime() - date.getTime()) / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
        return date.toLocaleDateString();
    };

    const addActivity = (message: string, type: string) => {
        setActivities(prev => [{ id: Date.now(), message, type, time: new Date().toISOString() }, ...prev]);
    };

    // --- Handlers ---
    const handleSaveJob = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const jobData: any = Object.fromEntries(formData.entries());

        if (selectedItem) {
            setJobs(jobs.map(j => j.id === selectedItem.id ? { ...j, ...jobData, status: jobData.status } : j));
            addActivity(`Job "${jobData.title}" updated`, 'job');
        } else {
            setJobs([...jobs, { ...jobData, id: Date.now(), created: new Date().toISOString(), openings: Number(jobData.openings) }]);
            addActivity(`New job posted: ${jobData.title}`, 'job');
        }
        closeModal();
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedItem(null);
    };

    // --- Render Views ---
    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Briefcase size={24} weight="bold" /></div>
                        <span className="text-green-600 text-sm font-medium flex items-center">+5% <ChartLine size={14} className="ml-1" /></span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{jobs.filter(j => j.status === 'active').length}</h3>
                    <p className="text-gray-500 text-sm">Active Jobs</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><FileText size={24} weight="bold" /></div>
                        <span className="text-green-600 text-sm font-medium flex items-center">+12% <ChartLine size={14} className="ml-1" /></span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{applications.filter(a => a.status === 'new').length}</h3>
                    <p className="text-gray-500 text-sm">New Applications</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users size={24} weight="bold" /></div>
                        <span className="text-green-600 text-sm font-medium flex items-center">+8% <ChartLine size={14} className="ml-1" /></span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{candidates.length}</h3>
                    <p className="text-gray-500 text-sm">Total Candidates</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><CalendarCheck size={24} weight="bold" /></div>
                        <span className="text-gray-500 text-sm font-medium">This Week</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{interviews.filter(i => i.status === 'scheduled').length}</h3>
                    <p className="text-gray-500 text-sm">Interviews</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg"><UserPlus size={24} weight="bold" /></div>
                        <span className="text-gray-500 text-sm font-medium">Active</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{onboarding.filter(o => o.status === 'in-progress').length}</h3>
                    <p className="text-gray-500 text-sm">Onboarding</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Applications */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700" onClick={() => setCurrentView('applications')}>View All</button>
                    </div>
                    <div className="p-6">
                        {applications.slice(0, 5).map(app => (
                            <div key={app.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-6 px-6 transition-colors cursor-pointer" onClick={() => { setSelectedItem(app); setActiveModal('applicationDetail'); }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                                        {app.candidateName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{app.candidateName}</div>
                                        <div className="text-sm text-gray-500">{app.jobTitle}</div>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${app.status === 'new' ? 'bg-green-100 text-green-700' :
                                        app.status === 'screening' ? 'bg-yellow-100 text-yellow-700' :
                                            app.status === 'interview' ? 'bg-indigo-100 text-indigo-700' :
                                                'bg-gray-100 text-gray-700'
                                    }`}>
                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        {activities.slice(0, 6).map(activity => (
                            <div key={activity.id} className="flex gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.type === 'application' ? 'bg-blue-100 text-blue-600' :
                                        activity.type === 'interview' ? 'bg-purple-100 text-purple-600' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {activity.type === 'application' ? <FileText size={16} /> :
                                        activity.type === 'interview' ? <CalendarCheck size={16} /> :
                                            <CheckCircle size={16} />}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{formatTime(activity.time)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderJobs = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
                    <p className="text-gray-500">Manage your open positions</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700" onClick={() => { setSelectedItem(null); setActiveModal('jobModal'); }}>
                    <Plus size={20} weight="bold" /> Post New Job
                </button>
            </div>

            <div className="flex gap-2 mb-6">
                {['all', 'active', 'draft', 'closed'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setFilters({ ...filters, jobs: filter })}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${filters.jobs === filter
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)} Jobs
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.filter(j => filters.jobs === 'all' || j.status === filters.jobs).map(job => (
                    <div key={job.id} cursor-pointer className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer" onClick={() => { setSelectedItem(job); setActiveModal('jobDetail'); }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{job.title}</h3>
                                <p className="text-sm text-gray-500">{job.department}</p>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status === 'active' ? 'bg-green-100 text-green-700' :
                                    job.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin size={16} /> {job.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Briefcase size={16} /> {job.type}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <ChartLine size={16} /> {job.experience}
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-6 line-clamp-2">{job.description}</p>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-indigo-600 font-semibold text-sm">{job.openings} Opening{job.openings !== 1 ? 's' : ''}</span>
                            <span className="text-gray-400 text-xs">{formatDate(job.created)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderApplications = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
                    <p className="text-gray-500">Review and manage candidate applications</p>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'new', 'screening', 'interview', 'rejected', 'hired'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setFilters({ ...filters, applications: filter })}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${filters.applications === filter
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-500">
                    <div>Candidate</div>
                    <div>Job Applied</div>
                    <div>Status</div>
                    <div>Date</div>
                    <div>Actions</div>
                </div>
                <div className="divide-y divide-gray-100">
                    {applications.filter(a => filters.applications === 'all' || a.status === filters.applications).map(app => (
                        <div key={app.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                    {app.candidateName.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{app.candidateName}</div>
                                    <div className="text-xs text-gray-500">{app.resume}</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-700">{app.jobTitle}</div>
                            <div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${app.status === 'new' ? 'bg-green-100 text-green-700' :
                                        app.status === 'screening' ? 'bg-yellow-100 text-yellow-700' :
                                            app.status === 'interview' ? 'bg-indigo-100 text-indigo-700' :
                                                'bg-gray-100 text-gray-700'
                                    }`}>
                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">{formatDate(app.appliedDate)}</div>
                            <div className="flex gap-2">
                                <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details" onClick={() => { setSelectedItem(app); setActiveModal('applicationDetail'); }}>
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {applications.length === 0 && <div className="p-8 text-center text-gray-500">No applications found.</div>}
                </div>
            </div>
        </div>
    );

    const renderCandidates = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Candidate Database</h1>
                    <p className="text-gray-500">All candidate profiles</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-500">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Experience</div>
                    <div>Actions</div>
                </div>
                <div className="divide-y divide-gray-100">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                            <div className="font-medium text-gray-900">{candidate.firstName} {candidate.lastName}</div>
                            <div className="text-sm text-gray-600">{candidate.email}</div>
                            <div className="text-sm text-gray-600">{candidate.phone}</div>
                            <div className="text-sm text-gray-600">{candidate.experience}</div>
                            <div className="flex gap-2">
                                <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" onClick={() => { setSelectedItem(candidate); setActiveModal('candidateDetail'); }}>
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // --- Main Render ---
    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] bg-[#f8f9fa]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#1f2937]">Recruitment</h1>
                    <p className="text-[#6b7280]">Manage jobs, candidates, and applications</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-[#374151] hover:bg-[#f3f4f6]" onClick={() => window.print()}>
                        <DownloadSimple size={20} weight="bold" />
                        <span>Export Report</span>
                    </button>
                    {currentView === 'jobs' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca]" onClick={() => { setSelectedItem(null); setActiveModal('jobModal'); }}>
                            <Plus size={20} weight="bold" />
                            <span>Post Job</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex overflow-x-auto pb-2 mb-6 border-b border-[#e5e7eb] gap-6">
                {['dashboard', 'jobs', 'applications', 'candidates', 'interviews', 'onboarding', 'questions', 'career', 'settings'].map(view => (
                    <button
                        key={view}
                        onClick={() => setCurrentView(view)}
                        className={`pb-2 whitespace-nowrap capitalize text-sm font-medium transition-colors border-b-2 ${currentView === view
                                ? 'border-[#4f46e5] text-[#4f46e5]'
                                : 'border-transparent text-[#6b7280] hover:text-[#374151]'
                            }`}
                    >
                        {view}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 pb-10">
                {currentView === 'dashboard' && renderDashboard()}
                {currentView === 'jobs' && renderJobs()}
                {currentView === 'applications' && renderApplications()}
                {currentView === 'candidates' && renderCandidates()}
                {currentView === 'interviews' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Interview Schedule</h1>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700" onClick={() => { setSelectedItem(null); setActiveModal('interviewModal'); }}>
                                <Plus size={20} weight="bold" /> Schedule Interview
                            </button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_100px] gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-500">
                                <div>Candidate</div>
                                <div>Position</div>
                                <div>Date</div>
                                <div>Time</div>
                                <div>Status</div>
                                <div>Actions</div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {interviews.map(i => (
                                    <div key={i.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_100px] gap-4 p-4 items-center">
                                        <div className="font-medium text-gray-900">{i.candidateName}</div>
                                        <div className="text-sm text-gray-600">{i.jobTitle}</div>
                                        <div className="text-sm text-gray-600">{formatDate(i.date)}</div>
                                        <div className="text-sm text-gray-600">{i.time}</div>
                                        <div><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${i.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{i.status}</span></div>
                                        <div>
                                            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" onClick={() => { setSelectedItem(i); setActiveModal('interviewModal'); }}>
                                                <Pencil size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {interviews.length === 0 && <div className="p-8 text-center text-gray-500">No interviews scheduled.</div>}
                            </div>
                        </div>
                    </div>
                )}
                {currentView === 'onboarding' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Onboarding Process</h1>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700" onClick={() => { setSelectedItem(null); setActiveModal('onboardingModal'); }}>
                                <Plus size={20} weight="bold" /> Add New Hire
                            </button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-500">
                                <div>Employee</div>
                                <div>Position</div>
                                <div>Start Date</div>
                                <div>Progress</div>
                                <div>Actions</div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {onboarding.map(o => (
                                    <div key={o.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] gap-4 p-4 items-center">
                                        <div className="font-medium text-gray-900">{o.firstName} {o.lastName}</div>
                                        <div className="text-sm text-gray-600">{o.position}</div>
                                        <div className="text-sm text-gray-600">{formatDate(o.startDate)}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500" style={{ width: `${o.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-600">{o.progress}%</span>
                                        </div>
                                        <div>
                                            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* Placeholder for Questions, Career, Settings - keeping it shorter for now but functional placeholders */}
                {currentView === 'questions' && <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">Questions Management (Implemented in next iteration if needed)</div>}
                {currentView === 'career' && <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">Career Page Settings (Implemented in next iteration if needed)</div>}
                {currentView === 'settings' && <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">System Settings (Implemented in next iteration if needed)</div>}
            </div>

            {/* Basic Job Modal */}
            {activeModal === 'jobModal' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{selectedItem ? 'Edit Job' : 'Create New Job'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveJob} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input name="title" required defaultValue={selectedItem?.title} className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select name="department" required defaultValue={selectedItem?.department} className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none">
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select name="status" required defaultValue={selectedItem?.status || 'draft'} className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none">
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                            {/* Simplified form fields for brevity in this turn */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" required defaultValue={selectedItem?.description} rows={4} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Detail Modal Placeholder */}
            {(activeModal === 'jobDetail' || activeModal === 'applicationDetail' || activeModal === 'candidateDetail') && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Details</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <div className="p-6">
                            <pre className="whitespace-pre-wrap text-sm text-gray-600 bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                                {JSON.stringify(selectedItem, null, 2)}
                            </pre>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end">
                            <button onClick={closeModal} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
