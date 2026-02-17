
import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

// --- Data Interfaces ---
export interface Deal {
    id: number;
    name: string;
    company: string;
    value: number;
    stage: string;
    description: string;
    contact: string;
    created: string;
}

export interface Lead {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    status: string;
    value: number;
    source: string;
    notes: string;
    created: string;
}

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    title: string;
    address: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    assignedTo: string;
    relatedTo: string;
    created: string;
}

export interface Ticket {
    id: number;
    subject: string;
    description: string;
    customer: string;
    email: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    assignedTo: string;
    created: string;
}

// --- Generic Modal Wrapper ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto scrollbar-hide">
                    {children}
                </div>
                {footer && (
                    <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Specific Modals ---

export function DealModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (deal: Omit<Deal, 'id' | 'created'>) => void }) {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        value: 0,
        stage: 'lead',
        description: '',
        contact: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({ name: '', company: '', value: 0, stage: 'lead', description: '', contact: '' });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Deal"
            footer={
                <>
                    <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Check className="w-4 h-4" /> Save Deal
                    </button>
                </>
            }
        >
            <form id="dealForm" className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Deal Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Website Redesign"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Company <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Value ($) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            required
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            value={formData.value}
                            onChange={e => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Stage</label>
                        <select
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                            value={formData.stage}
                            onChange={e => setFormData({ ...formData, stage: e.target.value })}
                        >
                            <option value="lead">Lead Generation</option>
                            <option value="qualification">Qualification</option>
                            <option value="proposal">Proposal</option>
                            <option value="negotiation">Negotiation</option>
                            <option value="closed">Closed Won</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Contact Person</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            value={formData.contact}
                            onChange={e => setFormData({ ...formData, contact: e.target.value })}
                            placeholder="Primary contact name"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[100px]"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Deal details..."
                    ></textarea>
                </div>
            </form>
        </Modal>
    );
}

export function LeadModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (lead: Omit<Lead, 'id' | 'created'>) => void }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        status: 'New',
        value: 0,
        source: 'Website',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({ firstName: '', lastName: '', email: '', company: '', phone: '', status: 'New', value: 0, source: 'Website', notes: '' });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Lead"
            footer={
                <>
                    <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Check className="w-4 h-4" /> Save Lead
                    </button>
                </>
            }
        >
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
                    <input type="email" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@company.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Company <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Phone</label>
                        <input type="tel" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Status</label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Converted">Converted</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Expected Value ($)</label>
                        <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.value} onChange={e => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Source</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })}>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Email Campaign">Email Campaign</option>
                        <option value="Trade Show">Trade Show</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Notes</label>
                    <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[80px]" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>
                </div>
            </form>
        </Modal>
    );
}

export function ContactModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (contact: Omit<Contact, 'id'>) => void }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        address: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', title: '', address: '' });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Contact"
            footer={
                <>
                    <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Check className="w-4 h-4" /> Save Contact
                    </button>
                </>
            }
        >
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
                    <input type="email" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Phone</label>
                        <input type="tel" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Company</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Job Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Sales Manager" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Address</label>
                    <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[80px]" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                </div>
            </form>
        </Modal>
    );
}

export function TaskModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (task: Omit<Task, 'id' | 'created'>) => void }) {
    const [formData, setFormData] = useState<Omit<Task, 'id' | 'created'>>({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
        assignedTo: '',
        relatedTo: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({ title: '', description: '', dueDate: '', priority: 'medium', status: 'pending', assignedTo: '', relatedTo: '' });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Task"
            footer={
                <>
                    <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Check className="w-4 h-4" /> Save Task
                    </button>
                </>
            }
        >
            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Task Title <span className="text-red-500">*</span></label>
                    <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[100px]" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Due Date <span className="text-red-500">*</span></label>
                        <input type="date" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Priority <span className="text-red-500">*</span></label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value as any })}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Assigned To</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.assignedTo} onChange={e => setFormData({ ...formData, assignedTo: e.target.value })} placeholder="Team member" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Status <span className="text-red-500">*</span></label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Related To</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.relatedTo} onChange={e => setFormData({ ...formData, relatedTo: e.target.value })} placeholder="Deal, Lead, or Contact" />
                </div>
            </form>
        </Modal>
    );
}

export function TicketModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (ticket: Omit<Ticket, 'id' | 'created'>) => void }) {
    const [formData, setFormData] = useState<Omit<Ticket, 'id' | 'created'>>({
        subject: '',
        description: '',
        customer: '',
        email: '',
        priority: 'medium',
        category: 'technical',
        status: 'open',
        assignedTo: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({ subject: '', description: '', customer: '', email: '', priority: 'medium', category: 'technical', status: 'open', assignedTo: '' });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Support Ticket"
            footer={
                <>
                    <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Check className="w-4 h-4" /> Save Ticket
                    </button>
                </>
            }
        >
            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Subject <span className="text-red-500">*</span></label>
                    <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description <span className="text-red-500">*</span></label>
                    <textarea required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[100px]" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Customer Name <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Customer Email <span className="text-red-500">*</span></label>
                        <input type="email" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Priority <span className="text-red-500">*</span></label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value as any })}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Category <span className="text-red-500">*</span></label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option value="technical">Technical Issue</option>
                            <option value="billing">Billing</option>
                            <option value="general">General Inquiry</option>
                            <option value="feature">Feature Request</option>
                            <option value="bug">Bug Report</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Assigned Agent</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" value={formData.assignedTo} onChange={e => setFormData({ ...formData, assignedTo: e.target.value })} placeholder="Agent Name" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Status <span className="text-red-500">*</span></label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
