"use client";
import React, { useState } from 'react';
import { Plus, VideoCamera, X } from '@phosphor-icons/react';

interface Meeting { id: number; title: string; date: string; time: string; duration: string; attendees: number; status: string; }

const INITIAL_MEETINGS: Meeting[] = [
    { id: 1, title: 'Project Kickoff - GST Compliance', date: 'Feb 24, 2026', time: '10:00 AM', duration: '1h', attendees: 5, status: 'upcoming' },
    { id: 2, title: 'Client Review - Q4 Filings', date: 'Feb 23, 2026', time: '3:00 PM', duration: '45m', attendees: 3, status: 'completed' },
    { id: 3, title: 'Team Sync - Support Roadmap', date: 'Feb 22, 2026', time: '11:00 AM', duration: '30m', attendees: 8, status: 'completed' },
];

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: '', date: '', time: '', duration: '30m', attendees: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newMeeting: Meeting = {
            id: meetings.length + 1,
            title: form.title,
            date: form.date,
            time: form.time,
            duration: form.duration,
            attendees: parseInt(form.attendees) || 1,
            status: 'upcoming',
        };
        setMeetings([newMeeting, ...meetings]);
        setShowModal(false);
        setForm({ title: '', date: '', time: '', duration: '30m', attendees: '' });
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Meetings</h1>
                    <p className="text-slate-500 dark:text-gray-400">Schedule and manage video meetings</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus weight="bold" size={18} /> Schedule Meeting
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {meetings.map(meeting => (
                    <div key={meeting.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meeting.status === 'upcoming' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-400'}`}>
                                    <VideoCamera size={24} weight="fill" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{meeting.title}</h3>
                                    <div className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-1 flex flex-wrap gap-2">
                                        <span>{meeting.date}</span><span>•</span>
                                        <span>{meeting.time}</span><span>•</span>
                                        <span>{meeting.duration}</span><span>•</span>
                                        <span>{meeting.attendees} attendees</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${meeting.status === 'upcoming' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-400'}`}>{meeting.status}</span>
                                {meeting.status === 'upcoming' && (
                                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors">Join Now</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Schedule Meeting Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Schedule Meeting</h2>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-500 dark:text-gray-400"><X weight="bold" size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Meeting Title</label>
                                <input type="text" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Client Review" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Date</label>
                                    <input type="date" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Time</label>
                                    <input type="time" required className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Duration</label>
                                    <select className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}>
                                        <option>15m</option><option>30m</option><option>45m</option><option>1h</option><option>2h</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Attendees</label>
                                    <input type="number" min="1" className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="1" value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 border border-slate-200 dark:border-gray-700 text-sm font-bold text-slate-600 dark:text-gray-400 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all">Schedule</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
