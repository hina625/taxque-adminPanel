"use client";

import React, { useState } from 'react';
import {
    Plus,
    Calculator,
    CheckCircle,
    Users,
    ChartLineUp,
    CurrencyInr,
    Receipt,
    TrendUp,
    Tag,
    Eye,
    PencilSimple,
    ChartBar,
    ArrowLeft,
    Sparkle,
    MagicWand,
    ListBullets,
    Link as LinkIcon,
    TextB,
    TextItalic,
    PencilCircle,
    X
} from '@phosphor-icons/react';

// --- Types ---

interface Tool {
    id: number;
    name: string;
    description: string;
    icon: React.ElementType;
    iconBg: string; // Tailwind class
    iconColor: string; // Tailwind class
    category: string;
    views: string;
    slug: string;
    isActive: boolean;
    metaDescription?: string;
    instructions?: string;
    benefits?: string;
    componentPath?: string;
    apiEndpoint?: string;
}

// --- Mock Data ---

const INITIAL_TOOLS: Tool[] = [
    {
        id: 1,
        name: "Income Tax Calculator",
        description: "Advanced calculator for Old vs New Regime comparison for FY 2024-25.",
        icon: CurrencyInr,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        category: "Finance",
        views: "1.2k",
        slug: "income-tax-calculator",
        isActive: true,
        metaDescription: "Calculate your income tax for FY 2024-25 with our advanced calculator.",
        instructions: "1. Enter your Gross Annual Income.\n2. Select your age bracket.\n3. Click Calculate to see the tax breakdown.",
        benefits: "Accurate calculations based on latest Finance Act.\nComparison table for Old vs New Regime.\nFree PDF Download option available.",
        componentPath: "src/views/tools/IncomeTax.tsx",
        apiEndpoint: "/api/v1/tools/income-tax"
    },
    {
        id: 2,
        name: "GST Calculator",
        description: "Simple tool to calculate exclusive and inclusive GST amounts for billing.",
        icon: Receipt,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        category: "Tax",
        views: "850",
        slug: "gst-calculator",
        isActive: true,
        metaDescription: "Easily calculate GST online.",
        instructions: "1. Enter amount.\n2. Select GST rate.\n3. Choose Inclusive/Exclusive.",
        benefits: "Instant results.\nSupports all GST slabs.",
        componentPath: "src/views/tools/GSTCalc.tsx",
        apiEndpoint: "/api/v1/tools/gst"
    },
    {
        id: 3,
        name: "SIP Return Calculator",
        description: "Calculate mutual fund returns based on monthly investment and duration.",
        icon: TrendUp,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-700",
        category: "Investment",
        views: "600",
        slug: "sip-return-calculator",
        isActive: true,
        metaDescription: "Plan your mutual fund investments with our SIP calculator.",
        instructions: "1. Enter monthly investment amount.\n2. Enter expected return rate.\n3. Enter duration in years.",
        benefits: "Visualise growth with charts.\nCompare different scenarios.",
        componentPath: "src/views/tools/SIPCalc.tsx",
        apiEndpoint: "/api/v1/tools/sip"
    }
];

// --- Component ---

export default function ToolsPage() {
    const [tools, setTools] = useState<Tool[]>(INITIAL_TOOLS);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [currentTool, setCurrentTool] = useState<Partial<Tool>>({
        name: '',
        slug: '',
        metaDescription: '',
        instructions: '',
        benefits: '',
        componentPath: '',
        apiEndpoint: ''
    });

    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

    // --- Handlers ---

    const showNotification = (message: string, type: 'success' | 'info' = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const openEditor = (tool?: Tool) => {
        if (tool) {
            setIsEditing(true);
            setCurrentTool({ ...tool });
        } else {
            setIsEditing(false);
            setCurrentTool({
                name: '',
                slug: '',
                metaDescription: '',
                instructions: '',
                benefits: '',
                componentPath: 'src/views/tools/',
                apiEndpoint: '/api/v1/tools/'
            });
        }
        setIsDrawerOpen(true);
        // Prevent body scroll would be handled by a proper Modal/Drawer component usually
    };

    const closeEditor = () => {
        setIsDrawerOpen(false);
    };

    const handleSave = () => {
        if (!currentTool.name) {
            alert("Tool Name is required");
            return;
        }

        if (isEditing && currentTool.id) {
            setTools(prev => prev.map(t => t.id === currentTool.id ? { ...t, ...currentTool } as Tool : t));
            showNotification('Tool updated successfully', 'success');
        } else {
            const newId = Math.max(...tools.map(t => t.id), 0) + 1;
            const newTool: Tool = {
                ...currentTool,
                id: newId,
                description: currentTool.metaDescription || "New Tool",
                icon: Calculator, // Default icon
                iconBg: "bg-slate-100",
                iconColor: "text-slate-600",
                category: "General",
                views: "0",
                isActive: true
            } as Tool;
            setTools(prev => [...prev, newTool]);
            showNotification('New tool created successfully', 'success');
        }
        closeEditor();
    };

    const toggleToolStatus = (id: number) => {
        setTools(prev => prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
    };

    const handleAutoGenerate = (field: string) => {
        showNotification(`Generating content for ${field}...`, 'info');
        // Simulation
        setTimeout(() => {
            if (field === 'seo') {
                setCurrentTool(prev => ({ ...prev, metaDescription: `Calculate your ${prev.name || 'financial'} needs instantly with accurate results. Optimized for 2024.` }));
            } else if (field === 'steps') {
                setCurrentTool(prev => ({ ...prev, instructions: `1. Input your data.\n2. Review the settings.\n3. Click Calculate.` }));
            } else if (field === 'content') {
                setCurrentTool(prev => ({ ...prev, benefits: `Why use this tool?\n- Fast and accurate.\n- Free to use.\n- Mobile friendly.` }));
            }
            showNotification('Content generated!', 'success');
        }, 1000);
    };

    const handleRichTextAction = (action: string) => {
        showNotification(`${action} formatting applied`, 'info');
    };

    return (
        <div className={`min-h-screen bg-[#f1f5f9] p-8 font-sans text-slate-900 relative ${isDrawerOpen ? 'overflow-hidden h-screen' : ''}`}>
            <div className="max-w-[1400px] mx-auto bg-white rounded-2xl min-h-[85vh] border border-slate-200 flex flex-col overflow-hidden relative shadow-sm">

                {/* Header */}
                <header className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">Tools Management</h2>
                        <p className="text-sm text-slate-500 font-medium">Configure client calculators, generators, and SEO content.</p>
                    </div>
                    <button onClick={() => openEditor()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-sm active:scale-95">
                        <Plus weight="bold" size={18} /> Add New Tool
                    </button>
                </header>

                {/* Content */}
                <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center text-2xl">
                                <Calculator weight="bold" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-slate-900 leading-none mb-1">{tools.length}</h4>
                                <span className="text-sm font-medium text-slate-500">Total Tools</span>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-2xl">
                                <CheckCircle weight="bold" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-slate-900 leading-none mb-1">{tools.filter(t => t.isActive).length}</h4>
                                <span className="text-sm font-medium text-slate-500">Active</span>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center text-2xl">
                                <Users weight="bold" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-slate-900 leading-none mb-1">2.4k</h4>
                                <span className="text-sm font-medium text-slate-500">Monthly Users</span>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-2xl">
                                <ChartLineUp weight="bold" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-slate-900 leading-none mb-1">GST</h4>
                                <span className="text-sm font-medium text-slate-500">Top Tool</span>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tools.map(tool => (
                            <div key={tool.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 transition-all flex flex-col h-full group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-14 h-14 ${tool.iconBg} ${tool.iconColor} rounded-xl flex items-center justify-center text-3xl`}>
                                        <tool.icon weight="bold" />
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={tool.isActive} onChange={() => toggleToolStatus(tool.id)} />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                                    <p className="text-sm text-slate-500 mb-5 leading-relaxed line-clamp-2">{tool.description}</p>

                                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                            <Tag weight="fill" /> {tool.category}
                                        </span>
                                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                            <Eye weight="fill" /> {tool.views} Views
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                                    <span className="text-xs text-slate-400 font-medium font-mono truncate max-w-[120px]">/tools/{tool.slug}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditor(tool)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
                                            <PencilSimple weight="bold" />
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
                                            <ChartBar weight="bold" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Drawer (Absolute positioned overlay) */}
                <div
                    className={`absolute inset-0 z-50 transform transition-transform duration-500 ease-in-out flex justify-end ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Backdrop (Only visible/clickable when open) */}
                    <div
                        className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={closeEditor}
                    ></div>

                    <div className="w-full max-w-4xl bg-[#f8fafc] h-full shadow-2xl flex flex-col relative z-10 translate-x-0">
                        <div className="bg-white px-8 py-5 border-b border-slate-200 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-4">
                                <button onClick={closeEditor} className="text-slate-500 hover:text-slate-900 transition-colors">
                                    <ArrowLeft weight="bold" size={24} />
                                </button>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 leading-none">{isEditing ? 'Edit Tool' : 'New Tool'}</h2>
                                    <span className="text-xs text-slate-500 font-medium">Configure tool settings and content</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200">Preview</button>
                                <button onClick={handleSave} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors active:scale-95">Save & Publish</button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-6">

                            {/* 1. Basic Info */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex justify-between items-center pb-3 mb-5 border-b border-slate-100">
                                    <h3 className="text-base font-bold text-slate-800">Basic Information</h3>
                                    <button onClick={() => handleAutoGenerate('seo')} className="text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 shadow-sm shadow-purple-200">
                                        <Sparkle weight="bold" /> Auto-Generate SEO
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Tool Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={currentTool.name}
                                            onChange={(e) => setCurrentTool({ ...currentTool, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">URL Slug</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={currentTool.slug}
                                            onChange={(e) => setCurrentTool({ ...currentTool, slug: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Meta Description</label>
                                    <textarea
                                        rows={2}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                                        placeholder="SEO description for search engines..."
                                        value={currentTool.metaDescription}
                                        onChange={(e) => setCurrentTool({ ...currentTool, metaDescription: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            {/* 2. Instructions */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex justify-between items-center pb-3 mb-5 border-b border-slate-100">
                                    <h3 className="text-base font-bold text-slate-800">How to Use (Instructions)</h3>
                                    <button onClick={() => handleAutoGenerate('steps')} className="text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 shadow-sm shadow-purple-200">
                                        <MagicWand weight="bold" /> Generate Steps
                                    </button>
                                </div>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                                        <button onClick={() => handleRichTextAction('Bold')} className="p-1.5 hover:bg-white rounded text-slate-600 font-bold border border-transparent hover:border-slate-200 text-xs"><TextB size={16} /></button>
                                        <button onClick={() => handleRichTextAction('Italic')} className="p-1.5 hover:bg-white rounded text-slate-600 font-bold border border-transparent hover:border-slate-200 text-xs"><TextItalic size={16} /></button>
                                        <button onClick={() => handleRichTextAction('List')} className="p-1.5 hover:bg-white rounded text-slate-600 font-bold border border-transparent hover:border-slate-200 text-xs"><ListBullets size={16} /></button>
                                        <button onClick={() => handleRichTextAction('Link')} className="p-1.5 hover:bg-white rounded text-slate-600 font-bold border border-transparent hover:border-slate-200 text-xs"><LinkIcon size={16} /></button>
                                    </div>
                                    <textarea
                                        rows={6}
                                        className="w-full px-4 py-3 text-sm font-medium focus:outline-none resize-none block"
                                        placeholder="1. Enter your Gross Annual Income..."
                                        value={currentTool.instructions}
                                        onChange={(e) => setCurrentTool({ ...currentTool, instructions: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            {/* 3. Benefits */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex justify-between items-center pb-3 mb-5 border-b border-slate-100">
                                    <h3 className="text-base font-bold text-slate-800">Benefits & Features</h3>
                                    <button onClick={() => handleAutoGenerate('content')} className="text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 shadow-sm shadow-purple-200">
                                        <PencilCircle weight="bold" /> Write Content
                                    </button>
                                </div>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                                        <button onClick={() => handleRichTextAction('Bold')} className="p-1.5 hover:bg-white rounded text-slate-600 font-bold border border-transparent hover:border-slate-200 text-xs"><TextB size={16} /></button>
                                        <button onClick={() => handleRichTextAction('Italic')} className="p-1.5 hover:bg-white rounded text-slate-600 font-bold border border-transparent hover:border-slate-200 text-xs"><TextItalic size={16} /></button>
                                    </div>
                                    <textarea
                                        rows={8}
                                        className="w-full px-4 py-3 text-sm font-medium focus:outline-none resize-none block"
                                        placeholder="Why use this tool?..."
                                        value={currentTool.benefits}
                                        onChange={(e) => setCurrentTool({ ...currentTool, benefits: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            {/* 4. Dev Config */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex justify-between items-center pb-3 mb-5 border-b border-slate-100">
                                    <h3 className="text-base font-bold text-slate-800">Developer Configuration</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Component Path</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium font-mono text-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
                                            value={currentTool.componentPath}
                                            onChange={(e) => setCurrentTool({ ...currentTool, componentPath: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">API Endpoint</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium font-mono text-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
                                            value={currentTool.apiEndpoint}
                                            onChange={(e) => setCurrentTool({ ...currentTool, apiEndpoint: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Notifications */}
                {notification && (
                    <div className="fixed bottom-6 right-6 z-[60] animate-slide-up">
                        <div className={`px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'}`}>
                            {notification.type === 'success' ? <CheckCircle weight="fill" size={20} className="text-emerald-200" /> : <Eye weight="fill" size={20} className="text-blue-200" />}
                            <span className="font-bold text-sm">{notification.message}</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
