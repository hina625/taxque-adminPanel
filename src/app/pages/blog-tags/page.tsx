"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';


interface BlogTag {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
    status: boolean;
    color: string;
}

export default function BlogTagsPage() {
    const [tags, setTags] = useState<BlogTag[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTag, setCurrentTag] = useState<BlogTag>({
        id: 0,
        name: '',
        slug: '',
        description: '',
        count: 0,
        status: true,
        color: 'bg-blue-500'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    const colors = [
        'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-400',
        'bg-orange-400', 'bg-teal-500', 'bg-yellow-400', 'bg-red-400',
        'bg-indigo-500', 'bg-green-500'
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('blogTags');
            if (stored) {
                setTags(JSON.parse(stored));
            } else {
                const initialTags: BlogTag[] = [
                    { id: 1, name: "Technology", slug: "technology", description: "Tech related posts", count: 12, status: true, color: "bg-blue-500" },
                    { id: 2, name: "Finance", slug: "finance", description: "Financial advice", count: 8, status: true, color: "bg-green-500" },
                    { id: 3, name: "Health", slug: "health", description: "Health tips", count: 5, status: true, color: "bg-red-400" },
                    { id: 4, name: "Lifestyle", slug: "lifestyle", description: "Lifestyle trends", count: 15, status: true, color: "bg-purple-500" },
                    { id: 5, name: "Education", slug: "education", description: "Educational content", count: 3, status: false, color: "bg-yellow-400" }
                ];
                setTags(initialTags);
                localStorage.setItem('blogTags', JSON.stringify(initialTags));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && tags.length > 0) {
            localStorage.setItem('blogTags', JSON.stringify(tags));
        }
    }, [tags]);

    const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleOpenModal = (tag?: BlogTag) => {
        if (tag) {
            setIsEditing(true);
            setCurrentTag(tag);
        } else {
            setIsEditing(false);
            setCurrentTag({
                id: 0,
                name: '',
                slug: '',
                description: '',
                count: 0,
                status: true,
                color: 'bg-blue-500'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            setTags(tags.map(t => t.id === currentTag.id ? currentTag : t));
            showNotification('Tag updated successfully', 'success');
        } else {
            const newId = tags.length > 0 ? Math.max(...tags.map(t => t.id)) + 1 : 1;
            setTags([...tags, { ...currentTag, id: newId }]);
            showNotification('New tag created successfully', 'success');
        }
        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            setTags(tags.filter(t => t.id !== id));
            showNotification('Tag deleted successfully', 'info');
        }
    };

    const filteredTags = tags.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: tags.length,
        active: tags.filter(t => t.status).length,
        inactive: tags.filter(t => !t.status).length
    };

    return (
        <div className="w-full p-6 font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                        <i className="fas fa-tags text-primary"></i> Tags Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create, edit, and manage tags for organizing your blog content efficiently.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2">
                    <i className="fas fa-plus"></i> Add New Tag
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg flex items-center gap-4 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
                        <i className="fas fa-tags"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Tags</div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xl">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Active Tags</div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-xl">
                        <i className="fas fa-times-circle"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Inactive</div>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-xl flex justify-between items-center flex-wrap gap-4 transition-colors">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                        Tag List
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tags..."
                            className="pl-8 pr-4 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none w-full md:w-48 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search absolute left-2.5 top-2 text-gray-400 dark:text-gray-500 text-xs"></i>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm transition-colors">
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Tag Name</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Slug</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Count</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Status</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTags.length > 0 ? (
                                filteredTags.map(tag => (
                                    <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-3 h-3 rounded-full ${tag.color}`}></span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{tag.name}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tag.description}</div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{tag.slug}</td>
                                        <td className="p-4">
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded text-xs font-semibold transition-colors">{tag.count} posts</span>
                                        </td>
                                        <td className="p-4">
                                            {tag.status ? (
                                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50 text-xs rounded-full font-semibold">Active</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 text-xs rounded-full font-semibold">Inactive</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleOpenModal(tag)} className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors" title="Edit">
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button onClick={() => handleDelete(tag.id)} className="w-8 h-8 rounded bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors" title="Delete">
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">No tags found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
                            <h2 className="text-lg font-semibold dark:text-white">{isEditing ? 'Edit Tag' : 'Create New Tag'}</h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Tag Name *</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    required
                                    placeholder="Enter tag name"
                                    value={currentTag.name}
                                    onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Slug *</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    required
                                    placeholder="tag-slug"
                                    value={currentTag.slug}
                                    onChange={(e) => setCurrentTag({ ...currentTag, slug: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    rows={3}
                                    placeholder="Optional description"
                                    value={currentTag.description}
                                    onChange={(e) => setCurrentTag({ ...currentTag, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Tag Color</label>
                                <div className="flex flex-wrap gap-2">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`w-7 h-7 rounded-full transition-transform hover:scale-110 shadow-sm ${color} ${currentTag.color === color ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900' : ''}`}
                                            onClick={() => setCurrentTag({ ...currentTag, color })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 py-1">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={currentTag.status}
                                        onChange={(e) => setCurrentTag({ ...currentTag, status: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                                <span className="text-xs font-medium text-slate-600 dark:text-gray-400">Active</span>
                            </div>

                            <div className="pt-2 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-dark shadow-sm transition-all"
                                >
                                    {isEditing ? 'Update Tag' : 'Create Tag'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-5 right-5 z-[1001] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-white transform transition-all duration-500 ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : notification.type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}`}></i>
                    <span className="font-semibold">{notification.message}</span>
                </div>
            )}
        </div>
    );
}
