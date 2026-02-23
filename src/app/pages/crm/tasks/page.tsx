"use client";

import React, { useState, useEffect } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { TaskModal, Task } from "../components/Modals";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    useEffect(() => {
        setTasks([
            { id: 1, title: 'Prepare Q2 Sales Report', description: 'Compile revenue and conversion data', dueDate: '2025-12-25', priority: 'high', status: 'pending', assignedTo: 'Alex Davis', relatedTo: 'Innovate Digital', created: new Date().toISOString() }
        ]);
    }, []);

    const handleAddTask = (task: Omit<Task, 'id' | 'created'>) => {
        const newTask: Task = { ...task, id: Date.now(), created: new Date().toISOString() };
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Task Management</h1>
                    <p className="text-slate-500 dark:text-gray-400">Track and manage your tasks</p>
                </div>
                <button onClick={() => setIsTaskModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-sm transition-colors">
                    <Plus className="w-5 h-5" /> New Task
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-b border-slate-200 dark:border-gray-700 font-semibold text-slate-500 dark:text-gray-400 text-sm uppercase">
                            <div>Task</div>
                            <div>Due Date</div>
                            <div>Priority</div>
                            <div>Status</div>
                            <div>Actions</div>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-gray-700">
                            {tasks.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No tasks found.</div>
                            ) : (
                                tasks.map((task) => (
                                    <div key={task.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-sm">
                                        <div className="font-medium text-slate-900 dark:text-gray-100">{task.title}</div>
                                        <div className="text-slate-500 dark:text-gray-400">{task.dueDate}</div>
                                        <div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                                                task.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                                                    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                }`}>
                                                {task.priority.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${task.status === 'completed' ? 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-500 line-through' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <div><button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1"><MoreHorizontal className="w-5 h-5" /></button></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onSave={handleAddTask} />
        </div>
    );
}
