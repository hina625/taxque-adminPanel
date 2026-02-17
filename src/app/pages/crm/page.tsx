
'use client';

import React, { useState, useEffect } from 'react';
import {
    Hexagon,
    LayoutDashboard,
    Kanban,
    Users,
    Contact,
    CheckSquare,
    Headset,
    Bell,
    RefreshCw,
    TrendingUp,
    Plus,
    UserPlus,
    MoreHorizontal,
    Search,
    Filter
} from 'lucide-react';
import {
    DealModal,
    LeadModal,
    ContactModal,
    TaskModal,
    TicketModal,
    Deal,
    Lead,
    Contact as ContactType,
    Task,
    Ticket
} from './components/Modals';

type ViewType = 'dashboard' | 'pipeline' | 'leads' | 'contacts' | 'tasks' | 'tickets';

export default function CRMPage() {
    const [activeView, setActiveView] = useState<ViewType>('dashboard');

    // --- State ---
    const [deals, setDeals] = useState<Deal[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    // --- Modal State ---
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

    // --- Init Data ---
    useEffect(() => {
        // Load initial dummy data if empty (mocking simplified loadData)
        if (deals.length === 0 && leads.length === 0) {
            setDeals([
                { id: 1, name: 'Innovate Digital', company: 'Innovate Digital Inc', value: 24500, stage: 'lead', description: 'Digital transformation project', contact: 'John Smith', created: new Date().toISOString() }
            ]);
            setLeads([
                { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@innovate.com', company: 'Innovate Digital', phone: '+1234567890', status: 'New', value: 24500, source: 'Website', notes: 'Interested in our services', created: new Date().toISOString() }
            ]);
            setTasks([
                { id: 1, title: 'Prepare Q2 Sales Report', description: 'Compile revenue and conversion data', dueDate: '2025-12-25', priority: 'high', status: 'pending', assignedTo: 'Alex Davis', relatedTo: '', created: new Date().toISOString() }
            ]);
            setTickets([
                { id: 1001, subject: 'Login Issue', description: 'Cannot access customer portal', customer: 'TechCorp Solutions', email: 'support@techcorp.com', priority: 'high', category: 'technical', status: 'open', assignedTo: 'Support Team', created: new Date().toISOString() }
            ]);
        }
    }, []);

    // --- Handlers ---
    const handleAddDeal = (deal: Omit<Deal, 'id' | 'created'>) => {
        const newDeal: Deal = { ...deal, id: Date.now(), created: new Date().toISOString() };
        setDeals([...deals, newDeal]);
    };

    const handleAddLead = (lead: Omit<Lead, 'id' | 'created'>) => {
        const newLead: Lead = { ...lead, id: Date.now(), created: new Date().toISOString() };
        setLeads([...leads, newLead]);
    };

    const handleAddContact = (contact: Omit<ContactType, 'id'>) => {
        const newContact: ContactType = { ...contact, id: Date.now() };
        setContacts([...contacts, newContact]);
    };

    const handleAddTask = (task: Omit<Task, 'id' | 'created'>) => {
        const newTask: Task = { ...task, id: Date.now(), created: new Date().toISOString() };
        setTasks([...tasks, newTask]);
    };

    const handleAddTicket = (ticket: Omit<Ticket, 'id' | 'created'>) => {
        const newTicket: Ticket = { ...ticket, id: Date.now(), created: new Date().toISOString() };
        setTickets([...tickets, newTicket]);
    };


    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-[1600px] mx-auto px-6 h-[70px] flex justify-between items-center">
                    <div className="text-xl font-bold flex items-center gap-2 text-indigo-600">
                        <Hexagon className="fill-indigo-600 w-8 h-8" /> NexusCRM Pro
                    </div>

                    <nav className="flex h-full gap-1 hidden md:flex">
                        <NavButton view="dashboard" current={activeView} onClick={setActiveView} icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
                        <NavButton view="pipeline" current={activeView} onClick={setActiveView} icon={<Kanban className="w-5 h-5" />} label="Pipeline" />
                        <NavButton view="leads" current={activeView} onClick={setActiveView} icon={<Users className="w-5 h-5" />} label="Leads" />
                        <NavButton view="contacts" current={activeView} onClick={setActiveView} icon={<Contact className="w-5 h-5" />} label="Contacts" />
                        <NavButton view="tasks" current={activeView} onClick={setActiveView} icon={<CheckSquare className="w-5 h-5" />} label="Tasks" />
                        <NavButton view="tickets" current={activeView} onClick={setActiveView} icon={<Headset className="w-5 h-5" />} label="Support" />
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                            AD
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto p-6 lg:p-8">
                {activeView === 'dashboard' && (
                    <DashboardView
                        setActiveView={setActiveView}
                        stats={{
                            revenue: deals.reduce((sum, d) => sum + d.value, 0),
                            deals: deals.length,
                            leads: leads.length,
                            tasks: tasks.filter(t => t.status !== 'completed').length,
                            tickets: tickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length
                        }}
                    />
                )}
                {activeView === 'pipeline' && <PipelineView deals={deals} onAddClick={() => setIsDealModalOpen(true)} />}
                {activeView === 'leads' && <LeadsView leads={leads} onAddClick={() => setIsLeadModalOpen(true)} />}
                {activeView === 'contacts' && <ContactsView contacts={contacts} onAddClick={() => setIsContactModalOpen(true)} />}
                {activeView === 'tasks' && <TasksView tasks={tasks} onAddClick={() => setIsTaskModalOpen(true)} />}
                {activeView === 'tickets' && <TicketsView tickets={tickets} onAddClick={() => setIsTicketModalOpen(true)} />}
            </main>

            {/* Modals */}
            <DealModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} onSave={handleAddDeal} />
            <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onSave={handleAddLead} />
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} onSave={handleAddContact} />
            <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onSave={handleAddTask} />
            <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} onSave={handleAddTicket} />
        </div>
    );
}

function NavButton({ view, current, onClick, icon, label }: { view: ViewType, current: ViewType, onClick: (v: ViewType) => void, icon: React.ReactNode, label: string }) {
    const isActive = view === current;
    return (
        <button
            onClick={() => onClick(view)}
            className={`flex items-center gap-2 px-4 h-full text-sm font-medium border-b-2 transition-colors ${isActive
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
        >
            {icon} {label}
        </button>
    );
}

// --- Views ---

function DashboardView({ setActiveView, stats }: { setActiveView: (v: ViewType) => void, stats: any }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Overview</h1>
                    <p className="text-slate-500">Welcome back! Here's your performance today.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-white transition-colors bg-white shadow-sm">
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="+18.2%" trendUp={true} onClick={() => setActiveView('pipeline')} />
                <StatCard label="Active Deals" value={stats.deals.toString()} onClick={() => setActiveView('pipeline')} />
                <StatCard label="Total Leads" value={stats.leads.toString()} onClick={() => setActiveView('leads')} />
                <StatCard label="Pending Tasks" value={stats.tasks.toString()} onClick={() => setActiveView('tasks')} />
                <StatCard label="Open Tickets" value={stats.tickets.toString()} onClick={() => setActiveView('tickets')} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-[2fr_1fr_1fr] px-6 py-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 text-sm uppercase">
                    <div>Activity</div>
                    <div>Type</div>
                    <div>Time</div>
                </div>
                <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-[2fr_1fr_1fr] px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                        <div className="font-medium text-slate-900">System initialized</div>
                        <div><span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">System</span></div>
                        <div className="text-slate-500 text-sm">Just now</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PipelineView({ deals, onAddClick }: { deals: Deal[], onAddClick: () => void }) {
    const stages = [
        { id: 'lead', name: 'Lead Generation' },
        { id: 'qualification', name: 'Qualification' },
        { id: 'proposal', name: 'Proposal' },
        { id: 'negotiation', name: 'Negotiation' },
        { id: 'closed', name: 'Closed Won' }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Sales Pipeline</h1>
                    <p className="text-slate-500">Drag and drop deals between stages</p>
                </div>
                <button onClick={onAddClick} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                    <Plus className="w-5 h-5" /> New Deal
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
                {stages.map(stage => {
                    const stageDeals = deals.filter(d => d.stage === stage.id);
                    const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
                    return (
                        <PipelineColumn key={stage.id} title={stage.name} count={stageDeals.length} total={`$${totalValue.toLocaleString()}`}>
                            {stageDeals.map(deal => (
                                <PipelineCard key={deal.id} title={deal.name} company={deal.company} value={`$${deal.value.toLocaleString()}`} days="Today" />
                            ))}
                        </PipelineColumn>
                    );
                })}
            </div>
        </div>
    );
}

function LeadsView({ leads, onAddClick }: { leads: Lead[], onAddClick: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Leads Management</h1>
                    <p className="text-slate-500">Track and convert potential customers</p>
                </div>
                <button onClick={onAddClick} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                    <UserPlus className="w-5 h-5" /> Add Lead
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] px-6 py-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 text-sm uppercase">
                            <div>Name</div>
                            <div>Company</div>
                            <div>Status</div>
                            <div>Value</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {leads.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No leads yet. Click "Add Lead" to create one.</div>
                            ) : (
                                leads.map((lead) => (
                                    <div key={lead.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer text-sm">
                                        <div>
                                            <div className="font-medium text-slate-900">{lead.firstName} {lead.lastName}</div>
                                            <div className="text-slate-600 text-xs">{lead.email}</div>
                                        </div>
                                        <div className="text-slate-600">{lead.company}</div>
                                        <div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${lead.status === 'New' ? 'bg-emerald-100 text-emerald-700' :
                                                lead.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-slate-700">${lead.value.toLocaleString()}</div>
                                        <div>
                                            <button className="text-slate-400 hover:text-indigo-600 p-1"><MoreHorizontal className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactsView({ contacts, onAddClick }: { contacts: ContactType[], onAddClick: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Contacts</h1>
                    <p className="text-slate-500">Manage customer relationships</p>
                </div>
                <button onClick={onAddClick} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                    <UserPlus className="w-5 h-5" /> Add Contact
                </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[2fr_2fr_1fr_100px] px-6 py-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 text-sm uppercase">
                            <div>Name</div>
                            <div>Email</div>
                            <div>Phone</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {contacts.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No contacts yet. Click "Add Contact" to create one.</div>
                            ) : (
                                contacts.map((contact) => (
                                    <div key={contact.id} className="grid grid-cols-[2fr_2fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-100">
                                                {contact.firstName[0]}{contact.lastName[0]}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{contact.firstName} {contact.lastName}</div>
                                                <div className="text-xs text-slate-500">{contact.title}</div>
                                            </div>
                                        </div>
                                        <div className="text-slate-600">{contact.email}</div>
                                        <div className="text-slate-600 text-xs">{contact.phone || '-'}</div>
                                        <div>
                                            <button className="text-slate-400 hover:text-indigo-600 p-1"><MoreHorizontal className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TasksView({ tasks, onAddClick }: { tasks: Task[], onAddClick: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Task Management</h1>
                    <p className="text-slate-500">Track and manage your tasks</p>
                </div>
                <button onClick={onAddClick} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                    <Plus className="w-5 h-5" /> New Task
                </button>
            </div>

            <div className="flex gap-2 mb-6">
                <FilterButton label="All Tasks" active />
                <FilterButton label="Pending" />
                <FilterButton label="Completed" />
                <FilterButton label="Overdue" />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] px-6 py-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 text-sm uppercase">
                            <div>Task</div>
                            <div>Due Date</div>
                            <div>Priority</div>
                            <div>Status</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {tasks.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No tasks found.</div>
                            ) : (
                                tasks.map((task) => (
                                    <TaskRow key={task.id} task={task.title} date={task.dueDate} priority={task.priority} status={task.status} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TicketsView({ tickets, onAddClick }: { tickets: Ticket[], onAddClick: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Support Tickets</h1>
                    <p className="text-slate-500">Manage customer support requests</p>
                </div>
                <button onClick={onAddClick} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                    <Plus className="w-5 h-5" /> New Ticket
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[100px_2fr_1fr_1fr_1fr_100px] px-6 py-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 text-sm uppercase">
                            <div>Ticket ID</div>
                            <div>Subject</div>
                            <div>Customer</div>
                            <div>Priority</div>
                            <div>Status</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {tickets.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No tickets found.</div>
                            ) : (
                                tickets.map((ticket) => (
                                    <TicketRow key={ticket.id} id={`#${ticket.id}`} subject={ticket.subject} customer={ticket.customer} priority={ticket.priority} status={ticket.status} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Reusable Content Components ---

function StatCard({ label, value, trend, trendUp, onClick }: { label: string, value: string, trend?: string, trendUp?: boolean, onClick?: () => void }) {
    return (
        <div onClick={onClick} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-sm font-medium text-slate-500 mb-1">{label}</div>
            <div className="text-2xl font-bold text-slate-900 mb-2">{value}</div>
            {trend && (
                <div className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    <TrendingUp className="w-3 h-3" /> {trend}
                </div>
            )}
        </div>
    );
}

function PipelineColumn({ title, count, total, children }: { title: string, count: number, total: string, children?: React.ReactNode }) {
    return (
        <div className="flex-shrink-0 w-80 bg-slate-100 rounded-xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-slate-800">{title}</h3>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">{total} potential value</div>
            <div className="flex flex-col gap-3 min-h-[100px]">
                {children}
            </div>
        </div>
    );
}

function PipelineCard({ title, company, value, days, tag }: { title: string, company: string, value: string, days: string, tag?: string }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-transparent hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
                {tag && <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">{tag}</span>}
            </div>
            <p className="text-sm text-slate-500 mb-3">{company}</p>
            <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">{value}</span>
                <span className="text-slate-400">{days} ago</span>
            </div>
        </div>
    );
}

function FilterButton({ label, active }: { label: string, active?: boolean }) {
    return (
        <button className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${active
            ? 'bg-slate-800 text-white border-slate-800'
            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}>
            {label}
        </button>
    );
}

function TaskRow({ task, date, priority, status }: { task: string, date: string, priority: string, status: string }) {
    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer text-sm">
            <div className="font-medium text-slate-900">{task}</div>
            <div className="text-slate-500">{date}</div>
            <div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priority.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                    priority.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                    }`}>
                    {priority.toUpperCase()}
                </span>
            </div>
            <div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'completed' ? 'bg-slate-100 text-slate-600 line-through' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                    {status}
                </span>
            </div>
            <div><button className="text-slate-400 hover:text-indigo-600 p-1"><MoreHorizontal className="w-5 h-5" /></button></div>
        </div>
    )
}

function TicketRow({ id, subject, customer, priority, status }: { id: string, subject: string, customer: string, priority: string, status: string }) {
    return (
        <div className="grid grid-cols-[100px_2fr_1fr_1fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer text-sm">
            <div className="font-mono text-slate-500">{id}</div>
            <div className="font-medium text-slate-900">{subject}</div>
            <div className="text-slate-600">{customer}</div>
            <div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priority.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                    }`}>
                    {priority.toUpperCase()}
                </span>
            </div>
            <div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                    {status}
                </span>
            </div>
            <div><button className="text-slate-400 hover:text-indigo-600 p-1"><MoreHorizontal className="w-5 h-5" /></button></div>
        </div>
    )
}
