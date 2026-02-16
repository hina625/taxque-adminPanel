"use client";

import { useState, useEffect } from 'react';

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
        <div className="w-full p-6 font-sans text-gray-900 bg-white min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <i className="fas fa-tags text-primary"></i> Tags Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Create, edit, and manage tags for organizing your blog content efficiently.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2">
                    <i className="fas fa-plus"></i> Add New Tag
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-5 border border-gray-200 rounded-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                        <i className="fas fa-tags"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-500">Total Tags</div>
                    </div>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-xl">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
                        <div className="text-sm text-gray-500">Active Tags</div>
                    </div>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xl">
                        <i className="fas fa-times-circle"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.inactive}</div>
                        <div className="text-sm text-gray-500">Inactive</div>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="overflow-hidden">
                <div className="p-5 border-b border-gray-200 bg-gray-50 rounded-t-xl flex justify-between items-center flex-wrap gap-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        Tag List
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tags..."
                            className="pl-8 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none w-full md:w-48"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search absolute left-2.5 top-2 text-gray-400 text-xs"></i>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm">
                                <th className="p-4 font-semibold border-b">Tag Name</th>
                                <th className="p-4 font-semibold border-b">Slug</th>
                                <th className="p-4 font-semibold border-b">Count</th>
                                <th className="p-4 font-semibold border-b">Status</th>
                                <th className="p-4 font-semibold border-b text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTags.length > 0 ? (
                                filteredTags.map(tag => (
                                    <tr key={tag.id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-3 h-3 rounded-full ${tag.color}`}></span>
                                                <span className="font-semibold text-gray-900">{tag.name}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{tag.description}</div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{tag.slug}</td>
                                        <td className="p-4">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">{tag.count} posts</span>
                                        </td>
                                        <td className="p-4">
                                            {tag.status ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 border border-green-200 text-xs rounded-full font-semibold">Active</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 border border-red-200 text-xs rounded-full font-semibold">Inactive</span>
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
                                    <td colSpan={5} className="p-8 text-center text-gray-500">No tags found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border">
                        <div className="flex justify-between items-center p-5 border-b">
                            <h3 className="text-lg font-bold">
                                {isEditing ? 'Edit Tag' : 'Create New Tag'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 text-sm">Tag Name *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        required
                                        placeholder="Enter tag name"
                                        value={currentTag.name}
                                        onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 text-sm">Slug *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        required
                                        placeholder="tag-slug"
                                        value={currentTag.slug}
                                        onChange={(e) => setCurrentTag({ ...currentTag, slug: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 text-sm">Description</label>
                                    <textarea
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        rows={3}
                                        placeholder="Optional description"
                                        value={currentTag.description}
                                        onChange={(e) => setCurrentTag({ ...currentTag, description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-2 text-sm">Tag Color</label>
                                    <div className="flex flex-wrap gap-2">
                                        {colors.map(color => (
                                            <div
                                                key={color}
                                                className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${color} ${currentTag.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                                                onClick={() => setCurrentTag({ ...currentTag, color })}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="flex items-center gap-2 font-semibold cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                                            checked={currentTag.status}
                                            onChange={(e) => setCurrentTag({ ...currentTag, status: e.target.checked })}
                                        />
                                        Active
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button type="button" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors" onClick={handleCloseModal}>Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors">
                                        {isEditing ? 'Update Tag' : 'Create Tag'}
                                    </button>
                                </div>
                            </form>
                        </div>
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
