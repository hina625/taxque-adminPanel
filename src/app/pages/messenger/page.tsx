"use client";

import React from 'react';
import Link from 'next/link';
import { ChatCircleDots, Phone, VideoCamera, Users } from '@phosphor-icons/react';

const modules = [
    { name: 'Chats', href: '/pages/messenger/chats', icon: ChatCircleDots, desc: 'Live conversations with clients and team', badge: '5 unread' },
    { name: 'Calls', href: '/pages/messenger/calls', icon: Phone, desc: 'Call logs and VoIP history', badge: null },
    { name: 'Meetings', href: '/pages/messenger/meetings', icon: VideoCamera, desc: 'Upcoming and past meetings', badge: '1 upcoming' },
    { name: 'Contacts', href: '/pages/messenger/users', icon: Users, desc: 'Manage your messenger contacts', badge: null },
];

export default function MessengerPage() {
    return (
        <main className="max-w-[1600px] mx-auto p-6 lg:p-8 overflow-y-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Messenger</h1>
                    <p className="text-slate-500 dark:text-gray-400">Communicate with clients, team members and more</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map(mod => (
                        <Link key={mod.name} href={mod.href} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 transition-colors shrink-0">
                                        <mod.icon size={24} weight="fill" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{mod.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-gray-400 mt-0.5">{mod.desc}</p>
                                    </div>
                                </div>
                                {mod.badge && (
                                    <span className="shrink-0 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-full">
                                        {mod.badge}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
