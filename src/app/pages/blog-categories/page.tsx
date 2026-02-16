"use client";

import { useState, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    parentId: number | null;
    status: boolean;
    image: string | null;
    metaTitle: string;
    metaDescription: string;
}

export default function BlogCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category>({
        id: 0,
        name: '',
        slug: '',
        description: '',
        parentId: null,
        status: true,
        image: null,
        metaTitle: '',
        metaDescription: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Mock initial data
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('blogCategories');
            if (stored) {
                setCategories(JSON.parse(stored));
            } else {
                const initialCategories = [
                    { id: 1, name: "Technology", slug: "technology", description: "All things tech.", parentId: null, status: true, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&h=200&fit=crop", metaTitle: "Tech News", metaDescription: "Latest technology updates." },
                    { id: 2, name: "Lifestyle", slug: "lifestyle", description: "Living your best life.", parentId: null, status: true, image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=200&h=200&fit=crop", metaTitle: "Lifestyle Blog", metaDescription: "Tips for a better lifestyle." },
                    { id: 3, name: "Business", slug: "business", description: "Corporate and finance.", parentId: null, status: true, image: null, metaTitle: "Business Insights", metaDescription: "Analysis of the business world." },
                    { id: 4, name: "Health & Wellness", slug: "health-wellness", description: "Stay fit and healthy.", parentId: null, status: false, image: null, metaTitle: "Health Guide", metaDescription: "Your guide to health." },
                    { id: 5, name: "Web Development", slug: "web-development", description: "Coding and design.", parentId: 1, status: true, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&h=200&fit=crop", metaTitle: "Web Dev Tutorials", metaDescription: "Learn web development." }
                ];
                setCategories(initialCategories);
                localStorage.setItem('blogCategories', JSON.stringify(initialCategories));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && categories.length > 0) {
            localStorage.setItem('blogCategories', JSON.stringify(categories));
        }
    }, [categories]);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleReset = () => {
        setIsEditing(false);
        setCurrentCategory({
            id: 0,
            name: '',
            slug: '',
            description: '',
            parentId: null,
            status: true,
            image: null,
            metaTitle: '',
            metaDescription: ''
        });
    };

    const handleEdit = (category: Category) => {
        setIsEditing(true);
        setCurrentCategory(category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(c => c.id !== id));
            showNotification('Category deleted successfully', 'success');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            setCategories(categories.map(c => c.id === currentCategory.id ? currentCategory : c));
            showNotification('Category updated successfully', 'success');
        } else {
            const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
            setCategories([...categories, { ...currentCategory, id: newId }]);
            showNotification('New category created successfully', 'success');
        }
        handleReset();
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full p-6 font-sans text-gray-900 bg-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Blog Categories</h1>
                <p className="text-gray-500">Create, edit, and manage your blog categories with images and SEO metadata</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Form Section */}
                <div className="h-fit border-r border-gray-200 pr-8">
                    <div className="pb-4 border-b border-gray-200 mb-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            {isEditing ? <><i className="fas fa-edit text-primary"></i> Edit Category</> : <><i className="fas fa-plus-circle text-primary"></i> Add New Category</>}
                        </h3>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block font-semibold mb-2 text-sm text-gray-700">Category Name *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="Enter category name"
                                        required
                                        value={currentCategory.name}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2 text-sm text-gray-700">URL Slug *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="category-slug"
                                        required
                                        value={currentCategory.slug}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, slug: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block font-semibold mb-2 text-sm text-gray-700">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    rows={3}
                                    placeholder="Enter a brief description of this category"
                                    value={currentCategory.description}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block font-semibold mb-2 text-sm text-gray-700">Parent Category</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        value={currentCategory.parentId || ''}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, parentId: e.target.value ? Number(e.target.value) : null })}
                                    >
                                        <option value="">None (Top Level Category)</option>
                                        {categories.filter(c => c.id !== currentCategory.id).map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2 text-sm text-gray-700">Status</label>
                                    <div className="flex items-center gap-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={currentCategory.status}
                                                onChange={(e) => setCurrentCategory({ ...currentCategory, status: e.target.checked })}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                        <span className="text-sm font-medium text-gray-900">{currentCategory.status ? 'Active' : 'Inactive'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block font-semibold mb-2 text-sm text-gray-700">Category Image URL</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none mb-2"
                                    placeholder="Image URL"
                                    value={currentCategory.image || ''}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, image: e.target.value || null })}
                                />
                                {currentCategory.image && (
                                    <div className="mt-2 text-center">
                                        <img src={currentCategory.image} alt="Preview" className="max-h-[150px] mx-auto rounded border border-gray-200" />
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary">
                                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><i className="fas fa-search text-primary"></i> SEO Meta Data</h4>
                                <div className="mb-3">
                                    <label className="block font-semibold mb-1 text-sm text-gray-700">Meta Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="Title for search engines"
                                        value={currentCategory.metaTitle}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, metaTitle: e.target.value })}
                                    />
                                    <div className="text-right text-xs text-gray-500 mt-1">{currentCategory.metaTitle.length}/60 characters</div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1 text-sm text-gray-700">Meta Description</label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        rows={2}
                                        placeholder="Description for search engines"
                                        value={currentCategory.metaDescription}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, metaDescription: e.target.value })}
                                    ></textarea>
                                    <div className="text-right text-xs text-gray-500 mt-1">{currentCategory.metaDescription.length}/160 characters</div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                {isEditing && (
                                    <button type="button" onClick={handleReset} className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors">
                                        Cancel
                                    </button>
                                )}
                                <button type="submit" className={`flex-1 py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${!isEditing ? 'w-full' : ''}`}>
                                    {isEditing ? <><i className="fas fa-save"></i> Update Category</> : <><i className="fas fa-plus-circle"></i> Create Category</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="h-fit">
                    <div className="pb-4 border-b border-gray-200 mb-6 flex justify-between items-center flex-wrap gap-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="fas fa-list text-primary"></i> Category List
                        </h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
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
                                    <th className="p-4 font-semibold border-b">Image</th>
                                    <th className="p-4 font-semibold border-b">Name & Description</th>
                                    <th className="p-4 font-semibold border-b">Slug</th>
                                    <th className="p-4 font-semibold border-b">Status</th>
                                    <th className="p-4 font-semibold border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map(cat => (
                                        <tr key={cat.id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                                            <td className="p-4">
                                                <div className="w-[50px] h-[50px] rounded-lg border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                                                    {cat.image ? (
                                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <i className="fas fa-image text-gray-400"></i>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-semibold text-gray-900 mb-0.5">{cat.name}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-[150px]">{cat.description}</div>
                                                {cat.parentId && (
                                                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                                        Parent: {categories.find(c => c.id === cat.parentId)?.name || 'Unknown'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">{cat.slug}</td>
                                            <td className="p-4">
                                                {cat.status ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 border border-green-200 text-xs rounded-full font-semibold">Active</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-red-100 text-red-700 border border-red-200 text-xs rounded-full font-semibold">Inactive</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(cat)} className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors" title="Edit">
                                                        <i className="fas fa-edit text-xs"></i>
                                                    </button>
                                                    <button onClick={() => handleDelete(cat.id)} className="w-8 h-8 rounded bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors" title="Delete">
                                                        <i className="fas fa-trash-alt text-xs"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            <i className="fas fa-folder-open text-4xl mb-3 block text-gray-300"></i>
                                            <p>No categories found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-5 right-5 z-[1001] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-white transform transition-all duration-500 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                    <span className="font-semibold">{notification.message}</span>
                </div>
            )}
        </div>
    );
}
