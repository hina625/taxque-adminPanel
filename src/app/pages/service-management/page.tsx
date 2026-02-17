"use client";

import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Plus,
    MagnifyingGlass,
    Folder,
    Clock,
    Code,
    ListChecks,
    Question,
    Eye,
    Pencil,
    Trash,
    ArrowLeft,
    DownloadSimple,
    Info,
    CheckCircle,
    Upload,
    Note,
    X,
    PlusCircle,
    Image as ImageIcon,
    ChartLineUp,
    House,
    CaretRight
} from '@phosphor-icons/react';

// --- Types ---

interface Service {
    id: number;
    name: string;
    category: string;
    categoryId: string;
    subCategory: string;
    subCategoryId: string;
    slug: string;
    shortDescription: string;
    descriptionPoints: string[];
    status: 'published' | 'draft';
    featured: boolean;
    popular: boolean;
    processingTime: string;
    serviceCode: string;
    displayOrder: number;
    metaTitle: string;
    metaDescription: string;
    canonicalLink: string;
    image: string | null;
    attributes: string[];
    faqs: string[];
}

interface SubCategory {
    id: number;
    name: string;
}

// --- Constants ---

const INITIAL_SERVICES: Service[] = [
    {
        id: 1,
        name: 'GST Registration',
        category: 'GST Services',
        categoryId: '1',
        subCategory: 'GST Registration',
        subCategoryId: '11',
        slug: 'gst-registration',
        shortDescription: 'Complete GST registration service for your business with expert guidance and fast processing',
        descriptionPoints: ['Complete GST registration assistance', 'Expert guidance throughout', 'Fast processing within 3-5 days'],
        status: 'published',
        featured: true,
        popular: false,
        processingTime: '3-5 Days',
        serviceCode: 'GST-001',
        displayOrder: 1,
        metaTitle: 'GST Registration Service | TaxQue',
        metaDescription: 'Get your business registered for GST quickly and easily with TaxQue professional services',
        canonicalLink: 'https://taxque.com/services/gst-registration',
        image: null,
        attributes: ['Required Documents', 'Service Features'],
        faqs: ['What documents are required for GST registration?', 'How long does the GST registration process take?']
    },
    {
        id: 2,
        name: 'ITR Filing',
        category: 'Income Tax Services',
        categoryId: '2',
        subCategory: 'ITR Filing',
        subCategoryId: '21',
        slug: 'itr-filing',
        shortDescription: 'Professional income tax return filing service with maximum refund guarantee',
        descriptionPoints: ['Expert tax consultants', 'Maximum refund', 'Quick processing'],
        status: 'published',
        featured: false,
        popular: true,
        processingTime: '2-3 Days',
        serviceCode: 'ITR-001',
        displayOrder: 2,
        metaTitle: '',
        metaDescription: '',
        canonicalLink: '',
        image: null,
        attributes: ['Required Documents'],
        faqs: []
    },
    {
        id: 3,
        name: 'Private Limited Company Registration',
        category: 'Business Registration',
        categoryId: '3',
        subCategory: 'Private Limited Company',
        subCategoryId: '31',
        slug: 'private-limited-company',
        shortDescription: 'Register your Private Limited Company with complete compliance support',
        descriptionPoints: ['Complete registration', 'MCA compliance', 'Digital certificates'],
        status: 'draft',
        featured: false,
        popular: false,
        processingTime: '10-15 Days',
        serviceCode: 'PVT-001',
        displayOrder: 3,
        metaTitle: '',
        metaDescription: '',
        canonicalLink: '',
        image: null,
        attributes: [],
        faqs: []
    },
    {
        id: 4,
        name: 'GST Return Filing',
        category: 'GST Services',
        categoryId: '1',
        subCategory: 'GST Return Filing',
        subCategoryId: '12',
        slug: 'gst-return-filing',
        shortDescription: 'Monthly and quarterly GST return filing with accuracy and on-time submission',
        descriptionPoints: ['Monthly filing', 'Quarterly filing', 'Annual return'],
        status: 'published',
        featured: true,
        popular: true,
        processingTime: '1-2 Days',
        serviceCode: 'GST-002',
        displayOrder: 4,
        metaTitle: '',
        metaDescription: '',
        canonicalLink: '',
        image: null,
        attributes: ['Service Features', 'Processing Steps'],
        faqs: []
    },
    {
        id: 5,
        name: 'TDS Return Filing',
        category: 'Income Tax Services',
        categoryId: '2',
        subCategory: 'TDS Return',
        subCategoryId: '23',
        slug: 'tds-return-filing',
        shortDescription: 'Quarterly TDS return filing service for businesses and professionals',
        descriptionPoints: ['Quarterly TDS filing', 'Form 26Q, 24Q', 'Correction support'],
        status: 'draft',
        featured: false,
        popular: false,
        processingTime: '2-3 Days',
        serviceCode: 'TDS-001',
        displayOrder: 5,
        metaTitle: '',
        metaDescription: '',
        canonicalLink: '',
        image: null,
        attributes: [],
        faqs: []
    }
];

const SUB_CATEGORIES: Record<string, SubCategory[]> = {
    '1': [
        { id: 11, name: 'GST Registration' },
        { id: 12, name: 'GST Return Filing' },
        { id: 13, name: 'GST Cancellation' },
        { id: 14, name: 'GST Amendment' }
    ],
    '2': [
        { id: 21, name: 'ITR Filing' },
        { id: 22, name: 'Tax Planning' },
        { id: 23, name: 'TDS Return' },
        { id: 24, name: 'Income Tax Notice' }
    ],
    '3': [
        { id: 31, name: 'Private Limited Company' },
        { id: 32, name: 'LLP Registration' },
        { id: 33, name: 'Partnership Firm' },
        { id: 34, name: 'Sole Proprietorship' }
    ],
    '4': [
        { id: 41, name: 'Annual Compliance' },
        { id: 42, name: 'ROC Compliance' },
        { id: 43, name: 'Statutory Audit' }
    ],
    '5': [
        { id: 51, name: 'Bookkeeping Services' },
        { id: 52, name: 'Payroll Management' },
        { id: 53, name: 'Financial Reporting' }
    ]
};

const CATEGORIES = [
    { id: '1', name: 'GST Services' },
    { id: '2', name: 'Income Tax Services' },
    { id: '3', name: 'Business Registration' },
    { id: '4', name: 'Compliance Services' },
    { id: '5', name: 'Accounting Services' }
];

const ATTRIBUTES_LIST = [
    { name: 'Required Documents', count: 5 },
    { name: 'Service Features', count: 8 },
    { name: 'Eligibility Criteria', count: 4 },
    { name: 'Processing Steps', count: 6 }
];

const FAQS_LIST = [
    'What documents are required for GST registration?',
    'How long does the GST registration process take?',
    'What is the registration fee for GST?'
];

const EMPTY_SERVICE: Service = {
    id: 0,
    name: '',
    category: '',
    categoryId: '',
    subCategory: '',
    subCategoryId: '',
    slug: '',
    shortDescription: '',
    descriptionPoints: [],
    status: 'draft',
    featured: false,
    popular: false,
    processingTime: '',
    serviceCode: '',
    displayOrder: 1,
    metaTitle: '',
    metaDescription: '',
    canonicalLink: '',
    image: null,
    attributes: [],
    faqs: []
};

// --- Component ---

export default function ServiceManagementPage() {
    const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
    const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
    const [formData, setFormData] = useState<Service>(EMPTY_SERVICE);
    const [filters, setFilters] = useState({ status: 'all', category: 'all', search: '' });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Derived State
    const filteredServices = services.filter(s => {
        if (filters.status !== 'all' && s.status !== filters.status) return false;
        if (filters.category !== 'all' && s.categoryId !== filters.category) return false;
        if (filters.search && !s.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
    });

    const stats = {
        total: services.length,
        published: services.filter(s => s.status === 'published').length,
        draft: services.filter(s => s.status === 'draft').length,
        featured: services.filter(s => s.featured).length
    };

    // Handlers
    const handleCreate = () => {
        setFormData({ ...EMPTY_SERVICE, id: Math.max(...services.map(s => s.id), 0) + 1 });
        setViewMode('form');
        window.scrollTo(0, 0);
    };

    const handleEdit = (service: Service) => {
        setFormData({ ...service });
        setViewMode('form');
        window.scrollTo(0, 0);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this service?')) {
            setServices(prev => prev.filter(s => s.id !== id));
            showNotification('Service deleted successfully');
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.categoryId || !formData.subCategoryId) {
            alert('Please select both category and sub-category');
            return;
        }

        const categoryName = CATEGORIES.find(c => c.id === formData.categoryId)?.name || '';
        const subCategoryName = SUB_CATEGORIES[formData.categoryId]?.find(s => s.id.toString() === formData.subCategoryId)?.name || '';

        const updatedService = {
            ...formData,
            category: categoryName,
            subCategory: subCategoryName
        };

        if (services.some(s => s.id === formData.id)) {
            setServices(prev => prev.map(s => s.id === formData.id ? updatedService : s));
            showNotification('Service updated successfully');
        } else {
            setServices(prev => [...prev, updatedService]);
            showNotification('Service created successfully');
        }

        setViewMode('list');
    };

    const showNotification = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    };

    // Form Field Handlers
    const handleInputChange = (field: keyof Service, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (field === 'name' && !formData.slug) {
            setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
        }
    };

    const handleCategoryChange = (catId: string) => {
        setFormData(prev => ({
            ...prev,
            categoryId: catId,
            subCategoryId: '', // Reset subcategory
        }));
    };

    const handleBulletAdd = () => {
        setFormData(prev => ({ ...prev, descriptionPoints: [...prev.descriptionPoints, ''] }));
    };

    const handleBulletChange = (index: number, value: string) => {
        const newPoints = [...formData.descriptionPoints];
        newPoints[index] = value;
        setFormData(prev => ({ ...prev, descriptionPoints: newPoints }));
    };

    const handleBulletRemove = (index: number) => {
        setFormData(prev => ({
            ...prev,
            descriptionPoints: prev.descriptionPoints.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans p-4 md:p-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Breadcrumb */}
                <div className="bg-white px-5 py-3 rounded-xl shadow-sm mb-6 flex items-center gap-2 text-sm text-slate-500">
                    <House size={16} weight="bold" />
                    <span>Dashboard</span>
                    <CaretRight size={12} />
                    <span className="font-semibold text-slate-900">{viewMode === 'list' ? 'Services' : (formData.id ? 'Edit Service' : 'Create Service')}</span>
                </div>

                {/* Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <Briefcase size={24} weight="bold" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 leading-none mb-1">
                                    {viewMode === 'list' ? 'Services Management' : (formData.id ? 'Edit Service' : 'Create New Service')}
                                </h1>
                                <p className="text-slate-500 text-sm">Manage all your service offerings</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {viewMode === 'form' && (
                                <button
                                    onClick={() => setViewMode('list')}
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold transition-all flex items-center gap-2"
                                >
                                    <ArrowLeft size={18} weight="bold" />
                                    Back to List
                                </button>
                            )}
                            <button className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-all flex items-center gap-2">
                                <DownloadSimple size={18} weight="bold" />
                                Export
                            </button>
                            {viewMode === 'list' && (
                                <button
                                    onClick={handleCreate}
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
                                >
                                    <Plus size={18} weight="bold" />
                                    Add Service
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {viewMode === 'list' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                            {[
                                { label: 'Total Services', value: stats.total, icon: '📦', color: 'bg-[#ede9fe]' },
                                { label: 'Published', value: stats.published, icon: '✅', color: 'bg-[#d1fae5]' },
                                { label: 'Drafts', value: stats.draft, icon: '📝', color: 'bg-[#fef3c7]' },
                                { label: 'Featured', value: stats.featured, icon: '⭐', color: 'bg-[#dbeafe]' },
                            ].map((stat, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</h3>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="space-y-6">
                        {/* Toolbar */}
                        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                            <h2 className="text-lg font-bold text-slate-800">All Services</h2>

                            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                <div className="relative flex-grow md:flex-grow-0">
                                    <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        value={filters.search}
                                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                        className="w-full md:w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                    className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                    className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 bg-white"
                                >
                                    <option value="all">All Categories</option>
                                    {CATEGORIES.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredServices.map(service => (
                                <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm border border-transparent hover:border-slate-200 hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">{service.name}</h3>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Folder size={14} weight="bold" />
                                                <span>{service.category}</span>
                                                <CaretRight size={10} />
                                                <span>{service.subCategory}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${service.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {service.status}
                                            </span>
                                            {service.featured && (
                                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 h-10">{service.shortDescription}</p>

                                    <div className="flex items-center justify-between py-4 border-t border-b border-slate-50 mb-4">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Clock size={16} className="text-indigo-500" />
                                            {service.processingTime}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Code size={16} className="text-indigo-500" />
                                            {service.serviceCode}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <ListChecks size={16} className="text-indigo-500" />
                                            {service.attributes.length} Attrs
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => alert(`Preview ${service.name}`)} className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5">
                                            <Eye size={16} weight="bold" /> View
                                        </button>
                                        <button onClick={() => handleEdit(service)} className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5">
                                            <Pencil size={16} weight="bold" /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5">
                                            <Trash size={16} weight="bold" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredServices.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                                <Briefcase size={64} className="text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No services found</h3>
                                <p className="text-slate-500 mb-6">Start by adding your first service to the platform.</p>
                                <button onClick={handleCreate} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200">
                                    Add New Service
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Form View */}
                {viewMode === 'form' && (
                    <form onSubmit={handleSave}>
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

                            {/* Main Column */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-10">

                                {/* Basic Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Info size={24} weight="bold" className="text-indigo-600" />
                                        <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Service Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                                placeholder="e.g., GST Registration Service"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1">Main Category <span className="text-red-500">*</span></label>
                                                <select
                                                    required
                                                    value={formData.categoryId}
                                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
                                                >
                                                    <option value="">-- Select Category --</option>
                                                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1">Sub-Category <span className="text-red-500">*</span></label>
                                                <select
                                                    required
                                                    value={formData.subCategoryId}
                                                    onChange={(e) => handleInputChange('subCategoryId', e.target.value)}
                                                    disabled={!formData.categoryId}
                                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
                                                >
                                                    <option value="">-- Select Sub-Category --</option>
                                                    {formData.categoryId && SUB_CATEGORIES[formData.categoryId]?.map(s => (
                                                        <option key={s.id} value={s.id}>{s.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Permalink / URL Slug</label>
                                            <div className="flex">
                                                <span className="bg-slate-50 border border-slate-200 border-r-0 rounded-l-lg px-3 py-2.5 text-sm text-slate-500 font-mono">
                                                    taxque.com/services/
                                                </span>
                                                <input
                                                    type="text"
                                                    value={formData.slug}
                                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-r-lg focus:outline-none focus:border-indigo-500 font-mono text-sm"
                                                    placeholder="service-slug"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Short Description</label>
                                            <textarea
                                                value={formData.shortDescription}
                                                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 min-h-[100px]"
                                                placeholder="Brief overview of the service..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description Points</label>
                                            <div className="space-y-2 mb-3">
                                                {formData.descriptionPoints.map((point, idx) => (
                                                    <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                                                        <CheckCircle size={18} className="text-indigo-500" weight="bold" />
                                                        <input
                                                            type="text"
                                                            value={point}
                                                            onChange={(e) => handleBulletChange(idx, e.target.value)}
                                                            className="flex-1 bg-transparent border-none text-sm focus:ring-0"
                                                            placeholder="Key point..."
                                                        />
                                                        <button type="button" onClick={() => handleBulletRemove(idx)} className="text-red-500 hover:text-red-700 p-1">
                                                            <X size={16} weight="bold" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleBulletAdd}
                                                className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-indigo-500 hover:text-indigo-600 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                            >
                                                <PlusCircle size={18} weight="bold" /> Add Point
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-8"></div>

                                {/* Attributes */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ListChecks size={24} weight="bold" className="text-indigo-600" />
                                        <h2 className="text-xl font-bold text-slate-900">Service Attributes</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-4 border border-slate-200 rounded-xl bg-slate-50">
                                        {ATTRIBUTES_LIST.map(attr => (
                                            <label key={attr.name} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.attributes.includes(attr.name) ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 hover:bg-slate-50'
                                                }`}>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.attributes.includes(attr.name) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                                                    }`}>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={formData.attributes.includes(attr.name)}
                                                        onChange={(e) => {
                                                            const newAttrs = e.target.checked
                                                                ? [...formData.attributes, attr.name]
                                                                : formData.attributes.filter(a => a !== attr.name);
                                                            handleInputChange('attributes', newAttrs);
                                                        }}
                                                    />
                                                    {formData.attributes.includes(attr.name) && <CheckCircle size={14} weight="bold" />}
                                                </div>
                                                <span className="flex-1 text-sm font-medium text-slate-700">{attr.name}</span>
                                                <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{attr.count}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-8"></div>

                                {/* SEO */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ChartLineUp size={24} weight="bold" className="text-indigo-600" />
                                        <h2 className="text-xl font-bold text-slate-900">SEO & Meta</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Meta Title</label>
                                            <input
                                                type="text"
                                                value={formData.metaTitle}
                                                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                                placeholder="SEO optimized title (50-60 chars)"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Meta Description</label>
                                            <textarea
                                                value={formData.metaDescription}
                                                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 min-h-[80px]"
                                                placeholder="SEO description (150-160 chars)"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Featured Image</label>
                                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                                <ImageIcon size={40} className="mx-auto text-slate-300 mb-2" />
                                                <p className="text-sm font-semibold text-slate-600">Click to upload featured image</p>
                                                <p className="text-xs text-slate-400 mt-1">PNG, JPG - Recommended 1200x630px</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">

                                {/* Status Card */}
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Upload size={18} className="text-indigo-600" /> Publish
                                    </h3>
                                    <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
                                        {['published', 'draft'].map(status => (
                                            <button
                                                key={status}
                                                type="button"
                                                onClick={() => handleInputChange('status', status)}
                                                className={`flex-1 py-2 text-sm font-semibold rounded-md capitalize transition-all ${formData.status === status ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all">
                                            Save Service
                                        </button>
                                        <button type="button" onClick={() => setViewMode('list')} className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all">
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                {/* Info Card */}
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Info size={18} className="text-indigo-600" /> Service Info
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Processing Time</label>
                                            <input
                                                type="text"
                                                value={formData.processingTime}
                                                onChange={(e) => handleInputChange('processingTime', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                                placeholder="e.g., 3-5 Days"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Service Code</label>
                                            <input
                                                type="text"
                                                value={formData.serviceCode}
                                                onChange={(e) => handleInputChange('serviceCode', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                                placeholder="e.g., GST-001"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Visibility Card */}
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Eye size={18} className="text-indigo-600" /> Visibility
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.featured}
                                                onChange={(e) => handleInputChange('featured', e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                            />
                                            <span className="text-sm font-medium text-slate-700">Featured Service</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.popular}
                                                onChange={(e) => handleInputChange('popular', e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                            />
                                            <span className="text-sm font-medium text-slate-700">Popular Service</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                )}
            </div>

            {/* Toast Notification */}
            <div className={`fixed bottom-8 right-8 z-50 transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
                <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                    <CheckCircle size={24} weight="bold" />
                    <span className="font-semibold">{toastMessage}</span>
                </div>
            </div>
        </div>
    );
}
