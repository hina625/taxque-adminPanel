'use client';

import React, { useState } from 'react';


import {
    Menu,
    Search,
    PenLine,
    Inbox,
    Send,
    Trash2,
    PlusCircle as PlusCircleLucide,
    Star as StarLucide,
    ArrowLeft as ArrowLeftLucide,
    Mail,
    Calendar,
    Link,
    Tag as TagLucide,
    Reply,
    X as XLucide,
    CheckCircle as CheckCircleLucide,
    Clock as ClockLucide,
    ChevronRight
} from 'lucide-react';

interface Email {
    id: number;
    folder: 'inbox' | 'sent' | 'trash';
    sender: string;
    email: string;
    subject: string;
    body: string;
    displayDate: string;
    timestamp: string;
    pageLink: string;
    serviceType: string;
    unread: boolean;
}

export default function ContactPage() {
    const [emails, setEmails] = useState<Email[]>([
        {
            id: 1,
            folder: 'inbox',
            sender: 'Alice Smith',
            email: 'alice@company.com',
            subject: 'Inquiry about Enterprise Plan',
            body: 'Hi team, do you offer bulk discounts for 50+ seats? We are looking to migrate next month.',
            displayDate: '10:30 AM',
            timestamp: 'Dec 16, 2025, 10:30 AM',
            pageLink: 'mysite.com/pricing',
            serviceType: 'Enterprise Sales',
            unread: true
        },
        {
            id: 2,
            folder: 'inbox',
            sender: 'John Doe',
            email: 'john.doe@gmail.com',
            subject: 'Login Issues on Mobile',
            body: 'I cannot reset my password when using the iOS app. It gives a 404 error.',
            displayDate: 'Yesterday',
            timestamp: 'Dec 15, 2025, 4:15 PM',
            pageLink: 'mysite.com/login',
            serviceType: 'Technical Support',
            unread: true
        }
    ]);

    const [currentFolder, setCurrentFolder] = useState<'inbox' | 'sent' | 'trash'>('inbox');
    const [activeEmailId, setActiveEmailId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Filtered Emails
    const filteredEmails = emails.filter(e =>
        e.folder === currentFolder &&
        (e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (e.serviceType && e.serviceType.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    const activeEmail = activeEmailId ? emails.find(e => e.id === activeEmailId) : null;

    const handleOpenEmail = (id: number) => {
        setActiveEmailId(id);
        setIsReplyOpen(false);
        setReplyText('');

        // Mark as read
        setEmails(prev => prev.map(e => e.id === id ? { ...e, unread: false } : e));
    };

    const handleFolderSwitch = (folder: 'inbox' | 'sent' | 'trash') => {
        setCurrentFolder(folder);
        setActiveEmailId(null);
    };

    const handleDelete = () => {
        if (activeEmailId) {
            setEmails(prev => prev.map(e => e.id === activeEmailId ? { ...e, folder: 'trash' } : e));
            setActiveEmailId(null);
            showToast("Moved to Trash");
        }
    };

    const handleSimulateLead = () => {
        const services = ['Web Design', 'SEO Audit', 'App Development', 'Consulting'];
        const pages = ['mysite.com/services', 'mysite.com/contact', 'mysite.com/landing-page-a'];
        const names = ['Michael Scott', 'Pam Beesly', 'Dwight Schrute', 'Jim Halpert'];

        const randomService = services[Math.floor(Math.random() * services.length)];
        const randomPage = pages[Math.floor(Math.random() * pages.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const fullDateString = now.toLocaleString();

        const newEmail: Email = {
            id: Date.now(),
            folder: 'inbox',
            sender: randomName,
            email: randomName.toLowerCase().replace(' ', '.') + '@client.com',
            subject: 'Question about ' + randomService,
            body: `Hello, I was looking at your ${randomPage} page and I have a question about your ${randomService} packages. Can you help?`,
            displayDate: timeString,
            timestamp: fullDateString,
            pageLink: randomPage,
            serviceType: randomService,
            unread: true
        };

        setEmails(prev => [newEmail, ...prev]);
        showToast("New Lead: " + randomService);
        if (currentFolder !== 'inbox') setCurrentFolder('inbox');
    };

    const handleSendCompose = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const to = (form.elements.namedItem('to') as HTMLInputElement).value;
        const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
        const body = (form.elements.namedItem('body') as HTMLTextAreaElement).value;

        if (!to) return;

        const newEmail: Email = {
            id: Date.now(),
            folder: 'sent',
            sender: 'Me',
            email: 'me@manager.com',
            subject: subject,
            body: body,
            displayDate: 'Just now',
            timestamp: new Date().toLocaleString(),
            pageLink: '-',
            serviceType: 'Outbound',
            unread: false
        };

        setEmails(prev => [newEmail, ...prev]);
        setIsComposeOpen(false);
        showToast("Message Sent!");
        setCurrentFolder('sent');
        setActiveEmailId(null);
    };

    const handleSendReply = () => {
        if (!replyText) return;
        showToast("Reply Sent!");
        setIsReplyOpen(false);
        setReplyText('');
    };

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">

            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0">
                <div className="text-xl text-slate-500 flex items-center gap-2 w-60">
                    <Menu className="w-6 h-6" /> Lead Manager
                </div>
                <div className="flex-1 max-w-3xl bg-slate-100 rounded-lg px-4 h-[46px] flex items-center">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, service, or page..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none w-full ml-3 text-slate-700 placeholder-slate-400"
                    />
                </div>
            </header>

            {/* Container */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white p-4 flex flex-col border-r border-slate-200 shrink-0">
                    <button
                        onClick={() => setIsComposeOpen(true)}
                        className="bg-sky-100 text-sky-900 border-none px-6 py-4 rounded-2xl font-semibold cursor-pointer flex items-center gap-3 text-sm mb-5 shadow-sm hover:shadow transition-all"
                    >
                        <PenLine className="w-5 h-5" /> Compose
                    </button>

                    <nav className="space-y-1">
                        <SidebarItem
                            icon={<Inbox className="w-5 h-5" />}
                            label="Inbox"
                            count={emails.filter(e => e.folder === 'inbox' && e.unread).length || undefined}
                            active={currentFolder === 'inbox'}
                            onClick={() => handleFolderSwitch('inbox')}
                        />
                        <SidebarItem
                            icon={<Send className="w-5 h-5" />}
                            label="Sent"
                            active={currentFolder === 'sent'}
                            onClick={() => handleFolderSwitch('sent')}
                        />
                        <SidebarItem
                            icon={<Trash2 className="w-5 h-5" />}
                            label="Trash"
                            count={emails.filter(e => e.folder === 'trash').length || undefined}
                            active={currentFolder === 'trash'}
                            onClick={() => handleFolderSwitch('trash')}
                        />
                    </nav>

                    <div className="mt-auto pt-4 border-t border-slate-200">
                        <button
                            onClick={handleSimulateLead}
                            className="w-full p-2.5 border-2 border-dashed border-slate-300 bg-slate-50 rounded-lg text-slate-600 font-semibold text-sm hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-2"
                        >
                            <PlusCircleLucide className="w-5 h-5" /> Simulate New Lead
                        </button>
                        <p className="text-[11px] text-slate-400 mt-2 pl-1">Generates: Time, Page URL & Service</p>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 bg-white m-4 rounded-2xl flex flex-col overflow-hidden shadow-sm border border-slate-100">

                    {activeEmailId === null ? (
                        // List View
                        <div className="flex-1 overflow-y-auto">
                            {filteredEmails.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                    <Inbox className="w-12 h-12 mb-2 opacity-20" />
                                    <p>Folder is empty</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {filteredEmails.map(email => (
                                        <div
                                            key={email.id}
                                            onClick={() => handleOpenEmail(email.id)}
                                            className={`grid grid-cols-[40px_200px_1fr_140px] px-5 py-3 items-center cursor-pointer text-sm hover:shadow-md hover:z-10 hover:bg-white relative transition-all ${email.unread ? 'bg-white font-bold text-slate-900' : 'bg-slate-50/50 font-normal text-slate-500'}`}
                                        >
                                            <div className="flex justify-center">
                                                {email.folder === 'trash' ? <Trash2 className="w-4 h-4 text-slate-300" /> : <StarLucide className={`w-4 h-4 ${email.unread ? 'text-slate-300' : 'text-amber-400 fill-amber-400'}`} />}
                                            </div>
                                            <div className="truncate pr-4">{email.sender}</div>
                                            <div className="truncate pr-4 flex items-center">
                                                {email.serviceType && (
                                                    <span className="bg-slate-100 text-slate-600 text-[11px] px-1.5 py-0.5 rounded mr-2 font-medium border border-slate-200">
                                                        {email.serviceType}
                                                    </span>
                                                )}
                                                <span className={email.unread ? 'text-slate-900' : 'text-slate-600'}>{email.subject}</span>
                                                <span className="text-slate-400 font-normal ml-2">- {email.body.substring(0, 40)}...</span>
                                            </div>
                                            <div className="text-right text-xs">{email.displayDate}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : activeEmail ? (
                        // Reading View
                        <div className="flex flex-col h-full">
                            <div className="px-5 py-3 border-b border-slate-100 flex gap-4">
                                <button onClick={() => setActiveEmailId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors" title="Back">
                                    <ArrowLeftLucide className="w-5 h-5" />
                                </button>
                                <button onClick={handleDelete} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-red-600 transition-colors" title="Delete">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button onClick={() => setEmails(prev => prev.map(e => e.id === activeEmailId ? { ...e, unread: true } : e))} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors" title="Mark Unread">
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                            {activeEmail.sender.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">{activeEmail.subject}</h2>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold text-slate-700">{activeEmail.sender}</span>
                                                <span className="text-slate-500">&lt;{activeEmail.email}&gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                        <ClockLucide className="w-4 h-4" /> {activeEmail.timestamp}
                                    </div>
                                </div>

                                {/* Lead Metadata Box */}
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 flex flex-wrap gap-8 text-sm">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Submitted On</span>
                                        <span className="font-medium text-slate-800 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" /> {activeEmail.timestamp}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Source Page</span>
                                        <span className="font-medium text-indigo-600 flex items-center gap-2">
                                            <Link className="w-4 h-4 text-slate-400" /> {activeEmail.pageLink}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Service Interest</span>
                                        <span className="font-medium text-slate-800 flex items-center gap-2">
                                            <TagLucide className="w-4 h-4 text-slate-400" /> {activeEmail.serviceType}
                                        </span>
                                    </div>
                                </div>

                                <div className="prose max-w-none text-slate-800 mb-10 whitespace-pre-wrap leading-relaxed">
                                    {activeEmail.body}
                                </div>

                                <div>
                                    {!isReplyOpen ? (
                                        <button
                                            onClick={() => setIsReplyOpen(true)}
                                            className="px-6 py-2 border border-slate-200 rounded-full text-slate-600 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                                        >
                                            <Reply className="w-4 h-4" /> Reply
                                        </button>
                                    ) : (
                                        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                                            <div className="text-xs text-slate-500 mb-2">To: {activeEmail.email}</div>
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Type your reply here..."
                                                className="w-full h-24 p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm"
                                            ></textarea>
                                            <div className="flex justify-end gap-3 mt-3">
                                                <button
                                                    onClick={() => setIsReplyOpen(false)}
                                                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                                                >
                                                    Discard
                                                </button>
                                                <button
                                                    onClick={handleSendReply}
                                                    className="px-6 py-2 text-sm bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </main>
            </div>

            {/* Compose Modal */}
            {isComposeOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-slate-100 px-4 py-3 flex justify-between items-center font-semibold text-slate-700 border-b border-slate-200">
                            New Message
                            <button onClick={() => setIsComposeOpen(false)} className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-200 transition-colors">
                                <XLucide className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSendCompose} className="p-4 flex flex-col gap-3">
                            <input name="to" type="text" placeholder="To" className="w-full p-2 border-b border-slate-200 outline-none text-sm focus:border-indigo-500 transition-colors" autoFocus />
                            <input name="subject" type="text" placeholder="Subject" className="w-full p-2 border-b border-slate-200 outline-none text-sm focus:border-indigo-500 transition-colors" />
                            <textarea name="body" placeholder="Message content..." className="w-full h-40 p-2 outline-none text-sm resize-none"></textarea>
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 left-6 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
                    <CheckCircleLucide className="w-5 h-5 text-emerald-400" />
                    {toastMessage}
                </div>
            )}

        </div>
    );
}

function SidebarItem({ icon, label, count, active, onClick }: { icon: React.ReactNode, label: string, count?: number, active?: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 px-4 py-2.5 rounded-r-full cursor-pointer transition-colors text-sm font-medium mr-4 ${active
                ? 'bg-sky-100/50 text-sky-900 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
                }`}
        >
            <div className={active ? 'text-sky-700' : 'text-slate-500'}>{icon}</div>
            {label}
            {count && (
                <span className={`ml-auto text-xs font-bold ${active ? 'text-sky-700' : 'text-slate-500'}`}>
                    {count}
                </span>
            )}
        </div>
    );
}
