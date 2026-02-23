"use client";

import React, { useState } from "react";
import { Plus, Eye, Pencil, Trash } from "@phosphor-icons/react";
import Link from 'next/link';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([
        { id: 1, title: 'How to Scale Your React Apps', author: 'John Doe', date: '2025-10-15', status: 'Published', active: true },
        { id: 2, title: 'Tips for Efficient Recruitment', author: 'Jane Smith', date: '2025-11-02', status: 'Draft', active: false },
    ]);

    const toggleStatus = (id: number) => {
        setBlogs(blogs.map(blog =>
            blog.id === id ? { ...blog, active: !blog.active, status: !blog.active ? 'Published' : 'Draft' } : blog
        ));
    };


    return (
        <div className="w-full p-6 font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Blogs</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your blog posts and articles</p>
                </div>
                <Link href="/pages/create-blog-post" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2 w-fit">
                    <Plus size={20} weight="bold" /> New Post
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                <div className="grid grid-cols-[3fr_1.5fr_1.5fr_1fr_100px] p-4 bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400 text-sm">

                    <div>Title</div>
                    <div>Author</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>
                <div className="divide-y dark:divide-gray-700">
                    {blogs.map(blog => (
                        <div key={blog.id} className="grid grid-cols-[3fr_1.5fr_1.5fr_1fr_100px] p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/30 text-sm transition-colors">
                            <div className="font-medium text-gray-900 dark:text-white">{blog.title}</div>
                            <div className="text-gray-600 dark:text-gray-400">{blog.author}</div>
                            <div className="text-gray-600 dark:text-gray-400">{blog.date}</div>
                            <div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={blog.active}
                                        onChange={() => toggleStatus(blog.id)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    <span className="ml-3 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">{blog.status}</span>
                                </label>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1 hover:text-primary transition-colors text-gray-500"><Pencil size={18} /></button>
                                <button className="p-1 hover:text-red-600 transition-colors text-gray-500"><Trash size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
