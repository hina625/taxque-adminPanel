"use client";

import { useState, useEffect } from "react";

// --- Types ---
interface Announcement {
    id: number;
    title: string;
    content: string;
    target: 'all-users' | 'specific';
    users: string[];
    timestamp: string;
}

export default function AnnouncementsPage() {
    // --- State ---
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState<'all' | 'specific' | 'all-users'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

    // Form States
    const [formTitle, setFormTitle] = useState('');
    const [formContent, setFormContent] = useState('');
    const [formTarget, setFormTarget] = useState<'all-users' | 'specific'>('all-users');
    const [formUsers, setFormUsers] = useState('');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // --- Effects ---
    useEffect(() => {
        // Load data from localStorage on client mount
        const stored = localStorage.getItem('adminAnnouncements');
        if (stored) {
            setAnnouncements(JSON.parse(stored));
        } else {
            // Initial demo data
            const initialData: Announcement[] = [
                { id: 1, title: "System Maintenance Scheduled", content: "We will be performing scheduled maintenance tonight from 2 AM to 4 AM UTC. Expect brief downtime.", target: "all-users", users: [], timestamp: new Date(Date.now() - 86400000).toISOString() },
                { id: 2, title: "New Feature: AI Drafting", content: "The new AI drafting tool is now live for Pro users! Check your dashboard for details.", target: "specific", users: ["editor@a.com", "admin@a.com"], timestamp: new Date(Date.now() - 3600000).toISOString() }
            ];
            setAnnouncements(initialData);
            localStorage.setItem('adminAnnouncements', JSON.stringify(initialData));
        }
        setLoading(false);
    }, []);

    // Save to localStorage whenever announcements change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('adminAnnouncements', JSON.stringify(announcements));
        }
    }, [announcements, loading]);

    // --- Handlers ---

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let targetUsers: string[] = [];
        if (formTarget === 'specific') {
            targetUsers = formUsers.split(',').map(u => u.trim()).filter(u => u.length > 0);
            if (targetUsers.length === 0) {
                showNotification("Please enter at least one user email/ID.", 'error');
                return;
            }
        }

        const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
        const newAnnouncement: Announcement = {
            id: newId,
            title: formTitle,
            content: formContent,
            target: formTarget,
            users: targetUsers,
            timestamp: new Date().toISOString()
        };

        setAnnouncements([...announcements, newAnnouncement]);
        showNotification(`Announcement sent to ${formTarget === 'all-users' ? 'All Users' : targetUsers.length + ' user(s)'}.`, 'success');
        closeCreateModal();
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        setFormTitle('');
        setFormContent('');
        setFormTarget('all-users');
        setFormUsers('');
    };

    const formatTimestamp = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: true
        });
    };

    // --- Filtering ---
    const filteredAnnouncements = announcements.filter(a => {
        if (filterValue !== 'all' && a.target !== filterValue) return false;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                a.title.toLowerCase().includes(term) ||
                a.content.toLowerCase().includes(term) ||
                a.users.some(u => u.toLowerCase().includes(term))
            );
        }

        return true;
    });

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="w-full p-6 font-sans bg-white min-h-screen text-gray-900">
            {/* Page Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <i className="fas fa-bullhorn text-primary"></i>
                        Announcements Manager
                    </h1>
                    <p className="text-gray-600 mt-1">Manage and send critical notifications to your user base, tracking status and delivery times.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
                >
                    <i className="fas fa-paper-plane"></i> Create New
                </button>
            </div>

            {/* Content Area */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">Sent Notifications</h2>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        <select
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value as any)}
                            className="py-2 px-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">All Targets</option>
                            <option value="specific">Specific Users</option>
                            <option value="all-users">All Users</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search title or user..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="py-2 px-3 rounded-lg border border-gray-300 outline-none flex-grow md:flex-grow-0 focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-primary/10 text-primary-dark text-xs uppercase font-semibold text-left">
                                <th className="p-4 border-b border-gray-200 w-1/2">Title / Content Preview</th>
                                <th className="p-4 border-b border-gray-200 w-[15%]">Target</th>
                                <th className="p-4 border-b border-gray-200 w-[20%]">Date Sent</th>
                                <th className="p-4 border-b border-gray-200 w-[15%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAnnouncements.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center p-8 text-gray-500">
                                        <i className="fas fa-frown text-4xl mb-4 block"></i>
                                        <p>No announcements found. Click 'Create New Announcement' to send one.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAnnouncements.map(a => (
                                    <tr key={a.id} className="hover:bg-primary/5 transition-colors border-b last:border-0 border-gray-100">
                                        <td className="p-4">
                                            <strong className="text-primary block mb-1">{a.title}</strong>
                                            <p className="text-gray-500 text-sm truncate">{a.content}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${a.target === 'all-users'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-indigo-100 text-indigo-600'
                                                }`}>
                                                {a.target === 'all-users' ? 'All Users' : `${a.users.length} User(s)`}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {formatTimestamp(a.timestamp)}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => setSelectedAnnouncement(a)}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded transition-colors text-sm flex items-center gap-2"
                                            >
                                                <i className="fas fa-eye"></i> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-down">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <i className="fas fa-paper-plane text-primary"></i> Send Notification
                            </h3>
                            <button onClick={closeCreateModal} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleCreateSubmit} className="p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title / Subject</label>
                                <input
                                    type="text" id="title" required
                                    placeholder="e.g., System Maintenance Alert"
                                    value={formTitle} onChange={e => setFormTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="content">Message Content</label>
                                <textarea
                                    id="content" rows={4} required
                                    placeholder="Enter the full message content here..."
                                    value={formContent} onChange={e => setFormContent(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Notification Target</label>
                                <select
                                    value={formTarget} onChange={e => setFormTarget(e.target.value as any)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="all-users">All Users</option>
                                    <option value="specific">Specific User(s) / Group</option>
                                </select>
                            </div>
                            {formTarget === 'specific' && (
                                <div className="mb-4 animate-fade-in-down">
                                    <label className="block text-gray-700 font-semibold mb-2">Target User(s) (IDs or Emails)</label>
                                    <input
                                        type="text" required
                                        placeholder="e.g., user@a.com, user@b.com (separate by comma)"
                                        value={formUsers} onChange={e => setFormUsers(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            )}
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button type="button" onClick={closeCreateModal} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
                                    <i className="fas fa-rocket"></i> Send Announcement
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {selectedAnnouncement && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-down">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <i className="fas fa-info-circle text-primary"></i> Announcement Details
                            </h3>
                            <button onClick={() => setSelectedAnnouncement(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <strong className="text-lg block mb-1">{selectedAnnouncement.title}</strong>
                                <p className="text-sm text-gray-500">
                                    Sent to: <span className="font-medium text-gray-700">
                                        {selectedAnnouncement.target === 'all-users' ? 'All Users' : selectedAnnouncement.users.join(', ')}
                                    </span>
                                    {' '} on {formatTimestamp(selectedAnnouncement.timestamp)}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary">
                                <p className="whitespace-pre-wrap">{selectedAnnouncement.content}</p>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 flex justify-end">
                            <button onClick={() => setSelectedAnnouncement(null)} className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 z-50 flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                    <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                    {notification.message}
                </div>
            )}
        </div>
    );
}
