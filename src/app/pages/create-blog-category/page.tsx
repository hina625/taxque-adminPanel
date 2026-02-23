"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';


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

export default function CreateBlogCategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(false);
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
        setIsModalOpen(true);
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
        <div className="w-full p-6 font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Blog Categories</h1>
                    <p className="text-gray-500 dark:text-gray-400">Create, edit, and manage your blog categories with images and SEO metadata</p>
                </div>
                <button
                    onClick={() => { handleReset(); setIsModalOpen(true); }}
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2 h-fit w-fit"
                >
                    <i className="fas fa-plus"></i> New Category
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
                {/* List Section */}
                <div className="h-fit">

                    <div className="pb-4 border-b border-gray-200 dark:border-gray-700 mb-6 flex justify-between items-center flex-wrap gap-4 transition-colors">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                            <i className="fas fa-list text-primary"></i> Category List
                        </h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
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
                                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Image</th>
                                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Name & Description</th>
                                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Slug</th>
                                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Status</th>
                                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map(cat => (
                                        <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0">
                                            <td className="p-4">
                                                <div className="w-[50px] h-[50px] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors">
                                                    {cat.image ? (
                                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <i className="fas fa-image text-gray-400 dark:text-gray-500"></i>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-semibold text-gray-900 dark:text-white mb-0.5">{cat.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{cat.description}</div>
                                                {cat.parentId && (
                                                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded transition-colors">
                                                        Parent: {categories.find(c => c.id === cat.parentId)?.name || 'Unknown'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{cat.slug}</td>
                                            <td className="p-4">
                                                {cat.status ? (
                                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50 text-xs rounded-full font-semibold">Active</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 text-xs rounded-full font-semibold">Inactive</span>
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
                                        <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                            <i className="fas fa-folder-open text-4xl mb-3 block text-gray-300 dark:text-gray-600"></i>
                                            <p>No categories found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
                            <h2 className="text-lg font-semibold dark:text-white">{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
                            <button
                                onClick={handleReset}
                                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-hide" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Category Name *</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        placeholder="Enter category name"
                                        required
                                        value={currentCategory.name}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">URL Slug *</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        placeholder="category-slug"
                                        required
                                        value={currentCategory.slug}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, slug: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    rows={3}
                                    placeholder="Enter category description"
                                    value={currentCategory.description}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Parent Category</label>
                                    <select
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        value={currentCategory.parentId || ''}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, parentId: e.target.value ? Number(e.target.value) : null })}
                                    >
                                        <option value="">None (Top Level)</option>
                                        {categories.filter(c => c.id !== currentCategory.id).map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Status</label>
                                    <div className="flex items-center gap-3 py-2">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={currentCategory.status}
                                                onChange={(e) => setCurrentCategory({ ...currentCategory, status: e.target.checked })}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                        <span className="text-xs font-medium text-slate-600 dark:text-gray-400">{currentCategory.status ? 'Active' : 'Inactive'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="https://example.com/image.jpg"
                                    value={currentCategory.image || ''}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, image: e.target.value || null })}
                                />
                            </div>

                            <div className="p-4 bg-slate-50 dark:bg-gray-800/50 rounded-xl space-y-3">
                                <h4 className="text-sm font-semibold dark:text-white border-b dark:border-gray-700 pb-2 flex items-center gap-2">
                                    <i className="fas fa-search text-primary"></i> SEO Metadata
                                </h4>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Meta Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        placeholder="SEO Title"
                                        value={currentCategory.metaTitle}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, metaTitle: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Meta Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                        rows={2}
                                        placeholder="SEO Description"
                                        value={currentCategory.metaDescription}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, metaDescription: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-dark shadow-sm transition-all"
                                >
                                    {isEditing ? 'Update Category' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

