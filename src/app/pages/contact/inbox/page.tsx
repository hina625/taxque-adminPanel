"use client";
import React, { useState } from 'react';
import { Plus, X, Trash } from '@phosphor-icons/react';
import { Mail, Send, Inbox, Star, Clock, CheckCircle } from 'lucide-react';

const INITIAL_MESSAGES = [
    { id: 1, sender: 'Alice Smith', email: 'alice@company.com', subject: 'Inquiry about Enterprise Plan', body: 'Hi team, do you offer bulk discounts for 50+ seats?', time: '10:30 AM', unread: true, starred: false, service: 'Enterprise Sales' },
    { id: 2, sender: 'John Doe', email: 'john.doe@gmail.com', subject: 'Login Issues on Mobile', body: 'I cannot reset my password when using the iOS app.', time: 'Yesterday', unread: true, starred: true, service: 'Technical Support' },
    { id: 3, sender: 'Michael Scott', email: 'mscott@dundermifflin.com', subject: 'Partnership Proposal', body: 'We are looking to explore a strategic partnership.', time: '2 days ago', unread: false, starred: true, service: 'Partners' },
];

export default function InboxPage() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [active, setActive] = useState<number | null>(null);
    const [showCompose, setShowCompose] = useState(false);
    const [replyText, setReplyText] = useState('');

    const activeMsg = messages.find(m => m.id === active);

    const handleOpen = (id: number) => {
        setActive(id);
        setMessages(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m));
    };

    const handleDelete = (id: number) => {
        setMessages(prev => prev.filter(m => m.id !== id));
        if (active === id) setActive(null);
    };

    const handleSendReply = () => {
        if (!replyText.trim()) return;
        setReplyText('');
    };

    const handleCompose = (e: React.FormEvent) => {
        e.preventDefault();
        setShowCompose(false);
    };

    return (
        <div className="flex bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm h-[calc(100vh-140px)] m-6 transition-colors">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 flex flex-col p-4 shrink-0">
                <button onClick={() => setShowCompose(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 mb-5 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={16} /> Compose
                </button>
                <nav className="space-y-1">
                    {[['Inbox', <Inbox className="w-4 h-4" />, messages.filter(m => m.unread).length], ['Starred', <Star className="w-4 h-4" />, messages.filter(m => m.starred).length], ['Sent', <Send className="w-4 h-4" />, 0]].map(([label, icon, count]) => (
                        <div key={label as string} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 cursor-pointer text-slate-700 dark:text-gray-300 text-sm font-medium">
                            <span className="text-slate-500 dark:text-gray-500">{icon}</span>
                            <span className="flex-1">{label}</span>
                            {(count as number) > 0 && <span className="text-xs font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">{count}</span>}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Message List / Detail */}
            {!active ? (
                <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
                    {messages.map(msg => (
                        <div key={msg.id} onClick={() => handleOpen(msg.id)} className={`flex items-center gap-4 px-6 py-4 border-b border-slate-100 dark:border-gray-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors group ${msg.unread ? 'font-bold' : 'font-normal'}`}>
                            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-xs shrink-0">
                                {msg.sender.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className={`text-sm ${msg.unread ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-gray-300'}`}>{msg.sender}</span>
                                    <span className="text-xs text-slate-400 dark:text-gray-500">{msg.time}</span>
                                </div>
                                <div className="text-sm text-slate-700 dark:text-gray-300 truncate">{msg.subject}</div>
                                <div className="text-xs text-slate-400 dark:text-gray-500 truncate">{msg.body}</div>
                            </div>
                            <button onClick={e => { e.stopPropagation(); handleDelete(msg.id); }} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"><Trash size={16} weight="bold" /></button>
                        </div>
                    ))}
                </div>
            ) : activeMsg ? (
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-gray-700">
                        <button onClick={() => setActive(null)} className="text-slate-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 text-sm font-bold">← Back</button>
                        <div className="ml-auto flex gap-2">
                            <button onClick={() => handleDelete(activeMsg.id)} className="text-rose-500 hover:text-rose-600 text-sm font-medium flex items-center gap-1"><Trash size={14} weight="bold" /> Delete</button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{activeMsg.subject}</h2>
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400">
                                <span>From: <strong className="text-slate-700 dark:text-gray-300">{activeMsg.sender}</strong></span>
                                <span>·</span>
                                <span>{activeMsg.email}</span>
                                <span className="ml-auto bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full">{activeMsg.service}</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-gray-900/50 rounded-xl p-6 text-slate-700 dark:text-gray-300 leading-relaxed">{activeMsg.body}</div>
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Reply</label>
                            <textarea className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 min-h-[100px] transition-colors" placeholder="Type your reply..." value={replyText} onChange={e => setReplyText(e.target.value)} />
                            <div className="flex justify-end">
                                <button onClick={handleSendReply} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2">
                                    <Send className="w-4 h-4" /> Send Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Compose Modal */}
            {showCompose && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Message</h2>
                            <button onClick={() => setShowCompose(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleCompose} className="p-8 space-y-4">
                            <input type="text" required placeholder="To" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" />
                            <input type="text" required placeholder="Subject" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" />
                            <textarea placeholder="Message..." className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 min-h-[140px] transition-colors" />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowCompose(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Discard</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2"><Send className="w-4 h-4" /> Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
