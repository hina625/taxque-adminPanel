"use client";

import React, { useState } from "react";
import { FileText, Plus, Eye } from "@phosphor-icons/react";

interface Question {
    id: number;
    question: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
}

export default function QuestionnairePage() {
    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, question: 'Describe your experience with React...', category: 'technical', difficulty: 'medium' },
        { id: 2, question: 'Tell me about a time you handled conflict...', category: 'behavioral', difficulty: 'medium' },
    ]);

    return (
        <div className="p-6 space-y-6 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Questionnaire</h1>
                <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                    <Plus size={20} weight="bold" /> Add Question
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
                <div className="grid grid-cols-[3fr_1fr_1fr_80px] p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400 text-sm">
                    <div>Question</div>
                    <div>Category</div>
                    <div>Difficulty</div>
                    <div>Actions</div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {questions.map(q => (
                        <div key={q.id} className="grid grid-cols-[3fr_1fr_1fr_80px] p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm transition-colors">
                            <div className="font-medium text-gray-900 dark:text-white">{q.question}</div>
                            <div className="text-gray-600 dark:text-gray-400 capitalize">{q.category}</div>
                            <div className="text-gray-600 dark:text-gray-400 capitalize">{q.difficulty}</div>
                            <button className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded transition-colors"><Eye size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

