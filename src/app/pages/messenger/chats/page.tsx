"use client";

import React, { useState } from 'react';
import { ChatCircleDots, Phone, VideoCamera, MagnifyingGlass, PaperPlaneRight, Paperclip, Image, Microphone, Lightning, Sparkle, ClockCounterClockwise, Users } from '@phosphor-icons/react';

const CHAT_ITEMS = [
    { id: 1, name: "Priya Kapoor", role: "Associate", message: "Thanks for the update on GST filing.", time: "2m", unread: 2, status: "online", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Rahul Sharma", role: "Client", message: "Can we schedule a call for tomorrow?", time: "15m", unread: 0, status: "busy", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Amit Mehta", role: "Associate", message: "Document uploaded for verification.", time: "1h", unread: 0, status: "offline", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Support Team", role: "Group", message: "New ticket assigned: #TQ-2025", time: "3h", unread: 5, status: "online", avatar: "https://i.pravatar.cc/150?u=4" },
];

export default function ChatsPage() {
    const [selectedChat, setSelectedChat] = useState<number | null>(1);
    const [messageInput, setMessageInput] = useState('');
    const [showProfile, setShowProfile] = useState(true);
    const currentChat = CHAT_ITEMS.find(c => c.id === selectedChat) || CHAT_ITEMS[0];

    return (
        <div className="flex bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm h-[calc(100vh-140px)] transition-colors duration-300 m-6">
            {/* Chat List */}
            <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 shrink-0 transition-colors">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        Conversations <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">12 online</span>
                    </h2>
                    <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><ClockCounterClockwise size={20} /></button>
                </div>
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="relative">
                        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-gray-900 border-none rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500/10 outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500" />
                    </div>
                </div>
                <div className="px-4 py-2 flex gap-2 overflow-x-auto border-b border-gray-100 dark:border-gray-700 no-scrollbar">
                    {['All', 'Unread', 'Priority', 'Resolved'].map(filter => (
                        <button key={filter} className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${filter === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-gray-900 text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700'}`}>{filter}</button>
                    ))}
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {CHAT_ITEMS.map(chat => (
                        <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`p-3 rounded-xl flex gap-3 cursor-pointer transition-colors ${selectedChat === chat.id ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900/50' : 'hover:bg-slate-50 dark:hover:bg-gray-700/30 border border-transparent'}`}>
                            <div className="relative shrink-0">
                                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
                                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${chat.status === 'online' ? 'bg-emerald-500' : chat.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className={`text-sm font-bold truncate ${selectedChat === chat.id ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-gray-200'}`}>{chat.name}</h4>
                                    <span className="text-[10px] text-slate-400 dark:text-gray-500 font-medium">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-gray-400 truncate">{chat.message}</p>
                            </div>
                            {chat.unread > 0 && <div className="self-center bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{chat.unread}</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Stage */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-800">
                <div className="h-16 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 overflow-hidden"><img src={currentChat.avatar} className="w-full h-full object-cover" /></div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{currentChat.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${currentChat.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'}`} />{currentChat.status === 'online' ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="h-9 px-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 flex items-center gap-2 text-slate-600 dark:text-gray-300 text-xs font-bold transition-colors"><Phone size={16} /> Call</button>
                        <button className="h-9 px-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 flex items-center gap-2 text-slate-600 dark:text-gray-300 text-xs font-bold transition-colors"><VideoCamera size={16} /> Meet</button>
                        <button className="h-9 px-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-bold transition-colors">End Chat</button>
                        <button onClick={() => setShowProfile(!showProfile)} className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all ${showProfile ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-400'}`}><Users size={18} weight="bold" /></button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-gray-900/50">
                    <div className="flex justify-center"><span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-gray-800 px-3 py-1 rounded-full">Today, 10:23 AM</span></div>
                    <div className="flex gap-3 max-w-[80%]">
                        <img src={currentChat.avatar} className="w-8 h-8 rounded-full mt-1 shrink-0" />
                        <div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-800 dark:text-gray-200">Hello! I need some help regarding the legacy tax filing for FY2023. Can you guide me?</div>
                            <span className="text-[10px] text-slate-400 font-medium ml-1 mt-1 block">10:24 AM</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end max-w-[80%] ml-auto">
                        <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">Hi {currentChat.name.split(' ')[0]}! Sure, I can help you with that. Do you have the T4 documents ready?</div>
                        <span className="text-[10px] text-slate-400 font-medium mr-1 mt-1 block">10:25 AM • Read</span>
                    </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex gap-2 items-end mb-3">
                        <textarea value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Type your message..." rows={1} className="flex-1 px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm text-slate-800 dark:text-white resize-none min-h-[46px] placeholder:text-gray-400" />
                        <button className="h-[46px] w-[46px] bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none"><PaperPlaneRight size={20} weight="bold" /></button>
                    </div>
                    <div className="flex gap-4 items-center px-1">
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Paperclip size={20} /></button>
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Image size={20} /></button>
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Microphone size={20} /></button>
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Lightning size={20} /></button>
                        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
                        <button className="text-emerald-500 hover:text-emerald-600 flex items-center gap-1 text-xs font-bold"><Sparkle weight="fill" /> AI Assist</button>
                    </div>
                </div>
            </div>

            {/* Profile Column */}
            {showProfile && (
                <div className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col p-6 overflow-y-auto shrink-0">
                    <div className="text-center mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                        <img src={currentChat.avatar} className="w-20 h-20 rounded-full border-4 border-slate-50 dark:border-gray-700 mx-auto mb-3" />
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{currentChat.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">{currentChat.role}</p>
                    </div>
                    <div className="space-y-4">
                        {[['Email', 'priya.k@taxque.com'], ['Department', 'Accounts & Tax'], ['Priority', 'High']].map(([label, val]) => (
                            <div key={label}><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">{label}</label><div className="text-sm font-medium text-slate-800 dark:text-gray-200 bg-slate-50 dark:bg-gray-900 px-3 py-2 rounded-lg">{val}</div></div>
                        ))}
                    </div>
                    <div className="mt-auto pt-6 space-y-2">
                        <button className="w-full py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all">View History</button>
                        <button className="w-full py-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900/50 rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-all">Edit Profile</button>
                    </div>
                </div>
            )}
        </div>
    );
}
