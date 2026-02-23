"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';


interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string | null;
    author: string;
    categories: string[];
    status: 'published' | 'draft' | 'scheduled' | 'trashed';
    publishDate: string;
    views: number;
}

export default function BlogPostsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [currentTab, setCurrentTab] = useState('all');
    const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<BlogPost>({
        id: 0,
        title: '',
        excerpt: '',
        image: null,
        author: '',
        categories: [],
        status: 'draft',
        publishDate: '',
        views: 0
    });


    // Mock Data
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('blogPosts');
            if (stored) {
                setPosts(JSON.parse(stored));
            } else {
                const initialPosts: BlogPost[] = [
                    { id: 1, title: "10 Tips for Efficient Tax Filing", excerpt: "Learn how to streamline your tax filing process with these expert tips and tricks for the upcoming season.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=100&h=60&fit=crop", author: "John Doe", categories: ["Finance", "Tax"], status: 'published', publishDate: "2025-01-15", views: 1250 },
                    { id: 2, title: "Understanding GST Rates in 2025", excerpt: "A comprehensive guide to the new GST rate changes and how they impact your business operations.", image: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?q=80&w=100&h=60&fit=crop", author: "Jane Smith", categories: ["Business", "GST"], status: 'published', publishDate: "2025-02-01", views: 980 },
                    { id: 3, title: "Top 5 Accounting Software Reviews", excerpt: "We reviewed the top accounting software solutions to help you choose the best one for your small business.", image: null, author: "Mike Johnson", categories: ["Tech", "Software"], status: 'draft', publishDate: "", views: 0 },
                    { id: 4, title: "The Future of Digital Payments", excerpt: "Explore the emerging trends in digital payments and cryptocurrencies that are shaping the financial landscape.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=100&h=60&fit=crop", author: "Sarah Lee", categories: ["Fintech"], status: 'scheduled', publishDate: "2025-03-10", views: 0 },
                    { id: 5, title: "Why You Need a Financial Advisor", excerpt: "Discover the benefits of hiring a professional financial advisor to manage your wealth and investments.", image: null, author: "David Brown", categories: ["Finance", "Advice"], status: 'trashed', publishDate: "2024-12-20", views: 450 }
                ];
                setPosts(initialPosts);
                localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && posts.length > 0) {
            localStorage.setItem('blogPosts', JSON.stringify(posts));
        }
    }, [posts]);

    const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50">Published</span>;
            case 'draft': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">Draft</span>;
            case 'scheduled': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">Scheduled</span>;
            case 'trashed': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50">Trashed</span>;
            default: return null;
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedPosts(filteredPosts.map(p => p.id));
        } else {
            setSelectedPosts([]);
        }
    };

    const handleSelectPost = (id: number) => {
        if (selectedPosts.includes(id)) {
            setSelectedPosts(selectedPosts.filter(pId => pId !== id));
        } else {
            setSelectedPosts([...selectedPosts, id]);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Move this post to trash?')) {
            setPosts(posts.map(p => p.id === id ? { ...p, status: 'trashed' } : p));
            showNotification('Post moved to trash', 'info');
        }
    };

    const handleRestore = (id: number) => {
        setPosts(posts.map(p => p.id === id ? { ...p, status: 'draft' } : p));
        showNotification('Post restored to draft', 'success');
    };

    const handleBulkDelete = () => {
        if (confirm(`Move ${selectedPosts.length} posts to trash?`)) {
            setPosts(posts.map(p => selectedPosts.includes(p.id) ? { ...p, status: 'trashed' } : p));
            setSelectedPosts([]);
            showNotification('Selected posts moved to trash', 'info');
        }
    };

    const handleOpenModal = (post?: BlogPost) => {
        if (post) {
            setIsEditing(true);
            setCurrentPost(post);
        } else {
            setIsEditing(false);
            setCurrentPost({
                id: 0,
                title: '',
                excerpt: '',
                image: null,
                author: '',
                categories: [],
                status: 'draft',
                publishDate: '',
                views: 0
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
            setPosts(posts.map(p => p.id === currentPost.id ? currentPost : p));
            showNotification('Post updated successfully', 'success');
        } else {
            const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
            setPosts([...posts, { ...currentPost, id: newId }]);
            showNotification('New post created successfully', 'success');
        }
        setIsModalOpen(false);
    };


    const filteredPosts = posts.filter(p => {
        if (currentTab !== 'all' && p.status !== currentTab) return false;
        if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const stats = {
        total: posts.length,
        published: posts.filter(p => p.status === 'published').length,
        draft: posts.filter(p => p.status === 'draft').length,
        scheduled: posts.filter(p => p.status === 'scheduled').length
    };

    return (
        <div className="w-full p-6 font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                        <i className="fas fa-newspaper text-primary"></i> Blog Posts Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage all your blog posts, published content, drafts, and scheduled posts in one place.</p>
                </div>
                <Link
                    href="/pages/create-blog-post"
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> New Post
                </Link>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setCurrentTab('all')}>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
                        <i className="fas fa-list"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Posts</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setCurrentTab('published')}>
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xl">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.published}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Published</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setCurrentTab('draft')}>
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center text-xl">
                        <i className="fas fa-edit"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.draft}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Drafts</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setCurrentTab('scheduled')}>
                    <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xl">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.scheduled}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Scheduled</div>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto transition-colors">
                    {['all', 'published', 'draft', 'scheduled', 'trashed'].map(tab => (
                        <button
                            key={tab}
                            className={`px-6 py-4 font-semibold text-sm capitalize whitespace-nowrap transition-colors border-b-2 ${currentTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                            onClick={() => setCurrentTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {selectedPosts.length > 0 && (
                            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800/50">
                                <span className="text-sm font-semibold">{selectedPosts.length} selected</span>
                                <button onClick={handleBulkDelete} className="text-xs hover:underline ml-2 text-red-600 dark:text-red-400">Delete</button>
                            </div>
                        )}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 text-xs"></i>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider transition-colors">
                                <th className="p-4 border-b border-gray-200 dark:border-gray-700 w-10">
                                    <input type="checkbox" className="rounded text-primary focus:ring-primary bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700" onChange={handleSelectAll} checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0} />
                                </th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700 w-20">Image</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Title & Excerpt</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700 w-32">Status</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700 w-32">Author</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700 w-32">Date</th>
                                <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700 text-right w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map(post => (
                                    <tr key={post.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 ${selectedPosts.includes(post.id) ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="rounded text-primary focus:ring-primary bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                                                checked={selectedPosts.includes(post.id)}
                                                onChange={() => handleSelectPost(post.id)}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="w-16 h-10 rounded border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors">
                                                {post.image ? (
                                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <i className="fas fa-image text-gray-400 dark:text-gray-500"></i>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-semibold text-gray-900 dark:text-white mb-0.5 line-clamp-1">{post.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{post.excerpt}</div>
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {post.categories.map((cat, idx) => (
                                                    <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded border border-blue-100 dark:border-blue-800/50 transition-colors">{cat}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {getStatusBadge(post.status)}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                            {post.author}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                            {post.publishDate || '-'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {post.status === 'trashed' ? (
                                                    <button onClick={() => handleRestore(post.id)} className="w-8 h-8 rounded bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition-colors" title="Restore">
                                                        <i className="fas fa-undo text-xs"></i>
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleOpenModal(post)}
                                                            className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-edit text-xs"></i>
                                                        </button>
                                                        <button onClick={() => handleDelete(post.id)} className="w-8 h-8 rounded bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors" title="Trash">
                                                            <i className="fas fa-trash-alt text-xs"></i>
                                                        </button>
                                                    </>

                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-500 dark:text-gray-400">
                                        <i className="far fa-newspaper text-4xl mb-3 block text-gray-300 dark:text-gray-600"></i>
                                        <p>No posts found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
                            <h2 className="text-lg font-semibold dark:text-white">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Post Title *</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="Enter post title"
                                    required
                                    value={currentPost.title}
                                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Excerpt / Summary *</label>
                                <textarea
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    rows={3}
                                    placeholder="Brief summary of the post"
                                    required
                                    value={currentPost.excerpt}
                                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Author *</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        required
                                        value={currentPost.author}
                                        onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Status</label>
                                    <select
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        value={currentPost.status}
                                        onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value as any })}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="scheduled">Scheduled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Categories (comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        placeholder="Finance, Tax, Tech"
                                        value={currentPost.categories.join(', ')}
                                        onChange={(e) => setCurrentPost({ ...currentPost, categories: e.target.value.split(',').map(c => c.trim()).filter(c => c) })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Publish Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        value={currentPost.publishDate}
                                        onChange={(e) => setCurrentPost({ ...currentPost, publishDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Featured Image URL</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="https://example.com/image.jpg"
                                    value={currentPost.image || ''}
                                    onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value || null })}
                                />
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
                                    {isEditing ? 'Update Post' : 'Create Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {
                notification && (
                    <div className={`fixed top-5 right-5 z-[1001] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-white transform transition-all duration-500 ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
                        <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : notification.type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}`}></i>
                        <span className="font-semibold">{notification.message}</span>
                    </div>
                )
            }
        </div >
    );
}

