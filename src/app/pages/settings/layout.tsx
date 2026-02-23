"use client";

import React from 'react';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full bg-[#f1f5f9] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
            {/* Subpage Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}
