'use client';

import React, { useState } from 'react';
import {
    ChatCircleDots, Phone, VideoCamera, ChartLine, Users,
    Headset, ShieldCheck, MagnifyingGlass, Funnel, PhoneCall,
    CalendarPlus, ArrowsLeftRight, XCircle, PaperPlaneRight,
    Paperclip, Image, Microphone, Lightning, Sparkle,
    PencilSimple, ClockCounterClockwise, PhoneOutgoing,
    DownloadSimple, UserPlus, CheckCircle, Warning, X
} from '@phosphor-icons/react';

// Mock Data
const CHAT_ITEMS = [
    { id: 1, name: "Priya Kapoor", role: "Associate", message: "Thanks for the update on GST filing.", time: "2m", unread: 2, status: "online", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Rahul Sharma", role: "Client", message: "Can we schedule a call for tomorrow?", time: "15m", unread: 0, status: "busy", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Amit Mehta", role: "Associate", message: "Document uploaded for verification.", time: "1h", unread: 0, status: "offline", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Support Team", role: "Group", message: "New ticket assigned: #TQ-2025", time: "3h", unread: 5, status: "online", avatar: "https://i.pravatar.cc/150?u=4" },
];

const MessengerPage = () => {
    const [activeView, setActiveView] = useState('chat');
    const [activeRole, setActiveRole] = useState('agent');
    const [selectedChat, setSelectedChat] = useState<number | null>(1);
    const [messageInput, setMessageInput] = useState('');
    const [showProfile, setShowProfile] = useState(true);

    // Computed
    const currentChat = CHAT_ITEMS.find(c => c.id === selectedChat) || CHAT_ITEMS[0];

    return (
        <div className="flex bg-slate-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm h-[calc(100vh-140px)]">

            {/* 1. MODULE SIDEBAR (Mini) */}
            <div className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-2 shrink-0 z-10">
                <div className="w-11 h-11 bg-indigo-600 rounded-xl grid place-items-center font-extrabold text-white text-xl mb-6 cursor-pointer hover:bg-indigo-500 transition-colors">
                    TQ
                </div>

                {[
                    { id: 'chat', icon: ChatCircleDots, label: 'Chats' },
                    { id: 'calls', icon: Phone, label: 'Calls' },
                    { id: 'meetings', icon: VideoCamera, label: 'Meetings' },
                    { id: 'analytics', icon: ChartLine, label: 'Analytics' },
                    { id: 'users', icon: Users, label: 'Users' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-12 h-12 rounded-xl grid place-items-center text-2xl transition-all relative group ${activeView === item.id
                                ? 'bg-white/10 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon />
                        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            {item.label}
                        </span>
                    </button>
                ))}

                <div className="mt-auto flex flex-col gap-2 p-1 border border-white/20 rounded-full">
                    {[
                        { id: 'agent', icon: Headset, title: 'Agent View' },
                        { id: 'admin', icon: ShieldCheck, title: 'Admin View' },
                    ].map(role => (
                        <button
                            key={role.id}
                            onClick={() => setActiveRole(role.id)}
                            className={`w-10 h-10 rounded-full grid place-items-center text-xl transition-all ${activeRole === role.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                            title={role.title}
                        >
                            <role.icon />
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. MAIN CONTENT STAGE */}
            <div className="flex-1 flex overflow-hidden bg-white">

                {activeView === 'chat' && (
                    <>
                        {/* 2a. CHAT LIST */}
                        <div className="w-80 border-r border-gray-200 flex flex-col bg-white shrink-0">
                            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                    Conversations
                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">12 online</span>
                                </h2>
                                <button className="text-slate-400 hover:text-indigo-600"><ClockCounterClockwise size={20} /></button>
                            </div>

                            <div className="p-4 border-b border-gray-100">
                                <div className="relative">
                                    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="px-4 py-2 flex gap-2 overflow-x-auto border-b border-gray-100 no-scrollbar">
                                {['All', 'Unread', 'Priority', 'Resolved'].map(filter => (
                                    <button key={filter} className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors ${filter === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                                {CHAT_ITEMS.map(chat => (
                                    <div
                                        key={chat.id}
                                        onClick={() => setSelectedChat(chat.id)}
                                        className={`p-3 rounded-xl flex gap-3 cursor-pointer transition-colors ${selectedChat === chat.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'
                                            }`}
                                    >
                                        <div className="relative shrink-0">
                                            <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
                                            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${chat.status === 'online' ? 'bg-emerald-500' :
                                                    chat.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
                                                }`}></span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <h4 className={`text-sm font-bold truncate ${selectedChat === chat.id ? 'text-indigo-900' : 'text-slate-800'}`}>{chat.name}</h4>
                                                <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate">{chat.message}</p>
                                        </div>
                                        {chat.unread > 0 && (
                                            <div className="self-center bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                {chat.unread}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2b. CHAT STAGE */}
                        <div className="flex-1 flex flex-col min-w-0 bg-white">
                            <div className="h-16 border-b border-gray-100 flex justify-between items-center px-6 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                                        <img src={currentChat.avatar} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 leading-tight">{currentChat.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                            <span className={`w-1.5 h-1.5 rounded-full ${currentChat.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                            {currentChat.status === 'online' ? 'Online' : 'Offline'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="h-9 px-3 border border-gray-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-600 text-xs font-bold transition-colors">
                                        <Phone size={16} /> Call
                                    </button>
                                    <button className="h-9 px-3 border border-gray-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-600 text-xs font-bold transition-colors">
                                        <VideoCamera size={16} /> Meet
                                    </button>
                                    <button className="h-9 px-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg hover:bg-rose-100 flex items-center gap-2 text-xs font-bold transition-colors">
                                        End Chat
                                    </button>
                                    <button
                                        onClick={() => setShowProfile(!showProfile)}
                                        className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${showProfile ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-400'}`}
                                    >
                                        <Users size={18} weight="bold" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                                <div className="flex justify-center">
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today, 10:23 AM</span>
                                </div>

                                {/* Received Message */}
                                <div className="flex gap-3 max-w-[80%]">
                                    <img src={currentChat.avatar} className="w-8 h-8 rounded-full mt-1" />
                                    <div>
                                        <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-800 leading-relaxed">
                                            Hello! I need some help regarding the legacy tax filing for FY2023. Can you guide me?
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium ml-1 mt-1 block">10:24 AM</span>
                                    </div>
                                </div>

                                {/* Sent Message */}
                                <div className="flex flex-col items-end max-w-[80%] ml-auto">
                                    <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm leading-relaxed">
                                        Hi {currentChat.name.split(' ')[0]}! Sure, I can help you with that. Do you have the T4 documents ready?
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium mr-1 mt-1 block">10:25 AM • Read</span>
                                </div>

                                {/* AI Assistant Message */}
                                <div className="flex gap-3 max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs mt-1 shadow-md shadow-emerald-200">
                                        <Sparkle weight="fill" />
                                    </div>
                                    <div>
                                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
                                            <strong className="block text-emerald-700 text-xs mb-1 uppercase tracking-wide">AI Suggestion</strong>
                                            Based on the client's request about FY2023, you might want to share the "Legacy Filing Guide" PDF.
                                            <div className="mt-2 flex gap-2">
                                                <button className="text-xs bg-white border border-emerald-200 px-2 py-1 rounded font-bold hover:bg-emerald-100 transition">Share Guide</button>
                                                <button className="text-xs bg-white border border-emerald-200 px-2 py-1 rounded font-bold hover:bg-emerald-100 transition">Ignore</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Composer */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex gap-2 items-end mb-3">
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            placeholder="Type your message..."
                                            rows={1}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none min-h-[46px]"
                                        ></textarea>
                                    </div>
                                    <button className="h-[46px] w-[46px] bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                        <PaperPlaneRight size={20} weight="bold" />
                                    </button>
                                </div>
                                <div className="flex gap-4 items-center px-1">
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Paperclip size={20} /></button>
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Image size={20} /></button>
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Microphone size={20} /></button>
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Lightning size={20} /></button>
                                    <div className="h-4 w-px bg-gray-200"></div>
                                    <button className="text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 text-xs font-bold">
                                        <Sparkle weight="fill" /> AI Assist
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 2c. PROFILE COLUMN (Collapsible) */}
                        {showProfile && (
                            <div className="w-72 bg-white border-l border-gray-200 flex flex-col p-6 overflow-y-auto shrink-0 animate-in slide-in-from-right-4 duration-300">
                                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                                    <div className="relative inline-block mb-3">
                                        <img src={currentChat.avatar} className="w-20 h-20 rounded-full border-4 border-slate-50 mx-auto" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900">{currentChat.name}</h3>
                                    <p className="text-xs text-slate-500 font-medium">{currentChat.role} • TaxQue Inc.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Email</label>
                                        <div className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2 rounded-lg truncate">priya.k@taxque.com</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Department</label>
                                        <div className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2 rounded-lg">Accounts & Tax</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Priority</label>
                                        <div className="text-sm font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-lg flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> High Priority
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Recent Tickets</label>
                                        <div className="space-y-2">
                                            <div className="text-xs bg-slate-50 p-2 rounded border border-gray-100">
                                                <div className="font-bold text-slate-700">#TQ-8832</div>
                                                <div className="text-slate-500 truncate">GST Login Issue</div>
                                            </div>
                                            <div className="text-xs bg-slate-50 p-2 rounded border border-gray-100">
                                                <div className="font-bold text-slate-700">#TQ-8801</div>
                                                <div className="text-slate-500 truncate">Payment Failed</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 space-y-2">
                                    <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition">View History</button>
                                    <button className="w-full py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition">Edit Profile</button>
                                </div>

                            </div>
                        )}
                    </>
                )}

                {activeView !== 'chat' && (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 text-slate-300">
                            {activeView === 'calls' && <Phone size={48} weight="duotone" />}
                            {activeView === 'meetings' && <VideoCamera size={48} weight="duotone" />}
                            {activeView === 'analytics' && <ChartLine size={48} weight="duotone" />}
                            {activeView === 'users' && <Users size={48} weight="duotone" />}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 capitalize">{activeView} Module</h2>
                        <p className="text-slate-500 max-w-md mx-auto">
                            This module is under construction. The dashboard infrastructure is ready to support {activeView} features.
                        </p>
                        <button onClick={() => setActiveView('chat')} className="mt-8 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                            Back to Chats
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MessengerPage;
