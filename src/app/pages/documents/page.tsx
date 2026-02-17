
'use client';

import React, { useState, useEffect } from 'react';
import {
    LayoutGrid,
    Users,
    Clock,
    CheckCircle,
    ArrowUp,
    AlertCircle,
    List,
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    Mail,
    Phone,
    Tag,
    User,
    FileText,
    ArrowLeftRight,
    ChevronDown,
    Share,
    Inbox,
    Type,
    Folder,
    Calendar,
    Flag,
    StickyNote,
    Send,
    Upload,
    RefreshCw,
    Printer,
    TrendingUp,
    BarChart,
    Percent,
    PieChart,
    Settings,
    Bell,
    FileOutput,
    Check,
    AlertTriangle,
    Edit,
    UserPlus,
    RotateCw,
    Download,
    File,
    ChevronUp,
    FileInput
} from 'lucide-react';

// --- Types ---

interface Document {
    id: number;
    title: string;
    category: string;
    direction: 'toClient' | 'fromClient';
    status: string; // 'Pending Upload' | 'Under Review' | 'Completed' | 'Replace Needed' | 'Incorrect' | 'Expired'
    quality?: string;
    dueDate?: string;
    lastDateLabel?: string;
    priority?: string;
    notes?: string;
    requestedBy?: string;
    requestedDate?: string;
    uploadedBy?: string;
    uploadDate?: string;
}

interface Client {
    id: string;
    code: string;
    name: string;
    email: string;
    phone: string;
    segment: string;
    rm: string;
    joinDate: string;
    documents: Document[];
    notes?: string;
}

type ViewMode = 'dashboard' | 'client' | 'analytics' | 'users' | 'settings';
type DocFilter = 'all' | 'toClient' | 'fromClient' | 'pending' | 'completed';

export default function DocumentsPage() {
    // --- State ---
    const [view, setView] = useState<ViewMode>('dashboard');
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Client Detail State
    const [docFilter, setDocFilter] = useState<DocFilter>('all');
    const [showForms, setShowForms] = useState(true);

    // Modals
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

    // Form inputs (simplified handling)
    const [reqForm, setReqForm] = useState({ title: '', category: 'Other', due: '', priority: 'High', notes: '' });
    const [uploadForm, setUploadForm] = useState({ title: '', category: 'Other', file: '', date: '', notes: '' });
    const [newClientForm, setNewClientForm] = useState({ name: '', email: '', phone: '', code: '', segment: 'ITR · Individual', rm: 'Anita Sharma', notes: '' });


    // --- Init ---
    useEffect(() => {
        seedSampleData();
    }, []);

    const seedSampleData = () => {
        const initialDocs = [
            { title: "ITR-V FY 23-24", category: "ITR", direction: "fromClient", status: "Completed", quality: "Good", dueDate: "2025-06-15", lastDateLabel: "Received 20 May 2025", priority: "Normal", notes: "All pages verified.", uploadDate: "2025-05-20" },
            { title: "Form 16 FY 23-24", category: "ITR", direction: "toClient", status: "Pending Upload", quality: "Pending", dueDate: "2025-06-10", lastDateLabel: "Due by 10 Jun 2025", priority: "High", notes: "Upload original PDF from employer.", requestedDate: "2025-05-25" },
            { title: "Aadhaar Card", category: "KYC / ID proof", direction: "fromClient", status: "Under Review", quality: "Need Clarification", dueDate: "2025-06-01", lastDateLabel: "Uploaded 28 May 2025", priority: "Normal", notes: "Back side missing.", uploadDate: "2025-05-28" },
            { title: "GSTR-3B April 2025", category: "GST", direction: "fromClient", status: "Under Review", quality: "Need Clarification", dueDate: "2025-05-25", lastDateLabel: "Uploaded 24 May 2025", priority: "Normal", notes: "Check ITC mismatch.", uploadDate: "2025-05-24" },
            { title: "Bank statement Q1 2025", category: "Bank / Financial", direction: "toClient", status: "Replace Needed", quality: "Replace", dueDate: "2025-06-05", lastDateLabel: "Old scan blurred, ask again", priority: "Urgent", notes: "Need clear PDF, all pages.", requestedDate: "2025-05-20" },
            { title: "Audited Balance Sheet FY 23-24", category: "Audit", direction: "toClient", status: "Pending Upload", quality: "Pending", dueDate: "2025-06-30", lastDateLabel: "Due by 30 Jun 2025", priority: "High", notes: "Signed by CA.", requestedDate: "2025-05-28" },
            { title: "Form 26AS FY 23-24", category: "ITR", direction: "toClient", status: "Expired", quality: "Expired", dueDate: "2025-05-15", lastDateLabel: "Expired on 15 May 2025", priority: "High", notes: "Need to resend request.", requestedDate: "2025-04-20" }
        ] as Document[];

        const sampleClients: Client[] = [
            { id: "C001", code: "TXQ-001", name: "Rajesh Kumar", email: "rajesh.kumar@example.com", phone: "+91-9876543210", segment: "ITR · Individual", rm: "Anita Sharma", joinDate: "2024-01-15", documents: [] },
            { id: "C002", code: "TXQ-002", name: "Mehta Traders LLP", email: "info@mehta-traders.com", phone: "+91-9988776655", segment: "GST · Business", rm: "Rohan Verma", joinDate: "2023-11-08", documents: [] },
            { id: "C003", code: "TXQ-003", name: "Anjali Gupta", email: "anjali.g@example.com", phone: "+91-9123456789", segment: "KYC / PAN", rm: "Anita Sharma", joinDate: "2024-03-22", documents: [] },
            { id: "C004", code: "TXQ-004", name: "Sunil Enterprises", email: "accounts@sunilenterprises.com", phone: "+91-8899776655", segment: "GST · Business", rm: "Rohan Verma", joinDate: "2023-09-14", documents: [] },
            { id: "C005", code: "TXQ-005", name: "Priya Sharma", email: "priya.s@example.com", phone: "+91-8765432109", segment: "ITR · Individual", rm: "Anita Sharma", joinDate: "2024-02-10", documents: [] }
        ];

        let docIdCounter = 1;
        // Distribute docs
        sampleClients[0].documents = [
            { ...initialDocs[0], id: docIdCounter++ },
            { ...initialDocs[1], id: docIdCounter++ },
            { ...initialDocs[2], id: docIdCounter++ }
        ];
        sampleClients[1].documents = [
            { ...initialDocs[3], id: docIdCounter++ },
            { ...initialDocs[4], id: docIdCounter++ },
            { ...initialDocs[5], id: docIdCounter++ }
        ];
        sampleClients[4].documents = [
            { ...initialDocs[6], id: docIdCounter++ }
        ];

        setClients(sampleClients);
        showToast('Sample data loaded successfully');
    };

    // --- Helpers ---
    const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const getClientById = (id: string) => clients.find(c => c.id === id);

    const getFilteredClients = () => {
        if (!searchQuery) return clients;
        const lowerQ = searchQuery.toLowerCase();
        return clients.filter(c =>
            c.name.toLowerCase().includes(lowerQ) ||
            c.code.toLowerCase().includes(lowerQ) ||
            c.email.toLowerCase().includes(lowerQ)
        );
    };

    const getPaginatedClients = () => {
        const filtered = getFilteredClients();
        const start = (currentPage - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    };

    const totalPages = Math.ceil(getFilteredClients().length / itemsPerPage);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending Upload": return "bg-amber-100 text-amber-800"; // status-pending
            case "Under Review": return "bg-indigo-100 text-indigo-800"; // status-review
            case "Completed": return "bg-emerald-100 text-emerald-800"; // status-completed
            case "Replace Needed": return "bg-red-100 text-red-800"; // status-replace
            case "Incorrect": return "bg-red-200 text-red-900"; // status-incorrect
            case "Expired": return "bg-orange-100 text-orange-800"; // status-expired
            default: return "bg-blue-100 text-blue-800"; // status-uploaded
        }
    };

    // --- Actions ---
    const handleAddClient = (e: React.FormEvent) => {
        e.preventDefault();
        if (clients.some(c => c.code === newClientForm.code)) {
            showToast("Client code already exists.", "error");
            return;
        }

        const newClient: Client = {
            id: `C${(clients.length + 1001).toString()}`,
            ...newClientForm,
            joinDate: new Date().toISOString().split('T')[0],
            documents: []
        };

        setClients([...clients, newClient]);
        setIsAddClientModalOpen(false);
        setNewClientForm({ name: '', email: '', phone: '', code: '', segment: 'ITR · Individual', rm: 'Anita Sharma', notes: '' });
        showToast(`Client "${newClient.name}" added successfully`);
    };

    const handleReqSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClientId) return;

        const newDoc: Document = {
            id: Date.now(),
            title: reqForm.title,
            category: reqForm.category,
            direction: 'toClient',
            status: 'Pending Upload',
            quality: 'Pending',
            dueDate: reqForm.due,
            priority: reqForm.priority,
            notes: reqForm.notes,
            requestedBy: 'Admin',
            requestedDate: new Date().toISOString().split('T')[0],
            lastDateLabel: 'Requested today'
        };

        setClients(clients.map(c => c.id === selectedClientId ? { ...c, documents: [...c.documents, newDoc] } : c));
        setReqForm({ title: '', category: 'Other', due: '', priority: 'High', notes: '' });
        showToast("Document request created");
    };

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClientId) return;

        const newDoc: Document = {
            id: Date.now(),
            title: uploadForm.title + (uploadForm.file ? ` (${uploadForm.file})` : ''),
            category: uploadForm.category,
            direction: 'fromClient',
            status: 'Under Review',
            quality: 'Need Clarification',
            priority: 'Normal',
            notes: uploadForm.notes,
            uploadedBy: 'Client',
            uploadDate: uploadForm.date || new Date().toISOString().split('T')[0],
            lastDateLabel: `Uploaded ${uploadForm.date || 'today'}`
        };

        setClients(clients.map(c => c.id === selectedClientId ? { ...c, documents: [...c.documents, newDoc] } : c));
        setUploadForm({ title: '', category: 'Other', file: '', date: '', notes: '' });
        showToast("Document uploaded successfully");
    };

    const updateDocStatus = (docId: number, newStatus: string) => {
        if (!selectedClientId) return;
        setClients(clients.map(c => {
            if (c.id === selectedClientId) {
                return {
                    ...c,
                    documents: c.documents.map(d => {
                        if (d.id === docId) {
                            return { ...d, status: newStatus };
                        }
                        return d;
                    })
                };
            }
            return c;
        }));
        showToast(`Status updated to ${newStatus}`);
    };

    // New function to update document status to "Completed" with "Good" quality
    const markDocCompleted = (docId: number) => {
        if (!selectedClientId) return;
        setClients(clients.map(c => {
            if (c.id === selectedClientId) {
                return {
                    ...c,
                    documents: c.documents.map(d => {
                        if (d.id === docId) {
                            return { ...d, status: 'Completed', quality: 'Good' };
                        }
                        return d;
                    })
                };
            }
            return c;
        }));
        showToast(`Document marked as Completed`);
    };

    // New function to update document status to "Replace Needed" with "Replace" quality
    const requestDocReplacement = (docId: number) => {
        if (!selectedClientId) return;
        setClients(clients.map(c => {
            if (c.id === selectedClientId) {
                return {
                    ...c,
                    documents: c.documents.map(d => {
                        if (d.id === docId) {
                            return { ...d, status: 'Replace Needed', quality: 'Replace' };
                        }
                        return d;
                    })
                };
            }
            return c;
        }));
        showToast(`Replacement requested`);
    };


    const selectedClient = selectedClientId ? getClientById(selectedClientId) : null;
    const filteredDocs = selectedClient ? selectedClient.documents.filter(d => {
        if (docFilter === 'all') return true;
        if (docFilter === 'toClient') return d.direction === 'toClient';
        if (docFilter === 'fromClient') return d.direction === 'fromClient';
        if (docFilter === 'pending') return ['Pending Upload', 'Under Review', 'Replace Needed', 'Incorrect', 'Expired'].includes(d.status);
        if (docFilter === 'completed') return d.status === 'Completed';
        return true;
    }) : [];


    // --- Render Views ---

    if (view === 'client' && selectedClient) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 animate-fade-in font-sans text-slate-800">
                {/* Crumb */}
                <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                    <button onClick={() => { setSelectedClientId(null); setView('dashboard'); }} className="flex items-center gap-1 text-blue-600 hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <span>/ Client Document Window</span>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-slate-900">{selectedClient.name}</h1>
                            <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded-full">{selectedClient.code}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {selectedClient.email}</span>
                            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {selectedClient.phone}</span>
                            <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> {selectedClient.segment}</span>
                            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> RM: {selectedClient.rm}</span>
                        </div>
                    </div>
                </div>

                {/* Actions Card */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 overflow-hidden">
                    <div className="bg-white p-4 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <ArrowLeftRight className="w-5 h-5 text-slate-500" /> Document Actions
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Request documents from clients or manage uploaded documents</p>
                        </div>
                        <button onClick={() => setShowForms(!showForms)} className="text-sm font-medium text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors">
                            {showForms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} {showForms ? 'Hide Forms' : 'Show Forms'}
                        </button>
                    </div>

                    {showForms && (
                        <div className="p-5">
                            {/* Tabs */}
                            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                {[
                                    { id: 'all', label: 'All Documents', icon: null },
                                    { id: 'toClient', label: 'To Client', icon: Share },
                                    { id: 'fromClient', label: 'From Client', icon: Inbox },
                                    { id: 'pending', label: 'Pending', icon: Clock },
                                    { id: 'completed', label: 'Completed', icon: CheckCircle },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setDocFilter(tab.id as DocFilter)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${docFilter === tab.id
                                            ? 'bg-slate-800 text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                        {tab.icon && <tab.icon className="w-4 h-4" />} {tab.label}
                                        <span className="bg-white/20 px-1.5 rounded text-xs ml-1">
                                            {selectedClient.documents.filter(d =>
                                                tab.id === 'all' ? true :
                                                    tab.id === 'toClient' ? d.direction === 'toClient' :
                                                        tab.id === 'fromClient' ? d.direction === 'fromClient' :
                                                            tab.id === 'pending' ? ['Pending Upload', 'Under Review', 'Replace Needed', 'Incorrect', 'Expired'].includes(d.status) :
                                                                d.status === 'Completed'
                                            ).length}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Admin Request Form */}
                                <div className="border border-dashed border-slate-300 rounded-xl p-5 bg-slate-50/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                                            <Share className="w-4 h-4 text-blue-600" /> Request Document
                                        </h4>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Outgoing Request</span>
                                    </div>
                                    <form onSubmit={handleReqSubmit} className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Document Title</label>
                                            <input value={reqForm.title} onChange={e => setReqForm({ ...reqForm, title: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg" placeholder="e.g. Bank Statement" required />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                                            <select value={reqForm.category} onChange={e => setReqForm({ ...reqForm, category: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg">
                                                <option>ITR</option><option>GST</option><option>Audit</option><option>Other</option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date</label>
                                            <input type="date" value={reqForm.due} onChange={e => setReqForm({ ...reqForm, due: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg" required />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Priority</label>
                                            <select value={reqForm.priority} onChange={e => setReqForm({ ...reqForm, priority: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg">
                                                <option>Normal</option><option>High</option><option>Urgent</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Instructions</label>
                                            <textarea value={reqForm.notes} onChange={e => setReqForm({ ...reqForm, notes: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg" rows={2} placeholder="Optional instructions..."></textarea>
                                        </div>
                                        <div className="col-span-2 flex justify-end gap-2 mt-2">
                                            <button type="submit" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                                <Send className="w-4 h-4" /> Create Request
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Client Upload Form */}
                                <div className="border border-dashed border-slate-300 rounded-xl p-5 bg-slate-50/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                                            <Inbox className="w-4 h-4 text-emerald-600" /> Client Upload
                                        </h4>
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Incoming from Client</span>
                                    </div>
                                    <form onSubmit={handleUploadSubmit} className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Document Title</label>
                                            <input value={uploadForm.title} onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg" placeholder="e.g. Ack Slip" required />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                                            <select value={uploadForm.category} onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg">
                                                <option>ITR</option><option>GST</option><option>Audit</option><option>Other</option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">File Name</label>
                                            <input value={uploadForm.file} onChange={e => setUploadForm({ ...uploadForm, file: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg" placeholder="e.g. file.pdf" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Date</label>
                                            <input type="date" value={uploadForm.date} onChange={e => setUploadForm({ ...uploadForm, date: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Remarks</label>
                                            <textarea value={uploadForm.notes} onChange={e => setUploadForm({ ...uploadForm, notes: e.target.value })} className="w-full text-sm p-2 border border-slate-300 rounded-lg" rows={2} placeholder="Optional remarks..."></textarea>
                                        </div>
                                        <div className="col-span-2 flex justify-end gap-2 mt-2">
                                            <button type="submit" className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
                                                <Upload className="w-4 h-4" /> Add as Uploaded
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Document List */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-white p-4 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-slate-500" /> Client Documents
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => showToast('Refreshed')} className="text-sm border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-1 transition-colors">
                                <RefreshCw className="w-3.5 h-3.5" /> Refresh
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Direction</th>
                                    <th className="p-4">Status / Quality</th>
                                    <th className="p-4">Due / Last Date</th>
                                    <th className="p-4">Priority / Notes</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filteredDocs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-slate-500 flex flex-col items-center">
                                            <File className="w-8 h-8 opacity-40 mb-2" />
                                            No documents found for this filter.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDocs.map(doc => (
                                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="text-blue-600 mt-0.5">
                                                        {doc.category === 'ITR' ? <FileText className="w-4 h-4" /> :
                                                            doc.category === 'GST' ? <FileText className="w-4 h-4" /> :
                                                                <File className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-800">{doc.title}</div>
                                                        <div className="text-xs text-slate-500 mt-0.5">{doc.category} • {doc.direction === 'toClient' ? 'Req. by Admin' : 'Up. by Client'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${doc.direction === 'toClient' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                    {doc.direction === 'toClient' ? <Share className="w-3 h-3" /> : <Inbox className="w-3 h-3" />}
                                                    {doc.direction === 'toClient' ? 'Outgoing' : 'Incoming'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(doc.status)}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span> {doc.status}
                                                </span>
                                                {doc.quality && doc.quality !== 'Pending' && doc.quality !== doc.status && (
                                                    <div className="text-xs text-slate-500 mt-1">Quality: {doc.quality}</div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="font-medium text-slate-700">{doc.dueDate || "—"}</div>
                                                <div className="text-xs text-slate-500 mt-0.5">{doc.lastDateLabel}</div>
                                            </td>
                                            <td className="p-4">
                                                {doc.priority && doc.priority !== 'Normal' && (
                                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide mb-1 ${doc.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        <Flag className="w-3 h-3" /> {doc.priority}
                                                    </span>
                                                )}
                                                {doc.notes && (
                                                    <div className="flex items-start gap-1 text-xs text-slate-500 max-w-[200px]">
                                                        <StickyNote className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                        <span className="truncate" title={doc.notes}>{doc.notes}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <select
                                                        className="text-xs border border-slate-300 rounded px-1 py-1 bg-white focus:border-blue-500 outline-none w-28"
                                                        value={doc.status}
                                                        onChange={(e) => updateDocStatus(doc.id, e.target.value)}
                                                    >
                                                        <option>Pending Upload</option>
                                                        <option>Under Review</option>
                                                        <option>Completed</option>
                                                        <option>Replace Needed</option>
                                                        <option>Incorrect</option>
                                                        <option>Expired</option>
                                                    </select>
                                                    <button onClick={() => markDocCompleted(doc.id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded" title="Mark Completed (Good)">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => requestDocReplacement(doc.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Request Replacement">
                                                        <RotateCw className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'analytics') {
        return (
            <div className="min-h-screen bg-slate-50 p-6 animate-fade-in font-sans">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-blue-600" /> Analytics & Reports</h1>
                        <p className="text-slate-500">Track document submission trends and compliance.</p>
                    </div>
                    <div className="flex gap-2">
                        <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white">
                            <option>Last 30 days</option>
                            <option>Last quarter</option>
                        </select>
                        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                            <Download className="w-4 h-4" /> Download Report
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3"><BarChart className="w-5 h-5" /></div>
                        <div className="text-2xl font-bold text-slate-900">2.4</div>
                        <div className="text-sm text-slate-500 font-medium">Avg. Response Time (days)</div>
                        <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><ArrowUp className="w-3 h-3 rotate-180" /> Improved from 3.1 days</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3"><Percent className="w-5 h-5" /></div>
                        <div className="text-2xl font-bold text-slate-900">87%</div>
                        <div className="text-sm text-slate-500 font-medium">Compliance Rate</div>
                        <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> Up 5% from last month</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3"><Upload className="w-5 h-5" /></div>
                        <div className="text-2xl font-bold text-slate-900">142</div>
                        <div className="text-sm text-slate-500 font-medium">Total Uploads (30 days)</div>
                        <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> 24 more than last month</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64 flex flex-col items-center justify-center text-slate-400">
                    <PieChart className="w-12 h-12 mb-2 opacity-50" />
                    <p className="italic">Chart visualization would appear here in a real application</p>
                </div>
            </div>
        )
    }

    if (view === 'users') {
        return (
            <div className="min-h-screen bg-slate-50 p-6 animate-fade-in font-sans">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Users className="w-6 h-6 text-blue-600" /> User Management</h1>
                        <p className="text-slate-500">Manage system users, roles, and permissions.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" /> Add User
                    </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                            <tr>
                                <th className="p-4">User</th> <th className="p-4">Role</th> <th className="p-4">Email</th> <th className="p-4">Status</th> <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            <tr>
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">AD</div>
                                    <div><div className="font-bold text-slate-900">Admin User</div><div className="text-xs text-slate-500">System Admin</div></div>
                                </td>
                                <td className="p-4"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">Administrator</span></td>
                                <td className="p-4 text-slate-600">admin@taxque.cloud</td>
                                <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">Active</span></td>
                                <td className="p-4"><button className="text-slate-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    // Default: Dashboard View
    const clientsWithPending = clients.filter(c => c.documents.some(d => ['Pending Upload', 'Under Review', 'Replace Needed', 'Incorrect', 'Expired'].includes(d.status))).length;
    const allCompletedDocs = clients.reduce((sum, c) => sum + c.documents.filter(d => d.status === 'Completed').length, 0);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <div id="section-dashboard" className="p-6 animate-fade-in">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <LayoutGrid className="w-7 h-7 text-blue-600" /> Admin Dashboard
                        </h1>
                        <p className="text-slate-500 mt-1">Overview of all clients and their document status.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setView('analytics')} className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                            <BarChart className="w-4 h-4" /> Analytics
                        </button>
                        <button onClick={() => setView('users')} className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Users
                        </button>
                        <button onClick={seedSampleData} className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                            <RotateCw className="w-4 h-4" /> Reset Data
                        </button>
                        <button onClick={() => setIsAddClientModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors">
                            <UserPlus className="w-4 h-4" /> Add Client
                        </button>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Users className="w-6 h-6" /></div>
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">Active</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{clients.length}</div>
                        <div className="text-sm font-medium text-slate-500">Total Clients</div>
                        <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> 3 new this month</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600"><Clock className="w-6 h-6" /></div>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">Action Needed</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{clientsWithPending}</div>
                        <div className="text-sm font-medium text-slate-500">Clients with Pending Docs</div>
                        <div className="text-xs text-amber-600 font-bold mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Require attention</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle className="w-6 h-6" /></div>
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">Completed</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{allCompletedDocs}</div>
                        <div className="text-sm font-medium text-slate-500">Total Completed Documents</div>
                        <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> 12% increase</div>
                    </div>
                </div>

                {/* Client Directory Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <List className="w-5 h-5 text-slate-500" /> Client Directory
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Click a client to manage interactions</p>
                        </div>
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                            <input
                                type="text"
                                placeholder="Search clients..."
                                className="pl-9 pr-8 py-2 border border-slate-200 rounded-full text-sm w-64 focus:border-blue-500 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                                    <th className="p-4">Client</th>
                                    <th className="p-4">Client Code</th>
                                    <th className="p-4">Pending Docs</th>
                                    <th className="p-4">Completed Docs</th>
                                    <th className="p-4">Last Activity</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {getFilteredClients().length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-slate-500 flex flex-col items-center">
                                            <Users className="w-8 h-8 opacity-40 mb-2" />
                                            No clients found.
                                        </td>
                                    </tr>
                                ) : (
                                    getPaginatedClients().map(client => {
                                        const pending = client.documents.filter(d => ['Pending Upload', 'Under Review', 'Replace Needed', 'Incorrect', 'Expired'].includes(d.status)).length;
                                        const completed = client.documents.filter(d => d.status === 'Completed').length;
                                        const lastActivity = client.documents.length > 0 ? client.documents[client.documents.length - 1].lastDateLabel : 'No activity';

                                        return (
                                            <tr key={client.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setSelectedClientId(client.id); setView('client'); }}>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                                                            {client.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-blue-600 hover:underline">{client.name}</div>
                                                            <div className="text-xs text-slate-500">{client.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-mono font-bold text-slate-700 text-xs">{client.code}</div>
                                                    <div className="text-xs text-slate-500">{client.segment}</div>
                                                </td>
                                                <td className="p-4">
                                                    {pending > 0 ? (
                                                        <div className="font-bold text-amber-600">{pending} <span className="text-xs font-normal text-slate-400">pending</span></div>
                                                    ) : (
                                                        <div className="font-bold text-emerald-600">0 <span className="text-xs font-normal text-slate-400">All clear</span></div>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-bold text-slate-800">{completed} <span className="text-xs font-normal text-slate-400">of {client.documents.length}</span></div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-slate-700">{lastActivity}</div>
                                                    <div className="text-xs text-slate-500">RM: {client.rm}</div>
                                                </td>
                                                <td className="p-4">
                                                    <button onClick={(e) => { e.stopPropagation(); setSelectedClientId(client.id); setView('client'); }} className="bg-blue-600 text-white p-1.5 rounded-md hover:bg-blue-700 shadow-sm" title="Open Client">
                                                        <Folder className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                        <div>Showing <span className="font-bold text-slate-800">{getPaginatedClients().length}</span> of <span className="font-bold">{clients.length}</span> clients</div>
                        <div className="flex gap-2">
                            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add Client Modal */}
                {isAddClientModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in transform transition-all">
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-blue-600" /> Add New Client
                                </h3>
                                <button onClick={() => setIsAddClientModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleAddClient} className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                                        <input value={newClientForm.name} onChange={e => setNewClientForm({ ...newClientForm, name: e.target.value })} className="w-full border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required placeholder="Enter client name" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                        <input value={newClientForm.email} onChange={e => setNewClientForm({ ...newClientForm, email: e.target.value })} className="w-full border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 outline-none" required type="email" placeholder="client@example.com" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                                        <input value={newClientForm.phone} onChange={e => setNewClientForm({ ...newClientForm, phone: e.target.value })} className="w-full border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 outline-none" placeholder="+91..." />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Client Code</label>
                                        <input value={newClientForm.code} onChange={e => setNewClientForm({ ...newClientForm, code: e.target.value })} className="w-full border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 outline-none" required placeholder="TXQ-001" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                                        <select value={newClientForm.segment} onChange={e => setNewClientForm({ ...newClientForm, segment: e.target.value })} className="w-full border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 outline-none">
                                            <option>ITR · Individual</option>
                                            <option>GST · Business</option>
                                            <option>Audit · Corporate</option>
                                            <option>KYC / PAN</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Relationship Manager</label>
                                        <select value={newClientForm.rm} onChange={e => setNewClientForm({ ...newClientForm, rm: e.target.value })} className="w-full border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 outline-none">
                                            <option>Anita Sharma</option>
                                            <option>Rohan Verma</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-8">
                                    <button type="button" onClick={() => setIsAddClientModalOpen(false)} className="px-5 py-2.5 border border-slate-300 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                                    <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors">Add Client</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Toast Notification */}
                {toast && (
                    <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-xl text-white font-medium flex items-center gap-3 animate-slide-in-up ${toast.type === 'error' ? 'bg-red-600' : toast.type === 'warning' ? 'bg-amber-600' : 'bg-slate-800'
                        }`}>
                        {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                        {toast.message}
                    </div>
                )}
            </div>
        </div>
    );
}
