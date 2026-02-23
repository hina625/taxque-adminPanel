'use client';

import React, { useState } from 'react';
import {
    FileEdit,
    Info,
    Image as ImageIcon,
    Search,
    Save,
    Eye,
    ArrowLeft,
    X,
    Upload,
    RefreshCw
} from 'lucide-react';

export default function CreateBlogPostPage() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        categories: [] as string[],
        tags: [] as string[],
        status: 'draft',
        visibility: 'public',
        author: 'current_user'
    });

    const [tagInput, setTagInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from title if slug is empty or matches previous auto-slug
            if (name === 'title' && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))) {
                newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            return newData;
        });
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 lg:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <FileEdit className="w-6 h-6 text-indigo-600" /> Create New Blog Post
                        </h1>
                        <p className="text-slate-500 dark:text-gray-400 mt-1">Create and publish engaging blog content with SEO optimization</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-slate-300 dark:border-gray-700 rounded-lg text-slate-700 dark:text-gray-300 font-medium bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                            <Eye className="w-4 h-4 inline-block mr-2" /> Preview
                        </button>
                        <button className="px-6 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm">
                            <Save className="w-4 h-4 inline-block mr-2" /> Publish
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Post Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Info className="w-5 h-5 text-indigo-600" />
                                    <h3 className="font-semibold text-slate-800 dark:text-white">Post Information</h3>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-gray-700 text-slate-600 dark:text-gray-300">Draft</span>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Post Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter a compelling blog post title"
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    />
                                    <div className="text-right text-xs text-slate-400 dark:text-gray-500">{formData.title.length}/100 characters</div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">URL Slug *</label>
                                    <div className="flex items-center">
                                        <span className="bg-slate-100 dark:bg-gray-800 border border-r-0 border-slate-300 dark:border-gray-700 text-slate-500 dark:text-gray-400 px-3 py-2 rounded-l-lg text-sm transition-colors">/blog/</span>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleInputChange}
                                            placeholder="auto-generated-slug"
                                            className="flex-1 px-4 py-2 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Excerpt / Short Description</label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Brief summary of your blog post (displayed in listings)"
                                        className="w-full px-4 py-3 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                                    ></textarea>
                                    <div className="text-right text-xs text-slate-400 dark:text-gray-500">{formData.excerpt.length}/200 characters</div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Content *</label>
                                    <div className="border border-slate-300 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                                        {/* Mock Toolbar */}
                                        <div className="bg-slate-50 dark:bg-gray-800 border-b border-slate-300 dark:border-gray-700 px-3 py-2 flex items-center gap-2 text-slate-600 dark:text-gray-300">
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-gray-700 rounded font-bold">B</button>
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-gray-700 rounded italic">I</button>
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-gray-700 rounded underline">U</button>
                                            <div className="h-4 w-px bg-slate-300 dark:bg-gray-700 mx-1"></div>
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-gray-700 rounded transition-colors">H1</button>
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-gray-700 rounded transition-colors">H2</button>
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-gray-700 rounded transition-colors">List</button>
                                        </div>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            rows={15}
                                            placeholder="Write your blog post content here..."
                                            className="w-full px-4 py-4 border-none bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:ring-0 outline-none resize-vertical min-h-[300px] transition-colors"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Featured Image</label>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-gray-700 rounded-lg p-8 text-center bg-slate-50 dark:bg-gray-800/50 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all group">
                                        <ImageIcon className="w-10 h-10 text-slate-400 dark:text-gray-500 mx-auto mb-3 group-hover:text-indigo-500 transition-colors" />
                                        <p className="text-sm font-medium text-slate-700 dark:text-gray-300">Click to upload image</p>
                                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 3MB)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden border-l-4 border-l-indigo-600 transition-colors">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 flex items-center gap-2">
                                <Search className="w-5 h-5 text-indigo-600" />
                                <h3 className="font-semibold text-slate-800 dark:text-white">SEO Optimization</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Meta Title</label>
                                    <input
                                        type="text"
                                        name="metaTitle"
                                        value={formData.metaTitle}
                                        onChange={handleInputChange}
                                        placeholder="Title for search engines"
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Meta Description</label>
                                    <textarea
                                        name="metaDescription"
                                        value={formData.metaDescription}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Description for search engines"
                                        className="w-full px-4 py-3 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Settings */}
                    <div className="space-y-8">
                        {/* Publish Settings */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50">
                                <h3 className="font-semibold text-slate-800 dark:text-white">Publish Settings</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Visibility</label>
                                    <select
                                        name="visibility"
                                        value={formData.visibility}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        <option value="password">Password Protected</option>
                                    </select>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-gray-700">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Author</label>
                                    <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-xs transition-colors">
                                            JD
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">John Doe</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400">Administrator</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories & Tags */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50">
                                <h3 className="font-semibold text-slate-800 dark:text-white">Categories & Tags</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Categories</label>
                                    <div className="max-h-40 overflow-y-auto border border-slate-200 dark:border-gray-700 rounded-lg p-3 space-y-2 bg-slate-50 dark:bg-gray-800/30 transition-colors">
                                        {['Technology', 'Business', 'Marketing', 'Design', 'Development'].map(cat => (
                                            <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 text-indigo-600 dark:text-indigo-500 rounded border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-indigo-500" />
                                                <span className="text-sm text-slate-700 dark:text-gray-300">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">Tags</label>
                                    <div className="border border-slate-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {formData.tags.map(tag => (
                                                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-md text-xs font-medium border border-indigo-100 dark:border-indigo-800/50 transition-colors">
                                                    {tag}
                                                    <button onClick={() => removeTag(tag)} className="hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors"><X className="w-3 h-3" /></button>
                                                </span>
                                            ))}
                                        </div>
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleTagKeyDown}
                                            placeholder="Add tag and press Enter"
                                            className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
