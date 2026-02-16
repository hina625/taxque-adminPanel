"use client";

import { useState, useEffect } from 'react';

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
            case 'published': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Published</span>;
            case 'draft': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Draft</span>;
            case 'scheduled': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">Scheduled</span>;
            case 'trashed': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Trashed</span>;
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
        <div className="w-full p-6 font-sans text-gray-900 bg-white min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <i className="fas fa-newspaper text-primary"></i> Blog Posts Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all your blog posts, published content, drafts, and scheduled posts in one place.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2">
                    <i className="fas fa-plus"></i> New Post
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentTab('all')}>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                        <i className="fas fa-list"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-500">Total Posts</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentTab('published')}>
                    <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-xl">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
                        <div className="text-sm text-gray-500">Published</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentTab('draft')}>
                    <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-xl">
                        <i className="fas fa-edit"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
                        <div className="text-sm text-gray-500">Drafts</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentTab('scheduled')}>
                    <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.scheduled}</div>
                        <div className="text-sm text-gray-500">Scheduled</div>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 overflow-x-auto">
                    {['all', 'published', 'draft', 'scheduled', 'trashed'].map(tab => (
                        <button
                            key={tab}
                            className={`px-6 py-4 font-semibold text-sm capitalize whitespace-nowrap transition-colors border-b-2 ${currentTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setCurrentTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="p-5 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {selectedPosts.length > 0 && (
                            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
                                <span className="text-sm font-semibold">{selectedPosts.length} selected</span>
                                <button onClick={handleBulkDelete} className="text-xs hover:underline ml-2 text-red-600">Delete</button>
                            </div>
                        )}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search absolute left-3 top-2.5 text-gray-400 text-xs"></i>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-gray-700 text-xs uppercase tracking-wider">
                                <th className="p-4 border-b w-10">
                                    <input type="checkbox" className="rounded text-primary focus:ring-primary" onChange={handleSelectAll} checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0} />
                                </th>
                                <th className="p-4 font-semibold border-b w-20">Image</th>
                                <th className="p-4 font-semibold border-b">Title & Excerpt</th>
                                <th className="p-4 font-semibold border-b w-32">Status</th>
                                <th className="p-4 font-semibold border-b w-32">Author</th>
                                <th className="p-4 font-semibold border-b w-32">Date</th>
                                <th className="p-4 font-semibold border-b text-right w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map(post => (
                                    <tr key={post.id} className={`hover:bg-gray-50 transition-colors border-b last:border-0 ${selectedPosts.includes(post.id) ? 'bg-blue-50/50' : ''}`}>
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="rounded text-primary focus:ring-primary"
                                                checked={selectedPosts.includes(post.id)}
                                                onChange={() => handleSelectPost(post.id)}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="w-16 h-10 rounded border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                                                {post.image ? (
                                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <i className="fas fa-image text-gray-400"></i>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-semibold text-gray-900 mb-0.5 line-clamp-1">{post.title}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{post.excerpt}</div>
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {post.categories.map((cat, idx) => (
                                                    <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">{cat}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {getStatusBadge(post.status)}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {post.author}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
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
                                                        <button className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors" title="Edit">
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
                                    <td colSpan={7} className="p-12 text-center text-gray-500">
                                        <i className="far fa-newspaper text-4xl mb-3 block text-gray-300"></i>
                                        <p>No posts found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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
