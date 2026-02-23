"use client";

import React, { useState, useEffect } from 'react';
import {
    Users,
    MagnifyingGlass,
    Plus,
    X,
    Camera,
    User,
    EnvelopeSimple,
    Phone,
    LinkedinLogo,
    TwitterLogo,
    FacebookLogo,
    InstagramLogo,
    GithubLogo,
    Globe,
    Briefcase,
    Clock,
    PlusCircle,
    Trash,
    CheckCircle,
    PencilSimple,
    CaretDown,
    GraduationCap,
    Check
} from '@phosphor-icons/react';

// --- Types ---

interface Experience {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    skills: string;
    image: string;
    email: string;
    phone: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    github: string;
    website: string;
    status: 'Active' | 'Inactive';
    experience: Experience[];
}

// --- Mock Data ---

const INITIAL_TEAM: TeamMember[] = [
    {
        id: 1,
        name: "Bhavna Ahuja",
        role: "Founder & Director",
        bio: "Harvard Business School graduate who worked at senior levels in the Indian Revenue Service for 13 years.",
        skills: "Corporate Law, International Taxation, Business Restructuring",
        image: "https://ui-avatars.com/api/?name=Bhavna+Ahuja&background=6366f1&color=fff&size=128",
        email: "bhavna@taxque.com",
        phone: "+91 98765 43210",
        linkedin: "https://linkedin.com/in/bhavna-ahuja",
        twitter: "https://twitter.com/bhavnaahuja",
        facebook: "",
        instagram: "",
        github: "",
        website: "https://taxque.com",
        status: "Active",
        experience: [
            {
                id: 'exp-1',
                title: "Founder & Director",
                company: "TaxQue",
                startDate: "2018",
                endDate: "",
                current: true,
                description: "Leading a team of tax professionals providing comprehensive tax consulting services to businesses across India."
            },
            {
                id: 'exp-2',
                title: "Joint Commissioner",
                company: "Indian Revenue Service",
                startDate: "2005",
                endDate: "2018",
                current: false,
                description: "Served at senior levels handling complex tax matters and policy implementation. Resigned at age 35 to pursue entrepreneurship."
            }
        ]
    },
    {
        id: 2,
        name: "Saimon Jhonson",
        role: "Chief Technology Officer",
        bio: "Powers the development of our platform. Masters in Computer Science and over two decades of rich professional experience.",
        skills: "System Architecture, Cloud Computing, Technical Leadership",
        image: "https://ui-avatars.com/api/?name=Saimon+Jhonson&background=10b981&color=fff&size=128",
        email: "saimon@taxque.com",
        phone: "+91 98765 43211",
        linkedin: "https://linkedin.com/in/saimon-jhonson",
        twitter: "",
        facebook: "",
        instagram: "",
        github: "https://github.com/saimonjhonson",
        website: "",
        status: "Active",
        experience: [
            {
                id: 'exp-3',
                title: "Chief Technology Officer",
                company: "TaxQue",
                startDate: "2019",
                endDate: "",
                current: true,
                description: "Leading technology strategy and platform development."
            }
        ]
    },
    {
        id: 3,
        name: "Kevin Pitersen",
        role: "Financial Advisor",
        bio: "Founding member of the advisory panel and an entrepreneur with 25+ years of experience in Finance and Technology.",
        skills: "Financial Markets, Investment Strategy, Risk Management",
        image: "https://ui-avatars.com/api/?name=Kevin+Pitersen&background=f59e0b&color=fff&size=128",
        email: "kevin@taxque.com",
        phone: "+91 98765 43212",
        linkedin: "https://linkedin.com/in/kevin-pitersen",
        twitter: "https://twitter.com/kevinpitersen",
        facebook: "",
        instagram: "",
        github: "",
        website: "",
        status: "Active",
        experience: []
    }
];

// --- Component ---

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
    const [filteredTeam, setFilteredTeam] = useState<TeamMember[]>(INITIAL_TEAM);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState<TeamMember>({
        id: 0,
        name: '',
        role: '',
        bio: '',
        skills: '',
        image: '',
        email: '',
        phone: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
        github: '',
        website: '',
        status: 'Active',
        experience: []
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // --- Effects ---

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = team.filter(m =>
            m.name.toLowerCase().includes(query) ||
            m.role.toLowerCase().includes(query) ||
            m.bio.toLowerCase().includes(query) ||
            m.skills.toLowerCase().includes(query)
        );
        setFilteredTeam(filtered);
    }, [searchQuery, team]);

    // --- Handlers ---

    const handleOpenModal = (member?: TeamMember) => {
        if (member) {
            setFormData(member);
            setIsEditing(true);
        } else {
            setFormData({
                id: 0,
                name: '',
                role: '',
                bio: '',
                skills: '',
                image: '',
                email: '',
                phone: '',
                linkedin: '',
                twitter: '',
                facebook: '',
                instagram: '',
                github: '',
                website: '',
                status: 'Active',
                experience: []
            });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // Default Image if empty
        const imageToUse = formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=6366f1&color=fff&size=128`;

        if (isEditing) {
            setTeam(prev => prev.map(m => m.id === formData.id ? { ...formData, image: imageToUse } : m));
            setToastMessage("Profile updated successfully.");
        } else {
            const newId = team.length > 0 ? Math.max(...team.map(m => m.id)) + 1 : 1;
            setTeam(prev => [{ ...formData, id: newId, image: imageToUse }, ...prev]);
            setToastMessage("New team member added.");
        }

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        handleCloseModal();
    };

    const handleDelete = () => {
        if (!isEditing) return;
        if (confirm("Delete this profile? This cannot be undone.")) {
            setTeam(prev => prev.filter(m => m.id !== formData.id));
            setToastMessage("Profile deleted.");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            handleCloseModal();
        }
    };

    const handleExperienceChange = (id: string, field: keyof Experience, value: any) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    const addExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        setFormData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const removeExperience = (id: string) => {
        setFormData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setFormData(prev => ({ ...prev, image: event.target!.result as string }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Render Helpers ---

    const renderExperienceTimeline = () => (
        <div className="space-y-6">
            {formData.experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-8 before:absolute before:left-[7px] before:top-8 before:bottom-[-16px] before:w-0.5 before:bg-gradient-to-b before:from-slate-200 dark:before:from-gray-700 before:to-transparent last:before:hidden">
                    <div className={`absolute left-0 top-6 w-4 h-4 rounded-full border-[3px] z-10 transition-all ${exp.current ? 'bg-indigo-600 border-indigo-100 dark:border-indigo-900 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'bg-white dark:bg-gray-800 border-indigo-500 dark:border-indigo-400'}`}></div>
                    <div className="bg-slate-50 dark:bg-gray-900 rounded-xl p-5 border border-slate-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h5 className="text-sm font-bold text-slate-700 dark:text-gray-200">Experience #{index + 1}</h5>
                            <button type="button" onClick={() => removeExperience(exp.id)} className="text-rose-500 hover:text-rose-700 transition-colors">
                                <Trash weight="bold" size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 mb-2 transition-colors">Job Title <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-medium text-sm text-slate-900 dark:text-white transition-all"
                                    placeholder="e.g. Senior Tax Consultant"
                                    value={exp.title}
                                    onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 mb-2 transition-colors">Company / Organization <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-medium text-sm text-slate-900 dark:text-white transition-all"
                                    placeholder="e.g. TaxQue"
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 dark:text-indigo-500 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-700"
                                        checked={exp.current}
                                        onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                                    />
                                    <span className="text-sm font-bold text-slate-700 dark:text-gray-200 mt-0.5">Currently working here</span>
                                </label>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 mb-2 transition-colors">Start Date <span className="text-rose-500">*</span></label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-medium text-sm text-slate-900 dark:text-white transition-all"
                                        placeholder="e.g. 2020"
                                        value={exp.startDate}
                                        onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                                        required
                                    />
                                </div>
                                {!exp.current && (
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 mb-2 transition-colors">End Date <span className="text-rose-500">*</span></label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-medium text-sm text-slate-900 dark:text-white transition-all"
                                            placeholder="e.g. 2023"
                                            value={exp.endDate}
                                            onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 mb-2 transition-colors">Description</label>
                                <textarea
                                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none font-medium text-sm text-slate-900 dark:text-white transition-all"
                                    rows={3}
                                    placeholder="Brief description of your role and achievements..."
                                    value={exp.description}
                                    onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {formData.experience.length === 0 && (
                <div className="text-center py-8 bg-slate-50 dark:bg-gray-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-gray-800 transition-colors">
                    <Briefcase size={32} className="mx-auto text-slate-300 dark:text-gray-700 mb-3" weight="bold" />
                    <p className="text-sm text-slate-500 dark:text-gray-400 font-medium transition-colors">No experience added yet</p>
                    <button type="button" onClick={addExperience} className="mt-3 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                        Add your first experience
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950 p-6 md:p-10 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Team Management</h1>
                        <p className="text-slate-500 dark:text-gray-400 mt-1 font-medium transition-colors">Manage profiles, skills, and career history.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative group flex-1 md:w-64">
                            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                placeholder="Search team..."
                            />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200 flex items-center gap-2 font-bold transition-transform active:scale-95 whitespace-nowrap"
                        >
                            <Plus weight="bold" size={18} />
                            <span className="hidden sm:inline">Add Member</span>
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeam.map((member, index) => (
                        <div key={member.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300 group animate-card flex flex-col h-full">
                            <div className="p-6 flex-1 transition-colors">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="w-16 h-16 rounded-2xl p-0.5 border-2 border-slate-100 dark:border-gray-800 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors overflow-hidden">
                                        <img src={member.image} alt={member.name} className="w-full h-full rounded-xl object-cover" />
                                    </div>
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${member.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30' : 'bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-gray-700'}`}>
                                        {member.status}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-0.5 transition-colors">{member.name}</h3>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mb-4 transition-colors">{member.role}</p>

                                <div className="flex gap-2 mb-4">
                                    {member.linkedin && <a href={member.linkedin} target="_blank" className="w-8 h-8 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center hover:shadow-md transition-transform hover:-translate-y-1"><LinkedinLogo weight="bold" /></a>}
                                    {member.twitter && <a href={member.twitter} target="_blank" className="w-8 h-8 bg-[#1DA1F2] text-white rounded-lg flex items-center justify-center hover:shadow-md transition-transform hover:-translate-y-1"><TwitterLogo weight="bold" /></a>}
                                    {member.facebook && <a href={member.facebook} target="_blank" className="w-8 h-8 bg-[#1877F2] text-white rounded-lg flex items-center justify-center hover:shadow-md transition-transform hover:-translate-y-1"><FacebookLogo weight="bold" /></a>}
                                    {member.instagram && <a href={member.instagram} target="_blank" className="w-8 h-8 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FD1D1D] text-white rounded-lg flex items-center justify-center hover:shadow-md transition-transform hover:-translate-y-1"><InstagramLogo weight="bold" /></a>}
                                    {member.github && <a href={member.github} target="_blank" className="w-8 h-8 bg-slate-800 text-white rounded-lg flex items-center justify-center hover:shadow-md transition-transform hover:-translate-y-1"><GithubLogo weight="bold" /></a>}
                                    {member.website && <a href={member.website} target="_blank" className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:shadow-md transition-transform hover:-translate-y-1"><Globe weight="bold" /></a>}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.skills.split(',').slice(0, 3).map((skill, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 text-[10px] uppercase font-bold rounded-md tracking-wide transition-colors">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-2 min-h-[40px] transition-colors">
                                    {member.bio}
                                </p>

                                {member.experience.length > 0 && (() => {
                                    const currentExp = member.experience.find(exp => exp.current);
                                    if (currentExp) {
                                        const dateRange = `${currentExp.startDate} - Present`;
                                        return (
                                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-gray-800 transition-colors">
                                                <div className="flex items-start gap-2 mb-1">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 mt-1.5 flex-shrink-0"></div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">{currentExp.title}</p>
                                                        <p className="text-xs text-slate-500 dark:text-gray-400 transition-colors">{currentExp.company} • {dateRange}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}

                                {(member.email || member.phone) && (
                                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-gray-800 space-y-1.5 transition-colors">
                                        {member.email && (
                                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-gray-400">
                                                <EnvelopeSimple className="text-slate-400 dark:text-gray-500" weight="bold" />
                                                <span className="font-medium transition-colors">{member.email}</span>
                                            </div>
                                        )}
                                        {member.phone && (
                                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-gray-400">
                                                <Phone className="text-slate-400 dark:text-gray-500" weight="bold" />
                                                <span className="font-medium transition-colors">{member.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/50 rounded-b-2xl flex gap-3 transition-colors">
                                <button onClick={() => handleOpenModal(member)} className="flex-1 py-2 px-4 rounded-lg bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 font-bold text-sm hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm flex items-center justify-center gap-2">
                                    <PencilSimple weight="bold" /> Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
                    <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] transition-colors">

                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-t-2xl backdrop-blur-sm sticky top-0 z-20 transition-colors">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{isEditing ? 'Edit Profile' : 'Add Profile'}</h3>
                                <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-0.5">Update personal details and career history.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-8 h-8 rounded-full hover:bg-white/80 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:dark:bg-gray-800 transition-colors">
                                <X weight="bold" size={20} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto scrollbar-hide space-y-8">
                            <form id="memberForm" onSubmit={handleSave}>

                                {/* Section 1: Profile Photo */}
                                <div className="space-y-5">
                                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2 transition-colors">
                                        <Camera weight="bold" /> Profile Photo
                                    </h4>

                                    <div className="flex flex-col md:flex-row items-start gap-6">
                                        <div className="w-32 h-32 rounded-2xl border-4 border-slate-200 dark:border-gray-800 overflow-hidden bg-slate-100 dark:bg-gray-800 relative group transition-colors">
                                            <img src={formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=6366f1&color=fff&size=128`} className="w-full h-full object-cover transition-colors" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera weight="bold" className="text-white text-2xl" />
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Upload Photo</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePhotoUpload}
                                                    className="block w-full text-sm text-slate-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-indigo-50 dark:file:bg-indigo-950/50 file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900 file:cursor-pointer cursor-pointer border border-slate-200 dark:border-gray-700 rounded-xl transition-all"
                                                />
                                                <p className="text-xs text-slate-400 dark:text-gray-500 mt-1.5 transition-colors">JPG, PNG or GIF (max. 2MB)</p>
                                            </div>

                                            <div className="pt-3 border-t border-slate-100 dark:border-gray-800 transition-colors">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Or Use Image URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 dark:text-gray-300 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                    placeholder="https://example.com/photo.jpg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-gray-800 my-8 transition-colors" />

                                {/* Section 2: Basic Info */}
                                <div className="space-y-5">
                                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2 transition-colors">
                                        <User weight="bold" /> Basic Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Full Name <span className="text-rose-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                placeholder="e.g. Bhavna Ahuja"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Current Role <span className="text-rose-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                placeholder="e.g. Director"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Email Address</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                placeholder="name@company.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Status</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none appearance-none font-medium cursor-pointer text-slate-900 dark:text-white transition-all"
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                            >
                                                <option value="Active">Active (Visible)</option>
                                                <option value="Inactive">Inactive (Hidden)</option>
                                            </select>
                                            <CaretDown weight="bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-gray-800 my-8 transition-colors" />

                                {/* Section 3: Social Media Links */}
                                <div className="space-y-5">
                                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2 transition-colors">
                                        <Globe weight="bold" /> Social Media & Links
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">LinkedIn Profile URL</label>
                                            <div className="relative group">
                                                <LinkedinLogo className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0A66C2] group-focus-within:scale-110 transition-transform" weight="fill" size={20} />
                                                <input
                                                    type="url"
                                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 dark:text-gray-300 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                    placeholder="https://linkedin.com/in/username"
                                                    value={formData.linkedin}
                                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Twitter (X) Profile URL</label>
                                            <div className="relative group">
                                                <TwitterLogo className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1DA1F2] group-focus-within:scale-110 transition-transform" weight="fill" size={20} />
                                                <input
                                                    type="url"
                                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 dark:text-gray-300 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                    placeholder="https://twitter.com/username"
                                                    value={formData.twitter}
                                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Facebook Profile URL</label>
                                            <div className="relative group">
                                                <FacebookLogo className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1877F2] group-focus-within:scale-110 transition-transform" weight="fill" size={20} />
                                                <input
                                                    type="url"
                                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 dark:text-gray-300 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                    placeholder="https://facebook.com/username"
                                                    value={formData.facebook}
                                                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Instagram Profile URL</label>
                                            <div className="relative group">
                                                <InstagramLogo className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E4405F] group-focus-within:scale-110 transition-transform" weight="fill" size={20} />
                                                <input
                                                    type="url"
                                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 dark:text-gray-300 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                    placeholder="https://instagram.com/username"
                                                    value={formData.instagram}
                                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">GitHub Profile URL</label>
                                            <div className="relative group">
                                                <GithubLogo className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 dark:text-gray-400 group-focus-within:scale-110 transition-transform" weight="fill" size={20} />
                                                <input
                                                    type="url"
                                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 dark:text-gray-300 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                    placeholder="https://github.com/username"
                                                    value={formData.github}
                                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Personal Website URL</label>
                                            <div className="relative group">
                                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 dark:text-gray-400 group-focus-within:scale-110 transition-transform" weight="fill" size={20} />
                                                <input
                                                    type="url"
                                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 dark:text-gray-300 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                                    placeholder="https://yourwebsite.com"
                                                    value={formData.website}
                                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-gray-800 my-8 transition-colors" />

                                {/* Section 4: Professional Bio & Skills */}
                                <div className="space-y-5">
                                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2 transition-colors">
                                        <GraduationCap weight="bold" /> Skills & Expertise
                                    </h4>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Professional Bio <span className="text-rose-500">*</span></label>
                                        <textarea
                                            required
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 min-h-[120px]"
                                            placeholder="Write a brief professional summary..."
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2 transition-colors">Professional Skills</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500"
                                            placeholder="e.g. Corporate Law, GST, Auditing (Comma separated)"
                                            value={formData.skills}
                                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        />
                                        <p className="text-xs text-slate-400 dark:text-gray-500 mt-1.5 transition-colors">Separate multiple skills with commas.</p>
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-gray-800 my-8 transition-colors" />

                                {/* Section 5: Career & Experience */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-gray-800/50 p-4 rounded-xl border border-slate-100 dark:border-gray-800 transition-colors">
                                        <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2 transition-colors">
                                            <Briefcase weight="bold" /> Career & Experience
                                        </h4>
                                        <button type="button" onClick={addExperience} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline transition-colors">
                                            <PlusCircle weight="bold" size={16} /> Add Experience
                                        </button>
                                    </div>
                                    {renderExperienceTimeline()}
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-5 border-t border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/30 rounded-b-2xl flex justify-end gap-3 sticky bottom-0 z-20 backdrop-blur-sm transition-colors">
                            {isEditing && (
                                <button type="button" onClick={handleDelete} className="mr-auto px-6 py-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors flex items-center gap-2">
                                    <Trash weight="bold" /> Delete
                                </button>
                            )}
                            <button onClick={handleCloseModal} className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-10 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all flex items-center gap-2">
                                <Check weight="bold" /> {isEditing ? 'Save Profile' : 'Create Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
                    <div className="bg-slate-800 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3">
                        <CheckCircle weight="fill" className="text-emerald-400 text-xl" />
                        <div>
                            <h4 className="font-bold text-sm">Success</h4>
                            <p className="text-xs text-slate-300 mt-0.5">{toastMessage}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
